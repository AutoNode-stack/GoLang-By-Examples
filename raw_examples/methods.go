// Go admite _métodos_ definidos sobre tipos de estructuras (structs).

package main

import "fmt"

type rect struct {
	width, height int
}

// Este método `area` tiene un _tipo receptor_ (receiver) de `*rect`.
func (r *rect) area() int {
	return r.width * r.height
}

// Los métodos pueden definirse tanto para receptores de puntero como
// para receptores de valor. Aquí hay un ejemplo con receptor de valor.
func (r rect) perim() int {
	return 2*r.width + 2*r.height
}

func main() {
	r := rect{width: 10, height: 5}

	// Aquí invocamos los 2 métodos definidos para nuestra estructura.
	fmt.Println("area: ", r.area())
	fmt.Println("perim:", r.perim())

	// Go maneja automáticamente la conversión entre valores y punteros
	// en las llamadas a métodos. Es recomendable usar un receptor de puntero
	// para evitar copiar la estructura en cada invocación o para permitir
	// que el método mute la estructura receptora.
	rp := &r
	fmt.Println("area: ", rp.area())
	fmt.Println("perim:", rp.perim())
}
