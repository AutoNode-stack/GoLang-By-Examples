$ go run slices.go
uninit: [] true true
emp: [  ] len: 3 cap: 3
set: [a b c]
get: c
len: 3
apd: [a b c d e f]
cpy: [a b c d e f]
sl1: [c d e]
sl2: [a b c d e]
sl3: [c d e f]
dcl: [g h i]
t == t2
2d:  [[0] [1 2] [2 3 4]]

# Consulta esta [excelente publicación de blog](https://go.dev/blog/slices-intro)
# del equipo de Go para conocer más detalles sobre el diseño
# y la implementación interna de los slices en Go.

# Ahora que hemos visto arrays y slices, revisaremos la otra
# estructura de datos asociativa integrada en Go: los mapas.
