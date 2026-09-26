// Validación de entrada con 'Repetir ... Hasta Que'.
// Garantiza que la nota ingresada esté estrictamente entre 1 y 10.
Algoritmo CicloRepetirHasta
	Definir calificacion Como Real
	Definir intentos Como Entero
	intentos <- 0

	Repetir
		intentos <- intentos + 1
		Escribir "Intento #", intentos, ": Ingrese una calificación válida (1.0 a 10.0):"
		// En una ejecución real interactiva usaríamos: Leer calificacion
		// Simulamos que en el intento 2 el usuario ingresa un valor correcto:
		Si intentos < 2 Entonces
			calificacion <- -3.5 // Valor inválido
			Escribir "Dato ingresado: ", calificacion, " (Inválido)"
		Sino
			calificacion <- 8.5  // Valor válido
			Escribir "Dato ingresado: ", calificacion, " (Correcto)"
		FinSi
	Hasta Que calificacion >= 1.0 Y calificacion <= 10.0

	Escribir "Calificación aceptada con éxito en ", intentos, " intentos: ", calificacion
FinAlgoritmo

