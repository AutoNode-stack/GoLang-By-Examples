// La sentencia _select_ de Go te permite esperar sobre múltiples operaciones
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
