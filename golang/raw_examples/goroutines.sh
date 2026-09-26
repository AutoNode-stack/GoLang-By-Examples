# Al ejecutar este programa, observamos primero la salida de la llamada
# bloqueante (síncrona), seguida por la salida de las dos
# goroutines. La salida de las goroutines puede aparecer intercalada,
# ya que el runtime de Go las ejecuta concurrentemente.
$ go run goroutines.go
direct : 0
direct : 1
direct : 2
goroutine : 0
going
goroutine : 1
goroutine : 2
done

# A continuación veremos el complemento ideal para las goroutines en
# programas concurrentes de Go: los canales.
