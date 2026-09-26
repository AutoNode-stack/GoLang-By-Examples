# La cadena se codifica con valores ligeramente distintos entre los
# codificadores estándar y de URL (signo `+` frente a `-` al final),
# pero ambos decodifican a la cadena original según lo esperado.
$ go run base64-encoding.go
YWJjMTIzIT8kKiYoKSctPUB+
abc123!?$*&()'-=@~

YWJjMTIzIT8kKiYoKSctPUB-
abc123!?$*&()'-=@~
