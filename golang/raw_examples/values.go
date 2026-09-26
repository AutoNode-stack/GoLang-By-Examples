// Go cuenta con diversos tipos de valores, incluyendo cadenas de texto (strings),
// enteros, flotantes, booleanos, etc. Aquí hay algunos
// ejemplos básicos.

package main

import "fmt"

func main() {

	// Cadenas de texto, que se pueden concatenar con `+`.
	fmt.Println("go" + "lang")

	// Enteros y flotantes.
	fmt.Println("1+1 =", 1+1)
	fmt.Println("7.0/3.0 =", 7.0/3.0)

	// Booleanos, con los operadores booleanos habituales.
	fmt.Println(true && false)
	fmt.Println(true || false)
	fmt.Println(!true)
}
