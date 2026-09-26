// Los envíos y recepciones básicos en canales son bloqueantes.
// Sin embargo, podemos usar `select` con una cláusula `default` para
// implementar envíos, recepciones e incluso selects multidireccionales
// _no bloqueantes_.

package main

import "fmt"

func main() {
	messages := make(chan string)
	signals := make(chan bool)

	// Aquí tenemos una recepción no bloqueante. Si un valor está
	// disponible en `messages`, el `select` tomará el
	// `case <-messages` con dicho valor. De lo contrario,
	// tomará inmediatamente la rama `default`.
	select {
	case msg := <-messages:
		fmt.Println("received message", msg)
	default:
		fmt.Println("no message received")
	}

	// Un envío no bloqueante opera de manera análoga. Aquí `msg`
	// no puede enviarse al canal `messages`, porque
	// el canal carece de búfer y no hay ningún receptor presente.
	// Por ende, se selecciona la rama `default`.
	msg := "hi"
	select {
	case messages <- msg:
		fmt.Println("sent message", msg)
	default:
		fmt.Println("no message sent")
	}

	// Podemos usar múltiples cláusulas `case` antes de la rama
	// `default` para implementar un select no bloqueante multidireccional.
	// Aquí intentamos recepciones no bloqueantes tanto
	// en `messages` como en `signals`.
	select {
	case msg := <-messages:
		fmt.Println("received message", msg)
	case sig := <-signals:
		fmt.Println("received signal", sig)
	default:
		fmt.Println("no activity")
	}
}
