// _Cerrar_ un canal indica que ya no se enviarán más valores
// a través de él. Esto resulta muy útil para comunicar
// la finalización del trabajo a los receptores del canal.

package main

import "fmt"

// En este ejemplo utilizaremos un canal `jobs` para comunicar
// el trabajo a realizar desde la goroutine `main()` a una
// goroutine trabajadora. Cuando ya no tengamos más trabajos para
// el trabajador, haremos un `close` sobre el canal `jobs`.
func main() {
	jobs := make(chan int, 5)
	done := make(chan bool)

	// Aquí está la goroutine trabajadora. Recibe repetidamente
	// de `jobs` mediante `j, more := <-jobs`. En esta variante
	// de recepción con dos valores, `more` será `false` si
	// `jobs` ha sido cerrado y todos los valores en el canal
	// ya han sido recibidos. Usamos esto para notificar en
	// `done` una vez que hayamos procesado todos los trabajos.
	go func() {
		for {
			j, more := <-jobs
			if more {
				fmt.Println("received job", j)
			} else {
				fmt.Println("received all jobs")
				done <- true
				return
			}
		}
	}()

	// Esto envía 3 trabajos al trabajador a través del canal
	// `jobs`, y luego lo cierra.
	for j := 1; j <= 3; j++ {
		jobs <- j
		fmt.Println("sent job", j)
	}
	close(jobs)
	fmt.Println("sent all jobs")

	// Esperamos al trabajador usando el enfoque de
	// [sincronización](channel-synchronization) que vimos anteriormente.
	<-done

	// Leer de un canal cerrado tiene éxito inmediatamente,
	// devolviendo el valor cero del tipo subyacente.
	// El segundo valor de retorno opcional es `true` si el
	// valor recibido provino de una operación de envío exitosa,
	// o `false` si es un valor cero generado porque el canal
	// está cerrado y vacío.
	_, ok := <-jobs
	fmt.Println("received more jobs:", ok)
}
