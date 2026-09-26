// Podemos usar canales para sincronizar la ejecución
// entre distintas goroutines. Aquí tenemos un ejemplo de cómo usar una
// recepción bloqueante para esperar a que una goroutine finalice.
// Al esperar que terminen múltiples goroutines,
// suele ser preferible utilizar un [WaitGroup](waitgroups).

package main

import (
	"fmt"
	"time"
)

// Esta es la función que ejecutaremos en una goroutine. El
// canal `done` se utilizará para notificar a otra
// goroutine que el trabajo de esta función ha finalizado.
func worker(done chan bool) {
	fmt.Print("working...")
	time.Sleep(time.Second)
	fmt.Println("done")

	// Enviamos un valor para notificar que hemos terminado.
	done <- true
}

func main() {

	// Iniciamos una goroutine trabajadora, entregándole el canal para
	// que nos notifique.
	done := make(chan bool, 1)
	go worker(done)

	// Nos bloqueamos hasta recibir la notificación de la
	// goroutine trabajadora a través del canal.
	<-done
}
