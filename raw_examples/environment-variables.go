// Las [variables de entorno](https://en.wikipedia.org/wiki/Environment_variable)
// son un mecanismo universal para [transmitir información de
// configuración a programas Unix](https://www.12factor.net/config).
// Veamos cómo definir, obtener y listar variables de entorno.

package main

import (
	"fmt"
	"os"
	"strings"
)

func main() {

	// Para definir un par clave/valor, usa `os.Setenv`. Para obtener el
	// valor de una clave, usa `os.Getenv`. Esto devolverá
	// una cadena vacía si la clave no está presente en el
	// entorno.
	os.Setenv("FOO", "1")
	fmt.Println("FOO:", os.Getenv("FOO"))
	fmt.Println("BAR:", os.Getenv("BAR"))

	// Usa `os.Environ` para listar todos los pares clave/valor presentes en el
	// entorno. Esto devuelve un slice de cadenas con el
	// formato `KEY=value`. Puedes usar `strings.SplitN` para
	// separar la clave y el valor. Aquí imprimimos todas las claves.
	fmt.Println()
	for _, e := range os.Environ() {
		pair := strings.SplitN(e, "=", 2)
		fmt.Println(pair[0])
	}
}
