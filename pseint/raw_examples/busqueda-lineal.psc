// Algoritmo: Búsqueda Lineal con Detección de Posición
Algoritmo BusquedaLinealSecuencial
    Definir TAMANIO, i, elementoBuscado, posicionHallada Como Entero
    Definir encontrado Como Logico
    
    TAMANIO <- 6
    Definir arreglo Como Entero
    Dimension arreglo[TAMANIO]
    
    // Inicializamos el vector con valores de prueba desordenados
    arreglo[1] <- 45
    arreglo[2] <- 12
    arreglo[3] <- 89
    arreglo[4] <- 34
    arreglo[5] <- 70
    arreglo[6] <- 23
    
    // Elemento que deseamos localizar
    elementoBuscado <- 89
    
    // Inicializamos variables de control
    encontrado <- Falso
    posicionHallada <- -1
    
    Escribir "=== INICIANDO BÚSQUEDA LINEAL ==="
    Escribir "Buscando el número:", elementoBuscado
    
    // Recorremos secuencialmente el vector
    Para i <- 1 Hasta TAMANIO Con Paso 1 Hacer
        Si arreglo[i] = elementoBuscado Entonces
            encontrado <- Verdadero
            posicionHallada <- i
            // Podemos salir del ciclo o dejar que continúe
        FinSi
    FinPara
    
    // Evaluación del resultado de la búsqueda
    Escribir ""
    Si encontrado Entonces
        Escribir "¡Éxito! El número", elementoBuscado, "fue encontrado en la posición:", posicionHallada
    Sino
        Escribir "El número", elementoBuscado, "no existe dentro del arreglo."
    FinSi
FinAlgoritmo
