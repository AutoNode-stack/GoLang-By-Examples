# -*- coding: utf-8 -*-
import os

TOPICS_G1 = {
    "hello-world": {
        "go": """// Nuestro primer programa imprimirá el clásico mensaje "hello world".
// Aquí está el código fuente completo.
package main

import "fmt"

func main() {
	fmt.Println("hello world")
}
""",
        "sh": """# Para ejecutar el programa, guarda el código en `hello-world.go` y
# usa `go run`.
$ go run hello-world.go
hello world

# En ocasiones querremos compilar nuestros programas en binarios
# ejecutables. Podemos hacerlo usando `go build`.
$ go build hello-world.go
$ ls
hello-world	hello-world.go

# Luego podemos ejecutar el binario compilado directamente.
$ ./hello-world
hello world

# Ahora que sabemos ejecutar y compilar programas básicos en Go,
# aprendamos más sobre el lenguaje.
"""
    },

    "values": {
        "go": """// Go cuenta con diversos tipos de valores, incluyendo cadenas de texto (strings),
// enteros, flotantes, booleanos, etc. Aquí hay algunos
// ejemplos básicos.

package main

import "fmt"

func main() {

	// Cadenas de texto, que se pueden concatenar con `+`.
	fmt.Println("go" + "lang")

	// Enteros y flotantes.
	fmt.Println("1+1 =", 1+1)
	fmt.Println("7.0/3.0 =", 7.0/3.0)

	// Booleanos, con los operadores booleanos habituales.
	fmt.Println(true && false)
	fmt.Println(true || false)
	fmt.Println(!true)
}
""",
        "sh": None
    },

    "variables": {
        "go": """// En Go, las _variables_ se declaran explícitamente y son utilizadas
// por el compilador para, por ejemplo, verificar la corrección de tipos
// en las llamadas a funciones.

package main

import "fmt"

func main() {

	// `var` declara 1 o más variables.
	var a = "initial"
	fmt.Println(a)

	// Se pueden declarar múltiples variables al mismo tiempo.
	var b, c int = 1, 2
	fmt.Println(b, c)

	// Go inferirá el tipo de las variables inicializadas.
	var d = true
	fmt.Println(d)

	// Las variables declaradas sin una inicialización correspondiente
	// adquieren el _valor cero_ (zero-valued). Por ejemplo, el
	// valor cero para un `int` es `0`.
	var e int
	fmt.Println(e)

	// La sintaxis `:=` es una forma abreviada para declarar e
	// inicializar una variable; por ejemplo, equivale a
	// `var f string = "apple"` en este caso.
	// Esta sintaxis solo está disponible dentro de funciones.
	f := "apple"
	fmt.Println(f)
}
""",
        "sh": None
    },

    "constants": {
        "go": """// Go admite _constantes_ de caracteres, cadenas de texto, valores booleanos
// y numéricos.

package main

import (
	"fmt"
	"math"
)

// `const` declara un valor constante.
const s string = "constant"

func main() {
	fmt.Println(s)

	// Una sentencia `const` también puede aparecer dentro del
	// cuerpo de una función.
	const n = 500000000

	// Las expresiones constantes realizan aritmética con
	// precisión arbitraria.
	const d = 3e20 / n
	fmt.Println(d)

	// Una constante numérica no tiene un tipo definido hasta que se le asigna
	// uno, por ejemplo mediante una conversión explícita.
	fmt.Println(int64(d))

	// A un número se le puede asignar un tipo utilizándolo en un
	// contexto que lo requiera, como una asignación de variable
	// o una llamada a función. Por ejemplo, aquí
	// `math.Sin` espera un `float64`.
	fmt.Println(math.Sin(n))
}
""",
        "sh": None
    },

    "for": {
        "go": """// `for` es la única estructura de bucle en Go. Aquí se presentan
// algunos tipos básicos de bucles `for`.

package main

import "fmt"

func main() {

	// El tipo más básico, con una única condición.
	i := 1
	for i <= 3 {
		fmt.Println(i)
		i = i + 1
	}

	// Un bucle `for` clásico con inicialización/condición/paso posterior.
	for j := 0; j < 3; j++ {
		fmt.Println(j)
	}

	// Otra forma de lograr la iteración básica de "hacer esto N veces"
	// es usar `range` sobre un número entero.
	for i := range 3 {
		fmt.Println("range", i)
	}

	// Un `for` sin condición iterará repetidamente hasta que
	// uses `break` para salir del bucle o `return` para retornar
	// desde la función contenedora.
	for {
		fmt.Println("loop")
		break
	}

	// También puedes usar `continue` para avanzar a la siguiente iteración
	// del bucle.
	for n := range 6 {
		if n%2 == 0 {
			continue
		}
		fmt.Println(n)
	}
}
""",
        "sh": """$ go run for.go
1
2
3
0
1
2
range 0
range 1
range 2
loop
1
3
5

# Veremos otras formas de `for` más adelante cuando examinemos
# las sentencias `range`, canales y otras estructuras de datos.
"""
    },

    "if-else": {
        "go": """// La bifurcación condicional con `if` y `else` en Go es
// directa y sencilla.

package main

import "fmt"

func main() {

	// Aquí hay un ejemplo básico.
	if 7%2 == 0 {
		fmt.Println("7 is even")
	} else {
		fmt.Println("7 is odd")
	}

	// Se puede tener una sentencia `if` sin bloque else.
	if 8%4 == 0 {
		fmt.Println("8 is divisible by 4")
	}

	// Los operadores lógicos como `&&` y `||` suelen ser
	// muy útiles en las condiciones.
	if 8%2 == 0 || 7%2 == 0 {
		fmt.Println("either 8 or 7 are even")
	}

	// Una declaración puede preceder a los condicionales; cualquier variable
	// declarada en esta declaración estará disponible en la rama actual
	// y en todas las ramas subsiguientes.
	if num := 9; num < 0 {
		fmt.Println(num, "is negative")
	} else if num < 10 {
		fmt.Println(num, "has 1 digit")
	} else {
		fmt.Println(num, "has multiple digits")
	}
}

// Ten en cuenta que no se necesitan paréntesis alrededor de las condiciones
// en Go, pero las llaves `{}` son obligatorias.
""",
        "sh": """$ go run if-else.go
7 is odd
8 is divisible by 4
either 8 or 7 are even
9 has 1 digit

# No existe un operador ternario `if` en Go, por lo que
# deberás usar una sentencia `if` completa incluso para
# condiciones básicas.
"""
    },

    "switch": {
        "go": """// Las _sentencias switch_ expresan condicionales a través de múltiples
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
			fmt.Printf("Don't know type %T\\n", t)
		}
	}
	whatAmI(true)
	whatAmI(1)
	whatAmI("hey")
}
""",
        "sh": None
    },

    "arrays": {
        "go": """// En Go, un _array_ (arreglo) es una secuencia numerada de elementos de una
// longitud específica. En el código idiomático de Go, los [slices](slices) son
// mucho más comunes; los arrays son útiles en algunos escenarios
// particulares de memoria contigua.

package main

import "fmt"

func main() {

	// Aquí creamos un array `a` que contendrá exactamente
	// 5 valores de tipo `int`. Tanto el tipo de los elementos como la longitud
	// forman parte del tipo del array. Por defecto, un array tiene el
	// valor cero, que para los `int` representa `0`.
	var a [5]int
	fmt.Println("emp:", a)

	// Podemos establecer un valor en un índice mediante la
	// sintaxis `array[index] = value`, y obtener un valor con
	// `array[index]`.
	a[4] = 100
	fmt.Println("set:", a)
	fmt.Println("get:", a[4])

	// La función incorporada `len` devuelve la longitud de un array.
	fmt.Println("len:", len(a))

	// Usa esta sintaxis para declarar e inicializar un array
	// en una sola línea.
	b := [5]int{1, 2, 3, 4, 5}
	fmt.Println("dcl:", b)

	// También puedes hacer que el compilador cuente la cantidad de
	// elementos automáticamente utilizando `...`
	b = [...]int{1, 2, 3, 4, 5}
	fmt.Println("dcl:", b)

	// Si especificas el índice con `:`, los elementos
	// intermedios se rellenarán con ceros.
	b = [...]int{100, 3: 400, 500}
	fmt.Println("idx:", b)

	// Los tipos de array son unidimensionales, pero puedes
	// componer tipos para construir estructuras de datos
	// multidimensionales.
	var twoD [2][3]int
	for i := range 2 {
		for j := range 3 {
			twoD[i][j] = i + j
		}
	}
	fmt.Println("2d: ", twoD)

	// También puedes crear e inicializar arrays multidimensionales
	// de una sola vez.
	twoD = [2][3]int{
		{1, 2, 3},
		{1, 2, 3},
	}
	fmt.Println("2d: ", twoD)
}
""",
        "sh": """$ go run arrays.go
emp: [0 0 0 0 0]
set: [0 0 0 0 100]
get: 100
len: 5
dcl: [1 2 3 4 5]
dcl: [1 2 3 4 5]
idx: [100 0 0 400 500]
2d:  [[0 1 2] [1 2 3]]
2d:  [[1 2 3] [1 2 3]]

# Ten en cuenta que los arrays aparecen en la forma `[v1 v2 v3 ...]`
# cuando se imprimen con `fmt.Println`.
"""
    },

    "slices": {
        "go": """// Los _slices_ son un tipo de dato clave en Go, que proporcionan una
// interfaz más potente y flexible para secuencias de datos que los arrays.

package main

import (
	"fmt"
	"slices"
)

func main() {

	// A diferencia de los arrays, los slices se tipan únicamente por los
	// elementos que contienen (no por el número de elementos).
	// Un slice no inicializado es igual a nil y tiene una longitud de 0.
	var s []string
	fmt.Println("uninit:", s, s == nil, len(s) == 0)

	// Para crear un slice vacío con longitud distinta de cero, usa
	// la función incorporada `make`. Aquí creamos un slice de `string`s de
	// longitud `3` (inicializado con valores cero).
	// Por defecto, la capacidad de un nuevo slice es igual a su longitud;
	// si sabemos de antemano que el slice crecerá, es posible
	// pasar una capacidad explícita como argumento adicional a `make`.
	s = make([]string, 3)
	fmt.Println("emp:", s, "len:", len(s), "cap:", cap(s))

	// Podemos asignar y obtener valores exactamente igual que con los arrays.
	s[0] = "a"
	s[1] = "b"
	s[2] = "c"
	fmt.Println("set:", s)
	fmt.Println("get:", s[2])

	// `len` devuelve la longitud del slice como se espera.
	fmt.Println("len:", len(s))

	// Además de estas operaciones básicas, los slices admiten
	// varias más que los hacen mucho más ricos que los arrays.
	// Una de ellas es la función incorporada `append`, la cual
	// devuelve un slice que contiene uno o más valores nuevos.
	// Ten en cuenta que debemos capturar el valor de retorno de
	// `append`, ya que podríamos recibir una nueva referencia de slice.
	s = append(s, "d")
	s = append(s, "e", "f")
	fmt.Println("apd:", s)

	// Los slices también se pueden copiar con `copy`. Aquí creamos un
	// slice vacío `c` de la misma longitud que `s` y copiamos
	// en `c` el contenido de `s`.
	c := make([]string, len(s))
	copy(c, s)
	fmt.Println("cpy:", c)

	// Los slices admiten el operador de corte con la sintaxis
	// `slice[low:high]`. Por ejemplo, esto obtiene un sub-slice
	// de los elementos `s[2]`, `s[3]` y `s[4]`.
	l := s[2:5]
	fmt.Println("sl1:", l)

	// Esto corta hasta (pero excluyendo) `s[5]`.
	l = s[:5]
	fmt.Println("sl2:", l)

	// Y esto corta desde (e incluyendo) `s[2]`.
	l = s[2:]
	fmt.Println("sl3:", l)

	// También podemos declarar e inicializar una variable de tipo slice
	// en una sola línea.
	t := []string{"g", "h", "i"}
	fmt.Println("dcl:", t)

	// El paquete `slices` contiene una serie de funciones
	// de utilidad muy convenientes para slices.
	t2 := []string{"g", "h", "i"}
	if slices.Equal(t, t2) {
		fmt.Println("t == t2")
	}

	// Los slices pueden componerse en estructuras de datos
	// multidimensionales. La longitud de los slices internos puede
	// variar, a diferencia de los arrays multidimensionales.
	twoD := make([][]int, 3)
	for i := range 3 {
		innerLen := i + 1
		twoD[i] = make([]int, innerLen)
		for j := range innerLen {
			twoD[i][j] = i + j
		}
	}
	fmt.Println("2d: ", twoD)
}
""",
        "sh": """$ go run slices.go
uninit: [] true true
emp: [  ] len: 3 cap: 3
set: [a b c]
get: c
len: 3
apd: [a b c d e f]
cpy: [a b c d e f]
sl1: [c d e]
sl2: [a b c d e]
sl3: [c d e f]
dcl: [g h i]
t == t2
2d:  [[0] [1 2] [2 3 4]]

# Consulta esta [excelente publicación de blog](https://go.dev/blog/slices-intro)
# del equipo de Go para conocer más detalles sobre el diseño
# y la implementación interna de los slices en Go.

# Ahora que hemos visto arrays y slices, revisaremos la otra
# estructura de datos asociativa integrada en Go: los mapas.
"""
    },

    "maps": {
        "go": """// Los _maps_ (mapas) son el [tipo de dato asociativo](https://en.wikipedia.org/wiki/Associative_array)
// integrado en Go (a veces denominados _hashes_ o _diccionarios_ en otros lenguajes).

package main

import (
	"fmt"
	"maps"
)

func main() {

	// Para crear un mapa vacío, usa la función incorporada `make`:
	// `make(map[key-type]val-type)`.
	m := make(map[string]int)

	// Establece pares clave/valor usando la sintaxis habitual
	// `name[key] = val`.
	m["k1"] = 7
	m["k2"] = 13

	// Imprimir un mapa con `fmt.Println` mostrará todos sus
	// pares clave/valor.
	fmt.Println("map:", m)

	// Obtén el valor de una clave con `name[key]`.
	v1 := m["k1"]
	fmt.Println("v1:", v1)

	// Si la clave no existe, se devuelve el
	// [valor cero](https://go.dev/ref/spec#The_zero_value) del
	// tipo de valor correspondiente.
	v3 := m["k3"]
	fmt.Println("v3:", v3)

	// La función incorporada `len` devuelve el número de pares
	// clave/valor cuando se invoca sobre un mapa.
	fmt.Println("len:", len(m))

	// La función incorporada `delete` elimina pares clave/valor
	// de un mapa.
	delete(m, "k2")
	fmt.Println("map:", m)

	// Para eliminar *todos* los pares clave/valor de un mapa, utiliza
	// la función incorporada `clear`.
	clear(m)
	fmt.Println("map:", m)

	// El segundo valor de retorno opcional al obtener un valor
	// de un mapa indica si la clave estaba presente
	// en el mapa. Esto permite desambiguar entre claves inexistentes
	// y claves con valores cero como `0` o `""`.
	// Aquí no necesitábamos el valor en sí, por lo que lo ignoramos
	// con el _identificador en blanco_ `_`.
	_, prs := m["k2"]
	fmt.Println("prs:", prs)

	// También puedes declarar e inicializar un mapa nuevo en
	// la misma línea con esta sintaxis.
	n := map[string]int{"foo": 1, "bar": 2}
	fmt.Println("map:", n)

	// El paquete `maps` contiene una variedad de funciones
	// de utilidad convenientes para mapas.
	n2 := map[string]int{"foo": 1, "bar": 2}
	if maps.Equal(n, n2) {
		fmt.Println("n == n2")
	}
}
""",
        "sh": """$ go run maps.go
map: map[k1:7 k2:13]
v1: 7
v3: 0
len: 2
map: map[k1:7]
map: map[]
prs: false
map: map[bar:2 foo:1]
n == n2

# Ten en cuenta que los mapas aparecen en la forma `map[k:v k:v]`
# cuando se imprimen con `fmt.Println`.
"""
    },

    "functions": {
        "go": """// Las _funciones_ son una pieza central en Go. Aprenderemos sobre
// funciones mediante varios ejemplos distintos.

package main

import "fmt"

// Aquí tenemos una función que toma dos `int` y devuelve
// su suma como un `int`.
func plus(a int, b int) int {

	// Go requiere retornos explícitos; es decir, no retornará
	// automáticamente el valor de la última expresión evaluada.
	return a + b
}

// Cuando tienes múltiples parámetros consecutivos del
// mismo tipo, puedes omitir el nombre del tipo para los
// parámetros con tipos idénticos hasta el parámetro final que
// declara el tipo.
func plusPlus(a, b, c int) int {
	return a + b + c
}

func main() {

	// Llama a una función de la manera habitual, con
	// `name(args)`.
	res := plus(1, 2)
	fmt.Println("1+2 =", res)

	res = plusPlus(1, 2, 3)
	fmt.Println("1+2+3 =", res)
}
""",
        "sh": """$ go run functions.go
1+2 = 3
1+2+3 = 6

# Hay muchas otras características en las funciones de Go. Una
# de ellas son los valores de retorno múltiples, que veremos a continuación.
"""
    },

    "multiple-return-values": {
        "go": """// Go cuenta con soporte integrado para _valores de retorno múltiples_.
// Esta característica se usa con frecuencia en Go idiomático, por ejemplo
// para retornar tanto el resultado como el valor de error desde una función.

package main

import "fmt"

// El `(int, int)` en la firma de esta función indica que
// la función retorna 2 valores de tipo `int`.
func vals() (int, int) {
	return 3, 7
}

func main() {

	// Aquí utilizamos los 2 valores de retorno distintos de la
	// llamada mediante una _asignación múltiple_.
	a, b := vals()
	fmt.Println(a)
	fmt.Println(b)

	// Si solo deseas un subconjunto de los valores retornados,
	// utiliza el identificador en blanco `_`.
	_, c := vals()
	fmt.Println(c)
}
""",
        "sh": """$ go run multiple-return-values.go
3
7
7

# Aceptar un número variable de argumentos es otra característica
# elegante de las funciones en Go; veremos esto a continuación.
"""
    },

    "variadic-functions": {
        "go": """// Las [_funciones variádicas_](https://en.wikipedia.org/wiki/Variadic_function)
// pueden invocarse con cualquier número de argumentos finales.
// Por ejemplo, `fmt.Println` es una función variádica habitual.

package main

import "fmt"

// Aquí tenemos una función que aceptará un número arbitrario
// de enteros `int` como argumentos.
func sum(nums ...int) {
	fmt.Print(nums, " ")
	total := 0
	// Dentro de la función, el tipo de `nums` es
	// equivalente a `[]int`. Podemos invocar `len(nums)`,
	// iterar sobre él con `range`, etc.
	for _, num := range nums {
		total += num
	}
	fmt.Println(total)
}

func main() {

	// Las funciones variádicas pueden invocarse de la forma convencional
	// con argumentos individuales separados por comas.
	sum(1, 2)
	sum(1, 2, 3)

	// Si ya dispones de múltiples argumentos dentro de un slice,
	// aplícalos a una función variádica usando la sintaxis
	// `func(slice...)` de esta manera.
	nums := []int{1, 2, 3, 4}
	sum(nums...)
}
""",
        "sh": """$ go run variadic-functions.go
[1 2] 3
[1 2 3] 6
[1 2 3 4] 10

# Otro aspecto fundamental de las funciones en Go es su capacidad
# de formar closures, lo cual veremos a continuación.
"""
    },

    "closures": {
        "go": """// Go admite [_funciones anónimas_](https://en.wikipedia.org/wiki/Anonymous_function),
// que pueden formar <a href="https://en.wikipedia.org/wiki/Closure_(computer_science)"><em>closures</em></a> (clausuras).
// Las funciones anónimas resultan muy útiles cuando deseas definir
// una función en línea sin necesidad de asignarle un nombre.

package main

import "fmt"

// Esta función `intSeq` retorna otra función, la cual
// definimos de manera anónima en el cuerpo de `intSeq`. La
// función retornada _captura_ la variable `i` para
// formar un closure.
func intSeq() func() int {
	i := 0
	return func() int {
		i++
		return i
	}
}

func main() {

	// Llamamos a `intSeq`, asignando el resultado (una función)
	// a `nextInt`. Este valor de función captura su
	// propio valor de `i`, el cual se actualizará cada vez
	// que invoquemos `nextInt`.
	nextInt := intSeq()

	// Observa el efecto del closure invocando `nextInt`
	// varias veces consecutivas.
	fmt.Println(nextInt())
	fmt.Println(nextInt())
	fmt.Println(nextInt())

	// Para confirmar que el estado es único para esa
	// función en particular, creamos y probamos una nueva instancia.
	newInts := intSeq()
	fmt.Println(newInts())
}
""",
        "sh": """$ go run closures.go
1
2
3
1

# La última característica de funciones que examinaremos por ahora
# es la recursión.
"""
    },

    "recursion": {
        "go": """// Go admite
// <a href="https://en.wikipedia.org/wiki/Recursion_(computer_science)"><em>funciones recursivas</em></a>.
// Aquí tenemos un ejemplo clásico de cálculo factorial.

package main

import "fmt"

// Esta función `fact` se llama a sí misma hasta alcanzar el
// caso base de `fact(0)`.
func fact(n int) int {
	if n == 0 {
		return 1
	}
	return n * fact(n-1)
}

func main() {
	fmt.Println(fact(7))

	// Las funciones anónimas también pueden ser recursivas, pero esto requiere
	// declarar explícitamente una variable con `var` para almacenar
	// la función antes de definirla.
	var fib func(n int) int

	fib = func(n int) int {
		if n < 2 {
			return n
		}

		// Dado que `fib` fue declarada previamente en `main`, Go
		// sabe exactamente a qué función llamar con `fib` aquí.
		return fib(n-1) + fib(n-2)
	}

	fmt.Println(fib(7))
}
""",
        "sh": None
    }
}

def apply_group1():
    for slug, data in TOPICS_G1.items():
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
    apply_group1()
