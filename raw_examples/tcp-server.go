// El paquete `net` provee las herramientas necesarias para construir
// fácilmente servidores de sockets TCP.
package main

import (
	"bufio"
	"fmt"
	"log"
	"net"
	"strings"
)

func main() {

	// `net.Listen` inicia el servidor en la red indicada
	// (TCP) y dirección (puerto 8090 en todas las interfaces).
	listener, err := net.Listen("tcp", ":8090")
	if err != nil {
		log.Fatal("Error listening:", err)
	}

	// Cierra el listener para liberar el puerto
	// cuando la aplicación finalice.
	defer listener.Close()

	// Bucle indefinido para aceptar nuevas conexiones de clientes.
	for {
		// Espera una conexión entrante.
		conn, err := listener.Accept()
		if err != nil {
			log.Println("Error accepting conn:", err)
			continue
		}

		// Usamos una goroutine aquí para atender la conexión,
		// permitiendo que el bucle principal continúe aceptando más
		// conexiones entrantes.
		go handleConnection(conn)
	}
}

// `handleConnection` gestiona una única conexión de cliente,
// leyendo una línea de texto del cliente y retornando una respuesta.
func handleConnection(conn net.Conn) {
	// Cerrar la conexión libera los recursos cuando
	// terminamos de interactuar con el cliente.
	defer conn.Close()

	// Usa `bufio.NewReader` para leer una línea de datos
	// del cliente (delimitada por salto de línea).
	reader := bufio.NewReader(conn)
	message, err := reader.ReadString('\n')
	if err != nil {
		log.Printf("Read error: %v", err)
		return
	}

	// Crea y envía una respuesta de vuelta al cliente,
	// demostrando comunicación bidireccional.
	ackMsg := strings.ToUpper(strings.TrimSpace(message))
	response := fmt.Sprintf("ACK: %s\n", ackMsg)
	_, err = conn.Write([]byte(response))
	if err != nil {
		log.Printf("Server write error: %v", err)
	}
}
