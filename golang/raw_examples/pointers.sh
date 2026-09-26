# `zeroval` no modifica la variable `i` en `main`, pero
# `zeroptr` sí lo hace porque posee una referencia a
# la dirección de memoria de dicha variable.
$ go run pointers.go
initial: 1
zeroval: 1
zeroptr: 0
pointer: 0x42131100
value at *p: 42
value at *p: 0
