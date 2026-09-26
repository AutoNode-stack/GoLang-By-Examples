# -*- coding: utf-8 -*-
import os

TOPICS_G3 = {
    "channel-synchronization": {
        "go": """// Podemos usar canales para sincronizar la ejecución
// entre distintas goroutines. Aquí tenemos un ejemplo de cómo usar una
// recepción bloqueante para esperar a que una goroutine finalice.
// Al esperar que terminen múltiples goroutines,
// suele ser preferible utilizar un [WaitGroup](waitgroups).

package main

import (
	"fmt"
	"time"
)

// Esta es la función que ejecutaremos en una goroutine. El
// canal `done` se utilizará para notificar a otra
// goroutine que el trabajo de esta función ha finalizado.
func worker(done chan bool) {
	fmt.Print("working...")
	time.Sleep(time.Second)
	fmt.Println("done")

	// Enviamos un valor para notificar que hemos terminado.
	done <- true
}

func main() {

	// Iniciamos una goroutine trabajadora, entregándole el canal para
	// que nos notifique.
	done := make(chan bool, 1)
	go worker(done)

	// Nos bloqueamos hasta recibir la notificación de la
	// goroutine trabajadora a través del canal.
	<-done
}
""",
        "sh": """$ go run channel-synchronization.go      
working...done                  

# Si eliminaras la línea `<- done` de este programa,
# el programa podría terminar antes de que el `worker` finalizara
# su trabajo, o en algunos casos incluso antes de que comenzara.
"""
    },

    "channel-directions": {
        "go": """// Al usar canales como parámetros de funciones, puedes
// especificar si el canal está destinado únicamente a enviar o a recibir
// valores. Esta especificidad incrementa la seguridad de tipos
// del programa en tiempo de compilación.

package main

import "fmt"

// Esta función `ping` solo acepta un canal para enviar
// valores. Intentar recibir desde este canal generaría
// un error en tiempo de compilación.
func ping(pings chan<- string, msg string) {
	pings <- msg
}

// La función `pong` acepta un canal para recepciones
// (`pings`) y un segundo canal para envíos (`pongs`).
func pong(pings <-chan string, pongs chan<- string) {
	msg := <-pings
	pongs <- msg
}

func main() {
	pings := make(chan string, 1)
	pongs := make(chan string, 1)
	ping(pings, "passed message")
	pong(pings, pongs)
	fmt.Println(<-pongs)
}
""",
        "sh": None
    },

    "select": {
        "go": """// La sentencia _select_ de Go te permite esperar sobre múltiples operaciones
// de canales. Combinar goroutines y canales con
// select constituye una de las características más potentes de Go.

package main

import (
	"fmt"
	"time"
)

func main() {

	// Para nuestro ejemplo haremos un select sobre dos canales.
	c1 := make(chan string)
	c2 := make(chan string)

	// Cada canal recibirá un valor después de cierto tiempo,
	// para simular, por ejemplo, operaciones RPC bloqueantes
	// ejecutándose en goroutines concurrentes.
	go func() {
		time.Sleep(1 * time.Second)
		c1 <- "one"
	}()
	go func() {
		time.Sleep(2 * time.Second)
		c2 <- "two"
	}()

	// Usaremos `select` para esperar ambos valores de forma
	// simultánea, imprimiendo cada uno a medida que arribe.
	for range 2 {
		select {
		case msg1 := <-c1:
			fmt.Println("received", msg1)
		case msg2 := <-c2:
			fmt.Println("received", msg2)
		}
	}
}
""",
        "sh": """# Recibimos los valores `"one"` y luego `"two"` como
# se esperaba.
$ time go run select.go 
received one
received two

# Ten en cuenta que el tiempo total de ejecución es de apenas ~2 segundos,
# ya que ambos `Sleep` de 1 y 2 segundos se ejecutan de
# forma concurrente.
real	0m2.245s
"""
    },

    "timeouts": {
        "go": """// Los _tiempos de espera_ (timeouts) son vitales para programas que se conectan a
// recursos externos o que de algún modo necesitan acotar
// el tiempo de ejecución. Implementar timeouts en Go es sencillo y
// elegante gracias a los canales y a la sentencia `select`.

package main

import (
	"fmt"
	"time"
)

func main() {

	// Para nuestro ejemplo, supongamos que ejecutamos una llamada
	// externa que retorna su resultado en un canal `c1`
	// tras 2s. Nota que el canal tiene búfer, por lo que el
	// envío en la goroutine no es bloqueante. Este es un
	// patrón común para prevenir fugas de goroutines (goroutine leaks) si el
	// canal nunca llega a leerse.
	c1 := make(chan string, 1)
	go func() {
		time.Sleep(2 * time.Second)
		c1 <- "result 1"
	}()

	// Aquí está el `select` que implementa el tiempo de espera.
	// `res := <-c1` aguarda el resultado y `<-time.After`
	// aguarda el envío de un valor tras un timeout de
	// 1s. Dado que `select` procede con la primera
	// recepción lista, tomaremos el caso de timeout
	// si la operación demora más del segundo permitido.
	select {
	case res := <-c1:
		fmt.Println(res)
	case <-time.After(1 * time.Second):
		fmt.Println("timeout 1")
	}

	// Si permitimos un timeout más holgado de 3s, la recepción
	// desde `c2` tendrá éxito e imprimiremos el resultado.
	c2 := make(chan string, 1)
	go func() {
		time.Sleep(2 * time.Second)
		c2 <- "result 2"
	}()
	select {
	case res := <-c2:
		fmt.Println(res)
	case <-time.After(3 * time.Second):
		fmt.Println("timeout 2")
	}
}
""",
        "sh": """# Ejecutar este programa muestra cómo la primera operación agota el tiempo
# de espera (timeout) y la segunda culmina con éxito.
$ go run timeouts.go 
timeout 1
result 2
"""
    },

    "non-blocking-channel-operations": {
        "go": """// Los envíos y recepciones básicos en canales son bloqueantes.
// Sin embargo, podemos usar `select` con una cláusula `default` para
// implementar envíos, recepciones e incluso selects multidireccionales
// _no bloqueantes_.

package main

import "fmt"

func main() {
	messages := make(chan string)
	signals := make(chan bool)

	// Aquí tenemos una recepción no bloqueante. Si un valor está
	// disponible en `messages`, el `select` tomará el
	// `case <-messages` con dicho valor. De lo contrario,
	// tomará inmediatamente la rama `default`.
	select {
	case msg := <-messages:
		fmt.Println("received message", msg)
	default:
		fmt.Println("no message received")
	}

	// Un envío no bloqueante opera de manera análoga. Aquí `msg`
	// no puede enviarse al canal `messages`, porque
	// el canal carece de búfer y no hay ningún receptor presente.
	// Por ende, se selecciona la rama `default`.
	msg := "hi"
	select {
	case messages <- msg:
		fmt.Println("sent message", msg)
	default:
		fmt.Println("no message sent")
	}

	// Podemos usar múltiples cláusulas `case` antes de la rama
	// `default` para implementar un select no bloqueante multidireccional.
	// Aquí intentamos recepciones no bloqueantes tanto
	// en `messages` como en `signals`.
	select {
	case msg := <-messages:
		fmt.Println("received message", msg)
	case sig := <-signals:
		fmt.Println("received signal", sig)
	default:
		fmt.Println("no activity")
	}
}
""",
        "sh": None
    },

    "closing-channels": {
        "go": """// _Cerrar_ un canal indica que ya no se enviarán más valores
// a través de él. Esto resulta muy útil para comunicar
// la finalización del trabajo a los receptores del canal.

package main

import "fmt"

// En este ejemplo utilizaremos un canal `jobs` para comunicar
// el trabajo a realizar desde la goroutine `main()` a una
// goroutine trabajadora. Cuando ya no tengamos más trabajos para
// el trabajador, haremos un `close` sobre el canal `jobs`.
func main() {
	jobs := make(chan int, 5)
	done := make(chan bool)

	// Aquí está la goroutine trabajadora. Recibe repetidamente
	// de `jobs` mediante `j, more := <-jobs`. En esta variante
	// de recepción con dos valores, `more` será `false` si
	// `jobs` ha sido cerrado y todos los valores en el canal
	// ya han sido recibidos. Usamos esto para notificar en
	// `done` una vez que hayamos procesado todos los trabajos.
	go func() {
		for {
			j, more := <-jobs
			if more {
				fmt.Println("received job", j)
			} else {
				fmt.Println("received all jobs")
				done <- true
				return
			}
		}
	}()

	// Esto envía 3 trabajos al trabajador a través del canal
	// `jobs`, y luego lo cierra.
	for j := 1; j <= 3; j++ {
		jobs <- j
		fmt.Println("sent job", j)
	}
	close(jobs)
	fmt.Println("sent all jobs")

	// Esperamos al trabajador usando el enfoque de
	// [sincronización](channel-synchronization) que vimos anteriormente.
	<-done

	// Leer de un canal cerrado tiene éxito inmediatamente,
	// devolviendo el valor cero del tipo subyacente.
	// El segundo valor de retorno opcional es `true` si el
	// valor recibido provino de una operación de envío exitosa,
	// o `false` si es un valor cero generado porque el canal
	// está cerrado y vacío.
	_, ok := <-jobs
	fmt.Println("received more jobs:", ok)
}
""",
        "sh": """$ go run closing-channels.go 
sent job 1
received job 1
sent job 2
received job 2
sent job 3
received job 3
sent all jobs
received all jobs
received more jobs: false

# El concepto de canales cerrados nos conduce de forma natural a nuestro próximo
# ejemplo: iteración con `range` sobre canales.
"""
    },

    "range-over-channels": {
        "go": """// En un ejemplo [anterior](range-over-built-in-types) vimos cómo `for` y
// `range` proporcionan iteración sobre estructuras de datos básicas.
// También podemos usar esta sintaxis para iterar sobre
// los valores recibidos de un canal.

package main

import "fmt"

func main() {

	// Iteraremos sobre 2 valores en el canal `queue`.
	queue := make(chan string, 2)
	queue <- "one"
	queue <- "two"
	close(queue)

	// Este bucle `range` itera sobre cada elemento a medida que se
	// recibe desde `queue`. Dado que cerramos (`close`) el
	// canal arriba, la iteración concluye tras recibir
	// los 2 elementos existentes.
	for elem := range queue {
		fmt.Println(elem)
	}
}
""",
        "sh": """$ go run range-over-channels.go
one
two

# Este ejemplo también demostró que es posible cerrar
# un canal no vacío y aún así recibir todos los valores
# restantes en su búfer.
"""
    },

    "timers": {
        "go": """// A menudo deseamos ejecutar código en Go en algún punto del
// futuro, o repetidamente en un intervalo determinado. Las funciones
// integradas de _timers_ (temporizadores) y _tickers_ facilitan
// enormemente ambas tareas. Primero veremos los temporizadores y luego
// los [tickers](tickers).

package main

import (
	"fmt"
	"time"
)

func main() {

	// Los temporizadores representan un único evento en el futuro. Le
	// indicas al temporizador cuánto tiempo deseas esperar, y este
	// proporciona un canal que será notificado en ese momento exacto.
	// Este temporizador esperará 2 segundos.
	timer1 := time.NewTimer(2 * time.Second)

	// El `<-timer1.C` se bloquea en el canal `C` del temporizador
	// hasta que este envía un valor indicando que el tiempo ha expirado.
	<-timer1.C
	fmt.Println("Timer 1 fired")

	// Si únicamente quisieras esperar, podrías haber empleado
	// `time.Sleep`. Una razón por la cual un temporizador es tan útil es
	// que puedes cancelarlo antes de que expire.
	// Aquí tenemos un ejemplo de cancelación.
	timer2 := time.NewTimer(time.Second)
	go func() {
		<-timer2.C
		fmt.Println("Timer 2 fired")
	}()
	stop2 := timer2.Stop()
	if stop2 {
		fmt.Println("Timer 2 stopped")
	}

	// Damos a `timer2` suficiente tiempo para dispararse (en caso de que
	// no se hubiera detenido), demostrando así que en efecto fue cancelado.
	time.Sleep(2 * time.Second)
}
""",
        "sh": """# El primer temporizador expirará ~2s después de iniciar el
# programa, pero el segundo se detendrá antes de que tenga oportunidad
# de dispararse.
$ go run timers.go
Timer 1 fired
Timer 2 stopped
"""
    },

    "tickers": {
        "go": """// Los [temporizadores](timers) sirven cuando deseas realizar
// una acción una vez en el futuro; los _tickers_ son para cuando
// necesitas realizar una tarea repetidamente a intervalos
// regulares. Aquí hay un ejemplo de un ticker que emite pulsos
// periódicamente hasta que decidimos detenerlo.

package main

import (
	"fmt"
	"time"
)

func main() {

	// Los tickers utilizan un mecanismo similar a los temporizadores: un
	// canal al cual se le envían valores periódicos. Aquí usaremos la sentencia
	// `select` sobre el canal para aguardar los
	// valores a medida que llegan cada 500ms.
	ticker := time.NewTicker(500 * time.Millisecond)
	done := make(chan bool)

	go func() {
		for {
			select {
			case <-done:
				return
			case t := <-ticker.C:
				fmt.Println("Tick at", t)
			}
		}
	}()

	// Los tickers se pueden detener al igual que los temporizadores. Una vez que un ticker
	// se detiene, no recibirá más valores en su
	// canal. Detendremos el nuestro transcurridos 1600ms.
	time.Sleep(1600 * time.Millisecond)
	ticker.Stop()
	done <- true
	fmt.Println("Ticker stopped")
}
""",
        "sh": """# Al ejecutar este programa, el ticker emitirá 3 pulsos
# antes de que lo detengamos.
$ go run tickers.go
Tick at 2012-09-23 11:29:56.487625 -0700 PDT
Tick at 2012-09-23 11:29:56.988063 -0700 PDT
Tick at 2012-09-23 11:29:57.488076 -0700 PDT
Ticker stopped
"""
    },

    "worker-pools": {
        "go": """// En este ejemplo veremos cómo implementar
// un _pool de trabajadores_ (worker pool) utilizando goroutines y canales.

package main

import (
	"fmt"
	"time"
)

// Aquí está el trabajador, del cual ejecutaremos varias
// instancias concurrentes. Estos trabajadores recibirán
// tareas en el canal `jobs` y enviarán los resultados
// correspondientes en `results`. Haremos una pausa de un segundo por tarea
// para simular un proceso computacionalmente costoso.
func worker(id int, jobs <-chan int, results chan<- int) {
	for j := range jobs {
		fmt.Println("worker", id, "started  job", j)
		time.Sleep(time.Second)
		fmt.Println("worker", id, "finished job", j)
		results <- j * 2
	}
}

func main() {

	// Para usar nuestro grupo de trabajadores necesitamos enviarles
	// tareas y recopilar sus resultados. Creamos 2 canales para ello.
	const numJobs = 5
	jobs := make(chan int, numJobs)
	results := make(chan int, numJobs)

	// Esto inicia 3 trabajadores, inicialmente bloqueados
	// debido a que aún no hay tareas en la cola.
	for w := 1; w <= 3; w++ {
		go worker(w, jobs, results)
	}

	// Aquí enviamos 5 `jobs` y luego cerramos (`close`) ese
	// canal para indicar que hemos enviado todo el trabajo disponible.
	for j := 1; j <= numJobs; j++ {
		jobs <- j
	}
	close(jobs)

	// Finalmente recopilamos todos los resultados del procesamiento.
	// Esto también garantiza que las goroutines trabajadoras hayan
	// culminado su labor. Una alternativa para aguardar múltiples
	// goroutines es emplear un [WaitGroup](waitgroups).
	for a := 1; a <= numJobs; a++ {
		<-results
	}
}
""",
        "sh": """# El programa en ejecución muestra las 5 tareas siendo procesadas por
# diversos trabajadores concurrentes. El programa toma únicamente unos 2 segundos
# a pesar de realizar 5 segundos de trabajo total acumulado, ya que
# hay 3 trabajadores operando de manera simultánea.
$ time go run worker-pools.go 
worker 1 started  job 1
worker 2 started  job 2
worker 3 started  job 3
worker 1 finished job 1
worker 1 started  job 4
worker 2 finished job 2
worker 2 started  job 5
worker 3 finished job 3
worker 1 finished job 4
worker 2 finished job 5

real	0m2.358s
"""
    },

    "waitgroups": {
        "go": """// Para esperar a que múltiples goroutines concluyan su ejecución,
// podemos utilizar un *wait group* (`sync.WaitGroup`).

package main

import (
	"fmt"
	"sync"
	"time"
)

// Esta es la función que ejecutaremos en cada goroutine.
func worker(id int) {
	fmt.Printf("Worker %d starting\\n", id)

	// Pausa para simular una tarea pesada.
	time.Sleep(time.Second)
	fmt.Printf("Worker %d done\\n", id)
}

func main() {

	// Este WaitGroup se utiliza para esperar a que terminen todas las
	// goroutines iniciadas aquí. Nota: si un WaitGroup se pasa explícitamente
	// a funciones, debe hacerse siempre *por puntero*.
	var wg sync.WaitGroup

	// Iniciamos varias goroutines utilizando `WaitGroup.Go`
	for i := 1; i <= 5; i++ {
		wg.Go(func() {
			worker(i)
		})
	}

	// Nos bloqueamos hasta que todas las goroutines iniciadas por `wg`
	// hayan finalizado. Una goroutine finaliza cuando su función invocada retorna.
	wg.Wait()

	// Ten en cuenta que este enfoque no proporciona una forma directa
	// de propagar errores desde los trabajadores. Para casos de uso más
	// avanzados, considera utilizar el
	// [paquete errgroup](https://pkg.go.dev/golang.org/x/sync/errgroup).
}
""",
        "sh": """$ go run waitgroups.go
Worker 5 starting
Worker 3 starting
Worker 4 starting
Worker 1 starting
Worker 2 starting
Worker 4 done
Worker 1 done
Worker 2 done
Worker 5 done
Worker 3 done

# Es muy probable que el orden en que los trabajadores inician y terminan
# varíe en cada ejecución.
"""
    },

    "rate-limiting": {
        "go": """// El [_límite de tasa_](https://en.wikipedia.org/wiki/Rate_limiting) (rate limiting)
// es un mecanismo esencial para controlar el uso de recursos
// y mantener la calidad del servicio. Go admite elegantemente
// el control de frecuencia con goroutines, canales y [tickers](tickers).

package main

import (
	"fmt"
	"time"
)

func main() {

	// Primero veremos una limitación de tasa básica. Supongamos
	// que deseamos limitar el procesamiento de peticiones entrantes.
	// Atenderemos estas solicitudes a través de un canal.
	requests := make(chan int, 5)
	for i := 1; i <= 5; i++ {
		requests <- i
	}
	close(requests)

	// Este canal `limiter` recibirá un valor
	// cada 200 milisegundos. Es el regulador en
	// nuestro esquema de control de tasa.
	limiter := time.Tick(200 * time.Millisecond)

	// Al bloquearnos en una recepción del canal `limiter`
	// antes de procesar cada solicitud, nos limitamos a
	// 1 solicitud cada 200 milisegundos.
	for req := range requests {
		<-limiter
		fmt.Println("request", req, time.Now())
	}

	// Es posible que deseemos permitir ráfagas cortas (bursts) de peticiones
	// manteniendo el límite general a largo plazo. Podemos lograrlo
	// añadiendo búfer a nuestro canal regulador. Este canal `burstyLimiter`
	// permitirá ráfagas de hasta 3 eventos consecutivos.
	burstyLimiter := make(chan time.Time, 3)

	// Llenamos el canal para representar la capacidad de ráfaga permitida.
	for range 3 {
		burstyLimiter <- time.Now()
	}

	// Cada 200 milisegundos intentaremos agregar un nuevo
	// valor a `burstyLimiter`, hasta alcanzar su límite de 3.
	go func() {
		for t := range time.Tick(200 * time.Millisecond) {
			burstyLimiter <- t
		}
	}()

	// Ahora simulamos 5 peticiones entrantes más. Las primeras
	// 3 se beneficiarán de la capacidad de ráfaga de `burstyLimiter`.
	burstyRequests := make(chan int, 5)
	for i := 1; i <= 5; i++ {
		burstyRequests <- i
	}
	close(burstyRequests)
	for req := range burstyRequests {
		<-burstyLimiter
		fmt.Println("request", req, time.Now())
	}
}
""",
        "sh": """# Al ejecutar nuestro programa vemos el primer lote de peticiones
# procesado una vez cada ~200 milisegundos según lo programado.
$ go run rate-limiting.go
request 1 2012-10-19 00:38:18.687438 +0000 UTC
request 2 2012-10-19 00:38:18.887471 +0000 UTC
request 3 2012-10-19 00:38:19.087238 +0000 UTC
request 4 2012-10-19 00:38:19.287338 +0000 UTC
request 5 2012-10-19 00:38:19.487331 +0000 UTC

# Para el segundo lote de peticiones atendemos las 3 primeras de forma
# inmediata debido al búfer de ráfaga, y luego despachamos las 2 restantes
# con demoras de ~200ms cada una.
request 1 2012-10-19 00:38:20.487578 +0000 UTC
request 2 2012-10-19 00:38:20.487645 +0000 UTC
request 3 2012-10-19 00:38:20.487676 +0000 UTC
request 4 2012-10-19 00:38:20.687483 +0000 UTC
request 5 2012-10-19 00:38:20.887542 +0000 UTC
"""
    },

    "atomic-counters": {
        "go": """// El mecanismo primordial para gestionar estado en Go es
// la comunicación a través de canales. Vimos esto, por ejemplo,
// con los [pools de trabajadores](worker-pools). Existen no obstante
// otras opciones para gestionar estado. Aquí examinaremos el uso
// del paquete `sync/atomic` para _contadores atómicos_
// accedidos por múltiples goroutines simultáneamente.

package main

import (
	"fmt"
	"sync"
	"sync/atomic"
)

func main() {

	// Usaremos un tipo entero atómico para representar nuestro
	// contador (siempre positivo).
	var ops atomic.Uint64

	// Un WaitGroup nos ayudará a esperar a que todas las goroutines
	// concluyan su trabajo.
	var wg sync.WaitGroup

	// Iniciaremos 50 goroutines que incrementarán el
	// contador exactamente 1000 veces cada una.
	for range 50 {
		wg.Go(func() {
			for range 1000 {
				// Para incrementar el contador de forma atómica usamos `Add`.
				ops.Add(1)
			}
		})
	}

	// Esperamos hasta que todas las goroutines hayan finalizado.
	wg.Wait()

	// En este punto ninguna goroutine escribe en 'ops', pero usando
	// `Load` es completamente seguro leer un valor de forma atómica incluso
	// mientras otras goroutines lo están actualizando (atómicamente).
	fmt.Println("ops:", ops.Load())
}
""",
        "sh": """# Esperamos obtener exactamente 50,000 operaciones. De haber
# utilizado un entero común sin atomicidad e incrementado con
# `ops++`, obtendríamos un número dispar y variable en cada
# ejecución debido a la interferencia entre goroutines.
# Además, registraríamos fallos por condiciones de carrera (data race)
# al compilar o ejecutar con la bandera `-race`.
$ go run atomic-counters.go
ops: 50000

# A continuación veremos los mutexes, otra herramienta esencial
# para gestionar estado concurrente.
"""
    },

    "mutexes": {
        "go": """// En el ejemplo anterior vimos cómo gestionar el estado de un contador
// simple utilizando [operaciones atómicas](atomic-counters).
// Para estados más complejos podemos recurrir a un [_mutex_](https://en.wikipedia.org/wiki/Mutual_exclusion)
// (exclusión mutua) para acceder a los datos de forma segura entre múltiples goroutines.

package main

import (
	"fmt"
	"sync"
)

// Container almacena un mapa de contadores; como deseamos
// actualizarlo concurrentemente desde múltiples goroutines,
// añadimos un `Mutex` para sincronizar el acceso.
// Ten en cuenta que los mutexes no deben copiarse; si este
// `struct` se pasa como parámetro, debe hacerse siempre
// por puntero.
type Container struct {
	mu       sync.Mutex
	counters map[string]int
}

func (c *Container) inc(name string) {
	// Bloqueamos el mutex antes de acceder a `counters`; lo liberamos
	// al final de la función mediante una sentencia [defer](defer).
	c.mu.Lock()
	defer c.mu.Unlock()
	c.counters[name]++
}

func main() {
	c := Container{
		// Observa que el valor cero de un mutex es completamente utilizable tal cual,
		// por lo que no se requiere inicialización explícita aquí.
		counters: map[string]int{"a": 0, "b": 0},
	}

	var wg sync.WaitGroup

	// Esta función incrementa un contador por nombre
	// dentro de un bucle.
	doIncrement := func(name string, n int) {
		for range n {
			c.inc(name)
		}
	}

	// Ejecutamos varias goroutines de manera concurrente; observa
	// que todas acceden al mismo `Container`, y dos de ellas
	// acceden al mismo contador "a".
	wg.Go(func() {
		doIncrement("a", 10000)
	})

	wg.Go(func() {
		doIncrement("a", 10000)
	})

	wg.Go(func() {
		doIncrement("b", 10000)
	})

	// Esperamos a que las goroutines finalicen.
	wg.Wait()
	fmt.Println(c.counters)
}
""",
        "sh": """# Ejecutar el programa demuestra que los contadores
# se actualizaron con total exactitud y sincronía.
$ go run mutexes.go
map[a:20000 b:10000]

# A continuación veremos cómo resolver esta misma tarea de gestión
# de estado empleando únicamente goroutines y canales.
"""
    },

    "stateful-goroutines": {
        "go": """// En el ejemplo previo utilizamos bloqueos explícitos con
// [mutexes](mutexes) para sincronizar el acceso a estado compartido
// entre múltiples goroutines. Otra alternativa consiste en aprovechar las
// capacidades integradas de goroutines y canales para lograr idéntico resultado.
// Este enfoque basado en canales concuerda con la filosofía de Go de compartir
// memoria comunicando, donde cada pieza de dato pertenece
// a exactamente una goroutine propietaria.

package main

import (
	"fmt"
	"math/rand"
	"sync/atomic"
	"time"
)

// En este ejemplo nuestro estado pertenecerá a una única
// goroutine. Esto garantiza que la información nunca se corrompa
// con accesos concurrentes. Para leer o escribir en ese estado,
// otras goroutines enviarán mensajes a la goroutine propietaria
// y recibirán las respuestas correspondientes. Estas estructuras
// `readOp` y `writeOp` encapsulan dichas peticiones y proporcionan un canal
// para que la goroutine propietaria responda.
type readOp struct {
	key  int
	resp chan int
}
type writeOp struct {
	key  int
	val  int
	resp chan bool
}

func main() {

	// Como antes, contabilizaremos cuántas operaciones realizamos.
	var readOps uint64
	var writeOps uint64

	// Los canales `reads` y `writes` serán utilizados por
	// otras goroutines para emitir solicitudes de lectura y escritura,
	// respectivamente.
	reads := make(chan readOp)
	writes := make(chan writeOp)

	// Aquí está la goroutine propietaria del `state`, el cual
	// es un mapa como en el ejemplo anterior pero ahora privado
	// para esta goroutine con estado. Esta goroutine realiza un
	// select repetidamente sobre los canales `reads` y `writes`,
	// respondiendo a las solicitudes según van llegando. Una respuesta
	// se ejecuta realizando primero la operación solicitada y luego
	// enviando un valor en el canal de respuesta `resp` para indicar éxito
	// (y el valor obtenido en el caso de las lecturas).
	go func() {
		var state = make(map[int]int)
		for {
			select {
			case read := <-reads:
				read.resp <- state[read.key]
			case write := <-writes:
				state[write.key] = write.val
				write.resp <- true
			}
		}
	}()

	// Esto inicia 100 goroutines para emitir lecturas hacia la
	// goroutine propietaria del estado a través del canal `reads`.
	// Cada lectura requiere construir una `readOp`, enviarla
	// por el canal `reads` y luego recibir el resultado por
	// el canal `resp` proporcionado.
	for range 100 {
		go func() {
			for {
				read := readOp{
					key:  rand.Intn(5),
					resp: make(chan int)}
				reads <- read
				<-read.resp
				atomic.AddUint64(&readOps, 1)
				time.Sleep(time.Millisecond)
			}
		}()
	}

	// Iniciamos 10 escrituras también, utilizando un
	// enfoque similar.
	for range 10 {
		go func() {
			for {
				write := writeOp{
					key:  rand.Intn(5),
					val:  rand.Intn(100),
					resp: make(chan bool)}
				writes <- write
				<-write.resp
				atomic.AddUint64(&writeOps, 1)
				time.Sleep(time.Millisecond)
			}
		}()
	}

	// Dejamos que las goroutines trabajen durante un segundo.
	time.Sleep(time.Second)

	// Finalmente capturamos e informamos el recuento de operaciones.
	readOpsFinal := atomic.LoadUint64(&readOps)
	fmt.Println("readOps:", readOpsFinal)
	writeOpsFinal := atomic.LoadUint64(&writeOps)
	fmt.Println("writeOps:", writeOpsFinal)
}
""",
        "sh": """# Ejecutar nuestro programa demuestra que el ejemplo de gestión de estado
# basado en goroutines completa aproximadamente 80,000 operaciones en total.
$ go run stateful-goroutines.go
readOps: 71708
writeOps: 7177

# Para este caso particular el enfoque basado en goroutines requirió un poco más
# de código que el basado en mutexes. No obstante, resulta sumamente útil en
# casos donde intervienen otros canales o cuando gestionar múltiples
# mutexes resultaría propenso a errores. Debes emplear el enfoque que te resulte
# más natural y garantice la corrección de tu programa.
"""
    }
}

def apply_group3():
    for slug, data in TOPICS_G3.items():
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
    apply_group3()
