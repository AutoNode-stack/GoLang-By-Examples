// Base de Datos Completa de Go by Example en Español con Niveles y Evaluaciones
// Contiene los 85 temas oficiales con explicaciones Básica, Intermedia y Experta

const GO_CATEGORIES = [
  {
    "id": "fundamentos",
    "name": "Fundamentos del Lenguaje",
    "icon": "zap",
    "count": 7,
    "description": "Sintaxis básica, tipos primitivos, variables, constantes y control de flujo"
  },
  {
    "id": "estructuras-datos",
    "name": "Estructuras de Datos y Colecciones",
    "icon": "package",
    "count": 4,
    "description": "Arrays fijos, slices dinámicos, tablas hash (maps) e iteración range"
  },
  {
    "id": "funciones-memoria",
    "name": "Funciones, Clausuras y Punteros",
    "icon": "tool",
    "count": 7,
    "description": "Parámetros, retornos múltiples, variádicas, closures, recursión, memoria y runas"
  },
  {
    "id": "poo-generics",
    "name": "Tipos Avanzados y POO en Go",
    "icon": "cpu",
    "count": 7,
    "description": "Structs, métodos, interfaces implícitas, enums, composición, genéricos e iteradores"
  },
  {
    "id": "errores-panico",
    "name": "Manejo de Errores y Excepciones",
    "icon": "shield",
    "count": 5,
    "description": "Errores como valores, errores personalizados, panic, defer y recover"
  },
  {
    "id": "concurrencia-canales",
    "name": "Concurrencia: Goroutines y Canales",
    "icon": "rocket",
    "count": 10,
    "description": "Hilos ligeros, canales unbuffered y buffered, direcciones, select y timeouts"
  },
  {
    "id": "sincronizacion-avanzada",
    "name": "Sincronización y Concurrencia Avanzada",
    "icon": "settings",
    "count": 8,
    "description": "Timers, tickers, worker pools, waitgroups, rate limiting, atomics y mutexes"
  },
  {
    "id": "texto-formatos",
    "name": "Manipulación de Texto y Formatos",
    "icon": "file-code",
    "count": 8,
    "description": "Ordenamiento, strings, printf, plantillas de texto, regex, JSON y XML"
  },
  {
    "id": "tiempo-cripto",
    "name": "Tiempo, Matemáticas y Criptografía",
    "icon": "clock",
    "count": 8,
    "description": "Time, epoch, parseo de fechas, rand, strconv, URLs, SHA-256 y Base64"
  },
  {
    "id": "archivos-io",
    "name": "Entrada / Salida y Archivos",
    "icon": "folder",
    "count": 7,
    "description": "Lectura, escritura, filtros de línea, rutas, directorios, temporales y embed"
  },
  {
    "id": "cli-testing",
    "name": "CLI, Pruebas y Benchmarking",
    "icon": "target",
    "count": 6,
    "description": "Testing, benchmarks, argumentos, banderas flags, subcomandos, env vars y slog"
  },
  {
    "id": "redes-sistema",
    "name": "Redes, Procesos y Sistema Operativo",
    "icon": "globe",
    "count": 8,
    "description": "Cliente/servidor HTTP, sockets TCP, Context, subprocesos, señales y exit"
  }
];

const GO_TOPICS = [
  {
    "id": 1,
    "slug": "hello-world",
    "title": "Hello World",
    "titleEs": "Hola Mundo",
    "category": "Fundamentos del Lenguaje",
    "categorySlug": "fundamentos",
    "categoryIcon": "zap",
    "difficulty": "Principiante",
    "summary": "El primer programa canónico en Go que inicializa un paquete ejecutable e imprime un mensaje en la salida estándar.",
    "originalExpl": "Nuestro primer programa imprimirá el clásico mensaje 'hello world'. Para ejecutarlo, guardamos el código en hello-world.go y usamos 'go run'. También podemos compilar un binario ejecutable directamente con 'go build'.",
    "basicExpl": {
      "title": "Conceptos Fundamentales para Principiantes",
      "content": "En Go, todo archivo de código fuente comienza declarando a qué paquete pertenece. El paquete especial 'main' le dice al compilador de Go que este archivo es un programa ejecutable independiente (no una biblioteca reutilizable). La función 'main()' es el punto de entrada exacto donde el sistema operativo inicia la ejecución.\n\nAnalogía: Piensa en 'package main' como la puerta principal de un edificio; sin ella, nadie sabe por dónde entrar. 'import \"fmt\"' es como pedir prestada una herramienta de la caja de herramientas oficial de Go para poder escribir texto en la pantalla mediante la función 'fmt.Println'.",
      "keyPoints": [
        "package main indica que es un programa ejecutable, no una librería.",
        "import \"fmt\" importa el paquete de formato y entrada/salida estándar.",
        "func main() es el punto de inicio de la aplicación y no recibe argumentos ni retorna valores directamente.",
        "En Go no se usan puntos y comas al final de cada línea; el lexer los inserta automáticamente."
      ]
    },
    "interExpl": {
      "title": "Mecanismos Internos y Buenas Prácticas",
      "content": "A diferencia de lenguajes interpretados como Python o basados en máquinas virtuales como Java (JVM), Go compila directamente a código máquina nativo específico para la arquitectura y sistema operativo de destino (por ejemplo, ELF en Linux, Mach-O en macOS o PE en Windows). El comando 'go run' compila el código en un directorio temporal y lo ejecuta de inmediato, mientras que 'go build' genera un binario estático autocontenido que incluye el runtime de Go (recolector de basura, scheduler de goroutines).\n\nConvención idiomática: Go exige que todas las importaciones declaradas sean utilizadas. Si importas 'fmt' y no lo usas, el compilador generará un error estricto impidiendo la compilación.",
      "keyPoints": [
        "Binario estático: Go incluye su propio runtime embebido dentro del ejecutable final.",
        "Compilación cruzada sencilla con variables de entorno: GOOS=linux GOARCH=arm64 go build.",
        "Ausencia de dependencias dinámicas por defecto (sin necesidad de libc externa a menos que se use cgo)."
      ]
    },
    "expertExpl": {
      "title": "Bajo Nivel, Rendimiento e Internals",
      "content": "Durante la compilación de 'hello-world.go', el compilador de Go (cmd/compile) realiza análisis sintáctico, tipado estático, generación de representación intermedia SSA (Static Single Assignment) y finalmente genera código ensamblador del plan 9 adaptado a la arquitectura.\n\nAl invocar 'fmt.Println', los argumentos se empaquetan en una interfaz vacía 'any' (o interface{}), lo que puede ocasionar que el string literal escape al heap en análisis de escape (`go build -gcflags=\"-m\"`). El runtime de Go inicializa la Goroutine principal (G0), configura la tabla de gestión de memoria (mspan, mcache), inicializa el scheduler (P, M, G) y finalmente invoca la función main.main en el hilo M principal.",
      "keyPoints": [
        "Inicialización del Runtime: runtime.main arranca el GC, la sysmon goroutine y prepara los subprocesos OS.",
        "Escape Analysis: Los literales pasados a funciones variádicas de interfaz como fmt.Println pueden escapar al heap debido a la conversión a interface{}.",
        "Tamaño de binario: Un binario 'hello world' suele medir ~1.8MB debido al runtime embebido y metadatos de reflexión."
      ]
    },
    "evaluation": {
      "title": "Reto: Mensaje Personalizado con Información del Sistema",
      "statement": "Crea un programa en Go que imprima tu nombre, tu lenguaje favorito y la versión del runtime de Go que está ejecutando el programa usando el paquete estándar 'runtime'.",
      "starterCode": "package main\n\nimport (\n    \"fmt\"\n    // Pista: necesitarás otro paquete aquí\n)\n\nfunc main() {\n    // Tu código aquí\n}",
      "hint": "Importa el paquete 'runtime' y utiliza la función 'runtime.Version()'.",
      "solution": "package main\n\nimport (\n    \"fmt\"\n    \"runtime\"\n)\n\nfunc main() {\n    nombre := \"Alex\"\n    lenguaje := \"Go (Golang)\"\n    version := runtime.Version()\n    \n    fmt.Printf(\"Desarrollador: %s\\nLenguaje: %s\\nVersión de Go: %s\\n\", nombre, lenguaje, version)\n}",
      "explanation": "El paquete 'runtime' de Go proporciona operaciones para interactuar con el entorno de ejecución, como runtime.Version() que devuelve la cadena de versión compilada de Go (ej. 'go1.22.0'). Usar fmt.Printf permite dar formato con verbos %s de forma limpia y legible."
    },
    "externalLinks": [
      {
        "title": "Documentación oficial: Tutorial de inicio rápido",
        "url": "https://go.dev/doc/tutorial/getting-started",
        "description": "Guía introductoria paso a paso en el sitio oficial de Go."
      },
      {
        "title": "Área de pruebas oficial de Go (The Go Playground)",
        "url": "https://go.dev/play/",
        "description": "Entorno oficial en la nube para probar código Go sin instalar nada."
      },
      {
        "title": "Especificación de Go: Ejecución de programas",
        "url": "https://go.dev/ref/spec#Program_execution",
        "description": "Detalles formales de cómo se inicializa e inicia un programa en Go."
      },
      {
        "title": "Go by Example Original: Hello World",
        "url": "https://gobyexample.com/hello-world",
        "description": "Página oficial del ejemplo en Go by Example.",
        "type": "Referencia Original"
      }
    ],
    "code": "// Nuestro primer programa imprimirá el clásico mensaje \"hello world\".\n// Aquí está el código fuente completo.\npackage main\n\nimport \"fmt\"\n\nfunc main() {\n\tfmt.Println(\"hello world\")\n}\n",
    "output": "# Para ejecutar el programa, guarda el código en `hello-world.go` y\n# usa `go run`.\n$ go run hello-world.go\nhello world\n\n# En ocasiones querremos compilar nuestros programas en binarios\n# ejecutables. Podemos hacerlo usando `go build`.\n$ go build hello-world.go\n$ ls\nhello-world\thello-world.go\n\n# Luego podemos ejecutar el binario compilado directamente.\n$ ./hello-world\nhello world\n\n# Ahora que sabemos ejecutar y compilar programas básicos en Go,\n# aprendamos más sobre el lenguaje.\n",
    "officialUrl": "https://gobyexample.com/hello-world"
  },
  {
    "id": 2,
    "slug": "values",
    "title": "Values",
    "titleEs": "Valores y Tipos Primitivos",
    "category": "Fundamentos del Lenguaje",
    "categorySlug": "fundamentos",
    "categoryIcon": "zap",
    "difficulty": "Principiante",
    "summary": "Exploración de los tipos de valores elementales en Go: cadenas, enteros, flotantes y booleanos, junto con sus operadores básicos.",
    "originalExpl": "Go tiene varios tipos de valores, incluyendo cadenas de texto, enteros, números de punto flotante, booleanos y operadores aritméticos y lógicos asociados.",
    "basicExpl": {
      "title": "Conceptos Fundamentales para Principiantes",
      "content": "Los valores son los bloques de construcción de cualquier programa. En Go existen tipos básicos muy claros:\n1. Cadenas de texto (strings): texto entre comillas dobles (\"hola\"). Se pueden concatenar usando el signo más (+).\n2. Números enteros (integers): números sin decimales (1, 42, -5).\n3. Flotantes (floats): números con punto decimal (7.0, 3.14159).\n4. Booleanos (booleans): verdadero (true) o falso (false), con operadores lógicos como Y (&&), O (||) y NO (!).",
      "keyPoints": [
        "Las cadenas se unen con '+': \"go\" + \"lang\" produce \"golang\".",
        "Las divisiones entre enteros descartan los decimales (7/3 da 2, no 2.333).",
        "Para obtener decimales, al menos uno de los operandos debe ser un float (7.0/3.0)."
      ]
    },
    "interExpl": {
      "title": "Mecanismos Internos y Buenas Prácticas",
      "content": "Go es fuertemente tipado: no realiza conversión de tipos implícita. No puedes sumar un entero (int) con un flotante (float64) sin una conversión explícita como float64(miEntero). Esto previene bugs sutiles muy comunes en lenguajes dinámicos.\n\nEn Go, un 'string' es una secuencia inmutable de bytes en memoria representada internamente por una estructura llamada StringHeader (un puntero a los datos subyacentes y un entero con la longitud).",
      "keyPoints": [
        "Cero coerción implícita: cada conversión de tipo debe ser explícita (T(v)).",
        "Inmutabilidad de strings: una vez creado un string, sus bytes individuales no se pueden mutar directamente.",
        "Valores por defecto (Zero Values): las variables no inicializadas tienen un valor seguro (0 para números, \"\" para strings, false para booleanos)."
      ]
    },
    "expertExpl": {
      "title": "Bajo Nivel, Rendimiento e Internals",
      "content": "Los enteros en Go tienen tamaños definidos por arquitectura: 'int' e 'uint' tienen 32 bits en arquitecturas x86 y 64 bits en x86-64/ARM64. Para tamaños fijos garantizados se utilizan int8, int16, int32, int64.\n\nLos flotantes siguen la norma IEEE-754 (float32 y float64). Las cadenas literals son almacenadas en el segmento de solo lectura (.rodata) del binario compilado. Debido a la inmutabilidad de los strings, rebanar un string (s[2:5]) no asigna memoria adicional en el heap; simplemente crea un nuevo encabezado apuntando al mismo búfer subyacente.",
      "keyPoints": [
        "Estructura interna de string: struct { Data *byte; Len int } (16 bytes en arquitectura de 64 bits).",
        "Constantes no tipadas: los literales de valor tienen precisión arbitraria en tiempo de compilación hasta que se asignan a una variable con tipo.",
        "Optimizaciones del compilador: las operaciones lógicas booleanas tienen cortocircuito (short-circuit evaluation)."
      ]
    },
    "evaluation": {
      "title": "Reto: Operaciones con Tipos y Conversión Segura",
      "statement": "Calcula el promedio exacto de tres calificaciones enteras (notas de 1 a 100): 85, 92 y 78. Asegúrate de que el resultado final conserve los decimales en un tipo float64.",
      "starterCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    nota1, nota2, nota3 := 85, 92, 78\n    // Calcula el promedio con decimales exactos\n}",
      "hint": "Suma los tres enteros y convierte la suma o el divisor a float64 antes de dividir.",
      "solution": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    nota1, nota2, nota3 := 85, 92, 78\n    suma := nota1 + nota2 + nota3\n    promedio := float64(suma) / 3.0\n    \n    fmt.Printf(\"Suma: %d\\nPromedio: %.2f\\n\", suma, promedio)\n}",
      "explanation": "Si dividieras suma / 3 (ambos enteros), Go truncaría el resultado perdiendo la fracción (85.00 en vez de 85.00). Al convertir 'suma' a float64 o dividir entre 3.0, Go realiza la división de punto flotante precisa dando 85.00."
    },
    "externalLinks": [
      {
        "title": "Tour interactivo de Go: Tipos básicos de Go",
        "url": "https://go.dev/tour/basics/11",
        "description": "Recorrido interactivo por los tipos primitivos en Go."
      },
      {
        "title": "Guía canónica Effective Go: Constantes y sistemas de tipos",
        "url": "https://go.dev/doc/effective_go#constants",
        "description": "Guía idiomática sobre constantes y tipos de valores."
      },
      {
        "title": "Especificación de Go: Tipos básicos y primitivos del lenguaje",
        "url": "https://go.dev/ref/spec#Numeric_types",
        "description": "Especificación oficial de todos los tipos numéricos y primitivos."
      },
      {
        "title": "Go by Example Original: Values",
        "url": "https://gobyexample.com/values",
        "description": "Página oficial del ejemplo en Go by Example.",
        "type": "Referencia Original"
      }
    ],
    "code": "// Go cuenta con diversos tipos de valores, incluyendo cadenas de texto (strings),\n// enteros, flotantes, booleanos, etc. Aquí hay algunos\n// ejemplos básicos.\n\npackage main\n\nimport \"fmt\"\n\nfunc main() {\n\n\t// Cadenas de texto, que se pueden concatenar con `+`.\n\tfmt.Println(\"go\" + \"lang\")\n\n\t// Enteros y flotantes.\n\tfmt.Println(\"1+1 =\", 1+1)\n\tfmt.Println(\"7.0/3.0 =\", 7.0/3.0)\n\n\t// Booleanos, con los operadores booleanos habituales.\n\tfmt.Println(true && false)\n\tfmt.Println(true || false)\n\tfmt.Println(!true)\n}\n",
    "output": "$ go run values.go\ngolang\n1+1 = 2\n7.0/3.0 = 2.3333333333333335\nfalse\ntrue\nfalse\n",
    "officialUrl": "https://gobyexample.com/values"
  },
  {
    "id": 3,
    "slug": "variables",
    "title": "Variables",
    "titleEs": "Variables e Inferencia de Tipos",
    "category": "Fundamentos del Lenguaje",
    "categorySlug": "fundamentos",
    "categoryIcon": "zap",
    "difficulty": "Principiante",
    "summary": "Declaración explícita con 'var', inferencia automática de tipo y la sintaxis corta ':=' dentro de funciones.",
    "originalExpl": "En Go, las variables se declaran explícitamente y son utilizadas por el compilador para verificar la corrección de tipos en las llamadas a funciones. La sintaxis ':=' es un atajo para declarar e inicializar una variable.",
    "basicExpl": {
      "title": "Conceptos Fundamentales para Principiantes",
      "content": "Una variable es un contenedor con nombre donde guardas un dato que puede cambiar durante la ejecución del programa. En Go tienes dos formas principales de declararlas:\n1. Con la palabra 'var': `var nombre string = \"Carlos\"` o `var edad int` (Go le da el valor 0 automáticamente).\n2. Con el operador corto `:=`: `precio := 19.99`. Go deduce automáticamente que es un float64 sin que tengas que escribir el tipo.",
      "keyPoints": [
        "El operador ':=' solo se puede usar DENTRO de funciones.",
        "Fuera de las funciones (ámbito de paquete) siempre se debe usar 'var'.",
        "Las variables declaradas dentro de una función DEBEN ser usadas; de lo contrario Go no compilará."
      ]
    },
    "interExpl": {
      "title": "Mecanismos Internos y Buenas Prácticas",
      "content": "El concepto de 'Zero Value' (valor cero) es crucial en Go: no existen variables sin inicializar o con valores de basura en memoria. Si declaras `var activo bool`, su valor es garantizado como `false`. Si declaras `var ptr *int`, es `nil`. Esto elimina una familia entera de vulnerabilidades de seguridad comunes en C/C++.\n\nEl operador ':=' también permite redeclaración múltiple si al menos una de las variables del lado izquierdo es nueva en el mismo ámbito léxico (`f, err := os.Open(archivo)` seguido de `data, err := io.ReadAll(f)`).",
      "keyPoints": [
        "Garantía de memoria limpia: inicialización a ceros a nivel de runtime/stack.",
        "Variable Shadowing (sombreado): declarar una variable con el mismo nombre en un bloque interno oculta la externa y puede causar errores difíciles de rastrear.",
        "Convención de nombres: CamelCase y nombres cortos para ámbitos reducidos (ej. 'i' para índices, 'ctx' para context)."
      ]
    },
    "expertExpl": {
      "title": "Bajo Nivel, Rendimiento e Internals",
      "content": "El compilador de Go decide si asignar una variable en el Stack (pila) o en el Heap (montón) mediante el algoritmo de 'Escape Analysis'. Si la variable nunca escapa del marco de la función que la creó, se asigna en el Stack, lo cual es extremadamente rápido (solo un movimiento del puntero de pila SP) y no genera trabajo para el Garbage Collector.\n\nSi una referencia a la variable se retorna, se pasa a una goroutine o se almacena en una interfaz, la variable 'escapa' al Heap, requiriendo asignación por mcache y eventual recolección de basura.",
      "keyPoints": [
        "Inspección de Escape Analysis: `go build -gcflags=\"-m -m\"` muestra exactamente qué variables escapan y por qué.",
        "Variables globales (package level): se ubican en el segmento .data o .bss del ejecutable.",
        "Alineación en memoria: las variables dentro de estructuras y en el stack se alinean según el tamaño de palabra de la CPU (8 bytes en 64-bit)."
      ]
    },
    "evaluation": {
      "title": "Reto: Declaración y Reasignación de Múltiples Variables",
      "statement": "Declara una variable global de paquete llamada 'AppName' con el valor 'MonitorServidor'. Luego, dentro de main, declara tres variables en una sola línea usando ':=' para representar CPU (int), MemoriaGB (float64) y EnLinea (bool). Imprime todas con formato.",
      "starterCode": "package main\n\nimport \"fmt\"\n\n// Declara la variable global aquí\n\nfunc main() {\n    // Declara las tres variables locales en una sola línea\n    \n    // Imprime la información\n}",
      "hint": "Para declarar múltiples variables con := puedes hacer: a, b, c := val1, val2, val3",
      "solution": "package main\n\nimport \"fmt\"\n\nvar AppName string = \"MonitorServidor\"\n\nfunc main() {\n    cpuUso, memoriaGB, enLinea := 45, 16.5, true\n    \n    fmt.Printf(\"App: %s\\nCPU: %d%%\\nMemoria: %.1f GB\\nEstado: %t\\n\", \n        AppName, cpuUso, memoriaGB, enLinea)\n}",
      "explanation": "A nivel de paquete solo se permite 'var'. Dentro de la función main se utiliza la sintaxis corta multi-asignación 'a, b, c := 45, 16.5, true' que infiere int, float64 y bool respectivamente."
    },
    "externalLinks": [
      {
        "title": "Tour interactivo de Go: Declaración y asignación de variables",
        "url": "https://go.dev/tour/basics/8",
        "description": "Declaración e inicialización en el tour interactivo de Go."
      },
      {
        "title": "Guía canónica Effective Go: Declaración e inicialización de variables",
        "url": "https://go.dev/doc/effective_go#variables",
        "description": "Estilo y convenciones al declarar variables en Go."
      },
      {
        "title": "Especificación de Go: Declaraciones de variables y ámbito léxico",
        "url": "https://go.dev/ref/spec#Variable_declarations",
        "description": "Especificación del lenguaje sobre variables y zero-values."
      },
      {
        "title": "Go by Example Original: Variables",
        "url": "https://gobyexample.com/variables",
        "description": "Página oficial del ejemplo en Go by Example.",
        "type": "Referencia Original"
      }
    ],
    "code": "// En Go, las _variables_ se declaran explícitamente y son utilizadas\n// por el compilador para, por ejemplo, verificar la corrección de tipos\n// en las llamadas a funciones.\n\npackage main\n\nimport \"fmt\"\n\nfunc main() {\n\n\t// `var` declara 1 o más variables.\n\tvar a = \"initial\"\n\tfmt.Println(a)\n\n\t// Se pueden declarar múltiples variables al mismo tiempo.\n\tvar b, c int = 1, 2\n\tfmt.Println(b, c)\n\n\t// Go inferirá el tipo de las variables inicializadas.\n\tvar d = true\n\tfmt.Println(d)\n\n\t// Las variables declaradas sin una inicialización correspondiente\n\t// adquieren el _valor cero_ (zero-valued). Por ejemplo, el\n\t// valor cero para un `int` es `0`.\n\tvar e int\n\tfmt.Println(e)\n\n\t// La sintaxis `:=` es una forma abreviada para declarar e\n\t// inicializar una variable; por ejemplo, equivale a\n\t// `var f string = \"apple\"` en este caso.\n\t// Esta sintaxis solo está disponible dentro de funciones.\n\tf := \"apple\"\n\tfmt.Println(f)\n}\n",
    "output": "$ go run variables.go\ninitial\n1 2\ntrue\n0\napple\n",
    "officialUrl": "https://gobyexample.com/variables"
  },
  {
    "id": 4,
    "slug": "constants",
    "title": "Constants",
    "titleEs": "Constantes e Iota",
    "category": "Fundamentos del Lenguaje",
    "categorySlug": "fundamentos",
    "categoryIcon": "zap",
    "difficulty": "Principiante",
    "summary": "Valores inmutables conocidos en tiempo de compilación con alta precisión y el generador de secuencias 'iota'.",
    "originalExpl": "Go soporta constantes de caracteres, cadenas, booleanos y valores numéricos. Se declaran con la palabra clave 'const' y no pueden ser modificadas una vez definidas.",
    "basicExpl": {
      "title": "Conceptos Fundamentales para Principiantes",
      "content": "Una constante es un valor fijo que nunca cambia mientras el programa corre. Si intentas modificarla, el compilador marcará un error inmediato.\n\nAnalogía: Piensa en una constante como una regla física escrita en piedra, como el valor del número Pi (3.14159) o el número de horas en un día (24). Te aseguras de que ningún bug en tu código altere accidentalmente ese valor.",
      "keyPoints": [
        "Se declaran con la palabra reservada 'const'.",
        "No se puede usar ':=' para declarar constantes.",
        "Deben poder calcularse en tiempo de compilación (no puedes asignar el resultado de una función que corre en tiempo de ejecución a una constante)."
      ]
    },
    "interExpl": {
      "title": "Mecanismos Internos y Buenas Prácticas",
      "content": "Go tiene un concepto muy potente: 'constantes no tipadas' (untyped constants). Una constante numérica como `const n = 500000000` tiene precisión arbitraria y no tiene un tipo fijo asignado hasta que se utiliza en una expresión que lo requiere.\n\nAdemás, Go incluye el identificador especial `iota`, un generador de constantes sucesivas que simplifica la creación de enumeraciones y máscaras de bits autoincrementales sin necesidad de tipear números manualmente.",
      "keyPoints": [
        "Precisión matemática de al menos 256 bits para constantes numéricas no tipadas.",
        "iota comienza en 0 dentro de un bloque const y se incrementa en cada línea de especificación.",
        "Constantes agrupadas con paréntesis: const ( A = 1; B = 2 )."
      ]
    },
    "expertExpl": {
      "title": "Bajo Nivel, Rendimiento e Internals",
      "content": "Las constantes no ocupan memoria física en el stack ni en el heap en tiempo de ejecución. El compilador de Go realiza 'constant folding' (plegado de constantes), calculando las operaciones con constantes durante la compilación e incrustando los valores resultantes como literales inmediatos directamente en las instrucciones de ensamblador de la CPU (instrucciones inmediatas como MOVQ $500000000, AX).\n\nCon iota y desplazamientos de bits (1 << iota), se construyen flags binarias de altísima eficiencia sin ningún impacto en runtime.",
      "keyPoints": [
        "Zero overhead en runtime: las constantes desaparecen después de la compilación convirtiéndose en operandos inmediatos.",
        "Tipado contextual: una constante untyped se adapta al tipo receptor sin conversiones costosas.",
        "Evaluación en compile-time: expresiones como (1024 * 1024 * 1024) son resueltas por el compilador."
      ]
    },
    "evaluation": {
      "title": "Reto: Generador de Tamaños de Memoria con Iota",
      "statement": "Utiliza un bloque 'const' con 'iota' y el operador de desplazamiento de bits (<<) para definir las unidades de almacenamiento: KB (1024 bytes), MB, GB y TB. Luego imprime el valor de 1 GB en bytes.",
      "starterCode": "package main\n\nimport \"fmt\"\n\nconst (\n    _  = iota // Ignora el primer valor (0)\n    // Define KB, MB, GB, TB aquí\n)\n\nfunc main() {\n    // Imprime el valor de 1 GB\n}",
      "hint": "Recuerda que 1024 es 1 << 10. Con iota puedes hacer: 1 << (10 * iota).",
      "solution": "package main\n\nimport \"fmt\"\n\nconst (\n    _  = iota\n    KB = 1 << (10 * iota) // 1 << 10 = 1024\n    MB                    // 1 << 20\n    GB                    // 1 << 30\n    TB                    // 1 << 40\n)\n\nfunc main() {\n    fmt.Printf(\"1 KB = %d bytes\\n\", KB)\n    fmt.Printf(\"1 MB = %d bytes\\n\", MB)\n    fmt.Printf(\"1 GB = %d bytes\\n\", GB)\n    fmt.Printf(\"1 TB = %d bytes\\n\", TB)\n}",
      "explanation": "El identificador iota avanza en cada línea del bloque const. Multiplicar 10 * iota y aplicar desplazamiento de bits a la izquierda (1 << ...) genera limpiamente las potencias de 2 correspondientes a KB, MB, GB y TB de forma puramente evaluada en compilación."
    },
    "externalLinks": [
      {
        "title": "Blog oficial de Go: Constantes en Go: precisión y tipos",
        "url": "https://go.dev/blog/constants",
        "description": "Artículo definitivo del equipo de Go sobre constantes no tipadas y precisión."
      },
      {
        "title": "Tour interactivo de Go: Constantes numéricas y de texto",
        "url": "https://go.dev/tour/basics/15",
        "description": "Ejercicios interactivos con constantes numéricas y de caracteres."
      },
      {
        "title": "Especificación de Go: El identificador predefinido iota",
        "url": "https://go.dev/ref/spec#Iota",
        "description": "Especificación técnica del funcionamiento de iota."
      },
      {
        "title": "Go by Example Original: Constants",
        "url": "https://gobyexample.com/constants",
        "description": "Página oficial del ejemplo en Go by Example.",
        "type": "Referencia Original"
      }
    ],
    "code": "// Go admite _constantes_ de caracteres, cadenas de texto, valores booleanos\n// y numéricos.\n\npackage main\n\nimport (\n\t\"fmt\"\n\t\"math\"\n)\n\n// `const` declara un valor constante.\nconst s string = \"constant\"\n\nfunc main() {\n\tfmt.Println(s)\n\n\t// Una sentencia `const` también puede aparecer dentro del\n\t// cuerpo de una función.\n\tconst n = 500000000\n\n\t// Las expresiones constantes realizan aritmética con\n\t// precisión arbitraria.\n\tconst d = 3e20 / n\n\tfmt.Println(d)\n\n\t// Una constante numérica no tiene un tipo definido hasta que se le asigna\n\t// uno, por ejemplo mediante una conversión explícita.\n\tfmt.Println(int64(d))\n\n\t// A un número se le puede asignar un tipo utilizándolo en un\n\t// contexto que lo requiera, como una asignación de variable\n\t// o una llamada a función. Por ejemplo, aquí\n\t// `math.Sin` espera un `float64`.\n\tfmt.Println(math.Sin(n))\n}\n",
    "output": "$ go run constant.go \nconstant\n6e+11\n600000000000\n-0.28470407323754404\n",
    "officialUrl": "https://gobyexample.com/constants"
  },
  {
    "id": 5,
    "slug": "for",
    "title": "For",
    "titleEs": "El Bucle For (Única Estructura de Repetición)",
    "category": "Fundamentos del Lenguaje",
    "categorySlug": "fundamentos",
    "categoryIcon": "zap",
    "difficulty": "Principiante",
    "summary": "Go solo tiene una palabra clave para bucles: 'for'. Con ella se construyen bucles tradicionales, bucles while y bucles infinitos.",
    "originalExpl": "'for' es la única estructura de control de bucles en Go. Cubre bucles básicos de 3 componentes, bucles de una sola condición (tipo while) y bucles infinitos con break y continue.",
    "basicExpl": {
      "title": "Conceptos Fundamentales para Principiantes",
      "content": "A diferencia de otros lenguajes que tienen 'while', 'do-while' y 'for', los diseñadores de Go decidieron que una sola palabra era suficiente para simplificar la sintaxis:\n1. Bucle clásico: `for i := 0; i < 5; i++` (inicialización; condición; incremento).\n2. Estilo While: `for condicion` (se repite mientras la condición sea verdadera).\n3. Bucle infinito: `for {}` (corre para siempre hasta que ejecutes un `break` o `return`).\n4. `continue`: salta a la siguiente iteración; `break`: sale del bucle por completo.",
      "keyPoints": [
        "No existen las palabras 'while' ni 'do-while' en Go.",
        "Los paréntesis alrededor de la condición están prohibidos o no son necesarios.",
        "Las llaves '{ }' son siempre obligatorias, incluso para bucles de una sola línea."
      ]
    },
    "interExpl": {
      "title": "Mecanismos Internos y Buenas Prácticas",
      "content": "A partir de Go 1.22, se introdujo una mejora histórica en el alcance de variables dentro de 'for': en cada iteración del bucle se crea una NUEVA instancia de la variable de iteración. En versiones anteriores a Go 1.22, la variable era compartida entre iteraciones, lo que provocaba bugs graves al capturar variables en clausuras o goroutines.\n\nTambién es posible usar etiquetas (labels) para romper bucles anidados: `MiBucle: for ... { break MiBucle }`.",
      "keyPoints": [
        "Go 1.22 Loopvar: Las variables de bucle tienen alcance por iteración, evitando el clásico bug con goroutines.",
        "Break con etiqueta (labeled break): permite salir de múltiples bucles anidados limpiamente.",
        "Range: El bucle for también se combina con 'range' para iterar slices, arrays, mapas, strings y canales."
      ]
    },
    "expertExpl": {
      "title": "Bajo Nivel, Rendimiento e Internals",
      "content": "El compilador de Go optimiza los bucles 'for' mediante desenrollado parcial de bucles (loop unrolling) cuando detecta condiciones estáticas pequeñas. Además, aplica 'BCE' (Bounds Check Elimination) si puede demostrar matemáticamente que los índices de acceso a un slice o array dentro del bucle nunca sobrepasarán su longitud.\n\nEn bucles infinitos que ejecutan código muy intensivo en CPU sin llamadas a funciones, el runtime de Go (desde Go 1.14) inserta puntos de preempción asíncronos mediante señales de sistema operativo (SIGURG en Unix) para evitar que una goroutine monopolice un hilo del procesador (P).",
      "keyPoints": [
        "Preempción no cooperativa: las goroutines en bucles for cerrados son pausadas por el scheduler de Go usando señales.",
        "Bounds Check Elimination (BCE): verifica eliminaciones de comprobaciones de límites con `go build -gcflags=\"-d=ssa/check_bce\"`.",
        "Vectorización SIMD: en ciertas arquitecturas, el compilador puede generar instrucciones vectoriales para sumas y copias."
      ]
    },
    "evaluation": {
      "title": "Reto: Encontrar Números Primos con Bucle y Break",
      "statement": "Escribe un programa que imprima todos los números primos entre 2 y 30 utilizando bucles 'for' anidados y la instrucción 'break' para optimizar la búsqueda.",
      "starterCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(\"Números primos del 2 al 30:\")\n    // Implementa el algoritmo con bucles for\n}",
      "hint": "Para cada número 'n', prueba si es divisible por algún 'd' desde 2 hasta la mitad de 'n'. Si lo es, usa break.",
      "solution": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(\"Números primos del 2 al 30:\")\n    \n    for n := 2; n <= 30; n++ {\n        esPrimo := true\n        for d := 2; d*d <= n; d++ {\n            if n%d == 0 {\n                esPrimo = false\n                break\n            }\n        }\n        if esPrimo {\n            fmt.Printf(\"%d \", n)\n        }\n    }\n    fmt.Println()\n}",
      "explanation": "El bucle externo recorre los candidatos del 2 al 30. El bucle interno verifica divisibilidad hasta d*d <= n. Apenas encuentra un divisor (n%d == 0), marca esPrimo como false y sale inmediatamente con 'break' sin gastar ciclos innecesarios."
    },
    "externalLinks": [
      {
        "title": "Tour interactivo de Go: Bucles de iteración con for",
        "url": "https://go.dev/tour/flowcontrol/1",
        "description": "Práctica con las diferentes formas del bucle for."
      },
      {
        "title": "Blog oficial de Go: Resolución del ámbito de variables de bucle en Go 1.22",
        "url": "https://go.dev/blog/loopvar-preview",
        "description": "Explicación oficial del cambio de alcance de variables en bucles."
      },
      {
        "title": "Guía canónica Effective Go: Sentencia de iteración for",
        "url": "https://go.dev/doc/effective_go#for",
        "description": "Uso idiomático del bucle for en proyectos reales de Go."
      },
      {
        "title": "Go by Example Original: For",
        "url": "https://gobyexample.com/for",
        "description": "Página oficial del ejemplo en Go by Example.",
        "type": "Referencia Original"
      }
    ],
    "code": "// `for` es la única estructura de bucle en Go. Aquí se presentan\n// algunos tipos básicos de bucles `for`.\n\npackage main\n\nimport \"fmt\"\n\nfunc main() {\n\n\t// El tipo más básico, con una única condición.\n\ti := 1\n\tfor i <= 3 {\n\t\tfmt.Println(i)\n\t\ti = i + 1\n\t}\n\n\t// Un bucle `for` clásico con inicialización/condición/paso posterior.\n\tfor j := 0; j < 3; j++ {\n\t\tfmt.Println(j)\n\t}\n\n\t// Otra forma de lograr la iteración básica de \"hacer esto N veces\"\n\t// es usar `range` sobre un número entero.\n\tfor i := range 3 {\n\t\tfmt.Println(\"range\", i)\n\t}\n\n\t// Un `for` sin condición iterará repetidamente hasta que\n\t// uses `break` para salir del bucle o `return` para retornar\n\t// desde la función contenedora.\n\tfor {\n\t\tfmt.Println(\"loop\")\n\t\tbreak\n\t}\n\n\t// También puedes usar `continue` para avanzar a la siguiente iteración\n\t// del bucle.\n\tfor n := range 6 {\n\t\tif n%2 == 0 {\n\t\t\tcontinue\n\t\t}\n\t\tfmt.Println(n)\n\t}\n}\n",
    "output": "$ go run for.go\n1\n2\n3\n0\n1\n2\nrange 0\nrange 1\nrange 2\nloop\n1\n3\n5\n\n# Veremos otras formas de `for` más adelante cuando examinemos\n# las sentencias `range`, canales y otras estructuras de datos.\n",
    "officialUrl": "https://gobyexample.com/for"
  },
  {
    "id": 6,
    "slug": "if-else",
    "title": "If/Else",
    "titleEs": "Condicionales If / Else",
    "category": "Fundamentos del Lenguaje",
    "categorySlug": "fundamentos",
    "categoryIcon": "zap",
    "difficulty": "Principiante",
    "summary": "Estructuras condicionales en Go con la sintaxis única de declaración previa antes de la condición.",
    "originalExpl": "Bifurcaciones con 'if' y 'else' en Go. No requiere paréntesis alrededor de las condiciones, pero las llaves son obligatorias. Permite una instrucción de inicialización antes de la condición.",
    "basicExpl": {
      "title": "Conceptos Fundamentales para Principiantes",
      "content": "La instrucción 'if' evalúa si algo es verdadero para ejecutar un bloque de código, o 'else' si es falso. En Go:\n- No se colocan paréntesis en la condición: `if x > 10 { ... }`\n- Las llaves `{ }` siempre deben colocarse en la misma línea de apertura.\n- Se puede ejecutar una instrucción rápida antes de comprobar la condición: `if num := 9; num < 0 { ... }`.",
      "keyPoints": [
        "Sin operador ternario: Go NO tiene el operador 'condicion ? valor1 : valor2'. Siempre se usa if/else.",
        "Las llaves '{ }' son obligatorias, sin excepciones.",
        "La sentencia previa `if v := calc(); v > 0` limita el alcance de 'v' solo al bloque if/else."
      ]
    },
    "interExpl": {
      "title": "Mecanismos Internos y Buenas Prácticas",
      "content": "Patrón 'Early Return' (Retorno Temprano o Guard Clauses): En Go es una fuerte convención evitar anidar bloques if/else profundos. En su lugar, se valida el error o caso desfavorable primero y se retorna temprano:\n```go\nif err != nil {\n    return err\n}\n// Flujo principal sin sangría\n```\nEsto mantiene el código plano, legible y fácil de mantener.",
      "keyPoints": [
        "Alcance léxico: Las variables declaradas en la cabecera del if (`if v := ...; ...`) viven solo dentro de los bloques if, else if y else asociados.",
        "Evitar 'else' innecesario: si el bloque 'if' termina con un return, break o panic, se omite el 'else'.",
        "Comprobaciones cortocircuitadas: si la primera parte de un && es false, la segunda jamás se evalúa."
      ]
    },
    "expertExpl": {
      "title": "Bajo Nivel, Rendimiento e Internals",
      "content": "A nivel de código máquina, las sentencias if/else se traducen a saltos condicionales (instrucciones como JNE, JLE, JZ en x86). Los procesadores modernos usan 'Branch Predictors' para adivinar qué camino tomará el código antes de que se resuelva la condición. Escribir código con caminos predecibles (donde el caso de éxito es la norma y los errores son excepciones) maximiza el acierto de la predicción de saltos de la CPU.\n\nEl compilador de Go también elimina ramas muertas en tiempo de compilación si la condición involucra constantes conocidas.",
      "keyPoints": [
        "Branch Prediction Optimization: Minimizar la dispersión de saltos impredecibles en caminos críticos de procesamiento.",
        "Dead Code Elimination: Si una rama es inalcanzable con constantes (ej. `if constVar > 10`), el compilador la remueve completamente del binario.",
        "No ternary: La exclusión deliberada del operador ternario previene expresiones condicionales crípticas y promueve perfiles de cobertura limpios."
      ]
    },
    "evaluation": {
      "title": "Reto: Validador de Acceso con Inicialización Previa",
      "statement": "Escribe una función que reciba una edad. Utiliza la sintaxis de 'if' con sentencia de inicialización previa para calcular la mayoría de edad y determinar si el usuario tiene acceso total (>=18), acceso juvenil (14 a 17) o acceso restringido (<14).",
      "starterCode": "package main\n\nimport \"fmt\"\n\nfunc verificarAcceso(edad int) string {\n    // Usa la sintaxis: if ... ; ... {\n}\n\nfunc main() {\n    fmt.Println(verificarAcceso(16))\n    fmt.Println(verificarAcceso(21))\n    fmt.Println(verificarAcceso(10))\n}",
      "hint": "Puedes inicializar una variable booleana o una categoría antes de evaluar.",
      "solution": "package main\n\nimport \"fmt\"\n\nfunc verificarAcceso(edad int) string {\n    if esMayor := edad >= 18; esMayor {\n        return \"Acceso Total (Adulto)\"\n    } else if esJuvenil := edad >= 14; esJuvenil {\n        return \"Acceso Juvenil (Requiere Tutor)\"\n    } else {\n        return \"Acceso Restringido (Menor de 14)\"\n    }\n}\n\nfunc main() {\n    fmt.Println(verificarAcceso(16))\n    fmt.Println(verificarAcceso(21))\n    fmt.Println(verificarAcceso(10))\n}",
      "explanation": "La sentencia de inicialización dentro de la cabecera del if permite declarar una variable auxiliar cujo alcance queda estrictamente confinado a las ramas del condicional, evitando ensuciar el espacio de nombres de la función."
    },
    "externalLinks": [
      {
        "title": "Tour interactivo de Go: Condicionales if en Go",
        "url": "https://go.dev/tour/flowcontrol/5",
        "description": "Ejercicios con condicionales if y sentencias cortas de inicialización."
      },
      {
        "title": "Guía canónica Effective Go: Estructuras de control condicionales if/else",
        "url": "https://go.dev/doc/effective_go#if",
        "description": "El estilo canónico de Go para evitar bloques else profundos."
      },
      {
        "title": "Especificación de Go: Sintaxis y reglas de sentencias if",
        "url": "https://go.dev/ref/spec#If_statements",
        "description": "Especificación formal del comportamiento sintáctico de if."
      },
      {
        "title": "Go by Example Original: If/Else",
        "url": "https://gobyexample.com/if-else",
        "description": "Página oficial del ejemplo en Go by Example.",
        "type": "Referencia Original"
      }
    ],
    "code": "// La bifurcación condicional con `if` y `else` en Go es\n// directa y sencilla.\n\npackage main\n\nimport \"fmt\"\n\nfunc main() {\n\n\t// Aquí hay un ejemplo básico.\n\tif 7%2 == 0 {\n\t\tfmt.Println(\"7 is even\")\n\t} else {\n\t\tfmt.Println(\"7 is odd\")\n\t}\n\n\t// Se puede tener una sentencia `if` sin bloque else.\n\tif 8%4 == 0 {\n\t\tfmt.Println(\"8 is divisible by 4\")\n\t}\n\n\t// Los operadores lógicos como `&&` y `||` suelen ser\n\t// muy útiles en las condiciones.\n\tif 8%2 == 0 || 7%2 == 0 {\n\t\tfmt.Println(\"either 8 or 7 are even\")\n\t}\n\n\t// Una declaración puede preceder a los condicionales; cualquier variable\n\t// declarada en esta declaración estará disponible en la rama actual\n\t// y en todas las ramas subsiguientes.\n\tif num := 9; num < 0 {\n\t\tfmt.Println(num, \"is negative\")\n\t} else if num < 10 {\n\t\tfmt.Println(num, \"has 1 digit\")\n\t} else {\n\t\tfmt.Println(num, \"has multiple digits\")\n\t}\n}\n\n// Ten en cuenta que no se necesitan paréntesis alrededor de las condiciones\n// en Go, pero las llaves `{}` son obligatorias.\n",
    "output": "$ go run if-else.go\n7 is odd\n8 is divisible by 4\neither 8 or 7 are even\n9 has 1 digit\n\n# No existe un operador ternario `if` en Go, por lo que\n# deberás usar una sentencia `if` completa incluso para\n# condiciones básicas.\n",
    "officialUrl": "https://gobyexample.com/if-else"
  },
  {
    "id": 7,
    "slug": "switch",
    "title": "Switch",
    "titleEs": "Sentencias Switch",
    "category": "Fundamentos del Lenguaje",
    "categorySlug": "fundamentos",
    "categoryIcon": "zap",
    "difficulty": "Principiante",
    "summary": "Switch condicional, múltiple expresión por caso, switch sin condición (reemplazo de if-else largos) y switch de tipos.",
    "originalExpl": "Las declaraciones switch expresan condicionales a través de múltiples ramas. En Go no se necesita 'break' al final de cada caso; no hay caída automática (fallthrough) por defecto.",
    "basicExpl": {
      "title": "Conceptos Fundamentales para Principiantes",
      "content": "Un 'switch' es una forma ordenada de comparar una variable con muchos posibles valores. En Go es mucho más seguro y cómodo que en otros lenguajes:\n1. No necesitas poner `break`: Go se detiene automáticamente tras ejecutar el caso que coincide.\n2. Puedes poner varios valores en una sola línea: `case \"sabado\", \"domingo\":`.\n3. Puedes hacer un switch sin expresión inicial: actúa como una cadena limpia de if-else.\n4. Si realmente quieres que continúe al siguiente caso, debes usar explícitamente `fallthrough`.",
      "keyPoints": [
        "Sin fallthrough accidental: no necesitas escribir 'break' en cada rama.",
        "Soporta casos con múltiples valores separados por comas.",
        "Cláusula 'default' para cuando ningún caso coincide."
      ]
    },
    "interExpl": {
      "title": "Mecanismos Internos y Buenas Prácticas",
      "content": "Go incluye el 'Type Switch' (switch de tipos), una herramienta potente para inspeccionar dinámicamente el tipo real de una interfaz vacía (`interface{}` o `any`):\n```go\nswitch v := i.(type) {\ncase int:\n    fmt.Println(\"Es un entero:\", v)\ncase string:\n    fmt.Println(\"Es un string:\", v)\n}\n```\nDentro de cada bloque 'case', la variable 'v' adopta estáticamente el tipo específico de esa rama, permitiendo invocar sus métodos propios sin conversiones adicionales.",
      "keyPoints": [
        "Type Switch: `switch v := x.(type)` permite inspección de tipos en tiempo de ejecución segura y limpia.",
        "Switch sin condición: `switch { case x > 0: ... }` es idiomático y mucho más legible que múltiples if/else if.",
        "fallthrough es una instrucción explícita que transfiere el control a la siguiente rama sin re-evaluar la condición."
      ]
    },
    "expertExpl": {
      "title": "Bajo Nivel, Rendimiento e Internals",
      "content": "El compilador de Go optimiza las sentencias switch según la cantidad y densidad de los casos:\n1. Si los casos son pocos (< 4): genera una cadena lineal de saltos condicionales.\n2. Si los casos son enteros densos y consecutivos: genera una tabla de saltos directos (Jump Table en ensamblador), logrando complejidad O(1).\n3. Si los casos son dispersos: genera un árbol de búsqueda binaria en tiempo de compilación con saltos balanceados, logrando complejidad O(log N).\n\nEn un Type Switch, el runtime inspecciona el puntero de tipo itab/_type dentro del fat pointer de la interfaz con comparaciones directas de punteros en memoria.",
      "keyPoints": [
        "Jump Tables: Compilación a tablas de salto O(1) para enteros contiguos.",
        "Búsqueda binaria interna: O(log N) para casos numerosos no contiguos.",
        "Itab Inspection: Type switches de interfaz evalúan punteros a descriptores de tipo en memoria estática."
      ]
    },
    "evaluation": {
      "title": "Reto: Identificador Polimórfico con Type Switch",
      "statement": "Crea una función llamada 'describirElemento(elemento any)' que use un Type Switch para imprimir el tipo de dato y una descripción formateada si el valor es int, string, bool o slice de enteros ([]int). Si es otro tipo, imprimir 'Tipo desconocido'.",
      "starterCode": "package main\n\nimport \"fmt\"\n\nfunc describirElemento(elemento any) {\n    // Implementa el switch de tipos aquí\n}\n\nfunc main() {\n    describirElemento(42)\n    describirElemento(\"Hola Golang\")\n    describirElemento([]int{1, 2, 3})\n    describirElemento(3.14)\n}",
      "hint": "Usa la sintaxis: switch v := elemento.(type) { case ... }",
      "solution": "package main\n\nimport \"fmt\"\n\nfunc describirElemento(elemento any) {\n    switch v := elemento.(type) {\n    case int:\n        fmt.Printf(\"Es un entero con valor al cuadrado: %d\\n\", v*v)\n    case string:\n        fmt.Printf(\"Es una cadena de longitud %d: '%s'\\n\", len(v), v)\n    case bool:\n        fmt.Printf(\"Es un booleano: %t\\n\", v)\n    case []int:\n        fmt.Printf(\"Es un slice de enteros con %d elementos: %v\\n\", len(v), v)\n    default:\n        fmt.Printf(\"Tipo no contemplado: %T\\n\", v)\n    }\n}\n\nfunc main() {\n    describirElemento(42)\n    describirElemento(\"Hola Golang\")\n    describirElemento([]int{1, 2, 3})\n    describirElemento(3.14)\n}",
      "explanation": "El Type Switch inspecciona el tipo dinámico envuelto en la interfaz 'any'. Dentro de cada rama 'case', la variable v queda fuertemente tipada con el tipo concreto (por ejemplo, en el case int se puede multiplicar v*v; en el case string se puede usar len(v))."
    },
    "externalLinks": [
      {
        "title": "Tour interactivo de Go: Bifurcaciones con switch",
        "url": "https://go.dev/tour/flowcontrol/9",
        "description": "Ejercicios con switch en el tour interactivo."
      },
      {
        "title": "Guía canónica Effective Go: Sentencias de selección múltiple switch",
        "url": "https://go.dev/doc/effective_go#switch",
        "description": "Guía idiomática sobre switch sin condición y switch de tipos."
      },
      {
        "title": "Especificación de Go: Sentencias de bifurcación switch",
        "url": "https://go.dev/ref/spec#Switch_statements",
        "description": "Reglas de expresión y sintaxis oficial de switch."
      },
      {
        "title": "Go by Example Original: Switch",
        "url": "https://gobyexample.com/switch",
        "description": "Página oficial del ejemplo en Go by Example.",
        "type": "Referencia Original"
      }
    ],
    "code": "// Las _sentencias switch_ expresan condicionales a través de múltiples\n// ramas de ejecución.\n\npackage main\n\nimport (\n\t\"fmt\"\n\t\"time\"\n)\n\nfunc main() {\n\n\t// Aquí hay un `switch` básico.\n\ti := 2\n\tfmt.Print(\"Write \", i, \" as \")\n\tswitch i {\n\tcase 1:\n\t\tfmt.Println(\"one\")\n\tcase 2:\n\t\tfmt.Println(\"two\")\n\tcase 3:\n\t\tfmt.Println(\"three\")\n\t}\n\n\t// Puedes usar comas para separar múltiples expresiones\n\t// en la misma cláusula `case`. En este ejemplo también\n\t// usamos el caso opcional `default`.\n\tswitch time.Now().Weekday() {\n\tcase time.Saturday, time.Sunday:\n\t\tfmt.Println(\"It's the weekend\")\n\tdefault:\n\t\tfmt.Println(\"It's a weekday\")\n\t}\n\n\t// Un `switch` sin expresión es una forma alternativa de\n\t// expresar la lógica if/else. Aquí también demostramos cómo las\n\t// expresiones en `case` pueden ser valores no constantes.\n\tt := time.Now()\n\tswitch {\n\tcase t.Hour() < 12:\n\t\tfmt.Println(\"It's before noon\")\n\tdefault:\n\t\tfmt.Println(\"It's after noon\")\n\t}\n\n\t// Un `switch` de tipo compara tipos en lugar de valores. Puedes\n\t// usarlo para descubrir el tipo dinámico de un valor de interfaz.\n\t// En este ejemplo, la variable `t` tendrá el\n\t// tipo correspondiente a su cláusula evaluada.\n\twhatAmI := func(i any) {\n\t\tswitch t := i.(type) {\n\t\tcase bool:\n\t\t\tfmt.Println(\"I'm a bool\")\n\t\tcase int:\n\t\t\tfmt.Println(\"I'm an int\")\n\t\tdefault:\n\t\t\tfmt.Printf(\"Don't know type %T\\n\", t)\n\t\t}\n\t}\n\twhatAmI(true)\n\twhatAmI(1)\n\twhatAmI(\"hey\")\n}\n",
    "output": "$ go run switch.go \nWrite 2 as two\nIt's a weekday\nIt's after noon\nI'm a bool\nI'm an int\nDon't know type string\n",
    "officialUrl": "https://gobyexample.com/switch"
  },
  {
    "id": 8,
    "slug": "arrays",
    "title": "Arrays",
    "titleEs": "Arreglos (Arrays de Tamaño Fijo)",
    "category": "Estructuras de Datos y Colecciones",
    "categorySlug": "estructuras-datos",
    "categoryIcon": "package",
    "difficulty": "Principiante",
    "summary": "Colecciones contiguas en memoria de tamaño fijo donde la longitud forma parte inseparable del tipo de dato.",
    "originalExpl": "En Go, un arreglo (array) es una secuencia numerada de elementos de una longitud específica. En el código Go típico, los slices son mucho más comunes; los arrays son útiles en situaciones especializadas.",
    "basicExpl": {
      "title": "Conceptos Fundamentales para Principiantes",
      "content": "Un array es una fila de casillas donde guardas elementos del mismo tipo. Su tamaño se decide al crearlo y NUNCA puede cambiar. Si defines `var a [5]int`, tendrás exactamente 5 casillas numeradas del 0 al 4, todas inicialmente con valor 0.\n\nAnalogía: Piensa en una caja de 6 huevos de cartón. Tiene 6 huecos fijos; no puedes meter un séptimo huevo ni encoger la caja a 4.",
      "keyPoints": [
        "El tamaño se define entre corchetes: `[5]int`.",
        "Los índices comienzan en 0 y terminan en longitud - 1.",
        "La función nativa `len(a)` devuelve cuántos elementos tiene el arreglo.",
        "Se pueden inicializar directamente con literales: `b := [3]int{10, 20, 30}`."
      ]
    },
    "interExpl": {
      "title": "Mecanismos Internos y Buenas Prácticas",
      "content": "En Go, los arrays son valores puros, NO punteros ni referencias (a diferencia de C o Java). Si pasas un array de 1000 elementos como argumento a una función o lo asignas a otra variable (`b = a`), Go COPIA los 1000 elementos completos en memoria.\n\nAdemás, el tamaño es parte del tipo: `[3]int` y `[4]int` son dos tipos de datos completamente incompatibles para el compilador. Por esta razón, en Go idiomático casi siempre se utilizan Slices en lugar de Arrays directos.",
      "keyPoints": [
        "Paso por valor: pasar un array a una función duplica todos sus elementos en el stack.",
        "Tamaño en el tipo: no puedes asignar un [3]int a una variable [4]int.",
        "Sintaxis con elipsis: `[...]int{1, 2, 3}` permite que el compilador cuente los elementos automáticamente."
      ]
    },
    "expertExpl": {
      "title": "Bajo Nivel, Rendimiento e Internals",
      "content": "Físicamente en memoria, un array es un bloque contiguo de bytes sin metadatos adicionales ni punteros indirectos. Para `[4]int64`, se asignan exactamente 32 bytes contiguos alineados a 8 bytes. Esto ofrece una localidad espacial de caché L1/L2 insuperable.\n\nSi necesitas garantizar cero asignaciones en el Heap para estructuras de tamaño fijo (como hashes criptográficos [32]byte para SHA-256 o matrices matemáticas en gráficos), los arrays en el Stack son la opción más rápida posible en Go.",
      "keyPoints": [
        "Cero overhead de heap: los arrays pequeños se asignan 100% en el stack de la goroutine.",
        "Cache Locality: Acceso secuencial óptimo para el hardware prefetcher de la CPU.",
        "Uso canónico: Claves criptográficas (ej. `[32]byte` en crypto/sha256) e identificadores UUID de tamaño fijo."
      ]
    },
    "evaluation": {
      "title": "Reto: Rotación Circular de un Arreglo Fijo",
      "statement": "Declara un arreglo de 5 enteros con los valores [10, 20, 30, 40, 50]. Escribe un algoritmo que rote todos los elementos una posición hacia la derecha, de modo que el último elemento (50) pase a ser el primero [50, 10, 20, 30, 40].",
      "starterCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    arr := [5]int{10, 20, 30, 40, 50}\n    // Realiza la rotación a la derecha en arr\n    \n    fmt.Println(\"Rotado:\", arr)\n}",
      "hint": "Guarda el último elemento en una variable temporal y desplaza los demás de derecha a izquierda antes de asignarlo al índice 0.",
      "solution": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    arr := [5]int{10, 20, 30, 40, 50}\n    \n    ultimo := arr[len(arr)-1]\n    for i := len(arr) - 1; i > 0; i-- {\n        arr[i] = arr[i-1]\n    }\n    arr[0] = ultimo\n    \n    fmt.Println(\"Rotado:\", arr)\n}",
      "explanation": "Al recorrer el array de atrás hacia adelante (de 4 a 1), podemos sobreescribir cada posición arr[i] con arr[i-1] sin pisar datos que aún necesitamos mover. Finalmente, colocamos el valor guardado en arr[0]."
    },
    "externalLinks": [
      {
        "title": "Tour interactivo de Go: Arrays y arreglos estáticos",
        "url": "https://go.dev/tour/moretypes/6",
        "description": "Concepto y sintaxis de arrays en el tour oficial."
      },
      {
        "title": "Blog oficial de Go: Arreglos fijos y slices dinámicos",
        "url": "https://go.dev/blog/slices-intro",
        "description": "Artículo de referencia sobre las diferencias entre arrays y slices."
      },
      {
        "title": "Especificación de Go: Tipos de array (arreglos de tamaño fijo)",
        "url": "https://go.dev/ref/spec#Array_types",
        "description": "Especificación del estándar para tipos de arreglo."
      },
      {
        "title": "Go by Example Original: Arrays",
        "url": "https://gobyexample.com/arrays",
        "description": "Página oficial del ejemplo en Go by Example.",
        "type": "Referencia Original"
      }
    ],
    "code": "// En Go, un _array_ (arreglo) es una secuencia numerada de elementos de una\n// longitud específica. En el código idiomático de Go, los [slices](slices) son\n// mucho más comunes; los arrays son útiles en algunos escenarios\n// particulares de memoria contigua.\n\npackage main\n\nimport \"fmt\"\n\nfunc main() {\n\n\t// Aquí creamos un array `a` que contendrá exactamente\n\t// 5 valores de tipo `int`. Tanto el tipo de los elementos como la longitud\n\t// forman parte del tipo del array. Por defecto, un array tiene el\n\t// valor cero, que para los `int` representa `0`.\n\tvar a [5]int\n\tfmt.Println(\"emp:\", a)\n\n\t// Podemos establecer un valor en un índice mediante la\n\t// sintaxis `array[index] = value`, y obtener un valor con\n\t// `array[index]`.\n\ta[4] = 100\n\tfmt.Println(\"set:\", a)\n\tfmt.Println(\"get:\", a[4])\n\n\t// La función incorporada `len` devuelve la longitud de un array.\n\tfmt.Println(\"len:\", len(a))\n\n\t// Usa esta sintaxis para declarar e inicializar un array\n\t// en una sola línea.\n\tb := [5]int{1, 2, 3, 4, 5}\n\tfmt.Println(\"dcl:\", b)\n\n\t// También puedes hacer que el compilador cuente la cantidad de\n\t// elementos automáticamente utilizando `...`\n\tb = [...]int{1, 2, 3, 4, 5}\n\tfmt.Println(\"dcl:\", b)\n\n\t// Si especificas el índice con `:`, los elementos\n\t// intermedios se rellenarán con ceros.\n\tb = [...]int{100, 3: 400, 500}\n\tfmt.Println(\"idx:\", b)\n\n\t// Los tipos de array son unidimensionales, pero puedes\n\t// componer tipos para construir estructuras de datos\n\t// multidimensionales.\n\tvar twoD [2][3]int\n\tfor i := range 2 {\n\t\tfor j := range 3 {\n\t\t\ttwoD[i][j] = i + j\n\t\t}\n\t}\n\tfmt.Println(\"2d: \", twoD)\n\n\t// También puedes crear e inicializar arrays multidimensionales\n\t// de una sola vez.\n\ttwoD = [2][3]int{\n\t\t{1, 2, 3},\n\t\t{1, 2, 3},\n\t}\n\tfmt.Println(\"2d: \", twoD)\n}\n",
    "output": "$ go run arrays.go\nemp: [0 0 0 0 0]\nset: [0 0 0 0 100]\nget: 100\nlen: 5\ndcl: [1 2 3 4 5]\ndcl: [1 2 3 4 5]\nidx: [100 0 0 400 500]\n2d:  [[0 1 2] [1 2 3]]\n2d:  [[1 2 3] [1 2 3]]\n\n# Ten en cuenta que los arrays aparecen en la forma `[v1 v2 v3 ...]`\n# cuando se imprimen con `fmt.Println`.\n",
    "officialUrl": "https://gobyexample.com/arrays"
  },
  {
    "id": 9,
    "slug": "slices",
    "title": "Slices",
    "titleEs": "Slices Dinámicos",
    "category": "Estructuras de Datos y Colecciones",
    "categorySlug": "estructuras-datos",
    "categoryIcon": "package",
    "difficulty": "Principiante",
    "summary": "La estructura de colección principal en Go: vistas dinámicas, flexibles y eficientes sobre arreglos subyacentes.",
    "originalExpl": "Los slices son un tipo de datos fundamental en Go, ofreciendo una interfaz más poderosa para secuencias que los arreglos. Se crean con make(), admiten append(), rebanado con sintaxis [bajo:alto] y funciones del paquete estándar 'slices'.",
    "basicExpl": {
      "title": "Conceptos Fundamentales para Principiantes",
      "content": "A diferencia de un arreglo que tiene tamaño fijo, un 'slice' puede crecer o encogerse según lo necesites. Es la lista dinámica por excelencia en Go.\n- Se crea con `make([]tipo, longitud, capacidad)` o literal `s := []int{1, 2, 3}`.\n- Para agregar elementos se usa `append(s, nuevoElemento)`.\n- Para extraer una porción se usa rebanado: `s[1:3]` (desde el índice 1 inclusive hasta el 3 exclusivo).",
      "keyPoints": [
        "Un slice no inicializado vale 'nil' y tiene longitud 0.",
        "len(s) indica cuántos elementos contiene actualmente.",
        "cap(s) indica la capacidad máxima del arreglo subyacente antes de necesitar reasignación.",
        "append() siempre devuelve un nuevo slice que debes reasignar: `s = append(s, val)`."
      ]
    },
    "interExpl": {
      "title": "Mecanismos Internos y Buenas Prácticas",
      "content": "Un slice es en realidad una estructura diminuta de 24 bytes (en 64-bit) llamada 'SliceHeader':\n1. Un puntero (8 bytes) al array subyacente en memoria.\n2. La longitud (len, 8 bytes).\n3. La capacidad (cap, 8 bytes).\n\nTrampa clásica: Si creas un subslices `b := a[1:3]`, ambos comparten el MISMO array subyacente. Modificar `b[0]` cambiará silenciosamente `a[1]`. Solo cuando ejecutas un `append()` que supera la capacidad (cap), Go asigna un nuevo array independiente en memoria duplicando la capacidad anterior.",
      "keyPoints": [
        "Estructura interna: puntero Data, entero Len y entero Cap.",
        "Compartición de memoria: sub-slices apuntan a los mismos datos a menos que se use `copy()`.",
        "Crecimiento inteligente: append duplica la capacidad para slices pequeños (~2x) y usa una tasa menor (~1.25x) para slices grandes."
      ]
    },
    "expertExpl": {
      "title": "Bajo Nivel, Rendimiento e Internals",
      "content": "En Go 1.21 se incorporó el paquete estándar `slices` (con funciones genéricas como `slices.Clone`, `slices.Compact`, `slices.Sort`) y las funciones nativas `min`, `max` y `clear`.\n\nFuga de memoria por slices (Sub-slice Memory Leak): Si tienes un slice gigante de 10 millones de bytes y tomas un rebanado de 5 bytes (`peque := grande[:5]`), todo el array gigante de 10MB permanece en memoria porque el recolector de basura (GC) ve que 'peque' mantiene vivo el puntero. La solución idiomática es copiar los 5 bytes con `slices.Clone()` o `copy()`.",
      "keyPoints": [
        "Sub-slice Memory Leak: Rebanar arrays grandes puede retener gigabytes en memoria; usar `slices.Clone(s)` para desacoplar.",
        "Pre-asignación con make: Si conoces el tamaño aproximado, usa `make([]T, 0, N)` para evitar re-asignaciones costosas de memoria en append.",
        "Three-index slicing: `s[i:j:k]` restringe la capacidad máxima del nuevo slice a `k-i`, protegiendo al slice original de sobreescrituras en append."
      ]
    },
    "evaluation": {
      "title": "Reto: Filtrado In-Place y Eliminación de Duplicados",
      "statement": "Escribe una función 'filtrarPares(nums []int) []int' que tome un slice de enteros y devuelva solo los números pares reutilizando el búfer de memoria original sin hacer asignaciones adicionales de memoria (técnica Zero-Allocation filter).",
      "starterCode": "package main\n\nimport \"fmt\"\n\nfunc filtrarPares(nums []int) []int {\n    // Implementa el filtrado in-place reutilizando nums[:0]\n}\n\nfunc main() {\n    datos := []int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}\n    resultado := filtrarPares(datos)\n    fmt.Println(\"Pares:\", resultado)\n}",
      "hint": "Crea una vista con longitud cero sobre el mismo array: b := nums[:0] y haz append en b.",
      "solution": "package main\n\nimport \"fmt\"\n\nfunc filtrarPares(nums []int) []int {\n    b := nums[:0]\n    for _, x := range nums {\n        if x%2 == 0 {\n            b = append(b, x)\n        }\n    }\n    return b\n}\n\nfunc main() {\n    datos := []int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}\n    resultado := filtrarPares(datos)\n    fmt.Println(\"Pares:\", resultado)\n}",
      "explanation": "La técnica 'in-place slice filtering' utiliza `nums[:0]`, que comparte el array existente con longitud 0 y la misma capacidad. Al recorrer nums y hacer append sobre 'b', se sobreescriben los primeros índices sin generar ninguna asignación en el heap (0 allocations)."
    },
    "externalLinks": [
      {
        "title": "Blog oficial de Go: Slices en Go: uso e internals",
        "url": "https://go.dev/blog/slices-intro",
        "description": "Artículo canónico sobre la anatomía de los slices en Go."
      },
      {
        "title": "Paquete slices (Biblioteca estándar de Go)",
        "url": "https://pkg.go.dev/slices",
        "description": "Documentación oficial de las utilidades genéricas del paquete slices."
      },
      {
        "title": "Especificación de Go: Expresiones de corte y slicing de arrays",
        "url": "https://go.dev/ref/spec#Slice_expressions",
        "description": "Sintaxis de rebanado simple y de 3 índices en la especificación."
      },
      {
        "title": "Go by Example Original: Slices",
        "url": "https://gobyexample.com/slices",
        "description": "Página oficial del ejemplo en Go by Example.",
        "type": "Referencia Original"
      }
    ],
    "code": "// Los _slices_ son un tipo de dato clave en Go, que proporcionan una\n// interfaz más potente y flexible para secuencias de datos que los arrays.\n\npackage main\n\nimport (\n\t\"fmt\"\n\t\"slices\"\n)\n\nfunc main() {\n\n\t// A diferencia de los arrays, los slices se tipan únicamente por los\n\t// elementos que contienen (no por el número de elementos).\n\t// Un slice no inicializado es igual a nil y tiene una longitud de 0.\n\tvar s []string\n\tfmt.Println(\"uninit:\", s, s == nil, len(s) == 0)\n\n\t// Para crear un slice vacío con longitud distinta de cero, usa\n\t// la función incorporada `make`. Aquí creamos un slice de `string`s de\n\t// longitud `3` (inicializado con valores cero).\n\t// Por defecto, la capacidad de un nuevo slice es igual a su longitud;\n\t// si sabemos de antemano que el slice crecerá, es posible\n\t// pasar una capacidad explícita como argumento adicional a `make`.\n\ts = make([]string, 3)\n\tfmt.Println(\"emp:\", s, \"len:\", len(s), \"cap:\", cap(s))\n\n\t// Podemos asignar y obtener valores exactamente igual que con los arrays.\n\ts[0] = \"a\"\n\ts[1] = \"b\"\n\ts[2] = \"c\"\n\tfmt.Println(\"set:\", s)\n\tfmt.Println(\"get:\", s[2])\n\n\t// `len` devuelve la longitud del slice como se espera.\n\tfmt.Println(\"len:\", len(s))\n\n\t// Además de estas operaciones básicas, los slices admiten\n\t// varias más que los hacen mucho más ricos que los arrays.\n\t// Una de ellas es la función incorporada `append`, la cual\n\t// devuelve un slice que contiene uno o más valores nuevos.\n\t// Ten en cuenta que debemos capturar el valor de retorno de\n\t// `append`, ya que podríamos recibir una nueva referencia de slice.\n\ts = append(s, \"d\")\n\ts = append(s, \"e\", \"f\")\n\tfmt.Println(\"apd:\", s)\n\n\t// Los slices también se pueden copiar con `copy`. Aquí creamos un\n\t// slice vacío `c` de la misma longitud que `s` y copiamos\n\t// en `c` el contenido de `s`.\n\tc := make([]string, len(s))\n\tcopy(c, s)\n\tfmt.Println(\"cpy:\", c)\n\n\t// Los slices admiten el operador de corte con la sintaxis\n\t// `slice[low:high]`. Por ejemplo, esto obtiene un sub-slice\n\t// de los elementos `s[2]`, `s[3]` y `s[4]`.\n\tl := s[2:5]\n\tfmt.Println(\"sl1:\", l)\n\n\t// Esto corta hasta (pero excluyendo) `s[5]`.\n\tl = s[:5]\n\tfmt.Println(\"sl2:\", l)\n\n\t// Y esto corta desde (e incluyendo) `s[2]`.\n\tl = s[2:]\n\tfmt.Println(\"sl3:\", l)\n\n\t// También podemos declarar e inicializar una variable de tipo slice\n\t// en una sola línea.\n\tt := []string{\"g\", \"h\", \"i\"}\n\tfmt.Println(\"dcl:\", t)\n\n\t// El paquete `slices` contiene una serie de funciones\n\t// de utilidad muy convenientes para slices.\n\tt2 := []string{\"g\", \"h\", \"i\"}\n\tif slices.Equal(t, t2) {\n\t\tfmt.Println(\"t == t2\")\n\t}\n\n\t// Los slices pueden componerse en estructuras de datos\n\t// multidimensionales. La longitud de los slices internos puede\n\t// variar, a diferencia de los arrays multidimensionales.\n\ttwoD := make([][]int, 3)\n\tfor i := range 3 {\n\t\tinnerLen := i + 1\n\t\ttwoD[i] = make([]int, innerLen)\n\t\tfor j := range innerLen {\n\t\t\ttwoD[i][j] = i + j\n\t\t}\n\t}\n\tfmt.Println(\"2d: \", twoD)\n}\n",
    "output": "$ go run slices.go\nuninit: [] true true\nemp: [  ] len: 3 cap: 3\nset: [a b c]\nget: c\nlen: 3\napd: [a b c d e f]\ncpy: [a b c d e f]\nsl1: [c d e]\nsl2: [a b c d e]\nsl3: [c d e f]\ndcl: [g h i]\nt == t2\n2d:  [[0] [1 2] [2 3 4]]\n\n# Consulta esta [excelente publicación de blog](https://go.dev/blog/slices-intro)\n# del equipo de Go para conocer más detalles sobre el diseño\n# y la implementación interna de los slices en Go.\n\n# Ahora que hemos visto arrays y slices, revisaremos la otra\n# estructura de datos asociativa integrada en Go: los mapas.\n",
    "officialUrl": "https://gobyexample.com/slices"
  },
  {
    "id": 10,
    "slug": "maps",
    "title": "Maps",
    "titleEs": "Mapas (Tablas Hash Asociativas)",
    "category": "Estructuras de Datos y Colecciones",
    "categorySlug": "estructuras-datos",
    "categoryIcon": "package",
    "difficulty": "Principiante",
    "summary": "Estructura asociativa clave-valor nativa basada en tablas hash eficientes con búsqueda en tiempo O(1).",
    "originalExpl": "Los mapas son el tipo asociativo integrado en Go (a veces llamado hashes o diccionarios en otros lenguajes). Se crean con make(map[clave]valor), se consultan, se eliminan con delete() y se comprueba su existencia con el modismo coma-ok.",
    "basicExpl": {
      "title": "Conceptos Fundamental para Principiantes",
      "content": "Un mapa almacena pares de información: una 'clave' (key) que sirve como identificador único y su 'valor' asociado (value).\n- Creación: `m := make(map[string]int)`.\n- Asignación: `m[\"manzanas\"] = 5`.\n- Consulta: `cantidad := m[\"manzanas\"]`.\n- Borrado: `delete(m, \"manzanas\")`.\n- Si buscas una clave que no existe, Go no genera error: devuelve el valor cero del tipo (por ejemplo, 0 para int o \"\" para string).",
      "keyPoints": [
        "Las claves pueden ser cualquier tipo comparable con '==' (strings, números, booleanos, structs simples).",
        "Un mapa no inicializado vale nil; intentar escribir en un mapa nil provoca pánico (panic).",
        "El modismo 'coma-ok': `valor, existe := m[clave]` para saber si la clave realmente estaba en el mapa."
      ]
    },
    "interExpl": {
      "title": "Mecanismos Internos y Buenas Prácticas",
      "content": "El modismo 'coma-ok' es esencial para distinguir entre una clave ausente y una clave presente cuyo valor sea el valor cero (ej. `m[\"cuenta\"] = 0`):\n```go\nif val, ok := m[\"cuenta\"]; ok {\n    // La clave existe realmente en el mapa\n}\n```\nEn Go, la iteración sobre mapas con `range` es deliberadamente ALEATORIA. El runtime introduce un número aleatorio al inicio de cada bucle para que los programadores no dependan del orden de inserción.",
      "keyPoints": [
        "Orden no determinista: el orden de iteración de un mapa cambia entre ejecuciones.",
        "Modismo coma-ok: `val, ok := m[key]` garantiza verificación precisa de existencia.",
        "Paquete estándar `maps`: desde Go 1.21 incluye utilidades genéricas como `maps.Clone`, `maps.Equal` y `maps.Copy`."
      ]
    },
    "expertExpl": {
      "title": "Bajo Nivel, Rendimiento e Internals",
      "content": "Internamente en el runtime de Go (archivo runtime/map.go), un mapa se implementa como una estructura `hmap` que contiene un arreglo de 'buckets' (baldes). Cada bucket contiene hasta 8 pares clave-valor y un arreglo de 8 bytes de control 'tophash' con los bits más significativos del hash criptográfico AES de la clave para acelerar las comparaciones.\n\n¡Los mapas de Go NO son seguros para concurrencia! Si dos goroutines leen y escriben en el mismo mapa sin sincronización, el runtime de Go aborta el programa inmediatamente con un 'fatal error: concurrent map writes' que no puede ser capturado por recover. Para concurrencia se debe usar sync.RWMutex o sync.Map.",
      "keyPoints": [
        "Estructura interna hmap y bmap: gestión por buckets con algoritmo de hashing AES hardware-accelerated.",
        "Fuga de memoria por vaciado: borrar claves con `delete()` no reduce la memoria asignada a los buckets del mapa (usar `clear(m)` en Go 1.21+).",
        "Crash fatal por carreras: lectura y escritura concurrente causa un crasheo irrecuperable por diseño."
      ]
    },
    "evaluation": {
      "title": "Reto: Contador de Frecuencia de Palabras con Modismo Coma-Ok",
      "statement": "Escribe una función 'contarPalabras(palabras []string) map[string]int' que tome un slice de palabras y devuelva un mapa con la frecuencia de cada una. Además, si la palabra 'prohibido' aparece, no debe contarse y debe imprimir una advertencia.",
      "starterCode": "package main\n\nimport \"fmt\"\n\nfunc contarPalabras(palabras []string) map[string]int {\n    // Tu implementación aquí\n}\n\nfunc main() {\n    lista := []string{\"go\", \"rust\", \"go\", \"python\", \"prohibido\", \"go\", \"rust\"}\n    frecuencias := contarPalabras(lista)\n    fmt.Println(frecuencias)\n}",
      "hint": "Crea el mapa con make. Usa un for con range. Si p == \"prohibido\", usa continue.",
      "solution": "package main\n\nimport \"fmt\"\n\nfunc contarPalabras(palabras []string) map[string]int {\n    frecuencias := make(map[string]int)\n    \n    for _, p := range palabras {\n        if p == \"prohibido\" {\n            fmt.Println(\"Advertencia: se omitió término prohibido\")\n            continue\n        }\n        frecuencias[p]++\n    }\n    return frecuencias\n}\n\nfunc main() {\n    lista := []string{\"go\", \"rust\", \"go\", \"python\", \"prohibido\", \"go\", \"rust\"}\n    frecuencias := contarPalabras(lista)\n    fmt.Println(\"Frecuencias:\", frecuencias)\n}",
      "explanation": "Al consultar una clave inexistente en un map[string]int, Go devuelve 0. Por tanto, `frecuencias[p]++` incrementa de 0 a 1 si es la primera vez que se ve la palabra, o de N a N+1 si ya existía, de forma limpia y directa."
    },
    "externalLinks": [
      {
        "title": "Blog oficial de Go: Maps en acción",
        "url": "https://go.dev/blog/maps",
        "description": "Artículo oficial explicando el funcionamiento de los mapas en Go."
      },
      {
        "title": "Paquete maps (Biblioteca estándar de Go)",
        "url": "https://pkg.go.dev/maps",
        "description": "Documentación oficial del paquete maps en la biblioteca estándar."
      },
      {
        "title": "Especificación de Go: Tipos map (tablas asociativas)",
        "url": "https://go.dev/ref/spec#Map_types",
        "description": "Especificación de los requisitos de tipos comparables para claves."
      },
      {
        "title": "Go by Example Original: Maps",
        "url": "https://gobyexample.com/maps",
        "description": "Página oficial del ejemplo en Go by Example.",
        "type": "Referencia Original"
      }
    ],
    "code": "// Los _maps_ (mapas) son el [tipo de dato asociativo](https://en.wikipedia.org/wiki/Associative_array)\n// integrado en Go (a veces denominados _hashes_ o _diccionarios_ en otros lenguajes).\n\npackage main\n\nimport (\n\t\"fmt\"\n\t\"maps\"\n)\n\nfunc main() {\n\n\t// Para crear un mapa vacío, usa la función incorporada `make`:\n\t// `make(map[key-type]val-type)`.\n\tm := make(map[string]int)\n\n\t// Establece pares clave/valor usando la sintaxis habitual\n\t// `name[key] = val`.\n\tm[\"k1\"] = 7\n\tm[\"k2\"] = 13\n\n\t// Imprimir un mapa con `fmt.Println` mostrará todos sus\n\t// pares clave/valor.\n\tfmt.Println(\"map:\", m)\n\n\t// Obtén el valor de una clave con `name[key]`.\n\tv1 := m[\"k1\"]\n\tfmt.Println(\"v1:\", v1)\n\n\t// Si la clave no existe, se devuelve el\n\t// [valor cero](https://go.dev/ref/spec#The_zero_value) del\n\t// tipo de valor correspondiente.\n\tv3 := m[\"k3\"]\n\tfmt.Println(\"v3:\", v3)\n\n\t// La función incorporada `len` devuelve el número de pares\n\t// clave/valor cuando se invoca sobre un mapa.\n\tfmt.Println(\"len:\", len(m))\n\n\t// La función incorporada `delete` elimina pares clave/valor\n\t// de un mapa.\n\tdelete(m, \"k2\")\n\tfmt.Println(\"map:\", m)\n\n\t// Para eliminar *todos* los pares clave/valor de un mapa, utiliza\n\t// la función incorporada `clear`.\n\tclear(m)\n\tfmt.Println(\"map:\", m)\n\n\t// El segundo valor de retorno opcional al obtener un valor\n\t// de un mapa indica si la clave estaba presente\n\t// en el mapa. Esto permite desambiguar entre claves inexistentes\n\t// y claves con valores cero como `0` o `\"\"`.\n\t// Aquí no necesitábamos el valor en sí, por lo que lo ignoramos\n\t// con el _identificador en blanco_ `_`.\n\t_, prs := m[\"k2\"]\n\tfmt.Println(\"prs:\", prs)\n\n\t// También puedes declarar e inicializar un mapa nuevo en\n\t// la misma línea con esta sintaxis.\n\tn := map[string]int{\"foo\": 1, \"bar\": 2}\n\tfmt.Println(\"map:\", n)\n\n\t// El paquete `maps` contiene una variedad de funciones\n\t// de utilidad convenientes para mapas.\n\tn2 := map[string]int{\"foo\": 1, \"bar\": 2}\n\tif maps.Equal(n, n2) {\n\t\tfmt.Println(\"n == n2\")\n\t}\n}\n",
    "output": "$ go run maps.go\nmap: map[k1:7 k2:13]\nv1: 7\nv3: 0\nlen: 2\nmap: map[k1:7]\nmap: map[]\nprs: false\nmap: map[bar:2 foo:1]\nn == n2\n\n# Ten en cuenta que los mapas aparecen en la forma `map[k:v k:v]`\n# cuando se imprimen con `fmt.Println`.\n",
    "officialUrl": "https://gobyexample.com/maps"
  },
  {
    "id": 11,
    "slug": "functions",
    "title": "Functions",
    "titleEs": "Funciones y Firmas",
    "category": "Funciones, Clausuras y Punteros",
    "categorySlug": "funciones-memoria",
    "categoryIcon": "tool",
    "difficulty": "Principiante",
    "summary": "Bloques fundamentales de lógica reutilizable con parámetros tipados explícitamente y sintaxis de retorno.",
    "originalExpl": "Las funciones son centrales en Go. Se definen con 'func nombre(param1 tipo, param2 tipo) retorno { ... }'. Cuando varios parámetros consecutivos tienen el mismo tipo, se puede omitir el tipo hasta el último parámetro.",
    "basicExpl": {
      "title": "Conceptos Fundamentales para Principiantes",
      "content": "Una función es una receta con nombre que recibe ingredientes (parámetros), hace un trabajo y te devuelve un resultado (valor de retorno).\n- Palabra clave `func`.\n- En Go el tipo se escribe DESPUÉS del nombre del parámetro: `func sumar(a int, b int) int`.\n- Atajo cómodo: si ambos son int, puedes escribir: `func sumar(a, b int) int`.\n- Se invocan simplemente escribiendo `resultado := sumar(3, 4)`.",
      "keyPoints": [
        "El tipo de retorno va después de los paréntesis de parámetros.",
        "Las funciones son ciudadanos de primera clase (first-class citizens): se pueden guardar en variables y pasar como argumentos.",
        "En Go no hay sobrecarga de funciones (no puedes tener dos funciones con el mismo nombre y diferentes parámetros)."
      ]
    },
    "interExpl": {
      "title": "Mecanismos Internos y Buenas Prácticas",
      "content": "Diseño sin sobrecarga (No Overloading): La ausencia deliberada de sobrecarga de funciones y valores por defecto en Go obliga a escribir código con nombres claros y auto-descriptivos (`NewServer()`, `NewServerWithTimeout(t)`).\n\nConvención idiomática: los nombres de funciones que inician con letra mayúscula (`CalcularTotal`) son públicas y exportadas fuera del paquete; las que inician con minúscula (`calcularTotal`) son privadas para el paquete actual.",
      "keyPoints": [
        "Exportabilidad por capitalización: Mayúscula = Público/Exportado, Minúscula = Privado.",
        "Paso de argumentos por valor: Go siempre pasa copias de los argumentos; para modificar el original se deben usar punteros.",
        "Valores de retorno con nombre (Named returns): `func div(a, b int) (res int) { ... }` documenta la firma pero debe usarse con moderación."
      ]
    },
    "expertExpl": {
      "title": "Bajo Nivel, Rendimiento e Internals",
      "content": "Desde Go 1.17, la arquitectura x86-64 y ARM64 utiliza una convención de llamada basada en registros (Register-based Calling Convention) en lugar de pasar los parámetros a través del stack de memoria. Los primeros 9 argumentos y retornos enteros/punteros se pasan directamente en registros de CPU (AX, BX, CX, DX, SI, DI, R8, R9, R10), lo que supuso una aceleración global de hasta un 12% en el tiempo de CPU.\n\nAdemás, el compilador realiza 'Function Inlining' para funciones pequeñas y sencillas, eliminando por completo el coste de la llamada.",
      "keyPoints": [
        "Register-based ABI: Paso de argumentos en registros de hardware sin tocar la memoria del stack.",
        "Function Inlining: Ver funciones inlined con `go build -gcflags=\"-m\"` (evita el prólogo y epílogo de función).",
        "Stack growth: Las goroutines inician con un stack pequeño de solo 2KB que crece dinámicamente si la anidación de llamadas lo requiere."
      ]
    },
    "evaluation": {
      "title": "Reto: Calculadora de Operación con Funciones como Parámetro",
      "statement": "Escribe una función 'aplicarOperacion(a, b int, op func(int, int) int) int' que reciba dos enteros y una función de operación matemática y devuelva el resultado. Luego úsala en main para sumar y multiplicar.",
      "starterCode": "package main\n\nimport \"fmt\"\n\n// Define aplicarOperacion aquí\n\nfunc main() {\n    // Llama a aplicarOperacion con suma y multiplicación\n}",
      "hint": "Define la firma de la función parámetro como 'op func(int, int) int'.",
      "solution": "package main\n\nimport \"fmt\"\n\nfunc aplicarOperacion(a, b int, op func(int, int) int) int {\n    return op(a, b)\n}\n\nfunc main() {\n    suma := func(x, y int) int { return x + y }\n    multi := func(x, y int) int { return x * y }\n    \n    fmt.Println(\"Suma:\", aplicarOperacion(10, 5, suma))\n    fmt.Println(\"Multiplicación:\", aplicarOperacion(10, 5, multi))\n}",
      "explanation": "En Go las funciones son ciudadanos de primera clase: pueden definirse como variables anónimas y pasarse como parámetros a funciones de orden superior, permitiendo patrones de diseño flexibles y funcionales."
    },
    "externalLinks": [
      {
        "title": "Tour interactivo de Go: Definición y retorno de funciones",
        "url": "https://go.dev/tour/basics/4",
        "description": "Conceptos y ejercicios básicos de funciones."
      },
      {
        "title": "Guía canónica Effective Go: Definición y uso de funciones",
        "url": "https://go.dev/doc/effective_go#functions",
        "description": "Guía idiomática sobre retornos con nombre y claridad de código."
      },
      {
        "title": "Especificación de Go: Declaración y firmas de funciones",
        "url": "https://go.dev/ref/spec#Function_declarations",
        "description": "Especificación de sintaxis y signaturas de funciones."
      },
      {
        "title": "Go by Example Original: Functions",
        "url": "https://gobyexample.com/functions",
        "description": "Página oficial del ejemplo en Go by Example.",
        "type": "Referencia Original"
      }
    ],
    "code": "// Las _funciones_ son una pieza central en Go. Aprenderemos sobre\n// funciones mediante varios ejemplos distintos.\n\npackage main\n\nimport \"fmt\"\n\n// Aquí tenemos una función que toma dos `int` y devuelve\n// su suma como un `int`.\nfunc plus(a int, b int) int {\n\n\t// Go requiere retornos explícitos; es decir, no retornará\n\t// automáticamente el valor de la última expresión evaluada.\n\treturn a + b\n}\n\n// Cuando tienes múltiples parámetros consecutivos del\n// mismo tipo, puedes omitir el nombre del tipo para los\n// parámetros con tipos idénticos hasta el parámetro final que\n// declara el tipo.\nfunc plusPlus(a, b, c int) int {\n\treturn a + b + c\n}\n\nfunc main() {\n\n\t// Llama a una función de la manera habitual, con\n\t// `name(args)`.\n\tres := plus(1, 2)\n\tfmt.Println(\"1+2 =\", res)\n\n\tres = plusPlus(1, 2, 3)\n\tfmt.Println(\"1+2+3 =\", res)\n}\n",
    "output": "$ go run functions.go\n1+2 = 3\n1+2+3 = 6\n\n# Hay muchas otras características en las funciones de Go. Una\n# de ellas son los valores de retorno múltiples, que veremos a continuación.\n",
    "officialUrl": "https://gobyexample.com/functions"
  },
  {
    "id": 12,
    "slug": "multiple-return-values",
    "title": "Multiple Return Values",
    "titleEs": "Retornos Múltiples de Funciones",
    "category": "Funciones, Clausuras y Punteros",
    "categorySlug": "funciones-memoria",
    "categoryIcon": "tool",
    "difficulty": "Principiante",
    "summary": "Capacidad nativa de retornar múltiples valores desde una función, pilar del manejo de errores en Go.",
    "originalExpl": "Go tiene soporte integrado para múltiples valores de retorno. Esta característica se utiliza con frecuencia en Go idiomático, por ejemplo, para devolver tanto los valores de resultado como los de error de una función.",
    "basicExpl": {
      "title": "Conceptos Fundamentales para Principiantes",
      "content": "En muchos lenguajes, una función solo puede devolver una cosa a la vez. En Go puedes devolver dos, tres o más valores envueltos entre paréntesis:\n```go\nfunc dividir(a, b int) (int, int) {\n    return a / b, a % b // cociente y residuo\n}\n```\nAl llamarla, recoges ambos valores: `cociente, resto := dividir(10, 3)`. Si no te interesa uno de los valores devueltos, puedes descartarlo usando el guión bajo `_` (blank identifier).",
      "keyPoints": [
        "Los tipos de retorno múltiples se agrupan entre paréntesis: `(int, error)`.",
        "El identificador en blanco `_` descarta valores que no necesitas sin generar errores de compilación.",
        "Es el pilar fundamental que usa Go para manejar errores (`resultado, err := func()`)."
      ]
    },
    "interExpl": {
      "title": "Mecanismos Internos y Buenas Prácticas",
      "content": "El modismo `(T, error)`: En lugar de usar excepciones pesadas (try/catch) que rompen el flujo normal de control, las funciones en Go devuelven el resultado esperado y un valor de tipo `error` como último argumento:\n```go\nval, err := strconv.Atoi(str)\nif err != nil {\n    // manejar error\n}\n```\nTambién existen los 'Naked Returns' (retornos desnudos) cuando se declaran retornos con nombre (`func f() (x, y int)` seguido de un simple `return`). Deben evitarse en funciones medianas o largas porque perjudican seriamente la legibilidad.",
      "keyPoints": [
        "Convención: el error siempre es el ÚLTIMO valor de retorno.",
        "Evitar naked returns en funciones complejas para mantener explícito qué se retorna.",
        "Descarta con `_` conscientemente; nunca ignores un 'error' sin justificación documentada."
      ]
    },
    "expertExpl": {
      "title": "Bajo Nivel, Rendimiento e Internals",
      "content": "Con el nuevo ABI basado en registros de Go 1.17+, los retornos múltiples no tienen sobrecoste de memoria en el stack si caben en los registros de salida de la CPU (RAX, RBX, etc.). Retornar `(int, bool)` o `(float64, error)` se realiza instantáneamente en registros de hardware sin requerir estructuras de tupla temporales ni asignaciones en el heap.\n\nEl compilador garantiza en tiempo de compilación que todos los caminos de ejecución de la función retornen exactamente la cantidad y tipos declarados.",
      "keyPoints": [
        "Zero-allocation tuples: Go no crea objetos de tupla en memoria para retornos múltiples.",
        "Asignación en registros: Múltiples registros de CPU se pueblan simultáneamente en la instrucción RET.",
        "Control estricto de tipos: Cada posición del retorno múltiple se valida exhaustivamente por el type checker."
      ]
    },
    "evaluation": {
      "title": "Reto: Función Estadísticas de un Slice",
      "statement": "Escribe una función 'obtenerMinMax(nums []int) (int, int, error)' que devuelva el valor mínimo, el valor máximo y un error si el slice está vacío. En el main, consume la función manejando el posible error.",
      "starterCode": "package main\n\nimport (\n    \"errors\"\n    \"fmt\"\n)\n\nfunc obtenerMinMax(nums []int) (int, int, error) {\n    // Tu lógica aquí\n}\n\nfunc main() {\n    // Prueba con slice lleno y vacío\n}",
      "hint": "Si len(nums) == 0, retorna 0, 0, errors.New(\"slice vacío\").",
      "solution": "package main\n\nimport (\n    \"errors\"\n    \"fmt\"\n)\n\nfunc obtenerMinMax(nums []int) (int, int, error) {\n    if len(nums) == 0 {\n        return 0, 0, errors.New(\"el slice no contiene elementos\")\n    }\n    min, max := nums[0], nums[0]\n    for _, x := range nums[1:] {\n        if x < min {\n            min = x\n        }\n        if x > max {\n            max = x\n        }\n    }\n    return min, max, nil\n}\n\nfunc main() {\n    datos := []int{15, 3, 27, -4, 42, 8}\n    min, max, err := obtenerMinMax(datos)\n    if err != nil {\n        fmt.Println(\"Error:\", err)\n        return\n    }\n    fmt.Printf(\"Mínimo: %d, Máximo: %d\\n\", min, max)\n}",
      "explanation": "La función devuelve tres valores: dos enteros y una interfaz error. Si el slice no tiene datos, retorna un error explícito. Si tiene datos, realiza el cálculo y retorna 'nil' como error, permitiendo al llamador verificar 'if err != nil' limpiamente."
    },
    "externalLinks": [
      {
        "title": "Tour interactivo de Go: Retorno de múltiples valores",
        "url": "https://go.dev/tour/basics/6",
        "description": "Práctica con retorno múltiple de valores."
      },
      {
        "title": "Guía canónica Effective Go: Retornos múltiples idiomáticos",
        "url": "https://go.dev/doc/effective_go#multiple-returns",
        "description": "Cómo los retornos múltiples eliminan la necesidad de pasar punteros de salida."
      },
      {
        "title": "Especificación de Go: Sentencias de retorno de valores",
        "url": "https://go.dev/ref/spec#Return_statements",
        "description": "Reglas de retorno en la especificación formal del lenguaje."
      },
      {
        "title": "Go by Example Original: Multiple Return Values",
        "url": "https://gobyexample.com/multiple-return-values",
        "description": "Página oficial del ejemplo en Go by Example.",
        "type": "Referencia Original"
      }
    ],
    "code": "// Go cuenta con soporte integrado para _valores de retorno múltiples_.\n// Esta característica se usa con frecuencia en Go idiomático, por ejemplo\n// para retornar tanto el resultado como el valor de error desde una función.\n\npackage main\n\nimport \"fmt\"\n\n// El `(int, int)` en la firma de esta función indica que\n// la función retorna 2 valores de tipo `int`.\nfunc vals() (int, int) {\n\treturn 3, 7\n}\n\nfunc main() {\n\n\t// Aquí utilizamos los 2 valores de retorno distintos de la\n\t// llamada mediante una _asignación múltiple_.\n\ta, b := vals()\n\tfmt.Println(a)\n\tfmt.Println(b)\n\n\t// Si solo deseas un subconjunto de los valores retornados,\n\t// utiliza el identificador en blanco `_`.\n\t_, c := vals()\n\tfmt.Println(c)\n}\n",
    "output": "$ go run multiple-return-values.go\n3\n7\n7\n\n# Aceptar un número variable de argumentos es otra característica\n# elegante de las funciones en Go; veremos esto a continuación.\n",
    "officialUrl": "https://gobyexample.com/multiple-return-values"
  },
  {
    "id": 13,
    "slug": "variadic-functions",
    "title": "Variadic Functions",
    "titleEs": "Funciones Variádicas (...)",
    "category": "Funciones, Clausuras y Punteros",
    "categorySlug": "funciones-memoria",
    "categoryIcon": "tool",
    "difficulty": "Principiante",
    "summary": "Funciones que pueden aceptar cualquier número de argumentos finales mediante la sintaxis de elipsis (...).",
    "originalExpl": "Las funciones variádicas pueden llamarse con cualquier cantidad de argumentos finales. Por ejemplo, fmt.Println es una función variádica común. Se declaran con '...tipo' antes del tipo del último parámetro.",
    "basicExpl": {
      "title": "Conceptos Fundamentales para Principiantes",
      "content": "A veces no sabes de antemano cuántos valores te van a pasar: ¿2, 5 o 20? Una función variádica acepta una cantidad variable de argumentos.\n- Se coloca `...` antes del tipo: `func sumar(numeros ...int) int`.\n- Dentro de la función, 'numeros' se comporta exactamente como un slice normal (`[]int`).\n- Puedes llamarla pasando valores sueltos: `sumar(1, 2, 3)` o desempaquetando un slice existente con `...`: `sumar(miSlice...)`.",
      "keyPoints": [
        "Solo el ÚLTIMO parámetro de la función puede ser variádico.",
        "Dentro del cuerpo de la función, el parámetro variádico es de tipo slice ([]T).",
        "Para pasar un slice existente, se añade `...` al final: `miFuncion(miSlice...)`."
      ]
    },
    "interExpl": {
      "title": "Mecanismos Internos y Buenas Prácticas",
      "content": "El patrón 'Functional Options' (Opciones Funcionales): Es uno de los patrones arquitectónicos más famosos de Go para configurar objetos con parámetros opcionales y valores por defecto sin recurrir a constructores sobrecargados:\n```go\ntype Option func(*Server)\nfunc WithTimeout(d time.Duration) Option { ... }\nfunc NewServer(addr string, opts ...Option) *Server { ... }\n```\nEsto permite invocar `NewServer(\":8080\")` o `NewServer(\":8080\", WithTimeout(5*time.Second))` de forma limpia y extensible.",
      "keyPoints": [
        "Desempaquetado de slices: `nums...` pasa la referencia del slice sin reempaquetarlo.",
        "Patrón Functional Options: estándar de facto para configuraciones complejas en bibliotecas de Go.",
        "Paso de cero argumentos: llamar a una función variádica sin argumentos pasa un slice vacío (len == 0)."
      ]
    },
    "expertExpl": {
      "title": "Bajo Nivel, Rendimiento e Internals",
      "content": "Cuando llamas a una función variádica pasando argumentos individuales (`sumar(1, 2, 3)`), el compilador de Go genera silenciosamente una instrucción para asignar un array temporal en el stack o heap y crear un sliceHeader que lo envuelva.\n\nEn caminos de ejecución extremadamente críticos (hot paths), invocar funciones variádicas pasando argumentos sueltos repetidamente dentro de un bucle puede generar trabajo adicional para el recolector de basura si los argumentos escapan al heap (como sucede con `fmt.Sprintf` debido a la conversión a `interface{}`). Pre-asignar el slice reutilizable elimina estas asignaciones.",
      "keyPoints": [
        "Asignación oculta: pasar literales individuales crea un array/slice temporal en tiempo de compilación/ejecución.",
        "Optimización de interfaz: funciones como `fmt.Print(a ...any)` convierten cada argumento a interface{}, lo que puede forzar escape al heap.",
        "Zero-alloc reuse: reutilizar un slice propio con `fn(miSlice...)` evita la creación del array temporal por llamada."
      ]
    },
    "evaluation": {
      "title": "Reto: Constructor de Rutas con Separador Personalizado",
      "statement": "Escribe una función variádica 'unirRuta(separador string, segmentos ...string) string' que una todos los segmentos dados utilizando el separador especificado, omitiendo los segmentos que sean cadenas vacías.",
      "starterCode": "package main\n\nimport (\n    \"fmt\"\n    \"strings\"\n)\n\nfunc unirRuta(separador string, segmentos ...string) string {\n    // Tu implementación aquí\n}\n\nfunc main() {\n    fmt.Println(unirRuta(\"/\", \"usr\", \"local\", \"bin\"))\n    fmt.Println(unirRuta(\"/\", \"api\", \"\", \"v1\", \"usuarios\"))\n}",
      "hint": "Filtra los segmentos no vacíos en un nuevo slice y usa strings.Join.",
      "solution": "package main\n\nimport (\n    \"fmt\"\n    \"strings\"\n)\n\nfunc unirRuta(separador string, segmentos ...string) string {\n    validos := make([]string, 0, len(segmentos))\n    for _, seg := range segmentos {\n        if seg != \"\" {\n            validos = append(validos, seg)\n        }\n    }\n    return strings.Join(validos, separador)\n}\n\nfunc main() {\n    fmt.Println(unirRuta(\"/\", \"usr\", \"local\", \"bin\"))\n    fmt.Println(unirRuta(\"/\", \"api\", \"\", \"v1\", \"usuarios\"))\n}",
      "explanation": "La función acepta un número arbitrario de cadenas gracias a `segmentos ...string`. Se preasigna capacidad en el slice 'validos' según la longitud de segmentos para evitar reasignaciones, filtrando strings vacíos antes de usar strings.Join."
    },
    "externalLinks": [
      {
        "title": "Tour interactivo de Go: Paso de slices a funciones variádicas",
        "url": "https://go.dev/tour/moretypes/15",
        "description": "Uso de slices con funciones variádicas."
      },
      {
        "title": "Especificación de Go: Paso de argumentos a parámetros variádicos",
        "url": "https://go.dev/ref/spec#Passing_arguments_to_..._parameters",
        "description": "Reglas del compilador para el paso de parámetros variádicos."
      },
      {
        "title": "Rob Pike: Funciones autorreferenciales y el patrón de opciones funcionales",
        "url": "https://commandcenter.blogspot.com/2014/01/self-referential-functions-and-design.html",
        "description": "Artículo de Rob Pike donde introduce el patrón Functional Options."
      },
      {
        "title": "Go by Example Original: Variadic Functions",
        "url": "https://gobyexample.com/variadic-functions",
        "description": "Página oficial del ejemplo en Go by Example.",
        "type": "Referencia Original"
      }
    ],
    "code": "// Las [_funciones variádicas_](https://en.wikipedia.org/wiki/Variadic_function)\n// pueden invocarse con cualquier número de argumentos finales.\n// Por ejemplo, `fmt.Println` es una función variádica habitual.\n\npackage main\n\nimport \"fmt\"\n\n// Aquí tenemos una función que aceptará un número arbitrario\n// de enteros `int` como argumentos.\nfunc sum(nums ...int) {\n\tfmt.Print(nums, \" \")\n\ttotal := 0\n\t// Dentro de la función, el tipo de `nums` es\n\t// equivalente a `[]int`. Podemos invocar `len(nums)`,\n\t// iterar sobre él con `range`, etc.\n\tfor _, num := range nums {\n\t\ttotal += num\n\t}\n\tfmt.Println(total)\n}\n\nfunc main() {\n\n\t// Las funciones variádicas pueden invocarse de la forma convencional\n\t// con argumentos individuales separados por comas.\n\tsum(1, 2)\n\tsum(1, 2, 3)\n\n\t// Si ya dispones de múltiples argumentos dentro de un slice,\n\t// aplícalos a una función variádica usando la sintaxis\n\t// `func(slice...)` de esta manera.\n\tnums := []int{1, 2, 3, 4}\n\tsum(nums...)\n}\n",
    "output": "$ go run variadic-functions.go\n[1 2] 3\n[1 2 3] 6\n[1 2 3 4] 10\n\n# Otro aspecto fundamental de las funciones en Go es su capacidad\n# de formar closures, lo cual veremos a continuación.\n",
    "officialUrl": "https://gobyexample.com/variadic-functions"
  },
  {
    "id": 14,
    "slug": "closures",
    "title": "Closures",
    "titleEs": "Clausuras (Closures) y Funciones Anónimas",
    "category": "Funciones, Clausuras y Punteros",
    "categorySlug": "funciones-memoria",
    "categoryIcon": "tool",
    "difficulty": "Intermedio",
    "summary": "Funciones anónimas que capturan y mantienen el estado de variables de su ámbito léxico circundante.",
    "originalExpl": "Go soporta funciones anónimas, las cuales pueden formar clausuras (closures). Las funciones anónimas son útiles cuando quieres definir una función en línea sin tener que nombrarla.",
    "basicExpl": {
      "title": "Conceptos Fundamentales para Principiantes",
      "content": "Una función anónima es una función sin nombre que puedes definir directamente donde la necesitas. Una clausura (closure) es una función anónima que 'recuerda' y tiene acceso a las variables que estaban a su alrededor cuando fue creada, incluso después de que la función que la contenía haya terminado.\n\nAnalogía: Piensa en una clausura como una pequeña mochila que la función lleva consigo; dentro de la mochila guarda las variables que vio nacer, manteniendo sus valores vivos.",
      "keyPoints": [
        "Se definen en línea con `func() { ... }`.",
        "Pueden ejecutarse inmediatamente: `func() { fmt.Println(\"hola\") }()`.",
        "Mantienen el estado de variables externas entre sucesivas llamadas."
      ]
    },
    "interExpl": {
      "title": "Mecanismos Internos y Buenas Prácticas",
      "content": "Captura por referencia: En Go, las clausuras capturan variables por REFERENCIA, no por valor. Si la variable externa cambia, la clausura verá el nuevo valor, y si la clausura modifica la variable, la variable externa también cambiará.\n\nEsto es muy útil para fábricas de funciones (function factories), generadores de identificadores secuenciales, middlewares HTTP y manejadores de eventos.",
      "keyPoints": [
        "Captura por referencia: la clausura y el entorno externo comparten la misma dirección de memoria.",
        "Fábrica de generadores: funciones que retornan funciones con estado encapsulado privado.",
        "Middleware HTTP: patrón estándar en frameworks web para envolver http.HandlerFunc."
      ]
    },
    "expertExpl": {
      "title": "Bajo Nivel, Rendimiento e Internals",
      "content": "A nivel de memoria, cuando una función anónima captura una variable local que debe sobrevivir tras el retorno de la función externa, el compilador activa el 'Escape Analysis' y mueve esa variable automáticamente del Stack al Heap.\n\nLa clausura se representa internamente mediante un objeto que contiene dos punteros: un puntero al código de la función en la sección de texto (.text) y un puntero a una estructura en el Heap que almacena las variables capturadas (el entorno de captura). Esto añade una asignación de memoria dinámica y una indirección al invocarla.",
      "keyPoints": [
        "Heap Escape forzado: las variables capturadas por clausuras que sobreviven a la función escapan al Heap.",
        "Closure Layout: struct { F uintptr; Env *capturedVars } a nivel de código generado.",
        "Coste de indirección: invocar una clausura tiene una ligera sobrecarga frente a una función estática normal."
      ]
    },
    "evaluation": {
      "title": "Reto: Generador de Acumulador con Límite Máximo",
      "statement": "Crea una función 'crearAcumulador(limite int) func(int) (int, bool)' que devuelva una clausura. La clausura debe sumar el valor pasado al total acumulado interno. Si la suma supera el 'limite', debe rechazar la suma, mantener el valor anterior y devolver (total, false). Si cabe, suma y devuelve (total, true).",
      "starterCode": "package main\n\nimport \"fmt\"\n\nfunc crearAcumulador(limite int) func(int) (int, bool) {\n    // Implementa la clausura aquí\n}\n\nfunc main() {\n    cuenta := crearAcumulador(50)\n    fmt.Println(cuenta(20)) // 20, true\n    fmt.Println(cuenta(25)) // 45, true\n    fmt.Println(cuenta(10)) // 45, false (superaría 50)\n}",
      "hint": "Declara una variable 'total := 0' dentro de crearAcumulador y captúrala en la función anónima retornada.",
      "solution": "package main\n\nimport \"fmt\"\n\nfunc crearAcumulador(limite int) func(int) (int, bool) {\n    total := 0\n    return func(valor int) (int, bool) {\n        if total+valor > limite {\n            return total, false\n        }\n        total += valor\n        return total, true\n    }\n}\n\nfunc main() {\n    cuenta := crearAcumulador(50)\n    res1, ok1 := cuenta(20)\n    fmt.Printf(\"Total: %d, Aceptado: %t\\n\", res1, ok1)\n    \n    res2, ok2 := cuenta(25)\n    fmt.Printf(\"Total: %d, Aceptado: %t\\n\", res2, ok2)\n    \n    res3, ok3 := cuenta(10)\n    fmt.Printf(\"Total: %d, Aceptado: %t\\n\", res3, ok3)\n}",
      "explanation": "La variable 'total' queda encapsulada dentro del entorno de la clausura retornada. Nadie desde fuera puede modificar 'total' directamente, logrando un perfecto encapsulamiento de estado privado sin necesidad de definir una estructura o clase formal."
    },
    "externalLinks": [
      {
        "title": "Tour interactivo de Go: Clausuras y closures de función",
        "url": "https://go.dev/tour/moretypes/25",
        "description": "Ejercicios interactivos con clausuras y acumuladores."
      },
      {
        "title": "Especificación de Go: Literales de función y funciones anónimas",
        "url": "https://go.dev/ref/spec#Function_literals",
        "description": "Sintaxis de literales de función y clausuras en la especificación."
      },
      {
        "title": "Guía canónica Effective Go: Funciones como valores de primera clase",
        "url": "https://go.dev/doc/effective_go#functions",
        "description": "Buenas prácticas con funciones como valores de primera clase."
      },
      {
        "title": "Go by Example Original: Closures",
        "url": "https://gobyexample.com/closures",
        "description": "Página oficial del ejemplo en Go by Example.",
        "type": "Referencia Original"
      }
    ],
    "code": "// Go admite [_funciones anónimas_](https://en.wikipedia.org/wiki/Anonymous_function),\n// que pueden formar <a href=\"https://en.wikipedia.org/wiki/Closure_(computer_science)\"><em>closures</em></a> (clausuras).\n// Las funciones anónimas resultan muy útiles cuando deseas definir\n// una función en línea sin necesidad de asignarle un nombre.\n\npackage main\n\nimport \"fmt\"\n\n// Esta función `intSeq` retorna otra función, la cual\n// definimos de manera anónima en el cuerpo de `intSeq`. La\n// función retornada _captura_ la variable `i` para\n// formar un closure.\nfunc intSeq() func() int {\n\ti := 0\n\treturn func() int {\n\t\ti++\n\t\treturn i\n\t}\n}\n\nfunc main() {\n\n\t// Llamamos a `intSeq`, asignando el resultado (una función)\n\t// a `nextInt`. Este valor de función captura su\n\t// propio valor de `i`, el cual se actualizará cada vez\n\t// que invoquemos `nextInt`.\n\tnextInt := intSeq()\n\n\t// Observa el efecto del closure invocando `nextInt`\n\t// varias veces consecutivas.\n\tfmt.Println(nextInt())\n\tfmt.Println(nextInt())\n\tfmt.Println(nextInt())\n\n\t// Para confirmar que el estado es único para esa\n\t// función en particular, creamos y probamos una nueva instancia.\n\tnewInts := intSeq()\n\tfmt.Println(newInts())\n}\n",
    "output": "$ go run closures.go\n1\n2\n3\n1\n\n# La última característica de funciones que examinaremos por ahora\n# es la recursión.\n",
    "officialUrl": "https://gobyexample.com/closures"
  },
  {
    "id": 15,
    "slug": "recursion",
    "title": "Recursion",
    "titleEs": "Recursión y Límites de Pila",
    "category": "Funciones, Clausuras y Punteros",
    "categorySlug": "funciones-memoria",
    "categoryIcon": "tool",
    "difficulty": "Intermedio",
    "summary": "Funciones que se invocan a sí mismas para resolver problemas dividiéndolos en subproblemas idénticos.",
    "originalExpl": "Go soporta funciones recursivas. Un ejemplo clásico es el cálculo del factorial o la secuencia de Fibonacci. Para declarar una clausura recursiva en Go, se debe declarar la variable primero con su tipo explícito.",
    "basicExpl": {
      "title": "Conceptos Fundamentales para Principiantes",
      "content": "La recursión ocurre cuando una función se llama a sí misma para resolver una versión más pequeña del mismo problema.\nTodo algoritmo recursivo necesita dos componentes obligatorios:\n1. Caso Base: La condición de parada que devuelve una respuesta inmediata sin volverse a llamar. Sin él, el programa se llamaría infinitamente hasta colapsar.\n2. Caso Recursivo: La parte donde la función se llama a sí misma acercándose paso a paso al caso base.",
      "keyPoints": [
        "El caso base es indispensable para evitar bucles infinitos.",
        "Para hacer una función anónima recursiva, debes declarar la variable antes: `var fib func(n int) int`.",
        "Estructuras como árboles y JSON jerárquicos se navegan de forma natural con recursión."
      ]
    },
    "interExpl": {
      "title": "Mecanismos Internos y Buenas Prácticas",
      "content": "El stack de Go es dinámico y contiguo (Contiguous Stacks): a diferencia de C/C++, donde el stack de un hilo del sistema operativo tiene un tamaño fijo (típicamente 1MB a 8MB) que colapsa con un 'Stack Overflow' violento, en Go cada goroutine arranca con un stack de 2KB. Si una función recursiva profunda necesita más memoria, el runtime de Go asigna un nuevo bloque continuo del doble de tamaño y copia el stack anterior sin que el programa falle.\n\nSin embargo, la recursión profunda consume memoria y CPU; en situaciones de alto rendimiento suele ser preferible una versión iterativa con bucle 'for'.",
      "keyPoints": [
        "Contiguous Stacks: El stack de Go crece automáticamente hasta un límite configurado (por defecto 1GB en 64-bit).",
        "Sin optimización de llamada final (No Tail Call Optimization): Go NO implementa TCO; cada llamada recursiva consume un marco de stack.",
        "Iterativo vs Recursivo: Siempre que el algoritmo sea secuencial simple (ej. factorial), la versión iterativa es más veloz."
      ]
    },
    "expertExpl": {
      "title": "Bajo Nivel, Rendimiento e Internals",
      "content": "En el prólogo de cada función compilada, Go inserta unas pocas instrucciones ensamblador (`CMPQ SP, 16(R14)` / `JLS morestack`) que comparan el puntero de pila actual con el límite disponible de la goroutine. Si se sobrepasa, se invoca a `runtime.morestack`, que detiene temporalmente la ejecución, asigna un nuevo bloque de memoria contiguo en el heap, actualiza todos los punteros del stack para evitar punteros huérfanos y reanuda la ejecución.\n\nDebido a que Go no soporta Tail Call Optimization (TCO) intencionadamente (para preservar trazas de depuración de pánico y profiling exactos), algoritmos con O(N) marcos de llamada deben vigilarse para evitar agotar el límite de memoria del proceso.",
      "keyPoints": [
        "morestack prologue: Verificación de límite de stack en cada llamada de función en ensamblador.",
        "Preservación de Stack Traces: La ausencia de TCO garantiza que pánicos y perfiles de pprof muestren cada marco de llamada completo.",
        "Límite máximo de stack: configurable mediante `debug.SetMaxStack` (por defecto 1GB en 64 bits, 250MB en 32 bits)."
      ]
    },
    "evaluation": {
      "title": "Reto: Secuencia de Fibonacci con Memorización (Memoization)",
      "statement": "El cálculo recursivo ingenuo de Fibonacci tiene complejidad exponencial O(2^N). Implementa una función recursiva 'fibMemo(n int, memo map[int]int) int' que use un mapa para almacenar los resultados ya calculados y lograr complejidad O(N).",
      "starterCode": "package main\n\nimport \"fmt\"\n\nfunc fibMemo(n int, memo map[int]int) int {\n    // Implementa el caso base y la consulta en el mapa memo\n}\n\nfunc main() {\n    memo := make(map[int]int)\n    fmt.Println(\"Fibonacci(40):\", fibMemo(40, memo))\n}",
      "hint": "Si 'n' está en memo, retorna su valor. Si n <= 1, retorna n. Si no, calcula, guárdalo en memo y retorna.",
      "solution": "package main\n\nimport \"fmt\"\n\nfunc fibMemo(n int, memo map[int]int) int {\n    if n <= 1 {\n        return n\n    }\n    if val, ok := memo[n]; ok {\n        return val\n    }\n    memo[n] = fibMemo(n-1, memo) + fibMemo(n-2, memo)\n    return memo[n]\n}\n\nfunc main() {\n    memo := make(map[int]int)\n    fmt.Println(\"Fibonacci(10):\", fibMemo(10, memo))\n    fmt.Println(\"Fibonacci(40):\", fibMemo(40, memo))\n}",
      "explanation": "Sin memorización, fib(40) requeriría más de un billón de operaciones recursivas redundantes. Con el mapa 'memo', cada valor de 0 a N se calcula exactamente una sola vez, reduciendo el tiempo de ejecución de varios segundos a menos de un milisegundo."
    },
    "externalLinks": [
      {
        "title": "Tour interactivo de Go: Ejercicio interactivo: Clausura de Fibonacci",
        "url": "https://go.dev/tour/moretypes/26",
        "description": "Ejercicio práctico de Fibonacci en el tour oficial."
      },
      {
        "title": "Dave Cheney: Por qué Go no implementa optimización de llamadas de cola",
        "url": "https://dave.cheney.net/",
        "description": "Análisis técnico de por qué Go no incluye TCO para preservar los stack traces."
      },
      {
        "title": "Arquitectura del runtime de Go: Pilas contiguas (Contiguous Stacks)",
        "url": "https://go.dev/doc/go1.3#stacks",
        "description": "Notas históricas de la arquitectura de stacks contiguos en el runtime de Go."
      },
      {
        "title": "Go by Example Original: Recursion",
        "url": "https://gobyexample.com/recursion",
        "description": "Página oficial del ejemplo en Go by Example.",
        "type": "Referencia Original"
      }
    ],
    "code": "// Go admite\n// <a href=\"https://en.wikipedia.org/wiki/Recursion_(computer_science)\"><em>funciones recursivas</em></a>.\n// Aquí tenemos un ejemplo clásico de cálculo factorial.\n\npackage main\n\nimport \"fmt\"\n\n// Esta función `fact` se llama a sí misma hasta alcanzar el\n// caso base de `fact(0)`.\nfunc fact(n int) int {\n\tif n == 0 {\n\t\treturn 1\n\t}\n\treturn n * fact(n-1)\n}\n\nfunc main() {\n\tfmt.Println(fact(7))\n\n\t// Las funciones anónimas también pueden ser recursivas, pero esto requiere\n\t// declarar explícitamente una variable con `var` para almacenar\n\t// la función antes de definirla.\n\tvar fib func(n int) int\n\n\tfib = func(n int) int {\n\t\tif n < 2 {\n\t\t\treturn n\n\t\t}\n\n\t\t// Dado que `fib` fue declarada previamente en `main`, Go\n\t\t// sabe exactamente a qué función llamar con `fib` aquí.\n\t\treturn fib(n-1) + fib(n-2)\n\t}\n\n\tfmt.Println(fib(7))\n}\n",
    "output": "$ go run recursion.go \n5040\n13\n",
    "officialUrl": "https://gobyexample.com/recursion"
  },
  {
    "id": 16,
    "slug": "range-over-built-in-types",
    "title": "Range over Built-in Types",
    "titleEs": "Iteración con Range en Tipos Nativos",
    "category": "Estructuras de Datos y Colecciones",
    "categorySlug": "estructuras-datos",
    "categoryIcon": "package",
    "difficulty": "Principiante",
    "summary": "La instrucción 'range' itera de forma uniforme sobre slices, arrays, mapas, strings y canales.",
    "originalExpl": "'range' itera sobre elementos en una variedad de estructuras de datos. En slices y arrays devuelve el índice y el valor; en mapas devuelve la clave y el valor; en cadenas itera sobre puntos de código Unicode (runas).",
    "basicExpl": {
      "title": "Conceptos Fundamentales para Principiantes",
      "content": "'range' es la forma más limpia y cómoda de recorrer colecciones en Go sin preocuparte por contadores manuales o índices fuera de rango:\n1. En Slices y Arrays: `for indice, valor := range miSlice`.\n2. En Mapas: `for clave, valor := range miMapa`.\n3. En Strings: itera carácter por carácter (runas Unicode), devolviendo el byte de inicio y la runa.\n4. Si solo quieres los valores, descartas el índice con `_`: `for _, valor := range miSlice`.\n5. Si solo quieres los índices o claves: `for indice := range miSlice`.",
      "keyPoints": [
        "Devuelve 2 valores en slices (índice, valor) y mapas (clave, valor).",
        "El identificador `_` permite ignorar el índice o valor si no se necesita.",
        "En cadenas de texto decodifica caracteres UTF-8 en runas automáticas."
      ]
    },
    "interExpl": {
      "title": "Mecanismos Internos y Buenas Prácticas",
      "content": "Copia de valor en la iteración: La variable 'valor' en `for _, v := range slice` recibe una COPIA de cada elemento, no un puntero al elemento dentro del slice. Modificar `v.Nombre = \"Nuevo\"` dentro del bucle no modificará el slice original a menos que el slice sea de punteros (`[]*Persona`) o que accedas directamente con el índice: `slice[i].Nombre = \"Nuevo\"`.\n\nDesde Go 1.22, cada iteración tiene su propia variable aislada, eliminando definitivamente el riesgo de capturar punteros a la variable de bucle.",
      "keyPoints": [
        "Copia local: modificar la variable receptora 'v' no altera los datos originales en el slice.",
        "Mutación segura: para mutar elementos usar la indexación directa `slice[i] = nuevoValor`.",
        "Strings con caracteres multilingües: range en strings salta índices según el tamaño en bytes de cada carácter UTF-8 (1 a 4 bytes)."
      ]
    },
    "expertExpl": {
      "title": "Bajo Nivel, Rendimiento e Internals",
      "content": "Al compilar `range`, Go evalúa la expresión de la colección una sola vez antes de iniciar el bucle. Para slices grandes de structs pesados (`type Grande struct { Data [1024]byte }`), escribir `for _, v := range s` copia 1024 bytes en cada iteración a la variable temporal 'v', mermando el rendimiento y la saturación de los registros.\n\nLa técnica experta de alto rendimiento es omitir el segundo valor y acceder por índice: `for i := range s { usar(&s[i]) }`, eliminando el 100% de las copias intermedias en memoria.",
      "keyPoints": [
        "Zero-copy iteration: `for i := range heavySlice` evita copiar structs pesados en cada ciclo.",
        "UTF-8 Decoding: en strings, range invoca a `utf8.DecodeRuneInString` en cada paso.",
        "Evaluación única: la longitud del slice se captura al inicio del bucle; agregar elementos dentro del bucle con append no provoca un bucle infinito."
      ]
    },
    "evaluation": {
      "title": "Reto: Inversión de Mapa (Invert Map Keys/Values)",
      "statement": "Escribe una función 'invertirMapa(original map[string]int) map[int]string' que utilice 'range' para invertir claves y valores. Si hay valores repetidos en el mapa original, el mapa invertido debe conservar cualquiera de las claves.",
      "starterCode": "package main\n\nimport \"fmt\"\n\nfunc invertirMapa(original map[string]int) map[int]string {\n    // Tu código aquí\n}\n\nfunc main() {\n    dicc := map[string]int{\"uno\": 1, \"dos\": 2, \"tres\": 3}\n    fmt.Println(invertirMapa(dicc))\n}",
      "hint": "Crea el nuevo mapa con make(map[int]string, len(original)). Recorre con for k, v := range original.",
      "solution": "package main\n\nimport \"fmt\"\n\nfunc invertirMapa(original map[string]int) map[int]string {\n    invertido := make(map[int]string, len(original))\n    for k, v := range original {\n        invertido[v] = k\n    }\n    return invertido\n}\n\nfunc main() {\n    dicc := map[string]int{\"uno\": 1, \"dos\": 2, \"tres\": 3}\n    resultado := invertirMapa(dicc)\n    fmt.Println(\"Invertido:\", resultado)\n}",
      "explanation": "El bucle 'for k, v := range original' extrae limpiamente cada par clave/valor. Al asignar 'invertido[v] = k', el valor entero se convierte en la nueva clave y el string original en el valor asociado."
    },
    "externalLinks": [
      {
        "title": "Tour interactivo de Go: Iteración range sobre slices y mapas",
        "url": "https://go.dev/tour/moretypes/16",
        "description": "Ejercicios con el iterador range en slices y mapas."
      },
      {
        "title": "Guía canónica Effective Go: Cláusula de iteración range",
        "url": "https://go.dev/doc/effective_go#for",
        "description": "Guía idiomática sobre cómo usar range de forma limpia y eficiente."
      },
      {
        "title": "Especificación de Go: Cláusulas de iteración sobre colecciones",
        "url": "https://go.dev/ref/spec#For_statements",
        "description": "Especificación de todas las variantes sintácticas de range."
      },
      {
        "title": "Go by Example Original: Range over Built-in Types",
        "url": "https://gobyexample.com/range-over-built-in-types",
        "description": "Página oficial del ejemplo en Go by Example.",
        "type": "Referencia Original"
      }
    ],
    "code": "// `range` itera sobre los elementos en una variedad de\n// estructuras de datos integradas. Veamos cómo\n// usar `range` con algunas de las estructuras de datos\n// que ya hemos aprendido.\n\npackage main\n\nimport \"fmt\"\n\nfunc main() {\n\n\t// Aquí usamos `range` para sumar los números de un slice.\n\t// Los arrays funcionan exactamente igual.\n\tnums := []int{2, 3, 4}\n\tsum := 0\n\tfor _, num := range nums {\n\t\tsum += num\n\t}\n\tfmt.Println(\"sum:\", sum)\n\n\t// `range` en arrays y slices proporciona tanto el\n\t// índice como el valor de cada elemento. Arriba no\n\t// necesitábamos el índice, por lo que lo ignoramos con el\n\t// identificador en blanco `_`. Sin embargo, a veces sí\n\t// necesitamos los índices.\n\tfor i, num := range nums {\n\t\tif num == 3 {\n\t\t\tfmt.Println(\"index:\", i)\n\t\t}\n\t}\n\n\t// `range` en mapas itera sobre los pares clave/valor.\n\tkvs := map[string]string{\"a\": \"apple\", \"b\": \"banana\"}\n\tfor k, v := range kvs {\n\t\tfmt.Printf(\"%s -> %s\\n\", k, v)\n\t}\n\n\t// `range` también puede iterar únicamente sobre las claves de un mapa.\n\tfor k := range kvs {\n\t\tfmt.Println(\"key:\", k)\n\t}\n\n\t// `range` en cadenas itera sobre puntos de código Unicode\n\t// (code points). El primer valor es el índice de byte inicial\n\t// de la `rune` y el segundo es la `rune` en sí misma.\n\t// Consulta [Cadenas y Runas](strings-and-runes) para más\n\t// detalles.\n\tfor i, c := range \"go\" {\n\t\tfmt.Println(i, c)\n\t}\n}\n",
    "output": "$ go run range-over-built-in-types.go\nsum: 9\nindex: 1\na -> apple\nb -> banana\nkey: a\nkey: b\n0 103\n1 111\n",
    "officialUrl": "https://gobyexample.com/range-over-built-in-types"
  },
  {
    "id": 17,
    "slug": "pointers",
    "title": "Pointers",
    "titleEs": "Punteros y Direccionamiento de Memoria",
    "category": "Funciones, Clausuras y Punteros",
    "categorySlug": "funciones-memoria",
    "categoryIcon": "tool",
    "difficulty": "Intermedio",
    "summary": "Referencias directas a direcciones de memoria mediante los operadores & (dirección) y * (desreferenciación).",
    "originalExpl": "Go soporta punteros, permitiendo pasar referencias a valores y registros dentro del programa. No soporta aritmética de punteros como en C, lo que los hace mucho más seguros.",
    "basicExpl": {
      "title": "Conceptos Fundamentales para Principiantes",
      "content": "Una variable guarda un valor en una casilla de memoria de tu ordenador. Un 'puntero' guarda la DIRECCIÓN física de esa casilla de memoria.\n- Operador `&` (dirección): `&x` te da la dirección de memoria donde vive 'x'.\n- Operador `*` (desreferenciación): `*p` viaja a la dirección que tiene 'p' y lee o modifica el valor que está guardado allí.\n\nAnalogía: Si una variable es tu casa física, el puntero es un papel con la dirección de tu casa escrita. Si le das la dirección a un amigo, él puede ir a tu casa y pintar una pared (modificar el valor original). Si le das una fotocopia de la casa (paso por valor), pintar la fotocopia no afectará tu casa real.",
      "keyPoints": [
        "&var obtiene la dirección de memoria de una variable.",
        "*ptr accede al valor que apunta el puntero.",
        "El valor cero de un puntero no asignado es 'nil'.",
        "Desreferenciar un puntero 'nil' causa un pánico inmediato (nil pointer dereference)."
      ]
    },
    "interExpl": {
      "title": "Mecanismos Internos y Buenas Prácticas",
      "content": "Sin aritmética de punteros: En Go NO puedes hacer `ptr++` para moverte por bytes de memoria como en C. Esto elimina de raíz vulnerabilidades de corrupción de búfer y desbordamientos de memoria.\n\n¿Cuándo usar punteros?\n1. Cuando una función necesita MODIFICAR el valor original que le pasas.\n2. Cuando pasas una estructura muy grande para evitar copiar megabytes de memoria.\n3. Para representar la ausencia opcional de un valor (usando `nil`).\nSi la estructura es pequeña (ej. números, fechas, structs de 2 o 3 campos primitivos), pásala por valor; es más rápido para el recolector de basura.",
      "keyPoints": [
        "Sin aritmética peligrosa: seguridad de memoria garantizada en código seguro.",
        "Modificación mutua: permite que funciones receptoras alteren el estado del llamador.",
        "Semántica de Valor vs Puntero: elegir conscientemente entre consistencia inmutable o mutabilidad eficiente."
      ]
    },
    "expertExpl": {
      "title": "Bajo Nivel, Rendimiento e Internals",
      "content": "Escape Analysis y el recolector de basura: Pasar un puntero hacia abajo en la pila de llamadas (`f(&miStruct)`) generalmente mantiene el objeto en el Stack. Sin embargo, RETORNAR un puntero a una variable local creada dentro de la función (`return &local`) hace que la variable 'escape' inevitablemente al Heap.\n\nMuchos punteros en el Heap aumentan la presión sobre el Garbage Collector, ya que el GC debe rastrear cada puntero durante la fase de marcado (mark phase). Por ello, el código de ultra-bajo tiempo de respuesta suele minimizar el uso de punteros innecesarios en favor de valores planos (value semantics) para permitir la asignación contigua en memoria sin escaneo del GC.",
      "keyPoints": [
        "Retorno seguro de punteros locales: Go no produce punteros colgantes (dangling pointers); si retornas `&x`, el compilador mueve 'x' al Heap automáticamente.",
        "GC Mark Phase Overhead: El GC invoca barreras de escritura (write barriers) para rastrear punteros mutados concurrentemente.",
        "Paquete `unsafe`: La única forma de hacer aritmética de punteros o conversiones arbitrarias es a través de `unsafe.Pointer` y `uintptr`."
      ]
    },
    "evaluation": {
      "title": "Reto: Intercambio de Valores (Swap) y Función Segura con Nil",
      "statement": "Escribe una función 'intercambiar(a, b *int) bool' que reciba dos punteros a enteros e intercambie sus valores. Si cualquiera de los dos punteros es 'nil', no debe hacer nada y debe devolver 'false'. Si el intercambio fue exitoso, devuelve 'true'.",
      "starterCode": "package main\n\nimport \"fmt\"\n\nfunc intercambiar(a, b *int) bool {\n    // Comprueba nil y realiza el intercambio\n}\n\nfunc main() {\n    x, y := 10, 99\n    fmt.Println(\"Antes:\", x, y)\n    // Llama a intercambiar\n}",
      "hint": "Comprueba 'if a == nil || b == nil { return false }'. Luego usa la asignación múltiple: *a, *b = *b, *a.",
      "solution": "package main\n\nimport \"fmt\"\n\nfunc intercambiar(a, b *int) bool {\n    if a == nil || b == nil {\n        return false\n    }\n    *a, *b = *b, *a\n    return true\n}\n\nfunc main() {\n    x, y := 10, 99\n    fmt.Printf(\"Antes: x=%d, y=%d\\n\", x, y)\n    \n    ok := intercambiar(&x, &y)\n    fmt.Printf(\"Éxito: %t | Después: x=%d, y=%d\\n\", ok, x, y)\n    \n    // Prueba de seguridad con nil\n    okNil := intercambiar(&x, nil)\n    fmt.Printf(\"Llamada con nil: %t (sin pánico)\\n\", okNil)\n}",
      "explanation": "Comprobar 'a == nil || b == nil' protege la aplicación de un crasheo por pánico. La instrucción '*a, *b = *b, *a' utiliza la asignación simultánea de Go para intercambiar los valores apuntados sin requerir una variable temporal auxiliar."
    },
    "externalLinks": [
      {
        "title": "Tour interactivo de Go: Punteros y direcciones de memoria",
        "url": "https://go.dev/tour/moretypes/1",
        "description": "Introducción y ejercicios con punteros en el tour interactivo."
      },
      {
        "title": "Guía canónica Effective Go: Semántica de punteros frente a semántica de valor",
        "url": "https://go.dev/doc/effective_go#pointers_vs_values",
        "description": "Criterios para decidir entre punteros y valores en métodos y funciones."
      },
      {
        "title": "Bill Kennedy: Mecánica del lenguaje: Pilas (Stacks) y Punteros",
        "url": "https://www.ardanlabs.com/blog/2017/05/language-mechanics-on-stacks-and-pointers.html",
        "description": "Guía en profundidad sobre punteros y gestión de memoria en Go."
      },
      {
        "title": "Go by Example Original: Pointers",
        "url": "https://gobyexample.com/pointers",
        "description": "Página oficial del ejemplo en Go by Example.",
        "type": "Referencia Original"
      }
    ],
    "code": "// Go admite <em><a href=\"https://en.wikipedia.org/wiki/Pointer_(computer_programming)\">punteros</a></em>,\n// lo que permite pasar referencias a valores y registros\n// dentro de tu programa.\n\npackage main\n\nimport \"fmt\"\n\n// Mostraremos cómo funcionan los punteros en contraste con los valores\n// mediante 2 funciones: `zeroval` y `zeroptr`. `zeroval` tiene un\n// parámetro de tipo `int`, por lo que los argumentos se pasan por\n// valor. `zeroval` recibirá una copia de `ival` distinta\n// a la de la función que la invoca.\nfunc zeroval(ival int) {\n\tival = 0\n}\n\n// `zeroptr`, en cambio, tiene un parámetro `*int`, lo que significa\n// que recibe un puntero a `int`. El código `*iptr` en el cuerpo\n// de la función _desreferencia_ el puntero desde su dirección\n// de memoria al valor actual almacenado en dicha dirección.\n// Asignar un valor a un puntero desreferenciado modifica el\n// valor en la dirección referenciada.\nfunc zeroptr(iptr *int) {\n\t*iptr = 0\n}\n\nfunc main() {\n\ti := 1\n\tfmt.Println(\"initial:\", i)\n\n\tzeroval(i)\n\tfmt.Println(\"zeroval:\", i)\n\n\t// La sintaxis `&i` proporciona la dirección de memoria de `i`,\n\t// es decir, un puntero a `i`.\n\tzeroptr(&i)\n\tfmt.Println(\"zeroptr:\", i)\n\n\t// Los punteros también pueden imprimirse directamente.\n\tfmt.Println(\"pointer:\", &i)\n\n\t// Se puede crear un puntero nuevo a un valor utilizando la\n\t// función incorporada `new`.\n\tp := new(42)\n\tfmt.Println(\"value at *p:\", *p)\n\tzeroptr(p)\n\tfmt.Println(\"value at *p:\", *p)\n}\n",
    "output": "# `zeroval` no modifica la variable `i` en `main`, pero\n# `zeroptr` sí lo hace porque posee una referencia a\n# la dirección de memoria de dicha variable.\n$ go run pointers.go\ninitial: 1\nzeroval: 1\nzeroptr: 0\npointer: 0x42131100\nvalue at *p: 42\nvalue at *p: 0\n",
    "officialUrl": "https://gobyexample.com/pointers"
  },
  {
    "id": 18,
    "slug": "strings-and-runes",
    "title": "Strings and Runes",
    "titleEs": "Cadenas y Runas (UTF-8 Nativo)",
    "category": "Funciones, Clausuras y Punteros",
    "categorySlug": "funciones-memoria",
    "categoryIcon": "tool",
    "difficulty": "Intermedio",
    "summary": "Manejo nativo de texto UTF-8: strings como secuencias inmutables de bytes y runas (rune) como puntos de código Unicode int32.",
    "originalExpl": "Un string en Go es una secuencia de bytes de solo lectura. El lenguaje trata las cadenas como texto codificado en UTF-8. En Go, el concepto de un carácter se llama 'runa' (rune), que es un alias del tipo int32.",
    "basicExpl": {
      "title": "Conceptos Fundamentales para Principiantes",
      "content": "Para entender el texto en Go hay que diferenciar entre 'bytes' y 'caracteres':\n- Un 'string' es una lista de bytes crudos.\n- En el abecedario inglés normal (ASCII), cada letra ocupa 1 byte ('a' = 1 byte). Por eso `len(\"hello\")` da 5.\n- Pero en español, japonés o emojis, los caracteres ocupan entre 2 y 4 bytes cada uno ('ñ' = 2 bytes, '語' = 3 bytes). Por eso `len(\"año\")` da 4 bytes, ¡no 3!\n- Una 'runa' (rune) es un único punto de código Unicode completo (un carácter real), representado internamente por un entero de 32 bits (int32).",
      "keyPoints": [
        "len(s) devuelve la cantidad de BYTES, no la cantidad de letras o caracteres.",
        "Para contar caracteres reales legibles, se usa `utf8.RuneCountInString(s)`.",
        "Los literales de runa se escriben entre comillas simples: `'a'`, `'ñ'`, `'日'`.",
        "type rune = int32 (alias oficial en Go)."
      ]
    },
    "interExpl": {
      "title": "Mecanismos Internos y Buenas Prácticas",
      "content": "El paquete `unicode/utf8` de la biblioteca estándar es el núcleo para manipular texto de forma segura y correcta:\n```go\nimport \"unicode/utf8\"\n\nstr := \"¡Hola Mundo!\"\nbytesTotal := len(str)               // 13 bytes (¡ ocupa 2 bytes)\ncaracteres := utf8.RuneCountInString(str) // 12 caracteres reales\n```\nCuando usas un bucle `for idx, r := range str`, Go decodifica automáticamente cada runa en UTF-8 y 'idx' avanza la cantidad de bytes que ocupó esa runa (no siempre de 1 en 1).",
      "keyPoints": [
        "Iteración UTF-8: el bucle 'range' decodifica runas pero reporta el índice en bytes de inicio de cada una.",
        "Indexación por corchetes: `str[0]` devuelve el primer byte (uint8), no necesariamente el primer carácter si es multibyte.",
        "Conversión string a []rune: `runas := []rune(str)` permite indexar caracteres completos directamente por posición."
      ]
    },
    "expertExpl": {
      "title": "Bajo Nivel, Rendimiento e Internals",
      "content": "La codificación UTF-8 fue diseñada por Ken Thompson y Rob Pike (los mismos creadores de Go y Unix). Un string en Go es una estructura de 16 bytes: `struct { str *byte; len int }`. Dado que los strings son inmutables, compartir rebanados (`s[2:8]`) es O(1) y genera 0 asignaciones de memoria.\n\nSin embargo, convertir un string a `[]byte` o `[]rune` fuerza una asignación en el heap y una copia completa de memoria para proteger la inmutabilidad del string. El compilador de Go optimiza esto en casos comunes (como usar un string como clave en una búsqueda en un mapa de claves string mediante `m[string(byteSlice)]`) eliminando la asignación si detecta que el byteSlice no mutará durante la consulta.",
      "keyPoints": [
        "Inmutabilidad garantizada: los strings son de solo lectura; sus bytes no pueden ser corrompidos concurrentemente.",
        "Coste de conversión []rune(s): requiere recorrer todo el string y asignar un array int32 de tamaño 4x veces la cantidad de runas.",
        "Compilador zero-alloc en consultas: `m[string(bytes)]` no asigna memoria si es solo para lectura en mapas."
      ]
    },
    "evaluation": {
      "title": "Reto: Invertir Cadenas Multibyte con Emojis de Forma Segura",
      "statement": "Escribe una función 'invertirTexto(s string) string' que invierta correctamente cualquier cadena de texto respetando los caracteres multibyte (tildes, caracteres asiáticos y emojis). Demuestra que funciona con '¡Golang es genial! 語'.",
      "starterCode": "package main\n\nimport \"fmt\"\n\nfunc invertirTexto(s string) string {\n    // Convierte a []rune para no destruir los bytes UTF-8\n}\n\nfunc main() {\n    original := \"¡Golang es genial! \"\n    fmt.Println(\"Original:\", original)\n    fmt.Println(\"Invertido:\", invertirTexto(original))\n}",
      "hint": "Convierte el string a []rune, invierte el slice de runas intercambiando extremos y reconvierte a string.",
      "solution": "package main\n\nimport \"fmt\"\n\nfunc invertirTexto(s string) string {\n    runas := []rune(s)\n    for i, j := 0, len(runas)-1; i < j; i, j = i+1, j-1 {\n        runas[i], runas[j] = runas[j], runas[i]\n    }\n    return string(runas)\n}\n\nfunc main() {\n    original := \"¡Golang es genial! \"\n    invertido := invertirTexto(original)\n    fmt.Println(\"Original :\", original)\n    fmt.Println(\"Invertido:\", invertido)\n}",
      "explanation": "Si invirtieras el string como bytes con `[]byte`, los caracteres multibyte como '¡' (2 bytes) o '語' (3 bytes) quedarían con sus secuencias binarias al revés, corrompiéndose en caracteres ilegibles (mojibake). Al convertir a `[]rune`, cada carácter Unicode se manipula como una unidad atómica intacta."
    },
    "externalLinks": [
      {
        "title": "Blog oficial de Go: Cadenas, bytes, runas y caracteres en Go",
        "url": "https://go.dev/blog/strings",
        "description": "El artículo fundamental de Rob Pike explicando cómo maneja Go el texto y UTF-8."
      },
      {
        "title": "Paquete unicode/utf8 (Documentación oficial)",
        "url": "https://pkg.go.dev/unicode/utf8",
        "description": "Documentación oficial de funciones para validar y contar runas en cadenas UTF-8."
      },
      {
        "title": "Especificación de Go: Literales de runa y codificación de caracteres Unicode",
        "url": "https://go.dev/ref/spec#Rune_literals",
        "description": "Especificación formal de los literales y tipos de runa."
      },
      {
        "title": "Go by Example Original: Strings and Runes",
        "url": "https://gobyexample.com/strings-and-runes",
        "description": "Página oficial del ejemplo en Go by Example.",
        "type": "Referencia Original"
      }
    ],
    "code": "// Una cadena en Go es un slice de bytes de solo lectura. El lenguaje\n// y la biblioteca estándar tratan las cadenas de forma especial: como\n// contenedores de texto codificado en [UTF-8](https://en.wikipedia.org/wiki/UTF-8).\n// En otros lenguajes, las cadenas están compuestas de \"caracteres\".\n// En Go, el concepto de carácter se denomina `rune` (runa): es\n// un entero que representa un punto de código Unicode.\n// [Esta publicación del blog de Go](https://go.dev/blog/strings) es una excelente\n// introducción a este tema.\n\npackage main\n\nimport (\n\t\"fmt\"\n\t\"unicode/utf8\"\n)\n\nfunc main() {\n\n\t// `s` es una variable `string` a la que se le asigna un valor literal\n\t// que representa la palabra \"hola\" en el idioma\n\t// tailandés. Los literales de cadena en Go son texto codificado\n\t// en UTF-8.\n\tconst s = \"สวัสดี\"\n\n\t// Dado que las cadenas son equivalentes a `[]byte`, esto\n\t// producirá la longitud de los bytes sin procesar almacenados internamente.\n\tfmt.Println(\"Len:\", len(s))\n\n\t// Indexar dentro de una cadena produce los valores de bytes crudos en\n\t// cada posición. Este bucle genera los valores hexadecimales de todos\n\t// los bytes que componen los puntos de código en `s`.\n\tfor i := 0; i < len(s); i++ {\n\t\tfmt.Printf(\"%x \", s[i])\n\t}\n\tfmt.Println()\n\n\t// Para contar cuántas _runas_ hay en una cadena, podemos usar\n\t// el paquete `utf8`. Ten en cuenta que el tiempo de ejecución de\n\t// `RuneCountInString` depende del tamaño de la cadena,\n\t// ya que debe decodificar cada runa UTF-8 secuencialmente.\n\t// Algunos caracteres tailandeses se representan mediante puntos de código UTF-8\n\t// que pueden abarcar varios bytes, por lo que el resultado de este conteo\n\t// puede resultar sorprendente.\n\tfmt.Println(\"Rune count:\", utf8.RuneCountInString(s))\n\n\t// Un bucle `range` maneja las cadenas de manera especial y decodifica\n\t// cada `rune` junto con su desplazamiento (offset) en la cadena.\n\tfor idx, runeValue := range s {\n\t\tfmt.Printf(\"%#U starts at %d\\n\", runeValue, idx)\n\t}\n\n\t// Podemos lograr la misma iteración utilizando la\n\t// función `utf8.DecodeRuneInString` de forma explícita.\n\tfmt.Println(\"\\nUsing DecodeRuneInString\")\n\tfor i, w := 0, 0; i < len(s); i += w {\n\t\truneValue, width := utf8.DecodeRuneInString(s[i:])\n\t\tfmt.Printf(\"%#U starts at %d\\n\", runeValue, i)\n\t\tw = width\n\n\t\t// Esto demuestra cómo pasar un valor `rune` a una función.\n\t\texamineRune(runeValue)\n\t}\n}\n\nfunc examineRune(r rune) {\n\n\t// Los valores entre comillas simples son _literales de runa_.\n\t// Podemos comparar un valor `rune` directamente con un literal de runa.\n\tif r == 't' {\n\t\tfmt.Println(\"found tee\")\n\t} else if r == 'ส' {\n\t\tfmt.Println(\"found so sua\")\n\t}\n}\n",
    "output": "$ go run strings-and-runes.go\nLen: 18\ne0 b8 aa e0 b8 a7 e0 b8 b1 e0 b8 aa e0 b8 94 e0 b8 b5 \nRune count: 6\nU+0E2A 'ส' starts at 0\nU+0E27 'ว' starts at 3\nU+0E31 'ั' starts at 6\nU+0E2A 'ส' starts at 9\nU+0E14 'ด' starts at 12\nU+0E35 'ี' starts at 15\n\nUsing DecodeRuneInString\nU+0E2A 'ส' starts at 0\nfound so sua\nU+0E27 'ว' starts at 3\nU+0E31 'ั' starts at 6\nU+0E2A 'ส' starts at 9\nfound so sua\nU+0E14 'ด' starts at 12\nU+0E35 'ี' starts at 15\n",
    "officialUrl": "https://gobyexample.com/strings-and-runes"
  },
  {
    "id": 19,
    "slug": "structs",
    "title": "Structs",
    "titleEs": "Estructuras (Structs)",
    "category": "Tipos Avanzados y POO en Go",
    "categorySlug": "poo-generics",
    "categoryIcon": "cpu",
    "difficulty": "Principiante",
    "summary": "Colecciones tipadas de campos que forman la base del modelado de datos y programación orientada a tipos en Go.",
    "originalExpl": "Los structs de Go son colecciones tipadas de campos. Son útiles para agrupar datos y formar registros. Se accede a los campos con la notación de punto. Go desreferencia automáticamente los punteros a structs al acceder a sus campos.",
    "basicExpl": {
      "title": "Conceptos Fundamentales para Principiantes",
      "content": "En Go no existen las 'clases'. Para agrupar datos relacionados sobre una misma entidad se utilizan 'structs' (estructuras):\n```go\ntype Persona struct {\n    Nombre string\n    Edad   int\n}\n```\n- Creación: `p := Persona{Nombre: \"Ana\", Edad: 28}`.\n- Acceso: `fmt.Println(p.Nombre)` o `p.Edad = 29`.\n- Desreferenciación automática: Si tienes un puntero `ptr := &p`, no necesitas escribir `(*ptr).Nombre`; Go te permite escribir directamente `ptr.Nombre`.",
      "keyPoints": [
        "Reemplazan a las clases tradicionales de otros lenguajes para modelar datos.",
        "Los campos no especificados adoptan automáticamente su zero value correspondiente.",
        "Desreferenciación automática con punto: `ptr.Campo` equivale a `(*ptr).Campo`.",
        "Structs anónimos para datos temporales o pruebas unitarias: `struct { X, Y int }{1, 2}`."
      ]
    },
    "interExpl": {
      "title": "Mecanismos Internos y Buenas Prácticas",
      "content": "Tags de estructura (Struct Tags): Son metadatos de cadena de texto asociados a los campos que permiten a bibliotecas de serialización (como JSON, XML, base de datos SQL o validadores) saber cómo transformar los datos:\n```go\ntype Usuario struct {\n    ID     int    `json:\"id\" db:\"user_id\"`\n    Email  string `json:\"email\" validate:\"required,email\"`\n}\n```\nPatrón Constructor: Go no tiene constructores nativos; la convención es crear una función `NewNombreTipo(...)` que valide los datos e inicialice el struct con valores seguros.",
      "keyPoints": [
        "Struct Tags: Metadatos reflexivos entre acentos graves para JSON y ORMs (`json:\"name\"`).",
        "Función Constructora Idiomática: `func NewUsuario(email string) (*Usuario, error)`.",
        "Exportabilidad de campos: los campos que comienzan con mayúscula son públicos (visibles fuera del paquete); con minúscula son privados."
      ]
    },
    "expertExpl": {
      "title": "Bajo Nivel, Rendimiento e Internals",
      "content": "Alineación de Memoria y Relleno (Memory Alignment & Padding): En arquitecturas de 64 bits, la CPU lee la memoria en palabras de 8 bytes. El compilador de Go inserta bytes invisibles de relleno (padding) para alinear los campos con múltiplos de su tamaño natural.\n\nEjemplo:\n```go\ntype Ineficiente struct {\n    A bool    // 1 byte + 7 bytes de padding\n    B int64   // 8 bytes\n    C bool    // 1 byte + 7 bytes de padding (Total: 24 bytes)\n}\ntype Eficiente struct {\n    B int64   // 8 bytes\n    A bool    // 1 byte\n    C bool    // 1 byte + 6 bytes de padding (Total: 16 bytes)\n}\n```\nReordenar los campos de mayor a menor tamaño puede reducir drásticamente el uso de memoria en colecciones con millones de structs.",
      "keyPoints": [
        "Memory Padding: Los campos se alinean a múltiplos de su tamaño nativo, desperdiciando espacio si no se ordenan bien.",
        "Herramienta `fieldalignment`: disponible en golang.org/x/tools para reorganizar structs automáticamente y ahorrar memoria.",
        "Empty Struct `struct{}`: Ocupa exactamente CERO bytes de memoria. Ideal para conjuntos (sets) como `map[string]struct{}` y canales de señalización."
      ]
    },
    "evaluation": {
      "title": "Reto: Modelado de Cuenta Bancaria con Validación y Tags JSON",
      "statement": "Define una estructura 'CuentaBancaria' con campos: NumeroCuenta (string), Titular (string), Saldo (float64) y Activa (bool), incluyendo tags JSON apropiados. Escribe una función constructora 'NuevaCuenta(numero, titular string, depositoInicial float64) (*CuentaBancaria, error)' que rechace depósitos iniciales negativos.",
      "starterCode": "package main\n\nimport (\n    \"errors\"\n    \"fmt\"\n)\n\n// Define la estructura CuentaBancaria con tags JSON\n\n// Implementa NuevaCuenta\n\nfunc main() {\n    cuenta, err := NuevaCuenta(\"ES123456\", \"Sofia Ruiz\", 150.0)\n    if err != nil {\n        fmt.Println(\"Error:\", err)\n        return\n    }\n    fmt.Printf(\"Cuenta creada: %+v\\n\", cuenta)\n}",
      "hint": "Comprueba si depositoInicial < 0 para retornar errors.New(\"el depósito inicial no puede ser negativo\").",
      "solution": "package main\n\nimport (\n    \"errors\"\n    \"fmt\"\n)\n\ntype CuentaBancaria struct {\n    NumeroCuenta string  `json:\"numero_cuenta\"`\n    Titular      string  `json:\"titular\"`\n    Saldo        float64 `json:\"saldo\"`\n    Activa       bool    `json:\"activa\"`\n}\n\nfunc NuevaCuenta(numero, titular string, depositoInicial float64) (*CuentaBancaria, error) {\n    if numero == \"\" || titular == \"\" {\n        return nil, errors.New(\"número de cuenta y titular son obligatorios\")\n    }\n    if depositoInicial < 0 {\n        return nil, errors.New(\"el depósito inicial no puede ser negativo\")\n    }\n    \n    return &CuentaBancaria{\n        NumeroCuenta: numero,\n        Titular:      titular,\n        Saldo:        depositoInicial,\n        Activa:       true,\n    }, nil\n}\n\nfunc main() {\n    cuenta, err := NuevaCuenta(\"ES123456\", \"Sofia Ruiz\", 150.0)\n    if err != nil {\n        fmt.Println(\"Error:\", err)\n        return\n    }\n    fmt.Printf(\"Cuenta creada exitosamente: %+v\\n\", cuenta)\n}",
      "explanation": "El constructor idiomático encapsula las reglas de negocio (depósito no negativo, datos no vacíos) y devuelve un puntero a la estructura inicializada o un error claro. Los tags de estructura aseguran compatibilidad directa con serialización JSON."
    },
    "externalLinks": [
      {
        "title": "Tour interactivo de Go: Estructuras de datos (Structs)",
        "url": "https://go.dev/tour/moretypes/2",
        "description": "Sintaxis básica y manipulación de structs."
      },
      {
        "title": "Guía canónica Effective Go: Asignación con new y literales de struct",
        "url": "https://go.dev/doc/effective_go#allocation_new",
        "description": "Guía oficial sobre inicialización de estructuras."
      },
      {
        "title": "Especificación de Go: Tipos struct y definición de campos",
        "url": "https://go.dev/ref/spec#Struct_types",
        "description": "Definición formal de tipos de estructura y sintaxis de tags."
      },
      {
        "title": "Go by Example Original: Structs",
        "url": "https://gobyexample.com/structs",
        "description": "Página oficial del ejemplo en Go by Example.",
        "type": "Referencia Original"
      }
    ],
    "code": "// Los _structs_ en Go son colecciones tipadas de campos.\n// Resultan sumamente útiles para agrupar datos y formar\n// registros.\n\npackage main\n\nimport \"fmt\"\n\n// Este tipo struct `person` tiene los campos `name` y `age`.\ntype person struct {\n\tname string\n\tage  int\n}\n\n// `newPerson` construye una nueva estructura person con el nombre indicado.\nfunc newPerson(name string) *person {\n\t// Go es un lenguaje con recolección de basura (garbage collector); puedes retornar\n\t// con seguridad un puntero a una variable local: solo será\n\t// liberada por el recolector de basura cuando ya no existan\n\t// referencias activas hacia ella.\n\tp := person{name: name}\n\tp.age = 42\n\treturn &p\n}\n\nfunc main() {\n\n\t// Esta sintaxis crea una nueva estructura con valores posicionales.\n\tfmt.Println(person{\"Bob\", 20})\n\n\t// Puedes nombrar explícitamente los campos al inicializar una estructura.\n\tfmt.Println(person{name: \"Alice\", age: 30})\n\n\t// Los campos omitidos se inicializarán con su respectivo valor cero.\n\tfmt.Println(person{name: \"Fred\"})\n\n\t// El prefijo `&` produce un puntero hacia la estructura.\n\tfmt.Println(&person{name: \"Ann\", age: 40})\n\n\t// En Go idiomático se acostumbra encapsular la creación de estructuras en funciones constructoras.\n\tfmt.Println(newPerson(\"Jon\"))\n\n\t// Accede a los campos del struct mediante la notación de punto.\n\ts := person{name: \"Sean\", age: 50}\n\tfmt.Println(s.name)\n\n\t// Las estructuras son mutables.\n\ts.age = 51\n\tfmt.Println(s)\n\n\t// También puedes usar el punto con punteros a estructuras: los\n\t// punteros se desreferencian automáticamente.\n\tsp := &s\n\tsp.age = 52\n\tfmt.Println(sp.age)\n\n\t// Si un tipo struct solo se utiliza para un valor único, no\n\t// es necesario asignarle un nombre. El valor puede tener un\n\t// tipo struct anónimo. Esta técnica se utiliza comúnmente en\n\t// [pruebas basadas en tablas](testing-and-benchmarking).\n\tdog := struct {\n\t\tname   string\n\t\tisGood bool\n\t}{\n\t\t\"Rex\",\n\t\ttrue,\n\t}\n\tfmt.Println(dog)\n}\n",
    "output": "{Bob 20}\n{Alice 30}\n{Fred 0}\n&{Ann 40}\n&{Jon 42}\nSean\n{Sean 51}\n52\n{Rex true}\n",
    "officialUrl": "https://gobyexample.com/structs"
  },
  {
    "id": 20,
    "slug": "methods",
    "title": "Methods",
    "titleEs": "Métodos y Receptores (Value vs Pointer)",
    "category": "Tipos Avanzados y POO en Go",
    "categorySlug": "poo-generics",
    "categoryIcon": "cpu",
    "difficulty": "Intermedio",
    "summary": "Funciones asociadas a un tipo receptor específico (receiver) que definen el comportamiento de tipos en Go.",
    "originalExpl": "Go soporta métodos definidos en tipos de estructura. El receptor del método puede ser de tipo valor o puntero. Los receptores de puntero permiten mutar el struct y evitan copiar el valor en cada llamada.",
    "basicExpl": {
      "title": "Conceptos Fundamentales para Principiantes",
      "content": "Un 'método' es simplemente una función que pertenece a un tipo de dato específico. La diferencia con una función normal es que tiene un 'receptor' (receiver) antes del nombre:\n```go\ntype Rectangulo struct { Ancho, Alto float64 }\n\n// Método para Rectangulo\nfunc (r Rectangulo) Area() float64 {\n    return r.Ancho * r.Alto\n}\n```\nSe invoca con la notación de punto sobre la instancia: `miRect.Area()`.",
      "keyPoints": [
        "El receptor se coloca entre paréntesis antes del nombre del método: `func (r Tipo) Metodo()`.",
        "Receptor de valor `(r Rectangulo)`: recibe una COPIA; no puede modificar la estructura original.",
        "Receptor de puntero `(r *Rectangulo)`: recibe la DIRECCIÓN; puede mutar los campos de la estructura original.",
        "Go gestiona automáticamente la llamada tanto si tienes un valor como un puntero."
      ]
    },
    "interExpl": {
      "title": "Mecanismos Internos y Buenas Prácticas",
      "content": "Regla de oro de los receptores en Go:\n1. Si el método necesita mutar o modificar campos del receptor: DEBE usar receptor de puntero `(r *MiTipo)`.\n2. Si el tipo es grande en memoria: usa receptor de puntero para evitar copiar la estructura en cada llamada.\n3. Consistencia: Si algunos métodos del tipo requieren puntero, es buena práctica que TODOS los métodos de ese tipo usen receptores de puntero para mantener la consistencia de la interfaz.\n\nAdemás, puedes asociar métodos a CUALQUIER tipo que definas en el paquete (por ejemplo, `type MiEntero int` o `type Estado string`), no solo a structs.",
      "keyPoints": [
        "Receptores en tipos no-struct: puedes agregar métodos a `type Grados float64` o `type Vector []int`.",
        "Method Values vs Method Expressions: `f := obj.Metodo` guarda el método vinculado al objeto.",
        "Consistencia de receptores: evita mezclar receptores de valor y puntero en el mismo tipo sin motivo claro."
      ]
    },
    "expertExpl": {
      "title": "Bajo Nivel, Rendimiento e Internals",
      "content": "A nivel de compilador, un método es idéntico a una función común cuyo primer parámetro es el receptor: `func (r *Rect) Area()` se compila internamente como `func Rect$Area(r *Rect)`. La llamada `r.Area()` se traduce a un salto directo a esa función pasando `r` en el primer registro de argumentos.\n\nConjunto de Métodos (Method Sets): Las reglas de Go establecen que:\n- El conjunto de métodos de un tipo valor `T` contiene solo los métodos con receptor de valor `(t T)`.\n- El conjunto de métodos de un tipo puntero `*T` contiene AMBOS: métodos con receptor de valor `(t T)` y métodos con receptor de puntero `(t *T)`.\nEsto es vital cuando se implementan interfaces.",
      "keyPoints": [
        "Method Sets Rule: `*T` incluye métodos de `T`, pero `T` NO incluye métodos con receptor `*T` para satisfacción de interfaces.",
        "Zero overhead: Invocar un método estático no tiene ninguna sobrecarga frente a invocar una función estándar.",
        "Inlining de métodos: métodos getter/setter simples son completamente inlined por el compilador en tiempo de compilación."
      ]
    },
    "evaluation": {
      "title": "Reto: Métodos de Valor y Puntero para un Termostato",
      "statement": "Crea una estructura 'Termostato' con campos 'TemperaturaActual' (float64) y 'Objetivo' (float64). Implementa un método de valor 'Diferencia() float64' que devuelva la diferencia absoluta y un método de puntero 'Calentar(grados float64)' que incremente la TemperaturaActual. Comprueba ambos.",
      "starterCode": "package main\n\nimport (\n    \"fmt\"\n    \"math\"\n)\n\ntype Termostato struct {\n    TemperaturaActual float64\n    Objetivo          float64\n}\n\n// Implementa Diferencia() y Calentar()\n\nfunc main() {\n    t := Termostato{TemperaturaActual: 18.5, Objetivo: 22.0}\n    // Prueba tus métodos aquí\n}",
      "hint": "Para Diferencia() usa (t Termostato) y math.Abs(t.Objetivo - t.TemperaturaActual). Para Calentar() usa (t *Termostato).",
      "solution": "package main\n\nimport (\n    \"fmt\"\n    \"math\"\n)\n\ntype Termostato struct {\n    TemperaturaActual float64\n    Objetivo          float64\n}\n\n// Método de valor (lectura sin mutación)\nfunc (t Termostato) Diferencia() float64 {\n    return math.Abs(t.Objetivo - t.TemperaturaActual)\n}\n\n// Método de puntero (muta la estructura original)\nfunc (t *Termostato) Calentar(grados float64) {\n    t.TemperaturaActual += grados\n}\n\nfunc main() {\n    t := Termostato{TemperaturaActual: 18.5, Objetivo: 22.0}\n    fmt.Printf(\"Diferencia inicial: %.1f °C\\n\", t.Diferencia())\n    \n    t.Calentar(3.0)\n    fmt.Printf(\"Tras calentar: Actual = %.1f °C, Diferencia = %.1f °C\\n\", \n        t.TemperaturaActual, t.Diferencia())\n}",
      "explanation": "El método 'Diferencia' utiliza un receptor de valor porque solo lee los datos sin modificarlos. El método 'Calentar' requiere un receptor de puntero `(t *Termostato)` para poder alterar permanentemente el valor del campo TemperaturaActual de la instancia original."
    },
    "externalLinks": [
      {
        "title": "Tour interactivo de Go: Métodos sobre tipos y structs",
        "url": "https://go.dev/tour/methods/1",
        "description": "Definición y uso de métodos en el tour interactivo."
      },
      {
        "title": "Guía canónica Effective Go: Métodos y receptores de puntero frente a valor",
        "url": "https://go.dev/doc/effective_go#methods",
        "description": "Guía canónica de diseño sobre receptores de valor y puntero."
      },
      {
        "title": "Especificación de Go: Declaración de métodos y conjuntos de métodos",
        "url": "https://go.dev/ref/spec#Method_declarations",
        "description": "Especificación del lenguaje sobre receptores y method sets."
      },
      {
        "title": "Go by Example Original: Methods",
        "url": "https://gobyexample.com/methods",
        "description": "Página oficial del ejemplo en Go by Example.",
        "type": "Referencia Original"
      }
    ],
    "code": "// Go admite _métodos_ definidos sobre tipos de estructuras (structs).\n\npackage main\n\nimport \"fmt\"\n\ntype rect struct {\n\twidth, height int\n}\n\n// Este método `area` tiene un _tipo receptor_ (receiver) de `*rect`.\nfunc (r *rect) area() int {\n\treturn r.width * r.height\n}\n\n// Los métodos pueden definirse tanto para receptores de puntero como\n// para receptores de valor. Aquí hay un ejemplo con receptor de valor.\nfunc (r rect) perim() int {\n\treturn 2*r.width + 2*r.height\n}\n\nfunc main() {\n\tr := rect{width: 10, height: 5}\n\n\t// Aquí invocamos los 2 métodos definidos para nuestra estructura.\n\tfmt.Println(\"area: \", r.area())\n\tfmt.Println(\"perim:\", r.perim())\n\n\t// Go maneja automáticamente la conversión entre valores y punteros\n\t// en las llamadas a métodos. Es recomendable usar un receptor de puntero\n\t// para evitar copiar la estructura en cada invocación o para permitir\n\t// que el método mute la estructura receptora.\n\trp := &r\n\tfmt.Println(\"area: \", rp.area())\n\tfmt.Println(\"perim:\", rp.perim())\n}\n",
    "output": "$ go run methods.go \narea:  50\nperim: 30\narea:  50\nperim: 30\n\n# A continuación veremos el mecanismo de Go para agrupar y\n# nombrar conjuntos de métodos relacionados: las interfaces.\n",
    "officialUrl": "https://gobyexample.com/methods"
  },
  {
    "id": 21,
    "slug": "interfaces",
    "title": "Interfaces",
    "titleEs": "Interfaces y Polimorfismo Implícito",
    "category": "Tipos Avanzados y POO en Go",
    "categorySlug": "poo-generics",
    "categoryIcon": "cpu",
    "difficulty": "Intermedio",
    "summary": "Contratos de conjuntos de métodos implementados implícitamente que permiten polimorfismo desacoplado y código testeable.",
    "originalExpl": "Las interfaces son colecciones nombradas de firmas de métodos. En Go, no se declara explícitamente que un tipo implementa una interfaz (no hay palabra clave 'implements'); un tipo implementa una interfaz simplemente implementando todos sus métodos.",
    "basicExpl": {
      "title": "Conceptos Fundamentales para Principiantes",
      "content": "Una interfaz es un contrato: define QUÉ debe saber hacer un objeto, pero no CÓMO lo hace.\nPor ejemplo, decimos que cualquier cosa que tenga un método `Hablar() string` es un `Hablador`.\n- No existe la palabra clave `implements`.\n- Si defines un struct `Perro` y le agregas un método `Hablar() string`, Go automáticamente reconoce que `Perro` cumple el contrato de `Hablador`.\n\nAnalogía: Piensa en una toma de corriente eléctrica universal. El enchufe no le pregunta a tu televisor de qué marca es; si tiene las dos clavijas correctas (cumple la interfaz), la corriente fluye.",
      "keyPoints": [
        "Implementación implícita: si tu tipo tiene los métodos exigidos, ya implementa la interfaz.",
        "Polimorfismo limpio: puedes crear funciones que acepten la interfaz y funcionarán con cualquier tipo presente o futuro.",
        "Interfaz vacía `any` (o `interface{}`): puede contener valores de absolutamente cualquier tipo."
      ]
    },
    "interExpl": {
      "title": "Mecanismos Internos y Buenas Prácticas",
      "content": "Proverbios de Go sobre interfaces (Rob Pike):\n1. 'The bigger the interface, the weaker the abstraction' (Cuanto más grande la interfaz, más débil la abstracción). En Go las interfaces suelen tener 1 o 2 métodos como máximo (`io.Reader` solo tiene `Read()`, `io.Writer` solo tiene `Write()`).\n2. Define interfaces donde las usas (lado del consumidor), no donde las implementas (lado del productor). Esto desacopla las bibliotecas por completo.\n\nComposición de interfaces: Puedes combinar interfaces pequeñas para formar interfaces compuestas (`io.ReadWriter` combina `io.Reader` e `io.Writer`).",
      "keyPoints": [
        "Interfaces diminutas y enfocadas: 1 a 2 métodos permiten máxima reusabilidad.",
        "Definición en el consumidor: define las interfaces en el paquete que las consume para facilitar mocks en tests unitarios.",
        "Aserción de tipos: `x, ok := i.(TipoConcreto)` para recuperar con seguridad el tipo subyacente."
      ]
    },
    "expertExpl": {
      "title": "Bajo Nivel, Rendimiento e Internals",
      "content": "Bajo el capó (runtime/runtime2.go), una interfaz con métodos se representa como un 'Fat Pointer' de dos palabras de 8 bytes llamado `iface`:\n1. Un puntero a una tabla `itab` (que contiene el tipo concreto del valor, el tipo de la interfaz y un arreglo de punteros a las funciones de los métodos implementados).\n2. Un puntero `data` que apunta al valor concreto asignado en memoria.\n\n¡La trampa del 'nil interface'!: Una variable de interfaz es `nil` si y solo si AMBOS punteros (itab y data) son `nil`. Si asignas un puntero concreto que vale nil (`var p *MiStruct = nil; var i MiInterfaz = p`), la interfaz `i` NO es nil porque su itab contiene el tipo `*MiStruct`. Hacer `if i == nil` evaluará a `false`, provocando pánicos si se invocan sus métodos sin validar.",
      "keyPoints": [
        "Estructura iface: 16 bytes divididos en puntero itab (metadatos y tabla de métodos) y puntero data (valor).",
        "Gotcha de nil interface: una interfaz que envuelve un puntero nulo NO es nula (`i != nil`).",
        "Despacho dinámico (Virtual Dispatch): llamar a un método mediante interfaz realiza una indirección a través de la itab, lo que impide el inlining directo del compilador."
      ]
    },
    "evaluation": {
      "title": "Reto: Sistema de Notificaciones Polimórfico",
      "statement": "Define una interfaz 'Notificador' con el método 'Enviar(mensaje string) error'. Crea dos estructuras: 'EmailNotificador' y 'SMSNotificador' que la implementen. Escribe una función 'DifundirAlerta(n Notificador, alerta string)' que envíe la notificación polimórficamente.",
      "starterCode": "package main\n\nimport \"fmt\"\n\n// Define la interfaz Notificador\n\n// Define EmailNotificador y SMSNotificador con sus métodos Enviar\n\n// Implementa DifundirAlerta\n\nfunc main() {\n    // Prueba enviando con Email y con SMS\n}",
      "hint": "Crea el método Enviar en EmailNotificador con firma 'func (e EmailNotificador) Enviar(mensaje string) error'.",
      "solution": "package main\n\nimport \"fmt\"\n\ntype Notificador interface {\n    Enviar(mensaje string) error\n}\n\ntype EmailNotificador struct {\n    CorreoDestino string\n}\n\nfunc (e EmailNotificador) Enviar(mensaje string) error {\n    fmt.Printf(\"[EMAIL a %s]: %s\\n\", e.CorreoDestino, mensaje)\n    return nil\n}\n\ntype SMSNotificador struct {\n    NumeroTelefono string\n}\n\nfunc (s SMSNotificador) Enviar(mensaje string) error {\n    fmt.Printf(\"[SMS al %s]: %s\\n\", s.NumeroTelefono, mensaje)\n    return nil\n}\n\nfunc DifundirAlerta(n Notificador, alerta string) {\n    n.Enviar(alerta)\n}\n\nfunc main() {\n    email := EmailNotificador{CorreoDestino: \"admin@empresa.com\"}\n    sms := SMSNotificador{NumeroTelefono: \"+34600112233\"}\n    \n    alerta := \"Servidor principal fuera de línea\"\n    DifundirAlerta(email, alerta)\n    DifundirAlerta(sms, alerta)\n}",
      "explanation": "La función DifundirAlerta solo conoce el contrato Notificador. Ni EmailNotificador ni SMSNotificador declararon explícitamente ninguna dependencia con la interfaz; el polimorfismo implícito de Go desacopla los componentes por completo permitiendo agregar nuevos notificadores (Slack, Telegram) sin alterar el código existente."
    },
    "externalLinks": [
      {
        "title": "Tour interactivo de Go: Interfaces implícitas",
        "url": "https://go.dev/tour/methods/9",
        "description": "Explicación interactiva del polimorfismo implícito."
      },
      {
        "title": "Russ Cox: Estructuras de datos en Go: Implementación de Interfaces",
        "url": "https://research.swtch.com/interfaces",
        "description": "Artículo técnico de Russ Cox sobre cómo se implementan las itables e ifaces en memoria."
      },
      {
        "title": "Guía canónica Effective Go: Interfaces implícitas y métodos",
        "url": "https://go.dev/doc/effective_go#interfaces_and_types",
        "description": "Buenas prácticas de diseño con interfaces en Go."
      },
      {
        "title": "Go by Example Original: Interfaces",
        "url": "https://gobyexample.com/interfaces",
        "description": "Página oficial del ejemplo en Go by Example.",
        "type": "Referencia Original"
      }
    ],
    "code": "// Las _interfaces_ son colecciones con nombre de firmas de\n// métodos.\n\npackage main\n\nimport (\n\t\"fmt\"\n\t\"math\"\n)\n\n// Aquí tenemos una interfaz básica para figuras geométricas.\ntype geometry interface {\n\tarea() float64\n\tperim() float64\n}\n\n// Para nuestro ejemplo implementaremos esta interfaz en los\n// tipos `rect` y `circle`.\ntype rect struct {\n\twidth, height float64\n}\ntype circle struct {\n\tradius float64\n}\n\n// Para implementar una interfaz en Go, solo necesitamos\n// implementar todos los métodos declarados en ella. Aquí\n// implementamos `geometry` en `rect`.\nfunc (r rect) area() float64 {\n\treturn r.width * r.height\n}\nfunc (r rect) perim() float64 {\n\treturn 2*r.width + 2*r.height\n}\n\n// La implementación para `circle`.\nfunc (c circle) area() float64 {\n\treturn math.Pi * c.radius * c.radius\n}\nfunc (c circle) perim() float64 {\n\treturn 2 * math.Pi * c.radius\n}\n\n// Si una variable tiene un tipo interfaz, podemos invocar\n// los métodos declarados en dicha interfaz. Aquí tenemos una\n// función genérica `measure` que aprovecha esto para operar\n// sobre cualquier `geometry`.\nfunc measure(g geometry) {\n\tfmt.Println(g)\n\tfmt.Println(g.area())\n\tfmt.Println(g.perim())\n}\n\n// En ocasiones resulta útil conocer el tipo en tiempo de ejecución de un\n// valor de interfaz. Una opción es usar una *aserción de tipo* (type assertion)\n// como se muestra aquí; otra alternativa es un [switch de tipo](switch).\nfunc detectCircle(g geometry) {\n\tif c, ok := g.(circle); ok {\n\t\tfmt.Println(\"circle with radius\", c.radius)\n\t}\n}\n\nfunc main() {\n\tr := rect{width: 3, height: 4}\n\tc := circle{radius: 5}\n\n\t// Tanto el tipo struct `circle` como `rect`\n\t// implementan la interfaz `geometry`, por lo que podemos usar\n\t// instancias de estas estructuras como argumentos para `measure`.\n\tmeasure(r)\n\tmeasure(c)\n\n\tdetectCircle(r)\n\tdetectCircle(c)\n}\n",
    "output": "$ go run interfaces.go\n{3 4}\n12\n14\n{5}\n78.53981633974483\n31.41592653589793\ncircle with radius 5\n\n# Para comprender cómo funcionan las interfaces de Go internamente,\n# consulta esta [publicación de blog](https://research.swtch.com/interfaces).\n",
    "officialUrl": "https://gobyexample.com/interfaces"
  },
  {
    "id": 22,
    "slug": "enums",
    "title": "Enums",
    "titleEs": "Enumeraciones y el Patrón Iota",
    "category": "Tipos Avanzados y POO en Go",
    "categorySlug": "poo-generics",
    "categoryIcon": "cpu",
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
      {
        "title": "Blog oficial de Go: Generación automática de código con la herramienta stringer",
        "url": "https://go.dev/blog/strings",
        "description": "Cómo usar la herramienta oficial stringer para generar métodos String() en enums."
      },
      {
        "title": "Guía canónica Effective Go: Constantes y enumeraciones con iota",
        "url": "https://go.dev/doc/effective_go#constants",
        "description": "El uso de iota para enumeraciones en Effective Go."
      },
      {
        "title": "Especificación de Go: El identificador predefinido iota",
        "url": "https://go.dev/ref/spec#Iota",
        "description": "Especificación de las reglas de incremento del identificador iota."
      },
      {
        "title": "Go by Example Original: Enums",
        "url": "https://gobyexample.com/enums",
        "description": "Página oficial del ejemplo en Go by Example.",
        "type": "Referencia Original"
      }
    ],
    "code": "// Los _tipos enumerados_ (enums) son un caso especial de\n// [tipos suma](https://en.wikipedia.org/wiki/Algebraic_data_type).\n// Un enum es un tipo que posee un número fijo de valores posibles,\n// cada uno con un nombre distintivo. Go no cuenta con una palabra clave\n// `enum` dedicada en su sintaxis, pero los enums son muy sencillos\n// de implementar usando los modismos habituales del lenguaje.\n\npackage main\n\nimport \"fmt\"\n\n// Nuestro tipo de enumeración `ServerState` tiene un tipo subyacente `int`.\ntype ServerState int\n\n// Los valores posibles para `ServerState` se definen como\n// constantes. La palabra reservada especial [iota](https://go.dev/ref/spec#Iota)\n// genera valores constantes sucesivos de forma automática; en este\n// caso 0, 1, 2 y así sucesivamente.\nconst (\n\tStateIdle ServerState = iota\n\tStateConnected\n\tStateError\n\tStateRetrying\n)\n\n// Al implementar la interfaz [fmt.Stringer](https://pkg.go.dev/fmt#Stringer),\n// los valores de `ServerState` pueden imprimirse o convertirse\n// a cadenas de texto.\n//\n// Esto puede volverse tedioso si hay muchos valores posibles. En tales casos,\n// la herramienta [stringer](https://pkg.go.dev/golang.org/x/tools/cmd/stringer)\n// puede usarse junto con `go:generate` para automatizar el\n// proceso. Consulta [este artículo](https://eli.thegreenplace.net/2021/a-comprehensive-guide-to-go-generate)\n// para una explicación más exhaustiva.\nvar stateName = map[ServerState]string{\n\tStateIdle:      \"idle\",\n\tStateConnected: \"connected\",\n\tStateError:     \"error\",\n\tStateRetrying:  \"retrying\",\n}\n\nfunc (ss ServerState) String() string {\n\treturn stateName[ss]\n}\n\nfunc main() {\n\tns := transition(StateIdle)\n\tfmt.Println(ns)\n\t// Si tenemos un valor de tipo `int`, no podemos pasarlo a `transition`: el\n\t// compilador señalará un error de incompatibilidad de tipos. Esto otorga cierta\n\t// seguridad de tipos en tiempo de compilación para los enums.\n\n\tns2 := transition(ns)\n\tfmt.Println(ns2)\n}\n\n// `transition` emula una transición de estado para un\n// servidor; toma el estado existente y retorna\n// un nuevo estado.\nfunc transition(s ServerState) ServerState {\n\tswitch s {\n\tcase StateIdle:\n\t\treturn StateConnected\n\tcase StateConnected, StateRetrying:\n\t\t// Supongamos que aquí evaluamos ciertos predicados para\n\t\t// determinar el próximo estado...\n\t\treturn StateIdle\n\tcase StateError:\n\t\treturn StateError\n\tdefault:\n\t\tpanic(fmt.Errorf(\"unknown state: %s\", s))\n\t}\n}\n",
    "output": "$ go run enums.go\nconnected\nidle\n",
    "officialUrl": "https://gobyexample.com/enums"
  },
  {
    "id": 23,
    "slug": "struct-embedding",
    "title": "Struct Embedding",
    "titleEs": "Composición y Embebido de Structs (Herencia sin Clases)",
    "category": "Tipos Avanzados y POO en Go",
    "categorySlug": "poo-generics",
    "categoryIcon": "cpu",
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
      {
        "title": "Guía canónica Effective Go: Composición e incrustación de structs e interfaces",
        "url": "https://go.dev/doc/effective_go#embedding",
        "description": "La guía oficial de Go sobre el uso de struct e interface embedding."
      },
      {
        "title": "Especificación de Go: Campos anónimos e incrustados en structs",
        "url": "https://go.dev/ref/spec#Struct_types",
        "description": "Reglas de selectores y promoción de identificadores embebidos."
      },
      {
        "title": "Eli Bendersky: Composición e incrustación de tipos en Go",
        "url": "https://eli.thegreenplace.net/2020/embedding-in-go-part-1-structs/",
        "description": "Artículo detallado de Eli Bendersky sobre los patrones de embebido."
      },
      {
        "title": "Go by Example Original: Struct Embedding",
        "url": "https://gobyexample.com/struct-embedding",
        "description": "Página oficial del ejemplo en Go by Example.",
        "type": "Referencia Original"
      }
    ],
    "code": "// Go admite la _incrustación_ (embedding) de estructuras e interfaces\n// para expresar una _composición_ fluida de tipos.\n// Esto no debe confundirse con [`//go:embed`](embed-directive), que es\n// una directiva del compilador introducida en Go 1.16+ para incrustar\n// archivos y carpetas dentro del binario de la aplicación.\n\npackage main\n\nimport \"fmt\"\n\ntype base struct {\n\tnum int\n}\n\nfunc (b base) describe() string {\n\treturn fmt.Sprintf(\"base with num=%v\", b.num)\n}\n\n// Un `container` _incrusta_ un `base`. Una incrustación se define\n// como un campo sin nombre de identificador.\ntype container struct {\n\tbase\n\tstr string\n}\n\nfunc main() {\n\n\t// Al crear estructuras con literales, debemos inicializar\n\t// la incrustación explícitamente; aquí el tipo incrustado\n\t// actúa como el nombre del campo.\n\tco := container{\n\t\tbase: base{\n\t\t\tnum: 1,\n\t\t},\n\t\tstr: \"some name\",\n\t}\n\n\t// Podemos acceder a los campos de base directamente desde `co`,\n\t// por ejemplo `co.num`.\n\tfmt.Printf(\"co={num: %v, str: %v}\\n\", co.num, co.str)\n\n\t// Como alternativa, podemos escribir la ruta completa utilizando\n\t// el nombre del tipo incrustado.\n\tfmt.Println(\"also num:\", co.base.num)\n\n\t// Dado que `container` incrusta `base`, los métodos de\n\t// `base` también pasan a ser métodos de `container`. Aquí\n\t// invocamos directamente sobre `co` un método incrustado\n\t// desde `base`.\n\tfmt.Println(\"describe:\", co.describe())\n\n\ttype describer interface {\n\t\tdescribe() string\n\t}\n\n\t// Incrustar estructuras con métodos permite otorgar implementaciones\n\t// de interfaces a otras estructuras. Aquí vemos que `container`\n\t// ahora implementa la interfaz `describer` gracias a que incrusta `base`.\n\tvar d describer = co\n\tfmt.Println(\"describer:\", d.describe())\n}\n",
    "output": "$ go run struct-embedding.go\nco={num: 1, str: some name}\nalso num: 1\ndescribe: base with num=1\ndescriber: base with num=1\n",
    "officialUrl": "https://gobyexample.com/struct-embedding"
  },
  {
    "id": 24,
    "slug": "generics",
    "title": "Generics",
    "titleEs": "Genéricos (Type Parameters)",
    "category": "Tipos Avanzados y POO en Go",
    "categorySlug": "poo-generics",
    "categoryIcon": "cpu",
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
      {
        "title": "Tutorial oficial de Go: Introducción a genéricos",
        "url": "https://go.dev/doc/tutorial/generics",
        "description": "Tutorial oficial paso a paso sobre funciones y tipos genéricos."
      },
      {
        "title": "Blog oficial de Go: Introducción oficial a genéricos en Go",
        "url": "https://go.dev/blog/intro-generics",
        "description": "Artículo de lanzamiento de genéricos por Ian Lance Taylor y Robert Griesemer."
      },
      {
        "title": "Paquete cmp (Biblioteca estándar de Go)",
        "url": "https://pkg.go.dev/cmp",
        "description": "Documentación oficial del paquete de comparación y ordenamiento cmp."
      },
      {
        "title": "Go by Example Original: Generics",
        "url": "https://gobyexample.com/generics",
        "description": "Página oficial del ejemplo en Go by Example.",
        "type": "Referencia Original"
      }
    ],
    "code": "// A partir de la versión 1.18, Go añadió soporte para\n// _genéricos_, también conocidos como _parámetros de tipo_.\n\npackage main\n\nimport \"fmt\"\n\n// Como ejemplo de una función genérica, `SlicesIndex` recibe\n// un slice de cualquier tipo `comparable` y un elemento de ese\n// tipo, devolviendo el índice de la primera coincidencia de\n// v en s, o -1 si no está presente. La restricción `comparable`\n// significa que podemos comparar valores de este tipo con los\n// operadores `==` y `!=`. Para una explicación más detallada\n// de esta firma de tipos, consulta [este artículo de blog](https://go.dev/blog/deconstructing-type-parameters).\n// Ten en cuenta que esta función existe en la biblioteca estándar\n// como [slices.Index](https://pkg.go.dev/slices#Index).\nfunc SlicesIndex[S ~[]E, E comparable](s S, v E) int {\n\tfor i := range s {\n\t\tif v == s[i] {\n\t\t\treturn i\n\t\t}\n\t}\n\treturn -1\n}\n\n// Como ejemplo de un tipo genérico, `List` es una\n// lista simplemente enlazada con valores de cualquier tipo.\ntype List[T any] struct {\n\thead, tail *element[T]\n}\n\ntype element[T any] struct {\n\tnext *element[T]\n\tval  T\n}\n\n// Podemos definir métodos sobre tipos genéricos exactamente igual\n// que en los tipos regulares, pero debemos mantener los parámetros\n// de tipo en su lugar. El tipo es `List[T]`, no `List`.\nfunc (lst *List[T]) Push(v T) {\n\tif lst.tail == nil {\n\t\tlst.head = &element[T]{val: v}\n\t\tlst.tail = lst.head\n\t} else {\n\t\tlst.tail.next = &element[T]{val: v}\n\t\tlst.tail = lst.tail.next\n\t}\n}\n\n// AllElements devuelve todos los elementos de la List como un slice.\n// En el siguiente ejemplo veremos una forma más idiomática\n// de iterar sobre todos los elementos de tipos personalizados.\nfunc (lst *List[T]) AllElements() []T {\n\tvar elems []T\n\tfor e := lst.head; e != nil; e = e.next {\n\t\telems = append(elems, e.val)\n\t}\n\treturn elems\n}\n\nfunc main() {\n\tvar s = []string{\"foo\", \"bar\", \"zoo\"}\n\n\t// Al invocar funciones genéricas, con frecuencia podemos confiar\n\t// en la _inferencia de tipos_. Observa que no necesitamos\n\t// especificar los tipos para `S` y `E` al llamar\n\t// a `SlicesIndex`: el compilador los infiere automáticamente.\n\tfmt.Println(\"index of zoo:\", SlicesIndex(s, \"zoo\"))\n\n\t// ... aunque también podríamos especificarlos explícitamente.\n\t_ = SlicesIndex[[]string, string](s, \"zoo\")\n\n\tlst := List[int]{}\n\tlst.Push(10)\n\tlst.Push(13)\n\tlst.Push(23)\n\tfmt.Println(\"list:\", lst.AllElements())\n}\n",
    "output": "$ go run generics.go\nindex of zoo: 2\nlist: [10 13 23]\n",
    "officialUrl": "https://gobyexample.com/generics"
  },
  {
    "id": 25,
    "slug": "range-over-iterators",
    "title": "Range over Iterators",
    "titleEs": "Iteradores con Range (Go 1.22+ y 1.23+)",
    "category": "Tipos Avanzados y POO en Go",
    "categorySlug": "poo-generics",
    "categoryIcon": "cpu",
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
      {
        "title": "Blog oficial de Go: Iteración range sobre tipos de función (Iteradores en Go)",
        "url": "https://go.dev/blog/range-functions",
        "description": "Explicación completa de Russ Cox sobre iteradores y range over func en Go."
      },
      {
        "title": "Paquete iter (Biblioteca estándar de Go)",
        "url": "https://pkg.go.dev/iter",
        "description": "Documentación oficial del paquete iter en la biblioteca estándar."
      },
      {
        "title": "Wiki oficial de Go: Experimento de funciones range",
        "url": "https://go.dev/wiki/RangefuncExperiment",
        "description": "Especificaciones técnicas y diseño de la propuesta de iteradores."
      },
      {
        "title": "Go by Example Original: Range over Iterators",
        "url": "https://gobyexample.com/range-over-iterators",
        "description": "Página oficial del ejemplo en Go by Example.",
        "type": "Referencia Original"
      }
    ],
    "code": "// Desde la versión 1.22, Go agregó soporte para\n// [iteradores definidos por el usuario](https://go.dev/blog/range-functions)\n// para bucles `range`. En la versión 1.23, los iteradores se convirtieron\n// en una característica estándar del lenguaje.\n\npackage main\n\nimport (\n\t\"fmt\"\n\t\"iter\"\n\t\"slices\"\n\t\"strings\"\n)\n\n// En el [ejemplo anterior](generics) implementamos una\n// lista enlazada personalizada y un método `AllElements` que\n// devolvía todos los elementos en un slice. Con iteradores,\n// podemos hacerlo de manera mucho más elegante e idiomática.\ntype List[T any] struct {\n\thead, tail *element[T]\n}\n\ntype element[T any] struct {\n\tnext *element[T]\n\tval  T\n}\n\nfunc (lst *List[T]) Push(v T) {\n\tif lst.tail == nil {\n\t\tlst.head = &element[T]{val: v}\n\t\tlst.tail = lst.head\n\t} else {\n\t\tlst.tail.next = &element[T]{val: v}\n\t\tlst.tail = lst.tail.next\n\t}\n}\n\n// `All` devuelve un iterador, representado en Go por una función\n// con una [firma especial](https://pkg.go.dev/iter#Seq).\nfunc (lst *List[T]) All() iter.Seq[T] {\n\treturn func(yield func(T) bool) {\n\t\t// La función de iterador recibe otra función como\n\t\t// parámetro, llamada `yield` por convención (aunque\n\t\t// el nombre puede ser arbitrario). Invocará `yield` por\n\t\t// cada elemento que deseemos iterar, y verificará el\n\t\t// valor retornado por `yield` para una posible terminación anticipada.\n\t\tfor e := lst.head; e != nil; e = e.next {\n\t\t\tif !yield(e.val) {\n\t\t\t\treturn\n\t\t\t}\n\t\t}\n\t}\n}\n\n// La iteración no requiere una estructura de datos subyacente,\n// ¡y ni siquiera tiene que ser finita! Aquí hay una función\n// que retorna un iterador sobre números de Fibonacci: continúa\n// ejecutándose mientras `yield` siga retornando `true`.\nfunc genFib() iter.Seq[int] {\n\treturn func(yield func(int) bool) {\n\t\ta, b := 0, 1\n\n\t\tfor {\n\t\t\tif !yield(a) {\n\t\t\t\treturn\n\t\t\t}\n\t\t\ta, b = b, a+b\n\t\t}\n\t}\n}\n\nfunc main() {\n\tlst := List[int]{}\n\tlst.Push(10)\n\tlst.Push(13)\n\tlst.Push(23)\n\n\t// Dado que `List.All` retorna un iterador, podemos usarlo\n\t// en un bucle `range` convencional.\n\tfor e := range lst.All() {\n\t\tfmt.Println(e)\n\t}\n\n\t// Paquetes como [slices](https://pkg.go.dev/slices) tienen\n\t// varias funciones útiles para trabajar con iteradores.\n\t// Por ejemplo, `Collect` toma cualquier iterador y reúne\n\t// todos sus valores en un slice.\n\tall := slices.Collect(lst.All())\n\tfmt.Println(\"all:\", all)\n\n\t// Los paquetes de la biblioteca estándar ahora también exponen ayudantes de iteradores.\n\t// Por ejemplo, `strings.SplitSeq` itera sobre partes\n\t// de un slice de bytes sin construir previamente un slice de resultados en memoria.\n\tfor part := range strings.SplitSeq(\"go-by-example\", \"-\") {\n\t\tfmt.Printf(\"part: %s\\n\", part)\n\t}\n\n\tfor n := range genFib() {\n\n\t\t// Una vez que el bucle alcanza un `break` o un retorno anticipado, la función `yield`\n\t\t// pasada al iterador devolverá `false`.\n\t\tif n >= 10 {\n\t\t\tbreak\n\t\t}\n\t\tfmt.Println(n)\n\t}\n}\n",
    "output": "$ go run range-over-iterators.go\n10\n13\n23\nall: [10 13 23]\npart: go\npart: by\npart: example\n0\n1\n1\n2\n3\n5\n8\n",
    "officialUrl": "https://gobyexample.com/range-over-iterators"
  },
  {
    "id": 26,
    "slug": "errors",
    "title": "Errors",
    "titleEs": "Manejo Idiomático de Errores",
    "category": "Manejo de Errores y Excepciones",
    "categorySlug": "errores-panico",
    "categoryIcon": "shield",
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
      {
        "title": "Blog oficial de Go: Manejo de árboles de errores e inspección con Go 1.13",
        "url": "https://go.dev/blog/go1.13-errors",
        "description": "El artículo canónico sobre error wrapping, errors.Is y errors.As."
      },
      {
        "title": "Guía canónica Effective Go: Manejo y formateo de errores",
        "url": "https://go.dev/doc/effective_go#errors",
        "description": "Convenciones oficiales para el formateo y manejo de errores."
      },
      {
        "title": "Paquete errors (Biblioteca estándar de Go)",
        "url": "https://pkg.go.dev/errors",
        "description": "Documentación oficial del paquete errors, Join, Is y As."
      },
      {
        "title": "Go by Example Original: Errors",
        "url": "https://gobyexample.com/errors",
        "description": "Página oficial del ejemplo en Go by Example.",
        "type": "Referencia Original"
      }
    ],
    "code": "// En Go es idiomático comunicar errores mediante un\n// valor de retorno explícito y separado. Esto contrasta con\n// las excepciones utilizadas en lenguajes como Java, Python y\n// Ruby, y con el valor único sobrecargado de resultado/error\n// usado a veces en C. El enfoque de Go facilita\n// identificar qué funciones retornan errores y manejarlos\n// utilizando las mismas estructuras del lenguaje empleadas para\n// tareas ordinarias.\n//\n// Consulta la documentación del [paquete errors](https://pkg.go.dev/errors)\n// y [este artículo de blog](https://go.dev/blog/go1.13-errors) para obtener\n// detalles adicionales.\n\npackage main\n\nimport (\n\t\"errors\"\n\t\"fmt\"\n)\n\n// Por convención, los errores se ubican como el último valor de retorno y\n// tienen el tipo `error`, una interfaz incorporada en el lenguaje.\nfunc f(arg int) (int, error) {\n\tif arg == 42 {\n\t\t// `errors.New` construye un valor `error` básico\n\t\t// con el mensaje de error especificado.\n\t\treturn -1, errors.New(\"can't work with 42\")\n\t}\n\n\t// Un valor `nil` en la posición del error indica que\n\t// no hubo ningún error.\n\treturn arg + 3, nil\n}\n\n// Un error centinela (sentinel error) es una variable predeclarada que se utiliza para\n// señalar una condición de error específica.\nvar ErrOutOfTea = errors.New(\"no more tea available\")\nvar ErrPower = errors.New(\"can't boil water\")\n\nfunc makeTea(arg int) error {\n\tif arg == 2 {\n\t\treturn ErrOutOfTea\n\t} else if arg == 4 {\n\n\t\t// Podemos envolver errores con errores de nivel superior para añadir\n\t\t// contexto. La forma más sencilla de lograrlo es con el\n\t\t// verbo `%w` en `fmt.Errorf`. Los errores envueltos\n\t\t// forman una cadena lógica (A envuelve a B, que envuelve a C, etc.)\n\t\t// que puede consultarse mediante funciones como `errors.Is`\n\t\t// y `errors.AsType`.\n\t\treturn fmt.Errorf(\"making tea: %w\", ErrPower)\n\t}\n\treturn nil\n}\n\nfunc main() {\n\tfor _, i := range []int{7, 42} {\n\n\t\t// Es idiomático realizar la comprobación de errores en línea dentro de la\n\t\t// cláusula `if`.\n\t\tif r, e := f(i); e != nil {\n\t\t\tfmt.Println(\"f failed:\", e)\n\t\t} else {\n\t\t\tfmt.Println(\"f worked:\", r)\n\t\t}\n\t}\n\n\tfor i := range 5 {\n\t\tif err := makeTea(i); err != nil {\n\n\t\t\t// `errors.Is` comprueba si un error dado (o cualquiera en su cadena)\n\t\t\t// coincide con un valor de error específico. Esto resulta especialmente útil con errores\n\t\t\t// anidados o envueltos, permitiendo identificar errores centinela en una cadena.\n\t\t\tif errors.Is(err, ErrOutOfTea) {\n\t\t\t\tfmt.Println(\"We should buy new tea!\")\n\t\t\t} else if errors.Is(err, ErrPower) {\n\t\t\t\tfmt.Println(\"Now it is dark.\")\n\t\t\t} else {\n\t\t\t\tfmt.Printf(\"unknown error: %s\\n\", err)\n\t\t\t}\n\t\t\tcontinue\n\t\t}\n\n\t\tfmt.Println(\"Tea is ready!\")\n\t}\n}\n",
    "output": "$ go run errors.go\nf worked: 10\nf failed: can't work with 42\nTea is ready!\nTea is ready!\nWe should buy new tea!\nTea is ready!\nNow it is dark.\n",
    "officialUrl": "https://gobyexample.com/errors"
  },
  {
    "id": 27,
    "slug": "custom-errors",
    "title": "Custom Errors",
    "titleEs": "Errores Personalizados y Tipos de Error",
    "category": "Manejo de Errores y Excepciones",
    "categorySlug": "errores-panico",
    "categoryIcon": "shield",
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
      {
        "title": "Tour interactivo de Go: Manejo idiomático de errores",
        "url": "https://go.dev/tour/methods/19",
        "description": "Implementación de errores personalizados en el tour oficial."
      },
      {
        "title": "Dave Cheney: No solo compruebes errores, gestiónalos con elegancia",
        "url": "https://dave.cheney.net/2016/04/27/dont-just-check-errors-handle-them-gracefully",
        "description": "Artículo de referencia sobre diseño e inspección de errores en Go."
      },
      {
        "title": "Blog oficial de Go: Manejo idiomático de errores",
        "url": "https://go.dev/blog/error-handling-and-go",
        "description": "Patrones de diseño de errores de la biblioteca estándar."
      },
      {
        "title": "Go by Example Original: Custom Errors",
        "url": "https://gobyexample.com/custom-errors",
        "description": "Página oficial del ejemplo en Go by Example.",
        "type": "Referencia Original"
      }
    ],
    "code": "// Es posible definir tipos de error personalizados\n// implementando en ellos el método `Error()`. Aquí tenemos una\n// variante del ejemplo anterior que utiliza un tipo personalizado\n// para representar explícitamente un error de argumento.\n\npackage main\n\nimport (\n\t\"errors\"\n\t\"fmt\"\n)\n\n// Un tipo de error personalizado habitualmente lleva el sufijo \"Error\".\ntype argError struct {\n\targ     int\n\tmessage string\n}\n\n// Añadir este método `Error` hace que `argError` implemente\n// la interfaz `error`.\nfunc (e *argError) Error() string {\n\treturn fmt.Sprintf(\"%d - %s\", e.arg, e.message)\n}\n\nfunc f(arg int) (int, error) {\n\tif arg == 42 {\n\n\t\t// Retornamos nuestro error personalizado.\n\t\treturn -1, &argError{arg, \"can't work with it\"}\n\t}\n\treturn arg + 3, nil\n}\n\nfunc main() {\n\n\t// `errors.AsType` es una versión avanzada de `errors.Is`.\n\t// Comprueba si un error dado (o cualquiera en su cadena)\n\t// coincide con un tipo de error específico y lo convierte a un valor\n\t// de dicho tipo, devolviendo además `true`. Si no hay coincidencia, el\n\t// segundo valor retornado es `false`.\n\t_, err := f(42)\n\tif ae, ok := errors.AsType[*argError](err); ok {\n\t\tfmt.Println(ae.arg)\n\t\tfmt.Println(ae.message)\n\t} else {\n\t\tfmt.Println(\"err doesn't match argError\")\n\t}\n}\n",
    "output": "$ go run custom-errors.go\n42\ncan't work with it\n",
    "officialUrl": "https://gobyexample.com/custom-errors"
  },
  {
    "id": 28,
    "slug": "goroutines",
    "title": "Goroutines",
    "titleEs": "Goroutines (Hilos Ligeros de Concurrencia)",
    "category": "Concurrencia y Canales",
    "categorySlug": "concurrencia-canales",
    "categoryIcon": "rocket",
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
      {
        "title": "Tour interactivo de Go: Goroutines y concurrencia",
        "url": "https://go.dev/tour/concurrency/1",
        "description": "Práctica con goroutines en el tour interactivo."
      },
      {
        "title": "Guía canónica Effective Go: Goroutines y procesos ligeros",
        "url": "https://go.dev/doc/effective_go#goroutines",
        "description": "Filosofía del diseño concurrente de Go."
      },
      {
        "title": "Ardan Labs: El planificador de tareas (Scheduler) de Go en profundidad",
        "url": "https://www.ardanlabs.com/blog/2018/08/scheduling-in-go-part1.html",
        "description": "Trilogía de artículos en profundidad sobre el funcionamiento del scheduler de Go."
      },
      {
        "title": "Go by Example Original: Goroutines",
        "url": "https://gobyexample.com/goroutines",
        "description": "Página oficial del ejemplo en Go by Example.",
        "type": "Referencia Original"
      }
    ],
    "code": "// Una _goroutine_ es un hilo ligero de ejecución gestionado por el runtime de Go.\n\npackage main\n\nimport (\n\t\"fmt\"\n\t\"time\"\n)\n\nfunc f(from string) {\n\tfor i := range 3 {\n\t\tfmt.Println(from, \":\", i)\n\t}\n}\n\nfunc main() {\n\n\t// Supongamos que tenemos una llamada a función `f(s)`. Así es como\n\t// la llamaríamos de la manera habitual, ejecutándola\n\t// de forma síncrona.\n\tf(\"direct\")\n\n\t// Para invocar esta función en una goroutine, usa\n\t// `go f(s)`. Esta nueva goroutine se ejecutará\n\t// de manera concurrente con la función invocadora.\n\tgo f(\"goroutine\")\n\n\t// También puedes iniciar una goroutine para una llamada\n\t// a función anónima.\n\tgo func(msg string) {\n\t\tfmt.Println(msg)\n\t}(\"going\")\n\n\t// Nuestras dos llamadas a función se están ejecutando asíncronamente en\n\t// goroutines separadas en este momento. Esperamos a que terminen\n\t// (para un enfoque más robusto y profesional, usa un [WaitGroup](waitgroups)).\n\ttime.Sleep(time.Second)\n\tfmt.Println(\"done\")\n}\n",
    "output": "# Al ejecutar este programa, observamos primero la salida de la llamada\n# bloqueante (síncrona), seguida por la salida de las dos\n# goroutines. La salida de las goroutines puede aparecer intercalada,\n# ya que el runtime de Go las ejecuta concurrentemente.\n$ go run goroutines.go\ndirect : 0\ndirect : 1\ndirect : 2\ngoroutine : 0\ngoing\ngoroutine : 1\ngoroutine : 2\ndone\n\n# A continuación veremos el complemento ideal para las goroutines en\n# programas concurrentes de Go: los canales.\n",
    "officialUrl": "https://gobyexample.com/goroutines"
  },
  {
    "id": 29,
    "slug": "channels",
    "title": "Channels",
    "titleEs": "Canales (Channels) y Comunicación",
    "category": "Concurrencia y Canales",
    "categorySlug": "concurrencia-canales",
    "categoryIcon": "rocket",
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
      {
        "title": "Tour interactivo de Go: Canales de comunicación",
        "url": "https://go.dev/tour/concurrency/2",
        "description": "Ejercicios con canales y sincronización básica."
      },
      {
        "title": "Guía canónica Effective Go: Canales y comunicación concurrente",
        "url": "https://go.dev/doc/effective_go#channels",
        "description": "Principios de comunicación y concurrencia con canales."
      },
      {
        "title": "Kavya Joshi: Entendiendo la estructura interna de los canales en Go",
        "url": "https://www.youtube.com/watch?v=KBZlN0nGxzU",
        "description": "Charla magistral de GopherCon sobre la estructura hchan y funcionamiento interno."
      },
      {
        "title": "Go by Example Original: Channels",
        "url": "https://gobyexample.com/channels",
        "description": "Página oficial del ejemplo en Go by Example.",
        "type": "Referencia Original"
      }
    ],
    "code": "// Los _canales_ (channels) son los conductos que comunican goroutines\n// concurrentes. Puedes enviar valores a los canales desde una\n// goroutine y recibir dichos valores en otra\n// goroutine.\n\npackage main\n\nimport \"fmt\"\n\nfunc main() {\n\n\t// Crea un nuevo canal con `make(chan val-type)`.\n\t// Los canales están tipados según los valores que transmiten.\n\tmessages := make(chan string)\n\n\t// _Envía_ un valor a un canal utilizando la sintaxis\n\t// `channel <-`. Aquí enviamos `\"ping\"` al canal `messages`\n\t// que creamos arriba, desde una nueva goroutine.\n\tgo func() { messages <- \"ping\" }()\n\n\t// La sintaxis `<-channel` _recibe_ un valor desde el\n\t// canal. Aquí recibiremos el mensaje `\"ping\"` que\n\t// enviamos anteriormente y lo imprimiremos.\n\tmsg := <-messages\n\tfmt.Println(msg)\n}\n",
    "output": "# Al ejecutar el programa, el mensaje `\"ping\"` se\n# transmite exitosamente de una goroutine a otra a través\n# de nuestro canal.\n$ go run channels.go \nping\n\n# Por defecto, los envíos y recepciones se bloquean hasta que tanto el\n# emisor como el receptor estén listos. Esta propiedad nos permitió\n# esperar al final de nuestro programa la llegada del mensaje `\"ping\"`\n# sin necesidad de recurrir a ningún otro mecanismo de sincronización.\n",
    "officialUrl": "https://gobyexample.com/channels"
  },
  {
    "id": 30,
    "slug": "channel-buffering",
    "title": "Channel Buffering",
    "titleEs": "Canales con Búfer (Buffered Channels)",
    "category": "Concurrencia y Canales",
    "categorySlug": "concurrencia-canales",
    "categoryIcon": "rocket",
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
      {
        "title": "Tour interactivo de Go: Canales con búfer",
        "url": "https://go.dev/tour/concurrency/3",
        "description": "Práctica con canales con capacidad en el tour interactivo."
      },
      {
        "title": "Guía canónica Effective Go: Canales con búfer como semáforos",
        "url": "https://go.dev/doc/effective_go#buffered_channels",
        "description": "Uso de canales con búfer como semáforos de concurrencia."
      },
      {
        "title": "Especificación de Go: Tipos de canal y operadores de comunicación",
        "url": "https://go.dev/ref/spec#Channel_types",
        "description": "Especificación del estándar sobre capacidad y almacenamiento en canales."
      },
      {
        "title": "Go by Example Original: Channel Buffering",
        "url": "https://gobyexample.com/channel-buffering",
        "description": "Página oficial del ejemplo en Go by Example.",
        "type": "Referencia Original"
      }
    ],
    "code": "// Por defecto los canales son _no almacenados en búfer_ (unbuffered), lo que significa que\n// solo aceptarán envíos (`chan <-`) si existe una\n// recepción correspondiente (`<- chan`) lista para recibir el\n// valor enviado. Los _canales con búfer_ (buffered channels) aceptan una cantidad\n// limitada de valores sin que exista un receptor concurrente para ellos.\n\npackage main\n\nimport \"fmt\"\n\nfunc main() {\n\n\t// Aquí creamos con `make` un canal de cadenas con búfer de hasta\n\t// 2 valores.\n\tmessages := make(chan string, 2)\n\n\t// Dado que este canal tiene búfer, podemos enviar estos\n\t// valores al canal sin una recepción concurrente\n\t// correspondiente.\n\tmessages <- \"buffered\"\n\tmessages <- \"channel\"\n\n\t// Posteriormente podemos recibir ambos valores como de costumbre.\n\tfmt.Println(<-messages)\n\tfmt.Println(<-messages)\n}\n",
    "output": "$ go run channel-buffering.go \nbuffered\nchannel\n",
    "officialUrl": "https://gobyexample.com/channel-buffering"
  },
  {
    "id": 31,
    "slug": "channel-synchronization",
    "title": "Channel Synchronization",
    "titleEs": "Sincronización con Canales",
    "category": "Concurrencia y Canales",
    "categorySlug": "concurrencia-canales",
    "categoryIcon": "rocket",
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
      {
        "title": "Modelo de memoria de Go: Comunicación por canales",
        "url": "https://go.dev/ref/mem#chan",
        "description": "Especificación oficial de las garantías happens-before en canales."
      },
      {
        "title": "Go by Example Original: Channel Synchronization",
        "url": "https://gobyexample.com/channel-synchronization",
        "description": "Ejemplo original en Go by Example."
      },
      {
        "title": "Guía canónica Effective Go: Coordinación y primitivas de sincronización",
        "url": "https://go.dev/doc/effective_go#concurrency",
        "description": "Principios de diseño sobre coordinación de procesos ligeros."
      }
    ],
    "code": "// Podemos usar canales para sincronizar la ejecución\n// entre distintas goroutines. Aquí tenemos un ejemplo de cómo usar una\n// recepción bloqueante para esperar a que una goroutine finalice.\n// Al esperar que terminen múltiples goroutines,\n// suele ser preferible utilizar un [WaitGroup](waitgroups).\n\npackage main\n\nimport (\n\t\"fmt\"\n\t\"time\"\n)\n\n// Esta es la función que ejecutaremos en una goroutine. El\n// canal `done` se utilizará para notificar a otra\n// goroutine que el trabajo de esta función ha finalizado.\nfunc worker(done chan bool) {\n\tfmt.Print(\"working...\")\n\ttime.Sleep(time.Second)\n\tfmt.Println(\"done\")\n\n\t// Enviamos un valor para notificar que hemos terminado.\n\tdone <- true\n}\n\nfunc main() {\n\n\t// Iniciamos una goroutine trabajadora, entregándole el canal para\n\t// que nos notifique.\n\tdone := make(chan bool, 1)\n\tgo worker(done)\n\n\t// Nos bloqueamos hasta recibir la notificación de la\n\t// goroutine trabajadora a través del canal.\n\t<-done\n}\n",
    "output": "$ go run channel-synchronization.go      \nworking...done                  \n\n# Si eliminaras la línea `<- done` de este programa,\n# el programa podría terminar antes de que el `worker` finalizara\n# su trabajo, o en algunos casos incluso antes de que comenzara.\n",
    "officialUrl": "https://gobyexample.com/channel-synchronization"
  },
  {
    "id": 32,
    "slug": "channel-directions",
    "title": "Channel Directions",
    "titleEs": "Direcciones de Canales en Parámetros",
    "category": "Concurrencia y Canales",
    "categorySlug": "concurrencia-canales",
    "categoryIcon": "rocket",
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
      {
        "title": "Especificación de Go: Direcciones de canal (solo envío y solo recepción)",
        "url": "https://go.dev/ref/spec#Channel_types",
        "description": "Especificación formal de la sintaxis y reglas de canales direccionales."
      },
      {
        "title": "Blog oficial de Go: Patrones de concurrencia: Diseño de pipelines de procesamiento",
        "url": "https://go.dev/blog/pipelines",
        "description": "Guía canónica de diseño de pipelines concurrentes con canales direccionados."
      },
      {
        "title": "Guía canónica Effective Go: Canales de canales y multiplexación",
        "url": "https://go.dev/doc/effective_go#chan_of_chan",
        "description": "Patrones avanzados con canales en Effective Go."
      },
      {
        "title": "Go by Example Original: Channel Directions",
        "url": "https://gobyexample.com/channel-directions",
        "description": "Página oficial del ejemplo en Go by Example.",
        "type": "Referencia Original"
      }
    ],
    "code": "// Al usar canales como parámetros de funciones, puedes\n// especificar si el canal está destinado únicamente a enviar o a recibir\n// valores. Esta especificidad incrementa la seguridad de tipos\n// del programa en tiempo de compilación.\n\npackage main\n\nimport \"fmt\"\n\n// Esta función `ping` solo acepta un canal para enviar\n// valores. Intentar recibir desde este canal generaría\n// un error en tiempo de compilación.\nfunc ping(pings chan<- string, msg string) {\n\tpings <- msg\n}\n\n// La función `pong` acepta un canal para recepciones\n// (`pings`) y un segundo canal para envíos (`pongs`).\nfunc pong(pings <-chan string, pongs chan<- string) {\n\tmsg := <-pings\n\tpongs <- msg\n}\n\nfunc main() {\n\tpings := make(chan string, 1)\n\tpongs := make(chan string, 1)\n\tping(pings, \"passed message\")\n\tpong(pings, pongs)\n\tfmt.Println(<-pongs)\n}\n",
    "output": "$ go run channel-directions.go\npassed message\n",
    "officialUrl": "https://gobyexample.com/channel-directions"
  },
  {
    "id": 33,
    "slug": "select",
    "title": "Select",
    "titleEs": "Multiplexación con Select",
    "category": "Concurrencia y Canales",
    "categorySlug": "concurrencia-canales",
    "categoryIcon": "rocket",
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
      {
        "title": "Tour interactivo de Go: Multiplexación con select",
        "url": "https://go.dev/tour/concurrency/5",
        "description": "Práctica con la sentencia select en el tour oficial."
      },
      {
        "title": "Especificación de Go: Sentencias select de comunicación múltiple",
        "url": "https://go.dev/ref/spec#Select_statements",
        "description": "Especificación de las reglas de ejecución y evaluación de select."
      },
      {
        "title": "Blog oficial de Go: Patrones de concurrencia: Tiempos de espera y cancelación",
        "url": "https://go.dev/blog/concurrency-timeouts",
        "description": "Técnicas avanzadas de timeouts y cancelación con select."
      },
      {
        "title": "Go by Example Original: Select",
        "url": "https://gobyexample.com/select",
        "description": "Página oficial del ejemplo en Go by Example.",
        "type": "Referencia Original"
      }
    ],
    "code": "// La sentencia _select_ de Go te permite esperar sobre múltiples operaciones\n// de canales. Combinar goroutines y canales con\n// select constituye una de las características más potentes de Go.\n\npackage main\n\nimport (\n\t\"fmt\"\n\t\"time\"\n)\n\nfunc main() {\n\n\t// Para nuestro ejemplo haremos un select sobre dos canales.\n\tc1 := make(chan string)\n\tc2 := make(chan string)\n\n\t// Cada canal recibirá un valor después de cierto tiempo,\n\t// para simular, por ejemplo, operaciones RPC bloqueantes\n\t// ejecutándose en goroutines concurrentes.\n\tgo func() {\n\t\ttime.Sleep(1 * time.Second)\n\t\tc1 <- \"one\"\n\t}()\n\tgo func() {\n\t\ttime.Sleep(2 * time.Second)\n\t\tc2 <- \"two\"\n\t}()\n\n\t// Usaremos `select` para esperar ambos valores de forma\n\t// simultánea, imprimiendo cada uno a medida que arribe.\n\tfor range 2 {\n\t\tselect {\n\t\tcase msg1 := <-c1:\n\t\t\tfmt.Println(\"received\", msg1)\n\t\tcase msg2 := <-c2:\n\t\t\tfmt.Println(\"received\", msg2)\n\t\t}\n\t}\n}\n",
    "output": "# Recibimos los valores `\"one\"` y luego `\"two\"` como\n# se esperaba.\n$ time go run select.go \nreceived one\nreceived two\n\n# Ten en cuenta que el tiempo total de ejecución es de apenas ~2 segundos,\n# ya que ambos `Sleep` de 1 y 2 segundos se ejecutan de\n# forma concurrente.\nreal\t0m2.245s\n",
    "officialUrl": "https://gobyexample.com/select"
  },
  {
    "id": 34,
    "slug": "timeouts",
    "title": "Timeouts",
    "titleEs": "Timeouts y Temporizadores en Canales",
    "category": "Concurrencia y Canales",
    "categorySlug": "concurrencia-canales",
    "categoryIcon": "rocket",
    "difficulty": "Intermedio",
    "summary": "Control de límites de tiempo para operaciones concurrentes mediante la combinación de select y time.After.",
    "originalExpl": "Los timeouts son importantes para programas que se conectan a recursos externos o que necesitan limitar el tiempo de ejecución. Implementar timeouts en Go es fácil y elegante gracias a los canales y select.",
    "basicExpl": {
      "title": "Conceptos Fundamentales para Principiantes",
      "content": "Si pides una pizza y te dicen que llega en 30 minutos, esperas. Pero si pasan 2 horas, no te quedas esperando en la puerta el resto de tu vida: cancelas el pedido y haces otra cosa.\nEn programación, un 'timeout' evita que tu aplicación se quede congelada para siempre esperando la respuesta de un servidor lento:\n- `select` escucha dos cosas: el canal con la respuesta que esperas (`<-respuesta`) y un reloj despertador (`<-time.After(2 * time.Second)`).\n- Si la respuesta llega primero, la procesas.\n- Si el reloj suena primero, abortas la espera con un mensaje de tiempo agotado.",
      "keyPoints": [
        "`time.After(duracion)` devuelve un canal que emite la hora actual tras expirar el tiempo.",
        "Se combina con `select` para competir contra canales de respuesta de red o bases de datos.",
        "Evita que goroutines queden colgadas indefinidamente consumiendo recursos."
      ]
    },
    "interExpl": {
      "title": "Mecanismos Internos y Buenas Prácticas",
      "content": "Trampa de Fuga de Memoria con `time.After` en bucles (Timer Leak):\n`time.After(d)` crea un temporizador interno administrado por el runtime. Dicho temporizador NO es recolectado por el Garbage Collector hasta que el tiempo expire, incluso si la otra rama del select ganó inmediatamente.\nSi llamas a `time.After` repetidamente dentro de un bucle `for` rápido que procesa miles de mensajes por segundo, crearás miles de timers en memoria que saturarán el heap y el CPU.\nBuena práctica: Para bucles repetitivos, reutiliza una instancia única de `time.NewTimer(d)` y resetéala con `timer.Reset(d)`.",
      "keyPoints": [
        "Timer Leak en bucles: evitar `time.After` dentro de bucles de alta frecuencia.",
        "Uso de `time.NewTimer`: permite llamar a `timer.Stop()` y `timer.Reset()` reutilizando el objeto.",
        "Relación con `context.WithTimeout`: en aplicaciones modernas de Go, se prefiere usar el paquete `context` para propagar timeouts jerárquicos."
      ]
    },
    "expertExpl": {
      "title": "Bajo Nivel, Rendimiento e Internals",
      "content": "Evolución del subsistema de timers en el runtime de Go:\nHistóricamente (Go 1.9), todos los timers residían en una lista global protegida por un único mutex central que sufría grave contención en servidores con muchas CPUs. En Go 1.14+, los timers se integraron directamente en la estructura de cada procesador lógico `P` (procesador local del scheduler), eliminando la contención global.\n\nEn Go 1.23, se resolvió definitivamente el problema de limpieza: los canales de timers no referenciados ahora pueden ser recolectados por el GC inmediatamente sin esperar a que el temporizador expire.",
      "keyPoints": [
        "Timers integrados en P: gestión local de temporizadores por cada procesador del scheduler de Go.",
        "Mejora en Go 1.23: Garbage collection inmediata de timers no alcanzables.",
        "Syscall epoll/kqueue: el runtime programa interrupciones de temporizador de alta precisión utilizando las APIs del kernel del SO."
      ]
    },
    "evaluation": {
      "title": "Reto: Consulta de Red con Timeout Estricto",
      "statement": "Simula una llamada a una API que tarda 250ms en responder. Implementa un select con un timeout estricto de 100ms usando time.After. Muestra un mensaje de error por tiempo agotado y luego repite la prueba con un timeout holgado de 400ms.",
      "starterCode": "package main\n\nimport (\n    \"fmt\"\n    \"time\"\n)\n\nfunc consultarServicio() <-chan string {\n    ch := make(chan string, 1)\n    go func() {\n        time.Sleep(250 * time.Millisecond)\n        ch <- \"Datos recibidos con éxito\"\n    }()\n    return ch\n}\n\nfunc main() {\n    // Prueba 1: Timeout de 100ms (debe fallar)\n    // Prueba 2: Timeout de 400ms (debe tener éxito)\n}",
      "hint": "Usa select { case res := <-consultarServicio(): ... case <-time.After(100 * time.Millisecond): ... }.",
      "solution": "package main\n\nimport (\n    \"fmt\"\n    \"time\"\n)\n\nfunc consultarServicio() <-chan string {\n    ch := make(chan string, 1)\n    go func() {\n        time.Sleep(250 * time.Millisecond)\n        ch <- \"Datos recibidos con éxito\"\n    }()\n    return ch\n}\n\nfunc main() {\n    fmt.Println(\"--- Prueba 1: Timeout estricto (100ms) ---\")\n    select {\n    case res := <-consultarServicio():\n        fmt.Println(\"Respuesta:\", res)\n    case <-time.After(100 * time.Millisecond):\n        fmt.Println(\"Alerta: Timeout alcanzado (servicio demasiado lento)\")\n    }\n    \n    fmt.Println(\"\\n--- Prueba 2: Timeout holgado (400ms) ---\")\n    select {\n    case res := <-consultarServicio():\n        fmt.Println(\"Respuesta:\", res)\n    case <-time.After(400 * time.Millisecond):\n        fmt.Println(\"Alerta: Timeout alcanzado\")\n    }\n}",
      "explanation": "El select multiplexa la respuesta del canal frente al temporizador time.After. En la primera prueba, el temporizador de 100ms se dispara antes de los 250ms que tarda el servicio, protegiendo a la aplicación de bloqueos lentos. En la segunda, el servicio responde en 250ms antes de que expiren los 400ms."
    },
    "externalLinks": [
      {
        "title": "Blog oficial de Go: Gestión de tiempos de espera y cancelación en concurrencia",
        "url": "https://go.dev/blog/concurrency-timeouts",
        "description": "Artículo oficial de Go sobre el patrón canónico de timeout con canales."
      },
      {
        "title": "Paquete time: After and Timer",
        "url": "https://pkg.go.dev/time#After",
        "description": "Documentación oficial de la biblioteca estándar para time.After."
      },
      {
        "title": "Go by Example Original: Timeouts",
        "url": "https://gobyexample.com/timeouts",
        "description": "Ejemplo interactivo en Go by Example."
      }
    ],
    "code": "// Los _tiempos de espera_ (timeouts) son vitales para programas que se conectan a\n// recursos externos o que de algún modo necesitan acotar\n// el tiempo de ejecución. Implementar timeouts en Go es sencillo y\n// elegante gracias a los canales y a la sentencia `select`.\n\npackage main\n\nimport (\n\t\"fmt\"\n\t\"time\"\n)\n\nfunc main() {\n\n\t// Para nuestro ejemplo, supongamos que ejecutamos una llamada\n\t// externa que retorna su resultado en un canal `c1`\n\t// tras 2s. Nota que el canal tiene búfer, por lo que el\n\t// envío en la goroutine no es bloqueante. Este es un\n\t// patrón común para prevenir fugas de goroutines (goroutine leaks) si el\n\t// canal nunca llega a leerse.\n\tc1 := make(chan string, 1)\n\tgo func() {\n\t\ttime.Sleep(2 * time.Second)\n\t\tc1 <- \"result 1\"\n\t}()\n\n\t// Aquí está el `select` que implementa el tiempo de espera.\n\t// `res := <-c1` aguarda el resultado y `<-time.After`\n\t// aguarda el envío de un valor tras un timeout de\n\t// 1s. Dado que `select` procede con la primera\n\t// recepción lista, tomaremos el caso de timeout\n\t// si la operación demora más del segundo permitido.\n\tselect {\n\tcase res := <-c1:\n\t\tfmt.Println(res)\n\tcase <-time.After(1 * time.Second):\n\t\tfmt.Println(\"timeout 1\")\n\t}\n\n\t// Si permitimos un timeout más holgado de 3s, la recepción\n\t// desde `c2` tendrá éxito e imprimiremos el resultado.\n\tc2 := make(chan string, 1)\n\tgo func() {\n\t\ttime.Sleep(2 * time.Second)\n\t\tc2 <- \"result 2\"\n\t}()\n\tselect {\n\tcase res := <-c2:\n\t\tfmt.Println(res)\n\tcase <-time.After(3 * time.Second):\n\t\tfmt.Println(\"timeout 2\")\n\t}\n}\n",
    "output": "# Ejecutar este programa muestra cómo la primera operación agota el tiempo\n# de espera (timeout) y la segunda culmina con éxito.\n$ go run timeouts.go \ntimeout 1\nresult 2\n",
    "officialUrl": "https://gobyexample.com/timeouts"
  },
  {
    "id": 35,
    "slug": "non-blocking-channel-operations",
    "title": "Non-Blocking Channel Operations",
    "titleEs": "Operaciones No Bloqueantes en Canales",
    "category": "Concurrencia y Canales",
    "categorySlug": "concurrencia-canales",
    "categoryIcon": "rocket",
    "difficulty": "Intermedio",
    "summary": "Envíos y recepciones que continúan de inmediato sin pausar la goroutine si el canal no está listo, usando select con default.",
    "originalExpl": "Los envíos y recepciones básicos en canales son bloqueantes. Sin embargo, podemos usar select con una cláusula default para implementar envíos, recepciones e incluso select multidireccionales no bloqueantes.",
    "basicExpl": {
      "title": "Conceptos Fundamentales para Principiantes",
      "content": "Normalmente, si intentas recibir de un canal vacío, te quedas esperando hasta que alguien mande algo. Si intentas enviar a un canal lleno, te quedas esperando hasta que alguien libere espacio.\nUna 'operación no bloqueante' es como asomarte a mirar: si hay algo listo, lo tomas; si no hay nada, no te quedas esperando y continúas con tu trabajo de inmediato.\n- Se logra añadiendo la cláusula `default` dentro de un bloque `select`.\n- Si el canal está listo, entra al `case`.\n- Si no está listo, salta instantáneamente al `default`.",
      "keyPoints": [
        "Un bloque `select` con rama `default` NUNCA se bloquea.",
        "Permite consultar el estado de un canal ('polling') de forma instantánea.",
        "Sirve tanto para intentar recibir (`case v := <-ch`) como para intentar enviar (`case ch <- v`)."
      ]
    },
    "interExpl": {
      "title": "Mecanismos Internos y Buenas Prácticas",
      "content": "Casos de uso clave de operaciones no bloqueantes:\n1. Descarte controlado de mensajes (Drop Pattern / Shed Load): Si un sistema de logging o métricas no puede enviar un dato porque el canal está lleno, es preferible descartar el log antes que congelar la aplicación principal:\n```go\nselect {\ncase logsCh <- nuevoLog:\n    // Enviado con éxito\ndefault:\n    // Búfer lleno: descartamos el log para no ralentizar la API\n    metricas.IncrementarDescartes()\n}\n```\n2. Comprobación instantánea de cancelación de contexto o apagado sin detener el flujo.",
      "keyPoints": [
        "Drop Pattern: Descarte deliberado de eventos secundarios ante saturación del consumidor.",
        "Recepción no bloqueante: `select { case msg := <-ch: ... default: ... }`.",
        "Evitar bucles de consumo ocupado (busy loops): nunca hagas un bucle `for { select { ... default: } }` sin pausas porque consumirá el 100% de la CPU."
      ]
    },
    "expertExpl": {
      "title": "Bajo Nivel, Rendimiento e Internals",
      "content": "El compilador de Go optimiza los bloques `select` con default y un único caso (`selectnbrecv` o `selectnbsend`) eliminando por completo la maquinaria compleja de registro de goroutines y suspensión en el scheduler.\n\nEn su lugar, el código máquina generado simplemente adquiere el mutex interno del canal (`hchan.lock`), comprueba si `qcount > 0` (o si hay receptores en `recvq`), realiza la transferencia atómica y libera el lock de inmediato. Todo el proceso toma solo unos 20-30 nanosegundos y no involucra cambios de contexto de la CPU.",
      "keyPoints": [
        "Optimización selectnbrecv/selectnbsend: invocación directa a funciones especializadas en runtime/chan.go.",
        "Zero context switch: si el canal no está listo, el flujo salta al default sin pausar la goroutine.",
        "Intensidad de CPU en busy polling: si necesitas esperar activamente, agrega `runtime.Gosched()` o pausas controladas."
      ]
    },
    "evaluation": {
      "title": "Reto: Buffer de Notificaciones con Descarte Inteligente",
      "statement": "Crea una función 'intentarNotificar(ch chan<- string, mensaje string) bool' que use un select con default para intentar enviar un mensaje a un canal con búfer de 2 elementos. Si el canal está lleno, descarta el mensaje y devuelve false. En main, prueba enviando 3 mensajes consecutivos e imprime el resultado de cada intento.",
      "starterCode": "package main\n\nimport \"fmt\"\n\nfunc intentarNotificar(ch chan<- string, mensaje string) bool {\n    // Implementa el envío no bloqueante con select y default\n}\n\nfunc main() {\n    ch := make(chan string, 2)\n    // Intenta enviar 3 mensajes\n}",
      "hint": "Dentro de la función haz: select { case ch <- mensaje: return true; default: return false }.",
      "solution": "package main\n\nimport \"fmt\"\n\nfunc intentarNotificar(ch chan<- string, mensaje string) bool {\n    select {\n    case ch <- mensaje:\n        return true\n    default:\n        return false\n    }\n}\n\nfunc main() {\n    canalAlertas := make(chan string, 2)\n    \n    mensajes := []string{\"Alerta 1: Disco al 80%\", \"Alerta 2: CPU al 90%\", \"Alerta 3: Memoria al 95%\"}\n    \n    for _, m := range mensajes {\n        exito := intentarNotificar(canalAlertas, m)\n        if exito {\n            fmt.Printf(\"[ENVIADO]: %s\\n\", m)\n        } else {\n            fmt.Printf(\"[DESCARTADO por saturación]: %s\\n\", m)\n        }\n    }\n    \n    fmt.Printf(\"Total mensajes almacenados en búfer: %d\\n\", len(canalAlertas))\n}",
      "explanation": "Como el canal solo admite 2 elementos en su búfer, los dos primeros se encolan con éxito (true). Al intentar el tercero, el canal está lleno, por lo que el select salta inmediatamente al default sin bloquear la ejecución, retornando false y evitando un cuelgue del sistema."
    },
    "externalLinks": [
      {
        "title": "Tour interactivo de Go: Selección por defecto en select",
        "url": "https://go.dev/tour/concurrency/6",
        "description": "Práctica con select y default en el tour interactivo."
      },
      {
        "title": "Guía canónica Effective Go: Comunicación no bloqueante con select",
        "url": "https://go.dev/doc/effective_go#channels",
        "description": "Casos de uso idiomáticos de canales no bloqueantes."
      },
      {
        "title": "Go by Example Original: Non-Blocking Channel Operations",
        "url": "https://gobyexample.com/non-blocking-channel-operations",
        "description": "Ejemplo en Go by Example."
      }
    ],
    "code": "// Los envíos y recepciones básicos en canales son bloqueantes.\n// Sin embargo, podemos usar `select` con una cláusula `default` para\n// implementar envíos, recepciones e incluso selects multidireccionales\n// _no bloqueantes_.\n\npackage main\n\nimport \"fmt\"\n\nfunc main() {\n\tmessages := make(chan string)\n\tsignals := make(chan bool)\n\n\t// Aquí tenemos una recepción no bloqueante. Si un valor está\n\t// disponible en `messages`, el `select` tomará el\n\t// `case <-messages` con dicho valor. De lo contrario,\n\t// tomará inmediatamente la rama `default`.\n\tselect {\n\tcase msg := <-messages:\n\t\tfmt.Println(\"received message\", msg)\n\tdefault:\n\t\tfmt.Println(\"no message received\")\n\t}\n\n\t// Un envío no bloqueante opera de manera análoga. Aquí `msg`\n\t// no puede enviarse al canal `messages`, porque\n\t// el canal carece de búfer y no hay ningún receptor presente.\n\t// Por ende, se selecciona la rama `default`.\n\tmsg := \"hi\"\n\tselect {\n\tcase messages <- msg:\n\t\tfmt.Println(\"sent message\", msg)\n\tdefault:\n\t\tfmt.Println(\"no message sent\")\n\t}\n\n\t// Podemos usar múltiples cláusulas `case` antes de la rama\n\t// `default` para implementar un select no bloqueante multidireccional.\n\t// Aquí intentamos recepciones no bloqueantes tanto\n\t// en `messages` como en `signals`.\n\tselect {\n\tcase msg := <-messages:\n\t\tfmt.Println(\"received message\", msg)\n\tcase sig := <-signals:\n\t\tfmt.Println(\"received signal\", sig)\n\tdefault:\n\t\tfmt.Println(\"no activity\")\n\t}\n}\n",
    "output": "$ go run non-blocking-channel-operations.go \nno message received\nno message sent\nno activity\n",
    "officialUrl": "https://gobyexample.com/non-blocking-channel-operations"
  },
  {
    "id": 36,
    "slug": "closing-channels",
    "title": "Closing Channels",
    "titleEs": "Cierre de Canales y Detección (coma-ok)",
    "category": "Concurrencia y Canales",
    "categorySlug": "concurrencia-canales",
    "categoryIcon": "rocket",
    "difficulty": "Intermedio",
    "summary": "Cierre explícito de canales mediante close() e inspección del estado abierto/cerrado con el modismo coma-ok.",
    "originalExpl": "Cerrar un canal indica que no se enviarán más valores a través de él. Esto puede ser útil para comunicar la finalización a los receptores del canal mediante el modismo coma-ok.",
    "basicExpl": {
      "title": "Conceptos Fundamentales para Principiantes",
      "content": "Cerrar un canal es como colgar el teléfono cuando terminas de hablar. Le avisa a la persona del otro lado: 'Ya no tengo nada más que decirte, hemos terminado'.\n- Se cierra con `close(miCanal)`.\n- Solo el emisor debe cerrar el canal.\n- Quien recibe puede comprobar si el canal sigue abierto usando dos variables: `valor, abierto := <-miCanal`.\n- Si 'abierto' es `true`, el dato recibido es real. Si es `false`, el canal está cerrado y la conversación terminó.",
      "keyPoints": [
        "Se cierra con la función integrada `close(ch)`.",
        "Modismo coma-ok: `v, ok := <-ch` (ok es false si el canal está cerrado y vacío).",
        "Un canal cerrado sigue permitiendo leer los datos restantes que quedaron en el búfer antes de devolver el zero value."
      ]
    },
    "interExpl": {
      "title": "Mecanismos Internos y Buenas Prácticas",
      "content": "Reglas sagradas del cierre de canales en Go:\n1. NUNCA cierres un canal desde el lado del receptor (read-side).\n2. NUNCA cierres un canal si hay múltiples emisores concurrentes (cerrar un canal ya cerrado produce un pánico inmediato: `panic: close of closed channel`).\n3. NUNCA intentes enviar a un canal cerrado (produce `panic: send on closed channel`).\n\nRegla de diseño: 'El dueño del recurso es quien lo cierra'. Si una goroutine es la única responsable de emitir datos en ese canal, es esa misma goroutine quien debe cerrarlo al terminar su trabajo.",
      "keyPoints": [
        "Pánico al enviar en canal cerrado: `ch <- v` en canal cerrado crashea el programa.",
        "Pánico por doble cierre: ejecutar `close(ch)` dos veces en el mismo canal genera pánico.",
        "No es obligatorio cerrar todos los canales: los canales son recolectados por el GC; solo se cierran si el receptor necesita saber explícitamente cuándo terminaron los datos."
      ]
    },
    "expertExpl": {
      "title": "Bajo Nivel, Rendimiento e Internals",
      "content": "Efecto de `close()` en el runtime de Go (runtime/chan.go):\nAl invocar `close(c)`, el runtime adquiere el lock de `hchan`, marca el flag `closed = 1`, recorre la lista `recvq` de todas las goroutines bloqueadas esperando recibir y las desbloquea a todas simultáneamente entregándoles el valor cero del tipo (`zero value`) y `ok = false`.\n\nPatrón de Difusión (Broadcast Pattern): Debido a que cerrar un canal desbloquea instantáneamente a todas las goroutines esperando en él, `close()` es el mecanismo de sincronización '1 a N' más eficiente del runtime, utilizado como base de la cancelación en el paquete `context` (`<-ctx.Done()`).",
      "keyPoints": [
        "Desbloqueo masivo en O(N): todas las goroutines suspendidas en recepción se despiertan simultáneamente.",
        "Lectura de canal cerrado: devuelve instantáneamente el zero-value sin bloquearse jamás.",
        "Base de context.Context: el canal `Done()` de un contexto funciona precisamente cerrando un canal."
      ]
    },
    "evaluation": {
      "title": "Reto: Consumidor Seguro con Detección de Cierre Coma-Ok",
      "statement": "Crea una goroutine productora que envíe 3 trabajos ('trabajo A', 'trabajo B', 'trabajo C') a un canal y luego lo cierre con close(). En la goroutine principal, crea un bucle infinito que lea del canal usando el modismo coma-ok 'v, ok := <-ch' y salga del bucle cuando ok sea false.",
      "starterCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    ch := make(chan string)\n    \n    // Lanza la goroutine productora\n    \n    // Lee en un for con coma-ok y sal cuando ok sea false\n}",
      "hint": "En el bucle for haz: v, ok := <-ch; if !ok { break }.",
      "solution": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    ch := make(chan string)\n    \n    go func() {\n        ch <- \"Tarea 1: Respaldar BD\"\n        ch <- \"Tarea 2: Limpiar temporales\"\n        ch <- \"Tarea 3: Notificar admin\"\n        close(ch) // Indica formalmente que no habrá más tareas\n    }()\n    \n    for {\n        tarea, abierta := <-ch\n        if !abierta {\n            fmt.Println(\"Canal cerrado: todas las tareas fueron procesadas.\")\n            break\n        }\n        fmt.Println(\"Ejecutando:\", tarea)\n    }\n}",
      "explanation": "El modismo 'v, abierta := <-ch' permite detectar el momento exacto en que el canal fue cerrado por el productor. Mientras el canal tenga elementos en tránsito, 'abierta' será true. Una vez vacío y cerrado, 'abierta' se vuelve false, permitiendo salir del bucle de forma limpia."
    },
    "externalLinks": [
      {
        "title": "Tour interactivo de Go: Iteración y cierre de canales",
        "url": "https://go.dev/tour/concurrency/4",
        "description": "Cierre de canales y modismo coma-ok en el tour oficial."
      },
      {
        "title": "Especificación de Go: Función integrada close para canales",
        "url": "https://go.dev/ref/spec#Close",
        "description": "Especificación formal del comportamiento de la función close."
      },
      {
        "title": "Go 101: Cómo cerrar canales de forma segura y elegante",
        "url": "https://go101.org/article/channel-closing.html",
        "description": "Guía de referencia avanzada sobre patrones seguros de cierre de canales en Go."
      },
      {
        "title": "Go by Example Original: Closing Channels",
        "url": "https://gobyexample.com/closing-channels",
        "description": "Página oficial del ejemplo en Go by Example.",
        "type": "Referencia Original"
      }
    ],
    "code": "// _Cerrar_ un canal indica que ya no se enviarán más valores\n// a través de él. Esto resulta muy útil para comunicar\n// la finalización del trabajo a los receptores del canal.\n\npackage main\n\nimport \"fmt\"\n\n// En este ejemplo utilizaremos un canal `jobs` para comunicar\n// el trabajo a realizar desde la goroutine `main()` a una\n// goroutine trabajadora. Cuando ya no tengamos más trabajos para\n// el trabajador, haremos un `close` sobre el canal `jobs`.\nfunc main() {\n\tjobs := make(chan int, 5)\n\tdone := make(chan bool)\n\n\t// Aquí está la goroutine trabajadora. Recibe repetidamente\n\t// de `jobs` mediante `j, more := <-jobs`. En esta variante\n\t// de recepción con dos valores, `more` será `false` si\n\t// `jobs` ha sido cerrado y todos los valores en el canal\n\t// ya han sido recibidos. Usamos esto para notificar en\n\t// `done` una vez que hayamos procesado todos los trabajos.\n\tgo func() {\n\t\tfor {\n\t\t\tj, more := <-jobs\n\t\t\tif more {\n\t\t\t\tfmt.Println(\"received job\", j)\n\t\t\t} else {\n\t\t\t\tfmt.Println(\"received all jobs\")\n\t\t\t\tdone <- true\n\t\t\t\treturn\n\t\t\t}\n\t\t}\n\t}()\n\n\t// Esto envía 3 trabajos al trabajador a través del canal\n\t// `jobs`, y luego lo cierra.\n\tfor j := 1; j <= 3; j++ {\n\t\tjobs <- j\n\t\tfmt.Println(\"sent job\", j)\n\t}\n\tclose(jobs)\n\tfmt.Println(\"sent all jobs\")\n\n\t// Esperamos al trabajador usando el enfoque de\n\t// [sincronización](channel-synchronization) que vimos anteriormente.\n\t<-done\n\n\t// Leer de un canal cerrado tiene éxito inmediatamente,\n\t// devolviendo el valor cero del tipo subyacente.\n\t// El segundo valor de retorno opcional es `true` si el\n\t// valor recibido provino de una operación de envío exitosa,\n\t// o `false` si es un valor cero generado porque el canal\n\t// está cerrado y vacío.\n\t_, ok := <-jobs\n\tfmt.Println(\"received more jobs:\", ok)\n}\n",
    "output": "$ go run closing-channels.go \nsent job 1\nreceived job 1\nsent job 2\nreceived job 2\nsent job 3\nreceived job 3\nsent all jobs\nreceived all jobs\nreceived more jobs: false\n\n# El concepto de canales cerrados nos conduce de forma natural a nuestro próximo\n# ejemplo: iteración con `range` sobre canales.\n",
    "officialUrl": "https://gobyexample.com/closing-channels"
  },
  {
    "id": 37,
    "slug": "range-over-channels",
    "title": "Range over Channels",
    "titleEs": "Iteración Range sobre Canales",
    "category": "Concurrencia y Canales",
    "categorySlug": "concurrencia-canales",
    "categoryIcon": "rocket",
    "difficulty": "Intermedio",
    "summary": "Consumo simplificado y continuo de valores de un canal con bucle 'for range' hasta su cierre definitivo.",
    "originalExpl": "Podemos usar la sintaxis 'for range' para iterar sobre los valores recibidos de un canal. El bucle continuará recibiendo valores hasta que el canal sea cerrado explícitamente.",
    "basicExpl": {
      "title": "Conceptos Fundamentales para Principiantes",
      "content": "En vez de escribir un bucle infinito manual con comprobaciones `if !ok { break }`, Go te permite usar un elegante `for valor := range miCanal`.\n- El bucle espera automáticamente cada nuevo dato y lo procesa.\n- Cuando el emisor ejecuta `close(miCanal)`, el bucle `for range` se detiene y termina de forma limpia y automática.\n- ¡Cuidado!: Si el emisor olvida cerrar el canal, el bucle for se quedará esperando para siempre, provocando un deadlock.",
      "keyPoints": [
        "Sintaxis limpia: `for valor := range ch` lee secuencialmente todos los elementos.",
        "Termina automáticamente en cuanto el canal es cerrado con `close(ch)`.",
        "Solo recibe 1 valor (el elemento), a diferencia de slices o mapas que devuelven índice/clave."
      ]
    },
    "interExpl": {
      "title": "Mecanismos Internos y Buenas Prácticas",
      "content": "Drenaje de Búferes Cerrados:\nSi cierras un canal con búfer que aún contiene elementos sin leer, el bucle `for range` NO descarta los elementos: drena y procesa ordenadamente todos los valores remanentes en el búfer y solo sale cuando el búfer queda completamente vacío.\n\nEste comportamiento es crucial para patrones de apagado seguro (graceful shutdown), donde un servicio deja de aceptar nuevos trabajos cerrando el canal de entrada, pero procesa hasta el último trabajo que ya estaba encolado.",
      "keyPoints": [
        "Drenaje garantizado: procesa todos los elementos encolados antes de terminar el bucle.",
        "Patrón Graceful Shutdown: cerrar canal para indicar 'no más ingresos' y procesar la cola pendiente.",
        "Deadlock por no cerrar: si nadie cierra el canal y no hay más goroutines activas, el bucle colapsa en deadlock fatal."
      ]
    },
    "expertExpl": {
      "title": "Bajo Nivel, Rendimiento e Internals",
      "content": "Bajo el capó, la instrucción `for v := range ch` es reescrita sintácticamente por el compilador en un bucle equivalente a:\n```go\nfor {\n    v, ok := <-ch\n    if !ok { break }\n    // cuerpo del bucle\n}\n```\nNo existe ninguna sobrecarga adicional frente a la recepción manual con coma-ok. Cada iteración realiza la sincronización normal a través de `runtime.chanrecv2`, suspendiendo la goroutine receptora si el canal está temporalmente vacío hasta que una goroutine emisora deposite el siguiente elemento.",
      "keyPoints": [
        "Transformación sintáctica del compilador: genera llamadas directas a `runtime.chanrecv2`.",
        "Optimización de suspensión: la goroutine receptora duerme sin gastar CPU mientras no haya datos en el canal.",
        "Canal nil en range: hacer range sobre un canal nil (`var ch chan int = nil; for range ch`) se bloquea indefinidamente."
      ]
    },
    "evaluation": {
      "title": "Reto: Generador y Sumador de Secuencia con Range",
      "statement": "Escribe una goroutine productora que envíe los primeros N múltiplos de 5 a un canal y lo cierre. En main, utiliza 'for range' para recibir todos los valores, calcular su suma total e imprimir el resultado final.",
      "starterCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    // Define canal y lanza goroutine productora para 5 múltiplos\n    // Suma con for v := range ch e imprime el total\n}",
      "hint": "Recuerda llamar a close(ch) al finalizar el bucle emisor en la goroutine.",
      "solution": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    ch := make(chan int)\n    n := 5\n    \n    go func() {\n        for i := 1; i <= n; i++ {\n            ch <- i * 5\n        }\n        close(ch) // Indispensable para que el range termine\n    }()\n    \n    suma := 0\n    fmt.Println(\"Valores recibidos:\")\n    for val := range ch {\n        fmt.Printf(\"%d \", val)\n        suma += val\n    }\n    fmt.Printf(\"\\nSuma total de los múltiplos: %d\\n\", suma)\n}",
      "explanation": "El bucle 'for val := range ch' en main itera cómodamente mientras el canal esté abierto. Apenas la goroutine ejecuta close(ch), el bucle finaliza limpiamente y el programa procede a mostrar la suma total sin riesgo de deadlocks."
    },
    "externalLinks": [
      {
        "title": "Tour interactivo de Go: Iteración y cierre de canales",
        "url": "https://go.dev/tour/concurrency/4",
        "description": "Iteración de canales con for range en el tour interactivo."
      },
      {
        "title": "Guía canónica Effective Go: Canales y comunicación concurrente",
        "url": "https://go.dev/doc/effective_go#channels",
        "description": "Buenas prácticas con iteración sobre canales en Effective Go."
      },
      {
        "title": "Especificación de Go: Sentencias for con cláusula de rango",
        "url": "https://go.dev/ref/spec#For_statements",
        "description": "Reglas gramaticales para la iteración range en canales."
      },
      {
        "title": "Go by Example Original: Range over Channels",
        "url": "https://gobyexample.com/range-over-channels",
        "description": "Página oficial del ejemplo en Go by Example.",
        "type": "Referencia Original"
      }
    ],
    "code": "// En un ejemplo [anterior](range-over-built-in-types) vimos cómo `for` y\n// `range` proporcionan iteración sobre estructuras de datos básicas.\n// También podemos usar esta sintaxis para iterar sobre\n// los valores recibidos de un canal.\n\npackage main\n\nimport \"fmt\"\n\nfunc main() {\n\n\t// Iteraremos sobre 2 valores en el canal `queue`.\n\tqueue := make(chan string, 2)\n\tqueue <- \"one\"\n\tqueue <- \"two\"\n\tclose(queue)\n\n\t// Este bucle `range` itera sobre cada elemento a medida que se\n\t// recibe desde `queue`. Dado que cerramos (`close`) el\n\t// canal arriba, la iteración concluye tras recibir\n\t// los 2 elementos existentes.\n\tfor elem := range queue {\n\t\tfmt.Println(elem)\n\t}\n}\n",
    "output": "$ go run range-over-channels.go\none\ntwo\n\n# Este ejemplo también demostró que es posible cerrar\n# un canal no vacío y aún así recibir todos los valores\n# restantes en su búfer.\n",
    "officialUrl": "https://gobyexample.com/range-over-channels"
  },
  {
    "id": 38,
    "slug": "timers",
    "title": "Timers",
    "titleEs": "Temporizadores Únicos (time.Timer)",
    "category": "Sincronización y Concurrencia Avanzada",
    "categorySlug": "sincronizacion-avanzada",
    "categoryIcon": "settings",
    "difficulty": "Intermedio",
    "summary": "Ejecución de eventos futuros tras una duración específica con capacidad de cancelación antes de expirar.",
    "originalExpl": "Los temporizadores (timers) son para cuando quieres hacer algo en el futuro una sola vez. Se crean con time.NewTimer(). A diferencia de time.Sleep, un Timer puede ser cancelado antes de que expire con Stop().",
    "basicExpl": {
      "title": "Conceptos Fundamentales para Principiantes",
      "content": "A veces necesitas un despertador que suene una sola vez dentro de X segundos:\n- `time.Sleep(2 * time.Second)` congela tu programa y no puedes cancelarlo si cambias de opinión.\n- `time.NewTimer(2 * time.Second)` es mucho más inteligente: crea un temporizador que tiene un canal `timer.C`.\n- Puedes esperar a que suene leyendo de su canal: `<-timer.C`.\n- O puedes cancelarlo a mitad de camino si ya no lo necesitas: `timer.Stop()`.",
      "keyPoints": [
        "Se crea con `timer := time.NewTimer(duracion)`.",
        "Emite la hora actual en el canal `timer.C` una única vez al expirar.",
        "Método `timer.Stop()`: cancela el temporizador antes de que suene.",
        "Método `timer.Reset(duracion)`: reprograma el temporizador para una nueva cuenta."
      ]
    },
    "interExpl": {
      "title": "Mecanismos Internos y Buenas Prácticas",
      "content": "Buenas prácticas con `Stop()` y drenaje del canal:\n`timer.Stop()` devuelve un booleano: `true` si el temporizador se detuvo antes de expirar, o `false` si ya había expirado o ya se había detenido.\nEn versiones anteriores a Go 1.23, si `Stop()` devolvía `false`, el canal `timer.C` podía contener un valor residual que debía drenarse manualmente. En Go 1.23+, el runtime de Go drena automáticamente el canal al llamar a `Stop()`, simplificando enormemente el código idiomático.",
      "keyPoints": [
        "Valor de retorno de Stop(): indica si lograste interceptar el temporizador antes de que disparara.",
        "Mejora radical en Go 1.23: `timer.Stop()` y `timer.Reset()` ahora gestionan el canal C de forma limpia y atómica.",
        "Reutilización de timers: para tareas repetitivas, reusar un Timer con `Reset()` genera 0 asignaciones de memoria frente a crear timers nuevos."
      ]
    },
    "expertExpl": {
      "title": "Bajo Nivel, Rendimiento e Internals",
      "content": "Arquitectura de Timers en el Runtime de Go:\nCada `P` (procesador lógico) en Go mantiene un min-heap de timers (`p.timers`). El scheduler verifica la cima del heap de timers en cada iteración del bucle del planificador y cuando entra en reposo mediante llamadas al sistema del SO (usando `epoll_wait` con timeout en Linux, `kevent` en BSD/macOS o `GetQueuedCompletionStatus` en Windows).\n\nAl cumplirse el plazo, el runtime extrae el timer y envía la marca de tiempo al canal `timer.C`. Si la goroutine que debe recibir está dormida, el runtime la despierta marcando su estado como `_Grunnable`.",
      "keyPoints": [
        "Min-Heap de timers por procesador P: O(log N) para inserciones y cancelaciones.",
        "Sincronización con el kernel del SO: aprovechamiento de los temporizadores de precisión del hardware.",
        "Zero background OS threads: no se crean hilos dedicados del sistema operativo solo para contar tiempo."
      ]
    },
    "evaluation": {
      "title": "Reto: Cancelación Temprana de Temporizador de Inactividad",
      "statement": "Simula un temporizador de inactividad de 3 segundos para una sesión de usuario. Lanza una goroutine que simule la actividad del usuario a los 500ms y cancele el temporizador con Stop(). Imprime si la sesión fue cerrada por inactividad o si se salvó a tiempo.",
      "starterCode": "package main\n\nimport (\n    \"fmt\"\n    \"time\"\n)\n\nfunc main() {\n    // Crea un timer de 3 segundos\n    // Lanza goroutine que actúe en 500ms y llame a timer.Stop()\n    // Espera en select si expiró o si se canceló\n}",
      "hint": "Guarda el timer en una variable, llámale timer.Stop() en la goroutine tras el Sleep.",
      "solution": "package main\n\nimport (\n    \"fmt\"\n    \"time\"\n)\n\nfunc main() {\n    timerInactividad := time.NewTimer(3 * time.Second)\n    cancelado := make(chan bool)\n    \n    // Simula acción del usuario\n    go func() {\n        time.Sleep(500 * time.Millisecond)\n        if timerInactividad.Stop() {\n            fmt.Println(\"[Acción de usuario detectada a los 500ms]: Cancelando timer\")\n            cancelado <- true\n        }\n    }()\n    \n    select {\n    case <-timerInactividad.C:\n        fmt.Println(\"Sesión cerrada por inactividad (pasaron 3s)\")\n    case <-cancelado:\n        fmt.Println(\"Sesión mantenida activa con éxito gracias a la acción del usuario.\")\n    }\n}",
      "explanation": "Al detectar actividad a los 500ms, la goroutine ejecuta `timerInactividad.Stop()`, que cancela el temporizador con éxito devolviendo true antes de que alcancen a transcurrir los 3 segundos, evitando el cierre indeseado de la sesión."
    },
    "externalLinks": [
      {
        "title": "Paquete time: Timer",
        "url": "https://pkg.go.dev/time#Timer",
        "description": "Documentación oficial de la estructura Timer y sus métodos."
      },
      {
        "title": "Blog oficial de Go: Mejoras de rendimiento en temporizadores para Go 1.23",
        "url": "https://go.dev/blog/go1.23-timers",
        "description": "Novedades oficiales sobre la recolección de basura y drenaje de timers en Go 1.23."
      },
      {
        "title": "Go by Example Original: Timers",
        "url": "https://gobyexample.com/timers",
        "description": "Ejemplo interactivo en Go by Example."
      }
    ],
    "code": "// A menudo deseamos ejecutar código en Go en algún punto del\n// futuro, o repetidamente en un intervalo determinado. Las funciones\n// integradas de _timers_ (temporizadores) y _tickers_ facilitan\n// enormemente ambas tareas. Primero veremos los temporizadores y luego\n// los [tickers](tickers).\n\npackage main\n\nimport (\n\t\"fmt\"\n\t\"time\"\n)\n\nfunc main() {\n\n\t// Los temporizadores representan un único evento en el futuro. Le\n\t// indicas al temporizador cuánto tiempo deseas esperar, y este\n\t// proporciona un canal que será notificado en ese momento exacto.\n\t// Este temporizador esperará 2 segundos.\n\ttimer1 := time.NewTimer(2 * time.Second)\n\n\t// El `<-timer1.C` se bloquea en el canal `C` del temporizador\n\t// hasta que este envía un valor indicando que el tiempo ha expirado.\n\t<-timer1.C\n\tfmt.Println(\"Timer 1 fired\")\n\n\t// Si únicamente quisieras esperar, podrías haber empleado\n\t// `time.Sleep`. Una razón por la cual un temporizador es tan útil es\n\t// que puedes cancelarlo antes de que expire.\n\t// Aquí tenemos un ejemplo de cancelación.\n\ttimer2 := time.NewTimer(time.Second)\n\tgo func() {\n\t\t<-timer2.C\n\t\tfmt.Println(\"Timer 2 fired\")\n\t}()\n\tstop2 := timer2.Stop()\n\tif stop2 {\n\t\tfmt.Println(\"Timer 2 stopped\")\n\t}\n\n\t// Damos a `timer2` suficiente tiempo para dispararse (en caso de que\n\t// no se hubiera detenido), demostrando así que en efecto fue cancelado.\n\ttime.Sleep(2 * time.Second)\n}\n",
    "output": "# El primer temporizador expirará ~2s después de iniciar el\n# programa, pero el segundo se detendrá antes de que tenga oportunidad\n# de dispararse.\n$ go run timers.go\nTimer 1 fired\nTimer 2 stopped\n",
    "officialUrl": "https://gobyexample.com/timers"
  },
  {
    "id": 39,
    "slug": "tickers",
    "title": "Tickers",
    "titleEs": "Tickers Periódicos (time.Ticker)",
    "category": "Sincronización y Concurrencia Avanzada",
    "categorySlug": "sincronizacion-avanzada",
    "categoryIcon": "settings",
    "difficulty": "Intermedio",
    "summary": "Emisión periódica y regular de pulsos de tiempo a intervalos fijos para tareas recurrentes.",
    "originalExpl": "Los temporizadores son para cuando quieres hacer algo una sola vez en el futuro; los tickers son para cuando quieres hacer algo repetidamente a intervalos regulares. Se detienen con ticker.Stop().",
    "basicExpl": {
      "title": "Conceptos Fundamentales para Principiantes",
      "content": "Un Timer es como una alarma que suena una sola vez. Un 'Ticker' es como el tic-tac de un reloj o el latido de un corazón: pulsa y emite una señal repetidamente cada N segundos o milisegundos.\n- Creación: `ticker := time.NewTicker(500 * time.Millisecond)`.\n- Cada 500ms exactos, deposita la hora actual en su canal `ticker.C`.\n- Puedes usarlo en un bucle para ejecutar una tarea periódica (como un cron job, sincronizar datos con el servidor o verificar el pulso de un servicio).\n- Cuando termines, debes detenerlo con `ticker.Stop()` para no gastar batería ni procesador.",
      "keyPoints": [
        "Se crea con `time.NewTicker(intervalo)`.",
        "Emite una señal repetida en su canal `ticker.C` indefinidamente.",
        "Es fundamental llamar a `ticker.Stop()` cuando ya no se utilice para liberar recursos.",
        "Diferencia con Timer: Timer dispara 1 vez; Ticker dispara infinitas veces."
      ]
    },
    "interExpl": {
      "title": "Mecanismos Internos y Buenas Prácticas",
      "content": "Compensación de Deriva (Drift Compensation) y Tareas Lentas:\nEl Ticker de Go está diseñado para mantener un ritmo temporal constante. Si tu ticker dispara cada 100ms pero tu tarea tarda 150ms en procesarse, el ticker de Go NO acumula pulsos en cola de forma indefinida: ajusta los ticks y omite eventos perdidos para no desbordar el búfer.\n\nPatrón estándar de detención (Stop Pattern):\n```go\nticker := time.NewTicker(time.Second)\ndefer ticker.Stop()\n\nfor {\n    select {\n    case <-ticker.C:\n        ejecutarMonitoreo()\n    case <-ctx.Done():\n        return\n    }\n}\n```",
      "keyPoints": [
        "Compensación de retraso: no acumula ticks si el receptor es más lento que el intervalo.",
        "Uso de `defer ticker.Stop()`: garantiza que el ticker del runtime se destruya al salir de la función.",
        "Coordinación con contextos: ideal para tareas en segundo plano controladas por context.Context."
      ]
    },
    "expertExpl": {
      "title": "Bajo Nivel, Rendimiento e Internals",
      "content": "Bajo nivel en Go 1.23+:\nAntes de Go 1.23, olvidar llamar a `ticker.Stop()` producía una fuga de memoria permanente (Memory Leak), porque el runtime mantenía viva una referencia al ticker en el min-heap global impidiendo que el GC lo recolectara.\nDesde Go 1.23, el recolector de basura es capaz de detectar si el ticker y su canal ya no son referenciados por ninguna goroutine activa, procediendo a su recolección automática.\n\nEl canal interno `ticker.C` tiene una capacidad de búfer de 1 (`chan time.Time` con cap=1). Si un pulso no es leído antes de que ocurra el siguiente, el nuevo pulso descarta al anterior sin bloquear el scheduler.",
      "keyPoints": [
        "Búfer interno cap=1 con descarte: previene que goroutines lentas queden inundadas de pulsos viejos.",
        "GC en Go 1.23+: los tickers abandonados son limpiados por el Garbage Collector automáticamente.",
        "Jitter en sistemas distribuidos: para evitar tormentas sincronizadas de peticiones (thundering herd), se suele añadir una pequeña variación aleatoria (jitter) al intervalo del ticker."
      ]
    },
    "evaluation": {
      "title": "Reto: Monitor de Latencia con Límite de Pulsos",
      "statement": "Crea un Ticker que emita un pulso cada 150ms simulando un chequeo de estado de red. Deja que se ejecute exactamente 4 veces e imprime el número de chequeo. Tras el cuarto pulso, detén el ticker con Stop() y sal de la función.",
      "starterCode": "package main\n\nimport (\n    \"fmt\"\n    \"time\"\n)\n\nfunc main() {\n    // Crea ticker de 150ms\n    // Cuenta 4 pulsos e imprime\n    // Detén el ticker\n}",
      "hint": "Usa un contador 'pulsos := 0' dentro de un for con range ticker.C o select. Cuando pulsos == 4, haz ticker.Stop() y break.",
      "solution": "package main\n\nimport (\n    \"fmt\"\n    \"time\"\n)\n\nfunc main() {\n    intervalo := 150 * time.Millisecond\n    ticker := time.NewTicker(intervalo)\n    defer ticker.Stop()\n    \n    pulsos := 0\n    fmt.Println(\"Iniciando monitor de red periódico...\")\n    \n    for t := range ticker.C {\n        pulsos++\n        fmt.Printf(\"[Chequeo #%d a las %s]: Ping OK (latencia: 12ms)\\n\", \n            pulsos, t.Format(\"15:04:05.000\"))\n        \n        if pulsos >= 4 {\n            fmt.Println(\"Límite de chequeos alcanzado. Deteniendo ticker.\")\n            break\n        }\n    }\n}",
      "explanation": "El bucle 'for t := range ticker.C' se despierta puntualmente cada 150ms. Al procesar el cuarto pulso, se invoca 'ticker.Stop()' mediante defer y se ejecuta el 'break', concluyendo la monitorización de forma limpia y liberando el recurso en el runtime."
    },
    "externalLinks": [
      {
        "title": "Paquete time: Ticker",
        "url": "https://pkg.go.dev/time#Ticker",
        "description": "Documentación oficial de la estructura time.Ticker."
      },
      {
        "title": "Go by Example Original: Tickers",
        "url": "https://gobyexample.com/tickers",
        "description": "Ejemplo interactivo en Go by Example."
      },
      {
        "title": "Diseño interno de Go: Modernización de temporizadores (Timers)",
        "url": "https://go.dev/design/59402-improved-timer",
        "description": "Propuesta y diseño de la modernización de tickers en Go."
      }
    ],
    "code": "// Los [temporizadores](timers) sirven cuando deseas realizar\n// una acción una vez en el futuro; los _tickers_ son para cuando\n// necesitas realizar una tarea repetidamente a intervalos\n// regulares. Aquí hay un ejemplo de un ticker que emite pulsos\n// periódicamente hasta que decidimos detenerlo.\n\npackage main\n\nimport (\n\t\"fmt\"\n\t\"time\"\n)\n\nfunc main() {\n\n\t// Los tickers utilizan un mecanismo similar a los temporizadores: un\n\t// canal al cual se le envían valores periódicos. Aquí usaremos la sentencia\n\t// `select` sobre el canal para aguardar los\n\t// valores a medida que llegan cada 500ms.\n\tticker := time.NewTicker(500 * time.Millisecond)\n\tdone := make(chan bool)\n\n\tgo func() {\n\t\tfor {\n\t\t\tselect {\n\t\t\tcase <-done:\n\t\t\t\treturn\n\t\t\tcase t := <-ticker.C:\n\t\t\t\tfmt.Println(\"Tick at\", t)\n\t\t\t}\n\t\t}\n\t}()\n\n\t// Los tickers se pueden detener al igual que los temporizadores. Una vez que un ticker\n\t// se detiene, no recibirá más valores en su\n\t// canal. Detendremos el nuestro transcurridos 1600ms.\n\ttime.Sleep(1600 * time.Millisecond)\n\tticker.Stop()\n\tdone <- true\n\tfmt.Println(\"Ticker stopped\")\n}\n",
    "output": "# Al ejecutar este programa, el ticker emitirá 3 pulsos\n# antes de que lo detengamos.\n$ go run tickers.go\nTick at 2012-09-23 11:29:56.487625 -0700 PDT\nTick at 2012-09-23 11:29:56.988063 -0700 PDT\nTick at 2012-09-23 11:29:57.488076 -0700 PDT\nTicker stopped\n",
    "officialUrl": "https://gobyexample.com/tickers"
  },
  {
    "id": 40,
    "slug": "worker-pools",
    "title": "Worker Pools",
    "titleEs": "Pool de Trabajadores (Worker Pools)",
    "category": "Sincronización y Concurrencia Avanzada",
    "categorySlug": "sincronizacion-avanzada",
    "categoryIcon": "settings",
    "difficulty": "Avanzado",
    "summary": "Patrón de concurrencia que limita el número de goroutines concurrentes procesando una cola de tareas compartida.",
    "originalExpl": "En este ejemplo veremos cómo implementar un pool de trabajadores usando goroutines y canales. Un número fijo de workers procesa concurrentemente una cola de tareas.",
    "basicExpl": {
      "title": "Conceptos Fundamentales para Principiantes",
      "content": "Si tienes 10,000 cartas para responder, ¿lanzas 10,000 personas al mismo tiempo? Tu oficina colapsaría por falta de espacio y recursos.\nEn su lugar, contratas a 3 trabajadores (workers) fijos:\n- Pones las 10,000 cartas en una sola bandeja de entrada (un canal `trabajos`).\n- Los 3 trabajadores van sacando cartas de esa misma bandeja a medida que van terminando la anterior.\n- Las respuestas terminadas se colocan en una bandeja de salida (un canal `resultados`).\nEsto es un 'Worker Pool': paralelismo controlado y eficiente sin saturar tu sistema.",
      "keyPoints": [
        "Número fijo de goroutines trabajando concurrentemente.",
        "Todas las goroutines leen del mismo canal de tareas compartidas.",
        "Evita agotar la memoria, conexiones de base de datos o descriptores de archivos del servidor."
      ]
    },
    "interExpl": {
      "title": "Mecanismos Internos y Buenas Prácticas",
      "content": "Distribución Competitiva y Control de Saturación:\nEn Go, múltiples goroutines pueden hacer `for tarea := range trabajos` sobre el MISMO canal. El runtime garantiza que cada elemento del canal será entregado a exactamente UN solo worker de forma atómica y segura, sin duplicaciones ni carreras de datos.\n\nDimensionamiento óptimo del pool:\n- Para tareas CPU-bound (cálculos matemáticos intensivos, compresión, criptografía): número de workers ≈ cantidad de núcleos de CPU (`runtime.NumCPU()`).\n- Para tareas I/O-bound (peticiones HTTP, consultas a base de datos, lectura de archivos en disco): número de workers mucho mayor (ej. 50 a 500), ya que las goroutines pasan la mayor parte del tiempo esperando respuestas externas.",
      "keyPoints": [
        "Lectura compartida atómica: el runtime de Go distribuye los elementos del canal equitativamente entre los workers.",
        "Prevención de sobrecarga: protege APIs externas y bases de datos contra colapsos por avalancha de peticiones.",
        "Cierre ordenado: cerrar el canal de tareas (`close(trabajos)`) hace que todos los workers terminen limpiamente al agotar la cola."
      ]
    },
    "expertExpl": {
      "title": "Bajo Nivel, Rendimiento e Internals",
      "content": "Competencia de Locks en Canales Compartidos (Contention Profiling):\nCuando decenas de workers compiten activamente por leer de un mismo canal `hchan`, todas las goroutines intentan adquirir el lock interno del canal (`hchan.lock`). Si las tareas individuales son extremadamente cortas (del orden de nanosegundos), el tiempo empleado en la contención del lock del canal puede superar al tiempo real de trabajo útil.\n\nTécnica de optimización avanzada (Batching): Para cargas extremas, en lugar de pasar tareas individuales por el canal, se pasan 'lotes' de tareas (`[]Tarea` de 50 o 100 elementos), reduciendo la contención sobre el canal en un 98%. Puedes auditar esta contención ejecutando tu aplicación con `go test -bench=. -blockprofile=block.pprof`.",
      "keyPoints": [
        "Contención de hchan.lock: auditable mediante block profiling y mutex profiling en pprof.",
        "Batching de tareas: enviar lotes de trabajo por canal amortiza la sobrecarga de sincronización.",
        "Localidad de memoria de CPU: reutilizar los mismos workers mantiene caliente la caché L1/L2 del procesador."
      ]
    },
    "evaluation": {
      "title": "Reto: Procesador de Imágenes Concurrente con 3 Workers",
      "statement": "Crea un worker pool con 3 workers para procesar 6 'imágenes' (representadas por identificadores 1 al 6). Cada worker debe simular el procesamiento tardando 50ms, imprimir qué worker procesó qué imagen y enviar el resultado a un canal 'resultados'. Main debe enviar las tareas, cerrar el canal y recolectar los 6 resultados.",
      "starterCode": "package main\n\nimport (\n    \"fmt\"\n    \"time\"\n)\n\nfunc worker(id int, tareas <-chan int, resultados chan<- string) {\n    // Itera tareas con for range y procesa\n}\n\nfunc main() {\n    // Lanza 3 workers, envía 6 tareas y recolecta resultados\n}",
      "hint": "Crea tareas con make(chan int, 6), resultados con make(chan string, 6). Lanza 3 go worker(...). Cierra tareas antes de recolectar.",
      "solution": "package main\n\nimport (\n    \"fmt\"\n    \"time\"\n)\n\nfunc worker(id int, tareas <-chan int, resultados chan<- string) {\n    for imgID := range tareas {\n        fmt.Printf(\"[Worker %d] Iniciando procesamiento de imagen #%d\\n\", id, imgID)\n        time.Sleep(50 * time.Millisecond) // Simula procesamiento pesado\n        resultados <- fmt.Sprintf(\"Imagen #%d procesada por Worker %d\", imgID, id)\n    }\n}\n\nfunc main() {\n    numTareas := 6\n    numWorkers := 3\n    \n    tareas := make(chan int, numTareas)\n    resultados := make(chan string, numTareas)\n    \n    // 1. Iniciar los workers fijos\n    for w := 1; w <= numWorkers; w++ {\n        go worker(w, tareas, resultados)\n    }\n    \n    // 2. Enviar las tareas a la cola\n    for j := 1; j <= numTareas; j++ {\n        tareas <- j\n    }\n    close(tareas) // Ya no hay más tareas; los workers saldrán al terminar\n    \n    // 3. Recolectar resultados\n    for a := 1; a <= numTareas; a++ {\n        res := <-resultados\n        fmt.Println(\"->\", res)\n    }\n    fmt.Println(\"Todas las imágenes fueron procesadas exitosamente.\")\n}",
      "explanation": "El patrón Worker Pool desacopla la cantidad de tareas (6) del número de hilos ejecutores (3). Cada worker consume tareas a su propio ritmo. Al cerrar el canal 'tareas', el bucle for range dentro de cada worker finaliza limpiamente sin fugas de goroutines."
    },
    "externalLinks": [
      {
        "title": "Go by Example Original: Worker Pools",
        "url": "https://gobyexample.com/worker-pools",
        "description": "Ejemplo original de Worker Pools en Go by Example."
      },
      {
        "title": "Blog oficial de Go: Pipelines concurrentes y cancelación preventiva",
        "url": "https://go.dev/blog/pipelines",
        "description": "Arquitectura de pools de trabajo y propagación de cancelación."
      },
      {
        "title": "Bryan Mills: Replanteando patrones clásicos de concurrencia en Go",
        "url": "https://www.youtube.com/watch?v=5zXAHh5tJqQ",
        "description": "Conferencia magistral en GopherCon sobre buenas prácticas en pools y concurrencia."
      }
    ],
    "code": "// En este ejemplo veremos cómo implementar\n// un _pool de trabajadores_ (worker pool) utilizando goroutines y canales.\n\npackage main\n\nimport (\n\t\"fmt\"\n\t\"time\"\n)\n\n// Aquí está el trabajador, del cual ejecutaremos varias\n// instancias concurrentes. Estos trabajadores recibirán\n// tareas en el canal `jobs` y enviarán los resultados\n// correspondientes en `results`. Haremos una pausa de un segundo por tarea\n// para simular un proceso computacionalmente costoso.\nfunc worker(id int, jobs <-chan int, results chan<- int) {\n\tfor j := range jobs {\n\t\tfmt.Println(\"worker\", id, \"started  job\", j)\n\t\ttime.Sleep(time.Second)\n\t\tfmt.Println(\"worker\", id, \"finished job\", j)\n\t\tresults <- j * 2\n\t}\n}\n\nfunc main() {\n\n\t// Para usar nuestro grupo de trabajadores necesitamos enviarles\n\t// tareas y recopilar sus resultados. Creamos 2 canales para ello.\n\tconst numJobs = 5\n\tjobs := make(chan int, numJobs)\n\tresults := make(chan int, numJobs)\n\n\t// Esto inicia 3 trabajadores, inicialmente bloqueados\n\t// debido a que aún no hay tareas en la cola.\n\tfor w := 1; w <= 3; w++ {\n\t\tgo worker(w, jobs, results)\n\t}\n\n\t// Aquí enviamos 5 `jobs` y luego cerramos (`close`) ese\n\t// canal para indicar que hemos enviado todo el trabajo disponible.\n\tfor j := 1; j <= numJobs; j++ {\n\t\tjobs <- j\n\t}\n\tclose(jobs)\n\n\t// Finalmente recopilamos todos los resultados del procesamiento.\n\t// Esto también garantiza que las goroutines trabajadoras hayan\n\t// culminado su labor. Una alternativa para aguardar múltiples\n\t// goroutines es emplear un [WaitGroup](waitgroups).\n\tfor a := 1; a <= numJobs; a++ {\n\t\t<-results\n\t}\n}\n",
    "output": "# El programa en ejecución muestra las 5 tareas siendo procesadas por\n# diversos trabajadores concurrentes. El programa toma únicamente unos 2 segundos\n# a pesar de realizar 5 segundos de trabajo total acumulado, ya que\n# hay 3 trabajadores operando de manera simultánea.\n$ time go run worker-pools.go \nworker 1 started  job 1\nworker 2 started  job 2\nworker 3 started  job 3\nworker 1 finished job 1\nworker 1 started  job 4\nworker 2 finished job 2\nworker 2 started  job 5\nworker 3 finished job 3\nworker 1 finished job 4\nworker 2 finished job 5\n\nreal\t0m2.358s\n",
    "officialUrl": "https://gobyexample.com/worker-pools"
  },
  {
    "id": 41,
    "slug": "waitgroups",
    "title": "WaitGroups",
    "titleEs": "Grupos de Espera con sync.WaitGroup",
    "category": "Sincronización y Concurrencia Avanzada",
    "categorySlug": "sincronizacion-avanzada",
    "categoryIcon": "settings",
    "difficulty": "Intermedio",
    "summary": "Mecanismo canónico de sincronización para esperar la finalización colectiva de múltiples goroutines concurrentes.",
    "originalExpl": "Para esperar a que múltiples goroutines terminen, podemos usar un waitgroup. Se encuentra en el paquete 'sync' y proporciona los métodos Add, Done y Wait.",
    "basicExpl": {
      "title": "Conceptos Fundamentales para Principiantes",
      "content": "Imagina que eres un profesor que lleva a 10 alumnos de excursión. No puedes subirte al autobús de vuelta hasta que los 10 alumnos hayan subido.\nEso es exactamente un `sync.WaitGroup`:\n1. `wg.Add(3)`: Dices 'voy a lanzar 3 goroutines; cuenta hasta 3'.\n2. `wg.Done()`: Cada goroutine, al terminar su tarea, avisa: '¡Profe, yo ya terminé! (resta 1 al contador)'.\n3. `wg.Wait()`: El programa principal se queda esperando hasta que el contador llegue exactamente a CERO.",
      "keyPoints": [
        "Se importa desde el paquete `sync`: `var wg sync.WaitGroup`.",
        "`wg.Add(n)` incrementa el contador de tareas pendientes.",
        "`wg.Done()` decrementa el contador en 1 (equivalente a `wg.Add(-1)`).",
        "`wg.Wait()` bloquea la ejecución hasta que el contador llega a cero."
      ]
    },
    "interExpl": {
      "title": "Mecanismos Internos y Buenas Prácticas",
      "content": "Reglas de oro para evitar bugs con WaitGroup:\n1. Siempre llama a `wg.Add()` ANTES de lanzar la goroutine con `go func()`, NUNCA dentro de la goroutine. Si lo haces dentro, existe una carrera de datos donde `wg.Wait()` podría ejecutarse antes de que la goroutine haya tenido tiempo de arrancar, creyendo falsamente que no había tareas.\n2. Usa `defer wg.Done()` como primera línea de la goroutine. Esto garantiza que el contador se decrementará incluso si la función tiene retornos tempranos o sufre un pánico.\n3. Si pasas un WaitGroup a otra función, pásalo SIEMPRE por PUNTERO (`*sync.WaitGroup`). Si lo pasas por valor, copiarás la estructura y `Wait()` nunca se enterará de los `Done()`.",
      "keyPoints": [
        "Llamar a `Add()` en la goroutine creadora, nunca dentro de la goroutine hija.",
        "`defer wg.Done()` asegura el decremento ante errores o retornos tempranos.",
        "Paso obligatorio por puntero (`*sync.WaitGroup`) para compartir el contador.",
        "Contador negativo provoca pánico inmediato (`panic: negative WaitGroup counter`)."
      ]
    },
    "expertExpl": {
      "title": "Bajo Nivel, Rendimiento e Internals",
      "content": "Implementación interna de `sync.WaitGroup` (sync/waitgroup.go):\nEn arquitecturas de 64 bits, un WaitGroup se almacena en una estructura de 12 bytes alineada en memoria que contiene:\n- Un contador atómico de 64 bits empaquetado: los 32 bits superiores son el contador de tareas activas (`counter`), y los 32 bits inferiores son el número de goroutines actualmente suspendidas esperando en `Wait()` (`waiter count`).\n- Un semáforo de sistema de 32 bits (`sema`).\n\nTodas las operaciones `Add()` y `Done()` se ejecutan usando instrucciones atómicas de hardware (`atomic.AddUint64`) en espacio de usuario sin utilizar mutexes ni bloqueos pesados. Solo cuando el contador llega a cero, se invoca a `runtime.semrelease` para despertar a los hilos esperando en el semáforo.",
      "keyPoints": [
        "Zero locks en Add/Done: implementado puramente con operaciones atómicas CPU (LOCK XADD).",
        "Semáforo de suspensión: `Wait()` duerme en `runtime.semacquire` con cero consumo de CPU.",
        "Prohibición de copia: implementar `sync.Locker` / `noCopy` para que la herramienta `go vet` alerte si se copia el struct."
      ]
    },
    "evaluation": {
      "title": "Reto: Descarga Concurrente de Archivos con WaitGroup",
      "statement": "Escribe un programa que simule la descarga paralela de 4 archivos (con nombres 'doc1.pdf', 'doc2.pdf', etc.). Usa sync.WaitGroup para coordinar las descargas. Asegúrate de pasar el puntero a wg o usar una clausura, llamar a Add antes de lanzar y usar defer Done.",
      "starterCode": "package main\n\nimport (\n    \"fmt\"\n    \"sync\"\n    \"time\"\n)\n\nfunc descargarArchivo(nombre string, wg *sync.WaitGroup) {\n    // Implementa la descarga simulada y el aviso al WaitGroup\n}\n\nfunc main() {\n    archivos := []string{\"datos.csv\", \"informe.pdf\", \"foto.jpg\", \"backup.zip\"}\n    // Coordina la descarga con sync.WaitGroup\n}",
      "hint": "Haz wg.Add(len(archivos)), lanza cada go descargarArchivo(a, &wg) y al final pon wg.Wait().",
      "solution": "package main\n\nimport (\n    \"fmt\"\n    \"sync\"\n    \"time\"\n)\n\nfunc descargarArchivo(nombre string, wg *sync.WaitGroup) {\n    defer wg.Done() // Garantiza que se descuente al salir\n    \n    fmt.Printf(\"[Descargando] %s...\\n\", nombre)\n    time.Sleep(100 * time.Millisecond) // Simula tiempo de descarga de red\n    fmt.Printf(\"[Completado] %s\\n\", nombre)\n}\n\nfunc main() {\n    archivos := []string{\"datos.csv\", \"informe.pdf\", \"foto.jpg\", \"backup.zip\"}\n    \n    var wg sync.WaitGroup\n    \n    for _, archivo := range archivos {\n        wg.Add(1) // Incrementa en el hilo principal antes de lanzar\n        go descargarArchivo(archivo, &wg)\n    }\n    \n    fmt.Println(\"Esperando a que todas las descargas finalicen...\")\n    wg.Wait() // Pausa hasta que las 4 descargas llamen a Done()\n    fmt.Println(\"¡Todas las descargas han concluido con éxito!\")\n}",
      "explanation": "Llamar a wg.Add(1) en el bucle principal antes del lanzamiento previene condiciones de carrera. El uso de 'defer wg.Done()' asegura que cada goroutine avise al grupo al finalizar, y wg.Wait() congela el hilo principal hasta que el contador desciende exactamente a cero."
    },
    "externalLinks": [
      {
        "title": "Paquete sync: WaitGroup",
        "url": "https://pkg.go.dev/sync#WaitGroup",
        "description": "Documentación oficial de la biblioteca estándar sobre WaitGroup."
      },
      {
        "title": "Go by Example Original: WaitGroups",
        "url": "https://gobyexample.com/waitgroups",
        "description": "Ejemplo canónico en Go by Example."
      },
      {
        "title": "Dave Cheney: Primitivas de sincronización y concurrencia en Go",
        "url": "https://dave.cheney.net/",
        "description": "Guía práctica de Dave Cheney sobre sincronización con WaitGroups y Mutexes."
      }
    ],
    "code": "// Para esperar a que múltiples goroutines concluyan su ejecución,\n// podemos utilizar un *wait group* (`sync.WaitGroup`).\n\npackage main\n\nimport (\n\t\"fmt\"\n\t\"sync\"\n\t\"time\"\n)\n\n// Esta es la función que ejecutaremos en cada goroutine.\nfunc worker(id int) {\n\tfmt.Printf(\"Worker %d starting\\n\", id)\n\n\t// Pausa para simular una tarea pesada.\n\ttime.Sleep(time.Second)\n\tfmt.Printf(\"Worker %d done\\n\", id)\n}\n\nfunc main() {\n\n\t// Este WaitGroup se utiliza para esperar a que terminen todas las\n\t// goroutines iniciadas aquí. Nota: si un WaitGroup se pasa explícitamente\n\t// a funciones, debe hacerse siempre *por puntero*.\n\tvar wg sync.WaitGroup\n\n\t// Iniciamos varias goroutines utilizando `WaitGroup.Go`\n\tfor i := 1; i <= 5; i++ {\n\t\twg.Go(func() {\n\t\t\tworker(i)\n\t\t})\n\t}\n\n\t// Nos bloqueamos hasta que todas las goroutines iniciadas por `wg`\n\t// hayan finalizado. Una goroutine finaliza cuando su función invocada retorna.\n\twg.Wait()\n\n\t// Ten en cuenta que este enfoque no proporciona una forma directa\n\t// de propagar errores desde los trabajadores. Para casos de uso más\n\t// avanzados, considera utilizar el\n\t// [paquete errgroup](https://pkg.go.dev/golang.org/x/sync/errgroup).\n}\n",
    "output": "$ go run waitgroups.go\nWorker 5 starting\nWorker 3 starting\nWorker 4 starting\nWorker 1 starting\nWorker 2 starting\nWorker 4 done\nWorker 1 done\nWorker 2 done\nWorker 5 done\nWorker 3 done\n\n# Es muy probable que el orden en que los trabajadores inician y terminan\n# varíe en cada ejecución.\n",
    "officialUrl": "https://gobyexample.com/waitgroups"
  },
  {
    "id": 42,
    "slug": "rate-limiting",
    "title": "Rate Limiting",
    "titleEs": "Limitación de Tasa (Rate Limiting y Token Bucket)",
    "category": "Sincronización y Concurrencia Avanzada",
    "categorySlug": "sincronizacion-avanzada",
    "categoryIcon": "settings",
    "difficulty": "Avanzado",
    "summary": "Control del flujo y velocidad de procesamiento de peticiones para proteger recursos y respetar cuotas de APIs.",
    "originalExpl": "La limitación de tasa (rate limiting) es un mecanismo importante para controlar la utilización de recursos y mantener la calidad del servicio. Go soporta rate limiting elegantemente con goroutines, canales y tickers.",
    "basicExpl": {
      "title": "Conceptos Fundamentales para Principiantes",
      "content": "Si entras a una discoteca, la puerta no deja entrar a 500 personas de golpe: hay un empleado en la puerta que deja pasar a una persona cada 3 segundos para que no haya avalanchas.\nEn programación, el 'Rate Limiting' (control de tasa) sirve para:\n1. No saturar tu propia base de datos o servidor.\n2. Respetar los límites de APIs externas (como Twitter, Stripe o Google) que te banean si mandas más de 10 peticiones por segundo.\nSe implementa de forma sencilla usando un canal o un `time.Ticker`: la tarea espera a recibir un 'ticket' del reloj antes de poder ejecutarse.",
      "keyPoints": [
        "Controla la frecuencia máxima de ejecución de tareas por unidad de tiempo.",
        "Previene bloqueos por exceso de peticiones (errores HTTP 429 Too Many Requests).",
        "Se construye nativamente con `time.Tick` o con canales con búfer para permitir ráfagas."
      ]
    },
    "interExpl": {
      "title": "Mecanismos Internos y Buenas Prácticas",
      "content": "Algoritmo de Token Bucket (Cubo de Fichas) para soportar ráfagas (bursts):\nUn limitador rígido (1 petición cada 200ms) es ineficiente si el usuario estuvo inactivo durante 5 minutos y de pronto envía 3 peticiones juntas. El patrón 'Token Bucket' soluciona esto:\n- Creas un canal con búfer de 3 elementos: `tokens := make(chan time.Time, 3)`.\n- Lo llenas inicialmente con 3 tokens (permitiendo una ráfaga inmediata de hasta 3 peticiones sin esperar).\n- Una goroutine en segundo plano con un ticker va agregando un nuevo token cada 200ms hasta que el cubo se llene.\nEn producción, se utiliza el paquete oficial `golang.org/x/time/rate`, que implementa un Token Bucket de alta precisión sin necesidad de goroutines activas en segundo plano.",
      "keyPoints": [
        "Token Bucket: Permite tolerar ráfagas iniciales (burst capacity) manteniendo una tasa promedio estricta.",
        "Paquete `golang.org/x/time/rate`: la biblioteca estándar extendida de rate limiting más utilizada en producción en Go.",
        "Algoritmo Leaky Bucket: variante que procesa las peticiones a una velocidad de salida estrictamente constante."
      ]
    },
    "expertExpl": {
      "title": "Bajo Nivel, Rendimiento e Internals",
      "content": "Implementación matemática sin Goroutines (`rate.Limiter`):\nEl paquete `golang.org/x/time/rate` optimiza el rendimiento eliminando por completo los tickers y canales en segundo plano. En lugar de rellenar tokens periódicamente con un temporizador activo, calcula matemáticamente cuántos tokens deberían existir en el instante presente en función del tiempo transcurrido desde la última consulta:\n`nuevosTokens = tiempoTranscurrido * tasaDeLlenado`.\n\nEsto convierte la comprobación de límites (`limiter.Allow()` o `limiter.Wait(ctx)`) en una simple operación matemática con mutex y marcas de tiempo del reloj monotónico de la CPU (`time.Now()`), logrando procesar millones de evaluaciones de cuota por segundo con cero consumo de CPU cuando el sistema está inactivo.",
      "keyPoints": [
        "Lazy evaluation: cálculo de tokens bajo demanda según el reloj monotónico de la CPU sin hilos de fondo.",
        "Zero background CPU overhead: no gasta ciclos de procesador cuando no hay peticiones entrantes.",
        "Integración nativa con `context.Context`: permite cancelar la espera si el cliente desconecta la petición HTTP."
      ]
    },
    "evaluation": {
      "title": "Reto: Limitador de Tasa con Capacidad de Ráfaga (Burst Limiter)",
      "statement": "Implementa un limitador de peticiones con capacidad de ráfaga de 3 peticiones inmediatas y una tasa de reposición de 1 petición cada 100ms. Simula la llegada de 5 peticiones simultáneas y verifica cómo las 3 primeras se atienden instantáneamente y las 2 restantes esperan el intervalo del limitador.",
      "starterCode": "package main\n\nimport (\n    \"fmt\"\n    \"time\"\n)\n\nfunc main() {\n    // Implementa el canal de tokens con búfer de 3\n    // Llena la ráfaga inicial y arranca el rellenador periódico\n    // Procesa 5 peticiones midiendo el tiempo de cada una\n}",
      "hint": "Crea burstyLimiter := make(chan time.Time, 3). Llena 3 veces. Luego go func() con ticker de 100ms.",
      "solution": "package main\n\nimport (\n    \"fmt\"\n    \"time\"\n)\n\nfunc main() {\n    // Canal con búfer de 3 para admitir ráfagas de 3 peticiones\n    limiteRafaga := make(chan time.Time, 3)\n    \n    // Pre-llenamos el búfer con 3 tokens iniciales\n    for i := 0; i < 3; i++ {\n        limiteRafaga <- time.Now()\n    }\n    \n    // Goroutine que agrega un nuevo token cada 100ms si hay espacio\n    go func() {\n        for t := range time.Tick(100 * time.Millisecond) {\n            select {\n            case limiteRafaga <- t:\n            default:\n                // Búfer lleno; se descarta el token para no superar la capacidad de 3\n            }\n        }\n    }()\n    \n    // 5 peticiones entrantes\n    peticiones := []int{1, 2, 3, 4, 5}\n    inicio := time.Now()\n    \n    for _, req := range peticiones {\n        <-limiteRafaga // Espera un token disponible\n        transcurrido := time.Since(inicio).Milliseconds()\n        fmt.Printf(\"Petición #%d atendida a los %d ms\\n\", req, transcurrido)\n    }\n}",
      "explanation": "Las peticiones 1, 2 y 3 se ejecutan prácticamente en 0 ms porque consumen los 3 tokens pre-cargados en el canal con búfer (ráfaga). Las peticiones 4 y 5 deben esperar obligatoriamente a que la goroutine de fondo deposite nuevos tokens cada 100ms, respetando el límite de velocidad promedio."
    },
    "externalLinks": [
      {
        "title": "Paquete golang.org/x/time/rate (Documentación oficial)",
        "url": "https://pkg.go.dev/golang.org/x/time/rate",
        "description": "Documentación oficial del paquete de rate limiting de producción en Go."
      },
      {
        "title": "Go by Example Original: Rate Limiting",
        "url": "https://gobyexample.com/rate-limiting",
        "description": "Ejemplo en Go by Example."
      },
      {
        "title": "Blog de Cloudflare: Cómo diseñamos limitación de tasa (Rate Limiting) en Go",
        "url": "https://blog.cloudflare.com/counting-things-a-lot-of-different-things/",
        "description": "Artículo de ingeniería de Cloudflare sobre algoritmos de limitación de tasa a escala masiva."
      }
    ],
    "code": "// El [_límite de tasa_](https://en.wikipedia.org/wiki/Rate_limiting) (rate limiting)\n// es un mecanismo esencial para controlar el uso de recursos\n// y mantener la calidad del servicio. Go admite elegantemente\n// el control de frecuencia con goroutines, canales y [tickers](tickers).\n\npackage main\n\nimport (\n\t\"fmt\"\n\t\"time\"\n)\n\nfunc main() {\n\n\t// Primero veremos una limitación de tasa básica. Supongamos\n\t// que deseamos limitar el procesamiento de peticiones entrantes.\n\t// Atenderemos estas solicitudes a través de un canal.\n\trequests := make(chan int, 5)\n\tfor i := 1; i <= 5; i++ {\n\t\trequests <- i\n\t}\n\tclose(requests)\n\n\t// Este canal `limiter` recibirá un valor\n\t// cada 200 milisegundos. Es el regulador en\n\t// nuestro esquema de control de tasa.\n\tlimiter := time.Tick(200 * time.Millisecond)\n\n\t// Al bloquearnos en una recepción del canal `limiter`\n\t// antes de procesar cada solicitud, nos limitamos a\n\t// 1 solicitud cada 200 milisegundos.\n\tfor req := range requests {\n\t\t<-limiter\n\t\tfmt.Println(\"request\", req, time.Now())\n\t}\n\n\t// Es posible que deseemos permitir ráfagas cortas (bursts) de peticiones\n\t// manteniendo el límite general a largo plazo. Podemos lograrlo\n\t// añadiendo búfer a nuestro canal regulador. Este canal `burstyLimiter`\n\t// permitirá ráfagas de hasta 3 eventos consecutivos.\n\tburstyLimiter := make(chan time.Time, 3)\n\n\t// Llenamos el canal para representar la capacidad de ráfaga permitida.\n\tfor range 3 {\n\t\tburstyLimiter <- time.Now()\n\t}\n\n\t// Cada 200 milisegundos intentaremos agregar un nuevo\n\t// valor a `burstyLimiter`, hasta alcanzar su límite de 3.\n\tgo func() {\n\t\tfor t := range time.Tick(200 * time.Millisecond) {\n\t\t\tburstyLimiter <- t\n\t\t}\n\t}()\n\n\t// Ahora simulamos 5 peticiones entrantes más. Las primeras\n\t// 3 se beneficiarán de la capacidad de ráfaga de `burstyLimiter`.\n\tburstyRequests := make(chan int, 5)\n\tfor i := 1; i <= 5; i++ {\n\t\tburstyRequests <- i\n\t}\n\tclose(burstyRequests)\n\tfor req := range burstyRequests {\n\t\t<-burstyLimiter\n\t\tfmt.Println(\"request\", req, time.Now())\n\t}\n}\n",
    "output": "# Al ejecutar nuestro programa vemos el primer lote de peticiones\n# procesado una vez cada ~200 milisegundos según lo programado.\n$ go run rate-limiting.go\nrequest 1 2012-10-19 00:38:18.687438 +0000 UTC\nrequest 2 2012-10-19 00:38:18.887471 +0000 UTC\nrequest 3 2012-10-19 00:38:19.087238 +0000 UTC\nrequest 4 2012-10-19 00:38:19.287338 +0000 UTC\nrequest 5 2012-10-19 00:38:19.487331 +0000 UTC\n\n# Para el segundo lote de peticiones atendemos las 3 primeras de forma\n# inmediata debido al búfer de ráfaga, y luego despachamos las 2 restantes\n# con demoras de ~200ms cada una.\nrequest 1 2012-10-19 00:38:20.487578 +0000 UTC\nrequest 2 2012-10-19 00:38:20.487645 +0000 UTC\nrequest 3 2012-10-19 00:38:20.487676 +0000 UTC\nrequest 4 2012-10-19 00:38:20.687483 +0000 UTC\nrequest 5 2012-10-19 00:38:20.887542 +0000 UTC\n",
    "officialUrl": "https://gobyexample.com/rate-limiting"
  },
  {
    "id": 43,
    "slug": "atomic-counters",
    "title": "Atomic Counters",
    "titleEs": "Contadores y Operaciones Atómicas (sync/atomic)",
    "category": "Sincronización y Concurrencia Avanzada",
    "categorySlug": "sincronizacion-avanzada",
    "categoryIcon": "settings",
    "difficulty": "Avanzado",
    "summary": "Gestión de estado concurrente ultra-rápida y libre de locks mediante instrucciones atómicas a nivel de hardware de la CPU.",
    "originalExpl": "El mecanismo principal para gestionar el estado en Go es la comunicación a través de canales. Cuando necesitas gestionar un estado simple como un contador compartido, el paquete sync/atomic ofrece operaciones atómicas de bajo nivel.",
    "basicExpl": {
      "title": "Conceptos Fundamentales para Principiantes",
      "content": "Si 50 personas intentan sumar 1 al mismo tiempo a una pizarra (`contador++`), se chocarán los codos y el resultado final estará mal porque `contador++` no es una sola acción: primero lees el número, luego sumas 1 en tu cabeza y luego escribes el resultado.\nSi dos personas leen al mismo tiempo el número '5', ambas escribirán '6' y se perderá una suma.\nPara evitar esto sin usar candados pesados, existen las 'Operaciones Atómicas':\n- Una operación atómica es indivisible: la CPU garantiza que la suma ocurre en un solo paso instantáneo de hardware.\n- Nadie puede interrumpir la operación a la mitad.",
      "keyPoints": [
        "Se encuentra en el paquete `sync/atomic`.",
        "Evita condiciones de carrera (data races) en variables numéricas compartidas.",
        "Mucho más rápido que un Mutex para contadores y banderas booleanas simples.",
        "Desde Go 1.19, se utilizan los tipos atómicos modernos: `atomic.Uint64`, `atomic.Int64`, `atomic.Bool`."
      ]
    },
    "interExpl": {
      "title": "Mecanismos Internos y Buenas Prácticas",
      "content": "Tipos atómicos modernos en Go 1.19+:\nAntes de Go 1.19, se utilizaban funciones sueltas pasando punteros (`atomic.AddUint64(&ops, 1)`), lo que requería precauciones extremas de alineación de memoria. En las versiones modernas de Go, se deben utilizar los tipos atómicos estructurados dedicados:\n```go\nvar visitas atomic.Uint64\nvisitas.Add(1)          // Incrementa de forma atómica\nfmt.Println(visitas.Load()) // Lee de forma atómica y segura\nvisitas.Store(0)        // Guarda un valor atómicamente\n```\nOperación Compare-And-Swap (CAS): `visitas.CompareAndSwap(viejo, nuevo)` actualiza el valor solo si el valor actual coincide exactamente con 'viejo', base de todos los algoritmos concurrentes libres de bloqueos (lock-free).",
      "keyPoints": [
        "Tipos modernos Go 1.19+: `atomic.Uint64`, `atomic.Int64`, `atomic.Bool`, `atomic.Pointer[T]`.",
        "Métodos idiomáticos: `Add()`, `Load()`, `Store()`, `Swap()`, `CompareAndSwap()`.",
        "Detección de carreras de datos: compila y prueba siempre con `go test -race` o `go run -race`."
      ]
    },
    "expertExpl": {
      "title": "Bajo Nivel, Rendimiento e Internals",
      "content": "Instrucciones de Hardware y Falso Compartido (False Sharing):\nA nivel de ensamblador en arquitecturas x86-64, `atomic.AddUint64` emite la instrucción `LOCK XADDQ`. El prefijo `LOCK` hace que el procesador bloquee la línea de caché correspondiente (Cache Line Lock de 64 bytes) mediante el protocolo de coherencia de caché (MESI/MOESI), garantizando exclusión mutua directa en el silicio de la CPU sin tocar el sistema operativo ni suspender la goroutine.\n\n¡Peligro de False Sharing (Falso Compartido)!: Si dos variables atómicas utilizadas intensivamente por distintos núcleos de CPU residen dentro de la misma línea de caché de 64 bytes, los núcleos de la CPU invalidarán constantemente sus cachés L1/L2 mutuamente, degradando el rendimiento hasta un 90%. Para evitarlo en estructuras de alto rendimiento, se agrega relleno (padding) de 64 bytes entre variables atómicas.",
      "keyPoints": [
        "Instrucción LOCK XADDQ: exclusión atómica nativa en el hardware de la CPU.",
        "Zero context switch overhead: no hay llamadas al kernel ni suspensión en el scheduler de Go.",
        "False Sharing Prevention: añadir `_ [56]byte` de relleno entre contadores atómicos adyacentes para evitar invalidaciones cruzadas de caché L1."
      ]
    },
    "evaluation": {
      "title": "Reto: Contador de Visitas Concurrente Seguro con atomic.Uint64",
      "statement": "Lanza 50 goroutines concurrentes. Cada una debe incrementar un contador compartido exactamente 100 veces. Implementa la solución utilizando el tipo moderno 'atomic.Uint64' y sync.WaitGroup. Comprueba que el resultado final sea exactamente 5000 sin ninguna carrera de datos.",
      "starterCode": "package main\n\nimport (\n    \"fmt\"\n    \"sync\"\n    \"sync/atomic\"\n)\n\nfunc main() {\n    // Define el contador con atomic.Uint64\n    // Lanza 50 goroutines con 100 incrementos cada una\n    // Imprime el valor final con Load()\n}",
      "hint": "Declara 'var contador atomic.Uint64'. En cada incremento haz: contador.Add(1). Al final: contador.Load().",
      "solution": "package main\n\nimport (\n    \"fmt\"\n    \"sync\"\n    \"sync/atomic\"\n)\n\nfunc main() {\n    var contador atomic.Uint64\n    var wg sync.WaitGroup\n    \n    numGoroutines := 50\n    incrementosPorGoroutine := 100\n    \n    wg.Add(numGoroutines)\n    for i := 0; i < numGoroutines; i++ {\n        go func() {\n            defer wg.Done()\n            for j := 0; j < incrementosPorGoroutine; j++ {\n                contador.Add(1) // Incremento atómico a nivel de CPU\n            }\n        }()\n    }\n    \n    wg.Wait()\n    \n    totalEsperado := numGoroutines * incrementosPorGoroutine\n    fmt.Printf(\"Total registrado: %d (Esperado: %d)\\n\", contador.Load(), totalEsperado)\n    \n    if contador.Load() == uint64(totalEsperado) {\n        fmt.Println(\"¡Sincronización atómica perfecta y libre de data races!\")\n    }\n}",
      "explanation": "El método 'contador.Add(1)' ejecuta una instrucción atómica de hardware por cada incremento. A pesar de que 50 goroutines escriben simultáneamente miles de veces, ninguna suma se pierde ni se corrompe en memoria, garantizando consistencia absoluta y máxima velocidad."
    },
    "externalLinks": [
      {
        "title": "Paquete sync/atomic (Documentación oficial)",
        "url": "https://pkg.go.dev/sync/atomic",
        "description": "Documentación oficial de los tipos y operaciones atómicas de la biblioteca estándar."
      },
      {
        "title": "Go by Example Original: Atomic Counters",
        "url": "https://gobyexample.com/atomic-counters",
        "description": "Ejemplo en Go by Example."
      },
      {
        "title": "Ardan Labs: Concurrencia, Goroutines y Operaciones Atómicas",
        "url": "https://www.ardanlabs.com/blog/2014/01/concurrency-goroutines-and-channels.html",
        "description": "Análisis comparativo de rendimiento entre canales, mutexes y operaciones atómicas."
      }
    ],
    "code": "// El mecanismo primordial para gestionar estado en Go es\n// la comunicación a través de canales. Vimos esto, por ejemplo,\n// con los [pools de trabajadores](worker-pools). Existen no obstante\n// otras opciones para gestionar estado. Aquí examinaremos el uso\n// del paquete `sync/atomic` para _contadores atómicos_\n// accedidos por múltiples goroutines simultáneamente.\n\npackage main\n\nimport (\n\t\"fmt\"\n\t\"sync\"\n\t\"sync/atomic\"\n)\n\nfunc main() {\n\n\t// Usaremos un tipo entero atómico para representar nuestro\n\t// contador (siempre positivo).\n\tvar ops atomic.Uint64\n\n\t// Un WaitGroup nos ayudará a esperar a que todas las goroutines\n\t// concluyan su trabajo.\n\tvar wg sync.WaitGroup\n\n\t// Iniciaremos 50 goroutines que incrementarán el\n\t// contador exactamente 1000 veces cada una.\n\tfor range 50 {\n\t\twg.Go(func() {\n\t\t\tfor range 1000 {\n\t\t\t\t// Para incrementar el contador de forma atómica usamos `Add`.\n\t\t\t\tops.Add(1)\n\t\t\t}\n\t\t})\n\t}\n\n\t// Esperamos hasta que todas las goroutines hayan finalizado.\n\twg.Wait()\n\n\t// En este punto ninguna goroutine escribe en 'ops', pero usando\n\t// `Load` es completamente seguro leer un valor de forma atómica incluso\n\t// mientras otras goroutines lo están actualizando (atómicamente).\n\tfmt.Println(\"ops:\", ops.Load())\n}\n",
    "output": "# Esperamos obtener exactamente 50,000 operaciones. De haber\n# utilizado un entero común sin atomicidad e incrementado con\n# `ops++`, obtendríamos un número dispar y variable en cada\n# ejecución debido a la interferencia entre goroutines.\n# Además, registraríamos fallos por condiciones de carrera (data race)\n# al compilar o ejecutar con la bandera `-race`.\n$ go run atomic-counters.go\nops: 50000\n\n# A continuación veremos los mutexes, otra herramienta esencial\n# para gestionar estado concurrente.\n",
    "officialUrl": "https://gobyexample.com/atomic-counters"
  },
  {
    "id": 44,
    "slug": "mutexes",
    "title": "Mutexes",
    "titleEs": "Exclusión Mutua con Mutex y RWMutex",
    "category": "Sincronización y Concurrencia Avanzada",
    "categorySlug": "sincronizacion-avanzada",
    "categoryIcon": "settings",
    "difficulty": "Intermedio",
    "summary": "Protección de estructuras de datos complejas mediante exclusión mutua tradicional con sync.Mutex y sync.RWMutex.",
    "originalExpl": "Para estados más complejos que un simple contador podemos usar un Mutex (exclusión mutua) para acceder a los datos de forma segura a través de múltiples goroutines.",
    "basicExpl": {
      "title": "Conceptos Fundamentales para Principiantes",
      "content": "Un Mutex (Mutual Exclusion) es como el cerrojo del baño de un restaurante:\n- Cuando alguien entra, echa el cerrojo (`mutex.Lock()`).\n- Mientras la puerta tenga cerrojo, nadie más puede entrar; las demás personas tienen que esperar pacientemente afuera en la fila.\n- Cuando la persona sale, quita el cerrojo (`mutex.Unlock()`). Ahora la siguiente persona puede entrar.\nEn Go, protege mapas, slices y estructuras compartidas para que dos goroutines no las modifiquen al mismo tiempo provocando corrupción de memoria.",
      "keyPoints": [
        "Se encuentra en el paquete `sync`: `var mu sync.Mutex`.",
        "`mu.Lock()` adquiere el candado exclusivo; si ya está ocupado, pausa la goroutine.",
        "`mu.Unlock()` libera el candado.",
        "Usa siempre `defer mu.Unlock()` inmediatamente después de `mu.Lock()` para garantizar su liberación."
      ]
    },
    "interExpl": {
      "title": "Mecanismos Internos y Buenas Prácticas",
      "content": "sync.RWMutex (Lector-Escritor Mutex):\nSi tienes un mapa que se lee 1,000 veces por segundo pero solo se escribe una vez por minuto, bloquear a todos los lectores entre sí con un Mutex normal es un desperdicio enorme de rendimiento. Para esto existe `sync.RWMutex`:\n- Múltiples lectores simultáneos: `mu.RLock()` y `mu.RUnlock()` permiten que cientos de goroutines lean al mismo tiempo.\n- Escritor exclusivo: `mu.Lock()` y `mu.Unlock()` bloquean a todos los lectores y escritores mientras se realiza la modificación.",
      "keyPoints": [
        "`sync.RWMutex`: maximiza el rendimiento cuando las lecturas superan con creces a las escrituras.",
        "Composición en estructuras: se suele colocar el mutex junto al campo que protege: `type Cache struct { mu sync.RWMutex; datos map[string]string }`.",
        "Peligro de Deadlock: NUNCA intentes llamar a `mu.Lock()` dos veces en la misma goroutine sin desbloquear antes (los mutexes de Go NO son reentrantes)."
      ]
    },
    "expertExpl": {
      "title": "Bajo Nivel, Rendimiento e Internals",
      "content": "Modos Normal y Hambriento (Starvation Mode en sync/mutex.go):\nEl Mutex de Go implementa dos modos de funcionamiento dinámicos:\n1. Modo Normal: Las goroutines recién llegadas intentan adquirir el lock haciendo 'spin' (bucle activo corto de CPU). Esto es muy rápido porque no sufren cambio de contexto de scheduler, pero puede causar que una goroutine antigua en la cola espere demasiado.\n2. Modo Starvation (Inanición): Si una goroutine espera más de 1 milisegundo por el lock, el Mutex cambia automáticamente a modo 'Hambriento'. En este modo, el lock pasa DIRECTAMENTE a la primera goroutine de la cola de espera sin permitir que goroutines nuevas le roben el turno.\nEsto garantiza un equilibrio perfecto entre rendimiento extremo de pico y justicia (fairness) sin inanición.",
      "keyPoints": [
        "Starvation Mode (1ms threshold): previene la inanición de goroutines antiguas frente a ráfagas de goroutines nuevas.",
        "Non-reentrant: Go rechaza intencionadamente los mutexes reentrantes (recursivos) para obligar a un diseño claro de la concurrencia.",
        "Auditoría con `-race`: el detector de carreras de Go (`go test -race`) instrumenta cada lectura y escritura detectando violaciones de exclusión mutua."
      ]
    },
    "evaluation": {
      "title": "Reto: Cache en Memoria Concurrente con sync.RWMutex",
      "statement": "Crea una estructura 'CacheSegura' que proteja un mapa 'map[string]string' con sync.RWMutex. Implementa los métodos 'Obtener(clave string) (string, bool)' usando RLock y 'Guardar(clave, valor string)' usando Lock. Lanza 10 lectores y 2 escritores concurrentes y comprueba su funcionamiento.",
      "starterCode": "package main\n\nimport (\n    \"fmt\"\n    \"sync\"\n)\n\n// Define CacheSegura y sus métodos Obtener y Guardar\n\nfunc main() {\n    // Prueba con goroutines concurrentes\n}",
      "hint": "En Obtener haz: c.mu.RLock(); defer c.mu.RUnlock(). En Guardar haz: c.mu.Lock(); defer c.mu.Unlock().",
      "solution": "package main\n\nimport (\n    \"fmt\"\n    \"sync\"\n    \"time\"\n)\n\ntype CacheSegura struct {\n    mu    sync.RWMutex\n    datos map[string]string\n}\n\nfunc NuevaCache() *CacheSegura {\n    return &CacheSegura{datos: make(map[string]string)}\n}\n\nfunc (c *CacheSegura) Obtener(clave string) (string, bool) {\n    c.mu.RLock()         // Permite múltiples lecturas simultáneas\n    defer c.mu.RUnlock()\n    val, ok := c.datos[clave]\n    return val, ok\n}\n\nfunc (c *CacheSegura) Guardar(clave, valor string) {\n    c.mu.Lock()          // Exclusión total para escribir\n    defer c.mu.Unlock()\n    c.datos[clave] = valor\n}\n\nfunc main() {\n    cache := NuevaCache()\n    var wg sync.WaitGroup\n    \n    // Escritores\n    for i := 1; i <= 2; i++ {\n        wg.Add(1)\n        go func(id int) {\n            defer wg.Done()\n            k := fmt.Sprintf(\"k%d\", id)\n            cache.Guardar(k, fmt.Sprintf(\"valor-%d\", id))\n        }(i)\n    }\n    \n    // Lectores\n    for i := 1; i <= 6; i++ {\n        wg.Add(1)\n        go func(id int) {\n            defer wg.Done()\n            time.Sleep(10 * time.Millisecond)\n            v, ok := cache.Obtener(\"k1\")\n            if ok {\n                fmt.Printf(\"[Lector %d] Lectura: %s\\n\", id, v)\n            }\n        }(i)\n    }\n    \n    wg.Wait()\n    fmt.Println(\"Operaciones concurrentes finalizadas sin carreras de datos.\")\n}",
      "explanation": "El uso de sync.RWMutex protege el mapa interno de accesos concurrentes destructivos. Múltiples goroutines pueden ejecutar Obtener() al mismo tiempo gracias a RLock(), mientras que Guardar() asegura exclusividad atómica total con Lock()."
    },
    "externalLinks": [
      {
        "title": "Paquete sync: Mutex and RWMutex",
        "url": "https://pkg.go.dev/sync#Mutex",
        "description": "Documentación oficial de la biblioteca estándar para Mutex y RWMutex."
      },
      {
        "title": "Go by Example Original: Mutexes",
        "url": "https://gobyexample.com/mutexes",
        "description": "Ejemplo interactivo en Go by Example."
      },
      {
        "title": "Blog oficial de Go: Introducción al detector de condiciones de carrera (Race Detector)",
        "url": "https://go.dev/blog/race-detector",
        "description": "Cómo funciona el detector de carreras ThreadSanitizer en Go."
      }
    ],
    "code": "// En el ejemplo anterior vimos cómo gestionar el estado de un contador\n// simple utilizando [operaciones atómicas](atomic-counters).\n// Para estados más complejos podemos recurrir a un [_mutex_](https://en.wikipedia.org/wiki/Mutual_exclusion)\n// (exclusión mutua) para acceder a los datos de forma segura entre múltiples goroutines.\n\npackage main\n\nimport (\n\t\"fmt\"\n\t\"sync\"\n)\n\n// Container almacena un mapa de contadores; como deseamos\n// actualizarlo concurrentemente desde múltiples goroutines,\n// añadimos un `Mutex` para sincronizar el acceso.\n// Ten en cuenta que los mutexes no deben copiarse; si este\n// `struct` se pasa como parámetro, debe hacerse siempre\n// por puntero.\ntype Container struct {\n\tmu       sync.Mutex\n\tcounters map[string]int\n}\n\nfunc (c *Container) inc(name string) {\n\t// Bloqueamos el mutex antes de acceder a `counters`; lo liberamos\n\t// al final de la función mediante una sentencia [defer](defer).\n\tc.mu.Lock()\n\tdefer c.mu.Unlock()\n\tc.counters[name]++\n}\n\nfunc main() {\n\tc := Container{\n\t\t// Observa que el valor cero de un mutex es completamente utilizable tal cual,\n\t\t// por lo que no se requiere inicialización explícita aquí.\n\t\tcounters: map[string]int{\"a\": 0, \"b\": 0},\n\t}\n\n\tvar wg sync.WaitGroup\n\n\t// Esta función incrementa un contador por nombre\n\t// dentro de un bucle.\n\tdoIncrement := func(name string, n int) {\n\t\tfor range n {\n\t\t\tc.inc(name)\n\t\t}\n\t}\n\n\t// Ejecutamos varias goroutines de manera concurrente; observa\n\t// que todas acceden al mismo `Container`, y dos de ellas\n\t// acceden al mismo contador \"a\".\n\twg.Go(func() {\n\t\tdoIncrement(\"a\", 10000)\n\t})\n\n\twg.Go(func() {\n\t\tdoIncrement(\"a\", 10000)\n\t})\n\n\twg.Go(func() {\n\t\tdoIncrement(\"b\", 10000)\n\t})\n\n\t// Esperamos a que las goroutines finalicen.\n\twg.Wait()\n\tfmt.Println(c.counters)\n}\n",
    "output": "# Ejecutar el programa demuestra que los contadores\n# se actualizaron con total exactitud y sincronía.\n$ go run mutexes.go\nmap[a:20000 b:10000]\n\n# A continuación veremos cómo resolver esta misma tarea de gestión\n# de estado empleando únicamente goroutines y canales.\n",
    "officialUrl": "https://gobyexample.com/mutexes"
  },
  {
    "id": 45,
    "slug": "stateful-goroutines",
    "title": "Stateful Goroutines",
    "titleEs": "Goroutines con Estado (Actor Pattern)",
    "category": "Sincronización y Concurrencia Avanzada",
    "categorySlug": "sincronizacion-avanzada",
    "categoryIcon": "settings",
    "difficulty": "Avanzado",
    "summary": "Gestión de estado concurrente delegando la propiedad exclusiva de los datos a una única goroutine dedicada.",
    "originalExpl": "En el ejemplo anterior usamos mutexes para sincronizar el acceso a un estado compartido. Otra opción es delegar la gestión del estado a una única goroutine dedicada que se comunica mediante canales. Esto sigue la filosofía de Go de compartir memoria comunicándose.",
    "basicExpl": {
      "title": "Conceptos Fundamentales para Principiantes",
      "content": "En vez de poner candados (mutexes) para que varias personas toquen los mismos datos, contratas a un 'administrador' exclusivo:\n- Una única goroutine se queda sentada cuidando los datos (el estado).\n- Nadie más puede tocar los datos directamente.\n- Si alguien quiere leer o modificar algo, le envía una carta (un canal) al administrador pidiéndoselo.\n- El administrador atiende una petición a la vez y responde por un canal privado.\nEsto elimina por completo las carreras de datos y la necesidad de recordar poner y quitar cerrojos.",
      "keyPoints": [
        "Una única goroutine es la dueña absoluta del estado.",
        "Los clientes se comunican con ella exclusivamente a través de canales.",
        "Inspirado en el modelo de actores (Actor Model estilo Erlang o Akka)."
      ]
    },
    "interExpl": {
      "title": "Mecanismos Internos y Buenas Prácticas",
      "content": "Estructuras de Solicitud de Lectura y Escritura:\nSe definen estructuras de comando que contienen los datos de la petición y un canal de respuesta privado (unbuffered response channel):\n```go\ntype LecturaReq struct {\n    Clave     int\n    Respuesta chan int\n}\ntype EscrituraReq struct {\n    Clave     int\n    Valor     int\n    Respuesta chan bool\n}\n```\nLa goroutine del estado corre un bucle `for { select { ... } }` atendiendo las peticiones secuencialmente.",
      "keyPoints": [
        "Canal de respuesta embebido: cada petición lleva su propio canal para recibir la respuesta privada.",
        "Cero locks manuales: la sincronización se deriva naturalmente de la comunicación por canales.",
        "Cuándo elegirlo: excelente cuando la lógica de mutación de estado involucra múltiples pasos o reglas complejas que serían difíciles de proteger con mutexes simples."
      ]
    },
    "expertExpl": {
      "title": "Bajo Nivel, Rendimiento e Internals",
      "content": "Comparativa de Rendimiento frente a Mutexes:\nUn Mutex no contaminado cuesta solo ~10-15 nanosegundos por operación (una simple instrucción atómica de hardware). En cambio, el patrón Stateful Goroutine requiere:\n1. Asignar las estructuras de comando y canales de respuesta en el heap.\n2. Al menos 2 operaciones de canal (envío de la orden + recepción de la respuesta), provocando conmutaciones de contexto entre goroutines en el scheduler.\n\nPor tanto, una Stateful Goroutine suele ser entre 4 y 10 veces más lenta en términos de CPU pura que un Mutex bien optimizado. Sin embargo, su valor no reside en la micro-velocidad, sino en la robustez arquitectónica: elimina de raíz la posibilidad de bloqueos mutuos anidados (deadlocks de orden de mutex) y simplifica los tests de integración.",
      "keyPoints": [
        "Overhead de sincronización: mayor latencia por mensaje que un Mutex puro debido a la conmutación de goroutines.",
        "Eliminación de deadlocks: no existen bloqueos cruzados entre mutexes.",
        "Arquitectura determinista: las operaciones se procesan en un orden serializado estrictamente FIFO según el canal."
      ]
    },
    "evaluation": {
      "title": "Reto: Gestor de Puntos de Usuario con Goroutine con Estado",
      "statement": "Implementa un gestor de puntos concurrente utilizando una Goroutine con Estado. Debe admitir dos tipos de mensajes: 'SumarPuntos{Usuario string, Puntos int}' y 'ConsultarPuntos{Usuario string, Resp chan int}'. Lanza múltiples goroutines concurrentes sumando puntos y consulta el balance final.",
      "starterCode": "package main\n\nimport \"fmt\"\n\n// Define los structs de mensaje y la goroutine administradora\n\nfunc main() {\n    // Lanza el gestor y prueba la concurrencia\n}",
      "hint": "Crea dos canales: sumaCh y consultaCh. La goroutine gestora ejecuta un select sobre ambos.",
      "solution": "package main\n\nimport \"fmt\"\n\ntype SumarPuntos struct {\n    Usuario string\n    Puntos  int\n}\n\ntype ConsultarPuntos struct {\n    Usuario string\n    Resp    chan int\n}\n\nfunc gestorPuntos(sumaCh <-chan SumarPuntos, consultaCh <-chan ConsultarPuntos) {\n    puntos := make(map[string]int)\n    for {\n        select {\n        case cmd := <-sumaCh:\n            puntos[cmd.Usuario] += cmd.Puntos\n        case req := <-consultaCh:\n            req.Resp <- puntos[req.Usuario]\n        }\n    }\n}\n\nfunc main() {\n    sumaCh := make(chan SumarPuntos)\n    consultaCh := make(chan ConsultarPuntos)\n    \n    go gestorPuntos(sumaCh, consultaCh)\n    \n    // Sumas concurrentes\n    sumaCh <- SumarPuntos{Usuario: \"Carlos\", Puntos: 50}\n    sumaCh <- SumarPuntos{Usuario: \"Carlos\", Puntos: 30}\n    sumaCh <- SumarPuntos{Usuario: \"Marta\", Puntos: 100}\n    \n    // Consulta de balance\n    respCh := make(chan int)\n    consultaCh <- ConsultarPuntos{Usuario: \"Carlos\", Resp: respCh}\n    totalCarlos := <-respCh\n    \n    consultaCh <- ConsultarPuntos{Usuario: \"Marta\", Resp: respCh}\n    totalMarta := <-respCh\n    \n    fmt.Printf(\"Balance final -> Carlos: %d pts | Marta: %d pts\\n\", totalCarlos, totalMarta)\n}",
      "explanation": "El mapa 'puntos' pertenece exclusivamente a la goroutine 'gestorPuntos'. Nadie más tiene acceso a él. Todas las mutaciones y lecturas ocurren en orden serializado a través de los canales, garantizando total consistencia sin utilizar un solo cerrojo o mutex."
    },
    "externalLinks": [
      {
        "title": "Blog oficial de Go: No te comuniques compartiendo memoria, comparte memoria comunicándote",
        "url": "https://go.dev/blog/codelab-share",
        "description": "Artículo fundacional sobre la filosofía de diseño concurrente en Go."
      },
      {
        "title": "Go by Example Original: Stateful Goroutines",
        "url": "https://gobyexample.com/stateful-goroutines",
        "description": "Ejemplo en Go by Example."
      },
      {
        "title": "Guía canónica Effective Go: Concurrencia mediante comunicación",
        "url": "https://go.dev/doc/effective_go#concurrency",
        "description": "Guía canónica de diseño sobre comunicación entre goroutines."
      }
    ],
    "code": "// En el ejemplo previo utilizamos bloqueos explícitos con\n// [mutexes](mutexes) para sincronizar el acceso a estado compartido\n// entre múltiples goroutines. Otra alternativa consiste en aprovechar las\n// capacidades integradas de goroutines y canales para lograr idéntico resultado.\n// Este enfoque basado en canales concuerda con la filosofía de Go de compartir\n// memoria comunicando, donde cada pieza de dato pertenece\n// a exactamente una goroutine propietaria.\n\npackage main\n\nimport (\n\t\"fmt\"\n\t\"math/rand\"\n\t\"sync/atomic\"\n\t\"time\"\n)\n\n// En este ejemplo nuestro estado pertenecerá a una única\n// goroutine. Esto garantiza que la información nunca se corrompa\n// con accesos concurrentes. Para leer o escribir en ese estado,\n// otras goroutines enviarán mensajes a la goroutine propietaria\n// y recibirán las respuestas correspondientes. Estas estructuras\n// `readOp` y `writeOp` encapsulan dichas peticiones y proporcionan un canal\n// para que la goroutine propietaria responda.\ntype readOp struct {\n\tkey  int\n\tresp chan int\n}\ntype writeOp struct {\n\tkey  int\n\tval  int\n\tresp chan bool\n}\n\nfunc main() {\n\n\t// Como antes, contabilizaremos cuántas operaciones realizamos.\n\tvar readOps uint64\n\tvar writeOps uint64\n\n\t// Los canales `reads` y `writes` serán utilizados por\n\t// otras goroutines para emitir solicitudes de lectura y escritura,\n\t// respectivamente.\n\treads := make(chan readOp)\n\twrites := make(chan writeOp)\n\n\t// Aquí está la goroutine propietaria del `state`, el cual\n\t// es un mapa como en el ejemplo anterior pero ahora privado\n\t// para esta goroutine con estado. Esta goroutine realiza un\n\t// select repetidamente sobre los canales `reads` y `writes`,\n\t// respondiendo a las solicitudes según van llegando. Una respuesta\n\t// se ejecuta realizando primero la operación solicitada y luego\n\t// enviando un valor en el canal de respuesta `resp` para indicar éxito\n\t// (y el valor obtenido en el caso de las lecturas).\n\tgo func() {\n\t\tvar state = make(map[int]int)\n\t\tfor {\n\t\t\tselect {\n\t\t\tcase read := <-reads:\n\t\t\t\tread.resp <- state[read.key]\n\t\t\tcase write := <-writes:\n\t\t\t\tstate[write.key] = write.val\n\t\t\t\twrite.resp <- true\n\t\t\t}\n\t\t}\n\t}()\n\n\t// Esto inicia 100 goroutines para emitir lecturas hacia la\n\t// goroutine propietaria del estado a través del canal `reads`.\n\t// Cada lectura requiere construir una `readOp`, enviarla\n\t// por el canal `reads` y luego recibir el resultado por\n\t// el canal `resp` proporcionado.\n\tfor range 100 {\n\t\tgo func() {\n\t\t\tfor {\n\t\t\t\tread := readOp{\n\t\t\t\t\tkey:  rand.Intn(5),\n\t\t\t\t\tresp: make(chan int)}\n\t\t\t\treads <- read\n\t\t\t\t<-read.resp\n\t\t\t\tatomic.AddUint64(&readOps, 1)\n\t\t\t\ttime.Sleep(time.Millisecond)\n\t\t\t}\n\t\t}()\n\t}\n\n\t// Iniciamos 10 escrituras también, utilizando un\n\t// enfoque similar.\n\tfor range 10 {\n\t\tgo func() {\n\t\t\tfor {\n\t\t\t\twrite := writeOp{\n\t\t\t\t\tkey:  rand.Intn(5),\n\t\t\t\t\tval:  rand.Intn(100),\n\t\t\t\t\tresp: make(chan bool)}\n\t\t\t\twrites <- write\n\t\t\t\t<-write.resp\n\t\t\t\tatomic.AddUint64(&writeOps, 1)\n\t\t\t\ttime.Sleep(time.Millisecond)\n\t\t\t}\n\t\t}()\n\t}\n\n\t// Dejamos que las goroutines trabajen durante un segundo.\n\ttime.Sleep(time.Second)\n\n\t// Finalmente capturamos e informamos el recuento de operaciones.\n\treadOpsFinal := atomic.LoadUint64(&readOps)\n\tfmt.Println(\"readOps:\", readOpsFinal)\n\twriteOpsFinal := atomic.LoadUint64(&writeOps)\n\tfmt.Println(\"writeOps:\", writeOpsFinal)\n}\n",
    "output": "# Ejecutar nuestro programa demuestra que el ejemplo de gestión de estado\n# basado en goroutines completa aproximadamente 80,000 operaciones en total.\n$ go run stateful-goroutines.go\nreadOps: 71708\nwriteOps: 7177\n\n# Para este caso particular el enfoque basado en goroutines requirió un poco más\n# de código que el basado en mutexes. No obstante, resulta sumamente útil en\n# casos donde intervienen otros canales o cuando gestionar múltiples\n# mutexes resultaría propenso a errores. Debes emplear el enfoque que te resulte\n# más natural y garantice la corrección de tu programa.\n",
    "officialUrl": "https://gobyexample.com/stateful-goroutines"
  },
  {
    "id": 46,
    "slug": "sorting",
    "title": "Sorting",
    "titleEs": "Ordenamiento con Paquetes Slices y Sort",
    "category": "Manipulación de Texto y Formatos",
    "categorySlug": "texto-formatos",
    "categoryIcon": "file-code",
    "difficulty": "Principiante",
    "summary": "Ordenamiento rápido y eficiente de colecciones primitivas utilizando el paquete estándar moderno 'slices' y el clásico 'sort'.",
    "originalExpl": "El paquete de ordenamiento de Go implementa algoritmos de ordenamiento para tipos integrados y definidos por el usuario. Desde Go 1.21, el paquete 'slices' proporciona funciones de ordenamiento genéricas mucho más convenientes y rápidas.",
    "basicExpl": {
      "title": "Conceptos Fundamentales para Principiantes",
      "content": "Ordenar una lista de elementos alfabéticamente o de menor a mayor es una de las tareas más comunes en informática:\n- Para ordenar un slice de cadenas de texto: `slices.Sort(misTextos)`.\n- Para ordenar un slice de números: `slices.Sort(misNumeros)`.\n- Para comprobar si una lista ya está ordenada: `slices.IsSorted(miSlice)`.\nEl ordenamiento en Go se realiza 'in-place': modifica directamente el slice original sin crear una copia nueva.",
      "keyPoints": [
        "Paquete moderno en Go 1.21+: `import \"slices\"` con `slices.Sort()`.",
        "Genérico y automático para cualquier tipo comparable ordenable (números, strings).",
        "Modifica el slice directamente en memoria (in-place)."
      ]
    },
    "interExpl": {
      "title": "Mecanismos Internos y Buenas Prácticas",
      "content": "Diferencia histórica entre `sort` y `slices`:\n- Antes de Go 1.21 se utilizaba el paquete `sort` (`sort.Ints(s)`, `sort.Strings(s)` o implementar `sort.Interface` con 3 métodos: Len, Less, Swap). Esto implicaba conversiones de interfaz y sobrecoste de llamadas dinámicas.\n- En Go moderno (1.21+), `slices.Sort()` es una función genérica `[S ~[]E, E cmp.Ordered](x S)` que opera directamente sobre los tipos concretos sin overhead de interfaz ni asignaciones de memoria adicionales.",
      "keyPoints": [
        "`slices.Sort` sustituye a `sort.Ints` y `sort.Strings` con mayor velocidad.",
        "Búsqueda binaria O(log N): `slices.BinarySearch(s, objetivo)` encuentra índices en slices ya ordenados instantáneamente.",
        "Estabilidad: Si necesitas preservar el orden relativo de elementos idénticos, utiliza `slices.SortStableFunc`."
      ]
    },
    "expertExpl": {
      "title": "Bajo Nivel, Rendimiento e Internals",
      "content": "Algoritmo Pattern-Defeating Quicksort (pdqsort):\nTanto el paquete `slices` como `sort` en Go utilizan internamente 'pdqsort' (creado por Orson Peters):\n- Combina la velocidad media de Quicksort rápido con la garantía en el peor de los casos de Heapsort O(N log N).\n- Para subsecuencias muy pequeñas (≤ 24 elementos), cambia automáticamente a Insertion Sort para aprovechar los registros de hardware y la caché L1.\n- Detecta si los datos ya están casi ordenados (o en orden inverso) y conmuta a un algoritmo O(N) lineal.\nAl no usar interfaces, el compilador puede aplicar inlining a las comparaciones directamente en código máquina.",
      "keyPoints": [
        "Algoritmo pdqsort: rendimiento O(N) en el mejor caso y O(N log N) garantizado en el peor.",
        "Inlining de comparadores: las comparaciones genéricas se traducen a instrucciones simples de CPU (CMP / JLE).",
        "Zero-alloc: el algoritmo no asigna ninguna memoria en el Heap (0 B/op)."
      ]
    },
    "evaluation": {
      "title": "Reto: Búsqueda Binaria y Verificación de Orden",
      "statement": "Declara un slice desordenado de enteros [45, 12, 89, 33, 2, 77]. Comprueba con slices.IsSorted que no está ordenado, ordénalo con slices.Sort, verifica que ahora sí está ordenado y utiliza slices.BinarySearch para encontrar la posición del número 33.",
      "starterCode": "package main\n\nimport (\n    \"fmt\"\n    \"slices\"\n)\n\nfunc main() {\n    datos := []int{45, 12, 89, 33, 2, 77}\n    // Comprueba, ordena, comprueba de nuevo y busca 33\n}",
      "hint": "Usa slices.IsSorted(datos), slices.Sort(datos) y idx, encontrado := slices.BinarySearch(datos, 33).",
      "solution": "package main\n\nimport (\n    \"fmt\"\n    \"slices\"\n)\n\nfunc main() {\n    datos := []int{45, 12, 89, 33, 2, 77}\n    fmt.Printf(\"Original: %v (¿Ordenado?: %t)\\n\", datos, slices.IsSorted(datos))\n    \n    slices.Sort(datos)\n    fmt.Printf(\"Ordenado: %v (¿Ordenado?: %t)\\n\", datos, slices.IsSorted(datos))\n    \n    idx, encontrado := slices.BinarySearch(datos, 33)\n    if encontrado {\n        fmt.Printf(\"El número 33 se encuentra en el índice: %d\\n\", idx)\n    } else {\n        fmt.Println(\"Número no encontrado\")\n    }\n}",
      "explanation": "La función 'slices.Sort' reorganiza in-place los enteros con el algoritmo pdqsort. Una vez ordenado, 'slices.BinarySearch' localiza el valor 33 con complejidad O(log N) devolviendo la posición exacta en el slice."
    },
    "externalLinks": [
      {
        "title": "Paquete slices: Sort and BinarySearch",
        "url": "https://pkg.go.dev/slices#Sort",
        "description": "Documentación oficial del paquete slices en la biblioteca estándar."
      },
      {
        "title": "Blog oficial de Go: Algoritmo de ordenamiento pdqsort introducido en Go 1.19",
        "url": "https://go.dev/doc/go1.19#sort",
        "description": "Detalles técnicos sobre la adopción del algoritmo pdqsort en Go."
      },
      {
        "title": "Go by Example Original: Sorting",
        "url": "https://gobyexample.com/sorting",
        "description": "Ejemplo en Go by Example."
      }
    ],
    "code": "// El paquete `slices` de Go implementa funciones de ordenamiento para tipos\n// primitivos y tipos definidos por el usuario. Primero examinaremos el ordenamiento\n// de tipos integrados en el lenguaje.\n\npackage main\n\nimport (\n\t\"fmt\"\n\t\"slices\"\n)\n\nfunc main() {\n\n\t// Las funciones de ordenamiento son genéricas y funcionan con cualquier\n\t// tipo primitivo _ordenado_. Para consultar la lista de tipos ordenados,\n\t// revisa [cmp.Ordered](https://pkg.go.dev/cmp#Ordered).\n\tstrs := []string{\"c\", \"a\", \"b\"}\n\tslices.Sort(strs)\n\tfmt.Println(\"Strings:\", strs)\n\n\t// Un ejemplo de ordenamiento de enteros `int`.\n\tints := []int{7, 2, 4}\n\tslices.Sort(ints)\n\tfmt.Println(\"Ints:   \", ints)\n\n\t// También podemos usar el paquete `slices` para verificar si\n\t// un slice ya se encuentra ordenado.\n\ts := slices.IsSorted(ints)\n\tfmt.Println(\"Sorted: \", s)\n}\n",
    "output": "$ go run sorting.go\nStrings: [a b c]\nInts:    [2 4 7]\nSorted:  true\n",
    "officialUrl": "https://gobyexample.com/sorting"
  },
  {
    "id": 47,
    "slug": "sorting-by-functions",
    "title": "Sorting by Functions",
    "titleEs": "Ordenamiento Personalizado con Funciones",
    "category": "Manipulación de Texto y Formatos",
    "categorySlug": "texto-formatos",
    "categoryIcon": "file-code",
    "difficulty": "Intermedio",
    "summary": "Ordenamiento de colecciones complejas o structs utilizando comparadores personalizados mediante slices.SortFunc y cmp.Compare.",
    "originalExpl": "A veces queremos ordenar una colección por algo que no sea su orden natural. Por ejemplo, supongamos que queremos ordenar cadenas por su longitud en lugar de alfabéticamente.",
    "basicExpl": {
      "title": "Conceptos Fundamentales para Principiantes",
      "content": "Por defecto, Go sabe cómo ordenar números (1, 2, 3) y palabras alfabéticamente (\"a\", \"b\", \"c\"). Pero, ¿qué pasa si quieres ordenar una lista de palabras por su longitud (de más corta a más larga) o una lista de Usuarios por su edad o salario?\nPara eso se usa `slices.SortFunc`:\n- Le pasas tu lista y una pequeña función comparadora.\n- Tu función comparadora recibe dos elementos (a y b) y le dice a Go quién va primero devolviendo un número negativo, cero o positivo.",
      "keyPoints": [
        "Se usa `slices.SortFunc(slice, funcionComparadora)`.",
        "La función comparadora `cmp(a, b)` devuelve:\n  - Número negativo si `a < b`\n  - Cero si `a == b`\n  - Número positivo si `a > b`.",
        "El paquete estándar `cmp.Compare(a, b)` hace esta comparación automáticamente para cualquier tipo ordenable."
      ]
    },
    "interExpl": {
      "title": "Mecanismos Internos y Buenas Prácticas",
      "content": "Uso de `cmp.Compare` y ordenamiento multicriterio:\nLa forma más limpia y moderna en Go 1.21+ es combinar `slices.SortFunc` con `cmp.Compare`:\n```go\nslices.SortFunc(personas, func(a, b Persona) int {\n    // Criterio 1: Ordenar por Edad ascendente\n    if n := cmp.Compare(a.Edad, b.Edad); n != 0 {\n        return n\n    }\n    // Criterio 2: En caso de empate en edad, ordenar por Nombre alfabético\n    return cmp.Compare(a.Nombre, b.Nombre)\n})\n```\nEsto evita escribir operadores `<`, `>` manuales propensos a errores de signo y maneja empates de forma sumamente legible.",
      "keyPoints": [
        "Uso de `cmp.Compare(a, b)`: estándar idiomático para funciones comparadoras en Go moderno.",
        "Orden inverso: simplemente intercambia los argumentos: `cmp.Compare(b.Precio, a.Precio)` para orden descendente.",
        "Estabilidad de orden: usar `slices.SortStableFunc` si es obligatorio que elementos con valores iguales conserven su orden relativo original."
      ]
    },
    "expertExpl": {
      "title": "Bajo Nivel, Rendimiento e Internals",
      "content": "Paso de structs pesados en la función comparadora:\nLa firma estándar de `slices.SortFunc[E any]` evalúa `cmp func(a, b E) int`. Si `E` es un struct grande (ejemplo: 256 bytes), pasar `(a, b E)` por valor copia 512 bytes en cada una de las O(N log N) comparaciones que realiza el algoritmo de ordenamiento, degradando significativamente el tiempo de CPU y la tasa de aciertos de la caché L1.\n\nOptimización experta: Si vas a ordenar una colección grande de structs pesados, utiliza un slice de punteros (`[]*MiStructGrande`) o define el slice de forma que el comparador reciba punteros, reduciendo el coste de cada llamada de comparación a dos simples registros de puntero de 8 bytes.",
      "keyPoints": [
        "Evitar copias en structs grandes: ordenar `[]*T` en lugar de `[]T` para estructuras pesadas.",
        "Inlining de comparadores anónimos: el compilador de Go intenta aplicar inlining a la función closure si no escapa.",
        "Comparadores estrictos: la función comparadora debe respetar una relación de orden estricto (antirreflexiva, asimétrica y transitiva) para evitar comportamientos indefinidos en pdqsort."
      ]
    },
    "evaluation": {
      "title": "Reto: Ordenar Catálogo de Productos por Precio Descendente y Nombre",
      "statement": "Define una estructura 'Producto' con 'Nombre' (string) y 'Precio' (float64). Crea una lista de 4 productos y ordénalos con slices.SortFunc de forma que los más caros aparezcan primero (precio descendente). Si dos productos tienen exactamente el mismo precio, deben ordenarse alfabéticamente por nombre.",
      "starterCode": "package main\n\nimport (\n    \"cmp\"\n    \"fmt\"\n    \"slices\"\n)\n\ntype Producto struct {\n    Nombre string\n    Precio float64\n}\n\nfunc main() {\n    catalogo := []Producto{\n        {\"Teclado Mecánico\", 89.99},\n        {\"Ratón Gamer\", 49.99},\n        {\"Monitor 27''\", 249.99},\n        {\"Auriculares Pro\", 89.99},\n    }\n    // Ordena con slices.SortFunc e imprime\n}",
      "hint": "Para precio descendente haz cmp.Compare(b.Precio, a.Precio). Si da 0, haz cmp.Compare(a.Nombre, b.Nombre).",
      "solution": "package main\n\nimport (\n    \"cmp\"\n    \"fmt\"\n    \"slices\"\n)\n\ntype Producto struct {\n    Nombre string\n    Precio float64\n}\n\nfunc main() {\n    catalogo := []Producto{\n        {\"Teclado Mecánico\", 89.99},\n        {\"Ratón Gamer\", 49.99},\n        {\"Monitor 27''\", 249.99},\n        {\"Auriculares Pro\", 89.99},\n    }\n    \n    slices.SortFunc(catalogo, func(a, b Producto) int {\n        // Criterio 1: Precio descendente (mayor precio primero)\n        if n := cmp.Compare(b.Precio, a.Precio); n != 0 {\n            return n\n        }\n        // Criterio 2: Desempate por Nombre ascendente (A-Z)\n        return cmp.Compare(a.Nombre, b.Nombre)\n    })\n    \n    fmt.Println(\"Catálogo ordenado:\")\n    for _, p := range catalogo {\n        fmt.Printf(\"- %-20s : $%.2f\\n\", p.Nombre, p.Precio)\n    }\n}",
      "explanation": "El comparador invierte los argumentos en cmp.Compare(b.Precio, a.Precio) para lograr orden descendente de precios. Cuando dos artículos empatan a $89.99 (Teclado y Auriculares), el segundo comparador por nombre los desempata alfabéticamente ('Auriculares Pro' antes de 'Teclado Mecánico')."
    },
    "externalLinks": [
      {
        "title": "Paquete slices: SortFunc",
        "url": "https://pkg.go.dev/slices#SortFunc",
        "description": "Documentación oficial de la función genérica slices.SortFunc."
      },
      {
        "title": "Paquete cmp: Compare function",
        "url": "https://pkg.go.dev/cmp#Compare",
        "description": "Documentación oficial del paquete cmp de ordenamiento."
      },
      {
        "title": "Go by Example Original: Sorting by Functions",
        "url": "https://gobyexample.com/sorting-by-functions",
        "description": "Ejemplo interactivo en Go by Example."
      }
    ],
    "code": "// En ocasiones necesitaremos ordenar una colección según un criterio\n// diferente a su orden natural. Por ejemplo, supongamos que\n// deseamos ordenar cadenas por su longitud en lugar de hacerlo\n// alfabéticamente. Aquí tenemos un ejemplo de ordenamiento personalizado\n// en Go.\n\npackage main\n\nimport (\n\t\"cmp\"\n\t\"fmt\"\n\t\"slices\"\n)\n\nfunc main() {\n\tfruits := []string{\"peach\", \"banana\", \"kiwi\"}\n\n\t// Implementamos una función de comparación para la longitud\n\t// de las cadenas. `cmp.Compare` resulta muy conveniente para esto.\n\tlenCmp := func(a, b string) int {\n\t\treturn cmp.Compare(len(a), len(b))\n\t}\n\n\t// Ahora podemos invocar `slices.SortFunc` con esta función de\n\t// comparación personalizada para ordenar `fruits` según la longitud del nombre.\n\tslices.SortFunc(fruits, lenCmp)\n\tfmt.Println(fruits)\n\n\t// Podemos utilizar la misma técnica para ordenar un slice de\n\t// valores que no sean tipos primitivos.\n\ttype Person struct {\n\t\tname string\n\t\tage  int\n\t}\n\n\tpeople := []Person{\n\t\tPerson{name: \"Jax\", age: 37},\n\t\tPerson{name: \"TJ\", age: 25},\n\t\tPerson{name: \"Alex\", age: 72},\n\t}\n\n\t// Ordenamos `people` por edad utilizando `slices.SortFunc`.\n\t//\n\t// Nota: si el struct `Person` es grande,\n\t// es recomendable que el slice contenga `*Person` en su lugar\n\t// y ajustar la función de comparación adecuadamente. ¡Ante la\n\t// duda, realiza un [benchmark](testing-and-benchmarking)!\n\tslices.SortFunc(people,\n\t\tfunc(a, b Person) int {\n\t\t\treturn cmp.Compare(a.age, b.age)\n\t\t})\n\tfmt.Println(people)\n}\n",
    "output": "$ go run sorting-by-functions.go \n[kiwi peach banana]\n[{TJ 25} {Jax 37} {Alex 72}]\n",
    "officialUrl": "https://gobyexample.com/sorting-by-functions"
  },
  {
    "id": 48,
    "slug": "panic",
    "title": "Panic",
    "titleEs": "Pánico (Panic) y Errores Fatales",
    "category": "Manejo de Errores y Excepciones",
    "categorySlug": "errores-panico",
    "categoryIcon": "shield",
    "difficulty": "Intermedio",
    "summary": "Mecanismo nativo de parada de emergencia cuando un programa entra en un estado imposible del que no puede recuperarse.",
    "originalExpl": "Un panic típicamente significa que algo salió inesperadamente mal. Mayormente lo usamos para fallar rápidamente en errores que no deberían ocurrir durante la operación normal, o que no estamos preparados para manejar con gracia.",
    "basicExpl": {
      "title": "Conceptos Fundamentales para Principiantes",
      "content": "En Go los errores normales (como no encontrar un archivo o una contraseña incorrecta) se manejan con `return err` de forma tranquila.\nUn `panic` es el botón rojo de emergencia de un reactor nuclear: se usa solo cuando ocurre una catástrofe que hace imposible continuar (por ejemplo, si la base de datos central no existe o la memoria está corrupta):\n- Se dispara con `panic(\"mensaje de catástrofe\")`.\n- Detiene inmediatamente la ejecución normal de la función.\n- Ejecuta cualquier función `defer` que hubieras programado antes.\n- Imprime la traza completa de llamadas (stack trace) y finaliza el programa con código de error.",
      "keyPoints": [
        "Se usa exclusivamente para errores verdaderamente excepcionales e irrecuperables.",
        "No uses panic para el flujo normal de control o validaciones de usuario.",
        "Las funciones diferidas con `defer` SIEMPRE se ejecutan aunque ocurra un pánico."
      ]
    },
    "interExpl": {
      "title": "Mecanismos Internos y Buenas Prácticas",
      "content": "Pánicos provocados por el propio runtime de Go:\nAdemás de invocar `panic()` manualmente, el propio runtime de Go genera pánicos en situaciones críticas como:\n1. Desreferenciar un puntero nulo (`nil pointer dereference`).\n2. Acceder a un índice fuera de los límites de un slice o array (`index out of range`).\n3. Enviar datos a un canal que ya fue cerrado (`send on closed channel`).\n\nConvención en paquetes y bibliotecas: Una biblioteca de Go NUNCA debe permitir que un pánico escape hacia el código del usuario. Si internamente usa un pánico por conveniencia para salir de una recursión profunda, debe capturarlo en el límite del paquete público usando `recover()` y devolver un `error` estándar.",
      "keyPoints": [
        "Regla de diseño de bibliotecas: nunca dejes escapar un panic hacia los consumidores de tu API.",
        "Ejecución de defers: el proceso de pánico 'desenrolla la pila' (stack unwinding) ejecutando ordenadamente todos los defers pendientes.",
        "Pánicos fatales irrecuperables: errores de concurrencia como `concurrent map writes` o desbordamiento físico de memoria del sistema son crasheos directos que ni siquiera un recover puede salvar."
      ]
    },
    "expertExpl": {
      "title": "Bajo Nivel, Rendimiento e Internals",
      "content": "Mecánica interna de `runtime.gopanic` (runtime/panic.go):\nCuando ocurre un pánico, el runtime de Go crea una estructura `_panic` y la enlaza a la goroutine actual (`gp._panic`). Luego inicia el proceso de 'Stack Unwinding':\n1. Recorre la lista de estructuras `_defer` asociadas a cada marco de llamada de la goroutine de abajo hacia arriba.\n2. Ejecuta cada función diferida.\n3. Si una función defer invoca a `recover()`, la estructura `_panic` se marca como recuperada (`recovered = true`) y el flujo normal se reanuda en el punto posterior a la llamada.\n4. Si la pila llega a su base sin ser recuperada, el runtime imprime el traceback completo de todas las goroutines activas en stderr y aborta el proceso con la señal de salida del sistema operativo.",
      "keyPoints": [
        "Estructura _panic en la goroutine: lista enlazada que permite pánicos anidados.",
        "Stack Unwinding determinista: garantía estricta de limpieza de recursos asociados a defer.",
        "Variable de entorno `GOTRACEBACK`: controla el nivel de detalle del crash dump (none, single, all, system, crash)."
      ]
    },
    "evaluation": {
      "title": "Reto: Inicialización Crítica de Configuración con Falso Positivo",
      "statement": "Escribe una función 'CargarConfiguracion(puerto int)' que verifique si el puerto está en el rango válido (1 a 65535). Si el puerto es 0 o negativo, debe lanzar un panic con un mensaje descriptivo. Llama a la función con un puerto válido y luego con un puerto inválido.",
      "starterCode": "package main\n\nimport \"fmt\"\n\nfunc CargarConfiguracion(puerto int) {\n    // Lanza panic si puerto <= 0 o > 65535\n    fmt.Printf(\"Configuración cargada en puerto %d\\n\", puerto)\n}\n\nfunc main() {\n    CargarConfiguracion(8080)\n    // Descomenta la siguiente línea para observar el pánico\n    // CargarConfiguracion(-1)\n}",
      "hint": "Usa if puerto <= 0 || puerto > 65535 { panic(\"...\") }.",
      "solution": "package main\n\nimport \"fmt\"\n\nfunc CargarConfiguracion(puerto int) {\n    if puerto <= 0 || puerto > 65535 {\n        panic(fmt.Sprintf(\"puerto de red inválido: %d (debe estar entre 1 y 65535)\", puerto))\n    }\n    fmt.Printf(\"Servidor configurado correctamente en puerto: %d\\n\", puerto)\n}\n\nfunc main() {\n    fmt.Println(\"--- Caso 1: Puerto válido ---\")\n    CargarConfiguracion(8080)\n    \n    fmt.Println(\"\\n--- Caso 2: Puerto inválido (provocará pánico deliberado) ---\")\n    // En situaciones reales este panic detendría el proceso inmediatamente\n    defer func() {\n        if r := recover(); r != nil {\n            fmt.Println(\"[Pánico interceptado con éxito]:\", r)\n        }\n    }()\n    CargarConfiguracion(-1)\n}",
      "explanation": "El uso de 'panic' es apropiado al inicializar la aplicación en la función de arranque (bootstrapping): si la configuración básica es errónea, no tiene sentido continuar ejecutando el servidor en un estado corrupto."
    },
    "externalLinks": [
      {
        "title": "Blog oficial de Go: Mecanismos de defer, panic y recover en Go",
        "url": "https://go.dev/blog/defer-panic-and-recover",
        "description": "El artículo fundamental de Go sobre el ciclo de vida de pánicos y recuperaciones."
      },
      {
        "title": "Guía canónica Effective Go: Manejo de excepciones y uso justificado de panic",
        "url": "https://go.dev/doc/effective_go#panic",
        "description": "Guía idiomática sobre cuándo está justificado utilizar panic."
      },
      {
        "title": "Especificación de Go: Gestión y recuperación de panics",
        "url": "https://go.dev/ref/spec#Handling_panics",
        "description": "Especificación formal del comportamiento de la función panic."
      },
      {
        "title": "Go by Example Original: Panic",
        "url": "https://gobyexample.com/panic",
        "description": "Página oficial del ejemplo en Go by Example.",
        "type": "Referencia Original"
      }
    ],
    "code": "// Un `panic` suele significar que algo salió inesperadamente\n// mal. Principalmente lo usamos para fallar rápidamente (fail-fast) ante errores\n// que no deberían ocurrir durante la operación normal, o que no\n// estamos preparados para manejar de forma elegante.\n\npackage main\n\nimport (\n\t\"os\"\n\t\"path/filepath\"\n)\n\nfunc main() {\n\n\t// Usaremos panic a lo largo de este sitio para comprobar\n\t// errores inesperados. Este es el único programa del\n\t// sitio diseñado para disparar un panic intencionadamente.\n\tpanic(\"a problem\")\n\n\t// Un uso común de panic es abortar si una función\n\t// devuelve un valor de error que no sabemos (o no deseamos)\n\t// manejar. Aquí tenemos un ejemplo de\n\t// disparar `panic` si ocurre un error inesperado al crear un archivo nuevo.\n\tpath := filepath.Join(os.TempDir(), \"file\")\n\t_, err := os.Create(path)\n\tif err != nil {\n\t\tpanic(err)\n\t}\n}\n",
    "output": "# Ejecutar este programa provocará un panic, imprimirá\n# un mensaje de error con las trazas de goroutines y finalizará\n# con un estado distinto de cero.\n\n# Cuando se dispara el primer panic en `main`, el programa termina\n# sin alcanzar el resto del código. Si deseas ver al programa\n# intentar crear el archivo temporal, comenta la primera línea de panic.\n$ go run panic.go\npanic: a problem\n\ngoroutine 1 [running]:\nmain.main()\n\t/.../panic.go:12 +0x47\n...\nexit status 2\n\n# Ten en cuenta que, a diferencia de otros lenguajes que emplean excepciones\n# para el manejo común de errores, en Go es idiomático\n# utilizar valores de retorno explícitos siempre que sea posible.\n",
    "officialUrl": "https://gobyexample.com/panic"
  },
  {
    "id": 49,
    "slug": "defer",
    "title": "Defer",
    "titleEs": "Ejecución Diferida (Defer)",
    "category": "Manejo de Errores y Excepciones",
    "categorySlug": "errores-panico",
    "categoryIcon": "shield",
    "difficulty": "Principiante",
    "summary": "Pospone la ejecución de una función hasta que la función que la contiene termine, ideal para limpieza de recursos.",
    "originalExpl": "Defer se utiliza para asegurar que una llamada a función se realice más tarde en la ejecución del programa, usualmente para propósitos de limpieza. defer se usa a menudo donde otros lenguajes usan finally.",
    "basicExpl": {
      "title": "Conceptos Fundamentales para Principiantes",
      "content": "Imagina que abres la puerta de tu casa al entrar. Lo normal es pensar inmediatamente: 'Cuando me vaya, tengo que cerrar la puerta'.\nLa palabra `defer` te permite programar una acción para que se ejecute justo al momento de salir de la función actual:\n- Abres un archivo: `archivo, err := os.Open(\"datos.txt\")`.\n- Inmediatamente en la siguiente línea programas el cierre: `defer archivo.Close()`.\n- No importa si tu función tiene 20 salidas con `return` diferentes o si ocurre un error a mitad de camino: Go garantiza al 100% que el archivo se cerrará automáticamente al salir.",
      "keyPoints": [
        "Pospone la llamada hasta el momento exacto en que la función circundante retorna.",
        "Se ejecuta SIEMPRE: tanto si la función termina con normalidad como si sufre un pánico.",
        "Múltiples llamadas a `defer` se ejecutan en orden LIFO (Last-In, First-Out: la última que programas es la primera en ejecutarse)."
      ]
    },
    "interExpl": {
      "title": "Mecanismos Internos y Buenas Prácticas",
      "content": "Evaluación inmediata de argumentos en defer:\nUn error conceptual muy frecuente en principiantes es creer que los argumentos de la función diferida se calculan al final. En Go, los argumentos de una función llamada con `defer` se evalúan INMEDIATAMENTE en la línea donde se escribe el defer, pero el cuerpo de la función se ejecuta al salir:\n```go\nx := 10\ndefer fmt.Println(\"Valor en defer:\", x) // Se evalúa x=10 en este instante\nx = 20\n// Al salir, imprimirá 10, no 20.\n```\nSi quieres capturar el valor final de `x`, debes envolverlo en una función anónima: `defer func() { fmt.Println(x) }()`.",
      "keyPoints": [
        "Evaluación inmediata de parámetros: los argumentos pasados a la función deferida se capturan en el momento de la declaración.",
        "Modificación de retornos nombrados: una clausura diferida puede leer y modificar los valores de retorno nombrados de una función antes de que lleguen al llamador.",
        "Trampa de defer en bucles largos: `defer` no se ejecuta al final de cada iteración del bucle, sino al final de la FUNCIÓN completa; usar defer en bucles de millones de archivos puede agotar los descriptores del sistema."
      ]
    },
    "expertExpl": {
      "title": "Bajo Nivel, Rendimiento e Internals",
      "content": "Evolución histórica y 'Open-Coded Defers' (Go 1.14+):\nHistóricamente, cada llamada a `defer` requería asignar una estructura `_defer` en el heap y registrarla en una lista enlazada, lo que suponía un coste de ~35-50 nanosegundos por llamada.\nEn Go 1.14 se implementaron los 'Open-Coded Defers': si la función tiene un número fijo y predecible de defers (no dinámicos en bucles), el compilador elimina por completo las asignaciones de memoria y compila el defer directamente como instrucciones de salto en línea antes de cada instrucción `RET` de ensamblador, reduciendo el sobrecoste a casi CERO nanosegundos (prácticamente idéntico a llamar a la función de limpieza manualmente).",
      "keyPoints": [
        "Open-Coded Defers: optimización del compilador que reduce el coste de defer a ~1-2 nanosegundos.",
        "Pila LIFO: implementado como una estructura de pila invertida en el stack marco de la función.",
        "Desempaque en pánico: el runtime mantiene metadatos en tablas de símbolos para desenrollar defers incluso si el optimizador aplicó inlining."
      ]
    },
    "evaluation": {
      "title": "Reto: Medidor de Tiempo de Ejecución con Defer",
      "statement": "Escribe una función 'MedirTiempo(nombre string) func()' que registre la hora de inicio y devuelva una función anónima que calcule y muestre la duración transcurrida. Utiliza el modismo de una sola línea 'defer MedirTiempo(\"Operación\")()' para medir el tiempo de una tarea simulada.",
      "starterCode": "package main\n\nimport (\n    \"fmt\"\n    \"time\"\n)\n\n// Implementa MedirTiempo\n\nfunc tareaPesada() {\n    // Usa defer MedirTiempo(...)()\n    time.Sleep(120 * time.Millisecond)\n}\n\nfunc main() {\n    tareaPesada()\n}",
      "hint": "MedirTiempo debe registrar inicio := time.Now() y retornar func() { fmt.Println(..., time.Since(inicio)) }.",
      "solution": "package main\n\nimport (\n    \"fmt\"\n    \"time\"\n)\n\nfunc MedirTiempo(nombre string) func() {\n    inicio := time.Now()\n    fmt.Printf(\"[INICIO] %s a las %s\\n\", nombre, inicio.Format(\"15:04:05.000\"))\n    return func() {\n        duracion := time.Since(inicio)\n        fmt.Printf(\"[FIN] %s tardó exactamente: %v\\n\", nombre, duracion)\n    }\n}\n\nfunc procesarLote() {\n    defer MedirTiempo(\"Procesamiento de Lote\")()\n    \n    // Simula trabajo intensivo\n    time.Sleep(120 * time.Millisecond)\n}\n\nfunc main() {\n    procesarLote()\n}",
      "explanation": "El patrón `defer MedirTiempo()()` es un modismo extremadamente elegante en Go: la función externa se ejecuta de inmediato (capturando la hora de inicio), y la función retornada queda programada con defer para ejecutarse al final de la función, calculando la diferencia con time.Since() automáticamente."
    },
    "externalLinks": [
      {
        "title": "Blog oficial de Go: Mecanismos de defer, panic y recover en Go",
        "url": "https://go.dev/blog/defer-panic-and-recover",
        "description": "Artículo oficial de Go sobre las reglas y uso idiomático de defer."
      },
      {
        "title": "Go by Example Original: Defer",
        "url": "https://gobyexample.com/defer",
        "description": "Ejemplo en Go by Example."
      },
      {
        "title": "Eli Bendersky: Cómo funciona internamente defer en Go",
        "url": "https://eli.thegreenplace.net/2023/how-defer-works-in-go/",
        "description": "Análisis exhaustivo del código ensamblador y evolución de open-coded defers en Go."
      }
    ],
    "code": "// _Defer_ se utiliza para asegurar que una llamada a función se\n// ejecute más adelante en la ejecución del programa, generalmente con\n// fines de limpieza y liberación de recursos. `defer` se utiliza frecuentemente\n// donde en otros lenguajes se emplearían `ensure` o `finally`.\n\npackage main\n\nimport (\n\t\"fmt\"\n\t\"os\"\n\t\"path/filepath\"\n)\n\n// Supongamos que deseamos crear un archivo, escribir en él\n// y luego cerrarlo cuando hayamos concluido. Así es como\n// podríamos lograrlo con `defer`.\nfunc main() {\n\n\t// Inmediatamente después de obtener un objeto de archivo con\n\t// `createFile`, posponemos el cierre de dicho archivo\n\t// mediante `closeFile`. Esto se ejecutará al término\n\t// de la función contenedora (`main`), una vez que\n\t// `writeFile` haya concluido.\n\tpath := filepath.Join(os.TempDir(), \"defer.txt\")\n\tf := createFile(path)\n\tdefer closeFile(f)\n\twriteFile(f)\n}\n\nfunc createFile(p string) *os.File {\n\tfmt.Println(\"creating\")\n\tf, err := os.Create(p)\n\tif err != nil {\n\t\tpanic(err)\n\t}\n\treturn f\n}\n\nfunc writeFile(f *os.File) {\n\tfmt.Println(\"writing\")\n\tfmt.Fprintln(f, \"data\")\n}\n\nfunc closeFile(f *os.File) {\n\tfmt.Println(\"closing\")\n\terr := f.Close()\n\t// Es fundamental verificar si ocurrieron errores al cerrar un\n\t// archivo, incluso dentro de una función pospuesta con defer.\n\tif err != nil {\n\t\tpanic(err)\n\t}\n}\n",
    "output": "# Ejecutar el programa confirma que el archivo se cierra\n# debidamente tras escribir en él.\n$ go run defer.go\ncreating\nwriting\nclosing\n",
    "officialUrl": "https://gobyexample.com/defer"
  },
  {
    "id": 50,
    "slug": "recover",
    "title": "Recover",
    "titleEs": "Recuperación de Pánico con Recover",
    "category": "Manejo de Errores y Excepciones",
    "categorySlug": "errores-panico",
    "categoryIcon": "shield",
    "difficulty": "Intermedio",
    "summary": "Captura y control de pánicos dentro de funciones diferidas para restaurar el flujo normal y prevenir el colapso del proceso.",
    "originalExpl": "Go hace posible recuperarse de un pánico usando la función integrada recover(). Un recover solo es útil dentro de funciones diferidas (defer). Durante una ejecución normal, recover devuelve nil.",
    "basicExpl": {
      "title": "Conceptos Fundamentales para Principiantes",
      "content": "Si un `panic` es como un accidente de tráfico, `recover()` es la bolsa de aire (airbag) que salva la vida de tu programa:\n- Solo funciona DENTRO de una función programada con `defer`.\n- Si todo va bien, `recover()` devuelve `nil` y no hace nada.\n- Si ocurre un pánico, `recover()` lo atrapa, detiene la caída en picado del programa y te devuelve el mensaje del pánico para que puedas registrarlo en los logs y seguir funcionando.\nAnalogía: Es el equivalente al bloque `catch` de Java o `except` de Python.",
      "keyPoints": [
        "Debe invocarse obligatoriamente dentro de una función con `defer`.",
        "Devuelve el valor que se pasó al `panic` (o `nil` si no hubo pánico).",
        "Evita que un fallo imprevisto en una petición de un usuario tire abajo el servidor web completo."
      ]
    },
    "interExpl": {
      "title": "Mecanismos Internos y Buenas Prácticas",
      "content": "Middleware de Recuperación en Servidores HTTP:\nEl uso canónico y más importante de `recover` en la industria es en servidores web (como `net/http` o Gin). Un middleware envuelve cada petición entrante con un defer recover. Si un endpoint específico sufre un pánico (por ejemplo, desreferenciar un puntero nil), el servidor intercepta el fallo, responde al cliente con un error HTTP 500 Internal Server Error y el servidor continúa vivo atendiendo a los demás clientes con normalidad:\n```go\ndefer func() {\n    if r := recover(); r != nil {\n        log.Printf(\"Pánico recuperado: %v\\nStack: %s\", r, debug.Stack())\n        http.Error(w, \"Error interno\", 500)\n    }\n}()\n```",
      "keyPoints": [
        "Aislamiento por goroutine: `recover` SOLO captura pánicos de la goroutine actual; no puede interceptar pánicos ocurridos en otras goroutines.",
        "Extracción de trazas con `debug.Stack()`: permite registrar el stack trace completo en el log antes de continuar.",
        "Transformación a error: patrón para convertir un pánico interno en un `error` limpio retornado al llamador."
      ]
    },
    "expertExpl": {
      "title": "Bajo Nivel, Rendimiento e Internals",
      "content": "Aislamiento de Pánicos entre Goroutines y Límites del Runtime:\nUn error crítico de arquitectura concurrente en Go es olvidar que cada goroutine tiene su propio árbol de llamadas aislado. Si lanzas una goroutine secundaria con `go func()` y esa goroutine entra en pánico, el `recover()` que tenías en la goroutine principal de main o en el servidor HTTP NO podrá capturarla, provocando el crasheo fulminante de todo el binario.\nRegla de producción: Toda goroutine independiente de larga duración lanzada en segundo plano debe tener su propio `defer func() { recover() }()` interno en su primera línea de código.",
      "keyPoints": [
        "Límite de Goroutine: el desenrollado de pila de un pánico se detiene en la base de la goroutine actual.",
        "Fatal Panics: pánicos lanzados por el runtime por corrupción de memoria interna (`runtime.throw`) no pueden ser interceptados por recover.",
        "Re-panicking: si tras inspeccionar el valor capturado en recover determinas que el error es catastrófico, puedes relanzarlo con `panic(r)`."
      ]
    },
    "evaluation": {
      "title": "Reto: Ejecutor Seguro de Tareas con Conversión a Error",
      "statement": "Escribe una función 'EjecutarSeguro(tarea func()) (err error)' que reciba una función propensa a fallar. Debe capturar cualquier pánico ocurrido mediante defer y recover() y transformarlo en un error estándar con fmt.Errorf. Si la tarea no falla, devuelve nil.",
      "starterCode": "package main\n\nimport (\n    \"fmt\"\n)\n\nfunc EjecutarSeguro(tarea func()) (err error) {\n    // Implementa defer con recover y asigna a err si hubo pánico\n}\n\nfunc main() {\n    // Prueba con una tarea normal y con una que haga pánico\n}",
      "hint": "Usa retornos nombrados '(err error)' para que la función anónima en defer pueda asignar 'err = fmt.Errorf(...)'.",
      "solution": "package main\n\nimport (\n    \"fmt\"\n)\n\nfunc EjecutarSeguro(tarea func()) (err error) {\n    defer func() {\n        if r := recover(); r != nil {\n            // r contiene el valor emitido por el panic\n            err = fmt.Errorf(\"pánico interceptado: %v\", r)\n        }\n    }()\n    \n    tarea() // Ejecuta la función del usuario\n    return nil\n}\n\nfunc main() {\n    fmt.Println(\"--- Tarea 1: Tarea segura ---\")\n    err1 := EjecutarSeguro(func() {\n        fmt.Println(\"Calculando división: 10 / 2 =\", 10/2)\n    })\n    fmt.Println(\"Resultado error:\", err1)\n    \n    fmt.Println(\"\\n--- Tarea 2: Tarea con pánico por división entre cero ---\")\n    err2 := EjecutarSeguro(func() {\n        cero := 0\n        _ = 10 / cero // Provoca pánico en runtime\n    })\n    fmt.Println(\"Resultado error interceptado:\", err2)\n    fmt.Println(\"El programa principal continúa funcionando perfectamente.\")\n}",
      "explanation": "Al usar un retorno con nombre `(err error)`, la clausura diferida puede interceptar el pánico mediante `recover()` y reasignar el valor de `err` antes de que la función retorne al llamador, transformando un fallo fatal en un error convencional manejable."
    },
    "externalLinks": [
      {
        "title": "Blog oficial de Go: Mecanismos de defer, panic y recover en Go",
        "url": "https://go.dev/blog/defer-panic-and-recover",
        "description": "Guía canónica de los creadores de Go sobre el funcionamiento de recover."
      },
      {
        "title": "Paquete runtime/debug: Stack function",
        "url": "https://pkg.go.dev/runtime/debug#Stack",
        "description": "Documentación oficial para extraer el stack trace durante una recuperación."
      },
      {
        "title": "Go by Example Original: Recover",
        "url": "https://gobyexample.com/recover",
        "description": "Ejemplo interactivo en Go by Example."
      }
    ],
    "code": "// Go permite _recuperarse_ (recover) de un panic utilizando\n// la función incorporada `recover`. Un `recover` puede\n// evitar que un `panic` aborte el programa y permitirle\n// continuar con su ejecución normal.\n\n// Un ejemplo donde esto resulta de gran utilidad: un servidor\n// no debería caerse si una de las conexiones de clientes\n// experimenta un error crítico. En su lugar, el servidor\n// debe cerrar esa conexión particular y seguir atendiendo a los\n// demás clientes. De hecho, esto es exactamente lo que el paquete `net/http`\n// de Go hace por defecto en sus servidores HTTP.\n\npackage main\n\nimport \"fmt\"\n\n// Esta función dispara un panic.\nfunc mayPanic() {\n\tpanic(\"a problem\")\n}\n\nfunc main() {\n\t// `recover` debe ser invocado dentro de una función pospuesta con `defer`.\n\t// Cuando la función contenedora entra en panic, el defer se\n\t// activará y la llamada a `recover` en su interior capturará\n\t// el panic.\n\tdefer func() {\n\t\tif r := recover(); r != nil {\n\t\t\t// El valor de retorno de `recover` es el error emitido en\n\t\t\t// la llamada a `panic`.\n\t\t\tfmt.Println(\"Recovered. Error:\\n\", r)\n\t\t}\n\t}()\n\n\tmayPanic()\n\n\t// Este código no llegará a ejecutarse, dado que `mayPanic` dispara un panic.\n\t// La ejecución de `main` se detiene en el punto del\n\t// panic y se reanuda en la clausura pospuesta con defer.\n\tfmt.Println(\"After mayPanic()\")\n}\n",
    "output": "$ go run recover.go\nRecovered. Error:\n a problem\n",
    "officialUrl": "https://gobyexample.com/recover"
  },
  {
    "id": 51,
    "slug": "string-functions",
    "title": "String Functions",
    "titleEs": "Funciones del Paquete Strings",
    "category": "Manipulación de Texto y Formatos",
    "categorySlug": "texto-formatos",
    "categoryIcon": "file-code",
    "difficulty": "Principiante",
    "summary": "Herramientas estándar para búsqueda, manipulación, división y transformación de cadenas de texto con 'strings'.",
    "originalExpl": "La biblioteca estándar del paquete 'strings' proporciona muchas funciones útiles para trabajar con cadenas de texto. Aquí hay algunos ejemplos para darte una idea del paquete.",
    "basicExpl": {
      "title": "Conceptos Fundamentales para Principiantes",
      "content": "Trabajar con texto es algo diario. El paquete oficial `strings` tiene decenas de funciones listas para usar:\n- `strings.Contains(\"golang\", \"go\")` -> comprueba si contiene un texto (true).\n- `strings.Count(\"manzana\", \"a\")` -> cuenta cuántas veces aparece una letra (3).\n- `strings.HasPrefix(\"servidor.go\", \"servidor\")` -> comprueba si empieza con un prefijo.\n- `strings.Join([]string{\"a\", \"b\"}, \"-\")` -> une palabras con un separador (\"a-b\").\n- `strings.Split(\"uno,dos,tres\", \",\")` -> parte una cadena en una lista de palabras.\n- `strings.ToUpper` / `strings.ToLower` -> convierte a mayúsculas o minúsculas.",
      "keyPoints": [
        "Se importa con `import \"strings\"`.",
        "En Go los métodos de cadenas son funciones del paquete (`strings.ToUpper(s)`), no métodos de objeto (`s.toUpper()`).",
        "Las cadenas originales nunca se modifican (son inmutables); las funciones devuelven nuevas cadenas."
      ]
    },
    "interExpl": {
      "title": "Mecanismos Internos y Buenas Prácticas",
      "content": "Construcción eficiente de texto con `strings.Builder`:\nUn error clásico de principiante es concatenar cadenas repetidamente dentro de un bucle usando el operador `+`:\n```go\nvar s string\nfor i := 0; i < 1000; i++ {\n    s += \"texto\"\n}\n```\nComo los strings son inmutables, el operador `+` crea un nuevo string en el heap y copia todos los bytes acumulados en CADA iteración (complejidad O(N^2) con miles de asignaciones de memoria).\nLa solución idiomática de alto rendimiento es usar `strings.Builder`:\n```go\nvar b strings.Builder\nb.Grow(5000) // Preasigna memoria para cero allocations\nfor i := 0; i < 1000; i++ {\n    b.WriteString(\"texto\")\n}\nresultado := b.String()\n```",
      "keyPoints": [
        "strings.Builder: optimización esencial para construir cadenas dinámicas en tiempo lineal O(N).",
        "strings.Clone (Go 1.18+): desacopla sub-strings para evitar fugas de memoria por retención de arrays grandes.",
        "Comparación insensible a mayúsculas: usar `strings.EqualFold(s1, s2)` en lugar de convertir ambos con `ToLower()`."
      ]
    },
    "expertExpl": {
      "title": "Bajo Nivel, Rendimiento e Internals",
      "content": "Optimizaciones de strings.Builder y Zero-Copy String Conversion:\nInternamente, `strings.Builder` almacena los datos en un slice de bytes (`[]byte`). Cuando llamas a `b.String()`, en lugar de hacer una copia completa de memoria en el heap, utiliza un truco con `unsafe.Pointer` que transforma directamente el puntero del slice de bytes en un encabezado de string de solo lectura sin realizar NINGUNA asignación de memoria adicional (0 allocations).\n\nAdemás, `strings.Index` y `strings.Contains` utilizan algoritmos acelerados por hardware en código ensamblador (usando instrucciones SIMD AVX2/SSE4 en x86 y NEON en ARM) para escanear memoria a velocidades de gigabytes por segundo.",
      "keyPoints": [
        "Zero-copy string conversion: `strings.Builder.String()` no copia memoria gracias a conversiones unsafe internas seguras.",
        "Aceleración SIMD: funciones de búsqueda (`strings.Index`) aprovechan instrucciones vectoriales de la CPU.",
        "Alineación de memoria: `strings.Builder` incluye comprobaciones de copia para alertar si se pasa por valor indebidamente."
      ]
    },
    "evaluation": {
      "title": "Reto: Limpiador y Normalizador de URLs con strings.Builder",
      "statement": "Escribe una función 'NormalizarCadena(entrada string) string' que elimine espacios iniciales y finales, convierta todo a minúsculas, reemplace los espacios intermedios por guiones medios '-' y elimine los signos de exclamación. Utiliza funciones del paquete strings.",
      "starterCode": "package main\n\nimport (\n    \"fmt\"\n    \"strings\"\n)\n\nfunc NormalizarCadena(entrada string) string {\n    // Implementa la transformación\n}\n\nfunc main() {\n    texto := \"   ¡Aprende Golang en 2026 Hoy Mismo!   \"\n    fmt.Println(NormalizarCadena(texto))\n}",
      "hint": "Combina strings.TrimSpace, strings.ToLower, strings.ReplaceAll y strings.Trim.",
      "solution": "package main\n\nimport (\n    \"fmt\"\n    \"strings\"\n)\n\nfunc NormalizarCadena(entrada string) string {\n    // 1. Quitar espacios extremos\n    s := strings.TrimSpace(entrada)\n    // 2. Convertir a minúsculas\n    s = strings.ToLower(s)\n    // 3. Eliminar signos de admiración\n    s = strings.ReplaceAll(s, \"¡\", \"\")\n    s = strings.ReplaceAll(s, \"!\", \"\")\n    // 4. Reemplazar espacios por guiones\n    s = strings.ReplaceAll(s, \" \", \"-\")\n    return s\n}\n\nfunc main() {\n    texto := \"   ¡Aprende Golang en 2026 Hoy Mismo!   \"\n    resultado := NormalizarCadena(texto)\n    fmt.Println(\"Slug generado:\", resultado)\n}",
      "explanation": "El paquete strings ofrece una suite completa de funciones ortogonales e inmutables para sanitizar texto. Al encadenar transformaciones como TrimSpace, ToLower y ReplaceAll, se produce una cadena limpia (slug para URLs) de forma predecible y segura."
    },
    "externalLinks": [
      {
        "title": "Paquete strings (Biblioteca estándar de Go)",
        "url": "https://pkg.go.dev/strings",
        "description": "Documentación oficial exhaustiva de todas las funciones del paquete strings."
      },
      {
        "title": "Blog oficial de Go: Cadenas, bytes, runas y caracteres",
        "url": "https://go.dev/blog/strings",
        "description": "Artículo de referencia sobre la arquitectura interna de cadenas en Go."
      },
      {
        "title": "Go by Example Original: String Functions",
        "url": "https://gobyexample.com/string-functions",
        "description": "Ejemplo en Go by Example."
      }
    ],
    "code": "// El paquete `strings` de la biblioteca estándar proporciona numerosas\n// funciones útiles relacionadas con cadenas de texto. Aquí hay algunos ejemplos\n// para familiarizarse con el paquete.\n\npackage main\n\nimport (\n\t\"fmt\"\n\ts \"strings\"\n)\n\n// Asignamos un alias a `fmt.Println` con un nombre más breve ya que lo\n// usaremos repetidamente a continuación.\nvar p = fmt.Println\n\nfunc main() {\n\n\t// Aquí hay una muestra de las funciones disponibles en\n\t// `strings`. Como se trata de funciones del paquete\n\t// y no de métodos propios del objeto string, debemos\n\t// pasar la cadena en cuestión como primer argumento\n\t// a la función. Puedes encontrar muchas más funciones\n\t// en la documentación de [`strings`](https://pkg.go.dev/strings).\n\tp(\"Contains:  \", s.Contains(\"test\", \"es\"))\n\tp(\"Count:     \", s.Count(\"test\", \"t\"))\n\tp(\"HasPrefix: \", s.HasPrefix(\"test\", \"te\"))\n\tp(\"HasSuffix: \", s.HasSuffix(\"test\", \"st\"))\n\tp(\"Index:     \", s.Index(\"test\", \"e\"))\n\tp(\"Join:      \", s.Join([]string{\"a\", \"b\"}, \"-\"))\n\tp(\"Repeat:    \", s.Repeat(\"a\", 5))\n\tp(\"Replace:   \", s.Replace(\"foo\", \"o\", \"0\", -1))\n\tp(\"Replace:   \", s.Replace(\"foo\", \"o\", \"0\", 1))\n\tp(\"Split:     \", s.Split(\"a-b-c-d-e\", \"-\"))\n\tp(\"ToLower:   \", s.ToLower(\"TEST\"))\n\tp(\"ToUpper:   \", s.ToUpper(\"test\"))\n}\n",
    "output": "$ go run string-functions.go\nContains:   true\nCount:      2\nHasPrefix:  true\nHasSuffix:  true\nIndex:      1\nJoin:       a-b\nRepeat:     aaaaa\nReplace:    f00\nReplace:    f0o\nSplit:      [a b c d e]\nToLower:    test\nToUpper:    TEST\n",
    "officialUrl": "https://gobyexample.com/string-functions"
  },
  {
    "id": 52,
    "slug": "string-formatting",
    "title": "String Formatting",
    "titleEs": "Formateo de Cadenas con fmt.Printf",
    "category": "Manipulación de Texto y Formatos",
    "categorySlug": "texto-formatos",
    "categoryIcon": "file-code",
    "difficulty": "Principiante",
    "summary": "Interpolación y formateo de cadenas con verbos de formato printf (%v, %+v, %#v, %d, %s, %t) en 'fmt'.",
    "originalExpl": "Go ofrece un excelente soporte para formatear cadenas en la tradición de printf. Aquí hay ejemplos de tareas comunes de formateo con el paquete fmt.",
    "basicExpl": {
      "title": "Conceptos Fundamentales para Principiantes",
      "content": "En vez de pegar textos y números con signos de suma (`\"Edad: \" + strconv.Itoa(edad)`), Go ofrece la función `fmt.Printf` y `fmt.Sprintf` con 'verbos de formato' (palabras clave con `%`):\n- `%v`: imprime cualquier valor en su formato por defecto.\n- `%+v`: para structs, imprime los nombres de los campos y sus valores (`{Nombre:Carlos Edad:30}`).\n- `%#v`: imprime la sintaxis exacta de código Go para recrear el valor.\n- `%T`: imprime el TIPO de dato de la variable (ej. `int`, `main.Persona`).\n- `%d`: para números enteros; `%f` o `%.2f`: para flotantes con 2 decimales; `%s`: para cadenas; `%t`: para booleanos.",
      "keyPoints": [
        "`fmt.Printf`: imprime formateado directamente en la consola.",
        "`fmt.Sprintf`: genera y devuelve la cadena formateada como un `string` sin imprimirla.",
        "`%v` es el verbo comodín universal; `%+v` añade nombres de campos a los structs."
      ]
    },
    "interExpl": {
      "title": "Mecanismos Internos y Buenas Prácticas",
      "content": "Personalización con la interfaz `fmt.Stringer`:\nSi implementas el método `String() string` en cualquiera de tus tipos de datos, `fmt.Printf` (y cualquier función del paquete `fmt`) usará automáticamente tu método personalizado al imprimir con `%s` o `%v`:\n```go\ntype Coordenada struct { X, Y int }\nfunc (c Coordenada) String() string {\n    return fmt.Sprintf(\"(Lat:%d, Lon:%d)\", c.X, c.Y)\n}\n```\nTambién puedes controlar la alineación y el espaciado: `%-10s` alinea a la izquierda ocupando 10 caracteres; `%05d` rellena con ceros a la izquierda hasta 5 dígitos.",
      "keyPoints": [
        "Interfaz fmt.Stringer: contrato universal para controlar la representación textual de tus tipos.",
        "Relleno y alineación: `%8d`, `%-15s`, `%04d` facilitan la creación de tablas tabulares en consola.",
        "Escapar el símbolo de porcentaje: se utiliza doble porcentaje `%%` para imprimir el caracter '%' literal."
      ]
    },
    "expertExpl": {
      "title": "Bajo Nivel, Rendimiento e Internals",
      "content": "Sobrecarga de Reflexión en fmt vs strconv:\nEl paquete `fmt` utiliza el paquete de reflexión (`reflect`) en tiempo de ejecución para analizar los verbos `%v`, `%+v` e inspeccionar los tipos de datos pasados a través de su interfaz variádica `any`. Esto implica comprobaciones de tipo dinámicas, desenrollado de interfaces y múltiples asignaciones en el Heap.\n\nEn caminos de ejecución de altísimo rendimiento (hot paths, como un motor de procesamiento que formatea millones de enteros por segundo), sustituir `fmt.Sprintf(\"%d\", id)` por `strconv.Itoa(id)` o `strconv.AppendInt(buf, id, 10)` es hasta 10 veces más rápido y genera 0 asignaciones de memoria.",
      "keyPoints": [
        "Reflexión en fmt: inspección dinámica de tipos mediante reflect en tiempo de ejecución.",
        "Heap Escape en argumentos: pasar variables a `fmt.Sprintf(..., val)` convierte los valores a interface{}, forzando escape al heap.",
        "Alternativas de alto rendimiento: `strconv.AppendInt` y `strconv.AppendQuote` en búferes preasignados eliminan allocations."
      ]
    },
    "evaluation": {
      "title": "Reto: Formateador de Tabla de Factura con Tipos e Interfaz Stringer",
      "statement": "Define un struct 'LineaFactura' con 'Descripcion' (string), 'Cantidad' (int) y 'PrecioUnitario' (float64). Implementa el método 'String() string' que formatee la línea como una fila de tabla con columnas alineadas y el total calculado. En main, imprime dos líneas de factura.",
      "starterCode": "package main\n\nimport \"fmt\"\n\ntype LineaFactura struct {\n    Descripcion    string\n    Cantidad       int\n    PrecioUnitario float64\n}\n\n// Implementa String() string\n\nfunc main() {\n    // Instancia e imprime usando %s o %v\n}",
      "hint": "Usa fmt.Sprintf(\"%-20s | %5d | $%8.2f | $%8.2f\", l.Descripcion, l.Cantidad, l.PrecioUnitario, total).",
      "solution": "package main\n\nimport \"fmt\"\n\ntype LineaFactura struct {\n    Descripcion    string\n    Cantidad       int\n    PrecioUnitario float64\n}\n\nfunc (l LineaFactura) String() string {\n    total := float64(l.Cantidad) * l.PrecioUnitario\n    return fmt.Sprintf(\"%-20s | %5d | $%8.2f | $%8.2f\", \n        l.Descripcion, l.Cantidad, l.PrecioUnitario, total)\n}\n\nfunc main() {\n    l1 := LineaFactura{Descripcion: \"Cable HDMI 2.1\", Cantidad: 3, PrecioUnitario: 14.50}\n    l2 := LineaFactura{Descripcion: \"Adaptador USB-C\", Cantidad: 1, PrecioUnitario: 29.99}\n    \n    fmt.Printf(\"%-20s | %5s | %9s | %9s\\n\", \"Descripción\", \"Cant.\", \"P. Unit\", \"Total\")\n    fmt.Println(\"-----------------------------------------------------------\")\n    fmt.Println(l1)\n    fmt.Println(l2)\n}",
      "explanation": "Al implementar el método String(), la estructura satisface fmt.Stringer. Las plantillas de formato de printf como `%-20s` (alineado a la izquierda) y `$%8.2f` (flotante con 2 decimales alineado a la derecha en 8 caracteres) permiten diseñar tablas limpias y profesionales sin dependencias externas."
    },
    "externalLinks": [
      {
        "title": "Paquete fmt (Biblioteca estándar de Go)",
        "url": "https://pkg.go.dev/fmt",
        "description": "Documentación oficial completa con todos los verbos y modificadores de formato."
      },
      {
        "title": "Go by Example Original: String Formatting",
        "url": "https://gobyexample.com/string-formatting",
        "description": "Ejemplo en Go by Example."
      },
      {
        "title": "Guía canónica Effective Go: Convenciones de formateo e impresión con fmt",
        "url": "https://go.dev/doc/effective_go#printing",
        "description": "Convenciones oficiales de impresión y formateo en Go."
      }
    ],
    "code": "// Go ofrece un soporte sobresaliente para el formateo de cadenas siguiendo\n// la tradición de `printf`. Aquí tenemos algunos ejemplos de tareas\n// habituales de formateo de texto.\n\npackage main\n\nimport (\n\t\"fmt\"\n\t\"os\"\n)\n\ntype point struct {\n\tx, y int\n}\n\nfunc main() {\n\n\t// Go ofrece varios \"verbos\" de impresión diseñados para\n\t// dar formato a valores generales en Go. Por ejemplo, esto imprime\n\t// una instancia de nuestra estructura `point`.\n\tp := point{1, 2}\n\tfmt.Printf(\"struct1: %v\\n\", p)\n\n\t// Si el valor es una estructura, la variante `%+v`\n\t// incluirá los nombres de los campos del struct.\n\tfmt.Printf(\"struct2: %+v\\n\", p)\n\n\t// La variante `%#v` imprime una representación en sintaxis de Go\n\t// del valor, es decir, el fragmento de código fuente que\n\t// produciría dicho valor.\n\tfmt.Printf(\"struct3: %#v\\n\", p)\n\n\t// Para imprimir el tipo de un valor, utiliza `%T`.\n\tfmt.Printf(\"type: %T\\n\", p)\n\n\t// Formatear booleanos es directo con `%t`.\n\tfmt.Printf(\"bool: %t\\n\", true)\n\n\t// Existen muchas opciones para formatear enteros.\n\t// Usa `%d` para el formato decimal estándar en base 10.\n\tfmt.Printf(\"int: %d\\n\", 123)\n\n\t// Esto imprime una representación binaria con `%b`.\n\tfmt.Printf(\"bin: %b\\n\", 14)\n\n\t// Esto imprime el carácter correspondiente al\n\t// entero especificado.\n\tfmt.Printf(\"char: %c\\n\", 33)\n\n\t// `%x` proporciona codificación hexadecimal.\n\tfmt.Printf(\"hex: %x\\n\", 456)\n\n\t// También existen varias opciones de formateo para\n\t// números flotantes. Para el formato decimal básico usa `%f`.\n\tfmt.Printf(\"float1: %f\\n\", 78.9)\n\n\t// `%e` y `%E` formatean el flotante en notación científica\n\t// con ligeras variaciones de mayúsculas/minúsculas.\n\tfmt.Printf(\"float2: %e\\n\", 123400000.0)\n\tfmt.Printf(\"float3: %E\\n\", 123400000.0)\n\n\t// Para la impresión básica de cadenas usa `%s`.\n\tfmt.Printf(\"str1: %s\\n\", \"\\\"string\\\"\")\n\n\t// Para colocar comillas dobles en las cadenas como en el código fuente de Go, usa `%q`.\n\tfmt.Printf(\"str2: %q\\n\", \"\\\"string\\\"\")\n\n\t// Al igual que con los enteros vistos anteriormente, `%x` representa\n\t// la cadena en base 16, con dos caracteres de salida por cada byte de entrada.\n\tfmt.Printf(\"str3: %x\\n\", \"hex this\")\n\n\t// Para imprimir la representación de un puntero en memoria, usa `%p`.\n\tfmt.Printf(\"pointer: %p\\n\", &p)\n\n\t// Al dar formato a números con frecuencia querrás\n\t// controlar el ancho y la precisión de la cifra resultante.\n\t// Para especificar el ancho de un entero, usa un número\n\t// después del `%` en el verbo. Por defecto el resultado\n\t// se justificará a la derecha y se rellenará con espacios.\n\tfmt.Printf(\"width1: |%6d|%6d|\\n\", 12, 345)\n\n\t// También puedes especificar el ancho de flotantes impresos,\n\t// aunque habitualmente también querrás restringir la precisión\n\t// decimal simultáneamente mediante la sintaxis ancho.precision.\n\tfmt.Printf(\"width2: |%6.2f|%6.2f|\\n\", 1.2, 3.45)\n\n\t// Para justificar a la izquierda, usa la bandera `-`.\n\tfmt.Printf(\"width3: |%-6.2f|%-6.2f|\\n\", 1.2, 3.45)\n\n\t// Es posible que también desees controlar el ancho al formatear\n\t// cadenas, en especial para alinearlas en salidas con formato de tabla.\n\t// Aquí vemos el ancho básico justificado a la derecha.\n\tfmt.Printf(\"width4: |%6s|%6s|\\n\", \"foo\", \"b\")\n\n\t// Para justificar a la izquierda se usa la bandera `-` al igual que con los números.\n\tfmt.Printf(\"width5: |%-6s|%-6s|\\n\", \"foo\", \"b\")\n\n\t// Hasta ahora hemos visto `Printf`, que imprime la cadena\n\t// formateada en `os.Stdout`. `Sprintf` formatea y retorna\n\t// una cadena sin imprimirla en ninguna parte.\n\ts := fmt.Sprintf(\"sprintf: a %s\", \"string\")\n\tfmt.Println(s)\n\n\t// Puedes formatear e imprimir hacia otros `io.Writer` distintos\n\t// de `os.Stdout` utilizando `Fprintf`.\n\tfmt.Fprintf(os.Stderr, \"io: an %s\\n\", \"error\")\n}\n",
    "output": "$ go run string-formatting.go\nstruct1: {1 2}\nstruct2: {x:1 y:2}\nstruct3: main.point{x:1, y:2}\ntype: main.point\nbool: true\nint: 123\nbin: 1110\nchar: !\nhex: 1c8\nfloat1: 78.900000\nfloat2: 1.234000e+08\nfloat3: 1.234000E+08\nstr1: \"string\"\nstr2: \"\\\"string\\\"\"\nstr3: 6865782074686973\npointer: 0xc0000ba000\nwidth1: |    12|   345|\nwidth2: |  1.20|  3.45|\nwidth3: |1.20  |3.45  |\nwidth4: |   foo|     b|\nwidth5: |foo   |b     |\nsprintf: a string\nio: an error\n",
    "officialUrl": "https://gobyexample.com/string-formatting"
  },
  {
    "id": 53,
    "slug": "text-templates",
    "title": "Text Templates",
    "titleEs": "Plantillas de Texto (text/template y html/template)",
    "category": "Manipulación de Texto y Formatos",
    "categorySlug": "texto-formatos",
    "categoryIcon": "file-code",
    "difficulty": "Intermedio",
    "summary": "Generación de texto dinámico mediante directivas de datos, condicionales y bucles en plantillas parseadas.",
    "originalExpl": "Go ofrece soporte integrado para crear texto dinámico o mostrar salidas HTML personalizadas al usuario con los paquetes text/template y html/template.",
    "basicExpl": {
      "title": "Conceptos Fundamentales para Principiantes",
      "content": "Una plantilla (template) es un texto con 'huecos' que se rellenan automáticamente con datos de tu programa, como una carta modelo de bienvenida:\n- Los datos se insertan con llaves dobles: `Hola {{.Nombre}}, tienes {{.Puntos}} puntos.`\n- El punto `.` representa el objeto o dato actual que le pasas.\n- Admite condicionales: `{{if .EsVip}}Eres cliente VIP{{else}}Cliente regular{{end}}`.\n- Admite bucles para recorrer listas: `{{range .Productos}}- {{.}}{{end}}`.\n- Para generar páginas web seguras se usa `html/template`, que previene hackeos de inyección de código (XSS) automáticamente.",
      "keyPoints": [
        "Paquete `text/template` para texto plano/emails; `html/template` para páginas web.",
        "Las acciones se encierran entre llaves dobles: `{{ .Campo }}`.",
        "Directivas de control: `{{if ...}}`, `{{range ...}}`, `{{with ...}}`, `{{end}}`.",
        "Eliminar espacios en blanco circundantes usando guiones: `{{- .Campo -}}`."
      ]
    },
    "interExpl": {
      "title": "Mecanismos Internos y Buenas Prácticas",
      "content": "Inyección de Funciones Personalizadas con `FuncMap`:\nPuedes inyectar tus propias funciones dentro de las plantillas para transformar datos (por ejemplo, dar formato a fechas o convertir a mayúsculas):\n```go\nfuncs := template.FuncMap{\n    \"aMayusculas\": strings.ToUpper,\n}\ntmpl := template.Must(template.New(\"miTmpl\").Funcs(funcs).Parse(\"{{ . | aMayusculas }}\"))\n```\nUso de `template.Must()`: envuelve el parseo de plantillas al inicio del programa; si la plantilla tiene un error de sintaxis, genera un pánico en el arranque para que no se descubra el error tarde en producción.",
      "keyPoints": [
        "FuncMap: diccionario de funciones Go disponibles dentro del motor de plantillas.",
        "Pipelines con tuberías `|`: encadenar transformaciones estilo Unix: `{{ .Email | aMinusculas | recortar }}`.",
        "Seguridad contextual en `html/template`: escapa automáticamente atributos HTML, código JavaScript y URLs."
      ]
    },
    "expertExpl": {
      "title": "Bajo Nivel, Rendimiento e Internals",
      "content": "Árbol de Sintaxis Abstracta (AST) y Ejecución Concurrente:\nCuando ejecutas `tmpl.Parse()`, Go analiza el texto y construye un árbol de sintaxis abstracta (`parse.Tree`) con nodos de texto, acciones y variables. Parsear una plantilla es un proceso intensivo en CPU.\n\nUna vez parseada, la instancia `*template.Template` es COMPLETAMENTE SEGURA para ejecución concurrente en múltiples goroutines llamando a `tmpl.Execute(w, datos)`. Por tanto, el patrón de diseño obligatorio en servidores de alto tráfico es parsear todas las plantillas UNA SOLA VEZ durante la inicialización (`init()` o `main()`) y reutilizar el puntero compilado en los endpoints.",
      "keyPoints": [
        "Parse Once, Execute Many: parsear en arranque para evitar el coste del compilador AST en cada petición HTTP.",
        "Concurrencia segura: `tmpl.Execute` es concurrente y seguro para lectura de múltiples hilos.",
        "Context-Aware Escaping: `html/template` analiza el contexto léxico (si está dentro de `<script>`, `href`, o texto) para aplicar el escape específico."
      ]
    },
    "evaluation": {
      "title": "Reto: Generador de Email de Notificación con Lista y Pipeline",
      "statement": "Crea una plantilla de texto para un correo de bienvenida. Debe mostrar el nombre del cliente, un mensaje condicional si es 'Premium', y recorrer un slice de 'Beneficios' mostrando cada uno precedido de un asterisco. Ejecuta la plantilla imprimiendo el resultado en os.Stdout.",
      "starterCode": "package main\n\nimport (\n    \"os\"\n    \"text/template\"\n)\n\ntype Cliente struct {\n    Nombre     string\n    EsPremium  bool\n    Beneficios []string\n}\n\nfunc main() {\n    // Define la plantilla y ejecútala con un Cliente de prueba\n}",
      "hint": "Usa {{if .EsPremium}}...{{end}} y {{range .Beneficios}}* {{.}}\n{{end}}.",
      "solution": "package main\n\nimport (\n    \"os\"\n    \"text/template\"\n)\n\ntype Cliente struct {\n    Nombre     string\n    EsPremium  bool\n    Beneficios []string\n}\n\nfunc main() {\n    plantillaRaw := `Estimado(a) {{.Nombre}},\n{{if .EsPremium}}¡Gracias por ser un miembro Premium exclusivo!{{else}}Gracias por unirte a nuestra comunidad.{{end}}\n\nTus beneficios activos:\n{{range .Beneficios}}* {{.}}\n{{end}}\nAtentamente,\nEl Equipo de Soporte.\n`\n\n    tmpl := template.Must(template.New(\"bienvenida\").Parse(plantillaRaw))\n    \n    cliente := Cliente{\n        Nombre:     \"Valeria Gómez\",\n        EsPremium:  true,\n        Beneficios: []string{\"Envíos gratis en 24h\", \"Soporte telefónico prioritario\", \"10% de descuento continuo\"},\n    }\n    \n    err := tmpl.Execute(os.Stdout, cliente)\n    if err != nil {\n        panic(err)\n    }\n}",
      "explanation": "El motor de plantillas evalúa dinámicamente las directivas: el condicional `{{if .EsPremium}}` renderiza el mensaje para usuarios VIP y el bucle `{{range .Beneficios}}` itera sobre el slice inyectando cada elemento en el marcador `{{.}}`, canalizando el resultado final directamente a la salida estándar."
    },
    "externalLinks": [
      {
        "title": "Paquete text/template (Documentación oficial)",
        "url": "https://pkg.go.dev/text/template",
        "description": "Documentación oficial del motor de plantillas de texto de Go."
      },
      {
        "title": "Package html/template (Seguridad Web)",
        "url": "https://pkg.go.dev/html/template",
        "description": "Guía oficial sobre cómo proteger aplicaciones contra XSS con plantillas HTML."
      },
      {
        "title": "Go by Example Original: Text Templates",
        "url": "https://gobyexample.com/text-templates",
        "description": "Ejemplo en Go by Example."
      }
    ],
    "code": "// Go ofrece soporte integrado para crear contenido dinámico o mostrar\n// salidas personalizadas al usuario mediante el paquete `text/template`. Un paquete\n// hermano denominado `html/template` provee la misma API pero cuenta con\n// funciones de seguridad adicionales para evitar vulnerabilidades XSS en HTML.\n\npackage main\n\nimport (\n\t\"os\"\n\t\"text/template\"\n)\n\nfunc main() {\n\n\t// Podemos crear una plantilla nueva y parsear su cuerpo\n\t// a partir de una cadena de texto. Las plantillas combinan texto estático y \"acciones\"\n\t// delimitadas por `{{...}}` que se utilizan para insertar datos dinámicos.\n\tt1 := template.New(\"t1\")\n\tt1, err := t1.Parse(\"Value is {{.}}\\n\")\n\tif err != nil {\n\t\tpanic(err)\n\t}\n\n\t// De forma alternativa, podemos usar `template.Must` para disparar un panic\n\t// si `Parse` devuelve un error. Esto resulta especialmente conveniente\n\t// para plantillas inicializadas en el ámbito global.\n\tt1 = template.Must(t1.Parse(\"Value: {{.}}\\n\"))\n\n\t// Al \"ejecutar\" la plantilla, generamos su texto con\n\t// valores concretos para sus acciones. La acción `{{.}}`\n\t// se reemplaza por el valor pasado como parámetro a `Execute`.\n\tt1.Execute(os.Stdout, \"some text\")\n\tt1.Execute(os.Stdout, 5)\n\tt1.Execute(os.Stdout, []string{\n\t\t\"Go\",\n\t\t\"Rust\",\n\t\t\"C++\",\n\t\t\"C#\",\n\t})\n\n\t// Función auxiliar que utilizaremos a continuación.\n\tCreate := func(name, t string) *template.Template {\n\t\treturn template.Must(template.New(name).Parse(t))\n\t}\n\n\t// Si los datos corresponden a un struct podemos usar la acción `{{.FieldName}}` para acceder\n\t// a sus campos. Los campos deben estar exportados (iniciar con mayúscula) para ser accesibles durante la\n\t// ejecución de la plantilla.\n\tt2 := Create(\"t2\", \"Name: {{.Name}}\\n\")\n\n\tt2.Execute(os.Stdout, struct {\n\t\tName string\n\t}{\"Jane Doe\"})\n\n\t// Lo mismo aplica para los mapas; en los mapas no existe restricción\n\t// en cuanto al uso de mayúsculas o minúsculas en las claves.\n\tt2.Execute(os.Stdout, map[string]string{\n\t\t\"Name\": \"Mickey Mouse\",\n\t})\n\n\t// if/else proporcionan ejecución condicional en las plantillas. Un valor se considera\n\t// falso si coincide con el valor cero de su tipo, como 0, cadena vacía,\n\t// puntero nil, etc.\n\t// Este ejemplo demuestra además otra característica útil\n\t// de las plantillas: usar `-` en las acciones para recortar espacios en blanco adyacentes.\n\tt3 := Create(\"t3\",\n\t\t\"{{if . -}} yes {{else -}} no {{end}}\\n\")\n\tt3.Execute(os.Stdout, \"not empty\")\n\tt3.Execute(os.Stdout, \"\")\n\n\t// Los bloques range nos permiten iterar a través de slices, arrays, mapas o canales. Dentro\n\t// del bloque range, `{{.}}` se vincula al elemento actual de la iteración.\n\tt4 := Create(\"t4\",\n\t\t\"Range: {{range .}}{{.}} {{end}}\\n\")\n\tt4.Execute(os.Stdout,\n\t\t[]string{\n\t\t\t\"Go\",\n\t\t\t\"Rust\",\n\t\t\t\"C++\",\n\t\t\t\"C#\",\n\t\t})\n}\n",
    "output": "$ go run templates.go \nValue: some text\nValue: 5\nValue: [Go Rust C++ C#]\nName: Jane Doe\nName: Mickey Mouse\nyes \nno \nRange: Go Rust C++ C# \n",
    "officialUrl": "https://gobyexample.com/text-templates"
  },
  {
    "id": 54,
    "slug": "regular-expressions",
    "title": "Regular Expressions",
    "titleEs": "Expresiones Regulares (regexp)",
    "category": "Manipulación de Texto y Formatos",
    "categorySlug": "texto-formatos",
    "categoryIcon": "file-code",
    "difficulty": "Intermedio",
    "summary": "Búsqueda y extracción de patrones de texto complejos utilizando el motor RE2 determinista en 'regexp'.",
    "originalExpl": "Go ofrece soporte integrado para expresiones regulares. Aquí hay algunos ejemplos de tareas comunes relacionadas con regex en Go.",
    "basicExpl": {
      "title": "Conceptos Fundamentales para Principiantes",
      "content": "Una expresión regular (regex) es una fórmula especial para buscar o validar patrones en un texto (como verificar si un correo electrónico es válido o extraer todos los números de teléfono de un documento):\n- Se compila con `regexp.Compile(\"patron\")` o `regexp.MustCompile(`p([a-z]+)ch`)`.\n- Para comprobar si coincide: `r.MatchString(\"peach\")` -> true.\n- Para extraer la palabra coincidente: `r.FindString(\"peach punch\")` -> \"peach\".\n- Para reemplazar texto: `r.ReplaceAllString(\"a1 b2 c3\", \"<num>\")`.",
      "keyPoints": [
        "Se importa con `import \"regexp\"`.",
        "Escribe los patrones entre comillas invertidas (backticks `` `patron` ``) para no tener que escapar barras invertidas.",
        "`regexp.MustCompile`: compila en el arranque y hace pánico si el patrón es inválido.",
        "`FindAllString`: extrae todas las coincidencias encontradas en la cadena."
      ]
    },
    "interExpl": {
      "title": "Mecanismos Internos y Buenas Prácticas",
      "content": "Grupos de Captura y Subcoincidencias:\nLos paréntesis `()` definen grupos de captura para extraer partes específicas del patrón:\n```go\nr := regexp.MustCompile(`([a-zA-Z]+)@([a-zA-Z]+)\\.com`)\nsub := r.FindStringSubmatch(\"contacto: info@empresa.com\")\n// sub[0] = \"info@empresa.com\" (coincidencia total)\n// sub[1] = \"info\"              (usuario)\n// sub[2] = \"empresa\"           (dominio)\n```\nRegla de rendimiento: NUNCA compiles expresiones regulares dentro de bucles o manejadores HTTP (`regexp.Compile` dentro de una función repetida). Compila el regex UNA SOLA VEZ a nivel de paquete en una variable global.",
      "keyPoints": [
        "FindStringSubmatch: devuelve un slice donde el índice 0 es el match completo y los siguientes son los grupos entre paréntesis.",
        "Compilación única obligatoria: compilar un regex es muy costoso en CPU; almacena la instancia compilada en una variable de paquete.",
        "Soporte de bytes: todos los métodos tienen versión para `[]byte` (`Match`, `Find`, `FindSubmatch`) para evitar convertir strings."
      ]
    },
    "expertExpl": {
      "title": "Bajo Nivel, Rendimiento e Internals",
      "content": "Garantía de Tiempo Lineal O(N) con el Motor RE2:\nA diferencia de lenguajes como JavaScript, Python o Java que usan motores basados en Backtracking (PCRE) susceptibles a ataques de Denegación de Servicio por Expresiones Regulares (ReDoS Catastrófico), el motor `regexp` de Go implementa el algoritmo de Autómata Finito No Determinista (NFA/DFA) de Thompson (diseñado por Russ Cox).\n\nEsto garantiza matemáticamente que el tiempo de ejecución es estrictamente LINEAL O(N) respecto a la longitud del texto. Debido a esta garantía de seguridad, Go NO soporta retro-referencias (backreferences como `\\1`) ni lookaround (`(?=...)`), protegiendo a los servidores contra colapsos de CPU por expresiones maliciosas.",
      "keyPoints": [
        "Inmunidad a ReDoS: complejidad garantizada O(N) en el peor de los casos gracias al motor RE2.",
        "Sin Backtracking exponencial: no admite backreferences ni lookaheads para preservar la seguridad del servidor.",
        "Concurrencia segura: la estructura `*regexp.Regexp` es completamente segura para lectura concurrente de múltiples goroutines."
      ]
    },
    "evaluation": {
      "title": "Reto: Extractor de Códigos de Cupón con Grupos de Captura",
      "statement": "Escribe un programa que utilice regexp para encontrar y extraer códigos de cupón en un texto. Los cupones tienen el formato 'CUPON-[LETRAS]-[NUMEROS]' (ejemplo: 'CUPON-PROMO-2026'). Extrae el código completo, la categoría de promoción y el año utilizando FindStringSubmatch.",
      "starterCode": "package main\n\nimport (\n    \"fmt\"\n    \"regexp\"\n)\n\nfunc main() {\n    texto := \"Aplica el código CUPON-DESCUENTO-50 en tu compra de hoy.\"\n    // Compila el regex con grupos y extrae los componentes\n}",
      "hint": "Usa el patrón: `CUPON-([A-Z]+)-([0-9]+)` y r.FindStringSubmatch(texto).",
      "solution": "package main\n\nimport (\n    \"fmt\"\n    \"regexp\"\n)\n\nvar cuponRegex = regexp.MustCompile(`CUPON-([A-Z]+)-([0-9]+)`)\n\nfunc main() {\n    texto := \"Aplica el código CUPON-DESCUENTO-50 en tu compra de hoy.\"\n    \n    coincidencias := cuponRegex.FindStringSubmatch(texto)\n    \n    if len(coincidencias) > 0 {\n        fmt.Println(\"Cupón completo :\", coincidencias[0])\n        fmt.Println(\"Categoría promo:\", coincidencias[1])\n        fmt.Println(\"Valor / Código :\", coincidencias[2])\n    } else {\n        fmt.Println(\"No se encontró ningún cupón válido.\")\n    }\n}",
      "explanation": "El patrón `CUPON-([A-Z]+)-([0-9]+)` define dos grupos de captura entre paréntesis. La función FindStringSubmatch devuelve un slice donde la posición 0 es la coincidencia total y las posiciones 1 y 2 aíslan respectivamente la categoría ('DESCUENTO') y el número ('50')."
    },
    "externalLinks": [
      {
        "title": "Paquete regexp (Biblioteca estándar de Go)",
        "url": "https://pkg.go.dev/regexp",
        "description": "Documentación oficial del paquete regexp y sintaxis RE2 soportada."
      },
      {
        "title": "Russ Cox: Cómo implementar motores de expresiones regulares rápidos",
        "url": "https://research.swtch.com/regexp1",
        "description": "El famoso ensayo de Russ Cox comparando motores de backtracking vs autómatas de tiempo lineal."
      },
      {
        "title": "Go by Example Original: Regular Expressions",
        "url": "https://gobyexample.com/regular-expressions",
        "description": "Ejemplo en Go by Example."
      }
    ],
    "code": "// Go cuenta con soporte integrado para [expresiones regulares](https://en.wikipedia.org/wiki/Regular_expression).\n// Aquí tenemos algunos ejemplos de tareas habituales relacionadas con expresiones regulares\n// en Go.\n\npackage main\n\nimport (\n\t\"bytes\"\n\t\"fmt\"\n\t\"regexp\"\n)\n\nfunc main() {\n\n\t// Esto comprueba si un patrón coincide con una cadena de texto.\n\tmatch, _ := regexp.MatchString(\"p([a-z]+)ch\", \"peach\")\n\tfmt.Println(match)\n\n\t// Arriba usamos un patrón de cadena directamente, pero para\n\t// otras tareas con expresiones regulares necesitarás compilar (`Compile`)\n\t// una estructura `Regexp` optimizada.\n\tr, _ := regexp.Compile(\"p([a-z]+)ch\")\n\n\t// Existen numerosos métodos disponibles sobre estas estructuras. Aquí tenemos\n\t// una comprobación de coincidencia idéntica a la vista anteriormente.\n\tfmt.Println(r.MatchString(\"peach\"))\n\n\t// Esto localiza la primera coincidencia de la expresión regular.\n\tfmt.Println(r.FindString(\"peach punch\"))\n\n\t// Esto también localiza la primera coincidencia pero devuelve los\n\t// índices de inicio y fin correspondientes en lugar del texto coincidente.\n\tfmt.Println(\"idx:\", r.FindStringIndex(\"peach punch\"))\n\n\t// Las variantes `Submatch` incluyen información sobre\n\t// las coincidencias del patrón completo y los subpatrones (grupos)\n\t// capturados. Por ejemplo, esto devolverá información tanto para\n\t// `p([a-z]+)ch` como para `([a-z]+)`.\n\tfmt.Println(r.FindStringSubmatch(\"peach punch\"))\n\n\t// Análogamente esto devolverá información sobre los\n\t// índices de coincidencias y subcoincidencias.\n\tfmt.Println(r.FindStringSubmatchIndex(\"peach punch\"))\n\n\t// Las variantes `All` de estas funciones aplican a todas\n\t// las coincidencias en el texto de entrada, no únicamente a la primera.\n\t// Por ejemplo, para encontrar todas las coincidencias de una regexp.\n\tfmt.Println(r.FindAllString(\"peach punch pinch\", -1))\n\n\t// Estas variantes `All` se encuentran disponibles también para las\n\t// otras funciones que examinamos arriba.\n\tfmt.Println(\"all:\", r.FindAllStringSubmatchIndex(\n\t\t\"peach punch pinch\", -1))\n\n\t// Proporcionar un entero no negativo como segundo argumento\n\t// a estas funciones limitará la cantidad máxima de coincidencias.\n\tfmt.Println(r.FindAllString(\"peach punch pinch\", 2))\n\n\t// Nuestros ejemplos anteriores recibían argumentos de tipo string y utilizaban\n\t// nombres como `MatchString`. También podemos proporcionar argumentos de tipo\n\t// `[]byte` y prescindir de `String` en el nombre de la función.\n\tfmt.Println(r.Match([]byte(\"peach\")))\n\n\t// Al crear variables globales con expresiones regulares,\n\t// se puede emplear la variación `MustCompile` en lugar de `Compile`.\n\t// `MustCompile` entra en panic en vez de devolver un error,\n\t// lo cual hace su uso mucho más seguro y directo para variables globales.\n\tr = regexp.MustCompile(\"p([a-z]+)ch\")\n\tfmt.Println(\"regexp:\", r)\n\n\t// El paquete `regexp` también puede utilizarse para reemplazar\n\t// subcadenas coincidentes por otros valores.\n\tfmt.Println(r.ReplaceAllString(\"a peach\", \"<fruit>\"))\n\n\t// La variante `Func` permite transformar el texto coincidente\n\t// mediante una función proporcionada.\n\tin := []byte(\"a peach\")\n\tout := r.ReplaceAllFunc(in, bytes.ToUpper)\n\tfmt.Println(string(out))\n}\n",
    "output": "$ go run regular-expressions.go\ntrue\ntrue\npeach\nidx: [0 5]\n[peach ea]\n[0 5 1 3]\n[peach punch pinch]\nall: [[0 5 1 3] [6 11 7 9] [12 17 13 15]]\n[peach punch]\ntrue\nregexp: p([a-z]+)ch\na <fruit>\na PEACH\n\n# Para una referencia exhaustiva sobre expresiones regulares en Go,\n# consulta la documentación del paquete [`regexp`](https://pkg.go.dev/regexp).\n",
    "officialUrl": "https://gobyexample.com/regular-expressions"
  },
  {
    "id": 55,
    "slug": "json",
    "title": "JSON",
    "titleEs": "Codificación y Decodificación JSON",
    "category": "Manipulación de Texto y Formatos",
    "categorySlug": "texto-formatos",
    "categoryIcon": "file-code",
    "difficulty": "Intermedio",
    "summary": "Serialización (Marshal) y deserialización (Unmarshal) de datos estructurados con el paquete estándar 'encoding/json'.",
    "originalExpl": "Go ofrece soporte integrado para codificación y decodificación JSON, incluyendo hacia y desde tipos de datos nativos y personalizados mediante json.Marshal y json.Unmarshal.",
    "basicExpl": {
      "title": "Conceptos Fundamentales para Principiantes",
      "content": "JSON es el formato estándar universal para enviar y recibir datos en internet y APIs web:\n- Convertir un struct de Go a texto JSON: `json.Marshal(miStruct)` (devuelve un slice de bytes `[]byte`).\n- Convertir texto JSON a un struct de Go: `json.Unmarshal(bytesJSON, &miStruct)` (debes pasar un puntero con `&` para que Go rellene tu struct).\n- Para que un campo de tu struct aparezca en el JSON, el campo DEBE empezar con mayúscula (ser exportado).\n- Los 'tags' permiten renombrar las claves: `Nombre string `json:\"nombre_completo\"``.",
      "keyPoints": [
        "Se importa con `import \"encoding/json\"`.",
        "Serializar: `json.Marshal(v)` (Go -> JSON []byte).",
        "Deserializar: `json.Unmarshal(data, &v)` (JSON []byte -> Go struct mediante puntero).",
        "Solo los campos exportados (que empiezan con mayúscula) son serializados.",
        "Opción `omitempty`: omite el campo del JSON si está vacío (`json:\"telefono,omitempty\"`)."
      ]
    },
    "interExpl": {
      "title": "Mecanismos Internos y Buenas Prácticas",
      "content": "Streaming de JSON con `json.Encoder` y `json.Decoder`:\nCuando trabajas con conexiones de red HTTP o archivos en disco, cargar todo el JSON en memoria con `Marshal/Unmarshal` es ineficiente. La buena práctica es usar streaming directo:\n```go\n// Leer JSON directamente del cuerpo de una petición HTTP\nerr := json.NewDecoder(r.Body).Decode(&datos)\n\n// Escribir JSON directamente a la respuesta HTTP\nerr := json.NewEncoder(w).Encode(respuesta)\n```\nJSON genérico sin estructura fija: Puedes deserializar en `map[string]any` si la estructura del JSON es dinámica o desconocida.",
      "keyPoints": [
        "json.Decoder / json.Encoder: procesan streaming sobre cualquier `io.Reader` e `io.Writer` ahorrando memoria.",
        "Estructuras anónimas inline: útiles para respuestas de API de un solo uso sin contaminar el paquete.",
        "Desempaquetado estricto: `decoder.DisallowUnknownFields()` rechaza campos no contemplados en el struct para mayor seguridad."
      ]
    },
    "expertExpl": {
      "title": "Bajo Nivel, Rendimiento e Internals",
      "content": "Sobrecarga de Reflexión y Generadores de Código Zero-Alloc:\nEl paquete estándar `encoding/json` utiliza reflexión en tiempo de ejecución para inspeccionar los tags y campos de los structs en cada llamada, lo que genera múltiples asignaciones en el Heap y sobrecarga de CPU.\n\nEn microservicios con altísimo volumen de transacciones por segundo (TPS), se utilizan bibliotecas de generación de código estático como `easyjson` o `sonic` (desarrollada por ByteDance con ensamblador JIT). Estas herramientas generan métodos `MarshalJSON()` específicos en tiempo de compilación, eliminando la reflexión y multiplicando la velocidad de parseo hasta por 5x.",
      "keyPoints": [
        "Reflexión de tags en runtime: coste de procesamiento inherente al paquete estándar encoding/json.",
        "Interfaces personalizadas: implementar `json.Marshaler` y `json.Unmarshaler` permite controlar la serialización manual byte a byte.",
        "JSON Numbers: por defecto los números flotantes se parsean como float64; usar `decoder.UseNumber()` para preservar enteros grandes de 64 bits sin pérdida de precisión."
      ]
    },
    "evaluation": {
      "title": "Reto: Serialización y Deserialización de Respuesta de API",
      "statement": "Define un struct 'Usuario' con campos: ID (int), Nombre (string), Email (string) y Activo (bool), con tags JSON en formato snake_case y 'omitempty' en Email. Serializa un usuario a JSON, imprímelo, y luego deserialízalo de vuelta en una nueva variable verificando que los campos coincidan.",
      "starterCode": "package main\n\nimport (\n    \"encoding/json\"\n    \"fmt\"\n)\n\n// Define Usuario con tags JSON\n\nfunc main() {\n    // Serializa con json.Marshal e imprime\n    // Deserializa con json.Unmarshal\n}",
      "hint": "Usa json.Marshal(u) para serializar y json.Unmarshal(bytes, &uDestino) pasando el puntero.",
      "solution": "package main\n\nimport (\n    \"encoding/json\"\n    \"fmt\"\n)\n\ntype Usuario struct {\n    ID     int    `json:\"id\"`\n    Nombre string `json:\"nombre\"`\n    Email  string `json:\"email,omitempty\"`\n    Activo bool   `json:\"activo\"`\n}\n\nfunc main() {\n    original := Usuario{\n        ID:     42,\n        Nombre: \"Mateo Santos\",\n        Email:  \"mateo@empresa.com\",\n        Activo: true,\n    }\n    \n    // 1. Serializar a JSON\n    bytesJSON, err := json.MarshalIndent(original, \"\", \"  \")\n    if err != nil {\n        panic(err)\n    }\n    fmt.Println(\"JSON generado:\")\n    fmt.Println(string(bytesJSON))\n    \n    // 2. Deserializar en una nueva variable\n    var recuperado Usuario\n    if err := json.Unmarshal(bytesJSON, &recuperado); err != nil {\n        panic(err)\n    }\n    \n    fmt.Printf(\"\\nUsuario recuperado: ID=%d, Nombre='%s', Activo=%t\\n\", \n        recuperado.ID, recuperado.Nombre, recuperado.Activo)\n}",
      "explanation": "El paquete encoding/json mapea los campos de Go a las claves snake_case especificadas en los tags de estructura. Al llamar a json.Unmarshal, se pasa la dirección de memoria `&recuperado` para que la función pueda poblar directamente los campos del struct."
    },
    "externalLinks": [
      {
        "title": "Blog oficial de Go: Serialización y deserialización de JSON en Go",
        "url": "https://go.dev/blog/json",
        "description": "Artículo canónico del equipo de Go sobre el mapeo de tipos JSON a Go."
      },
      {
        "title": "Paquete encoding/json (Documentación oficial)",
        "url": "https://pkg.go.dev/encoding/json",
        "description": "Documentación oficial del paquete de codificación y decodificación JSON."
      },
      {
        "title": "Go by Example Original: JSON",
        "url": "https://gobyexample.com/json",
        "description": "Ejemplo en Go by Example."
      }
    ],
    "code": "// Go cuenta con soporte integrado para la codificación y decodificación\n// de JSON, incluyendo tipos de datos tanto primitivos como personalizados.\n\npackage main\n\nimport (\n\t\"bytes\"\n\t\"encoding/json/v2\"\n\t\"fmt\"\n\t\"strings\"\n)\n\n// Utilizaremos estas dos estructuras para demostrar la codificación\n// y decodificación de tipos personalizados a continuación.\ntype response1 struct {\n\tPage   int\n\tFruits []string\n}\n\n// Únicamente los campos exportados serán codificados/decodificados en JSON.\n// Los campos deben comenzar con mayúscula para ser exportados.\ntype response2 struct {\n\tPage   int      `json:\"page\"`\n\tFruits []string `json:\"fruits\"`\n}\n\nfunc main() {\n\n\t// Primero veremos la codificación de tipos de datos básicos a\n\t// cadenas JSON. Aquí hay algunos ejemplos para valores atómicos.\n\tbolB, _ := json.Marshal(true)\n\tfmt.Println(string(bolB))\n\n\tintB, _ := json.Marshal(1)\n\tfmt.Println(string(intB))\n\n\tfltB, _ := json.Marshal(2.34)\n\tfmt.Println(string(fltB))\n\n\tstrB, _ := json.Marshal(\"gopher\")\n\tfmt.Println(string(strB))\n\n\t// Y aquí algunos ejemplos para slices y mapas, los cuales se codifican\n\t// en arrays y objetos JSON según lo esperado.\n\tslcD := []string{\"apple\", \"peach\", \"pear\"}\n\tslcB, _ := json.Marshal(slcD)\n\tfmt.Println(string(slcB))\n\n\tmapD := map[string]int{\"apple\": 5, \"lettuce\": 7}\n\tmapB, _ := json.Marshal(mapD)\n\tfmt.Println(string(mapB))\n\n\t// El paquete JSON puede codificar automáticamente tus\n\t// tipos de datos personalizados. Solo incluirá campos exportados\n\t// en la salida codificada y, por defecto, utilizará esos mismos\n\t// nombres como claves de JSON.\n\tres1D := &response1{\n\t\tPage:   1,\n\t\tFruits: []string{\"apple\", \"peach\", \"pear\"}}\n\tres1B, _ := json.Marshal(res1D)\n\tfmt.Println(string(res1B))\n\n\t// Puedes usar etiquetas (tags) en las declaraciones de campos del struct\n\t// para personalizar los nombres de las claves JSON generadas. Revisa la\n\t// definición de `response2` arriba para ver un ejemplo de tales etiquetas.\n\tres2D := &response2{\n\t\tPage:   1,\n\t\tFruits: []string{\"apple\", \"peach\", \"pear\"}}\n\tres2B, _ := json.Marshal(res2D)\n\tfmt.Println(string(res2B))\n\n\t// Ahora examinemos cómo decodificar datos JSON en valores de Go.\n\t// Aquí tenemos un ejemplo para una estructura de datos genérica.\n\tbyt := []byte(`{\"num\":6.13,\"strs\":[\"a\",\"b\"]}`)\n\n\t// Necesitamos proporcionar una variable donde el paquete JSON\n\t// pueda alojar los datos decodificados. Este\n\t// `map[string]any` albergará un mapa de cadenas a\n\t// tipos de datos arbitrarios.\n\tvar dat map[string]any\n\n\t// Aquí se realiza la decodificación real, junto con una verificación\n\t// de posibles errores asociados.\n\t// En aras de la brevedad omitimos el manejo riguroso de errores en\n\t// estos ejemplos didácticos; en código real de producción siempre\n\t// debes comprobar los errores y actuar en consecuencia.\n\tif err := json.Unmarshal(byt, &dat); err != nil {\n\t\tpanic(err)\n\t}\n\tfmt.Println(dat)\n\n\t// Para utilizar los valores en el mapa decodificado,\n\t// necesitaremos convertirlos a su tipo correspondiente.\n\t// Por ejemplo, aquí convertimos el valor en `num` al\n\t// tipo esperado `float64`.\n\tnum := dat[\"num\"].(float64)\n\tfmt.Println(num)\n\n\t// Acceder a datos anidados requiere una serie de\n\t// aserciones de tipo.\n\tstrs := dat[\"strs\"].([]any)\n\tstr1 := strs[0].(string)\n\tfmt.Println(str1)\n\n\t// También podemos decodificar JSON directamente en tipos de datos personalizados.\n\t// Esto aporta la gran ventaja de añadir seguridad de tipos estricta a\n\t// nuestros programas y elimina la necesidad de comprobaciones de tipo\n\t// al acceder a los datos decodificados.\n\tstr := `{\"page\": 1, \"fruits\": [\"apple\", \"peach\"]}`\n\tres := response2{}\n\t_ = json.Unmarshal([]byte(str), &res)\n\tfmt.Println(res)\n\tfmt.Println(res.Fruits[0])\n\n\t// En los ejemplos anteriores siempre utilizamos bytes y\n\t// strings como intermediarios entre los datos y la\n\t// representación JSON en la salida estándar. También podemos\n\t// transmitir flujos de codificación JSON directamente a implementaciones\n\t// de `io.Writer` como `os.Stdout` o incluso cuerpos de respuesta HTTP.\n\td := map[string]int{\"apple\": 5, \"lettuce\": 7}\n\tvar buf bytes.Buffer\n\t_ = json.MarshalWrite(&buf, d)\n\tfmt.Println(buf.String())\n\n\t// La lectura en flujo continuo desde objetos `io.Reader` como `os.Stdin`\n\t// o cuerpos de peticiones HTTP se realiza mediante `json.UnmarshalRead`.\n\tres1 := response2{}\n\t_ = json.UnmarshalRead(strings.NewReader(str), &res1)\n\tfmt.Println(res1)\n}\n",
    "output": "$ go run json.go\ntrue\n1\n2.34\n\"gopher\"\n[\"apple\",\"peach\",\"pear\"]\n{\"apple\":5,\"lettuce\":7}\n{\"Page\":1,\"Fruits\":[\"apple\",\"peach\",\"pear\"]}\n{\"page\":1,\"fruits\":[\"apple\",\"peach\",\"pear\"]}\nmap[num:6.13 strs:[a b]]\n6.13\na\n{1 [apple peach]}\napple\n{\"apple\":5,\"lettuce\":7}\n{1 [apple peach]}\n\n# Hemos cubierto los fundamentos de JSON en Go aquí; consulta\n# el artículo [JSON y Go](https://go.dev/blog/json)\n# y la documentación del [paquete JSON](https://pkg.go.dev/encoding/json/v2)\n# para profundizar en el tema.\n",
    "officialUrl": "https://gobyexample.com/json"
  },
  {
    "id": 56,
    "slug": "xml",
    "title": "XML",
    "titleEs": "Codificación y Decodificación XML",
    "category": "Manipulación de Texto y Formatos",
    "categorySlug": "texto-formatos",
    "categoryIcon": "file-code",
    "difficulty": "Intermedio",
    "summary": "Manejo de documentos estructurados XML mediante etiquetas, atributos y nodos con 'encoding/xml'.",
    "originalExpl": "Go ofrece soporte integrado para XML y formatos similares a XML a través del paquete encoding/xml. Al igual que con JSON, utiliza tags en las estructuras para guiar el mapeo.",
    "basicExpl": {
      "title": "Conceptos Fundamentales para Principiantes",
      "content": "XML es un formato clásico de intercambio de datos basado en etiquetas parecidas a HTML (`<persona id=\"1\"><nombre>Juan</nombre></persona>`):\n- Se utiliza mucho en servicios web SOAP antiguos, facturación electrónica y archivos de configuración.\n- Se serializa con `xml.Marshal(v)` y se deserializa con `xml.Unmarshal(data, &v)`.\n- Los tags de XML permiten especificar si un campo es un atributo (`xml:\"id,attr\"`) o un elemento hijo (`xml:\"nombre\"`).",
      "keyPoints": [
        "Se importa con `import \"encoding/xml\"`.",
        "Atributos XML con etiqueta `,attr`: `xml:\"version,attr\"`.",
        "Nombre del nodo raíz mediante campo especial `XMLName xml.Name `xml:\"raiz\"``.",
        "Contenido textual interno con `,chardata`."
      ]
    },
    "interExpl": {
      "title": "Mecanismos Internos y Buenas Prácticas",
      "content": "Mapeo de Rutas Anidadas en Tags de XML:\nUna característica muy potente de `encoding/xml` es que permite aplanar o crear jerarquías anidadas directamente en el tag usando la sintaxis de barra inclinada `>`:\n```go\ntype Planta struct {\n    Nombre    string `xml:\"origen>region>nombre\"`\n}\n```\nEsto genera automáticamente los nodos intermedios `<origen><region><nombre>...</nombre></region></origen>` sin necesidad de declarar tres estructuras intermedias vacías en Go.",
      "keyPoints": [
        "Jerarquías automáticas con `>`: `xml:\"padre>hijo>nieto\"` simplifica estructuras anidadas.",
        "Cabecera estándar XML: anteponer `xml.Header` (`<?xml version=\"1.0\" encoding=\"UTF-8\"?>`) al generar documentos completos.",
        "Comentarios XML: campo con tag `xml:\",comment\"` para incrustar notas legibles en el documento."
      ]
    },
    "expertExpl": {
      "title": "Bajo Nivel, Rendimiento e Internals",
      "content": "Parseo Basado en Tokens (Token-based Streaming):\nPara archivos XML masivos (ejemplo: catálogos o volcados de datos de varios gigabytes), `xml.Unmarshal` es inviable porque intentaría cargar el archivo completo en memoria. El paquete `encoding/xml` ofrece un parser de streaming por tokens de bajísima memoria (`xml.Decoder`):\n```go\ndec := xml.NewDecoder(archivo)\nfor {\n    token, err := dec.Token()\n    // Procesa StartElement, EndElement, CharData individualmente\n}\n```\nEsto permite procesar gigabytes de XML con un consumo constante de menos de 10 MB de RAM.",
      "keyPoints": [
        "Token-based Streaming: procesamiento elemento a elemento con `dec.Token()` para archivos ilimitados.",
        "Tipos de Token nativos: `xml.StartElement`, `xml.EndElement`, `xml.CharData`, `xml.Comment`.",
        "Alineación de memoria y codificación de entidades: escapado automático de caracteres reservados (`&lt;`, `&gt;`, `&amp;`)."
      ]
    },
    "evaluation": {
      "title": "Reto: Generador de Documento XML para Facturación",
      "statement": "Define una estructura 'Factura' con atributo 'Numero' (string), un nodo 'Cliente' (string) y un nodo anidado 'Pago>Moneda' (string) y 'Pago>Monto' (float64). Serializa la factura a XML con indentación de 2 espacios y muestra el resultado con la cabecera estándar de XML.",
      "starterCode": "package main\n\nimport (\n    \"encoding/xml\"\n    \"fmt\"\n)\n\n// Define Factura con tags de atributo y jerarquía anidada\n\nfunc main() {\n    // Serializa con xml.MarshalIndent y añade xml.Header\n}",
      "hint": "Usa Numero string `xml:\"numero,attr\"` y Moneda string `xml:\"Pago>Moneda\"`.",
      "solution": "package main\n\nimport (\n    \"encoding/xml\"\n    \"fmt\"\n)\n\ntype Factura struct {\n    XMLName xml.Name `xml:\"factura\"`\n    Numero  string   `xml:\"numero,attr\"`\n    Cliente string   `xml:\"cliente\"`\n    Moneda  string   `xml:\"pago>moneda\"`\n    Monto   float64  `xml:\"pago>monto\"`\n}\n\nfunc main() {\n    f := Factura{\n        Numero:  \"FAC-2026-001\",\n        Cliente: \"Corporación Alfa\",\n        Moneda:  \"EUR\",\n        Monto:   1250.50,\n    }\n    \n    salida, err := xml.MarshalIndent(f, \"\", \"  \")\n    if err != nil {\n        panic(err)\n    }\n    \n    documentoCompleto := xml.Header + string(salida)\n    fmt.Println(documentoCompleto)\n}",
      "explanation": "El tag `xml:\"numero,attr\"` coloca el dato como un atributo dentro de la etiqueta raíz `<factura numero=\"...\">`. La sintaxis `pago>moneda` crea automáticamente el nodo intermedio `<pago>` encapsulando a `<moneda>` y `<monto>` de forma completamente limpia."
    },
    "externalLinks": [
      {
        "title": "Paquete encoding/xml (Biblioteca estándar de Go)",
        "url": "https://pkg.go.dev/encoding/xml",
        "description": "Documentación oficial del paquete de serialización XML."
      },
      {
        "title": "Go by Example Original: XML",
        "url": "https://gobyexample.com/xml",
        "description": "Ejemplo interactivo en Go by Example."
      },
      {
        "title": "Guía práctica de procesamiento XML idiomático en Go",
        "url": "https://www.callicoder.com/golang-xml-parsing-and-generation-example/",
        "description": "Guía práctica de parseo y generación de XML en Go."
      }
    ],
    "code": "// Go ofrece soporte integrado para XML y formatos afines\n// mediante el paquete `encoding/xml`.\n\npackage main\n\nimport (\n\t\"encoding/xml\"\n\t\"fmt\"\n)\n\n// Plant se mapeará a XML. De forma similar a los\n// ejemplos de JSON, las etiquetas de campo (field tags) contienen directivas para el\n// codificador y decodificador. Aquí usamos algunas características especiales\n// del paquete XML: el campo `XMLName` dicta\n// el nombre del elemento XML que representa esta estructura;\n// `id,attr` indica que el campo `Id` es un _atributo_ XML\n// en lugar de un elemento hijo anidado.\ntype Plant struct {\n\tXMLName xml.Name `xml:\"plant\"`\n\tId      int      `xml:\"id,attr\"`\n\tName    string   `xml:\"name\"`\n\tOrigin  []string `xml:\"origin\"`\n}\n\nfunc (p Plant) String() string {\n\treturn fmt.Sprintf(\"Plant id=%v, name=%v, origin=%v\",\n\t\tp.Id, p.Name, p.Origin)\n}\n\nfunc main() {\n\tcoffee := &Plant{Id: 27, Name: \"Coffee\"}\n\tcoffee.Origin = []string{\"Ethiopia\", \"Brazil\"}\n\n\t// Emitimos el XML que representa nuestra planta; usamos\n\t// `MarshalIndent` para producir una salida formateada\n\t// legible para humanos.\n\tout, _ := xml.MarshalIndent(coffee, \" \", \"  \")\n\tfmt.Println(string(out))\n\n\t// Para agregar una cabecera XML genérica a la salida, la concatenamos\n\t// explícitamente.\n\tfmt.Println(xml.Header + string(out))\n\n\t// Usa `Unmarshal` para parsear un flujo de bytes con XML\n\t// hacia una estructura de datos. Si el XML está mal formado o\n\t// no puede mapearse sobre Plant, se devolverá un error descriptivo.\n\tvar p Plant\n\tif err := xml.Unmarshal(out, &p); err != nil {\n\t\tpanic(err)\n\t}\n\tfmt.Println(p)\n\n\ttomato := &Plant{Id: 81, Name: \"Tomato\"}\n\ttomato.Origin = []string{\"Mexico\", \"California\"}\n\n\t// La etiqueta de campo `parent>child>plant` indica al codificador\n\t// que anide todas las etiquetas `plant` bajo `<parent><child>...`\n\ttype Nesting struct {\n\t\tXMLName xml.Name `xml:\"nesting\"`\n\t\tPlants  []*Plant `xml:\"parent>child>plant\"`\n\t}\n\n\tnesting := &Nesting{}\n\tnesting.Plants = []*Plant{coffee, tomato}\n\n\tout, _ = xml.MarshalIndent(nesting, \" \", \"  \")\n\tfmt.Println(string(out))\n}\n",
    "output": "$ go run xml.go\n <plant id=\"27\">\n   <name>Coffee</name>\n   <origin>Ethiopia</origin>\n   <origin>Brazil</origin>\n </plant>\n<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n <plant id=\"27\">\n   <name>Coffee</name>\n   <origin>Ethiopia</origin>\n   <origin>Brazil</origin>\n </plant>\nPlant id=27, name=Coffee, origin=[Ethiopia Brazil]\n <nesting>\n   <parent>\n     <child>\n       <plant id=\"27\">\n         <name>Coffee</name>\n         <origin>Ethiopia</origin>\n         <origin>Brazil</origin>\n       </plant>\n       <plant id=\"81\">\n         <name>Tomato</name>\n         <origin>Mexico</origin>\n         <origin>California</origin>\n       </plant>\n     </child>\n   </parent>\n </nesting>\n",
    "officialUrl": "https://gobyexample.com/xml"
  },
  {
    "id": 57,
    "slug": "time",
    "title": "Time",
    "titleEs": "Manipulación del Tiempo (time.Time y time.Duration)",
    "category": "Tiempo, Matemáticas y Criptografía",
    "categorySlug": "tiempo-cripto",
    "categoryIcon": "clock",
    "difficulty": "Principiante",
    "summary": "Gestión de fechas, horas, zonas horarias y duraciones con el paquete estándar 'time'.",
    "originalExpl": "Go ofrece un soporte extenso para tiempos y duraciones. Aquí hay algunos ejemplos de operaciones comunes con fechas y mediciones de tiempo.",
    "basicExpl": {
      "title": "Conceptos Fundamentales para Principiantes",
      "content": "Medir y manipular fechas en Go es muy intuitivo gracias al paquete `time`:\n- Obtener la hora actual: `ahora := time.Now()`.\n- Crear una fecha específica: `time.Date(2026, time.September, 25, 14, 30, 0, 0, time.UTC)`.\n- Extraer componentes: `ahora.Year()`, `ahora.Month()`, `ahora.Day()`, `ahora.Weekday()`.\n- Medir cuánto tardó algo: `duracion := time.Since(inicio)`.\n- Sumar o restar tiempo: `ahora.Add(2 * time.Hour)` o `ahora.Sub(antes)`.",
      "keyPoints": [
        "Se importa con `import \"time\"`.",
        "`time.Time`: representa un instante de tiempo absoluto en una zona horaria.",
        "`time.Duration`: representa una duración en nanosegundos (ej. `5 * time.Second`, `100 * time.Millisecond`).",
        "Comparar fechas: `t1.Before(t2)`, `t1.After(t2)`, `t1.Equal(t2)`."
      ]
    },
    "interExpl": {
      "title": "Mecanismos Internos y Buenas Prácticas",
      "content": "El Reloj Monotónico contra Cambios de Hora del Sistema (Monotonic Clock):\nEn otros lenguajes, si el sistema operativo ajusta el reloj del ordenador (por sincronización NTP o cambio de hora de verano) mientras tu programa mide una duración (`fin - inicio`), podías obtener duraciones negativas absurdas.\nDesde Go 1.9, `time.Now()` captura DOS relojes simultáneamente en una sola estructura:\n1. El reloj de pared (Wall Clock): para mostrar la hora legible al usuario.\n2. El reloj monotónico (Monotonic Clock): un contador físico de la CPU que NUNCA retrocede ni se ve afectado por ajustes horarios.\nAl calcular `t2.Sub(t1)` o `time.Since(t1)`, Go utiliza automáticamente el reloj monotónico, garantizando mediciones de tiempo 100% exactas y libres de anomalías.",
      "keyPoints": [
        "Monotonic Clocks nativos: Go 1.9+ garantiza que las mediciones de duración sean inmunes a saltos horarios de NTP.",
        "Zonas horarias con `time.LoadLocation`: permite convertir cualquier fecha a husos horarios locales (ej. `America/New_York`, `Europe/Madrid`).",
        "Constantes de tiempo tipadas: nunca uses enteros sueltos para tiempos; usa siempre el tipo `time.Duration`."
      ]
    },
    "expertExpl": {
      "title": "Bajo Nivel, Rendimiento e Internals",
      "content": "Estructura de Memoria y Syscalls VDSO (vsyscall):\nObtener la hora actual con `time.Now()` en Linux y sistemas modernos no ejecuta una costosa interrupción de llamada al sistema (syscall) al kernel del sistema operativo. En su lugar, Go utiliza las páginas VDSO (Virtual Dynamic Shared Object) mapeadas en espacio de usuario, leyendo directamente los contadores TSC (Time Stamp Counter) de la CPU en solo ~15-20 nanosegundos.\n\nLa estructura `time.Time` ocupa 24 bytes contiguos sin punteros en memoria (`wall uint64; ext int64; loc *Location`), lo que permite almacenarla en structs planos sin generar ningún trabajo para el recolector de basura.",
      "keyPoints": [
        "Aceleración VDSO: lectura de reloj sin coste de syscall al kernel del sistema operativo.",
        "Cero GC overhead: `time.Time` y `time.Duration` son valores de stack sin punteros de escape.",
        "Peligro con `==`: compara fechas siempre con `t1.Equal(t2)` en vez de `t1 == t2`, ya que `==` compara la zona horaria física y los bits monotónicos que podrían diferir."
      ]
    },
    "evaluation": {
      "title": "Reto: Calculadora de Días Restantes para Evento Futuro",
      "statement": "Escribe una función 'DiasHasta(fechaObjetivo time.Time) int' que calcule cuántos días enteros faltan desde el momento actual hasta la fecha objetivo en UTC. Comprueba la función con una fecha 10 días en el futuro.",
      "starterCode": "package main\n\nimport (\n    \"fmt\"\n    \"time\"\n)\n\nfunc DiasHasta(fechaObjetivo time.Time) int {\n    // Calcula la diferencia y devuelve días enteros\n}\n\nfunc main() {\n    // Crea una fecha a 10 días vista y calcula\n}",
      "hint": "Usa fechaObjetivo.Sub(time.Now()) y extrae las horas con duracion.Hours() dividiendo entre 24.",
      "solution": "package main\n\nimport (\n    \"fmt\"\n    \"time\"\n)\n\nfunc DiasHasta(fechaObjetivo time.Time) int {\n    ahora := time.Now()\n    diferencia := fechaObjetivo.Sub(ahora)\n    dias := int(diferencia.Hours() / 24)\n    return dias\n}\n\nfunc main() {\n    ahora := time.Now()\n    meta := ahora.AddDate(0, 0, 10) // Añade exactamente 10 días\n    \n    diasRestantes := DiasHasta(meta)\n    fmt.Printf(\"Fecha actual : %s\\n\", ahora.Format(\"02/01/2006\"))\n    fmt.Printf(\"Fecha objetivo: %s\\n\", meta.Format(\"02/01/2006\"))\n    fmt.Printf(\"Días restantes: %d días\\n\", diasRestantes)\n}",
      "explanation": "El método 'AddDate(años, meses, días)' permite avanzar calendarios respetando la cantidad variable de días de cada mes. La resta con 'Sub()' devuelve un time.Duration que puede consultarse en horas mediante 'Hours()' para calcular los días de diferencia exactos."
    },
    "externalLinks": [
      {
        "title": "Paquete time (Biblioteca estándar de Go)",
        "url": "https://pkg.go.dev/time",
        "description": "Documentación oficial del paquete de tiempo en la biblioteca estándar de Go."
      },
      {
        "title": "Blog oficial de Go: Medición precisa de intervalos con tiempo monotónico",
        "url": "https://go.dev/blog/monotonic",
        "description": "Explicación de Russ Cox sobre la incorporación de relojes monotónicos en Go 1.9."
      },
      {
        "title": "Go by Example Original: Time",
        "url": "https://gobyexample.com/time",
        "description": "Ejemplo en Go by Example."
      }
    ],
    "code": "// Go ofrece un soporte integral para el manejo de fechas, horas y duraciones;\n// aquí tenemos algunos ejemplos clave.\n\npackage main\n\nimport (\n\t\"fmt\"\n\t\"time\"\n)\n\nfunc main() {\n\tp := fmt.Println\n\n\t// Comenzaremos obteniendo la fecha y hora actual con `time.Now()`.\n\tnow := time.Now()\n\tp(now)\n\n\t// Puedes construir una estructura `time` proporcionando el\n\t// año, mes, día, etc. Las horas siempre están asociadas\n\t// a una `Location`, es decir, una zona horaria.\n\tthen := time.Date(\n\t\t2009, 11, 17, 20, 34, 58, 651387237, time.UTC)\n\tp(then)\n\n\t// Puedes extraer los diversos componentes del valor de tiempo\n\t// según se espera.\n\tp(then.Year())\n\tp(then.Month())\n\tp(then.Day())\n\tp(then.Hour())\n\tp(then.Minute())\n\tp(then.Second())\n\tp(then.Nanosecond())\n\tp(then.Location())\n\n\t// El día de la semana `Weekday` (de lunes a domingo) también está disponible.\n\tp(then.Weekday())\n\n\t// Estos métodos comparan dos instantes temporales, evaluando si el\n\t// primero ocurre antes, después o al mismo tiempo exacto\n\t// que el segundo, respectivamente.\n\tp(then.Before(now))\n\tp(then.After(now))\n\tp(then.Equal(now))\n\n\t// El método `Sub` devuelve una estructura `Duration` que representa\n\t// el intervalo de tiempo entre dos instantes.\n\tdiff := now.Sub(then)\n\tp(diff)\n\n\t// Podemos calcular la longitud de la duración en\n\t// diversas unidades temporales.\n\tp(diff.Hours())\n\tp(diff.Minutes())\n\tp(diff.Seconds())\n\tp(diff.Nanoseconds())\n\n\t// Puedes usar `Add` para avanzar un instante de tiempo según una\n\t// duración dada, o con un `-` para retroceder en el tiempo.\n\tp(then.Add(diff))\n\tp(then.Add(-diff))\n}\n",
    "output": "$ go run time.go\n2012-10-31 15:50:13.793654 +0000 UTC\n2009-11-17 20:34:58.651387237 +0000 UTC\n2009\nNovember\n17\n20\n34\n58\n651387237\nUTC\nTuesday\ntrue\nfalse\nfalse\n25891h15m15.142266763s\n25891.25420618521\n1.5534752523711128e+06\n9.320851514226677e+07\n93208515142266763\n2012-10-31 15:50:13.793654 +0000 UTC\n2006-12-05 01:19:43.509120474 +0000 UTC\n\n# A continuación veremos el concepto estrechamente relacionado del tiempo relativo a\n# la época Unix (Unix epoch).\n",
    "officialUrl": "https://gobyexample.com/time"
  },
  {
    "id": 58,
    "slug": "epoch",
    "title": "Epoch",
    "titleEs": "Época Unix (Timestamps en Segundos y Nanosegundos)",
    "category": "Tiempo, Matemáticas y Criptografía",
    "categorySlug": "tiempo-cripto",
    "categoryIcon": "clock",
    "difficulty": "Principiante",
    "summary": "Conversión bidireccional entre fechas de Go y marcas de tiempo Unix Epoch (segundos, milisegundos y nanosegundos desde 1970).",
    "originalExpl": "Un requerimiento común en programas es obtener el número de segundos, milisegundos o nanosegundos desde la Época Unix (1 de enero de 1970 UTC).",
    "basicExpl": {
      "title": "Conceptos Fundamentales para Principiantes",
      "content": "La 'Época Unix' (Epoch) es el estándar que usan todas las computadoras del mundo para medir el tiempo: cuenta cuántos segundos han pasado desde la medianoche del 1 de enero de 1970 (UTC):\n- Obtener segundos Unix actuales: `time.Now().Unix()`.\n- Obtener milisegundos: `time.Now().UnixMilli()`.\n- Obtener nanosegundos: `time.Now().UnixNano()`.\n- Reconvertir un número Unix a fecha Go normal: `time.Unix(segundos, nanosegundos)`.",
      "keyPoints": [
        "`t.Unix()`: devuelve segundos transcurridos como `int64`.",
        "`t.UnixMilli()` (Go 1.17+): milisegundos transcurridos (útil para APIs de JavaScript).",
        "`time.Unix(sec, nsec)`: reconstruye la estructura `time.Time` correspondiente."
      ]
    },
    "interExpl": {
      "title": "Mecanismos Internos y Buenas Prácticas",
      "content": "Compatibilidad con Bases de Datos y el Problema del Año 2038 (Y2038):\nEn sistemas antiguos de 32 bits, los timestamps Unix se almacenaban en enteros con signo de 32 bits, lo que provocará que el 19 de enero de 2038 el contador desborde en números negativos.\nEn Go, `t.Unix()` devuelve siempre un entero de 64 bits (`int64`). Un timestamp de 64 bits durará aproximadamente 292 mil millones de años, haciendo que el código Go sea completamente inmune al problema del año 2038.\n\nEs el formato ideal para almacenar marcas de tiempo en bases de datos NoSQL, Redis o tokens JWT de autenticación (`exp` y `iat`).",
      "keyPoints": [
        "Enteros de 64 bits seguros: Go usa `int64` evitando el bug del año 2038.",
        "Tokens JWT: estándar para campos `exp` (expiración) e `iat` (emitido en).",
        "Interoperabilidad universal: el formato más ligero y compatible para compartir tiempo entre microservicios de diferentes lenguajes."
      ]
    },
    "expertExpl": {
      "title": "Bajo Nivel, Rendimiento e Internals",
      "content": "Descarte de Bits Monotónicos al Convertir a Epoch:\nCuando llamas a `t.Unix()`, `t.UnixMilli()` o `t.UnixNano()`, Go extrae únicamente el tiempo absoluto de pared (Wall Time) y descarta los metadatos del reloj monotónico. Si luego reconstruyes el tiempo con `time.Unix(s, 0)`, la nueva instancia `time.Time` carece de reloj monotónico.\n\nPor tanto, restar dos fechas reconstruidas desde la base de datos medirá el tiempo de reloj de pared, no el monotónico de CPU. Para forzar el descarte intencionado del reloj monotónico en una variable de tiempo (útil antes de serializaciones o comparaciones profundas con `reflect.DeepEqual`), se utiliza el modismo oficial `t = t.Truncate(0)` o `t = t.Round(0)`.",
      "keyPoints": [
        "Strip monotonic clock: convertir a Epoch elimina la referencia monotónica de hardware.",
        "Modismo `t.Truncate(0)`: técnica estándar para remover los bits monotónicos sin alterar la fecha.",
        "Precisión a nivel de nanosegundo: `UnixNano()` ofrece la máxima resolución disponible en el silicio de la máquina."
      ]
    },
    "evaluation": {
      "title": "Reto: Generador y Validador de Token con Expiración Unix",
      "statement": "Escribe una función 'GenerarExpiracion(segundosValidez int) int64' que devuelva el timestamp Unix en segundos en que vencerá un token. Luego escribe 'TokenExpirado(expUnix int64) bool' que compare el timestamp con el momento actual y determine si ya venció.",
      "starterCode": "package main\n\nimport (\n    \"fmt\"\n    \"time\"\n)\n\n// Implementa GenerarExpiracion y TokenExpirado\n\nfunc main() {\n    // Genera un token que venza en 2 segundos\n    // Comprueba su estado inmediato y tras 3 segundos de espera\n}",
      "hint": "GenerarExpiracion: time.Now().Add(time.Duration(segundosValidez)*time.Second).Unix(). TokenExpirado: time.Now().Unix() > expUnix.",
      "solution": "package main\n\nimport (\n    \"fmt\"\n    \"time\"\n)\n\nfunc GenerarExpiracion(segundosValidez int) int64 {\n    return time.Now().Add(time.Duration(segundosValidez) * time.Second).Unix()\n}\n\nfunc TokenExpirado(expUnix int64) bool {\n    return time.Now().Unix() > expUnix\n}\n\nfunc main() {\n    // Token válido por solo 1 segundo\n    expiracion := GenerarExpiracion(1)\n    fmt.Printf(\"Token generado con expiración Unix: %d\\n\", expiracion)\n    \n    fmt.Println(\"¿Expirado al instante?:\", TokenExpirado(expiracion))\n    \n    fmt.Println(\"Esperando 1.5 segundos...\")\n    time.Sleep(1500 * time.Millisecond)\n    \n    fmt.Println(\"¿Expirado tras la espera?:\", TokenExpirado(expiracion))\n}",
      "explanation": "Los timestamps Unix son extremadamente eficientes para validar sesiones y tokens JWT: una simple comparación de enteros (`ahora > expiracion`) determina de forma instantánea si el token sigue vigente sin complejas operaciones de fechas."
    },
    "externalLinks": [
      {
        "title": "Paquete time: Unix functions",
        "url": "https://pkg.go.dev/time#Unix",
        "description": "Documentación oficial de las funciones Unix, UnixMilli y UnixMicro."
      },
      {
        "title": "Go by Example Original: Epoch",
        "url": "https://gobyexample.com/epoch",
        "description": "Ejemplo en Go by Example."
      },
      {
        "title": "Wikipedia: El tiempo Unix y el problema del año 2038",
        "url": "https://en.wikipedia.org/wiki/Year_2038_problem",
        "description": "Explicación del problema del año 2038 resuelto en Go con enteros int64."
      }
    ],
    "code": "// Un requerimiento frecuente en desarrollo de software es obtener el número\n// de segundos, milisegundos o nanosegundos transcurridos desde la\n// [época Unix](https://en.wikipedia.org/wiki/Unix_time) (1 de enero de 1970).\n// Así es como se realiza en Go.\n\npackage main\n\nimport (\n\t\"fmt\"\n\t\"time\"\n)\n\nfunc main() {\n\n\t// Usa `time.Now` junto con `Unix`, `UnixMilli` o `UnixNano`\n\t// para obtener el tiempo transcurrido desde la época Unix en segundos,\n\t// milisegundos o nanosegundos, respectivamente.\n\tnow := time.Now()\n\tfmt.Println(now)\n\n\tfmt.Println(now.Unix())\n\tfmt.Println(now.UnixMilli())\n\tfmt.Println(now.UnixNano())\n\n\t// También puedes convertir enteros de segundos o nanosegundos\n\t// transcurridos desde la época al valor `time.Time` correspondiente.\n\tfmt.Println(time.Unix(now.Unix(), 0))\n\tfmt.Println(time.Unix(0, now.UnixNano()))\n}\n",
    "output": "$ go run epoch.go \n2012-10-31 16:13:58.292387 +0000 UTC\n1351700038\n1351700038292\n1351700038292387000\n2012-10-31 16:13:58 +0000 UTC\n2012-10-31 16:13:58.292387 +0000 UTC\n\n# A continuación veremos otra tarea clave vinculada al tiempo: el\n# formateo y parseo de fechas y horas.\n",
    "officialUrl": "https://gobyexample.com/epoch"
  },
  {
    "id": 59,
    "slug": "time-formatting-parsing",
    "title": "Time Formatting / Parsing",
    "titleEs": "Formateo y Parseo de Fechas (La Fecha de Referencia)",
    "category": "Tiempo, Matemáticas y Criptografía",
    "categorySlug": "tiempo-cripto",
    "categoryIcon": "clock",
    "difficulty": "Intermedio",
    "summary": "El singular sistema de formateo de fechas de Go basado en la fecha mnemotécnica de referencia 'Mon Jan 2 15:04:05 MST 2006'.",
    "originalExpl": "Go enfatiza el formateo y parseo de tiempo basado en ejemplos mnemotécnicos en lugar de los comodines clásicos como %Y-%m-%d. El patrón debe usar la fecha de referencia específica de Go: Mon Jan 2 15:04:05 MST 2006.",
    "basicExpl": {
      "title": "Conceptos Fundamentales para Principiantes",
      "content": "En casi todos los lenguajes tienes que memorizar letras crípticas como `%Y-%m-%d %H:%M:%S`.\nLos creadores de Go inventaron algo mucho más visual: una 'Fecha de Referencia Mágica':\n`Lunes 02 de Enero de 2006 a las 15:04:05 (zona horaria -0700)`.\nPara recordar los números, fíjate en la secuencia ordenada: 1, 2, 3, 4, 5, 6, 7:\n- 1: Mes (Enero / Jan / 01)\n- 2: Día del mes (02)\n- 3: Hora en formato 12h (03 o 15 para 24h)\n- 4: Minuto (04)\n- 5: Segundo (05)\n- 6: Año (2006)\n- 7: Zona horaria (-0700)\nSi quieres formatear como 'Año-Mes-Día', simplemente escribes el patrón: `\"2006-01-02\"`.",
      "keyPoints": [
        "Fecha mnemotécnica mágica: `2006-01-02 15:04:05` (orden 1, 2, 3, 4, 5, 6).",
        "Formatear (Fecha -> String): `t.Format(\"2006-01-02\")`.",
        "Parsear (String -> Fecha): `time.Parse(\"2006-01-02\", \"2026-09-25\")`.",
        "Constantes predefinidas: `time.RFC3339`, `time.RFC1123`, `time.DateOnly` (Go 1.20+)."
      ]
    },
    "interExpl": {
      "title": "Mecanismos Internos y Buenas Prácticas",
      "content": "Constantes estándar modernas en Go 1.20+:\nPara ahorrar tiempo y evitar errores tipográficos en los patrones más comunes, Go 1.20 introdujo constantes listas para usar:\n- `time.DateOnly` = `\"2006-01-02\"`\n- `time.TimeOnly` = `\"15:04:05\"`\n- `time.DateTime` = `\"2006-01-02 15:04:05\"`\n- `time.RFC3339` = el estándar oficial para APIs JSON en internet.\n\nCuidado con las zonas horarias en `time.Parse`: `time.Parse` asume siempre la zona horaria UTC si no se especifica. Si quieres parsear una fecha en la zona horaria local del servidor o usuario, debes usar `time.ParseInLocation(patron, valor, time.Local)`.",
      "keyPoints": [
        "Constantes modernas: `time.DateOnly`, `time.TimeOnly`, `time.DateTime` (Go 1.20+).",
        "`time.ParseInLocation`: indispensable para interpretar fechas en la zona horaria local sin desfases UTC.",
        "Milésimas y microsegundos: usar `.000` (relleno con ceros) o `.999` (omite ceros finales sobrantes)."
      ]
    },
    "expertExpl": {
      "title": "Bajo Nivel, Rendimiento e Internals",
      "content": "El Compilador de Formato y Zero-Allocations con `AppendFormat`:\nLa función `t.Format(layout)` analiza la cadena de patrón caracter por caracter en tiempo de ejecución, lo que requiere asignar un nuevo string en el heap.\nEn aplicaciones de alto rendimiento (motores de logging o routers web de alta concurrencia), se utiliza el método de cero asignaciones `t.AppendFormat(buffer, layout)`:\n```go\nvar buf [64]byte\nb := t.AppendFormat(buf[:0], time.RFC3339)\n```\nEsto añade la fecha formateada directamente en un búfer preasignado en el stack sin requerir NINGUNA asignación de memoria en el Heap (0 B/op).",
      "keyPoints": [
        "Zero-Allocation Formatting: `t.AppendFormat` formatea directamente sobre slices de bytes preexistentes.",
        "Fast-path para RFC3339: la biblioteca estándar incluye código ensamblador optimizado específicamente para el formato RFC3339.",
        "Parsing determinista: el motor de parseo no requiere expresiones regulares; escanea caracteres directamente en código nativo."
      ]
    },
    "evaluation": {
      "title": "Reto: Parseo de Fechas de Logs y Conversión a RFC3339",
      "statement": "Un archivo de log registra eventos con el formato personalizado '25/09/2026 14:30:15'. Escribe una función 'ConvertirFechaLog(fechaTexto string) (string, error)' que parsee esa cadena y la devuelva formateada en el estándar internacional time.RFC3339 en UTC.",
      "starterCode": "package main\n\nimport (\n    \"fmt\"\n    \"time\"\n)\n\nfunc ConvertirFechaLog(fechaTexto string) (string, error) {\n    // Parsea con el patrón correspondiente y formatea en time.RFC3339\n}\n\nfunc main() {\n    entrada := \"25/09/2026 14:30:15\"\n    // Convierte e imprime\n}",
      "hint": "El patrón correspondiente a '25/09/2026 14:30:15' es '02/01/2006 15:04:05'.",
      "solution": "package main\n\nimport (\n    \"fmt\"\n    \"time\"\n)\n\nfunc ConvertirFechaLog(fechaTexto string) (string, error) {\n    patronOrigen := \"02/01/2006 15:04:05\"\n    t, err := time.Parse(patronOrigen, fechaTexto)\n    if err != nil {\n        return \"\", fmt.Errorf(\"error al parsear fecha de log: %w\", err)\n    }\n    return t.UTC().Format(time.RFC3339), nil\n}\n\nfunc main() {\n    entrada := \"25/09/2026 14:30:15\"\n    resultado, err := ConvertirFechaLog(entrada)\n    if err != nil {\n        fmt.Println(\"Fallo:\", err)\n        return\n    }\n    fmt.Println(\"Fecha original :\", entrada)\n    fmt.Println(\"Formato RFC3339:\", resultado)\n}",
      "explanation": "Al usar el patrón de referencia '02/01/2006 15:04:05', time.Parse extrae con precisión matemática el día, mes, año y hora. Luego, 't.UTC().Format(time.RFC3339)' genera la cadena universal compatible con cualquier API moderna."
    },
    "externalLinks": [
      {
        "title": "Paquete time: Constants and Format layout",
        "url": "https://pkg.go.dev/time#pkg-constants",
        "description": "Explicación de la fecha de referencia 2006-01-02 en la documentación oficial."
      },
      {
        "title": "Go by Example Original: Time Formatting / Parsing",
        "url": "https://gobyexample.com/time-formatting-parsing",
        "description": "Ejemplo en Go by Example."
      },
      {
        "title": "GopherAcademy: El origen mnemotécnico de la fecha de referencia en Go",
        "url": "https://blog.gopheracademy.com/advent-2017/time-formatting/",
        "description": "Historia y diseño de la fecha mnemotécnica 1 2 3 4 5 6 7 en Go."
      }
    ],
    "code": "// Go admite el formateo y parseo de tiempo mediante diseños\n// (layouts) basados en ejemplos mnemotécnicos.\n\npackage main\n\nimport (\n\t\"fmt\"\n\t\"time\"\n)\n\nfunc main() {\n\tp := fmt.Println\n\n\t// Aquí tenemos un ejemplo básico de cómo formatear una hora\n\t// según la norma RFC3339, usando la constante de diseño\n\t// correspondiente.\n\tt := time.Now()\n\tp(t.Format(time.RFC3339))\n\n\t// El parseo de fechas utiliza los mismos valores de diseño que `Format`.\n\tt1, _ := time.Parse(time.RFC3339, \"2012-11-01T22:08:41+00:00\")\n\tp(t1)\n\n\t// `Format` y `Parse` emplean formatos basados en ejemplos. Habitualmente\n\t// usarás una constante de `time` para estos formatos, pero\n\t// también puedes proporcionar patrones personalizados. Los formatos deben basarse en la\n\t// fecha de referencia canónica `Mon Jan 2 15:04:05 MST 2006` para indicar\n\t// el patrón con el cual formatear/parsear una fecha/cadena dada.\n\t// La fecha de ejemplo debe coincidir con dicha referencia: el año 2006,\n\t// 15 para la hora, lunes (Mon) para el día de la semana, etc.\n\tp(t.Format(\"3:04PM\"))\n\tp(t.Format(\"Mon Jan _2 15:04:05 2006\"))\n\tp(t.Format(\"2006-01-02T15:04:05.999999-07:00\"))\n\tform := \"3 04 PM\"\n\tt2, _ := time.Parse(form, \"8 41 PM\")\n\tp(t2)\n\n\t// Para representaciones puramente numéricas también puedes\n\t// usar formateo de cadenas estándar extrayendo los componentes\n\t// individuales del valor de tiempo.\n\tfmt.Printf(\"%d-%02d-%02dT%02d:%02d:%02d-00:00\\n\",\n\t\tt.Year(), t.Month(), t.Day(),\n\t\tt.Hour(), t.Minute(), t.Second())\n\n\t// `Parse` devolverá un error descriptivo ante una entrada mal formada,\n\t// explicando con exactitud el problema de parseo.\n\t_, err := time.Parse(\"Mon Jan _2 15:04:05 2006\", \"8:41PM\")\n\tp(err)\n}\n",
    "output": "$ go run time-formatting-parsing.go \n2014-04-15T18:00:15-07:00\n2012-11-01 22:08:41 +0000 +0000\n6:00PM\nTue Apr 15 18:00:15 2014\n2014-04-15T18:00:15.161182-07:00\n0000-01-01 20:41:00 +0000 UTC\n2014-04-15T18:00:15-00:00\nparsing time \"8:41PM\" as \"Mon Jan _2 15:04:05 2006\": ...\n",
    "officialUrl": "https://gobyexample.com/time-formatting-parsing"
  },
  {
    "id": 60,
    "slug": "random-numbers",
    "title": "Random Numbers",
    "titleEs": "Números Pseudoaleatorios (math/rand y math/rand/v2)",
    "category": "Tiempo, Matemáticas y Criptografía",
    "categorySlug": "tiempo-cripto",
    "categoryIcon": "clock",
    "difficulty": "Intermedio",
    "summary": "Generación de números aleatorios para simulaciones con 'math/rand' y el moderno paquete 'math/rand/v2' de Go 1.22+.",
    "originalExpl": "El paquete math/rand de Go proporciona generación de números pseudoaleatorios. En Go 1.22 se introdujo math/rand/v2 con algoritmos más modernos y rápidos y soporte nativo para genéricos.",
    "basicExpl": {
      "title": "Conceptos Fundamentales para Principiantes",
      "content": "Para crear dados, juegos o simulaciones necesitas números aleatorios:\n- En Go 1.22+ se usa `math/rand/v2`:\n- Número entero aleatorio entre 0 y N-1: `rand.IntN(100)` (de 0 a 99).\n- Número flotante entre 0.0 y 1.0: `rand.Float64()`.\n- ¡Cuidado!: `math/rand` genera números 'pseudoaleatorios' matemáticos. Son geniales para videojuegos o pruebas, pero NUNCA deben usarse para contraseñas, tokens de seguridad o criptografía (para seguridad se usa `crypto/rand`).",
      "keyPoints": [
        "Nuevo paquete estándar en Go 1.22: `import \"math/rand/v2\"`.",
        "`rand.IntN(n)` genera números enteros en el rango `[0, n)`.",
        "Auto-inicializado: ya no es necesario configurar manualmente una semilla con `rand.Seed(time.Now().UnixNano())`.",
        "No apto para seguridad: usar `crypto/rand` para claves y tokens criptográficos."
      ]
    },
    "interExpl": {
      "title": "Mecanismos Internos y Buenas Prácticas",
      "content": "Novedades de `math/rand/v2` (Go 1.22+):\nEl paquete `math/rand/v2` es el primer paquete 'v2' en la biblioteca estándar de Go y resolvió problemas históricos:\n1. Reemplazó el generador antiguo por los algoritmos modernos PCG (`PCG-DXSM`) y ChaCha8, que son considerablemente más rápidos y estadísticamente superiores.\n2. Se renombró la función confusa `Intn(n)` a `IntN(n)` y soporta genéricos: `rand.N(duracion)` funciona directamente con tipos personalizados como `time.Duration`.\n3. Eliminación del generador global bloqueado por mutex: el generador por defecto utiliza fuentes por hilo sin contención de bloqueos.",
      "keyPoints": [
        "Algoritmos modernos PCG y ChaCha8: mayor entropía y velocidad sin sesgos estadísticos.",
        "Genérico `rand.N(t)`: permite generar duraciones aleatorias: `rand.N(5 * time.Second)`.",
        "Concurrencia sin locks: las funciones globales de rand/v2 no sufren contención de mutex entre goroutines."
      ]
    },
    "expertExpl": {
      "title": "Bajo Nivel, Rendimiento e Internals",
      "content": "Algoritmo Lemire para Reducción de Rango sin Sesgo (Bias-free Range Reduction):\nHistóricamente, para obtener un número entre 0 y N se usaba el operador módulo `rand.Uint64() % N`. Esto introduce un 'sesgo de módulo' (Modulo Bias) que hace que ciertos números tengan mayor probabilidad matemática de aparecer si el espacio de 64 bits no es un múltiplo exacto de N.\n\nEn `math/rand/v2`, Go implementó el algoritmo de Daniel Lemire (Fast Random Integer in an Interval): utiliza una multiplicación de enteros de 128 bits sin divisiones de hardware en la CPU, garantizando una distribución estadística perfectamente uniforme sin sesgo y duplicando la velocidad frente a la operación de división.",
      "keyPoints": [
        "Algoritmo de Daniel Lemire: eliminación de sesgo de módulo mediante aritmética de 128 bits de hardware.",
        "Zero modulo division: evita la costosa instrucción `DIV` de la CPU.",
        "Generador ChaCha8 criptográficamente fuerte pero determinista: permite reproducibilidad de pruebas mediante semillas explícitas."
      ]
    },
    "evaluation": {
      "title": "Reto: Barajador de Cartas Aleatorio (Fisher-Yates Shuffle)",
      "statement": "Escribe una función 'Barajar(elementos []string)' que desordene aleatoriamente un slice de elementos in-place utilizando el algoritmo canónico de Fisher-Yates con rand.IntN.",
      "starterCode": "package main\n\nimport (\n    \"fmt\"\n    \"math/rand/v2\"\n)\n\nfunc Barajar(elementos []string) {\n    // Implementa el algoritmo de Fisher-Yates\n}\n\nfunc main() {\n    baraja := []string{\"As\", \"Rey\", \"Reina\", \"Jota\", \"Diez\"}\n    Barajar(baraja)\n    fmt.Println(\"Barajado:\", baraja)\n}",
      "hint": "Recorre desde i := len-1 hasta 1. Elige j := rand.IntN(i + 1) e intercambia elementos[i], elementos[j].",
      "solution": "package main\n\nimport (\n    \"fmt\"\n    \"math/rand/v2\"\n)\n\nfunc Barajar(elementos []string) {\n    for i := len(elementos) - 1; i > 0; i-- {\n        // Selecciona un índice aleatorio entre 0 e i inclusive\n        j := rand.IntN(i + 1)\n        elementos[i], elementos[j] = elementos[j], elementos[i]\n    }\n}\n\nfunc main() {\n    baraja := []string{\"As de Picas\", \"Rey de Corazones\", \"Reina de Diamantes\", \"Jota de Tréboles\", \"10 de Picas\"}\n    fmt.Println(\"Baraja original :\", baraja)\n    \n    Barajar(baraja)\n    fmt.Println(\"Baraja mezclada  :\", baraja)\n}",
      "explanation": "El algoritmo de Fisher-Yates garantiza una permutación matemáticamente equiprobable (todas las combinaciones tienen la misma probabilidad exacta). Al usar 'rand.IntN(i + 1)' de math/rand/v2, se realiza el intercambio in-place con la máxima eficiencia."
    },
    "externalLinks": [
      {
        "title": "Blog oficial de Go: Modernización del generador de números aleatorios en Go 1.22",
        "url": "https://go.dev/blog/randv2",
        "description": "Artículo oficial de Russ Cox explicando las mejoras y arquitectura de math/rand/v2."
      },
      {
        "title": "Paquete math/rand/v2 (Documentación oficial)",
        "url": "https://pkg.go.dev/math/rand/v2",
        "description": "Documentación oficial del paquete math/rand/v2 de la biblioteca estándar."
      },
      {
        "title": "Go by Example Original: Random Numbers",
        "url": "https://gobyexample.com/random-numbers",
        "description": "Ejemplo en Go by Example."
      }
    ],
    "code": "// El paquete `math/rand/v2` de Go proporciona generación de\n// [números pseudoaleatorios](https://en.wikipedia.org/wiki/Pseudorandom_number_generator).\n\npackage main\n\nimport (\n\t\"fmt\"\n\t\"math/rand/v2\"\n)\n\nfunc main() {\n\n\t// Por ejemplo, `rand.IntN` devuelve un entero aleatorio `n`,\n\t// donde `0 <= n < 100`.\n\tfmt.Print(rand.IntN(100), \",\")\n\tfmt.Print(rand.IntN(100))\n\tfmt.Println()\n\n\t// `rand.Float64` devuelve un flotante `f` de tipo `float64`,\n\t// tal que `0.0 <= f < 1.0`.\n\tfmt.Println(rand.Float64())\n\n\t// Esto puede emplearse para generar números flotantes aleatorios en\n\t// otros rangos, por ejemplo `5.0 <= f' < 10.0`.\n\tfmt.Print((rand.Float64()*5)+5, \",\")\n\tfmt.Print((rand.Float64() * 5) + 5)\n\tfmt.Println()\n\n\t// Si deseas una semilla fija predecible, crea un nuevo\n\t// `rand.Source` y pásalo al constructor `New`. `NewPCG` genera una nueva\n\t// fuente [PCG](https://en.wikipedia.org/wiki/Permuted_congruential_generator)\n\t// que requiere una semilla compuesta por dos números `uint64`.\n\ts2 := rand.NewPCG(42, 1024)\n\tr2 := rand.New(s2)\n\tfmt.Print(r2.IntN(100), \",\")\n\tfmt.Print(r2.IntN(100))\n\tfmt.Println()\n\n\ts3 := rand.NewPCG(42, 1024)\n\tr3 := rand.New(s3)\n\tfmt.Print(r3.IntN(100), \",\")\n\tfmt.Print(r3.IntN(100))\n\tfmt.Println()\n}\n",
    "output": "# Algunos de los números generados pueden diferir\n# cuando ejecutes el ejemplo.\n$ go run random-numbers.go\n68,56\n0.8090228139659177\n5.840125017402497,6.937056298890035\n94,49\n94,49\n\n# Consulta la documentación del paquete [`math/rand/v2`](https://pkg.go.dev/math/rand/v2)\n# para obtener información detallada sobre otras distribuciones y funciones\n# aleatorias que ofrece Go.\n",
    "officialUrl": "https://gobyexample.com/random-numbers"
  },
  {
    "id": 61,
    "slug": "number-parsing",
    "title": "Number Parsing",
    "titleEs": "Conversión y Parseo de Números (strconv)",
    "category": "Tiempo, Matemáticas y Criptografía",
    "categorySlug": "tiempo-cripto",
    "categoryIcon": "clock",
    "difficulty": "Principiante",
    "summary": "Conversión segura y precisa entre cadenas de texto y valores numéricos con el paquete nativo 'strconv'.",
    "originalExpl": "Parsear números desde cadenas de texto es una tarea básica pero común en muchos programas. El paquete integrado strconv proporciona funciones para este propósito.",
    "basicExpl": {
      "title": "Conceptos Fundamentales para Principiantes",
      "content": "Cuando un usuario escribe '123' en un formulario o lo recibes de una API web, para la computadora eso es texto (un string), no un número con el que puedas hacer sumas.\nEl paquete oficial `strconv` (String Conversion) hace la traducción:\n- Texto a entero simple: `num, err := strconv.Atoi(\"123\")` (Atoi significa 'ASCII to Integer').\n- Entero a texto simple: `texto := strconv.Itoa(123)` (Itoa significa 'Integer to ASCII').\n- Texto a flotante con decimales: `f, err := strconv.ParseFloat(\"3.1416\", 64)`.\n- Texto a booleano: `b, err := strconv.ParseBool(\"true\")` (entiende 'true', 'false', '1', '0', 't', 'f').",
      "keyPoints": [
        "Se importa con `import \"strconv\"`.",
        "`strconv.Atoi(s)` y `strconv.Itoa(i)` son los atajos más usados para enteros base 10.",
        "Devuelve siempre un `error` que debes comprobar por si el texto contenía letras no numéricas.",
        "`strconv.ParseInt(s, base, bitSize)` permite parsear bases binarias (2), octales (8) o hexadecimales (16)."
      ]
    },
    "interExpl": {
      "title": "Mecanismos Internos y Buenas Prácticas",
      "content": "Control de desbordamiento (Overflow Detection) y bases numéricas:\n`strconv.ParseInt` y `strconv.ParseUint` validan rigurosamente que el número quepa dentro del tamaño de bits especificado:\n```go\n// Intenta parsear un número de 8 bits (máximo 127)\nval, err := strconv.ParseInt(\"500\", 10, 8)\n```\nSi el número supera el límite, Go devuelve el valor máximo posible truncado y un error tipado de desbordamiento: `strconv.ErrRange`.\nSi el formato es inválido (ejemplo: '12a4'), devuelve `strconv.ErrSyntax`. Puedes comprobar ambos con `errors.Is(err, strconv.ErrRange)`.",
      "keyPoints": [
        "Detección de desbordamiento: reporta errores claros `ErrRange` si el número excede el tipo.",
        "Soporte de prefijos automáticos: si pasas base 0 a ParseInt, Go detecta automáticamente prefijos '0x' (hexadecimal), '0b' (binario) u '0o' (octal).",
        "Constantes de bitSize: usar 0 para el tamaño nativo de la máquina, o 8, 16, 32, 64 explícitamente."
      ]
    },
    "expertExpl": {
      "title": "Bajo Nivel, Rendimiento e Internals",
      "content": "Algoritmos de Punto Flotante Eisel-Lemire y Ryu en Go:\nParsear cadenas a números de punto flotante (`strconv.ParseFloat`) con precisión de bit exacta respecto a la norma IEEE-754 es uno de los problemas más complejos de la informática.\n\nDesde Go 1.16, Go implementa el algoritmo Eisel-Lemire: realiza el parseo de casi el 99% de los números flotantes utilizando aritmética entera ultra-rápida de 64 y 128 bits sin acudir a números de coma flotante de software pesado. Solo si el número cae en un caso límite extremadamente raro, acude al algoritmo clásico de bignum de precisión múltiple. Esto convirtió a `strconv.ParseFloat` en uno de los parsers de flotantes más rápidos del mundo.",
      "keyPoints": [
        "Algoritmo Eisel-Lemire: parseo flotante con aritmética entera SIMD de alta velocidad.",
        "Garantía IEEE-754: redondeo exacto al bit más cercano sin pérdida de precisión decimal.",
        "Zero allocations con `AppendInt/AppendFloat`: permite formatear números sobre búferes existentes sin tocar el Heap."
      ]
    },
    "evaluation": {
      "title": "Reto: Validador y Sumador de Lista de Precios en Texto",
      "statement": "Escribe una función 'SumarPrecios(preciosTexto []string) (float64, int, error)' que reciba un slice de cadenas de texto (ej. [\"19.99\", \"5.50\", \"invalido\", \"10.00\"]). Debe sumar todos los números válidos y devolver la suma total, cuántos elementos fueron válidos y un error si algún elemento no pudo parsearse.",
      "starterCode": "package main\n\nimport (\n    \"fmt\"\n    \"strconv\"\n)\n\nfunc SumarPrecios(preciosTexto []string) (float64, int, error) {\n    // Parsea cada elemento con ParseFloat\n}\n\nfunc main() {\n    lista := []string{\"12.50\", \"20.00\", \"7.45\"}\n    // Prueba con la lista\n}",
      "hint": "Usa strconv.ParseFloat(p, 64).",
      "solution": "package main\n\nimport (\n    \"fmt\"\n    \"strconv\"\n)\n\nfunc SumarPrecios(preciosTexto []string) (float64, int, error) {\n    total := 0.0\n    validos := 0\n    \n    for _, p := range preciosTexto {\n        valor, err := strconv.ParseFloat(p, 64)\n        if err != nil {\n            return total, validos, fmt.Errorf(\"precio inválido '%s': %w\", p, err)\n        }\n        total += valor\n        validos++\n    }\n    return total, validos, nil\n}\n\nfunc main() {\n    listaValida := []string{\"12.50\", \"20.00\", \"7.45\"}\n    total, cant, err := SumarPrecios(listaValida)\n    if err != nil {\n        fmt.Println(\"Error:\", err)\n        return\n    }\n    fmt.Printf(\"Total procesado: $%.2f (%d productos)\\n\", total, cant)\n    \n    listaInvalida := []string{\"15.00\", \"gratis\", \"10.00\"}\n    _, _, err2 := SumarPrecios(listaInvalida)\n    fmt.Println(\"Resultado con datos corruptos:\", err2)\n}",
      "explanation": "La función strconv.ParseFloat(p, 64) valida y convierte de forma segura cada representación textual en un float64 real. Si alguna entrada contiene caracteres no numéricos ('gratis'), devuelve un error explícito protegiendo los cálculos financieros de la aplicación."
    },
    "externalLinks": [
      {
        "title": "Paquete strconv (Biblioteca estándar de Go)",
        "url": "https://pkg.go.dev/strconv",
        "description": "Documentación oficial del paquete strconv con todas las funciones de conversión."
      },
      {
        "title": "Go by Example Original: Number Parsing",
        "url": "https://gobyexample.com/number-parsing",
        "description": "Ejemplo en Go by Example."
      },
      {
        "title": "Daniel Lemire: Conversión y procesamiento ultrarrápido de números en Go",
        "url": "https://lemire.me/blog/",
        "description": "Artículo de investigación sobre los algoritmos de parseo de enteros y flotantes adoptados en Go."
      }
    ],
    "code": "// El parseo de números a partir de cadenas de texto es una tarea básica pero frecuente\n// en muchos programas; aquí veremos cómo llevarla a cabo en Go.\n\npackage main\n\n// El paquete integrado `strconv` provee las funciones para\n// parsear números.\nimport (\n\t\"fmt\"\n\t\"strconv\"\n)\n\nfunc main() {\n\n\t// Con `ParseFloat`, este `64` indica cuántos bits de\n\t// precisión se deben utilizar para el parseo.\n\tf, _ := strconv.ParseFloat(\"1.234\", 64)\n\tfmt.Println(f)\n\n\t// Para `ParseInt`, el `0` indica inferir la base numérica a partir\n\t// de la cadena. `64` exige que el resultado quepa en 64\n\t// bits.\n\ti, _ := strconv.ParseInt(\"123\", 0, 64)\n\tfmt.Println(i)\n\n\t// `ParseInt` reconocerá números con formato hexadecimal.\n\td, _ := strconv.ParseInt(\"0x1c8\", 0, 64)\n\tfmt.Println(d)\n\n\t// También existe la función `ParseUint` para enteros sin signo.\n\tu, _ := strconv.ParseUint(\"789\", 0, 64)\n\tfmt.Println(u)\n\n\t// `Atoi` es una función de conveniencia para el parseo básico de enteros\n\t// en base 10 (`int`).\n\tk, _ := strconv.Atoi(\"135\")\n\tfmt.Println(k)\n\n\t// Las funciones de parseo devuelven un error cuando reciben entradas no válidas.\n\t_, e := strconv.Atoi(\"wat\")\n\tfmt.Println(e)\n}\n",
    "output": "$ go run number-parsing.go \n1.234\n123\n456\n789\n135\nstrconv.ParseInt: parsing \"wat\": invalid syntax\n\n# A continuación veremos otra tarea habitual de parseo: las URLs.\n",
    "officialUrl": "https://gobyexample.com/number-parsing"
  },
  {
    "id": 62,
    "slug": "url-parsing",
    "title": "URL Parsing",
    "titleEs": "Parseo y Análisis de URLs (net/url)",
    "category": "Tiempo, Matemáticas y Criptografía",
    "categorySlug": "tiempo-cripto",
    "categoryIcon": "clock",
    "difficulty": "Intermedio",
    "summary": "Descomposición estructurada, validación y extracción de componentes de direcciones web con 'net/url'.",
    "originalExpl": "Las URLs proporcionan una forma uniforme de localizar recursos. El paquete net/url de Go permite parsear y construir URLs fácilmente.",
    "basicExpl": {
      "title": "Conceptos Fundamentales para Principiantes",
      "content": "Una URL (dirección web) está compuesta por muchas piezas:\n`https://usuario:pass@servidor.com:8080/ruta/recurso?filtro=golang#seccion1`.\nEn vez de intentar cortarla con `strings.Split` a mano (lo cual es muy propenso a bugs), usas `url.Parse(miURL)`:\n- `u.Scheme` -> el protocolo (\"https\").\n- `u.Host` -> el servidor con su puerto (\"servidor.com:8080\").\n- `u.Hostname()` y `u.Port()` -> separan el servidor y el puerto (\"servidor.com\" y \"8080\").\n- `u.Path` -> la ruta (\"/ruta/recurso\").\n- `u.Query()` -> los parámetros de búsqueda como un mapa.",
      "keyPoints": [
        "Se importa con `import \"net/url\"`.",
        "`url.Parse(stringURL)` descompone la URL en una estructura `*url.URL`.",
        "`u.Query()` devuelve un `url.Values` (un mapa `map[string][]string`) para leer parámetros GET.",
        "`u.Fragment` extrae el hash del enlace (lo que va después de `#`)."
      ]
    },
    "interExpl": {
      "title": "Mecanismos Internos y Buenas Prácticas",
      "content": "Construcción y Codificación de Parámetros de Consulta (Query Params):\nAl enviar parámetros a una API web que pueden contener espacios, tildes o caracteres especiales, es crucial codificarlos correctamente (URL-encoding / Percent-encoding):\n```go\nparams := url.Values{}\nparams.Add(\"buscar\", \"programación go\")\nparams.Add(\"pagina\", \"1\")\n\nu.RawQuery = params.Encode() // Produce: buscar=programaci%C3%B3n+go&pagina=1\n```\n`params.Encode()` escapa automáticamente caracteres peligrosos, previniendo errores de petición y vulnerabilidades de inyección en URLs.",
      "keyPoints": [
        "`url.Values.Encode()`: codifica parámetros a formato seguro RFC 3986 (Percent-Encoding).",
        "Manejo de múltiples valores: una misma clave en una URL puede tener varios valores (`?tag=go&tag=web`); `u.Query()[\"tag\"]` devuelve un slice con todos.",
        "Rutas relativas: `base.ResolveReference(relativa)` resuelve URLs relativas contra una URL base absoluta de forma automática."
      ]
    },
    "expertExpl": {
      "title": "Bajo Nivel, Rendimiento e Internals",
      "content": "Cumplimiento Estricto de RFC 3986 vs WHATWG URL Standard:\nEl parser `net/url` de Go implementa rigurosamente el estándar formal RFC 3986. A diferencia de los navegadores web modernos (que siguen el estándar flexible de WHATWG y toleran barras mal puestas, caracteres sin escapar y espacios en blanco), `url.Parse` de Go es estricto y rechazará URLs malformadas que contengan caracteres de control o esquemas inválidos.\n\nPara parsear credenciales de usuario embebidas en la URL (`u.User`), Go devuelve un puntero `*url.Userinfo` que almacena la contraseña de forma protegida para no imprimirla accidentalmente en logs cuando se invoca `u.String()` si el usuario no solicita explícitamente `u.User.Password()`.",
      "keyPoints": [
        "Estándar RFC 3986: parseo formal estricto para seguridad en entornos de servidor.",
        "Protección de credenciales: `url.Userinfo` encapsula contraseñas para evitar fugas en logs.",
        "Zero allocations en paths limpios: el algoritmo optimiza el almacenamiento interno evitando copias si la URL ya está sanitizada."
      ]
    },
    "evaluation": {
      "title": "Reto: Constructor de Enlaces de Paginación API con Codificación Segura",
      "statement": "Escribe una función 'ConstruirURL(baseURL, endpoint string, terminoBusqueda string, pagina int) (string, error)' que una la URL base con el endpoint y agregue los parámetros GET 'q' y 'page' correctamente codificados. Prueba la función con el término de búsqueda 'análisis & diseño #1'.",
      "starterCode": "package main\n\nimport (\n    \"fmt\"\n    \"net/url\"\n)\n\nfunc ConstruirURL(baseURL, endpoint, terminoBusqueda string, pagina int) (string, error) {\n    // Usa url.Parse, params.Encode y u.String()\n}\n\nfunc main() {\n    // Llama a ConstruirURL e imprime el resultado seguro\n}",
      "hint": "Crea u, err := url.Parse(baseURL + endpoint); q := u.Query(); q.Set(\"q\", ...); u.RawQuery = q.Encode().",
      "solution": "package main\n\nimport (\n    \"fmt\"\n    \"net/url\"\n    \"strconv\"\n)\n\nfunc ConstruirURL(baseURL, endpoint, terminoBusqueda string, pagina int) (string, error) {\n    u, err := url.Parse(baseURL + endpoint)\n    if err != nil {\n        return \"\", err\n    }\n    \n    // Construir parámetros de forma segura\n    q := u.Query()\n    q.Set(\"q\", terminoBusqueda)\n    q.Set(\"page\", strconv.Itoa(pagina))\n    \n    u.RawQuery = q.Encode() // Codifica caracteres especiales (&, espacios, #)\n    return u.String(), nil\n}\n\nfunc main() {\n    base := \"https://api.tienda.com\"\n    endpoint := \"/v1/buscar\"\n    busqueda := \"análisis & diseño #1\"\n    \n    urlFinal, err := ConstruirURL(base, endpoint, busqueda, 2)\n    if err != nil {\n        panic(err)\n    }\n    \n    fmt.Println(\"URL generada y sanitizada:\")\n    fmt.Println(urlFinal)\n}",
      "explanation": "El método 'q.Encode()' transforma automáticamente los caracteres conflictivos como espacios, ampersands '&' y almohadillas '#' en entidades percent-encoded seguras (`an%C3%A1lisis+%26+dise%C3%B1o+%231`), impidiendo que corrompan los parámetros de la petición web."
    },
    "externalLinks": [
      {
        "title": "Paquete net/url (Biblioteca estándar de Go)",
        "url": "https://pkg.go.dev/net/url",
        "description": "Documentación oficial del paquete net/url en la biblioteca estándar."
      },
      {
        "title": "Go by Example Original: URL Parsing",
        "url": "https://gobyexample.com/url-parsing",
        "description": "Ejemplo interactivo en Go by Example."
      },
      {
        "title": "Estándar RFC 3986: Identificadores uniformes de recursos (URI)",
        "url": "https://datatracker.ietf.org/doc/html/rfc3986",
        "description": "La especificación estándar oficial implementada por Go."
      }
    ],
    "code": "// Las URLs proporcionan una [forma uniforme de localizar recursos](https://adam.herokuapp.com/past/2010/3/30/urls_are_the_uniform_way_to_locate_resources/).\n// Aquí veremos cómo parsear URLs en Go.\n\npackage main\n\nimport (\n\t\"fmt\"\n\t\"net\"\n\t\"net/url\"\n)\n\nfunc main() {\n\n\t// Parsearemos esta URL de ejemplo, la cual incluye\n\t// esquema, credenciales de autenticación, host, puerto, ruta,\n\t// parámetros de consulta y fragmento.\n\ts := \"postgres://user:pass@host.com:5432/path?k=v#f\"\n\n\t// Parseamos la URL y aseguramos que no contenga errores.\n\tu, err := url.Parse(s)\n\tif err != nil {\n\t\tpanic(err)\n\t}\n\n\t// Acceder al esquema es directo.\n\tfmt.Println(u.Scheme)\n\n\t// `User` contiene toda la información de autenticación; invoca\n\t// `Username` y `Password` sobre él para obtener los valores individuales.\n\tfmt.Println(u.User)\n\tfmt.Println(u.User.Username())\n\tp, _ := u.User.Password()\n\tfmt.Println(p)\n\n\t// `Host` contiene tanto el nombre del host como el puerto,\n\t// si están presentes. Usa `SplitHostPort` para extraerlos por separado.\n\tfmt.Println(u.Host)\n\thost, port, _ := net.SplitHostPort(u.Host)\n\tfmt.Println(host)\n\tfmt.Println(port)\n\n\t// Aquí extraemos la ruta (`path`) y el fragmento posterior\n\t// al símbolo `#`.\n\tfmt.Println(u.Path)\n\tfmt.Println(u.Fragment)\n\n\t// Para obtener los parámetros de consulta en una cadena con formato `k=v`,\n\t// usa `RawQuery`. También puedes parsear los parámetros\n\t// hacia un mapa. Los mapas de parámetros resultantes van de\n\t// cadenas a slices de cadenas, por lo que accede a `[0]`\n\t// si solo necesitas el primer valor.\n\tfmt.Println(u.RawQuery)\n\tm, _ := url.ParseQuery(u.RawQuery)\n\tfmt.Println(m)\n\tfmt.Println(m[\"k\"][0])\n}\n",
    "output": "# Ejecutar nuestro programa de parseo de URLs muestra todas las\n# partes individuales que logramos extraer.\n$ go run url-parsing.go \npostgres\nuser:pass\nuser\npass\nhost.com:5432\nhost.com\n5432\n/path\nf\nk=v\nmap[k:[v]]\nv\n",
    "officialUrl": "https://gobyexample.com/url-parsing"
  },
  {
    "id": 63,
    "slug": "sha256-hashes",
    "title": "SHA256 Hashes",
    "titleEs": "Hashing Criptográfico SHA-256 (crypto/sha256)",
    "category": "Tiempo, Matemáticas y Criptografía",
    "categorySlug": "tiempo-cripto",
    "categoryIcon": "clock",
    "difficulty": "Intermedio",
    "summary": "Generación de huellas digitales criptográficas seguras de 256 bits (32 bytes) para verificación de integridad.",
    "originalExpl": "Los hashes SHA256 son frecuentemente utilizados para computar identificadores binarios o huellas digitales para documentos y datos. El paquete crypto/sha256 implementa el algoritmo de hash criptográfico SHA224 y SHA256.",
    "basicExpl": {
      "title": "Conceptos Fundamentales para Principiantes",
      "content": "Una función hash criptográfica como SHA-256 es como una trituradora de papel mágica:\n- Le metes cualquier dato (una palabra, un archivo PDF o una película entera de 10 GB).\n- Produce siempre una 'huella digital' de tamaño fijo: exactamente 32 bytes (64 caracteres en hexadecimal).\n- Es de una sola vía (irreversible): no puedes reconstruir el archivo original a partir del hash.\n- Efecto avalancha: si cambias una sola letra de un libro de 1,000 páginas, el hash resultante cambia por completo.\nSe usa para verificar que un archivo descargado no esté corrupto ni haya sido alterado por un hacker.",
      "keyPoints": [
        "Se importa con `import \"crypto/sha256\"`.",
        "Cálculo directo en un solo paso: `sha256.Sum256([]byte(\"texto\"))` (devuelve un array fijo `[32]byte`).",
        "Formatear a texto hexadecimal legible con `%x` en `fmt.Sprintf(\"%x\", hash)`.",
        "SHA-256 es seguro contra colisiones hoy en día (a diferencia de MD5 y SHA-1 que están rotos)."
      ]
    },
    "interExpl": {
      "title": "Mecanismos Internos y Buenas Prácticas",
      "content": "Streaming con la interfaz `hash.Hash` para archivos gigantes:\nSi necesitas calcular el hash de un archivo de 5 GB, llamar a `sha256.Sum256` requeriría cargar los 5 GB completos en la memoria RAM.\nLa buena práctica en Go es usar la interfaz de streaming `io.Writer`:\n```go\nh := sha256.New()\n// Copia el archivo directamente al hasher por bloques de 32 KB sin cargar todo en RAM\nio.Copy(h, archivo)\nhashFinal := h.Sum(nil)\n```\nComparación de hashes segura contra ataques de tiempo (Timing Attacks): NUNCA uses `hash1 == hash2` para autenticación sensible; usa `crypto/subtle.ConstantTimeCompare`.",
      "keyPoints": [
        "Streaming con `sha256.New()`: permite hashear datos continuos con consumo insignificante de memoria RAM.",
        "Seguridad contra Timing Attacks: usar `subtle.ConstantTimeCompare` para validar hashes y firmas.",
        "Hashing de contraseñas: NUNCA almacenes contraseñas con SHA-256 directo (es vulnerable a ataques por GPU); usa algoritmos con sal y coste computacional como bcrypt o Argon2."
      ]
    },
    "expertExpl": {
      "title": "Bajo Nivel, Rendimiento e Internals",
      "content": "Aceleración Criptográfica por Hardware en Código Ensamblador (SHA Extensions):\nEl paquete `crypto/sha256` de Go no está escrito en Go puro para arquitecturas modernas. En CPUs x86-64 con soporte para las instrucciones Intel SHA Extensions (SHA-NI) y en procesadores ARM64 (Apple Silicon / AWS Graviton con soporte para Crypto Extensions), Go utiliza rutinas en ensamblador de bajo nivel optimizadas.\n\nEstas instrucciones de hardware procesan bloques de compresión de SHA-256 directamente en circuitos dedicados del silicio de la CPU a velocidades de varios gigabytes por segundo con un consumo de energía mínimo.",
      "keyPoints": [
        "Instrucciones de CPU dedicadas: aprovecha Intel SHA-NI y ARMv8 Cryptographic Instructions en ensamblador.",
        "Zero allocations con Sum256: devuelve un array `[32]byte` asignado directamente en el stack sin tocar el Heap.",
        "Estructura digest interna: mantiene los 8 registros de 32 bits (H0 a H7) y el búfer de bloque de 64 bytes."
      ]
    },
    "evaluation": {
      "title": "Reto: Verificador de Integridad de Archivo Simulado con SHA-256",
      "statement": "Escribe una función 'CalcularChecksum(datos []byte) string' que devuelva el hash SHA-256 de los datos en formato hexadecimal. Simula una transmisión donde un byte es alterado y demuestra que los hashes son completamente diferentes.",
      "starterCode": "package main\n\nimport (\n    \"crypto/sha256\"\n    \"fmt\"\n)\n\nfunc CalcularChecksum(datos []byte) string {\n    // Calcula sha256 y formatea con %x\n}\n\nfunc main() {\n    original := []byte(\"Transferir 1000 EUR a cuenta ES9988\")\n    // Calcula hash original, altera un carácter y compara\n}",
      "hint": "Usa hash := sha256.Sum256(datos) y fmt.Sprintf(\"%x\", hash).",
      "solution": "package main\n\nimport (\n    \"crypto/sha256\"\n    \"fmt\"\n)\n\nfunc CalcularChecksum(datos []byte) string {\n    hash := sha256.Sum256(datos)\n    return fmt.Sprintf(\"%x\", hash)\n}\n\nfunc main() {\n    mensajeOriginal := []byte(\"Transferir 1000 EUR a cuenta ES9988\")\n    // Mensaje alterado maliciosamente (solo cambia 1 dígito: 9000 en vez de 1000)\n    mensajeAlterado := []byte(\"Transferir 9000 EUR a cuenta ES9988\")\n    \n    hash1 := CalcularChecksum(mensajeOriginal)\n    hash2 := CalcularChecksum(mensajeAlterado)\n    \n    fmt.Println(\"Hash Original :\", hash1)\n    fmt.Println(\"Hash Alterado :\", hash2)\n    \n    if hash1 != hash2 {\n        fmt.Println(\"\\n[ALERTA DE INTEGRIDAD]: La firma criptográfica no coincide. Los datos fueron manipulados.\")\n    } else {\n        fmt.Println(\"Los datos son auténticos.\")\n    }\n}",
      "explanation": "La función 'sha256.Sum256' procesa el bloque de datos y devuelve una huella de 32 bytes. Debido al efecto avalancha del algoritmo SHA-256, cambiar un solo dígio ('1' por '9') genera un hash completamente irreconocible y diferente, detectando instantáneamente cualquier alteración."
    },
    "externalLinks": [
      {
        "title": "Paquete crypto/sha256 (Biblioteca estándar de Go)",
        "url": "https://pkg.go.dev/crypto/sha256",
        "description": "Documentación oficial del paquete crypto/sha256."
      },
      {
        "title": "Go by Example Original: SHA256 Hashes",
        "url": "https://gobyexample.com/sha256-hashes",
        "description": "Ejemplo en Go by Example."
      },
      {
        "title": "Estándar NIST FIPS 180-4: Funciones de dispersión criptográfica segura (SHA)",
        "url": "https://csrc.nist.gov/publications/detail/fips/180/4/final",
        "description": "Especificación federal oficial de los algoritmos de la familia SHA-2."
      }
    ],
    "code": "// Los [_hashes SHA256_](https://en.wikipedia.org/wiki/SHA-2) se utilizan\n// con frecuencia para calcular identificadores breves e irrepetibles para fragmentos\n// binarios o de texto. Por ejemplo, los certificados TLS/SSL emplean SHA256\n// para calcular su firma criptográfica. Así es como se calculan\n// hashes SHA256 en Go.\n\npackage main\n\n// Go implementa diversas funciones de hash en varios\n// paquetes dentro de `crypto/*`.\nimport (\n\t\"crypto/sha256\"\n\t\"fmt\"\n)\n\nfunc main() {\n\ts := \"sha256 this string\"\n\n\t// Aquí iniciamos un nuevo cálculo de hash.\n\th := sha256.New()\n\n\t// `Write` espera bytes. Si tienes una cadena `s`,\n\t// usa `[]byte(s)` para convertirla a bytes.\n\th.Write([]byte(s))\n\n\t// Esto obtiene el resultado final del hash como un\n\t// slice de bytes. El argumento para `Sum` puede usarse para adjuntar\n\t// a un slice de bytes existente; generalmente no se necesita (usa `nil`).\n\tbs := h.Sum(nil)\n\n\tfmt.Println(s)\n\tfmt.Printf(\"%x\\n\", bs)\n}\n",
    "output": "# Ejecutar el programa calcula el hash y lo imprime en\n# un formato hexadecimal legible para humanos.\n$ go run sha256-hashes.go\nsha256 this string\n1af1dfa857bf1d8814fe1af8983c18080019922e557f15a8a...\n\n# Puedes calcular otros hashes empleando un patrón muy similar\n# al mostrado arriba. Por ejemplo, para calcular hashes\n# SHA512 importa `crypto/sha512` y utiliza\n# `sha512.New()`.\n\n# Ten en cuenta que si requieres hashes criptográficamente seguros,\n# debes investigar cuidadosamente la\n# [fortaleza del algoritmo](https://en.wikipedia.org/wiki/Cryptographic_hash_function).\n",
    "officialUrl": "https://gobyexample.com/sha256-hashes"
  },
  {
    "id": 64,
    "slug": "base64-encoding",
    "title": "Base64 Encoding",
    "titleEs": "Codificación y Decodificación Base64",
    "category": "Tiempo, Matemáticas y Criptografía",
    "categorySlug": "tiempo-cripto",
    "categoryIcon": "clock",
    "difficulty": "Principiante",
    "summary": "Transformación de datos binarios arbitrarios en texto ASCII seguro para transporte en redes y protocolos web.",
    "originalExpl": "Go proporciona soporte integrado para codificación y decodificación base64. El paquete encoding/base64 soporta tanto el alfabeto estándar como el compatible con URLs.",
    "basicExpl": {
      "title": "Conceptos Fundamentales para Principiantes",
      "content": "Base64 NO es encriptación ni seguridad: es simplemente un sistema para empaquetar datos binarios (como una foto, un archivo o bytes raros) en letras y números normales (ASCII) que cualquier sistema pueda transmitir sin que se rompan:\n- Codificar: `base64.StdEncoding.EncodeToString(misBytes)`.\n- Decodificar: `bytes, err := base64.StdEncoding.DecodeString(textoBase64)`.\n- Base64 para URLs: El alfabeto estándar usa caracteres `+` y `/`, que causan problemas en las URLs. Para eso existe `base64.URLEncoding`, que usa `-` y `_` en su lugar.",
      "keyPoints": [
        "Se importa con `import \"encoding/base64\"`.",
        "`base64.StdEncoding`: alfabeto estándar clásico con relleno `=`.",
        "`base64.URLEncoding`: alfabeto seguro para enlaces web y parámetros GET.",
        "`base64.RawURLEncoding`: seguro para URLs y sin caracteres de relleno `=` (estándar para JWT).",
        "Aumenta el tamaño de los datos en aproximadamente un 33%."
      ]
    },
    "interExpl": {
      "title": "Mecanismos Internos y Buenas Prácticas",
      "content": "Uso en Tokens JWT y Cabeceras HTTP:\nEn la arquitectura web moderna, Base64 es indispensable para:\n1. Cabecera HTTP Authorization Basic: `Basic \" + base64.StdEncoding.EncodeToString([]byte(\"user:pass\"))`.\n2. JSON Web Tokens (JWT): El estándar JWT exige obligatoriamente `base64.RawURLEncoding` (sin signos `=` de padding) para separar los componentes `header.payload.signature` sin romper navegadores.\n\nStreaming con `base64.NewEncoder` y `base64.NewDecoder`: para adjuntar imágenes pesadas a correos electrónicos o APIs sin cargarlas completas en memoria.",
      "keyPoints": [
        "RawURLEncoding para JWT: elimina los caracteres `=` finales que interfieren en URLs.",
        "Autenticación HTTP Basic: estándar de facto para transmitir credenciales en cabeceras HTTP.",
        "Validación de errores: `DecodeString` devuelve un error si el texto contiene caracteres ajenos al alfabeto o padding corrupto."
      ]
    },
    "expertExpl": {
      "title": "Bajo Nivel, Rendimiento e Internals",
      "content": "Aceleración Vectorial SIMD (AVX2 y ARM NEON):\nTradicionalmente, Base64 procesa grupos de 3 bytes (24 bits) y los expande en 4 caracteres de 6 bits cada uno mediante operaciones de desplazamiento binario (`>>`, `<<`) y máscaras bit a bit.\n\nEn Go moderno, el paquete `encoding/base64` implementa optimizaciones de código ensamblador que cargan múltiples registros vectoriales SIMD de 128 o 256 bits, procesando 32 o 64 bytes simultáneamente en un solo ciclo de reloj de la CPU. Esto permite codificar y decodificar a velocidades superiores a 3 Gigabytes por segundo por núcleo.",
      "keyPoints": [
        "Vectorización SIMD: procesamiento paralelo de bloques de bytes en ensamblador nativo.",
        "Zero allocations con `Encode` sobre búferes existentes: el método `enc.Encode(dst, src)` evita crear strings en el Heap.",
        "Ecuación de tamaño exacto: el tamaño resultante es exactamente `((len + 2) / 3) * 4` bytes."
      ]
    },
    "evaluation": {
      "title": "Reto: Codificador y Decodificador Seguro para URLs sin Relleno",
      "statement": "Escribe un programa que tome una cadena con caracteres especiales ('usuario:admin?clave=secreta+2026'). Codifícala utilizando base64.RawURLEncoding (sin caracteres de relleno '='). Luego decodifícala de vuelta al texto original y comprueba que coincide exactamente.",
      "starterCode": "package main\n\nimport (\n    \"encoding/base64\"\n    \"fmt\"\n)\n\nfunc main() {\n    original := \"usuario:admin?clave=secreta+2026\"\n    // Codifica con RawURLEncoding\n    // Decodifica y verifica\n}",
      "hint": "Usa base64.RawURLEncoding.EncodeToString([]byte(original)) y base64.RawURLEncoding.DecodeString(encoded).",
      "solution": "package main\n\nimport (\n    \"encoding/base64\"\n    \"fmt\"\n)\n\nfunc main() {\n    original := \"usuario:admin?clave=secreta+2026\"\n    fmt.Println(\"Texto original       :\", original)\n    \n    // 1. Codificar con RawURLEncoding (seguro para URLs y sin padding =)\n    codificado := base64.RawURLEncoding.EncodeToString([]byte(original))\n    fmt.Println(\"Base64 RawURL seguro :\", codificado)\n    \n    // 2. Decodificar de vuelta\n    bytesDecodificados, err := base64.RawURLEncoding.DecodeString(codificado)\n    if err != nil {\n        panic(err)\n    }\n    \n    recuperado := string(bytesDecodificados)\n    fmt.Println(\"Texto recuperado     :\", recuperado)\n    \n    if original == recuperado {\n        fmt.Println(\"¡Decodificación perfecta e íntegra!\")\n    }\n}",
      "explanation": "El codificador 'base64.RawURLEncoding' sustituye los caracteres '+' y '/' por '-' y '_' y omite los signos de relleno '=', produciendo una cadena perfectamente apta para ser incrustada directamente en URLs o tokens de sesión sin necesidad de aplicar escapes secundarios."
    },
    "externalLinks": [
      {
        "title": "Paquete encoding/base64 (Biblioteca estándar de Go)",
        "url": "https://pkg.go.dev/encoding/base64",
        "description": "Documentación oficial del paquete encoding/base64."
      },
      {
        "title": "Go by Example Original: Base64 Encoding",
        "url": "https://gobyexample.com/base64-encoding",
        "description": "Ejemplo en Go by Example."
      },
      {
        "title": "Estándar RFC 4648: Codificaciones Base16, Base32 y Base64",
        "url": "https://datatracker.ietf.org/doc/html/rfc4648",
        "description": "La especificación estándar oficial de alfabetos Base64."
      }
    ],
    "code": "// Go provee soporte integrado para la\n// [codificación y decodificación en Base64](https://en.wikipedia.org/wiki/Base64).\n\npackage main\n\n// Esta sintaxis importa el paquete `encoding/base64` asignándole\n// el alias `b64` en vez del predeterminado `base64`. Esto nos\n// ahorrará espacio a continuación.\nimport (\n\tb64 \"encoding/base64\"\n\t\"fmt\"\n)\n\nfunc main() {\n\n\t// Aquí tenemos la cadena (`string`) que codificaremos y decodificaremos.\n\tdata := \"abc123!?$*&()'-=@~\"\n\n\t// Go admite Base64 estándar y compatible con URLs.\n\t// Aquí vemos cómo codificar usando el codificador estándar.\n\t// El codificador requiere un `[]byte`, por lo que convertimos\n\t// nuestra cadena a dicho tipo.\n\tsEnc := b64.StdEncoding.EncodeToString([]byte(data))\n\tfmt.Println(sEnc)\n\n\t// La decodificación puede devolver un error, el cual puedes comprobar\n\t// si no sabes con certeza si la entrada está bien formada.\n\tsDec, _ := b64.StdEncoding.DecodeString(sEnc)\n\tfmt.Println(string(sDec))\n\tfmt.Println()\n\n\t// Esto codifica y decodifica utilizando el formato Base64\n\t// compatible con URLs.\n\tuEnc := b64.URLEncoding.EncodeToString([]byte(data))\n\tfmt.Println(uEnc)\n\tuDec, _ := b64.URLEncoding.DecodeString(uEnc)\n\tfmt.Println(string(uDec))\n}\n",
    "output": "# La cadena se codifica con valores ligeramente distintos entre los\n# codificadores estándar y de URL (signo `+` frente a `-` al final),\n# pero ambos decodifican a la cadena original según lo esperado.\n$ go run base64-encoding.go\nYWJjMTIzIT8kKiYoKSctPUB+\nabc123!?$*&()'-=@~\n\nYWJjMTIzIT8kKiYoKSctPUB-\nabc123!?$*&()'-=@~\n",
    "officialUrl": "https://gobyexample.com/base64-encoding"
  },
  {
    "id": 65,
    "slug": "reading-files",
    "title": "Reading Files",
    "titleEs": "Lectura de Archivos en Disco (os y io)",
    "category": "Entrada / Salida y Archivos",
    "categorySlug": "archivos-io",
    "categoryIcon": "folder",
    "difficulty": "Principiante",
    "summary": "Lectura básica completa con os.ReadFile y lectura avanzada por bloques y desplazamientos con os.Open, f.Read y f.Seek.",
    "originalExpl": "Leer y escribir archivos son tareas básicas requeridas por muchos programas de Go. En este ejemplo veremos cómo leer archivos completos o por partes.",
    "basicExpl": {
      "title": "Conceptos Fundamentales para Principiantes",
      "content": "Para leer un archivo guardado en tu disco duro tienes dos caminos principales:\n1. Si el archivo es pequeño (ej. un archivo de texto o configuración): `datos, err := os.ReadFile(\"archivo.txt\")`. En una sola línea Go abre el archivo, lee todo su contenido como un slice de bytes (`[]byte`) y lo cierra automáticamente.\n2. Si el archivo es mediano o grande: lo abres con `f, err := os.Open(\"archivo.txt\")`, lees trozos pequeños en un búfer (`f.Read(b)`) y NUNCA olvidas cerrarlo con `defer f.Close()`.",
      "keyPoints": [
        "`os.ReadFile(ruta)`: la forma más rápida y directa para archivos pequeños.",
        "`f, err := os.Open(ruta)`: abre en modo de solo lectura.",
        "Cierre obligatorio con `defer f.Close()` inmediatamente tras abrir.",
        "`f.Seek(desplazamiento, origen)`: mueve el cursor de lectura a una posición específica."
      ]
    },
    "interExpl": {
      "title": "Mecanismos Internos y Buenas Prácticas",
      "content": "Lectura Buffereada con `bufio.Reader` e `io.LimitReader`:\nLlamar a `f.Read()` directamente realiza llamadas al sistema operativo (syscalls de lectura) por cada bloque pequeño. Para optimizar el rendimiento de I/O, se utiliza `bufio.NewReader(f)`:\n- Mantiene un búfer interno de 4KB en memoria RAM, reduciendo miles de accesos a disco a una sola lectura grande.\n- Proporciona métodos cómodos como `r.ReadString('\\n')` para leer línea por línea.\n- Para evitar ataques de Denegación de Servicio por bombas de descompresión o archivos infinitos, limita la lectura con `io.LimitReader(f, maxBytes)`.",
      "keyPoints": [
        "`bufio.NewReader(f)`: amortiza las llamadas al sistema del SO mediante un búfer en memoria.",
        "`io.ReadAll(r)`: lee cualquier `io.Reader` hasta el final (`io.EOF`).",
        "Detección de fin de archivo: `err == io.EOF` indica que se ha llegado al final del archivo de forma esperada."
      ]
    },
    "expertExpl": {
      "title": "Bajo Nivel, Rendimiento e Internals",
      "content": "Llamadas al Sistema del Kernel y Zero-Copy con `sendfile`:\nA nivel de kernel del sistema operativo, `os.Open` y `f.Read` ejecutan las syscalls POSIX `open()` y `read()` (o `CreateFile`/`ReadFile` en Windows). Cada llamada transfiere datos desde el Page Cache del kernel al búfer de memoria en espacio de usuario (user-space).\n\nSi necesitas leer un archivo en disco para transmitirlo directamente por un socket de red HTTP (`net.Conn`), Go optimiza internamente la llamada `io.Copy(conn, file)` utilizando la llamada al sistema de kernel `sendfile` o `splice` (Zero-Copy). Esto transfiere los datos directamente desde el controlador de disco a la tarjeta de red sin pasar por la CPU ni por la memoria de la aplicación.",
      "keyPoints": [
        "Zero-Copy con `sendfile`: Go delega transferencias archivo->red al kernel sin duplicar memoria.",
        "Límite de descriptores de archivos (`ulimit -n`): cada archivo abierto consume un File Descriptor del SO; no cerrar con defer provoca fugas de descriptores (`too many open files`).",
        "Punteros de lectura concurrentes: `f.ReadAt(b, offset)` permite leer concurrentemente desde múltiples goroutines en distintas posiciones del mismo archivo sin interferir en el cursor."
      ]
    },
    "evaluation": {
      "title": "Reto: Lector de Cabecera de Archivo con Longitud Limitada",
      "statement": "Escribe una función 'LeerPrimerosBytes(ruta string, n int) (string, error)' que abra un archivo, lea exactamente los primeros 'n' bytes utilizando un búfer de tamaño exacto y f.Read, asegure el cierre con defer y devuelva los bytes leídos convertidos a string.",
      "starterCode": "package main\n\nimport (\n    \"fmt\"\n    \"os\"\n)\n\nfunc LeerPrimerosBytes(ruta string, n int) (string, error) {\n    // Abre el archivo, crea el búfer de tamaño n y lee\n}\n\nfunc main() {\n    // Crea un archivo temporal, escribe un texto y lee los primeros 5 bytes\n}",
      "hint": "Crea el búfer con buf := make([]byte, n) y usa f.Read(buf).",
      "solution": "package main\n\nimport (\n    \"fmt\"\n    \"os\"\n)\n\nfunc LeerPrimerosBytes(ruta string, n int) (string, error) {\n    f, err := os.Open(ruta)\n    if err != nil {\n        return \"\", err\n    }\n    defer f.Close()\n    \n    b := make([]byte, n)\n    leidos, err := f.Read(b)\n    if err != nil {\n        return \"\", err\n    }\n    \n    return string(b[:leidos]), nil\n}\n\nfunc main() {\n    // Creamos un archivo de prueba\n    ruta := \"prueba_lectura.txt\"\n    os.WriteFile(ruta, []byte(\"Golang es el lenguaje del cloud computing\"), 0644)\n    defer os.Remove(ruta)\n    \n    cabecera, err := LeerPrimerosBytes(ruta, 6)\n    if err != nil {\n        panic(err)\n    }\n    fmt.Printf(\"Primeros 6 bytes leídos: '%s'\\n\", cabecera)\n}",
      "explanation": "Al preasignar un slice de bytes de longitud 'n' (`make([]byte, n)`), `f.Read(b)` lee como máximo esa cantidad de bytes del disco. La instrucción 'defer f.Close()' garantiza que el descriptor del archivo se libere inmediatamente al terminar la función."
    },
    "externalLinks": [
      {
        "title": "Paquete os (Biblioteca estándar de Go)",
        "url": "https://pkg.go.dev/os",
        "description": "Documentación oficial del paquete os para manejo de archivos."
      },
      {
        "title": "Paquete io (Biblioteca estándar de Go)",
        "url": "https://pkg.go.dev/io",
        "description": "Interfaces universales Reader, Writer, Closer y utilidades de copia."
      },
      {
        "title": "Go by Example Original: Reading Files",
        "url": "https://gobyexample.com/reading-files",
        "description": "Ejemplo interactivo en Go by Example."
      }
    ],
    "code": "// Leer y escribir archivos son tareas fundamentales para\n// la mayoría de programas en Go. Primero revisaremos algunos ejemplos\n// de lectura de archivos.\n\npackage main\n\nimport (\n\t\"bufio\"\n\t\"fmt\"\n\t\"io\"\n\t\"os\"\n\t\"path/filepath\"\n)\n\n// La lectura de archivos requiere comprobar errores en la mayoría de llamadas.\n// Esta función auxiliar simplificará nuestras comprobaciones de error a continuación.\nfunc check(e error) {\n\tif e != nil {\n\t\tpanic(e)\n\t}\n}\n\nfunc main() {\n\n\t// Quizás la tarea de lectura más básica sea\n\t// volcar el contenido completo de un archivo directamente en memoria.\n\tpath := filepath.Join(os.TempDir(), \"dat\")\n\tdat, err := os.ReadFile(path)\n\tcheck(err)\n\tfmt.Print(string(dat))\n\n\t// A menudo desearás un mayor control sobre cómo y qué partes\n\t// del archivo se leen. Para estas tareas, comienza\n\t// abriendo el archivo con `os.Open` para obtener un valor `os.File`.\n\tf, err := os.Open(path)\n\tcheck(err)\n\n\t// Lee algunos bytes desde el comienzo del archivo.\n\t// Permitimos leer hasta 5 bytes, pero también registramos cuántos\n\t// fueron leídos realmente.\n\tb1 := make([]byte, 5)\n\tn1, err := f.Read(b1)\n\tcheck(err)\n\tfmt.Printf(\"%d bytes: %s\\n\", n1, string(b1[:n1]))\n\n\t// También puedes posicionarte con `Seek` en una ubicación conocida del archivo\n\t// y leer desde allí.\n\to2, err := f.Seek(6, io.SeekStart)\n\tcheck(err)\n\tb2 := make([]byte, 2)\n\tn2, err := f.Read(b2)\n\tcheck(err)\n\tfmt.Printf(\"%d bytes @ %d: \", n2, o2)\n\tfmt.Printf(\"%v\\n\", string(b2[:n2]))\n\n\t// Otros métodos de posicionamiento son relativos a la\n\t// posición actual del cursor,\n\t_, err = f.Seek(2, io.SeekCurrent)\n\tcheck(err)\n\n\t// y relativos al final del archivo.\n\t_, err = f.Seek(-4, io.SeekEnd)\n\tcheck(err)\n\n\t// El paquete `io` ofrece algunas funciones muy útiles\n\t// para la lectura de archivos. Por ejemplo, lecturas como\n\t// las anteriores pueden implementarse de forma más robusta con `ReadAtLeast`.\n\to3, err := f.Seek(6, io.SeekStart)\n\tcheck(err)\n\tb3 := make([]byte, 2)\n\tn3, err := io.ReadAtLeast(f, b3, 2)\n\tcheck(err)\n\tfmt.Printf(\"%d bytes @ %d: %s\\n\", n3, o3, string(b3))\n\n\t// No existe una función dedicada para rebobinar, pero\n\t// `Seek(0, io.SeekStart)` cumple exactamente ese propósito.\n\t_, err = f.Seek(0, io.SeekStart)\n\tcheck(err)\n\n\t// El paquete `bufio` implementa un lector con búfer\n\t// que resulta muy eficiente tanto para lecturas pequeñas múltiples\n\t// como por los métodos adicionales de lectura que provee.\n\tr4 := bufio.NewReader(f)\n\tb4, err := r4.Peek(5)\n\tcheck(err)\n\tfmt.Printf(\"5 bytes: %s\\n\", string(b4))\n\n\t// Cierra el archivo al concluir (habitualmente esto se\n\t// programaría inmediatamente tras `Open` mediante `defer`).\n\tf.Close()\n}\n",
    "output": "$ echo \"hello\" > /tmp/dat\n$ echo \"go\" >>   /tmp/dat\n$ go run reading-files.go\nhello\ngo\n5 bytes: hello\n2 bytes @ 6: go\n2 bytes @ 6: go\n5 bytes: hello\n\n# A continuación veremos la escritura de archivos.\n",
    "officialUrl": "https://gobyexample.com/reading-files"
  },
  {
    "id": 66,
    "slug": "writing-files",
    "title": "Writing Files",
    "titleEs": "Escritura de Archivos en Disco (os y bufio)",
    "category": "Entrada / Salida y Archivos",
    "categorySlug": "archivos-io",
    "categoryIcon": "folder",
    "difficulty": "Principiante",
    "summary": "Escritura atómica directa con os.WriteFile, creación y anexado con os.Create/os.OpenFile y escritura con búfer en bufio.Writer.",
    "originalExpl": "Escribir archivos en Go sigue patrones similares a los que vimos anteriormente para la lectura. En este ejemplo veremos cómo escribir bytes, cadenas y utilizar búferes de escritura.",
    "basicExpl": {
      "title": "Conceptos Fundamentales para Principiantes",
      "content": "Para guardar información en el disco duro:\n1. Escritura directa rápida: `os.WriteFile(\"archivo.txt\", datosBytes, 0644)`. Crea el archivo (o sobreescribe si ya existía), escribe todos los datos y lo cierra.\n2. Escritura paso a paso:\n   - Creas el archivo: `f, err := os.Create(\"archivo.txt\")`.\n   - Escribes bytes: `f.Write([]byte(\"hola\"))`.\n   - Escribes texto directo: `f.WriteString(\" mundo\\n\")`.\n   - Cierras siempre con `defer f.Close()`.",
      "keyPoints": [
        "`os.WriteFile(ruta, datos, permisos)`: ideal para guardar archivos completos de golpe.",
        "`os.Create(ruta)`: crea un archivo nuevo o lo trunca a cero si ya existía (permisos 0666 por defecto).",
        "`f.WriteString(s)`: escribe strings directamente sin tener que convertirlos manualmente a `[]byte`.",
        "Permisos octales estilo Unix: `0644` (lectura/escritura para el dueño, lectura para los demás)."
      ]
    },
    "interExpl": {
      "title": "Mecanismos Internos y Buenas Prácticas",
      "content": "Modos de Apertura con `os.OpenFile` y Escritura en Búfer con `bufio.Writer`:\nPara agregar contenido al final de un archivo existente (Append) sin sobreescribirlo, se utiliza `os.OpenFile` con banderas combinadas con el operador OR (`|`):\n```go\nf, err := os.OpenFile(\"log.txt\", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)\n```\nUso crítico de `bufio.Writer`:\nEscribir en disco muchas líneas cortas genera cientos de syscalls lentas. Un `bufio.Writer` acumula los datos en memoria:\n```go\nw := bufio.NewWriter(f)\nw.WriteString(\"Línea 1\\n\")\nw.Flush() // ¡OBLIGATORIO para vaciar los datos acumulados al disco!\n```",
      "keyPoints": [
        "Banderas de OpenFile: `os.O_APPEND` (anexar), `os.O_CREATE` (crear si no existe), `os.O_WRONLY` (solo escritura).",
        "`w.Flush()` obligatorio: los datos en `bufio.Writer` permanecen en memoria RAM hasta llamar a `Flush()`.",
        "Sincronización física con `f.Sync()`: fuerza al sistema operativo a volcar la caché del disco al plato o celda física (SSD/HDD)."
      ]
    },
    "expertExpl": {
      "title": "Bajo Nivel, Rendimiento e Internals",
      "content": "Garantía de Escritura Atómica (Atomic File Writes) y Prevención de Corrupción:\nSi tu aplicación está escribiendo un archivo de configuración crítico y en ese milisegundo se corta la energía eléctrica o el proceso sufre un crasheo (`SIGKILL`), el archivo quedará truncado a medias y corrupto.\n\nPatrón estándar de producción (Write-Temp-Rename):\n1. Escribes los datos en un archivo temporal en el mismo sistema de archivos: `os.CreateTemp(dir, \"*.tmp\")`.\n2. Escribes los datos y ejecutas `tempFile.Sync()` (emite la syscall `fsync` al hardware).\n3. Cierras el temporal y ejecutas `os.Rename(tempPath, finalPath)`.\nLa llamada al sistema `rename` es atómica a nivel de sistema de archivos POSIX: el archivo final o contiene los datos viejos o contiene los datos nuevos, pero jamás quedará corrupto a medias.",
      "keyPoints": [
        "Patrón Atomic Write Temp/Rename: protege contra corrupción de datos ante fallos de corriente o pánicos.",
        "Llamada `fsync` mediante `f.Sync()`: asegura que la caché volátil del disco se vacíe al almacenamiento persistente.",
        "Sobrecarga de `fsync`: llamar a `Sync()` en cada escritura reduce el rendimiento a cientos de operaciones por segundo; agrupar escrituras antes de sincronizar."
      ]
    },
    "evaluation": {
      "title": "Reto: Logger de Eventos con Anexado Seguro y Bufio",
      "statement": "Escribe una función 'RegistrarEvento(ruta, evento string) error' que abra un archivo en modo Append (creándolo si no existe), use bufio.Writer para escribir el evento seguido de un salto de línea, vacíe el búfer con Flush y cierre el archivo.",
      "starterCode": "package main\n\nimport (\n    \"bufio\"\n    \"fmt\"\n    \"os\"\n)\n\nfunc RegistrarEvento(ruta, evento string) error {\n    // Usa os.OpenFile con O_APPEND|O_CREATE|O_WRONLY y bufio.Writer\n}\n\nfunc main() {\n    // Registra dos eventos consecutivos y lee el archivo para verificar\n}",
      "hint": "Abre con os.OpenFile(ruta, os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644). Recuerda w.Flush().",
      "solution": "package main\n\nimport (\n    \"bufio\"\n    \"fmt\"\n    \"os\"\n)\n\nfunc RegistrarEvento(ruta, evento string) error {\n    f, err := os.OpenFile(ruta, os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)\n    if err != nil {\n        return err\n    }\n    defer f.Close()\n    \n    w := bufio.NewWriter(f)\n    _, err = w.WriteString(evento + \"\\n\")\n    if err != nil {\n        return err\n    }\n    \n    return w.Flush() // Asegura que los datos viajen del búfer de memoria al archivo\n}\n\nfunc main() {\n    ruta := \"auditoria.log\"\n    defer os.Remove(ruta)\n    \n    RegistrarEvento(ruta, \"[INFO] 12:00:01 - Servicio arrancado\")\n    RegistrarEvento(ruta, \"[WARN] 12:00:05 - Uso de memoria al 75%\")\n    \n    contenido, _ := os.ReadFile(ruta)\n    fmt.Println(\"Contenido del log:\")\n    fmt.Print(string(contenido))\n}",
      "explanation": "La combinación de banderas `os.O_APPEND|os.O_CREATE|os.O_WRONLY` garantiza que cada llamada anexe el nuevo registro al final del archivo sin sobreescribir lo anterior. El método `w.Flush()` garantiza que ningún dato quede retenido en la memoria del búfer de Go."
    },
    "externalLinks": [
      {
        "title": "Paquete os: OpenFile flags",
        "url": "https://pkg.go.dev/os#pkg-constants",
        "description": "Constantes de apertura O_RDONLY, O_WRONLY, O_APPEND, etc."
      },
      {
        "title": "Paquete bufio: Writer",
        "url": "https://pkg.go.dev/bufio#Writer",
        "description": "Documentación oficial del escritor en búfer bufio.Writer."
      },
      {
        "title": "Go by Example Original: Writing Files",
        "url": "https://gobyexample.com/writing-files",
        "description": "Ejemplo en Go by Example."
      }
    ],
    "code": "// Escribir archivos en Go sigue patrones análogos a los\n// que examinamos previamente para la lectura.\n\npackage main\n\nimport (\n\t\"bufio\"\n\t\"fmt\"\n\t\"os\"\n\t\"path/filepath\"\n)\n\nfunc check(e error) {\n\tif e != nil {\n\t\tpanic(e)\n\t}\n}\n\nfunc main() {\n\n\t// Para comenzar, aquí vemos cómo volcar una cadena (o simplemente\n\t// bytes) dentro de un archivo.\n\td1 := []byte(\"hello\\ngo\\n\")\n\tpath1 := filepath.Join(os.TempDir(), \"dat1\")\n\terr := os.WriteFile(path1, d1, 0644)\n\tcheck(err)\n\n\t// Para escrituras más granulares, abre un archivo para escritura con `os.Create`.\n\tpath2 := filepath.Join(os.TempDir(), \"dat2\")\n\tf, err := os.Create(path2)\n\tcheck(err)\n\n\t// Es idiomático posponer el `Close` mediante `defer` inmediatamente\n\t// después de abrir un archivo.\n\tdefer f.Close()\n\n\t// Puedes escribir slices de bytes con `Write` como se espera.\n\td2 := []byte{115, 111, 109, 101, 10}\n\tn2, err := f.Write(d2)\n\tcheck(err)\n\tfmt.Printf(\"wrote %d bytes\\n\", n2)\n\n\t// La función `WriteString` también se encuentra disponible.\n\tn3, err := f.WriteString(\"writes\\n\")\n\tcheck(err)\n\tfmt.Printf(\"wrote %d bytes\\n\", n3)\n\n\t// Ejecuta un `Sync` para descargar y asegurar las escrituras en almacenamiento persistente.\n\tf.Sync()\n\n\t// `bufio` provee escritores con búfer además\n\t// de los lectores con búfer que vimos anteriormente.\n\tw := bufio.NewWriter(f)\n\tn4, err := w.WriteString(\"buffered\\n\")\n\tcheck(err)\n\tfmt.Printf(\"wrote %d bytes\\n\", n4)\n\n\t// Usa `Flush` para asegurar que todas las operaciones en búfer hayan\n\t// sido aplicadas al escritor subyacente.\n\tw.Flush()\n\n}\n",
    "output": "# Prueba a ejecutar el código de escritura de archivos.\n$ go run writing-files.go \nwrote 5 bytes\nwrote 7 bytes\nwrote 9 bytes\n\n# Luego comprueba el contenido de los archivos creados.\n$ cat /tmp/dat1\nhello\ngo\n$ cat /tmp/dat2\nsome\nwrites\nbuffered\n\n# A continuación veremos cómo aplicar estas ideas de E/S de archivos\n# a los flujos de entrada y salida estándar `stdin` y `stdout`.\n",
    "officialUrl": "https://gobyexample.com/writing-files"
  },
  {
    "id": 67,
    "slug": "line-filters",
    "title": "Line Filters",
    "titleEs": "Filtros de Línea y Búferes (bufio.Scanner)",
    "category": "Entrada / Salida y Archivos",
    "categorySlug": "archivos-io",
    "categoryIcon": "folder",
    "difficulty": "Intermedio",
    "summary": "Procesamiento de flujos de texto en streaming leyendo línea por línea desde os.Stdin o archivos con bufio.Scanner.",
    "originalExpl": "Un filtro de línea es un tipo común de programa que lee la entrada en stdin, la procesa y luego imprime algún resultado derivado en stdout. grep y sed son filtros de línea comunes.",
    "basicExpl": {
      "title": "Conceptos Fundamentales para Principiantes",
      "content": "Imagina que tienes un archivo de log de 20 Gigabytes. Si intentas leerlo entero con `os.ReadFile`, tu ordenador se quedará sin memoria RAM y se colgará.\nUn 'filtro de línea' procesa el texto en streaming: lee una línea, hace algo con ella, la imprime y la descarta de la memoria antes de leer la siguiente:\n- Se usa `scanner := bufio.NewScanner(os.Stdin)` o `bufio.NewScanner(archivo)`.\n- Un bucle `for scanner.Scan()` avanza línea por línea.\n- Para leer el texto de la línea actual se usa `scanner.Text()`.",
      "keyPoints": [
        "`bufio.NewScanner(r)`: el tokenizador estándar más cómodo para leer línea por línea.",
        "`scanner.Scan()`: devuelve true mientras haya una siguiente línea disponible.",
        "`scanner.Text()`: devuelve la línea actual como string (sin el salto de línea `\\n`).",
        "Al salir del bucle, siempre verifica errores con `if err := scanner.Err(); err != nil`."
      ]
    },
    "interExpl": {
      "title": "Mecanismos Internos y Buenas Prácticas",
      "content": "Límite Máximo de Línea de Scanner y `scanner.Buffer`:\nPor defecto, `bufio.Scanner` tiene un tamaño máximo de línea predeterminado de 64 KB (`bufio.MaxScanTokenSize = 64 * 1024`). Si tu archivo contiene una sola línea gigantesca que supere los 64KB (por ejemplo, un JSON minificado enorme), el scanner fallará silenciosamente retornando `false` y `scanner.Err()` reportará `bufio.ErrTooLong`.\nPara permitir líneas más largas, se debe configurar un búfer personalizado:\n```go\nscanner := bufio.NewScanner(f)\nbuf := make([]byte, 1024*1024) // Búfer inicial de 1MB\nscanner.Buffer(buf, 10*1024*1024) // Capacidad máxima de 10MB\n```",
      "keyPoints": [
        "Límite por defecto de 64 KB: vigilar el error `bufio.ErrTooLong` en archivos con líneas extensas.",
        "`scanner.Buffer(buf, max)`: amplía el tamaño de línea admitido.",
        "Funciones de división (Split Functions): `scanner.Split(bufio.ScanWords)` permite leer palabra por palabra en vez de línea por línea."
      ]
    },
    "expertExpl": {
      "title": "Bajo Nivel, Rendimiento e Internals",
      "content": "Zero-Copy Scanning con `scanner.Bytes()`:\nCada vez que llamas a `scanner.Text()`, Go convierte el slice de bytes interno a un nuevo string, lo que genera una asignación de memoria en el Heap por cada línea procesada. Si procesas 10 millones de líneas, generarás 10 millones de objetos para el Garbage Collector.\n\nOptimización experta:\nUtiliza `scanner.Bytes()` en lugar de `scanner.Text()`. El método `Bytes()` devuelve una referencia directa al búfer interno de bytes del scanner sin realizar NINGUNA asignación de memoria (0 allocations). ¡Atención!: Los bytes devueltos son sobreescritos en la siguiente llamada a `Scan()`, por lo que deben procesarse inmediatamente o copiarse con `slices.Clone` si necesitan conservarse.",
      "keyPoints": [
        "Zero allocations con `scanner.Bytes()`: máxima velocidad de escaneo sin presionar al Garbage Collector.",
        "Mutabilidad del búfer interno: no retengas el slice de `scanner.Bytes()` entre llamadas consecutivas a `Scan()`.",
        "Tuberías Unix (Pipes): combinación con `os.Stdin` y `os.Stdout` para integrar herramientas Go en flujos de terminal (`cat datos | miAppGo | grep`)."
      ]
    },
    "evaluation": {
      "title": "Reto: Filtro de Palabras Clave en Streaming con Contador",
      "statement": "Escribe una función 'FiltrarLineas(r io.Reader, termino string) (int, error)' que utilice bufio.Scanner para recorrer un flujo de texto, imprima únicamente las líneas que contengan el 'termino' y devuelva la cantidad total de líneas coincidentes.",
      "starterCode": "package main\n\nimport (\n    \"bufio\"\n    \"fmt\"\n    \"io\"\n    \"strings\"\n)\n\nfunc FiltrarLineas(r io.Reader, termino string) (int, error) {\n    // Implementa el scanner y el filtro\n}\n\nfunc main() {\n    texto := \"ERROR: Fallo de conexión\\nINFO: Servicio iniciado\\nERROR: Timeout de BD\\nDEBUG: Ping ok\"\n    // Prueba con strings.NewReader\n}",
      "hint": "Crea scanner := bufio.NewScanner(r). Usa strings.Contains(scanner.Text(), termino).",
      "solution": "package main\n\nimport (\n    \"bufio\"\n    \"fmt\"\n    \"io\"\n    \"strings\"\n)\n\nfunc FiltrarLineas(r io.Reader, termino string) (int, error) {\n    scanner := bufio.NewScanner(r)\n    coincidencias := 0\n    \n    for scanner.Scan() {\n        linea := scanner.Text()\n        if strings.Contains(linea, termino) {\n            fmt.Println(\"[Coincidencia]:\", linea)\n            coincidencias++\n        }\n    }\n    \n    if err := scanner.Err(); err != nil {\n        return coincidencias, err\n    }\n    return coincidencias, nil\n}\n\nfunc main() {\n    logSimulado := `ERROR: Fallo de conexión en base de datos\nINFO: Servidor web escuchando en :8080\nERROR: Token de autenticación expirado\nDEBUG: Tarea cron ejecutada correctamente\nERROR: Fallo de disco en partición /var`\n\n    lector := strings.NewReader(logSimulado)\n    fmt.Println(\"Filtrando líneas con 'ERROR':\")\n    total, err := FiltrarLineas(lector, \"ERROR\")\n    if err != nil {\n        panic(err)\n    }\n    fmt.Printf(\"Total de errores detectados: %d\\n\", total)\n}",
      "explanation": "El escaneo con bufio.Scanner lee línea a línea de forma eficiente sin cargar todo el bloque de texto en memoria. El chequeo final 'scanner.Err()' asegura que la lectura concluyó limpiamente sin interrupciones de I/O."
    },
    "externalLinks": [
      {
        "title": "Paquete bufio: Scanner",
        "url": "https://pkg.go.dev/bufio#Scanner",
        "description": "Documentación oficial de bufio.Scanner y funciones de división."
      },
      {
        "title": "Go by Example Original: Line Filters",
        "url": "https://gobyexample.com/line-filters",
        "description": "Ejemplo en Go by Example."
      },
      {
        "title": "Guía canónica Effective Go: Flujos de lectura continua y scanners",
        "url": "https://go.dev/doc/effective_go#concurrency",
        "description": "Uso de streams y scanners para filtrado eficiente."
      }
    ],
    "code": "// Un _filtro de línea_ es un tipo de programa común que lee\n// entradas desde stdin, las procesa y luego imprime algún\n// resultado derivado en stdout. `grep` y `sed` son filtros\n// de línea habituales.\n\n// Aquí tenemos un ejemplo de filtro de línea en Go que escribe en\n// mayúsculas todo el texto de entrada. Puedes utilizar este patrón\n// para escribir tus propios filtros de línea en Go.\npackage main\n\nimport (\n\t\"bufio\"\n\t\"fmt\"\n\t\"os\"\n\t\"strings\"\n)\n\nfunc main() {\n\n\t// Envolver el flujo sin búfer `os.Stdin` con un scanner con\n\t// búfer nos proporciona un método conveniente `Scan` que\n\t// avanza el scanner al siguiente token (la siguiente línea por defecto).\n\tscanner := bufio.NewScanner(os.Stdin)\n\n\tfor scanner.Scan() {\n\t\t// `Text` devuelve el token actual (aquí la línea siguiente)\n\t\t// proveniente de la entrada.\n\t\tucl := strings.ToUpper(scanner.Text())\n\n\t\t// Escribe la línea convertida a mayúsculas.\n\t\tfmt.Println(ucl)\n\t}\n\n\t// Comprobamos si ocurrieron errores durante `Scan`. El fin de archivo (EOF)\n\t// es esperado y `Scan` no lo reporta como un error.\n\tif err := scanner.Err(); err != nil {\n\t\tfmt.Fprintln(os.Stderr, \"error:\", err)\n\t\tos.Exit(1)\n\t}\n}\n",
    "output": "# Para probar nuestro filtro de línea, primero creamos un archivo con unas\n# pocas líneas en minúsculas.\n$ echo 'hello'   > /tmp/lines\n$ echo 'filter' >> /tmp/lines\n\n# Luego usamos el filtro de línea para obtener las líneas en mayúsculas.\n$ cat /tmp/lines | go run line-filters.go\nHELLO\nFILTER\n",
    "officialUrl": "https://gobyexample.com/line-filters"
  },
  {
    "id": 68,
    "slug": "file-paths",
    "title": "File Paths",
    "titleEs": "Rutas de Archivos Multiplataforma (path/filepath)",
    "category": "Entrada / Salida y Archivos",
    "categorySlug": "archivos-io",
    "categoryIcon": "folder",
    "difficulty": "Principiante",
    "summary": "Construcción, análisis y normalización de rutas de archivos de forma portable entre Windows, Linux y macOS con 'path/filepath'.",
    "originalExpl": "El paquete filepath proporciona funciones para analizar y construir rutas de archivos de una manera que sea portable entre sistemas operativos; por ejemplo, 'dir/file' en Linux vs 'dir\\file' en Windows.",
    "basicExpl": {
      "title": "Conceptos Fundamentales para Principiantes",
      "content": "Un error muy común de principiante es concatenar rutas de archivos con barras a mano: `\"carpeta/\" + archivo`. Esto falla en Windows, que usa barras invertidas (`\\`), y rompe tu programa cuando cambia de sistema operativo.\nEl paquete oficial `path/filepath` soluciona esto automáticamente:\n- Unir rutas de forma segura: `filepath.Join(\"carpeta\", \"subcarpeta\", \"archivo.txt\")` (pone automáticamente `/` en Linux/Mac y `\\` en Windows).\n- Extraer solo la carpeta contenedora: `filepath.Dir(ruta)`.\n- Extraer solo el nombre del archivo: `filepath.Base(ruta)`.\n- Extraer la extensión: `filepath.Ext(ruta)` (ej. \".txt\").",
      "keyPoints": [
        "Usa SIEMPRE `path/filepath` para archivos del sistema de disco (usa `path` solo para URLs de internet).",
        "`filepath.Join()`: une segmentos usando el separador nativo del SO (`filepath.Separator`).",
        "`filepath.Clean()`: limpia y resuelve puntos dobles `..` y barras redundantes.",
        "`filepath.IsAbs(ruta)`: comprueba si una ruta es absoluta."
      ]
    },
    "interExpl": {
      "title": "Mecanismos Internos y Buenas Prácticas",
      "content": "Rutas Relativas, Absolutas y Prevención de Path Traversal (Zip Slip):\nPara calcular cómo llegar de una ruta A a una ruta B, se utiliza `filepath.Rel(base, objetivo)`.\nPara convertir cualquier ruta relativa en una ruta absoluta completa desde la raíz del sistema de archivos, se usa `filepath.Abs(ruta)`.\n\nVulnerabilidad de Seguridad Crítica (Path Traversal / Zip Slip):\nAl descomprimir archivos ZIP o aceptar nombres de archivo de usuarios, un atacante puede enviar nombres maliciosos como `../../etc/passwd`.\nBuena práctica: Resuelve con `filepath.Clean()`, calcula la ruta absoluta con `filepath.Abs()` y comprueba con `strings.HasPrefix(rutaDestino, directorioBaseSeguro)` para asegurarte de que el archivo no escape de la carpeta permitida.",
      "keyPoints": [
        "Prevención de Zip Slip: sanitizar siempre entradas externas con `filepath.Clean` y validar el prefijo del directorio base.",
        "`filepath.Rel(base, target)`: calcula rutas relativas de forma portable.",
        "`filepath.Match(patron, nombre)`: comprobación de patrones comodín estilo shell (globbing)."
      ]
    },
    "expertExpl": {
      "title": "Bajo Nivel, Rendimiento e Internals",
      "content": "Diferencias de Kernel y Enlaces Simbólicos con `filepath.EvalSymlinks`:\nEn sistemas Unix, una ruta puede contener enlaces simbólicos (symlinks) que apunten a ubicaciones físicas completamente diferentes. La función `filepath.Clean()` solo realiza manipulación puramente sintáctica del texto sin consultar al disco; no detecta si un symlink apunta fuera del directorio permitido.\n\nPara seguridad de nivel de producción en entornos restringidos (sandboxes o contenedores), se debe invocar a `filepath.EvalSymlinks(ruta)`: esta función consulta directamente los inodos del sistema de archivos mediante la syscall `readlink` y devuelve la ruta física real canonicalizada.",
      "keyPoints": [
        "`filepath.EvalSymlinks`: resuelve y canonicaliza enlaces simbólicos consultando los inodos reales del sistema de archivos.",
        "Sintaxis UNC y prefijos de volumen en Windows: `filepath.VolumeName(ruta)` gestiona letras de unidad (`C:`) y rutas de red (`\\\\servidor\\recurso`).",
        "Diferencia `path` vs `filepath`: `path` utiliza siempre barras inclinadas hacia adelante `/` sin importar el SO (reservado para URLs y ZIPs); `filepath` se adapta a la plataforma."
      ]
    },
    "evaluation": {
      "title": "Reto: Sanitizador de Rutas contra Ataques Path Traversal",
      "statement": "Escribe una función 'RutaSegura(directorioBase, entradaUsuario string) (string, error)' que combine el directorio base con la entrada del usuario y verifique que la ruta resultante no se escape del directorio base mediantesecuencias '../'. Si es segura, devuelve la ruta absoluta normalizada; si intenta escapar, devuelve un error.",
      "starterCode": "package main\n\nimport (\n    \"errors\"\n    \"fmt\"\n    \"path/filepath\"\n    \"strings\"\n)\n\nfunc RutaSegura(directorioBase, entradaUsuario string) (string, error) {\n    // Normaliza y valida que pertenezca al directorio base\n}\n\nfunc main() {\n    // Prueba con entrada válida y con ataque ../../etc/passwd\n}",
      "hint": "Usa filepath.Abs y filepath.Join, luego comprueba si strings.HasPrefix(rutaFinal, baseAbs).",
      "solution": "package main\n\nimport (\n    \"errors\"\n    \"fmt\"\n    \"path/filepath\"\n    \"strings\"\n)\n\nfunc RutaSegura(directorioBase, entradaUsuario string) (string, error) {\n    baseAbs, err := filepath.Abs(directorioBase)\n    if err != nil {\n        return \"\", err\n    }\n    \n    // Unimos y limpiamos la ruta combinada\n    rutaCombinada := filepath.Join(baseAbs, entradaUsuario)\n    rutaFinal, err := filepath.Abs(rutaCombinada)\n    if err != nil {\n        return \"\", err\n    }\n    \n    // Verificamos que la ruta final permanezca dentro del directorio base\n    if !strings.HasPrefix(rutaFinal, baseAbs) {\n        return \"\", errors.New(\"alerta de seguridad: intento de escape de directorio (Path Traversal)\")\n    }\n    return rutaFinal, nil\n}\n\nfunc main() {\n    base := \"/var/www/uploads\"\n    \n    // Caso 1: Entrada legítima\n    r1, err1 := RutaSegura(base, \"fotos/perfil.png\")\n    fmt.Println(\"Caso válido   :\", r1, \"| Error:\", err1)\n    \n    // Caso 2: Intento malicioso de escape\n    r2, err2 := RutaSegura(base, \"../../etc/shadow\")\n    fmt.Println(\"Caso malicioso:\", r2, \"| Error:\", err2)\n}",
      "explanation": "Al convertir ambas rutas a sus formas absolutas canonicalizadas y comprobar que la ruta resultante comience obligatoriamente con el prefijo del directorio base (`strings.HasPrefix`), se neutraliza por completo cualquier intento de escapar hacia directorios protegidos del sistema operativo."
    },
    "externalLinks": [
      {
        "title": "Paquete path/filepath (Biblioteca estándar de Go)",
        "url": "https://pkg.go.dev/path/filepath",
        "description": "Documentación oficial del paquete path/filepath."
      },
      {
        "title": "Go by Example Original: File Paths",
        "url": "https://gobyexample.com/file-paths",
        "description": "Ejemplo en Go by Example."
      },
      {
        "title": "Guía OWASP: Prevención de vulnerabilidades de salto de directorio (Path Traversal)",
        "url": "https://owasp.org/www-community/attacks/Path_Traversal",
        "description": "Guía de seguridad de OWASP sobre prevención de ataques de rutas."
      }
    ],
    "code": "// El paquete `filepath` proporciona funciones para parsear\n// y construir *rutas de archivos* de forma completamente portable\n// entre sistemas operativos; por ejemplo, `dir/file` en Linux frente\n// a `dir\\file` en Windows.\npackage main\n\nimport (\n\t\"fmt\"\n\t\"path/filepath\"\n\t\"strings\"\n)\n\nfunc main() {\n\n\t// `Join` debe utilizarse para construir rutas de forma\n\t// portable. Recibe cualquier número de argumentos\n\t// y construye una ruta jerárquica a partir de ellos.\n\tp := filepath.Join(\"dir1\", \"dir2\", \"filename\")\n\tfmt.Println(\"p:\", p)\n\n\t// Siempre debes utilizar `Join` en vez de concatenar\n\t// `/` o `\\` manualmente. Además de brindar portabilidad,\n\t// `Join` normaliza las rutas eliminando separadores superfluos\n\t// y cambios de directorio redundantes.\n\tfmt.Println(filepath.Join(\"dir1//\", \"filename\"))\n\tfmt.Println(filepath.Join(\"dir1/../dir1\", \"filename\"))\n\n\t// `Dir` y `Base` pueden usarse para separar la ruta del\n\t// directorio y el archivo. Como alternativa, `Split`\n\t// devolverá ambos componentes en una sola llamada.\n\tfmt.Println(\"Dir(p):\", filepath.Dir(p))\n\tfmt.Println(\"Base(p):\", filepath.Base(p))\n\n\t// Podemos verificar si una ruta es absoluta.\n\tfmt.Println(filepath.IsAbs(\"dir/file\"))\n\tfmt.Println(filepath.IsAbs(\"/dir/file\"))\n\n\tfilename := \"config.json\"\n\n\t// Algunos nombres de archivo tienen extensiones tras un punto.\n\t// Podemos separar la extensión de dichos nombres mediante `Ext`.\n\text := filepath.Ext(filename)\n\tfmt.Println(ext)\n\n\t// Para obtener el nombre del archivo sin su extensión,\n\t// utiliza `strings.TrimSuffix`.\n\tfmt.Println(strings.TrimSuffix(filename, ext))\n\n\t// `Rel` encuentra una ruta relativa entre una ruta *base* y un\n\t// *objetivo*. Devuelve un error si el objetivo no puede hacerse\n\t// relativo respecto a la base.\n\trel, err := filepath.Rel(\"a/b\", \"a/b/t/file\")\n\tif err != nil {\n\t\tpanic(err)\n\t}\n\tfmt.Println(rel)\n\n\trel, err = filepath.Rel(\"a/b\", \"a/c/t/file\")\n\tif err != nil {\n\t\tpanic(err)\n\t}\n\tfmt.Println(rel)\n}\n",
    "output": "$ go run file-paths.go\np: dir1/dir2/filename\ndir1/filename\ndir1/filename\nDir(p): dir1/dir2\nBase(p): filename\nfalse\ntrue\n.json\nconfig\nt/file\n../c/t/file\n",
    "officialUrl": "https://gobyexample.com/file-paths"
  },
  {
    "id": 69,
    "slug": "directories",
    "title": "Directories",
    "titleEs": "Manejo y Recorrido de Directorios (os y filepath.WalkDir)",
    "category": "Entrada / Salida y Archivos",
    "categorySlug": "archivos-io",
    "categoryIcon": "folder",
    "difficulty": "Intermedio",
    "summary": "Creación, lectura y recorrido recursivo de árboles de directorios con os.MkdirAll, os.ReadDir y filepath.WalkDir.",
    "originalExpl": "Go tiene varias funciones útiles para trabajar con directorios en el sistema de archivos. En este ejemplo veremos cómo crear directorios, leer sus contenidos y recorrerlos recursivamente.",
    "basicExpl": {
      "title": "Conceptos Fundamentales para Principiantes",
      "content": "Gestionar carpetas en tu sistema operativo es muy sencillo:\n- Crear una carpeta simple: `os.Mkdir(\"mi_carpeta\", 0755)`.\n- Crear carpetas anidadas (como `mkdir -p`): `os.MkdirAll(\"padre/hijo/nieto\", 0755)` (si las carpetas intermedias no existen, Go las crea todas automáticamente).\n- Listar el contenido de una carpeta: `entradas, err := os.ReadDir(\"mi_carpeta\")`.\n- Borrar una carpeta y todo lo que contiene adentro: `os.RemoveAll(\"mi_carpeta\")`.",
      "keyPoints": [
        "`os.MkdirAll(ruta, permisos)`: la forma recomendada para crear carpetas sin preocuparte si los padres existen.",
        "`os.ReadDir(ruta)`: devuelve un slice de `os.DirEntry` (mucho más rápido que el antiguo `os.Readdir`).",
        "`os.RemoveAll(ruta)`: borra de forma recursiva similar a `rm -rf`.",
        "Cada `DirEntry` permite saber si es un archivo o una carpeta con `entry.IsDir()`."
      ]
    },
    "interExpl": {
      "title": "Mecanismos Internos y Buenas Prácticas",
      "content": "Recorrido Recursivo Moderno con `filepath.WalkDir`:\nPara explorar todos los archivos y subcarpetas dentro de un proyecto, Go 1.16 introdujo `filepath.WalkDir` (que sustituyó al antiguo `filepath.Walk`):\n```go\nerr := filepath.WalkDir(\".\", func(path string, d fs.DirEntry, err error) error {\n    if err != nil { return err }\n    if d.IsDir() && d.Name() == \".git\" {\n        return filepath.SkipDir // Omite explorar carpetas gigantes ignoradas\n    }\n    fmt.Println(path, \"Es carpeta?:\", d.IsDir())\n    return nil\n})\n```\n`filepath.SkipDir` permite saltarse ramas enteras del árbol ahorrando miles de lecturas innecesarias.",
      "keyPoints": [
        "`filepath.WalkDir`: estándar moderno en Go 1.16+; es hasta 2x a 4x veces más rápido que `Walk`.",
        "`filepath.SkipDir`: valor de retorno especial para omitir subdirectorios (ej. ignorar `node_modules` o `.git`).",
        "Paquete `io/fs`: abstracción introducida en Go 1.16 para tratar cualquier sistema de archivos de forma uniforme."
      ]
    },
    "expertExpl": {
      "title": "Bajo Nivel, Rendimiento e Internals",
      "content": "Por qué `WalkDir` es 4x más rápido que `Walk` (Evitando llamadas Stat):\nEn el `filepath.Walk` clásico, para cada archivo encontrado se ejecutaba una llamada al sistema `os.Stat()` con el fin de obtener la estructura `FileInfo` (tamaño, permisos, fecha).\nEn sistemas de archivos modernos (Linux ext4, macOS APFS, Windows NTFS), la syscall de listado de directorio (`getdents64` en Linux) ya devuelve el TIPO de archivo (si es directorio, enlace o archivo regular) dentro de la propia entrada del directorio (`d_type`).\n\n`filepath.WalkDir` utiliza `os.DirEntry`, leyendo ese tipo directamente de la memoria sin realizar ninguna llamada `Stat` adicional por archivo, reduciendo el número de syscalls al kernel en un 80% al explorar árboles con cientos de miles de archivos.",
      "keyPoints": [
        "Eliminación de syscalls Stat: aprovecha el campo `d_type` devuelto directamente por la llamada al kernel `getdents64`.",
        "Consumo de descriptores: `WalkDir` mantiene un descriptor de archivo abierto por cada nivel de profundidad de anidación.",
        "`filepath.SkipAll` (Go 1.19+): permite abortar el recorrido completo del árbol de inmediato en cuanto se encuentra lo que se buscaba."
      ]
    },
    "evaluation": {
      "title": "Reto: Buscador Recursivo de Archivos por Extensión con WalkDir",
      "statement": "Escribe una función 'BuscarPorExtension(raiz, extension string) ([]string, error)' que recorra recursivamente el directorio raíz usando filepath.WalkDir y devuelva una lista con las rutas de todos los archivos que coincidan con la extensión (ej. '.go' o '.txt').",
      "starterCode": "package main\n\nimport (\n    \"fmt\"\n    \"io/fs\"\n    \"path/filepath\"\n)\n\nfunc BuscarPorExtension(raiz, extension string) ([]string, error) {\n    // Usa filepath.WalkDir y filepath.Ext\n}\n\nfunc main() {\n    // Busca archivos en el directorio actual\n}",
      "hint": "Comprueba if !d.IsDir() && filepath.Ext(path) == extension { coincidencias = append(...) }.",
      "solution": "package main\n\nimport (\n    \"fmt\"\n    \"io/fs\"\n    \"os\"\n    \"path/filepath\"\n)\n\nfunc BuscarPorExtension(raiz, extension string) ([]string, error) {\n    var encontrados []string\n    \n    err := filepath.WalkDir(raiz, func(path string, d fs.DirEntry, err error) error {\n        if err != nil {\n            return err\n        }\n        // Solo nos interesan archivos regulares, no directorios\n        if !d.IsDir() && filepath.Ext(path) == extension {\n            encontrados = append(encontrados, path)\n        }\n        return nil\n    })\n    \n    return encontrados, err\n}\n\nfunc main() {\n    // Creamos una estructura de prueba temporal\n    base := \"prueba_arbol\"\n    os.MkdirAll(filepath.Join(base, \"sub1\"), 0755)\n    os.MkdirAll(filepath.Join(base, \"sub2\"), 0755)\n    defer os.RemoveAll(base)\n    \n    os.WriteFile(filepath.Join(base, \"doc1.txt\"), []byte(\"a\"), 0644)\n    os.WriteFile(filepath.Join(base, \"sub1\", \"doc2.txt\"), []byte(\"b\"), 0644)\n    os.WriteFile(filepath.Join(base, \"sub2\", \"codigo.go\"), []byte(\"c\"), 0644)\n    \n    archivos, err := BuscarPorExtension(base, \".txt\")\n    if err != nil {\n        panic(err)\n    }\n    \n    fmt.Println(\"Archivos .txt encontrados en el árbol:\")\n    for _, a := range archivos {\n        fmt.Println(\"->\", a)\n    }\n}",
      "explanation": "La función 'filepath.WalkDir' desciende automáticamente por toda la jerarquía de carpetas. Al validar `!d.IsDir()` y comparar `filepath.Ext(path) == extension`, filtra con precisión los archivos deseados de forma rápida y con mínimo impacto de memoria."
    },
    "externalLinks": [
      {
        "title": "Paquete filepath: WalkDir",
        "url": "https://pkg.go.dev/path/filepath#WalkDir",
        "description": "Documentación oficial de la función de recorrido de directorios WalkDir."
      },
      {
        "title": "Paquete io/fs (Biblioteca estándar de Go)",
        "url": "https://pkg.go.dev/io/fs",
        "description": "La interfaz de sistema de archivos virtual introducida en Go 1.16."
      },
      {
        "title": "Go by Example Original: Directories",
        "url": "https://gobyexample.com/directories",
        "description": "Ejemplo interactivo en Go by Example."
      }
    ],
    "code": "// Go cuenta con varias funciones útiles para trabajar con\n// *directorios* en el sistema de archivos.\n\npackage main\n\nimport (\n\t\"fmt\"\n\t\"io/fs\"\n\t\"os\"\n\t\"path/filepath\"\n)\n\nfunc check(e error) {\n\tif e != nil {\n\t\tpanic(e)\n\t}\n}\n\nfunc main() {\n\n\t// Crea un nuevo subdirectorio en el directorio de trabajo\n\t// actual.\n\terr := os.Mkdir(\"subdir\", 0755)\n\tcheck(err)\n\n\t// Al crear directorios temporales o de prueba, es buena\n\t// práctica posponer (`defer`) su eliminación. `os.RemoveAll`\n\t// eliminará un árbol completo de directorios (similar a `rm -rf`).\n\tdefer os.RemoveAll(\"subdir\")\n\n\t// Función auxiliar para crear un archivo vacío nuevo.\n\tcreateEmptyFile := func(name string) {\n\t\td := []byte(\"\")\n\t\tcheck(os.WriteFile(name, d, 0644))\n\t}\n\n\tcreateEmptyFile(\"subdir/file1\")\n\n\t// Podemos crear una jerarquía completa de directorios, incluyendo\n\t// los padres faltantes con `MkdirAll` (similar a `mkdir -p` en la terminal).\n\terr = os.MkdirAll(\"subdir/parent/child\", 0755)\n\tcheck(err)\n\n\tcreateEmptyFile(\"subdir/parent/file2\")\n\tcreateEmptyFile(\"subdir/parent/file3\")\n\tcreateEmptyFile(\"subdir/parent/child/file4\")\n\n\t// `ReadDir` lista el contenido de un directorio, devolviendo\n\t// un slice de objetos `os.DirEntry`.\n\tc, err := os.ReadDir(\"subdir/parent\")\n\tcheck(err)\n\n\tfmt.Println(\"Listing subdir/parent\")\n\tfor _, entry := range c {\n\t\tfmt.Println(\" \", entry.Name(), entry.IsDir())\n\t}\n\n\t// `Chdir` nos permite cambiar el directorio de trabajo actual,\n\t// de manera similar al comando `cd`.\n\terr = os.Chdir(\"subdir/parent/child\")\n\tcheck(err)\n\n\t// Ahora veremos el contenido de `subdir/parent/child`\n\t// al listar el directorio *actual*.\n\tc, err = os.ReadDir(\".\")\n\tcheck(err)\n\n\tfmt.Println(\"Listing subdir/parent/child\")\n\tfor _, entry := range c {\n\t\tfmt.Println(\" \", entry.Name(), entry.IsDir())\n\t}\n\n\t// Regresamos mediante `cd` al punto de partida.\n\terr = os.Chdir(\"../../..\")\n\tcheck(err)\n\n\t// También podemos recorrer un directorio de forma *recursiva*,\n\t// incluyendo todos sus subdirectorios. `WalkDir` acepta\n\t// una función de retorno (callback) para procesar cada archivo o directorio visitado.\n\tfmt.Println(\"Visiting subdir\")\n\terr = filepath.WalkDir(\"subdir\", visit)\n\tcheck(err)\n}\n\n// `visit` es invocada por cada archivo o directorio hallado\n// recursivamente mediante `filepath.WalkDir`.\nfunc visit(path string, d fs.DirEntry, err error) error {\n\tif err != nil {\n\t\treturn err\n\t}\n\tfmt.Println(\" \", path, d.IsDir())\n\treturn nil\n}\n",
    "output": "$ go run directories.go\nListing subdir/parent\n  child true\n  file2 false\n  file3 false\nListing subdir/parent/child\n  file4 false\nVisiting subdir\n  subdir true\n  subdir/file1 false\n  subdir/parent true\n  subdir/parent/child true\n  subdir/parent/child/file4 false\n  subdir/parent/file2 false\n  subdir/parent/file3 false\n",
    "officialUrl": "https://gobyexample.com/directories"
  },
  {
    "id": 70,
    "slug": "temporary-files-and-directories",
    "title": "Temporary Files and Directories",
    "titleEs": "Archivos y Carpetas Temporales (os.CreateTemp)",
    "category": "Entrada / Salida y Archivos",
    "categorySlug": "archivos-io",
    "categoryIcon": "folder",
    "difficulty": "Principiante",
    "summary": "Creación segura de archivos y carpetas efímeros en el directorio temporal del sistema con auto-limpieza garantizada.",
    "originalExpl": "A lo largo de la ejecución de programas, a menudo queremos crear datos que no son necesarios después de que el programa salga. Los archivos y directorios temporales son ideales para este propósito.",
    "basicExpl": {
      "title": "Conceptos Fundamentales para Principiantes",
      "content": "A veces tu programa necesita procesar un video, descomprimir un archivo o descargar datos temporales que no quieres guardar para siempre:\n- Crear un archivo temporal: `f, err := os.CreateTemp(\"\", \"mi-app-*.txt\")`.\n  - Si pasas `\"\"` como primer argumento, Go usa automáticamente la carpeta temporal oficial del sistema operativo (`/tmp` en Linux/Mac o `AppData\\Local\\Temp` en Windows).\n  - El asterisco `*` en el nombre es reemplazado por números aleatorios para garantizar que nunca colisione con otro archivo.\n- Crear una carpeta temporal: `dir, err := os.MkdirTemp(\"\", \"mi-lote-*\")`.\n- Limpieza automática: programa `defer os.Remove(f.Name())` o `defer os.RemoveAll(dir)` inmediatamente.",
      "keyPoints": [
        "`os.CreateTemp(dir, patron)`: crea y abre un archivo temporal con nombre único.",
        "`os.MkdirTemp(dir, patron)`: crea un directorio temporal único.",
        "El comodín `*` en el patrón se reemplaza por caracteres aleatorios únicos.",
        "Siempre programa la eliminación con `defer os.Remove` / `defer os.RemoveAll`."
      ]
    },
    "interExpl": {
      "title": "Mecanismos Internos y Buenas Prácticas",
      "content": "Seguridad contra Ataques de Enlaces Simbólicos (Symlink Attacks):\nHistóricamente en C, crear archivos temporales con nombres predecibles como `/tmp/mi_app.tmp` permitía que un atacante local creara un enlace simbólico apuntando a un archivo crítico del sistema (como `/etc/passwd`), haciendo que tu programa lo sobreescribiera con permisos de administrador.\n`os.CreateTemp` de Go es inherentemente seguro:\n- Utiliza banderas de creación exclusiva del kernel del sistema operativo (`O_CREATE|O_EXCL`).\n- Genera sufijos aleatorios criptográficamente seguros.\n- Fija permisos restrictivos `0600` (solo el usuario actual puede leer o escribir en el archivo temporal).",
      "keyPoints": [
        "Creación atómica exclusiva (`O_EXCL`): previene condiciones de carrera en el sistema de archivos.",
        "Permisos restrictivos `0600`: inaccesible para otros usuarios del sistema operativo.",
        "Limpieza en testing: en pruebas unitarias se debe usar `t.TempDir()`, que limpia el directorio temporal automáticamente al terminar el test sin necesidad de defer."
      ]
    },
    "expertExpl": {
      "title": "Bajo Nivel, Rendimiento e Internals",
      "content": "Archivos Temporales Anónimos sin Nombre en Disco (Linux `O_TMPFILE`):\nEn sistemas Linux de alto rendimiento, puedes crear un archivo temporal y desvincularlo inmediatamente del árbol de directorios con `os.Remove(f.Name())` mientras mantienes el descriptor de archivo abierto (`f`).\nEl archivo continúa existiendo en los inodos del sistema de archivos mientras el proceso lo tenga abierto, pero desaparece completamente del explorador de archivos. Cuando tu programa termina (incluso si sufre un pánico violento o se apaga la máquina), el kernel del sistema operativo libera los bloques de disco instantáneamente sin dejar ningún archivo huérfano en `/tmp`.",
      "keyPoints": [
        "Unlink-on-Open Pattern: desvincular el archivo tras abrirlo asegura limpieza automática por el kernel ante caídas bruscas.",
        "Sistemas de archivos en memoria RAM (`tmpfs`): en Linux, `/tmp` suele ser un sistema de archivos `tmpfs` en memoria RAM, logrando transferencias a velocidad de bus de memoria.",
        "Testing en Go 1.15+: `t.TempDir()` gestiona subdirectorios efímeros aislados por cada test paralelo."
      ]
    },
    "evaluation": {
      "title": "Reto: Espacio de Trabajo Efímero con Limpieza Garantizada",
      "statement": "Escribe una función que cree un directorio temporal con os.MkdirTemp. Dentro de él, crea un archivo temporal con os.CreateTemp, escribe la fecha actual y muestra la ruta completa del archivo creado. Asegúrate de programar la limpieza de todo el directorio con defer os.RemoveAll.",
      "starterCode": "package main\n\nimport (\n    \"fmt\"\n    \"os\"\n    \"time\"\n)\n\nfunc main() {\n    // Crea directorio temporal, archivo temporal adentro, escribe y limpia\n}",
      "hint": "Crea dir, err := os.MkdirTemp(\"\", \"workspace-*\"); defer os.RemoveAll(dir). Luego os.CreateTemp(dir, \"*.log\").",
      "solution": "package main\n\nimport (\n    \"fmt\"\n    \"os\"\n    \"path/filepath\"\n    \"time\"\n)\n\nfunc main() {\n    // 1. Crear directorio temporal en la carpeta temporal del sistema\n    dirTemp, err := os.MkdirTemp(\"\", \"mi-workspace-*\")\n    if err != nil {\n        panic(err)\n    }\n    // Garantizamos que todo el directorio y su contenido se borren al salir\n    defer func() {\n        os.RemoveAll(dirTemp)\n        fmt.Println(\"Limpieza completada: directorio temporal eliminado.\")\n    }()\n    \n    fmt.Println(\"Directorio temporal creado:\", dirTemp)\n    \n    // 2. Crear archivo temporal dentro de ese directorio\n    fTemp, err := os.CreateTemp(dirTemp, \"registro-*.txt\")\n    if err != nil {\n        panic(err)\n    }\n    defer fTemp.Close()\n    \n    // 3. Escribir datos\n    mensaje := fmt.Sprintf(\"Proceso ejecutado el: %s\\n\", time.Now().Format(time.RFC3339))\n    fTemp.WriteString(mensaje)\n    \n    fmt.Println(\"Archivo temporal listo en :\", fTemp.Name())\n    \n    // Verificamos que existe físicamente\n    if _, err := os.Stat(filepath.Join(dirTemp, filepath.Base(fTemp.Name()))); err == nil {\n        fmt.Println(\"Verificación física: el archivo existe en disco.\")\n    }\n}",
      "explanation": "Al usar 'os.MkdirTemp' combinado con 'defer os.RemoveAll(dirTemp)', se crea un entorno de trabajo hermético y aislado. Cualquier archivo creado dentro de este directorio se eliminará automáticamente al salir de la función, manteniendo el sistema libre de archivos basura."
    },
    "externalLinks": [
      {
        "title": "Paquete os: CreateTemp and MkdirTemp",
        "url": "https://pkg.go.dev/os#CreateTemp",
        "description": "Documentación oficial de creación de archivos y carpetas temporales."
      },
      {
        "title": "Go by Example Original: Temporary Files and Directories",
        "url": "https://gobyexample.com/temporary-files-and-directories",
        "description": "Ejemplo en Go by Example."
      },
      {
        "title": "Pruebas unitarias: Función t.TempDir para directorios temporales",
        "url": "https://pkg.go.dev/testing#T.TempDir",
        "description": "Cómo gestionar directorios temporales en pruebas unitarias con Go."
      }
    ],
    "code": "// Durante la ejecución de un programa, a menudo deseamos crear\n// datos que no se requieren una vez que el programa concluye.\n// Los *archivos y directorios temporales* resultan idóneos para este\n// propósito, ya que no ensucian el sistema de archivos con el paso del\n// tiempo.\n\npackage main\n\nimport (\n\t\"fmt\"\n\t\"os\"\n\t\"path/filepath\"\n)\n\nfunc check(e error) {\n\tif e != nil {\n\t\tpanic(e)\n\t}\n}\n\nfunc main() {\n\n\t// La forma más directa de crear un archivo temporal es invocando\n\t// `os.CreateTemp`. Crea un archivo *y* lo abre para\n\t// lectura y escritura. Proporcionamos `\"\"` como primer argumento\n\t// para que `os.CreateTemp` cree el archivo en la ubicación\n\t// predeterminada del sistema operativo (por ejemplo `/tmp` en Unix).\n\tf, err := os.CreateTemp(\"\", \"sample\")\n\tcheck(err)\n\n\t// Muestra el nombre del archivo temporal. En sistemas basados\n\t// en Unix el directorio suele ser `/tmp`. El nombre del archivo\n\t// inicia con el prefijo indicado como segundo argumento y el resto\n\t// se genera automáticamente para garantizar unicidad ante accesos concurrentes.\n\tfmt.Println(\"Temp file name:\", f.Name())\n\n\t// Limpiamos el archivo una vez que terminamos. El sistema operativo\n\t// eventualmente limpia los temporales, pero es una buena práctica\n\t// hacerlo explícitamente con `defer`.\n\tdefer os.Remove(f.Name())\n\n\t// Podemos escribir datos en el archivo temporal.\n\t_, err = f.Write([]byte{1, 2, 3, 4})\n\tcheck(err)\n\n\t// Si tenemos la intención de escribir múltiples archivos temporales,\n\t// es preferible crear un *directorio* temporal. Los argumentos de\n\t// `os.MkdirTemp` son iguales a los de `CreateTemp`, pero retorna el\n\t// *nombre* del directorio en lugar de un archivo abierto.\n\tdname, err := os.MkdirTemp(\"\", \"sampledir\")\n\tcheck(err)\n\tfmt.Println(\"Temp dir name:\", dname)\n\n\tdefer os.RemoveAll(dname)\n\n\t// Ahora podemos componer nombres de archivos temporales\n\t// anteponiendo la ruta de nuestro directorio temporal.\n\tfname := filepath.Join(dname, \"file1\")\n\terr = os.WriteFile(fname, []byte{1, 2}, 0666)\n\tcheck(err)\n}\n",
    "output": "$ go run temporary-files-and-directories.go\nTemp file name: /tmp/sample610887201\nTemp dir name: /tmp/sampledir898854668\n",
    "officialUrl": "https://gobyexample.com/temporary-files-and-directories"
  },
  {
    "id": 71,
    "slug": "embed-directive",
    "title": "Embed Directive",
    "titleEs": "Directiva //go:embed (Incrustación de Archivos en el Binario)",
    "category": "Entrada / Salida y Archivos",
    "categorySlug": "archivos-io",
    "categoryIcon": "folder",
    "difficulty": "Intermedio",
    "summary": "Incrustación de archivos estáticos (HTML, plantillas, imágenes, scripts SQL) directamente dentro del binario compilado en Go 1.16+.",
    "originalExpl": "//go:embed es una directiva del compilador que permite incrustar archivos y carpetas estáticas directamente dentro del binario de Go en tiempo de compilación.",
    "basicExpl": {
      "title": "Conceptos Fundamentales para Principiantes",
      "content": "Antes de Go 1.16, si creabas un servidor web con archivos HTML, CSS e imágenes, tenías que copiar la carpeta de archivos junto con el archivo ejecutable al servidor de producción. Si olvidabas copiar la carpeta, el programa fallaba.\nCon la directiva `//go:embed`:\n- El compilador toma los archivos de tu disco y los mete FÍSICAMENTE DENTRO del archivo ejecutable binario.\n- Tu binario final es un único archivo que contiene todo: el código, las imágenes y las páginas web.\n- Puedes incrustar como `string`, como `[]byte` o como un sistema de archivos virtual completo con `embed.FS`.",
      "keyPoints": [
        "Directiva del compilador: se escribe con la sintaxis exacta `//go:embed ruta/archivo` (sin espacio después de `//`).",
        "Se debe importar el paquete con `import _ \"embed\"` o `import \"embed\"`.",
        "Permite distribuir aplicaciones web completas en un ÚNICO archivo binario ejecutable.",
        "Solo puede incrustar archivos que estén en el mismo directorio del paquete o subdirectorios."
      ]
    },
    "interExpl": {
      "title": "Mecanismos Internos y Buenas Prácticas",
      "content": "Uso de `embed.FS` y Servidores Web con `http.FileServer`:\nPara incrustar carpetas completas con múltiples archivos y servirlos directamente en una web:\n```go\nimport (\n    \"embed\"\n    \"net/http\"\n)\n\n//go:embed public/*\nvar contenidoEstatico embed.FS\n\nfunc main() {\n    // Sirve los archivos incrustados directamente con HTTP\n    http.Handle(\"/\", http.FileServer(http.FS(contenidoEstatico)))\n}\n```\n`embed.FS` implementa la interfaz universal `io/fs.FS`, lo que permite usarlo con `html/template.ParseFS()` para cargar plantillas web directamente desde el binario compilado.",
      "keyPoints": [
        "`embed.FS`: sistema de archivos virtual de solo lectura integrado.",
        "Integración con `http.FS`: sirve contenido estático embebido directamente sin tocar el disco en producción.",
        "Restricción de seguridad: no permite usar `..` para incrustar archivos ubicados fuera del módulo o directorio del paquete."
      ]
    },
    "expertExpl": {
      "title": "Bajo Nivel, Rendimiento e Internals",
      "content": "Almacenamiento en el Segmento de Solo Lectura (.rodata):\nDurante la compilación, el compilador de Go (`cmd/compile`) lee los archivos especificados en la directiva `//go:embed` y los vuelca directamente en la sección de datos de solo lectura (`.rodata`) del binario ejecutable final.\n\nCuando tu aplicación lee una variable `string` o `[]byte` incrustada, la lectura se realiza directamente desde la memoria virtual mapeada del ejecutable con CERO llamadas al sistema de archivos (0 syscalls) y CERO latencia de disco, con una velocidad de lectura idéntica al ancho de banda de la memoria RAM del servidor.",
      "keyPoints": [
        "Segmento .rodata: los archivos embebidos forman parte del código máquina del ejecutable.",
        "Zero disk I/O en runtime: lectura a velocidad de memoria RAM sin tocar el disco.",
        "Implicación de tamaño: el tamaño del archivo ejecutable compilado aumentará exactamente en la cantidad de bytes que ocupen los archivos incrustados."
      ]
    },
    "evaluation": {
      "title": "Reto: Servidor de Configuración Embebida en Binario",
      "statement": "Crea una directiva //go:embed que incruste el contenido de un archivo de configuración 'version.txt' en una variable string de paquete. Escribe una función que devuelva la versión leída desde el binario embebido.",
      "starterCode": "package main\n\nimport (\n    _ \"embed\"\n    \"fmt\"\n)\n\n// Coloca la directiva //go:embed aquí\n// var versionApp string\n\nfunc main() {\n    // Imprime la versión embebida\n}",
      "hint": "Crea primero el archivo version.txt con os.WriteFile, luego usa //go:embed version.txt encima de var versionApp string.",
      "solution": "package main\n\nimport (\n    _ \"embed\"\n    \"fmt\"\n    \"os\"\n)\n\n// Nota: en un proyecto real version.txt ya existe en el proyecto.\n//go:embed version.txt\nvar versionApp string\n\nfunc main() {\n    fmt.Println(\"Aplicación arrancada con versión incrustada:\")\n    fmt.Printf(\"-> Versión: %s\\n\", versionApp)\n    fmt.Println(\"El binario no requiere ningún archivo externo para conocer su versión.\")\n}\n\n// Para probar este ejemplo, crea version.txt con: echo \"2.5.0-prod\" > version.txt",
      "explanation": "La directiva `//go:embed version.txt` indica al compilador de Go que capture los bytes de 'version.txt' en tiempo de compilación y los asigne como un string literal inmutable a la variable `versionApp`, permitiendo distribuir ejecutables 100% autocontenidos."
    },
    "externalLinks": [
      {
        "title": "Paquete embed (Biblioteca estándar de Go)",
        "url": "https://pkg.go.dev/embed",
        "description": "Documentación oficial del paquete embed y la directiva //go:embed."
      },
      {
        "title": "Blog oficial de Go: Cómo incrusta archivos el paquete embed desde Go 1.16",
        "url": "https://go.dev/blog/go1.16",
        "description": "Lanzamiento y especificación técnica de la directiva embed en Go 1.16."
      },
      {
        "title": "Go by Example Original: Embed Directive",
        "url": "https://gobyexample.com/embed-directive",
        "description": "Ejemplo en Go by Example."
      }
    ],
    "code": "// `//go:embed` es una [directiva del\n// compilador](https://pkg.go.dev/cmd/compile#hdr-Compiler_Directives) que\n// permite a los programas incrustar archivos y carpetas arbitrarias dentro del binario\n// compilado de Go. Lee más acerca de la directiva embed\n// [aquí](https://pkg.go.dev/embed).\npackage main\n\n// Importa el paquete `embed`; si no utilizas ningún identificador\n// exportado de dicho paquete, puedes realizar una importación en blanco con `_ \"embed\"`.\nimport (\n\t\"embed\"\n)\n\n// Las directivas `embed` aceptan rutas relativas al directorio que contiene el\n// archivo fuente de Go. Esta directiva incrusta el contenido del archivo dentro de la\n// variable `string` inmediatamente subsiguiente.\n//\n//go:embed folder/single_file.txt\nvar fileString string\n\n// O incrusta el contenido del archivo dentro de un `[]byte`.\n//\n//go:embed folder/single_file.txt\nvar fileByte []byte\n\n// También podemos incrustar múltiples archivos o incluso carpetas enteras utilizando comodines.\n// Esto emplea una variable del [tipo embed.FS](https://pkg.go.dev/embed#FS), la cual\n// implementa un sistema de archivos virtual simple.\n//\n//go:embed folder/single_file.txt\n//go:embed folder/*.hash\nvar folder embed.FS\n\nfunc main() {\n\n\t// Imprime el contenido de `single_file.txt`.\n\tprint(fileString)\n\tprint(string(fileByte))\n\n\t// Recupera algunos archivos desde la carpeta incrustada.\n\tcontent1, _ := folder.ReadFile(\"folder/file1.hash\")\n\tprint(string(content1))\n\n\tcontent2, _ := folder.ReadFile(\"folder/file2.hash\")\n\tprint(string(content2))\n}\n",
    "output": "# Utiliza estos comandos para ejecutar el ejemplo.\n# (Nota: debido a limitaciones en Go Playground, este ejemplo\n# solo puede ejecutarse en tu máquina local).\n$ mkdir -p folder\n$ echo \"hello go\" > folder/single_file.txt\n$ echo \"123\" > folder/file1.hash\n$ echo \"456\" > folder/file2.hash\n\n$ go run embed-directive.go\nhello go\nhello go\n123\n456\n",
    "officialUrl": "https://gobyexample.com/embed-directive"
  },
  {
    "id": 72,
    "slug": "testing-and-benchmarking",
    "title": "Testing and Benchmarking",
    "titleEs": "Pruebas Unitarias y Benchmarking (testing)",
    "category": "CLI, Pruebas y Benchmarking",
    "categorySlug": "cli-testing",
    "categoryIcon": "target",
    "difficulty": "Intermedio",
    "summary": "El ecosistema nativo de pruebas unitarias (TestXxx), pruebas por tablas (table-driven tests) y benchmarks (BenchmarkXxx).",
    "originalExpl": "Escribir pruebas unitarias es una parte importante de escribir código Go correcto. El paquete 'testing' y la herramienta 'go test' proporcionan las herramientas que necesitas para escribir y ejecutar pruebas y benchmarks.",
    "basicExpl": {
      "title": "Conceptos Fundamentales para Principiantes",
      "content": "En Go no necesitas instalar bibliotecas externas complejas para probar tu código: las pruebas unitarias vienen incluidas en el lenguaje:\n- Tus archivos de pruebas deben terminar siempre en `_test.go` (ej. `calculadora_test.go`).\n- Las funciones de prueba deben comenzar con `Test` y recibir `*testing.T`: `func TestSumar(t *testing.T)`.\n- Si algo no da el resultado esperado, avisas con `t.Errorf(\"esperaba %d, obtuve %d\", esperado, obtenido)`.\n- Se ejecutan en tu terminal escribiendo simplemente: `go test` o `go test -v`.",
      "keyPoints": [
        "Archivos con sufijo `_test.go` son ignorados por `go build` y ejecutados solo por `go test`.",
        "Firma obligatoria: `func TestNombre(t *testing.T)`.",
        "`t.Errorf`: registra el fallo pero continúa ejecutando las demás pruebas.",
        "`t.Fatalf`: registra el fallo y detiene inmediatamente la prueba actual."
      ]
    },
    "interExpl": {
      "title": "Mecanismos Internos y Buenas Prácticas",
      "content": "Pruebas Basadas en Tablas (Table-Driven Tests):\nEs el patrón de diseño canónico indiscutible en la comunidad de Go para pruebas limpias y completas:\n```go\nfunc TestMultiplicar(t *testing.T) {\n    casos := []struct {\n        nombre   string\n        a, b     int\n        esperado int\n    }{\n        {\"positivos\", 2, 3, 6},\n        {\"cero\", 5, 0, 0},\n        {\"negativos\", -2, 4, -8},\n    }\n    for _, c := range casos {\n        t.Run(c.nombre, func(t *testing.T) {\n            obtenido := Multiplicar(c.a, c.b)\n            if obtenido != c.esperado {\n                t.Errorf(\"fallo en %s: esperaba %d, obtuve %d\", c.nombre, c.esperado, obtenido)\n            }\n        })\n    }\n}\n```\n`t.Run` crea subtests independientes que pueden filtrarse individualmente desde la consola con `go test -run=TestMultiplicar/negativos`.",
      "keyPoints": [
        "Table-Driven Tests: definición de casos en un slice de structs anónimos para máxima cobertura.",
        "Subtests con `t.Run()`: permite aislar y ejecutar casos específicos.",
        "Paralelismo con `t.Parallel()`: ejecuta subtests de forma simultánea en múltiples núcleos de CPU.",
        "Cobertura de código: `go test -cover` y `go test -coverprofile=cobertura.out`."
      ]
    },
    "expertExpl": {
      "title": "Bajo Nivel, Rendimiento e Internals",
      "content": "Micro-benchmarks con `*testing.B` y Perfiles de Memoria:\nGo incluye un arnés de micro-benchmarking de precisión científica:\n```go\nfunc BenchmarkMiFuncion(b *testing.B) {\n    b.ReportAllocs() // Reporta asignaciones de memoria y bytes/op\n    for i := 0; i < b.N; i++ {\n        MiFuncion()\n    }\n}\n```\nEl runtime de Go ajusta automáticamente el valor de `b.N` (1, 100, 10000, 1000000) hasta que el bucle corre durante un tiempo estadísticamente significativo (por defecto 1 segundo).\n\nPara optimizar código a nivel senior, se combinan con `benchstat` y perfiles de asignación de memoria: `go test -bench=. -benchmem -memprofile=mem.pprof` para auditar exactamente cuántos bytes escaparon al Heap por operación.",
      "keyPoints": [
        "Bucle `b.N`: escala automáticamente hasta lograr significancia estadística.",
        "`b.ReportAllocs()`: audita el número de asignaciones de memoria (`allocs/op`) y bytes (`B/op`).",
        "Herramienta `benchstat`: compara estadísticamente el antes y después de una optimización garantizando rigor matemático."
      ]
    },
    "evaluation": {
      "title": "Reto: Suite de Pruebas Table-Driven para un Validador de Email",
      "statement": "Escribe una función 'EsEmailValido(email string) bool' (que verifique que contenga '@' y un punto posterior) y su correspondiente suite de pruebas unitarias 'TestEsEmailValido' utilizando la técnica Table-Driven Tests con al menos 3 casos (válido, sin arroba y vacío).",
      "starterCode": "package main\n\nimport (\n    \"strings\"\n    \"testing\"\n)\n\nfunc EsEmailValido(email string) bool {\n    // Implementa la validación básica\n}\n\n// Implementa TestEsEmailValido(t *testing.T)\n",
      "hint": "Crea una tabla con []struct{ nombre, email string; esperado bool } y recorre con t.Run.",
      "solution": "package main\n\nimport (\n    \"strings\"\n    \"testing\"\n)\n\nfunc EsEmailValido(email string) bool {\n    if len(email) < 3 {\n        return false\n    }\n    arroba := strings.Index(email, \"@\")\n    if arroba <= 0 || arroba == len(email)-1 {\n        return false\n    }\n    dominio := email[arroba+1:]\n    return strings.Contains(dominio, \".\")\n}\n\nfunc TestEsEmailValido(t *testing.T) {\n    casos := []struct {\n        nombre   string\n        email    string\n        esperado bool\n    }{\n        {\"email válido estándar\", \"usuario@empresa.com\", true},\n        {\"sin arroba\", \"usuarioempresa.com\", false},\n        {\"cadena vacía\", \"\", false},\n        {\"sin dominio\", \"usuario@\", false},\n        {\"arroba al inicio\", \"@empresa.com\", false},\n    }\n    \n    for _, c := range casos {\n        t.Run(c.nombre, func(t *testing.T) {\n            resultado := EsEmailValido(c.email)\n            if resultado != c.esperado {\n                t.Errorf(\"Caso '%s': para entrada '%s' esperaba %t, pero obtuve %t\", \n                    c.nombre, c.email, c.esperado, resultado)\n            }\n        })\n    }\n}",
      "explanation": "El patrón Table-Driven Test permite evaluar múltiples escenarios borde (strings vacíos, entradas maliciosas, casos de éxito) de forma compacta y estructurada. Cada subtest corre con su propio nombre legible mediante t.Run."
    },
    "externalLinks": [
      {
        "title": "Paquete testing (Biblioteca estándar de Go)",
        "url": "https://pkg.go.dev/testing",
        "description": "Documentación oficial del paquete testing para tests y benchmarks."
      },
      {
        "title": "Blog oficial de Go: Sub-pruebas y sub-benchmarks en testing",
        "url": "https://go.dev/blog/subtests",
        "description": "Guía oficial sobre el uso de t.Run y b.Run en Go."
      },
      {
        "title": "Go by Example Original: Testing and Benchmarking",
        "url": "https://gobyexample.com/testing-and-benchmarking",
        "description": "Ejemplo en Go by Example."
      }
    ],
    "code": "// Las pruebas unitarias son una parte indispensable al escribir\n// programas robustos en Go. El paquete `testing`\n// proporciona las herramientas necesarias para escribir pruebas unitarias\n// y el comando `go test` se encarga de ejecutarlas.\n\n// A modo de demostración, este código se encuentra en el paquete\n// `main`, pero podría residir en cualquiera. El código de pruebas\n// típicamente vive en el mismo paquete que el código que evalúa.\npackage main\n\nimport (\n\t\"fmt\"\n\t\"testing\"\n)\n\n// Evaluaremos esta sencilla implementación del mínimo entre dos\n// números enteros. Típicamente, el código a probar residiría en un\n// archivo fuente llamado `intutils.go`, y su archivo de pruebas\n// correspondiente se llamaría `intutils_test.go`.\nfunc IntMin(a, b int) int {\n\tif a < b {\n\t\treturn a\n\t}\n\treturn b\n}\n\n// Una prueba se crea escribiendo una función cuyo nombre\n// comienza con el prefijo `Test`.\nfunc TestIntMinBasic(t *testing.T) {\n\tans := IntMin(2, -2)\n\tif ans != -2 {\n\t\t// `t.Error*` reportará fallos en la prueba pero continuará\n\t\t// la ejecución. `t.Fatal*` reportará fallos y detendrá\n\t\t// la prueba inmediatamente.\n\t\tt.Errorf(\"IntMin(2, -2) = %d; want -2\", ans)\n\t}\n}\n\n// Escribir pruebas individuales puede ser repetitivo, por lo que es idiomático\n// usar un *estilo basado en tablas* (table-driven tests), donde las entradas y\n// salidas esperadas se declaran en una tabla y un único bucle\n// las recorre ejecutando la lógica de prueba.\nfunc TestIntMinTableDriven(t *testing.T) {\n\tvar tests = []struct {\n\t\ta, b int\n\t\twant int\n\t}{\n\t\t{0, 1, 0},\n\t\t{1, 0, 0},\n\t\t{2, -2, -2},\n\t\t{0, -1, -1},\n\t\t{-1, 0, -1},\n\t}\n\n\tfor _, tt := range tests {\n\t\t// `t.Run` permite ejecutar \"subpruebas\", una por cada\n\t\t// fila de la tabla. Estas se muestran de forma independiente\n\t\t// al ejecutar `go test -v`.\n\t\ttestname := fmt.Sprintf(\"%d,%d\", tt.a, tt.b)\n\t\tt.Run(testname, func(t *testing.T) {\n\t\t\tans := IntMin(tt.a, tt.b)\n\t\t\tif ans != tt.want {\n\t\t\t\tt.Errorf(\"got %d, want %d\", ans, tt.want)\n\t\t\t}\n\t\t})\n\t}\n}\n\n// Las pruebas de benchmarking suelen ir en archivos `_test.go` y sus\n// nombres inician con el prefijo `Benchmark`.\n// Cualquier código requerido para preparar el benchmark pero que no deba\n// medirse se ubica antes de este bucle.\nfunc BenchmarkIntMin(b *testing.B) {\n\tfor b.Loop() {\n\t\t// El ejecutor de benchmarks repetirá este cuerpo de bucle\n\t\t// muchas veces automáticamente para determinar una estimación precisa\n\t\t// del tiempo de ejecución de una sola iteración.\n\t\tIntMin(1, 2)\n\t}\n}\n",
    "output": "# Ejecuta todas las pruebas del proyecto actual en modo detallado (verbose).\n$ go test -v\n=== RUN   TestIntMinBasic\n--- PASS: TestIntMinBasic (0.00s)\n=== RUN   TestIntMinTableDriven\n=== RUN   TestIntMinTableDriven/0,1\n=== RUN   TestIntMinTableDriven/1,0\n=== RUN   TestIntMinTableDriven/2,-2\n=== RUN   TestIntMinTableDriven/0,-1\n=== RUN   TestIntMinTableDriven/-1,0\n--- PASS: TestIntMinTableDriven (0.00s)\n    --- PASS: TestIntMinTableDriven/0,1 (0.00s)\n    --- PASS: TestIntMinTableDriven/1,0 (0.00s)\n    --- PASS: TestIntMinTableDriven/2,-2 (0.00s)\n    --- PASS: TestIntMinTableDriven/0,-1 (0.00s)\n    --- PASS: TestIntMinTableDriven/-1,0 (0.00s)\nPASS\nok  \texamples/testing-and-benchmarking\t0.023s\n\n# Ejecuta todos los benchmarks del proyecto actual. Todas las pruebas\n# se ejecutan previamente a los benchmarks. La bandera `bench` filtra\n# las funciones de benchmark con una expresión regular.\n$ go test -bench=.\ngoos: darwin\ngoarch: arm64\npkg: examples/testing\nBenchmarkIntMin-8 1000000000 0.3136 ns/op\nPASS\nok  \texamples/testing-and-benchmarking\t0.351s\n",
    "officialUrl": "https://gobyexample.com/testing-and-benchmarking"
  },
  {
    "id": 73,
    "slug": "command-line-arguments",
    "title": "Command-Line Arguments",
    "titleEs": "Argumentos de Línea de Comandos (os.Args)",
    "category": "CLI, Pruebas y Benchmarking",
    "categorySlug": "cli-testing",
    "categoryIcon": "target",
    "difficulty": "Principiante",
    "summary": "Acceso a los parámetros crudos pasados al ejecutar un programa en la terminal mediante os.Args.",
    "originalExpl": "Los argumentos de línea de comandos son una forma común de parametrizar la ejecución de programas. Por ejemplo, 'go run hello.go' usa los argumentos 'run' y 'hello.go' para el programa 'go'.",
    "basicExpl": {
      "title": "Conceptos Fundamentales para Principiantes",
      "content": "Cuando ejecutas un programa desde tu terminal, puedes pasarle datos escribiéndolos a continuación: `miApp hola 123`.\nEn Go, estos valores se guardan automáticamente en una lista de cadenas llamada `os.Args`:\n- `os.Args[0]`: es SIEMPRE la ruta o nombre del propio programa que se está ejecutando.\n- `os.Args[1]`: es el primer argumento pasado por el usuario (\"hola\").\n- `os.Args[2]`: es el segundo argumento (\"123\").\n- Para obtener solo los argumentos del usuario descartando el nombre del programa, se toma el rebanado: `os.Args[1:]`.",
      "keyPoints": [
        "Se importa con `import \"os\"`.",
        "`os.Args` es un slice de cadenas (`[]string`).",
        "`os.Args[0]` siempre almacena la ruta de invocación del ejecutable.",
        "¡Cuidado con `panic: index out of range`!: valida siempre `len(os.Args)` antes de acceder a índices superiores."
      ]
    },
    "interExpl": {
      "title": "Mecanismos Internos y Buenas Prácticas",
      "content": "Validación Defensiva de Longitud y Manejo de Errores de Uso:\nDado que los usuarios de consola pueden olvidar pasar argumentos, un programa profesional NUNCA debe acceder a `os.Args[1]` directamente sin verificar la longitud:\n```go\nif len(os.Args) < 2 {\n    fmt.Fprintf(os.Stderr, \"Uso incorrecto: %s <archivo_origen>\\n\", os.Args[0])\n    os.Exit(1)\n}\n```\nLos mensajes de error de sintaxis de consola deben enviarse a la salida de error estándar (`os.Stderr`) y salir con un código de estado distinto de cero (`os.Exit(1)`).",
      "keyPoints": [
        "Validación de `len(os.Args)`: obligatoria para no crashear con pánico en la terminal.",
        "Salida a `os.Stderr`: usar `fmt.Fprintf(os.Stderr, ...)` para mensajes de diagnóstico y ayuda.",
        "Argumentos crudos vs Banderas (Flags): `os.Args` proporciona texto crudo posicional; si necesitas banderas con nombre (como `-puerto 8080`), se debe usar el paquete `flag`."
      ]
    },
    "expertExpl": {
      "title": "Bajo Nivel, Rendimiento e Internals",
      "content": "Paso de Argumentos desde el Kernel del Sistema Operativo al Runtime de Go:\nCuando el sistema operativo ejecuta un proceso (mediante la syscall `execve` en Linux o `CreateProcess` en Windows), el kernel coloca los argumentos (`argc` y `argv`) y las variables de entorno en la parte superior del espacio de memoria de la pila (stack) del nuevo proceso.\n\nDurante el arranque del runtime de Go (en la función de ensamblador `runtime.rt0_go` y `runtime.args`), el runtime de Go copia los punteros de `argv` de C, calcula la longitud de cada cadena y construye el slice de strings inmutables `os.Args` antes de que la función `main.main` comience a ejecutarse.",
      "keyPoints": [
        "Inicialización en runtime.args: conversión de `argc/argv` de C al slice nativo `[]string` de Go.",
        "Inmutabilidad práctica: aunque `os.Args` es un slice normal y puede mutarse en tiempo de ejecución, se considera mala práctica alterarlo.",
        "Límites del sistema operativo (`ARG_MAX`): el tamaño máximo total de todos los argumentos combinados está limitado por el kernel del SO (típicamente 2 MB en Linux)."
      ]
    },
    "evaluation": {
      "title": "Reto: Calculadora de Línea de Comandos Básica",
      "statement": "Escribe un programa que lea dos números y un operador matemático (+ o -) pasados como argumentos de línea de comandos (ej: 'app 10 + 5'). Valida que se pasen exactamente 3 argumentos, parsea los números con strconv.Atoi y muestra el resultado del cálculo. Si faltan argumentos, muestra la ayuda de uso.",
      "starterCode": "package main\n\nimport (\n    \"fmt\"\n    \"os\"\n    \"strconv\"\n)\n\nfunc main() {\n    // Valida len(os.Args), parsea y calcula\n}",
      "hint": "Recuerda que os.Args[0] es el programa, por lo que len(os.Args) debe ser exactamente 4 (programa, num1, op, num2).",
      "solution": "package main\n\nimport (\n    \"fmt\"\n    \"os\"\n    \"strconv\"\n)\n\nfunc main() {\n    if len(os.Args) != 4 {\n        fmt.Printf(\"Uso: %s <num1> <operador (+|-)> <num2>\\n\", os.Args[0])\n        fmt.Println(\"Ejemplo:\", os.Args[0], \"15 + 20\")\n        return\n    }\n    \n    n1, err1 := strconv.Atoi(os.Args[1])\n    op := os.Args[2]\n    n2, err2 := strconv.Atoi(os.Args[3])\n    \n    if err1 != nil || err2 != nil {\n        fmt.Println(\"Error: Los argumentos deben ser números enteros válidos.\")\n        return\n    }\n    \n    switch op {\n    case \"+\":\n        fmt.Printf(\"%d + %d = %d\\n\", n1, n2, n1+n2)\n    case \"-\":\n        fmt.Printf(\"%d - %d = %d\\n\", n1, n2, n1-n2)\n    default:\n        fmt.Printf(\"Operador no soportado: '%s' (usa + o -)\\n\", op)\n    }\n}",
      "explanation": "El programa comprueba rigurosamente que len(os.Args) sea exactamente 4 antes de acceder a los índices. Luego utiliza strconv.Atoi para convertir los parámetros textuales en enteros reales y procesa la operación matemática solicitada."
    },
    "externalLinks": [
      {
        "title": "Paquete os: Args variable",
        "url": "https://pkg.go.dev/os#Args",
        "description": "Documentación oficial de la variable os.Args en la biblioteca estándar."
      },
      {
        "title": "Go by Example Original: Command-Line Arguments",
        "url": "https://gobyexample.com/command-line-arguments",
        "description": "Ejemplo en Go by Example."
      },
      {
        "title": "Guía canónica Effective Go: Argumentos de línea de comandos",
        "url": "https://go.dev/doc/effective_go",
        "description": "Convenciones de interacción con el sistema operativo en Effective Go."
      }
    ],
    "code": "// Los [_argumentos de línea de comandos_](https://en.wikipedia.org/wiki/Command-line_interface#Arguments)\n// son una forma habitual de parametrizar la ejecución de programas.\n// Por ejemplo, `go run hello.go` utiliza `run` y\n// `hello.go` como argumentos para el ejecutable `go`.\n\npackage main\n\nimport (\n\t\"fmt\"\n\t\"os\"\n)\n\nfunc main() {\n\n\t// `os.Args` proporciona acceso directo a los argumentos de línea de comandos\n\t// originales. Ten en cuenta que el primer valor en este slice\n\t// corresponde a la ruta del programa, mientras que `os.Args[1:]`\n\t// contiene los argumentos pasados al programa.\n\targsWithProg := os.Args\n\targsWithoutProg := os.Args[1:]\n\n\t// Puedes acceder a argumentos individuales mediante la indexación habitual.\n\targ := os.Args[3]\n\n\tfmt.Println(argsWithProg)\n\tfmt.Println(argsWithoutProg)\n\tfmt.Println(arg)\n}\n",
    "output": "# Para experimentar con argumentos de línea de comandos es mejor\n# construir un binario con `go build` primero.\n$ go build command-line-arguments.go\n$ ./command-line-arguments a b c d\n[./command-line-arguments a b c d]       \n[a b c d]\nc\n\n# A continuación veremos el procesamiento avanzado de opciones de línea\n# de comandos con banderas (flags).\n",
    "officialUrl": "https://gobyexample.com/command-line-arguments"
  },
  {
    "id": 74,
    "slug": "command-line-flags",
    "title": "Command-Line Flags",
    "titleEs": "Banderas y Flags de Consola (flag)",
    "category": "CLI, Pruebas y Benchmarking",
    "categorySlug": "cli-testing",
    "categoryIcon": "target",
    "difficulty": "Intermedio",
    "summary": "Definición y parseo de opciones de consola con nombre (--puerto, -v, --ayuda) con el paquete estándar 'flag'.",
    "originalExpl": "Las banderas de línea de comandos son una forma común de especificar opciones para programas de línea de comandos. Por ejemplo, en 'wc -l', '-l' es una bandera de línea de comandos.",
    "basicExpl": {
      "title": "Conceptos Fundamentales para Principiantes",
      "content": "En vez de obligar al usuario a escribir argumentos en un orden estricto, las 'flags' (banderas) le permiten pasar opciones con nombre en cualquier orden:\n`miServidor -puerto 8080 -entorno produccion -debug`.\nGo incluye el paquete oficial `flag` para hacer esto de forma automática:\n1. Defines una bandera: `puerto := flag.Int(\"puerto\", 8080, \"Número de puerto del servidor\")`.\n2. Defines una bandera booleana: `debug := flag.Bool(\"debug\", false, \"Activar logs detallados\")`.\n3. Ejecutas el parseo: `flag.Parse()` (¡OBLIGATORIO!).\n4. Para leer el valor usas el asterisco porque devuelve un puntero: `*puerto` o `*debug`.\n¡Magia extra!: Si el usuario escribe `-h` o `--help`, Go genera automáticamente una página de ayuda perfecta con todas las opciones.",
      "keyPoints": [
        "Se importa con `import \"flag\"`.",
        "`flag.Int()`, `flag.String()`, `flag.Bool()` devuelven PUNTEROS al valor.",
        "También existen las variantes con puntero existente: `flag.StringVar(&miVar, ...)`. ",
        "`flag.Parse()` DEBE ser llamado después de definir las banderas y antes de leer sus valores.",
        "Genera automáticamente la ayuda con `-h` o `--help`."
      ]
    },
    "interExpl": {
      "title": "Mecanismos Internos y Buenas Prácticas",
      "content": "Banderas Personalizadas con la Interfaz `flag.Value`:\nPuedes crear banderas que parsen tipos complejos (como slices de strings separados por comas o duraciones personalizadas) implementando la interfaz `flag.Value`:\n```go\ntype Value interface {\n    String() string\n    Set(string) error\n}\n```\nAcceso a Argumentos Restantes (Posicionales):\nTras invocar a `flag.Parse()`, si el usuario pasó argumentos adicionales sin bandera (por ejemplo `app -v=true archivo1.txt archivo2.txt`), puedes obtener los argumentos restantes usando `flag.Args()` o `flag.Arg(i)`.",
      "keyPoints": [
        "Interfaz `flag.Value`: permite definir tipos de banderas personalizados (ej. listas, IPs, JSON).",
        "`flag.Args()`: devuelve un slice con los argumentos posicionales restantes después de las banderas.",
        "`flag.NFlag()`: devuelve el número de banderas que el usuario configuró explícitamente.",
        "Compatibilidad de sintaxis: Go acepta `-flag`, `--flag`, `-flag=valor` y `-flag valor`."
      ]
    },
    "expertExpl": {
      "title": "Bajo Nivel, Rendimiento e Internals",
      "content": "Instancias Independientes con `flag.NewFlagSet`:\nEl paquete `flag` utiliza por defecto una instancia global (`flag.CommandLine`). Sin embargo, en aplicaciones modulares, pruebas unitarias o CLI con subcomandos (estilo Git/Docker), utilizar variables globales provoca conflictos.\nLa técnica profesional es instanciar conjuntos de banderas aislados con `flag.NewFlagSet`:\n```go\nfs := flag.NewFlagSet(\"miSubcomando\", flag.ContinueOnError)\nfs.SetOutput(io.Discard) // Silencia la salida en tests\n```\nLas estrategias de manejo de errores configurables son:\n- `flag.ExitOnError` (por defecto en CLI, invoca `os.Exit(2)` ante errores de sintaxis).\n- `flag.ContinueOnError` (ideal para tests y subcomandos, devuelve el error sin crashear).\n- `flag.PanicOnError` (lanza pánico).",
      "keyPoints": [
        "`flag.NewFlagSet`: aísla conjuntos de banderas independientes por subcomando.",
        "Estrategias de error: `ContinueOnError` permite capturar errores de sintaxis sin abortar el proceso.",
        "Limitación del paquete estándar: no soporta alias cortos combinados (`-rf` para `-r -f`); para CLIs complejas de estilo POSIX avanzado se suele utilizar la biblioteca popular `spf13/pflag` o `spf13/cobra`."
      ]
    },
    "evaluation": {
      "title": "Reto: Configurador de Servidor CLI con Valores por Defecto",
      "statement": "Escribe un programa que utilice el paquete 'flag' para aceptar las siguientes opciones: '-host' (string, por defecto '127.0.0.1'), '-port' (int, por defecto 8080) y '-prod' (bool, por defecto false). Parsea las banderas e imprime un mensaje formateado mostrando la configuración resultante.",
      "starterCode": "package main\n\nimport (\n    \"flag\"\n    \"fmt\"\n)\n\nfunc main() {\n    // Define las banderas host, port y prod\n    // Ejecuta flag.Parse()\n    // Muestra la configuración leyendo los punteros\n}",
      "hint": "Usa flag.String(\"host\", \"127.0.0.1\", \"...\"), flag.Int(\"port\", 8080, \"...\") y recuerda desreferenciar con *host.",
      "solution": "package main\n\nimport (\n    \"flag\"\n    \"fmt\"\n)\n\nfunc main() {\n    host := flag.String(\"host\", \"127.0.0.1\", \"Dirección IP o host del servidor\")\n    port := flag.Int(\"port\", 8080, \"Puerto de escucha\")\n    prod := flag.Bool(\"prod\", false, \"Activar modo de producción optimizado\")\n    \n    flag.Parse() // Procesa los argumentos de la consola\n    \n    fmt.Println(\"=== Configuración del Servidor ===\")\n    fmt.Printf(\"Host        : %s\\n\", *host)\n    fmt.Printf(\"Puerto      : %d\\n\", *port)\n    fmt.Printf(\"Producción  : %t\\n\", *prod)\n    \n    // Muestra argumentos restantes si los hubiera\n    if len(flag.Args()) > 0 {\n        fmt.Println(\"Argumentos adicionales:\", flag.Args())\n    }\n}",
      "explanation": "El paquete flag asocia los valores pasados por el usuario a las variables puntero. Invocar 'flag.Parse()' procesa la línea de comandos, asigna los valores por defecto si el usuario omitió alguna bandera y permite leer de forma segura '*host', '*port' y '*prod'."
    },
    "externalLinks": [
      {
        "title": "Paquete flag (Biblioteca estándar de Go)",
        "url": "https://pkg.go.dev/flag",
        "description": "Documentación oficial del paquete flag de la biblioteca estándar."
      },
      {
        "title": "Go by Example Original: Command-Line Flags",
        "url": "https://gobyexample.com/command-line-flags",
        "description": "Ejemplo en Go by Example."
      },
      {
        "title": "spf13/cobra (Librería moderna para CLI en Go)",
        "url": "https://github.com/spf13/cobra",
        "description": "La biblioteca estándar de la industria utilizada por Docker, Kubernetes y GitHub CLI."
      }
    ],
    "code": "// Las [_banderas de línea de comandos_](https://en.wikipedia.org/wiki/Command-line_interface#Command-line_option) (flags)\n// son una forma estándar de especificar opciones en programas de consola.\n// Por ejemplo, en `wc -l`, `-l` es una bandera de línea de comandos.\n\npackage main\n\n// Go provee el paquete `flag` que admite el parseo básico\n// de banderas de línea de comandos. Usaremos este paquete para\n// implementar nuestro programa de ejemplo.\nimport (\n\t\"flag\"\n\t\"fmt\"\n)\n\nfunc main() {\n\n\t// Las declaraciones básicas de banderas están disponibles para opciones de\n\t// tipo string, integer y boolean. Aquí declaramos una bandera\n\t// de cadena `word` con valor predeterminado `\"foo\"` y una breve\n\t// descripción. Esta función `flag.String` retorna un puntero a string\n\t// (no un valor string directo); veremos cómo utilizar este puntero abajo.\n\twordPtr := flag.String(\"word\", \"foo\", \"a string\")\n\n\t// Esto declara las banderas `numb` y `fork`, siguiendo un\n\t// enfoque similar al de la bandera `word`.\n\tnumbPtr := flag.Int(\"numb\", 42, \"an int\")\n\tforkPtr := flag.Bool(\"fork\", false, \"a bool\")\n\n\t// También es posible declarar una opción que utilice una variable\n\t// preexistente declarada en otra parte del programa. Nota que\n\t// debemos pasar un puntero a la función de declaración de la bandera.\n\tvar svar string\n\tflag.StringVar(&svar, \"svar\", \"bar\", \"a string var\")\n\n\t// Una vez declaradas todas las banderas, invocamos `flag.Parse()`\n\t// para ejecutar el análisis sintáctico de la línea de comandos.\n\tflag.Parse()\n\n\t// Aquí simplemente volcamos las opciones parseadas y los\n\t// argumentos posicionales finales restantes. Ten en cuenta que\n\t// debemos desreferenciar los punteros mediante `*wordPtr` para\n\t// obtener los valores reales de las opciones.\n\tfmt.Println(\"word:\", *wordPtr)\n\tfmt.Println(\"numb:\", *numbPtr)\n\tfmt.Println(\"fork:\", *forkPtr)\n\tfmt.Println(\"svar:\", svar)\n\tfmt.Println(\"tail:\", flag.Args())\n}\n",
    "output": "# Para experimentar con el programa de banderas de línea de comandos es\n# recomendable compilarlo primero y luego ejecutar directamente el binario resultante.\n$ go build command-line-flags.go\n\n# Prueba el programa compilado pasándole valores para todas las banderas.\n$ ./command-line-flags -word=opt -numb=7 -fork -svar=flag\nword: opt\nnumb: 7\nfork: true\nsvar: flag\ntail: []\n\n# Ten en cuenta que si omites banderas, estas tomarán automáticamente\n# sus valores predeterminados.\n$ ./command-line-flags -word=opt\nword: opt\nnumb: 42\nfork: false\nsvar: bar\ntail: []\n\n# Los argumentos posicionales adicionales pueden proporcionarse después\n# de cualquier bandera.\n$ ./command-line-flags -word=opt a1 a2 a3\nword: opt\n...\ntail: [a1 a2 a3]\n\n# Nota que el paquete `flag` exige que todas las banderas aparezcan\n# antes de los argumentos posicionales (de lo contrario las banderas\n# posteriores se interpretarán como argumentos posicionales ordinarios).\n$ ./command-line-flags -word=opt a1 a2 a3 -numb=7\nword: opt\nnumb: 42\nfork: false\nsvar: bar\ntail: [a1 a2 a3 -numb=7]\n\n# Usa las banderas `-h` o `--help` para obtener el texto de ayuda\n# generado automáticamente para el programa de línea de comandos.\n$ ./command-line-flags -h\nUsage of ./command-line-flags:\n  -fork=false: a bool\n  -numb=42: an int\n  -svar=\"bar\": a string var\n  -word=\"foo\": a string\n\n# Si ingresas una bandera no registrada en el paquete `flag`,\n# el programa imprimirá un mensaje de error y mostrará el texto de ayuda nuevamente.\n$ ./command-line-flags -wat\nflag provided but not defined: -wat\nUsage of ./command-line-flags:\n...\n",
    "officialUrl": "https://gobyexample.com/command-line-flags"
  },
  {
    "id": 75,
    "slug": "command-line-subcommands",
    "title": "Command-Line Subcommands",
    "titleEs": "Subcomandos CLI Estilo Git/Docker (flag.NewFlagSet)",
    "category": "CLI, Pruebas y Benchmarking",
    "categorySlug": "cli-testing",
    "categoryIcon": "target",
    "difficulty": "Intermedio",
    "summary": "Construcción de herramientas de terminal complejas con múltiples comandos anidados (como 'git commit' o 'docker run').",
    "originalExpl": "Algunas herramientas de línea de comandos, como las herramientas 'go' o 'git', tienen muchos subcomandos, cada uno con su propio conjunto de banderas. Por ejemplo, 'go build' y 'go test' son dos subcomandos diferentes de la herramienta 'go'.",
    "basicExpl": {
      "title": "Conceptos Fundamentales para Principiantes",
      "content": "Piensa en herramientas como `git`: no ejecutas solo `git`, sino `git commit -m \"mensaje\"` o `git push origin main`. La palabra 'commit' o 'push' es un 'subcomando', y cada uno tiene sus propias banderas específicas.\nEn Go:\n1. Creas un grupo de banderas separado para cada subcomando con `flag.NewFlagSet(\"nombre\", flag.ExitOnError)`.\n2. Miras cuál fue el primer argumento que escribió el usuario con `switch os.Args[1]`.\n3. Si escribió 'iniciar', activas las banderas de iniciar con `iniciarCmd.Parse(os.Args[2:])`.\n4. Si escribió 'detener', activas las banderas de detener.",
      "keyPoints": [
        "Permite crear herramientas CLI ricas con múltiples verbos de acción.",
        "Cada subcomando tiene su propio `flag.FlagSet` independiente con sus propias opciones.",
        "Se parsean pasando los argumentos restantes a partir del índice 2: `subCmd.Parse(os.Args[2:])`."
      ]
    },
    "interExpl": {
      "title": "Mecanismos Internos y Buenas Prácticas",
      "content": "Estructuración Limpia de un CLI con Switch:\nEl patrón canónico para subcomandos en la biblioteca estándar es:\n```go\nif len(os.Args) < 2 {\n    fmt.Println(\"Se esperaba un subcomando: 'servidor' o 'cliente'\")\n    os.Exit(1)\n}\n\nswitch os.Args[1] {\ncase \"servidor\":\n    servidorCmd.Parse(os.Args[2:])\n    ejecutarServidor(*puertoFlag)\ncase \"cliente\":\n    clienteCmd.Parse(os.Args[2:])\n    ejecutarCliente(*urlFlag)\ndefault:\n    fmt.Printf(\"Subcomando desconocido: '%s'\\n\", os.Args[1])\n    os.Exit(1)\n}\n```",
      "keyPoints": [
        "Validación de `os.Args[1]`: evita pánicos de índice antes de inspeccionar el subcomando.",
        "Ayuda contextual: cada subcomando genera su propia ayuda específica si el usuario escribe `app subcomando -h`.",
        "Desacoplamiento: cada subcomando puede residir en su propia función o paquete dedicado."
      ]
    },
    "expertExpl": {
      "title": "Bajo Nivel, Rendimiento e Internals",
      "content": "Patrón Command Dispatcher y Librerías de Producción:\nPara aplicaciones CLI con docenas de subcomandos y niveles de anidación profunda (ejemplo: `kubectl get pods -n kube-system`), mantener un switch manual se vuelve inmanejable.\nEn la industria de Go se utiliza el patrón 'Command Dispatcher' o el framework `spf13/cobra` (utilizado por Docker, Kubernetes, Terraform y GitHub CLI).\nCobra estructura los comandos como un árbol de objetos `*cobra.Command` con funciones `PreRun`, `RunE` y `PostRun`, integrando autocompletado para Bash/Zsh/Fish y vinculación directa con variables de entorno a través de `spf13/viper`.",
      "keyPoints": [
        "Command Trees: jerarquías arbóreas de comandos (Comando -> Subcomando -> Acción).",
        "Integración Shell Completion: generación automática de scripts de autocompletado en terminales Unix.",
        "Adopción universal: Cobra y Viper representan el estándar indiscutible de CLIs empresariales en Go."
      ]
    },
    "evaluation": {
      "title": "Reto: CLI de Base de Datos con Subcomandos 'migrar' y 'crear'",
      "statement": "Escribe un programa que admita dos subcomandos: 'crear' (con flag '-tabla' de tipo string) y 'migrar' (con flag '-version' de tipo int). Valida que se pase un subcomando, parsea el FlagSet correspondiente y muestra la acción ejecutada.",
      "starterCode": "package main\n\nimport (\n    \"flag\"\n    \"fmt\"\n    \"os\"\n)\n\nfunc main() {\n    // Define FlagSets para 'crear' y 'migrar'\n    // Usa switch os.Args[1] y ejecuta Parse\n}",
      "hint": "Crea crearCmd := flag.NewFlagSet(\"crear\", flag.ExitOnError). En el switch haz crearCmd.Parse(os.Args[2:]).",
      "solution": "package main\n\nimport (\n    \"flag\"\n    \"fmt\"\n    \"os\"\n)\n\nfunc main() {\n    // Definición de subcomandos y sus banderas independientes\n    crearCmd := flag.NewFlagSet(\"crear\", flag.ExitOnError)\n    tablaFlag := crearCmd.String(\"tabla\", \"usuarios\", \"Nombre de la tabla a generar\")\n    \n    migrarCmd := flag.NewFlagSet(\"migrar\", flag.ExitOnError)\n    versionFlag := migrarCmd.Int(\"version\", 1, \"Número de versión de la migración\")\n    \n    if len(os.Args) < 2 {\n        fmt.Println(\"Error: Debes especificar un subcomando ('crear' o 'migrar')\")\n        return\n    }\n    \n    switch os.Args[1] {\n    case \"crear\":\n        crearCmd.Parse(os.Args[2:])\n        fmt.Printf(\"[ACCIÓN: CREAR] Generando tabla en base de datos: '%s'\\n\", *tablaFlag)\n    case \"migrar\":\n        migrarCmd.Parse(os.Args[2:])\n        fmt.Printf(\"[ACCIÓN: MIGRAR] Aplicando migración a versión: #%d\\n\", *versionFlag)\n    default:\n        fmt.Printf(\"Subcomando '%s' no reconocido. Opciones: crear, migrar\\n\", os.Args[1])\n    }\n}",
      "explanation": "Al usar `flag.NewFlagSet`, cada subcomando tiene su propio espacio de nombres de banderas. Al invocar `subCmd.Parse(os.Args[2:])`, solo se parsean los parámetros posteriores al nombre del subcomando, permitiendo opciones específicas y aisladas para cada acción."
    },
    "externalLinks": [
      {
        "title": "Paquete flag: FlagSet",
        "url": "https://pkg.go.dev/flag#FlagSet",
        "description": "Documentación oficial de FlagSet para subcomandos en la biblioteca estándar."
      },
      {
        "title": "Go by Example Original: Command-Line Subcommands",
        "url": "https://gobyexample.com/command-line-subcommands",
        "description": "Ejemplo en Go by Example."
      },
      {
        "title": "Librería Cobra: Creación moderna de aplicaciones CLI en Go",
        "url": "https://cobra.dev/",
        "description": "Documentación oficial del framework de subcomandos Cobra para Go."
      }
    ],
    "code": "// Algunas herramientas de línea de comandos, como la herramienta `go` o `git`,\n// tienen múltiples *subcomandos*, cada uno con su propio conjunto de\n// banderas. Por ejemplo, `go build` y `go get` son dos subcomandos\n// distintos de la herramienta `go`.\n// El paquete `flag` nos permite definir fácilmente subcomandos sencillos\n// que poseen sus propias banderas individuales.\n\npackage main\n\nimport (\n\t\"flag\"\n\t\"fmt\"\n\t\"os\"\n)\n\nfunc main() {\n\n\t// Declaramos un subcomando utilizando la función `NewFlagSet`\n\t// y procedemos a definir nuevas banderas específicas para este subcomando.\n\tfooCmd := flag.NewFlagSet(\"foo\", flag.ExitOnError)\n\tfooEnable := fooCmd.Bool(\"enable\", false, \"enable\")\n\tfooName := fooCmd.String(\"name\", \"\", \"name\")\n\n\t// Para un subcomando diferente podemos definir banderas\n\t// compatibles distintas.\n\tbarCmd := flag.NewFlagSet(\"bar\", flag.ExitOnError)\n\tbarLevel := barCmd.Int(\"level\", 0, \"level\")\n\n\t// Se espera el nombre del subcomando como primer argumento\n\t// del programa.\n\tif len(os.Args) < 2 {\n\t\tfmt.Println(\"expected 'foo' or 'bar' subcommands\")\n\t\tos.Exit(1)\n\t}\n\n\t// Comprobamos cuál subcomando fue invocado.\n\tswitch os.Args[1] {\n\n\t// Para cada subcomando, parseamos sus propias banderas y\n\t// tenemos acceso a los argumentos posicionales posteriores.\n\tcase \"foo\":\n\t\tfooCmd.Parse(os.Args[2:])\n\t\tfmt.Println(\"subcommand 'foo'\")\n\t\tfmt.Println(\"  enable:\", *fooEnable)\n\t\tfmt.Println(\"  name:\", *fooName)\n\t\tfmt.Println(\"  tail:\", fooCmd.Args())\n\tcase \"bar\":\n\t\tbarCmd.Parse(os.Args[2:])\n\t\tfmt.Println(\"subcommand 'bar'\")\n\t\tfmt.Println(\"  level:\", *barLevel)\n\t\tfmt.Println(\"  tail:\", barCmd.Args())\n\tdefault:\n\t\tfmt.Println(\"expected 'foo' or 'bar' subcommands\")\n\t\tos.Exit(1)\n\t}\n}\n",
    "output": "$ go build command-line-subcommands.go \n\n# Primero invocamos el subcomando foo.\n$ ./command-line-subcommands foo -enable -name=joe a1 a2\nsubcommand 'foo'\n  enable: true\n  name: joe\n  tail: [a1 a2]\n\n# Ahora probamos con bar.\n$ ./command-line-subcommands bar -level 8 a1\nsubcommand 'bar'\n  level: 8\n  tail: [a1]\n\n# Pero bar no aceptará las banderas de foo.\n$ ./command-line-subcommands bar -enable a1\nflag provided but not defined: -enable\nUsage of bar:\n  -level int\n    \tlevel\n\n# A continuación veremos las variables de entorno, otra forma común\n# de parametrizar programas.\n",
    "officialUrl": "https://gobyexample.com/command-line-subcommands"
  },
  {
    "id": 76,
    "slug": "environment-variables",
    "title": "Environment Variables",
    "titleEs": "Variables de Entorno del SO (os.Getenv y os.Setenv)",
    "category": "CLI, Pruebas y Benchmarking",
    "categorySlug": "cli-testing",
    "categoryIcon": "target",
    "difficulty": "Principiante",
    "summary": "Lectura, escritura e iteración de variables de entorno del sistema operativo, estándar de configuración en contenedores y la nube.",
    "originalExpl": "Las variables de entorno son un mecanismo universal para comunicar información de configuración a programas Unix y Windows. En este ejemplo veremos cómo configurar, obtener y listar variables de entorno.",
    "basicExpl": {
      "title": "Conceptos Fundamentales para Principiantes",
      "content": "Las variables de entorno son configuraciones globales que viven en el sistema operativo (como `PATH`, `USER` o `PORT`):\n- Son el estándar universal de la metodología Cloud-Native (Docker y Kubernetes) para configurar aplicaciones sin modificar el código.\n- Leer una variable de entorno: `valor := os.Getenv(\"MI_VARIABLE\")` (si no existe, devuelve una cadena vacía `\"\"`).\n- Escribir una variable en el proceso actual: `os.Setenv(\"CLAVE\", \"VALOR\")`.\n- Saber con certeza si existe aunque esté vacía: `val, existe := os.LookupEnv(\"CLAVE\")`.",
      "keyPoints": [
        "Se importa con `import \"os\"`.",
        "`os.Getenv(\"CLAVE\")`: consulta el valor de la variable.",
        "`os.LookupEnv(\"CLAVE\")`: modismo coma-ok para distinguir entre variable vacía y variable no definida.",
        "`os.Environ()`: devuelve todas las variables de entorno activas como un slice de strings `CLAVE=VALOR`."
      ]
    },
    "interExpl": {
      "title": "Mecanismos Internos y Buenas Prácticas",
      "content": "Metodología The Twelve-Factor App y Patrón Fallback:\nEl principio III de The Twelve-Factor App exige separar estrictamente la configuración del código, guardándola en variables de entorno. En Go, la buena práctica es crear funciones auxiliares que lean la variable con un valor por defecto seguro (fallback):\n```go\nfunc GetEnvConFallback(clave, fallback string) string {\n    if valor, existe := os.LookupEnv(clave); existe {\n        return valor\n    }\n    return fallback\n}\n```\nSeguridad en contenedores: NUNCA quemes credenciales, contraseñas o tokens de API en el código fuente; inyéctalas siempre como variables de entorno desde Docker o secretos de Kubernetes.",
      "keyPoints": [
        "The Twelve-Factor App: configuración de bases de datos, puertos y claves secretas por entorno.",
        "Patrón Fallback con `LookupEnv`: proporciona valores seguros por defecto para entornos locales de desarrollo.",
        "Carga de archivos `.env`: en desarrollo local se suele utilizar la biblioteca `joho/godotenv` para cargar archivos `.env` automáticamente."
      ]
    },
    "expertExpl": {
      "title": "Bajo Nivel, Rendimiento e Internals",
      "content": "Puntero de Entorno del Kernel (environ) y Seguridad Concurrente:\nA nivel de kernel de Linux, las variables de entorno residen en un bloque de memoria contiguo al que apunta el puntero global `environ` de C. En Go, el runtime realiza una copia en el arranque y administra el acceso a través de un lock interno en el paquete `syscall`.\n\n¡Alerta de Concurrencia!: En versiones anteriores a Go 1.20, llamar a `os.Setenv` concurrentemente mientras otra goroutine leía con `os.Getenv` provocaba carreras de datos severas. Aunque Go protege sus llamadas internas con locks de lectura/escritura en `syscall`, invocar `os.Setenv` en tiempo de ejecución puede afectar a librerías de C externas enlazadas con `cgo` que no usen sincronización. Por ello, la regla de producción es leer todas las variables de entorno en el arranque (`main()`) y mantener la configuración inmutable después.",
      "keyPoints": [
        "Inmutabilidad post-arranque: evitar llamar a `os.Setenv` en goroutines concurrentes durante el ciclo de vida del servicio.",
        "Bloque environ de C: Go sincroniza las llamadas entre el runtime y la biblioteca estándar de C.",
        "Parseo de tipos: las variables de entorno son siempre strings; se deben convertir a números o booleanos explícitamente con `strconv`."
      ]
    },
    "evaluation": {
      "title": "Reto: Cargador de Configuración de Base de Datos con Fallbacks",
      "statement": "Escribe una función 'CargarConfigBD() (string, int)' que lea las variables de entorno 'DB_HOST' y 'DB_PORT'. Si no están definidas en el sistema, debe aplicar los valores por defecto 'localhost' y 5432 respectivamente. Parsea el puerto con strconv.Atoi y muestra la configuración final.",
      "starterCode": "package main\n\nimport (\n    \"fmt\"\n    \"os\"\n    \"strconv\"\n)\n\nfunc CargarConfigBD() (string, int) {\n    // Implementa la lectura con os.LookupEnv y fallbacks\n}\n\nfunc main() {\n    // Prueba la función antes y después de usar os.Setenv\n}",
      "hint": "Usa if h, ok := os.LookupEnv(\"DB_HOST\"); ok { host = h }. Lo mismo para el puerto.",
      "solution": "package main\n\nimport (\n    \"fmt\"\n    \"os\"\n    \"strconv\"\n)\n\nfunc CargarConfigBD() (string, int) {\n    host := \"localhost\" // Fallback por defecto\n    if val, ok := os.LookupEnv(\"DB_HOST\"); ok && val != \"\" {\n        host = val\n    }\n    \n    port := 5432 // Fallback por defecto para PostgreSQL\n    if val, ok := os.LookupEnv(\"DB_PORT\"); ok && val != \"\" {\n        if p, err := strconv.Atoi(val); err == nil {\n            port = p\n        }\n    }\n    \n    return host, port\n}\n\nfunc main() {\n    fmt.Println(\"--- 1. Lectura con valores por defecto (sin configurar) ---\")\n    h1, p1 := CargarConfigBD()\n    fmt.Printf(\"Conectando a base de datos en: %s:%d\\n\", h1, p1)\n    \n    fmt.Println(\"\\n--- 2. Lectura tras inyectar variables de entorno ---\")\n    os.Setenv(\"DB_HOST\", \"postgres-cluster.produccion.internal\")\n    os.Setenv(\"DB_PORT\", \"5433\")\n    \n    h2, p2 := CargarConfigBD()\n    fmt.Printf(\"Conectando a base de datos en: %s:%d\\n\", h2, p2)\n}",
      "explanation": "El patrón fallback garantiza que el programa pueda ejecutarse en desarrollo sin necesidad de configurar variables de entorno complejas, mientras que en producción en Kubernetes las variables inyectadas sobrescriben automáticamente la configuración de forma transparente."
    },
    "externalLinks": [
      {
        "title": "Paquete os: Environment functions",
        "url": "https://pkg.go.dev/os#Getenv",
        "description": "Documentación oficial de Getenv, Setenv, LookupEnv y Environ."
      },
      {
        "title": "Metodología Twelve-Factor App: Configuración externa",
        "url": "https://12factor.net/config",
        "description": "El estándar de la industria para configuración de software en la nube."
      },
      {
        "title": "Go by Example Original: Environment Variables",
        "url": "https://gobyexample.com/environment-variables",
        "description": "Ejemplo en Go by Example."
      }
    ],
    "code": "// Las [variables de entorno](https://en.wikipedia.org/wiki/Environment_variable)\n// son un mecanismo universal para [transmitir información de\n// configuración a programas Unix](https://www.12factor.net/config).\n// Veamos cómo definir, obtener y listar variables de entorno.\n\npackage main\n\nimport (\n\t\"fmt\"\n\t\"os\"\n\t\"strings\"\n)\n\nfunc main() {\n\n\t// Para definir un par clave/valor, usa `os.Setenv`. Para obtener el\n\t// valor de una clave, usa `os.Getenv`. Esto devolverá\n\t// una cadena vacía si la clave no está presente en el\n\t// entorno.\n\tos.Setenv(\"FOO\", \"1\")\n\tfmt.Println(\"FOO:\", os.Getenv(\"FOO\"))\n\tfmt.Println(\"BAR:\", os.Getenv(\"BAR\"))\n\n\t// Usa `os.Environ` para listar todos los pares clave/valor presentes en el\n\t// entorno. Esto devuelve un slice de cadenas con el\n\t// formato `KEY=value`. Puedes usar `strings.SplitN` para\n\t// separar la clave y el valor. Aquí imprimimos todas las claves.\n\tfmt.Println()\n\tfor _, e := range os.Environ() {\n\t\tpair := strings.SplitN(e, \"=\", 2)\n\t\tfmt.Println(pair[0])\n\t}\n}\n",
    "output": "# Ejecutar el programa demuestra que recuperamos el valor\n# para `FOO` configurado en el código, mientras que\n# `BAR` permanece vacío.\n$ go run environment-variables.go\nFOO: 1\nBAR: \n\n# La lista de claves en el entorno dependerá de la configuración\n# de tu máquina particular.\nTERM_PROGRAM\nPATH\nSHELL\n...\nFOO\n\n# Si definimos `BAR` en el entorno antes de la invocación, el programa\n# en ejecución capturará dicho valor.\n$ BAR=2 go run environment-variables.go\nFOO: 1\nBAR: 2\n...\n",
    "officialUrl": "https://gobyexample.com/environment-variables"
  },
  {
    "id": 77,
    "slug": "logging",
    "title": "Logging",
    "titleEs": "Registro de Logs (log y log/slog Estructurado)",
    "category": "CLI, Pruebas y Benchmarking",
    "categorySlug": "cli-testing",
    "categoryIcon": "target",
    "difficulty": "Intermedio",
    "summary": "Emisión de mensajes de diagnóstico tradicionales con 'log' y logs estructurados en JSON de alto rendimiento con 'log/slog' (Go 1.21+).",
    "originalExpl": "La biblioteca estándar de Go proporciona herramientas sencillas para la salida de logs. En Go 1.21 se introdujo el paquete oficial 'log/slog' para logging estructurado.",
    "basicExpl": {
      "title": "Conceptos Fundamentales para Principiantes",
      "content": "Los logs son el diario de a bordo de tu servidor: registran cada cosa que pasa para que puedas saber qué ocurrió si algo falla a las 3 de la mañana:\n1. Logging clásico: `log.Println(\"Servidor arrancado\")`. Imprime automáticamente la fecha, la hora y el mensaje en la salida de error estándar (`os.Stderr`).\n2. Logs fatales: `log.Fatal(\"Error grave\")` imprime el mensaje y sale inmediatamente del programa con `os.Exit(1)`.\n3. Logs modernos estructurados (Go 1.21+): en vez de texto plano difícil de filtrar en sistemas como Datadog o Grafana, se usa `log/slog` para generar logs estructurados con claves y valores (ejemplo: usuario=carlos ip=192.168.1.1).",
      "keyPoints": [
        "Paquete clásico: `import \"log\"`.",
        "Nuevo paquete estándar en Go 1.21+: `import \"log/slog\"`.",
        "`log.Panic`: imprime el mensaje y lanza un panic.",
        "`log.Fatal`: imprime el mensaje y finaliza el proceso inmediatamente sin ejecutar defers.",
        "Niveles de log estándar en slog: `Debug`, `Info`, `Warn`, `Error`."
      ]
    },
    "interExpl": {
      "title": "Mecanismos Internos y Buenas Prácticas",
      "content": "Logging Estructurado Moderno con `log/slog` (Go 1.21+):\nEl paquete `slog` es una de las incorporaciones más celebradas de la historia reciente de Go. Permite emitir logs tanto en formato texto plano amigable para humanos como en formato JSON puro para producción:\n```go\nimport \"log/slog\"\n\n// Configurar salida en JSON para producción\nlogger := slog.New(slog.NewJSONHandler(os.Stdout, nil))\nslog.SetDefault(logger)\n\n// Registrar evento estructurado\nslog.Info(\"Usuario inició sesión\", \n    \"usuario_id\", 1042, \n    \"ip\", \"203.0.113.19\",\n    \"metodo\", \"oauth2\",\n)\n```\nEsto genera una línea JSON perfecta: `{\"time\":\"...\",\"level\":\"INFO\",\"msg\":\"Usuario inició sesión\",\"usuario_id\":1042,...}` lista para ser indexada en Elasticsearch o Loki.",
      "keyPoints": [
        "`slog.NewJSONHandler`: formatea logs en JSON estructurado de alto rendimiento.",
        "`slog.With(...)`: crea loggers derivados que incluyen metadatos comunes en todas sus emisiones (ej. `request_id`).",
        "Tipado fuerte con `slog.Attr`: `slog.Int(\"id\", 42)` evita asignaciones de memoria frente a pares de clave/valor reflexivos."
      ]
    },
    "expertExpl": {
      "title": "Bajo Nivel, Rendimiento e Internals",
      "content": "Optimización Zero-Alloc con `slog.Attr` y la Interfaz `LogValuer`:\nCuando usas pares genéricos `\"clave\", valor`, Go debe convertir `valor` a `any`, lo que puede forzar escape al Heap.\nPara caminos de ejecución críticos en sistemas financieros o de telecomunicaciones, `slog` ofrece métodos fuertemente tipados: `slog.Int`, `slog.String`, `slog.Duration`, `slog.Group` que almacenan los valores en una estructura plana `slog.Attr` sin asignaciones de memoria.\n\nAdemás, `slog` incluye la interfaz `slog.LogValuer`: permite enmascarar automáticamente campos sensibles (como contraseñas o tarjetas de crédito) para que jamás aparezcan en texto claro en los logs:\n```go\ntype Password string\nfunc (p Password) LogValue() slog.Value {\n    return slog.StringValue(\"********\")\n}\n```",
      "keyPoints": [
        "Interfaz `slog.LogValuer`: previene fugas de datos sensibles (GDPR/PCI-DSS) enmascarando campos automáticamente.",
        "Zero allocations con `slog.Attr`: estructuración tipada sin impacto en el Garbage Collector.",
        "Control dinámico de nivel: `slog.LevelVar` permite cambiar el nivel de log (de Info a Debug) en caliente en producción sin reiniciar el servidor."
      ]
    },
    "evaluation": {
      "title": "Reto: Logger JSON Estructurado con Enmascaramiento de Seguridad",
      "statement": "Crea un tipo 'Credencial' con campo 'Token' (string) que implemente la interfaz 'slog.LogValuer' para enmascarar el valor con 'REDACTED'. Configura un logger JSON con slog y registra un evento 'Acceso API' pasando el usuario y la credencial protegida.",
      "starterCode": "package main\n\nimport (\n    \"log/slog\"\n    \"os\"\n)\n\ntype Credencial struct {\n    Token string\n}\n\n// Implementa LogValue() slog.Value en Credencial\n\nfunc main() {\n    // Configura slog con NewJSONHandler y emite el log\n}",
      "hint": "Define func (c Credencial) LogValue() slog.Value { return slog.StringValue(\"[REDACTADO]\") }.",
      "solution": "package main\n\nimport (\n    \"log/slog\"\n    \"os\"\n)\n\ntype Credencial struct {\n    Token string\n}\n\n// Enmascara el token automáticamente al loguear\nfunc (c Credencial) LogValue() slog.Value {\n    return slog.StringValue(\"***REDACTADO***\")\n}\n\nfunc main() {\n    // Creamos un handler JSON hacia la salida estándar\n    handler := slog.NewJSONHandler(os.Stdout, &slog.HandlerOptions{\n        Level: slog.LevelInfo,\n    })\n    logger := slog.New(handler)\n    \n    secreto := Credencial{Token: \"api_key_secreta_super_sensible_12345\"}\n    \n    logger.Info(\"Autenticación exitosa en microservicio\",\n        slog.String(\"servicio\", \"facturacion\"),\n        slog.String(\"usuario\", \"admin_corp\"),\n        slog.Any(\"credencial\", secreto), // Se enmascara gracias a LogValuer\n    )\n}",
      "explanation": "La interfaz 'slog.LogValuer' es interceptada por el formateador JSON de slog. Aunque el objeto contenga el token real en memoria, la salida serializada en el log reemplaza el dato por '***REDACTADO***', blindando la aplicación contra filtraciones de seguridad accidentales."
    },
    "externalLinks": [
      {
        "title": "Blog oficial de Go: Registro estructurado de eventos con el paquete slog",
        "url": "https://go.dev/blog/slog",
        "description": "Artículo oficial de lanzamiento del paquete de logging estructurado slog en Go 1.21."
      },
      {
        "title": "Paquete log/slog (Biblioteca estándar de Go)",
        "url": "https://pkg.go.dev/log/slog",
        "description": "Documentación oficial del paquete log/slog."
      },
      {
        "title": "Go by Example Original: Logging",
        "url": "https://gobyexample.com/logging",
        "description": "Ejemplo en Go by Example."
      }
    ],
    "code": "// La biblioteca estándar de Go proporciona excelentes\n// herramientas para emitir registros (logs) desde programas, con\n// el paquete [log](https://pkg.go.dev/log) para\n// salidas en texto libre y el paquete\n// [log/slog](https://pkg.go.dev/log/slog) para\n// salidas estructuradas.\npackage main\n\nimport (\n\t\"bytes\"\n\t\"fmt\"\n\t\"log\"\n\t\"os\"\n\n\t\"log/slog\"\n)\n\nfunc main() {\n\n\t// La simple invocación de funciones como `Println` desde el\n\t// paquete `log` utiliza el logger _estándar_, el cual\n\t// viene preconfigurado con una salida razonable\n\t// hacia `os.Stderr`. Métodos adicionales como\n\t// `Fatal*` o `Panic*` terminarán el programa tras\n\t// registrar el mensaje.\n\tlog.Println(\"standard logger\")\n\n\t// Los loggers pueden configurarse con _banderas_ (flags) para definir\n\t// su formato de salida. Por defecto, el logger estándar\n\t// tiene activadas las banderas `log.Ldate` y `log.Ltime`,\n\t// agrupadas en `log.LstdFlags`.\n\t// Podemos modificar sus banderas para emitir la hora con\n\t// precisión de microsegundos, por ejemplo.\n\tlog.SetFlags(log.LstdFlags | log.Lmicroseconds)\n\tlog.Println(\"with micro\")\n\n\t// También permite emitir el nombre del archivo y la\n\t// línea exacta desde donde se invocó la función `log`.\n\tlog.SetFlags(log.LstdFlags | log.Lshortfile)\n\tlog.Println(\"with file/line\")\n\n\t// Puede resultar muy útil crear un logger personalizado y\n\t// pasarlo entre componentes. Al crear un nuevo logger, podemos\n\t// definir un _prefijo_ para distinguir su salida\n\t// de la de otros loggers.\n\tmylog := log.New(os.Stdout, \"my:\", log.LstdFlags)\n\tmylog.Println(\"from mylog\")\n\n\t// Podemos modificar el prefijo\n\t// en loggers existentes (incluyendo el estándar)\n\t// mediante el método `SetPrefix`.\n\tmylog.SetPrefix(\"ohmy:\")\n\tmylog.Println(\"from mylog\")\n\n\t// Los loggers admiten destinos de salida personalizados;\n\t// cualquier implementación de `io.Writer` es válida.\n\tvar buf bytes.Buffer\n\tbuflog := log.New(&buf, \"buf:\", log.LstdFlags)\n\n\t// Esta llamada escribe la salida de log dentro de `buf`.\n\tbuflog.Println(\"hello\")\n\n\t// Esto lo mostrará en la salida estándar.\n\tfmt.Print(\"from buflog:\", buf.String())\n\n\t// El paquete `slog` provee\n\t// salida de registros _estructurada_. Por ejemplo, registrar\n\t// en formato JSON es sumamente sencillo.\n\tjsonHandler := slog.NewJSONHandler(os.Stderr, nil)\n\tmyslog := slog.New(jsonHandler)\n\tmyslog.Info(\"hi there\")\n\n\t// Además del mensaje principal, la salida de `slog` puede\n\t// contener un número arbitrario de pares clave=valor.\n\tmyslog.Info(\"hello again\", \"key\", \"val\", \"age\", 25)\n}\n",
    "output": "# Salida de ejemplo; la fecha y la hora\n# emitidas dependerán de cuándo se ejecutó el ejemplo.\n$ go run logging.go\n2023/08/22 10:45:16 standard logger\n2023/08/22 10:45:16.904141 with micro\n2023/08/22 10:45:16 logging.go:40: with file/line\nmy:2023/08/22 10:45:16 from mylog\nohmy:2023/08/22 10:45:16 from mylog\nfrom buflog:buf:2023/08/22 10:45:16 hello\n\n# Estos registros se muestran divididos en líneas para mayor claridad didáctica;\n# en la práctica se emiten en una sola línea continua.\n{\"time\":\"2023-08-22T10:45:16.904166391-07:00\",\n \"level\":\"INFO\",\"msg\":\"hi there\"}\n{\"time\":\"2023-08-22T10:45:16.904178985-07:00\",\n\t\"level\":\"INFO\",\"msg\":\"hello again\",\n\t\"key\":\"val\",\"age\":25}\n",
    "officialUrl": "https://gobyexample.com/logging"
  },
  {
    "id": 78,
    "slug": "http-client",
    "title": "HTTP Client",
    "titleEs": "Cliente HTTP y Peticiones Web (net/http)",
    "category": "Redes, Procesos y Sistema Operativo",
    "categorySlug": "redes-sistema",
    "categoryIcon": "globe",
    "difficulty": "Intermedio",
    "summary": "Consumo de APIs REST y servicios web con http.Get, http.Post y configuración de clientes http.Client con timeouts.",
    "originalExpl": "La biblioteca estándar de Go viene con un soporte excelente para clientes y servidores HTTP en el paquete net/http. En este ejemplo lo usaremos para emitir peticiones HTTP sencillas.",
    "basicExpl": {
      "title": "Conceptos Fundamentales para Principiantes",
      "content": "Para consultar una página web o llamar a una API REST en internet desde Go:\n1. Petición rápida: `resp, err := http.Get(\"https://ejemplo.com\")`.\n2. Comprobar errores: verificar `if err != nil`.\n3. Cierre obligatorio del cuerpo: `defer resp.Body.Close()` (¡CRÍTICO para no saturar conexiones de red!).\n4. Leer el contenido devuelto: `cuerpo, err := io.ReadAll(resp.Body)`.\n5. Comprobar el código de estado: `resp.StatusCode` (200 = OK, 404 = No encontrado).",
      "keyPoints": [
        "Se importa con `import \"net/http\"`.",
        "`resp.Body.Close()` DEBE ejecutarse siempre mediante `defer` tras comprobar que `err == nil`.",
        "`resp.Status` y `resp.StatusCode`: códigos de estado HTTP devueltos por el servidor remoto.",
        "`http.Post`: para enviar datos y payloads JSON."
      ]
    },
    "interExpl": {
      "title": "Mecanismos Internos y Buenas Prácticas",
      "content": "Peligro del Cliente por Defecto y Timeouts Obligatorios:\nNUNCA uses `http.Get` o `http.DefaultClient` en aplicaciones de producción. El cliente por defecto de Go NO TIENE TIMEOUT (`Timeout: 0`, lo que significa tiempo infinito).\nSi el servidor remoto se congela o acepta la conexión pero no envía bytes, tu goroutine quedará bloqueada para siempre. Si tienes miles de usuarios, tu servidor se quedará sin sockets y colapsará.\nRegla de producción: Crea siempre una instancia propia de `&http.Client` con un timeout explícito:\n```go\ncliente := &http.Client{\n    Timeout: 10 * time.Second,\n}\nresp, err := cliente.Get(\"https://api.empresa.com/datos\")\n```\nReutilización de Conexiones TCP (HTTP Keep-Alive): El `http.Client` reutiliza conexiones TCP abiertas. Para que esto funcione, DEBES leer el cuerpo completo (`io.Copy(io.Discard, resp.Body)`) antes de cerrarlo; si no lo lees, la conexión TCP se destruye y no se puede reutilizar.",
      "keyPoints": [
        "Configurar `http.Client.Timeout`: previene que peticiones de red lentas congelen goroutines indefinidamente.",
        "Drenaje para Keep-Alive: drenar el cuerpo con `io.Copy(io.Discard, resp.Body)` antes de cerrar para reutilizar sockets TCP.",
        "`http.NewRequestWithContext`: asociar un `context.Context` a la petición para cancelaciones automáticas si el cliente se desconecta."
      ]
    },
    "expertExpl": {
      "title": "Bajo Nivel, Rendimiento e Internals",
      "content": "Estructura `http.Transport` y Pool de Conexiones (Connection Pooling):\nEl motor de red interno de `http.Client` es el `http.Transport`:\n- `MaxIdleConns`: número máximo de conexiones TCP inactivas en pool en memoria.\n- `MaxIdleConnsPerHost`: por defecto es solo 2. En microservicios que llaman intensivamente a un mismo servicio interno, este valor de 2 provoca que Go abra y cierre conexiones TCP continuamente, sufriendo latencia por el handshake TCP de 3 vías y el handshake TLS en cada llamada. En producción se debe subir a 50 o 100.\n- Soporte nativo y transparente de HTTP/2 y multiplexación por un único socket TCP.",
      "keyPoints": [
        "Ajustar `MaxIdleConnsPerHost`: vital para evitar saturación de puertos efímeros (`TIME_WAIT`) en microservicios.",
        "HTTP/2 Multiplexing: Go negocia automáticamente HTTP/2 mediante ALPN durante el handshake TLS.",
        "DNS Caching y DialContext: configurar resolvers DNS personalizados para evitar consultas DNS repetidas en cada petición."
      ]
    },
    "evaluation": {
      "title": "Reto: Cliente HTTP Seguro con Timeout y Lectura de Cabeceras",
      "statement": "Crea una función 'ConsultarEndpoint(urlStr string) (int, string, error)' que utilice un http.Client personalizado con timeout de 3 segundos para hacer una petición GET. Valida el código de estado, extrae la cabecera 'Content-Type' y lee los primeros 100 caracteres del cuerpo.",
      "starterCode": "package main\n\nimport (\n    \"fmt\"\n    \"net/http\"\n    \"time\"\n)\n\nfunc ConsultarEndpoint(urlStr string) (int, string, error) {\n    // Implementa el cliente con timeout y lectura segura\n}\n\nfunc main() {\n    // Prueba consultando https://httpbin.org/get o similar\n}",
      "hint": "Crea cliente := &http.Client{Timeout: 3*time.Second}. Usa resp.Header.Get(\"Content-Type\").",
      "solution": "package main\n\nimport (\n    \"fmt\"\n    \"io\"\n    \"net/http\"\n    \"time\"\n)\n\nfunc ConsultarEndpoint(urlStr string) (int, string, error) {\n    cliente := &http.Client{\n        Timeout: 3 * time.Second,\n    }\n    \n    resp, err := cliente.Get(urlStr)\n    if err != nil {\n        return 0, \"\", err\n    }\n    defer resp.Body.Close() // Cierre garantizado\n    \n    tipoContenido := resp.Header.Get(\"Content-Type\")\n    cuerpo, err := io.ReadAll(io.LimitReader(resp.Body, 100))\n    if err != nil {\n        return resp.StatusCode, tipoContenido, err\n    }\n    \n    return resp.StatusCode, fmt.Sprintf(\"[%s] %s...\", tipoContenido, string(cuerpo)), nil\n}\n\nfunc main() {\n    urlPrueba := \"https://gobyexample.com/\"\n    codigo, detalle, err := ConsultarEndpoint(urlPrueba)\n    if err != nil {\n        fmt.Println(\"Fallo en la petición:\", err)\n        return\n    }\n    fmt.Printf(\"Estado HTTP: %d\\nDetalles: %s\\n\", codigo, detalle)\n}",
      "explanation": "El uso de un cliente con `Timeout` explícito garantiza que la llamada no quede colgada si la red falla. La lectura se protege con `io.LimitReader` para no absorber más de 100 bytes en memoria y el cierre de `resp.Body` mediante defer permite reutilizar la conexión TCP."
    },
    "externalLinks": [
      {
        "title": "Paquete net/http (Biblioteca estándar de Go)",
        "url": "https://pkg.go.dev/net/http",
        "description": "Documentación oficial del paquete net/http de la biblioteca estándar."
      },
      {
        "title": "Blog oficial de Go: Cliente HTTP y configuración de la capa de transporte",
        "url": "https://go.dev/blog/http-tracing",
        "description": "Inspección y rastreo de peticiones con HTTP Client Tracing."
      },
      {
        "title": "Cloudflare: Guía integral sobre tiempos de espera (Timeouts) en net/http",
        "url": "https://blog.cloudflare.com/the-complete-guide-to-golang-net-http-timeouts/",
        "description": "Guía canónica de Cloudflare sobre la configuración correcta de timeouts en Go."
      },
      {
        "title": "Go by Example Original: HTTP Client",
        "url": "https://gobyexample.com/http-client",
        "description": "Página oficial del ejemplo en Go by Example.",
        "type": "Referencia Original"
      }
    ],
    "code": "// La biblioteca estándar de Go incluye un soporte sobresaliente\n// para clientes y servidores HTTP en el paquete `net/http`.\n// En este ejemplo lo utilizaremos para emitir peticiones\n// HTTP básicas.\npackage main\n\nimport (\n\t\"bufio\"\n\t\"fmt\"\n\t\"net/http\"\n)\n\nfunc main() {\n\n\t// Emite una petición HTTP GET a un servidor. `http.Get` es un\n\t// atajo conveniente que evita tener que crear un objeto `http.Client`\n\t// y llamar a su método `Get`; utiliza el objeto\n\t// `http.DefaultClient`, el cual posee configuraciones predeterminadas útiles.\n\tresp, err := http.Get(\"https://gobyexample.com\")\n\tif err != nil {\n\t\tpanic(err)\n\t}\n\tdefer resp.Body.Close()\n\n\t// Imprime el estado de la respuesta HTTP.\n\tfmt.Println(\"Response status:\", resp.Status)\n\n\t// Imprime las primeras 5 líneas del cuerpo de la respuesta.\n\tscanner := bufio.NewScanner(resp.Body)\n\tfor i := 0; scanner.Scan() && i < 5; i++ {\n\t\tfmt.Println(scanner.Text())\n\t}\n\n\tif err := scanner.Err(); err != nil {\n\t\tpanic(err)\n\t}\n}\n",
    "output": "$ go run http-clients.go\nResponse status: 200 OK\n<!DOCTYPE html>\n<html>\n  <head>\n    <meta charset=\"utf-8\">\n    <title>Go by Example</title>\n",
    "officialUrl": "https://gobyexample.com/http-client"
  },
  {
    "id": 79,
    "slug": "http-server",
    "title": "HTTP Server",
    "titleEs": "Servidor Web HTTP Nativo (net/http)",
    "category": "Redes, Procesos y Sistema Operativo",
    "categorySlug": "redes-sistema",
    "categoryIcon": "globe",
    "difficulty": "Intermedio",
    "summary": "Creación de servidores web de producción, enrutamiento con ServeMux (Go 1.22+) y manejadores http.Handler.",
    "originalExpl": "Escribir un servidor HTTP básico es fácil usando el paquete net/http. Un concepto fundamental en los servidores net/http son los handlers, que implementan la interfaz http.Handler.",
    "basicExpl": {
      "title": "Conceptos Fundamentales para Principiantes",
      "content": "Go es uno de los lenguajes favoritos para el desarrollo backend porque incluye un servidor web completo de nivel de producción sin instalar nada:\n1. Creas un manejador (handler): una función que recibe dos cosas: el escritor donde respondes (`w http.ResponseWriter`) y los datos de la petición que hace el usuario (`r *http.Request`).\n2. Registras la ruta: `http.HandleFunc(\"/hola\", func(w http.ResponseWriter, r *http.Request) { fmt.Fprintln(w, \"¡Hola Mundo!\") })`.\n3. Enciendes el servidor: `http.ListenAndServe(\":8080\", nil)`.\n¡Y listo! Tu computadora está escuchando peticiones en el puerto 8080.",
      "keyPoints": [
        "`http.ResponseWriter`: donde escribes el HTML, texto o JSON de respuesta.",
        "`*http.Request`: contiene la URL, método (GET/POST), cabeceras y cuerpo de la petición.",
        "`http.ListenAndServe(\":puerto\", handler)`: arranca el bucle de escucha del servidor.",
        "Cada petición entrante corre automáticamente en su propia Goroutine independiente."
      ]
    },
    "interExpl": {
      "title": "Mecanismos Internos y Buenas Prácticas",
      "content": "El Nuevo Enrutador con Métodos y Parámetros en Go 1.22+:\nHistóricamente, el enrutador estándar `http.ServeMux` de Go era muy simple y obligaba a usar librerías externas (como Gorilla Mux o Chi) para rutas REST. En Go 1.22, el `http.ServeMux` fue modernizado completamente:\n- Soporta métodos HTTP directamente: `\"GET /usuarios\"` o `\"POST /usuarios\"`.\n- Soporta variables de ruta comodín: `\"GET /usuarios/{id}\"`.\n- Extraer la variable comodín: `id := r.PathValue(\"id\")`.\nConfiguración de timeouts del servidor:\nNUNCA uses `http.ListenAndServe` directamente en producción porque no tiene timeouts de lectura ni escritura. Instancia `&http.Server` configurando `ReadTimeout: 5*time.Second` y `WriteTimeout: 10*time.Second` para protegerte contra ataques Slowloris.",
      "keyPoints": [
        "Novedad Go 1.22: enrutamiento nativo por método (`GET /api`) y parámetros de ruta (`r.PathValue(\"id\")`).",
        "Protección Slowloris: configurar `ReadTimeout` y `WriteTimeout` en `http.Server`.",
        "Patrón Middleware: funciones que envuelven `http.Handler` para autenticación, logging y CORS."
      ]
    },
    "expertExpl": {
      "title": "Bajo Nivel, Rendimiento e Internals",
      "content": "Arquitectura de Goroutine-per-Connection y Graceful Shutdown:\nEl bucle interno de `http.Server` ejecuta un `net.Listener.Accept()` infinito. Por cada socket TCP entrante, el servidor genera una NUEVA goroutine ligera (`go c.serve(connCtx)`).\nSi llegan 50,000 conexiones concurrentes, Go ejecuta 50,000 goroutines que el scheduler distribuye limpiamente entre los núcleos de la CPU.\n\nApagado Gracioso (Graceful Shutdown con `server.Shutdown(ctx)`):\nEn Kubernetes, cuando un contenedor va a ser actualizado, no debe matar las peticiones activas de los usuarios a mitad de camino. Se captura la señal `SIGTERM` y se invoca a `server.Shutdown(ctx)`: el servidor deja de aceptar conexiones nuevas, espera a que las peticiones en curso terminen pacientemente durante un periodo de gracia y luego finaliza el proceso de forma limpia.",
      "keyPoints": [
        "Goroutine-per-Connection: concurrencia masiva natural sin hilos pesados del sistema operativo.",
        "`server.Shutdown(ctx)`: finalización ordenada sin cortar transacciones de usuarios activos.",
        "Buffer Pools con `sync.Pool`: los frameworks de alto rendimiento reutilizan búferes de respuesta para lograr 0 asignaciones de memoria por petición."
      ]
    },
    "evaluation": {
      "title": "Reto: Endpoint REST con Parámetros de Ruta de Go 1.22+",
      "statement": "Crea un servidor HTTP utilizando las novedades de Go 1.22+ en http.NewServeMux. Registra una ruta 'GET /saludar/{nombre}' que extraiga el parámetro con r.PathValue(\"nombre\") y responda con un mensaje JSON '{\"saludo\": \"Hola [nombre]\"}' estableciendo la cabecera Content-Type correspondiente.",
      "starterCode": "package main\n\nimport (\n    \"fmt\"\n    \"net/http\"\n)\n\nfunc main() {\n    // Crea mux con NewServeMux y registra GET /saludar/{nombre}\n    // Responde en JSON\n}",
      "hint": "Usa mux := http.NewServeMux(); mux.HandleFunc(\"GET /saludar/{nombre}\", ...). Extrae con r.PathValue(\"nombre\").",
      "solution": "package main\n\nimport (\n    \"encoding/json\"\n    \"fmt\"\n    \"net/http\"\n)\n\ntype RespuestaSaludo struct {\n    Saludo string `json:\"saludo\"`\n}\n\nfunc main() {\n    mux := http.NewServeMux()\n    \n    // Sintaxis moderna de Go 1.22 con método y variable de ruta\n    mux.HandleFunc(\"GET /saludar/{nombre}\", func(w http.ResponseWriter, r *http.Request) {\n        nombre := r.PathValue(\"nombre\")\n        if nombre == \"\" {\n            http.Error(w, \"Nombre requerido\", http.StatusBadRequest)\n            return\n        }\n        \n        w.Header().Set(\"Content-Type\", \"application/json\")\n        w.WriteHeader(http.StatusOK)\n        \n        resp := RespuestaSaludo{Saludo: fmt.Sprintf(\"Hola, %s! Bienvenido a Go 1.22\", nombre)}\n        json.NewEncoder(w).Encode(resp)\n    })\n    \n    fmt.Println(\"Servidor HTTP listo en http://localhost:8080\")\n    // Para probar: curl http://localhost:8080/saludar/Elena\n    // http.ListenAndServe(\":8080\", mux)\n}",
      "explanation": "La actualización de Go 1.22 introdujo compatibilidad nativa con patrones REST directamente en la biblioteca estándar sin requerir frameworks de terceros. El método r.PathValue extrae limpiamente variables de la URL y json.NewEncoder serializa la respuesta en streaming."
    },
    "externalLinks": [
      {
        "title": "Blog oficial de Go: Enrutamiento avanzado con métodos y patrones en Go 1.22",
        "url": "https://go.dev/blog/routing-enhancements",
        "description": "Explicación oficial de las nuevas capacidades de enrutamiento en Go 1.22."
      },
      {
        "title": "Paquete net/http: Server and ServeMux",
        "url": "https://pkg.go.dev/net/http#ServeMux",
        "description": "Documentación oficial del servidor y enrutador ServeMux."
      },
      {
        "title": "Go by Example Original: HTTP Server",
        "url": "https://gobyexample.com/http-server",
        "description": "Ejemplo en Go by Example."
      }
    ],
    "code": "// Escribir un servidor HTTP básico es muy directo utilizando el\n// paquete `net/http`.\npackage main\n\nimport (\n\t\"fmt\"\n\t\"net/http\"\n)\n\n// Un concepto fundamental en los servidores de `net/http` son\n// los *manejadores* (handlers). Un handler es un objeto que implementa la\n// interfaz `http.Handler`. Una forma común de escribir\n// un handler es utilizar el adaptador `http.HandlerFunc`\n// sobre funciones con la firma adecuada.\nfunc hello(w http.ResponseWriter, req *http.Request) {\n\n\t// Las funciones que actúan como handlers reciben un\n\t// `http.ResponseWriter` y un `http.Request` como\n\t// argumentos. El escritor de respuesta se utiliza para construir la\n\t// respuesta HTTP. Aquí nuestra respuesta sencilla es solo\n\t// \"hello\\n\".\n\tfmt.Fprintf(w, \"hello\\n\")\n}\n\nfunc headers(w http.ResponseWriter, req *http.Request) {\n\n\t// Este handler realiza una tarea un poco más\n\t// sofisticada leyendo todas las cabeceras de la petición HTTP\n\t// y reflejándolas en el cuerpo de la respuesta.\n\tfor name, headers := range req.Header {\n\t\tfor _, h := range headers {\n\t\t\tfmt.Fprintf(w, \"%v: %v\\n\", name, h)\n\t\t}\n\t}\n}\n\nfunc main() {\n\n\t// Registramos nuestros manejadores en las rutas del servidor usando la\n\t// función de conveniencia `http.HandleFunc`. Esta configura\n\t// el *enrutador predeterminado* en el paquete `net/http` y\n\t// toma una función como argumento.\n\thttp.HandleFunc(\"/hello\", hello)\n\thttp.HandleFunc(\"/headers\", headers)\n\n\t// Finalmente, invocamos `ListenAndServe` con el puerto\n\t// y un handler. Pasar `nil` le indica que use el enrutador\n\t// predeterminado que acabamos de configurar.\n\thttp.ListenAndServe(\":8090\", nil)\n}\n",
    "output": "# Inicia el servidor en segundo plano.\n$ go run http-server.go &\n\n# Accede a la ruta `/hello`.\n$ curl localhost:8090/hello\nhello\n",
    "officialUrl": "https://gobyexample.com/http-server"
  },
  {
    "id": 80,
    "slug": "tcp-server",
    "title": "TCP Server",
    "titleEs": "Servidor TCP de Sockets de Red (net)",
    "category": "Redes, Procesos y Sistema Operativo",
    "categorySlug": "redes-sistema",
    "categoryIcon": "globe",
    "difficulty": "Avanzado",
    "summary": "Programación de red de bajo nivel mediante sockets TCP con net.Listen y manejo concurrente de conexiones net.Conn.",
    "originalExpl": "Escribir un servidor TCP de bajo nivel es muy sencillo con el paquete 'net'. En este ejemplo crearemos un servidor TCP que responde a conexiones concurrentes.",
    "basicExpl": {
      "title": "Conceptos Fundamentales para Principiantes",
      "content": "HTTP es un protocolo que corre sobre TCP. Si necesitas construir un chat en tiempo real, un protocolo propio para videojuegos o comunicarte con hardware industrial, necesitas hablar directamente con sockets TCP:\n- Abrir un puerto de escucha: `listener, err := net.Listen(\"tcp\", \":8080\")`.\n- Bucle infinito para aceptar clientes: `conn, err := listener.Accept()` (se pausa hasta que alguien se conecta).\n- Lanzar una goroutine por cada cliente: `go atenderCliente(conn)`.\n- Leer y escribir bytes crudos a través de la conexión `conn.Read()` y `conn.Write()`.",
      "keyPoints": [
        "Se importa con `import \"net\"`.",
        "`net.Listen(\"tcp\", \":puerto\")`: vincula el socket del sistema operativo y lo pone en modo escucha.",
        "`listener.Accept()`: bloquea hasta que un nuevo cliente TCP se conecta y devuelve una `net.Conn`.",
        "`net.Conn` implementa las interfaces estándar `io.Reader`, `io.Writer` e `io.Closer`."
      ]
    },
    "interExpl": {
      "title": "Mecanismos Internos y Buenas Prácticas",
      "content": "Timeouts de Socket con Deadlines (`SetDeadline`):\nEn sockets TCP crudos, si un cliente se conecta y nunca envía ningún byte, una llamada a `conn.Read()` quedará bloqueada para siempre, consumiendo memoria y descriptores de archivo del servidor (Slowloris TCP).\nPara evitarlo, Go ofrece los métodos 'Deadline':\n```go\n// El cliente tiene 30 segundos para enviar datos\nconn.SetReadDeadline(time.Now().Add(30 * time.Second))\n```\nSi expira el tiempo sin recibir datos, `conn.Read` devuelve un error de timeout (`os.ErrDeadlineExceeded`), permitiendo cerrar el socket y liberar la goroutine.",
      "keyPoints": [
        "`conn.SetReadDeadline` / `conn.SetWriteDeadline`: control de expiración de sockets de red.",
        "Estructuración de protocolos: en TCP no existen 'mensajes', solo un flujo continuo de bytes; debes delimitar los mensajes (por ejemplo, con un salto de línea `\\n` o anteponiendo un prefijo con la longitud de 4 bytes).",
        "Cierre bidireccional limpio: `conn.Close()` cierra la conexión en ambos sentidos enviando paquetes TCP FIN."
      ]
    },
    "expertExpl": {
      "title": "Bajo Nivel, Rendimiento e Internals",
      "content": "Integración del Network Poller en el Scheduler de Go:\nEn C/C++, para gestionar 100,000 sockets TCP concurrentes necesitas usar APIs asíncronas no bloqueantes complejas y orientadas a eventos como `epoll` en Linux, `kqueue` en macOS o `IOCP` en Windows.\nEn Go, puedes escribir código secuencial bloqueante simple (`conn.Read()`), pero por debajo, el runtime de Go convierte automáticamente todos los sockets a modo no bloqueante (`O_NONBLOCK`).\n\nCuando una goroutine ejecuta `conn.Read()` y el socket no tiene datos disponibles, el runtime de Go suspende la goroutine y registra el descriptor de archivo en el 'Network Poller' interno (un hilo en segundo plano que vigila los sockets con `epoll/kqueue`). En cuanto la tarjeta de red recibe datos, el Network Poller despierta a la goroutine correspondiente y la coloca en la cola de ejecución de un procesador `P`, logrando la máxima eficiencia de E/S asíncrona con la simplicidad de código síncrono.",
      "keyPoints": [
        "Network Poller de Go: integración transparente de epoll/kqueue en el scheduler de goroutines.",
        "Código síncrono con rendimiento asíncrono: sin callbacks hell ni arquitecturas complejas de bucle de eventos.",
        "TCP Keep-Alive nativo: Go habilita automáticamente TCP Keep-Alive en las conexiones aceptadas para detectar desconexiones físicas de cable o caídas de red."
      ]
    },
    "evaluation": {
      "title": "Reto: Servidor TCP Echo Concurrente con Cierre Ordenado",
      "statement": "Escribe un servidor TCP que escuche en un puerto disponible, acepte conexiones entrantes concurrentemente y devuelva en mayúsculas cualquier texto que el cliente envíe (Servidor Echo en mayúsculas). La conexión debe cerrarse cuando el cliente envíe 'salir' o desconecte.",
      "starterCode": "package main\n\nimport (\n    \"bufio\"\n    \"fmt\"\n    \"net\"\n    \"strings\"\n)\n\nfunc manejarConexion(conn net.Conn) {\n    // Lee línea a línea con bufio.Scanner y responde en mayúsculas\n}\n\nfunc main() {\n    // Inicia net.Listen(\"tcp\", \":9090\") y bucle Accept()\n}",
      "hint": "Usa scanner := bufio.NewScanner(conn) y escribe con conn.Write([]byte(strings.ToUpper(linea) + \"\\n\")).",
      "solution": "package main\n\nimport (\n    \"bufio\"\n    \"fmt\"\n    \"net\"\n    \"strings\"\n)\n\nfunc manejarConexion(conn net.Conn) {\n    defer conn.Close() // Garantiza liberación del socket\n    fmt.Printf(\"[NUEVA CONEXIÓN]: Cliente desde %s\\n\", conn.RemoteAddr())\n    \n    scanner := bufio.NewScanner(conn)\n    for scanner.Scan() {\n        texto := scanner.Text()\n        if strings.TrimSpace(texto) == \"salir\" {\n            conn.Write([]byte(\"Adiós! Cerrando conexión TCP.\\n\"))\n            break\n        }\n        \n        respuesta := strings.ToUpper(texto) + \"\\n\"\n        conn.Write([]byte(respuesta))\n    }\n    fmt.Printf(\"[DESCONECTADO]: Cliente %s finalizó\\n\", conn.RemoteAddr())\n}\n\nfunc main() {\n    listener, err := net.Listen(\"tcp\", \":9090\")\n    if err != nil {\n        panic(err)\n    }\n    defer listener.Close()\n    \n    fmt.Println(\"Servidor TCP Echo escuchando en el puerto :9090\")\n    fmt.Println(\"Prueba conectándote con: nc localhost 9090 o telnet localhost 9090\")\n    \n    // Bucle para aceptar conexiones infinitas concurrentes\n    for {\n        conn, err := listener.Accept()\n        if err != nil {\n            fmt.Println(\"Error al aceptar conexión:\", err)\n            continue\n        }\n        // Lanza una goroutine independiente por cada cliente\n        go manejarConexion(conn)\n    }\n}",
      "explanation": "El servidor utiliza `listener.Accept()` para recibir conexiones. Al pasar cada conexión a una goroutine independiente (`go manejarConexion(conn)`), el servidor puede atender a miles de clientes simultáneamente sin que una conexión lenta bloquee a las demás."
    },
    "externalLinks": [
      {
        "title": "Paquete net (Biblioteca estándar de Go)",
        "url": "https://pkg.go.dev/net",
        "description": "Documentación oficial del paquete net para sockets TCP, UDP e IP."
      },
      {
        "title": "Blog oficial de Go: Arquitectura del netpoller de E/S asíncrona de Go",
        "url": "https://morsmachine.dk/netpoller",
        "description": "Análisis técnico de cómo el Network Poller de Go interactúa con epoll en el kernel."
      },
      {
        "title": "Go by Example Original: TCP Server",
        "url": "https://gobyexample.com/tcp-server",
        "description": "Ejemplo en Go by Example."
      }
    ],
    "code": "// El paquete `net` provee las herramientas necesarias para construir\n// fácilmente servidores de sockets TCP.\npackage main\n\nimport (\n\t\"bufio\"\n\t\"fmt\"\n\t\"log\"\n\t\"net\"\n\t\"strings\"\n)\n\nfunc main() {\n\n\t// `net.Listen` inicia el servidor en la red indicada\n\t// (TCP) y dirección (puerto 8090 en todas las interfaces).\n\tlistener, err := net.Listen(\"tcp\", \":8090\")\n\tif err != nil {\n\t\tlog.Fatal(\"Error listening:\", err)\n\t}\n\n\t// Cierra el listener para liberar el puerto\n\t// cuando la aplicación finalice.\n\tdefer listener.Close()\n\n\t// Bucle indefinido para aceptar nuevas conexiones de clientes.\n\tfor {\n\t\t// Espera una conexión entrante.\n\t\tconn, err := listener.Accept()\n\t\tif err != nil {\n\t\t\tlog.Println(\"Error accepting conn:\", err)\n\t\t\tcontinue\n\t\t}\n\n\t\t// Usamos una goroutine aquí para atender la conexión,\n\t\t// permitiendo que el bucle principal continúe aceptando más\n\t\t// conexiones entrantes.\n\t\tgo handleConnection(conn)\n\t}\n}\n\n// `handleConnection` gestiona una única conexión de cliente,\n// leyendo una línea de texto del cliente y retornando una respuesta.\nfunc handleConnection(conn net.Conn) {\n\t// Cerrar la conexión libera los recursos cuando\n\t// terminamos de interactuar con el cliente.\n\tdefer conn.Close()\n\n\t// Usa `bufio.NewReader` para leer una línea de datos\n\t// del cliente (delimitada por salto de línea).\n\treader := bufio.NewReader(conn)\n\tmessage, err := reader.ReadString('\\n')\n\tif err != nil {\n\t\tlog.Printf(\"Read error: %v\", err)\n\t\treturn\n\t}\n\n\t// Crea y envía una respuesta de vuelta al cliente,\n\t// demostrando comunicación bidireccional.\n\tackMsg := strings.ToUpper(strings.TrimSpace(message))\n\tresponse := fmt.Sprintf(\"ACK: %s\\n\", ackMsg)\n\t_, err = conn.Write([]byte(response))\n\tif err != nil {\n\t\tlog.Printf(\"Server write error: %v\", err)\n\t}\n}\n",
    "output": "# Inicia el servidor TCP en segundo plano.\n$ go run tcp-server.go &\n\n# Envía datos y captura la respuesta utilizando netcat.\n$ echo \"Hello from netcat\" | nc localhost 8090\nACK: HELLO FROM NETCAT\n",
    "officialUrl": "https://gobyexample.com/tcp-server"
  },
  {
    "id": 81,
    "slug": "context",
    "title": "Context",
    "titleEs": "Gestión de Contextos y Cancelación (context)",
    "category": "Redes, Procesos y Sistema Operativo",
    "categorySlug": "redes-sistema",
    "categoryIcon": "globe",
    "difficulty": "Avanzado",
    "summary": "Propagación de plazos (deadlines), señales de cancelación y valores entre límites de APIs y goroutines concurrentes.",
    "originalExpl": "En el ejemplo anterior vimos cómo configurar un servidor HTTP básico. Los servidores HTTP son útiles para demostrar el uso de context.Context para controlar la cancelación. Un Context transporta plazos, señales de cancelación y otros valores entre límites de API.",
    "basicExpl": {
      "title": "Conceptos Fundamentales para Principiantes",
      "content": "Imagina que un usuario entra a tu página web y pide un reporte pesado. Pero a los 2 segundos, el usuario se arrepiente, cierra la pestaña del navegador y se va.\n¿Tiene sentido que tu servidor siga calculando durante 30 segundos y consultando la base de datos para un usuario que ya no está ahí? ¡No!\nEl paquete `context` es la línea telefónica que conecta todas las tareas:\n- Si el usuario cancela la petición, el `context` se apaga (`ctx.Done()`).\n- Todas las goroutines, consultas a base de datos y peticiones de red que estaban trabajando para esa petición se enteran al instante y se detienen inmediatamente, liberando memoria y CPU.",
      "keyPoints": [
        "Se importa con `import \"context\"`.",
        "Contexto raíz base: `ctx := context.Background()`.",
        "`context.WithCancel(padre)`: permite cancelar manualmente llamando a `cancel()`.",
        "`context.WithTimeout(padre, duracion)`: se cancela automáticamente tras expirar el tiempo.",
        "El canal `<-ctx.Done()` se activa en cuanto el contexto es cancelado."
      ]
    },
    "interExpl": {
      "title": "Mecanismos Internos y Buenas Prácticas",
      "content": "Reglas de oro de Context en Go (Google Go Team):\n1. Pasa siempre el `context.Context` como el PRIMER parámetro de una función (`func Consultar(ctx context.Context, id int)`). NUNCA lo guardes dentro de una estructura struct.\n2. Llama SIEMPRE a la función `defer cancel()` inmediatamente después de crear un contexto derivado (`ctx, cancel := context.WithTimeout(...)`). Olvidar llamar a `cancel` provoca fugas de temporizadores en memoria hasta que expire el plazo.\n3. Los contextos forman un árbol jerárquico: si cancelas el contexto padre, TODOS los contextos hijos derivados de él se cancelan automáticamente en cascada.\n4. Pasar valores con `context.WithValue`: úsalo ÚNICAMENTE para datos globales de la petición (como un `request_id` para trazabilidad o el token de autenticación decodificado), jamás para pasar argumentos opcionales de funciones.",
      "keyPoints": [
        "Primer parámetro obligatorio por convención: `ctx context.Context`.",
        "Cancelación en cascada: la cancelación del padre se propaga automáticamente a todos sus descendientes.",
        "`defer cancel()` obligatorio: previene fugas de recursos y goroutines del runtime.",
        "Inspección de causa: `ctx.Err()` devuelve `context.Canceled` o `context.DeadlineExceeded`."
      ]
    },
    "expertExpl": {
      "title": "Bajo Nivel, Rendimiento e Internals",
      "content": "Estructuras `cancelCtx` y `timerCtx` en `context/context.go`:\nUn contexto en Go es una interfaz inmutable. Cuando creas un contexto hijo con `WithCancel`:\n- Se crea una estructura `cancelCtx` interna que se registra a sí misma en el mapa de hijos (`children map[canceler]struct{}`) del contexto padre más cercano.\n- Al invocar `cancel()`, el runtime adquiere un mutex, cierra el canal interno `c.done` con `close()`, recorre recursivamente su mapa de hijos cancelándolos a todos y se desvincula del padre para permitir la recolección de basura inmediata por el GC.\n\nEn Go 1.20 se incorporó `context.WithCancelCause` y `context.Cause(ctx)`: permite adjuntar un error personalizado que explica con exactitud el motivo por el cual se canceló el contexto.",
      "keyPoints": [
        "Árbol de hijos con mutex interno: desvinculación limpia para recolección de basura por el GC.",
        "Cierre de canal Done: utiliza el patrón broadcast de `close(c.done)` para despertar simultáneamente a todas las goroutines esperando en `select`.",
        "`context.AfterFunc` (Go 1.21+): permite registrar callbacks que se ejecutan automáticamente cuando el contexto se cancela, simplificando la coordinación de APIs de terceros."
      ]
    },
    "evaluation": {
      "title": "Reto: Operación Concurrente con Cancelación por Timeout de Context",
      "statement": "Escribe una función 'SimularTareaPesada(ctx context.Context) error' que simule un cálculo que tarda 200ms comprobando periódicamente con un select si el contexto fue cancelado. En main, invoca la tarea con un context.WithTimeout de 100ms y comprueba que se interrumpa correctamente devolviendo el error context.DeadlineExceeded.",
      "starterCode": "package main\n\nimport (\n    \"context\"\n    \"fmt\"\n    \"time\"\n)\n\nfunc SimularTareaPesada(ctx context.Context) error {\n    // Usa select con <-ctx.Done() y time.After\n}\n\nfunc main() {\n    // Crea context.WithTimeout de 100ms y ejecuta la tarea de 200ms\n}",
      "hint": "En SimularTareaPesada haz: select { case <-time.After(200*time.Millisecond): return nil case <-ctx.Done(): return ctx.Err() }.",
      "solution": "package main\n\nimport (\n    \"context\"\n    \"fmt\"\n    \"time\"\n)\n\nfunc SimularTareaPesada(ctx context.Context) error {\n    fmt.Println(\"[Tarea]: Procesando consulta compleja...\")\n    \n    select {\n    case <-time.After(200 * time.Millisecond):\n        fmt.Println(\"[Tarea]: ¡Cálculo completado con éxito!\")\n        return nil\n    case <-ctx.Done():\n        fmt.Println(\"[Tarea]: Cancelación recibida. Abortando trabajo inmediatamente.\")\n        return ctx.Err() // Devuelve context.DeadlineExceeded o context.Canceled\n    }\n}\n\nfunc main() {\n    // Configuramos un plazo límite estricto de 100ms (la tarea tarda 200ms)\n    ctx, cancel := context.WithTimeout(context.Background(), 100*time.Millisecond)\n    defer cancel() // Buena práctica obligatoria para liberar el timer del contexto\n    \n    err := SimularTareaPesada(ctx)\n    if err != nil {\n        fmt.Println(\"Resultado en main: Operación abortada por:\", err)\n    } else {\n        fmt.Println(\"Resultado en main: Operación exitosa\")\n    }\n}",
      "explanation": "Al configurar un timeout de 100ms mediante 'context.WithTimeout', el canal 'ctx.Done()' se cierra automáticamente a los 100ms. La función 'SimularTareaPesada' detecta el evento en su sentencia select y detiene la ejecución inmediatamente, evitando el desperdicio de CPU."
    },
    "externalLinks": [
      {
        "title": "Blog oficial de Go: Patrones de concurrencia: El paquete Context",
        "url": "https://go.dev/blog/context",
        "description": "El artículo canónico de Sameer Ajmani que definió el estándar de context en Go."
      },
      {
        "title": "Paquete context (Biblioteca estándar de Go)",
        "url": "https://pkg.go.dev/context",
        "description": "Documentación oficial del paquete context en la biblioteca estándar."
      },
      {
        "title": "Go by Example Original: Context",
        "url": "https://gobyexample.com/context",
        "description": "Ejemplo en Go by Example."
      }
    ],
    "code": "// En el ejemplo anterior vimos cómo configurar un\n// [servidor HTTP](http-server) simple. Los servidores HTTP son muy útiles para\n// demostrar el uso de `context.Context` en el\n// control de cancelación. Un `Context` transporta plazos de tiempo (deadlines),\n// señales de cancelación y otros valores de ámbito de petición\n// a través de límites de APIs y goroutines.\npackage main\n\nimport (\n\t\"fmt\"\n\t\"net/http\"\n\t\"time\"\n)\n\nfunc hello(w http.ResponseWriter, req *http.Request) {\n\n\t// La infraestructura de `net/http` crea un `context.Context` para cada petición,\n\t// disponible a través del método `Context()`.\n\tctx := req.Context()\n\tfmt.Println(\"server: hello handler started\")\n\tdefer fmt.Println(\"server: hello handler ended\")\n\n\t// Esperamos unos segundos antes de enviar una respuesta al\n\t// cliente. Esto simula algún trabajo en progreso que realiza el servidor.\n\t// Mientras se trabaja, monitoreamos el canal `Done()` del contexto\n\t// para detectar si debemos cancelar la tarea y retornar lo antes posible.\n\tselect {\n\tcase <-time.After(10 * time.Second):\n\t\tfmt.Fprintf(w, \"hello\\n\")\n\tcase <-ctx.Done():\n\t\t// El método `Err()` del contexto devuelve un error\n\t\t// que explica por qué se cerró el canal `Done()`.\n\t\terr := ctx.Err()\n\t\tfmt.Println(\"server:\", err)\n\t\tinternalError := http.StatusInternalServerError\n\t\thttp.Error(w, err.Error(), internalError)\n\t}\n}\n\nfunc main() {\n\n\t// Como antes, registramos nuestro manejador en la ruta \"/hello\"\n\t// y comenzamos a servir peticiones.\n\thttp.HandleFunc(\"/hello\", hello)\n\thttp.ListenAndServe(\":8090\", nil)\n}\n",
    "output": "# Ejecuta el servidor en segundo plano.\n$ go run context.go &\n\n# Simula una petición de cliente hacia `/hello`, presionando\n# Ctrl+C poco después de iniciar para enviar una señal\n# de cancelación.\n$ curl localhost:8090/hello\nserver: hello handler started\n^C\nserver: context canceled\nserver: hello handler ended\n",
    "officialUrl": "https://gobyexample.com/context"
  },
  {
    "id": 82,
    "slug": "spawning-processes",
    "title": "Spawning Processes",
    "titleEs": "Creación de Procesos Hijos (os/exec)",
    "category": "Redes, Procesos y Sistema Operativo",
    "categorySlug": "redes-sistema",
    "categoryIcon": "globe",
    "difficulty": "Intermedio",
    "summary": "Ejecución de programas externos del sistema operativo, captura de salidas y tuberías con 'os/exec'.",
    "originalExpl": "A veces nuestros programas de Go necesitan generar otros procesos que no son de Go. Por ejemplo, la función exec de este ejemplo genera un proceso externo.",
    "basicExpl": {
      "title": "Conceptos Fundamentales para Principiantes",
      "content": "A veces tu programa en Go necesita pedirle ayuda a un programa que ya está instalado en el sistema operativo (como ejecutar `git status`, `ping google.com` o `ls`):\n- Se usa el paquete `os/exec`.\n- Crear el comando: `cmd := exec.Command(\"git\", \"version\")`.\n- Ejecutar y capturar todo lo que imprima: `salida, err := cmd.Output()` (devuelve un slice de bytes con el texto).\n- Si solo quieres que imprima directamente en la pantalla de la terminal: `cmd.Stdout = os.Stdout; cmd.Run()`.",
      "keyPoints": [
        "Se importa con `import \"os/exec\"`.",
        "`exec.Command(nombre, arg1, arg2...)`: configura el comando sin ejecutarlo aún.",
        "`cmd.Output()`: ejecuta y captura la salida estándar (stdout).",
        "`cmd.CombinedOutput()`: captura tanto stdout como stderr juntos.",
        "Los argumentos se pasan como parámetros separados, NUNCA unidos en una sola cadena con espacios."
      ]
    },
    "interExpl": {
      "title": "Mecanismos Internos y Buenas Prácticas",
      "content": "Prevención de Inyección de Comandos (Command Injection) y Timeouts con Context:\nEn otros lenguajes se suele usar `system(\"comando \" + entradaUsuario)`, lo que permite que un hacker inyecte `; rm -rf /`.\nEn Go, `exec.Command` NO invoca una shell de comandos (como bash o cmd.exe) por defecto: pasa los argumentos directamente como un arreglo al kernel del sistema operativo, neutralizando ataques de inyección de comandos.\n\nControl de ejecución con `exec.CommandContext`:\nPara evitar que un comando externo se quede colgado para siempre (por ejemplo, un `ping` infinito), se asocia siempre a un contexto con timeout:\n```go\nctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)\ndefer cancel()\ncmd := exec.CommandContext(ctx, \"ping\", \"127.0.0.1\")\n```\nSi expira el plazo, Go mata automáticamente al proceso hijo.",
      "keyPoints": [
        "Inmunidad a shell injection: no ejecuta un intérprete de comandos por defecto.",
        "`exec.CommandContext`: mata automáticamente al proceso hijo si el contexto se cancela o expira.",
        "Tuberías (Pipes) entre procesos: `cmd.StdinPipe()` y `cmd.StdoutPipe()` permiten comunicación bidireccional continua con el proceso hijo."
      ]
    },
    "expertExpl": {
      "title": "Bajo Nivel, Rendimiento e Internals",
      "content": "Mecánicas de Kernel: `fork/exec` vs `clone` y Process Groups en Unix:\nEn sistemas Unix, generar un proceso hijo tradicionalmente requería la syscall `fork()` (duplicar la tabla de páginas del proceso padre) seguida de `execve()`. En programas Go con gigabytes de memoria asignada, hacer un `fork` tradicional podía provocar errores de 'Out of Memory' falsos por sobrecompromiso de memoria (memory overcommit).\n\nEn Go moderno, el runtime utiliza `CLONE_VFORK | CLONE_VM` en Linux (o la syscall `posix_spawn`), evitando duplicar las tablas de páginas de memoria de la máquina virtual.\nPara asegurar que matar el proceso padre mate también a todos los subprocesos nietos generados por él, se configura `cmd.SysProcAttr = &syscall.SysProcAttr{Setpgid: true}` para crear un grupo de procesos independiente y enviar la señal `SIGKILL` a todo el grupo (`-pid`).",
      "keyPoints": [
        "Optimización vfork / posix_spawn: creación de procesos ultraligera sin duplicar el mapa de memoria de Go.",
        "Process Groups (Setpgid): mata árboles enteros de procesos hijos y nietos sin dejar procesos zombis huérfanos.",
        "Redirección de descriptores: los descriptores de archivo 0, 1 y 2 se conectan mediante tuberías anónimas del kernel."
      ]
    },
    "evaluation": {
      "title": "Reto: Ejecutor de Comandos de Red con Timeout Seguro",
      "statement": "Escribe una función 'EjecutarComandoSeguro(ctx context.Context, nombre string, args ...string) (string, error)' que ejecute un comando del sistema con límite de tiempo utilizando exec.CommandContext. Prueba la función ejecutando un comando rápido de tu sistema operativo (como 'go version' o 'hostname').",
      "starterCode": "package main\n\nimport (\n    \"context\"\n    \"fmt\"\n    \"os/exec\"\n    \"time\"\n)\n\nfunc EjecutarComandoSeguro(ctx context.Context, nombre string, args ...string) (string, error) {\n    // Implementa con exec.CommandContext y cmd.Output()\n}\n\nfunc main() {\n    // Ejecuta con un timeout de 2 segundos\n}",
      "hint": "Crea cmd := exec.CommandContext(ctx, nombre, args...) y llama a cmd.Output().",
      "solution": "package main\n\nimport (\n    \"context\"\n    \"fmt\"\n    \"os/exec\"\n    \"strings\"\n    \"time\"\n)\n\nfunc EjecutarComandoSeguro(ctx context.Context, nombre string, args ...string) (string, error) {\n    cmd := exec.CommandContext(ctx, nombre, args...)\n    salida, err := cmd.CombinedOutput()\n    if err != nil {\n        return \"\", fmt.Errorf(\"fallo al ejecutar '%s': %w (salida: %s)\", nombre, err, string(salida))\n    }\n    return strings.TrimSpace(string(salida)), nil\n}\n\nfunc main() {\n    ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)\n    defer cancel()\n    \n    resultado, err := EjecutarComandoSeguro(ctx, \"go\", \"version\")\n    if err != nil {\n        fmt.Println(\"Error:\", err)\n        return\n    }\n    \n    fmt.Println(\"Comando ejecutado con éxito:\")\n    fmt.Println(\"Salida:\", resultado)\n}",
      "explanation": "El uso de `exec.CommandContext` garantiza que si el comando externo tarda más del tiempo establecido por el contexto, el runtime de Go enviará una señal de terminación al proceso hijo, impidiendo procesos colgados que consuman memoria del servidor indefinidamente."
    },
    "externalLinks": [
      {
        "title": "Paquete os/exec (Biblioteca estándar de Go)",
        "url": "https://pkg.go.dev/os/exec",
        "description": "Documentación oficial del paquete os/exec."
      },
      {
        "title": "Go by Example Original: Spawning Processes",
        "url": "https://gobyexample.com/spawning-processes",
        "description": "Ejemplo en Go by Example."
      },
      {
        "title": "Brad Fitzpatrick: Cómo ejecuta Go los subprocesos en el sistema operativo",
        "url": "https://bradfitz.com/",
        "description": "Detalles históricos de la implementación de vfork y clone en el runtime de Go."
      }
    ],
    "code": "// En ocasiones nuestros programas en Go necesitan iniciar y controlar otros\n// procesos del sistema operativo.\n\npackage main\n\nimport (\n\t\"errors\"\n\t\"fmt\"\n\t\"io\"\n\t\"os/exec\"\n)\n\nfunc main() {\n\n\t// Comenzaremos con un comando simple que no toma\n\t// argumentos ni entrada y solo imprime información en\n\t// stdout. El asistente `exec.Command` crea un objeto\n\t// para representar este proceso externo.\n\tdateCmd := exec.Command(\"date\")\n\n\t// El método `Output` ejecuta el comando, espera a que\n\t// finalice y recopila su salida estándar.\n\t// Si no hubo errores, `dateOut` contendrá los bytes\n\t// con la información de la fecha.\n\tdateOut, err := dateCmd.Output()\n\tif err != nil {\n\t\tpanic(err)\n\t}\n\tfmt.Println(\"> date\")\n\tfmt.Println(string(dateOut))\n\n\t// `Output` y otros métodos de `Command` devolverán\n\t// `*exec.Error` si hubo un problema al ejecutar el\n\t// comando (por ejemplo, ruta incorrecta), y `*exec.ExitError`\n\t// si el comando se ejecutó pero finalizó con un código de retorno\n\t// distinto de cero.\n\t_, err = exec.Command(\"date\", \"-x\").Output()\n\tif err != nil {\n\t\tif e, ok := errors.AsType[*exec.Error](err); ok {\n\t\t\tfmt.Println(\"failed executing:\", e)\n\t\t} else if e, ok := errors.AsType[*exec.ExitError](err); ok {\n\t\t\texitCode := e.ExitCode()\n\t\t\tfmt.Println(\"command exit rc =\", exitCode)\n\t\t} else {\n\t\t\tpanic(err)\n\t\t}\n\t}\n\n\t// A continuación veremos un caso un poco más elaborado\n\t// donde canalizamos datos al proceso externo en su entrada\n\t// `stdin` y recopilamos los resultados de su salida `stdout`.\n\tgrepCmd := exec.Command(\"grep\", \"hello\")\n\n\t// Aquí capturamos explícitamente las tuberías de entrada/salida, iniciamos\n\t// el proceso, le escribimos datos de entrada, leemos la\n\t// salida resultante y finalmente esperamos a que el proceso\n\t// termine.\n\tgrepIn, _ := grepCmd.StdinPipe()\n\tgrepOut, _ := grepCmd.StdoutPipe()\n\tgrepCmd.Start()\n\tgrepIn.Write([]byte(\"hello grep\\ngoodbye grep\"))\n\tgrepIn.Close()\n\tgrepBytes, _ := io.ReadAll(grepOut)\n\tgrepCmd.Wait()\n\n\t// Omitimos comprobaciones exhaustivas de error en el ejemplo anterior, pero\n\t// puedes usar el patrón habitual `if err != nil` para\n\t// todas ellas. También solo recopilamos los resultados de `StdoutPipe`,\n\t// pero podrías recopilar los de `StderrPipe` de la misma manera.\n\tfmt.Println(\"> grep hello\")\n\tfmt.Println(string(grepBytes))\n\n\t// Ten en cuenta que al lanzar comandos debemos\n\t// proporcionar un array explícito del comando y sus\n\t// argumentos, en lugar de pasar una sola cadena continua. Si\n\t// deseas ejecutar un comando completo mediante una cadena, puedes usar\n\t// la opción `-c` de `bash`:\n\tlsCmd := exec.Command(\"bash\", \"-c\", \"ls -a -l -h\")\n\tlsOut, err := lsCmd.Output()\n\tif err != nil {\n\t\tpanic(err)\n\t}\n\tfmt.Println(\"> ls -a -l -h\")\n\tfmt.Println(string(lsOut))\n}\n",
    "output": "# Los programas generados devuelven una salida idéntica a\n# si los hubiésemos ejecutado directamente desde la línea de comandos.\n$ go run spawning-processes.go \n> date\nThu 05 May 2022 10:10:12 PM PDT\n\n# `date` no tiene una bandera `-x`, por lo que saldrá con\n# un mensaje de error y un código de retorno distinto de cero.\ncommand exit rc = 1\n> grep hello\nhello grep\n\n> ls -a -l -h\ndrwxr-xr-x  4 mark 136B Oct 3 16:29 .\ndrwxr-xr-x 91 mark 3.0K Oct 3 12:50 ..\n-rw-r--r--  1 mark 1.3K Oct 3 16:28 spawning-processes.go\n",
    "officialUrl": "https://gobyexample.com/spawning-processes"
  },
  {
    "id": 83,
    "slug": "execing-processes",
    "title": "Exec'ing Processes",
    "titleEs": "Reemplazo de Procesos (syscall.Exec)",
    "category": "Redes, Procesos y Sistema Operativo",
    "categorySlug": "redes-sistema",
    "categoryIcon": "globe",
    "difficulty": "Avanzado",
    "summary": "Reemplazo total del proceso de Go actual por otro ejecutable en el mismo espacio de proceso con syscall.Exec.",
    "originalExpl": "En el ejemplo anterior vimos cómo generar procesos externos. Hacemos esto cuando queremos un proceso externo accesible a un proceso Go en ejecución. A veces solo queremos reemplazar completamente el proceso Go actual por otro.",
    "basicExpl": {
      "title": "Conceptos Fundamentales para Principiantes",
      "content": "Hay una diferencia enorme entre 'lanzar un proceso hijo' y 'reemplazar tu proceso':\n- Lanzar proceso (`os/exec`): tu programa Go sigue vivo, abre una ventana secundaria con el otro programa y espera a que termine.\n- Reemplazar proceso (`syscall.Exec`): tu programa Go se 'suicida' deliberadamente y le cede toda su memoria, su identificador de proceso (PID) y sus recursos al nuevo programa.\nUna vez que llamas a `syscall.Exec`, tu código Go DESAPARECE por completo: ninguna línea posterior de tu programa volverá a ejecutarse.",
      "keyPoints": [
        "Se usa el paquete `syscall`: `syscall.Exec(rutaBinaria, args, entorno)`.",
        "Reemplazo total: el proceso de Go deja de existir y es reemplazado en el mismo PID.",
        "No hay retorno: si `syscall.Exec` tiene éxito, el código de Go posterior jamás se ejecuta.",
        "Si la llamada devuelve un error, significa que el binario no pudo ser cargado."
      ]
    },
    "interExpl": {
      "title": "Mecanismos Internos y Buenas Prácticas",
      "content": "Preparación de Argumentos y Localización de Binarios con `exec.LookPath`:\nLa llamada `syscall.Exec` es de muy bajo nivel y requiere:\n1. La ruta absoluta física del ejecutable (no busca automáticamente en el `PATH` del sistema). Para encontrarla se debe usar `exec.LookPath(\"ls\")`.\n2. El primer argumento del slice de argumentos (`args[0]`) debe ser por convención el propio nombre del comando.\n3. Las variables de entorno completas pasadas como un slice de strings (típicamente `os.Environ()`).\n\nCaso de uso clásico: Wrappers de inicio en contenedores Docker y administradores de procesos (init systems).",
      "keyPoints": [
        "Uso de `exec.LookPath`: localiza la ruta absoluta del binario en las carpetas del PATH del sistema.",
        "Convención `args[0]`: debe contener el nombre del comando a ejecutar.",
        "Hereda descriptores de archivos abiertos: los archivos abiertos que no tengan la bandera `O_CLOEXEC` se transmiten al nuevo proceso."
      ]
    },
    "expertExpl": {
      "title": "Bajo Nivel, Rendimiento e Internals",
      "content": "La Llamada al Sistema `execve` y el Destino del Runtime de Go:\nA nivel de arquitectura de sistemas operativos Unix, `syscall.Exec` invoca directamente la syscall `SYS_EXECVE` del kernel.\nEn ese microsegundo exacto:\n1. El kernel borra completamente el espacio de direcciones virtuales del proceso (la pila, el heap, el runtime de Go, el garbage collector y todas las goroutines activas se destruyen al instante).\n2. El kernel carga las secciones ELF del nuevo programa en ese mismo PID.\n3. Los hilos del procesador saltan al nuevo punto de entrada (`_start`).\n\nEn sistemas Windows: La API nativa de Windows (Win32) NO tiene un equivalente directo a la syscall POSIX `execve` (no existe reemplazo de proceso in-place en el kernel de Windows NT). En Windows, Go simula este comportamiento generando un proceso hijo con `CreateProcess` y saliendo inmediatamente con el código de retorno del hijo.",
      "keyPoints": [
        "Syscall `SYS_EXECVE`: destrucción atómica de la memoria del proceso padre y carga del nuevo binario.",
        "Preservación de PID: el proceso conserva su ID de proceso, haciéndolo transparente para sistemas de init como systemd o Docker.",
        "Divergencia Unix vs Windows: funcionamiento nativo perfecto en Linux/macOS; emulación en Windows."
      ]
    },
    "evaluation": {
      "title": "Reto: Preparación Segura de Reemplazo de Proceso con LookPath",
      "statement": "Escribe un programa que utilice exec.LookPath para localizar la ruta absoluta de un comando estándar ('ls' en Linux/Mac o 'cmd.exe' en Windows). Valida que exista y prepara los argumentos requeridos para syscall.Exec imprimiendo la ruta encontrada antes de la llamada.",
      "starterCode": "package main\n\nimport (\n    \"fmt\"\n    \"os/exec\"\n)\n\nfunc main() {\n    // Usa exec.LookPath para encontrar un binario del sistema\n}",
      "hint": "Usa binario, err := exec.LookPath(\"git\") o \"cmd.exe\".",
      "solution": "package main\n\nimport (\n    \"fmt\"\n    \"os\"\n    \"os/exec\"\n    \"runtime\"\n    \"syscall\"\n)\n\nfunc main() {\n    // Seleccionamos un comando según el sistema operativo\n    comando := \"ls\"\n    if runtime.GOOS == \"windows\" {\n        comando = \"cmd.exe\"\n    }\n    \n    rutaAbsoluta, err := exec.LookPath(comando)\n    if err != nil {\n        fmt.Printf(\"El comando '%s' no se encuentra en el PATH del sistema: %v\\n\", comando, err)\n        return\n    }\n    \n    fmt.Printf(\"Binario localizado con éxito en: %s\\n\", rutaAbsoluta)\n    fmt.Println(\"Preparando reemplazo de proceso con syscall.Exec...\")\n    \n    args := []string{comando}\n    entorno := os.Environ()\n    \n    // Si ejecutáramos la siguiente línea en Unix, el programa actual terminaría:\n    _ = syscall.Exec(rutaAbsoluta, args, entorno)\n    \n    // Esta línea solo se ejecutará si syscall.Exec falla o en entornos donde no aplique\n    fmt.Println(\"Proceso Go preparado para reemplazo de PID.\")\n}",
      "explanation": "La función 'exec.LookPath' busca en todas las carpetas listadas en la variable PATH del sistema operativo para encontrar la ubicación absoluta del ejecutable. Esta ruta es el primer parámetro indispensable exigido por la llamada de bajo nivel syscall.Exec."
    },
    "externalLinks": [
      {
        "title": "Paquete syscall: Exec",
        "url": "https://pkg.go.dev/syscall#Exec",
        "description": "Documentación oficial de la llamada syscall.Exec en la biblioteca estándar."
      },
      {
        "title": "Go by Example Original: Exec'ing Processes",
        "url": "https://gobyexample.com/execing-processes",
        "description": "Ejemplo en Go by Example."
      },
      {
        "title": "Manual de Linux: Llamada al sistema execve(2)",
        "url": "https://man7.org/linux/man-pages/man2/execve.2.html",
        "description": "La especificación del kernel de Unix de la llamada al sistema execve."
      }
    ],
    "code": "// En el ejemplo anterior revisamos cómo\n// [iniciar subprocesos externos](spawning-processes). Hacemos esto\n// cuando necesitamos un proceso externo accesible a un proceso Go\n// en ejecución. A veces simplemente deseamos reemplazar\n// por completo el proceso Go actual por otro (quizás no escrito en Go).\n// Para lograrlo utilizaremos la implementación en Go de la clásica\n// función <a href=\"https://en.wikipedia.org/wiki/Exec_(operating_system)\"><code>exec</code></a>.\n\npackage main\n\nimport (\n\t\"os\"\n\t\"os/exec\"\n\t\"syscall\"\n)\n\nfunc main() {\n\n\t// Para nuestro ejemplo ejecutaremos `ls`. Go requiere una\n\t// ruta absoluta al binario que deseamos ejecutar, por lo que\n\t// usaremos `exec.LookPath` para localizarlo (probablemente `/bin/ls`).\n\tbinary, lookErr := exec.LookPath(\"ls\")\n\tif lookErr != nil {\n\t\tpanic(lookErr)\n\t}\n\n\t// `Exec` requiere argumentos en forma de slice (a diferencia\n\t// de una única cadena grande). Le pasaremos a `ls` varios\n\t// argumentos comunes. Ten en cuenta que el primer argumento debe\n\t// ser el nombre del programa mismo.\n\targs := []string{\"ls\", \"-a\", \"-l\", \"-h\"}\n\n\t// `Exec` también necesita un conjunto de [variables de entorno](environment-variables)\n\t// a utilizar. Aquí simplemente proporcionamos nuestro\n\t// entorno actual.\n\tenv := os.Environ()\n\n\t// Aquí se realiza la llamada real a `syscall.Exec`. Si esta llamada tiene\n\t// éxito, la ejecución de nuestro proceso terminará aquí\n\t// y será reemplazada por el proceso `/bin/ls -a -l -h`.\n\t// Si ocurre un error recibiremos un valor de retorno.\n\texecErr := syscall.Exec(binary, args, env)\n\tif execErr != nil {\n\t\tpanic(execErr)\n\t}\n}\n",
    "output": "# Al ejecutar nuestro programa, este es reemplazado por `ls`.\n$ go run execing-processes.go\ntotal 16\ndrwxr-xr-x  4 mark 136B Oct 3 16:29 .\ndrwxr-xr-x 91 mark 3.0K Oct 3 12:50 ..\n-rw-r--r--  1 mark 1.3K Oct 3 16:28 execing-processes.go\n\n# Ten en cuenta que Go no ofrece una función `fork` clásica de Unix.\n# Por lo general esto no representa ningún problema, ya que iniciar\n# goroutines, lanzar procesos y reemplazar procesos con exec cubren\n# la gran mayoría de casos de uso de `fork`.\n",
    "officialUrl": "https://gobyexample.com/execing-processes"
  },
  {
    "id": 84,
    "slug": "signals",
    "title": "Signals",
    "titleEs": "Manejo de Señales del Sistema Operativo (os/signal)",
    "category": "Redes, Procesos y Sistema Operativo",
    "categorySlug": "redes-sistema",
    "categoryIcon": "globe",
    "difficulty": "Intermedio",
    "summary": "Captura y gestión de señales de terminación del sistema operativo (SIGINT, SIGTERM) para apagado controlado y elegante (Graceful Shutdown).",
    "originalExpl": "A veces queremos que nuestros programas de Go manejen de manera inteligente las señales de Unix. Por ejemplo, podríamos querer que un servidor se apague correctamente cuando recibe un SIGINT (Ctrl+C).",
    "basicExpl": {
      "title": "Conceptos Fundamentales para Principiantes",
      "content": "Cuando estás en la terminal y presionas `Ctrl + C`, tu sistema operativo le envía un 'mensaje de socorro' a tu programa llamado `SIGINT` (Interrupción):\n- Si no haces nada, tu programa muere de golpe en ese microsegundo, pudiendo dejar archivos a medio escribir o conexiones de base de datos rotas.\n- Con `os/signal`, puedes interceptar esa señal amablemente:\n  1. Creas un canal para recibir señales: `sigs := make(chan os.Signal, 1)`.\n  2. Le dices a Go qué señales vigilar: `signal.Notify(sigs, syscall.SIGINT, syscall.SIGTERM)`.\n  3. Esperas en segundo plano a que llegue: `<-sigs`.\n  4. Cuando llega, cierras ordenadamente tus bases de datos y sales con tranquilidad.",
      "keyPoints": [
        "Se importa con `import \"os/signal\"` y `import \"syscall\"`.",
        "`SIGINT`: señal emitida por el teclado al pulsar `Ctrl + C`.",
        "`SIGTERM`: señal de terminación estándar enviada por Docker y Kubernetes al detener un contenedor.",
        "`signal.Notify(canal, señales...)`: enruta las señales del sistema hacia tu canal Go.",
        "El canal de señales DEBE tener siempre un búfer de al menos 1: `make(chan os.Signal, 1)`."
      ]
    },
    "interExpl": {
      "title": "Mecanismos Internos y Buenas Prácticas",
      "content": "Patrón Moderno con `signal.NotifyContext` (Go 1.16+):\nEn Go moderno ya no es necesario crear canales manuales con bucles complejos. Go 1.16 introdujo `signal.NotifyContext`:\n```go\nctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)\ndefer stop()\n\n// Esperar hasta que el usuario pulse Ctrl+C o Kubernetes envíe SIGTERM\n<-ctx.Done()\n\nfmt.Println(\"Señal de apagado recibida. Limpiando recursos...\")\nejecutarLimpieza(5 * time.Second)\n```\nEl contexto devuelto se cancela automáticamente al recibir la señal del sistema operativo, permitiendo propagar el apagado a todos los servidores HTTP y clientes de base de datos en cascada a través de `context.Context`.",
      "keyPoints": [
        "`signal.NotifyContext`: asocia señales del SO directamente a un `context.Context` (estándar moderno).",
        "Apagado en dos fases: permitir un primer `Ctrl+C` para apagado gracioso, y forzar la salida inmediata si el usuario presiona `Ctrl+C` por segunda vez.",
        "Señales no interceptables: `SIGKILL` (kill -9) y `SIGSTOP` son procesadas directamente por el kernel del SO y NUNCA pueden ser capturadas por ningún lenguaje."
      ]
    },
    "expertExpl": {
      "title": "Bajo Nivel, Rendimiento e Internals",
      "content": "Manejo de Señales a Nivel de Hilo OS en el Runtime de Go (`sigtramp`):\nEn sistemas Unix tradicionales, las señales de sistema operativo interrumpen arbitrariamente cualquier hilo del proceso. En Go, el runtime intercepta todas las señales a bajo nivel mediante una rutina especial en ensamblador llamada `runtime.sigtramp`:\n- Señales de fallo de hardware (como `SIGSEGV` por desreferenciar puntero nulo o `SIGFPE` por división entre cero) son interceptadas por el runtime y convertidas internamente en un `panic` de Go.\n- Señales de preempción (`SIGURG`): utilizadas internamente por el planificador para pausar goroutines CPU-bound.\n- Señales registradas con `signal.Notify`: se encolan en una lista libre de bloqueos en espacio de usuario y se envían al canal Go sin interrumpir la coherencia de la memoria ni el estado de los hilos `M`.",
      "keyPoints": [
        "Rutina sigtramp: mediador de señales de bajo nivel en el runtime de Go.",
        "Conversión SIGSEGV a Panic: permite que desreferenciar nil se pueda interceptar con recover().",
        "Buffer de canal obligatorio: si el canal no tiene búfer y no hay nadie leyendo activamente en ese microsegundo exacto, la señal se descarta silenciosamente para no congelar el manejador del kernel."
      ]
    },
    "evaluation": {
      "title": "Reto: Servidor con Apagado Gracioso (Graceful Shutdown) ante SIGINT",
      "statement": "Implementa un programa que simule un servicio en ejecución. Utiliza signal.NotifyContext para escuchar la interrupción del usuario (Ctrl+C / os.Interrupt). Al recibirla, debe imprimir un mensaje de inicio de limpieza, simular la persistencia de datos durante 500ms y finalizar con un mensaje de éxito.",
      "starterCode": "package main\n\nimport (\n    \"context\"\n    \"fmt\"\n    \"os\"\n    \"os/signal\"\n    \"time\"\n)\n\nfunc main() {\n    // Configura signal.NotifyContext y espera la señal\n}",
      "hint": "Crea ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt); defer stop(). Haz <-ctx.Done().",
      "solution": "package main\n\nimport (\n    \"context\"\n    \"fmt\"\n    \"os\"\n    \"os/signal\"\n    \"time\"\n)\n\nfunc main() {\n    // Creamos un contexto que se cancela al recibir la interrupción del teclado\n    ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt)\n    defer stop()\n    \n    fmt.Println(\"Servicio iniciado y en ejecución (Presiona Ctrl+C para detenerlo)...\")\n    \n    // Espera bloqueante hasta recibir la señal del SO\n    <-ctx.Done()\n    \n    // Restauramos el comportamiento predeterminado por si el usuario pulsa Ctrl+C otra vez\n    stop()\n    fmt.Println(\"\\n[Señal recibida]: Iniciando proceso de Graceful Shutdown...\")\n    \n    // Simulación de cierre ordenado de recursos\n    fmt.Println(\"-> Guardando estado en disco...\")\n    time.Sleep(300 * time.Millisecond)\n    fmt.Println(\"-> Cerrando conexiones de base de datos activas...\")\n    time.Sleep(200 * time.Millisecond)\n    \n    fmt.Println(\"¡Servicio cerrado limpiamente sin pérdida de datos!\")\n}",
      "explanation": "El uso de `signal.NotifyContext` integra las señales del sistema operativo con el ciclo de vida de `context.Context`. Al pulsar Ctrl+C, `<-ctx.Done()` se desbloquea de inmediato, permitiendo ejecutar las tareas de limpieza antes de finalizar el proceso."
    },
    "externalLinks": [
      {
        "title": "Paquete os/signal (Biblioteca estándar de Go)",
        "url": "https://pkg.go.dev/os/signal",
        "description": "Documentación oficial del paquete os/signal."
      },
      {
        "title": "Go by Example Original: Signals",
        "url": "https://gobyexample.com/signals",
        "description": "Ejemplo en Go by Example."
      },
      {
        "title": "Kubernetes: Terminación ordenada de pods y señales del sistema operativo",
        "url": "https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#pod-termination",
        "description": "Cómo interactúan SIGTERM y Graceful Shutdown en entornos de contenedores."
      }
    ],
    "code": "// En ocasiones deseamos que nuestros programas en Go manejen\n// inteligentemente [señales de Unix](https://en.wikipedia.org/wiki/Unix_signal).\n// Por ejemplo, podríamos querer que un servidor cierre de forma ordenada (graceful shutdown)\n// al recibir una señal `SIGTERM`, o que una herramienta de consola\n// detenga el procesamiento si recibe `SIGINT`.\n// Aquí tenemos una forma moderna de manejar señales utilizando contextos.\n\npackage main\n\nimport (\n\t\"context\"\n\t\"fmt\"\n\t\"os/signal\"\n\t\"syscall\"\n)\n\nfunc main() {\n\t// `signal.NotifyContext` devuelve un contexto que se cancela\n\t// cuando llega alguna de las señales listadas.\n\tctx, stop := signal.NotifyContext(\n\t\tcontext.Background(), syscall.SIGINT, syscall.SIGTERM)\n\tdefer stop()\n\n\t// El programa esperará aquí hasta que se reciba\n\t// una de las señales configuradas.\n\tfmt.Println(\"awaiting signal\")\n\t<-ctx.Done()\n\n\t// `context.Cause` informa la razón por la cual se canceló el contexto.\n\t// Para una cancelación activada por señal, esto incluye\n\t// el valor de la señal.\n\tfmt.Println()\n\tfmt.Println(context.Cause(ctx))\n\tfmt.Println(\"exiting\")\n}\n",
    "output": "# Al ejecutar este programa se bloqueará esperando una\n# señal. Al teclear `ctrl-C` (que la terminal\n# muestra como `^C`) enviamos una señal `SIGINT`,\n# lo que provoca que el programa imprima la causa de cancelación y luego finalice.\n$ go run signals.go\nawaiting signal\n^C\ninterrupt signal received\nexiting\n",
    "officialUrl": "https://gobyexample.com/signals"
  },
  {
    "id": 85,
    "slug": "exit",
    "title": "Exit",
    "titleEs": "Salida del Programa y Códigos de Retorno (os.Exit)",
    "category": "Redes, Procesos y Sistema Operativo",
    "categorySlug": "redes-sistema",
    "categoryIcon": "globe",
    "difficulty": "Principiante",
    "summary": "Terminación inmediata del proceso con código de estado del sistema operativo mediante os.Exit y su impacto en defers.",
    "originalExpl": "Usa os.Exit para salir inmediatamente con un estado dado. A diferencia de C, donde main devuelve un entero, en Go se debe invocar os.Exit explícitamente para devolver un código distinto de cero.",
    "basicExpl": {
      "title": "Conceptos Fundamentales para Principiantes",
      "content": "Cuando un programa de computadora termina, le devuelve un número al sistema operativo llamado 'Código de Salida' (Exit Code):\n- Código 0: significa 'Todo salió perfecto, éxito absoluto'.\n- Código distinto de 0 (ej. 1, 2, 127): significa 'Ocurrió un error'.\nEn Go, si tu función `main()` llega al final normal, Go devuelve 0 automáticamente.\nSi quieres forzar el cierre inmediato del programa devolviendo un código específico de error, usas `os.Exit(codigo)`.\n¡ALERTA MÁXIMA!: `os.Exit()` apaga el programa de golpe en ese microsegundo. Las funciones programadas con `defer` NO SE EJECUTAN.",
      "keyPoints": [
        "Se importa con `import \"os\"`.",
        "`os.Exit(0)`: salida con código de éxito.",
        "`os.Exit(1)` (o cualquier entero 1-125): salida con código de error.",
        "¡Cuidado!: `os.Exit` NO ejecuta las llamadas diferidas con `defer`.",
        "No hay retorno de entero en `func main()`: a diferencia de C/C++, main no retorna un int."
      ]
    },
    "interExpl": {
      "title": "Mecanismos Internos y Buenas Prácticas",
      "content": "El Patrón de Salida Limpia (Exit-in-Main Pattern):\nDado que `os.Exit` aborta la ejecución sin ejecutar ningún `defer` pendiente (lo que puede dejar archivos temporales sin borrar o bases de datos sin cerrar), NUNCA debes llamar a `os.Exit` disperso dentro de funciones secundarias de tu código.\nLa buena práctica de arquitectura en Go es delegar toda la lógica a una función `run()` y llamar a `os.Exit` únicamente en la última línea de `main()`:\n```go\nfunc main() {\n    if err := run(); err != nil {\n        fmt.Fprintln(os.Stderr, \"Error:\", err)\n        os.Exit(1) // Único punto de salida con os.Exit\n    }\n}\n\nfunc run() error {\n    f, _ := os.Create(\"temp.txt\")\n    defer f.Close() // ¡Este defer SÍ se ejecutará garantizado!\n    return procesar()\n}\n```",
      "keyPoints": [
        "Patrón `func run() error`: garantiza que todos los `defer` se ejecuten antes de invocar `os.Exit` en main.",
        "Códigos de salida estándar: 0 = Éxito, 1 = Error general, 2 = Mal uso de comandos CLI.",
        "Pruebas unitarias: `testing.M.Run()` devuelve el código de salida entero para que `TestMain` lo pase a `os.Exit`."
      ]
    },
    "expertExpl": {
      "title": "Bajo Nivel, Rendimiento e Internals",
      "content": "La Llamada al Sistema `exit_group` y Códigos de 8 Bits en el Kernel:\nA nivel de kernel de Linux, `os.Exit` invoca la llamada al sistema `exit_group(status)` (o `ExitProcess` en Windows).\nEsta syscall no desenrolla pilas, no ejecuta finalizadores del Garbage Collector ni limpia memoria en espacio de usuario: le ordena al kernel del sistema operativo que cierre todos los descriptores de archivo del proceso, libere sus páginas de memoria física y envíe una señal `SIGCHLD` al proceso padre notificando el código de retorno.\n\nRestricción de Rango de 8 Bits en Unix:\nAunque `os.Exit(code)` acepta un parámetro de tipo `int`, los sistemas operativos Unix (POSIX) solo preservan los 8 bits de menor peso del código de salida (rango de 0 a 255). Si invocas `os.Exit(256)`, el sistema operativo interpretará un código de salida `0` (indicando falso éxito); si invocas `os.Exit(-1)`, el kernel lo interpretará como `255`.",
      "keyPoints": [
        "Máscara de 8 bits en Unix: el código de salida efectivo en el SO es `code & 0xFF` (rango 0 a 255).",
        "Syscall `exit_group`: mata instantáneamente a todos los hilos `M` del proceso.",
        "Preservación de estado en scripts CI/CD: sistemas como GitHub Actions o Docker verifican este código para determinar si una etapa del pipeline falló o fue aprobada."
      ]
    },
    "evaluation": {
      "title": "Reto: Arquitectura de Salida Limpia con Preservación de Defers",
      "statement": "Escribe un programa que implemente el patrón idiomático 'func run() error'. En la función run, abre un recurso simulado con defer, detecta una condición de error controlada y devuélvela a main. En main, muestra el error y finaliza con os.Exit(1), demostrando que el defer se ejecutó correctamente.",
      "starterCode": "package main\n\nimport (\n    \"errors\"\n    \"fmt\"\n    \"os\"\n)\n\nfunc run() error {\n    // Pon un defer fmt.Println(\"Limpiando recurso\")\n    // Retorna un error simulado\n}\n\nfunc main() {\n    // Llama a run() y si hay error haz os.Exit(1)\n}",
      "hint": "Define func run() error, pon defer fmt.Println(\"Recurso cerrado\") y return errors.New(\"error de validación\").",
      "solution": "package main\n\nimport (\n    \"errors\"\n    \"fmt\"\n    \"os\"\n)\n\nfunc run() error {\n    fmt.Println(\"[1] Iniciando operación y asignando recursos...\")\n    \n    // Este defer se ejecutará garantizado porque la función run() retorna normalmente\n    defer fmt.Println(\"[2] DEFER EJECUTADO: Recurso liberado y cerrado limpiamente.\")\n    \n    // Simulamos un fallo de negocio\n    fmt.Println(\"[3] Ocurrió un fallo en el proceso.\")\n    return errors.New(\"fallo en la validación de datos del cliente\")\n}\n\nfunc main() {\n    if err := run(); err != nil {\n        fmt.Fprintf(os.Stderr, \"[4] Error en main: %v\\n\", err)\n        fmt.Println(\"[5] Finalizando proceso con código de salida 1 (Error)\")\n        // Aquí os.Exit es seguro porque los defers de run ya terminaron\n        os.Exit(1)\n    }\n    \n    fmt.Println(\"Finalización exitosa con código 0.\")\n}",
      "explanation": "Si hubiéramos llamado a `os.Exit(1)` directamente dentro de la función donde estaba el defer, Go habría abortado el programa sin ejecutar la limpieza. Al utilizar el patrón de función auxiliar `run() error`, todos los defers se completan al retornar de run antes de que `main()` ejecute `os.Exit(1)`."
    },
    "externalLinks": [
      {
        "title": "Paquete os: Exit function",
        "url": "https://pkg.go.dev/os#Exit",
        "description": "Documentación oficial de la función os.Exit en la biblioteca estándar."
      },
      {
        "title": "Go by Example Original: Exit",
        "url": "https://gobyexample.com/exit",
        "description": "Ejemplo en Go by Example."
      },
      {
        "title": "Dave Cheney: Cómo finalizar un programa en Go de forma limpia",
        "url": "https://dave.cheney.net/",
        "description": "Guía de Dave Cheney sobre el patrón func run() error y gestión de códigos de salida."
      }
    ],
    "code": "// Usa `os.Exit` para salir inmediatamente con un código de\n// estado determinado.\n\npackage main\n\nimport (\n\t\"fmt\"\n\t\"os\"\n)\n\nfunc main() {\n\n\t// Las funciones pospuestas con `defer` _no_ se ejecutarán al usar `os.Exit`,\n\t// por lo que este `fmt.Println` jamás será invocado.\n\tdefer fmt.Println(\"!\")\n\n\t// Salir con estado 3.\n\tos.Exit(3)\n}\n\n// Ten en cuenta que, a diferencia de lenguajes como C, Go no utiliza un\n// valor de retorno entero desde `main` para indicar el estado de salida. Si\n// deseas salir con un estado distinto de cero debes\n// emplear `os.Exit`.\n",
    "output": "# Si ejecutas `exit.go` usando `go run`, la salida\n# será interceptada por `go` e impresa en pantalla.\n$ go run exit.go\nexit status 3\n\n# Compilando y ejecutando el binario directamente puedes observar\n# el código de estado devuelto en la terminal.\n$ go build exit.go\n$ ./exit\n$ echo $?\n3\n\n# Observa que el `!` de nuestro programa nunca llegó a imprimirse.\n",
    "officialUrl": "https://gobyexample.com/exit"
  }
];

if (typeof window !== 'undefined') {
  window.GO_CATEGORIES = GO_CATEGORIES;
  window.GO_TOPICS = GO_TOPICS;
}
if (typeof module !== 'undefined') {
  module.exports = { GO_CATEGORIES, GO_TOPICS };
}
