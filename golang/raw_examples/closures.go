// Go admite [_funciones anónimas_](https://en.wikipedia.org/wiki/Anonymous_function),
// que pueden formar <a href="https://en.wikipedia.org/wiki/Closure_(computer_science)"><em>closures</em></a> (clausuras).
// Las funciones anónimas resultan muy útiles cuando deseas definir
// una función en línea sin necesidad de asignarle un nombre.

package main

import "fmt"

// Esta función `intSeq` retorna otra función, la cual
// definimos de manera anónima en el cuerpo de `intSeq`. La
// función retornada _captura_ la variable `i` para
// formar un closure.
func intSeq() func() int {
	i := 0
	return func() int {
		i++
		return i
	}
}

func main() {

	// Llamamos a `intSeq`, asignando el resultado (una función)
	// a `nextInt`. Este valor de función captura su
	// propio valor de `i`, el cual se actualizará cada vez
	// que invoquemos `nextInt`.
	nextInt := intSeq()

	// Observa el efecto del closure invocando `nextInt`
	// varias veces consecutivas.
	fmt.Println(nextInt())
	fmt.Println(nextInt())
	fmt.Println(nextInt())

	// Para confirmar que el estado es único para esa
	// función en particular, creamos y probamos una nueva instancia.
	newInts := intSeq()
	fmt.Println(newInts())
}
