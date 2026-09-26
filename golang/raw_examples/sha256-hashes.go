// Los [_hashes SHA256_](https://en.wikipedia.org/wiki/SHA-2) se utilizan
// con frecuencia para calcular identificadores breves e irrepetibles para fragmentos
// binarios o de texto. Por ejemplo, los certificados TLS/SSL emplean SHA256
// para calcular su firma criptográfica. Así es como se calculan
// hashes SHA256 en Go.

package main

// Go implementa diversas funciones de hash en varios
// paquetes dentro de `crypto/*`.
import (
	"crypto/sha256"
	"fmt"
)

func main() {
	s := "sha256 this string"

	// Aquí iniciamos un nuevo cálculo de hash.
	h := sha256.New()

	// `Write` espera bytes. Si tienes una cadena `s`,
	// usa `[]byte(s)` para convertirla a bytes.
	h.Write([]byte(s))

	// Esto obtiene el resultado final del hash como un
	// slice de bytes. El argumento para `Sum` puede usarse para adjuntar
	// a un slice de bytes existente; generalmente no se necesita (usa `nil`).
	bs := h.Sum(nil)

	fmt.Println(s)
	fmt.Printf("%x\n", bs)
}
