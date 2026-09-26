# Ejecuta el servidor en segundo plano.
$ go run context.go &

# Simula una petición de cliente hacia `/hello`, presionando
# Ctrl+C poco después de iniciar para enviar una señal
# de cancelación.
$ curl localhost:8090/hello
server: hello handler started
^C
server: context canceled
server: hello handler ended
