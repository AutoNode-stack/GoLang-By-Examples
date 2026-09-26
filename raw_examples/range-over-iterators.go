// Desde la versión 1.22, Go agregó soporte para
// [iteradores definidos por el usuario](https://go.dev/blog/range-functions)
// para bucles `range`. En la versión 1.23, los iteradores se convirtieron
// en una característica estándar del lenguaje.

package main

import (
	"fmt"
	"iter"
	"slices"
	"strings"
)

// En el [ejemplo anterior](generics) implementamos una
// lista enlazada personalizada y un método `AllElements` que
// devolvía todos los elementos en un slice. Con iteradores,
// podemos hacerlo de manera mucho más elegante e idiomática.
type List[T any] struct {
	head, tail *element[T]
}

type element[T any] struct {
	next *element[T]
	val  T
}

func (lst *List[T]) Push(v T) {
	if lst.tail == nil {
		lst.head = &element[T]{val: v}
		lst.tail = lst.head
	} else {
		lst.tail.next = &element[T]{val: v}
		lst.tail = lst.tail.next
	}
}

// `All` devuelve un iterador, representado en Go por una función
// con una [firma especial](https://pkg.go.dev/iter#Seq).
func (lst *List[T]) All() iter.Seq[T] {
	return func(yield func(T) bool) {
		// La función de iterador recibe otra función como
		// parámetro, llamada `yield` por convención (aunque
		// el nombre puede ser arbitrario). Invocará `yield` por
		// cada elemento que deseemos iterar, y verificará el
		// valor retornado por `yield` para una posible terminación anticipada.
		for e := lst.head; e != nil; e = e.next {
			if !yield(e.val) {
				return
			}
		}
	}
}

// La iteración no requiere una estructura de datos subyacente,
// ¡y ni siquiera tiene que ser finita! Aquí hay una función
// que retorna un iterador sobre números de Fibonacci: continúa
// ejecutándose mientras `yield` siga retornando `true`.
func genFib() iter.Seq[int] {
	return func(yield func(int) bool) {
		a, b := 0, 1

		for {
			if !yield(a) {
				return
			}
			a, b = b, a+b
		}
	}
}

func main() {
	lst := List[int]{}
	lst.Push(10)
	lst.Push(13)
	lst.Push(23)

	// Dado que `List.All` retorna un iterador, podemos usarlo
	// en un bucle `range` convencional.
	for e := range lst.All() {
		fmt.Println(e)
	}

	// Paquetes como [slices](https://pkg.go.dev/slices) tienen
	// varias funciones útiles para trabajar con iteradores.
	// Por ejemplo, `Collect` toma cualquier iterador y reúne
	// todos sus valores en un slice.
	all := slices.Collect(lst.All())
	fmt.Println("all:", all)

	// Los paquetes de la biblioteca estándar ahora también exponen ayudantes de iteradores.
	// Por ejemplo, `strings.SplitSeq` itera sobre partes
	// de un slice de bytes sin construir previamente un slice de resultados en memoria.
	for part := range strings.SplitSeq("go-by-example", "-") {
		fmt.Printf("part: %s\n", part)
	}

	for n := range genFib() {

		// Una vez que el bucle alcanza un `break` o un retorno anticipado, la función `yield`
		// pasada al iterador devolverá `false`.
		if n >= 10 {
			break
		}
		fmt.Println(n)
	}
}
