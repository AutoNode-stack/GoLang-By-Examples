// Usa `os.Exit` para salir inmediatamente con un código de
// estado determinado.

package main

import (
	"fmt"
	"os"
)

func main() {

	// Las funciones pospuestas con `defer` _no_ se ejecutarán al usar `os.Exit`,
	// por lo que este `fmt.Println` jamás será invocado.
	defer fmt.Println("!")

	// Salir con estado 3.
	os.Exit(3)
}

// Ten en cuenta que, a diferencia de lenguajes como C, Go no utiliza un
// valor de retorno entero desde `main` para indicar el estado de salida. Si
// deseas salir con un estado distinto de cero debes
// emplear `os.Exit`.
