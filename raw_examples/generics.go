// A partir de la versión 1.18, Go añadió soporte para
// _genéricos_, también conocidos como _parámetros de tipo_.

package main

import "fmt"

// Como ejemplo de una función genérica, `SlicesIndex` recibe
// un slice de cualquier tipo `comparable` y un elemento de ese
// tipo, devolviendo el índice de la primera coincidencia de
// v en s, o -1 si no está presente. La restricción `comparable`
// significa que podemos comparar valores de este tipo con los
// operadores `==` y `!=`. Para una explicación más detallada
// de esta firma de tipos, consulta [este artículo de blog](https://go.dev/blog/deconstructing-type-parameters).
// Ten en cuenta que esta función existe en la biblioteca estándar
// como [slices.Index](https://pkg.go.dev/slices#Index).
func SlicesIndex[S ~[]E, E comparable](s S, v E) int {
	for i := range s {
		if v == s[i] {
			return i
		}
	}
	return -1
}

// Como ejemplo de un tipo genérico, `List` es una
// lista simplemente enlazada con valores de cualquier tipo.
type List[T any] struct {
	head, tail *element[T]
}

type element[T any] struct {
	next *element[T]
	val  T
}

// Podemos definir métodos sobre tipos genéricos exactamente igual
// que en los tipos regulares, pero debemos mantener los parámetros
// de tipo en su lugar. El tipo es `List[T]`, no `List`.
func (lst *List[T]) Push(v T) {
	if lst.tail == nil {
		lst.head = &element[T]{val: v}
		lst.tail = lst.head
	} else {
		lst.tail.next = &element[T]{val: v}
		lst.tail = lst.tail.next
	}
}

// AllElements devuelve todos los elementos de la List como un slice.
// En el siguiente ejemplo veremos una forma más idiomática
// de iterar sobre todos los elementos de tipos personalizados.
func (lst *List[T]) AllElements() []T {
	var elems []T
	for e := lst.head; e != nil; e = e.next {
		elems = append(elems, e.val)
	}
	return elems
}

func main() {
	var s = []string{"foo", "bar", "zoo"}

	// Al invocar funciones genéricas, con frecuencia podemos confiar
	// en la _inferencia de tipos_. Observa que no necesitamos
	// especificar los tipos para `S` y `E` al llamar
	// a `SlicesIndex`: el compilador los infiere automáticamente.
	fmt.Println("index of zoo:", SlicesIndex(s, "zoo"))

	// ... aunque también podríamos especificarlos explícitamente.
	_ = SlicesIndex[[]string, string](s, "zoo")

	lst := List[int]{}
	lst.Push(10)
	lst.Push(13)
	lst.Push(23)
	fmt.Println("list:", lst.AllElements())
}
