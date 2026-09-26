// En el ejemplo anterior vimos cómo configurar un
// [servidor HTTP](http-server) simple. Los servidores HTTP son muy útiles para
// demostrar el uso de `context.Context` en el
// control de cancelación. Un `Context` transporta plazos de tiempo (deadlines),
// señales de cancelación y otros valores de ámbito de petición
// a través de límites de APIs y goroutines.
package main

import (
	"fmt"
	"net/http"
	"time"
)

func hello(w http.ResponseWriter, req *http.Request) {

	// La infraestructura de `net/http` crea un `context.Context` para cada petición,
	// disponible a través del método `Context()`.
	ctx := req.Context()
	fmt.Println("server: hello handler started")
	defer fmt.Println("server: hello handler ended")

	// Esperamos unos segundos antes de enviar una respuesta al
	// cliente. Esto simula algún trabajo en progreso que realiza el servidor.
	// Mientras se trabaja, monitoreamos el canal `Done()` del contexto
	// para detectar si debemos cancelar la tarea y retornar lo antes posible.
	select {
	case <-time.After(10 * time.Second):
		fmt.Fprintf(w, "hello\n")
	case <-ctx.Done():
		// El método `Err()` del contexto devuelve un error
		// que explica por qué se cerró el canal `Done()`.
		err := ctx.Err()
		fmt.Println("server:", err)
		internalError := http.StatusInternalServerError
		http.Error(w, err.Error(), internalError)
	}
}

func main() {

	// Como antes, registramos nuestro manejador en la ruta "/hello"
	// y comenzamos a servir peticiones.
	http.HandleFunc("/hello", hello)
	http.ListenAndServe(":8090", nil)
}
