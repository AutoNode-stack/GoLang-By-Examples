# Prueba a ejecutar el código de escritura de archivos.
$ go run writing-files.go 
wrote 5 bytes
wrote 7 bytes
wrote 9 bytes

# Luego comprueba el contenido de los archivos creados.
$ cat /tmp/dat1
hello
go
$ cat /tmp/dat2
some
writes
buffered

# A continuación veremos cómo aplicar estas ideas de E/S de archivos
# a los flujos de entrada y salida estándar `stdin` y `stdout`.
