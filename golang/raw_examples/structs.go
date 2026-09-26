// Los _structs_ en Go son colecciones tipadas de campos.
// Resultan sumamente útiles para agrupar datos y formar
// registros.

package main

import "fmt"

// Este tipo struct `person` tiene los campos `name` y `age`.
type person struct {
	name string
	age  int
}

// `newPerson` construye una nueva estructura person con el nombre indicado.
func newPerson(name string) *person {
	// Go es un lenguaje con recolección de basura (garbage collector); puedes retornar
	// con seguridad un puntero a una variable local: solo será
	// liberada por el recolector de basura cuando ya no existan
	// referencias activas hacia ella.
	p := person{name: name}
	p.age = 42
	return &p
}

func main() {

	// Esta sintaxis crea una nueva estructura con valores posicionales.
	fmt.Println(person{"Bob", 20})

	// Puedes nombrar explícitamente los campos al inicializar una estructura.
	fmt.Println(person{name: "Alice", age: 30})

	// Los campos omitidos se inicializarán con su respectivo valor cero.
	fmt.Println(person{name: "Fred"})

	// El prefijo `&` produce un puntero hacia la estructura.
	fmt.Println(&person{name: "Ann", age: 40})

	// En Go idiomático se acostumbra encapsular la creación de estructuras en funciones constructoras.
	fmt.Println(newPerson("Jon"))

	// Accede a los campos del struct mediante la notación de punto.
	s := person{name: "Sean", age: 50}
	fmt.Println(s.name)

	// Las estructuras son mutables.
	s.age = 51
	fmt.Println(s)

	// También puedes usar el punto con punteros a estructuras: los
	// punteros se desreferencian automáticamente.
	sp := &s
	sp.age = 52
	fmt.Println(sp.age)

	// Si un tipo struct solo se utiliza para un valor único, no
	// es necesario asignarle un nombre. El valor puede tener un
	// tipo struct anónimo. Esta técnica se utiliza comúnmente en
	// [pruebas basadas en tablas](testing-and-benchmarking).
	dog := struct {
		name   string
		isGood bool
	}{
		"Rex",
		true,
	}
	fmt.Println(dog)
}
