// Algoritmo: Cálculo de Máximo, Mínimo y Promedio de un Vector
Algoritmo EstadisticasVectoriales
    Definir TAMANIO, i Como Entero
    Definir maximo, minimo, sumaTotal, promedio Como Real
    
    TAMANIO <- 5
    Definir calificaciones Como Real
    Dimension calificaciones[TAMANIO]
    
    // Asignación de datos de prueba
    calificaciones[1] <- 14.5
    calificaciones[2] <- 18.0
    calificaciones[3] <- 09.5
    calificaciones[4] <- 20.0
    calificaciones[5] <- 13.0
    
    // PATRÓN ROBUSTO: Inicializar con el primer elemento
    maximo <- calificaciones[1]
    minimo <- calificaciones[1]
    sumaTotal <- calificaciones[1]
    
    // Recorremos desde el segundo elemento en adelante
    Para i <- 2 Hasta TAMANIO Con Paso 1 Hacer
        // Actualización de máximo
        Si calificaciones[i] > maximo Entonces
            maximo <- calificaciones[i]
        FinSi
        
        // Actualización de mínimo
        Si calificaciones[i] < minimo Entonces
            minimo <- calificaciones[i]
        FinSi
        
        // Acumulación para el promedio
        sumaTotal <- sumaTotal + calificaciones[i]
    FinPara
    
    promedio <- sumaTotal / TAMANIO
    
    Escribir "=== RESULTADOS ESTADÍSTICOS DE CALIFICACIONES ==="
    Escribir "Nota Máxima registrada:", maximo
    Escribir "Nota Mínima registrada:", minimo
    Escribir "Suma total acumulada:", sumaTotal
    Escribir "Promedio aritmético:", promedio
FinAlgoritmo
