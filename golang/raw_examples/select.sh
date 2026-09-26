# Recibimos los valores `"one"` y luego `"two"` como
# se esperaba.
$ time go run select.go 
received one
received two

# Ten en cuenta que el tiempo total de ejecución es de apenas ~2 segundos,
# ya que ambos `Sleep` de 1 y 2 segundos se ejecutan de
# forma concurrente.
real	0m2.245s
