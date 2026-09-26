# Ejecutar este programa provocará un panic, imprimirá
# un mensaje de error con las trazas de goroutines y finalizará
# con un estado distinto de cero.

# Cuando se dispara el primer panic en `main`, el programa termina
# sin alcanzar el resto del código. Si deseas ver al programa
# intentar crear el archivo temporal, comenta la primera línea de panic.
$ go run panic.go
panic: a problem

goroutine 1 [running]:
main.main()
	/.../panic.go:12 +0x47
...
exit status 2

# Ten en cuenta que, a diferencia de otros lenguajes que emplean excepciones
# para el manejo común de errores, en Go es idiomático
# utilizar valores de retorno explícitos siempre que sea posible.
