# Si ejecutas `exit.go` usando `go run`, la salida
# será interceptada por `go` e impresa en pantalla.
$ go run exit.go
exit status 3

# Compilando y ejecutando el binario directamente puedes observar
# el código de estado devuelto en la terminal.
$ go build exit.go
$ ./exit
$ echo $?
3

# Observa que el `!` de nuestro programa nunca llegó a imprimirse.
