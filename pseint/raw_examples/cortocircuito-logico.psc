// Demostración del principio de cortocircuito lógico para evitar división por cero.
Algoritmo CortocircuitoLogico
	Definir totalAlumnos, totalGrupos Como Entero
	Definir divisionSegura Como Logico

	totalAlumnos <- 45
	totalGrupos <- 0 // Peligro: división por cero si intentamos calcular 45 / 0

	Escribir "Total de alumnos: ", totalAlumnos
	Escribir "Total de grupos: ", totalGrupos

	// Protección mediante cortocircuito:
	// Como (totalGrupos > 0) es Falso, la segunda parte (totalAlumnos / totalGrupos) NO se ejecuta
	Si totalGrupos > 0 Y (totalAlumnos / totalGrupos) >= 15 Entonces
		Escribir "Los grupos están balanceados y con suficiente aforo."
	Sino
		Escribir "No se pueden calcular grupos porque el total de grupos es cero o insuficiente."
	FinSi
FinAlgoritmo

