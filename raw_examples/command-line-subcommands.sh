$ go build command-line-subcommands.go 

# Primero invocamos el subcomando foo.
$ ./command-line-subcommands foo -enable -name=joe a1 a2
subcommand 'foo'
  enable: true
  name: joe
  tail: [a1 a2]

# Ahora probamos con bar.
$ ./command-line-subcommands bar -level 8 a1
subcommand 'bar'
  level: 8
  tail: [a1]

# Pero bar no aceptará las banderas de foo.
$ ./command-line-subcommands bar -enable a1
flag provided but not defined: -enable
Usage of bar:
  -level int
    	level

# A continuación veremos las variables de entorno, otra forma común
# de parametrizar programas.
