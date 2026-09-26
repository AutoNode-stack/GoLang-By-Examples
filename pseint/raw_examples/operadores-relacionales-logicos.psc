// Operadores relacionales de comparación y operadores lógicos booleanos.
Algoritmo OperadoresRelacionalesLogicos
	Definir edad Como Entero
	Definir tienePermiso, tieneCedula Como Logico
	Definir puedeEntrar, esFinDeSemana, tieneCupon Como Logico

	edad <- 20
	tieneCedula <- Verdadero
	tienePermiso <- Falso

	// Comparaciones relacionales
	Escribir "¿Es mayor de edad (edad >= 18)?: ", (edad >= 18)
	Escribir "¿Edad es exactamente 20?: ", (edad = 20)
	Escribir "¿Edad es distinta de 0?: ", (edad <> 0)

	// Operadores lógicos
	// Para entrar al club: Debe tener >= 18 Y tener cédula
	puedeEntrar <- (edad >= 18) Y tieneCedula
	Escribir "¿Puede entrar al club (Y)?: ", puedeEntrar

	// Para descuento: Ser fin de semana O tener cupón
	esFinDeSemana <- Falso
	tieneCupon <- Verdadero
	Escribir "¿Aplica descuento (O)?: ", (esFinDeSemana O tieneCupon)

	// Negación
	Escribir "Inversión lógica de permiso con NO: ", (NO tienePermiso)
FinAlgoritmo

