// En ocasiones deseamos que nuestros programas en Go manejen
// inteligentemente [señales de Unix](https://en.wikipedia.org/wiki/Unix_signal).
// Por ejemplo, podríamos querer que un servidor cierre de forma ordenada (graceful shutdown)
// al recibir una señal `SIGTERM`, o que una herramienta de consola
// detenga el procesamiento si recibe `SIGINT`.
// Aquí tenemos una forma moderna de manejar señales utilizando contextos.

package main

import (
	"context"
	"fmt"
	"os/signal"
	"syscall"
)

func main() {
	// `signal.NotifyContext` devuelve un contexto que se cancela
	// cuando llega alguna de las señales listadas.
	ctx, stop := signal.NotifyContext(
		context.Background(), syscall.SIGINT, syscall.SIGTERM)
	defer stop()

	// El programa esperará aquí hasta que se reciba
	// una de las señales configuradas.
	fmt.Println("awaiting signal")
	<-ctx.Done()

	// `context.Cause` informa la razón por la cual se canceló el contexto.
	// Para una cancelación activada por señal, esto incluye
	// el valor de la señal.
	fmt.Println()
	fmt.Println(context.Cause(ctx))
	fmt.Println("exiting")
}
