// Las _sentencias switch_ expresan condicionales a través de múltiples
// ramas de ejecución.

package main

import (
	"fmt"
	"time"
)

func main() {

	// Aquí hay un `switch` básico.
	i := 2
	fmt.Print("Write ", i, " as ")
	switch i {
	case 1:
		fmt.Println("one")
	case 2:
		fmt.Println("two")
	case 3:
		fmt.Println("three")
	}

	// Puedes usar comas para separar múltiples expresiones
	// en la misma cláusula `case`. En este ejemplo también
	// usamos el caso opcional `default`.
	switch time.Now().Weekday() {
	case time.Saturday, time.Sunday:
		fmt.Println("It's the weekend")
	default:
		fmt.Println("It's a weekday")
	}

	// Un `switch` sin expresión es una forma alternativa de
	// expresar la lógica if/else. Aquí también demostramos cómo las
	// expresiones en `case` pueden ser valores no constantes.
	t := time.Now()
	switch {
	case t.Hour() < 12:
		fmt.Println("It's before noon")
	default:
		fmt.Println("It's after noon")
	}

	// Un `switch` de tipo compara tipos en lugar de valores. Puedes
	// usarlo para descubrir el tipo dinámico de un valor de interfaz.
	// En este ejemplo, la variable `t` tendrá el
	// tipo correspondiente a su cláusula evaluada.
	whatAmI := func(i any) {
		switch t := i.(type) {
		case bool:
			fmt.Println("I'm a bool")
		case int:
			fmt.Println("I'm an int")
		default:
			fmt.Printf("Don't know type %T\n", t)
		}
	}
	whatAmI(true)
	whatAmI(1)
	whatAmI("hey")
}
