// El parseo de números a partir de cadenas de texto es una tarea básica pero frecuente
// en muchos programas; aquí veremos cómo llevarla a cabo en Go.

package main

// El paquete integrado `strconv` provee las funciones para
// parsear números.
import (
	"fmt"
	"strconv"
)

func main() {

	// Con `ParseFloat`, este `64` indica cuántos bits de
	// precisión se deben utilizar para el parseo.
	f, _ := strconv.ParseFloat("1.234", 64)
	fmt.Println(f)

	// Para `ParseInt`, el `0` indica inferir la base numérica a partir
	// de la cadena. `64` exige que el resultado quepa en 64
	// bits.
	i, _ := strconv.ParseInt("123", 0, 64)
	fmt.Println(i)

	// `ParseInt` reconocerá números con formato hexadecimal.
	d, _ := strconv.ParseInt("0x1c8", 0, 64)
	fmt.Println(d)

	// También existe la función `ParseUint` para enteros sin signo.
	u, _ := strconv.ParseUint("789", 0, 64)
	fmt.Println(u)

	// `Atoi` es una función de conveniencia para el parseo básico de enteros
	// en base 10 (`int`).
	k, _ := strconv.Atoi("135")
	fmt.Println(k)

	// Las funciones de parseo devuelven un error cuando reciben entradas no válidas.
	_, e := strconv.Atoi("wat")
	fmt.Println(e)
}
