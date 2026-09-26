// Los _maps_ (mapas) son el [tipo de dato asociativo](https://en.wikipedia.org/wiki/Associative_array)
// integrado en Go (a veces denominados _hashes_ o _diccionarios_ en otros lenguajes).

package main

import (
	"fmt"
	"maps"
)

func main() {

	// Para crear un mapa vacío, usa la función incorporada `make`:
	// `make(map[key-type]val-type)`.
	m := make(map[string]int)

	// Establece pares clave/valor usando la sintaxis habitual
	// `name[key] = val`.
	m["k1"] = 7
	m["k2"] = 13

	// Imprimir un mapa con `fmt.Println` mostrará todos sus
	// pares clave/valor.
	fmt.Println("map:", m)

	// Obtén el valor de una clave con `name[key]`.
	v1 := m["k1"]
	fmt.Println("v1:", v1)

	// Si la clave no existe, se devuelve el
	// [valor cero](https://go.dev/ref/spec#The_zero_value) del
	// tipo de valor correspondiente.
	v3 := m["k3"]
	fmt.Println("v3:", v3)

	// La función incorporada `len` devuelve el número de pares
	// clave/valor cuando se invoca sobre un mapa.
	fmt.Println("len:", len(m))

	// La función incorporada `delete` elimina pares clave/valor
	// de un mapa.
	delete(m, "k2")
	fmt.Println("map:", m)

	// Para eliminar *todos* los pares clave/valor de un mapa, utiliza
	// la función incorporada `clear`.
	clear(m)
	fmt.Println("map:", m)

	// El segundo valor de retorno opcional al obtener un valor
	// de un mapa indica si la clave estaba presente
	// en el mapa. Esto permite desambiguar entre claves inexistentes
	// y claves con valores cero como `0` o `""`.
	// Aquí no necesitábamos el valor en sí, por lo que lo ignoramos
	// con el _identificador en blanco_ `_`.
	_, prs := m["k2"]
	fmt.Println("prs:", prs)

	// También puedes declarar e inicializar un mapa nuevo en
	// la misma línea con esta sintaxis.
	n := map[string]int{"foo": 1, "bar": 2}
	fmt.Println("map:", n)

	// El paquete `maps` contiene una variedad de funciones
	// de utilidad convenientes para mapas.
	n2 := map[string]int{"foo": 1, "bar": 2}
	if maps.Equal(n, n2) {
		fmt.Println("n == n2")
	}
}
