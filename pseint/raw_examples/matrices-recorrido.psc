// Algoritmo: Llenado Algorítmico y Visualización Tabular de una Matriz
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
FinAlgoritmo
