// En este ejemplo veremos cómo implementar
// un _pool de trabajadores_ (worker pool) utilizando goroutines y canales.

package main

import (
	"fmt"
	"time"
)

// Aquí está el trabajador, del cual ejecutaremos varias
// instancias concurrentes. Estos trabajadores recibirán
// tareas en el canal `jobs` y enviarán los resultados
// correspondientes en `results`. Haremos una pausa de un segundo por tarea
// para simular un proceso computacionalmente costoso.
func worker(id int, jobs <-chan int, results chan<- int) {
	for j := range jobs {
		fmt.Println("worker", id, "started  job", j)
		time.Sleep(time.Second)
		fmt.Println("worker", id, "finished job", j)
		results <- j * 2
	}
}

func main() {

	// Para usar nuestro grupo de trabajadores necesitamos enviarles
	// tareas y recopilar sus resultados. Creamos 2 canales para ello.
	const numJobs = 5
	jobs := make(chan int, numJobs)
	results := make(chan int, numJobs)

	// Esto inicia 3 trabajadores, inicialmente bloqueados
	// debido a que aún no hay tareas en la cola.
	for w := 1; w <= 3; w++ {
		go worker(w, jobs, results)
	}

	// Aquí enviamos 5 `jobs` y luego cerramos (`close`) ese
	// canal para indicar que hemos enviado todo el trabajo disponible.
	for j := 1; j <= numJobs; j++ {
		jobs <- j
	}
	close(jobs)

	// Finalmente recopilamos todos los resultados del procesamiento.
	// Esto también garantiza que las goroutines trabajadoras hayan
	// culminado su labor. Una alternativa para aguardar múltiples
	// goroutines es emplear un [WaitGroup](waitgroups).
	for a := 1; a <= numJobs; a++ {
		<-results
	}
}
