# -*- coding: utf-8 -*-
import os

TOPICS_G4 = {
    "sorting": {
        "go": """// El paquete `slices` de Go implementa funciones de ordenamiento para tipos
// primitivos y tipos definidos por el usuario. Primero examinaremos el ordenamiento
// de tipos integrados en el lenguaje.

package main

import (
	"fmt"
	"slices"
)

func main() {

	// Las funciones de ordenamiento son genéricas y funcionan con cualquier
	// tipo primitivo _ordenado_. Para consultar la lista de tipos ordenados,
	// revisa [cmp.Ordered](https://pkg.go.dev/cmp#Ordered).
	strs := []string{"c", "a", "b"}
	slices.Sort(strs)
	fmt.Println("Strings:", strs)

	// Un ejemplo de ordenamiento de enteros `int`.
	ints := []int{7, 2, 4}
	slices.Sort(ints)
	fmt.Println("Ints:   ", ints)

	// También podemos usar el paquete `slices` para verificar si
	// un slice ya se encuentra ordenado.
	s := slices.IsSorted(ints)
	fmt.Println("Sorted: ", s)
}
""",
        "sh": None
    },

    "sorting-by-functions": {
        "go": """// En ocasiones necesitaremos ordenar una colección según un criterio
// diferente a su orden natural. Por ejemplo, supongamos que
// deseamos ordenar cadenas por su longitud en lugar de hacerlo
// alfabéticamente. Aquí tenemos un ejemplo de ordenamiento personalizado
// en Go.

package main

import (
	"cmp"
	"fmt"
	"slices"
)

func main() {
	fruits := []string{"peach", "banana", "kiwi"}

	// Implementamos una función de comparación para la longitud
	// de las cadenas. `cmp.Compare` resulta muy conveniente para esto.
	lenCmp := func(a, b string) int {
		return cmp.Compare(len(a), len(b))
	}

	// Ahora podemos invocar `slices.SortFunc` con esta función de
	// comparación personalizada para ordenar `fruits` según la longitud del nombre.
	slices.SortFunc(fruits, lenCmp)
	fmt.Println(fruits)

	// Podemos utilizar la misma técnica para ordenar un slice de
	// valores que no sean tipos primitivos.
	type Person struct {
		name string
		age  int
	}

	people := []Person{
		Person{name: "Jax", age: 37},
		Person{name: "TJ", age: 25},
		Person{name: "Alex", age: 72},
	}

	// Ordenamos `people` por edad utilizando `slices.SortFunc`.
	//
	// Nota: si el struct `Person` es grande,
	// es recomendable que el slice contenga `*Person` en su lugar
	// y ajustar la función de comparación adecuadamente. ¡Ante la
	// duda, realiza un [benchmark](testing-and-benchmarking)!
	slices.SortFunc(people,
		func(a, b Person) int {
			return cmp.Compare(a.age, b.age)
		})
	fmt.Println(people)
}
""",
        "sh": None
    },

    "panic": {
        "go": """// Un `panic` suele significar que algo salió inesperadamente
// mal. Principalmente lo usamos para fallar rápidamente (fail-fast) ante errores
// que no deberían ocurrir durante la operación normal, o que no
// estamos preparados para manejar de forma elegante.

package main

import (
	"os"
	"path/filepath"
)

func main() {

	// Usaremos panic a lo largo de este sitio para comprobar
	// errores inesperados. Este es el único programa del
	// sitio diseñado para disparar un panic intencionadamente.
	panic("a problem")

	// Un uso común de panic es abortar si una función
	// devuelve un valor de error que no sabemos (o no deseamos)
	// manejar. Aquí tenemos un ejemplo de
	// disparar `panic` si ocurre un error inesperado al crear un archivo nuevo.
	path := filepath.Join(os.TempDir(), "file")
	_, err := os.Create(path)
	if err != nil {
		panic(err)
	}
}
""",
        "sh": """# Ejecutar este programa provocará un panic, imprimirá
# un mensaje de error con las trazas de goroutines y finalizará
# con un estado distinto de cero.

# Cuando se dispara el primer panic en `main`, el programa termina
# sin alcanzar el resto del código. Si deseas ver al programa
# intentar crear el archivo temporal, comenta la primera línea de panic.
$ go run panic.go
panic: a problem

goroutine 1 [running]:
main.main()
	/.../panic.go:12 +0x47
...
exit status 2

# Ten en cuenta que, a diferencia de otros lenguajes que emplean excepciones
# para el manejo común de errores, en Go es idiomático
# utilizar valores de retorno explícitos siempre que sea posible.
"""
    },

    "defer": {
        "go": """// _Defer_ se utiliza para asegurar que una llamada a función se
// ejecute más adelante en la ejecución del programa, generalmente con
// fines de limpieza y liberación de recursos. `defer` se utiliza frecuentemente
// donde en otros lenguajes se emplearían `ensure` o `finally`.

package main

import (
	"fmt"
	"os"
	"path/filepath"
)

// Supongamos que deseamos crear un archivo, escribir en él
// y luego cerrarlo cuando hayamos concluido. Así es como
// podríamos lograrlo con `defer`.
func main() {

	// Inmediatamente después de obtener un objeto de archivo con
	// `createFile`, posponemos el cierre de dicho archivo
	// mediante `closeFile`. Esto se ejecutará al término
	// de la función contenedora (`main`), una vez que
	// `writeFile` haya concluido.
	path := filepath.Join(os.TempDir(), "defer.txt")
	f := createFile(path)
	defer closeFile(f)
	writeFile(f)
}

func createFile(p string) *os.File {
	fmt.Println("creating")
	f, err := os.Create(p)
	if err != nil {
		panic(err)
	}
	return f
}

func writeFile(f *os.File) {
	fmt.Println("writing")
	fmt.Fprintln(f, "data")
}

func closeFile(f *os.File) {
	fmt.Println("closing")
	err := f.Close()
	// Es fundamental verificar si ocurrieron errores al cerrar un
	// archivo, incluso dentro de una función pospuesta con defer.
	if err != nil {
		panic(err)
	}
}
""",
        "sh": """# Ejecutar el programa confirma que el archivo se cierra
# debidamente tras escribir en él.
$ go run defer.go
creating
writing
closing
"""
    },

    "recover": {
        "go": """// Go permite _recuperarse_ (recover) de un panic utilizando
// la función incorporada `recover`. Un `recover` puede
// evitar que un `panic` aborte el programa y permitirle
// continuar con su ejecución normal.

// Un ejemplo donde esto resulta de gran utilidad: un servidor
// no debería caerse si una de las conexiones de clientes
// experimenta un error crítico. En su lugar, el servidor
// debe cerrar esa conexión particular y seguir atendiendo a los
// demás clientes. De hecho, esto es exactamente lo que el paquete `net/http`
// de Go hace por defecto en sus servidores HTTP.

package main

import "fmt"

// Esta función dispara un panic.
func mayPanic() {
	panic("a problem")
}

func main() {
	// `recover` debe ser invocado dentro de una función pospuesta con `defer`.
	// Cuando la función contenedora entra en panic, el defer se
	// activará y la llamada a `recover` en su interior capturará
	// el panic.
	defer func() {
		if r := recover(); r != nil {
			// El valor de retorno de `recover` es el error emitido en
			// la llamada a `panic`.
			fmt.Println("Recovered. Error:\\n", r)
		}
	}()

	mayPanic()

	// Este código no llegará a ejecutarse, dado que `mayPanic` dispara un panic.
	// La ejecución de `main` se detiene en el punto del
	// panic y se reanuda en la clausura pospuesta con defer.
	fmt.Println("After mayPanic()")
}
""",
        "sh": None
    },

    "string-functions": {
        "go": """// El paquete `strings` de la biblioteca estándar proporciona numerosas
// funciones útiles relacionadas con cadenas de texto. Aquí hay algunos ejemplos
// para familiarizarse con el paquete.

package main

import (
	"fmt"
	s "strings"
)

// Asignamos un alias a `fmt.Println` con un nombre más breve ya que lo
// usaremos repetidamente a continuación.
var p = fmt.Println

func main() {

	// Aquí hay una muestra de las funciones disponibles en
	// `strings`. Como se trata de funciones del paquete
	// y no de métodos propios del objeto string, debemos
	// pasar la cadena en cuestión como primer argumento
	// a la función. Puedes encontrar muchas más funciones
	// en la documentación de [`strings`](https://pkg.go.dev/strings).
	p("Contains:  ", s.Contains("test", "es"))
	p("Count:     ", s.Count("test", "t"))
	p("HasPrefix: ", s.HasPrefix("test", "te"))
	p("HasSuffix: ", s.HasSuffix("test", "st"))
	p("Index:     ", s.Index("test", "e"))
	p("Join:      ", s.Join([]string{"a", "b"}, "-"))
	p("Repeat:    ", s.Repeat("a", 5))
	p("Replace:   ", s.Replace("foo", "o", "0", -1))
	p("Replace:   ", s.Replace("foo", "o", "0", 1))
	p("Split:     ", s.Split("a-b-c-d-e", "-"))
	p("ToLower:   ", s.ToLower("TEST"))
	p("ToUpper:   ", s.ToUpper("test"))
}
""",
        "sh": None
    },

    "string-formatting": {
        "go": """// Go ofrece un soporte sobresaliente para el formateo de cadenas siguiendo
// la tradición de `printf`. Aquí tenemos algunos ejemplos de tareas
// habituales de formateo de texto.

package main

import (
	"fmt"
	"os"
)

type point struct {
	x, y int
}

func main() {

	// Go ofrece varios "verbos" de impresión diseñados para
	// dar formato a valores generales en Go. Por ejemplo, esto imprime
	// una instancia de nuestra estructura `point`.
	p := point{1, 2}
	fmt.Printf("struct1: %v\\n", p)

	// Si el valor es una estructura, la variante `%+v`
	// incluirá los nombres de los campos del struct.
	fmt.Printf("struct2: %+v\\n", p)

	// La variante `%#v` imprime una representación en sintaxis de Go
	// del valor, es decir, el fragmento de código fuente que
	// produciría dicho valor.
	fmt.Printf("struct3: %#v\\n", p)

	// Para imprimir el tipo de un valor, utiliza `%T`.
	fmt.Printf("type: %T\\n", p)

	// Formatear booleanos es directo con `%t`.
	fmt.Printf("bool: %t\\n", true)

	// Existen muchas opciones para formatear enteros.
	// Usa `%d` para el formato decimal estándar en base 10.
	fmt.Printf("int: %d\\n", 123)

	// Esto imprime una representación binaria con `%b`.
	fmt.Printf("bin: %b\\n", 14)

	// Esto imprime el carácter correspondiente al
	// entero especificado.
	fmt.Printf("char: %c\\n", 33)

	// `%x` proporciona codificación hexadecimal.
	fmt.Printf("hex: %x\\n", 456)

	// También existen varias opciones de formateo para
	// números flotantes. Para el formato decimal básico usa `%f`.
	fmt.Printf("float1: %f\\n", 78.9)

	// `%e` y `%E` formatean el flotante en notación científica
	// con ligeras variaciones de mayúsculas/minúsculas.
	fmt.Printf("float2: %e\\n", 123400000.0)
	fmt.Printf("float3: %E\\n", 123400000.0)

	// Para la impresión básica de cadenas usa `%s`.
	fmt.Printf("str1: %s\\n", "\\"string\\"")

	// Para colocar comillas dobles en las cadenas como en el código fuente de Go, usa `%q`.
	fmt.Printf("str2: %q\\n", "\\"string\\"")

	// Al igual que con los enteros vistos anteriormente, `%x` representa
	// la cadena en base 16, con dos caracteres de salida por cada byte de entrada.
	fmt.Printf("str3: %x\\n", "hex this")

	// Para imprimir la representación de un puntero en memoria, usa `%p`.
	fmt.Printf("pointer: %p\\n", &p)

	// Al dar formato a números con frecuencia querrás
	// controlar el ancho y la precisión de la cifra resultante.
	// Para especificar el ancho de un entero, usa un número
	// después del `%` en el verbo. Por defecto el resultado
	// se justificará a la derecha y se rellenará con espacios.
	fmt.Printf("width1: |%6d|%6d|\\n", 12, 345)

	// También puedes especificar el ancho de flotantes impresos,
	// aunque habitualmente también querrás restringir la precisión
	// decimal simultáneamente mediante la sintaxis ancho.precision.
	fmt.Printf("width2: |%6.2f|%6.2f|\\n", 1.2, 3.45)

	// Para justificar a la izquierda, usa la bandera `-`.
	fmt.Printf("width3: |%-6.2f|%-6.2f|\\n", 1.2, 3.45)

	// Es posible que también desees controlar el ancho al formatear
	// cadenas, en especial para alinearlas en salidas con formato de tabla.
	// Aquí vemos el ancho básico justificado a la derecha.
	fmt.Printf("width4: |%6s|%6s|\\n", "foo", "b")

	// Para justificar a la izquierda se usa la bandera `-` al igual que con los números.
	fmt.Printf("width5: |%-6s|%-6s|\\n", "foo", "b")

	// Hasta ahora hemos visto `Printf`, que imprime la cadena
	// formateada en `os.Stdout`. `Sprintf` formatea y retorna
	// una cadena sin imprimirla en ninguna parte.
	s := fmt.Sprintf("sprintf: a %s", "string")
	fmt.Println(s)

	// Puedes formatear e imprimir hacia otros `io.Writer` distintos
	// de `os.Stdout` utilizando `Fprintf`.
	fmt.Fprintf(os.Stderr, "io: an %s\\n", "error")
}
""",
        "sh": None
    },

    "text-templates": {
        "go": """// Go ofrece soporte integrado para crear contenido dinámico o mostrar
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
	t1, err := t1.Parse("Value is {{.}}\\n")
	if err != nil {
		panic(err)
	}

	// De forma alternativa, podemos usar `template.Must` para disparar un panic
	// si `Parse` devuelve un error. Esto resulta especialmente conveniente
	// para plantillas inicializadas en el ámbito global.
	t1 = template.Must(t1.Parse("Value: {{.}}\\n"))

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
	t2 := Create("t2", "Name: {{.Name}}\\n")

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
		"{{if . -}} yes {{else -}} no {{end}}\\n")
	t3.Execute(os.Stdout, "not empty")
	t3.Execute(os.Stdout, "")

	// Los bloques range nos permiten iterar a través de slices, arrays, mapas o canales. Dentro
	// del bloque range, `{{.}}` se vincula al elemento actual de la iteración.
	t4 := Create("t4",
		"Range: {{range .}}{{.}} {{end}}\\n")
	t4.Execute(os.Stdout,
		[]string{
			"Go",
			"Rust",
			"C++",
			"C#",
		})
}
""",
        "sh": None
    },

    "regular-expressions": {
        "go": """// Go cuenta con soporte integrado para [expresiones regulares](https://en.wikipedia.org/wiki/Regular_expression).
// Aquí tenemos algunos ejemplos de tareas habituales relacionadas con expresiones regulares
// en Go.

package main

import (
	"bytes"
	"fmt"
	"regexp"
)

func main() {

	// Esto comprueba si un patrón coincide con una cadena de texto.
	match, _ := regexp.MatchString("p([a-z]+)ch", "peach")
	fmt.Println(match)

	// Arriba usamos un patrón de cadena directamente, pero para
	// otras tareas con expresiones regulares necesitarás compilar (`Compile`)
	// una estructura `Regexp` optimizada.
	r, _ := regexp.Compile("p([a-z]+)ch")

	// Existen numerosos métodos disponibles sobre estas estructuras. Aquí tenemos
	// una comprobación de coincidencia idéntica a la vista anteriormente.
	fmt.Println(r.MatchString("peach"))

	// Esto localiza la primera coincidencia de la expresión regular.
	fmt.Println(r.FindString("peach punch"))

	// Esto también localiza la primera coincidencia pero devuelve los
	// índices de inicio y fin correspondientes en lugar del texto coincidente.
	fmt.Println("idx:", r.FindStringIndex("peach punch"))

	// Las variantes `Submatch` incluyen información sobre
	// las coincidencias del patrón completo y los subpatrones (grupos)
	// capturados. Por ejemplo, esto devolverá información tanto para
	// `p([a-z]+)ch` como para `([a-z]+)`.
	fmt.Println(r.FindStringSubmatch("peach punch"))

	// Análogamente esto devolverá información sobre los
	// índices de coincidencias y subcoincidencias.
	fmt.Println(r.FindStringSubmatchIndex("peach punch"))

	// Las variantes `All` de estas funciones aplican a todas
	// las coincidencias en el texto de entrada, no únicamente a la primera.
	// Por ejemplo, para encontrar todas las coincidencias de una regexp.
	fmt.Println(r.FindAllString("peach punch pinch", -1))

	// Estas variantes `All` se encuentran disponibles también para las
	// otras funciones que examinamos arriba.
	fmt.Println("all:", r.FindAllStringSubmatchIndex(
		"peach punch pinch", -1))

	// Proporcionar un entero no negativo como segundo argumento
	// a estas funciones limitará la cantidad máxima de coincidencias.
	fmt.Println(r.FindAllString("peach punch pinch", 2))

	// Nuestros ejemplos anteriores recibían argumentos de tipo string y utilizaban
	// nombres como `MatchString`. También podemos proporcionar argumentos de tipo
	// `[]byte` y prescindir de `String` en el nombre de la función.
	fmt.Println(r.Match([]byte("peach")))

	// Al crear variables globales con expresiones regulares,
	// se puede emplear la variación `MustCompile` en lugar de `Compile`.
	// `MustCompile` entra en panic en vez de devolver un error,
	// lo cual hace su uso mucho más seguro y directo para variables globales.
	r = regexp.MustCompile("p([a-z]+)ch")
	fmt.Println("regexp:", r)

	// El paquete `regexp` también puede utilizarse para reemplazar
	// subcadenas coincidentes por otros valores.
	fmt.Println(r.ReplaceAllString("a peach", "<fruit>"))

	// La variante `Func` permite transformar el texto coincidente
	// mediante una función proporcionada.
	in := []byte("a peach")
	out := r.ReplaceAllFunc(in, bytes.ToUpper)
	fmt.Println(string(out))
}
""",
        "sh": """$ go run regular-expressions.go
true
true
peach
idx: [0 5]
[peach ea]
[0 5 1 3]
[peach punch pinch]
all: [[0 5 1 3] [6 11 7 9] [12 17 13 15]]
[peach punch]
true
regexp: p([a-z]+)ch
a <fruit>
a PEACH

# Para una referencia exhaustiva sobre expresiones regulares en Go,
# consulta la documentación del paquete [`regexp`](https://pkg.go.dev/regexp).
"""
    },

    "json": {
        "go": """// Go cuenta con soporte integrado para la codificación y decodificación
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
""",
        "sh": """$ go run json.go
true
1
2.34
"gopher"
["apple","peach","pear"]
{"apple":5,"lettuce":7}
{"Page":1,"Fruits":["apple","peach","pear"]}
{"page":1,"fruits":["apple","peach","pear"]}
map[num:6.13 strs:[a b]]
6.13
a
{1 [apple peach]}
apple
{"apple":5,"lettuce":7}
{1 [apple peach]}

# Hemos cubierto los fundamentos de JSON en Go aquí; consulta
# el artículo [JSON y Go](https://go.dev/blog/json)
# y la documentación del [paquete JSON](https://pkg.go.dev/encoding/json/v2)
# para profundizar en el tema.
"""
    },

    "xml": {
        "go": """// Go ofrece soporte integrado para XML y formatos afines
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
""",
        "sh": None
    },

    "time": {
        "go": """// Go ofrece un soporte integral para el manejo de fechas, horas y duraciones;
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
""",
        "sh": """$ go run time.go
2012-10-31 15:50:13.793654 +0000 UTC
2009-11-17 20:34:58.651387237 +0000 UTC
2009
November
17
20
34
58
651387237
UTC
Tuesday
true
false
false
25891h15m15.142266763s
25891.25420618521
1.5534752523711128e+06
9.320851514226677e+07
93208515142266763
2012-10-31 15:50:13.793654 +0000 UTC
2006-12-05 01:19:43.509120474 +0000 UTC

# A continuación veremos el concepto estrechamente relacionado del tiempo relativo a
# la época Unix (Unix epoch).
"""
    },

    "epoch": {
        "go": """// Un requerimiento frecuente en desarrollo de software es obtener el número
// de segundos, milisegundos o nanosegundos transcurridos desde la
// [época Unix](https://en.wikipedia.org/wiki/Unix_time) (1 de enero de 1970).
// Así es como se realiza en Go.

package main

import (
	"fmt"
	"time"
)

func main() {

	// Usa `time.Now` junto con `Unix`, `UnixMilli` o `UnixNano`
	// para obtener el tiempo transcurrido desde la época Unix en segundos,
	// milisegundos o nanosegundos, respectivamente.
	now := time.Now()
	fmt.Println(now)

	fmt.Println(now.Unix())
	fmt.Println(now.UnixMilli())
	fmt.Println(now.UnixNano())

	// También puedes convertir enteros de segundos o nanosegundos
	// transcurridos desde la época al valor `time.Time` correspondiente.
	fmt.Println(time.Unix(now.Unix(), 0))
	fmt.Println(time.Unix(0, now.UnixNano()))
}
""",
        "sh": """$ go run epoch.go 
2012-10-31 16:13:58.292387 +0000 UTC
1351700038
1351700038292
1351700038292387000
2012-10-31 16:13:58 +0000 UTC
2012-10-31 16:13:58.292387 +0000 UTC

# A continuación veremos otra tarea clave vinculada al tiempo: el
# formateo y parseo de fechas y horas.
"""
    },

    "time-formatting-parsing": {
        "go": """// Go admite el formateo y parseo de tiempo mediante diseños
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
	fmt.Printf("%d-%02d-%02dT%02d:%02d:%02d-00:00\\n",
		t.Year(), t.Month(), t.Day(),
		t.Hour(), t.Minute(), t.Second())

	// `Parse` devolverá un error descriptivo ante una entrada mal formada,
	// explicando con exactitud el problema de parseo.
	_, err := time.Parse("Mon Jan _2 15:04:05 2006", "8:41PM")
	p(err)
}
""",
        "sh": None
    },

    "random-numbers": {
        "go": """// El paquete `math/rand/v2` de Go proporciona generación de
// [números pseudoaleatorios](https://en.wikipedia.org/wiki/Pseudorandom_number_generator).

package main

import (
	"fmt"
	"math/rand/v2"
)

func main() {

	// Por ejemplo, `rand.IntN` devuelve un entero aleatorio `n`,
	// donde `0 <= n < 100`.
	fmt.Print(rand.IntN(100), ",")
	fmt.Print(rand.IntN(100))
	fmt.Println()

	// `rand.Float64` devuelve un flotante `f` de tipo `float64`,
	// tal que `0.0 <= f < 1.0`.
	fmt.Println(rand.Float64())

	// Esto puede emplearse para generar números flotantes aleatorios en
	// otros rangos, por ejemplo `5.0 <= f' < 10.0`.
	fmt.Print((rand.Float64()*5)+5, ",")
	fmt.Print((rand.Float64() * 5) + 5)
	fmt.Println()

	// Si deseas una semilla fija predecible, crea un nuevo
	// `rand.Source` y pásalo al constructor `New`. `NewPCG` genera una nueva
	// fuente [PCG](https://en.wikipedia.org/wiki/Permuted_congruential_generator)
	// que requiere una semilla compuesta por dos números `uint64`.
	s2 := rand.NewPCG(42, 1024)
	r2 := rand.New(s2)
	fmt.Print(r2.IntN(100), ",")
	fmt.Print(r2.IntN(100))
	fmt.Println()

	s3 := rand.NewPCG(42, 1024)
	r3 := rand.New(s3)
	fmt.Print(r3.IntN(100), ",")
	fmt.Print(r3.IntN(100))
	fmt.Println()
}
""",
        "sh": """# Algunos de los números generados pueden diferir
# cuando ejecutes el ejemplo.
$ go run random-numbers.go
68,56
0.8090228139659177
5.840125017402497,6.937056298890035
94,49
94,49

# Consulta la documentación del paquete [`math/rand/v2`](https://pkg.go.dev/math/rand/v2)
# para obtener información detallada sobre otras distribuciones y funciones
# aleatorias que ofrece Go.
"""
    }
}

def apply_group4():
    for slug, data in TOPICS_G4.items():
        go_path = f"raw_examples/{slug}.go"
        with open(go_path, "w", encoding="utf-8") as f:
            f.write(data["go"])
        print(f"Updated {go_path}")
        
        if data["sh"] is not None:
            sh_path = f"raw_examples/{slug}.sh"
            with open(sh_path, "w", encoding="utf-8") as f:
                f.write(data["sh"])
            print(f"Updated {sh_path}")

if __name__ == "__main__":
    apply_group4()
