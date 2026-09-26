# Inicia el servidor TCP en segundo plano.
$ go run tcp-server.go &

# Envía datos y captura la respuesta utilizando netcat.
$ echo "Hello from netcat" | nc localhost 8090
ACK: HELLO FROM NETCAT
