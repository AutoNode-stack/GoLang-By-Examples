// Algoritmo: Demostración de Ámbito Local y No Interferencia
SubProceso ProcesoA
    Definir x Como Entero
    x <- 500
    Escribir ">> [ProcesoA] Mi variable local x vale:", x
FinSubProceso

SubProceso ProcesoB
    Definir x Como Entero
    x <- 999
    Escribir ">> [ProcesoB] Mi variable local x vale:", x
FinSubProceso

Algoritmo DemostracionAmbitoVariables
    Definir x Como Entero
    x <- 10
    
    Escribir "=== ÁMBITO PRINCIPAL INICIAL ==="
    Escribir "Variable x en Algoritmo Principal:", x
    
    Escribir ""
    Escribir "=== INVOCANDO SUBPROCESOS CON MISMOS IDENTIFICADORES ==="
    ProcesoA()
    ProcesoB()
    
    Escribir ""
    Escribir "=== RETORNO AL ÁMBITO PRINCIPAL ==="
    Escribir "Variable x en Algoritmo Principal tras llamadas:", x
    Escribir "Demostración: Cada bloque mantiene su propio espacio aislado de variables."
FinAlgoritmo
