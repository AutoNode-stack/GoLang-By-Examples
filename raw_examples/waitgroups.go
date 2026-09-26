// Para esperar a que múltiples goroutines concluyan su ejecución,
// podemos utilizar un *wait group* (`sync.WaitGroup`).

package main

import (
	"fmt"
	"sync"
	"time"
)

// Esta es la función que ejecutaremos en cada goroutine.
func worker(id int) {
	fmt.Printf("Worker %d starting\n", id)

	// Pausa para simular una tarea pesada.
	time.Sleep(time.Second)
	fmt.Printf("Worker %d done\n", id)
}

func main() {

	// Este WaitGroup se utiliza para esperar a que terminen todas las
	// goroutines iniciadas aquí. Nota: si un WaitGroup se pasa explícitamente
	// a funciones, debe hacerse siempre *por puntero*.
	var wg sync.WaitGroup

	// Iniciamos varias goroutines utilizando `WaitGroup.Go`
	for i := 1; i <= 5; i++ {
		wg.Go(func() {
			worker(i)
		})
	}

	// Nos bloqueamos hasta que todas las goroutines iniciadas por `wg`
	// hayan finalizado. Una goroutine finaliza cuando su función invocada retorna.
	wg.Wait()

	// Ten en cuenta que este enfoque no proporciona una forma directa
	// de propagar errores desde los trabajadores. Para casos de uso más
	// avanzados, considera utilizar el
	// [paquete errgroup](https://pkg.go.dev/golang.org/x/sync/errgroup).
}
