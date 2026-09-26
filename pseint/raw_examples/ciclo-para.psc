// Ciclo 'Para' con incremento automático y paso negativo regresivo.
Algoritmo CicloPara
	Definir i, suma Como Entero

	Escribir "1. Conteo ascendente del 1 al 5:"
	Para i <- 1 Hasta 5 Hacer
		Escribir "Paso: ", i
	FinPara

	Escribir ""
	Escribir "2. Conteo regresivo con paso negativo (Con Paso -1):"
	Para i <- 5 Hasta 1 Con Paso -1 Hacer
		Escribir "Cuenta regresiva: ", i
	FinPara

	Escribir ""
	Escribir "3. Sumatoria de números del 1 al 10:"
	suma <- 0
	Para i <- 1 Hasta 10 Hacer
		suma <- suma + i
	FinPara
	Escribir "La sumatoria total es: ", suma
FinAlgoritmo

