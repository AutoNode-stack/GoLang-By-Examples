# Utiliza estos comandos para ejecutar el ejemplo.
# (Nota: debido a limitaciones en Go Playground, este ejemplo
# solo puede ejecutarse en tu máquina local).
$ mkdir -p folder
$ echo "hello go" > folder/single_file.txt
$ echo "123" > folder/file1.hash
$ echo "456" > folder/file2.hash

$ go run embed-directive.go
hello go
hello go
123
456
