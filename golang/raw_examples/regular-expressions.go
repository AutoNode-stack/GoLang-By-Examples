// Go cuenta con soporte integrado para [expresiones regulares](https://en.wikipedia.org/wiki/Regular_expression).
// Aquí tenemos algunos ejemplos de tareas habituales relacionadas con expresiones regulares
// en Go.

package main

import (
	"bytes"
	"fmt"
	"regexp"
)

func main() {

	// Esto comprueba si un patrón coincide con una cadena de texto.
	match, _ := regexp.MatchString("p([a-z]+)ch", "peach")
	fmt.Println(match)

	// Arriba usamos un patrón de cadena directamente, pero para
	// otras tareas con expresiones regulares necesitarás compilar (`Compile`)
	// una estructura `Regexp` optimizada.
	r, _ := regexp.Compile("p([a-z]+)ch")

	// Existen numerosos métodos disponibles sobre estas estructuras. Aquí tenemos
	// una comprobación de coincidencia idéntica a la vista anteriormente.
	fmt.Println(r.MatchString("peach"))

	// Esto localiza la primera coincidencia de la expresión regular.
	fmt.Println(r.FindString("peach punch"))

	// Esto también localiza la primera coincidencia pero devuelve los
	// índices de inicio y fin correspondientes en lugar del texto coincidente.
	fmt.Println("idx:", r.FindStringIndex("peach punch"))

	// Las variantes `Submatch` incluyen información sobre
	// las coincidencias del patrón completo y los subpatrones (grupos)
	// capturados. Por ejemplo, esto devolverá información tanto para
	// `p([a-z]+)ch` como para `([a-z]+)`.
	fmt.Println(r.FindStringSubmatch("peach punch"))

	// Análogamente esto devolverá información sobre los
	// índices de coincidencias y subcoincidencias.
	fmt.Println(r.FindStringSubmatchIndex("peach punch"))

	// Las variantes `All` de estas funciones aplican a todas
	// las coincidencias en el texto de entrada, no únicamente a la primera.
	// Por ejemplo, para encontrar todas las coincidencias de una regexp.
	fmt.Println(r.FindAllString("peach punch pinch", -1))

	// Estas variantes `All` se encuentran disponibles también para las
	// otras funciones que examinamos arriba.
	fmt.Println("all:", r.FindAllStringSubmatchIndex(
		"peach punch pinch", -1))

	// Proporcionar un entero no negativo como segundo argumento
	// a estas funciones limitará la cantidad máxima de coincidencias.
	fmt.Println(r.FindAllString("peach punch pinch", 2))

	// Nuestros ejemplos anteriores recibían argumentos de tipo string y utilizaban
	// nombres como `MatchString`. También podemos proporcionar argumentos de tipo
	// `[]byte` y prescindir de `String` en el nombre de la función.
	fmt.Println(r.Match([]byte("peach")))

	// Al crear variables globales con expresiones regulares,
	// se puede emplear la variación `MustCompile` en lugar de `Compile`.
	// `MustCompile` entra en panic en vez de devolver un error,
	// lo cual hace su uso mucho más seguro y directo para variables globales.
	r = regexp.MustCompile("p([a-z]+)ch")
	fmt.Println("regexp:", r)

	// El paquete `regexp` también puede utilizarse para reemplazar
	// subcadenas coincidentes por otros valores.
	fmt.Println(r.ReplaceAllString("a peach", "<fruit>"))

	// La variante `Func` permite transformar el texto coincidente
	// mediante una función proporcionada.
	in := []byte("a peach")
	out := r.ReplaceAllFunc(in, bytes.ToUpper)
	fmt.Println(string(out))
}
