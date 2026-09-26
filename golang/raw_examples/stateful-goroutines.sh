# Ejecutar nuestro programa demuestra que el ejemplo de gestión de estado
# basado en goroutines completa aproximadamente 80,000 operaciones en total.
$ go run stateful-goroutines.go
readOps: 71708
writeOps: 7177

# Para este caso particular el enfoque basado en goroutines requirió un poco más
# de código que el basado en mutexes. No obstante, resulta sumamente útil en
# casos donde intervienen otros canales o cuando gestionar múltiples
# mutexes resultaría propenso a errores. Debes emplear el enfoque que te resulte
# más natural y garantice la corrección de tu programa.
