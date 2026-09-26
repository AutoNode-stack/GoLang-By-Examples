// Bucles anidados para generar una tabla de multiplicar completa (filas y columnas).
Algoritmo BuclesAnidados
	Definir tabla, mult Como Entero

	Escribir "=== TABLAS DE MULTIPLICAR DEL 1 AL 3 ==="

	// Bucle exterior: controla qué tabla estamos imprimiendo
	Para tabla <- 1 Hasta 3 Hacer
		Escribir "--- Tabla del ", tabla, " ---"

		// Bucle interior: calcula los multiplicadores del 1 al 4
		Para mult <- 1 Hasta 4 Hacer
			Escribir tabla, " x ", mult, " = ", (tabla * mult)
		FinPara
	FinPara

	Escribir "Todas las tablas han sido generadas."
FinAlgoritmo

