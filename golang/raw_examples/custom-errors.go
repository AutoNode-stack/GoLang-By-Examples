// Es posible definir tipos de error personalizados
// implementando en ellos el método `Error()`. Aquí tenemos una
// variante del ejemplo anterior que utiliza un tipo personalizado
// para representar explícitamente un error de argumento.

package main

import (
	"errors"
	"fmt"
)

// Un tipo de error personalizado habitualmente lleva el sufijo "Error".
type argError struct {
	arg     int
	message string
}

// Añadir este método `Error` hace que `argError` implemente
// la interfaz `error`.
func (e *argError) Error() string {
	return fmt.Sprintf("%d - %s", e.arg, e.message)
}

func f(arg int) (int, error) {
	if arg == 42 {

		// Retornamos nuestro error personalizado.
		return -1, &argError{arg, "can't work with it"}
	}
	return arg + 3, nil
}

func main() {

	// `errors.AsType` es una versión avanzada de `errors.Is`.
	// Comprueba si un error dado (o cualquiera en su cadena)
	// coincide con un tipo de error específico y lo convierte a un valor
	// de dicho tipo, devolviendo además `true`. Si no hay coincidencia, el
	// segundo valor retornado es `false`.
	_, err := f(42)
	if ae, ok := errors.AsType[*argError](err); ok {
		fmt.Println(ae.arg)
		fmt.Println(ae.message)
	} else {
		fmt.Println("err doesn't match argError")
	}
}
