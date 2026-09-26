// El [_límite de tasa_](https://en.wikipedia.org/wiki/Rate_limiting) (rate limiting)
// es un mecanismo esencial para controlar el uso de recursos
// y mantener la calidad del servicio. Go admite elegantemente
// el control de frecuencia con goroutines, canales y [tickers](tickers).

package main

import (
	"fmt"
	"time"
)

func main() {

	// Primero veremos una limitación de tasa básica. Supongamos
	// que deseamos limitar el procesamiento de peticiones entrantes.
	// Atenderemos estas solicitudes a través de un canal.
	requests := make(chan int, 5)
	for i := 1; i <= 5; i++ {
		requests <- i
	}
	close(requests)

	// Este canal `limiter` recibirá un valor
	// cada 200 milisegundos. Es el regulador en
	// nuestro esquema de control de tasa.
	limiter := time.Tick(200 * time.Millisecond)

	// Al bloquearnos en una recepción del canal `limiter`
	// antes de procesar cada solicitud, nos limitamos a
	// 1 solicitud cada 200 milisegundos.
	for req := range requests {
		<-limiter
		fmt.Println("request", req, time.Now())
	}

	// Es posible que deseemos permitir ráfagas cortas (bursts) de peticiones
	// manteniendo el límite general a largo plazo. Podemos lograrlo
	// añadiendo búfer a nuestro canal regulador. Este canal `burstyLimiter`
	// permitirá ráfagas de hasta 3 eventos consecutivos.
	burstyLimiter := make(chan time.Time, 3)

	// Llenamos el canal para representar la capacidad de ráfaga permitida.
	for range 3 {
		burstyLimiter <- time.Now()
	}

	// Cada 200 milisegundos intentaremos agregar un nuevo
	// valor a `burstyLimiter`, hasta alcanzar su límite de 3.
	go func() {
		for t := range time.Tick(200 * time.Millisecond) {
			burstyLimiter <- t
		}
	}()

	// Ahora simulamos 5 peticiones entrantes más. Las primeras
	// 3 se beneficiarán de la capacidad de ráfaga de `burstyLimiter`.
	burstyRequests := make(chan int, 5)
	for i := 1; i <= 5; i++ {
		burstyRequests <- i
	}
	close(burstyRequests)
	for req := range burstyRequests {
		<-burstyLimiter
		fmt.Println("request", req, time.Now())
	}
}
