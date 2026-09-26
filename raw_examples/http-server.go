// Escribir un servidor HTTP básico es muy directo utilizando el
// paquete `net/http`.
package main

import (
	"fmt"
	"net/http"
)

// Un concepto fundamental en los servidores de `net/http` son
// los *manejadores* (handlers). Un handler es un objeto que implementa la
// interfaz `http.Handler`. Una forma común de escribir
// un handler es utilizar el adaptador `http.HandlerFunc`
// sobre funciones con la firma adecuada.
func hello(w http.ResponseWriter, req *http.Request) {

	// Las funciones que actúan como handlers reciben un
	// `http.ResponseWriter` y un `http.Request` como
	// argumentos. El escritor de respuesta se utiliza para construir la
	// respuesta HTTP. Aquí nuestra respuesta sencilla es solo
	// "hello\n".
	fmt.Fprintf(w, "hello\n")
}

func headers(w http.ResponseWriter, req *http.Request) {

	// Este handler realiza una tarea un poco más
	// sofisticada leyendo todas las cabeceras de la petición HTTP
	// y reflejándolas en el cuerpo de la respuesta.
	for name, headers := range req.Header {
		for _, h := range headers {
			fmt.Fprintf(w, "%v: %v\n", name, h)
		}
	}
}

func main() {

	// Registramos nuestros manejadores en las rutas del servidor usando la
	// función de conveniencia `http.HandleFunc`. Esta configura
	// el *enrutador predeterminado* en el paquete `net/http` y
	// toma una función como argumento.
	http.HandleFunc("/hello", hello)
	http.HandleFunc("/headers", headers)

	// Finalmente, invocamos `ListenAndServe` con el puerto
	// y un handler. Pasar `nil` le indica que use el enrutador
	// predeterminado que acabamos de configurar.
	http.ListenAndServe(":8090", nil)
}
