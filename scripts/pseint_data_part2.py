# -*- coding: utf-8 -*-
# scripts/pseint_data_part2.py - Temas 11 a 20 de PSeInt

PSEINT_TOPICS_PART2 = [
    {
        "id": 11,
        "slug": "condicional-multiple-segun",
        "title": "Estructura Según (Switch)",
        "titleEs": "Selección Múltiple con 'Según ... Hacer'",
        "category": "Estructuras Condicionales y Toma de Decisiones",
        "categorySlug": "condicionales",
        "categoryIcon": "cpu",
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
                {"opcion": 1, "ejecuta": "Bloque Caso 1", "salta": "FinSegun"},
                {"opcion": 2, "ejecuta": "Bloque Caso 2", "salta": "FinSegun"},
                {"opcion": 99, "ejecuta": "Bloque De Otro Modo", "salta": "FinSegun"}
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
        "code": """// Estructura de selección múltiple 'Segun' para simular un menú de opciones.
Algoritmo CondicionalSegun
	Definir opcion Como Entero
	opcion <- 2

	Escribir "=== MENÚ PRINCIPAL ==="
	Escribir "1. Consultar Saldo"
	Escribir "2. Realizar Transferencia"
	Escribir "3. Salir del Sistema"
	Escribir "Opción seleccionada: ", opcion

	Segun opcion Hacer
		1:
			Escribir "Acción: Su saldo disponible actual es de $1,500.00 USD."
		2:
			Escribir "Acción: Ingrese la cuenta de destino y el monto a transferir."
		3:
			Escribir "Acción: Gracias por usar nuestros servicios. Sesión finalizada."
		De Otro Modo:
			Escribir "Error: La opción ingresada no es válida. Intente nuevamente."
	FinSegun
FinAlgoritmo
""",
        "output": """*** Ejecución Iniciada ***
=== MENÚ PRINCIPAL ===
1. Consultar Saldo
2. Realizar Transferencia
3. Salir del Sistema
Opción seleccionada: 2
Acción: Ingrese la cuenta de destino y el monto a transferir.
*** Ejecución Finalizada ***
""",
        "evaluation": {
            "task": "Escribe un algoritmo llamado 'DiaSemana' con un entero 'dia'=3. Usa 'Segun dia Hacer' para imprimir 'Lunes' si es 1, 'Martes' si es 2, 'Miercoles' si es 3, y 'Otro' De Otro Modo.",
            "starterCode": """Algoritmo DiaSemana
	Definir dia Como Entero
	dia <- 3
	// Implementa Segun aquí
	
FinAlgoritmo
""",
            "testRunner": "Segun dia Hacer",
            "solution": """Algoritmo DiaSemana
	Definir dia Como Entero
	dia <- 3
	Segun dia Hacer
		1:
			Escribir "Lunes"
		2:
			Escribir "Martes"
		3:
			Escribir "Miercoles"
		De Otro Modo:
			Escribir "Otro"
	FinSegun
FinAlgoritmo
""",
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
        "category": "Estructuras Condicionales y Toma de Decisiones",
        "categorySlug": "condicionales",
        "categoryIcon": "cpu",
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
                {"expresion": "(denominador <> 0) Y (100 / denominador > 2)", "denominador": 0, "resultado": "FALSO (Evita división por cero)"},
                {"expresion": "(esAdmin) O (verificarPermisoLento())", "esAdmin": "VERDADERO", "resultado": "VERDADERO (Evita llamada pesada)"}
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
        "code": """// Demostración del principio de cortocircuito lógico para evitar división por cero.
Algoritmo CortocircuitoLogico
	Definir totalAlumnos, totalGrupos Como Entero
	Definir divisionSegura Como Logico

	totalAlumnos <- 45
	totalGrupos <- 0 // Peligro: división por cero si intentamos calcular 45 / 0

	Escribir "Total de alumnos: ", totalAlumnos
	Escribir "Total de grupos: ", totalGrupos

	// Protección mediante cortocircuito:
	// Como (totalGrupos > 0) es Falso, la segunda parte (totalAlumnos / totalGrupos) NO se ejecuta
	Si totalGrupos > 0 Y (totalAlumnos / totalGrupos) >= 15 Entonces
		Escribir "Los grupos están balanceados y con suficiente aforo."
	Sino
		Escribir "No se pueden calcular grupos porque el total de grupos es cero o insuficiente."
	FinSi
FinAlgoritmo
""",
        "output": """*** Ejecución Iniciada ***
Total de alumnos: 45
Total de grupos: 0
No se pueden calcular grupos porque el total de grupos es cero o insuficiente.
*** Ejecución Finalizada ***
""",
        "evaluation": {
            "task": "Escribe un algoritmo llamado 'ProteccionCero' con denominador=0. Usa un 'Si denominador <> 0 Entonces Escribir 10/denominador Sino Escribir \"Indefinido\" FinSi'.",
            "starterCode": """Algoritmo ProteccionCero
	Definir denominador Como Entero
	denominador <- 0
	// Implementa la validación aquí
	
FinAlgoritmo
""",
            "testRunner": "denominador <> 0",
            "solution": """Algoritmo ProteccionCero
	Definir denominador Como Entero
	denominador <- 0
	Si denominador <> 0 Entonces
		Escribir 10 / denominador
	Sino
		Escribir "Indefinido"
	FinSi
FinAlgoritmo
""",
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
        "category": "Estructuras Cíclicas e Iterativas",
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
                {"iteracion": 1, "contador": 1, "condicion": "1 <= 3 (V)", "imprime": "1", "nuevoContador": 2},
                {"iteracion": 2, "contador": 2, "condicion": "2 <= 3 (V)", "imprime": "2", "nuevoContador": 3},
                {"iteracion": 3, "contador": 3, "condicion": "3 <= 3 (V)", "imprime": "3", "nuevoContador": 4},
                {"iteracion": 4, "contador": 4, "condicion": "4 <= 3 (F)", "imprime": "Salida", "nuevoContador": 4}
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
        "code": """// Ciclo 'Mientras': Cuenta progresiva del 1 al 5 controlando la variable contadora.
Algoritmo CicloMientras
	Definir contador Como Entero

	// 1. Inicialización de la variable de control
	contador <- 1

	Escribir "Iniciando conteo con ciclo Mientras:"

	// 2. Condición de permanencia
	Mientras contador <= 5 Hacer
		Escribir "Iteración número: ", contador

		// 3. Paso de avance (crucial para evitar bucle infinito)
		contador <- contador + 1
	FinMientras

	Escribir "Ciclo finalizado con éxito. Valor final de contador: ", contador
FinAlgoritmo
""",
        "output": """*** Ejecución Iniciada ***
Iniciando conteo con ciclo Mientras:
Iteración número: 1
Iteración número: 2
Iteración número: 3
Iteración número: 4
Iteración número: 5
Ciclo finalizado con éxito. Valor final de contador: 6
*** Ejecución Finalizada ***
""",
        "evaluation": {
            "task": "Escribe un algoritmo llamado 'CuentaRegresiva' que inicialice 'i'=3 y use un 'Mientras i > 0 Hacer' para imprimir i y luego decrementar con 'i <- i - 1'.",
            "starterCode": """Algoritmo CuentaRegresiva
	Definir i Como Entero
	i <- 3
	// Escribe el bucle Mientras aquí
	
FinAlgoritmo
""",
            "testRunner": "Mientras i > 0 Hacer",
            "solution": """Algoritmo CuentaRegresiva
	Definir i Como Entero
	i <- 3
	Mientras i > 0 Hacer
		Escribir i
		i <- i - 1
	FinMientras
FinAlgoritmo
""",
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
        "category": "Estructuras Cíclicas e Iterativas",
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
                {"vuelta": 1, "ingreso": -5, "evaluacion": "(-5 > 0) = Falso", "accion": "Repite"},
                {"vuelta": 2, "ingreso": 0, "evaluacion": "(0 > 0) = Falso", "accion": "Repite"},
                {"vuelta": 3, "ingreso": 15, "evaluacion": "(15 > 0) = Verdadero", "accion": "Se detiene"}
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
        "code": """// Validación de entrada con 'Repetir ... Hasta Que'.
// Garantiza que la nota ingresada esté estrictamente entre 1 y 10.
Algoritmo CicloRepetirHasta
	Definir calificacion Como Real
	Definir intentos Como Entero
	intentos <- 0

	Repetir
		intentos <- intentos + 1
		Escribir "Intento #", intentos, ": Ingrese una calificación válida (1.0 a 10.0):"
		// En una ejecución real interactiva usaríamos: Leer calificacion
		// Simulamos que en el intento 2 el usuario ingresa un valor correcto:
		Si intentos < 2 Entonces
			calificacion <- -3.5 // Valor inválido
			Escribir "Dato ingresado: ", calificacion, " (Inválido)"
		Sino
			calificacion <- 8.5  // Valor válido
			Escribir "Dato ingresado: ", calificacion, " (Correcto)"
		FinSi
	Hasta Que calificacion >= 1.0 Y calificacion <= 10.0

	Escribir "Calificación aceptada con éxito en ", intentos, " intentos: ", calificacion
FinAlgoritmo
""",
        "output": """*** Ejecución Iniciada ***
Intento #1: Ingrese una calificación válida (1.0 a 10.0):
Dato ingresado: -3.5 (Inválido)
Intento #2: Ingrese una calificación válida (1.0 a 10.0):
Dato ingresado: 8.5 (Correcto)
Calificación aceptada con éxito en 2 intentos: 8.5
*** Ejecución Finalizada ***
""",
        "evaluation": {
            "task": "Escribe un algoritmo llamado 'BuclePostcondicion' que use 'Repetir' para incrementar 'n' (inicializado en 0) con 'n <- n + 1' e imprimir n, 'Hasta Que n = 3'.",
            "starterCode": """Algoritmo BuclePostcondicion
	Definir n Como Entero
	n <- 0
	// Implementa Repetir-Hasta Que aquí
	
FinAlgoritmo
""",
            "testRunner": "Hasta Que n = 3",
            "solution": """Algoritmo BuclePostcondicion
	Definir n Como Entero
	n <- 0
	Repetir
		n <- n + 1
		Escribir n
	Hasta Que n = 3
FinAlgoritmo
""",
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
        "category": "Estructuras Cíclicas e Iterativas",
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
                {"paso": "i=1", "imprime": "1", "incremento": "i pasa a 2"},
                {"paso": "i=2", "imprime": "2", "incremento": "i pasa a 3"},
                {"paso": "i=3", "imprime": "3", "incremento": "i supera el límite y sale"}
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
        "code": """// Ciclo 'Para' con incremento automático y paso negativo regresivo.
Algoritmo CicloPara
	Definir i, suma Como Entero

	Escribir "1. Conteo ascendente del 1 al 5:"
	Para i <- 1 Hasta 5 Hacer
		Escribir "Paso: ", i
	FinPara

	Escribir ""
	Escribir "2. Conteo regresivo con paso negativo (Con Paso -1):"
	Para i <- 5 Hasta 1 Con Paso -1 Hacer
		Escribir "Cuenta regresiva: ", i
	FinPara

	Escribir ""
	Escribir "3. Sumatoria de números del 1 al 10:"
	suma <- 0
	Para i <- 1 Hasta 10 Hacer
		suma <- suma + i
	FinPara
	Escribir "La sumatoria total es: ", suma
FinAlgoritmo
""",
        "output": """*** Ejecución Iniciada ***
1. Conteo ascendente del 1 al 5:
Paso: 1
Paso: 2
Paso: 3
Paso: 4
Paso: 5

2. Conteo regresivo con paso negativo (Con Paso -1):
Cuenta regresiva: 5
Cuenta regresiva: 4
Cuenta regresiva: 3
Cuenta regresiva: 2
Cuenta regresiva: 1

3. Sumatoria de números del 1 al 10:
La sumatoria total es: 55
*** Ejecución Finalizada ***
""",
        "evaluation": {
            "task": "Escribe un algoritmo llamado 'TablaDelTres' que use un 'Para i <- 1 Hasta 4 Hacer' para imprimir '3 x ' seguido de i, '=' y el resultado '3 * i'.",
            "starterCode": """Algoritmo TablaDelTres
	Definir i Como Entero
	// Implementa el bucle Para aquí
	
FinAlgoritmo
""",
            "testRunner": "Para i <- 1 Hasta 4",
            "solution": """Algoritmo TablaDelTres
	Definir i Como Entero
	Para i <- 1 Hasta 4 Hacer
		Escribir "3 x ", i, " = ", 3 * i
	FinPara
FinAlgoritmo
""",
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
        "category": "Estructuras Cíclicas e Iterativas",
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
                {"vuelta_ext": "i=1", "vuelta_int": "j=1", "combinacion": "(1, 1)"},
                {"vuelta_ext": "i=1", "vuelta_int": "j=2", "combinacion": "(1, 2)"},
                {"vuelta_ext": "i=1", "vuelta_int": "j=3", "combinacion": "(1, 3)"},
                {"vuelta_ext": "i=2", "vuelta_int": "j=1", "combinacion": "(2, 1)"},
                {"vuelta_ext": "i=2", "vuelta_int": "j=2", "combinacion": "(2, 2)"},
                {"vuelta_ext": "i=2", "vuelta_int": "j=3", "combinacion": "(2, 3)"}
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
        "code": """// Bucles anidados para generar una tabla de multiplicar completa (filas y columnas).
Algoritmo BuclesAnidados
	Definir tabla, mult Como Entero

	Escribir "=== TABLAS DE MULTIPLICAR DEL 1 AL 3 ==="

	// Bucle exterior: controla qué tabla estamos imprimiendo
	Para tabla <- 1 Hasta 3 Hacer
		Escribir "--- Tabla del ", tabla, " ---"

		// Bucle interior: calcula los multiplicadores del 1 al 4
		Para mult <- 1 Hasta 4 Hacer
			Escribir tabla, " x ", mult, " = ", (tabla * mult)
		FinPara
	FinPara

	Escribir "Todas las tablas han sido generadas."
FinAlgoritmo
""",
        "output": """*** Ejecución Iniciada ***
=== TABLAS DE MULTIPLICAR DEL 1 AL 3 ===
--- Tabla del 1 ---
1 x 1 = 1
1 x 2 = 2
1 x 3 = 3
1 x 4 = 4
--- Tabla del 2 ---
2 x 1 = 2
2 x 2 = 4
2 x 3 = 6
2 x 4 = 8
--- Tabla del 3 ---
3 x 1 = 3
3 x 2 = 6
3 x 3 = 9
3 x 4 = 12
Todas las tablas han sido generadas.
*** Ejecución Finalizada ***
""",
        "evaluation": {
            "task": "Escribe un algoritmo llamado 'CuadriculaCoordenadas' con dos bucles Para anidados: i de 1 a 2, y j de 1 a 2, imprimiendo 'Coord: ', i, ',', j.",
            "starterCode": """Algoritmo CuadriculaCoordenadas
	Definir i, j Como Entero
	// Escribe los dos bucles anidados
	
FinAlgoritmo
""",
            "testRunner": "Para j <- 1 Hasta 2",
            "solution": """Algoritmo CuadriculaCoordenadas
	Definir i, j Como Entero
	Para i <- 1 Hasta 2 Hacer
		Para j <- 1 Hasta 2 Hacer
			Escribir "Coord: ", i, ",", j
		FinPara
	FinPara
FinAlgoritmo
""",
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
        "category": "Estructuras Cíclicas e Iterativas",
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
                {"paso": "Inicio", "contador": 0, "acumulador": 0},
                {"dato": 10, "contador": 1, "acumulador": 10},
                {"dato": 20, "contador": 2, "acumulador": 30},
                {"dato": 30, "contador": 3, "acumulador": 60},
                {"calculo": "promedio = 60 / 3 = 20.0", "contador": 3, "acumulador": 60}
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
        "code": """// Demostración del uso combinado de Contador y Acumulador para calcular promedios.
Algoritmo ContadoresYAcumuladores
	Definir totalAprobados, i Como Entero
	Definir sumaNotas, notaActual, promedioGeneral Como Real

	// Inicialización obligatoria
	totalAprobados <- 0 // Contador
	sumaNotas <- 0.0     // Acumulador

	// Simulamos procesar 4 calificaciones de estudiantes
	Para i <- 1 Hasta 4 Hacer
		// Simulamos notas: 4.5, 2.5, 3.8, 4.2
		Segun i Hacer
			1: notaActual <- 4.5
			2: notaActual <- 2.5
			3: notaActual <- 3.8
			4: notaActual <- 4.2
		FinSegun

		// Acumulamos la nota en la sumatoria total
		sumaNotas <- sumaNotas + notaActual

		// Contamos si el estudiante aprobó
		Si notaActual >= 3.0 Entonces
			totalAprobados <- totalAprobados + 1
		FinSi
	FinPara

	promedioGeneral <- sumaNotas / 4

	Escribir "Total de notas procesadas: 4"
	Escribir "Suma total acumulada: ", sumaNotas
	Escribir "Promedio general: ", promedioGeneral
	Escribir "Estudiantes aprobados: ", totalAprobados
FinAlgoritmo
""",
        "output": """*** Ejecución Iniciada ***
Total de notas procesadas: 4
Suma total acumulada: 15
Promedio general: 3.75
Estudiantes aprobados: 3
*** Ejecución Finalizada ***
""",
        "evaluation": {
            "task": "Escribe un algoritmo llamado 'AcumuladorSuma' que inicialice 'total'=0 y use un bucle Para de 1 a 5 para acumular los números en 'total <- total + i'. Al final imprime total.",
            "starterCode": """Algoritmo AcumuladorSuma
	Definir i, total Como Entero
	total <- 0
	// Acumula la suma aquí
	
FinAlgoritmo
""",
            "testRunner": "total <- total + i",
            "solution": """Algoritmo AcumuladorSuma
	Definir i, total Como Entero
	total <- 0
	Para i <- 1 Hasta 5 Hacer
		total <- total + i
	FinPara
	Escribir total
FinAlgoritmo
""",
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
        "category": "Estructuras Cíclicas e Iterativas",
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
                {"paso": "Inicio", "encontrado": "Falso"},
                {"dato": 10, "condicion": "10 < 0 (F)", "encontrado": "Falso"},
                {"dato": -4, "condicion": "-4 < 0 (V)", "encontrado": "VERDADERO (Se activa la bandera)"},
                {"dato": 15, "condicion": "Se mantiene en VERDADERO", "encontrado": "VERDADERO"}
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
        "code": """// Uso de valor centinela (-1) y variable bandera lógica (huboNotaBaja).
Algoritmo CentinelasYBanderas
	Definir nota, suma Como Real
	Definir totalNotas Como Entero
	Definir huboNotaBaja Como Logico

	// Inicializaciones
	suma <- 0
	totalNotas <- 0
	huboNotaBaja <- Falso // Bandera lógica en estado inicial

	Escribir "=== REGISTRO CON CENTINELA (-1 PARA TERMINAR) ==="

	// Simulamos lecturas sucesivas con parada en centinela -1
	// Serie de valores simulados: 4.5, 2.1, 4.0, -1
	Definir paso Como Entero
	Para paso <- 1 Hasta 4 Hacer
		Segun paso Hacer
			1: nota <- 4.5
			2: nota <- 2.1
			3: nota <- 4.0
			4: nota <- -1 // Centinela de parada
		FinSegun

		// Verificamos si llegamos al centinela
		Si nota = -1 Entonces
			Escribir "Centinela detectado (-1). Finalizando lectura."
		Sino
			Escribir "Nota procesada: ", nota
			suma <- suma + nota
			totalNotas <- totalNotas + 1

			// Activamos la bandera si detectamos una nota menor a 3.0
			Si nota < 3.0 Entonces
				huboNotaBaja <- Verdadero
			FinSi
		FinSi
	FinPara

	Escribir "Total de notas válidas: ", totalNotas
	Escribir "Promedio: ", (suma / totalNotas)
	Escribir "¿Se detectó al menos una nota baja (< 3.0)?: ", huboNotaBaja
FinAlgoritmo
""",
        "output": """*** Ejecución Iniciada ***
=== REGISTRO CON CENTINELA (-1 PARA TERMINAR) ===
Nota procesada: 4.5
Nota procesada: 2.1
Nota procesada: 4
Centinela detectado (-1). Finalizando lectura.
Total de notas válidas: 3
Promedio: 3.5333333333
¿Se detectó al menos una nota baja (< 3.0)?: VERDADERO
*** Ejecución Finalizada ***
""",
        "evaluation": {
            "task": "Escribe un algoritmo llamado 'BanderaEncontrado' que declare 'encontrado' Como Logico inicializado en Falso. Si un número num=7 es igual a 7, pon 'encontrado <- Verdadero' e imprime 'encontrado'.",
            "starterCode": """Algoritmo BanderaEncontrado
	Definir num Como Entero
	Definir encontrado Como Logico
	num <- 7
	encontrado <- Falso
	// Activa la bandera si num es 7
	
FinAlgoritmo
""",
            "testRunner": "encontrado <- Verdadero",
            "solution": """Algoritmo BanderaEncontrado
	Definir num Como Entero
	Definir encontrado Como Logico
	num <- 7
	encontrado <- Falso
	Si num = 7 Entonces
		encontrado <- Verdadero
	FinSi
	Escribir encontrado
FinAlgoritmo
""",
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
        "category": "Modularización y Funciones",
        "categorySlug": "modularizacion",
        "categoryIcon": "tool",
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
                {"paso": 1, "modulo": "Algoritmo Principal", "accion": "Llama a 'ImprimirEncabezado'"},
                {"paso": 2, "modulo": "SubProceso ImprimirEncabezado", "accion": "Ejecuta las líneas del encabezado"},
                {"paso": 3, "modulo": "FinSubProceso", "accion": "Retorna exactamente a la línea siguiente en el principal"}
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
        "code": """// Definición e invocación de subprocesos modulares reutilizables.

// Subproceso que imprime un separador gráfico decorativo
SubProceso ImprimirSeparador(simbolo)
	Definir k Como Entero
	Para k <- 1 Hasta 35 Hacer
		Escribir Sin Bajar simbolo
	FinPara
	Escribir "" // Salto de línea
FinSubProceso

// Subproceso con parámetros que muestra los datos de un usuario
SubProceso MostrarFicha(nombre, rol, nivel)
	Escribir "FICHA TÉCNICA DE USUARIO:"
	Escribir " - Nombre: ", nombre
	Escribir " - Cargo: ", rol
	Escribir " - Nivel de acceso: Nivel ", nivel
FinSubProceso

// Algoritmo principal que orquesta los subprocesos
Algoritmo SubprocesosSinRetorno
	ImprimirSeparador("=")
	MostrarFicha("Valeria Castro", "Ingeniera de Software", 3)
	ImprimirSeparador("=")
	MostrarFicha("Diego Méndez", "Arquitecto Cloud", 5)
	ImprimirSeparador("=")
FinAlgoritmo
""",
        "output": """*** Ejecución Iniciada ***
===================================
FICHA TÉCNICA DE USUARIO:
 - Nombre: Valeria Castro
 - Cargo: Ingeniera de Software
 - Nivel de acceso: Nivel 3
===================================
FICHA TÉCNICA DE USUARIO:
 - Nombre: Diego Méndez
 - Cargo: Arquitecto Cloud
 - Nivel de acceso: Nivel 5
===================================
*** Ejecución Finalizada ***
""",
        "evaluation": {
            "task": "Escribe un algoritmo con un SubProceso llamado 'Saludar(nombre)' que imprima 'Hola, ', nombre. En el Algoritmo principal invócalo con Saludar(\"Lucas\").",
            "starterCode": """SubProceso Saludar(nombre)
	// Imprime el saludo
	
FinSubProceso

Algoritmo PruebaSubproceso
	// Llama al subproceso con \"Lucas\"
	
FinAlgoritmo
""",
            "testRunner": "SubProceso Saludar(nombre)",
            "solution": """SubProceso Saludar(nombre)
	Escribir "Hola, ", nombre
FinSubProceso

Algoritmo PruebaSubproceso
	Saludar("Lucas")
FinAlgoritmo
""",
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
        "category": "Modularización y Funciones",
        "categorySlug": "modularizacion",
        "categoryIcon": "tool",
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
                {"expresion": "hipotenusa <- CalcularHipotenusa(3, 4)", "accion": "Invoca función con a=3, b=4"},
                {"en_funcion": "h <- Raiz(3^2 + 4^2) = Raiz(9 + 16) = Raiz(25) = 5.0", "accion": "Calcula resultado"},
                {"retorno": "Devuelve 5.0 a hipotenusa", "resultado": "hipotenusa = 5.0"}
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
        "code": """// Definición de funciones matemáticas puras que retornan un valor calculado.

// Función que calcula el área de un triángulo
SubProceso area <- CalcularAreaTriangulo(base, altura)
	Definir area Como Real
	area <- (base * altura) / 2
FinSubProceso

// Función que calcula el mayor entre dos números
SubProceso mayor <- ObtenerMayor(n1, n2)
	Definir mayor Como Entero
	Si n1 >= n2 Entonces
		mayor <- n1
	Sino
		mayor <- n2
	FinSi
FinSubProceso

Algoritmo FuncionesConRetorno
	Definir b, h, resArea Como Real
	b <- 12.0
	h <- 8.0

	// Invocación y captura del valor de retorno
	resArea <- CalcularAreaTriangulo(b, h)
	Escribir "Área del triángulo (base ", b, ", altura ", h, ") = ", resArea

	// Uso directo del valor de retorno en una expresión de impresión
	Escribir "El número mayor entre 45 y 89 es: ", ObtenerMayor(45, 89)
FinAlgoritmo
""",
        "output": """*** Ejecución Iniciada ***
Área del triángulo (base 12, altura 8) = 48
El número mayor entre 45 y 89 es: 89
*** Ejecución Finalizada ***
""",
        "evaluation": {
            "task": "Escribe una función con retorno llamada 'res <- Cuadrado(x)' que retorne x * x. En el Algoritmo principal imprime el resultado de Cuadrado(5).",
            "starterCode": """SubProceso res <- Cuadrado(x)
	// Calcula y retorna el cuadrado
	
FinSubProceso

Algoritmo PruebaFuncion
	// Imprime Cuadrado(5)
	
FinAlgoritmo
""",
            "testRunner": "SubProceso res <- Cuadrado(x)",
            "solution": """SubProceso res <- Cuadrado(x)
	Definir res Como Real
	res <- x * x
FinSubProceso

Algoritmo PruebaFuncion
	Escribir Cuadrado(5)
FinAlgoritmo
""",
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
    }
]
