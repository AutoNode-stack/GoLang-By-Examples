# Esperamos obtener exactamente 50,000 operaciones. De haber
# utilizado un entero común sin atomicidad e incrementado con
# `ops++`, obtendríamos un número dispar y variable en cada
# ejecución debido a la interferencia entre goroutines.
# Además, registraríamos fallos por condiciones de carrera (data race)
# al compilar o ejecutar con la bandera `-race`.
$ go run atomic-counters.go
ops: 50000

# A continuación veremos los mutexes, otra herramienta esencial
# para gestionar estado concurrente.
