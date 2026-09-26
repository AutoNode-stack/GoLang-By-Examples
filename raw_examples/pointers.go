// Go admite <em><a href="https://en.wikipedia.org/wiki/Pointer_(computer_programming)">punteros</a></em>,
// lo que permite pasar referencias a valores y registros
// dentro de tu programa.

package main

import "fmt"

// Mostraremos cómo funcionan los punteros en contraste con los valores
// mediante 2 funciones: `zeroval` y `zeroptr`. `zeroval` tiene un
// parámetro de tipo `int`, por lo que los argumentos se pasan por
// valor. `zeroval` recibirá una copia de `ival` distinta
// a la de la función que la invoca.
func zeroval(ival int) {
	ival = 0
}

// `zeroptr`, en cambio, tiene un parámetro `*int`, lo que significa
// que recibe un puntero a `int`. El código `*iptr` en el cuerpo
// de la función _desreferencia_ el puntero desde su dirección
// de memoria al valor actual almacenado en dicha dirección.
// Asignar un valor a un puntero desreferenciado modifica el
// valor en la dirección referenciada.
func zeroptr(iptr *int) {
	*iptr = 0
}

func main() {
	i := 1
	fmt.Println("initial:", i)

	zeroval(i)
	fmt.Println("zeroval:", i)

	// La sintaxis `&i` proporciona la dirección de memoria de `i`,
	// es decir, un puntero a `i`.
	zeroptr(&i)
	fmt.Println("zeroptr:", i)

	// Los punteros también pueden imprimirse directamente.
	fmt.Println("pointer:", &i)

	// Se puede crear un puntero nuevo a un valor utilizando la
	// función incorporada `new`.
	p := new(42)
	fmt.Println("value at *p:", *p)
	zeroptr(p)
	fmt.Println("value at *p:", *p)
}
