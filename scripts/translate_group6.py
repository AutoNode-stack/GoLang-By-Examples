# -*- coding: utf-8 -*-
import os

TOPICS_G6 = {
    "environment-variables": {
        "go": """// Las [variables de entorno](https://en.wikipedia.org/wiki/Environment_variable)
// son un mecanismo universal para [transmitir información de
// configuración a programas Unix](https://www.12factor.net/config).
// Veamos cómo definir, obtener y listar variables de entorno.

package main

import (
	"fmt"
	"os"
	"strings"
)

func main() {

	// Para definir un par clave/valor, usa `os.Setenv`. Para obtener el
	// valor de una clave, usa `os.Getenv`. Esto devolverá
	// una cadena vacía si la clave no está presente en el
	// entorno.
	os.Setenv("FOO", "1")
	fmt.Println("FOO:", os.Getenv("FOO"))
	fmt.Println("BAR:", os.Getenv("BAR"))

	// Usa `os.Environ` para listar todos los pares clave/valor presentes en el
	// entorno. Esto devuelve un slice de cadenas con el
	// formato `KEY=value`. Puedes usar `strings.SplitN` para
	// separar la clave y el valor. Aquí imprimimos todas las claves.
	fmt.Println()
	for _, e := range os.Environ() {
		pair := strings.SplitN(e, "=", 2)
		fmt.Println(pair[0])
	}
}
""",
        "sh": """# Ejecutar el programa demuestra que recuperamos el valor
# para `FOO` configurado en el código, mientras que
# `BAR` permanece vacío.
$ go run environment-variables.go
FOO: 1
BAR: 

# La lista de claves en el entorno dependerá de la configuración
# de tu máquina particular.
TERM_PROGRAM
PATH
SHELL
...
FOO

# Si definimos `BAR` en el entorno antes de la invocación, el programa
# en ejecución capturará dicho valor.
$ BAR=2 go run environment-variables.go
FOO: 1
BAR: 2
...
"""
    },

    "logging": {
        "go": """// La biblioteca estándar de Go proporciona excelentes
// herramientas para emitir registros (logs) desde programas, con
// el paquete [log](https://pkg.go.dev/log) para
// salidas en texto libre y el paquete
// [log/slog](https://pkg.go.dev/log/slog) para
// salidas estructuradas.
package main

import (
	"bytes"
	"fmt"
	"log"
	"os"

	"log/slog"
)

func main() {

	// La simple invocación de funciones como `Println` desde el
	// paquete `log` utiliza el logger _estándar_, el cual
	// viene preconfigurado con una salida razonable
	// hacia `os.Stderr`. Métodos adicionales como
	// `Fatal*` o `Panic*` terminarán el programa tras
	// registrar el mensaje.
	log.Println("standard logger")

	// Los loggers pueden configurarse con _banderas_ (flags) para definir
	// su formato de salida. Por defecto, el logger estándar
	// tiene activadas las banderas `log.Ldate` y `log.Ltime`,
	// agrupadas en `log.LstdFlags`.
	// Podemos modificar sus banderas para emitir la hora con
	// precisión de microsegundos, por ejemplo.
	log.SetFlags(log.LstdFlags | log.Lmicroseconds)
	log.Println("with micro")

	// También permite emitir el nombre del archivo y la
	// línea exacta desde donde se invocó la función `log`.
	log.SetFlags(log.LstdFlags | log.Lshortfile)
	log.Println("with file/line")

	// Puede resultar muy útil crear un logger personalizado y
	// pasarlo entre componentes. Al crear un nuevo logger, podemos
	// definir un _prefijo_ para distinguir su salida
	// de la de otros loggers.
	mylog := log.New(os.Stdout, "my:", log.LstdFlags)
	mylog.Println("from mylog")

	// Podemos modificar el prefijo
	// en loggers existentes (incluyendo el estándar)
	// mediante el método `SetPrefix`.
	mylog.SetPrefix("ohmy:")
	mylog.Println("from mylog")

	// Los loggers admiten destinos de salida personalizados;
	// cualquier implementación de `io.Writer` es válida.
	var buf bytes.Buffer
	buflog := log.New(&buf, "buf:", log.LstdFlags)

	// Esta llamada escribe la salida de log dentro de `buf`.
	buflog.Println("hello")

	// Esto lo mostrará en la salida estándar.
	fmt.Print("from buflog:", buf.String())

	// El paquete `slog` provee
	// salida de registros _estructurada_. Por ejemplo, registrar
	// en formato JSON es sumamente sencillo.
	jsonHandler := slog.NewJSONHandler(os.Stderr, nil)
	myslog := slog.New(jsonHandler)
	myslog.Info("hi there")

	// Además del mensaje principal, la salida de `slog` puede
	// contener un número arbitrario de pares clave=valor.
	myslog.Info("hello again", "key", "val", "age", 25)
}
""",
        "sh": """# Salida de ejemplo; la fecha y la hora
# emitidas dependerán de cuándo se ejecutó el ejemplo.
$ go run logging.go
2023/08/22 10:45:16 standard logger
2023/08/22 10:45:16.904141 with micro
2023/08/22 10:45:16 logging.go:40: with file/line
my:2023/08/22 10:45:16 from mylog
ohmy:2023/08/22 10:45:16 from mylog
from buflog:buf:2023/08/22 10:45:16 hello

# Estos registros se muestran divididos en líneas para mayor claridad didáctica;
# en la práctica se emiten en una sola línea continua.
{"time":"2023-08-22T10:45:16.904166391-07:00",
 "level":"INFO","msg":"hi there"}
{"time":"2023-08-22T10:45:16.904178985-07:00",
	"level":"INFO","msg":"hello again",
	"key":"val","age":25}
"""
    },

    "http-client": {
        "go": """// La biblioteca estándar de Go incluye un soporte sobresaliente
// para clientes y servidores HTTP en el paquete `net/http`.
// En este ejemplo lo utilizaremos para emitir peticiones
// HTTP básicas.
package main

import (
	"bufio"
	"fmt"
	"net/http"
)

func main() {

	// Emite una petición HTTP GET a un servidor. `http.Get` es un
	// atajo conveniente que evita tener que crear un objeto `http.Client`
	// y llamar a su método `Get`; utiliza el objeto
	// `http.DefaultClient`, el cual posee configuraciones predeterminadas útiles.
	resp, err := http.Get("https://gobyexample.com")
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()

	// Imprime el estado de la respuesta HTTP.
	fmt.Println("Response status:", resp.Status)

	// Imprime las primeras 5 líneas del cuerpo de la respuesta.
	scanner := bufio.NewScanner(resp.Body)
	for i := 0; scanner.Scan() && i < 5; i++ {
		fmt.Println(scanner.Text())
	}

	if err := scanner.Err(); err != nil {
		panic(err)
	}
}
""",
        "sh": None
    },

    "http-server": {
        "go": """// Escribir un servidor HTTP básico es muy directo utilizando el
// paquete `net/http`.
package main

import (
	"fmt"
	"net/http"
)

// Un concepto fundamental en los servidores de `net/http` son
// los *manejadores* (handlers). Un handler es un objeto que implementa la
// interfaz `http.Handler`. Una forma común de escribir
// un handler es utilizar el adaptador `http.HandlerFunc`
// sobre funciones con la firma adecuada.
func hello(w http.ResponseWriter, req *http.Request) {

	// Las funciones que actúan como handlers reciben un
	// `http.ResponseWriter` y un `http.Request` como
	// argumentos. El escritor de respuesta se utiliza para construir la
	// respuesta HTTP. Aquí nuestra respuesta sencilla es solo
	// "hello\\n".
	fmt.Fprintf(w, "hello\\n")
}

func headers(w http.ResponseWriter, req *http.Request) {

	// Este handler realiza una tarea un poco más
	// sofisticada leyendo todas las cabeceras de la petición HTTP
	// y reflejándolas en el cuerpo de la respuesta.
	for name, headers := range req.Header {
		for _, h := range headers {
			fmt.Fprintf(w, "%v: %v\\n", name, h)
		}
	}
}

func main() {

	// Registramos nuestros manejadores en las rutas del servidor usando la
	// función de conveniencia `http.HandleFunc`. Esta configura
	// el *enrutador predeterminado* en el paquete `net/http` y
	// toma una función como argumento.
	http.HandleFunc("/hello", hello)
	http.HandleFunc("/headers", headers)

	// Finalmente, invocamos `ListenAndServe` con el puerto
	// y un handler. Pasar `nil` le indica que use el enrutador
	// predeterminado que acabamos de configurar.
	http.ListenAndServe(":8090", nil)
}
""",
        "sh": """# Inicia el servidor en segundo plano.
$ go run http-server.go &

# Accede a la ruta `/hello`.
$ curl localhost:8090/hello
hello
"""
    },

    "tcp-server": {
        "go": """// El paquete `net` provee las herramientas necesarias para construir
// fácilmente servidores de sockets TCP.
package main

import (
	"bufio"
	"fmt"
	"log"
	"net"
	"strings"
)

func main() {

	// `net.Listen` inicia el servidor en la red indicada
	// (TCP) y dirección (puerto 8090 en todas las interfaces).
	listener, err := net.Listen("tcp", ":8090")
	if err != nil {
		log.Fatal("Error listening:", err)
	}

	// Cierra el listener para liberar el puerto
	// cuando la aplicación finalice.
	defer listener.Close()

	// Bucle indefinido para aceptar nuevas conexiones de clientes.
	for {
		// Espera una conexión entrante.
		conn, err := listener.Accept()
		if err != nil {
			log.Println("Error accepting conn:", err)
			continue
		}

		// Usamos una goroutine aquí para atender la conexión,
		// permitiendo que el bucle principal continúe aceptando más
		// conexiones entrantes.
		go handleConnection(conn)
	}
}

// `handleConnection` gestiona una única conexión de cliente,
// leyendo una línea de texto del cliente y retornando una respuesta.
func handleConnection(conn net.Conn) {
	// Cerrar la conexión libera los recursos cuando
	// terminamos de interactuar con el cliente.
	defer conn.Close()

	// Usa `bufio.NewReader` para leer una línea de datos
	// del cliente (delimitada por salto de línea).
	reader := bufio.NewReader(conn)
	message, err := reader.ReadString('\\n')
	if err != nil {
		log.Printf("Read error: %v", err)
		return
	}

	// Crea y envía una respuesta de vuelta al cliente,
	// demostrando comunicación bidireccional.
	ackMsg := strings.ToUpper(strings.TrimSpace(message))
	response := fmt.Sprintf("ACK: %s\\n", ackMsg)
	_, err = conn.Write([]byte(response))
	if err != nil {
		log.Printf("Server write error: %v", err)
	}
}
""",
        "sh": """# Inicia el servidor TCP en segundo plano.
$ go run tcp-server.go &

# Envía datos y captura la respuesta utilizando netcat.
$ echo "Hello from netcat" | nc localhost 8090
ACK: HELLO FROM NETCAT
"""
    },

    "context": {
        "go": """// En el ejemplo anterior vimos cómo configurar un
// [servidor HTTP](http-server) simple. Los servidores HTTP son muy útiles para
// demostrar el uso de `context.Context` en el
// control de cancelación. Un `Context` transporta plazos de tiempo (deadlines),
// señales de cancelación y otros valores de ámbito de petición
// a través de límites de APIs y goroutines.
package main

import (
	"fmt"
	"net/http"
	"time"
)

func hello(w http.ResponseWriter, req *http.Request) {

	// La infraestructura de `net/http` crea un `context.Context` para cada petición,
	// disponible a través del método `Context()`.
	ctx := req.Context()
	fmt.Println("server: hello handler started")
	defer fmt.Println("server: hello handler ended")

	// Esperamos unos segundos antes de enviar una respuesta al
	// cliente. Esto simula algún trabajo en progreso que realiza el servidor.
	// Mientras se trabaja, monitoreamos el canal `Done()` del contexto
	// para detectar si debemos cancelar la tarea y retornar lo antes posible.
	select {
	case <-time.After(10 * time.Second):
		fmt.Fprintf(w, "hello\\n")
	case <-ctx.Done():
		// El método `Err()` del contexto devuelve un error
		// que explica por qué se cerró el canal `Done()`.
		err := ctx.Err()
		fmt.Println("server:", err)
		internalError := http.StatusInternalServerError
		http.Error(w, err.Error(), internalError)
	}
}

func main() {

	// Como antes, registramos nuestro manejador en la ruta "/hello"
	// y comenzamos a servir peticiones.
	http.HandleFunc("/hello", hello)
	http.ListenAndServe(":8090", nil)
}
""",
        "sh": """# Ejecuta el servidor en segundo plano.
$ go run context.go &

# Simula una petición de cliente hacia `/hello`, presionando
# Ctrl+C poco después de iniciar para enviar una señal
# de cancelación.
$ curl localhost:8090/hello
server: hello handler started
^C
server: context canceled
server: hello handler ended
"""
    },

    "spawning-processes": {
        "go": """// En ocasiones nuestros programas en Go necesitan iniciar y controlar otros
// procesos del sistema operativo.

package main

import (
	"errors"
	"fmt"
	"io"
	"os/exec"
)

func main() {

	// Comenzaremos con un comando simple que no toma
	// argumentos ni entrada y solo imprime información en
	// stdout. El asistente `exec.Command` crea un objeto
	// para representar este proceso externo.
	dateCmd := exec.Command("date")

	// El método `Output` ejecuta el comando, espera a que
	// finalice y recopila su salida estándar.
	// Si no hubo errores, `dateOut` contendrá los bytes
	// con la información de la fecha.
	dateOut, err := dateCmd.Output()
	if err != nil {
		panic(err)
	}
	fmt.Println("> date")
	fmt.Println(string(dateOut))

	// `Output` y otros métodos de `Command` devolverán
	// `*exec.Error` si hubo un problema al ejecutar el
	// comando (por ejemplo, ruta incorrecta), y `*exec.ExitError`
	// si el comando se ejecutó pero finalizó con un código de retorno
	// distinto de cero.
	_, err = exec.Command("date", "-x").Output()
	if err != nil {
		if e, ok := errors.AsType[*exec.Error](err); ok {
			fmt.Println("failed executing:", e)
		} else if e, ok := errors.AsType[*exec.ExitError](err); ok {
			exitCode := e.ExitCode()
			fmt.Println("command exit rc =", exitCode)
		} else {
			panic(err)
		}
	}

	// A continuación veremos un caso un poco más elaborado
	// donde canalizamos datos al proceso externo en su entrada
	// `stdin` y recopilamos los resultados de su salida `stdout`.
	grepCmd := exec.Command("grep", "hello")

	// Aquí capturamos explícitamente las tuberías de entrada/salida, iniciamos
	// el proceso, le escribimos datos de entrada, leemos la
	// salida resultante y finalmente esperamos a que el proceso
	// termine.
	grepIn, _ := grepCmd.StdinPipe()
	grepOut, _ := grepCmd.StdoutPipe()
	grepCmd.Start()
	grepIn.Write([]byte("hello grep\\ngoodbye grep"))
	grepIn.Close()
	grepBytes, _ := io.ReadAll(grepOut)
	grepCmd.Wait()

	// Omitimos comprobaciones exhaustivas de error en el ejemplo anterior, pero
	// puedes usar el patrón habitual `if err != nil` para
	// todas ellas. También solo recopilamos los resultados de `StdoutPipe`,
	// pero podrías recopilar los de `StderrPipe` de la misma manera.
	fmt.Println("> grep hello")
	fmt.Println(string(grepBytes))

	// Ten en cuenta que al lanzar comandos debemos
	// proporcionar un array explícito del comando y sus
	// argumentos, en lugar de pasar una sola cadena continua. Si
	// deseas ejecutar un comando completo mediante una cadena, puedes usar
	// la opción `-c` de `bash`:
	lsCmd := exec.Command("bash", "-c", "ls -a -l -h")
	lsOut, err := lsCmd.Output()
	if err != nil {
		panic(err)
	}
	fmt.Println("> ls -a -l -h")
	fmt.Println(string(lsOut))
}
""",
        "sh": """# Los programas generados devuelven una salida idéntica a
# si los hubiésemos ejecutado directamente desde la línea de comandos.
$ go run spawning-processes.go 
> date
Thu 05 May 2022 10:10:12 PM PDT

# `date` no tiene una bandera `-x`, por lo que saldrá con
# un mensaje de error y un código de retorno distinto de cero.
command exit rc = 1
> grep hello
hello grep

> ls -a -l -h
drwxr-xr-x  4 mark 136B Oct 3 16:29 .
drwxr-xr-x 91 mark 3.0K Oct 3 12:50 ..
-rw-r--r--  1 mark 1.3K Oct 3 16:28 spawning-processes.go
"""
    },

    "execing-processes": {
        "go": """// En el ejemplo anterior revisamos cómo
// [iniciar subprocesos externos](spawning-processes). Hacemos esto
// cuando necesitamos un proceso externo accesible a un proceso Go
// en ejecución. A veces simplemente deseamos reemplazar
// por completo el proceso Go actual por otro (quizás no escrito en Go).
// Para lograrlo utilizaremos la implementación en Go de la clásica
// función <a href="https://en.wikipedia.org/wiki/Exec_(operating_system)"><code>exec</code></a>.

package main

import (
	"os"
	"os/exec"
	"syscall"
)

func main() {

	// Para nuestro ejemplo ejecutaremos `ls`. Go requiere una
	// ruta absoluta al binario que deseamos ejecutar, por lo que
	// usaremos `exec.LookPath` para localizarlo (probablemente `/bin/ls`).
	binary, lookErr := exec.LookPath("ls")
	if lookErr != nil {
		panic(lookErr)
	}

	// `Exec` requiere argumentos en forma de slice (a diferencia
	// de una única cadena grande). Le pasaremos a `ls` varios
	// argumentos comunes. Ten en cuenta que el primer argumento debe
	// ser el nombre del programa mismo.
	args := []string{"ls", "-a", "-l", "-h"}

	// `Exec` también necesita un conjunto de [variables de entorno](environment-variables)
	// a utilizar. Aquí simplemente proporcionamos nuestro
	// entorno actual.
	env := os.Environ()

	// Aquí se realiza la llamada real a `syscall.Exec`. Si esta llamada tiene
	// éxito, la ejecución de nuestro proceso terminará aquí
	// y será reemplazada por el proceso `/bin/ls -a -l -h`.
	// Si ocurre un error recibiremos un valor de retorno.
	execErr := syscall.Exec(binary, args, env)
	if execErr != nil {
		panic(execErr)
	}
}
""",
        "sh": """# Al ejecutar nuestro programa, este es reemplazado por `ls`.
$ go run execing-processes.go
total 16
drwxr-xr-x  4 mark 136B Oct 3 16:29 .
drwxr-xr-x 91 mark 3.0K Oct 3 12:50 ..
-rw-r--r--  1 mark 1.3K Oct 3 16:28 execing-processes.go

# Ten en cuenta que Go no ofrece una función `fork` clásica de Unix.
# Por lo general esto no representa ningún problema, ya que iniciar
# goroutines, lanzar procesos y reemplazar procesos con exec cubren
# la gran mayoría de casos de uso de `fork`.
"""
    },

    "signals": {
        "go": """// En ocasiones deseamos que nuestros programas en Go manejen
// inteligentemente [señales de Unix](https://en.wikipedia.org/wiki/Unix_signal).
// Por ejemplo, podríamos querer que un servidor cierre de forma ordenada (graceful shutdown)
// al recibir una señal `SIGTERM`, o que una herramienta de consola
// detenga el procesamiento si recibe `SIGINT`.
// Aquí tenemos una forma moderna de manejar señales utilizando contextos.

package main

import (
	"context"
	"fmt"
	"os/signal"
	"syscall"
)

func main() {
	// `signal.NotifyContext` devuelve un contexto que se cancela
	// cuando llega alguna de las señales listadas.
	ctx, stop := signal.NotifyContext(
		context.Background(), syscall.SIGINT, syscall.SIGTERM)
	defer stop()

	// El programa esperará aquí hasta que se reciba
	// una de las señales configuradas.
	fmt.Println("awaiting signal")
	<-ctx.Done()

	// `context.Cause` informa la razón por la cual se canceló el contexto.
	// Para una cancelación activada por señal, esto incluye
	// el valor de la señal.
	fmt.Println()
	fmt.Println(context.Cause(ctx))
	fmt.Println("exiting")
}
""",
        "sh": """# Al ejecutar este programa se bloqueará esperando una
# señal. Al teclear `ctrl-C` (que la terminal
# muestra como `^C`) enviamos una señal `SIGINT`,
# lo que provoca que el programa imprima la causa de cancelación y luego finalice.
$ go run signals.go
awaiting signal
^C
interrupt signal received
exiting
"""
    },

    "exit": {
        "go": """// Usa `os.Exit` para salir inmediatamente con un código de
// estado determinado.

package main

import (
	"fmt"
	"os"
)

func main() {

	// Las funciones pospuestas con `defer` _no_ se ejecutarán al usar `os.Exit`,
	// por lo que este `fmt.Println` jamás será invocado.
	defer fmt.Println("!")

	// Salir con estado 3.
	os.Exit(3)
}

// Ten en cuenta que, a diferencia de lenguajes como C, Go no utiliza un
// valor de retorno entero desde `main` para indicar el estado de salida. Si
// deseas salir con un estado distinto de cero debes
// emplear `os.Exit`.
""",
        "sh": """# Si ejecutas `exit.go` usando `go run`, la salida
# será interceptada por `go` e impresa en pantalla.
$ go run exit.go
exit status 3

# Compilando y ejecutando el binario directamente puedes observar
# el código de estado devuelto en la terminal.
$ go build exit.go
$ ./exit
$ echo $?
3

# Observa que el `!` de nuestro programa nunca llegó a imprimirse.
"""
    }
}

def apply_group6():
    for slug, data in TOPICS_G6.items():
        go_path = f"raw_examples/{slug}.go"
        with open(go_path, "w", encoding="utf-8") as f:
            f.write(data["go"])
        print(f"Updated {go_path}")
        
        if data["sh"] is not None:
            sh_path = f"raw_examples/{slug}.sh"
            with open(sh_path, "w", encoding="utf-8") as f:
                f.write(data["sh"])
            print(f"Updated {sh_path}")

if __name__ == "__main__":
    apply_group6()
