// Algoritmo: Exploración de Funciones de Texto y Recorrido de Cadenas
Algoritmo ManejoCadenasTexto
    Definir mensaje Como Caracter
    Definir totalCaracteres, i Como Entero
    
    mensaje <- "PSeInt Lógica"
    
    // 1. Obtener la longitud de la cadena
    totalCaracteres <- Longitud(mensaje)
    Escribir "=== ANÁLISIS DE LA CADENA ==="
    Escribir "Texto analizado:", mensaje
    Escribir "Total de caracteres (con espacios):", totalCaracteres
    
    // 2. Extracción de subcadenas específicas
    Escribir ""
    Escribir "=== EXTRACCIÓN DE SUBCADENAS ==="
    Escribir "Subcadena(1 a 6):", Subcadena(mensaje, 1, 6)
    Escribir "Subcadena(8 a 13):", Subcadena(mensaje, 8, 13)
    
    // 3. Conversión a mayúsculas y minúsculas
    Escribir ""
    Escribir "=== TRANSFORMACIÓN DE CASO ==="
    Escribir "En mayúsculas:", Mayusculas(mensaje)
    Escribir "En minúsculas:", Minusculas(mensaje)
    
    // 4. Recorrido letra por letra con bucle Para
    Escribir ""
    Escribir "=== RECORRIDO CARACTER A CARACTER ==="
    Para i <- 1 Hasta totalCaracteres Con Paso 1 Hacer
        Escribir "Carácter en posición [", i, "] -> ", Subcadena(mensaje, i, i)
    FinPara
FinAlgoritmo
