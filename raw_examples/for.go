// `for` es la única estructura de bucle en Go. Aquí se presentan
// algunos tipos básicos de bucles `for`.

package main

import "fmt"

func main() {

	// El tipo más básico, con una única condición.
	i := 1
	for i <= 3 {
		fmt.Println(i)
		i = i + 1
	}

	// Un bucle `for` clásico con inicialización/condición/paso posterior.
	for j := 0; j < 3; j++ {
		fmt.Println(j)
	}

	// Otra forma de lograr la iteración básica de "hacer esto N veces"
	// es usar `range` sobre un número entero.
	for i := range 3 {
		fmt.Println("range", i)
	}

	// Un `for` sin condición iterará repetidamente hasta que
	// uses `break` para salir del bucle o `return` para retornar
	// desde la función contenedora.
	for {
		fmt.Println("loop")
		break
	}

	// También puedes usar `continue` para avanzar a la siguiente iteración
	// del bucle.
	for n := range 6 {
		if n%2 == 0 {
			continue
		}
		fmt.Println(n)
	}
}
