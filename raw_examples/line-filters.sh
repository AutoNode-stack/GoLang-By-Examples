# Para probar nuestro filtro de línea, primero creamos un archivo con unas
# pocas líneas en minúsculas.
$ echo 'hello'   > /tmp/lines
$ echo 'filter' >> /tmp/lines

# Luego usamos el filtro de línea para obtener las líneas en mayúsculas.
$ cat /tmp/lines | go run line-filters.go
HELLO
FILTER
