// Algoritmo: Intercambio de Variables usando Paso Por Referencia
SubProceso Intercambiar(Por Referencia refA, Por Referencia refB)
    Definir auxiliar Como Entero
    
    // Guardamos el valor de refA en la variable temporal auxiliar
    auxiliar <- refA
    
    // Asignamos el valor de refB en la celda de memoria de refA
    refA <- refB
    
    // Asignamos el valor guardado en el auxiliar a la celda de refB
    refB <- auxiliar
    
    Escribir ">> [SubProceso] Intercambio realizado con éxito en memoria compartida."
FinSubProceso

Algoritmo DemostracionPasoPorReferencia
    Definir primerNumero, segundoNumero Como Entero
    
    primerNumero <- 10
    segundoNumero <- 99
    
    Escribir "=== VALORES ORIGINALES ANTES DEL INTERCAMBIO ==="
    Escribir "primerNumero:", primerNumero
    Escribir "segundoNumero:", segundoNumero
    
    // Llamamos al subproceso pasando las variables por referencia
    Escribir ""
    Escribir "=== LLAMANDO AL SUBPROCESO INTERCAMBIAR ==="
    Intercambiar(primerNumero, segundoNumero)
    
    // Los valores de las variables en el algoritmo principal ahora están invertidos
    Escribir ""
    Escribir "=== VALORES TRAS RETORNAR DEL SUBPROCESO ==="
    Escribir "primerNumero:", primerNumero
    Escribir "segundoNumero:", segundoNumero
    Escribir "Conclusión: Las variables originales fueron modificadas permanentemente."
FinAlgoritmo
