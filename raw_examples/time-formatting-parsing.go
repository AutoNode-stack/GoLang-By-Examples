// Go admite el formateo y parseo de tiempo mediante diseños
// (layouts) basados en ejemplos mnemotécnicos.

package main

import (
	"fmt"
	"time"
)

func main() {
	p := fmt.Println

	// Aquí tenemos un ejemplo básico de cómo formatear una hora
	// según la norma RFC3339, usando la constante de diseño
	// correspondiente.
	t := time.Now()
	p(t.Format(time.RFC3339))

	// El parseo de fechas utiliza los mismos valores de diseño que `Format`.
	t1, _ := time.Parse(time.RFC3339, "2012-11-01T22:08:41+00:00")
	p(t1)

	// `Format` y `Parse` emplean formatos basados en ejemplos. Habitualmente
	// usarás una constante de `time` para estos formatos, pero
	// también puedes proporcionar patrones personalizados. Los formatos deben basarse en la
	// fecha de referencia canónica `Mon Jan 2 15:04:05 MST 2006` para indicar
	// el patrón con el cual formatear/parsear una fecha/cadena dada.
	// La fecha de ejemplo debe coincidir con dicha referencia: el año 2006,
	// 15 para la hora, lunes (Mon) para el día de la semana, etc.
	p(t.Format("3:04PM"))
	p(t.Format("Mon Jan _2 15:04:05 2006"))
	p(t.Format("2006-01-02T15:04:05.999999-07:00"))
	form := "3 04 PM"
	t2, _ := time.Parse(form, "8 41 PM")
	p(t2)

	// Para representaciones puramente numéricas también puedes
	// usar formateo de cadenas estándar extrayendo los componentes
	// individuales del valor de tiempo.
	fmt.Printf("%d-%02d-%02dT%02d:%02d:%02d-00:00\n",
		t.Year(), t.Month(), t.Day(),
		t.Hour(), t.Minute(), t.Second())

	// `Parse` devolverá un error descriptivo ante una entrada mal formada,
	// explicando con exactitud el problema de parseo.
	_, err := time.Parse("Mon Jan _2 15:04:05 2006", "8:41PM")
	p(err)
}
