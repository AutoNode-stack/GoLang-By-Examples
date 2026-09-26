# -*- coding: utf-8 -*-
"""
pseint_data_part3.py
Temas 21 a 30 del curso completo de Lógica de Programación y Algoritmos en PSeInt.
"""

PSEINT_TOPICS_PART3 = [
    {
        "id": 21,
        "slug": "paso-por-valor",
        "title": "Paso de Parámetros por Valor",
        "titleEs": "Paso de Parámetros por Valor",
        "category": "Modularización y Subprocesos",
        "categorySlug": "modularizacion-subprocesos",
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
        "code": """// Algoritmo: Demostración de Paso de Parámetros Por Valor
SubProceso ModificarCopia(Por Valor numeroCopia)
    // Mostramos el valor inicial recibido en el parámetro formal
    Escribir ">> [SubProceso] Valor recibido en copia:", numeroCopia
    
    // Modificamos únicamente la copia local del subproceso
    numeroCopia <- numeroCopia * 10
    Escribir ">> [SubProceso] Valor alterado dentro del subproceso:", numeroCopia
FinSubProceso

Algoritmo DemostracionPasoPorValor
    // Declaramos la variable original en el ámbito principal
    Definir valorOriginal Como Entero
    valorOriginal <- 42
    
    Escribir "=== ANTES DE LA LLAMADA AL SUBPROCESO ==="
    Escribir "Variable original en el Algoritmo Principal:", valorOriginal
    
    // Invocamos el subproceso enviando la variable
    Escribir ""
    Escribir "=== EJECUTANDO SUBPROCESO POR VALOR ==="
    ModificarCopia(valorOriginal)
    
    // Verificamos que la variable original no haya sufrido modificaciones
    Escribir ""
    Escribir "=== DESPUÉS DE LA LLAMADA AL SUBPROCESO ==="
    Escribir "Variable original en el Algoritmo Principal:", valorOriginal
    Escribir "Conclusión: La variable principal permanece inmutable y protegida."
FinAlgoritmo""",
        "output": """=== ANTES DE LA LLAMADA AL SUBPROCESO ===
Variable original en el Algoritmo Principal: 42

=== EJECUTANDO SUBPROCESO POR VALOR ===
>> [SubProceso] Valor recibido en copia: 42
>> [SubProceso] Valor alterado dentro del subproceso: 420

=== DESPUÉS DE LA LLAMADA AL SUBPROCESO ===
Variable original en el Algoritmo Principal: 42
Conclusión: La variable principal permanece inmutable y protegida.""",
        "evaluation": {
            "starterCode": """// Ejercicio: Implementa el subproceso 'AplicarDescuentoCopia' que reciba por valor
// el precio de un producto y un porcentaje, calcule el precio descontado y lo muestre
// en consola, demostrando que la variable original no se modifica.
SubProceso AplicarDescuentoCopia(Por Valor precio, Por Valor porcentaje)
    // Escribe aquí la lógica para calcular y mostrar el precio con descuento
FinSubProceso

Algoritmo EvaluacionPasoPorValor
    Definir precioBase Como Real
    precioBase <- 200
    AplicarDescuentoCopia(precioBase, 25)
    Escribir "Precio original verificado:", precioBase
FinAlgoritmo""",
            "task": "Completa el cuerpo del subproceso 'AplicarDescuentoCopia' para que calcule el precio final restando el porcentaje y muestre en consola 'Precio con descuento: ' seguido del valor calculado (que para 200 con 25% debe ser 150).",
            "testRunner": "function(code, output) { const hasDescuento = /Precio con descuento:\\s*150/i.test(output); const hasOriginal = /Precio original verificado:\\s*200/i.test(output); return { passed: hasDescuento && hasOriginal, feedback: hasDescuento ? '¡Excelente! Has dominado el aislamiento de memoria en el paso por valor.' : 'Verifica el cálculo del descuento (debe resultar en 150) y el mensaje exacto.' }; }",
            "solution": """SubProceso AplicarDescuentoCopia(Por Valor precio, Por Valor porcentaje)
    Definir precioFinal Como Real
    precioFinal <- precio - (precio * (porcentaje / 100))
    Escribir "Precio con descuento:", precioFinal
FinSubProceso

Algoritmo EvaluacionPasoPorValor
    Definir precioBase Como Real
    precioBase <- 200
    AplicarDescuentoCopia(precioBase, 25)
    Escribir "Precio original verificado:", precioBase
FinAlgoritmo"""
        },
        "externalLinks": [
            {"title": "Documentación Oficial PSeInt: Subprocesos y Parámetros", "url": "http://pseint.sourceforge.net/"},
            {"title": "GeeksforGeeks: Pass by Value vs Pass by Reference", "url": "https://www.geeksforgeeks.org/pass-by-value-vs-pass-by-reference/"}
        ]
    },
    {
        "id": 22,
        "slug": "paso-por-referencia",
        "title": "Paso de Parámetros por Referencia",
        "titleEs": "Paso de Parámetros por Referencia",
        "category": "Modularización y Subprocesos",
        "categorySlug": "modularizacion-subprocesos",
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
        "code": """// Algoritmo: Intercambio de Variables usando Paso Por Referencia
SubProceso Intercambiar(Por Referencia refA, Por Referencia refB)
    Definir auxiliar Como Entero
    
    // Guardamos el valor de refA en la variable temporal auxiliar
    auxiliar <- refA
    
    // Asignamos el valor de refB en la celda de memoria de refA
    refA <- refB
    
    // Asignamos el valor guardado en el auxiliar a la celda de refB
    refB <- auxiliar
    
    Escribir ">> [SubProceso] Intercambio realizado con éxito en memoria compartida."
FinSubProceso

Algoritmo DemostracionPasoPorReferencia
    Definir primerNumero, segundoNumero Como Entero
    
    primerNumero <- 10
    segundoNumero <- 99
    
    Escribir "=== VALORES ORIGINALES ANTES DEL INTERCAMBIO ==="
    Escribir "primerNumero:", primerNumero
    Escribir "segundoNumero:", segundoNumero
    
    // Llamamos al subproceso pasando las variables por referencia
    Escribir ""
    Escribir "=== LLAMANDO AL SUBPROCESO INTERCAMBIAR ==="
    Intercambiar(primerNumero, segundoNumero)
    
    // Los valores de las variables en el algoritmo principal ahora están invertidos
    Escribir ""
    Escribir "=== VALORES TRAS RETORNAR DEL SUBPROCESO ==="
    Escribir "primerNumero:", primerNumero
    Escribir "segundoNumero:", segundoNumero
    Escribir "Conclusión: Las variables originales fueron modificadas permanentemente."
FinAlgoritmo""",
        "output": """=== VALORES ORIGINALES ANTES DEL INTERCAMBIO ===
primerNumero: 10
segundoNumero: 99

=== LLAMANDO AL SUBPROCESO INTERCAMBIAR ===
>> [SubProceso] Intercambio realizado con éxito en memoria compartida.

=== VALORES TRAS RETORNAR DEL SUBPROCESO ===
primerNumero: 99
segundoNumero: 10
Conclusión: Las variables originales fueron modificadas permanentemente.""",
        "evaluation": {
            "starterCode": """// Ejercicio: Implementa el subproceso 'IncrementarEnDiez' que reciba una variable
// por referencia y le sume 10 a su valor original.
SubProceso IncrementarEnDiez(Por Referencia numero)
    // Escribe aquí la instrucción para sumarle 10 al parámetro por referencia
FinSubProceso

Algoritmo EvaluacionPasoPorReferencia
    Definir contador Como Entero
    contador <- 50
    IncrementarEnDiez(contador)
    Escribir "Contador incrementado:", contador
FinAlgoritmo""",
            "task": "Escribe la línea de código dentro de 'IncrementarEnDiez' para sumar 10 a la variable 'numero' de modo que al ejecutarse el algoritmo principal muestre 'Contador incrementado: 60'.",
            "testRunner": "function(code, output) { const passed = /Contador incrementado:\\s*60/i.test(output); return { passed: passed, feedback: passed ? '¡Perfecto! Has dominado la mutabilidad directa mediante paso por referencia.' : 'Asegúrate de asignar numero <- numero + 10 dentro del subproceso.' }; }",
            "solution": """SubProceso IncrementarEnDiez(Por Referencia numero)
    numero <- numero + 10
FinSubProceso

Algoritmo EvaluacionPasoPorReferencia
    Definir contador Como Entero
    contador <- 50
    IncrementarEnDiez(contador)
    Escribir "Contador incrementado:", contador
FinAlgoritmo"""
        },
        "externalLinks": [
            {"title": "Documentación Oficial PSeInt: Paso Por Referencia", "url": "http://pseint.sourceforge.net/"},
            {"title": "Wikipedia: Parámetro por referencia", "url": "https://es.wikipedia.org/wiki/Par%C3%A1metro_(inform%C3%A1tica)"}
        ]
    },
    {
        "id": 23,
        "slug": "ambito-de-variables",
        "title": "Ámbito y Visibilidad de Variables",
        "titleEs": "Ámbito y Visibilidad de Variables",
        "category": "Modularización y Subprocesos",
        "categorySlug": "modularizacion-subprocesos",
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
        "code": """// Algoritmo: Demostración de Ámbito Local y No Interferencia
SubProceso ProcesoA
    Definir x Como Entero
    x <- 500
    Escribir ">> [ProcesoA] Mi variable local x vale:", x
FinSubProceso

SubProceso ProcesoB
    Definir x Como Entero
    x <- 999
    Escribir ">> [ProcesoB] Mi variable local x vale:", x
FinSubProceso

Algoritmo DemostracionAmbitoVariables
    Definir x Como Entero
    x <- 10
    
    Escribir "=== ÁMBITO PRINCIPAL INICIAL ==="
    Escribir "Variable x en Algoritmo Principal:", x
    
    Escribir ""
    Escribir "=== INVOCANDO SUBPROCESOS CON MISMOS IDENTIFICADORES ==="
    ProcesoA()
    ProcesoB()
    
    Escribir ""
    Escribir "=== RETORNO AL ÁMBITO PRINCIPAL ==="
    Escribir "Variable x en Algoritmo Principal tras llamadas:", x
    Escribir "Demostración: Cada bloque mantiene su propio espacio aislado de variables."
FinAlgoritmo""",
        "output": """=== ÁMBITO PRINCIPAL INICIAL ===
Variable x en Algoritmo Principal: 10

=== INVOCANDO SUBPROCESOS CON MISMOS IDENTIFICADORES ===
>> [ProcesoA] Mi variable local x vale: 500
>> [ProcesoB] Mi variable local x vale: 999

=== RETORNO AL ÁMBITO PRINCIPAL ===
Variable x en Algoritmo Principal tras llamadas: 10
Demostración: Cada bloque mantiene su propio espacio aislado de variables.""",
        "evaluation": {
            "starterCode": """// Ejercicio: Declara un subproceso llamado 'MostrarMensajeLocal' que defina una
// variable local de tipo Caracter con el texto 'Mensaje Local' y la muestre en pantalla.
// Demuestra en el algoritmo que la variable del algoritmo principal no es afectada.
SubProceso MostrarMensajeLocal
    // Escribe la definición de la variable local y muéstrala
FinSubProceso

Algoritmo EvaluacionAmbito
    Definir texto Como Caracter
    texto <- "Texto Global"
    MostrarMensajeLocal()
    Escribir "Texto verificado en principal:", texto
FinAlgoritmo""",
            "task": "Completa 'MostrarMensajeLocal' para que defina una variable local 'mensaje' con el valor 'Mensaje Local' y ejecute Escribir 'Mensaje desde subproceso: ', mensaje.",
            "testRunner": "function(code, output) { const hasSub = /Mensaje desde subproceso:\\s*Mensaje Local/i.test(output); const hasMain = /Texto verificado en principal:\\s*Texto Global/i.test(output); return { passed: hasSub && hasMain, feedback: hasSub ? '¡Correcto! Has verificado la separación estricta de ámbitos léxicos.' : 'Asegúrate de mostrar exactamente el mensaje indicado desde el subproceso.' }; }",
            "solution": """SubProceso MostrarMensajeLocal
    Definir mensaje Como Caracter
    mensaje <- "Mensaje Local"
    Escribir "Mensaje desde subproceso:", mensaje
FinSubProceso

Algoritmo EvaluacionAmbito
    Definir texto Como Caracter
    texto <- "Texto Global"
    MostrarMensajeLocal()
    Escribir "Texto verificado en principal:", texto
FinAlgoritmo"""
        },
        "externalLinks": [
            {"title": "Wikipedia: Ámbito (programación)", "url": "https://es.wikipedia.org/wiki/%C3%81mbito_(programaci%C3%B3n)"},
            {"title": "OpenWebinars: Variables locales y globales", "url": "https://openwebinars.net/blog/variables-locales-y-globales-que-son-y-diferencias/"}
        ]
    },
    {
        "id": 24,
        "slug": "recursion-factorial",
        "title": "Recursión: Cálculo del Factorial",
        "titleEs": "Recursión: Cálculo del Factorial",
        "category": "Modularización y Subprocesos",
        "categorySlug": "modularizacion-subprocesos",
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
        "code": """// Algoritmo: Cálculo del Factorial mediante Función Recursiva
Funcion resultado <- CalcularFactorial(n)
    Definir resultado Como Entero
    
    // CONDICIÓN DE PARADA: Caso Base
    Si n <= 1 Entonces
        // 0! = 1 y 1! = 1
        resultado <- 1
    Sino
        // PASO RECURSIVO: n * Factorial(n - 1)
        resultado <- n * CalcularFactorial(n - 1)
    FinSi
FinFuncion

Algoritmo DemostracionRecursionFactorial
    Definir numero, resultadoFactorial Como Entero
    
    Escribir "=== CÁLCULO RECURSIVO DEL FACTORIAL ==="
    numero <- 5
    
    Escribir "Calculando el factorial de:", numero
    resultadoFactorial <- CalcularFactorial(numero)
    
    Escribir "El factorial de", numero, "es:", resultadoFactorial
    Escribir ""
    Escribir "Verificación matemática: 5! = 5 * 4 * 3 * 2 * 1 = 120"
FinAlgoritmo""",
        "output": """=== CÁLCULO RECURSIVO DEL FACTORIAL ===
Calculando el factorial de: 5
El factorial de 5 es: 120

Verificación matemática: 5! = 5 * 4 * 3 * 2 * 1 = 120""",
        "evaluation": {
            "starterCode": """// Ejercicio: Implementa la función recursiva 'SumarHastaN' que sume todos los números
// enteros consecutivos desde 1 hasta N de forma recursiva:
// Caso base: Si N <= 1 retorna 1.
// Caso recursivo: N + SumarHastaN(N - 1).
Funcion suma <- SumarHastaN(n)
    Definir suma Como Entero
    // Escribe aquí la estructura condicional con caso base y paso recursivo
FinFuncion

Algoritmo EvaluacionRecursionSuma
    Definir resultado Como Entero
    resultado <- SumarHastaN(5)
    Escribir "Suma acumulada hasta 5:", resultado
FinAlgoritmo""",
            "task": "Completa la función recursiva 'SumarHastaN' para calcular la suma de Gauss desde 1 hasta N. Para n=5 el resultado debe ser 15 (1+2+3+4+5).",
            "testRunner": "function(code, output) { const passed = /Suma acumulada hasta 5:\\s*15/i.test(output); return { passed: passed, feedback: passed ? '¡Brillante! Has asimilado la construcción de casos base y pasos recursivos.' : 'Verifica que el caso recursivo sume n + SumarHastaN(n - 1) y el caso base devuelva 1.' }; }",
            "solution": """Funcion suma <- SumarHastaN(n)
    Definir suma Como Entero
    Si n <= 1 Entonces
        suma <- 1
    Sino
        suma <- n + SumarHastaN(n - 1)
    FinSi
FinFuncion

Algoritmo EvaluacionRecursionSuma
    Definir resultado Como Entero
    resultado <- SumarHastaN(5)
    Escribir "Suma acumulada hasta 5:", resultado
FinAlgoritmo"""
        },
        "externalLinks": [
            {"title": "Khan Academy: ¿Qué es la recursión?", "url": "https://es.khanacademy.org/computing/computer-science/algorithms/recursive-algorithms/a/recursion"},
            {"title": "Documentación Oficial PSeInt: Funciones", "url": "http://pseint.sourceforge.net/"}
        ]
    },
    {
        "id": 25,
        "slug": "recursion-fibonacci",
        "title": "Recursión: Sucesión de Fibonacci",
        "titleEs": "Recursión: Sucesión de Fibonacci",
        "category": "Modularización y Subprocesos",
        "categorySlug": "modularizacion-subprocesos",
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
        "code": """// Algoritmo: Cálculo del N-ésimo término de Fibonacci con Recursión
Funcion valorTermino <- CalcularFibonacci(posicion)
    Definir valorTermino Como Entero
    
    // CASOS BASE: Las dos primeras posiciones de la serie
    Si posicion = 0 Entonces
        valorTermino <- 0
    Sino
        Si posicion = 1 Entonces
            valorTermino <- 1
        Sino
            // CASO RECURSIVO DOBLE: Suma de los dos términos previos
            valorTermino <- CalcularFibonacci(posicion - 1) + CalcularFibonacci(posicion - 2)
        FinSi
    FinSi
FinFuncion

Algoritmo DemostracionRecursionFibonacci
    Definir indice, termino Como Entero
    
    Escribir "=== SUCESIÓN DE FIBONACCI RECURSIVA ==="
    Escribir "Generando los primeros 8 términos de la serie:"
    
    // Mostramos la serie desde la posición 0 hasta la 7
    Para indice <- 0 Hasta 7 Con Paso 1 Hacer
        termino <- CalcularFibonacci(indice)
        Escribir "Posición [", indice, "] -> ", termino
    FinPara
    
    Escribir ""
    Escribir "Secuencia resultante: 0, 1, 1, 2, 3, 5, 8, 13"
FinAlgoritmo""",
        "output": """=== SUCESIÓN DE FIBONACCI RECURSIVA ===
Generando los primeros 8 términos de la serie:
Posición [ 0 ] -> 0
Posición [ 1 ] -> 1
Posición [ 2 ] -> 1
Posición [ 3 ] -> 2
Posición [ 4 ] -> 3
Posición [ 5 ] -> 5
Posición [ 6 ] -> 8
Posición [ 7 ] -> 13

Secuencia resultante: 0, 1, 1, 2, 3, 5, 8, 13""",
        "evaluation": {
            "starterCode": """// Ejercicio: Modifica la función 'ObtenerFibonacci' para que verifique si la posición
// recibida es menor a 0. Si es negativa debe retornar -1 (código de error).
// Si es 0 retorna 0, si es 1 retorna 1, y si es mayor o igual a 2 retorna F(n-1) + F(n-2).
Funcion f <- ObtenerFibonacci(n)
    Definir f Como Entero
    // Escribe la estructura completa de validación y recursión
FinFuncion

Algoritmo EvaluacionFibonacci
    Escribir "Fibonacci en posición 6:", ObtenerFibonacci(6)
FinAlgoritmo""",
            "task": "Completa 'ObtenerFibonacci' para calcular correctamente el término en la posición 6 (cuyo resultado matemático es 8).",
            "testRunner": "function(code, output) { const passed = /Fibonacci en posición 6:\\s*8/i.test(output); return { passed: passed, feedback: passed ? '¡Impresionante! Has dominado la recursión doble y el control de casos base.' : 'El término en la posición 6 de Fibonacci debe ser 8. Revisa tus casos condicionales.' }; }",
            "solution": """Funcion f <- ObtenerFibonacci(n)
    Definir f Como Entero
    Si n < 0 Entonces
        f <- -1
    Sino
        Si n = 0 Entonces
            f <- 0
        Sino
            Si n = 1 Entonces
                f <- 1
            Sino
                f <- ObtenerFibonacci(n - 1) + ObtenerFibonacci(n - 2)
            FinSi
        FinSi
    FinSi
FinFuncion

Algoritmo EvaluacionFibonacci
    Escribir "Fibonacci en posición 6:", ObtenerFibonacci(6)
FinAlgoritmo"""
        },
        "externalLinks": [
            {"title": "Wikipedia: Sucesión de Fibonacci", "url": "https://es.wikipedia.org/wiki/Sucesi%C3%B3n_de_Fibonacci"},
            {"title": "Khan Academy: Fibonacci y la razón áurea", "url": "https://es.khanacademy.org/"}
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
        "code": """// Algoritmo: Declaración, Dimensión y Acceso Directo a Vectores
Algoritmo DeclaracionYDimensionVectores
    // 1. Declaramos el tipo de dato de los elementos del vector
    Definir edades Como Entero
    
    // 2. Reservamos espacio contiguo en memoria para 5 celdas usando Dimension
    Dimension edades[5]
    
    // 3. Asignamos valores directamente a cada índice individual (1 a 5)
    edades[1] <- 18
    edades[2] <- 22
    edades[3] <- 30
    edades[4] <- 25
    edades[5] <- 40
    
    // 4. Mostramos valores accediendo por su índice específico
    Escribir "=== ACCESO INDIVIDUAL A CELDAS DEL VECTOR ==="
    Escribir "Elemento en la posición 1:", edades[1]
    Escribir "Elemento en la posición 3:", edades[3]
    Escribir "Elemento en la última posición (5):", edades[5]
    
    // 5. Modificamos una celda específica
    edades[3] <- 35
    Escribir ""
    Escribir "Valor modificado en la posición 3:", edades[3]
FinAlgoritmo""",
        "output": """=== ACCESO INDIVIDUAL A CELDAS DEL VECTOR ===
Elemento en la posición 1: 18
Elemento en la posición 3: 30
Elemento en la última posición (5): 40

Valor modificado en la posición 3: 35""",
        "evaluation": {
            "starterCode": """// Ejercicio: Declara un arreglo de 3 elementos llamado 'temperaturas' de tipo Real.
// Asigna los valores 24.5 a la posición 1, 28.0 a la posición 2 y 19.8 a la posición 3.
// Luego muestra en pantalla el valor de la posición 2.
Algoritmo EvaluacionDimensionVectores
    Definir temperaturas Como Real
    // Dimensiona el vector y asigna los 3 valores
    
    Escribir "Temperatura seleccionada:", temperaturas[2]
FinAlgoritmo""",
            "task": "Dimensiona 'temperaturas' con 3 elementos, asígnales los valores indicados y ejecuta el algoritmo para verificar que la posición 2 muestre 28.",
            "testRunner": "function(code, output) { const hasDim = /Dimension\\s+temperaturas\\s*\\[\\s*3\\s*\\]/i.test(code); const hasVal = /Temperatura seleccionada:\\s*28/i.test(output); return { passed: hasDim && hasVal, feedback: hasDim && hasVal ? '¡Excelente! Has dimensionado y asignado un vector con total precisión.' : 'Asegúrate de incluir Dimension temperaturas[3] y asignar temperaturas[2] <- 28.' }; }",
            "solution": """Algoritmo EvaluacionDimensionVectores
    Definir temperaturas Como Real
    Dimension temperaturas[3]
    temperaturas[1] <- 24.5
    temperaturas[2] <- 28.0
    temperaturas[3] <- 19.8
    
    Escribir "Temperatura seleccionada:", temperaturas[2]
FinAlgoritmo"""
        },
        "externalLinks": [
            {"title": "Documentación Oficial PSeInt: Arreglos y Dimension", "url": "http://pseint.sourceforge.net/"},
            {"title": "GeeksforGeeks: Introducción a Arrays", "url": "https://www.geeksforgeeks.org/introduction-to-arrays/"}
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
        "code": """// Algoritmo: Llenado Dinámico y Recorrido de Vectores
Algoritmo RecorridoVectoresConPara
    Definir TAMANIO, i Como Entero
    TAMANIO <- 6
    
    // Declaramos y dimensionamos el vector de números
    Definir numeros Como Entero
    Dimension numeros[TAMANIO]
    
    Escribir "=== LLENANDO EL VECTOR CON NÚMEROS PARES ==="
    // Primer bucle: Llenado algorítmico de celdas
    Para i <- 1 Hasta TAMANIO Con Paso 1 Hacer
        numeros[i] <- i * 2 // Guarda 2, 4, 6, 8, 10, 12
    FinPara
    Escribir "Llenado completado exitosamente."
    
    Escribir ""
    Escribir "=== RECORRIENDO E IMPRIMIENDO EL CONTENIDO ==="
    // Segundo bucle: Recorrido y visualización de cada celda
    Para i <- 1 Hasta TAMANIO Con Paso 1 Hacer
        Escribir "Índice [", i, "] contiene el valor:", numeros[i]
    FinPara
FinAlgoritmo""",
        "output": """=== LLENANDO EL VECTOR CON NÚMEROS PARES ===
Llenado completado exitosamente.

=== RECORRIENDO E IMPRIMIENDO EL CONTENIDO ===
Índice [ 1 ] contiene el valor: 2
Índice [ 2 ] contiene el valor: 4
Índice [ 3 ] contiene el valor: 6
Índice [ 4 ] contiene el valor: 8
Índice [ 5 ] contiene el valor: 10
Índice [ 6 ] contiene el valor: 12""",
        "evaluation": {
            "starterCode": """// Ejercicio: Llena un vector de 4 posiciones con los cuadrados de su propio índice
// (es decir, posicion 1 -> 1, posicion 2 -> 4, posicion 3 -> 9, posicion 4 -> 16)
// y luego calcula e imprime la suma de todos los elementos del vector.
Algoritmo EvaluacionRecorridoVectores
    Definir i, sumaTotal Como Entero
    Definir cuadrados Como Entero
    Dimension cuadrados[4]
    
    // 1. Llena el vector con i * i usando un bucle Para
    
    // 2. Recorre el vector para acumular la suma en sumaTotal
    sumaTotal <- 0
    
    Escribir "Suma total de cuadrados:", sumaTotal
FinAlgoritmo""",
            "task": "Completa los bucles para llenar el vector con los cuadrados (1, 4, 9, 16) y acumular su suma total (que debe dar 30).",
            "testRunner": "function(code, output) { const passed = /Suma total de cuadrados:\\s*30/i.test(output); return { passed: passed, feedback: passed ? '¡Magnífico! Has dominado el patrón de recorrido y acumulación sobre vectores.' : 'La suma de 1 + 4 + 9 + 16 debe ser 30. Revisa el llenado y la suma acumulada.' }; }",
            "solution": """Algoritmo EvaluacionRecorridoVectores
    Definir i, sumaTotal Como Entero
    Definir cuadrados Como Entero
    Dimension cuadrados[4]
    
    Para i <- 1 Hasta 4 Con Paso 1 Hacer
        cuadrados[i] <- i * i
    FinPara
    
    sumaTotal <- 0
    Para i <- 1 Hasta 4 Con Paso 1 Hacer
        sumaTotal <- sumaTotal + cuadrados[i]
    FinPara
    
    Escribir "Suma total de cuadrados:", sumaTotal
FinAlgoritmo"""
        },
        "externalLinks": [
            {"title": "Documentación Oficial PSeInt: Estructura Para", "url": "http://pseint.sourceforge.net/"},
            {"title": "Tutorialspoint: Array traversal", "url": "https://www.tutorialspoint.com/data_structures_algorithms/array_data_structure.htm"}
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
        "code": """// Algoritmo: Búsqueda Lineal con Detección de Posición
Algoritmo BusquedaLinealSecuencial
    Definir TAMANIO, i, elementoBuscado, posicionHallada Como Entero
    Definir encontrado Como Logico
    
    TAMANIO <- 6
    Definir arreglo Como Entero
    Dimension arreglo[TAMANIO]
    
    // Inicializamos el vector con valores de prueba desordenados
    arreglo[1] <- 45
    arreglo[2] <- 12
    arreglo[3] <- 89
    arreglo[4] <- 34
    arreglo[5] <- 70
    arreglo[6] <- 23
    
    // Elemento que deseamos localizar
    elementoBuscado <- 89
    
    // Inicializamos variables de control
    encontrado <- Falso
    posicionHallada <- -1
    
    Escribir "=== INICIANDO BÚSQUEDA LINEAL ==="
    Escribir "Buscando el número:", elementoBuscado
    
    // Recorremos secuencialmente el vector
    Para i <- 1 Hasta TAMANIO Con Paso 1 Hacer
        Si arreglo[i] = elementoBuscado Entonces
            encontrado <- Verdadero
            posicionHallada <- i
            // Podemos salir del ciclo o dejar que continúe
        FinSi
    FinPara
    
    // Evaluación del resultado de la búsqueda
    Escribir ""
    Si encontrado Entonces
        Escribir "¡Éxito! El número", elementoBuscado, "fue encontrado en la posición:", posicionHallada
    Sino
        Escribir "El número", elementoBuscado, "no existe dentro del arreglo."
    FinSi
FinAlgoritmo""",
        "output": """=== INICIANDO BÚSQUEDA LINEAL ===
Buscando el número: 89

¡Éxito! El número 89 fue encontrado en la posición: 3""",
        "evaluation": {
            "starterCode": """// Ejercicio: Modifica la búsqueda para encontrar el valor 99 en el vector dado.
// Si no se encuentra, debe imprimir exactamente: 'Elemento no encontrado en el vector.'
Algoritmo EvaluacionBusquedaLineal
    Definir datos Como Entero
    Dimension datos[4]
    datos[1] <- 10
    datos[2] <- 25
    datos[3] <- 30
    datos[4] <- 45
    
    Definir buscar, i Como Entero
    Definir hallado Como Logico
    buscar <- 99
    hallado <- Falso
    
    // Realiza el recorrido de búsqueda
    
    Si hallado Entonces
        Escribir "Elemento encontrado"
    Sino
        Escribir "Elemento no encontrado en el vector."
    FinSi
FinAlgoritmo""",
            "task": "Escribe el ciclo de búsqueda para verificar si 'buscar' (99) está en el vector y confirma que imprima 'Elemento no encontrado en el vector.'",
            "testRunner": "function(code, output) { const passed = /Elemento no encontrado en el vector\\./i.test(output); return { passed: passed, feedback: passed ? '¡Perfecto! Has verificado correctamente el caso de elemento inexistente en búsqueda lineal.' : 'Asegúrate de que el mensaje de no encontrado sea exactamente el solicitado.' }; }",
            "solution": """Algoritmo EvaluacionBusquedaLineal
    Definir datos Como Entero
    Dimension datos[4]
    datos[1] <- 10
    datos[2] <- 25
    datos[3] <- 30
    datos[4] <- 45
    
    Definir buscar, i Como Entero
    Definir hallado Como Logico
    buscar <- 99
    hallado <- Falso
    
    Para i <- 1 Hasta 4 Con Paso 1 Hacer
        Si datos[i] = buscar Entonces
            hallado <- Verdadero
        FinSi
    FinPara
    
    Si hallado Entonces
        Escribir "Elemento encontrado"
    Sino
        Escribir "Elemento no encontrado en el vector."
    FinSi
FinAlgoritmo"""
        },
        "externalLinks": [
            {"title": "GeeksforGeeks: Linear Search", "url": "https://www.geeksforgeeks.org/linear-search/"},
            {"title": "Wikipedia: Búsqueda lineal", "url": "https://es.wikipedia.org/wiki/B%C3%BAsqueda_lineal"}
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
        "code": """// Algoritmo: Búsqueda Binaria Iterativa en Vector Ordenado
Algoritmo BusquedaBinariaVector
    Definir TAMANIO, inicio, finRango, medio, elementoBuscado, posicionHallada Como Entero
    Definir encontrado Como Logico
    
    TAMANIO <- 7
    Definir vectorOrdenado Como Entero
    Dimension vectorOrdenado[TAMANIO]
    
    // El arreglo DEBE estar estrictamente ordenado
    vectorOrdenado[1] <- 12
    vectorOrdenado[2] <- 25
    vectorOrdenado[3] <- 38
    vectorOrdenado[4] <- 47
    vectorOrdenado[5] <- 59
    vectorOrdenado[6] <- 73
    vectorOrdenado[7] <- 88
    
    elementoBuscado <- 59
    
    // Inicialización de límites de búsqueda
    inicio <- 1
    finRango <- TAMANIO
    encontrado <- Falso
    posicionHallada <- -1
    
    Escribir "=== BÚSQUEDA BINARIA DIVIDE Y VENCERÁS ==="
    Escribir "Buscando elemento:", elementoBuscado
    
    // Bucle principal mientras el rango sea válido y no se haya encontrado
    Mientras inicio <= finRango Y NO encontrado Hacer
        // Calculamos el índice medio exacto
        medio <- trunc((inicio + finRango) / 2)
        
        Si vectorOrdenado[medio] = elementoBuscado Entonces
            encontrado <- Verdadero
            posicionHallada <- medio
        Sino
            Si elementoBuscado < vectorOrdenado[medio] Entonces
                // El elemento está en la mitad izquierda
                finRango <- medio - 1
            Sino
                // El elemento está en la mitad derecha
                inicio <- medio + 1
            FinSi
        FinSi
    FinMientras
    
    Escribir ""
    Si encontrado Entonces
        Escribir "¡Localizado! El valor", elementoBuscado, "está en el índice:", posicionHallada
    Sino
        Escribir "El elemento", elementoBuscado, "no se encuentra en el arreglo."
    FinSi
FinAlgoritmo""",
        "output": """=== BÚSQUEDA BINARIA DIVIDE Y VENCERÁS ===
Buscando elemento: 59

¡Localizado! El valor 59 está en el índice: 5""",
        "evaluation": {
            "starterCode": """// Ejercicio: Implementa la búsqueda binaria para encontrar el número 15
// en el vector ordenado [5, 10, 15, 20, 25, 30].
Algoritmo EvaluacionBusquedaBinaria
    Definir vector Como Entero
    Dimension vector[6]
    vector[1] <- 5; vector[2] <- 10; vector[3] <- 15
    vector[4] <- 20; vector[5] <- 25; vector[6] <- 30
    
    Definir inicio, finRango, medio, buscado, resultado Como Entero
    buscado <- 15
    inicio <- 1
    finRango <- 6
    resultado <- -1
    
    // Completa el ciclo Mientras para la búsqueda binaria
    
    Escribir "Posición encontrada:", resultado
FinAlgoritmo""",
            "task": "Completa el bucle de búsqueda binaria para ubicar el valor 15 (ubicado en el índice 3) y almacenarlo en la variable 'resultado'.",
            "testRunner": "function(code, output) { const passed = /Posición encontrada:\\s*3/i.test(output); return { passed: passed, feedback: passed ? '¡Extraordinario! Has implementado el algoritmo de búsqueda binaria a la perfección.' : 'Verifica el cálculo de medio y la actualización de inicio y finRango.' }; }",
            "solution": """Algoritmo EvaluacionBusquedaBinaria
    Definir vector Como Entero
    Dimension vector[6]
    vector[1] <- 5; vector[2] <- 10; vector[3] <- 15
    vector[4] <- 20; vector[5] <- 25; vector[6] <- 30
    
    Definir inicio, finRango, medio, buscado, resultado Como Entero
    buscado <- 15
    inicio <- 1
    finRango <- 6
    resultado <- -1
    
    Mientras inicio <= finRango Y resultado = -1 Hacer
        medio <- trunc((inicio + finRango) / 2)
        Si vector[medio] = buscado Entonces
            resultado <- medio
        Sino
            Si buscado < vector[medio] Entonces
                finRango <- medio - 1
            Sino
                inicio <- medio + 1
            FinSi
        FinSi
    FinMientras
    
    Escribir "Posición encontrada:", resultado
FinAlgoritmo"""
        },
        "externalLinks": [
            {"title": "Khan Academy: Búsqueda binaria", "url": "https://es.khanacademy.org/computing/computer-science/algorithms/binary-search/a/binary-search"},
            {"title": "GeeksforGeeks: Binary Search", "url": "https://www.geeksforgeeks.org/binary-search/"}
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
        "code": """// Algoritmo: Ordenamiento por Método de Burbuja Ascendente
Algoritmo OrdenamientoMetodoBurbuja
    Definir TAMANIO, i, j, auxiliar Como Entero
    TAMANIO <- 5
    
    Definir vector Como Entero
    Dimension vector[TAMANIO]
    
    // Llenamos el vector con valores desordenados
    vector[1] <- 64
    vector[2] <- 34
    vector[3] <- 25
    vector[4] <- 12
    vector[5] <- 22
    
    Escribir "=== VECTOR ORIGINAL DESORDENADO ==="
    Para i <- 1 Hasta TAMANIO Con Paso 1 Hacer
        Escribir Sin Bajar vector[i], " "
    FinPara
    Escribir ""
    
    // ALGORITMO BURBUJA: Dos bucles anidados
    Para i <- 1 Hasta TAMANIO - 1 Con Paso 1 Hacer
        Para j <- 1 Hasta TAMANIO - i Con Paso 1 Hacer
            // Si el elemento actual es mayor que el siguiente, se intercambian
            Si vector[j] > vector[j + 1] Entonces
                auxiliar <- vector[j]
                vector[j] <- vector[j + 1]
                vector[j + 1] <- auxiliar
            FinSi
        FinPara
    FinPara
    
    Escribir ""
    Escribir "=== VECTOR RESULTANTE ORDENADO ASCENDENTEMENTE ==="
    Para i <- 1 Hasta TAMANIO Con Paso 1 Hacer
        Escribir Sin Bajar vector[i], " "
    FinPara
    Escribir ""
FinAlgoritmo""",
        "output": """=== VECTOR ORIGINAL DESORDENADO ===
64 34 25 12 22 

=== VECTOR RESULTANTE ORDENADO ASCENDENTEMENTE ===
12 22 25 34 64""",
        "evaluation": {
            "starterCode": """// Ejercicio: Implementa el intercambio dentro del algoritmo burbuja para ordenar
// el vector de 3 elementos [9, 3, 1] en orden ascendente.
Algoritmo EvaluacionBurbuja
    Definir v, i, j, aux Como Entero
    Dimension v[3]
    v[1] <- 9; v[2] <- 3; v[3] <- 1
    
    // Bucle exterior
    Para i <- 1 Hasta 2 Con Paso 1 Hacer
        Para j <- 1 Hasta 3 - i Con Paso 1 Hacer
            // Escribe la condición y el intercambio usando 'aux'
            Si v[j] > v[j + 1] Entonces
                // Realiza el swap aquí
            FinSi
        FinPara
    FinPara
    
    Escribir "Primer elemento ordenado:", v[1]
    Escribir "Último elemento ordenado:", v[3]
FinAlgoritmo""",
            "task": "Completa el bloque de intercambio (swap) con la variable auxiliar para ordenar el arreglo. El primer elemento debe ser 1 y el último 9.",
            "testRunner": "function(code, output) { const hasFirst = /Primer elemento ordenado:\\s*1/i.test(output); const hasLast = /Último elemento ordenado:\\s*9/i.test(output); return { passed: hasFirst && hasLast, feedback: hasFirst && hasLast ? '¡Brillante! Has implementado el intercambio clásico del método burbuja.' : 'Verifica el intercambio de variables con la variable aux.' }; }",
            "solution": """Algoritmo EvaluacionBurbuja
    Definir v, i, j, aux Como Entero
    Dimension v[3]
    v[1] <- 9; v[2] <- 3; v[3] <- 1
    
    Para i <- 1 Hasta 2 Con Paso 1 Hacer
        Para j <- 1 Hasta 3 - i Con Paso 1 Hacer
            Si v[j] > v[j + 1] Entonces
                aux <- v[j]
                v[j] <- v[j + 1]
                v[j + 1] <- aux
            FinSi
        FinPara
    FinPara
    
    Escribir "Primer elemento ordenado:", v[1]
    Escribir "Último elemento ordenado:", v[3]
FinAlgoritmo"""
        },
        "externalLinks": [
            {"title": "Wikipedia: Ordenamiento de burbuja", "url": "https://es.wikipedia.org/wiki/Ordenamiento_de_burbuja"},
            {"title": "Visualgo: Visualizador Bubble Sort", "url": "https://visualgo.net/en/sorting"}
        ]
    }
]
