// Estructura de selección múltiple 'Segun' para simular un menú de opciones.
Algoritmo CondicionalSegun
	Definir opcion Como Entero
	opcion <- 2

	Escribir "=== MENÚ PRINCIPAL ==="
	Escribir "1. Consultar Saldo"
	Escribir "2. Realizar Transferencia"
	Escribir "3. Salir del Sistema"
	Escribir "Opción seleccionada: ", opcion

	Segun opcion Hacer
		1:
			Escribir "Acción: Su saldo disponible actual es de $1,500.00 USD."
		2:
			Escribir "Acción: Ingrese la cuenta de destino y el monto a transferir."
		3:
			Escribir "Acción: Gracias por usar nuestros servicios. Sesión finalizada."
		De Otro Modo:
			Escribir "Error: La opción ingresada no es válida. Intente nuevamente."
	FinSegun
FinAlgoritmo

