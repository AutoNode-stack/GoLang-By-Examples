// La bifurcación condicional con `if` y `else` en Go es
// directa y sencilla.

package main

import "fmt"

func main() {

	// Aquí hay un ejemplo básico.
	if 7%2 == 0 {
		fmt.Println("7 is even")
	} else {
		fmt.Println("7 is odd")
	}

	// Se puede tener una sentencia `if` sin bloque else.
	if 8%4 == 0 {
		fmt.Println("8 is divisible by 4")
	}

	// Los operadores lógicos como `&&` y `||` suelen ser
	// muy útiles en las condiciones.
	if 8%2 == 0 || 7%2 == 0 {
		fmt.Println("either 8 or 7 are even")
	}

	// Una declaración puede preceder a los condicionales; cualquier variable
	// declarada en esta declaración estará disponible en la rama actual
	// y en todas las ramas subsiguientes.
	if num := 9; num < 0 {
		fmt.Println(num, "is negative")
	} else if num < 10 {
		fmt.Println(num, "has 1 digit")
	} else {
		fmt.Println(num, "has multiple digits")
	}
}

// Ten en cuenta que no se necesitan paréntesis alrededor de las condiciones
// en Go, pero las llaves `{}` son obligatorias.
