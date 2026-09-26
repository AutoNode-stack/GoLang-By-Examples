# Ejecutar el programa demuestra que recuperamos el valor
# para `FOO` configurado en el código, mientras que
# `BAR` permanece vacío.
$ go run environment-variables.go
FOO: 1
BAR: 

# La lista de claves en el entorno dependerá de la configuración
# de tu máquina particular.
TERM_PROGRAM
PATH
SHELL
...
FOO

# Si definimos `BAR` en el entorno antes de la invocación, el programa
# en ejecución capturará dicho valor.
$ BAR=2 go run environment-variables.go
FOO: 1
BAR: 2
...
