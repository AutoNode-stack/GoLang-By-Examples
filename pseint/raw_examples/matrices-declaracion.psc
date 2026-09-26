// Algoritmo: Declaración, Asignación y Acceso a una Matriz 2x3
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
FinAlgoritmo
