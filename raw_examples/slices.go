// Los _slices_ son un tipo de dato clave en Go, que proporcionan una
// interfaz más potente y flexible para secuencias de datos que los arrays.

package main

import (
	"fmt"
	"slices"
)

func main() {

	// A diferencia de los arrays, los slices se tipan únicamente por los
	// elementos que contienen (no por el número de elementos).
	// Un slice no inicializado es igual a nil y tiene una longitud de 0.
	var s []string
	fmt.Println("uninit:", s, s == nil, len(s) == 0)

	// Para crear un slice vacío con longitud distinta de cero, usa
	// la función incorporada `make`. Aquí creamos un slice de `string`s de
	// longitud `3` (inicializado con valores cero).
	// Por defecto, la capacidad de un nuevo slice es igual a su longitud;
	// si sabemos de antemano que el slice crecerá, es posible
	// pasar una capacidad explícita como argumento adicional a `make`.
	s = make([]string, 3)
	fmt.Println("emp:", s, "len:", len(s), "cap:", cap(s))

	// Podemos asignar y obtener valores exactamente igual que con los arrays.
	s[0] = "a"
	s[1] = "b"
	s[2] = "c"
	fmt.Println("set:", s)
	fmt.Println("get:", s[2])

	// `len` devuelve la longitud del slice como se espera.
	fmt.Println("len:", len(s))

	// Además de estas operaciones básicas, los slices admiten
	// varias más que los hacen mucho más ricos que los arrays.
	// Una de ellas es la función incorporada `append`, la cual
	// devuelve un slice que contiene uno o más valores nuevos.
	// Ten en cuenta que debemos capturar el valor de retorno de
	// `append`, ya que podríamos recibir una nueva referencia de slice.
	s = append(s, "d")
	s = append(s, "e", "f")
	fmt.Println("apd:", s)

	// Los slices también se pueden copiar con `copy`. Aquí creamos un
	// slice vacío `c` de la misma longitud que `s` y copiamos
	// en `c` el contenido de `s`.
	c := make([]string, len(s))
	copy(c, s)
	fmt.Println("cpy:", c)

	// Los slices admiten el operador de corte con la sintaxis
	// `slice[low:high]`. Por ejemplo, esto obtiene un sub-slice
	// de los elementos `s[2]`, `s[3]` y `s[4]`.
	l := s[2:5]
	fmt.Println("sl1:", l)

	// Esto corta hasta (pero excluyendo) `s[5]`.
	l = s[:5]
	fmt.Println("sl2:", l)

	// Y esto corta desde (e incluyendo) `s[2]`.
	l = s[2:]
	fmt.Println("sl3:", l)

	// También podemos declarar e inicializar una variable de tipo slice
	// en una sola línea.
	t := []string{"g", "h", "i"}
	fmt.Println("dcl:", t)

	// El paquete `slices` contiene una serie de funciones
	// de utilidad muy convenientes para slices.
	t2 := []string{"g", "h", "i"}
	if slices.Equal(t, t2) {
		fmt.Println("t == t2")
	}

	// Los slices pueden componerse en estructuras de datos
	// multidimensionales. La longitud de los slices internos puede
	// variar, a diferencia de los arrays multidimensionales.
	twoD := make([][]int, 3)
	for i := range 3 {
		innerLen := i + 1
		twoD[i] = make([]int, innerLen)
		for j := range innerLen {
			twoD[i][j] = i + j
		}
	}
	fmt.Println("2d: ", twoD)
}
