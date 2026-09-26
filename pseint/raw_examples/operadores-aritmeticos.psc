// Demostración completa de operadores aritméticos y orden de precedencia.
Algoritmo OperadoresAritmeticos
	Definir a, b Como Entero
	a <- 17
	b <- 5

	Escribir "Valores: a = ", a, ", b = ", b
	Escribir "Suma (a + b) = ", a + b
	Escribir "Resta (a - b) = ", a - b
	Escribir "Multiplicación (a * b) = ", a * b
	Escribir "División (a / b) = ", a / b
	Escribir "Residuo Módulo (a MOD b) = ", a MOD b
	Escribir "Potenciación (b ^ 3) = ", b ^ 3

	// Precedencia
	Definir res1, res2 Como Real
	res1 <- 10 + 5 * 2
	res2 <- (10 + 5) * 2
	Escribir "Sin paréntesis (10 + 5 * 2) = ", res1
	Escribir "Con paréntesis ((10 + 5) * 2) = ", res2
FinAlgoritmo

