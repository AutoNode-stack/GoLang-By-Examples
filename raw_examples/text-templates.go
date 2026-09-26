// Go ofrece soporte integrado para crear contenido dinámico o mostrar
// salidas personalizadas al usuario mediante el paquete `text/template`. Un paquete
// hermano denominado `html/template` provee la misma API pero cuenta con
// funciones de seguridad adicionales para evitar vulnerabilidades XSS en HTML.

package main

import (
	"os"
	"text/template"
)

func main() {

	// Podemos crear una plantilla nueva y parsear su cuerpo
	// a partir de una cadena de texto. Las plantillas combinan texto estático y "acciones"
	// delimitadas por `{{...}}` que se utilizan para insertar datos dinámicos.
	t1 := template.New("t1")
	t1, err := t1.Parse("Value is {{.}}\n")
	if err != nil {
		panic(err)
	}

	// De forma alternativa, podemos usar `template.Must` para disparar un panic
	// si `Parse` devuelve un error. Esto resulta especialmente conveniente
	// para plantillas inicializadas en el ámbito global.
	t1 = template.Must(t1.Parse("Value: {{.}}\n"))

	// Al "ejecutar" la plantilla, generamos su texto con
	// valores concretos para sus acciones. La acción `{{.}}`
	// se reemplaza por el valor pasado como parámetro a `Execute`.
	t1.Execute(os.Stdout, "some text")
	t1.Execute(os.Stdout, 5)
	t1.Execute(os.Stdout, []string{
		"Go",
		"Rust",
		"C++",
		"C#",
	})

	// Función auxiliar que utilizaremos a continuación.
	Create := func(name, t string) *template.Template {
		return template.Must(template.New(name).Parse(t))
	}

	// Si los datos corresponden a un struct podemos usar la acción `{{.FieldName}}` para acceder
	// a sus campos. Los campos deben estar exportados (iniciar con mayúscula) para ser accesibles durante la
	// ejecución de la plantilla.
	t2 := Create("t2", "Name: {{.Name}}\n")

	t2.Execute(os.Stdout, struct {
		Name string
	}{"Jane Doe"})

	// Lo mismo aplica para los mapas; en los mapas no existe restricción
	// en cuanto al uso de mayúsculas o minúsculas en las claves.
	t2.Execute(os.Stdout, map[string]string{
		"Name": "Mickey Mouse",
	})

	// if/else proporcionan ejecución condicional en las plantillas. Un valor se considera
	// falso si coincide con el valor cero de su tipo, como 0, cadena vacía,
	// puntero nil, etc.
	// Este ejemplo demuestra además otra característica útil
	// de las plantillas: usar `-` en las acciones para recortar espacios en blanco adyacentes.
	t3 := Create("t3",
		"{{if . -}} yes {{else -}} no {{end}}\n")
	t3.Execute(os.Stdout, "not empty")
	t3.Execute(os.Stdout, "")

	// Los bloques range nos permiten iterar a través de slices, arrays, mapas o canales. Dentro
	// del bloque range, `{{.}}` se vincula al elemento actual de la iteración.
	t4 := Create("t4",
		"Range: {{range .}}{{.}} {{end}}\n")
	t4.Execute(os.Stdout,
		[]string{
			"Go",
			"Rust",
			"C++",
			"C#",
		})
}
