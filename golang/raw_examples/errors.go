// En Go es idiomático comunicar errores mediante un
// valor de retorno explícito y separado. Esto contrasta con
// las excepciones utilizadas en lenguajes como Java, Python y
// Ruby, y con el valor único sobrecargado de resultado/error
// usado a veces en C. El enfoque de Go facilita
// identificar qué funciones retornan errores y manejarlos
// utilizando las mismas estructuras del lenguaje empleadas para
// tareas ordinarias.
//
// Consulta la documentación del [paquete errors](https://pkg.go.dev/errors)
// y [este artículo de blog](https://go.dev/blog/go1.13-errors) para obtener
// detalles adicionales.

package main

import (
	"errors"
	"fmt"
)

// Por convención, los errores se ubican como el último valor de retorno y
// tienen el tipo `error`, una interfaz incorporada en el lenguaje.
func f(arg int) (int, error) {
	if arg == 42 {
		// `errors.New` construye un valor `error` básico
		// con el mensaje de error especificado.
		return -1, errors.New("can't work with 42")
	}

	// Un valor `nil` en la posición del error indica que
	// no hubo ningún error.
	return arg + 3, nil
}

// Un error centinela (sentinel error) es una variable predeclarada que se utiliza para
// señalar una condición de error específica.
var ErrOutOfTea = errors.New("no more tea available")
var ErrPower = errors.New("can't boil water")

func makeTea(arg int) error {
	if arg == 2 {
		return ErrOutOfTea
	} else if arg == 4 {

		// Podemos envolver errores con errores de nivel superior para añadir
		// contexto. La forma más sencilla de lograrlo es con el
		// verbo `%w` en `fmt.Errorf`. Los errores envueltos
		// forman una cadena lógica (A envuelve a B, que envuelve a C, etc.)
		// que puede consultarse mediante funciones como `errors.Is`
		// y `errors.AsType`.
		return fmt.Errorf("making tea: %w", ErrPower)
	}
	return nil
}

func main() {
	for _, i := range []int{7, 42} {

		// Es idiomático realizar la comprobación de errores en línea dentro de la
		// cláusula `if`.
		if r, e := f(i); e != nil {
			fmt.Println("f failed:", e)
		} else {
			fmt.Println("f worked:", r)
		}
	}

	for i := range 5 {
		if err := makeTea(i); err != nil {

			// `errors.Is` comprueba si un error dado (o cualquiera en su cadena)
			// coincide con un valor de error específico. Esto resulta especialmente útil con errores
			// anidados o envueltos, permitiendo identificar errores centinela en una cadena.
			if errors.Is(err, ErrOutOfTea) {
				fmt.Println("We should buy new tea!")
			} else if errors.Is(err, ErrPower) {
				fmt.Println("Now it is dark.")
			} else {
				fmt.Printf("unknown error: %s\n", err)
			}
			continue
		}

		fmt.Println("Tea is ready!")
	}
}
