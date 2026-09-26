// `//go:embed` es una [directiva del
// compilador](https://pkg.go.dev/cmd/compile#hdr-Compiler_Directives) que
// permite a los programas incrustar archivos y carpetas arbitrarias dentro del binario
// compilado de Go. Lee más acerca de la directiva embed
// [aquí](https://pkg.go.dev/embed).
package main

// Importa el paquete `embed`; si no utilizas ningún identificador
// exportado de dicho paquete, puedes realizar una importación en blanco con `_ "embed"`.
import (
	"embed"
)

// Las directivas `embed` aceptan rutas relativas al directorio que contiene el
// archivo fuente de Go. Esta directiva incrusta el contenido del archivo dentro de la
// variable `string` inmediatamente subsiguiente.
//
//go:embed folder/single_file.txt
var fileString string

// O incrusta el contenido del archivo dentro de un `[]byte`.
//
//go:embed folder/single_file.txt
var fileByte []byte

// También podemos incrustar múltiples archivos o incluso carpetas enteras utilizando comodines.
// Esto emplea una variable del [tipo embed.FS](https://pkg.go.dev/embed#FS), la cual
// implementa un sistema de archivos virtual simple.
//
//go:embed folder/single_file.txt
//go:embed folder/*.hash
var folder embed.FS

func main() {

	// Imprime el contenido de `single_file.txt`.
	print(fileString)
	print(string(fileByte))

	// Recupera algunos archivos desde la carpeta incrustada.
	content1, _ := folder.ReadFile("folder/file1.hash")
	print(string(content1))

	content2, _ := folder.ReadFile("folder/file2.hash")
	print(string(content2))
}
