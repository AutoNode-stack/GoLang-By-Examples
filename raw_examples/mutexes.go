// En el ejemplo anterior vimos cómo gestionar el estado de un contador
// simple utilizando [operaciones atómicas](atomic-counters).
// Para estados más complejos podemos recurrir a un [_mutex_](https://en.wikipedia.org/wiki/Mutual_exclusion)
// (exclusión mutua) para acceder a los datos de forma segura entre múltiples goroutines.

package main

import (
	"fmt"
	"sync"
)

// Container almacena un mapa de contadores; como deseamos
// actualizarlo concurrentemente desde múltiples goroutines,
// añadimos un `Mutex` para sincronizar el acceso.
// Ten en cuenta que los mutexes no deben copiarse; si este
// `struct` se pasa como parámetro, debe hacerse siempre
// por puntero.
type Container struct {
	mu       sync.Mutex
	counters map[string]int
}

func (c *Container) inc(name string) {
	// Bloqueamos el mutex antes de acceder a `counters`; lo liberamos
	// al final de la función mediante una sentencia [defer](defer).
	c.mu.Lock()
	defer c.mu.Unlock()
	c.counters[name]++
}

func main() {
	c := Container{
		// Observa que el valor cero de un mutex es completamente utilizable tal cual,
		// por lo que no se requiere inicialización explícita aquí.
		counters: map[string]int{"a": 0, "b": 0},
	}

	var wg sync.WaitGroup

	// Esta función incrementa un contador por nombre
	// dentro de un bucle.
	doIncrement := func(name string, n int) {
		for range n {
			c.inc(name)
		}
	}

	// Ejecutamos varias goroutines de manera concurrente; observa
	// que todas acceden al mismo `Container`, y dos de ellas
	// acceden al mismo contador "a".
	wg.Go(func() {
		doIncrement("a", 10000)
	})

	wg.Go(func() {
		doIncrement("a", 10000)
	})

	wg.Go(func() {
		doIncrement("b", 10000)
	})

	// Esperamos a que las goroutines finalicen.
	wg.Wait()
	fmt.Println(c.counters)
}
