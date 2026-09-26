// Go admite _constantes_ de caracteres, cadenas de texto, valores booleanos
// y numéricos.

package main

import (
	"fmt"
	"math"
)

// `const` declara un valor constante.
const s string = "constant"

func main() {
	fmt.Println(s)

	// Una sentencia `const` también puede aparecer dentro del
	// cuerpo de una función.
	const n = 500000000

	// Las expresiones constantes realizan aritmética con
	// precisión arbitraria.
	const d = 3e20 / n
	fmt.Println(d)

	// Una constante numérica no tiene un tipo definido hasta que se le asigna
	// uno, por ejemplo mediante una conversión explícita.
	fmt.Println(int64(d))

	// A un número se le puede asignar un tipo utilizándolo en un
	// contexto que lo requiera, como una asignación de variable
	// o una llamada a función. Por ejemplo, aquí
	// `math.Sin` espera un `float64`.
	fmt.Println(math.Sin(n))
}
