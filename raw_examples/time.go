// Go ofrece un soporte integral para el manejo de fechas, horas y duraciones;
// aquí tenemos algunos ejemplos clave.

package main

import (
	"fmt"
	"time"
)

func main() {
	p := fmt.Println

	// Comenzaremos obteniendo la fecha y hora actual con `time.Now()`.
	now := time.Now()
	p(now)

	// Puedes construir una estructura `time` proporcionando el
	// año, mes, día, etc. Las horas siempre están asociadas
	// a una `Location`, es decir, una zona horaria.
	then := time.Date(
		2009, 11, 17, 20, 34, 58, 651387237, time.UTC)
	p(then)

	// Puedes extraer los diversos componentes del valor de tiempo
	// según se espera.
	p(then.Year())
	p(then.Month())
	p(then.Day())
	p(then.Hour())
	p(then.Minute())
	p(then.Second())
	p(then.Nanosecond())
	p(then.Location())

	// El día de la semana `Weekday` (de lunes a domingo) también está disponible.
	p(then.Weekday())

	// Estos métodos comparan dos instantes temporales, evaluando si el
	// primero ocurre antes, después o al mismo tiempo exacto
	// que el segundo, respectivamente.
	p(then.Before(now))
	p(then.After(now))
	p(then.Equal(now))

	// El método `Sub` devuelve una estructura `Duration` que representa
	// el intervalo de tiempo entre dos instantes.
	diff := now.Sub(then)
	p(diff)

	// Podemos calcular la longitud de la duración en
	// diversas unidades temporales.
	p(diff.Hours())
	p(diff.Minutes())
	p(diff.Seconds())
	p(diff.Nanoseconds())

	// Puedes usar `Add` para avanzar un instante de tiempo según una
	// duración dada, o con un `-` para retroceder en el tiempo.
	p(then.Add(diff))
	p(then.Add(-diff))
}
