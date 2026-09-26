// Algoritmo: Verificación de Palíndromos mediante Inversión de Texto
Algoritmo VerificacionPalindromo
    Definir palabraOriginal, palabraInvertida, palabraLimpia Como Caracter
    Definir n, i Como Entero
    
    palabraOriginal <- "Reconocer"
    
    // Normalizamos a mayúsculas para evitar discrepancias de mayúsculas/minúsculas
    palabraLimpia <- Mayusculas(palabraOriginal)
    n <- Longitud(palabraLimpia)
    palabraInvertida <- ""
    
    Escribir "=== COMPROBACIÓN DE PALÍNDROMO ==="
    Escribir "Palabra a analizar:", palabraOriginal
    
    // Construimos la cadena invertida recorriendo hacia atrás con Paso -1
    Para i <- n Hasta 1 Con Paso -1 Hacer
        palabraInvertida <- palabraInvertida + Subcadena(palabraLimpia, i, i)
    FinPara
    
    Escribir "Palabra invertida:", palabraInvertida
    Escribir ""
    
    // Comparamos la cadena limpia normalizada con la cadena invertida
    Si palabraLimpia = palabraInvertida Entonces
        Escribir "¡Confirmado! La palabra '", palabraOriginal, "' es un PALÍNDROMO válido."
    Sino
        Escribir "La palabra '", palabraOriginal, "' NO es un palíndromo."
    FinSi
FinAlgoritmo
