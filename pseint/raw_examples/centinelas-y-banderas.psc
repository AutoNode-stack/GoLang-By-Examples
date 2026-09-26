// Uso de valor centinela (-1) y variable bandera lógica (huboNotaBaja).
Algoritmo CentinelasYBanderas
	Definir nota, suma Como Real
	Definir totalNotas Como Entero
	Definir huboNotaBaja Como Logico

	// Inicializaciones
	suma <- 0
	totalNotas <- 0
	huboNotaBaja <- Falso // Bandera lógica en estado inicial

	Escribir "=== REGISTRO CON CENTINELA (-1 PARA TERMINAR) ==="

	// Simulamos lecturas sucesivas con parada en centinela -1
	// Serie de valores simulados: 4.5, 2.1, 4.0, -1
	Definir paso Como Entero
	Para paso <- 1 Hasta 4 Hacer
		Segun paso Hacer
			1: nota <- 4.5
			2: nota <- 2.1
			3: nota <- 4.0
			4: nota <- -1 // Centinela de parada
		FinSegun

		// Verificamos si llegamos al centinela
		Si nota = -1 Entonces
			Escribir "Centinela detectado (-1). Finalizando lectura."
		Sino
			Escribir "Nota procesada: ", nota
			suma <- suma + nota
			totalNotas <- totalNotas + 1

			// Activamos la bandera si detectamos una nota menor a 3.0
			Si nota < 3.0 Entonces
				huboNotaBaja <- Verdadero
			FinSi
		FinSi
	FinPara

	Escribir "Total de notas válidas: ", totalNotas
	Escribir "Promedio: ", (suma / totalNotas)
	Escribir "¿Se detectó al menos una nota baja (< 3.0)?: ", huboNotaBaja
FinAlgoritmo

