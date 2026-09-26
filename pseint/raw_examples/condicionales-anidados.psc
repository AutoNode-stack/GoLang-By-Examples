// Clasificación de notas mediante condicionales anidados en cascada.
Algoritmo CondicionalesAnidados
	Definir nota Como Real
	nota <- 3.8

	Escribir "Nota del estudiante: ", nota

	Si nota >= 4.5 Entonces
		Escribir "Desempeño: Excelente (Aprobado con honores)"
	Sino
		Si nota >= 3.5 Entonces
			Escribir "Desempeño: Bueno (Aprobado)"
		Sino
			Si nota >= 3.0 Entonces
				Escribir "Desempeño: Regular (Aprobado en el límite)"
			Sino
				Escribir "Desempeño: Deficiente (Reprobado)"
			FinSi
		FinSi
	FinSi
FinAlgoritmo

