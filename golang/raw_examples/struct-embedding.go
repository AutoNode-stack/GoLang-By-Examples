// Go admite la _incrustación_ (embedding) de estructuras e interfaces
// para expresar una _composición_ fluida de tipos.
// Esto no debe confundirse con [`//go:embed`](embed-directive), que es
// una directiva del compilador introducida en Go 1.16+ para incrustar
// archivos y carpetas dentro del binario de la aplicación.

package main

import "fmt"

type base struct {
	num int
}

func (b base) describe() string {
	return fmt.Sprintf("base with num=%v", b.num)
}

// Un `container` _incrusta_ un `base`. Una incrustación se define
// como un campo sin nombre de identificador.
type container struct {
	base
	str string
}

func main() {

	// Al crear estructuras con literales, debemos inicializar
	// la incrustación explícitamente; aquí el tipo incrustado
	// actúa como el nombre del campo.
	co := container{
		base: base{
			num: 1,
		},
		str: "some name",
	}

	// Podemos acceder a los campos de base directamente desde `co`,
	// por ejemplo `co.num`.
	fmt.Printf("co={num: %v, str: %v}\n", co.num, co.str)

	// Como alternativa, podemos escribir la ruta completa utilizando
	// el nombre del tipo incrustado.
	fmt.Println("also num:", co.base.num)

	// Dado que `container` incrusta `base`, los métodos de
	// `base` también pasan a ser métodos de `container`. Aquí
	// invocamos directamente sobre `co` un método incrustado
	// desde `base`.
	fmt.Println("describe:", co.describe())

	type describer interface {
		describe() string
	}

	// Incrustar estructuras con métodos permite otorgar implementaciones
	// de interfaces a otras estructuras. Aquí vemos que `container`
	// ahora implementa la interfaz `describer` gracias a que incrusta `base`.
	var d describer = co
	fmt.Println("describer:", d.describe())
}
