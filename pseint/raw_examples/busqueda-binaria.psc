// Algoritmo: Búsqueda Binaria Iterativa en Vector Ordenado
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
FinAlgoritmo
