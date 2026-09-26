// Declaración de variables y mutación de estado con el operador '<-'.
Algoritmo VariablesYAsignacion
	Definir totalPuntos Como Entero
	Definir multiplicador Como Entero

	// Asignación inicial
	totalPuntos <- 100
	multiplicador <- 2
	Escribir "Puntos iniciales: ", totalPuntos

	// Mutación usando el valor anterior
	totalPuntos <- totalPuntos * multiplicador
	Escribir "Puntos duplicados: ", totalPuntos

	// Suma acumulativa
	totalPuntos <- totalPuntos + 50
	Escribir "Puntos finales con bono: ", totalPuntos
FinAlgoritmo

