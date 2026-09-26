// Algoritmo: Ordenamiento por Método de Burbuja Ascendente
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
FinAlgoritmo
