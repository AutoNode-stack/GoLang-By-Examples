// En Go, un _array_ (arreglo) es una secuencia numerada de elementos de una
// longitud específica. En el código idiomático de Go, los [slices](slices) son
// mucho más comunes; los arrays son útiles en algunos escenarios
// particulares de memoria contigua.

package main

import "fmt"

func main() {

	// Aquí creamos un array `a` que contendrá exactamente
	// 5 valores de tipo `int`. Tanto el tipo de los elementos como la longitud
	// forman parte del tipo del array. Por defecto, un array tiene el
	// valor cero, que para los `int` representa `0`.
	var a [5]int
	fmt.Println("emp:", a)

	// Podemos establecer un valor en un índice mediante la
	// sintaxis `array[index] = value`, y obtener un valor con
	// `array[index]`.
	a[4] = 100
	fmt.Println("set:", a)
	fmt.Println("get:", a[4])

	// La función incorporada `len` devuelve la longitud de un array.
	fmt.Println("len:", len(a))

	// Usa esta sintaxis para declarar e inicializar un array
	// en una sola línea.
	b := [5]int{1, 2, 3, 4, 5}
	fmt.Println("dcl:", b)

	// También puedes hacer que el compilador cuente la cantidad de
	// elementos automáticamente utilizando `...`
	b = [...]int{1, 2, 3, 4, 5}
	fmt.Println("dcl:", b)

	// Si especificas el índice con `:`, los elementos
	// intermedios se rellenarán con ceros.
	b = [...]int{100, 3: 400, 500}
	fmt.Println("idx:", b)

	// Los tipos de array son unidimensionales, pero puedes
	// componer tipos para construir estructuras de datos
	// multidimensionales.
	var twoD [2][3]int
	for i := range 2 {
		for j := range 3 {
			twoD[i][j] = i + j
		}
	}
	fmt.Println("2d: ", twoD)

	// También puedes crear e inicializar arrays multidimensionales
	// de una sola vez.
	twoD = [2][3]int{
		{1, 2, 3},
		{1, 2, 3},
	}
	fmt.Println("2d: ", twoD)
}
