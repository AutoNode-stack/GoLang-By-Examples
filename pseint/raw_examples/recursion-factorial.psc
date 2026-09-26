// Algoritmo: Cálculo del Factorial mediante Función Recursiva
Funcion resultado <- CalcularFactorial(n)
    Definir resultado Como Entero
    
    // CONDICIÓN DE PARADA: Caso Base
    Si n <= 1 Entonces
        // 0! = 1 y 1! = 1
        resultado <- 1
    Sino
        // PASO RECURSIVO: n * Factorial(n - 1)
        resultado <- n * CalcularFactorial(n - 1)
    FinSi
FinFuncion

Algoritmo DemostracionRecursionFactorial
    Definir numero, resultadoFactorial Como Entero
    
    Escribir "=== CÁLCULO RECURSIVO DEL FACTORIAL ==="
    numero <- 5
    
    Escribir "Calculando el factorial de:", numero
    resultadoFactorial <- CalcularFactorial(numero)
    
    Escribir "El factorial de", numero, "es:", resultadoFactorial
    Escribir ""
    Escribir "Verificación matemática: 5! = 5 * 4 * 3 * 2 * 1 = 120"
FinAlgoritmo
