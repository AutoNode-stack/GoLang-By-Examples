// El paquete `strings` de la biblioteca estándar proporciona numerosas
// funciones útiles relacionadas con cadenas de texto. Aquí hay algunos ejemplos
// para familiarizarse con el paquete.

package main

import (
	"fmt"
	s "strings"
)

// Asignamos un alias a `fmt.Println` con un nombre más breve ya que lo
// usaremos repetidamente a continuación.
var p = fmt.Println

func main() {

	// Aquí hay una muestra de las funciones disponibles en
	// `strings`. Como se trata de funciones del paquete
	// y no de métodos propios del objeto string, debemos
	// pasar la cadena en cuestión como primer argumento
	// a la función. Puedes encontrar muchas más funciones
	// en la documentación de [`strings`](https://pkg.go.dev/strings).
	p("Contains:  ", s.Contains("test", "es"))
	p("Count:     ", s.Count("test", "t"))
	p("HasPrefix: ", s.HasPrefix("test", "te"))
	p("HasSuffix: ", s.HasSuffix("test", "st"))
	p("Index:     ", s.Index("test", "e"))
	p("Join:      ", s.Join([]string{"a", "b"}, "-"))
	p("Repeat:    ", s.Repeat("a", 5))
	p("Replace:   ", s.Replace("foo", "o", "0", -1))
	p("Replace:   ", s.Replace("foo", "o", "0", 1))
	p("Split:     ", s.Split("a-b-c-d-e", "-"))
	p("ToLower:   ", s.ToLower("TEST"))
	p("ToUpper:   ", s.ToUpper("test"))
}
