// Algoritmo: Suma y Transposición de Matrices
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
FinAlgoritmo
