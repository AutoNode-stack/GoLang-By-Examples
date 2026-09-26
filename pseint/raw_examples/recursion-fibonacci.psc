// Algoritmo: Cálculo del N-ésimo término de Fibonacci con Recursión
Funcion valorTermino <- CalcularFibonacci(posicion)
    Definir valorTermino Como Entero
    
    // CASOS BASE: Las dos primeras posiciones de la serie
    Si posicion = 0 Entonces
        valorTermino <- 0
    Sino
        Si posicion = 1 Entonces
            valorTermino <- 1
        Sino
            // CASO RECURSIVO DOBLE: Suma de los dos términos previos
            valorTermino <- CalcularFibonacci(posicion - 1) + CalcularFibonacci(posicion - 2)
        FinSi
    FinSi
FinFuncion

Algoritmo DemostracionRecursionFibonacci
    Definir indice, termino Como Entero
    
    Escribir "=== SUCESIÓN DE FIBONACCI RECURSIVA ==="
    Escribir "Generando los primeros 8 términos de la serie:"
    
    // Mostramos la serie desde la posición 0 hasta la 7
    Para indice <- 0 Hasta 7 Con Paso 1 Hacer
        termino <- CalcularFibonacci(indice)
        Escribir "Posición [", indice, "] -> ", termino
    FinPara
    
    Escribir ""
    Escribir "Secuencia resultante: 0, 1, 1, 2, 3, 5, 8, 13"
FinAlgoritmo
