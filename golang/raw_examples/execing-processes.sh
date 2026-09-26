# Al ejecutar nuestro programa, este es reemplazado por `ls`.
$ go run execing-processes.go
total 16
drwxr-xr-x  4 mark 136B Oct 3 16:29 .
drwxr-xr-x 91 mark 3.0K Oct 3 12:50 ..
-rw-r--r--  1 mark 1.3K Oct 3 16:28 execing-processes.go

# Ten en cuenta que Go no ofrece una función `fork` clásica de Unix.
# Por lo general esto no representa ningún problema, ya que iniciar
# goroutines, lanzar procesos y reemplazar procesos con exec cubren
# la gran mayoría de casos de uso de `fork`.
