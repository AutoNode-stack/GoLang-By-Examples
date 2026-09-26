// Go ofrece un soporte sobresaliente para el formateo de cadenas siguiendo
// la tradición de `printf`. Aquí tenemos algunos ejemplos de tareas
// habituales de formateo de texto.

package main

import (
	"fmt"
	"os"
)

type point struct {
	x, y int
}

func main() {

	// Go ofrece varios "verbos" de impresión diseñados para
	// dar formato a valores generales en Go. Por ejemplo, esto imprime
	// una instancia de nuestra estructura `point`.
	p := point{1, 2}
	fmt.Printf("struct1: %v\n", p)

	// Si el valor es una estructura, la variante `%+v`
	// incluirá los nombres de los campos del struct.
	fmt.Printf("struct2: %+v\n", p)

	// La variante `%#v` imprime una representación en sintaxis de Go
	// del valor, es decir, el fragmento de código fuente que
	// produciría dicho valor.
	fmt.Printf("struct3: %#v\n", p)

	// Para imprimir el tipo de un valor, utiliza `%T`.
	fmt.Printf("type: %T\n", p)

	// Formatear booleanos es directo con `%t`.
	fmt.Printf("bool: %t\n", true)

	// Existen muchas opciones para formatear enteros.
	// Usa `%d` para el formato decimal estándar en base 10.
	fmt.Printf("int: %d\n", 123)

	// Esto imprime una representación binaria con `%b`.
	fmt.Printf("bin: %b\n", 14)

	// Esto imprime el carácter correspondiente al
	// entero especificado.
	fmt.Printf("char: %c\n", 33)

	// `%x` proporciona codificación hexadecimal.
	fmt.Printf("hex: %x\n", 456)

	// También existen varias opciones de formateo para
	// números flotantes. Para el formato decimal básico usa `%f`.
	fmt.Printf("float1: %f\n", 78.9)

	// `%e` y `%E` formatean el flotante en notación científica
	// con ligeras variaciones de mayúsculas/minúsculas.
	fmt.Printf("float2: %e\n", 123400000.0)
	fmt.Printf("float3: %E\n", 123400000.0)

	// Para la impresión básica de cadenas usa `%s`.
	fmt.Printf("str1: %s\n", "\"string\"")

	// Para colocar comillas dobles en las cadenas como en el código fuente de Go, usa `%q`.
	fmt.Printf("str2: %q\n", "\"string\"")

	// Al igual que con los enteros vistos anteriormente, `%x` representa
	// la cadena en base 16, con dos caracteres de salida por cada byte de entrada.
	fmt.Printf("str3: %x\n", "hex this")

	// Para imprimir la representación de un puntero en memoria, usa `%p`.
	fmt.Printf("pointer: %p\n", &p)

	// Al dar formato a números con frecuencia querrás
	// controlar el ancho y la precisión de la cifra resultante.
	// Para especificar el ancho de un entero, usa un número
	// después del `%` en el verbo. Por defecto el resultado
	// se justificará a la derecha y se rellenará con espacios.
	fmt.Printf("width1: |%6d|%6d|\n", 12, 345)

	// También puedes especificar el ancho de flotantes impresos,
	// aunque habitualmente también querrás restringir la precisión
	// decimal simultáneamente mediante la sintaxis ancho.precision.
	fmt.Printf("width2: |%6.2f|%6.2f|\n", 1.2, 3.45)

	// Para justificar a la izquierda, usa la bandera `-`.
	fmt.Printf("width3: |%-6.2f|%-6.2f|\n", 1.2, 3.45)

	// Es posible que también desees controlar el ancho al formatear
	// cadenas, en especial para alinearlas en salidas con formato de tabla.
	// Aquí vemos el ancho básico justificado a la derecha.
	fmt.Printf("width4: |%6s|%6s|\n", "foo", "b")

	// Para justificar a la izquierda se usa la bandera `-` al igual que con los números.
	fmt.Printf("width5: |%-6s|%-6s|\n", "foo", "b")

	// Hasta ahora hemos visto `Printf`, que imprime la cadena
	// formateada en `os.Stdout`. `Sprintf` formatea y retorna
	// una cadena sin imprimirla en ninguna parte.
	s := fmt.Sprintf("sprintf: a %s", "string")
	fmt.Println(s)

	// Puedes formatear e imprimir hacia otros `io.Writer` distintos
	// de `os.Stdout` utilizando `Fprintf`.
	fmt.Fprintf(os.Stderr, "io: an %s\n", "error")
}
