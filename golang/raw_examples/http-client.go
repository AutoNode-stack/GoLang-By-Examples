// La biblioteca estándar de Go incluye un soporte sobresaliente
// para clientes y servidores HTTP en el paquete `net/http`.
// En este ejemplo lo utilizaremos para emitir peticiones
// HTTP básicas.
package main

import (
	"bufio"
	"fmt"
	"net/http"
)

func main() {

	// Emite una petición HTTP GET a un servidor. `http.Get` es un
	// atajo conveniente que evita tener que crear un objeto `http.Client`
	// y llamar a su método `Get`; utiliza el objeto
	// `http.DefaultClient`, el cual posee configuraciones predeterminadas útiles.
	resp, err := http.Get("https://gobyexample.com")
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()

	// Imprime el estado de la respuesta HTTP.
	fmt.Println("Response status:", resp.Status)

	// Imprime las primeras 5 líneas del cuerpo de la respuesta.
	scanner := bufio.NewScanner(resp.Body)
	for i := 0; scanner.Scan() && i < 5; i++ {
		fmt.Println(scanner.Text())
	}

	if err := scanner.Err(); err != nil {
		panic(err)
	}
}
