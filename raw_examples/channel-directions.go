// Al usar canales como parámetros de funciones, puedes
// especificar si el canal está destinado únicamente a enviar o a recibir
// valores. Esta especificidad incrementa la seguridad de tipos
// del programa en tiempo de compilación.

package main

import "fmt"

// Esta función `ping` solo acepta un canal para enviar
// valores. Intentar recibir desde este canal generaría
// un error en tiempo de compilación.
func ping(pings chan<- string, msg string) {
	pings <- msg
}

// La función `pong` acepta un canal para recepciones
// (`pings`) y un segundo canal para envíos (`pongs`).
func pong(pings <-chan string, pongs chan<- string) {
	msg := <-pings
	pongs <- msg
}

func main() {
	pings := make(chan string, 1)
	pongs := make(chan string, 1)
	ping(pings, "passed message")
	pong(pings, pongs)
	fmt.Println(<-pongs)
}
