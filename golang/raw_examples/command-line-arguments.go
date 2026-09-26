// Los [_argumentos de línea de comandos_](https://en.wikipedia.org/wiki/Command-line_interface#Arguments)
// son una forma habitual de parametrizar la ejecución de programas.
// Por ejemplo, `go run hello.go` utiliza `run` y
// `hello.go` como argumentos para el ejecutable `go`.

package main

import (
	"fmt"
	"os"
)

func main() {

	// `os.Args` proporciona acceso directo a los argumentos de línea de comandos
	// originales. Ten en cuenta que el primer valor en este slice
	// corresponde a la ruta del programa, mientras que `os.Args[1:]`
	// contiene los argumentos pasados al programa.
	argsWithProg := os.Args
	argsWithoutProg := os.Args[1:]

	// Puedes acceder a argumentos individuales mediante la indexación habitual.
	arg := os.Args[3]

	fmt.Println(argsWithProg)
	fmt.Println(argsWithoutProg)
	fmt.Println(arg)
}
