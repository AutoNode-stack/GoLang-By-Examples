# Al ejecutar este programa se bloqueará esperando una
# señal. Al teclear `ctrl-C` (que la terminal
# muestra como `^C`) enviamos una señal `SIGINT`,
# lo que provoca que el programa imprima la causa de cancelación y luego finalice.
$ go run signals.go
awaiting signal
^C
interrupt signal received
exiting
