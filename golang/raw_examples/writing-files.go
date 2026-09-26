// Escribir archivos en Go sigue patrones análogos a los
// que examinamos previamente para la lectura.

package main

import (
	"bufio"
	"fmt"
	"os"
	"path/filepath"
)

func check(e error) {
	if e != nil {
		panic(e)
	}
}

func main() {

	// Para comenzar, aquí vemos cómo volcar una cadena (o simplemente
	// bytes) dentro de un archivo.
	d1 := []byte("hello\ngo\n")
	path1 := filepath.Join(os.TempDir(), "dat1")
	err := os.WriteFile(path1, d1, 0644)
	check(err)

	// Para escrituras más granulares, abre un archivo para escritura con `os.Create`.
	path2 := filepath.Join(os.TempDir(), "dat2")
	f, err := os.Create(path2)
	check(err)

	// Es idiomático posponer el `Close` mediante `defer` inmediatamente
	// después de abrir un archivo.
	defer f.Close()

	// Puedes escribir slices de bytes con `Write` como se espera.
	d2 := []byte{115, 111, 109, 101, 10}
	n2, err := f.Write(d2)
	check(err)
	fmt.Printf("wrote %d bytes\n", n2)

	// La función `WriteString` también se encuentra disponible.
	n3, err := f.WriteString("writes\n")
	check(err)
	fmt.Printf("wrote %d bytes\n", n3)

	// Ejecuta un `Sync` para descargar y asegurar las escrituras en almacenamiento persistente.
	f.Sync()

	// `bufio` provee escritores con búfer además
	// de los lectores con búfer que vimos anteriormente.
	w := bufio.NewWriter(f)
	n4, err := w.WriteString("buffered\n")
	check(err)
	fmt.Printf("wrote %d bytes\n", n4)

	// Usa `Flush` para asegurar que todas las operaciones en búfer hayan
	// sido aplicadas al escritor subyacente.
	w.Flush()

}
