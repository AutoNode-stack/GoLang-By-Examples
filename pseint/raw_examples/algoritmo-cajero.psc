// Algoritmo: Desglose Óptimo de Billetes en Cajero Automático (Voraz)
Algoritmo CajeroAutomaticoVoraz
    Definir TOTAL_DENOMINACIONES, i Como Entero
    Definir montoSolicitado, montoRestante, cantidadBilletes, totalBilletes Como Entero
    
    TOTAL_DENOMINACIONES <- 6
    Definir denominaciones Como Entero
    Dimension denominaciones[TOTAL_DENOMINACIONES]
    
    // Denominaciones canónicas ordenadas estrictamente de mayor a menor
    denominaciones[1] <- 100
    denominaciones[2] <- 50
    denominaciones[3] <- 20
    denominaciones[4] <- 10
    denominaciones[5] <- 5
    denominaciones[6] <- 1
    
    montoSolicitado <- 387
    montoRestante <- montoSolicitado
    totalBilletes <- 0
    
    Escribir "=== DISPENSADOR DE CAJERO AUTOMÁTICO ==="
    Escribir "Monto total a retirar: $", montoSolicitado
    Escribir "Calculando desglose óptimo con el mínimo número de billetes..."
    Escribir ""
    
    // Recorremos vorazmente cada denominación
    Para i <- 1 Hasta TOTAL_DENOMINACIONES Con Paso 1 Hacer
        // Calculamos cuántos billetes de esta denominación caben
        cantidadBilletes <- trunc(montoRestante / denominaciones[i])
        
        // Si se entrega al menos un billete de esta denominación
        Si cantidadBilletes > 0 Entonces
            Escribir "-> Billetes de $", denominaciones[i], ": ", cantidadBilletes
            totalBilletes <- totalBilletes + cantidadBilletes
            // Actualizamos el saldo pendiente usando el operador módulo %
            montoRestante <- montoRestante % denominaciones[i]
        FinSi
    FinPara
    
    Escribir ""
    Escribir "=== RESUMEN DE LA DISPENSACIÓN ==="
    Escribir "Total de billetes físicos entregados:", totalBilletes
    Escribir "Saldo remanente sin dispensar: $", montoRestante
FinAlgoritmo
