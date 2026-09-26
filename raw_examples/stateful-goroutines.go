// En el ejemplo previo utilizamos bloqueos explícitos con
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
