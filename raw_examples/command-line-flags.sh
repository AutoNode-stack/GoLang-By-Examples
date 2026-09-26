# Para experimentar con el programa de banderas de línea de comandos es
# recomendable compilarlo primero y luego ejecutar directamente el binario resultante.
$ go build command-line-flags.go

# Prueba el programa compilado pasándole valores para todas las banderas.
$ ./command-line-flags -word=opt -numb=7 -fork -svar=flag
word: opt
numb: 7
fork: true
svar: flag
tail: []

# Ten en cuenta que si omites banderas, estas tomarán automáticamente
# sus valores predeterminados.
$ ./command-line-flags -word=opt
word: opt
numb: 42
fork: false
svar: bar
tail: []

# Los argumentos posicionales adicionales pueden proporcionarse después
# de cualquier bandera.
$ ./command-line-flags -word=opt a1 a2 a3
word: opt
...
tail: [a1 a2 a3]

# Nota que el paquete `flag` exige que todas las banderas aparezcan
# antes de los argumentos posicionales (de lo contrario las banderas
# posteriores se interpretarán como argumentos posicionales ordinarios).
$ ./command-line-flags -word=opt a1 a2 a3 -numb=7
word: opt
numb: 42
fork: false
svar: bar
tail: [a1 a2 a3 -numb=7]

# Usa las banderas `-h` o `--help` para obtener el texto de ayuda
# generado automáticamente para el programa de línea de comandos.
$ ./command-line-flags -h
Usage of ./command-line-flags:
  -fork=false: a bool
  -numb=42: an int
  -svar="bar": a string var
  -word="foo": a string

# Si ingresas una bandera no registrada en el paquete `flag`,
# el programa imprimirá un mensaje de error y mostrará el texto de ayuda nuevamente.
$ ./command-line-flags -wat
flag provided but not defined: -wat
Usage of ./command-line-flags:
...
