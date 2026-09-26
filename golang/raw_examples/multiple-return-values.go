// Go cuenta con soporte integrado para _valores de retorno múltiples_.
// Esta característica se usa con frecuencia en Go idiomático, por ejemplo
// para retornar tanto el resultado como el valor de error desde una función.

package main

import "fmt"

// El `(int, int)` en la firma de esta función indica que
// la función retorna 2 valores de tipo `int`.
func vals() (int, int) {
	return 3, 7
}

func main() {

	// Aquí utilizamos los 2 valores de retorno distintos de la
	// llamada mediante una _asignación múltiple_.
	a, b := vals()
	fmt.Println(a)
	fmt.Println(b)

	// Si solo deseas un subconjunto de los valores retornados,
	// utiliza el identificador en blanco `_`.
	_, c := vals()
	fmt.Println(c)
}
