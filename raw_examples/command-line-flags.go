// Las [_banderas de línea de comandos_](https://en.wikipedia.org/wiki/Command-line_interface#Command-line_option) (flags)
// son una forma estándar de especificar opciones en programas de consola.
// Por ejemplo, en `wc -l`, `-l` es una bandera de línea de comandos.

package main

// Go provee el paquete `flag` que admite el parseo básico
// de banderas de línea de comandos. Usaremos este paquete para
// implementar nuestro programa de ejemplo.
import (
	"flag"
	"fmt"
)

func main() {

	// Las declaraciones básicas de banderas están disponibles para opciones de
	// tipo string, integer y boolean. Aquí declaramos una bandera
	// de cadena `word` con valor predeterminado `"foo"` y una breve
	// descripción. Esta función `flag.String` retorna un puntero a string
	// (no un valor string directo); veremos cómo utilizar este puntero abajo.
	wordPtr := flag.String("word", "foo", "a string")

	// Esto declara las banderas `numb` y `fork`, siguiendo un
	// enfoque similar al de la bandera `word`.
	numbPtr := flag.Int("numb", 42, "an int")
	forkPtr := flag.Bool("fork", false, "a bool")

	// También es posible declarar una opción que utilice una variable
	// preexistente declarada en otra parte del programa. Nota que
	// debemos pasar un puntero a la función de declaración de la bandera.
	var svar string
	flag.StringVar(&svar, "svar", "bar", "a string var")

	// Una vez declaradas todas las banderas, invocamos `flag.Parse()`
	// para ejecutar el análisis sintáctico de la línea de comandos.
	flag.Parse()

	// Aquí simplemente volcamos las opciones parseadas y los
	// argumentos posicionales finales restantes. Ten en cuenta que
	// debemos desreferenciar los punteros mediante `*wordPtr` para
	// obtener los valores reales de las opciones.
	fmt.Println("word:", *wordPtr)
	fmt.Println("numb:", *numbPtr)
	fmt.Println("fork:", *forkPtr)
	fmt.Println("svar:", svar)
	fmt.Println("tail:", flag.Args())
}
