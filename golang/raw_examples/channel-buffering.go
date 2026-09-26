// Por defecto los canales son _no almacenados en búfer_ (unbuffered), lo que significa que
// solo aceptarán envíos (`chan <-`) si existe una
// recepción correspondiente (`<- chan`) lista para recibir el
// valor enviado. Los _canales con búfer_ (buffered channels) aceptan una cantidad
// limitada de valores sin que exista un receptor concurrente para ellos.

package main

import "fmt"

func main() {

	// Aquí creamos con `make` un canal de cadenas con búfer de hasta
	// 2 valores.
	messages := make(chan string, 2)

	// Dado que este canal tiene búfer, podemos enviar estos
	// valores al canal sin una recepción concurrente
	// correspondiente.
	messages <- "buffered"
	messages <- "channel"

	// Posteriormente podemos recibir ambos valores como de costumbre.
	fmt.Println(<-messages)
	fmt.Println(<-messages)
}
