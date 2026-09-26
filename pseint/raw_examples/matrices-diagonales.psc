// Algoritmo: Generación de Matriz Identidad y Extracción de Diagonales
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
FinAlgoritmo
