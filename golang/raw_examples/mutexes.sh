# Ejecutar el programa demuestra que los contadores
# se actualizaron con total exactitud y sincronía.
$ go run mutexes.go
map[a:20000 b:10000]

# A continuación veremos cómo resolver esta misma tarea de gestión
# de estado empleando únicamente goroutines y canales.
