// Una cadena en Go es un slice de bytes de solo lectura. El lenguaje
// y la biblioteca estándar tratan las cadenas de forma especial: como
// contenedores de texto codificado en [UTF-8](https://en.wikipedia.org/wiki/UTF-8).
// En otros lenguajes, las cadenas están compuestas de "caracteres".
// En Go, el concepto de carácter se denomina `rune` (runa): es
// un entero que representa un punto de código Unicode.
// [Esta publicación del blog de Go](https://go.dev/blog/strings) es una excelente
// introducción a este tema.

package main

import (
	"fmt"
	"unicode/utf8"
)

func main() {

	// `s` es una variable `string` a la que se le asigna un valor literal
	// que representa la palabra "hola" en el idioma
	// tailandés. Los literales de cadena en Go son texto codificado
	// en UTF-8.
	const s = "สวัสดี"

	// Dado que las cadenas son equivalentes a `[]byte`, esto
	// producirá la longitud de los bytes sin procesar almacenados internamente.
	fmt.Println("Len:", len(s))

	// Indexar dentro de una cadena produce los valores de bytes crudos en
	// cada posición. Este bucle genera los valores hexadecimales de todos
	// los bytes que componen los puntos de código en `s`.
	for i := 0; i < len(s); i++ {
		fmt.Printf("%x ", s[i])
	}
	fmt.Println()

	// Para contar cuántas _runas_ hay en una cadena, podemos usar
	// el paquete `utf8`. Ten en cuenta que el tiempo de ejecución de
	// `RuneCountInString` depende del tamaño de la cadena,
	// ya que debe decodificar cada runa UTF-8 secuencialmente.
	// Algunos caracteres tailandeses se representan mediante puntos de código UTF-8
	// que pueden abarcar varios bytes, por lo que el resultado de este conteo
	// puede resultar sorprendente.
	fmt.Println("Rune count:", utf8.RuneCountInString(s))

	// Un bucle `range` maneja las cadenas de manera especial y decodifica
	// cada `rune` junto con su desplazamiento (offset) en la cadena.
	for idx, runeValue := range s {
		fmt.Printf("%#U starts at %d\n", runeValue, idx)
	}

	// Podemos lograr la misma iteración utilizando la
	// función `utf8.DecodeRuneInString` de forma explícita.
	fmt.Println("\nUsing DecodeRuneInString")
	for i, w := 0, 0; i < len(s); i += w {
		runeValue, width := utf8.DecodeRuneInString(s[i:])
		fmt.Printf("%#U starts at %d\n", runeValue, i)
		w = width

		// Esto demuestra cómo pasar un valor `rune` a una función.
		examineRune(runeValue)
	}
}

func examineRune(r rune) {

	// Los valores entre comillas simples son _literales de runa_.
	// Podemos comparar un valor `rune` directamente con un literal de runa.
	if r == 't' {
		fmt.Println("found tee")
	} else if r == 'ส' {
		fmt.Println("found so sua")
	}
}
