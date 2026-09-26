// Go provee soporte integrado para la
// [codificación y decodificación en Base64](https://en.wikipedia.org/wiki/Base64).

package main

// Esta sintaxis importa el paquete `encoding/base64` asignándole
// el alias `b64` en vez del predeterminado `base64`. Esto nos
// ahorrará espacio a continuación.
import (
	b64 "encoding/base64"
	"fmt"
)

func main() {

	// Aquí tenemos la cadena (`string`) que codificaremos y decodificaremos.
	data := "abc123!?$*&()'-=@~"

	// Go admite Base64 estándar y compatible con URLs.
	// Aquí vemos cómo codificar usando el codificador estándar.
	// El codificador requiere un `[]byte`, por lo que convertimos
	// nuestra cadena a dicho tipo.
	sEnc := b64.StdEncoding.EncodeToString([]byte(data))
	fmt.Println(sEnc)

	// La decodificación puede devolver un error, el cual puedes comprobar
	// si no sabes con certeza si la entrada está bien formada.
	sDec, _ := b64.StdEncoding.DecodeString(sEnc)
	fmt.Println(string(sDec))
	fmt.Println()

	// Esto codifica y decodifica utilizando el formato Base64
	// compatible con URLs.
	uEnc := b64.URLEncoding.EncodeToString([]byte(data))
	fmt.Println(uEnc)
	uDec, _ := b64.URLEncoding.DecodeString(uEnc)
	fmt.Println(string(uDec))
}
