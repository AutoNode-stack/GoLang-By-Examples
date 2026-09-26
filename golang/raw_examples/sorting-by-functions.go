// En ocasiones necesitaremos ordenar una colección según un criterio
// diferente a su orden natural. Por ejemplo, supongamos que
// deseamos ordenar cadenas por su longitud en lugar de hacerlo
// alfabéticamente. Aquí tenemos un ejemplo de ordenamiento personalizado
// en Go.

package main

import (
	"cmp"
	"fmt"
	"slices"
)

func main() {
	fruits := []string{"peach", "banana", "kiwi"}

	// Implementamos una función de comparación para la longitud
	// de las cadenas. `cmp.Compare` resulta muy conveniente para esto.
	lenCmp := func(a, b string) int {
		return cmp.Compare(len(a), len(b))
	}

	// Ahora podemos invocar `slices.SortFunc` con esta función de
	// comparación personalizada para ordenar `fruits` según la longitud del nombre.
	slices.SortFunc(fruits, lenCmp)
	fmt.Println(fruits)

	// Podemos utilizar la misma técnica para ordenar un slice de
	// valores que no sean tipos primitivos.
	type Person struct {
		name string
		age  int
	}

	people := []Person{
		Person{name: "Jax", age: 37},
		Person{name: "TJ", age: 25},
		Person{name: "Alex", age: 72},
	}

	// Ordenamos `people` por edad utilizando `slices.SortFunc`.
	//
	// Nota: si el struct `Person` es grande,
	// es recomendable que el slice contenga `*Person` en su lugar
	// y ajustar la función de comparación adecuadamente. ¡Ante la
	// duda, realiza un [benchmark](testing-and-benchmarking)!
	slices.SortFunc(people,
		func(a, b Person) int {
			return cmp.Compare(a.age, b.age)
		})
	fmt.Println(people)
}
