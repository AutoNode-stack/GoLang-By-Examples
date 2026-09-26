// El mecanismo primordial para gestionar estado en Go es
// la comunicación a través de canales. Vimos esto, por ejemplo,
// con los [pools de trabajadores](worker-pools). Existen no obstante
// otras opciones para gestionar estado. Aquí examinaremos el uso
// del paquete `sync/atomic` para _contadores atómicos_
// accedidos por múltiples goroutines simultáneamente.

package main

import (
	"fmt"
	"sync"
	"sync/atomic"
)

func main() {

	// Usaremos un tipo entero atómico para representar nuestro
	// contador (siempre positivo).
	var ops atomic.Uint64

	// Un WaitGroup nos ayudará a esperar a que todas las goroutines
	// concluyan su trabajo.
	var wg sync.WaitGroup

	// Iniciaremos 50 goroutines que incrementarán el
	// contador exactamente 1000 veces cada una.
	for range 50 {
		wg.Go(func() {
			for range 1000 {
				// Para incrementar el contador de forma atómica usamos `Add`.
				ops.Add(1)
			}
		})
	}

	// Esperamos hasta que todas las goroutines hayan finalizado.
	wg.Wait()

	// En este punto ninguna goroutine escribe en 'ops', pero usando
	// `Load` es completamente seguro leer un valor de forma atómica incluso
	// mientras otras goroutines lo están actualizando (atómicamente).
	fmt.Println("ops:", ops.Load())
}
