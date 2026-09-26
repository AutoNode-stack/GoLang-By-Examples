// Los _canales_ (channels) son los conductos que comunican goroutines
// concurrentes. Puedes enviar valores a los canales desde una
// goroutine y recibir dichos valores en otra
// goroutine.

package main

import "fmt"

func main() {

	// Crea un nuevo canal con `make(chan val-type)`.
	// Los canales están tipados según los valores que transmiten.
	messages := make(chan string)

	// _Envía_ un valor a un canal utilizando la sintaxis
	// `channel <-`. Aquí enviamos `"ping"` al canal `messages`
	// que creamos arriba, desde una nueva goroutine.
	go func() { messages <- "ping" }()

	// La sintaxis `<-channel` _recibe_ un valor desde el
	// canal. Aquí recibiremos el mensaje `"ping"` que
	// enviamos anteriormente y lo imprimiremos.
	msg := <-messages
	fmt.Println(msg)
}
