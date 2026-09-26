// A menudo deseamos ejecutar código en Go en algún punto del
// futuro, o repetidamente en un intervalo determinado. Las funciones
// integradas de _timers_ (temporizadores) y _tickers_ facilitan
// enormemente ambas tareas. Primero veremos los temporizadores y luego
// los [tickers](tickers).

package main

import (
	"fmt"
	"time"
)

func main() {

	// Los temporizadores representan un único evento en el futuro. Le
	// indicas al temporizador cuánto tiempo deseas esperar, y este
	// proporciona un canal que será notificado en ese momento exacto.
	// Este temporizador esperará 2 segundos.
	timer1 := time.NewTimer(2 * time.Second)

	// El `<-timer1.C` se bloquea en el canal `C` del temporizador
	// hasta que este envía un valor indicando que el tiempo ha expirado.
	<-timer1.C
	fmt.Println("Timer 1 fired")

	// Si únicamente quisieras esperar, podrías haber empleado
	// `time.Sleep`. Una razón por la cual un temporizador es tan útil es
	// que puedes cancelarlo antes de que expire.
	// Aquí tenemos un ejemplo de cancelación.
	timer2 := time.NewTimer(time.Second)
	go func() {
		<-timer2.C
		fmt.Println("Timer 2 fired")
	}()
	stop2 := timer2.Stop()
	if stop2 {
		fmt.Println("Timer 2 stopped")
	}

	// Damos a `timer2` suficiente tiempo para dispararse (en caso de que
	// no se hubiera detenido), demostrando así que en efecto fue cancelado.
	time.Sleep(2 * time.Second)
}
