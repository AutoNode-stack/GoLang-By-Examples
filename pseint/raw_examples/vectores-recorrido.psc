// Algoritmo: Llenado Dinámico y Recorrido de Vectores
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
FinAlgoritmo
