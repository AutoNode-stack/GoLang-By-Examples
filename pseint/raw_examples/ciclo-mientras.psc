// Ciclo 'Mientras': Cuenta progresiva del 1 al 5 controlando la variable contadora.
Algoritmo CicloMientras
	Definir contador Como Entero

	// 1. Inicialización de la variable de control
	contador <- 1

	Escribir "Iniciando conteo con ciclo Mientras:"

	// 2. Condición de permanencia
	Mientras contador <= 5 Hacer
		Escribir "Iteración número: ", contador

		// 3. Paso de avance (crucial para evitar bucle infinito)
		contador <- contador + 1
	FinMientras

	Escribir "Ciclo finalizado con éxito. Valor final de contador: ", contador
FinAlgoritmo

