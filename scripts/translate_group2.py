# -*- coding: utf-8 -*-
import os

TOPICS_G2 = {
    "range-over-built-in-types": {
        "go": """// `range` itera sobre los elementos en una variedad de
// estructuras de datos integradas. Veamos cómo
// usar `range` con algunas de las estructuras de datos
// que ya hemos aprendido.

package main

import "fmt"

func main() {

	// Aquí usamos `range` para sumar los números de un slice.
	// Los arrays funcionan exactamente igual.
	nums := []int{2, 3, 4}
	sum := 0
	for _, num := range nums {
		sum += num
	}
	fmt.Println("sum:", sum)

	// `range` en arrays y slices proporciona tanto el
	// índice como el valor de cada elemento. Arriba no
	// necesitábamos el índice, por lo que lo ignoramos con el
	// identificador en blanco `_`. Sin embargo, a veces sí
	// necesitamos los índices.
	for i, num := range nums {
		if num == 3 {
			fmt.Println("index:", i)
		}
	}

	// `range` en mapas itera sobre los pares clave/valor.
	kvs := map[string]string{"a": "apple", "b": "banana"}
	for k, v := range kvs {
		fmt.Printf("%s -> %s\\n", k, v)
	}

	// `range` también puede iterar únicamente sobre las claves de un mapa.
	for k := range kvs {
		fmt.Println("key:", k)
	}

	// `range` en cadenas itera sobre puntos de código Unicode
	// (code points). El primer valor es el índice de byte inicial
	// de la `rune` y el segundo es la `rune` en sí misma.
	// Consulta [Cadenas y Runas](strings-and-runes) para más
	// detalles.
	for i, c := range "go" {
		fmt.Println(i, c)
	}
}
""",
        "sh": None
    },

    "pointers": {
        "go": """// Go admite <em><a href="https://en.wikipedia.org/wiki/Pointer_(computer_programming)">punteros</a></em>,
// lo que permite pasar referencias a valores y registros
// dentro de tu programa.

package main

import "fmt"

// Mostraremos cómo funcionan los punteros en contraste con los valores
// mediante 2 funciones: `zeroval` y `zeroptr`. `zeroval` tiene un
// parámetro de tipo `int`, por lo que los argumentos se pasan por
// valor. `zeroval` recibirá una copia de `ival` distinta
// a la de la función que la invoca.
func zeroval(ival int) {
	ival = 0
}

// `zeroptr`, en cambio, tiene un parámetro `*int`, lo que significa
// que recibe un puntero a `int`. El código `*iptr` en el cuerpo
// de la función _desreferencia_ el puntero desde su dirección
// de memoria al valor actual almacenado en dicha dirección.
// Asignar un valor a un puntero desreferenciado modifica el
// valor en la dirección referenciada.
func zeroptr(iptr *int) {
	*iptr = 0
}

func main() {
	i := 1
	fmt.Println("initial:", i)

	zeroval(i)
	fmt.Println("zeroval:", i)

	// La sintaxis `&i` proporciona la dirección de memoria de `i`,
	// es decir, un puntero a `i`.
	zeroptr(&i)
	fmt.Println("zeroptr:", i)

	// Los punteros también pueden imprimirse directamente.
	fmt.Println("pointer:", &i)

	// Se puede crear un puntero nuevo a un valor utilizando la
	// función incorporada `new`.
	p := new(42)
	fmt.Println("value at *p:", *p)
	zeroptr(p)
	fmt.Println("value at *p:", *p)
}
""",
        "sh": """# `zeroval` no modifica la variable `i` en `main`, pero
# `zeroptr` sí lo hace porque posee una referencia a
# la dirección de memoria de dicha variable.
$ go run pointers.go
initial: 1
zeroval: 1
zeroptr: 0
pointer: 0x42131100
value at *p: 42
value at *p: 0
"""
    },

    "strings-and-runes": {
        "go": """// Una cadena en Go es un slice de bytes de solo lectura. El lenguaje
// y la biblioteca estándar tratan las cadenas de forma especial: como
// contenedores de texto codificado en [UTF-8](https://en.wikipedia.org/wiki/UTF-8).
// En otros lenguajes, las cadenas están compuestas de "caracteres".
// En Go, el concepto de carácter se denomina `rune` (runa): es
// un entero que representa un punto de código Unicode.
// [Esta publicación del blog de Go](https://go.dev/blog/strings) es una excelente
// introducción a este tema.

package main

import (
	"fmt"
	"unicode/utf8"
)

func main() {

	// `s` es una variable `string` a la que se le asigna un valor literal
	// que representa la palabra "hola" en el idioma
	// tailandés. Los literales de cadena en Go son texto codificado
	// en UTF-8.
	const s = "สวัสดี"

	// Dado que las cadenas son equivalentes a `[]byte`, esto
	// producirá la longitud de los bytes sin procesar almacenados internamente.
	fmt.Println("Len:", len(s))

	// Indexar dentro de una cadena produce los valores de bytes crudos en
	// cada posición. Este bucle genera los valores hexadecimales de todos
	// los bytes que componen los puntos de código en `s`.
	for i := 0; i < len(s); i++ {
		fmt.Printf("%x ", s[i])
	}
	fmt.Println()

	// Para contar cuántas _runas_ hay en una cadena, podemos usar
	// el paquete `utf8`. Ten en cuenta que el tiempo de ejecución de
	// `RuneCountInString` depende del tamaño de la cadena,
	// ya que debe decodificar cada runa UTF-8 secuencialmente.
	// Algunos caracteres tailandeses se representan mediante puntos de código UTF-8
	// que pueden abarcar varios bytes, por lo que el resultado de este conteo
	// puede resultar sorprendente.
	fmt.Println("Rune count:", utf8.RuneCountInString(s))

	// Un bucle `range` maneja las cadenas de manera especial y decodifica
	// cada `rune` junto con su desplazamiento (offset) en la cadena.
	for idx, runeValue := range s {
		fmt.Printf("%#U starts at %d\\n", runeValue, idx)
	}

	// Podemos lograr la misma iteración utilizando la
	// función `utf8.DecodeRuneInString` de forma explícita.
	fmt.Println("\\nUsing DecodeRuneInString")
	for i, w := 0, 0; i < len(s); i += w {
		runeValue, width := utf8.DecodeRuneInString(s[i:])
		fmt.Printf("%#U starts at %d\\n", runeValue, i)
		w = width

		// Esto demuestra cómo pasar un valor `rune` a una función.
		examineRune(runeValue)
	}
}

func examineRune(r rune) {

	// Los valores entre comillas simples son _literales de runa_.
	// Podemos comparar un valor `rune` directamente con un literal de runa.
	if r == 't' {
		fmt.Println("found tee")
	} else if r == 'ส' {
		fmt.Println("found so sua")
	}
}
""",
        "sh": None
    },

    "structs": {
        "go": """// Los _structs_ en Go son colecciones tipadas de campos.
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
""",
        "sh": None
    },

    "methods": {
        "go": """// Go admite _métodos_ definidos sobre tipos de estructuras (structs).

package main

import "fmt"

type rect struct {
	width, height int
}

// Este método `area` tiene un _tipo receptor_ (receiver) de `*rect`.
func (r *rect) area() int {
	return r.width * r.height
}

// Los métodos pueden definirse tanto para receptores de puntero como
// para receptores de valor. Aquí hay un ejemplo con receptor de valor.
func (r rect) perim() int {
	return 2*r.width + 2*r.height
}

func main() {
	r := rect{width: 10, height: 5}

	// Aquí invocamos los 2 métodos definidos para nuestra estructura.
	fmt.Println("area: ", r.area())
	fmt.Println("perim:", r.perim())

	// Go maneja automáticamente la conversión entre valores y punteros
	// en las llamadas a métodos. Es recomendable usar un receptor de puntero
	// para evitar copiar la estructura en cada invocación o para permitir
	// que el método mute la estructura receptora.
	rp := &r
	fmt.Println("area: ", rp.area())
	fmt.Println("perim:", rp.perim())
}
""",
        "sh": """$ go run methods.go 
area:  50
perim: 30
area:  50
perim: 30

# A continuación veremos el mecanismo de Go para agrupar y
# nombrar conjuntos de métodos relacionados: las interfaces.
"""
    },

    "interfaces": {
        "go": """// Las _interfaces_ son colecciones con nombre de firmas de
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
""",
        "sh": """$ go run interfaces.go
{3 4}
12
14
{5}
78.53981633974483
31.41592653589793
circle with radius 5

# Para comprender cómo funcionan las interfaces de Go internamente,
# consulta esta [publicación de blog](https://research.swtch.com/interfaces).
"""
    },

    "enums": {
        "go": """// Los _tipos enumerados_ (enums) son un caso especial de
// [tipos suma](https://en.wikipedia.org/wiki/Algebraic_data_type).
// Un enum es un tipo que posee un número fijo de valores posibles,
// cada uno con un nombre distintivo. Go no cuenta con una palabra clave
// `enum` dedicada en su sintaxis, pero los enums son muy sencillos
// de implementar usando los modismos habituales del lenguaje.

package main

import "fmt"

// Nuestro tipo de enumeración `ServerState` tiene un tipo subyacente `int`.
type ServerState int

// Los valores posibles para `ServerState` se definen como
// constantes. La palabra reservada especial [iota](https://go.dev/ref/spec#Iota)
// genera valores constantes sucesivos de forma automática; en este
// caso 0, 1, 2 y así sucesivamente.
const (
	StateIdle ServerState = iota
	StateConnected
	StateError
	StateRetrying
)

// Al implementar la interfaz [fmt.Stringer](https://pkg.go.dev/fmt#Stringer),
// los valores de `ServerState` pueden imprimirse o convertirse
// a cadenas de texto.
//
// Esto puede volverse tedioso si hay muchos valores posibles. En tales casos,
// la herramienta [stringer](https://pkg.go.dev/golang.org/x/tools/cmd/stringer)
// puede usarse junto con `go:generate` para automatizar el
// proceso. Consulta [este artículo](https://eli.thegreenplace.net/2021/a-comprehensive-guide-to-go-generate)
// para una explicación más exhaustiva.
var stateName = map[ServerState]string{
	StateIdle:      "idle",
	StateConnected: "connected",
	StateError:     "error",
	StateRetrying:  "retrying",
}

func (ss ServerState) String() string {
	return stateName[ss]
}

func main() {
	ns := transition(StateIdle)
	fmt.Println(ns)
	// Si tenemos un valor de tipo `int`, no podemos pasarlo a `transition`: el
	// compilador señalará un error de incompatibilidad de tipos. Esto otorga cierta
	// seguridad de tipos en tiempo de compilación para los enums.

	ns2 := transition(ns)
	fmt.Println(ns2)
}

// `transition` emula una transición de estado para un
// servidor; toma el estado existente y retorna
// un nuevo estado.
func transition(s ServerState) ServerState {
	switch s {
	case StateIdle:
		return StateConnected
	case StateConnected, StateRetrying:
		// Supongamos que aquí evaluamos ciertos predicados para
		// determinar el próximo estado...
		return StateIdle
	case StateError:
		return StateError
	default:
		panic(fmt.Errorf("unknown state: %s", s))
	}
}
""",
        "sh": None
    },

    "struct-embedding": {
        "go": """// Go admite la _incrustación_ (embedding) de estructuras e interfaces
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
	fmt.Printf("co={num: %v, str: %v}\\n", co.num, co.str)

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
""",
        "sh": None
    },

    "generics": {
        "go": """// A partir de la versión 1.18, Go añadió soporte para
// _genéricos_, también conocidos como _parámetros de tipo_.

package main

import "fmt"

// Como ejemplo de una función genérica, `SlicesIndex` recibe
// un slice de cualquier tipo `comparable` y un elemento de ese
// tipo, devolviendo el índice de la primera coincidencia de
// v en s, o -1 si no está presente. La restricción `comparable`
// significa que podemos comparar valores de este tipo con los
// operadores `==` y `!=`. Para una explicación más detallada
// de esta firma de tipos, consulta [este artículo de blog](https://go.dev/blog/deconstructing-type-parameters).
// Ten en cuenta que esta función existe en la biblioteca estándar
// como [slices.Index](https://pkg.go.dev/slices#Index).
func SlicesIndex[S ~[]E, E comparable](s S, v E) int {
	for i := range s {
		if v == s[i] {
			return i
		}
	}
	return -1
}

// Como ejemplo de un tipo genérico, `List` es una
// lista simplemente enlazada con valores de cualquier tipo.
type List[T any] struct {
	head, tail *element[T]
}

type element[T any] struct {
	next *element[T]
	val  T
}

// Podemos definir métodos sobre tipos genéricos exactamente igual
// que en los tipos regulares, pero debemos mantener los parámetros
// de tipo en su lugar. El tipo es `List[T]`, no `List`.
func (lst *List[T]) Push(v T) {
	if lst.tail == nil {
		lst.head = &element[T]{val: v}
		lst.tail = lst.head
	} else {
		lst.tail.next = &element[T]{val: v}
		lst.tail = lst.tail.next
	}
}

// AllElements devuelve todos los elementos de la List como un slice.
// En el siguiente ejemplo veremos una forma más idiomática
// de iterar sobre todos los elementos de tipos personalizados.
func (lst *List[T]) AllElements() []T {
	var elems []T
	for e := lst.head; e != nil; e = e.next {
		elems = append(elems, e.val)
	}
	return elems
}

func main() {
	var s = []string{"foo", "bar", "zoo"}

	// Al invocar funciones genéricas, con frecuencia podemos confiar
	// en la _inferencia de tipos_. Observa que no necesitamos
	// especificar los tipos para `S` y `E` al llamar
	// a `SlicesIndex`: el compilador los infiere automáticamente.
	fmt.Println("index of zoo:", SlicesIndex(s, "zoo"))

	// ... aunque también podríamos especificarlos explícitamente.
	_ = SlicesIndex[[]string, string](s, "zoo")

	lst := List[int]{}
	lst.Push(10)
	lst.Push(13)
	lst.Push(23)
	fmt.Println("list:", lst.AllElements())
}
""",
        "sh": None
    },

    "range-over-iterators": {
        "go": """// Desde la versión 1.22, Go agregó soporte para
// [iteradores definidos por el usuario](https://go.dev/blog/range-functions)
// para bucles `range`. En la versión 1.23, los iteradores se convirtieron
// en una característica estándar del lenguaje.

package main

import (
	"fmt"
	"iter"
	"slices"
	"strings"
)

// En el [ejemplo anterior](generics) implementamos una
// lista enlazada personalizada y un método `AllElements` que
// devolvía todos los elementos en un slice. Con iteradores,
// podemos hacerlo de manera mucho más elegante e idiomática.
type List[T any] struct {
	head, tail *element[T]
}

type element[T any] struct {
	next *element[T]
	val  T
}

func (lst *List[T]) Push(v T) {
	if lst.tail == nil {
		lst.head = &element[T]{val: v}
		lst.tail = lst.head
	} else {
		lst.tail.next = &element[T]{val: v}
		lst.tail = lst.tail.next
	}
}

// `All` devuelve un iterador, representado en Go por una función
// con una [firma especial](https://pkg.go.dev/iter#Seq).
func (lst *List[T]) All() iter.Seq[T] {
	return func(yield func(T) bool) {
		// La función de iterador recibe otra función como
		// parámetro, llamada `yield` por convención (aunque
		// el nombre puede ser arbitrario). Invocará `yield` por
		// cada elemento que deseemos iterar, y verificará el
		// valor retornado por `yield` para una posible terminación anticipada.
		for e := lst.head; e != nil; e = e.next {
			if !yield(e.val) {
				return
			}
		}
	}
}

// La iteración no requiere una estructura de datos subyacente,
// ¡y ni siquiera tiene que ser finita! Aquí hay una función
// que retorna un iterador sobre números de Fibonacci: continúa
// ejecutándose mientras `yield` siga retornando `true`.
func genFib() iter.Seq[int] {
	return func(yield func(int) bool) {
		a, b := 0, 1

		for {
			if !yield(a) {
				return
			}
			a, b = b, a+b
		}
	}
}

func main() {
	lst := List[int]{}
	lst.Push(10)
	lst.Push(13)
	lst.Push(23)

	// Dado que `List.All` retorna un iterador, podemos usarlo
	// en un bucle `range` convencional.
	for e := range lst.All() {
		fmt.Println(e)
	}

	// Paquetes como [slices](https://pkg.go.dev/slices) tienen
	// varias funciones útiles para trabajar con iteradores.
	// Por ejemplo, `Collect` toma cualquier iterador y reúne
	// todos sus valores en un slice.
	all := slices.Collect(lst.All())
	fmt.Println("all:", all)

	// Los paquetes de la biblioteca estándar ahora también exponen ayudantes de iteradores.
	// Por ejemplo, `strings.SplitSeq` itera sobre partes
	// de un slice de bytes sin construir previamente un slice de resultados en memoria.
	for part := range strings.SplitSeq("go-by-example", "-") {
		fmt.Printf("part: %s\\n", part)
	}

	for n := range genFib() {

		// Una vez que el bucle alcanza un `break` o un retorno anticipado, la función `yield`
		// pasada al iterador devolverá `false`.
		if n >= 10 {
			break
		}
		fmt.Println(n)
	}
}
""",
        "sh": None
    },

    "errors": {
        "go": """// En Go es idiomático comunicar errores mediante un
// valor de retorno explícito y separado. Esto contrasta con
// las excepciones utilizadas en lenguajes como Java, Python y
// Ruby, y con el valor único sobrecargado de resultado/error
// usado a veces en C. El enfoque de Go facilita
// identificar qué funciones retornan errores y manejarlos
// utilizando las mismas estructuras del lenguaje empleadas para
// tareas ordinarias.
//
// Consulta la documentación del [paquete errors](https://pkg.go.dev/errors)
// y [este artículo de blog](https://go.dev/blog/go1.13-errors) para obtener
// detalles adicionales.

package main

import (
	"errors"
	"fmt"
)

// Por convención, los errores se ubican como el último valor de retorno y
// tienen el tipo `error`, una interfaz incorporada en el lenguaje.
func f(arg int) (int, error) {
	if arg == 42 {
		// `errors.New` construye un valor `error` básico
		// con el mensaje de error especificado.
		return -1, errors.New("can't work with 42")
	}

	// Un valor `nil` en la posición del error indica que
	// no hubo ningún error.
	return arg + 3, nil
}

// Un error centinela (sentinel error) es una variable predeclarada que se utiliza para
// señalar una condición de error específica.
var ErrOutOfTea = errors.New("no more tea available")
var ErrPower = errors.New("can't boil water")

func makeTea(arg int) error {
	if arg == 2 {
		return ErrOutOfTea
	} else if arg == 4 {

		// Podemos envolver errores con errores de nivel superior para añadir
		// contexto. La forma más sencilla de lograrlo es con el
		// verbo `%w` en `fmt.Errorf`. Los errores envueltos
		// forman una cadena lógica (A envuelve a B, que envuelve a C, etc.)
		// que puede consultarse mediante funciones como `errors.Is`
		// y `errors.AsType`.
		return fmt.Errorf("making tea: %w", ErrPower)
	}
	return nil
}

func main() {
	for _, i := range []int{7, 42} {

		// Es idiomático realizar la comprobación de errores en línea dentro de la
		// cláusula `if`.
		if r, e := f(i); e != nil {
			fmt.Println("f failed:", e)
		} else {
			fmt.Println("f worked:", r)
		}
	}

	for i := range 5 {
		if err := makeTea(i); err != nil {

			// `errors.Is` comprueba si un error dado (o cualquiera en su cadena)
			// coincide con un valor de error específico. Esto resulta especialmente útil con errores
			// anidados o envueltos, permitiendo identificar errores centinela en una cadena.
			if errors.Is(err, ErrOutOfTea) {
				fmt.Println("We should buy new tea!")
			} else if errors.Is(err, ErrPower) {
				fmt.Println("Now it is dark.")
			} else {
				fmt.Printf("unknown error: %s\\n", err)
			}
			continue
		}

		fmt.Println("Tea is ready!")
	}
}
""",
        "sh": None
    },

    "custom-errors": {
        "go": """// Es posible definir tipos de error personalizados
// implementando en ellos el método `Error()`. Aquí tenemos una
// variante del ejemplo anterior que utiliza un tipo personalizado
// para representar explícitamente un error de argumento.

package main

import (
	"errors"
	"fmt"
)

// Un tipo de error personalizado habitualmente lleva el sufijo "Error".
type argError struct {
	arg     int
	message string
}

// Añadir este método `Error` hace que `argError` implemente
// la interfaz `error`.
func (e *argError) Error() string {
	return fmt.Sprintf("%d - %s", e.arg, e.message)
}

func f(arg int) (int, error) {
	if arg == 42 {

		// Retornamos nuestro error personalizado.
		return -1, &argError{arg, "can't work with it"}
	}
	return arg + 3, nil
}

func main() {

	// `errors.AsType` es una versión avanzada de `errors.Is`.
	// Comprueba si un error dado (o cualquiera en su cadena)
	// coincide con un tipo de error específico y lo convierte a un valor
	// de dicho tipo, devolviendo además `true`. Si no hay coincidencia, el
	// segundo valor retornado es `false`.
	_, err := f(42)
	if ae, ok := errors.AsType[*argError](err); ok {
		fmt.Println(ae.arg)
		fmt.Println(ae.message)
	} else {
		fmt.Println("err doesn't match argError")
	}
}
""",
        "sh": None
    },

    "goroutines": {
        "go": """// Una _goroutine_ es un hilo ligero de ejecución gestionado por el runtime de Go.

package main

import (
	"fmt"
	"time"
)

func f(from string) {
	for i := range 3 {
		fmt.Println(from, ":", i)
	}
}

func main() {

	// Supongamos que tenemos una llamada a función `f(s)`. Así es como
	// la llamaríamos de la manera habitual, ejecutándola
	// de forma síncrona.
	f("direct")

	// Para invocar esta función en una goroutine, usa
	// `go f(s)`. Esta nueva goroutine se ejecutará
	// de manera concurrente con la función invocadora.
	go f("goroutine")

	// También puedes iniciar una goroutine para una llamada
	// a función anónima.
	go func(msg string) {
		fmt.Println(msg)
	}("going")

	// Nuestras dos llamadas a función se están ejecutando asíncronamente en
	// goroutines separadas en este momento. Esperamos a que terminen
	// (para un enfoque más robusto y profesional, usa un [WaitGroup](waitgroups)).
	time.Sleep(time.Second)
	fmt.Println("done")
}
""",
        "sh": """# Al ejecutar este programa, observamos primero la salida de la llamada
# bloqueante (síncrona), seguida por la salida de las dos
# goroutines. La salida de las goroutines puede aparecer intercalada,
# ya que el runtime de Go las ejecuta concurrentemente.
$ go run goroutines.go
direct : 0
direct : 1
direct : 2
goroutine : 0
going
goroutine : 1
goroutine : 2
done

# A continuación veremos el complemento ideal para las goroutines en
# programas concurrentes de Go: los canales.
"""
    },

    "channels": {
        "go": """// Los _canales_ (channels) son los conductos que comunican goroutines
// concurrentes. Puedes enviar valores a los canales desde una
// goroutine y recibir dichos valores en otra
// goroutine.

package main

import "fmt"

func main() {

	// Crea un nuevo canal con `make(chan val-type)`.
	// Los canales están tipados según los valores que transmiten.
	messages := make(chan string)

	// _Envía_ un valor a un canal utilizando la sintaxis
	// `channel <-`. Aquí enviamos `"ping"` al canal `messages`
	// que creamos arriba, desde una nueva goroutine.
	go func() { messages <- "ping" }()

	// La sintaxis `<-channel` _recibe_ un valor desde el
	// canal. Aquí recibiremos el mensaje `"ping"` que
	// enviamos anteriormente y lo imprimiremos.
	msg := <-messages
	fmt.Println(msg)
}
""",
        "sh": """# Al ejecutar el programa, el mensaje `"ping"` se
# transmite exitosamente de una goroutine a otra a través
# de nuestro canal.
$ go run channels.go 
ping

# Por defecto, los envíos y recepciones se bloquean hasta que tanto el
# emisor como el receptor estén listos. Esta propiedad nos permitió
# esperar al final de nuestro programa la llegada del mensaje `"ping"`
# sin necesidad de recurrir a ningún otro mecanismo de sincronización.
"""
    },

    "channel-buffering": {
        "go": """// Por defecto los canales son _no almacenados en búfer_ (unbuffered), lo que significa que
// solo aceptarán envíos (`chan <-`) si existe una
// recepción correspondiente (`<- chan`) lista para recibir el
// valor enviado. Los _canales con búfer_ (buffered channels) aceptan una cantidad
// limitada de valores sin que exista un receptor concurrente para ellos.

package main

import "fmt"

func main() {

	// Aquí creamos con `make` un canal de cadenas con búfer de hasta
	// 2 valores.
	messages := make(chan string, 2)

	// Dado que este canal tiene búfer, podemos enviar estos
	// valores al canal sin una recepción concurrente
	// correspondiente.
	messages <- "buffered"
	messages <- "channel"

	// Posteriormente podemos recibir ambos valores como de costumbre.
	fmt.Println(<-messages)
	fmt.Println(<-messages)
}
""",
        "sh": None
    }
}

def apply_group2():
    for slug, data in TOPICS_G2.items():
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
    apply_group2()
