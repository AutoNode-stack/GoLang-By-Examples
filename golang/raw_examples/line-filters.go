// Un _filtro de línea_ es un tipo de programa común que lee
// entradas desde stdin, las procesa y luego imprime algún
// resultado derivado en stdout. `grep` y `sed` son filtros
// de línea habituales.

// Aquí tenemos un ejemplo de filtro de línea en Go que escribe en
// mayúsculas todo el texto de entrada. Puedes utilizar este patrón
// para escribir tus propios filtros de línea en Go.
package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {

	// Envolver el flujo sin búfer `os.Stdin` con un scanner con
	// búfer nos proporciona un método conveniente `Scan` que
	// avanza el scanner al siguiente token (la siguiente línea por defecto).
	scanner := bufio.NewScanner(os.Stdin)

	for scanner.Scan() {
		// `Text` devuelve el token actual (aquí la línea siguiente)
		// proveniente de la entrada.
		ucl := strings.ToUpper(scanner.Text())

		// Escribe la línea convertida a mayúsculas.
		fmt.Println(ucl)
	}

	// Comprobamos si ocurrieron errores durante `Scan`. El fin de archivo (EOF)
	// es esperado y `Scan` no lo reporta como un error.
	if err := scanner.Err(); err != nil {
		fmt.Fprintln(os.Stderr, "error:", err)
		os.Exit(1)
	}
}
