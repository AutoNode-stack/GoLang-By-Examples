// Demostración del uso combinado de Contador y Acumulador para calcular promedios.
Algoritmo ContadoresYAcumuladores
	Definir totalAprobados, i Como Entero
	Definir sumaNotas, notaActual, promedioGeneral Como Real

	// Inicialización obligatoria
	totalAprobados <- 0 // Contador
	sumaNotas <- 0.0     // Acumulador

	// Simulamos procesar 4 calificaciones de estudiantes
	Para i <- 1 Hasta 4 Hacer
		// Simulamos notas: 4.5, 2.5, 3.8, 4.2
		Segun i Hacer
			1: notaActual <- 4.5
			2: notaActual <- 2.5
			3: notaActual <- 3.8
			4: notaActual <- 4.2
		FinSegun

		// Acumulamos la nota en la sumatoria total
		sumaNotas <- sumaNotas + notaActual

		// Contamos si el estudiante aprobó
		Si notaActual >= 3.0 Entonces
			totalAprobados <- totalAprobados + 1
		FinSi
	FinPara

	promedioGeneral <- sumaNotas / 4

	Escribir "Total de notas procesadas: 4"
	Escribir "Suma total acumulada: ", sumaNotas
	Escribir "Promedio general: ", promedioGeneral
	Escribir "Estudiantes aprobados: ", totalAprobados
FinAlgoritmo

