// Definición e invocación de subprocesos modulares reutilizables.

// Subproceso que imprime un separador gráfico decorativo
SubProceso ImprimirSeparador(simbolo)
	Definir k Como Entero
	Para k <- 1 Hasta 35 Hacer
		Escribir Sin Bajar simbolo
	FinPara
	Escribir "" // Salto de línea
FinSubProceso

// Subproceso con parámetros que muestra los datos de un usuario
SubProceso MostrarFicha(nombre, rol, nivel)
	Escribir "FICHA TÉCNICA DE USUARIO:"
	Escribir " - Nombre: ", nombre
	Escribir " - Cargo: ", rol
	Escribir " - Nivel de acceso: Nivel ", nivel
FinSubProceso

// Algoritmo principal que orquesta los subprocesos
Algoritmo SubprocesosSinRetorno
	ImprimirSeparador("=")
	MostrarFicha("Valeria Castro", "Ingeniera de Software", 3)
	ImprimirSeparador("=")
	MostrarFicha("Diego Méndez", "Arquitecto Cloud", 5)
	ImprimirSeparador("=")
FinAlgoritmo

