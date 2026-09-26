// Los [temporizadores](timers) sirven cuando deseas realizar
// una acción una vez en el futuro; los _tickers_ son para cuando
// necesitas realizar una tarea repetidamente a intervalos
// regulares. Aquí hay un ejemplo de un ticker que emite pulsos
// periódicamente hasta que decidimos detenerlo.

package main

import (
	"fmt"
	"time"
)

func main() {

	// Los tickers utilizan un mecanismo similar a los temporizadores: un
	// canal al cual se le envían valores periódicos. Aquí usaremos la sentencia
	// `select` sobre el canal para aguardar los
	// valores a medida que llegan cada 500ms.
	ticker := time.NewTicker(500 * time.Millisecond)
	done := make(chan bool)

	go func() {
		for {
			select {
			case <-done:
				return
			case t := <-ticker.C:
				fmt.Println("Tick at", t)
			}
		}
	}()

	// Los tickers se pueden detener al igual que los temporizadores. Una vez que un ticker
	// se detiene, no recibirá más valores en su
	// canal. Detendremos el nuestro transcurridos 1600ms.
	time.Sleep(1600 * time.Millisecond)
	ticker.Stop()
	done <- true
	fmt.Println("Ticker stopped")
}
