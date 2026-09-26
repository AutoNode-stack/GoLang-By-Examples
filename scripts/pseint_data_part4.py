# -*- coding: utf-8 -*-
"""
pseint_data_part4.py
Temas 31 a 40 del curso completo de Lógica de Programación y Algoritmos en PSeInt.
"""

PSEINT_TOPICS_PART4 = [
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
        "code": """// Algoritmo: Ordenamiento por Selección (Selection Sort)
Algoritmo OrdenamientoPorSeleccion
    Definir TAMANIO, i, j, posMinimo, auxiliar Como Entero
    TAMANIO <- 5
    
    Definir arreglo Como Entero
    Dimension arreglo[TAMANIO]
    
    // Asignación de datos desordenados
    arreglo[1] <- 64
    arreglo[2] <- 25
    arreglo[3] <- 12
    arreglo[4] <- 22
    arreglo[5] <- 11
    
    Escribir "=== ARREGLO ORIGINAL DESORDENADO ==="
    Para i <- 1 Hasta TAMANIO Con Paso 1 Hacer
        Escribir Sin Bajar arreglo[i], " "
    FinPara
    Escribir ""
    
    // ALGORITMO DE SELECCIÓN
    Para i <- 1 Hasta TAMANIO - 1 Con Paso 1 Hacer
        // Asumimos inicialmente que el menor elemento está en la posición i
        posMinimo <- i
        
        // Buscamos el elemento mínimo en el resto del arreglo no ordenado
        Para j <- i + 1 Hasta TAMANIO Con Paso 1 Hacer
            Si arreglo[j] < arreglo[posMinimo] Entonces
                posMinimo <- j
            FinSi
        FinPara
        
        // Si el mínimo no es el elemento actual, realizamos el intercambio (Swap)
        Si posMinimo <> i Entonces
            auxiliar <- arreglo[i]
            arreglo[i] <- arreglo[posMinimo]
            arreglo[posMinimo] <- auxiliar
        FinSi
    FinPara
    
    Escribir ""
    Escribir "=== ARREGLO ORDENADO POR SELECCIÓN ==="
    Para i <- 1 Hasta TAMANIO Con Paso 1 Hacer
        Escribir Sin Bajar arreglo[i], " "
    FinPara
    Escribir ""
FinAlgoritmo""",
        "output": """=== ARREGLO ORIGINAL DESORDENADO ===
64 25 12 22 11 

=== ARREGLO ORDENADO POR SELECCIÓN ===
11 12 22 25 64""",
        "evaluation": {
            "starterCode": """// Ejercicio: Completa la condición para detectar si se encontró un número menor
// en la búsqueda del índice mínimo del algoritmo de selección.
Algoritmo EvaluacionSeleccion
    Definir v, i, j, posMin, aux Como Entero
    Dimension v[3]
    v[1] <- 30; v[2] <- 10; v[3] <- 20
    
    Para i <- 1 Hasta 2 Con Paso 1 Hacer
        posMin <- i
        Para j <- i + 1 Hasta 3 Con Paso 1 Hacer
            // Completa la comparación aquí:
            Si v[j] < v[posMin] Entonces
                posMin <- j
            FinSi
        FinPara
        aux <- v[i]
        v[i] <- v[posMin]
        v[posMin] <- aux
    FinPara
    
    Escribir "Primer elemento ordenado:", v[1]
FinAlgoritmo""",
            "task": "Completa el algoritmo de selección y verifica que el primer elemento ordenado sea 10.",
            "testRunner": "function(code, output) { const passed = /Primer elemento ordenado:\\s*10/i.test(output); return { passed: passed, feedback: passed ? '¡Excelente! Has dominado el rastreo del índice mínimo en Selection Sort.' : 'Verifica que la condición compare v[j] < v[posMin].' }; }",
            "solution": """Algoritmo EvaluacionSeleccion
    Definir v, i, j, posMin, aux Como Entero
    Dimension v[3]
    v[1] <- 30; v[2] <- 10; v[3] <- 20
    
    Para i <- 1 Hasta 2 Con Paso 1 Hacer
        posMin <- i
        Para j <- i + 1 Hasta 3 Con Paso 1 Hacer
            Si v[j] < v[posMin] Entonces
                posMin <- j
            FinSi
        FinPara
        aux <- v[i]
        v[i] <- v[posMin]
        v[posMin] <- aux
    FinPara
    
    Escribir "Primer elemento ordenado:", v[1]
FinAlgoritmo"""
        },
        "externalLinks": [
            {"title": "Wikipedia: Ordenamiento por selección", "url": "https://es.wikipedia.org/wiki/Ordenamiento_por_selecci%C3%B3n"},
            {"title": "GeeksforGeeks: Selection Sort Algorithm", "url": "https://www.geeksforgeeks.org/selection-sort/"}
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
        "code": """// Algoritmo: Cálculo de Máximo, Mínimo y Promedio de un Vector
Algoritmo EstadisticasVectoriales
    Definir TAMANIO, i Como Entero
    Definir maximo, minimo, sumaTotal, promedio Como Real
    
    TAMANIO <- 5
    Definir calificaciones Como Real
    Dimension calificaciones[TAMANIO]
    
    // Asignación de datos de prueba
    calificaciones[1] <- 14.5
    calificaciones[2] <- 18.0
    calificaciones[3] <- 09.5
    calificaciones[4] <- 20.0
    calificaciones[5] <- 13.0
    
    // PATRÓN ROBUSTO: Inicializar con el primer elemento
    maximo <- calificaciones[1]
    minimo <- calificaciones[1]
    sumaTotal <- calificaciones[1]
    
    // Recorremos desde el segundo elemento en adelante
    Para i <- 2 Hasta TAMANIO Con Paso 1 Hacer
        // Actualización de máximo
        Si calificaciones[i] > maximo Entonces
            maximo <- calificaciones[i]
        FinSi
        
        // Actualización de mínimo
        Si calificaciones[i] < minimo Entonces
            minimo <- calificaciones[i]
        FinSi
        
        // Acumulación para el promedio
        sumaTotal <- sumaTotal + calificaciones[i]
    FinPara
    
    promedio <- sumaTotal / TAMANIO
    
    Escribir "=== RESULTADOS ESTADÍSTICOS DE CALIFICACIONES ==="
    Escribir "Nota Máxima registrada:", maximo
    Escribir "Nota Mínima registrada:", minimo
    Escribir "Suma total acumulada:", sumaTotal
    Escribir "Promedio aritmético:", promedio
FinAlgoritmo""",
        "output": """=== RESULTADOS ESTADÍSTICOS DE CALIFICACIONES ===
Nota Máxima registrada: 20
Nota Mínima registrada: 9.5
Suma total acumulada: 75
Promedio aritmético: 15""",
        "evaluation": {
            "starterCode": """// Ejercicio: En un vector de 3 temperaturas [15, 32, 28], calcula y muestra
// la temperatura máxima y la temperatura mínima.
Algoritmo EvaluacionEstadisticas
    Definir temps Como Real
    Dimension temps[3]
    temps[1] <- 15; temps[2] <- 32; temps[3] <- 28
    
    Definir tMax, tMin Como Real
    // Inicializa tMax y tMin con el primer elemento y completa el ciclo
    
    Escribir "Temperatura máxima:", tMax
    Escribir "Temperatura mínima:", tMin
FinAlgoritmo""",
            "task": "Completa el algoritmo para que determine que la temperatura máxima es 32 y la mínima es 15.",
            "testRunner": "function(code, output) { const hasMax = /Temperatura máxima:\\s*32/i.test(output); const hasMin = /Temperatura mínima:\\s*15/i.test(output); return { passed: hasMax && hasMin, feedback: hasMax && hasMin ? '¡Excelente trabajo! Has implementado el patrón universal de extremos estadísticos.' : 'Verifica que tMax sea 32 y tMin sea 15.' }; }",
            "solution": """Algoritmo EvaluacionEstadisticas
    Definir temps Como Real
    Dimension temps[3]
    temps[1] <- 15; temps[2] <- 32; temps[3] <- 28
    
    Definir tMax, tMin Como Real
    Definir i Como Entero
    tMax <- temps[1]
    tMin <- temps[1]
    
    Para i <- 2 Hasta 3 Con Paso 1 Hacer
        Si temps[i] > tMax Entonces
            tMax <- temps[i]
        FinSi
        Si temps[i] < tMin Entonces
            tMin <- temps[i]
        FinSi
    FinPara
    
    Escribir "Temperatura máxima:", tMax
    Escribir "Temperatura mínima:", tMin
FinAlgoritmo"""
        },
        "externalLinks": [
            {"title": "GeeksforGeeks: Maximum and minimum in an array", "url": "https://www.geeksforgeeks.org/maximum-and-minimum-in-an-array/"},
            {"title": "OpenWebinars: Algoritmos con arreglos", "url": "https://openwebinars.net/"}
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
        "code": """// Algoritmo: Declaración, Asignación y Acceso a una Matriz 2x3
Algoritmo DeclaracionAsignacionMatrices
    // 1. Declaramos el tipo de dato de la matriz
    Definir tablero Como Entero
    
    // 2. Dimensionamos la matriz con 2 Filas y 3 Columnas
    Dimension tablero[2, 3]
    
    // 3. Asignación directa a las celdas de la Fila 1
    tablero[1, 1] <- 10
    tablero[1, 2] <- 20
    tablero[1, 3] <- 30
    
    // 4. Asignación directa a las celdas de la Fila 2
    tablero[2, 1] <- 40
    tablero[2, 2] <- 50
    tablero[2, 3] <- 60
    
    // 5. Lectura y visualización de celdas específicas
    Escribir "=== ACCESO INDIVIDUAL A CELDAS DE LA MATRIZ ==="
    Escribir "Celda Fila 1, Columna 1:", tablero[1, 1]
    Escribir "Celda Fila 1, Columna 3:", tablero[1, 3]
    Escribir "Celda Fila 2, Columna 2 (Centro):", tablero[2, 2]
    Escribir "Celda Fila 2, Columna 3 (Final):", tablero[2, 3]
FinAlgoritmo""",
        "output": """=== ACCESO INDIVIDUAL A CELDAS DE LA MATRIZ ===
Celda Fila 1, Columna 1: 10
Celda Fila 1, Columna 3: 30
Celda Fila 2, Columna 2 (Centro): 50
Celda Fila 2, Columna 3 (Final): 60""",
        "evaluation": {
            "starterCode": """// Ejercicio: Declara una matriz llamada 'grilla' de 2 filas y 2 columnas de tipo Entero.
// Asigna el número 99 en la celda [2, 1] (segunda fila, primera columna).
Algoritmo EvaluacionMatrices
    Definir grilla Como Entero
    // Dimensiona la matriz de 2x2 y asigna el valor indicado
    
    Escribir "Valor en celda [2,1]:", grilla[2, 1]
FinAlgoritmo""",
            "task": "Dimensiona 'grilla' de 2x2 con 'Dimension grilla[2, 2]' y asigna 'grilla[2, 1] <- 99'.",
            "testRunner": "function(code, output) { const hasDim = /Dimension\\s+grilla\\s*\\[\\s*2\\s*,\\s*2\\s*\\]/i.test(code); const hasVal = /Valor en celda \\[2,1\\]:\\s*99/i.test(output); return { passed: hasDim && hasVal, feedback: hasDim && hasVal ? '¡Excelente! Has declarado y asignado correctamente una matriz 2D.' : 'Asegúrate de dimensionar grilla[2, 2] y asignar 99 a [2, 1].' }; }",
            "solution": """Algoritmo EvaluacionMatrices
    Definir grilla Como Entero
    Dimension grilla[2, 2]
    grilla[2, 1] <- 99
    
    Escribir "Valor en celda [2,1]:", grilla[2, 1]
FinAlgoritmo"""
        },
        "externalLinks": [
            {"title": "Documentación PSeInt: Arreglos Multidimensionales", "url": "http://pseint.sourceforge.net/"},
            {"title": "GeeksforGeeks: Multidimensional Arrays in C/C++", "url": "https://www.geeksforgeeks.org/multidimensional-arrays-c-cpp/"}
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
        "code": """// Algoritmo: Llenado Algorítmico y Visualización Tabular de una Matriz
Algoritmo RecorridoMatricialTabular
    Definir FILAS, COLUMNAS, f, c, contador Como Entero
    FILAS <- 3
    COLUMNAS <- 3
    
    Definir matriz Como Entero
    Dimension matriz[FILAS, COLUMNAS]
    
    // 1. LLENADO SECUENCIAL: Asignamos valores correlativos del 1 al 9
    contador <- 1
    Para f <- 1 Hasta FILAS Con Paso 1 Hacer
        Para c <- 1 Hasta COLUMNAS Con Paso 1 Hacer
            matriz[f, c] <- contador
            contador <- contador + 1
        FinPara
    FinPara
    
    Escribir "=== MATRIZ 3x3 EN FORMATO TABULAR ==="
    // 2. RECORRIDO DE IMPRESIÓN CON FORMATO VISUAL
    Para f <- 1 Hasta FILAS Con Paso 1 Hacer
        Para c <- 1 Hasta COLUMNAS Con Paso 1 Hacer
            // Imprimimos la celda sin bajar de renglón
            Escribir Sin Bajar "[ ", matriz[f, c], " ] "
        FinPara
        // Salto de línea al terminar de imprimir todas las columnas de la fila actual
        Escribir ""
    FinPara
FinAlgoritmo""",
        "output": """=== MATRIZ 3x3 EN FORMATO TABULAR ===
[ 1 ] [ 2 ] [ 3 ] 
[ 4 ] [ 5 ] [ 6 ] 
[ 7 ] [ 8 ] [ 9 ]""",
        "evaluation": {
            "starterCode": """// Ejercicio: Calcula la suma de todos los elementos de una matriz de 2 filas y 2 columnas
// que contiene: [1, 2] en fila 1 y [3, 4] en fila 2.
Algoritmo EvaluacionSumaMatriz
    Definir m, f, c, suma Como Entero
    Dimension m[2, 2]
    m[1, 1] <- 1; m[1, 2] <- 2
    m[2, 1] <- 3; m[2, 2] <- 4
    
    suma <- 0
    // Recorre con dos bucles anidados para sumar cada celda m[f, c]
    
    Escribir "Suma total de la matriz:", suma
FinAlgoritmo""",
            "task": "Escribe los bucles anidados para acumular la suma de todos los elementos de la matriz 2x2 (el total debe ser 10).",
            "testRunner": "function(code, output) { const passed = /Suma total de la matriz:\\s*10/i.test(output); return { passed: passed, feedback: passed ? '¡Perfecto! Has dominado el recorrido y acumulación con matrices bidimensionales.' : 'La suma de 1+2+3+4 debe ser 10. Revisa los bucles anidados.' }; }",
            "solution": """Algoritmo EvaluacionSumaMatriz
    Definir m, f, c, suma Como Entero
    Dimension m[2, 2]
    m[1, 1] <- 1; m[1, 2] <- 2
    m[2, 1] <- 3; m[2, 2] <- 4
    
    suma <- 0
    Para f <- 1 Hasta 2 Con Paso 1 Hacer
        Para c <- 1 Hasta 2 Con Paso 1 Hacer
            suma <- suma + m[f, c]
        FinPara
    FinPara
    
    Escribir "Suma total de la matriz:", suma
FinAlgoritmo"""
        },
        "externalLinks": [
            {"title": "OpenWebinars: Recorrer matrices bidimensionales", "url": "https://openwebinars.net/"},
            {"title": "Wikipedia: Matriz (matemática)", "url": "https://es.wikipedia.org/wiki/Matriz_(matem%C3%A1tica)"}
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
        "code": """// Algoritmo: Generación de Matriz Identidad y Extracción de Diagonales
Algoritmo MatrizIdentidadYDiagonales
    Definir N, f, c Como Entero
    N <- 4 // Tamaño de la matriz cuadrada NxN
    
    Definir identidad Como Entero
    Dimension identidad[N, N]
    
    // 1. GENERACIÓN DE LA MATRIZ IDENTIDAD
    Para f <- 1 Hasta N Con Paso 1 Hacer
        Para c <- 1 Hasta N Con Paso 1 Hacer
            Si f = c Entonces
                identidad[f, c] <- 1 // Diagonal principal
            Sino
                identidad[f, c] <- 0 // Elementos fuera de la diagonal
            FinSi
        FinPara
    FinPara
    
    Escribir "=== MATRIZ IDENTIDAD GENERADA (4x4) ==="
    Para f <- 1 Hasta N Con Paso 1 Hacer
        Para c <- 1 Hasta N Con Paso 1 Hacer
            Escribir Sin Bajar identidad[f, c], " "
        FinPara
        Escribir ""
    FinPara
    
    Escribir ""
    Escribir "=== COORDENADAS DE LA DIAGONAL SECUNDARIA ==="
    Para f <- 1 Hasta N Con Paso 1 Hacer
        c <- N - f + 1
        Escribir "Elemento en fila", f, "columna", c, "-> Valor:", identidad[f, c]
    FinPara
FinAlgoritmo""",
        "output": """=== MATRIZ IDENTIDAD GENERADA (4x4) ===
1 0 0 0 
0 1 0 0 
0 0 1 0 
0 0 0 1 

=== COORDENADAS DE LA DIAGONAL SECUNDARIA ===
Elemento en fila 1 columna 4 -> Valor: 0
Elemento en fila 2 columna 3 -> Valor: 0
Elemento en fila 3 columna 2 -> Valor: 0
Elemento en fila 4 columna 1 -> Valor: 0""",
        "evaluation": {
            "starterCode": """// Ejercicio: En una matriz de 3x3 ya inicializada con valores, calcula la suma
// de los elementos que pertenecen ÚNICAMENTE a la Diagonal Principal (donde f = c).
Algoritmo EvaluacionDiagonalPrincipal
    Definir m, f, c, sumaDiag Como Entero
    Dimension m[3, 3]
    m[1,1]<-5; m[1,2]<-2; m[1,3]<-1
    m[2,1]<-8; m[2,2]<-7; m[2,3]<-3
    m[3,1]<-4; m[3,2]<-6; m[3,3]<-9
    
    sumaDiag <- 0
    // Suma los elementos de la diagonal principal (5 + 7 + 9)
    
    Escribir "Suma diagonal principal:", sumaDiag
FinAlgoritmo""",
            "task": "Calcula la suma de la diagonal principal (5 + 7 + 9 = 21) e imprímela con 'Suma diagonal principal: 21'.",
            "testRunner": "function(code, output) { const passed = /Suma diagonal principal:\\s*21/i.test(output); return { passed: passed, feedback: passed ? '¡Excelente! Has dominado la indexación de diagonales en matrices cuadradas.' : 'La suma de 5 + 7 + 9 debe dar 21.' }; }",
            "solution": """Algoritmo EvaluacionDiagonalPrincipal
    Definir m, f, c, sumaDiag Como Entero
    Dimension m[3, 3]
    m[1,1]<-5; m[1,2]<-2; m[1,3]<-1
    m[2,1]<-8; m[2,2]<-7; m[2,3]<-3
    m[3,1]<-4; m[3,2]<-6; m[3,3]<-9
    
    sumaDiag <- 0
    Para f <- 1 Hasta 3 Con Paso 1 Hacer
        sumaDiag <- sumaDiag + m[f, f]
    FinPara
    
    Escribir "Suma diagonal principal:", sumaDiag
FinAlgoritmo"""
        },
        "externalLinks": [
            {"title": "Wikipedia: Matriz identidad", "url": "https://es.wikipedia.org/wiki/Matriz_identidad"},
            {"title": "Khan Academy: Matrices y transformaciones lineales", "url": "https://es.khanacademy.org/"}
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
        "code": """// Algoritmo: Suma y Transposición de Matrices
Algoritmo OperacionesMatriciales
    Definir f, c Como Entero
    
    // Declaramos dos matrices originales de 2 Filas y 3 Columnas
    Definir A, B, C Como Entero
    Dimension A[2, 3]
    Dimension B[2, 3]
    Dimension C[2, 3]
    
    // Declaramos la matriz transpuesta de A (tendrá 3 Filas y 2 Columnas)
    Definir T Como Entero
    Dimension T[3, 2]
    
    // Inicializamos matriz A
    A[1, 1] <- 1; A[1, 2] <- 2; A[1, 3] <- 3
    A[2, 1] <- 4; A[2, 2] <- 5; A[2, 3] <- 6
    
    // Inicializamos matriz B
    B[1, 1] <- 10; B[1, 2] <- 20; B[1, 3] <- 30
    B[2, 1] <- 40; B[2, 2] <- 50; B[2, 3] <- 60
    
    // 1. SUMA DE MATRICES: C = A + B
    Para f <- 1 Hasta 2 Con Paso 1 Hacer
        Para c <- 1 Hasta 3 Con Paso 1 Hacer
            C[f, c] <- A[f, c] + B[f, c]
        FinPara
    FinPara
    
    // 2. TRANSPOSICIÓN DE MATRIZ A: T[c, f] <- A[f, c]
    Para f <- 1 Hasta 2 Con Paso 1 Hacer
        Para c <- 1 Hasta 3 Con Paso 1 Hacer
            T[c, f] <- A[f, c]
        FinPara
    FinPara
    
    Escribir "=== MATRIZ SUMA C (A + B) [2x3] ==="
    Para f <- 1 Hasta 2 Con Paso 1 Hacer
        Para c <- 1 Hasta 3 Con Paso 1 Hacer
            Escribir Sin Bajar C[f, c], " "
        FinPara
        Escribir ""
    FinPara
    
    Escribir ""
    Escribir "=== MATRIZ TRANSPUESTA DE A [3x2] ==="
    Para f <- 1 Hasta 3 Con Paso 1 Hacer
        Para c <- 1 Hasta 2 Con Paso 1 Hacer
            Escribir Sin Bajar T[f, c], " "
        FinPara
        Escribir ""
    FinPara
FinAlgoritmo""",
        "output": """=== MATRIZ SUMA C (A + B) [2x3] ===
11 22 33 
44 55 66 

=== MATRIZ TRANSPUESTA DE A [3x2] ===
1 4 
2 5 
3 6""",
        "evaluation": {
            "starterCode": """// Ejercicio: Realiza la transpuesta de una matriz de 2x2.
// Asigna en T[c, f] <- original[f, c] y muestra la celda T[1, 2].
Algoritmo EvaluacionTranspuesta
    Definir orig, trans, f, c Como Entero
    Dimension orig[2, 2]
    Dimension trans[2, 2]
    
    orig[1, 1] <- 10; orig[1, 2] <- 20
    orig[2, 1] <- 30; orig[2, 2] <- 40
    
    // Completa los dos bucles para trasponer orig en trans
    
    Escribir "Valor en T[1,2]:", trans[1, 2]
FinAlgoritmo""",
            "task": "Completa el algoritmo de transposición. Como orig[2, 1] vale 30, al trasponerse trans[1, 2] debe valer 30.",
            "testRunner": "function(code, output) { const passed = /Valor en T\\[1,2\\]:\\s*30/i.test(output); return { passed: passed, feedback: passed ? '¡Magnífico! Has dominado la transposición matricial.' : 'Verifica que trans[c, f] <- orig[f, c].' }; }",
            "solution": """Algoritmo EvaluacionTranspuesta
    Definir orig, trans, f, c Como Entero
    Dimension orig[2, 2]
    Dimension trans[2, 2]
    
    orig[1, 1] <- 10; orig[1, 2] <- 20
    orig[2, 1] <- 30; orig[2, 2] <- 40
    
    Para f <- 1 Hasta 2 Con Paso 1 Hacer
        Para c <- 1 Hasta 2 Con Paso 1 Hacer
            trans[c, f] <- orig[f, c]
        FinPara
    FinPara
    
    Escribir "Valor en T[1,2]:", trans[1, 2]
FinAlgoritmo"""
        },
        "externalLinks": [
            {"title": "Wikipedia: Matriz transpuesta", "url": "https://es.wikipedia.org/wiki/Matriz_transpuesta"},
            {"title": "Khan Academy: Operaciones con matrices", "url": "https://es.khanacademy.org/"}
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
        "code": """// Algoritmo: Exploración de Funciones de Texto y Recorrido de Cadenas
Algoritmo ManejoCadenasTexto
    Definir mensaje Como Caracter
    Definir totalCaracteres, i Como Entero
    
    mensaje <- "PSeInt Lógica"
    
    // 1. Obtener la longitud de la cadena
    totalCaracteres <- Longitud(mensaje)
    Escribir "=== ANÁLISIS DE LA CADENA ==="
    Escribir "Texto analizado:", mensaje
    Escribir "Total de caracteres (con espacios):", totalCaracteres
    
    // 2. Extracción de subcadenas específicas
    Escribir ""
    Escribir "=== EXTRACCIÓN DE SUBCADENAS ==="
    Escribir "Subcadena(1 a 6):", Subcadena(mensaje, 1, 6)
    Escribir "Subcadena(8 a 13):", Subcadena(mensaje, 8, 13)
    
    // 3. Conversión a mayúsculas y minúsculas
    Escribir ""
    Escribir "=== TRANSFORMACIÓN DE CASO ==="
    Escribir "En mayúsculas:", Mayusculas(mensaje)
    Escribir "En minúsculas:", Minusculas(mensaje)
    
    // 4. Recorrido letra por letra con bucle Para
    Escribir ""
    Escribir "=== RECORRIDO CARACTER A CARACTER ==="
    Para i <- 1 Hasta totalCaracteres Con Paso 1 Hacer
        Escribir "Carácter en posición [", i, "] -> ", Subcadena(mensaje, i, i)
    FinPara
FinAlgoritmo""",
        "output": """=== ANÁLISIS DE LA CADENA ===
Texto analizado: PSeInt Lógica
Total de caracteres (con espacios): 13

=== EXTRACCIÓN DE SUBCADENAS ===
Subcadena(1 a 6): PSeInt
Subcadena(8 a 13): Lógica

=== TRANSFORMACIÓN DE CASO ===
En mayúsculas: PSEINT LÓGICA
En minúsculas: pseint lógica

=== RECORRIDO CARACTER A CARACTER ===
Carácter en posición [ 1 ] -> P
Carácter en posición [ 2 ] -> S
Carácter en posición [ 3 ] -> e
Carácter en posición [ 4 ] -> I
Carácter en posición [ 5 ] -> n
Carácter en posición [ 6 ] -> t
Carácter en posición [ 7 ] ->  
Carácter en posición [ 8 ] -> L
Carácter en posición [ 9 ] -> ó
Carácter en posición [ 10 ] -> g
Carácter en posición [ 11 ] -> i
Carácter en posición [ 12 ] -> c
Carácter en posición [ 13 ] -> a""",
        "evaluation": {
            "starterCode": """// Ejercicio: Cuenta cuántas veces aparece la letra 'a' (minúscula o mayúscula)
// en la frase 'Aprender a programar'.
Algoritmo EvaluacionConteoLetra
    Definir frase Como Caracter
    Definir i, contadorA Como Entero
    frase <- "Aprender a programar"
    
    contadorA <- 0
    // Recorre la cadena caracter a caracter usando Longitud y Subcadena
    // Compara convirtiendo cada letra a Mayusculas para contar 'A'
    
    Escribir "Total de letras A encontradas:", contadorA
FinAlgoritmo""",
            "task": "Completa el bucle para contar las letras 'a'/'A' en la frase 'Aprender a programar' (debe dar 4 en total).",
            "testRunner": "function(code, output) { const passed = /Total de letras A encontradas:\\s*4/i.test(output); return { passed: passed, feedback: passed ? '¡Excelente trabajo! Has integrado el recorrido de caracteres con filtrado condicional.' : 'En la frase hay exactamente 4 letras A. Revisa la condición de conteo.' }; }",
            "solution": """Algoritmo EvaluacionConteoLetra
    Definir frase Como Caracter
    Definir i, contadorA Como Entero
    frase <- "Aprender a programar"
    
    contadorA <- 0
    Para i <- 1 Hasta Longitud(frase) Con Paso 1 Hacer
        Si Mayusculas(Subcadena(frase, i, i)) = "A" Entonces
            contadorA <- contadorA + 1
        FinSi
    FinPara
    
    Escribir "Total de letras A encontradas:", contadorA
FinAlgoritmo"""
        },
        "externalLinks": [
            {"title": "Documentación PSeInt: Funciones de Cadenas", "url": "http://pseint.sourceforge.net/"},
            {"title": "GeeksforGeeks: String Data Structure", "url": "https://www.geeksforgeeks.org/string-data-structure/"}
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
        "code": """// Algoritmo: Conversiones de Tipos y Análisis de Dígitos
Algoritmo ConversionesDeTipo
    Definir precioTexto, edadTexto Como Caracter
    Definir precioNumero, total, numeroTelefono Como Real
    Definir cantidadDigitos Como Entero
    
    // 1. CONVERTIR TEXTO A NÚMERO
    precioTexto <- "1250.50"
    Escribir "=== CONVERSIÓN DE TEXTO A NÚMERO ==="
    Escribir "Cadena original:", precioTexto
    
    // Convertimos la cadena a valor Real
    precioNumero <- ConvertirANumero(precioTexto)
    
    // Ahora podemos realizar cálculos matemáticos
    total <- precioNumero + 250.00
    Escribir "Precio numérico sumado con 250:", total
    
    // 2. CONVERTIR NÚMERO A TEXTO
    Escribir ""
    Escribir "=== CONVERSIÓN DE NÚMERO A TEXTO ==="
    numeroTelefono <- 987654321
    Escribir "Número cuantitativo original:", numeroTelefono
    
    // Convertimos a texto para poder usar funciones de cadena
    edadTexto <- ConvertirATexto(numeroTelefono)
    cantidadDigitos <- Longitud(edadTexto)
    
    Escribir "Texto convertido:", edadTexto
    Escribir "Cantidad de dígitos que componen el número:", cantidadDigitos
    Escribir "Primeros 3 dígitos (código de área):", Subcadena(edadTexto, 1, 3)
FinAlgoritmo""",
        "output": """=== CONVERSIÓN DE TEXTO A NÚMERO ===
Cadena original: 1250.50
Precio numérico sumado con 250: 1500.5

=== CONVERSIÓN DE NÚMERO A TEXTO ===
Número cuantitativo original: 987654321
Texto convertido: 987654321
Cantidad de dígitos que componen el número: 9
Primeros 3 dígitos (código de área): 987""",
        "evaluation": {
            "starterCode": """// Ejercicio: Recibe una cadena '75' y una cadena '25'. Conviértelas a números,
// súmalas, convierte el resultado de la suma a texto e imprímelo en pantalla.
Algoritmo EvaluacionConversiones
    Definir txtA, txtB, txtResultado Como Caracter
    Definir numA, numB, suma Como Entero
    txtA <- "75"
    txtB <- "25"
    
    // Realiza las conversiones y la suma
    
    Escribir "Resultado como texto:", txtResultado
FinAlgoritmo""",
            "task": "Convierte txtA y txtB a números, súmalos (75 + 25 = 100), convierte la suma a texto en txtResultado y muestra 'Resultado como texto: 100'.",
            "testRunner": "function(code, output) { const passed = /Resultado como texto:\\s*100/i.test(output); return { passed: passed, feedback: passed ? '¡Perfecto! Has dominado la bidireccionalidad de conversiones entre texto y números.' : 'La suma convertida a texto debe ser exactamente 100.' }; }",
            "solution": """Algoritmo EvaluacionConversiones
    Definir txtA, txtB, txtResultado Como Caracter
    Definir numA, numB, suma Como Entero
    txtA <- "75"
    txtB <- "25"
    
    numA <- ConvertirANumero(txtA)
    numB <- ConvertirANumero(txtB)
    suma <- numA + numB
    txtResultado <- ConvertirATexto(suma)
    
    Escribir "Resultado como texto:", txtResultado
FinAlgoritmo"""
        },
        "externalLinks": [
            {"title": "Documentación PSeInt: Funciones Integradas", "url": "http://pseint.sourceforge.net/"},
            {"title": "Wikipedia: Conversión de tipos", "url": "https://es.wikipedia.org/wiki/Conversi%C3%B3n_de_tipos"}
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
        "code": """// Algoritmo: Verificación de Palíndromos mediante Inversión de Texto
Algoritmo VerificacionPalindromo
    Definir palabraOriginal, palabraInvertida, palabraLimpia Como Caracter
    Definir n, i Como Entero
    
    palabraOriginal <- "Reconocer"
    
    // Normalizamos a mayúsculas para evitar discrepancias de mayúsculas/minúsculas
    palabraLimpia <- Mayusculas(palabraOriginal)
    n <- Longitud(palabraLimpia)
    palabraInvertida <- ""
    
    Escribir "=== COMPROBACIÓN DE PALÍNDROMO ==="
    Escribir "Palabra a analizar:", palabraOriginal
    
    // Construimos la cadena invertida recorriendo hacia atrás con Paso -1
    Para i <- n Hasta 1 Con Paso -1 Hacer
        palabraInvertida <- palabraInvertida + Subcadena(palabraLimpia, i, i)
    FinPara
    
    Escribir "Palabra invertida:", palabraInvertida
    Escribir ""
    
    // Comparamos la cadena limpia normalizada con la cadena invertida
    Si palabraLimpia = palabraInvertida Entonces
        Escribir "¡Confirmado! La palabra '", palabraOriginal, "' es un PALÍNDROMO válido."
    Sino
        Escribir "La palabra '", palabraOriginal, "' NO es un palíndromo."
    FinSi
FinAlgoritmo""",
        "output": """=== COMPROBACIÓN DE PALÍNDROMO ===
Palabra a analizar: Reconocer
Palabra invertida: RECONOCER

¡Confirmado! La palabra 'Reconocer' es un PALÍNDROMO válido.""",
        "evaluation": {
            "starterCode": """// Ejercicio: Invierte la palabra 'HOLA' y verifica si es palíndromo.
// Si no es palíndromo, debe imprimir: 'NO es palindromo'
Algoritmo EvaluacionPalindromo
    Definir texto, invertido Como Caracter
    Definir i Como Entero
    texto <- "HOLA"
    invertido <- ""
    
    // Construye la cadena invertida
    
    Si texto = invertido Entonces
        Escribir "Es palindromo"
    Sino
        Escribir "NO es palindromo"
    FinSi
FinAlgoritmo""",
            "task": "Completa el bucle de inversión para 'HOLA' y confirma que imprima 'NO es palindromo'.",
            "testRunner": "function(code, output) { const passed = /NO es palindromo/i.test(output); return { passed: passed, feedback: passed ? '¡Correcto! Has verificado la detección de palabras no palíndromas.' : 'Verifica el bucle decreciente para invertir la palabra.' }; }",
            "solution": """Algoritmo EvaluacionPalindromo
    Definir texto, invertido Como Caracter
    Definir i Como Entero
    texto <- "HOLA"
    invertido <- ""
    
    Para i <- Longitud(texto) Hasta 1 Con Paso -1 Hacer
        invertido <- invertido + Subcadena(texto, i, i)
    FinPara
    
    Si texto = invertido Entonces
        Escribir "Es palindromo"
    Sino
        Escribir "NO es palindromo"
    FinSi
FinAlgoritmo"""
        },
        "externalLinks": [
            {"title": "LeetCode: Valid Palindrome", "url": "https://leetcode.com/problems/valid-palindrome/"},
            {"title": "Wikipedia: Palíndromo", "url": "https://es.wikipedia.org/wiki/Pal%C3%ADndromo"}
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
        "code": """// Algoritmo: Desglose Óptimo de Billetes en Cajero Automático (Voraz)
Algoritmo CajeroAutomaticoVoraz
    Definir TOTAL_DENOMINACIONES, i Como Entero
    Definir montoSolicitado, montoRestante, cantidadBilletes, totalBilletes Como Entero
    
    TOTAL_DENOMINACIONES <- 6
    Definir denominaciones Como Entero
    Dimension denominaciones[TOTAL_DENOMINACIONES]
    
    // Denominaciones canónicas ordenadas estrictamente de mayor a menor
    denominaciones[1] <- 100
    denominaciones[2] <- 50
    denominaciones[3] <- 20
    denominaciones[4] <- 10
    denominaciones[5] <- 5
    denominaciones[6] <- 1
    
    montoSolicitado <- 387
    montoRestante <- montoSolicitado
    totalBilletes <- 0
    
    Escribir "=== DISPENSADOR DE CAJERO AUTOMÁTICO ==="
    Escribir "Monto total a retirar: $", montoSolicitado
    Escribir "Calculando desglose óptimo con el mínimo número de billetes..."
    Escribir ""
    
    // Recorremos vorazmente cada denominación
    Para i <- 1 Hasta TOTAL_DENOMINACIONES Con Paso 1 Hacer
        // Calculamos cuántos billetes de esta denominación caben
        cantidadBilletes <- trunc(montoRestante / denominaciones[i])
        
        // Si se entrega al menos un billete de esta denominación
        Si cantidadBilletes > 0 Entonces
            Escribir "-> Billetes de $", denominaciones[i], ": ", cantidadBilletes
            totalBilletes <- totalBilletes + cantidadBilletes
            // Actualizamos el saldo pendiente usando el operador módulo %
            montoRestante <- montoRestante % denominaciones[i]
        FinSi
    FinPara
    
    Escribir ""
    Escribir "=== RESUMEN DE LA DISPENSACIÓN ==="
    Escribir "Total de billetes físicos entregados:", totalBilletes
    Escribir "Saldo remanente sin dispensar: $", montoRestante
FinAlgoritmo""",
        "output": """=== DISPENSADOR DE CAJERO AUTOMÁTICO ===
Monto total a retirar: $ 387
Calculando desglose óptimo con el mínimo número de billetes...

-> Billetes de $ 100 : 3
-> Billetes de $ 50 : 1
-> Billetes de $ 20 : 1
-> Billetes de $ 10 : 1
-> Billetes de $ 5 : 1
-> Billetes de $ 1 : 2

=== RESUMEN DE LA DISPENSACIÓN ===
Total de billetes físicos entregados: 9
Saldo remanente sin dispensar: $ 0""",
        "evaluation": {
            "starterCode": """// Ejercicio: Desglosa un monto de 75 dólares usando únicamente denominaciones
// de 50, 20 y 5 dólares. Calcula cuántos billetes de 50 se entregan.
Algoritmo EvaluacionCajero
    Definir monto, billetes50 Como Entero
    monto <- 75
    
    // Calcula cuántos billetes de 50 caben y actualiza monto con el residuo
    billetes50 <- trunc(monto / 50)
    monto <- monto % 50
    
    Escribir "Billetes de 50 entregados:", billetes50
    Escribir "Monto restante:", monto
FinAlgoritmo""",
            "task": "Ejecuta el cálculo para 75 dólares y confirma que se entrega 1 billete de 50 y restan 25.",
            "testRunner": "function(code, output) { const hasB50 = /Billetes de 50 entregados:\\s*1/i.test(output); const hasRem = /Monto restante:\\s*25/i.test(output); return { passed: hasB50 && hasRem, feedback: hasB50 && hasRem ? '¡Sobresaliente! Has completado el curso completo de lógica algorítmica con honores.' : 'Verifica el cálculo de trunc(75/50) y el residuo 75 % 50.' }; }",
            "solution": """Algoritmo EvaluacionCajero
    Definir monto, billetes50 Como Entero
    monto <- 75
    
    billetes50 <- trunc(monto / 50)
    monto <- monto % 50
    
    Escribir "Billetes de 50 entregados:", billetes50
    Escribir "Monto restante:", monto
FinAlgoritmo"""
        },
        "externalLinks": [
            {"title": "GeeksforGeeks: Greedy Algorithm to find minimum number of Coins", "url": "https://www.geeksforgeeks.org/greedy-algorithm-to-find-minimum-number-of-coins/"},
            {"title": "Wikipedia: Algoritmo voraz", "url": "https://es.wikipedia.org/wiki/Algoritmo_voraz"}
        ]
    }
]
