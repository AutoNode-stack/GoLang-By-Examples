// Los _tiempos de espera_ (timeouts) son vitales para programas que se conectan a
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
