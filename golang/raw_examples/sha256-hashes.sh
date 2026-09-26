# Ejecutar el programa calcula el hash y lo imprime en
# un formato hexadecimal legible para humanos.
$ go run sha256-hashes.go
sha256 this string
1af1dfa857bf1d8814fe1af8983c18080019922e557f15a8a...

# Puedes calcular otros hashes empleando un patrón muy similar
# al mostrado arriba. Por ejemplo, para calcular hashes
# SHA512 importa `crypto/sha512` y utiliza
# `sha512.New()`.

# Ten en cuenta que si requieres hashes criptográficamente seguros,
# debes investigar cuidadosamente la
# [fortaleza del algoritmo](https://en.wikipedia.org/wiki/Cryptographic_hash_function).
