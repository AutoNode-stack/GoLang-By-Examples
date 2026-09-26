# Al ejecutar el programa, el mensaje `"ping"` se
# transmite exitosamente de una goroutine a otra a través
# de nuestro canal.
$ go run channels.go 
ping

# Por defecto, los envíos y recepciones se bloquean hasta que tanto el
# emisor como el receptor estén listos. Esta propiedad nos permitió
# esperar al final de nuestro programa la llegada del mensaje `"ping"`
# sin necesidad de recurrir a ningún otro mecanismo de sincronización.
