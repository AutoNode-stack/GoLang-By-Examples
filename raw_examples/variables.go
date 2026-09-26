// En Go, las _variables_ se declaran explícitamente y son utilizadas
// por el compilador para, por ejemplo, verificar la corrección de tipos
// en las llamadas a funciones.

package main

import "fmt"

func main() {

	// `var` declara 1 o más variables.
	var a = "initial"
	fmt.Println(a)

	// Se pueden declarar múltiples variables al mismo tiempo.
	var b, c int = 1, 2
	fmt.Println(b, c)

	// Go inferirá el tipo de las variables inicializadas.
	var d = true
	fmt.Println(d)

	// Las variables declaradas sin una inicialización correspondiente
	// adquieren el _valor cero_ (zero-valued). Por ejemplo, el
	// valor cero para un `int` es `0`.
	var e int
	fmt.Println(e)

	// La sintaxis `:=` es una forma abreviada para declarar e
	// inicializar una variable; por ejemplo, equivale a
	// `var f string = "apple"` en este caso.
	// Esta sintaxis solo está disponible dentro de funciones.
	f := "apple"
	fmt.Println(f)
}
