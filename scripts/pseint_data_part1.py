# -*- coding: utf-8 -*-
# scripts/pseint_data_part1.py - Temas 1 a 20 de PSeInt

PSEINT_TOPICS_PART1 = [
    {
        "id": 1,
        "slug": "hola-mundo",
        "title": "Hola Mundo",
        "titleEs": "Hola Mundo en PSeInt",
        "category": "Fundamentos y Estructura del Algoritmo",
        "categorySlug": "fundamentos",
        "categoryIcon": "zap",
        "difficulty": "Principiante",
        "summary": "Estructura canónica de un algoritmo en PSeInt, comando Escribir y delimitadores de inicio y fin.",
        "originalExpl": "En PSeInt, todo algoritmo comienza con la palabra reservada 'Algoritmo' seguida del nombre identificador del programa, y concluye con 'FinAlgoritmo'. La instrucción 'Escribir' envía texto a la consola de salida.",
        "basicExpl": {
            "title": "Conceptos Básicos para Principiantes",
            "content": "Un algoritmo es una secuencia ordenada y finita de instrucciones lógicas para resolver un problema. En PSeInt, 'Algoritmo' abre el programa y 'FinAlgoritmo' lo cierra, como las tapas de un libro. La instrucción 'Escribir' le ordena a la computadora que muestre un mensaje en la pantalla.",
            "keyPoints": [
                "Todo programa debe tener un nombre descriptivo tras la palabra 'Algoritmo'.",
                "Los textos o cadenas deben encerrarse entre comillas dobles (\").",
                "'Escribir' imprime el contenido y salta automáticamente a la siguiente línea."
            ]
        },
        "intermediateExpl": {
            "title": "Prueba de Escritorio y Flujo de Control",
            "content": "La prueba de escritorio es el seguimiento manual paso a paso de las instrucciones del algoritmo para verificar que produzca el resultado deseado.",
            "traceTable": [
                {"paso": 1, "instruccion": "Algoritmo HolaMundo", "accion": "Inicia el flujo del programa"},
                {"paso": 2, "instruccion": "Escribir \"¡Hola, Mundo desde PSeInt!\"", "accion": "Imprime texto en stdout"},
                {"paso": 3, "instruccion": "FinAlgoritmo", "accion": "Finaliza la ejecución con código de salida 0"}
            ],
            "memoryConcepts": [
                "No se utiliza memoria RAM adicional ya que no se declararon variables.",
                "El flujo de control es estrictamente secuencial de arriba hacia abajo."
            ]
        },
        "expertExpl": {
            "title": "Equivalencia en Lenguajes Profesionales y Compiladores",
            "content": "El comando 'Escribir' equivale a 'fmt.Println' en Go, 'print()' en Python o 'std::cout << ... << std::endl' en C++. En compiladores reales, esto se traduce en una llamada al sistema operativo (syscall write en Unix o WriteConsole en Windows) hacia el descriptor de archivo 1 (stdout).",
            "complexity": "O(1) en tiempo y O(1) en memoria.",
            "realWorldUse": "Salida estándar en interfaces de línea de comandos (CLI) y logs de inicio de servicios backend."
        },
        "code": """// Nuestro primer algoritmo canónico en PSeInt.
// Imprime un saludo de bienvenida en la consola.
Algoritmo HolaMundo
	// La instrucción 'Escribir' muestra texto en la pantalla
	Escribir "¡Hola, Mundo desde PSeInt!"
	Escribir "Bienvenido al curso profesional de Lógica de Programación."
FinAlgoritmo
""",
        "output": """*** Ejecución Iniciada ***
¡Hola, Mundo desde PSeInt!
Bienvenido al curso profesional de Lógica de Programación.
*** Ejecución Finalizada ***
""",
        "evaluation": {
            "task": "Escribe un algoritmo llamado 'SaludoPersonalizado' que imprima exactamente 'Aprendiendo lógica en PSeInt'.",
            "starterCode": """Algoritmo SaludoPersonalizado
	// Escribe tu instrucción aquí
	
FinAlgoritmo
""",
            "testRunner": "Escribir \"Aprendiendo lógica en PSeInt\"",
            "solution": """Algoritmo SaludoPersonalizado
	Escribir "Aprendiendo lógica en PSeInt"
FinAlgoritmo
""",
            "solutionExplanation": "Utilizamos la instrucción 'Escribir' pasando la cadena requerida entre comillas dobles."
        },
        "externalLinks": [
            {
                "title": "Manual Oficial de PSeInt: Estructura Básica",
                "url": "https://pseint.sourceforge.net/index.php?page=documentacion.php",
                "description": "Documentación oficial sobre el entorno y la sintaxis de pseudocódigo.",
                "type": "Manual Oficial"
            }
        ]
    },

    {
        "id": 2,
        "slug": "tipos-de-datos",
        "title": "Tipos de Datos Primitivos",
        "titleEs": "Tipos de Datos Primitivos",
        "category": "Fundamentos y Estructura del Algoritmo",
        "categorySlug": "fundamentos",
        "categoryIcon": "zap",
        "difficulty": "Principiante",
        "summary": "Los 5 tipos de datos fundamentales en PSeInt: Entero, Real, Caracter, Cadena y Logico.",
        "originalExpl": "PSeInt soporta datos numéricos enteros (sin decimales), números reales (con coma o punto flotante), caracteres individuales, cadenas de texto y valores booleanos lógicos (Verdadero y Falso).",
        "basicExpl": {
            "title": "Los Bloques Fundamentales de la Información",
            "content": "La computadora necesita saber qué tipo de información está procesando para reservar la memoria adecuada. Así como en la vida real no puedes sumar letras con números, en programación no debes mezclar tipos incompatibles.",
            "keyPoints": [
                "Entero: Números completos positivos o negativos (-5, 0, 42).",
                "Real: Números con parte fraccionaria o decimal (3.1416, -0.5).",
                "Caracter / Cadena: Texto delimitado por comillas (\"Hola\", \"A\").",
                "Logico: Solo puede ser Verdadero o Falso (valores booleanos)."
            ]
        },
        "intermediateExpl": {
            "title": "Representación Interna en Memoria",
            "content": "Cada tipo de dato ocupa un espacio específico en memoria y tiene reglas de precisión.",
            "traceTable": [
                {"paso": 1, "instruccion": "Definir edad Como Entero", "accion": "Reserva espacio de número entero"},
                {"paso": 2, "instruccion": "Definir precio Como Real", "accion": "Reserva espacio para punto flotante"},
                {"paso": 3, "instruccion": "Definir esMayor Como Logico", "accion": "Reserva un flag booleano (1 bit / 1 byte)"}
            ],
            "memoryConcepts": [
                "En lenguajes compilados, los enteros suelen ocupar 32 o 64 bits.",
                "Los números reales utilizan el estándar IEEE 754 de punto flotante."
            ]
        },
        "expertExpl": {
            "title": "Tipado Estricto vs Tipado Dinámico",
            "content": "PSeInt puede configurarse en modo 'Flexible' o 'Estricto'. En ingeniería de software moderna (como en Go, Rust o C++), el tipado estricto es la norma porque evita errores sutiles de conversión en tiempo de ejecución (Type Safety).",
            "complexity": "O(1) para asignación e inspección de primitivos.",
            "realWorldUse": "Definición de esquemas de bases de datos relacionales (SQL INT, FLOAT, VARCHAR, BOOLEAN)."
        },
        "code": """// Demostración de los 5 tipos de datos primitivos en PSeInt.
Algoritmo TiposDeDatos
	Definir edad Como Entero
	Definir promedio Como Real
	Definir inicial Como Caracter
	Definir nombre Como Cadena
	Definir activo Como Logico

	edad <- 22
	promedio <- 9.75
	inicial <- 'A'
	nombre <- "Ana Morales"
	activo <- Verdadero

	Escribir "Nombre: ", nombre
	Escribir "Inicial: ", inicial
	Escribir "Edad: ", edad, " años"
	Escribir "Promedio académico: ", promedio
	Escribir "¿Estado activo?: ", activo
FinAlgoritmo
""",
        "output": """*** Ejecución Iniciada ***
Nombre: Ana Morales
Inicial: A
Edad: 22 años
Promedio académico: 9.75
¿Estado activo?: VERDADERO
*** Ejecución Finalizada ***
""",
        "evaluation": {
            "task": "Define una variable llamada 'temperatura' de tipo Real, asígnale el valor 36.5 e imprímela con 'Escribir temperatura'.",
            "starterCode": """Algoritmo EvaluacionTipos
	// Declara y asigna la variable temperatura
	
FinAlgoritmo
""",
            "testRunner": "Definir temperatura Como Real",
            "solution": """Algoritmo EvaluacionTipos
	Definir temperatura Como Real
	temperatura <- 36.5
	Escribir temperatura
FinAlgoritmo
""",
            "solutionExplanation": "Declaramos la variable con 'Definir temperatura Como Real', le asignamos el número decimal 36.5 y la mostramos con Escribir."
        },
        "externalLinks": [
            {
                "title": "PSeInt: Tipos de Datos y Operadores",
                "url": "https://pseint.sourceforge.net/",
                "description": "Especificación oficial de tipos de datos en pseudocódigo PSeInt.",
                "type": "Documentación"
            }
        ]
    },

    {
        "id": 3,
        "slug": "variables-y-asignacion",
        "title": "Variables y Asignación",
        "titleEs": "Variables y el Operador Flecha (<-)",
        "category": "Fundamentos y Estructura del Algoritmo",
        "categorySlug": "fundamentos",
        "categoryIcon": "zap",
        "difficulty": "Principiante",
        "summary": "Declaración explícita con 'Definir', nombres de identificadores válidos y asignación con la flecha '<-'.",
        "originalExpl": "Una variable es una posición de memoria con un nombre que almacena un valor mutable. En PSeInt idiomático se declara con 'Definir nombre Como Tipo' y se asigna con el operador de flecha '<-' (o '=' en modo flexible).",
        "basicExpl": {
            "title": "Las Cajas de Almacenamiento de tu Programa",
            "content": "Imagina una variable como una caja etiquetada. La etiqueta es el nombre (identificador) y lo que pones dentro es el valor. Puedes cambiar lo que hay dentro de la caja en cualquier momento durante la ejecución.",
            "keyPoints": [
                "Los nombres deben comenzar con letra o guión bajo, sin espacios ni caracteres especiales.",
                "El operador de asignación '<-' copia el valor de la derecha dentro de la variable de la izquierda.",
                "Se recomienda declarar todas las variables al principio del algoritmo."
            ]
        },
        "intermediateExpl": {
            "title": "Prueba de Escritorio de Mutación de Variables",
            "content": "Observa cómo evoluciona el estado interno de la memoria paso a paso.",
            "traceTable": [
                {"paso": 1, "instruccion": "x <- 10", "accion": "Asigna 10 a la variable x (x=10)"},
                {"paso": 2, "instruccion": "y <- 20", "accion": "Asigna 20 a la variable y (x=10, y=20)"},
                {"paso": 3, "instruccion": "x <- x + y", "accion": "Calcula 10 + 20 y sobreescribe x con 30 (x=30, y=20)"}
            ],
            "memoryConcepts": [
                "La asignación evalúa primero toda la expresión del lado derecho y luego almacena el resultado.",
                "El valor anterior de la variable se pierde irrecuperablemente al ser sobreescrito."
            ]
        },
        "expertExpl": {
            "title": "Manejo de Registros y Asignación en Arquitectura de Computadores",
            "content": "En código máquina (Assembly), la instrucción `x <- x + y` se descompone en: 1) Cargar el valor de x en un registro de la CPU (MOV EAX, [x]), 2) Sumar el valor de y (ADD EAX, [y]), 3) Guardar el registro de vuelta en la dirección de memoria de x (MOV [x], EAX).",
            "complexity": "O(1) para lectura y escritura en memoria.",
            "realWorldUse": "Estado mutable en algoritmos de procesamiento numérico y lógica de negocio."
        },
        "code": """// Declaración de variables y mutación de estado con el operador '<-'.
Algoritmo VariablesYAsignacion
	Definir totalPuntos Como Entero
	Definir multiplicador Como Entero

	// Asignación inicial
	totalPuntos <- 100
	multiplicador <- 2
	Escribir "Puntos iniciales: ", totalPuntos

	// Mutación usando el valor anterior
	totalPuntos <- totalPuntos * multiplicador
	Escribir "Puntos duplicados: ", totalPuntos

	// Suma acumulativa
	totalPuntos <- totalPuntos + 50
	Escribir "Puntos finales con bono: ", totalPuntos
FinAlgoritmo
""",
        "output": """*** Ejecución Iniciada ***
Puntos iniciales: 100
Puntos duplicados: 200
Puntos finales con bono: 250
*** Ejecución Finalizada ***
""",
        "evaluation": {
            "task": "Escribe un algoritmo llamado 'Intercambio' que declare dos enteros 'a' y 'b', asigne a=5 y b=10, intercambie sus valores usando una variable auxiliar 'temp', e imprima 'a=' seguido del valor de a y 'b=' con el valor de b.",
            "starterCode": """Algoritmo Intercambio
	Definir a, b, temp Como Entero
	a <- 5
	b <- 10
	// Realiza el intercambio aquí
	
FinAlgoritmo
""",
            "testRunner": "temp <- a",
            "solution": """Algoritmo Intercambio
	Definir a, b, temp Como Entero
	a <- 5
	b <- 10
	temp <- a
	a <- b
	b <- temp
	Escribir "a=", a
	Escribir "b=", b
FinAlgoritmo
""",
            "solutionExplanation": "Guardamos temporalmente el valor de 'a' en 'temp', luego asignamos 'b' a 'a', y finalmente le pasamos 'temp' a 'b'."
        },
        "externalLinks": [
            {
                "title": "Wikipedia: Asignación de Variables en Programación",
                "url": "https://es.wikipedia.org/wiki/Asignaci%C3%B3n_(inform%C3%A1tica)",
                "description": "Fundamento teórico del concepto de asignación y mutabilidad.",
                "type": "Referencia"
            }
        ]
    },

    {
        "id": 4,
        "slug": "lectura-de-datos",
        "title": "Lectura de Datos con Leer",
        "titleEs": "Entrada Interactiva con el Comando Leer",
        "category": "Fundamentos y Estructura del Algoritmo",
        "categorySlug": "fundamentos",
        "categoryIcon": "zap",
        "difficulty": "Principiante",
        "summary": "Captura de datos desde el teclado hacia variables mediante la instrucción 'Leer'.",
        "originalExpl": "La instrucción 'Leer' detiene la ejecución del programa y espera a que el usuario ingrese uno o más valores por el teclado, asignándolos automáticamente a las variables especificadas.",
        "basicExpl": {
            "title": "Comunicando el Usuario con el Programa",
            "content": "Hasta ahora nuestros programas tenían datos fijos. Con 'Leer', el programa se vuelve interactivo y dinámico: hace una pregunta, espera a que el usuario escriba su respuesta y presione Enter.",
            "keyPoints": [
                "Siempre se recomienda mostrar un 'Escribir' previo indicando al usuario qué debe ingresar.",
                "Si la variable es de tipo Entero, el usuario debe ingresar un número entero válido para evitar errores.",
                "Se pueden leer varias variables en una sola línea separadas por comas: 'Leer a, b'."
            ]
        },
        "intermediateExpl": {
            "title": "Manejo del Buffer de Entrada (Stdin)",
            "content": "Cuando el usuario teclea texto y presiona Enter, los caracteres se colocan en un buffer temporal de entrada del sistema operativo.",
            "traceTable": [
                {"paso": 1, "instruccion": "Escribir \"Ingresa tu edad:\"", "accion": "Imprime prompt en pantalla"},
                {"paso": 2, "instruccion": "Leer edad", "accion": "Espera entrada del usuario (ej: 25) y lo asigna a edad"},
                {"paso": 3, "instruccion": "Escribir \"El próximo año tendrás: \", edad + 1", "accion": "Evalúa 25 + 1 = 26 e imprime"}
            ],
            "memoryConcepts": [
                "La entrada debe coincidir con el tipo de la variable definida para evitar una excepción de conversión (Type Mismatch)."
            ]
        },
        "expertExpl": {
            "title": "Sanitización de Entradas y Seguridad en Producción",
            "content": "En sistemas profesionales, nunca se debe confiar en la entrada del usuario (Principio Zero Trust). Siempre se debe validar el rango, la longitud y el formato para evitar desbordamientos de buffer o inyecciones de código.",
            "complexity": "O(1) para la lectura de tipos escalares.",
            "realWorldUse": "Entrada estándar en utilidades CLI, formularios web y parseo de peticiones REST."
        },
        "code": """// Ejemplo de lectura interactiva de datos desde el teclado.
Algoritmo LecturaDeDatos
	Definir nombreUsuario Como Cadena
	Definir anioNacimiento, anioActual, edadCalculada Como Entero

	anioActual <- 2026

	// Solicitamos el nombre
	Escribir "Por favor, ingresa tu nombre:"
	Leer nombreUsuario

	// Solicitamos el año de nacimiento
	Escribir "Ingresa tu año de nacimiento (ej: 2000):"
	Leer anioNacimiento

	// Procesamos la información
	edadCalculada <- anioActual - anioNacimiento

	// Mostramos el resultado
	Escribir "Hola ", nombreUsuario, ", en el año ", anioActual, " tienes aproximadamente ", edadCalculada, " años."
FinAlgoritmo
""",
        "output": """*** Ejecución Iniciada ***
Por favor, ingresa tu nombre:
> Carlos
Ingresa tu año de nacimiento (ej: 2000):
> 1998
Hola Carlos, en el año 2026 tienes aproximadamente 28 años.
*** Ejecución Finalizada ***
""",
        "evaluation": {
            "task": "Escribe un algoritmo llamado 'Duplicador' que defina una variable entera 'num', la lea del teclado con 'Leer num' e imprima el doble con 'Escribir num * 2'.",
            "starterCode": """Algoritmo Duplicador
	Definir num Como Entero
	// Lee num e imprime su doble
	
FinAlgoritmo
""",
            "testRunner": "Leer num",
            "solution": """Algoritmo Duplicador
	Definir num Como Entero
	Leer num
	Escribir num * 2
FinAlgoritmo
""",
            "solutionExplanation": "Usamos 'Leer num' para capturar la entrada y 'Escribir num * 2' para mostrar el resultado calculado."
        },
        "externalLinks": [
            {
                "title": "Manual PSeInt: Instrucción Leer",
                "url": "https://pseint.sourceforge.net/",
                "description": "Detalles del comportamiento de la entrada de datos en PSeInt.",
                "type": "Manual Oficial"
            }
        ]
    },

    {
        "id": 5,
        "slug": "constantes-y-literales",
        "title": "Constantes y Convenciones",
        "titleEs": "Constantes y Buenas Prácticas de Nomenclatura",
        "category": "Fundamentos y Estructura del Algoritmo",
        "categorySlug": "fundamentos",
        "categoryIcon": "zap",
        "difficulty": "Principiante",
        "summary": "Uso de valores inmutables, prevención de 'números mágicos' y convención de mayúsculas sostenidas.",
        "originalExpl": "Aunque PSeInt no posee una palabra reservada 'Constante' como otros lenguajes, en algoritmia profesional se define una variable con nombre en MAYÚSCULAS sostenidas para señalar que su valor no debe ser mutado.",
        "basicExpl": {
            "title": "¿Por qué no debemos usar 'Números Mágicos'?",
            "content": "Un 'número mágico' es un número suelto en medio del código (como 0.19 o 3.1416) cuyo significado no es evidente para quien lee el programa. Nombrar tus constantes hace que tu algoritmo sea autoexplicativo.",
            "keyPoints": [
                "Escribe las constantes en MAYÚSCULAS: PI, TASA_IVA, GRAVEDAD.",
                "Define las constantes al inicio del algoritmo.",
                "Si la tasa impositiva cambia, solo debes modificarla en una sola línea."
            ]
        },
        "intermediateExpl": {
            "title": "Mantenibilidad del Código",
            "content": "La mantenibilidad es la facilidad con la que un algoritmo puede corregirse o mejorarse en el tiempo.",
            "traceTable": [
                {"paso": 1, "instruccion": "TASA_IVA <- 0.19", "accion": "Establece el factor de impuesto"},
                {"paso": 2, "instruccion": "precioBase <- 1000", "accion": "Define el valor base del producto"},
                {"paso": 3, "instruccion": "impuesto <- precioBase * TASA_IVA", "accion": "Calcula 190.0 de impuesto"}
            ],
            "memoryConcepts": [
                "En lenguajes compilados (como Go o C), las constantes no ocupan memoria en tiempo de ejecución, pues el compilador las reemplaza directamente en el código de máquina."
            ]
        },
        "expertExpl": {
            "title": "Inmutabilidad en Arquitectura de Software",
            "content": "La inmutabilidad previene condiciones de carrera (Race Conditions) en sistemas concurrentes. Si un dato nunca cambia, múltiples procesos o hilos pueden leerlo concurrentemente sin riesgo de corrupción de memoria.",
            "complexity": "O(1) para evaluación en tiempo de diseño.",
            "realWorldUse": "Configuración de microservicios, URLs base de APIs y factores de conversión física/financiera."
        },
        "code": """// Uso de constantes simuladas mediante convención de nombres en mayúsculas.
Algoritmo ConstantesYConvenciones
	// Definición de constantes
	Definir PI_VALOR, TASA_IVA Como Real
	Definir VELOCIDAD_LUZ Como Entero

	// Asignación única inicial
	PI_VALOR <- 3.14159265
	TASA_IVA <- 0.19
	VELOCIDAD_LUZ <- 299792458 // en metros por segundo

	Definir radio, areaCirculo Como Real
	radio <- 5.0
	areaCirculo <- PI_VALOR * (radio ^ 2)

	Escribir "Radio: ", radio, " cm"
	Escribir "Área del círculo: ", areaCirculo, " cm²"
	Escribir "Tasa impositiva aplicada: ", (TASA_IVA * 100), "%"
FinAlgoritmo
""",
        "output": """*** Ejecución Iniciada ***
Radio: 5 cm
Área del círculo: 78.53981625 cm²
Tasa impositiva aplicada: 19%
*** Ejecución Finalizada ***
""",
        "evaluation": {
            "task": "Escribe un algoritmo llamado 'CalculoDescuento' que defina la constante PORCENTAJE_DESCUENTO Como Real asignándole 0.20, una variable precio=500 y calcule el precioFinal restando el descuento.",
            "starterCode": """Algoritmo CalculoDescuento
	Definir PORCENTAJE_DESCUENTO, precio, precioFinal Como Real
	// Escribe tu código aquí
	
FinAlgoritmo
""",
            "testRunner": "PORCENTAJE_DESCUENTO <- 0.20",
            "solution": """Algoritmo CalculoDescuento
	Definir PORCENTAJE_DESCUENTO, precio, precioFinal Como Real
	PORCENTAJE_DESCUENTO <- 0.20
	precio <- 500
	precioFinal <- precio - (precio * PORCENTAJE_DESCUENTO)
	Escribir "Precio final: ", precioFinal
FinAlgoritmo
""",
            "solutionExplanation": "Definimos la constante en mayúsculas con 0.20, calculamos el 20% de 500 (100) y lo restamos para obtener 400."
        },
        "externalLinks": [
            {
                "title": "Clean Code: Evitar Magic Numbers",
                "url": "https://en.wikipedia.org/wiki/Magic_number_(programming)",
                "description": "Por qué el uso de números mágicos es considerado un antipatrón en ingeniería de software.",
                "type": "Buenas Prácticas"
            }
        ]
    },

    {
        "id": 6,
        "slug": "operadores-aritmeticos",
        "title": "Operadores Aritméticos",
        "titleEs": "Operadores Aritméticos y Precedencia Matemática",
        "category": "Fundamentos y Estructura del Algoritmo",
        "categorySlug": "fundamentos",
        "categoryIcon": "zap",
        "difficulty": "Principiante",
        "summary": "Suma (+), resta (-), multiplicación (*), división (/), residuo (MOD o %) y potencia (^). Reglas de precedencia.",
        "originalExpl": "PSeInt permite realizar cálculos matemáticos combinando variables y números mediante operadores aritméticos respetando la jerarquía de operaciones PEMDAS.",
        "basicExpl": {
            "title": "La Calculadora del Programador",
            "content": "Los operadores aritméticos realizan operaciones matemáticas entre números. Es fundamental recordar que la multiplicación y la división se resuelven antes que la suma y la resta, a menos que uses paréntesis.",
            "keyPoints": [
                "Suma (+), Resta (-), Multiplicación (*), División (/).",
                "Módulo (MOD o %): Devuelve el residuo de la división entera (ej: 7 MOD 3 = 1).",
                "Potencia (^): Eleva la base al exponente (ej: 2 ^ 3 = 8).",
                "Usa paréntesis () para forzar el orden deseado."
            ]
        },
        "intermediateExpl": {
            "title": "La Gran Trampa: División Entera vs Real",
            "content": "El operador MOD es clave en algoritmia para determinar si un número es par (n MOD 2 = 0) o para obtener dígitos individuales de un número.",
            "traceTable": [
                {"expresion": "10 / 4", "resultado": "2.5 (División decimal)"},
                {"expresion": "10 MOD 4", "resultado": "2 (Residuo: 10 = 4*2 + 2)"},
                {"expresion": "2 + 3 * 4", "resultado": "14 (Multiplicación tiene prioridad)"},
                {"expresion": "(2 + 3) * 4", "resultado": "20 (Paréntesis alteran la prioridad)"}
            ],
            "memoryConcepts": [
                "La división por cero es una operación matemática indefinida que provocará un error crítico en tiempo de ejecución."
            ]
        },
        "expertExpl": {
            "title": "Unidad Aritmético Lógica (ALU) y Precisión Numérica",
            "content": "En hardware, la ALU ejecuta estas operaciones directamente. Las computadoras procesan las operaciones en punto flotante usando el estándar binario, lo que puede causar pequeñas pérdidas de precisión infinitesimal en cálculos financieros si no se usan tipos decimales exactos.",
            "complexity": "O(1) a nivel de procesador para tipos primitivos escalares.",
            "realWorldUse": "Motores de videojuegos (física y trigonometría), gráficos por computadora y criptografía."
        },
        "code": """// Demostración completa de operadores aritméticos y orden de precedencia.
Algoritmo OperadoresAritmeticos
	Definir a, b Como Entero
	a <- 17
	b <- 5

	Escribir "Valores: a = ", a, ", b = ", b
	Escribir "Suma (a + b) = ", a + b
	Escribir "Resta (a - b) = ", a - b
	Escribir "Multiplicación (a * b) = ", a * b
	Escribir "División (a / b) = ", a / b
	Escribir "Residuo Módulo (a MOD b) = ", a MOD b
	Escribir "Potenciación (b ^ 3) = ", b ^ 3

	// Precedencia
	Definir res1, res2 Como Real
	res1 <- 10 + 5 * 2
	res2 <- (10 + 5) * 2
	Escribir "Sin paréntesis (10 + 5 * 2) = ", res1
	Escribir "Con paréntesis ((10 + 5) * 2) = ", res2
FinAlgoritmo
""",
        "output": """*** Ejecución Iniciada ***
Valores: a = 17, b = 5
Suma (a + b) = 22
Resta (a - b) = 12
Multiplicación (a * b) = 85
División (a / b) = 3.4
Residuo Módulo (a MOD b) = 2
Potenciación (b ^ 3) = 125
Sin paréntesis (10 + 5 * 2) = 20
Con paréntesis ((10 + 5) * 2) = 30
*** Ejecución Finalizada ***
""",
        "evaluation": {
            "task": "Escribe un algoritmo llamado 'EsPar' que declare una variable entera 'n', le asigne el valor 14 y muestre con 'Escribir' el residuo de dividir n entre 2 usando el operador MOD.",
            "starterCode": """Algoritmo EsPar
	Definir n Como Entero
	n <- 14
	// Imprime n MOD 2
	
FinAlgoritmo
""",
            "testRunner": "n MOD 2",
            "solution": """Algoritmo EsPar
	Definir n Como Entero
	n <- 14
	Escribir n MOD 2
FinAlgoritmo
""",
            "solutionExplanation": "El residuo de 14 entre 2 es 0, lo cual confirma matemáticamente que 14 es un número par."
        },
        "externalLinks": [
            {
                "title": "Khan Academy: Orden de las Operaciones Matemáticas",
                "url": "https://es.khanacademy.org/math/algebra/x2f8bb11595b61c86:foundation-algebra/x2f8bb11595b61c86:order-of-operations/v/introduction-to-order-of-operations",
                "description": "Fundamento matemático de la jerarquía de operadores.",
                "type": "Matemáticas"
            }
        ]
    },

    {
        "id": 7,
        "slug": "operadores-relacionales-logicos",
        "title": "Operadores Relacionales y Lógicos",
        "titleEs": "Comparaciones y Álgebra Booleana (Y, O, NO)",
        "category": "Fundamentos y Estructura del Algoritmo",
        "categorySlug": "fundamentos",
        "categoryIcon": "zap",
        "difficulty": "Principiante",
        "summary": "Comparaciones (<, >, =, <>, <=, >=) y combinaciones booleanas con Y (conjunción), O (disyunción) y NO (negación).",
        "originalExpl": "Los operadores relacionales comparan dos valores y retornan un valor lógico (Verdadero o Falso). Los operadores lógicos permiten componer múltiples condiciones.",
        "basicExpl": {
            "title": "Tomando Decisiones con la Lógica",
            "content": "Una proposición lógica es una afirmación que solo puede ser Verdadera o Falsa. Por ejemplo: '¿La edad es mayor o igual a 18?'.",
            "keyPoints": [
                "Igualdad (=), Distinto de (<>).",
                "Mayor que (>), Menor que (<), Mayor o igual (>=), Menor o igual (<=).",
                "Y (Conjunción): Es Verdadero solo si AMBAS condiciones son verdaderas.",
                "O (Disyunción): Es Verdadero si AL MENOS UNA condición es verdadera.",
                "NO (Negación): Invierte el valor (NO Verdadero = Falso)."
            ]
        },
        "intermediateExpl": {
            "title": "Tablas de Verdad",
            "content": "El álgebra de Boole rige todas las decisiones lógicas en computación.",
            "traceTable": [
                {"A": "V", "B": "V", "A Y B": "VERDADERO", "A O B": "VERDADERO"},
                {"A": "V", "B": "F", "A Y B": "FALSO", "A O B": "VERDADERO"},
                {"A": "F", "B": "V", "A Y B": "FALSO", "A O B": "VERDADERO"},
                {"A": "F", "B": "F", "A Y B": "FALSO", "A O B": "FALSO"}
            ],
            "memoryConcepts": [
                "Los resultados lógicos pueden guardarse directamente en variables de tipo Logico."
            ]
        },
        "expertExpl": {
            "title": "Compuertas Lógicas en Hardware y Evaluación de Cortocircuito",
            "content": "Los operadores Y, O, NO son la base de los transistores y compuertas lógicas (AND, OR, NOT) que integran los microprocesadores modernos. En lenguajes de producción, la evaluación es de 'cortocircuito': si en una expresión (A Y B) el término A es falso, B ni siquiera se evalúa.",
            "complexity": "O(1) para evaluación booleana.",
            "realWorldUse": "Sistemas de autenticación, reglas de autorización de acceso (RBAC) y motores de búsqueda."
        },
        "code": """// Operadores relacionales de comparación y operadores lógicos booleanos.
Algoritmo OperadoresRelacionalesLogicos
	Definir edad Como Entero
	Definir tienePermiso, tieneCedula Como Logico
	Definir puedeEntrar, esFinDeSemana, tieneCupon Como Logico

	edad <- 20
	tieneCedula <- Verdadero
	tienePermiso <- Falso

	// Comparaciones relacionales
	Escribir "¿Es mayor de edad (edad >= 18)?: ", (edad >= 18)
	Escribir "¿Edad es exactamente 20?: ", (edad = 20)
	Escribir "¿Edad es distinta de 0?: ", (edad <> 0)

	// Operadores lógicos
	// Para entrar al club: Debe tener >= 18 Y tener cédula
	puedeEntrar <- (edad >= 18) Y tieneCedula
	Escribir "¿Puede entrar al club (Y)?: ", puedeEntrar

	// Para descuento: Ser fin de semana O tener cupón
	esFinDeSemana <- Falso
	tieneCupon <- Verdadero
	Escribir "¿Aplica descuento (O)?: ", (esFinDeSemana O tieneCupon)

	// Negación
	Escribir "Inversión lógica de permiso con NO: ", (NO tienePermiso)
FinAlgoritmo
""",
        "output": """*** Ejecución Iniciada ***
¿Es mayor de edad (edad >= 18)?: VERDADERO
¿Edad es exactamente 20?: VERDADERO
¿Edad es distinta de 0?: VERDADERO
¿Puede entrar al club (Y)?: VERDADERO
¿Aplica descuento (O)?: VERDADERO
Inversión lógica de permiso con NO: VERDADERO
*** Ejecución Finalizada ***
""",
        "evaluation": {
            "task": "Escribe un algoritmo llamado 'RangoValido' que declare una variable 'nota' Como Real con valor 8.5, y muestre con 'Escribir' si la nota está entre 0 y 10 usando: (nota >= 0) Y (nota <= 10).",
            "starterCode": """Algoritmo RangoValido
	Definir nota Como Real
	nota <- 8.5
	// Imprime si está en el rango [0, 10]
	
FinAlgoritmo
""",
            "testRunner": "(nota >= 0) Y (nota <= 10)",
            "solution": """Algoritmo RangoValido
	Definir nota Como Real
	nota <- 8.5
	Escribir (nota >= 0) Y (nota <= 10)
FinAlgoritmo
""",
            "solutionExplanation": "Evaluamos simultáneamente el límite inferior y superior con el operador lógico Y."
        },
        "externalLinks": [
            {
                "title": "Wikipedia: Álgebra de Boole",
                "url": "https://es.wikipedia.org/wiki/%C3%81lgebra_de_Boole",
                "description": "Fundamento matemático de las operaciones lógicas booleanas.",
                "type": "Matemáticas"
            }
        ]
    },

    {
        "id": 8,
        "slug": "condicional-si-entonces",
        "title": "Condicional Si - Entonces",
        "titleEs": "Estructura Condicional Simple (Si ... Entonces)",
        "category": "Estructuras Condicionales y Toma de Decisiones",
        "categorySlug": "condicionales",
        "categoryIcon": "cpu",
        "difficulty": "Principiante",
        "summary": "Bifurcación simple del flujo de ejecución basada en el cumplimiento de una condición booleana.",
        "originalExpl": "La estructura condicional 'Si ... Entonces ... FinSi' evalúa una condición lógica. Si es verdadera, ejecuta las instrucciones dentro del bloque; si es falsa, las salta por completo.",
        "basicExpl": {
            "title": "La Encrucijada del Camino",
            "content": "Hasta ahora el código se ejecutaba como una línea recta. El condicional 'Si' es como una bifurcación en el camino: solo tomas el desvío si se cumple una regla específica.",
            "keyPoints": [
                "Sintaxis: Si <condicion> Entonces ... FinSi.",
                "Si la condición es Falsa, el bloque interior se ignora.",
                "Las instrucciones internas deben ir sangradas (con indentación) para facilitar la lectura."
            ]
        },
        "intermediateExpl": {
            "title": "Diagrama de Flujo (Rombo de Decisión)",
            "content": "En un diagrama de flujo, el condicional se representa con un rombo con dos salidas: Sí (True) y No (False).",
            "traceTable": [
                {"paso": 1, "instruccion": "temperatura <- 38", "accion": "Asigna 38 a temperatura"},
                {"paso": 2, "instruccion": "Si temperatura > 37.5 Entonces", "accion": "Evalúa 38 > 37.5 = VERDADERO"},
                {"paso": 3, "instruccion": "Escribir \"Alerta: Tienes fiebre.\"", "accion": "Se ejecuta el bloque interno"},
                {"paso": 4, "instruccion": "FinSi", "accion": "Continúa el flujo normal del programa"}
            ],
            "memoryConcepts": [
                "Las variables evaluadas en la condición no cambian de valor por el simple hecho de ser comparadas."
            ]
        },
        "expertExpl": {
            "title": "Predicción de Ramificaciones en la CPU (Branch Prediction)",
            "content": "Los procesadores modernos ejecutan instrucciones especulativamente mediante la unidad de predicción de saltos (Branch Predictor). Si el procesador predice erróneamente qué rama tomará el 'Si', debe vaciar el pipeline de instrucciones (Branch Misprediction Penalty).",
            "complexity": "O(1) para la evaluación de la rama.",
            "realWorldUse": "Validaciones de seguridad, control de límites y comprobación de precondiciones."
        },
        "code": """// Condicional simple: Se ejecuta únicamente cuando la condición es Verdadera.
Algoritmo CondicionalSimple
	Definir calificacion Como Real
	calificacion <- 4.2

	Escribir "Calificación obtenida: ", calificacion

	// Condicional simple
	Si calificacion >= 3.0 Entonces
		Escribir "¡Felicitaciones! Has aprobado la asignatura."
	FinSi

	Escribir "Proceso de evaluación concluido."
FinAlgoritmo
""",
        "output": """*** Ejecución Iniciada ***
Calificación obtenida: 4.2
¡Felicitaciones! Has aprobado la asignatura.
Proceso de evaluación concluido.
*** Ejecución Finalizada ***
""",
        "evaluation": {
            "task": "Escribe un algoritmo llamado 'ControlVelocidad' que declare 'velocidad' Como Entero con valor 95. Si velocidad > 80, imprime 'Exceso de velocidad detectado'.",
            "starterCode": """Algoritmo ControlVelocidad
	Definir velocidad Como Entero
	velocidad <- 95
	// Evalúa la condición aquí
	
FinAlgoritmo
""",
            "testRunner": "Si velocidad > 80 Entonces",
            "solution": """Algoritmo ControlVelocidad
	Definir velocidad Como Entero
	velocidad <- 95
	Si velocidad > 80 Entonces
		Escribir "Exceso de velocidad detectado"
	FinSi
FinAlgoritmo
""",
            "solutionExplanation": "Usamos 'Si velocidad > 80 Entonces' para imprimir el mensaje solo cuando la velocidad supere el límite permitido."
        },
        "externalLinks": [
            {
                "title": "Manual PSeInt: Estructura Si-Entonces",
                "url": "https://pseint.sourceforge.net/",
                "description": "Documentación oficial de la bifurcación condicional en PSeInt.",
                "type": "Manual Oficial"
            }
        ]
    },

    {
        "id": 9,
        "slug": "condicional-si-sino",
        "title": "Condicional Si - Sino",
        "titleEs": "Bifurcación Doble (Si ... Sino)",
        "category": "Estructuras Condicionales y Toma de Decisiones",
        "categorySlug": "condicionales",
        "categoryIcon": "cpu",
        "difficulty": "Principiante",
        "summary": "Toma de decisiones con camino alternativo garantizado mediante la cláusula 'Sino'.",
        "originalExpl": "La cláusula 'Sino' se ejecuta cuando la condición del 'Si' es Falsa, garantizando que exactamente una de las dos ramas de instrucciones se ejecutará en cada corrida.",
        "basicExpl": {
            "title": "El Plan B en tu Algoritmo",
            "content": "Si está lloviendo, llevas paraguas. SINO, llevas gafas de sol. No puedes hacer ambas cosas al mismo tiempo; una excluye a la otra.",
            "keyPoints": [
                "Sintaxis: Si <condicion> Entonces <rama 1> Sino <rama 2> FinSi.",
                "Nunca se ejecutan ambas ramas en la misma corrida.",
                "Cubre el 100% de los casos posibles de una condición binaria."
            ]
        },
        "intermediateExpl": {
            "title": "Prueba de Escritorio de Ambas Ramas",
            "content": "Al probar algoritmos con Si-Sino, se deben ejecutar pruebas con datos que activen tanto el camino del Si como el del Sino.",
            "traceTable": [
                {"caso": "saldo >= monto", "saldo": 500, "monto": 200, "resultado": "Retiro exitoso (Rama Si)"},
                {"caso": "saldo < monto", "saldo": 100, "monto": 200, "resultado": "Fondos insuficientes (Rama Sino)"}
            ],
            "memoryConcepts": [
                "El flujo de control selecciona una sola rama y salta directamente a FinSi una vez concluida."
            ]
        },
        "expertExpl": {
            "title": "Optimización de Código y Cláusulas de Guarda",
            "content": "En desarrollo profesional (por ejemplo en Go), se prefiere usar 'cláusulas de guarda' (early return) para manejar primero los casos de error y evitar anidar bloques 'else' excesivamente profundos (Arrow Anti-Pattern).",
            "complexity": "O(1) en tiempo.",
            "realWorldUse": "Autenticación de contraseñas (válida vs errónea), procesamiento de pagos y validación de formularios."
        },
        "code": """// Bifurcación condicional doble con alternativas mutuamente excluyentes.
Algoritmo CondicionalSiSino
	Definir edad Como Entero
	edad <- 16

	Escribir "Edad de la persona: ", edad, " años"

	Si edad >= 18 Entonces
		Escribir "Estado: Es mayor de edad. Acceso concedido."
	Sino
		Escribir "Estado: Es menor de edad. Acceso denegado."
	FinSi

	Escribir "Fin de la verificación de acceso."
FinAlgoritmo
""",
        "output": """*** Ejecución Iniciada ***
Edad de la persona: 16 años
Estado: Es menor de edad. Acceso denegado.
Fin de la verificación de acceso.
*** Ejecución Finalizada ***
""",
        "evaluation": {
            "task": "Escribe un algoritmo llamado 'ParOImpar' que declare un entero 'numero'=7. Si (numero MOD 2 = 0) imprime 'Es par', sino imprime 'Es impar'.",
            "starterCode": """Algoritmo ParOImpar
	Definir numero Como Entero
	numero <- 7
	// Implementa Si-Sino aquí
	
FinAlgoritmo
""",
            "testRunner": "Sino",
            "solution": """Algoritmo ParOImpar
	Definir numero Como Entero
	numero <- 7
	Si numero MOD 2 = 0 Entonces
		Escribir "Es par"
	Sino
		Escribir "Es impar"
	FinSi
FinAlgoritmo
""",
            "solutionExplanation": "El residuo de 7 dividido 2 es 1 (distinto de 0), por lo que el programa entra a la rama Sino imprimiendo 'Es impar'."
        },
        "externalLinks": [
            {
                "title": "Wikipedia: Sentencia Condicional",
                "url": "https://es.wikipedia.org/wiki/Sentencia_condicional",
                "description": "Estructuras de selección en ciencias de la computación.",
                "type": "Referencia"
            }
        ]
    },

    {
        "id": 10,
        "slug": "condicionales-anidados",
        "title": "Condicionales Anidados",
        "titleEs": "Condicionales Anidados y Múltiples Rangos",
        "category": "Estructuras Condicionales y Toma de Decisiones",
        "categorySlug": "condicionales",
        "categoryIcon": "cpu",
        "difficulty": "Intermedio",
        "summary": "Estructuración de condicionales dentro de otros condicionales para clasificar múltiples categorías o rangos numéricos.",
        "originalExpl": "Un condicional anidado es aquel que se encuentra dentro del bloque 'Entonces' o 'Sino' de otro condicional previo, permitiendo construir árboles de decisión complejos.",
        "basicExpl": {
            "title": "Decisiones Dentro de Decisiones",
            "content": "Imagina clasificar las notas de un examen: Excelente, Bueno, Regular o Reprobado. Como hay más de 2 opciones, necesitas varias preguntas encadenadas.",
            "keyPoints": [
                "Cada 'Si' debe tener su correspondiente 'FinSi'.",
                "Cuida la indentación (sangría) para no confundir qué 'Sino' pertenece a qué 'Si'.",
                "Se evalúan en orden secuencial hasta encontrar la primera coincidencia verdadera."
            ]
        },
        "intermediateExpl": {
            "title": "Árbol de Decisión y Rango de Valores",
            "content": "Permite clasificar valores continuos en categorías discretas.",
            "traceTable": [
                {"rango": "nota >= 4.5", "categoria": "Excelente"},
                {"rango": "nota >= 3.5 Y nota < 4.5", "categoria": "Sobresaliente"},
                {"rango": "nota >= 3.0 Y nota < 3.5", "categoria": "Aceptable"},
                {"rango": "nota < 3.0", "categoria": "Insuficiente"}
            ],
            "memoryConcepts": [
                "Un anidamiento excesivamente profundo (más de 3 o 4 niveles) deteriora la legibilidad del algoritmo (Complejidad Ciclomática alta)."
            ]
        },
        "expertExpl": {
            "title": "Complejidad Ciclomática de McCabe",
            "content": "La complejidad ciclomática mide la cantidad de caminos independientes a través del código fuente. Cada 'Si' anidado incrementa esta métrica en 1. En ingeniería de software se recomienda mantener la complejidad por debajo de 10 mediante refactorización o tablas de decisión.",
            "complexity": "O(k) donde k es el número de ramas jerárquicas evaluadas en el peor caso.",
            "realWorldUse": "Lógica de tarificación según tramos impositivos (brackets), categorización de clientes VIP y scoring crediticio."
        },
        "code": """// Clasificación de notas mediante condicionales anidados en cascada.
Algoritmo CondicionalesAnidados
	Definir nota Como Real
	nota <- 3.8

	Escribir "Nota del estudiante: ", nota

	Si nota >= 4.5 Entonces
		Escribir "Desempeño: Excelente (Aprobado con honores)"
	Sino
		Si nota >= 3.5 Entonces
			Escribir "Desempeño: Bueno (Aprobado)"
		Sino
			Si nota >= 3.0 Entonces
				Escribir "Desempeño: Regular (Aprobado en el límite)"
			Sino
				Escribir "Desempeño: Deficiente (Reprobado)"
			FinSi
		FinSi
	FinSi
FinAlgoritmo
""",
        "output": """*** Ejecución Iniciada ***
Nota del estudiante: 3.8
Desempeño: Bueno (Aprobado)
*** Ejecución Finalizada ***
""",
        "evaluation": {
            "task": "Escribe un algoritmo llamado 'SignoNumero' con un entero 'x'=0. Si x > 0 imprime 'Positivo', sino Si x < 0 imprime 'Negativo', sino imprime 'Cero'.",
            "starterCode": """Algoritmo SignoNumero
	Definir x Como Entero
	x <- 0
	// Implementa la clasificación de signo aquí
	
FinAlgoritmo
""",
            "testRunner": "Si x > 0 Entonces",
            "solution": """Algoritmo SignoNumero
	Definir x Como Entero
	x <- 0
	Si x > 0 Entonces
		Escribir "Positivo"
	Sino
		Si x < 0 Entonces
			Escribir "Negativo"
		Sino
			Escribir "Cero"
		FinSi
	FinSi
FinAlgoritmo
""",
            "solutionExplanation": "El algoritmo evalúa primero si es mayor a cero, luego menor a cero, y la rama final Sino cubre exactamente el valor neutro cero."
        },
        "externalLinks": [
            {
                "title": "Complejidad Ciclomática en Wikipedia",
                "url": "https://es.wikipedia.org/wiki/Complejidad_ciclom%C3%A1tica",
                "description": "Métrica de ingeniería de software para cuantificar la complejidad de bifurcaciones lógicas.",
                "type": "Ingeniería de Software"
            }
        ]
    }
]
