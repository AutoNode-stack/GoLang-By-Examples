// La biblioteca estándar de Go proporciona excelentes
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
