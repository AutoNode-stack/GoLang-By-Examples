// `range` itera sobre los elementos en una variedad de
// estructuras de datos integradas. Veamos cómo
// usar `range` con algunas de las estructuras de datos
// que ya hemos aprendido.

package main

import "fmt"

func main() {

	// Aquí usamos `range` para sumar los números de un slice.
	// Los arrays funcionan exactamente igual.
	nums := []int{2, 3, 4}
	sum := 0
	for _, num := range nums {
		sum += num
	}
	fmt.Println("sum:", sum)

	// `range` en arrays y slices proporciona tanto el
	// índice como el valor de cada elemento. Arriba no
	// necesitábamos el índice, por lo que lo ignoramos con el
	// identificador en blanco `_`. Sin embargo, a veces sí
	// necesitamos los índices.
	for i, num := range nums {
		if num == 3 {
			fmt.Println("index:", i)
		}
	}

	// `range` en mapas itera sobre los pares clave/valor.
	kvs := map[string]string{"a": "apple", "b": "banana"}
	for k, v := range kvs {
		fmt.Printf("%s -> %s\n", k, v)
	}

	// `range` también puede iterar únicamente sobre las claves de un mapa.
	for k := range kvs {
		fmt.Println("key:", k)
	}

	// `range` en cadenas itera sobre puntos de código Unicode
	// (code points). El primer valor es el índice de byte inicial
	// de la `rune` y el segundo es la `rune` en sí misma.
	// Consulta [Cadenas y Runas](strings-and-runes) para más
	// detalles.
	for i, c := range "go" {
		fmt.Println(i, c)
	}
}
