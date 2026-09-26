// En un ejemplo [anterior](range-over-built-in-types) vimos cómo `for` y
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
