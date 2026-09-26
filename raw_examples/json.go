// Go cuenta con soporte integrado para la codificación y decodificación
// de JSON, incluyendo tipos de datos tanto primitivos como personalizados.

package main

import (
	"bytes"
	"encoding/json/v2"
	"fmt"
	"strings"
)

// Utilizaremos estas dos estructuras para demostrar la codificación
// y decodificación de tipos personalizados a continuación.
type response1 struct {
	Page   int
	Fruits []string
}

// Únicamente los campos exportados serán codificados/decodificados en JSON.
// Los campos deben comenzar con mayúscula para ser exportados.
type response2 struct {
	Page   int      `json:"page"`
	Fruits []string `json:"fruits"`
}

func main() {

	// Primero veremos la codificación de tipos de datos básicos a
	// cadenas JSON. Aquí hay algunos ejemplos para valores atómicos.
	bolB, _ := json.Marshal(true)
	fmt.Println(string(bolB))

	intB, _ := json.Marshal(1)
	fmt.Println(string(intB))

	fltB, _ := json.Marshal(2.34)
	fmt.Println(string(fltB))

	strB, _ := json.Marshal("gopher")
	fmt.Println(string(strB))

	// Y aquí algunos ejemplos para slices y mapas, los cuales se codifican
	// en arrays y objetos JSON según lo esperado.
	slcD := []string{"apple", "peach", "pear"}
	slcB, _ := json.Marshal(slcD)
	fmt.Println(string(slcB))

	mapD := map[string]int{"apple": 5, "lettuce": 7}
	mapB, _ := json.Marshal(mapD)
	fmt.Println(string(mapB))

	// El paquete JSON puede codificar automáticamente tus
	// tipos de datos personalizados. Solo incluirá campos exportados
	// en la salida codificada y, por defecto, utilizará esos mismos
	// nombres como claves de JSON.
	res1D := &response1{
		Page:   1,
		Fruits: []string{"apple", "peach", "pear"}}
	res1B, _ := json.Marshal(res1D)
	fmt.Println(string(res1B))

	// Puedes usar etiquetas (tags) en las declaraciones de campos del struct
	// para personalizar los nombres de las claves JSON generadas. Revisa la
	// definición de `response2` arriba para ver un ejemplo de tales etiquetas.
	res2D := &response2{
		Page:   1,
		Fruits: []string{"apple", "peach", "pear"}}
	res2B, _ := json.Marshal(res2D)
	fmt.Println(string(res2B))

	// Ahora examinemos cómo decodificar datos JSON en valores de Go.
	// Aquí tenemos un ejemplo para una estructura de datos genérica.
	byt := []byte(`{"num":6.13,"strs":["a","b"]}`)

	// Necesitamos proporcionar una variable donde el paquete JSON
	// pueda alojar los datos decodificados. Este
	// `map[string]any` albergará un mapa de cadenas a
	// tipos de datos arbitrarios.
	var dat map[string]any

	// Aquí se realiza la decodificación real, junto con una verificación
	// de posibles errores asociados.
	// En aras de la brevedad omitimos el manejo riguroso de errores en
	// estos ejemplos didácticos; en código real de producción siempre
	// debes comprobar los errores y actuar en consecuencia.
	if err := json.Unmarshal(byt, &dat); err != nil {
		panic(err)
	}
	fmt.Println(dat)

	// Para utilizar los valores en el mapa decodificado,
	// necesitaremos convertirlos a su tipo correspondiente.
	// Por ejemplo, aquí convertimos el valor en `num` al
	// tipo esperado `float64`.
	num := dat["num"].(float64)
	fmt.Println(num)

	// Acceder a datos anidados requiere una serie de
	// aserciones de tipo.
	strs := dat["strs"].([]any)
	str1 := strs[0].(string)
	fmt.Println(str1)

	// También podemos decodificar JSON directamente en tipos de datos personalizados.
	// Esto aporta la gran ventaja de añadir seguridad de tipos estricta a
	// nuestros programas y elimina la necesidad de comprobaciones de tipo
	// al acceder a los datos decodificados.
	str := `{"page": 1, "fruits": ["apple", "peach"]}`
	res := response2{}
	_ = json.Unmarshal([]byte(str), &res)
	fmt.Println(res)
	fmt.Println(res.Fruits[0])

	// En los ejemplos anteriores siempre utilizamos bytes y
	// strings como intermediarios entre los datos y la
	// representación JSON en la salida estándar. También podemos
	// transmitir flujos de codificación JSON directamente a implementaciones
	// de `io.Writer` como `os.Stdout` o incluso cuerpos de respuesta HTTP.
	d := map[string]int{"apple": 5, "lettuce": 7}
	var buf bytes.Buffer
	_ = json.MarshalWrite(&buf, d)
	fmt.Println(buf.String())

	// La lectura en flujo continuo desde objetos `io.Reader` como `os.Stdin`
	// o cuerpos de peticiones HTTP se realiza mediante `json.UnmarshalRead`.
	res1 := response2{}
	_ = json.UnmarshalRead(strings.NewReader(str), &res1)
	fmt.Println(res1)
}
