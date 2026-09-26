// Algoritmo: Ordenamiento por Selección (Selection Sort)
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
FinAlgoritmo
