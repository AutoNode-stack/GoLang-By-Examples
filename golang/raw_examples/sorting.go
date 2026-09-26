// El paquete `slices` de Go implementa funciones de ordenamiento para tipos
// primitivos y tipos definidos por el usuario. Primero examinaremos el ordenamiento
// de tipos integrados en el lenguaje.

package main

import (
	"fmt"
	"slices"
)

func main() {

	// Las funciones de ordenamiento son genéricas y funcionan con cualquier
	// tipo primitivo _ordenado_. Para consultar la lista de tipos ordenados,
	// revisa [cmp.Ordered](https://pkg.go.dev/cmp#Ordered).
	strs := []string{"c", "a", "b"}
	slices.Sort(strs)
	fmt.Println("Strings:", strs)

	// Un ejemplo de ordenamiento de enteros `int`.
	ints := []int{7, 2, 4}
	slices.Sort(ints)
	fmt.Println("Ints:   ", ints)

	// También podemos usar el paquete `slices` para verificar si
	// un slice ya se encuentra ordenado.
	s := slices.IsSorted(ints)
	fmt.Println("Sorted: ", s)
}
