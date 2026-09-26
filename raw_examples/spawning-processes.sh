# Los programas generados devuelven una salida idéntica a
# si los hubiésemos ejecutado directamente desde la línea de comandos.
$ go run spawning-processes.go 
> date
Thu 05 May 2022 10:10:12 PM PDT

# `date` no tiene una bandera `-x`, por lo que saldrá con
# un mensaje de error y un código de retorno distinto de cero.
command exit rc = 1
> grep hello
hello grep

> ls -a -l -h
drwxr-xr-x  4 mark 136B Oct 3 16:29 .
drwxr-xr-x 91 mark 3.0K Oct 3 12:50 ..
-rw-r--r--  1 mark 1.3K Oct 3 16:28 spawning-processes.go
