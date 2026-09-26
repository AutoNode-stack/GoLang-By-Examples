// Definición de funciones matemáticas puras que retornan un valor calculado.

// Función que calcula el área de un triángulo
SubProceso area <- CalcularAreaTriangulo(base, altura)
	Definir area Como Real
	area <- (base * altura) / 2
FinSubProceso

// Función que calcula el mayor entre dos números
SubProceso mayor <- ObtenerMayor(n1, n2)
	Definir mayor Como Entero
	Si n1 >= n2 Entonces
		mayor <- n1
	Sino
		mayor <- n2
	FinSi
FinSubProceso

Algoritmo FuncionesConRetorno
	Definir b, h, resArea Como Real
	b <- 12.0
	h <- 8.0

	// Invocación y captura del valor de retorno
	resArea <- CalcularAreaTriangulo(b, h)
	Escribir "Área del triángulo (base ", b, ", altura ", h, ") = ", resArea

	// Uso directo del valor de retorno en una expresión de impresión
	Escribir "El número mayor entre 45 y 89 es: ", ObtenerMayor(45, 89)
FinAlgoritmo

