// Uso de constantes simuladas mediante convención de nombres en mayúsculas.
Algoritmo ConstantesYConvenciones
	// Definición de constantes
	Definir PI_VALOR, TASA_IVA Como Real
	Definir VELOCIDAD_LUZ Como Entero

	// Asignación única inicial
	PI_VALOR <- 3.14159265
	TASA_IVA <- 0.19
	VELOCIDAD_LUZ <- 299792458 // en metros por segundo

	Definir radio, areaCirculo Como Real
	radio <- 5.0
	areaCirculo <- PI_VALOR * (radio ^ 2)

	Escribir "Radio: ", radio, " cm"
	Escribir "Área del círculo: ", areaCirculo, " cm²"
	Escribir "Tasa impositiva aplicada: ", (TASA_IVA * 100), "%"
FinAlgoritmo

