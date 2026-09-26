// Las _interfaces_ son colecciones con nombre de firmas de
// métodos.

package main

import (
	"fmt"
	"math"
)

// Aquí tenemos una interfaz básica para figuras geométricas.
type geometry interface {
	area() float64
	perim() float64
}

// Para nuestro ejemplo implementaremos esta interfaz en los
// tipos `rect` y `circle`.
type rect struct {
	width, height float64
}
type circle struct {
	radius float64
}

// Para implementar una interfaz en Go, solo necesitamos
// implementar todos los métodos declarados en ella. Aquí
// implementamos `geometry` en `rect`.
func (r rect) area() float64 {
	return r.width * r.height
}
func (r rect) perim() float64 {
	return 2*r.width + 2*r.height
}

// La implementación para `circle`.
func (c circle) area() float64 {
	return math.Pi * c.radius * c.radius
}
func (c circle) perim() float64 {
	return 2 * math.Pi * c.radius
}

// Si una variable tiene un tipo interfaz, podemos invocar
// los métodos declarados en dicha interfaz. Aquí tenemos una
// función genérica `measure` que aprovecha esto para operar
// sobre cualquier `geometry`.
func measure(g geometry) {
	fmt.Println(g)
	fmt.Println(g.area())
	fmt.Println(g.perim())
}

// En ocasiones resulta útil conocer el tipo en tiempo de ejecución de un
// valor de interfaz. Una opción es usar una *aserción de tipo* (type assertion)
// como se muestra aquí; otra alternativa es un [switch de tipo](switch).
func detectCircle(g geometry) {
	if c, ok := g.(circle); ok {
		fmt.Println("circle with radius", c.radius)
	}
}

func main() {
	r := rect{width: 3, height: 4}
	c := circle{radius: 5}

	// Tanto el tipo struct `circle` como `rect`
	// implementan la interfaz `geometry`, por lo que podemos usar
	// instancias de estas estructuras como argumentos para `measure`.
	measure(r)
	measure(c)

	detectCircle(r)
	detectCircle(c)
}
