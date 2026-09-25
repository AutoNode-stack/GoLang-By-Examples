# scripts/data_part1.py
# Temas 1 a 21 (Fundamentos, Estructuras de Datos, Funciones y Memoria, POO Básica)

TOPICS_PART1 = {
    "hello-world": {
        "id": 1,
        "slug": "hello-world",
        "title": "Hello World",
        "titleEs": "Hola Mundo",
        "category": "Fundamentos del Lenguaje",
        "categorySlug": "fundamentos",
        "categoryIcon": "⚡",
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
            {"title": "Documentación Oficial: Tutorial Get Started", "url": "https://go.dev/doc/tutorial/getting-started", "description": "Guía introductoria paso a paso en el sitio oficial de Go."},
            {"title": "The Go Playground", "url": "https://go.dev/play/", "description": "Entorno oficial en la nube para probar código Go sin instalar nada."},
            {"title": "Especificación del Lenguaje: Program Execution", "url": "https://go.dev/ref/spec#Program_execution", "description": "Detalles formales de cómo se inicializa e inicia un programa en Go."}
        ]
    },

    "values": {
        "id": 2,
        "slug": "values",
        "title": "Values",
        "titleEs": "Valores y Tipos Primitivos",
        "category": "Fundamentos del Lenguaje",
        "categorySlug": "fundamentos",
        "categoryIcon": "⚡",
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
            {"title": "Go Tour: Basic types", "url": "https://go.dev/tour/basics/11", "description": "Recorrido interactivo por los tipos primitivos en Go."},
            {"title": "Effective Go: Constants and Types", "url": "https://go.dev/doc/effective_go#constants", "description": "Guía idiomática sobre constantes y tipos de valores."},
            {"title": "Go Spec: Basic types", "url": "https://go.dev/ref/spec#Numeric_types", "description": "Especificación oficial de todos los tipos numéricos y primitivos."}
        ]
    },

    "variables": {
        "id": 3,
        "slug": "variables",
        "title": "Variables",
        "titleEs": "Variables e Inferencia de Tipos",
        "category": "Fundamentos del Lenguaje",
        "categorySlug": "fundamentos",
        "categoryIcon": "⚡",
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
            {"title": "Go Tour: Variables", "url": "https://go.dev/tour/basics/8", "description": "Declaración e inicialización en el tour interactivo de Go."},
            {"title": "Effective Go: Variable declarations", "url": "https://go.dev/doc/effective_go#variables", "description": "Estilo y convenciones al declarar variables en Go."},
            {"title": "Go Spec: Variable Declarations", "url": "https://go.dev/ref/spec#Variable_declarations", "description": "Especificación del lenguaje sobre variables y zero-values."}
        ]
    },

    "constants": {
        "id": 4,
        "slug": "constants",
        "title": "Constants",
        "titleEs": "Constantes e Iota",
        "category": "Fundamentos del Lenguaje",
        "categorySlug": "fundamentos",
        "categoryIcon": "⚡",
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
            {"title": "The Go Blog: Constants", "url": "https://go.dev/blog/constants", "description": "Artículo definitivo del equipo de Go sobre constantes no tipadas y precisión."},
            {"title": "Go Tour: Constants", "url": "https://go.dev/tour/basics/15", "description": "Ejercicios interactivos con constantes numéricas y de caracteres."},
            {"title": "Go Spec: Iota", "url": "https://go.dev/ref/spec#Iota", "description": "Especificación técnica del funcionamiento de iota."}
        ]
    },

    "for": {
        "id": 5,
        "slug": "for",
        "title": "For",
        "titleEs": "El Bucle For (Única Estructura de Repetición)",
        "category": "Fundamentos del Lenguaje",
        "categorySlug": "fundamentos",
        "categoryIcon": "⚡",
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
            {"title": "Go Tour: For loops", "url": "https://go.dev/tour/flowcontrol/1", "description": "Práctica con las diferentes formas del bucle for."},
            {"title": "The Go Blog: Loopvar Scoping in Go 1.22", "url": "https://go.dev/blog/loopvar-preview", "description": "Explicación oficial del cambio de alcance de variables en bucles."},
            {"title": "Effective Go: For statement", "url": "https://go.dev/doc/effective_go#for", "description": "Uso idiomático del bucle for en proyectos reales de Go."}
        ]
    },

    "if-else": {
        "id": 6,
        "slug": "if-else",
        "title": "If/Else",
        "titleEs": "Condicionales If / Else",
        "category": "Fundamentos del Lenguaje",
        "categorySlug": "fundamentos",
        "categoryIcon": "⚡",
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
            {"title": "Go Tour: If statements", "url": "https://go.dev/tour/flowcontrol/5", "description": "Ejercicios con condicionales if y sentencias cortas de inicialización."},
            {"title": "Effective Go: If control structure", "url": "https://go.dev/doc/effective_go#if", "description": "El estilo canónico de Go para evitar bloques else profundos."},
            {"title": "Go Spec: If statements", "url": "https://go.dev/ref/spec#If_statements", "description": "Especificación formal del comportamiento sintáctico de if."}
        ]
    },

    "switch": {
        "id": 7,
        "slug": "switch",
        "title": "Switch",
        "titleEs": "Sentencias Switch",
        "category": "Fundamentos del Lenguaje",
        "categorySlug": "fundamentos",
        "categoryIcon": "⚡",
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
            {"title": "Go Tour: Switch", "url": "https://go.dev/tour/flowcontrol/9", "description": "Ejercicios con switch en el tour interactivo."},
            {"title": "Effective Go: Switch", "url": "https://go.dev/doc/effective_go#switch", "description": "Guía idiomática sobre switch sin condición y switch de tipos."},
            {"title": "Go Spec: Switch statements", "url": "https://go.dev/ref/spec#Switch_statements", "description": "Reglas de expresión y sintaxis oficial de switch."}
        ]
    },

    "arrays": {
        "id": 8,
        "slug": "arrays",
        "title": "Arrays",
        "titleEs": "Arreglos (Arrays de Tamaño Fijo)",
        "category": "Estructuras de Datos y Colecciones",
        "categorySlug": "estructuras-datos",
        "categoryIcon": "📦",
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
            {"title": "Go Tour: Arrays", "url": "https://go.dev/tour/moretypes/6", "description": "Concepto y sintaxis de arrays en el tour oficial."},
            {"title": "The Go Blog: Slices and Arrays", "url": "https://go.dev/blog/slices-intro", "description": "Artículo de referencia sobre las diferencias entre arrays y slices."},
            {"title": "Go Spec: Array types", "url": "https://go.dev/ref/spec#Array_types", "description": "Especificación del estándar para tipos de arreglo."}
        ]
    },

    "slices": {
        "id": 9,
        "slug": "slices",
        "title": "Slices",
        "titleEs": "Slices Dinámicos",
        "category": "Estructuras de Datos y Colecciones",
        "categorySlug": "estructuras-datos",
        "categoryIcon": "📦",
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
            {"title": "Go Blog: Go Slices: usage and internals", "url": "https://go.dev/blog/slices-intro", "description": "Artículo canónico sobre la anatomía de los slices en Go."},
            {"title": "Package slices (Standard Library)", "url": "https://pkg.go.dev/slices", "description": "Documentación oficial de las utilidades genéricas del paquete slices."},
            {"title": "Go Spec: Slice expressions", "url": "https://go.dev/ref/spec#Slice_expressions", "description": "Sintaxis de rebanado simple y de 3 índices en la especificación."}
        ]
    },

    "maps": {
        "id": 10,
        "slug": "maps",
        "title": "Maps",
        "titleEs": "Mapas (Tablas Hash Asociativas)",
        "category": "Estructuras de Datos y Colecciones",
        "categorySlug": "estructuras-datos",
        "categoryIcon": "📦",
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
            {"title": "Go Blog: Go maps in action", "url": "https://go.dev/blog/maps", "description": "Artículo oficial explicando el funcionamiento de los mapas en Go."},
            {"title": "Package maps (Standard Library)", "url": "https://pkg.go.dev/maps", "description": "Documentación oficial del paquete maps en la biblioteca estándar."},
            {"title": "Go Spec: Map types", "url": "https://go.dev/ref/spec#Map_types", "description": "Especificación de los requisitos de tipos comparables para claves."}
        ]
    },

    "functions": {
        "id": 11,
        "slug": "functions",
        "title": "Functions",
        "titleEs": "Funciones y Firmas",
        "category": "Funciones, Clausuras y Punteros",
        "categorySlug": "funciones-memoria",
        "categoryIcon": "🔧",
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
            {"title": "Go Tour: Functions", "url": "https://go.dev/tour/basics/4", "description": "Conceptos y ejercicios básicos de funciones."},
            {"title": "Effective Go: Functions", "url": "https://go.dev/doc/effective_go#functions", "description": "Guía idiomática sobre retornos con nombre y claridad de código."},
            {"title": "Go Spec: Function declarations", "url": "https://go.dev/ref/spec#Function_declarations", "description": "Especificación de sintaxis y signaturas de funciones."}
        ]
    },

    "multiple-return-values": {
        "id": 12,
        "slug": "multiple-return-values",
        "title": "Multiple Return Values",
        "titleEs": "Retornos Múltiples de Funciones",
        "category": "Funciones, Clausuras y Punteros",
        "categorySlug": "funciones-memoria",
        "categoryIcon": "🔧",
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
            {"title": "Go Tour: Multiple results", "url": "https://go.dev/tour/basics/6", "description": "Práctica con retorno múltiple de valores."},
            {"title": "Effective Go: Multiple return values", "url": "https://go.dev/doc/effective_go#multiple-returns", "description": "Cómo los retornos múltiples eliminan la necesidad de pasar punteros de salida."},
            {"title": "Go Spec: Return statements", "url": "https://go.dev/ref/spec#Return_statements", "description": "Reglas de retorno en la especificación formal del lenguaje."}
        ]
    },

    "variadic-functions": {
        "id": 13,
        "slug": "variadic-functions",
        "title": "Variadic Functions",
        "titleEs": "Funciones Variádicas (...)",
        "category": "Funciones, Clausuras y Punteros",
        "categorySlug": "funciones-memoria",
        "categoryIcon": "🔧",
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
            {"title": "Go Tour: Passing slices to variadic functions", "url": "https://go.dev/tour/moretypes/15", "description": "Uso de slices con funciones variádicas."},
            {"title": "Go Spec: Passing arguments to ... parameters", "url": "https://go.dev/ref/spec#Passing_arguments_to_..._parameters", "description": "Reglas del compilador para el paso de parámetros variádicos."},
            {"title": "Rob Pike: Self-referential functions and the design of options", "url": "https://commandcenter.blogspot.com/2014/01/self-referential-functions-and-design.html", "description": "Artículo de Rob Pike donde introduce el patrón Functional Options."}
        ]
    },

    "closures": {
        "id": 14,
        "slug": "closures",
        "title": "Closures",
        "titleEs": "Clausuras (Closures) y Funciones Anónimas",
        "category": "Funciones, Clausuras y Punteros",
        "categorySlug": "funciones-memoria",
        "categoryIcon": "🔧",
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
            {"title": "Go Tour: Function closures", "url": "https://go.dev/tour/moretypes/25", "description": "Ejercicios interactivos con clausuras y acumuladores."},
            {"title": "Go Spec: Function literals", "url": "https://go.dev/ref/spec#Function_literals", "description": "Sintaxis de literales de función y clausuras en la especificación."},
            {"title": "Effective Go: Functions as values", "url": "https://go.dev/doc/effective_go#functions", "description": "Buenas prácticas con funciones como valores de primera clase."}
        ]
    },

    "recursion": {
        "id": 15,
        "slug": "recursion",
        "title": "Recursion",
        "titleEs": "Recursión y Límites de Pila",
        "category": "Funciones, Clausuras y Punteros",
        "categorySlug": "funciones-memoria",
        "categoryIcon": "🔧",
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
            {"title": "Go Tour: Exercise Fibonacci closure", "url": "https://go.dev/tour/moretypes/26", "description": "Ejercicio práctico de Fibonacci en el tour oficial."},
            {"title": "Dave Cheney: Why does Go not have tail call optimization?", "url": "https://dave.cheney.net/", "description": "Análisis técnico de por qué Go no incluye TCO para preservar los stack traces."},
            {"title": "Go Runtime: Contiguous Stacks Design", "url": "https://go.dev/doc/go1.3#stacks", "description": "Notas históricas de la arquitectura de stacks contiguos en el runtime de Go."}
        ]
    },

    "range-over-built-in-types": {
        "id": 16,
        "slug": "range-over-built-in-types",
        "title": "Range over Built-in Types",
        "titleEs": "Iteración con Range en Tipos Nativos",
        "category": "Estructuras de Datos y Colecciones",
        "categorySlug": "estructuras-datos",
        "categoryIcon": "📦",
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
            {"title": "Go Tour: Range", "url": "https://go.dev/tour/moretypes/16", "description": "Ejercicios con el iterador range en slices y mapas."},
            {"title": "Effective Go: The range clause", "url": "https://go.dev/doc/effective_go#for", "description": "Guía idiomática sobre cómo usar range de forma limpia y eficiente."},
            {"title": "Go Spec: Range clauses", "url": "https://go.dev/ref/spec#For_statements", "description": "Especificación de todas las variantes sintácticas de range."}
        ]
    },

    "pointers": {
        "id": 17,
        "slug": "pointers",
        "title": "Pointers",
        "titleEs": "Punteros y Direccionamiento de Memoria",
        "category": "Funciones, Clausuras y Punteros",
        "categorySlug": "funciones-memoria",
        "categoryIcon": "🔧",
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
            {"title": "Go Tour: Pointers", "url": "https://go.dev/tour/moretypes/1", "description": "Introducción y ejercicios con punteros en el tour interactivo."},
            {"title": "Effective Go: Pointers vs. Values", "url": "https://go.dev/doc/effective_go#pointers_vs_values", "description": "Criterios para decidir entre punteros y valores en métodos y funciones."},
            {"title": "Bill Kennedy: Language Mechanics On Stacks And Pointers", "url": "https://www.ardanlabs.com/blog/2017/05/language-mechanics-on-stacks-and-pointers.html", "description": "Guía en profundidad sobre punteros y gestión de memoria en Go."}
        ]
    },

    "strings-and-runes": {
        "id": 18,
        "slug": "strings-and-runes",
        "title": "Strings and Runes",
        "titleEs": "Cadenas y Runas (UTF-8 Nativo)",
        "category": "Funciones, Clausuras y Punteros",
        "categorySlug": "funciones-memoria",
        "categoryIcon": "🔧",
        "difficulty": "Intermedio",
        "summary": "Manejo nativo de texto UTF-8: strings como secuencias inmutables de bytes y runas (rune) como puntos de código Unicode int32.",
        "originalExpl": "Un string en Go es una secuencia de bytes de solo lectura. El lenguaje trata las cadenas como texto codificado en UTF-8. En Go, el concepto de un carácter se llama 'runa' (rune), que es un alias del tipo int32.",
        "basicExpl": {
            "title": "Conceptos Fundamentales para Principiantes",
            "content": "Para entender el texto en Go hay que diferenciar entre 'bytes' y 'caracteres':\n- Un 'string' es una lista de bytes crudos.\n- En el abecedario inglés normal (ASCII), cada letra ocupa 1 byte ('a' = 1 byte). Por eso `len(\"hello\")` da 5.\n- Pero en español, japonés o emojis, los caracteres ocupan entre 2 y 4 bytes cada uno ('ñ' = 2 bytes, '🚀' = 4 bytes). Por eso `len(\"año\")` da 4 bytes, ¡no 3!\n- Una 'runa' (rune) es un único punto de código Unicode completo (un carácter real), representado internamente por un entero de 32 bits (int32).",
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
            "statement": "Escribe una función 'invertirTexto(s string) string' que invierta correctamente cualquier cadena de texto respetando los caracteres multibyte (tildes, caracteres asiáticos y emojis). Demuestra que funciona con '¡Golang es genial! 🚀'.",
            "starterCode": "package main\n\nimport \"fmt\"\n\nfunc invertirTexto(s string) string {\n    // Convierte a []rune para no destruir los bytes UTF-8\n}\n\nfunc main() {\n    original := \"¡Golang es genial! 🚀\"\n    fmt.Println(\"Original:\", original)\n    fmt.Println(\"Invertido:\", invertirTexto(original))\n}",
            "hint": "Convierte el string a []rune, invierte el slice de runas intercambiando extremos y reconvierte a string.",
            "solution": "package main\n\nimport \"fmt\"\n\nfunc invertirTexto(s string) string {\n    runas := []rune(s)\n    for i, j := 0, len(runas)-1; i < j; i, j = i+1, j-1 {\n        runas[i], runas[j] = runas[j], runas[i]\n    }\n    return string(runas)\n}\n\nfunc main() {\n    original := \"¡Golang es genial! 🚀\"\n    invertido := invertirTexto(original)\n    fmt.Println(\"Original :\", original)\n    fmt.Println(\"Invertido:\", invertido)\n}",
            "explanation": "Si invirtieras el string como bytes con `[]byte`, los caracteres multibyte como '¡' (2 bytes) o '🚀' (4 bytes) quedarían con sus secuencias binarias al revés, corrompiéndose en caracteres ilegibles (mojibake). Al convertir a `[]rune`, cada carácter Unicode se manipula como una unidad atómica intacta."
        },
        "externalLinks": [
            {"title": "The Go Blog: Strings, bytes, runes and characters in Go", "url": "https://go.dev/blog/strings", "description": "El artículo fundamental de Rob Pike explicando cómo maneja Go el texto y UTF-8."},
            {"title": "Package unicode/utf8", "url": "https://pkg.go.dev/unicode/utf8", "description": "Documentación oficial de funciones para validar y contar runas en cadenas UTF-8."},
            {"title": "Go Spec: Rune literals", "url": "https://go.dev/ref/spec#Rune_literals", "description": "Especificación formal de los literales y tipos de runa."}
        ]
    },

    "structs": {
        "id": 19,
        "slug": "structs",
        "title": "Structs",
        "titleEs": "Estructuras (Structs)",
        "category": "Tipos Avanzados y POO en Go",
        "categorySlug": "poo-generics",
        "categoryIcon": "🏛️",
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
            {"title": "Go Tour: Structs", "url": "https://go.dev/tour/moretypes/2", "description": "Sintaxis básica y manipulación de structs."},
            {"title": "Effective Go: Allocation with new and struct literals", "url": "https://go.dev/doc/effective_go#allocation_new", "description": "Guía oficial sobre inicialización de estructuras."},
            {"title": "Go Spec: Struct types", "url": "https://go.dev/ref/spec#Struct_types", "description": "Definición formal de tipos de estructura y sintaxis de tags."}
        ]
    },

    "methods": {
        "id": 20,
        "slug": "methods",
        "title": "Methods",
        "titleEs": "Métodos y Receptores (Value vs Pointer)",
        "category": "Tipos Avanzados y POO en Go",
        "categorySlug": "poo-generics",
        "categoryIcon": "🏛️",
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
            {"title": "Go Tour: Methods", "url": "https://go.dev/tour/methods/1", "description": "Definición y uso de métodos en el tour interactivo."},
            {"title": "Effective Go: Methods and Pointer vs. Value Receivers", "url": "https://go.dev/doc/effective_go#methods", "description": "Guía canónica de diseño sobre receptores de valor y puntero."},
            {"title": "Go Spec: Method declarations", "url": "https://go.dev/ref/spec#Method_declarations", "description": "Especificación del lenguaje sobre receptores y method sets."}
        ]
    },

    "interfaces": {
        "id": 21,
        "slug": "interfaces",
        "title": "Interfaces",
        "titleEs": "Interfaces y Polimorfismo Implícito",
        "category": "Tipos Avanzados y POO en Go",
        "categorySlug": "poo-generics",
        "categoryIcon": "🏛️",
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
            {"title": "Go Tour: Interfaces", "url": "https://go.dev/tour/methods/9", "description": "Explicación interactiva del polimorfismo implícito."},
            {"title": "Russ Cox: Go Data Structures: Interfaces", "url": "https://research.swtch.com/interfaces", "description": "Artículo técnico de Russ Cox sobre cómo se implementan las itables e ifaces en memoria."},
            {"title": "Effective Go: Interfaces and methods", "url": "https://go.dev/doc/effective_go#interfaces_and_types", "description": "Buenas prácticas de diseño con interfaces en Go."}
        ]
    }
}
