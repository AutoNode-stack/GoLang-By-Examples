# Para experimentar con argumentos de línea de comandos es mejor
# construir un binario con `go build` primero.
$ go build command-line-arguments.go
$ ./command-line-arguments a b c d
[./command-line-arguments a b c d]       
[a b c d]
c

# A continuación veremos el procesamiento avanzado de opciones de línea
# de comandos con banderas (flags).
