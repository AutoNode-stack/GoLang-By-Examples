// Las _funciones_ son una pieza central en Go. Aprenderemos sobre
// funciones mediante varios ejemplos distintos.

package main

import "fmt"

// Aquí tenemos una función que toma dos `int` y devuelve
// su suma como un `int`.
func plus(a int, b int) int {

	// Go requiere retornos explícitos; es decir, no retornará
	// automáticamente el valor de la última expresión evaluada.
	return a + b
}

// Cuando tienes múltiples parámetros consecutivos del
// mismo tipo, puedes omitir el nombre del tipo para los
// parámetros con tipos idénticos hasta el parámetro final que
// declara el tipo.
func plusPlus(a, b, c int) int {
	return a + b + c
}

func main() {

	// Llama a una función de la manera habitual, con
	// `name(args)`.
	res := plus(1, 2)
	fmt.Println("1+2 =", res)

	res = plusPlus(1, 2, 3)
	fmt.Println("1+2+3 =", res)
}
