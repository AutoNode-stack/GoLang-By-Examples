// Bifurcación condicional doble con alternativas mutuamente excluyentes.
Algoritmo CondicionalSiSino
	Definir edad Como Entero
	edad <- 16

	Escribir "Edad de la persona: ", edad, " años"

	Si edad >= 18 Entonces
		Escribir "Estado: Es mayor de edad. Acceso concedido."
	Sino
		Escribir "Estado: Es menor de edad. Acceso denegado."
	FinSi

	Escribir "Fin de la verificación de acceso."
FinAlgoritmo

