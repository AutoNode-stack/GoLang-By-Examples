// Las URLs proporcionan una [forma uniforme de localizar recursos](https://adam.herokuapp.com/past/2010/3/30/urls_are_the_uniform_way_to_locate_resources/).
// Aquí veremos cómo parsear URLs en Go.

package main

import (
	"fmt"
	"net"
	"net/url"
)

func main() {

	// Parsearemos esta URL de ejemplo, la cual incluye
	// esquema, credenciales de autenticación, host, puerto, ruta,
	// parámetros de consulta y fragmento.
	s := "postgres://user:pass@host.com:5432/path?k=v#f"

	// Parseamos la URL y aseguramos que no contenga errores.
	u, err := url.Parse(s)
	if err != nil {
		panic(err)
	}

	// Acceder al esquema es directo.
	fmt.Println(u.Scheme)

	// `User` contiene toda la información de autenticación; invoca
	// `Username` y `Password` sobre él para obtener los valores individuales.
	fmt.Println(u.User)
	fmt.Println(u.User.Username())
	p, _ := u.User.Password()
	fmt.Println(p)

	// `Host` contiene tanto el nombre del host como el puerto,
	// si están presentes. Usa `SplitHostPort` para extraerlos por separado.
	fmt.Println(u.Host)
	host, port, _ := net.SplitHostPort(u.Host)
	fmt.Println(host)
	fmt.Println(port)

	// Aquí extraemos la ruta (`path`) y el fragmento posterior
	// al símbolo `#`.
	fmt.Println(u.Path)
	fmt.Println(u.Fragment)

	// Para obtener los parámetros de consulta en una cadena con formato `k=v`,
	// usa `RawQuery`. También puedes parsear los parámetros
	// hacia un mapa. Los mapas de parámetros resultantes van de
	// cadenas a slices de cadenas, por lo que accede a `[0]`
	// si solo necesitas el primer valor.
	fmt.Println(u.RawQuery)
	m, _ := url.ParseQuery(u.RawQuery)
	fmt.Println(m)
	fmt.Println(m["k"][0])
}
