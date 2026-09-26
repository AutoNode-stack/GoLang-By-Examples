// Go admite
// <a href="https://en.wikipedia.org/wiki/Recursion_(computer_science)"><em>funciones recursivas</em></a>.
// Aquí tenemos un ejemplo clásico de cálculo factorial.

package main

import "fmt"

// Esta función `fact` se llama a sí misma hasta alcanzar el
// caso base de `fact(0)`.
func fact(n int) int {
	if n == 0 {
		return 1
	}
	return n * fact(n-1)
}

func main() {
	fmt.Println(fact(7))

	// Las funciones anónimas también pueden ser recursivas, pero esto requiere
	// declarar explícitamente una variable con `var` para almacenar
	// la función antes de definirla.
	var fib func(n int) int

	fib = func(n int) int {
		if n < 2 {
			return n
		}

		// Dado que `fib` fue declarada previamente en `main`, Go
		// sabe exactamente a qué función llamar con `fib` aquí.
		return fib(n-1) + fib(n-2)
	}

	fmt.Println(fib(7))
}
