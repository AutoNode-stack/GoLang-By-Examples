// Las [_funciones variádicas_](https://en.wikipedia.org/wiki/Variadic_function)
// pueden invocarse con cualquier número de argumentos finales.
// Por ejemplo, `fmt.Println` es una función variádica habitual.

package main

import "fmt"

// Aquí tenemos una función que aceptará un número arbitrario
// de enteros `int` como argumentos.
func sum(nums ...int) {
	fmt.Print(nums, " ")
	total := 0
	// Dentro de la función, el tipo de `nums` es
	// equivalente a `[]int`. Podemos invocar `len(nums)`,
	// iterar sobre él con `range`, etc.
	for _, num := range nums {
		total += num
	}
	fmt.Println(total)
}

func main() {

	// Las funciones variádicas pueden invocarse de la forma convencional
	// con argumentos individuales separados por comas.
	sum(1, 2)
	sum(1, 2, 3)

	// Si ya dispones de múltiples argumentos dentro de un slice,
	// aplícalos a una función variádica usando la sintaxis
	// `func(slice...)` de esta manera.
	nums := []int{1, 2, 3, 4}
	sum(nums...)
}
