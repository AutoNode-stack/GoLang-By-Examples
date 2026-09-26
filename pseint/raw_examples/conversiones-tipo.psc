// Algoritmo: Conversiones de Tipos y Análisis de Dígitos
Algoritmo ConversionesDeTipo
    Definir precioTexto, edadTexto Como Caracter
    Definir precioNumero, total, numeroTelefono Como Real
    Definir cantidadDigitos Como Entero
    
    // 1. CONVERTIR TEXTO A NÚMERO
    precioTexto <- "1250.50"
    Escribir "=== CONVERSIÓN DE TEXTO A NÚMERO ==="
    Escribir "Cadena original:", precioTexto
    
    // Convertimos la cadena a valor Real
    precioNumero <- ConvertirANumero(precioTexto)
    
    // Ahora podemos realizar cálculos matemáticos
    total <- precioNumero + 250.00
    Escribir "Precio numérico sumado con 250:", total
    
    // 2. CONVERTIR NÚMERO A TEXTO
    Escribir ""
    Escribir "=== CONVERSIÓN DE NÚMERO A TEXTO ==="
    numeroTelefono <- 987654321
    Escribir "Número cuantitativo original:", numeroTelefono
    
    // Convertimos a texto para poder usar funciones de cadena
    edadTexto <- ConvertirATexto(numeroTelefono)
    cantidadDigitos <- Longitud(edadTexto)
    
    Escribir "Texto convertido:", edadTexto
    Escribir "Cantidad de dígitos que componen el número:", cantidadDigitos
    Escribir "Primeros 3 dígitos (código de área):", Subcadena(edadTexto, 1, 3)
FinAlgoritmo
