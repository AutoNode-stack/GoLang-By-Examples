// Una _goroutine_ es un hilo ligero de ejecución gestionado por el runtime de Go.

package main

import (
	"fmt"
	"time"
)

func f(from string) {
	for i := range 3 {
		fmt.Println(from, ":", i)
	}
}

func main() {

	// Supongamos que tenemos una llamada a función `f(s)`. Así es como
	// la llamaríamos de la manera habitual, ejecutándola
	// de forma síncrona.
	f("direct")

	// Para invocar esta función en una goroutine, usa
	// `go f(s)`. Esta nueva goroutine se ejecutará
	// de manera concurrente con la función invocadora.
	go f("goroutine")

	// También puedes iniciar una goroutine para una llamada
	// a función anónima.
	go func(msg string) {
		fmt.Println(msg)
	}("going")

	// Nuestras dos llamadas a función se están ejecutando asíncronamente en
	// goroutines separadas en este momento. Esperamos a que terminen
	// (para un enfoque más robusto y profesional, usa un [WaitGroup](waitgroups)).
	time.Sleep(time.Second)
	fmt.Println("done")
}
