// Ejemplo de lectura interactiva de datos desde el teclado.
Algoritmo LecturaDeDatos
	Definir nombreUsuario Como Cadena
	Definir anioNacimiento, anioActual, edadCalculada Como Entero

	anioActual <- 2026

	// Solicitamos el nombre
	Escribir "Por favor, ingresa tu nombre:"
	Leer nombreUsuario

	// Solicitamos el año de nacimiento
	Escribir "Ingresa tu año de nacimiento (ej: 2000):"
	Leer anioNacimiento

	// Procesamos la información
	edadCalculada <- anioActual - anioNacimiento

	// Mostramos el resultado
	Escribir "Hola ", nombreUsuario, ", en el año ", anioActual, " tienes aproximadamente ", edadCalculada, " años."
FinAlgoritmo

