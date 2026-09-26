const PSEINT_CATEGORIES = [
  {
    "id": "fundamentos",
    "name": "Fundamentos y Variables",
    "icon": "terminal"
  },
  {
    "id": "operadores",
    "name": "Operadores y Expresiones",
    "icon": "zap"
  },
  {
    "id": "condicionales",
    "name": "Estructuras Condicionales",
    "icon": "git-branch"
  },
  {
    "id": "bucles",
    "name": "Estructuras Repetitivas",
    "icon": "repeat"
  },
  {
    "id": "modularizacion",
    "name": "Modularización y Subprocesos",
    "icon": "cpu"
  },
  {
    "id": "arreglos-vectores",
    "name": "Arreglos Unidimensionales (Vectores)",
    "icon": "layers"
  },
  {
    "id": "arreglos-matrices",
    "name": "Arreglos Bidimensionales (Matrices)",
    "icon": "grid"
  },
  {
    "id": "cadenas-algoritmos",
    "name": "Cadenas y Algoritmos Aplicados",
    "icon": "code"
  }
];

const PSEINT_TOPICS = [
  {
    "id": 1,
    "slug": "hola-mundo",
    "title": "Hola Mundo",
    "titleEs": "Hola Mundo en PSeInt",
    "category": "Fundamentos y Variables",
    "categorySlug": "fundamentos",
    "categoryIcon": "terminal",
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
        {
          "paso": 1,
          "instruccion": "Algoritmo HolaMundo",
          "accion": "Inicia el flujo del programa"
        },
        {
          "paso": 2,
          "instruccion": "Escribir \"¡Hola, Mundo desde PSeInt!\"",
          "accion": "Imprime texto en stdout"
        },
        {
          "paso": 3,
          "instruccion": "FinAlgoritmo",
          "accion": "Finaliza la ejecución con código de salida 0"
        }
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
    "code": "// Nuestro primer algoritmo canónico en PSeInt.\n// Imprime un saludo de bienvenida en la consola.\nAlgoritmo HolaMundo\n\t// La instrucción 'Escribir' muestra texto en la pantalla\n\tEscribir \"¡Hola, Mundo desde PSeInt!\"\n\tEscribir \"Bienvenido al curso profesional de Lógica de Programación.\"\nFinAlgoritmo\n",
    "output": "*** Ejecución Iniciada ***\n¡Hola, Mundo desde PSeInt!\nBienvenido al curso profesional de Lógica de Programación.\n*** Ejecución Finalizada ***\n",
    "evaluation": {
      "task": "Escribe un algoritmo llamado 'SaludoPersonalizado' que imprima exactamente 'Aprendiendo lógica en PSeInt'.",
      "starterCode": "Algoritmo SaludoPersonalizado\n\t// Escribe tu instrucción aquí\n\t\nFinAlgoritmo\n",
      "testRunner": "Escribir \"Aprendiendo lógica en PSeInt\"",
      "solution": "Algoritmo SaludoPersonalizado\n\tEscribir \"Aprendiendo lógica en PSeInt\"\nFinAlgoritmo\n",
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
    "category": "Fundamentos y Variables",
    "categorySlug": "fundamentos",
    "categoryIcon": "terminal",
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
        {
          "paso": 1,
          "instruccion": "Definir edad Como Entero",
          "accion": "Reserva espacio de número entero"
        },
        {
          "paso": 2,
          "instruccion": "Definir precio Como Real",
          "accion": "Reserva espacio para punto flotante"
        },
        {
          "paso": 3,
          "instruccion": "Definir esMayor Como Logico",
          "accion": "Reserva un flag booleano (1 bit / 1 byte)"
        }
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
    "code": "// Demostración de los 5 tipos de datos primitivos en PSeInt.\nAlgoritmo TiposDeDatos\n\tDefinir edad Como Entero\n\tDefinir promedio Como Real\n\tDefinir inicial Como Caracter\n\tDefinir nombre Como Cadena\n\tDefinir activo Como Logico\n\n\tedad <- 22\n\tpromedio <- 9.75\n\tinicial <- 'A'\n\tnombre <- \"Ana Morales\"\n\tactivo <- Verdadero\n\n\tEscribir \"Nombre: \", nombre\n\tEscribir \"Inicial: \", inicial\n\tEscribir \"Edad: \", edad, \" años\"\n\tEscribir \"Promedio académico: \", promedio\n\tEscribir \"¿Estado activo?: \", activo\nFinAlgoritmo\n",
    "output": "*** Ejecución Iniciada ***\nNombre: Ana Morales\nInicial: A\nEdad: 22 años\nPromedio académico: 9.75\n¿Estado activo?: VERDADERO\n*** Ejecución Finalizada ***\n",
    "evaluation": {
      "task": "Define una variable llamada 'temperatura' de tipo Real, asígnale el valor 36.5 e imprímela con 'Escribir temperatura'.",
      "starterCode": "Algoritmo EvaluacionTipos\n\t// Declara y asigna la variable temperatura\n\t\nFinAlgoritmo\n",
      "testRunner": "Definir temperatura Como Real",
      "solution": "Algoritmo EvaluacionTipos\n\tDefinir temperatura Como Real\n\ttemperatura <- 36.5\n\tEscribir temperatura\nFinAlgoritmo\n",
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
    "category": "Fundamentos y Variables",
    "categorySlug": "fundamentos",
    "categoryIcon": "terminal",
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
        {
          "paso": 1,
          "instruccion": "x <- 10",
          "accion": "Asigna 10 a la variable x (x=10)"
        },
        {
          "paso": 2,
          "instruccion": "y <- 20",
          "accion": "Asigna 20 a la variable y (x=10, y=20)"
        },
        {
          "paso": 3,
          "instruccion": "x <- x + y",
          "accion": "Calcula 10 + 20 y sobreescribe x con 30 (x=30, y=20)"
        }
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
    "code": "// Declaración de variables y mutación de estado con el operador '<-'.\nAlgoritmo VariablesYAsignacion\n\tDefinir totalPuntos Como Entero\n\tDefinir multiplicador Como Entero\n\n\t// Asignación inicial\n\ttotalPuntos <- 100\n\tmultiplicador <- 2\n\tEscribir \"Puntos iniciales: \", totalPuntos\n\n\t// Mutación usando el valor anterior\n\ttotalPuntos <- totalPuntos * multiplicador\n\tEscribir \"Puntos duplicados: \", totalPuntos\n\n\t// Suma acumulativa\n\ttotalPuntos <- totalPuntos + 50\n\tEscribir \"Puntos finales con bono: \", totalPuntos\nFinAlgoritmo\n",
    "output": "*** Ejecución Iniciada ***\nPuntos iniciales: 100\nPuntos duplicados: 200\nPuntos finales con bono: 250\n*** Ejecución Finalizada ***\n",
    "evaluation": {
      "task": "Escribe un algoritmo llamado 'Intercambio' que declare dos enteros 'a' y 'b', asigne a=5 y b=10, intercambie sus valores usando una variable auxiliar 'temp', e imprima 'a=' seguido del valor de a y 'b=' con el valor de b.",
      "starterCode": "Algoritmo Intercambio\n\tDefinir a, b, temp Como Entero\n\ta <- 5\n\tb <- 10\n\t// Realiza el intercambio aquí\n\t\nFinAlgoritmo\n",
      "testRunner": "temp <- a",
      "solution": "Algoritmo Intercambio\n\tDefinir a, b, temp Como Entero\n\ta <- 5\n\tb <- 10\n\ttemp <- a\n\ta <- b\n\tb <- temp\n\tEscribir \"a=\", a\n\tEscribir \"b=\", b\nFinAlgoritmo\n",
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
    "category": "Fundamentos y Variables",
    "categorySlug": "fundamentos",
    "categoryIcon": "terminal",
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
        {
          "paso": 1,
          "instruccion": "Escribir \"Ingresa tu edad:\"",
          "accion": "Imprime prompt en pantalla"
        },
        {
          "paso": 2,
          "instruccion": "Leer edad",
          "accion": "Espera entrada del usuario (ej: 25) y lo asigna a edad"
        },
        {
          "paso": 3,
          "instruccion": "Escribir \"El próximo año tendrás: \", edad + 1",
          "accion": "Evalúa 25 + 1 = 26 e imprime"
        }
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
    "code": "// Ejemplo de lectura interactiva de datos desde el teclado.\nAlgoritmo LecturaDeDatos\n\tDefinir nombreUsuario Como Cadena\n\tDefinir anioNacimiento, anioActual, edadCalculada Como Entero\n\n\tanioActual <- 2026\n\n\t// Solicitamos el nombre\n\tEscribir \"Por favor, ingresa tu nombre:\"\n\tLeer nombreUsuario\n\n\t// Solicitamos el año de nacimiento\n\tEscribir \"Ingresa tu año de nacimiento (ej: 2000):\"\n\tLeer anioNacimiento\n\n\t// Procesamos la información\n\tedadCalculada <- anioActual - anioNacimiento\n\n\t// Mostramos el resultado\n\tEscribir \"Hola \", nombreUsuario, \", en el año \", anioActual, \" tienes aproximadamente \", edadCalculada, \" años.\"\nFinAlgoritmo\n",
    "output": "*** Ejecución Iniciada ***\nPor favor, ingresa tu nombre:\n> Carlos\nIngresa tu año de nacimiento (ej: 2000):\n> 1998\nHola Carlos, en el año 2026 tienes aproximadamente 28 años.\n*** Ejecución Finalizada ***\n",
    "evaluation": {
      "task": "Escribe un algoritmo llamado 'Duplicador' que defina una variable entera 'num', la lea del teclado con 'Leer num' e imprima el doble con 'Escribir num * 2'.",
      "starterCode": "Algoritmo Duplicador\n\tDefinir num Como Entero\n\t// Lee num e imprime su doble\n\t\nFinAlgoritmo\n",
      "testRunner": "Leer num",
      "solution": "Algoritmo Duplicador\n\tDefinir num Como Entero\n\tLeer num\n\tEscribir num * 2\nFinAlgoritmo\n",
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
    "category": "Fundamentos y Variables",
    "categorySlug": "fundamentos",
    "categoryIcon": "terminal",
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
        {
          "paso": 1,
          "instruccion": "TASA_IVA <- 0.19",
          "accion": "Establece el factor de impuesto"
        },
        {
          "paso": 2,
          "instruccion": "precioBase <- 1000",
          "accion": "Define el valor base del producto"
        },
        {
          "paso": 3,
          "instruccion": "impuesto <- precioBase * TASA_IVA",
          "accion": "Calcula 190.0 de impuesto"
        }
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
    "code": "// Uso de constantes simuladas mediante convención de nombres en mayúsculas.\nAlgoritmo ConstantesYConvenciones\n\t// Definición de constantes\n\tDefinir PI_VALOR, TASA_IVA Como Real\n\tDefinir VELOCIDAD_LUZ Como Entero\n\n\t// Asignación única inicial\n\tPI_VALOR <- 3.14159265\n\tTASA_IVA <- 0.19\n\tVELOCIDAD_LUZ <- 299792458 // en metros por segundo\n\n\tDefinir radio, areaCirculo Como Real\n\tradio <- 5.0\n\tareaCirculo <- PI_VALOR * (radio ^ 2)\n\n\tEscribir \"Radio: \", radio, \" cm\"\n\tEscribir \"Área del círculo: \", areaCirculo, \" cm²\"\n\tEscribir \"Tasa impositiva aplicada: \", (TASA_IVA * 100), \"%\"\nFinAlgoritmo\n",
    "output": "*** Ejecución Iniciada ***\nRadio: 5 cm\nÁrea del círculo: 78.53981625 cm²\nTasa impositiva aplicada: 19%\n*** Ejecución Finalizada ***\n",
    "evaluation": {
      "task": "Escribe un algoritmo llamado 'CalculoDescuento' que defina la constante PORCENTAJE_DESCUENTO Como Real asignándole 0.20, una variable precio=500 y calcule el precioFinal restando el descuento.",
      "starterCode": "Algoritmo CalculoDescuento\n\tDefinir PORCENTAJE_DESCUENTO, precio, precioFinal Como Real\n\t// Escribe tu código aquí\n\t\nFinAlgoritmo\n",
      "testRunner": "PORCENTAJE_DESCUENTO <- 0.20",
      "solution": "Algoritmo CalculoDescuento\n\tDefinir PORCENTAJE_DESCUENTO, precio, precioFinal Como Real\n\tPORCENTAJE_DESCUENTO <- 0.20\n\tprecio <- 500\n\tprecioFinal <- precio - (precio * PORCENTAJE_DESCUENTO)\n\tEscribir \"Precio final: \", precioFinal\nFinAlgoritmo\n",
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
    "category": "Operadores y Expresiones",
    "categorySlug": "operadores",
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
        {
          "expresion": "10 / 4",
          "resultado": "2.5 (División decimal)"
        },
        {
          "expresion": "10 MOD 4",
          "resultado": "2 (Residuo: 10 = 4*2 + 2)"
        },
        {
          "expresion": "2 + 3 * 4",
          "resultado": "14 (Multiplicación tiene prioridad)"
        },
        {
          "expresion": "(2 + 3) * 4",
          "resultado": "20 (Paréntesis alteran la prioridad)"
        }
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
    "code": "// Demostración completa de operadores aritméticos y orden de precedencia.\nAlgoritmo OperadoresAritmeticos\n\tDefinir a, b Como Entero\n\ta <- 17\n\tb <- 5\n\n\tEscribir \"Valores: a = \", a, \", b = \", b\n\tEscribir \"Suma (a + b) = \", a + b\n\tEscribir \"Resta (a - b) = \", a - b\n\tEscribir \"Multiplicación (a * b) = \", a * b\n\tEscribir \"División (a / b) = \", a / b\n\tEscribir \"Residuo Módulo (a MOD b) = \", a MOD b\n\tEscribir \"Potenciación (b ^ 3) = \", b ^ 3\n\n\t// Precedencia\n\tDefinir res1, res2 Como Real\n\tres1 <- 10 + 5 * 2\n\tres2 <- (10 + 5) * 2\n\tEscribir \"Sin paréntesis (10 + 5 * 2) = \", res1\n\tEscribir \"Con paréntesis ((10 + 5) * 2) = \", res2\nFinAlgoritmo\n",
    "output": "*** Ejecución Iniciada ***\nValores: a = 17, b = 5\nSuma (a + b) = 22\nResta (a - b) = 12\nMultiplicación (a * b) = 85\nDivisión (a / b) = 3.4\nResiduo Módulo (a MOD b) = 2\nPotenciación (b ^ 3) = 125\nSin paréntesis (10 + 5 * 2) = 20\nCon paréntesis ((10 + 5) * 2) = 30\n*** Ejecución Finalizada ***\n",
    "evaluation": {
      "task": "Escribe un algoritmo llamado 'EsPar' que declare una variable entera 'n', le asigne el valor 14 y muestre con 'Escribir' el residuo de dividir n entre 2 usando el operador MOD.",
      "starterCode": "Algoritmo EsPar\n\tDefinir n Como Entero\n\tn <- 14\n\t// Imprime n MOD 2\n\t\nFinAlgoritmo\n",
      "testRunner": "n MOD 2",
      "solution": "Algoritmo EsPar\n\tDefinir n Como Entero\n\tn <- 14\n\tEscribir n MOD 2\nFinAlgoritmo\n",
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
    "category": "Operadores y Expresiones",
    "categorySlug": "operadores",
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
        {
          "A": "V",
          "B": "V",
          "A Y B": "VERDADERO",
          "A O B": "VERDADERO"
        },
        {
          "A": "V",
          "B": "F",
          "A Y B": "FALSO",
          "A O B": "VERDADERO"
        },
        {
          "A": "F",
          "B": "V",
          "A Y B": "FALSO",
          "A O B": "VERDADERO"
        },
        {
          "A": "F",
          "B": "F",
          "A Y B": "FALSO",
          "A O B": "FALSO"
        }
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
    "code": "// Operadores relacionales de comparación y operadores lógicos booleanos.\nAlgoritmo OperadoresRelacionalesLogicos\n\tDefinir edad Como Entero\n\tDefinir tienePermiso, tieneCedula Como Logico\n\tDefinir puedeEntrar, esFinDeSemana, tieneCupon Como Logico\n\n\tedad <- 20\n\ttieneCedula <- Verdadero\n\ttienePermiso <- Falso\n\n\t// Comparaciones relacionales\n\tEscribir \"¿Es mayor de edad (edad >= 18)?: \", (edad >= 18)\n\tEscribir \"¿Edad es exactamente 20?: \", (edad = 20)\n\tEscribir \"¿Edad es distinta de 0?: \", (edad <> 0)\n\n\t// Operadores lógicos\n\t// Para entrar al club: Debe tener >= 18 Y tener cédula\n\tpuedeEntrar <- (edad >= 18) Y tieneCedula\n\tEscribir \"¿Puede entrar al club (Y)?: \", puedeEntrar\n\n\t// Para descuento: Ser fin de semana O tener cupón\n\tesFinDeSemana <- Falso\n\ttieneCupon <- Verdadero\n\tEscribir \"¿Aplica descuento (O)?: \", (esFinDeSemana O tieneCupon)\n\n\t// Negación\n\tEscribir \"Inversión lógica de permiso con NO: \", (NO tienePermiso)\nFinAlgoritmo\n",
    "output": "*** Ejecución Iniciada ***\n¿Es mayor de edad (edad >= 18)?: VERDADERO\n¿Edad es exactamente 20?: VERDADERO\n¿Edad es distinta de 0?: VERDADERO\n¿Puede entrar al club (Y)?: VERDADERO\n¿Aplica descuento (O)?: VERDADERO\nInversión lógica de permiso con NO: VERDADERO\n*** Ejecución Finalizada ***\n",
    "evaluation": {
      "task": "Escribe un algoritmo llamado 'RangoValido' que declare una variable 'nota' Como Real con valor 8.5, y muestre con 'Escribir' si la nota está entre 0 y 10 usando: (nota >= 0) Y (nota <= 10).",
      "starterCode": "Algoritmo RangoValido\n\tDefinir nota Como Real\n\tnota <- 8.5\n\t// Imprime si está en el rango [0, 10]\n\t\nFinAlgoritmo\n",
      "testRunner": "(nota >= 0) Y (nota <= 10)",
      "solution": "Algoritmo RangoValido\n\tDefinir nota Como Real\n\tnota <- 8.5\n\tEscribir (nota >= 0) Y (nota <= 10)\nFinAlgoritmo\n",
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
    "category": "Estructuras Condicionales",
    "categorySlug": "condicionales",
    "categoryIcon": "git-branch",
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
        {
          "paso": 1,
          "instruccion": "temperatura <- 38",
          "accion": "Asigna 38 a temperatura"
        },
        {
          "paso": 2,
          "instruccion": "Si temperatura > 37.5 Entonces",
          "accion": "Evalúa 38 > 37.5 = VERDADERO"
        },
        {
          "paso": 3,
          "instruccion": "Escribir \"Alerta: Tienes fiebre.\"",
          "accion": "Se ejecuta el bloque interno"
        },
        {
          "paso": 4,
          "instruccion": "FinSi",
          "accion": "Continúa el flujo normal del programa"
        }
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
    "code": "// Condicional simple: Se ejecuta únicamente cuando la condición es Verdadera.\nAlgoritmo CondicionalSimple\n\tDefinir calificacion Como Real\n\tcalificacion <- 4.2\n\n\tEscribir \"Calificación obtenida: \", calificacion\n\n\t// Condicional simple\n\tSi calificacion >= 3.0 Entonces\n\t\tEscribir \"¡Felicitaciones! Has aprobado la asignatura.\"\n\tFinSi\n\n\tEscribir \"Proceso de evaluación concluido.\"\nFinAlgoritmo\n",
    "output": "*** Ejecución Iniciada ***\nCalificación obtenida: 4.2\n¡Felicitaciones! Has aprobado la asignatura.\nProceso de evaluación concluido.\n*** Ejecución Finalizada ***\n",
    "evaluation": {
      "task": "Escribe un algoritmo llamado 'ControlVelocidad' que declare 'velocidad' Como Entero con valor 95. Si velocidad > 80, imprime 'Exceso de velocidad detectado'.",
      "starterCode": "Algoritmo ControlVelocidad\n\tDefinir velocidad Como Entero\n\tvelocidad <- 95\n\t// Evalúa la condición aquí\n\t\nFinAlgoritmo\n",
      "testRunner": "Si velocidad > 80 Entonces",
      "solution": "Algoritmo ControlVelocidad\n\tDefinir velocidad Como Entero\n\tvelocidad <- 95\n\tSi velocidad > 80 Entonces\n\t\tEscribir \"Exceso de velocidad detectado\"\n\tFinSi\nFinAlgoritmo\n",
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
    "category": "Estructuras Condicionales",
    "categorySlug": "condicionales",
    "categoryIcon": "git-branch",
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
        {
          "caso": "saldo >= monto",
          "saldo": 500,
          "monto": 200,
          "resultado": "Retiro exitoso (Rama Si)"
        },
        {
          "caso": "saldo < monto",
          "saldo": 100,
          "monto": 200,
          "resultado": "Fondos insuficientes (Rama Sino)"
        }
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
    "code": "// Bifurcación condicional doble con alternativas mutuamente excluyentes.\nAlgoritmo CondicionalSiSino\n\tDefinir edad Como Entero\n\tedad <- 16\n\n\tEscribir \"Edad de la persona: \", edad, \" años\"\n\n\tSi edad >= 18 Entonces\n\t\tEscribir \"Estado: Es mayor de edad. Acceso concedido.\"\n\tSino\n\t\tEscribir \"Estado: Es menor de edad. Acceso denegado.\"\n\tFinSi\n\n\tEscribir \"Fin de la verificación de acceso.\"\nFinAlgoritmo\n",
    "output": "*** Ejecución Iniciada ***\nEdad de la persona: 16 años\nEstado: Es menor de edad. Acceso denegado.\nFin de la verificación de acceso.\n*** Ejecución Finalizada ***\n",
    "evaluation": {
      "task": "Escribe un algoritmo llamado 'ParOImpar' que declare un entero 'numero'=7. Si (numero MOD 2 = 0) imprime 'Es par', sino imprime 'Es impar'.",
      "starterCode": "Algoritmo ParOImpar\n\tDefinir numero Como Entero\n\tnumero <- 7\n\t// Implementa Si-Sino aquí\n\t\nFinAlgoritmo\n",
      "testRunner": "Sino",
      "solution": "Algoritmo ParOImpar\n\tDefinir numero Como Entero\n\tnumero <- 7\n\tSi numero MOD 2 = 0 Entonces\n\t\tEscribir \"Es par\"\n\tSino\n\t\tEscribir \"Es impar\"\n\tFinSi\nFinAlgoritmo\n",
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
    "category": "Estructuras Condicionales",
    "categorySlug": "condicionales",
    "categoryIcon": "git-branch",
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
        {
          "rango": "nota >= 4.5",
          "categoria": "Excelente"
        },
        {
          "rango": "nota >= 3.5 Y nota < 4.5",
          "categoria": "Sobresaliente"
        },
        {
          "rango": "nota >= 3.0 Y nota < 3.5",
          "categoria": "Aceptable"
        },
        {
          "rango": "nota < 3.0",
          "categoria": "Insuficiente"
        }
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
    "code": "// Clasificación de notas mediante condicionales anidados en cascada.\nAlgoritmo CondicionalesAnidados\n\tDefinir nota Como Real\n\tnota <- 3.8\n\n\tEscribir \"Nota del estudiante: \", nota\n\n\tSi nota >= 4.5 Entonces\n\t\tEscribir \"Desempeño: Excelente (Aprobado con honores)\"\n\tSino\n\t\tSi nota >= 3.5 Entonces\n\t\t\tEscribir \"Desempeño: Bueno (Aprobado)\"\n\t\tSino\n\t\t\tSi nota >= 3.0 Entonces\n\t\t\t\tEscribir \"Desempeño: Regular (Aprobado en el límite)\"\n\t\t\tSino\n\t\t\t\tEscribir \"Desempeño: Deficiente (Reprobado)\"\n\t\t\tFinSi\n\t\tFinSi\n\tFinSi\nFinAlgoritmo\n",
    "output": "*** Ejecución Iniciada ***\nNota del estudiante: 3.8\nDesempeño: Bueno (Aprobado)\n*** Ejecución Finalizada ***\n",
    "evaluation": {
      "task": "Escribe un algoritmo llamado 'SignoNumero' con un entero 'x'=0. Si x > 0 imprime 'Positivo', sino Si x < 0 imprime 'Negativo', sino imprime 'Cero'.",
      "starterCode": "Algoritmo SignoNumero\n\tDefinir x Como Entero\n\tx <- 0\n\t// Implementa la clasificación de signo aquí\n\t\nFinAlgoritmo\n",
      "testRunner": "Si x > 0 Entonces",
      "solution": "Algoritmo SignoNumero\n\tDefinir x Como Entero\n\tx <- 0\n\tSi x > 0 Entonces\n\t\tEscribir \"Positivo\"\n\tSino\n\t\tSi x < 0 Entonces\n\t\t\tEscribir \"Negativo\"\n\t\tSino\n\t\t\tEscribir \"Cero\"\n\t\tFinSi\n\tFinSi\nFinAlgoritmo\n",
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
  },
  {
    "id": 11,
    "slug": "condicional-multiple-segun",
    "title": "Estructura Según (Switch)",
    "titleEs": "Selección Múltiple con 'Según ... Hacer'",
    "category": "Estructuras Condicionales",
    "categorySlug": "condicionales",
    "categoryIcon": "git-branch",
    "difficulty": "Intermedio",
    "summary": "Manejo de múltiples opciones discretas mediante la estructura 'Segun ... Hacer ... De Otro Modo'.",
    "originalExpl": "La estructura 'Segun' evalúa una variable y ejecuta el bloque de código asociado al valor coincidente. Es el equivalente directo de la sentencia 'switch/case' en C, Java, Go y JavaScript.",
    "basicExpl": {
      "title": "El Menú de Opciones",
      "content": "Imagina un cajero automático o un menú telefónico: 'Presione 1 para consultar saldo, 2 para transferir, 3 para salir'. En vez de escribir muchos Si-Sino seguidos, 'Segun' organiza los casos de forma limpia y ordenada.",
      "keyPoints": [
        "Sintaxis: Segun <variable> Hacer Caso 1: ... Caso 2: ... De Otro Modo: ... FinSegun.",
        "'De Otro Modo' captura cualquier valor que no coincida con los casos anteriores (como el 'default').",
        "Es ideal para menús de opciones y códigos de estado numéricos o de caracteres."
      ]
    },
    "intermediateExpl": {
      "title": "Tabla de Saltos (Jump Table)",
      "content": "Los compiladores optimizan 'switch/Segun' mediante una tabla de saltos en memoria.",
      "traceTable": [
        {
          "opcion": 1,
          "ejecuta": "Bloque Caso 1",
          "salta": "FinSegun"
        },
        {
          "opcion": 2,
          "ejecuta": "Bloque Caso 2",
          "salta": "FinSegun"
        },
        {
          "opcion": 99,
          "ejecuta": "Bloque De Otro Modo",
          "salta": "FinSegun"
        }
      ],
      "memoryConcepts": [
        "A diferencia de C, en PSeInt no se requiere la instrucción 'break'; cada caso termina automáticamente al iniciar el siguiente."
      ]
    },
    "expertExpl": {
      "title": "Optimización O(1) vs O(n)",
      "content": "Mientras que una cascada de 'Si-Sino' requiere hasta N comparaciones en el peor caso ($O(n)$), un 'Segun' denso puede compilarse como una tabla de saltos indexada en memoria con complejidad de tiempo constante $O(1)$.",
      "complexity": "O(1) con tabla de saltos o O(log n) con árbol binario de casos.",
      "realWorldUse": "Enrutadores de peticiones HTTP, máquinas de estados finitos (FSM) y procesadores de comandos."
    },
    "code": "// Estructura de selección múltiple 'Segun' para simular un menú de opciones.\nAlgoritmo CondicionalSegun\n\tDefinir opcion Como Entero\n\topcion <- 2\n\n\tEscribir \"=== MENÚ PRINCIPAL ===\"\n\tEscribir \"1. Consultar Saldo\"\n\tEscribir \"2. Realizar Transferencia\"\n\tEscribir \"3. Salir del Sistema\"\n\tEscribir \"Opción seleccionada: \", opcion\n\n\tSegun opcion Hacer\n\t\t1:\n\t\t\tEscribir \"Acción: Su saldo disponible actual es de $1,500.00 USD.\"\n\t\t2:\n\t\t\tEscribir \"Acción: Ingrese la cuenta de destino y el monto a transferir.\"\n\t\t3:\n\t\t\tEscribir \"Acción: Gracias por usar nuestros servicios. Sesión finalizada.\"\n\t\tDe Otro Modo:\n\t\t\tEscribir \"Error: La opción ingresada no es válida. Intente nuevamente.\"\n\tFinSegun\nFinAlgoritmo\n",
    "output": "*** Ejecución Iniciada ***\n=== MENÚ PRINCIPAL ===\n1. Consultar Saldo\n2. Realizar Transferencia\n3. Salir del Sistema\nOpción seleccionada: 2\nAcción: Ingrese la cuenta de destino y el monto a transferir.\n*** Ejecución Finalizada ***\n",
    "evaluation": {
      "task": "Escribe un algoritmo llamado 'DiaSemana' con un entero 'dia'=3. Usa 'Segun dia Hacer' para imprimir 'Lunes' si es 1, 'Martes' si es 2, 'Miercoles' si es 3, y 'Otro' De Otro Modo.",
      "starterCode": "Algoritmo DiaSemana\n\tDefinir dia Como Entero\n\tdia <- 3\n\t// Implementa Segun aquí\n\t\nFinAlgoritmo\n",
      "testRunner": "Segun dia Hacer",
      "solution": "Algoritmo DiaSemana\n\tDefinir dia Como Entero\n\tdia <- 3\n\tSegun dia Hacer\n\t\t1:\n\t\t\tEscribir \"Lunes\"\n\t\t2:\n\t\t\tEscribir \"Martes\"\n\t\t3:\n\t\t\tEscribir \"Miercoles\"\n\t\tDe Otro Modo:\n\t\t\tEscribir \"Otro\"\n\tFinSegun\nFinAlgoritmo\n",
      "solutionExplanation": "El programa evalúa dia=3, salta directamente al caso 3 e imprime 'Miercoles'."
    },
    "externalLinks": [
      {
        "title": "Manual PSeInt: Estructura Segun",
        "url": "https://pseint.sourceforge.net/",
        "description": "Especificación de la estructura de casos en PSeInt.",
        "type": "Manual Oficial"
      }
    ]
  },
  {
    "id": 12,
    "slug": "cortocircuito-logico",
    "title": "Cortocircuito Lógico",
    "titleEs": "Evaluación de Cortocircuito y Condiciones Seguras",
    "category": "Estructuras Condicionales",
    "categorySlug": "condicionales",
    "categoryIcon": "git-branch",
    "difficulty": "Intermedio",
    "summary": "Cómo la evaluación de cortocircuito previene errores en tiempo de ejecución (como división por cero o punteros nulos).",
    "originalExpl": "En la evaluación lógica de cortocircuito, si el primer operando de un 'Y' es Falso, el segundo operando no se evalúa porque el resultado ya es Falso de forma garantizada. Igualmente, si el primer operando de un 'O' es Verdadero, el segundo no se evalúa.",
    "basicExpl": {
      "title": "Ahorrando Trabajo Innecesario",
      "content": "Si te dicen: 'Para pasar debes tener boleto Y llegar a tiempo', y ni siquiera tienes boleto, no importa si llegas a tiempo o tarde; ya estás descalificado.",
      "keyPoints": [
        "Falso Y <cualquier cosa> = siempre FALSO.",
        "Verdadero O <cualquier cosa> = siempre VERDADERO.",
        "Permite proteger operaciones peligrosas (como dividir por un número solo si es distinto de cero)."
      ]
    },
    "intermediateExpl": {
      "title": "Guardas Lógicas de Protección",
      "content": "Evita errores de división por cero o desbordamiento de índices en vectores.",
      "traceTable": [
        {
          "expresion": "(denominador <> 0) Y (100 / denominador > 2)",
          "denominador": 0,
          "resultado": "FALSO (Evita división por cero)"
        },
        {
          "expresion": "(esAdmin) O (verificarPermisoLento())",
          "esAdmin": "VERDADERO",
          "resultado": "VERDADERO (Evita llamada pesada)"
        }
      ],
      "memoryConcepts": [
        "PSeInt evalúa las expresiones de izquierda a derecha."
      ]
    },
    "expertExpl": {
      "title": "Impacto en Rendimiento y Efectos Secundarios",
      "content": "Si la segunda parte de una condición lógica ejecuta una función con efectos secundarios (Side Effects, como escribir en disco o mutar variables), el cortocircuito provocará que dicha función nunca se ejecute. Esto es un error frecuente en código de principiantes.",
      "complexity": "O(1) para evaluación rápida con salto.",
      "realWorldUse": "Prevención de NullPointerExceptions / Nil Dereferences en producción: `if obj != nil && obj.IsValid()`."
    },
    "code": "// Demostración del principio de cortocircuito lógico para evitar división por cero.\nAlgoritmo CortocircuitoLogico\n\tDefinir totalAlumnos, totalGrupos Como Entero\n\tDefinir divisionSegura Como Logico\n\n\ttotalAlumnos <- 45\n\ttotalGrupos <- 0 // Peligro: división por cero si intentamos calcular 45 / 0\n\n\tEscribir \"Total de alumnos: \", totalAlumnos\n\tEscribir \"Total de grupos: \", totalGrupos\n\n\t// Protección mediante cortocircuito:\n\t// Como (totalGrupos > 0) es Falso, la segunda parte (totalAlumnos / totalGrupos) NO se ejecuta\n\tSi totalGrupos > 0 Y (totalAlumnos / totalGrupos) >= 15 Entonces\n\t\tEscribir \"Los grupos están balanceados y con suficiente aforo.\"\n\tSino\n\t\tEscribir \"No se pueden calcular grupos porque el total de grupos es cero o insuficiente.\"\n\tFinSi\nFinAlgoritmo\n",
    "output": "*** Ejecución Iniciada ***\nTotal de alumnos: 45\nTotal de grupos: 0\nNo se pueden calcular grupos porque el total de grupos es cero o insuficiente.\n*** Ejecución Finalizada ***\n",
    "evaluation": {
      "task": "Escribe un algoritmo llamado 'ProteccionCero' con denominador=0. Usa un 'Si denominador <> 0 Entonces Escribir 10/denominador Sino Escribir \"Indefinido\" FinSi'.",
      "starterCode": "Algoritmo ProteccionCero\n\tDefinir denominador Como Entero\n\tdenominador <- 0\n\t// Implementa la validación aquí\n\t\nFinAlgoritmo\n",
      "testRunner": "denominador <> 0",
      "solution": "Algoritmo ProteccionCero\n\tDefinir denominador Como Entero\n\tdenominador <- 0\n\tSi denominador <> 0 Entonces\n\t\tEscribir 10 / denominador\n\tSino\n\t\tEscribir \"Indefinido\"\n\tFinSi\nFinAlgoritmo\n",
      "solutionExplanation": "La guarda condicional previene que el programa intente dividir entre cero, mostrando 'Indefinido'."
    },
    "externalLinks": [
      {
        "title": "Wikipedia: Evaluación de Cortocircuito",
        "url": "https://es.wikipedia.org/wiki/Evaluaci%C3%B3n_de_cortocircuito",
        "description": "Comportamiento semántico de operadores booleanos en lenguajes de programación.",
        "type": "Referencia"
      }
    ]
  },
  {
    "id": 13,
    "slug": "ciclo-mientras",
    "title": "Ciclo Mientras (While)",
    "titleEs": "Bucle Precondicional 'Mientras ... Hacer'",
    "category": "Estructuras Repetitivas",
    "categorySlug": "bucles",
    "categoryIcon": "repeat",
    "difficulty": "Principiante",
    "summary": "Repetición controlada por condición previa. Se ejecuta de 0 a N veces mientras la condición sea Verdadera.",
    "originalExpl": "El ciclo 'Mientras ... Hacer ... FinMientras' evalúa su condición antes de cada iteración. Si es falsa desde el inicio, el cuerpo del bucle nunca llega a ejecutarse.",
    "basicExpl": {
      "title": "La Máquina de Repetición Condicional",
      "content": "¿Te imaginas escribir la misma instrucción 100 veces a mano? Los ciclos permiten que la computadora repita una tarea automáticamente hasta que se cumpla una meta.",
      "keyPoints": [
        "Sintaxis: Mientras <condicion> Hacer ... FinMientras.",
        "Debe existir una instrucción dentro del bucle que modifique la condición para evitar un bucle infinito.",
        "Ideal cuando no sabes de antemano cuántas vueltas exactas dará el bucle."
      ]
    },
    "intermediateExpl": {
      "title": "El Peligro del Bucle Infinito",
      "content": "Si olvidas incrementar la variable contadora, la condición siempre será Verdadera y el programa se colgará consumiendo el 100% de la CPU.",
      "traceTable": [
        {
          "iteracion": 1,
          "contador": 1,
          "condicion": "1 <= 3 (V)",
          "imprime": "1",
          "nuevoContador": 2
        },
        {
          "iteracion": 2,
          "contador": 2,
          "condicion": "2 <= 3 (V)",
          "imprime": "2",
          "nuevoContador": 3
        },
        {
          "iteracion": 3,
          "contador": 3,
          "condicion": "3 <= 3 (V)",
          "imprime": "3",
          "nuevoContador": 4
        },
        {
          "iteracion": 4,
          "contador": 4,
          "condicion": "4 <= 3 (F)",
          "imprime": "Salida",
          "nuevoContador": 4
        }
      ],
      "memoryConcepts": [
        "La variable de control debe inicializarse antes de entrar al bucle."
      ]
    },
    "expertExpl": {
      "title": "Análisis de Invariante de Bucle y Condición de Parada",
      "content": "Para demostrar formalmente la corrección de un algoritmo iterativo, se utiliza el 'Invariante de Bucle' (Loop Invariant): una propiedad que es verdadera antes de la primera iteración, se mantiene verdadera tras cada vuelta, y al terminar garantiza que el algoritmo resolvió el problema.",
      "complexity": "O(n) donde n es el número de iteraciones requeridas para falsar la condición.",
      "realWorldUse": "Bucle principal de eventos de un servidor (Event Loop), lectura de archivos hasta EOF y polling de sensores."
    },
    "code": "// Ciclo 'Mientras': Cuenta progresiva del 1 al 5 controlando la variable contadora.\nAlgoritmo CicloMientras\n\tDefinir contador Como Entero\n\n\t// 1. Inicialización de la variable de control\n\tcontador <- 1\n\n\tEscribir \"Iniciando conteo con ciclo Mientras:\"\n\n\t// 2. Condición de permanencia\n\tMientras contador <= 5 Hacer\n\t\tEscribir \"Iteración número: \", contador\n\n\t\t// 3. Paso de avance (crucial para evitar bucle infinito)\n\t\tcontador <- contador + 1\n\tFinMientras\n\n\tEscribir \"Ciclo finalizado con éxito. Valor final de contador: \", contador\nFinAlgoritmo\n",
    "output": "*** Ejecución Iniciada ***\nIniciando conteo con ciclo Mientras:\nIteración número: 1\nIteración número: 2\nIteración número: 3\nIteración número: 4\nIteración número: 5\nCiclo finalizado con éxito. Valor final de contador: 6\n*** Ejecución Finalizada ***\n",
    "evaluation": {
      "task": "Escribe un algoritmo llamado 'CuentaRegresiva' que inicialice 'i'=3 y use un 'Mientras i > 0 Hacer' para imprimir i y luego decrementar con 'i <- i - 1'.",
      "starterCode": "Algoritmo CuentaRegresiva\n\tDefinir i Como Entero\n\ti <- 3\n\t// Escribe el bucle Mientras aquí\n\t\nFinAlgoritmo\n",
      "testRunner": "Mientras i > 0 Hacer",
      "solution": "Algoritmo CuentaRegresiva\n\tDefinir i Como Entero\n\ti <- 3\n\tMientras i > 0 Hacer\n\t\tEscribir i\n\t\ti <- i - 1\n\tFinMientras\nFinAlgoritmo\n",
      "solutionExplanation": "El bucle se ejecuta para i=3, i=2 e i=1. Cuando i pasa a ser 0, la condición falla y el bucle termina limpiamente."
    },
    "externalLinks": [
      {
        "title": "Manual PSeInt: Bucle Mientras",
        "url": "https://pseint.sourceforge.net/",
        "description": "Especificación de la estructura cíclica Mientras en PSeInt.",
        "type": "Manual Oficial"
      }
    ]
  },
  {
    "id": 14,
    "slug": "ciclo-repetir-hasta",
    "title": "Ciclo Repetir - Hasta Que",
    "titleEs": "Bucle Postcondicional 'Repetir ... Hasta Que'",
    "category": "Estructuras Repetitivas",
    "categorySlug": "bucles",
    "categoryIcon": "repeat",
    "difficulty": "Intermedio",
    "summary": "Bucle que garantiza al menos una ejecución, evaluando la condición de salida al final de cada vuelta.",
    "originalExpl": "El ciclo 'Repetir ... Hasta Que <condicion>' ejecuta el bloque de código primero y evalúa la condición al final. A diferencia de 'do-while' en C (que repite mientras sea verdadera), en PSeInt el bucle se detiene cuando la condición se vuelve VERDADERA.",
    "basicExpl": {
      "title": "Ejecutar Primero, Preguntar Después",
      "content": "Piensa en ingresar tu PIN en el cajero: primero escribes el código al menos una vez, y el cajero te repite la pregunta HASTA QUE el código sea correcto.",
      "keyPoints": [
        "Se ejecuta siempre AL MENOS una vez.",
        "Se detiene cuando la condición es VERDADERA (Hasta Que sea verdad).",
        "Es la estructura perfecta para validar entradas de usuario."
      ]
    },
    "intermediateExpl": {
      "title": "Patrón Canónico de Validación de Entradas",
      "content": "Garantiza que el programa no continúe hasta que el usuario suministre un dato dentro del rango permitido.",
      "traceTable": [
        {
          "vuelta": 1,
          "ingreso": -5,
          "evaluacion": "(-5 > 0) = Falso",
          "accion": "Repite"
        },
        {
          "vuelta": 2,
          "ingreso": 0,
          "evaluacion": "(0 > 0) = Falso",
          "accion": "Repite"
        },
        {
          "vuelta": 3,
          "ingreso": 15,
          "evaluacion": "(15 > 0) = Verdadero",
          "accion": "Se detiene"
        }
      ],
      "memoryConcepts": [
        "No requiere inicializar la variable de control antes de entrar al bucle."
      ]
    },
    "expertExpl": {
      "title": "Equivalencia Semántica y Reestructuración de Bucles",
      "content": "Cualquier bucle 'Repetir-Hasta' puede transformarse en un bucle 'Mientras' duplicando la primera ejecución antes del ciclo o usando una bandera de inicialización. En optimizadores de compiladores (LLVM), los bucles 'do-while' suelen generar código ensamblador más compacto con un solo salto condicional al final.",
      "complexity": "O(intentos) dependiente de la interacción del usuario.",
      "realWorldUse": "Menús interactivos de consola, reintentos de conexión con backoff y validación de formularios."
    },
    "code": "// Validación de entrada con 'Repetir ... Hasta Que'.\n// Garantiza que la nota ingresada esté estrictamente entre 1 y 10.\nAlgoritmo CicloRepetirHasta\n\tDefinir calificacion Como Real\n\tDefinir intentos Como Entero\n\tintentos <- 0\n\n\tRepetir\n\t\tintentos <- intentos + 1\n\t\tEscribir \"Intento #\", intentos, \": Ingrese una calificación válida (1.0 a 10.0):\"\n\t\t// En una ejecución real interactiva usaríamos: Leer calificacion\n\t\t// Simulamos que en el intento 2 el usuario ingresa un valor correcto:\n\t\tSi intentos < 2 Entonces\n\t\t\tcalificacion <- -3.5 // Valor inválido\n\t\t\tEscribir \"Dato ingresado: \", calificacion, \" (Inválido)\"\n\t\tSino\n\t\t\tcalificacion <- 8.5  // Valor válido\n\t\t\tEscribir \"Dato ingresado: \", calificacion, \" (Correcto)\"\n\t\tFinSi\n\tHasta Que calificacion >= 1.0 Y calificacion <= 10.0\n\n\tEscribir \"Calificación aceptada con éxito en \", intentos, \" intentos: \", calificacion\nFinAlgoritmo\n",
    "output": "*** Ejecución Iniciada ***\nIntento #1: Ingrese una calificación válida (1.0 a 10.0):\nDato ingresado: -3.5 (Inválido)\nIntento #2: Ingrese una calificación válida (1.0 a 10.0):\nDato ingresado: 8.5 (Correcto)\nCalificación aceptada con éxito en 2 intentos: 8.5\n*** Ejecución Finalizada ***\n",
    "evaluation": {
      "task": "Escribe un algoritmo llamado 'BuclePostcondicion' que use 'Repetir' para incrementar 'n' (inicializado en 0) con 'n <- n + 1' e imprimir n, 'Hasta Que n = 3'.",
      "starterCode": "Algoritmo BuclePostcondicion\n\tDefinir n Como Entero\n\tn <- 0\n\t// Implementa Repetir-Hasta Que aquí\n\t\nFinAlgoritmo\n",
      "testRunner": "Hasta Que n = 3",
      "solution": "Algoritmo BuclePostcondicion\n\tDefinir n Como Entero\n\tn <- 0\n\tRepetir\n\t\tn <- n + 1\n\t\tEscribir n\n\tHasta Que n = 3\nFinAlgoritmo\n",
      "solutionExplanation": "El bucle se ejecuta 3 veces incrementando n a 1, 2 y 3. Al llegar a 3, la condición se cumple y sale del bucle."
    },
    "externalLinks": [
      {
        "title": "Manual PSeInt: Estructura Repetir",
        "url": "https://pseint.sourceforge.net/",
        "description": "Detalles del bucle postcondicional en PSeInt.",
        "type": "Manual Oficial"
      }
    ]
  },
  {
    "id": 15,
    "slug": "ciclo-para",
    "title": "Ciclo Para (For)",
    "titleEs": "Bucle Determinado con Contador 'Para ... Hasta'",
    "category": "Estructuras Repetitivas",
    "categorySlug": "bucles",
    "categoryIcon": "repeat",
    "difficulty": "Principiante",
    "summary": "Bucle iterativo con inicialización, límite superior y paso de incremento automático.",
    "originalExpl": "La estructura 'Para variable <- inicial Hasta final Con Paso incremento Hacer' maneja automáticamente el incremento y verificación de la variable contadora en cada ciclo.",
    "basicExpl": {
      "title": "El Bucle con Cuenta Automática",
      "content": "A diferencia del 'Mientras' donde debes recordar sumar 1 al contador manualmente, el 'Para' lo hace todo por ti. Es perfecto cuando sabes de antemano exactamente cuántas veces debe repetirse una tarea.",
      "keyPoints": [
        "Sintaxis: Para i <- 1 Hasta 10 Con Paso 1 Hacer ... FinPara.",
        "Si el paso es 1, la cláusula 'Con Paso 1' es opcional en PSeInt.",
        "El paso puede ser negativo para cuentas regresivas: 'Con Paso -1'."
      ]
    },
    "intermediateExpl": {
      "title": "Desenrollado y Modificación de la Variable de Control",
      "content": "Buena práctica: Nunca modifiques manualmente el valor de la variable contadora 'i' dentro del cuerpo de un bucle 'Para'.",
      "traceTable": [
        {
          "paso": "i=1",
          "imprime": "1",
          "incremento": "i pasa a 2"
        },
        {
          "paso": "i=2",
          "imprime": "2",
          "incremento": "i pasa a 3"
        },
        {
          "paso": "i=3",
          "imprime": "3",
          "incremento": "i supera el límite y sale"
        }
      ],
      "memoryConcepts": [
        "La variable de control existe en el ámbito del algoritmo y conserva su valor final tras salir del bucle."
      ]
    },
    "expertExpl": {
      "title": "Vectorización y Optimización de Bucles (Loop Unrolling)",
      "content": "En compiladores optimizadores de C, C++ y Go, los bucles 'for' con límites conocidos pueden ser desenrollados (Loop Unrolling) o vectorizados usando instrucciones SIMD (AVX, SSE) del procesador para ejecutar múltiples operaciones en paralelo por ciclo de reloj.",
      "complexity": "O(n) en tiempo y O(1) en espacio auxiliar.",
      "realWorldUse": "Recorrido de arreglos, procesamiento de píxeles en imágenes y algoritmos de Machine Learning."
    },
    "code": "// Ciclo 'Para' con incremento automático y paso negativo regresivo.\nAlgoritmo CicloPara\n\tDefinir i, suma Como Entero\n\n\tEscribir \"1. Conteo ascendente del 1 al 5:\"\n\tPara i <- 1 Hasta 5 Hacer\n\t\tEscribir \"Paso: \", i\n\tFinPara\n\n\tEscribir \"\"\n\tEscribir \"2. Conteo regresivo con paso negativo (Con Paso -1):\"\n\tPara i <- 5 Hasta 1 Con Paso -1 Hacer\n\t\tEscribir \"Cuenta regresiva: \", i\n\tFinPara\n\n\tEscribir \"\"\n\tEscribir \"3. Sumatoria de números del 1 al 10:\"\n\tsuma <- 0\n\tPara i <- 1 Hasta 10 Hacer\n\t\tsuma <- suma + i\n\tFinPara\n\tEscribir \"La sumatoria total es: \", suma\nFinAlgoritmo\n",
    "output": "*** Ejecución Iniciada ***\n1. Conteo ascendente del 1 al 5:\nPaso: 1\nPaso: 2\nPaso: 3\nPaso: 4\nPaso: 5\n\n2. Conteo regresivo con paso negativo (Con Paso -1):\nCuenta regresiva: 5\nCuenta regresiva: 4\nCuenta regresiva: 3\nCuenta regresiva: 2\nCuenta regresiva: 1\n\n3. Sumatoria de números del 1 al 10:\nLa sumatoria total es: 55\n*** Ejecución Finalizada ***\n",
    "evaluation": {
      "task": "Escribe un algoritmo llamado 'TablaDelTres' que use un 'Para i <- 1 Hasta 4 Hacer' para imprimir '3 x ' seguido de i, '=' y el resultado '3 * i'.",
      "starterCode": "Algoritmo TablaDelTres\n\tDefinir i Como Entero\n\t// Implementa el bucle Para aquí\n\t\nFinAlgoritmo\n",
      "testRunner": "Para i <- 1 Hasta 4",
      "solution": "Algoritmo TablaDelTres\n\tDefinir i Como Entero\n\tPara i <- 1 Hasta 4 Hacer\n\t\tEscribir \"3 x \", i, \" = \", 3 * i\n\tFinPara\nFinAlgoritmo\n",
      "solutionExplanation": "El ciclo Para itera desde 1 hasta 4 calculando automáticamente las multiplicaciones 3x1, 3x2, 3x3 y 3x4."
    },
    "externalLinks": [
      {
        "title": "Manual PSeInt: Estructura Para",
        "url": "https://pseint.sourceforge.net/",
        "description": "Referencia de la sintaxis del bucle Para en PSeInt.",
        "type": "Manual Oficial"
      }
    ]
  },
  {
    "id": 16,
    "slug": "bucles-anidados",
    "title": "Bucles Anidados",
    "titleEs": "Bucles Anidados y Complejidad Cuadrática",
    "category": "Estructuras Repetitivas",
    "categorySlug": "bucles",
    "categoryIcon": "repeat",
    "difficulty": "Intermedio",
    "summary": "Ciclos dentro de otros ciclos para recorrer dos dimensiones (filas y columnas) o generar combinaciones.",
    "originalExpl": "Un bucle anidado es un ciclo ubicado dentro del cuerpo de otro ciclo. Por cada iteración única del bucle exterior, el bucle interior completa todo su ciclo de repeticiones.",
    "basicExpl": {
      "title": "El Reloj y sus Manecillas",
      "content": "Imagina las manecillas de un reloj: la manecilla de los minutos debe dar 60 vueltas completas antes de que la manecilla de las horas avance una sola posición. El minutero es el bucle interno y la aguja de las horas es el bucle externo.",
      "keyPoints": [
        "Debes usar variables contadoras distintas para cada bucle (ej: 'i' para el exterior, 'j' para el interior).",
        "Si el bucle externo da M vueltas y el interno N vueltas, el código del centro se ejecutará M * N veces.",
        "Es la base para manipular matrices y tablas bidimensionales."
      ]
    },
    "intermediateExpl": {
      "title": "Seguimiento de Matriz de Iteración",
      "content": "Tabla que muestra cómo varían los índices i y j en un bucle 2x3.",
      "traceTable": [
        {
          "vuelta_ext": "i=1",
          "vuelta_int": "j=1",
          "combinacion": "(1, 1)"
        },
        {
          "vuelta_ext": "i=1",
          "vuelta_int": "j=2",
          "combinacion": "(1, 2)"
        },
        {
          "vuelta_ext": "i=1",
          "vuelta_int": "j=3",
          "combinacion": "(1, 3)"
        },
        {
          "vuelta_ext": "i=2",
          "vuelta_int": "j=1",
          "combinacion": "(2, 1)"
        },
        {
          "vuelta_ext": "i=2",
          "vuelta_int": "j=2",
          "combinacion": "(2, 2)"
        },
        {
          "vuelta_ext": "i=2",
          "vuelta_int": "j=3",
          "combinacion": "(2, 3)"
        }
      ],
      "memoryConcepts": [
        "El bucle interno debe reinicializarse por completo en cada paso del exterior."
      ]
    },
    "expertExpl": {
      "title": "Complejidad Temporal Cuadrática O(N²)",
      "content": "Los bucles dobles anidados sobre la misma entrada tienen una complejidad computacional de $O(N^2)$. Si $N=1,000$, se ejecutan 1,000,000 de operaciones. Si $N=100,000$, son 10,000 millones de operaciones, lo que puede congelar una aplicación. Por esto se buscan algoritmos más eficientes como $O(N \\log N)$.",
      "complexity": "O(N * M) en tiempo, comúnmente O(N²) si N = M.",
      "realWorldUse": "Algoritmos de ordenamiento clásico (Burbuja), procesamiento de imágenes (filas y columnas de píxeles) y renderizado 3D."
    },
    "code": "// Bucles anidados para generar una tabla de multiplicar completa (filas y columnas).\nAlgoritmo BuclesAnidados\n\tDefinir tabla, mult Como Entero\n\n\tEscribir \"=== TABLAS DE MULTIPLICAR DEL 1 AL 3 ===\"\n\n\t// Bucle exterior: controla qué tabla estamos imprimiendo\n\tPara tabla <- 1 Hasta 3 Hacer\n\t\tEscribir \"--- Tabla del \", tabla, \" ---\"\n\n\t\t// Bucle interior: calcula los multiplicadores del 1 al 4\n\t\tPara mult <- 1 Hasta 4 Hacer\n\t\t\tEscribir tabla, \" x \", mult, \" = \", (tabla * mult)\n\t\tFinPara\n\tFinPara\n\n\tEscribir \"Todas las tablas han sido generadas.\"\nFinAlgoritmo\n",
    "output": "*** Ejecución Iniciada ***\n=== TABLAS DE MULTIPLICAR DEL 1 AL 3 ===\n--- Tabla del 1 ---\n1 x 1 = 1\n1 x 2 = 2\n1 x 3 = 3\n1 x 4 = 4\n--- Tabla del 2 ---\n2 x 1 = 2\n2 x 2 = 4\n2 x 3 = 6\n2 x 4 = 8\n--- Tabla del 3 ---\n3 x 1 = 3\n3 x 2 = 6\n3 x 3 = 9\n3 x 4 = 12\nTodas las tablas han sido generadas.\n*** Ejecución Finalizada ***\n",
    "evaluation": {
      "task": "Escribe un algoritmo llamado 'CuadriculaCoordenadas' con dos bucles Para anidados: i de 1 a 2, y j de 1 a 2, imprimiendo 'Coord: ', i, ',', j.",
      "starterCode": "Algoritmo CuadriculaCoordenadas\n\tDefinir i, j Como Entero\n\t// Escribe los dos bucles anidados\n\t\nFinAlgoritmo\n",
      "testRunner": "Para j <- 1 Hasta 2",
      "solution": "Algoritmo CuadriculaCoordenadas\n\tDefinir i, j Como Entero\n\tPara i <- 1 Hasta 2 Hacer\n\t\tPara j <- 1 Hasta 2 Hacer\n\t\t\tEscribir \"Coord: \", i, \",\", j\n\t\tFinPara\n\tFinPara\nFinAlgoritmo\n",
      "solutionExplanation": "El bucle externo ejecuta i=1 generando (1,1) y (1,2), y luego i=2 generando (2,1) y (2,2)."
    },
    "externalLinks": [
      {
        "title": "Khan Academy: Bucles Anidados",
        "url": "https://es.khanacademy.org/computing/computer-programming",
        "description": "Visualización y aplicación de bucles anidados en algoritmia.",
        "type": "Educativo"
      }
    ]
  },
  {
    "id": 17,
    "slug": "contadores-y-acumuladores",
    "title": "Contadores y Acumuladores",
    "titleEs": "Patrones de Agregación: Conteo y Sumatorias",
    "category": "Estructuras Repetitivas",
    "categorySlug": "bucles",
    "categoryIcon": "repeat",
    "difficulty": "Principiante",
    "summary": "Patrones indispensables en algoritmia para contar eventos discretos y acumular cantidades variables.",
    "originalExpl": "Un contador se incrementa en una cantidad constante (c <- c + 1), mientras que un acumulador suma valores variables (acum <- acum + valor).",
    "basicExpl": {
      "title": "El Ábaco y la Alcancía",
      "content": "Un CONTADOR es como un taxímetro o un torniquete de metro: suma 1 por cada persona que pasa. Un ACUMULADOR es como una alcancía: a veces le metes una moneda de $10, luego una de $50 y luego una de $100.",
      "keyPoints": [
        "Regla de oro: SIEMPRE inicializa contadores y acumuladores en 0 antes del ciclo.",
        "Contador: variable <- variable + constante.",
        "Acumulador: variable <- variable + otraVariable.",
        "Promedio: Acumulador / Contador."
      ]
    },
    "intermediateExpl": {
      "title": "Cálculo de Promedios y Filtros",
      "content": "Combinar un contador y un acumulador permite calcular la media aritmética de cualquier conjunto de datos.",
      "traceTable": [
        {
          "paso": "Inicio",
          "contador": 0,
          "acumulador": 0
        },
        {
          "dato": 10,
          "contador": 1,
          "acumulador": 10
        },
        {
          "dato": 20,
          "contador": 2,
          "acumulador": 30
        },
        {
          "dato": 30,
          "contador": 3,
          "acumulador": 60
        },
        {
          "calculo": "promedio = 60 / 3 = 20.0",
          "contador": 3,
          "acumulador": 60
        }
      ],
      "memoryConcepts": [
        "Si olvidas inicializar en cero, la variable contendrá un valor indefinido o basura que corromperá el resultado final."
      ]
    },
    "expertExpl": {
      "title": "Patrón Map-Reduce y Agregación Distribuida",
      "content": "Los contadores y acumuladores son la base del paradigma 'MapReduce' utilizado por Google y Apache Spark para procesar Terabytes de datos en la nube. 'Map' filtra o transforma y 'Reduce' acumula y cuenta en clústeres masivos.",
      "complexity": "O(n) en tiempo lineal y O(1) en espacio.",
      "realWorldUse": "Cálculo de balances contables, analítica web (visitas totales) y métricas de rendimiento en microservicios."
    },
    "code": "// Demostración del uso combinado de Contador y Acumulador para calcular promedios.\nAlgoritmo ContadoresYAcumuladores\n\tDefinir totalAprobados, i Como Entero\n\tDefinir sumaNotas, notaActual, promedioGeneral Como Real\n\n\t// Inicialización obligatoria\n\ttotalAprobados <- 0 // Contador\n\tsumaNotas <- 0.0     // Acumulador\n\n\t// Simulamos procesar 4 calificaciones de estudiantes\n\tPara i <- 1 Hasta 4 Hacer\n\t\t// Simulamos notas: 4.5, 2.5, 3.8, 4.2\n\t\tSegun i Hacer\n\t\t\t1: notaActual <- 4.5\n\t\t\t2: notaActual <- 2.5\n\t\t\t3: notaActual <- 3.8\n\t\t\t4: notaActual <- 4.2\n\t\tFinSegun\n\n\t\t// Acumulamos la nota en la sumatoria total\n\t\tsumaNotas <- sumaNotas + notaActual\n\n\t\t// Contamos si el estudiante aprobó\n\t\tSi notaActual >= 3.0 Entonces\n\t\t\ttotalAprobados <- totalAprobados + 1\n\t\tFinSi\n\tFinPara\n\n\tpromedioGeneral <- sumaNotas / 4\n\n\tEscribir \"Total de notas procesadas: 4\"\n\tEscribir \"Suma total acumulada: \", sumaNotas\n\tEscribir \"Promedio general: \", promedioGeneral\n\tEscribir \"Estudiantes aprobados: \", totalAprobados\nFinAlgoritmo\n",
    "output": "*** Ejecución Iniciada ***\nTotal de notas procesadas: 4\nSuma total acumulada: 15\nPromedio general: 3.75\nEstudiantes aprobados: 3\n*** Ejecución Finalizada ***\n",
    "evaluation": {
      "task": "Escribe un algoritmo llamado 'AcumuladorSuma' que inicialice 'total'=0 y use un bucle Para de 1 a 5 para acumular los números en 'total <- total + i'. Al final imprime total.",
      "starterCode": "Algoritmo AcumuladorSuma\n\tDefinir i, total Como Entero\n\ttotal <- 0\n\t// Acumula la suma aquí\n\t\nFinAlgoritmo\n",
      "testRunner": "total <- total + i",
      "solution": "Algoritmo AcumuladorSuma\n\tDefinir i, total Como Entero\n\ttotal <- 0\n\tPara i <- 1 Hasta 5 Hacer\n\t\ttotal <- total + i\n\tFinPara\n\tEscribir total\nFinAlgoritmo\n",
      "solutionExplanation": "El acumulador realiza: 0+1=1, 1+2=3, 3+3=6, 6+4=10, 10+5=15. Imprime 15."
    },
    "externalLinks": [
      {
        "title": "Wikipedia: Acumulador en Computación",
        "url": "https://es.wikipedia.org/wiki/Acumulador_(inform%C3%A1tica)",
        "description": "Concepto teórico de acumulador en arquitectura y programación.",
        "type": "Referencia"
      }
    ]
  },
  {
    "id": 18,
    "slug": "centinelas-y-banderas",
    "title": "Centinelas y Banderas",
    "titleEs": "Control de Flujo con Variables Bandera y Centinelas",
    "category": "Estructuras Repetitivas",
    "categorySlug": "bucles",
    "categoryIcon": "repeat",
    "difficulty": "Intermedio",
    "summary": "Uso de centinelas (valores especiales de parada) y banderas booleanas (flags) para controlar bucles interactivos.",
    "originalExpl": "Un valor centinela es un valor especial no válido (como -1 o 0) que avisa al algoritmo que debe finalizar la lectura. Una bandera (flag) es una variable lógica que señala si un evento particular ya ocurrió.",
    "basicExpl": {
      "title": "La Bandera de Llegada y la Palabra Clave",
      "content": "Una bandera es como la bandera a cuadros en una carrera: comienza abajo (Falso), y en el momento en que el primer auto cruza la meta, se levanta (Verdadero). Un centinela es como gritar '¡Basta!' para detener un juego.",
      "keyPoints": [
        "Centinela: Un valor distinguible fuera del rango normal (ej: edad = -1 para salir).",
        "Bandera (Flag): Variable booleana que cambia de estado (Falso -> Verdadero) cuando se cumple una condición.",
        "Evita el uso de salidas forzadas bruscas y mantiene el código estructurado."
      ]
    },
    "intermediateExpl": {
      "title": "Detección de Existencia con Banderas",
      "content": "Muy útil para comprobar si al menos un elemento cumple una condición (ej: ¿hubo algún reprobado?).",
      "traceTable": [
        {
          "paso": "Inicio",
          "encontrado": "Falso"
        },
        {
          "dato": 10,
          "condicion": "10 < 0 (F)",
          "encontrado": "Falso"
        },
        {
          "dato": -4,
          "condicion": "-4 < 0 (V)",
          "encontrado": "VERDADERO (Se activa la bandera)"
        },
        {
          "dato": 15,
          "condicion": "Se mantiene en VERDADERO",
          "encontrado": "VERDADERO"
        }
      ],
      "memoryConcepts": [
        "Una bandera suele encenderse una vez y permanecer activa hasta el final del proceso."
      ]
    },
    "expertExpl": {
      "title": "Programación Asíncrona y Flags Atómicos",
      "content": "En sistemas concurrentes de producción (como en Go con canales `done` o atomic bools), las banderas se utilizan como señales de cancelación (`ctx.Done()`) para avisar a hilos o goroutines en segundo plano que deben detener su ejecución de manera ordenada (Graceful Shutdown).",
      "complexity": "O(n) para lectura hasta centinela.",
      "realWorldUse": "Cancelación de peticiones HTTP, detección de errores en pipelines de datos y fin de streams."
    },
    "code": "// Uso de valor centinela (-1) y variable bandera lógica (huboNotaBaja).\nAlgoritmo CentinelasYBanderas\n\tDefinir nota, suma Como Real\n\tDefinir totalNotas Como Entero\n\tDefinir huboNotaBaja Como Logico\n\n\t// Inicializaciones\n\tsuma <- 0\n\ttotalNotas <- 0\n\thuboNotaBaja <- Falso // Bandera lógica en estado inicial\n\n\tEscribir \"=== REGISTRO CON CENTINELA (-1 PARA TERMINAR) ===\"\n\n\t// Simulamos lecturas sucesivas con parada en centinela -1\n\t// Serie de valores simulados: 4.5, 2.1, 4.0, -1\n\tDefinir paso Como Entero\n\tPara paso <- 1 Hasta 4 Hacer\n\t\tSegun paso Hacer\n\t\t\t1: nota <- 4.5\n\t\t\t2: nota <- 2.1\n\t\t\t3: nota <- 4.0\n\t\t\t4: nota <- -1 // Centinela de parada\n\t\tFinSegun\n\n\t\t// Verificamos si llegamos al centinela\n\t\tSi nota = -1 Entonces\n\t\t\tEscribir \"Centinela detectado (-1). Finalizando lectura.\"\n\t\tSino\n\t\t\tEscribir \"Nota procesada: \", nota\n\t\t\tsuma <- suma + nota\n\t\t\ttotalNotas <- totalNotas + 1\n\n\t\t\t// Activamos la bandera si detectamos una nota menor a 3.0\n\t\t\tSi nota < 3.0 Entonces\n\t\t\t\thuboNotaBaja <- Verdadero\n\t\t\tFinSi\n\t\tFinSi\n\tFinPara\n\n\tEscribir \"Total de notas válidas: \", totalNotas\n\tEscribir \"Promedio: \", (suma / totalNotas)\n\tEscribir \"¿Se detectó al menos una nota baja (< 3.0)?: \", huboNotaBaja\nFinAlgoritmo\n",
    "output": "*** Ejecución Iniciada ***\n=== REGISTRO CON CENTINELA (-1 PARA TERMINAR) ===\nNota procesada: 4.5\nNota procesada: 2.1\nNota procesada: 4\nCentinela detectado (-1). Finalizando lectura.\nTotal de notas válidas: 3\nPromedio: 3.5333333333\n¿Se detectó al menos una nota baja (< 3.0)?: VERDADERO\n*** Ejecución Finalizada ***\n",
    "evaluation": {
      "task": "Escribe un algoritmo llamado 'BanderaEncontrado' que declare 'encontrado' Como Logico inicializado en Falso. Si un número num=7 es igual a 7, pon 'encontrado <- Verdadero' e imprime 'encontrado'.",
      "starterCode": "Algoritmo BanderaEncontrado\n\tDefinir num Como Entero\n\tDefinir encontrado Como Logico\n\tnum <- 7\n\tencontrado <- Falso\n\t// Activa la bandera si num es 7\n\t\nFinAlgoritmo\n",
      "testRunner": "encontrado <- Verdadero",
      "solution": "Algoritmo BanderaEncontrado\n\tDefinir num Como Entero\n\tDefinir encontrado Como Logico\n\tnum <- 7\n\tencontrado <- Falso\n\tSi num = 7 Entonces\n\t\tencontrado <- Verdadero\n\tFinSi\n\tEscribir encontrado\nFinAlgoritmo\n",
      "solutionExplanation": "La bandera booleana cambia su estado a Verdadero cuando la condición de búsqueda coincide exitosamente."
    },
    "externalLinks": [
      {
        "title": "Wikipedia: Valor Centinela",
        "url": "https://es.wikipedia.org/wiki/Valor_centinela",
        "description": "Definición y aplicaciones del valor centinela en ciencias de la computación.",
        "type": "Referencia"
      }
    ]
  },
  {
    "id": 19,
    "slug": "subprocesos-sin-retorno",
    "title": "Subprocesos (Procedimientos)",
    "titleEs": "Modularización con Subprocesos sin Retorno",
    "category": "Modularización y Subprocesos",
    "categorySlug": "modularizacion",
    "categoryIcon": "cpu",
    "difficulty": "Intermedio",
    "summary": "División de un programa grande en módulos reutilizables mediante 'SubProceso ... FinSubProceso' (procedimientos).",
    "originalExpl": "Un SubProceso (o Función sin retorno) es un bloque de código independiente con nombre propio que realiza una tarea específica y puede invocarse múltiples veces desde el algoritmo principal.",
    "basicExpl": {
      "title": "Divide y Vencerás",
      "content": "No intentes hacer todo el trabajo en un solo bloque gigante de 500 líneas. Divide tu algoritmo en pequeñas piezas especializadas (como imprimir un encabezado o mostrar un menú), y llámalas cuando las necesites.",
      "keyPoints": [
        "Sintaxis: SubProceso NombreDelModulo(parametros) ... FinSubProceso.",
        "Evita la duplicación de código (Principio DRY: Don't Repeat Yourself).",
        "Hace que el algoritmo sea mucho más fácil de leer, probar y corregir."
      ]
    },
    "intermediateExpl": {
      "title": "Pila de Llamadas (Call Stack)",
      "content": "Cuando se invoca un subproceso, la CPU guarda la dirección de retorno en la pila de llamadas (Stack) y transfiere el control al subproceso.",
      "traceTable": [
        {
          "paso": 1,
          "modulo": "Algoritmo Principal",
          "accion": "Llama a 'ImprimirEncabezado'"
        },
        {
          "paso": 2,
          "modulo": "SubProceso ImprimirEncabezado",
          "accion": "Ejecuta las líneas del encabezado"
        },
        {
          "paso": 3,
          "modulo": "FinSubProceso",
          "accion": "Retorna exactamente a la línea siguiente en el principal"
        }
      ],
      "memoryConcepts": [
        "Los parámetros son variables locales que se crean al invocar el subproceso y se destruyen al finalizar."
      ]
    },
    "expertExpl": {
      "title": "Cohesión y Acoplamiento en Arquitectura de Software",
      "content": "Un buen diseño de software busca **Alta Cohesión** (cada subproceso hace una sola cosa bien definida) y **Bajo Acoplamiento** (los subprocesos dependen lo mínimo posible entre sí). Esto facilita el desarrollo en equipos grandes y la creación de bibliotecas.",
      "complexity": "O(1) para la sobrecarga de llamada a la función (frame push/pop).",
      "realWorldUse": "Funciones auxiliares de logging, formateo de datos y renderizado de componentes de interfaz."
    },
    "code": "// Definición e invocación de subprocesos modulares reutilizables.\n\n// Subproceso que imprime un separador gráfico decorativo\nSubProceso ImprimirSeparador(simbolo)\n\tDefinir k Como Entero\n\tPara k <- 1 Hasta 35 Hacer\n\t\tEscribir Sin Bajar simbolo\n\tFinPara\n\tEscribir \"\" // Salto de línea\nFinSubProceso\n\n// Subproceso con parámetros que muestra los datos de un usuario\nSubProceso MostrarFicha(nombre, rol, nivel)\n\tEscribir \"FICHA TÉCNICA DE USUARIO:\"\n\tEscribir \" - Nombre: \", nombre\n\tEscribir \" - Cargo: \", rol\n\tEscribir \" - Nivel de acceso: Nivel \", nivel\nFinSubProceso\n\n// Algoritmo principal que orquesta los subprocesos\nAlgoritmo SubprocesosSinRetorno\n\tImprimirSeparador(\"=\")\n\tMostrarFicha(\"Valeria Castro\", \"Ingeniera de Software\", 3)\n\tImprimirSeparador(\"=\")\n\tMostrarFicha(\"Diego Méndez\", \"Arquitecto Cloud\", 5)\n\tImprimirSeparador(\"=\")\nFinAlgoritmo\n",
    "output": "*** Ejecución Iniciada ***\n===================================\nFICHA TÉCNICA DE USUARIO:\n - Nombre: Valeria Castro\n - Cargo: Ingeniera de Software\n - Nivel de acceso: Nivel 3\n===================================\nFICHA TÉCNICA DE USUARIO:\n - Nombre: Diego Méndez\n - Cargo: Arquitecto Cloud\n - Nivel de acceso: Nivel 5\n===================================\n*** Ejecución Finalizada ***\n",
    "evaluation": {
      "task": "Escribe un algoritmo con un SubProceso llamado 'Saludar(nombre)' que imprima 'Hola, ', nombre. En el Algoritmo principal invócalo con Saludar(\"Lucas\").",
      "starterCode": "SubProceso Saludar(nombre)\n\t// Imprime el saludo\n\t\nFinSubProceso\n\nAlgoritmo PruebaSubproceso\n\t// Llama al subproceso con \"Lucas\"\n\t\nFinAlgoritmo\n",
      "testRunner": "SubProceso Saludar(nombre)",
      "solution": "SubProceso Saludar(nombre)\n\tEscribir \"Hola, \", nombre\nFinSubProceso\n\nAlgoritmo PruebaSubproceso\n\tSaludar(\"Lucas\")\nFinAlgoritmo\n",
      "solutionExplanation": "Declaramos el subproceso con el parámetro 'nombre' y lo invocamos desde el algoritmo principal pasándole el argumento literal \"Lucas\"."
    },
    "externalLinks": [
      {
        "title": "Manual PSeInt: Subprocesos y Funciones",
        "url": "https://pseint.sourceforge.net/",
        "description": "Cómo declarar e invocar subalgoritmos en PSeInt.",
        "type": "Manual Oficial"
      }
    ]
  },
  {
    "id": 20,
    "slug": "funciones-con-retorno",
    "title": "Funciones con Retorno",
    "titleEs": "Funciones con Valor Devuelto (Retorno)",
    "category": "Modularización y Subprocesos",
    "categorySlug": "modularizacion",
    "categoryIcon": "cpu",
    "difficulty": "Intermedio",
    "summary": "Subprocesos matemáticos y lógicos que calculan un resultado y lo devuelven al punto de invocación.",
    "originalExpl": "En PSeInt, una función con retorno se define con la sintaxis: 'SubProceso variableRetorno <- NombreFuncion(argumentos)'. Al finalizar, el valor de 'variableRetorno' es devuelto a quien la invocó.",
    "basicExpl": {
      "title": "La Máquina Procesadora de Resultados",
      "content": "Imagina una licuadora: le metes frutas (argumentos de entrada), la máquina trabaja adentro, y te entrega un vaso de jugo (valor de retorno). Puedes guardar ese jugo en la nevera o tomártelo de inmediato.",
      "keyPoints": [
        "Sintaxis: SubProceso res <- Calcular(a, b) ... res <- a + b ... FinSubProceso.",
        "La llamada a la función se puede usar dentro de una expresión o asignación: 'total <- Calcular(5, 3)'.",
        "Funciones Puras: Para los mismos argumentos de entrada, siempre devuelven el mismo resultado sin efectos secundarios."
      ]
    },
    "intermediateExpl": {
      "title": "Evaluación de Expresiones con Funciones",
      "content": "La llamada a una función es reemplazada por el valor que retorna durante la evaluación de la expresión.",
      "traceTable": [
        {
          "expresion": "hipotenusa <- CalcularHipotenusa(3, 4)",
          "accion": "Invoca función con a=3, b=4"
        },
        {
          "en_funcion": "h <- Raiz(3^2 + 4^2) = Raiz(9 + 16) = Raiz(25) = 5.0",
          "accion": "Calcula resultado"
        },
        {
          "retorno": "Devuelve 5.0 a hipotenusa",
          "resultado": "hipotenusa = 5.0"
        }
      ],
      "memoryConcepts": [
        "La variable de retorno debe asignarse antes de llegar a FinSubProceso."
      ]
    },
    "expertExpl": {
      "title": "Funciones Puras en Programación Funcional",
      "content": "Las funciones puras (Pure Functions) no dependen del estado global ni modifican variables externas. Son fáciles de probar mediante pruebas unitarias automatizadas (Unit Testing) y permiten optimizaciones de compilador como 'Memoization' y ejecución concurrente segura.",
      "complexity": "Dependiente de la complejidad interna del algoritmo de la función.",
      "realWorldUse": "Cálculo de impuestos, algoritmos criptográficos (hashing), compresión de datos y validaciones de negocio."
    },
    "code": "// Definición de funciones matemáticas puras que retornan un valor calculado.\n\n// Función que calcula el área de un triángulo\nSubProceso area <- CalcularAreaTriangulo(base, altura)\n\tDefinir area Como Real\n\tarea <- (base * altura) / 2\nFinSubProceso\n\n// Función que calcula el mayor entre dos números\nSubProceso mayor <- ObtenerMayor(n1, n2)\n\tDefinir mayor Como Entero\n\tSi n1 >= n2 Entonces\n\t\tmayor <- n1\n\tSino\n\t\tmayor <- n2\n\tFinSi\nFinSubProceso\n\nAlgoritmo FuncionesConRetorno\n\tDefinir b, h, resArea Como Real\n\tb <- 12.0\n\th <- 8.0\n\n\t// Invocación y captura del valor de retorno\n\tresArea <- CalcularAreaTriangulo(b, h)\n\tEscribir \"Área del triángulo (base \", b, \", altura \", h, \") = \", resArea\n\n\t// Uso directo del valor de retorno en una expresión de impresión\n\tEscribir \"El número mayor entre 45 y 89 es: \", ObtenerMayor(45, 89)\nFinAlgoritmo\n",
    "output": "*** Ejecución Iniciada ***\nÁrea del triángulo (base 12, altura 8) = 48\nEl número mayor entre 45 y 89 es: 89\n*** Ejecución Finalizada ***\n",
    "evaluation": {
      "task": "Escribe una función con retorno llamada 'res <- Cuadrado(x)' que retorne x * x. En el Algoritmo principal imprime el resultado de Cuadrado(5).",
      "starterCode": "SubProceso res <- Cuadrado(x)\n\t// Calcula y retorna el cuadrado\n\t\nFinSubProceso\n\nAlgoritmo PruebaFuncion\n\t// Imprime Cuadrado(5)\n\t\nFinAlgoritmo\n",
      "testRunner": "SubProceso res <- Cuadrado(x)",
      "solution": "SubProceso res <- Cuadrado(x)\n\tDefinir res Como Real\n\tres <- x * x\nFinSubProceso\n\nAlgoritmo PruebaFuncion\n\tEscribir Cuadrado(5)\nFinAlgoritmo\n",
      "solutionExplanation": "La función multiplica 5 * 5 = 25 y devuelve ese valor para ser impreso directamente por Escribir."
    },
    "externalLinks": [
      {
        "title": "Wikipedia: Función (Informática)",
        "url": "https://es.wikipedia.org/wiki/Funci%C3%B3n_(inform%C3%A1tica)",
        "description": "Fundamentos de subrutinas y funciones con valor de retorno.",
        "type": "Referencia"
      }
    ]
  },
  {
    "id": 21,
    "slug": "paso-por-valor",
    "title": "Paso de Parámetros por Valor",
    "titleEs": "Paso de Parámetros por Valor",
    "category": "Modularización y Subprocesos",
    "categorySlug": "modularizacion",
    "categoryIcon": "cpu",
    "difficulty": "Intermedio",
    "summary": "Comprende el mecanismo de paso por valor en subprocesos, donde se transfiere una copia aislada del dato sin alterar la variable original en la memoria del invocador.",
    "originalExpl": "En PSeInt y en las ciencias de la computación, el paso de parámetros por valor (`Por Valor`) es la forma predeterminada de comunicación de datos hacia un subproceso o función. Cuando una variable se pasa por valor, el entorno de ejecución crea una réplica exacta del contenido de la variable en una nueva celda de memoria asignada al marco de pila (stack frame) del subproceso. Cualquier modificación aritmética, reasignación o transformación que sufra el parámetro formal dentro del cuerpo del subproceso afectará únicamente a esa copia local transitoria. La variable original del algoritmo principal permanece completamente intacta e inmutable. Este principio es la base de la inmutabilidad funcional y previene efectos secundarios indeseados (side-effects) en sistemas modulares.",
    "basicExpl": {
      "analogies": "Imagina que tienes una hoja con un examen resuelto en tu escritorio y un compañero te pide verla. En lugar de darle tu hoja original, le entregas una fotocopia. Tu compañero puede escribir anotaciones, rayar la hoja con lápiz o equivocarse en su copia, pero tu hoja original sigue guardada en tu carpeta intacta y sin ninguna mancha.",
      "keyPoints": [
        "El paso por valor transfiere una fotocopia aislada del dato original.",
        "En PSeInt se indica explícitamente con la directiva 'Por Valor' o se asume por defecto si no se especifica.",
        "Las modificaciones internas mueren cuando el subproceso finaliza su ejecución.",
        "Evita que funciones secundarias alteren por error el estado del programa principal."
      ]
    },
    "intermediateExpl": "Tabla de traza de memoria (Prueba de Escritorio):\n1. Algoritmo Invocador: `saldoCuenta <- 1000`\n2. Invocación: `IntentarModificar(saldoCuenta)` -> Se crea en la pila el parámetro formal `montoCopia <- 1000`\n3. Dentro del Subproceso: `montoCopia <- montoCopia + 500` -> `montoCopia` vale 1500.\n4. Retorno: El subproceso termina y su memoria se libera.\n5. En Algoritmo Invocador: Se evalúa `saldoCuenta`. Valor resultante = 1000 (sin alteración).",
    "expertExpl": "A nivel de compiladores y arquitectura de computadoras, el paso por valor empuja el valor primitivo directamente en los registros del procesador (como RDI, RSI en x86_64) o en la pila de llamadas (call stack). En lenguajes como Go o C, todos los tipos básicos (enteros, flotantes, booleanos) se pasan estrictamente por valor copiando los bytes correspondientes. PSeInt refleja este comportamiento de bajo nivel al garantizar el aislamiento estricto de ámbitos de ejecución entre marcos de llamada.",
    "code": "// Algoritmo: Demostración de Paso de Parámetros Por Valor\nSubProceso ModificarCopia(Por Valor numeroCopia)\n    // Mostramos el valor inicial recibido en el parámetro formal\n    Escribir \">> [SubProceso] Valor recibido en copia:\", numeroCopia\n    \n    // Modificamos únicamente la copia local del subproceso\n    numeroCopia <- numeroCopia * 10\n    Escribir \">> [SubProceso] Valor alterado dentro del subproceso:\", numeroCopia\nFinSubProceso\n\nAlgoritmo DemostracionPasoPorValor\n    // Declaramos la variable original en el ámbito principal\n    Definir valorOriginal Como Entero\n    valorOriginal <- 42\n    \n    Escribir \"=== ANTES DE LA LLAMADA AL SUBPROCESO ===\"\n    Escribir \"Variable original en el Algoritmo Principal:\", valorOriginal\n    \n    // Invocamos el subproceso enviando la variable\n    Escribir \"\"\n    Escribir \"=== EJECUTANDO SUBPROCESO POR VALOR ===\"\n    ModificarCopia(valorOriginal)\n    \n    // Verificamos que la variable original no haya sufrido modificaciones\n    Escribir \"\"\n    Escribir \"=== DESPUÉS DE LA LLAMADA AL SUBPROCESO ===\"\n    Escribir \"Variable original en el Algoritmo Principal:\", valorOriginal\n    Escribir \"Conclusión: La variable principal permanece inmutable y protegida.\"\nFinAlgoritmo",
    "output": "=== ANTES DE LA LLAMADA AL SUBPROCESO ===\nVariable original en el Algoritmo Principal: 42\n\n=== EJECUTANDO SUBPROCESO POR VALOR ===\n>> [SubProceso] Valor recibido en copia: 42\n>> [SubProceso] Valor alterado dentro del subproceso: 420\n\n=== DESPUÉS DE LA LLAMADA AL SUBPROCESO ===\nVariable original en el Algoritmo Principal: 42\nConclusión: La variable principal permanece inmutable y protegida.",
    "evaluation": {
      "starterCode": "// Ejercicio: Implementa el subproceso 'AplicarDescuentoCopia' que reciba por valor\n// el precio de un producto y un porcentaje, calcule el precio descontado y lo muestre\n// en consola, demostrando que la variable original no se modifica.\nSubProceso AplicarDescuentoCopia(Por Valor precio, Por Valor porcentaje)\n    // Escribe aquí la lógica para calcular y mostrar el precio con descuento\nFinSubProceso\n\nAlgoritmo EvaluacionPasoPorValor\n    Definir precioBase Como Real\n    precioBase <- 200\n    AplicarDescuentoCopia(precioBase, 25)\n    Escribir \"Precio original verificado:\", precioBase\nFinAlgoritmo",
      "task": "Completa el cuerpo del subproceso 'AplicarDescuentoCopia' para que calcule el precio final restando el porcentaje y muestre en consola 'Precio con descuento: ' seguido del valor calculado (que para 200 con 25% debe ser 150).",
      "testRunner": "function(code, output) { const hasDescuento = /Precio con descuento:\\s*150/i.test(output); const hasOriginal = /Precio original verificado:\\s*200/i.test(output); return { passed: hasDescuento && hasOriginal, feedback: hasDescuento ? '¡Excelente! Has dominado el aislamiento de memoria en el paso por valor.' : 'Verifica el cálculo del descuento (debe resultar en 150) y el mensaje exacto.' }; }",
      "solution": "SubProceso AplicarDescuentoCopia(Por Valor precio, Por Valor porcentaje)\n    Definir precioFinal Como Real\n    precioFinal <- precio - (precio * (porcentaje / 100))\n    Escribir \"Precio con descuento:\", precioFinal\nFinSubProceso\n\nAlgoritmo EvaluacionPasoPorValor\n    Definir precioBase Como Real\n    precioBase <- 200\n    AplicarDescuentoCopia(precioBase, 25)\n    Escribir \"Precio original verificado:\", precioBase\nFinAlgoritmo"
    },
    "externalLinks": [
      {
        "title": "Documentación Oficial PSeInt: Subprocesos y Parámetros",
        "url": "http://pseint.sourceforge.net/"
      },
      {
        "title": "GeeksforGeeks: Pass by Value vs Pass by Reference",
        "url": "https://www.geeksforgeeks.org/pass-by-value-vs-pass-by-reference/"
      }
    ]
  },
  {
    "id": 22,
    "slug": "paso-por-referencia",
    "title": "Paso de Parámetros por Referencia",
    "titleEs": "Paso de Parámetros por Referencia",
    "category": "Modularización y Subprocesos",
    "categorySlug": "modularizacion",
    "categoryIcon": "cpu",
    "difficulty": "Intermedio",
    "summary": "Domina el paso por referencia para delegar la dirección de memoria de una variable, permitiendo que un subproceso modifique de forma directa y persistente los datos del invocador.",
    "originalExpl": "En el paso de parámetros por referencia (`Por Referencia`), no se crea una copia del contenido de la variable. En su lugar, el subproceso recibe la dirección de memoria donde reside la variable original del algoritmo invocador (un puntero o alias directo). Como consecuencia directa, cualquier asignación o cálculo realizado sobre el parámetro formal dentro del subproceso altera directamente la celda de memoria de la variable original. El paso por referencia es imprescindible cuando un subproceso necesita retornar múltiples valores simultáneamente (por ejemplo, intercambiar dos variables o actualizar coordenadas espaciales X, Y) o cuando se manipulan estructuras de datos grandes sin el costo de duplicar bytes en memoria.",
    "basicExpl": {
      "analogies": "Imagina que tienes un documento colaborativo en la nube (como Google Docs). En vez de enviarle a tu compañero un archivo PDF descargado, le compartes el enlace de edición directa. Cada palabra que tu compañero edite o borre se verá reflejada en el documento original que tú estás viendo en tiempo real, porque ambos están operando sobre el mismo espacio de almacenamiento compartido.",
      "keyPoints": [
        "El paso por referencia transfiere la dirección de memoria de la variable original.",
        "En PSeInt se declara explícitamente con la palabra reservada 'Por Referencia'.",
        "Las modificaciones realizadas dentro del subproceso perduran en el algoritmo principal.",
        "Es el mecanismo clásico para implementar algoritmos como el intercambio (Swap) de valores."
      ]
    },
    "intermediateExpl": "Prueba de escritorio del clásico algoritmo Swap (Intercambio):\n1. Variables iniciales: `varA <- 10`, `varB <- 20`\n2. Llamada: `Intercambiar(varA, varB)` -> Los parámetros formales `refA` y `refB` apuntan a las direcciones de `varA` y `varB`.\n3. Variable auxiliar interna: `aux <- refA` (`aux` almacena temporalmente 10).\n4. Asignación directa: `refA <- refB` -> La dirección de `varA` ahora almacena 20.\n5. Segunda asignación: `refB <- aux` -> La dirección de `varB` ahora almacena 10.\n6. Retorno al Algoritmo: `varA` vale 20 y `varB` vale 10. Los valores quedaron exitosamente intercambiados.",
    "expertExpl": "Bajo la arquitectura de Von Neumann, pasar por referencia consiste en empujar un puntero de 64 bits (o dirección de bus de memoria) a la pila de llamadas en vez de copiar el bloque de datos. En C/C++ esto equivale al operador de dirección `&` o punteros `*`, y en Go a punteros de memoria (`*int`). PSeInt emula esta abstracción con `Por Referencia`, permitiendo aprender conceptos fundamentales de punteros y mutabilidad de forma intuitiva y sin riesgos de segmentation fault.",
    "code": "// Algoritmo: Intercambio de Variables usando Paso Por Referencia\nSubProceso Intercambiar(Por Referencia refA, Por Referencia refB)\n    Definir auxiliar Como Entero\n    \n    // Guardamos el valor de refA en la variable temporal auxiliar\n    auxiliar <- refA\n    \n    // Asignamos el valor de refB en la celda de memoria de refA\n    refA <- refB\n    \n    // Asignamos el valor guardado en el auxiliar a la celda de refB\n    refB <- auxiliar\n    \n    Escribir \">> [SubProceso] Intercambio realizado con éxito en memoria compartida.\"\nFinSubProceso\n\nAlgoritmo DemostracionPasoPorReferencia\n    Definir primerNumero, segundoNumero Como Entero\n    \n    primerNumero <- 10\n    segundoNumero <- 99\n    \n    Escribir \"=== VALORES ORIGINALES ANTES DEL INTERCAMBIO ===\"\n    Escribir \"primerNumero:\", primerNumero\n    Escribir \"segundoNumero:\", segundoNumero\n    \n    // Llamamos al subproceso pasando las variables por referencia\n    Escribir \"\"\n    Escribir \"=== LLAMANDO AL SUBPROCESO INTERCAMBIAR ===\"\n    Intercambiar(primerNumero, segundoNumero)\n    \n    // Los valores de las variables en el algoritmo principal ahora están invertidos\n    Escribir \"\"\n    Escribir \"=== VALORES TRAS RETORNAR DEL SUBPROCESO ===\"\n    Escribir \"primerNumero:\", primerNumero\n    Escribir \"segundoNumero:\", segundoNumero\n    Escribir \"Conclusión: Las variables originales fueron modificadas permanentemente.\"\nFinAlgoritmo",
    "output": "=== VALORES ORIGINALES ANTES DEL INTERCAMBIO ===\nprimerNumero: 10\nsegundoNumero: 99\n\n=== LLAMANDO AL SUBPROCESO INTERCAMBIAR ===\n>> [SubProceso] Intercambio realizado con éxito en memoria compartida.\n\n=== VALORES TRAS RETORNAR DEL SUBPROCESO ===\nprimerNumero: 99\nsegundoNumero: 10\nConclusión: Las variables originales fueron modificadas permanentemente.",
    "evaluation": {
      "starterCode": "// Ejercicio: Implementa el subproceso 'IncrementarEnDiez' que reciba una variable\n// por referencia y le sume 10 a su valor original.\nSubProceso IncrementarEnDiez(Por Referencia numero)\n    // Escribe aquí la instrucción para sumarle 10 al parámetro por referencia\nFinSubProceso\n\nAlgoritmo EvaluacionPasoPorReferencia\n    Definir contador Como Entero\n    contador <- 50\n    IncrementarEnDiez(contador)\n    Escribir \"Contador incrementado:\", contador\nFinAlgoritmo",
      "task": "Escribe la línea de código dentro de 'IncrementarEnDiez' para sumar 10 a la variable 'numero' de modo que al ejecutarse el algoritmo principal muestre 'Contador incrementado: 60'.",
      "testRunner": "function(code, output) { const passed = /Contador incrementado:\\s*60/i.test(output); return { passed: passed, feedback: passed ? '¡Perfecto! Has dominado la mutabilidad directa mediante paso por referencia.' : 'Asegúrate de asignar numero <- numero + 10 dentro del subproceso.' }; }",
      "solution": "SubProceso IncrementarEnDiez(Por Referencia numero)\n    numero <- numero + 10\nFinSubProceso\n\nAlgoritmo EvaluacionPasoPorReferencia\n    Definir contador Como Entero\n    contador <- 50\n    IncrementarEnDiez(contador)\n    Escribir \"Contador incrementado:\", contador\nFinAlgoritmo"
    },
    "externalLinks": [
      {
        "title": "Documentación Oficial PSeInt: Paso Por Referencia",
        "url": "http://pseint.sourceforge.net/"
      },
      {
        "title": "Wikipedia: Parámetro por referencia",
        "url": "https://es.wikipedia.org/wiki/Par%C3%A1metro_(inform%C3%A1tica)"
      }
    ]
  },
  {
    "id": 23,
    "slug": "ambito-de-variables",
    "title": "Ámbito y Visibilidad de Variables",
    "titleEs": "Ámbito y Visibilidad de Variables",
    "category": "Modularización y Subprocesos",
    "categorySlug": "modularizacion",
    "categoryIcon": "cpu",
    "difficulty": "Intermedio",
    "summary": "Aprende el concepto de alcance y ciclo de vida de las variables locales frente al algoritmo principal, evitando colisiones de identificadores y dependencias ocultas.",
    "originalExpl": "El ámbito (scope) o visibilidad de una variable determina el bloque de código dentro del cual una variable existe, puede ser leída y modificada. En el diseño estructurado moderno y en la sintaxis estricta de PSeInt, todas las variables declaradas dentro de un subproceso o algoritmo tienen alcance puramente local. Una variable `x` declarada en el `Algoritmo Principal` es completamente independiente y ajena a una variable `x` declarada dentro de un `SubProceso`. Sus ciclos de vida comienzan al ingresar al bloque y concluyen de inmediato al salir, destruyéndose de la memoria de la pila. Para compartir información entre diferentes ámbitos, el único puente legítimo y seguro son los parámetros y los valores de retorno.",
    "basicExpl": {
      "analogies": "Imagina dos apartamentos idénticos en un edificio residencial. En el apartamento 101 vive una persona que tiene un gato llamado 'Michi'. En el apartamento 202 vive otra persona que también tiene un gato llamado 'Michi'. Aunque ambos gatos tienen exactamente el mismo nombre, son dos animales completamente distintos y habitan en espacios cerrados sin cruzarse. Lo que le pase al gato del 101 no afecta en absoluto al gato del 202.",
      "keyPoints": [
        "Las variables locales solo existen dentro del bloque donde fueron declaradas.",
        "Dos subprocesos pueden usar variables con el mismo identificador sin interferirse mutuamente.",
        "El ciclo de vida de una variable local termina cuando concluye la ejecución del subproceso.",
        "El encapsulamiento protege al código de bugs causados por modificaciones no deseadas."
      ]
    },
    "intermediateExpl": "Prueba de ciclo de vida en Pila (Stack Frame):\n1. Se inicia `Algoritmo Principal`: Se reserva espacio para `contadorPrincipal` (valor 100).\n2. Se invoca `Calcular`: Se crea un nuevo marco de pila aislado donde se reserva `contadorLocal` (valor 5).\n3. `contadorLocal` se incrementa a 6. El `contadorPrincipal` ni siquiera es visible para el procesador en este marco.\n4. Fin del subproceso: El marco de pila de `Calcular` es destruido (pop stack). `contadorLocal` deja de existir.\n5. Se reanuda el `Algoritmo Principal`: `contadorPrincipal` sigue conteniendo 100.",
    "expertExpl": "El ámbito léxico (lexical scoping) es un principio cardinal del diseño de compiladores. Los compiladores modernos utilizan tablas de símbolos jerárquicas durante el análisis semántico. Cada bloque añade un nivel en el árbol de símbolos. Cuando un identificador se resuelve, el compilador busca de adentro hacia afuera en los bloques activos. En PSeInt con perfil estricto, no existen variables globales implícitas, fomentando la disciplina del acoplamiento débil (low coupling) requerida en la ingeniería de software profesional.",
    "code": "// Algoritmo: Demostración de Ámbito Local y No Interferencia\nSubProceso ProcesoA\n    Definir x Como Entero\n    x <- 500\n    Escribir \">> [ProcesoA] Mi variable local x vale:\", x\nFinSubProceso\n\nSubProceso ProcesoB\n    Definir x Como Entero\n    x <- 999\n    Escribir \">> [ProcesoB] Mi variable local x vale:\", x\nFinSubProceso\n\nAlgoritmo DemostracionAmbitoVariables\n    Definir x Como Entero\n    x <- 10\n    \n    Escribir \"=== ÁMBITO PRINCIPAL INICIAL ===\"\n    Escribir \"Variable x en Algoritmo Principal:\", x\n    \n    Escribir \"\"\n    Escribir \"=== INVOCANDO SUBPROCESOS CON MISMOS IDENTIFICADORES ===\"\n    ProcesoA()\n    ProcesoB()\n    \n    Escribir \"\"\n    Escribir \"=== RETORNO AL ÁMBITO PRINCIPAL ===\"\n    Escribir \"Variable x en Algoritmo Principal tras llamadas:\", x\n    Escribir \"Demostración: Cada bloque mantiene su propio espacio aislado de variables.\"\nFinAlgoritmo",
    "output": "=== ÁMBITO PRINCIPAL INICIAL ===\nVariable x en Algoritmo Principal: 10\n\n=== INVOCANDO SUBPROCESOS CON MISMOS IDENTIFICADORES ===\n>> [ProcesoA] Mi variable local x vale: 500\n>> [ProcesoB] Mi variable local x vale: 999\n\n=== RETORNO AL ÁMBITO PRINCIPAL ===\nVariable x en Algoritmo Principal tras llamadas: 10\nDemostración: Cada bloque mantiene su propio espacio aislado de variables.",
    "evaluation": {
      "starterCode": "// Ejercicio: Declara un subproceso llamado 'MostrarMensajeLocal' que defina una\n// variable local de tipo Caracter con el texto 'Mensaje Local' y la muestre en pantalla.\n// Demuestra en el algoritmo que la variable del algoritmo principal no es afectada.\nSubProceso MostrarMensajeLocal\n    // Escribe la definición de la variable local y muéstrala\nFinSubProceso\n\nAlgoritmo EvaluacionAmbito\n    Definir texto Como Caracter\n    texto <- \"Texto Global\"\n    MostrarMensajeLocal()\n    Escribir \"Texto verificado en principal:\", texto\nFinAlgoritmo",
      "task": "Completa 'MostrarMensajeLocal' para que defina una variable local 'mensaje' con el valor 'Mensaje Local' y ejecute Escribir 'Mensaje desde subproceso: ', mensaje.",
      "testRunner": "function(code, output) { const hasSub = /Mensaje desde subproceso:\\s*Mensaje Local/i.test(output); const hasMain = /Texto verificado en principal:\\s*Texto Global/i.test(output); return { passed: hasSub && hasMain, feedback: hasSub ? '¡Correcto! Has verificado la separación estricta de ámbitos léxicos.' : 'Asegúrate de mostrar exactamente el mensaje indicado desde el subproceso.' }; }",
      "solution": "SubProceso MostrarMensajeLocal\n    Definir mensaje Como Caracter\n    mensaje <- \"Mensaje Local\"\n    Escribir \"Mensaje desde subproceso:\", mensaje\nFinSubProceso\n\nAlgoritmo EvaluacionAmbito\n    Definir texto Como Caracter\n    texto <- \"Texto Global\"\n    MostrarMensajeLocal()\n    Escribir \"Texto verificado en principal:\", texto\nFinAlgoritmo"
    },
    "externalLinks": [
      {
        "title": "Wikipedia: Ámbito (programación)",
        "url": "https://es.wikipedia.org/wiki/%C3%81mbito_(programaci%C3%B3n)"
      },
      {
        "title": "OpenWebinars: Variables locales y globales",
        "url": "https://openwebinars.net/blog/variables-locales-y-globales-que-son-y-diferencias/"
      }
    ]
  },
  {
    "id": 24,
    "slug": "recursion-factorial",
    "title": "Recursión: Cálculo del Factorial",
    "titleEs": "Recursión: Cálculo del Factorial",
    "category": "Modularización y Subprocesos",
    "categorySlug": "modularizacion",
    "categoryIcon": "cpu",
    "difficulty": "Intermedio",
    "summary": "Descubre la técnica de la recursividad implementando el cálculo del factorial matemático mediante una función que se invoca a sí misma con un caso base riguroso.",
    "originalExpl": "La recursión o recursividad es una técnica algorítmica fundamental en la que una función o subproceso se invoca directamente a sí mismo para resolver una instancia más pequeña del mismo problema. Todo algoritmo recursivo válido debe cumplir dos componentes innegociables: 1) El Caso Base, que es la condición de parada trivial que devuelve un resultado concreto inmediato sin realizar más llamadas recursivas; y 2) El Caso Recursivo o Paso Inductivo, que reduce el problema original y se llama a sí mismo con el argumento simplificado. En el cálculo del factorial matemático (n!), el caso base establece que 0! = 1 y 1! = 1, mientras que el caso recursivo se define como n! = n * (n - 1)!. Sin un caso base adecuado, la recursión provocaría un bucle infinito y desbordamiento de pila (Stack Overflow).",
    "basicExpl": {
      "analogies": "Imagina una serie de muñecas rusas (matrioskas). Para saber cuántas muñecas hay dentro de la muñeca más grande, abres la primera y encuentras otra más chica. Vuelves a abrirla sucesivamente hasta que llegas a la muñeca más diminuta y sólida que ya no se puede abrir (el caso base). A partir de esa última muñeca, retrocedes cerrando una por una y sumando las capas hasta obtener el total.",
      "keyPoints": [
        "La recursión consiste en una función que se invoca a sí misma.",
        "El Caso Base es obligatorio para evitar una recursión infinita y desbordamiento de pila.",
        "En cada llamada recursiva, los argumentos deben acercarse progresivamente al caso base.",
        "El factorial de n se define recursivamente como n * Factorial(n - 1)."
      ]
    },
    "intermediateExpl": "Árbol de llamadas y pila de ejecución para `Factorial(4)`:\n1. Llamada inicial: `Factorial(4)` espera `4 * Factorial(3)`\n2. `Factorial(3)` espera `3 * Factorial(2)`\n3. `Factorial(2)` espera `2 * Factorial(1)`\n4. `Factorial(1)` alcanza el Caso Base y retorna 1.\n5. Desenrollado de la pila (Unwinding):\n   - `Factorial(2)` calcula: `2 * 1 = 2`\n   - `Factorial(3)` calcula: `3 * 2 = 6`\n   - `Factorial(4)` calcula: `4 * 6 = 24`\nResultado final devuelto al algoritmo principal: 24.",
    "expertExpl": "El análisis de complejidad temporal del factorial recursivo simple es O(n) y su complejidad espacial en la memoria de pila (call stack) también es O(n), debido a los n marcos de activación acumulados antes de iniciar el retorno. En lenguajes funcionales o compiladores modernos con optimización de llamada final (Tail Call Optimization - TCO), la recursión en cola se transforma internamente en una iteración equivalente a O(1) de espacio. PSeInt permite ilustrar de forma cristalina la mecánica del call stack antes de pasar a árboles binarios o algoritmos como Quicksort.",
    "code": "// Algoritmo: Cálculo del Factorial mediante Función Recursiva\nFuncion resultado <- CalcularFactorial(n)\n    Definir resultado Como Entero\n    \n    // CONDICIÓN DE PARADA: Caso Base\n    Si n <= 1 Entonces\n        // 0! = 1 y 1! = 1\n        resultado <- 1\n    Sino\n        // PASO RECURSIVO: n * Factorial(n - 1)\n        resultado <- n * CalcularFactorial(n - 1)\n    FinSi\nFinFuncion\n\nAlgoritmo DemostracionRecursionFactorial\n    Definir numero, resultadoFactorial Como Entero\n    \n    Escribir \"=== CÁLCULO RECURSIVO DEL FACTORIAL ===\"\n    numero <- 5\n    \n    Escribir \"Calculando el factorial de:\", numero\n    resultadoFactorial <- CalcularFactorial(numero)\n    \n    Escribir \"El factorial de\", numero, \"es:\", resultadoFactorial\n    Escribir \"\"\n    Escribir \"Verificación matemática: 5! = 5 * 4 * 3 * 2 * 1 = 120\"\nFinAlgoritmo",
    "output": "=== CÁLCULO RECURSIVO DEL FACTORIAL ===\nCalculando el factorial de: 5\nEl factorial de 5 es: 120\n\nVerificación matemática: 5! = 5 * 4 * 3 * 2 * 1 = 120",
    "evaluation": {
      "starterCode": "// Ejercicio: Implementa la función recursiva 'SumarHastaN' que sume todos los números\n// enteros consecutivos desde 1 hasta N de forma recursiva:\n// Caso base: Si N <= 1 retorna 1.\n// Caso recursivo: N + SumarHastaN(N - 1).\nFuncion suma <- SumarHastaN(n)\n    Definir suma Como Entero\n    // Escribe aquí la estructura condicional con caso base y paso recursivo\nFinFuncion\n\nAlgoritmo EvaluacionRecursionSuma\n    Definir resultado Como Entero\n    resultado <- SumarHastaN(5)\n    Escribir \"Suma acumulada hasta 5:\", resultado\nFinAlgoritmo",
      "task": "Completa la función recursiva 'SumarHastaN' para calcular la suma de Gauss desde 1 hasta N. Para n=5 el resultado debe ser 15 (1+2+3+4+5).",
      "testRunner": "function(code, output) { const passed = /Suma acumulada hasta 5:\\s*15/i.test(output); return { passed: passed, feedback: passed ? '¡Brillante! Has asimilado la construcción de casos base y pasos recursivos.' : 'Verifica que el caso recursivo sume n + SumarHastaN(n - 1) y el caso base devuelva 1.' }; }",
      "solution": "Funcion suma <- SumarHastaN(n)\n    Definir suma Como Entero\n    Si n <= 1 Entonces\n        suma <- 1\n    Sino\n        suma <- n + SumarHastaN(n - 1)\n    FinSi\nFinFuncion\n\nAlgoritmo EvaluacionRecursionSuma\n    Definir resultado Como Entero\n    resultado <- SumarHastaN(5)\n    Escribir \"Suma acumulada hasta 5:\", resultado\nFinAlgoritmo"
    },
    "externalLinks": [
      {
        "title": "Khan Academy: ¿Qué es la recursión?",
        "url": "https://es.khanacademy.org/computing/computer-science/algorithms/recursive-algorithms/a/recursion"
      },
      {
        "title": "Documentación Oficial PSeInt: Funciones",
        "url": "http://pseint.sourceforge.net/"
      }
    ]
  },
  {
    "id": 25,
    "slug": "recursion-fibonacci",
    "title": "Recursión: Sucesión de Fibonacci",
    "titleEs": "Recursión: Sucesión de Fibonacci",
    "category": "Modularización y Subprocesos",
    "categorySlug": "modularizacion",
    "categoryIcon": "cpu",
    "difficulty": "Avanzado",
    "summary": "Analiza la recursión múltiple modelando la famosa sucesión de Fibonacci, explorando el árbol de ramificación y la importancia de la eficiencia algorítmica.",
    "originalExpl": "La sucesión de Fibonacci es una secuencia numérica infinita donde cada término es la suma exacta de los dos términos inmediatamente anteriores: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34... Matemáticamente se define como F(0) = 0, F(1) = 1, y para cualquier n >= 2, F(n) = F(n-1) + F(n-2). Al implementarse recursivamente, una sola llamada a `Fibonacci(n)` bifurca la ejecución generando dos llamadas recursivas independientes. Esta estructura genera un árbol binario de llamadas que ilustra perfectamente el concepto de recursión múltiple o ramificada, a la vez que sirve como caso de estudio clásico para comparar la elegancia matemática frente a la complejidad computacional exponencial.",
    "basicExpl": {
      "analogies": "Imagina un árbol genealógico invertido o la reproducción de ramas en un arbusto. Cada rama principal que crece se divide en dos ramas secundarias, y cada una de esas ramas secundarias a su vez se divide en dos brotes más pequeños. Para calcular cuántas hojas habrá al final, debes esperar a que todas las pequeñas bifurcaciones completen su crecimiento de forma simultánea.",
      "keyPoints": [
        "La serie de Fibonacci parte de dos casos base: F(0) = 0 y F(1) = 1.",
        "El caso recursivo genera dos llamadas hijas simultáneas: F(n-1) + F(n-2).",
        "Produce un árbol de llamadas exponencial con cálculos repetidos.",
        "Es el ejemplo introductorio por excelencia a la Programación Dinámica y Memoización."
      ]
    },
    "intermediateExpl": "Árbol de llamadas para `Fibonacci(4)`:\n                       F(4)\n                   /          \\\n              F(3)              F(2)\n            /      \\          /      \\\n         F(2)      F(1)     F(1)     F(0)\n        /    \\\n      F(1)   F(0)\nNótese cómo `F(2)` se calcula dos veces por separado en diferentes ramas. Al sumar las hojas base (1 + 0 + 1 + 1 + 0), el resultado final es 3.",
    "expertExpl": "La recursión ingenua de Fibonacci posee una complejidad temporal asintótica de O(2^n) (específicamente O(φ^n) donde φ es la razón áurea ≈ 1.618) y una complejidad espacial de O(n) correspondiente a la profundidad máxima del árbol de pila. Para valores grandes de n (ej. n > 40), el tiempo de ejecución se vuelve inviable en una computadora convencional. Por esta razón, en algoritmos avanzados se sustituye por iteración O(n), memorización O(n) o exponenciación de matrices O(log n).",
    "code": "// Algoritmo: Cálculo del N-ésimo término de Fibonacci con Recursión\nFuncion valorTermino <- CalcularFibonacci(posicion)\n    Definir valorTermino Como Entero\n    \n    // CASOS BASE: Las dos primeras posiciones de la serie\n    Si posicion = 0 Entonces\n        valorTermino <- 0\n    Sino\n        Si posicion = 1 Entonces\n            valorTermino <- 1\n        Sino\n            // CASO RECURSIVO DOBLE: Suma de los dos términos previos\n            valorTermino <- CalcularFibonacci(posicion - 1) + CalcularFibonacci(posicion - 2)\n        FinSi\n    FinSi\nFinFuncion\n\nAlgoritmo DemostracionRecursionFibonacci\n    Definir indice, termino Como Entero\n    \n    Escribir \"=== SUCESIÓN DE FIBONACCI RECURSIVA ===\"\n    Escribir \"Generando los primeros 8 términos de la serie:\"\n    \n    // Mostramos la serie desde la posición 0 hasta la 7\n    Para indice <- 0 Hasta 7 Con Paso 1 Hacer\n        termino <- CalcularFibonacci(indice)\n        Escribir \"Posición [\", indice, \"] -> \", termino\n    FinPara\n    \n    Escribir \"\"\n    Escribir \"Secuencia resultante: 0, 1, 1, 2, 3, 5, 8, 13\"\nFinAlgoritmo",
    "output": "=== SUCESIÓN DE FIBONACCI RECURSIVA ===\nGenerando los primeros 8 términos de la serie:\nPosición [ 0 ] -> 0\nPosición [ 1 ] -> 1\nPosición [ 2 ] -> 1\nPosición [ 3 ] -> 2\nPosición [ 4 ] -> 3\nPosición [ 5 ] -> 5\nPosición [ 6 ] -> 8\nPosición [ 7 ] -> 13\n\nSecuencia resultante: 0, 1, 1, 2, 3, 5, 8, 13",
    "evaluation": {
      "starterCode": "// Ejercicio: Modifica la función 'ObtenerFibonacci' para que verifique si la posición\n// recibida es menor a 0. Si es negativa debe retornar -1 (código de error).\n// Si es 0 retorna 0, si es 1 retorna 1, y si es mayor o igual a 2 retorna F(n-1) + F(n-2).\nFuncion f <- ObtenerFibonacci(n)\n    Definir f Como Entero\n    // Escribe la estructura completa de validación y recursión\nFinFuncion\n\nAlgoritmo EvaluacionFibonacci\n    Escribir \"Fibonacci en posición 6:\", ObtenerFibonacci(6)\nFinAlgoritmo",
      "task": "Completa 'ObtenerFibonacci' para calcular correctamente el término en la posición 6 (cuyo resultado matemático es 8).",
      "testRunner": "function(code, output) { const passed = /Fibonacci en posición 6:\\s*8/i.test(output); return { passed: passed, feedback: passed ? '¡Impresionante! Has dominado la recursión doble y el control de casos base.' : 'El término en la posición 6 de Fibonacci debe ser 8. Revisa tus casos condicionales.' }; }",
      "solution": "Funcion f <- ObtenerFibonacci(n)\n    Definir f Como Entero\n    Si n < 0 Entonces\n        f <- -1\n    Sino\n        Si n = 0 Entonces\n            f <- 0\n        Sino\n            Si n = 1 Entonces\n                f <- 1\n            Sino\n                f <- ObtenerFibonacci(n - 1) + ObtenerFibonacci(n - 2)\n            FinSi\n        FinSi\n    FinSi\nFinFuncion\n\nAlgoritmo EvaluacionFibonacci\n    Escribir \"Fibonacci en posición 6:\", ObtenerFibonacci(6)\nFinAlgoritmo"
    },
    "externalLinks": [
      {
        "title": "Wikipedia: Sucesión de Fibonacci",
        "url": "https://es.wikipedia.org/wiki/Sucesi%C3%B3n_de_Fibonacci"
      },
      {
        "title": "Khan Academy: Fibonacci y la razón áurea",
        "url": "https://es.khanacademy.org/"
      }
    ]
  },
  {
    "id": 26,
    "slug": "vectores-dimension",
    "title": "Arreglos Unidimensionales: Declaración y Dimensión",
    "titleEs": "Arreglos Unidimensionales: Declaración y Dimensión",
    "category": "Arreglos Unidimensionales (Vectores)",
    "categorySlug": "arreglos-vectores",
    "categoryIcon": "layers",
    "difficulty": "Intermedio",
    "summary": "Iníciate en las estructuras de datos lineales con arreglos unidimensionales (vectores), comprendiendo la directiva Dimension, la indexación y el almacenamiento secuencial contiguo.",
    "originalExpl": "Un arreglo unidimensional (también conocido como vector o array) es una estructura de datos homogénea y estática que almacena una colección finita de elementos del mismo tipo en posiciones de memoria contiguas. En PSeInt, la reserva de memoria para un arreglo se realiza mediante la instrucción `Dimension nombreArreglo[tamaño]`. Una vez dimensionado, se puede acceder o modificar cualquier celda individual utilizando el operador de indexación entre corchetes `[indice]`. Es crucial comprender la convención de índices: en la configuración predeterminada de PSeInt, los índices comienzan en 1 (base 1), y van desde 1 hasta el tamaño definido (en contraste con lenguajes como C, Go o JavaScript donde la base es 0). Acceder a un índice fuera de este rango genera un error en tiempo de ejecución por desbordamiento de índice (Out of bounds).",
    "basicExpl": {
      "analogies": "Imagina un casillero postal o una hilera de casilleros en una escuela numerados del 1 al 5. Cada casillero tiene su propia puertecita con su número rotulado. Todos los casilleros son del mismo tamaño y están pegados uno al lado del otro. Si quieres guardar un libro en el casillero 3, vas directamente a la puerta 3 sin necesidad de abrir el casillero 1 ni el 2.",
      "keyPoints": [
        "Un vector es una secuencia fija y ordenada de celdas contiguas en memoria.",
        "En PSeInt se reserva su tamaño con la palabra reservada 'Dimension'.",
        "El acceso a cualquier posición es directo e inmediato indicando su índice entre corchetes: vector[i].",
        "En la configuración estándar de PSeInt los índices comienzan en 1 hasta N."
      ]
    },
    "intermediateExpl": "Mapeo de memoria para `Dimension notas[4]`:\nÍndice:      [1]      [2]      [3]      [4]\nValor:       18       15       20       12\nTipo:      Entero   Entero   Entero   Entero\nAcceso:\n- Asignación: `notas[1] <- 18` (escribe 18 en la primera celda).\n- Lectura: `Escribir notas[3]` (lee el contenido de la tercera celda y muestra 20).\n- Intento ilegal: `notas[5] <- 10` -> Error crítico de índice fuera de rango.",
    "expertExpl": "En memoria RAM, un arreglo unidimensional se almacena como un bloque contiguo de bytes. La dirección física de memoria de cualquier elemento `i` se calcula en tiempo constante O(1) mediante la fórmula de direccionamiento base: `Dirección = DirecciónBase + (i - IndiceInicial) * TamañoElemento`. Esta característica de localidad espacial maximiza el aprovechamiento de la memoria caché L1/L2 del procesador moderno (Cache Hits), haciendo que los vectores sean la estructura de datos más eficiente para recorridos secuenciales.",
    "code": "// Algoritmo: Declaración, Dimensión y Acceso Directo a Vectores\nAlgoritmo DeclaracionYDimensionVectores\n    // 1. Declaramos el tipo de dato de los elementos del vector\n    Definir edades Como Entero\n    \n    // 2. Reservamos espacio contiguo en memoria para 5 celdas usando Dimension\n    Dimension edades[5]\n    \n    // 3. Asignamos valores directamente a cada índice individual (1 a 5)\n    edades[1] <- 18\n    edades[2] <- 22\n    edades[3] <- 30\n    edades[4] <- 25\n    edades[5] <- 40\n    \n    // 4. Mostramos valores accediendo por su índice específico\n    Escribir \"=== ACCESO INDIVIDUAL A CELDAS DEL VECTOR ===\"\n    Escribir \"Elemento en la posición 1:\", edades[1]\n    Escribir \"Elemento en la posición 3:\", edades[3]\n    Escribir \"Elemento en la última posición (5):\", edades[5]\n    \n    // 5. Modificamos una celda específica\n    edades[3] <- 35\n    Escribir \"\"\n    Escribir \"Valor modificado en la posición 3:\", edades[3]\nFinAlgoritmo",
    "output": "=== ACCESO INDIVIDUAL A CELDAS DEL VECTOR ===\nElemento en la posición 1: 18\nElemento en la posición 3: 30\nElemento en la última posición (5): 40\n\nValor modificado en la posición 3: 35",
    "evaluation": {
      "starterCode": "// Ejercicio: Declara un arreglo de 3 elementos llamado 'temperaturas' de tipo Real.\n// Asigna los valores 24.5 a la posición 1, 28.0 a la posición 2 y 19.8 a la posición 3.\n// Luego muestra en pantalla el valor de la posición 2.\nAlgoritmo EvaluacionDimensionVectores\n    Definir temperaturas Como Real\n    // Dimensiona el vector y asigna los 3 valores\n    \n    Escribir \"Temperatura seleccionada:\", temperaturas[2]\nFinAlgoritmo",
      "task": "Dimensiona 'temperaturas' con 3 elementos, asígnales los valores indicados y ejecuta el algoritmo para verificar que la posición 2 muestre 28.",
      "testRunner": "function(code, output) { const hasDim = /Dimension\\s+temperaturas\\s*\\[\\s*3\\s*\\]/i.test(code); const hasVal = /Temperatura seleccionada:\\s*28/i.test(output); return { passed: hasDim && hasVal, feedback: hasDim && hasVal ? '¡Excelente! Has dimensionado y asignado un vector con total precisión.' : 'Asegúrate de incluir Dimension temperaturas[3] y asignar temperaturas[2] <- 28.' }; }",
      "solution": "Algoritmo EvaluacionDimensionVectores\n    Definir temperaturas Como Real\n    Dimension temperaturas[3]\n    temperaturas[1] <- 24.5\n    temperaturas[2] <- 28.0\n    temperaturas[3] <- 19.8\n    \n    Escribir \"Temperatura seleccionada:\", temperaturas[2]\nFinAlgoritmo"
    },
    "externalLinks": [
      {
        "title": "Documentación Oficial PSeInt: Arreglos y Dimension",
        "url": "http://pseint.sourceforge.net/"
      },
      {
        "title": "GeeksforGeeks: Introducción a Arrays",
        "url": "https://www.geeksforgeeks.org/introduction-to-arrays/"
      }
    ]
  },
  {
    "id": 27,
    "slug": "vectores-recorrido",
    "title": "Llenado y Recorrido de Vectores con Para",
    "titleEs": "Llenado y Recorrido de Vectores con Para",
    "category": "Arreglos Unidimensionales (Vectores)",
    "categorySlug": "arreglos-vectores",
    "categoryIcon": "layers",
    "difficulty": "Intermedio",
    "summary": "Combina la estructura repetitiva Para con arreglos para automatizar el llenado masivo, la lectura de datos del usuario y la impresión formateada de vectores.",
    "originalExpl": "Manipular cada posición de un vector de forma manual se vuelve inmanejable cuando el tamaño del arreglo crece. El patrón estándar de la programación estructurada consiste en sincronizar la variable de control de un ciclo `Para` con los índices del vector. Dado un vector de tamaño `N`, un bucle `Para i <- 1 Hasta N Con Paso 1` recorrerá de forma secuencial y determinista todas las posiciones desde la primera hasta la última. Dentro del cuerpo del bucle, la expresión `vector[i]` representará dinámicamente cada celda en cada iteración. Este patrón se utiliza de manera omnipresente para: 1) Inicializar arreglos en cero, 2) Leer datos consecutivos del teclado mediante `Leer vector[i]`, y 3) Imprimir colecciones completas formateadas.",
    "basicExpl": {
      "analogies": "Imagina a un cartero que recorre una calle con 10 buzones numerados correlativamente del 1 al 10. El cartero no salta al azar; empieza en el buzón 1, deposita la carta, da un paso al buzón 2, deposita la siguiente, y así sucesivamente hasta terminar en el buzón 10. El ciclo 'Para' es el cartero caminando paso a paso sobre cada casilla.",
      "keyPoints": [
        "El bucle 'Para' es la estructura ideal para recorrer vectores con límites conocidos.",
        "La variable contadora del bucle actúa directamente como índice del vector: vector[i].",
        "Permite procesar grandes volúmenes de información en pocas líneas de código.",
        "Garantiza recorrer la totalidad del vector sin saltarse elementos ni provocar desbordamientos."
      ]
    },
    "intermediateExpl": "Traza de ejecución de llenado automático de múltiplos de 5:\n- Vector dimensionado: `multiplos[5]`\n- Iteración 1: `i = 1` -> `multiplos[1] <- 1 * 5` (almacena 5)\n- Iteración 2: `i = 2` -> `multiplos[2] <- 2 * 5` (almacena 10)\n- Iteración 3: `i = 3` -> `multiplos[3] <- 3 * 5` (almacena 15)\n- Iteración 4: `i = 4` -> `multiplos[4] <- 4 * 5` (almacena 20)\n- Iteración 5: `i = 5` -> `multiplos[5] <- 5 * 5` (almacena 25)\n- Estado final del vector: `[5, 10, 15, 20, 25]`",
    "expertExpl": "El recorrido secuencial de un vector tiene una complejidad de tiempo O(n), donde n es la cantidad de elementos. En arquitecturas modernas, cuando el procesador ejecuta un bucle sobre un arreglo contiguo en memoria, el mecanismo de hardware denominado 'pre-fetcher' detecta el patrón de acceso lineal y carga por anticipado las siguientes líneas de caché (Cache Lines de 64 bytes). Esto optimiza drásticamente el rendimiento de lectura frente a estructuras enlazadas (como listas enlazadas) que sufren de dispersión en memoria.",
    "code": "// Algoritmo: Llenado Dinámico y Recorrido de Vectores\nAlgoritmo RecorridoVectoresConPara\n    Definir TAMANIO, i Como Entero\n    TAMANIO <- 6\n    \n    // Declaramos y dimensionamos el vector de números\n    Definir numeros Como Entero\n    Dimension numeros[TAMANIO]\n    \n    Escribir \"=== LLENANDO EL VECTOR CON NÚMEROS PARES ===\"\n    // Primer bucle: Llenado algorítmico de celdas\n    Para i <- 1 Hasta TAMANIO Con Paso 1 Hacer\n        numeros[i] <- i * 2 // Guarda 2, 4, 6, 8, 10, 12\n    FinPara\n    Escribir \"Llenado completado exitosamente.\"\n    \n    Escribir \"\"\n    Escribir \"=== RECORRIENDO E IMPRIMIENDO EL CONTENIDO ===\"\n    // Segundo bucle: Recorrido y visualización de cada celda\n    Para i <- 1 Hasta TAMANIO Con Paso 1 Hacer\n        Escribir \"Índice [\", i, \"] contiene el valor:\", numeros[i]\n    FinPara\nFinAlgoritmo",
    "output": "=== LLENANDO EL VECTOR CON NÚMEROS PARES ===\nLlenado completado exitosamente.\n\n=== RECORRIENDO E IMPRIMIENDO EL CONTENIDO ===\nÍndice [ 1 ] contiene el valor: 2\nÍndice [ 2 ] contiene el valor: 4\nÍndice [ 3 ] contiene el valor: 6\nÍndice [ 4 ] contiene el valor: 8\nÍndice [ 5 ] contiene el valor: 10\nÍndice [ 6 ] contiene el valor: 12",
    "evaluation": {
      "starterCode": "// Ejercicio: Llena un vector de 4 posiciones con los cuadrados de su propio índice\n// (es decir, posicion 1 -> 1, posicion 2 -> 4, posicion 3 -> 9, posicion 4 -> 16)\n// y luego calcula e imprime la suma de todos los elementos del vector.\nAlgoritmo EvaluacionRecorridoVectores\n    Definir i, sumaTotal Como Entero\n    Definir cuadrados Como Entero\n    Dimension cuadrados[4]\n    \n    // 1. Llena el vector con i * i usando un bucle Para\n    \n    // 2. Recorre el vector para acumular la suma en sumaTotal\n    sumaTotal <- 0\n    \n    Escribir \"Suma total de cuadrados:\", sumaTotal\nFinAlgoritmo",
      "task": "Completa los bucles para llenar el vector con los cuadrados (1, 4, 9, 16) y acumular su suma total (que debe dar 30).",
      "testRunner": "function(code, output) { const passed = /Suma total de cuadrados:\\s*30/i.test(output); return { passed: passed, feedback: passed ? '¡Magnífico! Has dominado el patrón de recorrido y acumulación sobre vectores.' : 'La suma de 1 + 4 + 9 + 16 debe ser 30. Revisa el llenado y la suma acumulada.' }; }",
      "solution": "Algoritmo EvaluacionRecorridoVectores\n    Definir i, sumaTotal Como Entero\n    Definir cuadrados Como Entero\n    Dimension cuadrados[4]\n    \n    Para i <- 1 Hasta 4 Con Paso 1 Hacer\n        cuadrados[i] <- i * i\n    FinPara\n    \n    sumaTotal <- 0\n    Para i <- 1 Hasta 4 Con Paso 1 Hacer\n        sumaTotal <- sumaTotal + cuadrados[i]\n    FinPara\n    \n    Escribir \"Suma total de cuadrados:\", sumaTotal\nFinAlgoritmo"
    },
    "externalLinks": [
      {
        "title": "Documentación Oficial PSeInt: Estructura Para",
        "url": "http://pseint.sourceforge.net/"
      },
      {
        "title": "Tutorialspoint: Array traversal",
        "url": "https://www.tutorialspoint.com/data_structures_algorithms/array_data_structure.htm"
      }
    ]
  },
  {
    "id": 28,
    "slug": "busqueda-lineal",
    "title": "Búsqueda Lineal o Secuencial en Vectores",
    "titleEs": "Búsqueda Lineal o Secuencial en Vectores",
    "category": "Arreglos Unidimensionales (Vectores)",
    "categorySlug": "arreglos-vectores",
    "categoryIcon": "layers",
    "difficulty": "Intermedio",
    "summary": "Implementa el algoritmo de búsqueda lineal para localizar elementos en colecciones no ordenadas, aplicando banderas booleanas y optimización de parada temprana.",
    "originalExpl": "La búsqueda lineal o secuencial (Linear Search) es el algoritmo más simple e intuitivo para localizar un elemento específico dentro de una colección de datos. El algoritmo opera inspeccionando uno por uno los elementos del vector desde la posición inicial (índice 1) hasta la final (índice N), comparando el contenido de cada celda con el valor buscado (denominado clave de búsqueda o 'target'). Si se encuentra una coincidencia, se registra la posición donde ocurrió el hallazgo y se puede interrumpir la búsqueda inmediatamente mediante una bandera booleana o una instrucción de ruptura. Si se llega al final del vector sin hallar ninguna coincidencia, el algoritmo concluye que el elemento no existe en la colección. No requiere que el vector esté previamente ordenado.",
    "basicExpl": {
      "analogies": "Imagina que perdiste tus llaves en un perchero con varios abrigos colgados uno al lado del otro. Como no sabes en cuál abrigo están, comienzas a revisar los bolsillos del primer abrigo; si no están ahí, pasas al segundo abrigo, luego al tercero, y así en orden. En el momento exacto en que tocas las llaves en un bolsillo, dejas de buscar y anotas en qué abrigo estaban.",
      "keyPoints": [
        "Inspecciona secuencialmente cada celda del arreglo desde el inicio.",
        "Funciona en cualquier vector, sin importar si los datos están desordenados.",
        "Utiliza una variable bandera (encontrado) para recordar el éxito de la búsqueda.",
        "Permite reportar tanto si el dato existe como el índice exacto donde fue localizado."
      ]
    },
    "intermediateExpl": "Prueba de escritorio buscando el número 77 en un vector:\nVector: `[14, 52, 77, 30, 99]`\n- Paso 1: Compara con índice 1: ¿14 = 77? Falso. Avanza.\n- Paso 2: Compara con índice 2: ¿52 = 77? Falso. Avanza.\n- Paso 3: Compara con índice 3: ¿77 = 77? Verdadero.\n- Acción: Se marca `encontrado <- Verdadero`, `posicionHallada <- 3`, y se detiene el ciclo.\nResultado: Elemento encontrado en la posición 3 tras realizar solo 3 comparaciones.",
    "expertExpl": "El análisis asintótico de la búsqueda lineal arroja: Mejor Caso: O(1) cuando el elemento buscado reside en la primera posición. Peor Caso: O(n) cuando el elemento se ubica en la última posición o no se encuentra en el arreglo (requiriendo n comparaciones completas). Caso Promedio: O(n/2) = O(n). La complejidad espacial es O(1) ya que opera in-place sin requerir estructuras auxiliares. Para colecciones pequeñas (n < 50), la búsqueda lineal es frecuentemente más rápida en hardware real que algoritmos complejos debido a la ausencia de sobrecarga y excelente localidad de caché.",
    "code": "// Algoritmo: Búsqueda Lineal con Detección de Posición\nAlgoritmo BusquedaLinealSecuencial\n    Definir TAMANIO, i, elementoBuscado, posicionHallada Como Entero\n    Definir encontrado Como Logico\n    \n    TAMANIO <- 6\n    Definir arreglo Como Entero\n    Dimension arreglo[TAMANIO]\n    \n    // Inicializamos el vector con valores de prueba desordenados\n    arreglo[1] <- 45\n    arreglo[2] <- 12\n    arreglo[3] <- 89\n    arreglo[4] <- 34\n    arreglo[5] <- 70\n    arreglo[6] <- 23\n    \n    // Elemento que deseamos localizar\n    elementoBuscado <- 89\n    \n    // Inicializamos variables de control\n    encontrado <- Falso\n    posicionHallada <- -1\n    \n    Escribir \"=== INICIANDO BÚSQUEDA LINEAL ===\"\n    Escribir \"Buscando el número:\", elementoBuscado\n    \n    // Recorremos secuencialmente el vector\n    Para i <- 1 Hasta TAMANIO Con Paso 1 Hacer\n        Si arreglo[i] = elementoBuscado Entonces\n            encontrado <- Verdadero\n            posicionHallada <- i\n            // Podemos salir del ciclo o dejar que continúe\n        FinSi\n    FinPara\n    \n    // Evaluación del resultado de la búsqueda\n    Escribir \"\"\n    Si encontrado Entonces\n        Escribir \"¡Éxito! El número\", elementoBuscado, \"fue encontrado en la posición:\", posicionHallada\n    Sino\n        Escribir \"El número\", elementoBuscado, \"no existe dentro del arreglo.\"\n    FinSi\nFinAlgoritmo",
    "output": "=== INICIANDO BÚSQUEDA LINEAL ===\nBuscando el número: 89\n\n¡Éxito! El número 89 fue encontrado en la posición: 3",
    "evaluation": {
      "starterCode": "// Ejercicio: Modifica la búsqueda para encontrar el valor 99 en el vector dado.\n// Si no se encuentra, debe imprimir exactamente: 'Elemento no encontrado en el vector.'\nAlgoritmo EvaluacionBusquedaLineal\n    Definir datos Como Entero\n    Dimension datos[4]\n    datos[1] <- 10\n    datos[2] <- 25\n    datos[3] <- 30\n    datos[4] <- 45\n    \n    Definir buscar, i Como Entero\n    Definir hallado Como Logico\n    buscar <- 99\n    hallado <- Falso\n    \n    // Realiza el recorrido de búsqueda\n    \n    Si hallado Entonces\n        Escribir \"Elemento encontrado\"\n    Sino\n        Escribir \"Elemento no encontrado en el vector.\"\n    FinSi\nFinAlgoritmo",
      "task": "Escribe el ciclo de búsqueda para verificar si 'buscar' (99) está en el vector y confirma que imprima 'Elemento no encontrado en el vector.'",
      "testRunner": "function(code, output) { const passed = /Elemento no encontrado en el vector\\./i.test(output); return { passed: passed, feedback: passed ? '¡Perfecto! Has verificado correctamente el caso de elemento inexistente en búsqueda lineal.' : 'Asegúrate de que el mensaje de no encontrado sea exactamente el solicitado.' }; }",
      "solution": "Algoritmo EvaluacionBusquedaLineal\n    Definir datos Como Entero\n    Dimension datos[4]\n    datos[1] <- 10\n    datos[2] <- 25\n    datos[3] <- 30\n    datos[4] <- 45\n    \n    Definir buscar, i Como Entero\n    Definir hallado Como Logico\n    buscar <- 99\n    hallado <- Falso\n    \n    Para i <- 1 Hasta 4 Con Paso 1 Hacer\n        Si datos[i] = buscar Entonces\n            hallado <- Verdadero\n        FinSi\n    FinPara\n    \n    Si hallado Entonces\n        Escribir \"Elemento encontrado\"\n    Sino\n        Escribir \"Elemento no encontrado en el vector.\"\n    FinSi\nFinAlgoritmo"
    },
    "externalLinks": [
      {
        "title": "GeeksforGeeks: Linear Search",
        "url": "https://www.geeksforgeeks.org/linear-search/"
      },
      {
        "title": "Wikipedia: Búsqueda lineal",
        "url": "https://es.wikipedia.org/wiki/B%C3%BAsqueda_lineal"
      }
    ]
  },
  {
    "id": 29,
    "slug": "busqueda-binaria",
    "title": "Búsqueda Binaria en Vector Ordenado",
    "titleEs": "Búsqueda Binaria en Vector Ordenado",
    "category": "Arreglos Unidimensionales (Vectores)",
    "categorySlug": "arreglos-vectores",
    "categoryIcon": "layers",
    "difficulty": "Avanzado",
    "summary": "Comprende y programa el algoritmo divide y vencerás de búsqueda binaria, reduciendo el espacio de búsqueda a la mitad en cada paso con complejidad logarítmica O(log n).",
    "originalExpl": "La búsqueda binaria (Binary Search) es uno de los algoritmos fundamentales más eficientes de la informática. Exige una precondición obligatoria e innegociable: el vector debe estar estrictamente ordenado (ascendente o descendentemente). El algoritmo aplica el paradigma de 'Divide y Vencerás': mantiene dos punteros de índice (`inicio` y `fin`) que delimitan el segmento activo de búsqueda. En cada iteración calcula el índice medio (`medio <- trunc((inicio + fin) / 2)`). Compara el elemento central con la clave buscada: 1) Si coinciden, la búsqueda concluye con éxito. 2) Si la clave es menor que el valor medio, descarta toda la mitad derecha actualizando `fin <- medio - 1`. 3) Si la clave es mayor, descarta toda la mitad izquierda actualizando `inicio <- medio + 1`. El proceso se repite mientras `inicio <= fin`. Al dividir el rango a la mitad en cada paso, su rendimiento es extraordinario.",
    "basicExpl": {
      "analogies": "Imagina buscar una palabra en un diccionario de 1000 páginas ordenado alfabéticamente. No comienzas desde la página 1 leyendo palabra por palabra. Abres el diccionario exactamente por la mitad (página 500). Si la palabra que buscas empieza por 'M' y en la página 500 están por la 'S', sabes con certeza absoluta que la palabra está en las primeras 500 páginas. Acabas de descartar 500 páginas de un solo golpe. Repites el proceso abriendo la página 250 hasta dar con la palabra.",
      "keyPoints": [
        "Requisito estricto: El arreglo DEBE estar ordenado previamente.",
        "Divide el espacio de búsqueda a la mitad en cada iteración.",
        "Complejidad de tiempo logarítmica: O(log n).",
        "Para 1,000,000 de elementos, requiere como máximo unas 20 comparaciones."
      ]
    },
    "intermediateExpl": "Búsqueda de la clave 70 en vector ordenado de 7 elementos:\nVector: `[10, 20, 30, 40, 50, 60, 70]` (índices 1 a 7)\n- Iteración 1: `inicio = 1`, `fin = 7`. `medio = trunc((1 + 7)/2) = 4` -> `vector[4] = 40`.\n  ¿70 = 40? No. Como 70 > 40, descartamos la mitad izquierda -> `inicio <- 4 + 1 = 5`.\n- Iteración 2: `inicio = 5`, `fin = 7`. `medio = trunc((5 + 7)/2) = 6` -> `vector[6] = 60`.\n  ¿70 = 60? No. Como 70 > 60, descartamos la izquierda -> `inicio <- 6 + 1 = 7`.\n- Iteración 3: `inicio = 7`, `fin = 7`. `medio = trunc((7 + 7)/2) = 7` -> `vector[7] = 70`.\n  ¿70 = 70? ¡Sí! Hallado en la posición 7 tras solo 3 comparaciones.",
    "expertExpl": "La complejidad temporal de la búsqueda binaria es O(log₂ n) en el peor y caso promedio, y O(1) en el mejor caso. Espacialmente es O(1) en su versión iterativa. La cantidad máxima de operaciones para un arreglo de tamaño n viene dada por ⌈log₂(n)⌉. Un error clásico de implementación en lenguajes como C/Java es el desbordamiento de enteros en la suma `(inicio + fin) / 2`; la forma a prueba de overflow es `inicio + (fin - inicio) / 2`. En PSeInt usamos `trunc` para garantizar índices enteros válidos.",
    "code": "// Algoritmo: Búsqueda Binaria Iterativa en Vector Ordenado\nAlgoritmo BusquedaBinariaVector\n    Definir TAMANIO, inicio, finRango, medio, elementoBuscado, posicionHallada Como Entero\n    Definir encontrado Como Logico\n    \n    TAMANIO <- 7\n    Definir vectorOrdenado Como Entero\n    Dimension vectorOrdenado[TAMANIO]\n    \n    // El arreglo DEBE estar estrictamente ordenado\n    vectorOrdenado[1] <- 12\n    vectorOrdenado[2] <- 25\n    vectorOrdenado[3] <- 38\n    vectorOrdenado[4] <- 47\n    vectorOrdenado[5] <- 59\n    vectorOrdenado[6] <- 73\n    vectorOrdenado[7] <- 88\n    \n    elementoBuscado <- 59\n    \n    // Inicialización de límites de búsqueda\n    inicio <- 1\n    finRango <- TAMANIO\n    encontrado <- Falso\n    posicionHallada <- -1\n    \n    Escribir \"=== BÚSQUEDA BINARIA DIVIDE Y VENCERÁS ===\"\n    Escribir \"Buscando elemento:\", elementoBuscado\n    \n    // Bucle principal mientras el rango sea válido y no se haya encontrado\n    Mientras inicio <= finRango Y NO encontrado Hacer\n        // Calculamos el índice medio exacto\n        medio <- trunc((inicio + finRango) / 2)\n        \n        Si vectorOrdenado[medio] = elementoBuscado Entonces\n            encontrado <- Verdadero\n            posicionHallada <- medio\n        Sino\n            Si elementoBuscado < vectorOrdenado[medio] Entonces\n                // El elemento está en la mitad izquierda\n                finRango <- medio - 1\n            Sino\n                // El elemento está en la mitad derecha\n                inicio <- medio + 1\n            FinSi\n        FinSi\n    FinMientras\n    \n    Escribir \"\"\n    Si encontrado Entonces\n        Escribir \"¡Localizado! El valor\", elementoBuscado, \"está en el índice:\", posicionHallada\n    Sino\n        Escribir \"El elemento\", elementoBuscado, \"no se encuentra en el arreglo.\"\n    FinSi\nFinAlgoritmo",
    "output": "=== BÚSQUEDA BINARIA DIVIDE Y VENCERÁS ===\nBuscando elemento: 59\n\n¡Localizado! El valor 59 está en el índice: 5",
    "evaluation": {
      "starterCode": "// Ejercicio: Implementa la búsqueda binaria para encontrar el número 15\n// en el vector ordenado [5, 10, 15, 20, 25, 30].\nAlgoritmo EvaluacionBusquedaBinaria\n    Definir vector Como Entero\n    Dimension vector[6]\n    vector[1] <- 5; vector[2] <- 10; vector[3] <- 15\n    vector[4] <- 20; vector[5] <- 25; vector[6] <- 30\n    \n    Definir inicio, finRango, medio, buscado, resultado Como Entero\n    buscado <- 15\n    inicio <- 1\n    finRango <- 6\n    resultado <- -1\n    \n    // Completa el ciclo Mientras para la búsqueda binaria\n    \n    Escribir \"Posición encontrada:\", resultado\nFinAlgoritmo",
      "task": "Completa el bucle de búsqueda binaria para ubicar el valor 15 (ubicado en el índice 3) y almacenarlo en la variable 'resultado'.",
      "testRunner": "function(code, output) { const passed = /Posición encontrada:\\s*3/i.test(output); return { passed: passed, feedback: passed ? '¡Extraordinario! Has implementado el algoritmo de búsqueda binaria a la perfección.' : 'Verifica el cálculo de medio y la actualización de inicio y finRango.' }; }",
      "solution": "Algoritmo EvaluacionBusquedaBinaria\n    Definir vector Como Entero\n    Dimension vector[6]\n    vector[1] <- 5; vector[2] <- 10; vector[3] <- 15\n    vector[4] <- 20; vector[5] <- 25; vector[6] <- 30\n    \n    Definir inicio, finRango, medio, buscado, resultado Como Entero\n    buscado <- 15\n    inicio <- 1\n    finRango <- 6\n    resultado <- -1\n    \n    Mientras inicio <= finRango Y resultado = -1 Hacer\n        medio <- trunc((inicio + finRango) / 2)\n        Si vector[medio] = buscado Entonces\n            resultado <- medio\n        Sino\n            Si buscado < vector[medio] Entonces\n                finRango <- medio - 1\n            Sino\n                inicio <- medio + 1\n            FinSi\n        FinSi\n    FinMientras\n    \n    Escribir \"Posición encontrada:\", resultado\nFinAlgoritmo"
    },
    "externalLinks": [
      {
        "title": "Khan Academy: Búsqueda binaria",
        "url": "https://es.khanacademy.org/computing/computer-science/algorithms/binary-search/a/binary-search"
      },
      {
        "title": "GeeksforGeeks: Binary Search",
        "url": "https://www.geeksforgeeks.org/binary-search/"
      }
    ]
  },
  {
    "id": 30,
    "slug": "ordenamiento-burbuja",
    "title": "Ordenamiento de Vectores: Algoritmo Burbuja",
    "titleEs": "Ordenamiento de Vectores: Algoritmo Burbuja",
    "category": "Arreglos Unidimensionales (Vectores)",
    "categorySlug": "arreglos-vectores",
    "categoryIcon": "layers",
    "difficulty": "Avanzado",
    "summary": "Aprende el método de ordenamiento burbuja (Bubble Sort) para reorganizar secuencias de datos mediante pasadas sucesivas y comparaciones de pares adyacentes.",
    "originalExpl": "El ordenamiento de burbuja (Bubble Sort) es uno de los algoritmos de ordenamiento más conocidos en la enseñanza de las ciencias computacionales. Su nombre proviene de la forma en que los elementos más grandes 'flotan' progresivamente hacia el extremo final del vector en cada pasada, similar a las burbujas de aire que suben a la superficie en el agua. El algoritmo funciona mediante dos bucles anidados: el bucle exterior controla el número de pasadas (se requieren a lo sumo N-1 pasadas para ordenar N elementos). El bucle interior compara de forma adyacente cada par de elementos consecutivos `vector[j]` y `vector[j+1]`. Si el elemento de la izquierda es mayor que el de la derecha (`vector[j] > vector[j+1]`), se intercambian de posición usando una variable temporal auxiliar. Al finalizar todas las pasadas, el vector queda ordenado de manera ascendente.",
    "basicExpl": {
      "analogies": "Imagina una fila de niños de diferentes estaturas que quieren ordenarse del más bajo al más alto. El profesor empieza desde el inicio de la fila comparando únicamente al niño 1 con el niño 2; si el niño 1 es más alto, intercambian lugares. Luego compara al niño 2 con el niño 3 y hace lo mismo. Al completar toda la fila una vez, el niño más alto de todos habrá terminado obligatoriamente en el último lugar. El profesor repite la rutina con los restantes hasta que toda la fila esté perfecta.",
      "keyPoints": [
        "Compara pares de elementos contiguos e intercambia sus posiciones si están desordenados.",
        "En cada pasada completa, el elemento de mayor valor queda colocado en su posición definitiva final.",
        "Utiliza dos bucles anidados y una variable auxiliar de intercambio (Swap).",
        "Es un algoritmo estable e in-place (no requiere memoria extra)."
      ]
    },
    "intermediateExpl": "Traza de la Pasada 1 para el vector `[5, 1, 4, 2]`:\n- Comparación 1: ¿5 > 1? Sí -> Intercambio -> `[1, 5, 4, 2]`\n- Comparación 2: ¿5 > 4? Sí -> Intercambio -> `[1, 4, 5, 2]`\n- Comparación 3: ¿5 > 2? Sí -> Intercambio -> `[1, 4, 2, 5]`\n¡El número 5 (la burbuja más pesada) flotó con éxito hasta la última posición!\nPasada 2: Comparará hasta la penúltima posición dejando el 4 en su lugar.",
    "expertExpl": "El análisis de complejidad temporal del método burbuja es cuadrático: Peor caso: O(n²) cuando el vector está en orden inverso. Caso promedio: O(n²). Mejor caso (con bandera de optimización de corte): O(n) si el vector ya estaba ordenado. Complejidad espacial: O(1) estricto (in-place). Aunque para conjuntos de datos masivos se prefieren algoritmos O(n log n) como Quicksort o Mergesort, Bubble Sort es insustituible pedagógicamente para dominar la sincronización de bucles anidados y mutaciones controladas en memoria contigua.",
    "code": "// Algoritmo: Ordenamiento por Método de Burbuja Ascendente\nAlgoritmo OrdenamientoMetodoBurbuja\n    Definir TAMANIO, i, j, auxiliar Como Entero\n    TAMANIO <- 5\n    \n    Definir vector Como Entero\n    Dimension vector[TAMANIO]\n    \n    // Llenamos el vector con valores desordenados\n    vector[1] <- 64\n    vector[2] <- 34\n    vector[3] <- 25\n    vector[4] <- 12\n    vector[5] <- 22\n    \n    Escribir \"=== VECTOR ORIGINAL DESORDENADO ===\"\n    Para i <- 1 Hasta TAMANIO Con Paso 1 Hacer\n        Escribir Sin Bajar vector[i], \" \"\n    FinPara\n    Escribir \"\"\n    \n    // ALGORITMO BURBUJA: Dos bucles anidados\n    Para i <- 1 Hasta TAMANIO - 1 Con Paso 1 Hacer\n        Para j <- 1 Hasta TAMANIO - i Con Paso 1 Hacer\n            // Si el elemento actual es mayor que el siguiente, se intercambian\n            Si vector[j] > vector[j + 1] Entonces\n                auxiliar <- vector[j]\n                vector[j] <- vector[j + 1]\n                vector[j + 1] <- auxiliar\n            FinSi\n        FinPara\n    FinPara\n    \n    Escribir \"\"\n    Escribir \"=== VECTOR RESULTANTE ORDENADO ASCENDENTEMENTE ===\"\n    Para i <- 1 Hasta TAMANIO Con Paso 1 Hacer\n        Escribir Sin Bajar vector[i], \" \"\n    FinPara\n    Escribir \"\"\nFinAlgoritmo",
    "output": "=== VECTOR ORIGINAL DESORDENADO ===\n64 34 25 12 22 \n\n=== VECTOR RESULTANTE ORDENADO ASCENDENTEMENTE ===\n12 22 25 34 64",
    "evaluation": {
      "starterCode": "// Ejercicio: Implementa el intercambio dentro del algoritmo burbuja para ordenar\n// el vector de 3 elementos [9, 3, 1] en orden ascendente.\nAlgoritmo EvaluacionBurbuja\n    Definir v, i, j, aux Como Entero\n    Dimension v[3]\n    v[1] <- 9; v[2] <- 3; v[3] <- 1\n    \n    // Bucle exterior\n    Para i <- 1 Hasta 2 Con Paso 1 Hacer\n        Para j <- 1 Hasta 3 - i Con Paso 1 Hacer\n            // Escribe la condición y el intercambio usando 'aux'\n            Si v[j] > v[j + 1] Entonces\n                // Realiza el swap aquí\n            FinSi\n        FinPara\n    FinPara\n    \n    Escribir \"Primer elemento ordenado:\", v[1]\n    Escribir \"Último elemento ordenado:\", v[3]\nFinAlgoritmo",
      "task": "Completa el bloque de intercambio (swap) con la variable auxiliar para ordenar el arreglo. El primer elemento debe ser 1 y el último 9.",
      "testRunner": "function(code, output) { const hasFirst = /Primer elemento ordenado:\\s*1/i.test(output); const hasLast = /Último elemento ordenado:\\s*9/i.test(output); return { passed: hasFirst && hasLast, feedback: hasFirst && hasLast ? '¡Brillante! Has implementado el intercambio clásico del método burbuja.' : 'Verifica el intercambio de variables con la variable aux.' }; }",
      "solution": "Algoritmo EvaluacionBurbuja\n    Definir v, i, j, aux Como Entero\n    Dimension v[3]\n    v[1] <- 9; v[2] <- 3; v[3] <- 1\n    \n    Para i <- 1 Hasta 2 Con Paso 1 Hacer\n        Para j <- 1 Hasta 3 - i Con Paso 1 Hacer\n            Si v[j] > v[j + 1] Entonces\n                aux <- v[j]\n                v[j] <- v[j + 1]\n                v[j + 1] <- aux\n            FinSi\n        FinPara\n    FinPara\n    \n    Escribir \"Primer elemento ordenado:\", v[1]\n    Escribir \"Último elemento ordenado:\", v[3]\nFinAlgoritmo"
    },
    "externalLinks": [
      {
        "title": "Wikipedia: Ordenamiento de burbuja",
        "url": "https://es.wikipedia.org/wiki/Ordenamiento_de_burbuja"
      },
      {
        "title": "Visualgo: Visualizador Bubble Sort",
        "url": "https://visualgo.net/en/sorting"
      }
    ]
  },
  {
    "id": 31,
    "slug": "ordenamiento-seleccion",
    "title": "Ordenamiento por Selección (Selection Sort)",
    "titleEs": "Ordenamiento por Selección (Selection Sort)",
    "category": "Arreglos Unidimensionales (Vectores)",
    "categorySlug": "arreglos-vectores",
    "categoryIcon": "layers",
    "difficulty": "Avanzado",
    "summary": "Implementa el algoritmo de ordenamiento por selección, buscando iterativamente el valor mínimo de la porción desordenada y colocándolo al frente.",
    "originalExpl": "El algoritmo de ordenamiento por selección (Selection Sort) divide conceptualmente el vector en dos partes: una sublista ordenada a la izquierda (inicialmente vacía) y una sublista desordenada a la derecha (que contiene todos los elementos inicialmente). En cada pasada del bucle exterior, el algoritmo recorre la porción desordenada restante para identificar la posición del elemento mínimo absoluto. Una vez localizado el índice del valor mínimo, realiza un único intercambio (swap) con el primer elemento de la sublista desordenada, expandiendo la zona ordenada en un elemento hacia la derecha. A diferencia del método burbuja que realiza múltiples intercambios en cada pasada, la selección realiza a lo sumo un intercambio por pasada exterior (N-1 intercambios en total), lo que resulta muy ventajoso cuando las operaciones de escritura en memoria son costosas.",
    "basicExpl": {
      "analogies": "Imagina que tienes una baraja de cartas desordenada sobre la mesa. Buscas con la vista en toda la mesa la carta más baja de todas (por ejemplo, el as de oros) y la tomas para colocarla como la primera de tu mano. Luego miras las cartas restantes sobre la mesa, buscas la menor que queda, y la colocas al lado de la primera. Repites este proceso de selección selectiva hasta que no queden cartas en la mesa.",
      "keyPoints": [
        "Localiza el valor mínimo del segmento desordenado y lo coloca en su posición definitiva.",
        "Realiza como máximo N-1 intercambios en total (muy eficiente en escrituras).",
        "Mantiene un índice 'posMinimo' para rastrear la ubicación del menor elemento.",
        "Estructura basada en dos bucles anidados con límite variable."
      ]
    },
    "intermediateExpl": "Traza paso a paso para el vector `[29, 10, 14, 37]`:\n- Pasada 1 (i = 1): Busca el menor desde el índice 1 al 4. Encuentra que el menor es 10 en la posición 2. Intercambia posición 1 con posición 2 -> `[10, 29, 14, 37]`.\n- Pasada 2 (i = 2): Busca el menor desde el índice 2 al 4 (`[29, 14, 37]`). El menor es 14 en la posición 3. Intercambia posición 2 con posición 3 -> `[10, 14, 29, 37]`.\n- Pasada 3 (i = 3): Busca el menor en `[29, 37]`. El menor es 29 en la posición 3 (ya en su lugar). No hay intercambio necesario.\nResultado: `[10, 14, 29, 37]` ordenado en 3 pasadas y solo 2 intercambios.",
    "expertExpl": "La complejidad temporal de Selection Sort es O(n²) en todos los casos (mejor, promedio y peor), porque para encontrar el mínimo debe comparar indefectiblemente todos los elementos restantes sin importar el orden inicial. Sin embargo, su ventaja primordial radica en su complejidad de escrituras en memoria: O(n) swaps frente a O(n²) en Bubble Sort. Esto lo hace útil en sistemas embebidos donde la memoria flash o EEPROM tiene ciclos de escritura limitados que se desgastan rápidamente.",
    "code": "// Algoritmo: Ordenamiento por Selección (Selection Sort)\nAlgoritmo OrdenamientoPorSeleccion\n    Definir TAMANIO, i, j, posMinimo, auxiliar Como Entero\n    TAMANIO <- 5\n    \n    Definir arreglo Como Entero\n    Dimension arreglo[TAMANIO]\n    \n    // Asignación de datos desordenados\n    arreglo[1] <- 64\n    arreglo[2] <- 25\n    arreglo[3] <- 12\n    arreglo[4] <- 22\n    arreglo[5] <- 11\n    \n    Escribir \"=== ARREGLO ORIGINAL DESORDENADO ===\"\n    Para i <- 1 Hasta TAMANIO Con Paso 1 Hacer\n        Escribir Sin Bajar arreglo[i], \" \"\n    FinPara\n    Escribir \"\"\n    \n    // ALGORITMO DE SELECCIÓN\n    Para i <- 1 Hasta TAMANIO - 1 Con Paso 1 Hacer\n        // Asumimos inicialmente que el menor elemento está en la posición i\n        posMinimo <- i\n        \n        // Buscamos el elemento mínimo en el resto del arreglo no ordenado\n        Para j <- i + 1 Hasta TAMANIO Con Paso 1 Hacer\n            Si arreglo[j] < arreglo[posMinimo] Entonces\n                posMinimo <- j\n            FinSi\n        FinPara\n        \n        // Si el mínimo no es el elemento actual, realizamos el intercambio (Swap)\n        Si posMinimo <> i Entonces\n            auxiliar <- arreglo[i]\n            arreglo[i] <- arreglo[posMinimo]\n            arreglo[posMinimo] <- auxiliar\n        FinSi\n    FinPara\n    \n    Escribir \"\"\n    Escribir \"=== ARREGLO ORDENADO POR SELECCIÓN ===\"\n    Para i <- 1 Hasta TAMANIO Con Paso 1 Hacer\n        Escribir Sin Bajar arreglo[i], \" \"\n    FinPara\n    Escribir \"\"\nFinAlgoritmo",
    "output": "=== ARREGLO ORIGINAL DESORDENADO ===\n64 25 12 22 11 \n\n=== ARREGLO ORDENADO POR SELECCIÓN ===\n11 12 22 25 64",
    "evaluation": {
      "starterCode": "// Ejercicio: Completa la condición para detectar si se encontró un número menor\n// en la búsqueda del índice mínimo del algoritmo de selección.\nAlgoritmo EvaluacionSeleccion\n    Definir v, i, j, posMin, aux Como Entero\n    Dimension v[3]\n    v[1] <- 30; v[2] <- 10; v[3] <- 20\n    \n    Para i <- 1 Hasta 2 Con Paso 1 Hacer\n        posMin <- i\n        Para j <- i + 1 Hasta 3 Con Paso 1 Hacer\n            // Completa la comparación aquí:\n            Si v[j] < v[posMin] Entonces\n                posMin <- j\n            FinSi\n        FinPara\n        aux <- v[i]\n        v[i] <- v[posMin]\n        v[posMin] <- aux\n    FinPara\n    \n    Escribir \"Primer elemento ordenado:\", v[1]\nFinAlgoritmo",
      "task": "Completa el algoritmo de selección y verifica que el primer elemento ordenado sea 10.",
      "testRunner": "function(code, output) { const passed = /Primer elemento ordenado:\\s*10/i.test(output); return { passed: passed, feedback: passed ? '¡Excelente! Has dominado el rastreo del índice mínimo en Selection Sort.' : 'Verifica que la condición compare v[j] < v[posMin].' }; }",
      "solution": "Algoritmo EvaluacionSeleccion\n    Definir v, i, j, posMin, aux Como Entero\n    Dimension v[3]\n    v[1] <- 30; v[2] <- 10; v[3] <- 20\n    \n    Para i <- 1 Hasta 2 Con Paso 1 Hacer\n        posMin <- i\n        Para j <- i + 1 Hasta 3 Con Paso 1 Hacer\n            Si v[j] < v[posMin] Entonces\n                posMin <- j\n            FinSi\n        FinPara\n        aux <- v[i]\n        v[i] <- v[posMin]\n        v[posMin] <- aux\n    FinPara\n    \n    Escribir \"Primer elemento ordenado:\", v[1]\nFinAlgoritmo"
    },
    "externalLinks": [
      {
        "title": "Wikipedia: Ordenamiento por selección",
        "url": "https://es.wikipedia.org/wiki/Ordenamiento_por_selecci%C3%B3n"
      },
      {
        "title": "GeeksforGeeks: Selection Sort Algorithm",
        "url": "https://www.geeksforgeeks.org/selection-sort/"
      }
    ]
  },
  {
    "id": 32,
    "slug": "estadisticas-vectoriales",
    "title": "Estadísticas Vectoriales: Máximo, Mínimo y Promedio",
    "titleEs": "Estadísticas Vectoriales: Máximo, Mínimo y Promedio",
    "category": "Arreglos Unidimensionales (Vectores)",
    "categorySlug": "arreglos-vectores",
    "categoryIcon": "layers",
    "difficulty": "Intermedio",
    "summary": "Aprende el patrón algorítmico universal para calcular el valor máximo, el mínimo y la media aritmética de una serie de datos en una sola pasada lineal.",
    "originalExpl": "El cálculo de métricas estadísticas básicas (valor máximo, mínimo, suma acumulada y promedio aritmético) sobre un arreglo es uno de los problemas más frecuentes en la ingeniería de software y la ciencia de datos. Un error común de principiante es inicializar las variables `maximo` en 0 o `minimo` en valores arbitrarios, lo cual falla catastróficamente si el vector contiene números negativos. La técnica correcta y robusta consiste en inicializar tanto `maximo` como `minimo` con el valor exacto del primer elemento del vector (`vector[1]`), y luego recorrer desde el segundo elemento en adelante (`i <- 2 Hasta N`), actualizando los extremos en caso de encontrar valores que superen el récord actual. Al mismo tiempo, se acumula la suma de todos los elementos para calcular el promedio final dividiendo entre N.",
    "basicExpl": {
      "analogies": "Imagina una competencia de salto de altura. El primer atleta salta y marca la vara en 1.80 metros: en ese momento él es simultáneamente el saltador más alto y el más bajo porque es el único que ha saltado. Cada nuevo atleta salta a continuación; si salta más alto que 1.80m, se actualiza el récord de salto máximo. Si salta menos, se mantiene el récord. Al terminar el último atleta, conoces el récord máximo y el mínimo sin haber tenido que repetir la competencia.",
      "keyPoints": [
        "Inicializar máximo y mínimo siempre con el primer elemento del vector: vector[1].",
        "Permite calcular máximo, mínimo y suma en una única pasada lineal O(n).",
        "El promedio se calcula como la suma total dividida entre el número de elementos.",
        "Funciona de forma 100% confiable incluso con números negativos o decimales."
      ]
    },
    "intermediateExpl": "Prueba de escritorio con vector `[-5, 12, -20, 8]`:\n- Inicialización: `maximo <- -5`, `minimo <- -5`, `suma <- -5`\n- Iteración con 12: ¿12 > -5? Sí -> `maximo <- 12`. ¿12 < -5? No. `suma <- -5 + 12 = 7`\n- Iteración con -20: ¿-20 > 12? No. ¿-20 < -5? Sí -> `minimo <- -20`. `suma <- 7 + (-20) = -13`\n- Iteración con 8: ¿8 > 12? No. ¿8 < -20? No. `suma <- -13 + 8 = -5`\nResultados finales: Máximo = 12, Mínimo = -20, Suma = -5, Promedio = -1.25.",
    "expertExpl": "El patrón de reducción lineal (Fold / Reduce) sobre un vector ejecuta exactamente n-1 comparaciones para el cálculo de máximos y mínimos. Existe una optimización teórica que compara elementos en parejas adyacentes para reducir la cantidad de comparaciones a 3n/2 en lugar de 2n. En procesamiento masivo de datos (SIMD / Vectorización de CPU), estas operaciones se ejecutan en registros de 256 o 512 bits procesando hasta 16 flotantes simultáneamente en un solo ciclo de reloj.",
    "code": "// Algoritmo: Cálculo de Máximo, Mínimo y Promedio de un Vector\nAlgoritmo EstadisticasVectoriales\n    Definir TAMANIO, i Como Entero\n    Definir maximo, minimo, sumaTotal, promedio Como Real\n    \n    TAMANIO <- 5\n    Definir calificaciones Como Real\n    Dimension calificaciones[TAMANIO]\n    \n    // Asignación de datos de prueba\n    calificaciones[1] <- 14.5\n    calificaciones[2] <- 18.0\n    calificaciones[3] <- 09.5\n    calificaciones[4] <- 20.0\n    calificaciones[5] <- 13.0\n    \n    // PATRÓN ROBUSTO: Inicializar con el primer elemento\n    maximo <- calificaciones[1]\n    minimo <- calificaciones[1]\n    sumaTotal <- calificaciones[1]\n    \n    // Recorremos desde el segundo elemento en adelante\n    Para i <- 2 Hasta TAMANIO Con Paso 1 Hacer\n        // Actualización de máximo\n        Si calificaciones[i] > maximo Entonces\n            maximo <- calificaciones[i]\n        FinSi\n        \n        // Actualización de mínimo\n        Si calificaciones[i] < minimo Entonces\n            minimo <- calificaciones[i]\n        FinSi\n        \n        // Acumulación para el promedio\n        sumaTotal <- sumaTotal + calificaciones[i]\n    FinPara\n    \n    promedio <- sumaTotal / TAMANIO\n    \n    Escribir \"=== RESULTADOS ESTADÍSTICOS DE CALIFICACIONES ===\"\n    Escribir \"Nota Máxima registrada:\", maximo\n    Escribir \"Nota Mínima registrada:\", minimo\n    Escribir \"Suma total acumulada:\", sumaTotal\n    Escribir \"Promedio aritmético:\", promedio\nFinAlgoritmo",
    "output": "=== RESULTADOS ESTADÍSTICOS DE CALIFICACIONES ===\nNota Máxima registrada: 20\nNota Mínima registrada: 9.5\nSuma total acumulada: 75\nPromedio aritmético: 15",
    "evaluation": {
      "starterCode": "// Ejercicio: En un vector de 3 temperaturas [15, 32, 28], calcula y muestra\n// la temperatura máxima y la temperatura mínima.\nAlgoritmo EvaluacionEstadisticas\n    Definir temps Como Real\n    Dimension temps[3]\n    temps[1] <- 15; temps[2] <- 32; temps[3] <- 28\n    \n    Definir tMax, tMin Como Real\n    // Inicializa tMax y tMin con el primer elemento y completa el ciclo\n    \n    Escribir \"Temperatura máxima:\", tMax\n    Escribir \"Temperatura mínima:\", tMin\nFinAlgoritmo",
      "task": "Completa el algoritmo para que determine que la temperatura máxima es 32 y la mínima es 15.",
      "testRunner": "function(code, output) { const hasMax = /Temperatura máxima:\\s*32/i.test(output); const hasMin = /Temperatura mínima:\\s*15/i.test(output); return { passed: hasMax && hasMin, feedback: hasMax && hasMin ? '¡Excelente trabajo! Has implementado el patrón universal de extremos estadísticos.' : 'Verifica que tMax sea 32 y tMin sea 15.' }; }",
      "solution": "Algoritmo EvaluacionEstadisticas\n    Definir temps Como Real\n    Dimension temps[3]\n    temps[1] <- 15; temps[2] <- 32; temps[3] <- 28\n    \n    Definir tMax, tMin Como Real\n    Definir i Como Entero\n    tMax <- temps[1]\n    tMin <- temps[1]\n    \n    Para i <- 2 Hasta 3 Con Paso 1 Hacer\n        Si temps[i] > tMax Entonces\n            tMax <- temps[i]\n        FinSi\n        Si temps[i] < tMin Entonces\n            tMin <- temps[i]\n        FinSi\n    FinPara\n    \n    Escribir \"Temperatura máxima:\", tMax\n    Escribir \"Temperatura mínima:\", tMin\nFinAlgoritmo"
    },
    "externalLinks": [
      {
        "title": "GeeksforGeeks: Maximum and minimum in an array",
        "url": "https://www.geeksforgeeks.org/maximum-and-minimum-in-an-array/"
      },
      {
        "title": "OpenWebinars: Algoritmos con arreglos",
        "url": "https://openwebinars.net/"
      }
    ]
  },
  {
    "id": 33,
    "slug": "matrices-declaracion",
    "title": "Matrices Bidimensionales: Declaración y Asignación",
    "titleEs": "Matrices Bidimensionales: Declaración y Asignación",
    "category": "Arreglos Bidimensionales (Matrices)",
    "categorySlug": "arreglos-matrices",
    "categoryIcon": "grid",
    "difficulty": "Intermedio",
    "summary": "Adéntrate en las estructuras multidimensionales creando matrices de 2 dimensiones, comprendiendo el concepto de filas, columnas y coordenadas de indexación matricial.",
    "originalExpl": "Una matriz bidimensional (o tabla) es una estructura de datos homogénea que organiza los elementos en una cuadrícula rectangular compuesta por filas horizontales y columnas verticales. En PSeInt, una matriz se declara y dimensiona mediante la directiva `Dimension nombreMatriz[filas, columnas]`. Para acceder, leer o escribir en una celda específica de la matriz, se proporcionan dos coordenadas separadas por coma entre corchetes: `matriz[fila, columna]`. Por convención universal de álgebra lineal y computación, el primer índice indica siempre la fila horizontal (eje Y o renglón) y el segundo índice especifica la columna vertical (eje X). Ambas dimensiones siguen la convención de índices de PSeInt comenzando en 1.",
    "basicExpl": {
      "analogies": "Imagina una hoja de cálculo de Excel o un tablero de ajedrez. Cada casilla se identifica mediante la intersección de una fila y una columna. Para anotar un número en la fila 2 y columna 3, buscas la segunda fila horizontal y te mueves a la tercera casilla vertical. Esa casilla es única en todo el tablero.",
      "keyPoints": [
        "Una matriz bidimensional organiza datos en una cuadrícula de filas y columnas.",
        "En PSeInt se dimensiona con dos parámetros: Dimension matriz[filas, columnas].",
        "El primer índice representa la fila y el segundo la columna: matriz[f, c].",
        "El número total de celdas disponibles es igual al producto de Filas * Columnas."
      ]
    },
    "intermediateExpl": "Estructura de coordenadas para una matriz de 2 filas por 3 columnas:\n                 Columna 1      Columna 2      Columna 3\nFila 1 ->      matriz[1, 1]   matriz[1, 2]   matriz[1, 3]\nFila 2 ->      matriz[2, 1]   matriz[2, 2]   matriz[2, 3]\nEjemplo de asignación:\n- `matriz[1, 2] <- 85` (asigna 85 en la primera fila, segunda columna).\n- `matriz[2, 3] <- 100` (asigna 100 en la esquina inferior derecha).",
    "expertExpl": "En la memoria física de la computadora (RAM), la memoria es estrictamente lineal (unidimensional). Los compiladores aplanan las matrices bidimensionales mapeándolas en memoria mediante uno de dos órdenes: 'Row-Major Order' (orden por filas, utilizado por C, Go y PSeInt) o 'Column-Major Order' (orden por columnas, utilizado por Fortran y MATLAB). En Row-Major, la dirección de memoria de la celda `[f, c]` se calcula como: `Dirección = Base + ((f - 1) * TotalColumnas + (c - 1)) * TamañoDato`. Entender este mapeo es crucial para optimizar el acceso a la memoria caché.",
    "code": "// Algoritmo: Declaración, Asignación y Acceso a una Matriz 2x3\nAlgoritmo DeclaracionAsignacionMatrices\n    // 1. Declaramos el tipo de dato de la matriz\n    Definir tablero Como Entero\n    \n    // 2. Dimensionamos la matriz con 2 Filas y 3 Columnas\n    Dimension tablero[2, 3]\n    \n    // 3. Asignación directa a las celdas de la Fila 1\n    tablero[1, 1] <- 10\n    tablero[1, 2] <- 20\n    tablero[1, 3] <- 30\n    \n    // 4. Asignación directa a las celdas de la Fila 2\n    tablero[2, 1] <- 40\n    tablero[2, 2] <- 50\n    tablero[2, 3] <- 60\n    \n    // 5. Lectura y visualización de celdas específicas\n    Escribir \"=== ACCESO INDIVIDUAL A CELDAS DE LA MATRIZ ===\"\n    Escribir \"Celda Fila 1, Columna 1:\", tablero[1, 1]\n    Escribir \"Celda Fila 1, Columna 3:\", tablero[1, 3]\n    Escribir \"Celda Fila 2, Columna 2 (Centro):\", tablero[2, 2]\n    Escribir \"Celda Fila 2, Columna 3 (Final):\", tablero[2, 3]\nFinAlgoritmo",
    "output": "=== ACCESO INDIVIDUAL A CELDAS DE LA MATRIZ ===\nCelda Fila 1, Columna 1: 10\nCelda Fila 1, Columna 3: 30\nCelda Fila 2, Columna 2 (Centro): 50\nCelda Fila 2, Columna 3 (Final): 60",
    "evaluation": {
      "starterCode": "// Ejercicio: Declara una matriz llamada 'grilla' de 2 filas y 2 columnas de tipo Entero.\n// Asigna el número 99 en la celda [2, 1] (segunda fila, primera columna).\nAlgoritmo EvaluacionMatrices\n    Definir grilla Como Entero\n    // Dimensiona la matriz de 2x2 y asigna el valor indicado\n    \n    Escribir \"Valor en celda [2,1]:\", grilla[2, 1]\nFinAlgoritmo",
      "task": "Dimensiona 'grilla' de 2x2 con 'Dimension grilla[2, 2]' y asigna 'grilla[2, 1] <- 99'.",
      "testRunner": "function(code, output) { const hasDim = /Dimension\\s+grilla\\s*\\[\\s*2\\s*,\\s*2\\s*\\]/i.test(code); const hasVal = /Valor en celda \\[2,1\\]:\\s*99/i.test(output); return { passed: hasDim && hasVal, feedback: hasDim && hasVal ? '¡Excelente! Has declarado y asignado correctamente una matriz 2D.' : 'Asegúrate de dimensionar grilla[2, 2] y asignar 99 a [2, 1].' }; }",
      "solution": "Algoritmo EvaluacionMatrices\n    Definir grilla Como Entero\n    Dimension grilla[2, 2]\n    grilla[2, 1] <- 99\n    \n    Escribir \"Valor en celda [2,1]:\", grilla[2, 1]\nFinAlgoritmo"
    },
    "externalLinks": [
      {
        "title": "Documentación PSeInt: Arreglos Multidimensionales",
        "url": "http://pseint.sourceforge.net/"
      },
      {
        "title": "GeeksforGeeks: Multidimensional Arrays in C/C++",
        "url": "https://www.geeksforgeeks.org/multidimensional-arrays-c-cpp/"
      }
    ]
  },
  {
    "id": 34,
    "slug": "matrices-recorrido",
    "title": "Recorrido Matricial con Bucles Anidados",
    "titleEs": "Recorrido Matricial con Bucles Anidados",
    "category": "Arreglos Bidimensionales (Matrices)",
    "categorySlug": "arreglos-matrices",
    "categoryIcon": "grid",
    "difficulty": "Intermedio",
    "summary": "Domina el recorrido sistemático de matrices bidimensionales mediante dos ciclos Para anidados, coordinando filas y columnas con formato tabular.",
    "originalExpl": "Para procesar o imprimir todos los elementos de una matriz sin escribir manualmente cada coordenada, se recurre a la combinación de dos bucles repetitivos `Para` anidados. El bucle exterior controla el índice de la fila (`f`), mientras que el bucle interior controla el índice de la columna (`c`). Por cada iteración del bucle exterior, el bucle interior se ejecuta por completo recorriendo todas las columnas de esa fila de izquierda a derecha. En PSeInt, para presentar la matriz de forma visualmente agradable en consola, se utiliza la directiva `Escribir Sin Bajar` dentro del ciclo interior (imprimiendo las celdas de la fila en la misma línea con separadores), y al concluir el bucle interior se emite un `Escribir \"\"` para saltar al siguiente renglón.",
    "basicExpl": {
      "analogies": "Imagina leer un libro o un periódico de texto occidental. Tus ojos se sitúan en la línea 1 (bucle exterior de filas) y leen cada palabra de izquierda a derecha hasta llegar al punto final de la línea (bucle interior de columnas). Cuando terminas esa línea, haces un salto de renglón hacia abajo e inicias la línea 2, repitiendo la lectura de izquierda a derecha.",
      "keyPoints": [
        "El bucle exterior gestiona el avance de las filas (f).",
        "El bucle interior recorre cada una de las columnas (c) correspondientes a la fila actual.",
        "La directiva 'Escribir Sin Bajar' permite mantener las celdas en el mismo renglón.",
        "Un 'Escribir \"\"' al salir del bucle interno genera el salto de línea entre filas."
      ]
    },
    "intermediateExpl": "Traza de ejecución para una matriz de 2x2:\n- `f = 1`:\n  - `c = 1` -> Imprime celda [1,1]\n  - `c = 2` -> Imprime celda [1,2]\n  - Salto de línea (`Escribir \"\"`)\n- `f = 2`:\n  - `c = 1` -> Imprime celda [2,1]\n  - `c = 2` -> Imprime celda [2,2]\n  - Salto de línea\nTotal de iteraciones internas = Filas * Columnas = 2 * 2 = 4 pasos.",
    "expertExpl": "El recorrido Row-Major (bucle exterior de filas y bucle interior de columnas) aprovecha al máximo el principio de localidad espacial en la memoria caché del procesador, ya que las celdas `[f, c]` y `[f, c+1]` residen en direcciones contiguas en RAM. Si se invirtiera el orden de los bucles (bucle exterior de columnas e interior de filas), se produciría un patrón de acceso a saltos ('strided access') causando fallos masivos de caché (Cache Misses) y degradando la velocidad en matrices de gran escala.",
    "code": "// Algoritmo: Llenado Algorítmico y Visualización Tabular de una Matriz\nAlgoritmo RecorridoMatricialTabular\n    Definir FILAS, COLUMNAS, f, c, contador Como Entero\n    FILAS <- 3\n    COLUMNAS <- 3\n    \n    Definir matriz Como Entero\n    Dimension matriz[FILAS, COLUMNAS]\n    \n    // 1. LLENADO SECUENCIAL: Asignamos valores correlativos del 1 al 9\n    contador <- 1\n    Para f <- 1 Hasta FILAS Con Paso 1 Hacer\n        Para c <- 1 Hasta COLUMNAS Con Paso 1 Hacer\n            matriz[f, c] <- contador\n            contador <- contador + 1\n        FinPara\n    FinPara\n    \n    Escribir \"=== MATRIZ 3x3 EN FORMATO TABULAR ===\"\n    // 2. RECORRIDO DE IMPRESIÓN CON FORMATO VISUAL\n    Para f <- 1 Hasta FILAS Con Paso 1 Hacer\n        Para c <- 1 Hasta COLUMNAS Con Paso 1 Hacer\n            // Imprimimos la celda sin bajar de renglón\n            Escribir Sin Bajar \"[ \", matriz[f, c], \" ] \"\n        FinPara\n        // Salto de línea al terminar de imprimir todas las columnas de la fila actual\n        Escribir \"\"\n    FinPara\nFinAlgoritmo",
    "output": "=== MATRIZ 3x3 EN FORMATO TABULAR ===\n[ 1 ] [ 2 ] [ 3 ] \n[ 4 ] [ 5 ] [ 6 ] \n[ 7 ] [ 8 ] [ 9 ]",
    "evaluation": {
      "starterCode": "// Ejercicio: Calcula la suma de todos los elementos de una matriz de 2 filas y 2 columnas\n// que contiene: [1, 2] en fila 1 y [3, 4] en fila 2.\nAlgoritmo EvaluacionSumaMatriz\n    Definir m, f, c, suma Como Entero\n    Dimension m[2, 2]\n    m[1, 1] <- 1; m[1, 2] <- 2\n    m[2, 1] <- 3; m[2, 2] <- 4\n    \n    suma <- 0\n    // Recorre con dos bucles anidados para sumar cada celda m[f, c]\n    \n    Escribir \"Suma total de la matriz:\", suma\nFinAlgoritmo",
      "task": "Escribe los bucles anidados para acumular la suma de todos los elementos de la matriz 2x2 (el total debe ser 10).",
      "testRunner": "function(code, output) { const passed = /Suma total de la matriz:\\s*10/i.test(output); return { passed: passed, feedback: passed ? '¡Perfecto! Has dominado el recorrido y acumulación con matrices bidimensionales.' : 'La suma de 1+2+3+4 debe ser 10. Revisa los bucles anidados.' }; }",
      "solution": "Algoritmo EvaluacionSumaMatriz\n    Definir m, f, c, suma Como Entero\n    Dimension m[2, 2]\n    m[1, 1] <- 1; m[1, 2] <- 2\n    m[2, 1] <- 3; m[2, 2] <- 4\n    \n    suma <- 0\n    Para f <- 1 Hasta 2 Con Paso 1 Hacer\n        Para c <- 1 Hasta 2 Con Paso 1 Hacer\n            suma <- suma + m[f, c]\n        FinPara\n    FinPara\n    \n    Escribir \"Suma total de la matriz:\", suma\nFinAlgoritmo"
    },
    "externalLinks": [
      {
        "title": "OpenWebinars: Recorrer matrices bidimensionales",
        "url": "https://openwebinars.net/"
      },
      {
        "title": "Wikipedia: Matriz (matemática)",
        "url": "https://es.wikipedia.org/wiki/Matriz_(matem%C3%A1tica)"
      }
    ]
  },
  {
    "id": 35,
    "slug": "matrices-diagonales",
    "title": "Matriz Identidad y Diagonales (Principal y Secundaria)",
    "titleEs": "Matriz Identidad y Diagonales (Principal y Secundaria)",
    "category": "Arreglos Bidimensionales (Matrices)",
    "categorySlug": "arreglos-matrices",
    "categoryIcon": "grid",
    "difficulty": "Avanzado",
    "summary": "Comprende la geometría algorítmica de matrices cuadradas identificando la diagonal principal (f = c), la diagonal secundaria (f + c = N + 1) y construyendo la matriz identidad.",
    "originalExpl": "En una matriz cuadrada (donde el número de filas N es igual al número de columnas N), existen dos estructuras lineales internas de enorme trascendencia matemática: la Diagonal Principal y la Diagonal Secundaria. La Diagonal Principal está compuesta por todas las celdas donde el índice de fila coincide exactamente con el índice de columna (`f = c`), descendiendo desde la esquina superior izquierda hasta la esquina inferior derecha. La Diagonal Secundaria desciende desde la esquina superior derecha hasta la inferior izquierda, y cumple la propiedad matemática estricta: `f + c = N + 1` (o equivalentemente `c = N - f + 1`). Una Matriz Identidad es aquella matriz cuadrada donde todos los elementos de la diagonal principal son 1 y todos los demás elementos restantes son 0.",
    "basicExpl": {
      "analogies": "Imagina dibujar una 'X' sobre una servilleta cuadrada. El trazo que baja desde arriba a la izquierda hacia abajo a la derecha cruza exactamente por los casilleros [1,1], [2,2], [3,3] (la diagonal principal). El otro trazo que cruza desde arriba a la derecha hacia abajo a la izquierda cruza por [1,3], [2,2], [3,1] (la diagonal secundaria). Ambas diagonales se cruzan justo en el centro del cuadrado.",
      "keyPoints": [
        "Solo aplica a matrices cuadradas de tamaño N x N.",
        "Diagonal Principal: Condición lógica f = c.",
        "Diagonal Secundaria: Condición matemática f + c = N + 1.",
        "Matriz Identidad: Celdas de la diagonal principal valen 1 y el resto 0."
      ]
    },
    "intermediateExpl": "Matriz Identidad de 3x3 generada algorítmicamente:\n- Fila 1: `f=1`. Para `c=1` (f=c -> 1), para `c=2` (f<>c -> 0), para `c=3` (f<>c -> 0) -> `[ 1, 0, 0 ]`\n- Fila 2: `f=2`. Para `c=1` (0), para `c=2` (f=c -> 1), para `c=3` (0) -> `[ 0, 1, 0 ]`\n- Fila 3: `f=3`. Para `c=1` (0), para `c=2` (0), para `c=3` (f=c -> 1) -> `[ 0, 0, 1 ]`\nDiagonales de 3x3:\n- Principal: [1,1], [2,2], [3,3]\n- Secundaria: [1,3], [2,2], [3,1]",
    "expertExpl": "La matriz identidad actúa como el elemento neutro en la multiplicación de matrices en álgebra lineal: para cualquier matriz A, se cumple que `A * I = I * A = A`. En gráficos por computadora (OpenGL, DirectX, WebGL), las transformaciones 3D (rotación, traslación, escala) se representan mediante matrices 4x4, y la matriz identidad sirve como el estado inicial no transformado de la escena espacial antes de proyectar polígonos en pantalla.",
    "code": "// Algoritmo: Generación de Matriz Identidad y Extracción de Diagonales\nAlgoritmo MatrizIdentidadYDiagonales\n    Definir N, f, c Como Entero\n    N <- 4 // Tamaño de la matriz cuadrada NxN\n    \n    Definir identidad Como Entero\n    Dimension identidad[N, N]\n    \n    // 1. GENERACIÓN DE LA MATRIZ IDENTIDAD\n    Para f <- 1 Hasta N Con Paso 1 Hacer\n        Para c <- 1 Hasta N Con Paso 1 Hacer\n            Si f = c Entonces\n                identidad[f, c] <- 1 // Diagonal principal\n            Sino\n                identidad[f, c] <- 0 // Elementos fuera de la diagonal\n            FinSi\n        FinPara\n    FinPara\n    \n    Escribir \"=== MATRIZ IDENTIDAD GENERADA (4x4) ===\"\n    Para f <- 1 Hasta N Con Paso 1 Hacer\n        Para c <- 1 Hasta N Con Paso 1 Hacer\n            Escribir Sin Bajar identidad[f, c], \" \"\n        FinPara\n        Escribir \"\"\n    FinPara\n    \n    Escribir \"\"\n    Escribir \"=== COORDENADAS DE LA DIAGONAL SECUNDARIA ===\"\n    Para f <- 1 Hasta N Con Paso 1 Hacer\n        c <- N - f + 1\n        Escribir \"Elemento en fila\", f, \"columna\", c, \"-> Valor:\", identidad[f, c]\n    FinPara\nFinAlgoritmo",
    "output": "=== MATRIZ IDENTIDAD GENERADA (4x4) ===\n1 0 0 0 \n0 1 0 0 \n0 0 1 0 \n0 0 0 1 \n\n=== COORDENADAS DE LA DIAGONAL SECUNDARIA ===\nElemento en fila 1 columna 4 -> Valor: 0\nElemento en fila 2 columna 3 -> Valor: 0\nElemento en fila 3 columna 2 -> Valor: 0\nElemento en fila 4 columna 1 -> Valor: 0",
    "evaluation": {
      "starterCode": "// Ejercicio: En una matriz de 3x3 ya inicializada con valores, calcula la suma\n// de los elementos que pertenecen ÚNICAMENTE a la Diagonal Principal (donde f = c).\nAlgoritmo EvaluacionDiagonalPrincipal\n    Definir m, f, c, sumaDiag Como Entero\n    Dimension m[3, 3]\n    m[1,1]<-5; m[1,2]<-2; m[1,3]<-1\n    m[2,1]<-8; m[2,2]<-7; m[2,3]<-3\n    m[3,1]<-4; m[3,2]<-6; m[3,3]<-9\n    \n    sumaDiag <- 0\n    // Suma los elementos de la diagonal principal (5 + 7 + 9)\n    \n    Escribir \"Suma diagonal principal:\", sumaDiag\nFinAlgoritmo",
      "task": "Calcula la suma de la diagonal principal (5 + 7 + 9 = 21) e imprímela con 'Suma diagonal principal: 21'.",
      "testRunner": "function(code, output) { const passed = /Suma diagonal principal:\\s*21/i.test(output); return { passed: passed, feedback: passed ? '¡Excelente! Has dominado la indexación de diagonales en matrices cuadradas.' : 'La suma de 5 + 7 + 9 debe dar 21.' }; }",
      "solution": "Algoritmo EvaluacionDiagonalPrincipal\n    Definir m, f, c, sumaDiag Como Entero\n    Dimension m[3, 3]\n    m[1,1]<-5; m[1,2]<-2; m[1,3]<-1\n    m[2,1]<-8; m[2,2]<-7; m[2,3]<-3\n    m[3,1]<-4; m[3,2]<-6; m[3,3]<-9\n    \n    sumaDiag <- 0\n    Para f <- 1 Hasta 3 Con Paso 1 Hacer\n        sumaDiag <- sumaDiag + m[f, f]\n    FinPara\n    \n    Escribir \"Suma diagonal principal:\", sumaDiag\nFinAlgoritmo"
    },
    "externalLinks": [
      {
        "title": "Wikipedia: Matriz identidad",
        "url": "https://es.wikipedia.org/wiki/Matriz_identidad"
      },
      {
        "title": "Khan Academy: Matrices y transformaciones lineales",
        "url": "https://es.khanacademy.org/"
      }
    ]
  },
  {
    "id": 36,
    "slug": "matrices-operaciones",
    "title": "Suma y Transpuesta de Matrices",
    "titleEs": "Suma y Transpuesta de Matrices",
    "category": "Arreglos Bidimensionales (Matrices)",
    "categorySlug": "arreglos-matrices",
    "categoryIcon": "grid",
    "difficulty": "Avanzado",
    "summary": "Implementa operaciones matriciales fundamentales: la suma elemento a elemento de dos matrices y la trasposición intercambiando filas por columnas.",
    "originalExpl": "Las operaciones sobre matrices constituyen la base matemática del procesamiento digital de imágenes, la física computacional y la inteligencia artificial. En la Suma de Matrices, dos matrices A y B con las mismas dimensiones (M x N) se combinan para producir una matriz resultado C, donde cada celda es la suma directa: `C[f, c] <- A[f, c] + B[f, c]`. Por otra parte, la Transpuesta de una matriz A (denotada A^T) es una operación geométrica que intercambia las filas por las columnas: lo que era la fila `f` de la matriz original se convierte en la columna `f` de la matriz transpuesta, de tal forma que `Transpuesta[c, f] <- Original[f, c]`. Si la matriz original era de tamaño M x N, su transpuesta resultante tendrá dimensiones N x M.",
    "basicExpl": {
      "analogies": "Imagina voltear un teléfono móvil de modo vertical a horizontal. Lo que antes leías como líneas horizontales de texto ahora se extienden a lo largo de columnas verticales. Ningún dato se pierde ni se añade; simplemente la orientación de los ejes espaciales X e Y se ha rotado 90 grados sobre su diagonal.",
      "keyPoints": [
        "Suma matricial: C[f, c] = A[f, c] + B[f, c] celda a celda.",
        "Solo pueden sumarse matrices con exactamente las mismas dimensiones.",
        "Matriz Transpuesta: Intercambia filas por columnas: T[c, f] = A[f, c].",
        "Una matriz original de 2x3 se convierte en una transpuesta de 3x2."
      ]
    },
    "intermediateExpl": "Transposición de una matriz A de 2x3:\nMatriz A (2 filas, 3 columnas):\n[ 1, 2, 3 ]\n[ 4, 5, 6 ]\nOperación de transposición:\n- Fila 1 de A `(1, 2, 3)` pasa a ser la Columna 1 de T.\n- Fila 2 de A `(4, 5, 6)` pasa a ser la Columna 2 de T.\nMatriz T resultante (3 filas, 2 columnas):\n[ 1, 4 ]\n[ 2, 5 ]\n[ 3, 6 ]",
    "expertExpl": "La transposición matricial in-place para matrices cuadradas tiene complejidad O(n²) de tiempo y O(1) de espacio adicional realizando swaps entre elementos simétricos `[i, j]` y `[j, i]`. En bibliotecas de alto rendimiento científico (como BLAS o NumPy), la transposición no copia físicamente los datos en memoria; en su lugar, altera los 'strides' (el vector de pasos de salto de memoria) de la estructura, permitiendo operaciones instantáneas O(1) sin mover un solo byte físico en memoria RAM.",
    "code": "// Algoritmo: Suma y Transposición de Matrices\nAlgoritmo OperacionesMatriciales\n    Definir f, c Como Entero\n    \n    // Declaramos dos matrices originales de 2 Filas y 3 Columnas\n    Definir A, B, C Como Entero\n    Dimension A[2, 3]\n    Dimension B[2, 3]\n    Dimension C[2, 3]\n    \n    // Declaramos la matriz transpuesta de A (tendrá 3 Filas y 2 Columnas)\n    Definir T Como Entero\n    Dimension T[3, 2]\n    \n    // Inicializamos matriz A\n    A[1, 1] <- 1; A[1, 2] <- 2; A[1, 3] <- 3\n    A[2, 1] <- 4; A[2, 2] <- 5; A[2, 3] <- 6\n    \n    // Inicializamos matriz B\n    B[1, 1] <- 10; B[1, 2] <- 20; B[1, 3] <- 30\n    B[2, 1] <- 40; B[2, 2] <- 50; B[2, 3] <- 60\n    \n    // 1. SUMA DE MATRICES: C = A + B\n    Para f <- 1 Hasta 2 Con Paso 1 Hacer\n        Para c <- 1 Hasta 3 Con Paso 1 Hacer\n            C[f, c] <- A[f, c] + B[f, c]\n        FinPara\n    FinPara\n    \n    // 2. TRANSPOSICIÓN DE MATRIZ A: T[c, f] <- A[f, c]\n    Para f <- 1 Hasta 2 Con Paso 1 Hacer\n        Para c <- 1 Hasta 3 Con Paso 1 Hacer\n            T[c, f] <- A[f, c]\n        FinPara\n    FinPara\n    \n    Escribir \"=== MATRIZ SUMA C (A + B) [2x3] ===\"\n    Para f <- 1 Hasta 2 Con Paso 1 Hacer\n        Para c <- 1 Hasta 3 Con Paso 1 Hacer\n            Escribir Sin Bajar C[f, c], \" \"\n        FinPara\n        Escribir \"\"\n    FinPara\n    \n    Escribir \"\"\n    Escribir \"=== MATRIZ TRANSPUESTA DE A [3x2] ===\"\n    Para f <- 1 Hasta 3 Con Paso 1 Hacer\n        Para c <- 1 Hasta 2 Con Paso 1 Hacer\n            Escribir Sin Bajar T[f, c], \" \"\n        FinPara\n        Escribir \"\"\n    FinPara\nFinAlgoritmo",
    "output": "=== MATRIZ SUMA C (A + B) [2x3] ===\n11 22 33 \n44 55 66 \n\n=== MATRIZ TRANSPUESTA DE A [3x2] ===\n1 4 \n2 5 \n3 6",
    "evaluation": {
      "starterCode": "// Ejercicio: Realiza la transpuesta de una matriz de 2x2.\n// Asigna en T[c, f] <- original[f, c] y muestra la celda T[1, 2].\nAlgoritmo EvaluacionTranspuesta\n    Definir orig, trans, f, c Como Entero\n    Dimension orig[2, 2]\n    Dimension trans[2, 2]\n    \n    orig[1, 1] <- 10; orig[1, 2] <- 20\n    orig[2, 1] <- 30; orig[2, 2] <- 40\n    \n    // Completa los dos bucles para trasponer orig en trans\n    \n    Escribir \"Valor en T[1,2]:\", trans[1, 2]\nFinAlgoritmo",
      "task": "Completa el algoritmo de transposición. Como orig[2, 1] vale 30, al trasponerse trans[1, 2] debe valer 30.",
      "testRunner": "function(code, output) { const passed = /Valor en T\\[1,2\\]:\\s*30/i.test(output); return { passed: passed, feedback: passed ? '¡Magnífico! Has dominado la transposición matricial.' : 'Verifica que trans[c, f] <- orig[f, c].' }; }",
      "solution": "Algoritmo EvaluacionTranspuesta\n    Definir orig, trans, f, c Como Entero\n    Dimension orig[2, 2]\n    Dimension trans[2, 2]\n    \n    orig[1, 1] <- 10; orig[1, 2] <- 20\n    orig[2, 1] <- 30; orig[2, 2] <- 40\n    \n    Para f <- 1 Hasta 2 Con Paso 1 Hacer\n        Para c <- 1 Hasta 2 Con Paso 1 Hacer\n            trans[c, f] <- orig[f, c]\n        FinPara\n    FinPara\n    \n    Escribir \"Valor en T[1,2]:\", trans[1, 2]\nFinAlgoritmo"
    },
    "externalLinks": [
      {
        "title": "Wikipedia: Matriz transpuesta",
        "url": "https://es.wikipedia.org/wiki/Matriz_transpuesta"
      },
      {
        "title": "Khan Academy: Operaciones con matrices",
        "url": "https://es.khanacademy.org/"
      }
    ]
  },
  {
    "id": 37,
    "slug": "cadenas-subcadenas",
    "title": "Manejo de Cadenas: Longitud y Subcadenas",
    "titleEs": "Manejo de Cadenas: Longitud y Subcadenas",
    "category": "Cadenas y Algoritmos Aplicados",
    "categorySlug": "cadenas-algoritmos",
    "categoryIcon": "code",
    "difficulty": "Intermedio",
    "summary": "Aprende las funciones nativas de manipulación de cadenas de texto en PSeInt: Longitud, Subcadena, Mayusculas y Minusculas para procesar texto caracter a caracter.",
    "originalExpl": "En informática, una cadena de texto (string o hilera de caracteres) es una secuencia indexada de caracteres tipográficos. PSeInt provee un conjunto integrado de funciones primitivas para la inspección y transformación de textos: 1) `Longitud(cadena)`: Retorna un número entero que representa la cantidad total de caracteres y espacios que componen el texto. 2) `Subcadena(cadena, posInicial, posFinal)`: Extrae y retorna una porción del texto comprendida entre los límites inclusive. 3) `Mayusculas(cadena)` y `Minusculas(cadena)`: Convierten todas las letras del texto a su representación mayúscula o minúscula correspondiente. Al combinar `Longitud` con un bucle `Para`, es posible recorrer un texto letra por letra extrayendo cada caracter individual con `Subcadena(texto, i, i)`.",
    "basicExpl": {
      "analogies": "Imagina una pulsera de cuentas de colores donde cada cuenta tiene grabada una letra. Si cuentas todas las bolitas de la pulsera de inicio a fin, obtienes su Longitud. Si tomas unas tijeras y cortas desde la bolita número 3 hasta la bolita número 7, tienes una Subcadena en la mano.",
      "keyPoints": [
        "Longitud(texto): Devuelve la cantidad de caracteres incluyendo espacios.",
        "Subcadena(texto, inicio, fin): Extrae el fragmento especificado entre las posiciones.",
        "Subcadena(texto, i, i): Permite extraer un único caracter en la posición i.",
        "Mayusculas y Minusculas estandarizan cadenas para comparaciones no sensibles a mayúsculas."
      ]
    },
    "intermediateExpl": "Inspección de la palabra \"ALGORITMO\":\nPosiciones: 1=A, 2=L, 3=G, 4=O, 5=R, 6=I, 7=T, 8=M, 9=O\n- `Longitud(\"ALGORITMO\")` -> 9\n- `Subcadena(\"ALGORITMO\", 1, 4)` -> \"ALGO\"\n- `Subcadena(\"ALGORITMO\", 5, 9)` -> \"RITMO\"\n- Recorrido letra por letra: para `i = 1 Hasta 9`, `Subcadena(texto, i, i)` extrae 'A', luego 'L', luego 'G'...",
    "expertExpl": "A bajo nivel, las cadenas se representan como arreglos contiguos de bytes codificados en ASCII o UTF-8. En C tradicional se utiliza un byte nulo terminador `\\0` (Null-terminated string). En lenguajes modernos como Go o Rust, los strings son estructuras inmutables compuestas por un puntero a los datos y una longitud fija ('fat pointers'). La inmutabilidad de cadenas garantiza la seguridad en concurrencia (thread-safety) evitando condiciones de carrera al compartir texto entre múltiples hilos de ejecución.",
    "code": "// Algoritmo: Exploración de Funciones de Texto y Recorrido de Cadenas\nAlgoritmo ManejoCadenasTexto\n    Definir mensaje Como Caracter\n    Definir totalCaracteres, i Como Entero\n    \n    mensaje <- \"PSeInt Lógica\"\n    \n    // 1. Obtener la longitud de la cadena\n    totalCaracteres <- Longitud(mensaje)\n    Escribir \"=== ANÁLISIS DE LA CADENA ===\"\n    Escribir \"Texto analizado:\", mensaje\n    Escribir \"Total de caracteres (con espacios):\", totalCaracteres\n    \n    // 2. Extracción de subcadenas específicas\n    Escribir \"\"\n    Escribir \"=== EXTRACCIÓN DE SUBCADENAS ===\"\n    Escribir \"Subcadena(1 a 6):\", Subcadena(mensaje, 1, 6)\n    Escribir \"Subcadena(8 a 13):\", Subcadena(mensaje, 8, 13)\n    \n    // 3. Conversión a mayúsculas y minúsculas\n    Escribir \"\"\n    Escribir \"=== TRANSFORMACIÓN DE CASO ===\"\n    Escribir \"En mayúsculas:\", Mayusculas(mensaje)\n    Escribir \"En minúsculas:\", Minusculas(mensaje)\n    \n    // 4. Recorrido letra por letra con bucle Para\n    Escribir \"\"\n    Escribir \"=== RECORRIDO CARACTER A CARACTER ===\"\n    Para i <- 1 Hasta totalCaracteres Con Paso 1 Hacer\n        Escribir \"Carácter en posición [\", i, \"] -> \", Subcadena(mensaje, i, i)\n    FinPara\nFinAlgoritmo",
    "output": "=== ANÁLISIS DE LA CADENA ===\nTexto analizado: PSeInt Lógica\nTotal de caracteres (con espacios): 13\n\n=== EXTRACCIÓN DE SUBCADENAS ===\nSubcadena(1 a 6): PSeInt\nSubcadena(8 a 13): Lógica\n\n=== TRANSFORMACIÓN DE CASO ===\nEn mayúsculas: PSEINT LÓGICA\nEn minúsculas: pseint lógica\n\n=== RECORRIDO CARACTER A CARACTER ===\nCarácter en posición [ 1 ] -> P\nCarácter en posición [ 2 ] -> S\nCarácter en posición [ 3 ] -> e\nCarácter en posición [ 4 ] -> I\nCarácter en posición [ 5 ] -> n\nCarácter en posición [ 6 ] -> t\nCarácter en posición [ 7 ] ->  \nCarácter en posición [ 8 ] -> L\nCarácter en posición [ 9 ] -> ó\nCarácter en posición [ 10 ] -> g\nCarácter en posición [ 11 ] -> i\nCarácter en posición [ 12 ] -> c\nCarácter en posición [ 13 ] -> a",
    "evaluation": {
      "starterCode": "// Ejercicio: Cuenta cuántas veces aparece la letra 'a' (minúscula o mayúscula)\n// en la frase 'Aprender a programar'.\nAlgoritmo EvaluacionConteoLetra\n    Definir frase Como Caracter\n    Definir i, contadorA Como Entero\n    frase <- \"Aprender a programar\"\n    \n    contadorA <- 0\n    // Recorre la cadena caracter a caracter usando Longitud y Subcadena\n    // Compara convirtiendo cada letra a Mayusculas para contar 'A'\n    \n    Escribir \"Total de letras A encontradas:\", contadorA\nFinAlgoritmo",
      "task": "Completa el bucle para contar las letras 'a'/'A' en la frase 'Aprender a programar' (debe dar 4 en total).",
      "testRunner": "function(code, output) { const passed = /Total de letras A encontradas:\\s*4/i.test(output); return { passed: passed, feedback: passed ? '¡Excelente trabajo! Has integrado el recorrido de caracteres con filtrado condicional.' : 'En la frase hay exactamente 4 letras A. Revisa la condición de conteo.' }; }",
      "solution": "Algoritmo EvaluacionConteoLetra\n    Definir frase Como Caracter\n    Definir i, contadorA Como Entero\n    frase <- \"Aprender a programar\"\n    \n    contadorA <- 0\n    Para i <- 1 Hasta Longitud(frase) Con Paso 1 Hacer\n        Si Mayusculas(Subcadena(frase, i, i)) = \"A\" Entonces\n            contadorA <- contadorA + 1\n        FinSi\n    FinPara\n    \n    Escribir \"Total de letras A encontradas:\", contadorA\nFinAlgoritmo"
    },
    "externalLinks": [
      {
        "title": "Documentación PSeInt: Funciones de Cadenas",
        "url": "http://pseint.sourceforge.net/"
      },
      {
        "title": "GeeksforGeeks: String Data Structure",
        "url": "https://www.geeksforgeeks.org/string-data-structure/"
      }
    ]
  },
  {
    "id": 38,
    "slug": "conversiones-tipo",
    "title": "Conversiones de Tipos: Numérico a Texto y Viceversa",
    "titleEs": "Conversiones de Tipos: Numérico a Texto y Viceversa",
    "category": "Cadenas y Algoritmos Aplicados",
    "categorySlug": "cadenas-algoritmos",
    "categoryIcon": "code",
    "difficulty": "Intermedio",
    "summary": "Domina la transformación de datos entre tipos incompatibles usando ConvertirANumero y ConvertirATexto para operaciones de cálculo y formateo de texto.",
    "originalExpl": "En lenguajes de programación fuertemente tipados, no se pueden realizar operaciones aritméticas sobre cadenas de texto ni concatenar directamente números en cadenas sin una conversión explícita de tipos (Type Casting / Parsing). Si intentamos sumar `\"100\" + 50`, el compilador emitirá un error por incompatibilidad de tipos. Para solucionar esto, PSeInt ofrece dos funciones de conversión fundamentales: 1) `ConvertirANumero(texto)`: Parsea una cadena de caracteres que represente un valor numérico válido (por ejemplo, `\"450\"` o `\"3.14\"`) y la transforma en un tipo `Entero` o `Real` con el que se pueden ejecutar sumas, restas y multiplicaciones. 2) `ConvertirATexto(numero)`: Transforma un valor cuantitativo numérico en una cadena de caracteres `Caracter`, permitiendo medir su cantidad de dígitos con `Longitud()` o extraer segmentos con `Subcadena()`.",
    "basicExpl": {
      "analogies": "Imagina la diferencia entre una foto de una moneda de 1 dólar impresa en una revista y una moneda de 1 dólar de metal en tu bolsillo. La foto tiene el dibujo del número 1, pero no puedes insertarla en una máquina expendedora de gaseosas porque es solo papel dibujado (Texto). Convertir a número es el proceso de fundir el metal real para que la máquina expendedora pueda operar con él.",
      "keyPoints": [
        "ConvertirANumero(texto): Convierte una cadena de dígitos en un número operable.",
        "ConvertirATexto(numero): Convierte un número en cadena para manipulación de caracteres.",
        "Permite calcular la cantidad de dígitos de un entero usando Longitud(ConvertirATexto(n)).",
        "Evita errores graves de incompatibilidad de tipos en operaciones mixtas."
      ]
    },
    "intermediateExpl": "Traza de conversión y cálculo:\n- Entrada de usuario: `\"150\"` (tipo Caracter)\n- Si intentamos `entrada * 2` -> Error de tipos.\n- Conversión: `numeroReal <- ConvertirANumero(\"150\")` -> `numeroReal` vale 150 (tipo numérico).\n- Operación válida: `resultado <- numeroReal * 2` -> 300.\n- Formateo de salida: `textoSalida <- ConvertirATexto(resultado)` -> `\"300\"`.\n- Medición: `Longitud(textoSalida)` -> 3 dígitos.",
    "expertExpl": "El análisis sintáctico de texto a número (Parsing como `atoi` o `strconv.Atoi` en Go) recorre los bytes de izquierda a derecha multiplicando el acumulador por la base 10 y sumando el valor numérico del byte restando el código ASCII del cero (`byte - '0'`). En sistemas de producción, este proceso requiere validación de errores para detectar caracteres no numéricos o desbordamientos aritméticos (Integer Overflow). PSeInt encapsula este algoritmo en `ConvertirANumero` de forma segura.",
    "code": "// Algoritmo: Conversiones de Tipos y Análisis de Dígitos\nAlgoritmo ConversionesDeTipo\n    Definir precioTexto, edadTexto Como Caracter\n    Definir precioNumero, total, numeroTelefono Como Real\n    Definir cantidadDigitos Como Entero\n    \n    // 1. CONVERTIR TEXTO A NÚMERO\n    precioTexto <- \"1250.50\"\n    Escribir \"=== CONVERSIÓN DE TEXTO A NÚMERO ===\"\n    Escribir \"Cadena original:\", precioTexto\n    \n    // Convertimos la cadena a valor Real\n    precioNumero <- ConvertirANumero(precioTexto)\n    \n    // Ahora podemos realizar cálculos matemáticos\n    total <- precioNumero + 250.00\n    Escribir \"Precio numérico sumado con 250:\", total\n    \n    // 2. CONVERTIR NÚMERO A TEXTO\n    Escribir \"\"\n    Escribir \"=== CONVERSIÓN DE NÚMERO A TEXTO ===\"\n    numeroTelefono <- 987654321\n    Escribir \"Número cuantitativo original:\", numeroTelefono\n    \n    // Convertimos a texto para poder usar funciones de cadena\n    edadTexto <- ConvertirATexto(numeroTelefono)\n    cantidadDigitos <- Longitud(edadTexto)\n    \n    Escribir \"Texto convertido:\", edadTexto\n    Escribir \"Cantidad de dígitos que componen el número:\", cantidadDigitos\n    Escribir \"Primeros 3 dígitos (código de área):\", Subcadena(edadTexto, 1, 3)\nFinAlgoritmo",
    "output": "=== CONVERSIÓN DE TEXTO A NÚMERO ===\nCadena original: 1250.50\nPrecio numérico sumado con 250: 1500.5\n\n=== CONVERSIÓN DE NÚMERO A TEXTO ===\nNúmero cuantitativo original: 987654321\nTexto convertido: 987654321\nCantidad de dígitos que componen el número: 9\nPrimeros 3 dígitos (código de área): 987",
    "evaluation": {
      "starterCode": "// Ejercicio: Recibe una cadena '75' y una cadena '25'. Conviértelas a números,\n// súmalas, convierte el resultado de la suma a texto e imprímelo en pantalla.\nAlgoritmo EvaluacionConversiones\n    Definir txtA, txtB, txtResultado Como Caracter\n    Definir numA, numB, suma Como Entero\n    txtA <- \"75\"\n    txtB <- \"25\"\n    \n    // Realiza las conversiones y la suma\n    \n    Escribir \"Resultado como texto:\", txtResultado\nFinAlgoritmo",
      "task": "Convierte txtA y txtB a números, súmalos (75 + 25 = 100), convierte la suma a texto en txtResultado y muestra 'Resultado como texto: 100'.",
      "testRunner": "function(code, output) { const passed = /Resultado como texto:\\s*100/i.test(output); return { passed: passed, feedback: passed ? '¡Perfecto! Has dominado la bidireccionalidad de conversiones entre texto y números.' : 'La suma convertida a texto debe ser exactamente 100.' }; }",
      "solution": "Algoritmo EvaluacionConversiones\n    Definir txtA, txtB, txtResultado Como Caracter\n    Definir numA, numB, suma Como Entero\n    txtA <- \"75\"\n    txtB <- \"25\"\n    \n    numA <- ConvertirANumero(txtA)\n    numB <- ConvertirANumero(txtB)\n    suma <- numA + numB\n    txtResultado <- ConvertirATexto(suma)\n    \n    Escribir \"Resultado como texto:\", txtResultado\nFinAlgoritmo"
    },
    "externalLinks": [
      {
        "title": "Documentación PSeInt: Funciones Integradas",
        "url": "http://pseint.sourceforge.net/"
      },
      {
        "title": "Wikipedia: Conversión de tipos",
        "url": "https://es.wikipedia.org/wiki/Conversi%C3%B3n_de_tipos"
      }
    ]
  },
  {
    "id": 39,
    "slug": "algoritmo-palindromo",
    "title": "Algoritmo Palíndromo: Inversión y Comparación",
    "titleEs": "Algoritmo Palíndromo: Inversión y Comparación",
    "category": "Cadenas y Algoritmos Aplicados",
    "categorySlug": "cadenas-algoritmos",
    "categoryIcon": "code",
    "difficulty": "Avanzado",
    "summary": "Construye un algoritmo clásico para detectar palíndromos y capicúas mediante inversión algorítmica de cadenas y comparación carácter a carácter con punteros opuestos.",
    "originalExpl": "Un palíndromo (o número capicúa si es numérico) es una palabra, frase o número que se lee exactamente igual de izquierda a derecha que de derecha a izquierda (por ejemplo: 'reconocer', 'radar', 'oso', '12321'). Existen dos estrategias algorítmicas primordiales para resolver este problema: 1) Inversión de Cadena: Se crea una nueva cadena vacía y se recorre la palabra original desde la última letra hasta la primera (`Para i <- Longitud(texto) Hasta 1 Con Paso -1`), concatenando cada letra. Al finalizar, se compara si la cadena invertida es idéntica a la original. 2) Punteros Encontrados (Two Pointers): Se utiliza un puntero al inicio (i=1) y otro al final (j=Longitud), comparando si `texto[i] = texto[j]` y acercándolos hacia el centro en cada iteración. Esta segunda estrategia es más eficiente en memoria y permite parada temprana ante la primera discrepancia.",
    "basicExpl": {
      "analogies": "Imagina un espejo puesto frente a ti con la palabra 'RADAR'. Si lees la palabra original en la mano de izquierda a derecha dice R-A-D-A-R. Si miras el reflejo en el espejo de derecha a izquierda, lees exactamente las mismas letras en el mismo orden. Cuando el original y su reflejo inverso coinciden letra por letra, tienes un palíndromo.",
      "keyPoints": [
        "Un palíndromo se lee exactamente igual al derecho que al revés.",
        "Estrategia 1: Construir la cadena inversa con un bucle decreciente (Con Paso -1).",
        "Estrategia 2: Punteros convergentes desde los extremos hacia el centro.",
        "Se recomienda normalizar la cadena con Mayusculas() o Minusculas() antes de comparar."
      ]
    },
    "intermediateExpl": "Traza de inversión para la palabra \"RADAR\":\n- `Longitud = 5`\n- `invertida <- \"\"`\n- `i = 5` -> letra 'R' -> `invertida = \"R\"`\n- `i = 4` -> letra 'A' -> `invertida = \"RA\"`\n- `i = 3` -> letra 'D' -> `invertida = \"RAD\"`\n- `i = 2` -> letra 'A' -> `invertida = \"RADA\"`\n- `i = 1` -> letra 'R' -> `invertida = \"RADAR\"`\n- Comparación final: ¿\"RADAR\" = \"RADAR\"? Verdadero -> Es un palíndromo.",
    "expertExpl": "El enfoque de dos punteros (Two Pointers) reduce la complejidad espacial a O(1) auxiliar ya que no aloca una segunda cadena en memoria. Su complejidad temporal en el peor caso es O(n/2) = O(n) realizando a lo sumo n/2 comparaciones antes de que los punteros se crucen. En entrevistas técnicas de empresas de tecnología como Google o Meta, este problema frecuentemente se extiende a 'Valid Palindrome II' (permitiendo eliminar a lo sumo un caracter erróneo) o ignorando signos de puntuación y espacios en blanco.",
    "code": "// Algoritmo: Verificación de Palíndromos mediante Inversión de Texto\nAlgoritmo VerificacionPalindromo\n    Definir palabraOriginal, palabraInvertida, palabraLimpia Como Caracter\n    Definir n, i Como Entero\n    \n    palabraOriginal <- \"Reconocer\"\n    \n    // Normalizamos a mayúsculas para evitar discrepancias de mayúsculas/minúsculas\n    palabraLimpia <- Mayusculas(palabraOriginal)\n    n <- Longitud(palabraLimpia)\n    palabraInvertida <- \"\"\n    \n    Escribir \"=== COMPROBACIÓN DE PALÍNDROMO ===\"\n    Escribir \"Palabra a analizar:\", palabraOriginal\n    \n    // Construimos la cadena invertida recorriendo hacia atrás con Paso -1\n    Para i <- n Hasta 1 Con Paso -1 Hacer\n        palabraInvertida <- palabraInvertida + Subcadena(palabraLimpia, i, i)\n    FinPara\n    \n    Escribir \"Palabra invertida:\", palabraInvertida\n    Escribir \"\"\n    \n    // Comparamos la cadena limpia normalizada con la cadena invertida\n    Si palabraLimpia = palabraInvertida Entonces\n        Escribir \"¡Confirmado! La palabra '\", palabraOriginal, \"' es un PALÍNDROMO válido.\"\n    Sino\n        Escribir \"La palabra '\", palabraOriginal, \"' NO es un palíndromo.\"\n    FinSi\nFinAlgoritmo",
    "output": "=== COMPROBACIÓN DE PALÍNDROMO ===\nPalabra a analizar: Reconocer\nPalabra invertida: RECONOCER\n\n¡Confirmado! La palabra 'Reconocer' es un PALÍNDROMO válido.",
    "evaluation": {
      "starterCode": "// Ejercicio: Invierte la palabra 'HOLA' y verifica si es palíndromo.\n// Si no es palíndromo, debe imprimir: 'NO es palindromo'\nAlgoritmo EvaluacionPalindromo\n    Definir texto, invertido Como Caracter\n    Definir i Como Entero\n    texto <- \"HOLA\"\n    invertido <- \"\"\n    \n    // Construye la cadena invertida\n    \n    Si texto = invertido Entonces\n        Escribir \"Es palindromo\"\n    Sino\n        Escribir \"NO es palindromo\"\n    FinSi\nFinAlgoritmo",
      "task": "Completa el bucle de inversión para 'HOLA' y confirma que imprima 'NO es palindromo'.",
      "testRunner": "function(code, output) { const passed = /NO es palindromo/i.test(output); return { passed: passed, feedback: passed ? '¡Correcto! Has verificado la detección de palabras no palíndromas.' : 'Verifica el bucle decreciente para invertir la palabra.' }; }",
      "solution": "Algoritmo EvaluacionPalindromo\n    Definir texto, invertido Como Caracter\n    Definir i Como Entero\n    texto <- \"HOLA\"\n    invertido <- \"\"\n    \n    Para i <- Longitud(texto) Hasta 1 Con Paso -1 Hacer\n        invertido <- invertido + Subcadena(texto, i, i)\n    FinPara\n    \n    Si texto = invertido Entonces\n        Escribir \"Es palindromo\"\n    Sino\n        Escribir \"NO es palindromo\"\n    FinSi\nFinAlgoritmo"
    },
    "externalLinks": [
      {
        "title": "LeetCode: Valid Palindrome",
        "url": "https://leetcode.com/problems/valid-palindrome/"
      },
      {
        "title": "Wikipedia: Palíndromo",
        "url": "https://es.wikipedia.org/wiki/Pal%C3%ADndromo"
      }
    ]
  },
  {
    "id": 40,
    "slug": "algoritmo-cajero",
    "title": "Algoritmo Voraz (Greedy): Cajero Automático y Desglose de Billetes",
    "titleEs": "Algoritmo Voraz (Greedy): Cajero Automático y Desglose de Billetes",
    "category": "Cadenas y Algoritmos Aplicados",
    "categorySlug": "cadenas-algoritmos",
    "categoryIcon": "code",
    "difficulty": "Avanzado",
    "summary": "Desarrolla el algoritmo voraz (Greedy) para el problema del cambio de dinero en un cajero automático, entregando la menor cantidad de billetes mediante división entera y módulo.",
    "originalExpl": "El problema del cambio de monedas o dispensación de billetes en un cajero automático (ATM) es la aplicación prototípica de los Algoritmos Voraces (Greedy Algorithms). La estrategia voraz consiste en tomar la mejor decisión local óptima en cada paso inmediato, con la expectativa de alcanzar una solución global óptima. En el caso de un cajero que dispone de billetes de denominaciones fijas ordenadas de mayor a menor (por ejemplo: $100, $50, $20, $10, $5, $1), el algoritmo procesa cada denominación: 1) Calcula cuántos billetes de esa denominación caben en el monto solicitado usando la división entera (`trunc(monto / billete)`). 2) Resta el valor dispensado actualizando el monto pendiente mediante la operación módulo o residuo (`monto <- monto % billete`). Repite el ciclo para cada denominación disponible garantizando entregar la mínima cantidad física de billetes.",
    "basicExpl": {
      "analogies": "Imagina que eres un cajero en un banco y una persona te pide retirar $380 en efectivo. No le das 380 monedas de $1 porque sería una carga enorme e ineficiente. Primero buscas los billetes más grandes disponibles: le das tres billetes de $100 ($300). Te restan $80. Ahora usas el billete siguiente más grande: uno de $50. Te restan $30. Le das uno de $20 (quedan $10) y finalmente uno de $10. Has entregado el monto exacto con el mínimo número de billetes posible.",
      "keyPoints": [
        "Estrategia Voraz: Elige siempre la denominación más grande posible en cada paso.",
        "Cantidad de billetes de una denominación = trunc(monto / denominacion).",
        "Monto remanente pendiente = monto % denominacion.",
        "Requiere que el vector de denominaciones esté estrictamente ordenado de mayor a menor."
      ]
    },
    "intermediateExpl": "Desglose paso a paso de $387 con billetes [100, 50, 20, 10, 5, 1]:\n1. Denominación 100: `trunc(387 / 100) = 3` billetes. Residuo: `387 % 100 = 87`.\n2. Denominación 50: `trunc(87 / 50) = 1` billete. Residuo: `87 % 50 = 37`.\n3. Denominación 20: `trunc(37 / 20) = 1` billete. Residuo: `37 % 20 = 17`.\n4. Denominación 10: `trunc(17 / 10) = 1` billete. Residuo: `17 % 10 = 7`.\n5. Denominación 5: `trunc(7 / 5) = 1` billete. Residuo: `7 % 5 = 2`.\n6. Denominación 1: `trunc(2 / 1) = 2` billetes. Residuo: `2 % 1 = 0`.\nTotal de billetes físicos entregados: 3 + 1 + 1 + 1 + 1 + 2 = 9 billetes.",
    "expertExpl": "El algoritmo voraz para el problema del cambio (Coin Change Problem) produce la solución óptima universal únicamente en sistemas monetarios 'canónicos' (como el dólar estadounidense o el euro), donde cada denominación es un múltiplo o combinación ventajosa de las anteriores. En sistemas monetarios arbitrarios (por ejemplo denominaciones {1, 3, 4} para cambiar $6), el enfoque voraz falla al elegir 4 + 1 + 1 = 3 billetes, cuando la solución óptima es 3 + 3 = 2 billetes. Para esos casos generales se requiere Programación Dinámica (Dynamic Programming). En PSeInt este ejercicio consolida vectores, bucles, división entera y aritmética modular.",
    "code": "// Algoritmo: Desglose Óptimo de Billetes en Cajero Automático (Voraz)\nAlgoritmo CajeroAutomaticoVoraz\n    Definir TOTAL_DENOMINACIONES, i Como Entero\n    Definir montoSolicitado, montoRestante, cantidadBilletes, totalBilletes Como Entero\n    \n    TOTAL_DENOMINACIONES <- 6\n    Definir denominaciones Como Entero\n    Dimension denominaciones[TOTAL_DENOMINACIONES]\n    \n    // Denominaciones canónicas ordenadas estrictamente de mayor a menor\n    denominaciones[1] <- 100\n    denominaciones[2] <- 50\n    denominaciones[3] <- 20\n    denominaciones[4] <- 10\n    denominaciones[5] <- 5\n    denominaciones[6] <- 1\n    \n    montoSolicitado <- 387\n    montoRestante <- montoSolicitado\n    totalBilletes <- 0\n    \n    Escribir \"=== DISPENSADOR DE CAJERO AUTOMÁTICO ===\"\n    Escribir \"Monto total a retirar: $\", montoSolicitado\n    Escribir \"Calculando desglose óptimo con el mínimo número de billetes...\"\n    Escribir \"\"\n    \n    // Recorremos vorazmente cada denominación\n    Para i <- 1 Hasta TOTAL_DENOMINACIONES Con Paso 1 Hacer\n        // Calculamos cuántos billetes de esta denominación caben\n        cantidadBilletes <- trunc(montoRestante / denominaciones[i])\n        \n        // Si se entrega al menos un billete de esta denominación\n        Si cantidadBilletes > 0 Entonces\n            Escribir \"-> Billetes de $\", denominaciones[i], \": \", cantidadBilletes\n            totalBilletes <- totalBilletes + cantidadBilletes\n            // Actualizamos el saldo pendiente usando el operador módulo %\n            montoRestante <- montoRestante % denominaciones[i]\n        FinSi\n    FinPara\n    \n    Escribir \"\"\n    Escribir \"=== RESUMEN DE LA DISPENSACIÓN ===\"\n    Escribir \"Total de billetes físicos entregados:\", totalBilletes\n    Escribir \"Saldo remanente sin dispensar: $\", montoRestante\nFinAlgoritmo",
    "output": "=== DISPENSADOR DE CAJERO AUTOMÁTICO ===\nMonto total a retirar: $ 387\nCalculando desglose óptimo con el mínimo número de billetes...\n\n-> Billetes de $ 100 : 3\n-> Billetes de $ 50 : 1\n-> Billetes de $ 20 : 1\n-> Billetes de $ 10 : 1\n-> Billetes de $ 5 : 1\n-> Billetes de $ 1 : 2\n\n=== RESUMEN DE LA DISPENSACIÓN ===\nTotal de billetes físicos entregados: 9\nSaldo remanente sin dispensar: $ 0",
    "evaluation": {
      "starterCode": "// Ejercicio: Desglosa un monto de 75 dólares usando únicamente denominaciones\n// de 50, 20 y 5 dólares. Calcula cuántos billetes de 50 se entregan.\nAlgoritmo EvaluacionCajero\n    Definir monto, billetes50 Como Entero\n    monto <- 75\n    \n    // Calcula cuántos billetes de 50 caben y actualiza monto con el residuo\n    billetes50 <- trunc(monto / 50)\n    monto <- monto % 50\n    \n    Escribir \"Billetes de 50 entregados:\", billetes50\n    Escribir \"Monto restante:\", monto\nFinAlgoritmo",
      "task": "Ejecuta el cálculo para 75 dólares y confirma que se entrega 1 billete de 50 y restan 25.",
      "testRunner": "function(code, output) { const hasB50 = /Billetes de 50 entregados:\\s*1/i.test(output); const hasRem = /Monto restante:\\s*25/i.test(output); return { passed: hasB50 && hasRem, feedback: hasB50 && hasRem ? '¡Sobresaliente! Has completado el curso completo de lógica algorítmica con honores.' : 'Verifica el cálculo de trunc(75/50) y el residuo 75 % 50.' }; }",
      "solution": "Algoritmo EvaluacionCajero\n    Definir monto, billetes50 Como Entero\n    monto <- 75\n    \n    billetes50 <- trunc(monto / 50)\n    monto <- monto % 50\n    \n    Escribir \"Billetes de 50 entregados:\", billetes50\n    Escribir \"Monto restante:\", monto\nFinAlgoritmo"
    },
    "externalLinks": [
      {
        "title": "GeeksforGeeks: Greedy Algorithm to find minimum number of Coins",
        "url": "https://www.geeksforgeeks.org/greedy-algorithm-to-find-minimum-number-of-coins/"
      },
      {
        "title": "Wikipedia: Algoritmo voraz",
        "url": "https://es.wikipedia.org/wiki/Algoritmo_voraz"
      }
    ]
  }
];

window.PSEINT_CATEGORIES = PSEINT_CATEGORIES;
window.TOPICS_DATA = PSEINT_TOPICS;
window.GO_CATEGORIES = PSEINT_CATEGORIES;
window.GO_TOPICS = PSEINT_TOPICS;
