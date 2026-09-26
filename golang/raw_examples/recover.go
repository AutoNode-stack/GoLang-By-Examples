// Go permite _recuperarse_ (recover) de un panic utilizando
// la función incorporada `recover`. Un `recover` puede
// evitar que un `panic` aborte el programa y permitirle
// continuar con su ejecución normal.

// Un ejemplo donde esto resulta de gran utilidad: un servidor
// no debería caerse si una de las conexiones de clientes
// experimenta un error crítico. En su lugar, el servidor
// debe cerrar esa conexión particular y seguir atendiendo a los
// demás clientes. De hecho, esto es exactamente lo que el paquete `net/http`
// de Go hace por defecto en sus servidores HTTP.

package main

import "fmt"

// Esta función dispara un panic.
func mayPanic() {
	panic("a problem")
}

func main() {
	// `recover` debe ser invocado dentro de una función pospuesta con `defer`.
	// Cuando la función contenedora entra en panic, el defer se
	// activará y la llamada a `recover` en su interior capturará
	// el panic.
	defer func() {
		if r := recover(); r != nil {
			// El valor de retorno de `recover` es el error emitido en
			// la llamada a `panic`.
			fmt.Println("Recovered. Error:\n", r)
		}
	}()

	mayPanic()

	// Este código no llegará a ejecutarse, dado que `mayPanic` dispara un panic.
	// La ejecución de `main` se detiene en el punto del
	// panic y se reanuda en la clausura pospuesta con defer.
	fmt.Println("After mayPanic()")
}
