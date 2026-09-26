// Go ofrece soporte integrado para XML y formatos afines
// mediante el paquete `encoding/xml`.

package main

import (
	"encoding/xml"
	"fmt"
)

// Plant se mapeará a XML. De forma similar a los
// ejemplos de JSON, las etiquetas de campo (field tags) contienen directivas para el
// codificador y decodificador. Aquí usamos algunas características especiales
// del paquete XML: el campo `XMLName` dicta
// el nombre del elemento XML que representa esta estructura;
// `id,attr` indica que el campo `Id` es un _atributo_ XML
// en lugar de un elemento hijo anidado.
type Plant struct {
	XMLName xml.Name `xml:"plant"`
	Id      int      `xml:"id,attr"`
	Name    string   `xml:"name"`
	Origin  []string `xml:"origin"`
}

func (p Plant) String() string {
	return fmt.Sprintf("Plant id=%v, name=%v, origin=%v",
		p.Id, p.Name, p.Origin)
}

func main() {
	coffee := &Plant{Id: 27, Name: "Coffee"}
	coffee.Origin = []string{"Ethiopia", "Brazil"}

	// Emitimos el XML que representa nuestra planta; usamos
	// `MarshalIndent` para producir una salida formateada
	// legible para humanos.
	out, _ := xml.MarshalIndent(coffee, " ", "  ")
	fmt.Println(string(out))

	// Para agregar una cabecera XML genérica a la salida, la concatenamos
	// explícitamente.
	fmt.Println(xml.Header + string(out))

	// Usa `Unmarshal` para parsear un flujo de bytes con XML
	// hacia una estructura de datos. Si el XML está mal formado o
	// no puede mapearse sobre Plant, se devolverá un error descriptivo.
	var p Plant
	if err := xml.Unmarshal(out, &p); err != nil {
		panic(err)
	}
	fmt.Println(p)

	tomato := &Plant{Id: 81, Name: "Tomato"}
	tomato.Origin = []string{"Mexico", "California"}

	// La etiqueta de campo `parent>child>plant` indica al codificador
	// que anide todas las etiquetas `plant` bajo `<parent><child>...`
	type Nesting struct {
		XMLName xml.Name `xml:"nesting"`
		Plants  []*Plant `xml:"parent>child>plant"`
	}

	nesting := &Nesting{}
	nesting.Plants = []*Plant{coffee, tomato}

	out, _ = xml.MarshalIndent(nesting, " ", "  ")
	fmt.Println(string(out))
}
