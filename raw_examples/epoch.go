// Un requerimiento frecuente en desarrollo de software es obtener el número
// de segundos, milisegundos o nanosegundos transcurridos desde la
// [época Unix](https://en.wikipedia.org/wiki/Unix_time) (1 de enero de 1970).
// Así es como se realiza en Go.

package main

import (
	"fmt"
	"time"
)

func main() {

	// Usa `time.Now` junto con `Unix`, `UnixMilli` o `UnixNano`
	// para obtener el tiempo transcurrido desde la época Unix en segundos,
	// milisegundos o nanosegundos, respectivamente.
	now := time.Now()
	fmt.Println(now)

	fmt.Println(now.Unix())
	fmt.Println(now.UnixMilli())
	fmt.Println(now.UnixNano())

	// También puedes convertir enteros de segundos o nanosegundos
	// transcurridos desde la época al valor `time.Time` correspondiente.
	fmt.Println(time.Unix(now.Unix(), 0))
	fmt.Println(time.Unix(0, now.UnixNano()))
}
