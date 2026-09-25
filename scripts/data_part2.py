# scripts/data_part2.py
# Temas 22 a 43 (Enums, Struct Embedding, Generics, Iterators, Errores y Concurrencia con Canales)

TOPICS_PART2 = {
    "enums": {
        "id": 22,
        "slug": "enums",
        "title": "Enums",
        "titleEs": "Enumeraciones y el Patrón Iota",
        "category": "Tipos Avanzados y POO en Go",
        "categorySlug": "poo-generics",
        "categoryIcon": "🏛️",
        "difficulty": "Intermedio",
        "summary": "Implementación idiomática de tipos enumerados seguros usando tipos personalizados, bloques const e iota.",
        "originalExpl": "Go no tiene un tipo 'enum' dedicado como una palabra clave fija. En su lugar, se implementan enumeraciones combinando un tipo personalizado basado en un entero (o string) con el generador 'iota' dentro de un bloque 'const'.",
        "basicExpl": {
            "title": "Conceptos Fundamentales para Principiantes",
            "content": "Una enumeración (enum) es una lista de opciones fijas con nombre, como los días de la semana, los estados de un pedido (Pendiente, Enviado, Entregado) o los puntos cardinales.\nEn Go:\n1. Creas un tipo con nombre: `type EstadoPedido int`.\n2. Creas constantes usando `iota`: cada opción recibe automáticamente un número consecutivo (0, 1, 2, ...).\n3. Creas un método `String()` para que al imprimir el enum se vea un texto legible en vez de un número frío.",
            "keyPoints": [
                "Se define un tipo nuevo: `type ServidorEstado int`.",
                "iota numera las constantes automáticamente sin tener que escribir números.",
                "Implementar el método `String() string` satisface la interfaz `fmt.Stringer` para mostrar nombres amigables."
            ]
        },
        "interExpl": {
            "title": "Mecanismos Internos y Buenas Prácticas",
            "content": "Seguridad de tipos y valor cero: En Go, el zero value de un entero es 0. Si el valor 0 de tu enum significa algo activo, una variable no inicializada tomará ese estado por accidente. Por convención idiomática, se suele asignar 0 a un estado 'Desconocido' o inválido (`EstadoDesconocido = iota`).\n\nHerramienta oficial `stringer`: Go incluye una herramienta CLI (`go install golang.org/x/tools/cmd/stringer@latest`) que genera automáticamente el método `String()` de alta velocidad mediante una directiva `//go:generate stringer -type=EstadoPedido`.",
            "keyPoints": [
                "Zero-Value seguro: reservar el valor 0 para `Desconocido` o `Invalido`.",
                "Generador oficial `stringer`: genera código de impresión O(1) con tablas estáticas de strings.",
                "Enums basados en cadenas: también se pueden definir constantes de tipo `string` cuando se interactúa con APIs JSON externas."
            ]
        },
        "expertExpl": {
            "title": "Bajo Nivel, Rendimiento e Internals",
            "content": "A nivel de código compilado, un enum basado en `int` tiene exactamente el mismo coste en registros y memoria que un entero primitivo (4 u 8 bytes) con cero sobrecoste de abstracción.\n\nLa herramienta `stringer` optimiza la representación de cadenas agrupando todos los nombres en un único string literal monolítico (ej. `const _Estado_name = \"PendienteEnviadoEntregado\"`) y un array de índices de corte uint8. Esto reduce el número de reubicaciones dinámicas en el binario y maximiza la localidad en la caché de instrucciones.",
            "keyPoints": [
                "Stringer Memory Trick: concatenación de literales para reducir metadata de símbolos en el ejecutable.",
                "Máscaras de bits (Bitmasks): Usar `1 << iota` para flags combinables con operadores booleanos bit a bit (&, |, ^).",
                "Tipado fuerte: el compilador rechaza asignar un `int` genérico a una variable de tipo enum sin conversión explícita."
            ]
        },
        "evaluation": {
            "title": "Reto: Enum de Estado de Conexión con Stringer y Validación",
            "statement": "Define un tipo 'EstadoConexion int' con estados: EstadoDesconectado (0), EstadoConectando (1), EstadoConectado (2) y EstadoError (3). Implementa el método 'String() string' y una función 'EsOperativo() bool' que solo devuelva true si el estado es Conectado.",
            "starterCode": "package main\n\nimport \"fmt\"\n\n// Define el tipo y las constantes con iota\n\n// Implementa String() y EsOperativo()\n\nfunc main() {\n    // Prueba los estados\n}",
            "hint": "Usa un switch dentro del método String() para devolver el nombre de cada estado.",
            "solution": "package main\n\nimport \"fmt\"\n\ntype EstadoConexion int\n\nconst (\n    EstadoDesconectado EstadoConexion = iota\n    EstadoConectando\n    EstadoConectado\n    EstadoError\n)\n\nfunc (e EstadoConexion) String() string {\n    switch e {\n    case EstadoDesconectado:\n        return \"Desconectado\"\n    case EstadoConectando:\n        return \"Conectando...\"\n    case EstadoConectado:\n        return \"Conectado\"\n    case EstadoError:\n        return \"Error de Red\"\n    default:\n        return fmt.Sprintf(\"Estado(%d)\", e)\n    }\n}\n\nfunc (e EstadoConexion) EsOperativo() bool {\n    return e == EstadoConectado\n}\n\nfunc main() {\n    actual := EstadoConectado\n    fmt.Printf(\"Estado actual: %s (¿Operativo?: %t)\\n\", actual, actual.EsOperativo())\n    \n    fallo := EstadoError\n    fmt.Printf(\"Estado fallo: %s (¿Operativo?: %t)\\n\", fallo, fallo.EsOperativo())\n}",
            "explanation": "El patrón enum combina un tipo subyacente entero seguro con constantes generadas mediante iota. El método String() cumple con la interfaz fmt.Stringer de la biblioteca estándar, permitiendo que fmt.Printf imprima automáticamente la descripción textual."
        },
        "externalLinks": [
            {"title": "The Go Blog: Generating code with stringer", "url": "https://go.dev/blog/strings", "description": "Cómo usar la herramienta oficial stringer para generar métodos String() en enums."},
            {"title": "Effective Go: Constants", "url": "https://go.dev/doc/effective_go#constants", "description": "El uso de iota para enumeraciones en Effective Go."},
            {"title": "Go Spec: Iota", "url": "https://go.dev/ref/spec#Iota", "description": "Especificación de las reglas de incremento del identificador iota."}
        ]
    },

    "struct-embedding": {
        "id": 23,
        "slug": "struct-embedding",
        "title": "Struct Embedding",
        "titleEs": "Composición y Embebido de Structs (Herencia sin Clases)",
        "category": "Tipos Avanzados y POO en Go",
        "categorySlug": "poo-generics",
        "categoryIcon": "🏛️",
        "difficulty": "Intermedio",
        "summary": "Composición sobre herencia: inserción de tipos anónimos dentro de estructuras para reutilizar y promover campos y métodos.",
        "originalExpl": "Go soporta la incrustación (embedding) de estructuras e interfaces para expresar una composición más rica de tipos. Los campos y métodos del struct embebido se promocionan automáticamente al struct contenedor.",
        "basicExpl": {
            "title": "Conceptos Fundamentales para Principiantes",
            "content": "En Go no existe la palabra 'extends' ni la herencia clásica de la Programación Orientada a Objetos. Los creadores de Go prefirieron la filosofía: 'Favorece la composición sobre la herencia'.\n- Para reutilizar datos y métodos, simplemente colocas un struct dentro de otro SIN darle un nombre de campo (embebido anónimo):\n```go\ntype Motor struct { PotenciaCV int }\ntype Coche struct {\n    Motor   // Campo embebido anónimo\n    Marca string\n}\n```\n- Ahora `miCoche.PotenciaCV` funciona directamente, como si fuera un campo propio de Coche.",
            "keyPoints": [
                "No hay herencia de clases; hay composición de tipos.",
                "Promoción automática: los campos y métodos del tipo embebido se invocan directamente desde el tipo contenedor.",
                "Acceso explícito: también puedes acceder al struct interno por su nombre de tipo (`miCoche.Motor.PotenciaCV`)."
            ]
        },
        "interExpl": {
            "title": "Mecanismos Internos y Buenas Prácticas",
            "content": "Sombreado de métodos (Method Shadowing): Si el struct contenedor define un método con el mismo nombre que el struct embebido, el método externo 'sombrea' al interno, permitiendo sobreescritura de comportamiento:\n```go\nfunc (c Coche) Describir() { ... } // Reemplaza al Describir() de Motor\n```\nEmbebido de Interfaces: También puedes embeber interfaces dentro de estructuras. Esto es ampliamente utilizado en testing para crear mocks parciales sin tener que implementar decenas de métodos irrelevantes para la prueba.",
            "keyPoints": [
                "Method Shadowing: El tipo exterior puede sobreescribir métodos de los tipos embebidos.",
                "Satisfacción de interfaces promovida: Si el tipo embebido satisface una interfaz, el tipo contenedor también la satisface automáticamente.",
                "Composición múltiple: puedes embeber varios structs e interfaces en una sola estructura."
            ]
        },
        "expertExpl": {
            "title": "Bajo Nivel, Rendimiento e Internals",
            "content": "A nivel de diseño de memoria, embeber un struct `B` dentro de `A` es físicamente idéntico a declarar un campo normal con nombre: los bytes de `B` se colocan contiguos dentro del bloque de memoria de `A`. No hay punteros indirectos ni tablas de clases virtuales (vtable overhead) en tiempo de ejecución.\n\nEl compilador resuelve la promoción de campos y métodos estáticamente durante el análisis semántico (compile-time syntactic sugar). Si dos tipos embebidos tienen un campo con el mismo nombre y se intenta acceder a nivel raíz, el compilador genera un error de ambigüedad ('ambiguous selector'), forzando a desempatar explícitamente (`a.Tipo1.Campo`).",
            "keyPoints": [
                "Zero vtable overhead: la promoción de métodos se resuelve en tiempo de compilación con saltos directos.",
                "Contigüidad de memoria: los structs embebidos por valor residen en el mismo bloque contiguo de bytes.",
                "Detección de ambigüedad: colisiones de nombres entre tipos embebidos son detectadas por el compilador."
            ]
        },
        "evaluation": {
            "title": "Reto: Sistema de Entidades con Registro y Auditoría Embebida",
            "statement": "Crea una estructura 'Auditoria' con campos 'CreadoEn' (string) e 'ID' (int) y un método 'DetallesAuditoria() string'. Luego crea una estructura 'Producto' que embeba 'Auditoria' y agregue 'Nombre' y 'Precio'. Demuestra el acceso a los métodos y campos promocionados.",
            "starterCode": "package main\n\nimport \"fmt\"\n\n// Define Auditoria y su método\n\n// Define Producto embebiendo Auditoria\n\nfunc main() {\n    // Instancia y prueba la promoción\n}",
            "hint": "Embebe Auditoria colocando solo el nombre del tipo dentro del struct Producto sin nombre de campo.",
            "solution": "package main\n\nimport \"fmt\"\n\ntype Auditoria struct {\n    ID       int\n    CreadoEn string\n}\n\nfunc (a Auditoria) DetallesAuditoria() string {\n    return fmt.Sprintf(\"Registro #%d creado en %s\", a.ID, a.CreadoEn)\n}\n\ntype Producto struct {\n    Auditoria // Struct embebido anónimo\n    Nombre    string\n    Precio    float64\n}\n\nfunc main() {\n    p := Producto{\n        Auditoria: Auditoria{ID: 101, CreadoEn: \"2026-09-25\"},\n        Nombre:    \"Monitor 4K OLED\",\n        Precio:    699.99,\n    }\n    \n    // Campos y métodos promocionados directamente\n    fmt.Printf(\"Producto: %s ($%.2f)\\n\", p.Nombre, p.Precio)\n    fmt.Println(\"ID directo:\", p.ID) // Promocionado desde Auditoria\n    fmt.Println(p.DetallesAuditoria()) // Método promocionado directamente\n}",
            "explanation": "Al embeber 'Auditoria' dentro de 'Producto', todos sus campos (ID, CreadoEn) y métodos (DetallesAuditoria) quedan promovidos al primer nivel de Producto, permitiendo un diseño modular, reutilizable y limpio sin caer en las jerarquías rígidas de la herencia clásica."
        },
        "externalLinks": [
            {"title": "Effective Go: Embedding", "url": "https://go.dev/doc/effective_go#embedding", "description": "La guía oficial de Go sobre el uso de struct e interface embedding."},
            {"title": "Go Spec: Struct types and embedded fields", "url": "https://go.dev/ref/spec#Struct_types", "description": "Reglas de selectores y promoción de identificadores embebidos."},
            {"title": "Eli Bendersky: Embedding in Go", "url": "https://eli.thegreenplace.net/2020/embedding-in-go-part-1-structs/", "description": "Artículo detallado de Eli Bendersky sobre los patrones de embebido."}
        ]
    },

    "generics": {
        "id": 24,
        "slug": "generics",
        "title": "Generics",
        "titleEs": "Genéricos (Type Parameters)",
        "category": "Tipos Avanzados y POO en Go",
        "categorySlug": "poo-generics",
        "categoryIcon": "🏛️",
        "difficulty": "Avanzado",
        "summary": "Programación genérica en Go (1.18+) mediante parámetros de tipo, restricciones y el paquete estándar 'cmp'.",
        "originalExpl": "A partir de la versión 1.18, Go soporta genéricos, también conocidos como parámetros de tipo. Permiten escribir funciones y estructuras de datos independientes de los tipos concretos que manejan.",
        "basicExpl": {
            "title": "Conceptos Fundamentales para Principiantes",
            "content": "Antes de Go 1.18, si querías una función para encontrar el elemento mayor en un slice de enteros y otra para flotantes, tenías que escribir dos funciones casi idénticas o usar la interfaz vacía 'any' perdiendo la seguridad de tipos.\nCon los 'Genéricos':\n- Defines un parámetro de tipo entre corchetes: `func Mayor[T int | float64](a, b T) T`.\n- 'T' representa un tipo genérico comodín.\n- El compilador comprueba que solo uses tipos válidos y mantiene la velocidad nativa sin conversiones manuales.",
            "keyPoints": [
                "Los parámetros de tipo se escriben entre corchetes: `[T comparable]`, `[T any]`.",
                "'any' es un alias de interface{} y representa cualquier tipo.",
                "'comparable' es una restricción nativa para tipos que admiten los operadores '==' y '!='."
            ]
        },
        "interExpl": {
            "title": "Mecanismos Internos y Buenas Prácticas",
            "content": "Restricciones de tipo y el operador tilde (~):\nEl operador `~` en una interfaz de restricción indica que se acepta cualquier tipo cuya BASE sea ese tipo primitivo (ej. `~int` acepta tanto `int` nativo como `type MiEntero int`):\n```go\ntype Numerico interface {\n    ~int | ~int64 | ~float64\n}\n```\nEl paquete estándar `cmp`: Desde Go 1.21 se incluye `cmp.Ordered`, que engloba a todos los tipos nativos que admiten los operadores de orden `<`, `<=`, `>`, `>=`.",
            "keyPoints": [
                "Operador de aproximación (~): `~T` acepta tipos definidos por el usuario cuyo tipo subyacente sea T.",
                "Restricción `cmp.Ordered`: engloba enteros, floats y strings para algoritmos de ordenamiento y comparación.",
                "Cuándo NO usar genéricos: si una interfaz simple con métodos resuelve el problema, no compliques el diseño con genéricos."
            ]
        },
        "expertExpl": {
            "title": "Bajo Nivel, Rendimiento e Internals",
            "content": "Implementación en el compilador de Go: GC Shape Stenciling con diccionarios de tipos.\nA diferencia de C++ (que genera una copia completa de código máquina para cada tipo, inflando el tamaño del binario) y de Java (que hace 'type erasure' envolviendo todo en objetos con boxing costoso), Go utiliza una técnica híbrida:\n- Todos los tipos con la misma forma de memoria y punteros de GC (ejemplo: todos los tipos de punteros `*Persona`, `*Auto`) comparten exactamente la MISMA función compilada en código máquina.\n- El compilador pasa un puntero oculto a un 'diccionario en tiempo de ejecución' que describe los métodos y tamaños específicos.\n- Para tipos de valores primitivos (int, float64), Go genera instancias especializadas de alta velocidad optimizadas para los registros de CPU.",
            "keyPoints": [
                "GC Shape Stenciling: minimiza el inflado del binario (binary bloat) compartiendo código entre tipos compatibles.",
                "Runtime Type Dictionaries: punteros implícitos a descriptores de tipo pasados como primer parámetro en registros.",
                "No monomorfización pura: equilibrio óptimo entre tiempo de compilación rápido y rendimiento de ejecución."
            ]
        },
        "evaluation": {
            "title": "Reto: Estructura de Pila Genérica (Generic Stack LIFO)",
            "statement": "Implementa una estructura de datos genérica 'Pila[T any]' con métodos 'Push(elemento T)', 'Pop() (T, bool)' y 'Longitud() int'. Demuestra su uso tanto con enteros como con cadenas de texto.",
            "starterCode": "package main\n\nimport \"fmt\"\n\n// Define Pila[T any] y sus métodos\n\nfunc main() {\n    // Prueba con Pila[int] y Pila[string]\n}",
            "hint": "Guarda los elementos en un slice interno: elementos []T.",
            "solution": "package main\n\nimport \"fmt\"\n\ntype Pila[T any] struct {\n    elementos []T\n}\n\nfunc (p *Pila[T]) Push(elemento T) {\n    p.elementos = append(p.elementos, elemento)\n}\n\nfunc (p *Pila[T]) Pop() (T, bool) {\n    if len(p.elementos) == 0 {\n        var zero T\n        return zero, false\n    }\n    ultimoIdx := len(p.elementos) - 1\n    valor := p.elementos[ultimoIdx]\n    p.elementos = p.elementos[:ultimoIdx]\n    return valor, true\n}\n\nfunc (p *Pila[T]) Longitud() int {\n    return len(p.elementos)\n}\n\nfunc main() {\n    // Pila de enteros\n    pilaInt := Pila[int]{}\n    pilaInt.Push(10)\n    pilaInt.Push(20)\n    val, _ := pilaInt.Pop()\n    fmt.Println(\"Pila Int Pop:\", val)\n    \n    // Pila de strings\n    pilaStr := Pila[string]{}\n    pilaStr.Push(\"hola\")\n    pilaStr.Push(\"mundo\")\n    strVal, _ := pilaStr.Pop()\n    fmt.Println(\"Pila String Pop:\", strVal)\n}",
            "explanation": "La estructura 'Pila[T any]' desacopla el contenedor del tipo de dato concreto. Al invocar Pop() en una pila vacía, se retorna 'var zero T', que obtiene limpiamente el valor cero correspondiente al tipo genérico instanciado sin conversiones inseguras."
        },
        "externalLinks": [
            {"title": "Go Tutorial: Getting started with generics", "url": "https://go.dev/doc/tutorial/generics", "description": "Tutorial oficial paso a paso sobre funciones y tipos genéricos."},
            {"title": "The Go Blog: An Introduction To Generics", "url": "https://go.dev/blog/intro-generics", "description": "Artículo de lanzamiento de genéricos por Ian Lance Taylor y Robert Griesemer."},
            {"title": "Package cmp (Standard Library)", "url": "https://pkg.go.dev/cmp", "description": "Documentación oficial del paquete de comparación y ordenamiento cmp."}
        ]
    },

    "range-over-iterators": {
        "id": 25,
        "slug": "range-over-iterators",
        "title": "Range over Iterators",
        "titleEs": "Iteradores con Range (Go 1.22+ y 1.23+)",
        "category": "Tipos Avanzados y POO en Go",
        "categorySlug": "poo-generics",
        "categoryIcon": "🏛️",
        "difficulty": "Avanzado",
        "summary": "El nuevo estándar de iteración en Go: funciones iteradoras iter.Seq e iter.Seq2 integradas directamente en el bucle 'for range'.",
        "originalExpl": "A partir de Go 1.22 (y formalizado en Go 1.23 con el paquete 'iter'), 'range' puede iterar sobre funciones de tipo iterador. Esto permite crear secuencias personalizadas de elementos de forma perezosa (lazy evaluation).",
        "basicExpl": {
            "title": "Conceptos Fundamentales para Principiantes",
            "content": "Imagina que quieres recorrer los nodos de un árbol, leer millones de filas de una base de datos o generar números infinitos sin cargarlos todos juntos en un slice en memoria.\nAntes de Go 1.22, tenías que inventar métodos extraños o usar canales lentos. Ahora puedes crear una función 'iteradora' que Go entiende directamente dentro de un bucle `for valor := range MiSecuencia()`.\n- La función iteradora produce un valor cada vez y se pausa hasta que el bucle pida el siguiente (evaluación perezosa).",
            "keyPoints": [
                "Permite usar `for x := range miFuncionIteradora` de forma totalmente nativa.",
                "Evaluación perezosa (lazy): solo genera los valores a medida que el bucle los solicita.",
                "Paquete `iter`: define las firmas estándar `iter.Seq[V]` e `iter.Seq2[K, V]`."
            ]
        },
        "interExpl": {
            "title": "Mecanismos Internos y Buenas Prácticas",
            "content": "La anatomía de un iterador Go (Push-style iterators):\nUn iterador en Go es una función de orden superior que recibe una función 'yield':\n```go\ntype Seq[V any] func(yield func(V) bool) bool\n```\n- En cada paso, llamas a `yield(valor)`.\n- Si `yield` devuelve `false`, significa que el programador ejecutó un `break` dentro del bucle for, por lo que tu función iteradora DEBE detenerse inmediatamente y no emitir más valores.\n- Si devuelve `true`, continúas con el siguiente elemento.",
            "keyPoints": [
                "Control de parada con yield: si `yield(...)` devuelve false, el iterador debe terminar de inmediato.",
                "iter.Seq2: para iteradores que devuelven pares clave/valor (como índices o mapas): `func(yield func(K, V) bool)`.",
                "Paquete estándar `slices.All`, `maps.All`: en Go 1.23 devuelven iteradores estándar."
            ]
        },
        "expertExpl": {
            "title": "Bajo Nivel, Rendimiento e Internals",
            "content": "Diseño Coroutine-Driven y Transformación del Compilador:\nTradicionalmente, los iteradores 'pull' (como en Python o C# con MoveNext/Current) requieren mantener estado en una máquina de estados explícita en memoria heap. Go eligió iteradores 'push' (invertidos), donde el cuerpo del bucle for se transforma en la función de callback `yield`.\n\nEl compilador de Go realiza 'coroutine inlining': transforma la interacción entre el generador y el bucle for en saltos directos optimizados sin crear goroutines adicionales ni canales sincronizados, logrando el mismo rendimiento que un bucle for plano sin asignaciones de memoria.",
            "keyPoints": [
                "Push vs Pull Iterators: Cero asignaciones en memoria gracias a la inversión de control con callbacks.",
                "Coroutine Inlining: el compilador fusiona la función iteradora con el cuerpo del bucle en tiempo de compilación.",
                "Manejo de pánico y defer: los defers declarados dentro del generador se ejecutan puntualmente al terminar o abortar el bucle."
            ]
        },
        "evaluation": {
            "title": "Reto: Generador de Cuenta Regresiva Perezosa (Lazy Countdown)",
            "statement": "Escribe una función iteradora 'CuentaAtras(inicio int) func(func(int) bool)' que emita números desde 'inicio' descendiendo hasta 1. Úsala en un bucle 'for range' que se interrumpa con 'break' si el número es 3.",
            "starterCode": "package main\n\nimport \"fmt\"\n\n// Implementa CuentaAtras con la firma de iterador\n\nfunc main() {\n    // Recorre con for n := range CuentaAtras(5)\n}",
            "hint": "En cada ciclo del bucle for interno, comprueba: if !yield(i) { return }.",
            "solution": "package main\n\nimport \"fmt\"\n\nfunc CuentaAtras(inicio int) func(func(int) bool) {\n    return func(yield func(int) bool) {\n        for i := inicio; i >= 1; i-- {\n            if !yield(i) {\n                fmt.Println(\"[Iterador interrumpido por break]\")\n                return\n            }\n        }\n    }\n}\n\nfunc main() {\n    fmt.Println(\"Iniciando conteo:\")\n    for n := range CuentaAtras(6) {\n        fmt.Println(\"Número:\", n)\n        if n == 3 {\n            fmt.Println(\"Deteniendo con break en 3\")\n            break\n        }\n    }\n}",
            "explanation": "El patrón iterador de Go recibe el callback 'yield'. Cuando se activa el 'break' en el bucle principal, yield devuelve 'false', lo que permite al generador CuentaAtras liberar recursos y terminar limpiamente sin procesar los números restantes (2 y 1)."
        },
        "externalLinks": [
            {"title": "The Go Blog: Range Over Function Types", "url": "https://go.dev/blog/range-functions", "description": "Explicación completa de Russ Cox sobre iteradores y range over func en Go."},
            {"title": "Package iter (Standard Library)", "url": "https://pkg.go.dev/iter", "description": "Documentación oficial del paquete iter en la biblioteca estándar."},
            {"title": "Go Wiki: Rangefunc Experiment", "url": "https://go.dev/wiki/RangefuncExperiment", "description": "Especificaciones técnicas y diseño de la propuesta de iteradores."}
        ]
    },

    "errors": {
        "id": 26,
        "slug": "errors",
        "title": "Errors",
        "titleEs": "Manejo Idiomático de Errores",
        "category": "Manejo de Errores y Excepciones",
        "categorySlug": "errores-panico",
        "categoryIcon": "🛡️",
        "difficulty": "Principiante",
        "summary": "Los errores como valores explícitos de primera clase mediante la interfaz nativa 'error' y el paquete 'errors'.",
        "originalExpl": "En Go es idiomático comunicar errores a través de un valor de retorno explícito y separado. Esto contrasta con las excepciones usadas en lenguajes como Java o Python y con los códigos de resultado sobrecargados en C.",
        "basicExpl": {
            "title": "Conceptos Fundamentales para Principiantes",
            "content": "En Go los errores NO son excepciones mágicas que interrumpen el programa de repente. Son simplemente valores normales y corrientes que una función devuelve.\n- Si todo sale bien, la función devuelve el resultado y `nil` en la posición del error.\n- Si algo falla, devuelve el valor cero del resultado y un objeto de tipo `error` con la explicación.\n- El consumidor siempre comprueba: `if err != nil { /* manejar error */ }`.\n\nAnalogía: Es como recibir un paquete por mensajería. Junto a la caja viene un albarán. Si el albarán dice 'Todo correcto', abres la caja. Si dice 'Dirección no encontrada' (err != nil), sabes que no hay paquete y actúas en consecuencia.",
            "keyPoints": [
                "Los errores son valores normales, no excepciones.",
                "La interfaz nativa es mínima: `type error interface { Error() string }`.",
                "Crear errores simples: `errors.New(\"mensaje\")` o `fmt.Errorf(\"fallo: %s\", razon)`.",
                "La comprobación `if err != nil` es el estándar indiscutible de Go."
            ]
        },
        "interExpl": {
            "title": "Mecanismos Internos y Buenas Prácticas",
            "content": "Envoltura de errores con `%w` (Error Wrapping) y `errors.Is / errors.As`:\nDesde Go 1.13, puedes añadir contexto a un error sin perder la causa original envolviéndolo con el verbo `%w` en `fmt.Errorf`:\n```go\nif err := conectarBD(); err != nil {\n    return fmt.Errorf(\"fallo en servicio usuarios: %w\", err)\n}\n```\nPara comprobar si un error envuelto pertenece a una causa raíz específica, NUNCA compares strings; utiliza `errors.Is(err, ErrNotFound)` o extrae el tipo concreto con `errors.As(err, &miErrorTipo)`.",
            "keyPoints": [
                "Error Wrapping con `%w`: conserva la cadena causal de errores (error chain).",
                "`errors.Is(err, objetivo)`: busca recursivamente en la cadena si el error coincide con un error centinela.",
                "`errors.As(err, &destino)`: busca y desempaqueta tipos concretos de error para acceder a sus campos internos.",
                "Errores Centinela (Sentinel Errors): constantes o variables globales como `io.EOF` o `sql.ErrNoRows`."
            ]
        },
        "expertExpl": {
            "title": "Bajo Nivel, Rendimiento e Internals",
            "content": "Por qué Go no tiene excepciones: En los motores con excepciones (como JVM o C++), lanzar una excepción requiere desenrollar la pila (stack unwinding), capturar la traza de llamadas y deshabilitar optimizaciones del compilador en los bloques try/catch, lo que penaliza fuertemente el rendimiento.\n\nEn Go, un error es una interfaz de 16 bytes que apunta a una estructura estática o al heap. Retornar un error tiene exactamente el mismo coste en la CPU que retornar un entero o un booleano (0 overhead de stack unwinding). Además, el paquete `errors.Join` (incorporado en Go 1.20) permite empaquetar múltiples errores concurrentes en una única interfaz error estructurada.",
            "keyPoints": [
                "Zero stack unwinding cost: retornar errores es tan rápido como retornar cualquier valor en registros.",
                "`errors.Join`: empaquetado nativo de múltiples errores simultáneos (Go 1.20+).",
                "Desempaquetado recursivo: `errors.Is` y `errors.As` navegan la interfaz `Unwrap() error` o `Unwrap() []error`."
            ]
        },
        "evaluation": {
            "title": "Reto: Envoltorio de Errores con Contexto y Verificación con errors.Is",
            "statement": "Define un error centinela 'var ErrSaldoInsuficiente = errors.New(\"fondos insuficientes\")'. Escribe una función 'Transferir(saldo, monto float64) error' que devuelva ese error envuelto con fmt.Errorf y contexto adicional si el monto supera el saldo. En main, comprueba si el error devuelto contiene ErrSaldoInsuficiente usando 'errors.Is'.",
            "starterCode": "package main\n\nimport (\n    \"errors\"\n    \"fmt\"\n)\n\n// Define ErrSaldoInsuficiente aquí\n\n// Implementa Transferir envolviendo el error con %w\n\nfunc main() {\n    // Prueba la transferencia y verifica con errors.Is\n}",
            "hint": "Usa fmt.Errorf(\"fallo al debitar: %w\", ErrSaldoInsuficiente) y verifica con errors.Is(err, ErrSaldoInsuficiente).",
            "solution": "package main\n\nimport (\n    \"errors\"\n    \"fmt\"\n)\n\nvar ErrSaldoInsuficiente = errors.New(\"fondos insuficientes\")\n\nfunc Transferir(saldo, monto float64) error {\n    if monto > saldo {\n        return fmt.Errorf(\"operación cancelada para monto %.2f: %w\", monto, ErrSaldoInsuficiente)\n    }\n    return nil\n}\n\nfunc main() {\n    err := Transferir(50.0, 120.0)\n    if err != nil {\n        fmt.Println(\"Error reportado:\", err)\n        \n        if errors.Is(err, ErrSaldoInsuficiente) {\n            fmt.Println(\"-> Causa confirmada: El usuario no tiene saldo suficiente\")\n        } else {\n            fmt.Println(\"-> Error desconocido\")\n        }\n    }\n}",
            "explanation": "Al usar '%w', el error original 'ErrSaldoInsuficiente' queda encapsulado dentro del mensaje con contexto. La función 'errors.Is' desenrolla recursivamente la cadena de errores para confirmar la causa raíz de forma robusta e independiente de cómo se haya formateado el texto."
        },
        "externalLinks": [
            {"title": "The Go Blog: Working with Errors in Go 1.13", "url": "https://go.dev/blog/go1.13-errors", "description": "El artículo canónico sobre error wrapping, errors.Is y errors.As."},
            {"title": "Effective Go: Errors", "url": "https://go.dev/doc/effective_go#errors", "description": "Convenciones oficiales para el formateo y manejo de errores."},
            {"title": "Package errors (Standard Library)", "url": "https://pkg.go.dev/errors", "description": "Documentación oficial del paquete errors, Join, Is y As."}
        ]
    },

    "custom-errors": {
        "id": 27,
        "slug": "custom-errors",
        "title": "Custom Errors",
        "titleEs": "Errores Personalizados y Tipos de Error",
        "category": "Manejo de Errores y Excepciones",
        "categorySlug": "errores-panico",
        "categoryIcon": "🛡️",
        "difficulty": "Intermedio",
        "summary": "Creación de estructuras con metadatos de error ricos implementando el método Error() string y soporte para Unwrap.",
        "originalExpl": "Es posible usar tipos personalizados como errores implementando el método Error() en ellos. Esto permite asociar campos con información de depuración detallada (códigos de estado, marcas de tiempo, rutas de archivo) al error.",
        "basicExpl": {
            "title": "Conceptos Fundamentales para Principiantes",
            "content": "A veces un simple texto con `errors.New(\"error\")` no es suficiente. Necesitas saber QUÉ falló, EN QUÉ LÍNEA, CON QUÉ USUARIO y CON QUÉ CÓDIGO HTTP.\nPara crear un error personalizado en Go:\n1. Creas una estructura con todos los datos que quieras: `type MiError struct { Codigo int; Mensaje string }`.\n2. Le agregas un método `Error() string`.\n¡Listo! Ahora tu estructura ES un error oficial que puedes devolver y consultar.",
            "keyPoints": [
                "Cualquier estructura que tenga el método `Error() string` satisface la interfaz nativa `error`.",
                "Permite adjuntar campos útiles como códigos HTTP, marcas de tiempo o parámetros inválidos.",
                "Para recuperar los datos estructurados desde el llamador se utiliza `errors.As()`."
            ]
        },
        "interExpl": {
            "title": "Mecanismos Internos y Buenas Prácticas",
            "content": "Desempaquetado con `errors.As` e implementación de `Unwrap()`:\nSi tu error personalizado envuelve otro error interno, es una excelente práctica implementar también el método `Unwrap() error`:\n```go\nfunc (e *ErrorValidacion) Unwrap() error {\n    return e.ErrInterno\n}\n```\nEl consumidor puede extraer tu struct de error con seguridad usando `errors.As`:\n```go\nvar errVal *ErrorValidacion\nif errors.As(err, &errVal) {\n    fmt.Printf(\"Campo fallido: %s, Código: %d\\n\", errVal.Campo, errVal.Codigo)\n}\n```",
            "keyPoints": [
                "errors.As con puntero a puntero: `errors.As(err, &miStructPtr)` extrae la instancia tipada.",
                "Método Unwrap(): permite que errors.Is navegue a través de tu error personalizado.",
                "Convención de nombres: los tipos de error suelen nombrarse con el prefijo o sufijo Error (ej. `PathError`, `SyntaxError`)."
            ]
        },
        "expertExpl": {
            "title": "Bajo Nivel, Rendimiento e Internals",
            "content": "Trampa crítica del puntero nulo en interfaces de error (The Nil Error Trap):\nUn error muy peligroso ocurre cuando una función devuelve un puntero a un error personalizado que vale `nil` como tipo de retorno `error`:\n```go\nfunc validar() error {\n    var p *MiError = nil\n    return p // ¡PELIGRO!\n}\n```\nDado que el valor devuelto se almacena en una interfaz `iface`, la interfaz tiene un tipo (`*MiError`) aunque sus datos sean nil. Por lo tanto, `validar() != nil` será VERDADERO (true), haciendo creer al programa que hubo un error.\nRegla de oro: NUNCA almacenes un puntero tipado nulo en una variable `error`; retorna siempre el literal sin tipo `return nil` explícito.",
            "keyPoints": [
                "The Nil Interface Trap: Un puntero nulo de tipo concreto dentro de una variable 'error' NO es nil.",
                "Retorno seguro de nil: siempre retornar explícitamente el identificador `nil` cuando no haya error.",
                "Optimización de memoria: evitar inicializar structs pesados de error en caminos de ejecución normales (happy path)."
            ]
        },
        "evaluation": {
            "title": "Reto: Error de Validación HTTP con Extracción Segura",
            "statement": "Crea una estructura 'ErrorHTTP' con campos 'CodigoEstado' (int) y 'Recurso' (string) que implemente la interfaz 'error'. Escribe una función 'BuscarUsuario(id int) (*string, error)' que devuelva un ErrorHTTP{CodigoEstado: 404, Recurso: \"usuario\"} si id <= 0. En main, recupera el código de estado usando 'errors.As'.",
            "starterCode": "package main\n\nimport (\n    \"errors\"\n    \"fmt\"\n)\n\n// Define ErrorHTTP e implementa Error() string\n\n// Implementa BuscarUsuario\n\nfunc main() {\n    // Llama y extrae ErrorHTTP con errors.As\n}",
            "hint": "Define func (e *ErrorHTTP) Error() string y en main haz: var errHTTP *ErrorHTTP; if errors.As(err, &errHTTP) { ... }.",
            "solution": "package main\n\nimport (\n    \"errors\"\n    \"fmt\"\n)\n\ntype ErrorHTTP struct {\n    CodigoEstado int\n    Recurso      string\n}\n\nfunc (e *ErrorHTTP) Error() string {\n    return fmt.Sprintf(\"HTTP %d: recurso '%s' no encontrado o inaccesible\", e.CodigoEstado, e.Recurso)\n}\n\nfunc BuscarUsuario(id int) (*string, error) {\n    if id <= 0 {\n        return nil, &ErrorHTTP{CodigoEstado: 404, Recurso: \"usuarios\"}\n    }\n    nombre := \"Lucía\"\n    return &nombre, nil\n}\n\nfunc main() {\n    _, err := BuscarUsuario(-1)\n    if err != nil {\n        fmt.Println(\"Mensaje de error:\", err)\n        \n        var errHttp *ErrorHTTP\n        if errors.As(err, &errHttp) {\n            fmt.Printf(\"-> Código HTTP extraído: %d para el recurso '%s'\\n\", \n                errHttp.CodigoEstado, errHttp.Recurso)\n        }\n    }\n}",
            "explanation": "Al implementar el método Error() con receptor de puntero `(e *ErrorHTTP)`, la estructura satisface la interfaz error. La función errors.As permite al cliente desempaquetar la estructura concreta de forma segura y acceder a los campos CodigoEstado y Recurso."
        },
        "externalLinks": [
            {"title": "Go Tour: Errors", "url": "https://go.dev/tour/methods/19", "description": "Implementación de errores personalizados en el tour oficial."},
            {"title": "Dave Cheney: Don't just check errors, handle them gracefully", "url": "https://dave.cheney.net/2016/04/27/dont-just-check-errors-handle-them-gracefully", "description": "Artículo de referencia sobre diseño e inspección de errores en Go."},
            {"title": "Go Blog: Error handling and Go", "url": "https://go.dev/blog/error-handling-and-go", "description": "Patrones de diseño de errores de la biblioteca estándar."}
        ]
    },

    "goroutines": {
        "id": 28,
        "slug": "goroutines",
        "title": "Goroutines",
        "titleEs": "Goroutines (Hilos Ligeros de Concurrencia)",
        "category": "Concurrencia y Canales",
        "categorySlug": "concurrencia-canales",
        "categoryIcon": "🚀",
        "difficulty": "Intermedio",
        "summary": "Subprocesos ultra-ligeros administrados por el runtime de Go iniciados con la palabra clave 'go'.",
        "originalExpl": "Una goroutine es un hilo ligero de ejecución gestionado por el runtime de Go. Se inician anteponiendo la palabra clave 'go' a una llamada de función normal o anónima.",
        "basicExpl": {
            "title": "Conceptos Fundamentales para Principiantes",
            "content": "Imagina que eres un cocinero. Si preparas la sopa y te quedas 20 minutos mirando la olla sin hacer nada hasta que hierva, pierdes mucho tiempo. Lo lógico es poner la sopa al fuego y mientras tanto cortar las verduras.\nEso es una 'goroutine': una tarea que pones a correr en segundo plano mientras tu programa continúa haciendo otras cosas.\n- Solo tienes que anteponer la palabra `go` a cualquier función: `go prepararSopa()`.\n- El programa principal (main) también es una goroutine. ¡Ojo!: Si la función `main` termina, todas las goroutines secundarias mueren al instante.",
            "keyPoints": [
                "Se inician anteponiendo la palabra `go` a cualquier función: `go miFuncion()`.",
                "Son extremadamente baratas: puedes tener 100,000 goroutines corriendo simultáneamente en una laptop normal.",
                "Si la función `main()` termina, el programa entero finaliza inmediatamente sin esperar a las goroutines huérfanas."
            ]
        },
        "interExpl": {
            "title": "Mecanismos Internos y Buenas Prácticas",
            "content": "El Scheduler M:N de Go (Modelo GMP):\nA diferencia de los hilos de sistema operativo (hilos pesados del kernel con 1-8 MB de stack cada uno), las goroutines viven en el espacio de usuario (user-space):\n- **G (Goroutine)**: Representa la tarea ligera (stack inicial de solo 2 KB).\n- **M (Machine)**: Representa un hilo real del sistema operativo (OS thread).\n- **P (Processor)**: Representa un procesador lógico del runtime (determinado por `GOMAXPROCS`, por defecto el número de núcleos de CPU de tu máquina).\n\nEl scheduler asigna dinámicamente miles de Goroutines (G) sobre unos pocos hilos de sistema operativo (M) utilizando colas de trabajo locales y la técnica 'Work Stealing' (robo de trabajo entre procesadores P).",
            "keyPoints": [
                "Modelo GMP: G (Goroutine), M (OS Thread), P (Logical Context/Processor).",
                "Stack inicial diminuto: 2 KB que crece y decrece dinámicamente según la necesidad.",
                "Work Stealing: Si un hilo P se queda sin tareas en su cola local, le roba la mitad de las tareas a otro hilo para maximizar el uso de los núcleos de la CPU."
            ]
        },
        "expertExpl": {
            "title": "Bajo Nivel, Rendimiento e Internals",
            "content": "Conmutación de Contexto (Context Switch Cost) y Preempción Asíncrona:\nUn cambio de contexto entre dos hilos del sistema operativo cuesta ~1000 a 1500 nanosegundos (requiere guardar todos los registros de hardware y cambiar de espacio en el kernel). Un cambio de contexto entre dos Goroutines cuesta apenas ~10 a 20 nanosegundos porque solo intercambia 14 registros en user-space sin llamadas al kernel (syscalls).\n\nDesde Go 1.14, el scheduler incluye 'Non-cooperative Preemption': envía señales POSIX `SIGURG` (o excepciones en Windows) para interrumpir goroutines que ejecuten bucles matemáticos cerrados sin llamadas a funciones, garantizando equidad total de tiempo de CPU.",
            "keyPoints": [
                "Cero kernel context switch: conmutación de contexto en espacio de usuario ultrarrápida (~15 ns).",
                "Preempción con señales de sistema operativo (SIGURG): previene que goroutines CPU-bound bloqueen el planificador.",
                "Goroutine Leaks (Fugas de Goroutines): Una goroutine bloqueada indefinidamente leyendo de un canal que nadie escribe nunca será recolectada por el GC, consumiendo memoria permanentemente."
            ]
        },
        "evaluation": {
            "title": "Reto: Lanzar Múltiples Goroutines y Esperar con Canales",
            "statement": "Escribe un programa que lance tres goroutines concurrentes. Cada una debe imprimir su identificador y el resultado de calcular el cubo de un número (1^3, 2^3, 3^3). Utiliza un canal de sincronización para asegurar que main espere a que las tres goroutines terminen antes de salir.",
            "starterCode": "package main\n\nimport \"fmt\"\n\nfunc calcularCubo(id, n int, fin chan bool) {\n    // Calcula, imprime y avisa al canal\n}\n\nfunc main() {\n    // Lanza 3 goroutines y espera por las 3\n}",
            "hint": "Crea un canal 'fin := make(chan bool)' y lee de él 3 veces en main: '<-fin'.",
            "solution": "package main\n\nimport \"fmt\"\n\nfunc calcularCubo(id, n int, fin chan bool) {\n    cubo := n * n * n\n    fmt.Printf(\"[Goroutine %d]: El cubo de %d es %d\\n\", id, n, cubo)\n    fin <- true\n}\n\nfunc main() {\n    fin := make(chan bool)\n    \n    for i := 1; i <= 3; i++ {\n        go calcularCubo(i, i*2, fin)\n    }\n    \n    // Espera las 3 señales de finalización\n    for i := 1; i <= 3; i++ {\n        <-fin\n    }\n    fmt.Println(\"Todas las tareas concurrentes finalizaron exitosamente.\")\n}",
            "explanation": "Cada goroutine se ejecuta de manera asíncrona y paralela. Al finalizar su cálculo, envía una señal booleana al canal 'fin'. El bucle en main bloquea la salida leyendo exactamente 3 veces del canal, garantizando que el programa no termine prematuramente."
        },
        "externalLinks": [
            {"title": "Go Tour: Goroutines", "url": "https://go.dev/tour/concurrency/1", "description": "Práctica con goroutines en el tour interactivo."},
            {"title": "Effective Go: Goroutines", "url": "https://go.dev/doc/effective_go#goroutines", "description": "Filosofía del diseño concurrente de Go."},
            {"title": "Ardan Labs: Scheduling In Go", "url": "https://www.ardanlabs.com/blog/2018/08/scheduling-in-go-part1.html", "description": "Trilogía de artículos en profundidad sobre el funcionamiento del scheduler de Go."}
        ]
    },

    "channels": {
        "id": 29,
        "slug": "channels",
        "title": "Channels",
        "titleEs": "Canales (Channels) y Comunicación",
        "category": "Concurrencia y Canales",
        "categorySlug": "concurrencia-canales",
        "categoryIcon": "🚀",
        "difficulty": "Intermedio",
        "summary": "Conductos tipados para conectar goroutines concurrentes y permitir el paso de datos y sincronización sin bloqueos manuales.",
        "originalExpl": "Los canales son los conductos que conectan goroutines concurrentes. Puedes enviar valores a los canales desde una goroutine y recibir esos valores en otra goroutine con el operador '<-'.",
        "basicExpl": {
            "title": "Conceptos Fundamentales para Principiantes",
            "content": "El lema más famoso de Go dice: 'No te comuniques compartiendo memoria; comparte memoria comunicándote'.\nUn canal (channel) es como una tubería que conecta dos goroutines:\n- Creación: `mensajes := make(chan string)`.\n- Enviar datos por la tubería: `mensajes <- \"hola\"` (la flecha apunta hacia el canal).\n- Recibir datos de la tubería: `msg := <-mensajes` (la flecha sale del canal hacia la variable).\n- Por defecto, los canales son sincrónicos: el que envía espera hasta que alguien reciba, y el que recibe espera hasta que alguien envíe.",
            "keyPoints": [
                "Creación con make: `ch := make(chan Tipo)`.",
                "Operador flecha `<-`: hacia el canal para enviar (`ch <- v`), desde el canal para recibir (`v := <-ch`).",
                "Bloqueo automático: un canal sin búfer sincroniza a las dos goroutines en el punto de encuentro (rendezvous)."
            ]
        },
        "interExpl": {
            "title": "Mecanismos Internos y Buenas Prácticas",
            "content": "Semántica de Canales Unbuffered (Sin Búfer):\nUn canal sin búfer (`make(chan T)`) garantiza sincronización exacta (entrega garantizada). Ningún envío finaliza hasta que la goroutine receptora esté lista para tomar el dato. Si una goroutine intenta enviar y nadie está escuchando, la goroutine se suspende en el scheduler sin consumir ciclos de CPU.\n\nCuidado con el 'Deadlock': Si la goroutine principal se queda esperando recibir de un canal y no hay ninguna otra goroutine activa en el sistema para enviar datos, el runtime de Go detecta la situación y aborta el programa inmediatamente con `fatal error: all goroutines are asleep - deadlock!`.",
            "keyPoints": [
                "Rendezvous (Punto de encuentro): envío y recepción ocurren en el mismo instante temporal exacto.",
                "Detección de Deadlock: Go detecta en runtime si todas las goroutines quedaron bloqueadas en canales.",
                "Canales de señalización: se usa `chan struct{}` cuando no interesa el dato, solo la señalización."
            ]
        },
        "expertExpl": {
            "title": "Bajo Nivel, Rendimiento e Internals",
            "content": "Estructura interna `hchan` (archivo runtime/chan.go):\nUn canal en Go es un puntero a una estructura `hchan` en el heap protegida internamente por un mutex de bajo nivel (`lock`). Contiene:\n- `qcount`: cantidad de elementos actuales.\n- `dataqsiz`: capacidad del búfer.\n- `buf`: puntero al búfer circular de memoria contigua.\n- `sendq` y `recvq`: dos listas doblemente enlazadas de estructuras `sudog` (representan las goroutines actualmente suspendidas esperando enviar o recibir).\n\nOptimizaciones de copia directa: Si una goroutine receptora ya está esperando en `recvq` cuando una goroutine emisora envía un dato, el runtime de Go copia el valor DIRECTAMENTE del stack de la emisora al stack de la receptora sin pasar por el búfer ni llamar al planificador, logrando transferencias de bajísima latencia.",
            "keyPoints": [
                "Estructura hchan: búfer circular + colas sendq/recvq de goroutines suspendidas (sudog).",
                "Direct Stack-to-Stack Copy: el runtime copia datos de pila a pila evitando asignaciones intermedias.",
                "Canales nil: enviar o recibir en un canal `nil` bloquea para siempre deliberadamente (útil en sentencias `select`)."
            ]
        },
        "evaluation": {
            "title": "Reto: Pipeline Simple de Procesamiento con Canal",
            "statement": "Crea una función 'generarCuadrados(numeros []int, salida chan int)' que corra como goroutine, calcule el cuadrado de cada número y lo envíe al canal 'salida'. En la función main, recibe e imprime cada resultado a medida que llega.",
            "starterCode": "package main\n\nimport \"fmt\"\n\n// Implementa generarCuadrados\n\nfunc main() {\n    datos := []int{2, 4, 6, 8}\n    // Crea el canal, lanza la goroutine y lee los datos\n}",
            "hint": "Lanza la goroutine con 'go generarCuadrados(datos, ch)' y lee 'len(datos)' veces de 'ch' con un for.",
            "solution": "package main\n\nimport \"fmt\"\n\nfunc generarCuadrados(numeros []int, salida chan int) {\n    for _, n := range numeros {\n        salida <- n * n\n    }\n}\n\nfunc main() {\n    datos := []int{2, 4, 6, 8}\n    salida := make(chan int)\n    \n    go generarCuadrados(datos, salida)\n    \n    for i := 0; i < len(datos); i++ {\n        resultado := <-salida\n        fmt.Printf(\"Recibido cuadrado: %d\\n\", resultado)\n    }\n}",
            "explanation": "El canal 'salida' sincroniza el emisor y el receptor. Cada vez que la goroutine calcula un cuadrado, lo envía a 'salida' y se bloquea hasta que el bucle en main ejecuta '<-salida', procesando los datos en streaming de manera limpia y segura."
        },
        "externalLinks": [
            {"title": "Go Tour: Channels", "url": "https://go.dev/tour/concurrency/2", "description": "Ejercicios con canales y sincronización básica."},
            {"title": "Effective Go: Channels", "url": "https://go.dev/doc/effective_go#channels", "description": "Principios de comunicación y concurrencia con canales."},
            {"title": "Kavya Joshi: Understanding Channels", "url": "https://www.youtube.com/watch?v=KBZlN0nGxzU", "description": "Charla magistral de GopherCon sobre la estructura hchan y funcionamiento interno."}
        ]
    },

    "channel-buffering": {
        "id": 30,
        "slug": "channel-buffering",
        "title": "Channel Buffering",
        "titleEs": "Canales con Búfer (Buffered Channels)",
        "category": "Concurrencia y Canales",
        "categorySlug": "concurrencia-canales",
        "categoryIcon": "🚀",
        "difficulty": "Intermedio",
        "summary": "Canales con capacidad predefinida que aceptan un número limitado de valores sin un receptor concurrente inmediato.",
        "originalExpl": "Por defecto los canales no tienen búfer. Los canales con búfer aceptan un número limitado de valores sin un receptor correspondiente para esos valores. Se inicializan pasando la capacidad a make().",
        "basicExpl": {
            "title": "Conceptos Fundamentales para Principiantes",
            "content": "Un canal sin búfer es como pasarle un vaso de agua en la mano a otra persona: ambos tienen que estar ahí al mismo tiempo.\nUn 'canal con búfer' es como tener una bandeja con huecos (capacidad):\n- `ch := make(chan string, 2)` (tiene espacio para 2 mensajes).\n- Puedes enviar 2 mensajes seguidos SIN que nadie los reciba de inmediato: los mensajes quedan esperando en la bandeja.\n- Solo cuando intentas poner un tercer mensaje en una bandeja de 2 huecos, la goroutine se bloquea hasta que alguien retire un elemento.",
            "keyPoints": [
                "Se define la capacidad en make: `make(chan Tipo, capacidad)`.",
                "Los envíos son asíncronos MIENTRAS el búfer no esté lleno.",
                "Las recepciones se bloquean solo si el búfer está completamente vacío."
            ]
        },
        "interExpl": {
            "title": "Mecanismos Internos y Buenas Prácticas",
            "content": "Desacoplamiento de velocidad (Producer-Consumer):\nLos canales con búfer permiten absorber picos repentinos de trabajo (bursts) donde el productor genera tareas más rápido de lo que el consumidor puede procesarlas a corto plazo.\n\nDimensionamiento del búfer:\nUn error común de diseño es usar búferes gigantescos para 'evitar deadlocks'. Si el consumidor es consistentemente más lento que el productor, un búfer grande solo retrasa lo inevitable y consume gigabytes de memoria RAM. Usa búferes pequeños y justificados.",
            "keyPoints": [
                "Absorción de ráfagas: amortigua desfases temporales entre productores y consumidores.",
                "Trampa de los búferes infinitos: los búferes deben dimensionarse con moderación para no ocultar cuellos de botella.",
                "Consultar estado: `len(ch)` indica cuántos elementos hay en el búfer; `cap(ch)` indica la capacidad total."
            ]
        },
        "expertExpl": {
            "title": "Bajo Nivel, Rendimiento e Internals",
            "content": "Internamente, `hchan.buf` es un arreglo contiguo en memoria gestionado como una cola circular (ring buffer) con dos punteros de índice: `sendx` (índice donde se escribirá el próximo envío) y `recvx` (índice de donde se leerá la próxima recepción).\n\nCuando `qcount < dataqsiz`, un envío consiste simplemente en copiar los bytes del valor al slot del array `buf[sendx]`, incrementar `sendx` módulo la capacidad y retornar inmediatamente sin invocar al scheduler de goroutines, logrando un rendimiento casi idéntico al de escribir en un array protegido por spinlock.",
            "keyPoints": [
                "Ring Buffer contiguo: optimización de caché sin fragmentación de memoria.",
                "Zero scheduler overhead en estado no lleno: el emisor no sufre cambio de contexto si hay espacio en el búfer.",
                "Uso canónico de capacidad 1: `make(chan struct{}, 1)` como candado binario (semáforo) de alta velocidad."
            ]
        },
        "evaluation": {
            "title": "Reto: Cola de Solicitudes HTTP con Búfer Limitado",
            "statement": "Crea un canal con búfer de capacidad 3 para simular una cola de peticiones web. Envía 3 tareas de texto sin bloquearte. Luego lee e imprime cuántos elementos quedan en el canal con len() y cap() antes y después de extraer una tarea.",
            "starterCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    // Crea el canal con búfer de 3\n    // Envía 3 elementos sin goroutine separada\n    // Inspecciona len y cap, extrae un elemento y vuelve a inspeccionar\n}",
            "hint": "Usa make(chan string, 3) y las funciones len(ch) y cap(ch).",
            "solution": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    cola := make(chan string, 3)\n    \n    cola <- \"GET /usuarios\"\n    cola <- \"POST /login\"\n    cola <- \"GET /productos\"\n    \n    fmt.Printf(\"Estado inicial: %d de %d tareas en búfer\\n\", len(cola), cap(cola))\n    \n    procesada := <-cola\n    fmt.Printf(\"Procesando: %s\\n\", procesada)\n    \n    fmt.Printf(\"Estado tras retiro: %d de %d tareas en búfer\\n\", len(cola), cap(cola))\n}",
            "explanation": "Debido a que el canal tiene capacidad 3, los tres envíos consecutivos ocurren dentro de la misma goroutine principal sin provocar deadlock. Las funciones integradas len() y cap() devuelven exactamente la ocupación actual y el tamaño total del ring buffer interno."
        },
        "externalLinks": [
            {"title": "Go Tour: Buffered Channels", "url": "https://go.dev/tour/concurrency/3", "description": "Práctica con canales con capacidad en el tour interactivo."},
            {"title": "Effective Go: Buffered channels", "url": "https://go.dev/doc/effective_go#buffered_channels", "description": "Uso de canales con búfer como semáforos de concurrencia."},
            {"title": "Go Spec: Channel types", "url": "https://go.dev/ref/spec#Channel_types", "description": "Especificación del estándar sobre capacidad y almacenamiento en canales."}
        ]
    },

    "channel-synchronization": {
        "id": 31,
        "slug": "channel-synchronization",
        "title": "Channel Synchronization",
        "titleEs": "Sincronización con Canales",
        "category": "Concurrencia y Canales",
        "categorySlug": "concurrencia-canales",
        "categoryIcon": "🚀",
        "difficulty": "Intermedio",
        "summary": "Uso de operaciones de recepción bloqueantes para coordinar la ejecución entre múltiples goroutines.",
        "originalExpl": "Podemos usar canales para sincronizar la ejecución a través de goroutines. Aquí hay un ejemplo del uso de una recepción bloqueante para esperar a que una goroutine termine.",
        "basicExpl": {
            "title": "Conceptos Fundamentales para Principiantes",
            "content": "Cuando lanzas una goroutine (`go tarea()`), el programa principal continúa a toda velocidad sin esperar. Si la función principal termina, todo se apaga antes de que la tarea termine.\n¿Cómo le decimos a la función principal que espere pacientemente hasta que la tarea secundaria termine?\n- Le pasamos un canal a la tarea: `hecho := make(chan bool)`.\n- La tarea trabaja y, al finalizar, envía una señal: `hecho <- true`.\n- La función principal se queda esperando la señal con `<-hecho`.",
            "keyPoints": [
                "Un canal puede usarse exclusivamente como señal de aviso, no para enviar datos complejos.",
                "`<-canal` pausa la ejecución hasta que la señal llegue.",
                "Es el mecanismo nativo más simple para coordinar el inicio o fin de dos tareas."
            ]
        },
        "interExpl": {
            "title": "Mecanismos Internos y Buenas Prácticas",
            "content": "El tipo `chan struct{}` para señales puras:\nCuando un canal se utiliza únicamente para sincronizar y no para transmitir información, es una convención idiomática utilizar una estructura vacía:\n```go\nhecho := make(chan struct{})\n// Enviar señal\nhecho <- struct{}{}\n```\nEsto comunica claramente la intención de diseño: 'este canal solo transmite sincronización, no datos'. Además, `struct{}` ocupa 0 bytes de memoria física.\n\nPara sincronizar MÚLTIPLES goroutines a la vez, suele ser preferible `sync.WaitGroup`, pero para coordinar pares de goroutines o enviar señales de inicio simultáneo, los canales son la herramienta ideal.",
            "keyPoints": [
                "Zero-allocation signals: `chan struct{}` no asigna ningún byte para el valor transmitido.",
                "Señal de inicio simultáneo: cerrar un canal (`close(inicio)`) desbloquea simultáneamente a miles de goroutines que estaban esperando `<-inicio`.",
                "Canal vs WaitGroup: canales son ideales para 1 a 1 o señales de cancelación; WaitGroups son ideales para 1 a N."
            ]
        },
        "expertExpl": {
            "title": "Bajo Nivel, Rendimiento e Internals",
            "content": "Relación 'Happens-Before' en el Memory Model de Go:\nEl modelo de memoria formal de Go especifica con precisión matemática las garantías de visibilidad entre hilos:\n'Un envío en un canal ocurre antes (happens-before) de que la recepción correspondiente desde ese mismo canal se complete'.\n\nEsto garantiza que cualquier mutación de memoria o variable (por ejemplo, llenar un struct o escribir en un archivo) realizada por la goroutine emisora ANTES de hacer `hecho <- true` será 100% visible y segura de leer para la goroutine receptora DESPUÉS de `<-hecho`, sin necesidad de utilizar locks, mutexes ni operaciones atómicas de hardware adicionales.",
            "keyPoints": [
                "Garantía Happens-Before: sincronización de visibilidad de caché de CPU garantizada por la especificación de Go.",
                "Memory Barrier de hardware: la operación de canal emite una barrera de sincronización en los núcleos de la CPU.",
                "Eliminación de Data Races: compartir variables mutadas mediante señales en canales previene carreras de datos."
            ]
        },
        "evaluation": {
            "title": "Reto: Disparo Simultáneo de Workers (Start Gun)",
            "statement": "Escribe un programa donde tres goroutines trabajadoras esperen una señal de 'disparo de salida' emitida desde main a través de un canal 'chan struct{}'. Al cerrar el canal en main, las tres goroutines deben iniciar su trabajo concurrentemente e imprimir su inicio.",
            "starterCode": "package main\n\nimport (\n    \"fmt\"\n    \"time\"\n)\n\nfunc worker(id int, inicio chan struct{}, fin chan bool) {\n    // Espera la señal de inicio\n    // Imprime que arrancó y avisa a fin\n}\n\nfunc main() {\n    // Lanza 3 workers y emite la señal de inicio cerrando el canal\n}",
            "hint": "Para esperar el inicio haz: <-inicio. Para disparar a todos simultáneamente en main haz: close(inicio).",
            "solution": "package main\n\nimport (\n    \"fmt\"\n    \"time\"\n)\n\nfunc worker(id int, inicio chan struct{}, fin chan bool) {\n    <-inicio // Se bloquea esperando el cierre del canal\n    fmt.Printf(\"[Worker %d]: ¡Arrancó a toda velocidad!\\n\", id)\n    time.Sleep(50 * time.Millisecond)\n    fin <- true\n}\n\nfunc main() {\n    inicio := make(chan struct{})\n    fin := make(chan bool)\n    \n    for i := 1; i <= 3; i++ {\n        go worker(i, inicio, fin)\n    }\n    \n    fmt.Println(\"Preparados... Listos...\")\n    time.Sleep(100 * time.Millisecond)\n    fmt.Println(\"¡YA!\")\n    close(inicio) // Desbloquea a todos los workers simultáneamente\n    \n    for i := 1; i <= 3; i++ {\n        <-fin\n    }\n    fmt.Println(\"Todos los workers cruzaron la meta.\")\n}",
            "explanation": "Cerrar un canal (`close(inicio)`) hace que todas las recepciones pendientes sobre él (`<-inicio`) se desbloqueen instantáneamente devolviendo el valor cero. Este es el patrón canónico 'Start Gun' para arrancar múltiples goroutines exactamente al mismo tiempo."
        },
        "externalLinks": [
            {"title": "The Go Memory Model: Channel communication", "url": "https://go.dev/ref/mem#chan", "description": "Especificación oficial de las garantías happens-before en canales."},
            {"title": "Go by Example: Channel Synchronization", "url": "https://gobyexample.com/channel-synchronization", "description": "Ejemplo original en Go by Example."},
            {"title": "Effective Go: Synchronization", "url": "https://go.dev/doc/effective_go#concurrency", "description": "Principios de diseño sobre coordinación de procesos ligeros."}
        ]
    },

    "channel-directions": {
        "id": 32,
        "slug": "channel-directions",
        "title": "Channel Directions",
        "titleEs": "Direcciones de Canales en Parámetros",
        "category": "Concurrencia y Canales",
        "categorySlug": "concurrencia-canales",
        "categoryIcon": "🚀",
        "difficulty": "Intermedio",
        "summary": "Restricción de canales a solo-envío (chan<-) o solo-recepción (<-chan) para aumentar la seguridad de tipos en funciones.",
        "originalExpl": "Al usar canales como parámetros de funciones, puedes especificar si un canal está destinado únicamente a enviar o recibir valores. Esta especificidad aumenta la seguridad de tipos del programa.",
        "basicExpl": {
            "title": "Conceptos Fundamentales para Principiantes",
            "content": "Por defecto, un canal es bidireccional (puedes enviar y recibir de él). Pero cuando se lo pasas a una función, es muy buena idea ponerle límites claros:\n- Solo para enviar: `pings chan<- string` (la flecha apunta HACIA el canal; solo puedes meter datos; si intentas leer, el compilador da error).\n- Solo para recibir: `pings <-chan string` (la flecha SALE del canal; solo puedes sacar datos; si intentas meter, el compilador da error).\n\nAnalogía: Es como una calle de sentido único. Evita que un conductor distraído circule en dirección contraria y cause un choque.",
            "keyPoints": [
                "`chan<- T`: canal de solo-envío (write-only).",
                "`<-chan T`: canal de solo-recepción (read-only).",
                "Un canal bidireccional se convierte automáticamente en unidireccional al pasarlo a una función con dicha firma.",
                "El compilador comprueba las direcciones en tiempo de compilación."
            ]
        },
        "interExpl": {
            "title": "Mecanismos Internos y Buenas Prácticas",
            "content": "Patrón Pipeline y Principio de Mínimo Privilegio:\nRestringir direcciones de canales es indispensable al diseñar pipelines concurrentes (ej. Generador -> Procesador -> Consumidor):\n```go\nfunc Generar() <-chan int { ... } // Solo lectura para el consumidor\nfunc Procesar(in <-chan int, out chan<- int) { ... }\n```\nSi la función 'Procesar' intentara cerrar por error el canal de entrada 'in', el compilador lo impediría (`close()` solo se puede llamar en canales que permitan envío: `chan` o `chan<-`).",
            "keyPoints": [
                "Principio de menor privilegio: una función solo debe tener los permisos que necesita.",
                "Regla de cierre (close): solo el canal emisor (`chan<-`) tiene permitido cerrar el canal.",
                "Retorno de generadores: funciones que devuelven `<-chan T` crean APIs limpias de flujo de datos."
            ]
        },
        "expertExpl": {
            "title": "Bajo Nivel, Rendimiento e Internals",
            "content": "La direccionalidad de un canal es una propiedad estrictamente estática verificada durante la fase de tipado del compilador (type checking). En tiempo de ejecución, el puntero a la estructura `hchan` en la memoria es exactamente el mismo; no existe ningún envoltorio ni sobrecoste de memoria o rendimiento.\n\nAdemás, un canal de solo lectura `<-chan T` o de solo escritura `chan<- T` no puede convertirse de vuelta a un canal bidireccional `chan T` (la conversión inversa está prohibida por el sistema de tipos de Go), garantizando que las restricciones de seguridad no puedan ser violadas mediante casting accidental.",
            "keyPoints": [
                "Zero runtime overhead: comprobación 100% estática en el type checker de Go.",
                "Conversión unidireccional irrevocable: un canal restringido no puede volver a convertirse en bidireccional.",
                "Seguridad en librerías públicas: protege tus APIs internas impidiendo que clientes externos cierren o escriban en tus canales de salida."
            ]
        },
        "evaluation": {
            "title": "Reto: Pipeline Seguro con Tres Etapas Tipadas",
            "statement": "Crea una función 'producir(out chan<- int)' que envíe los números 1, 2 y 3 y cierre el canal; una función 'duplicar(in <-chan int, out chan<- int)' que reciba cada número, lo multiplique por 2 y cierre 'out'; y un consumidor en main que lea e imprima los resultados.",
            "starterCode": "package main\n\nimport \"fmt\"\n\n// Implementa producir y duplicar con canales unidireccionales\n\nfunc main() {\n    // Conecta el pipeline\n}",
            "hint": "Usa for v := range in para leer hasta que el canal se cierre, luego haz close(out).",
            "solution": "package main\n\nimport \"fmt\"\n\nfunc producir(out chan<- int) {\n    for i := 1; i <= 3; i++ {\n        out <- i\n    }\n    close(out)\n}\n\nfunc duplicar(in <-chan int, out chan<- int) {\n    for v := range in {\n        out <- v * 2\n    }\n    close(out)\n}\n\nfunc main() {\n    ch1 := make(chan int)\n    ch2 := make(chan int)\n    \n    go producir(ch1)\n    go duplicar(ch1, ch2)\n    \n    for res := range ch2 {\n        fmt.Println(\"Resultado final:\", res)\n    }\n}",
            "explanation": "Las firmas `chan<- int` e `<-chan int` garantizan que 'producir' solo pueda escribir y 'duplicar' solo pueda leer de 'in' y escribir en 'out'. El compilador protege el pipeline contra escrituras indebidas o cierres accidentales."
        },
        "externalLinks": [
            {"title": "Go Spec: Channel types and directions", "url": "https://go.dev/ref/spec#Channel_types", "description": "Especificación formal de la sintaxis y reglas de canales direccionales."},
            {"title": "The Go Blog: Go Concurrency Patterns: Pipelines", "url": "https://go.dev/blog/pipelines", "description": "Guía canónica de diseño de pipelines concurrentes con canales direccionados."},
            {"title": "Effective Go: Channels of channels", "url": "https://go.dev/doc/effective_go#chan_of_chan", "description": "Patrones avanzados con canales en Effective Go."}
        ]
    },

    "select": {
        "id": 33,
        "slug": "select",
        "title": "Select",
        "titleEs": "Multiplexación con Select",
        "category": "Concurrencia y Canales",
        "categorySlug": "concurrencia-canales",
        "categoryIcon": "🚀",
        "difficulty": "Avanzado",
        "summary": "Estructura de control para esperar simultáneamente múltiples operaciones de comunicación en canales.",
        "originalExpl": "La sentencia 'select' de Go te permite esperar en múltiples operaciones de canal. Combinar goroutines y canales con select es una de las características más poderosas de Go.",
        "basicExpl": {
            "title": "Conceptos Fundamentales para Principiantes",
            "content": "Si te quedas esperando en un canal (`msg := <-ch1`), tu programa se congela hasta que llegue ese mensaje, ignorando si otro canal (`ch2`) ya tenía datos listos.\nLa sentencia `select` resuelve esto: te permite escuchar MUCHOS canales al mismo tiempo:\n- Funciona de forma similar a un 'switch', pero cada 'case' es una operación de canal.\n- El primer canal que tenga un dato listo se ejecuta.\n- Si varios canales están listos al mismo tiempo, Go elige uno al AZAR de forma justa.",
            "keyPoints": [
                "Espera en múltiples canales a la vez sin bloquearse en uno solo.",
                "Ejecuta el primer caso que esté disponible para enviar o recibir.",
                "Si varios casos están listos simultáneamente, la elección es pseudoaleatoria uniforme."
            ]
        },
        "interExpl": {
            "title": "Mecanismos Internos y Buenas Prácticas",
            "content": "La cláusula `default` y operaciones no bloqueantes:\nSi agregas una rama `default` a un select, la instrucción NUNCA se bloquea: si ningún canal tiene datos listos en ese microsegundo exacto, salta inmediatamente al default:\n```go\nselect {\ncase msg := <-ch:\n    fmt.Println(\"Recibido:\", msg)\ndefault:\n    fmt.Println(\"Ningún canal tenía datos listos, continúo sin esperar\")\n}\n```\nTambién se utiliza para patrones de timeout combinándolo con `time.After(duracion)`.",
            "keyPoints": [
                "Cláusula default: convierte cualquier operación de canal en no bloqueante.",
                "Selección justa (Fairness): la selección aleatoria evita que un canal rápido mate de inanición (starvation) a otros canales.",
                "Desactivación dinámica de casos: asignar un canal a `nil` dentro de un bucle select desactiva permanentemente ese caso en las siguientes iteraciones."
            ]
        },
        "expertExpl": {
            "title": "Bajo Nivel, Rendimiento e Internals",
            "content": "Algoritmo de compilación de `select` (runtime/select.go):\nEn tiempo de ejecución, una sentencia select con múltiples canales realiza los siguientes pasos:\n1. Determina un orden de bloqueo aleatorio (usando un generador de números pseudoaleatorios rápido) para evitar que dos goroutines con los mismos canales en distinto orden provoquen un interbloqueo (deadlock) de mutexes internos.\n2. Adquiere los candados (`lock`) de todos los canales involucrados en orden creciente de sus direcciones de memoria (para garantizar un orden global estricto y evitar deadlocks a nivel de CPU).\n3. Revisa si alguno de los canales está listo inmediatamente. Si lo está, realiza la operación, libera los candados y retorna.\n4. Si ninguno está listo y no hay default, registra la goroutine actual en la cola de espera de TODOS los canales simultáneamente y suspende la goroutine.",
            "keyPoints": [
                "Lock ordering por dirección de memoria: previene deadlocks internos en el runtime al adquirir locks de múltiples canales.",
                "Polled select: un select con default y canales vacíos se compila a comprobaciones directas sin pasar por el planificador.",
                "Empty select: la instrucción `select {}` sin ningún caso bloquea la goroutine para siempre sin consumir nada de CPU."
            ]
        },
        "evaluation": {
            "title": "Reto: Multiplexor de Dos Sensores con Selección Rápida",
            "statement": "Simula dos sensores: 'SensorTemperatura' (emite tras 100ms) y 'SensorPresion' (emite tras 50ms). Usa un bucle 'for' y 'select' para recibir las primeras 2 lecturas que lleguen de cualquiera de los dos sensores.",
            "starterCode": "package main\n\nimport (\n    \"fmt\"\n    \"time\"\n)\n\nfunc main() {\n    temp := make(chan string)\n    presion := make(chan string)\n    \n    // Lanza las dos goroutines simulando lecturas\n    // Usa select para recibir exactamente 2 lecturas\n}",
            "hint": "Usa un bucle for i := 0; i < 2; i++ { select { case t := <-temp: ... case p := <-presion: ... } }.",
            "solution": "package main\n\nimport (\n    \"fmt\"\n    \"time\"\n)\n\nfunc main() {\n    temp := make(chan string)\n    presion := make(chan string)\n    \n    go func() {\n        time.Sleep(100 * time.Millisecond)\n        temp <- \"Temperatura: 24.5 °C\"\n    }()\n    \n    go func() {\n        time.Sleep(50 * time.Millisecond)\n        presion <- \"Presión: 1013 hPa\"\n    }()\n    \n    for i := 0; i < 2; i++ {\n        select {\n        case msgTemp := <-temp:\n            fmt.Println(\"[Lectura recibida]:\", msgTemp)\n        case msgPresion := <-presion:\n            fmt.Println(\"[Lectura recibida]:\", msgPresion)\n        }\n    }\n}",
            "explanation": "La sentencia select evalúa ambos canales a la vez. Como la goroutine de presión tarda solo 50ms frente a los 100ms de la de temperatura, el caso de presión se activará primero sin quedar atrapado esperando al de temperatura."
        },
        "externalLinks": [
            {"title": "Go Tour: Select", "url": "https://go.dev/tour/concurrency/5", "description": "Práctica con la sentencia select en el tour oficial."},
            {"title": "Go Spec: Select statements", "url": "https://go.dev/ref/spec#Select_statements", "description": "Especificación de las reglas de ejecución y evaluación de select."},
            {"title": "The Go Blog: Go Concurrency Patterns: Timing out, moving on", "url": "https://go.dev/blog/concurrency-timeouts", "description": "Técnicas avanzadas de timeouts y cancelación con select."}
        ]
    }
}
