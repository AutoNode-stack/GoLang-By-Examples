// Algoritmo: Declaración, Dimensión y Acceso Directo a Vectores
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
FinAlgoritmo
