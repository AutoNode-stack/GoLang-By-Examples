// Algoritmo: Demostración de Paso de Parámetros Por Valor
SubProceso ModificarCopia(Por Valor numeroCopia)
    // Mostramos el valor inicial recibido en el parámetro formal
    Escribir ">> [SubProceso] Valor recibido en copia:", numeroCopia
    
    // Modificamos únicamente la copia local del subproceso
    numeroCopia <- numeroCopia * 10
    Escribir ">> [SubProceso] Valor alterado dentro del subproceso:", numeroCopia
FinSubProceso

Algoritmo DemostracionPasoPorValor
    // Declaramos la variable original en el ámbito principal
    Definir valorOriginal Como Entero
    valorOriginal <- 42
    
    Escribir "=== ANTES DE LA LLAMADA AL SUBPROCESO ==="
    Escribir "Variable original en el Algoritmo Principal:", valorOriginal
    
    // Invocamos el subproceso enviando la variable
    Escribir ""
    Escribir "=== EJECUTANDO SUBPROCESO POR VALOR ==="
    ModificarCopia(valorOriginal)
    
    // Verificamos que la variable original no haya sufrido modificaciones
    Escribir ""
    Escribir "=== DESPUÉS DE LA LLAMADA AL SUBPROCESO ==="
    Escribir "Variable original en el Algoritmo Principal:", valorOriginal
    Escribir "Conclusión: La variable principal permanece inmutable y protegida."
FinAlgoritmo
