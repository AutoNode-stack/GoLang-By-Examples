// Los _tipos enumerados_ (enums) son un caso especial de
// [tipos suma](https://en.wikipedia.org/wiki/Algebraic_data_type).
// Un enum es un tipo que posee un número fijo de valores posibles,
// cada uno con un nombre distintivo. Go no cuenta con una palabra clave
// `enum` dedicada en su sintaxis, pero los enums son muy sencillos
// de implementar usando los modismos habituales del lenguaje.

package main

import "fmt"

// Nuestro tipo de enumeración `ServerState` tiene un tipo subyacente `int`.
type ServerState int

// Los valores posibles para `ServerState` se definen como
// constantes. La palabra reservada especial [iota](https://go.dev/ref/spec#Iota)
// genera valores constantes sucesivos de forma automática; en este
// caso 0, 1, 2 y así sucesivamente.
const (
	StateIdle ServerState = iota
	StateConnected
	StateError
	StateRetrying
)

// Al implementar la interfaz [fmt.Stringer](https://pkg.go.dev/fmt#Stringer),
// los valores de `ServerState` pueden imprimirse o convertirse
// a cadenas de texto.
//
// Esto puede volverse tedioso si hay muchos valores posibles. En tales casos,
// la herramienta [stringer](https://pkg.go.dev/golang.org/x/tools/cmd/stringer)
// puede usarse junto con `go:generate` para automatizar el
// proceso. Consulta [este artículo](https://eli.thegreenplace.net/2021/a-comprehensive-guide-to-go-generate)
// para una explicación más exhaustiva.
var stateName = map[ServerState]string{
	StateIdle:      "idle",
	StateConnected: "connected",
	StateError:     "error",
	StateRetrying:  "retrying",
}

func (ss ServerState) String() string {
	return stateName[ss]
}

func main() {
	ns := transition(StateIdle)
	fmt.Println(ns)
	// Si tenemos un valor de tipo `int`, no podemos pasarlo a `transition`: el
	// compilador señalará un error de incompatibilidad de tipos. Esto otorga cierta
	// seguridad de tipos en tiempo de compilación para los enums.

	ns2 := transition(ns)
	fmt.Println(ns2)
}

// `transition` emula una transición de estado para un
// servidor; toma el estado existente y retorna
// un nuevo estado.
func transition(s ServerState) ServerState {
	switch s {
	case StateIdle:
		return StateConnected
	case StateConnected, StateRetrying:
		// Supongamos que aquí evaluamos ciertos predicados para
		// determinar el próximo estado...
		return StateIdle
	case StateError:
		return StateError
	default:
		panic(fmt.Errorf("unknown state: %s", s))
	}
}
