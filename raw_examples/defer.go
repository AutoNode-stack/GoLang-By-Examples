// _Defer_ se utiliza para asegurar que una llamada a función se
// ejecute más adelante en la ejecución del programa, generalmente con
// fines de limpieza y liberación de recursos. `defer` se utiliza frecuentemente
// donde en otros lenguajes se emplearían `ensure` o `finally`.

package main

import (
	"fmt"
	"os"
	"path/filepath"
)

// Supongamos que deseamos crear un archivo, escribir en él
// y luego cerrarlo cuando hayamos concluido. Así es como
// podríamos lograrlo con `defer`.
func main() {

	// Inmediatamente después de obtener un objeto de archivo con
	// `createFile`, posponemos el cierre de dicho archivo
	// mediante `closeFile`. Esto se ejecutará al término
	// de la función contenedora (`main`), una vez que
	// `writeFile` haya concluido.
	path := filepath.Join(os.TempDir(), "defer.txt")
	f := createFile(path)
	defer closeFile(f)
	writeFile(f)
}

func createFile(p string) *os.File {
	fmt.Println("creating")
	f, err := os.Create(p)
	if err != nil {
		panic(err)
	}
	return f
}

func writeFile(f *os.File) {
	fmt.Println("writing")
	fmt.Fprintln(f, "data")
}

func closeFile(f *os.File) {
	fmt.Println("closing")
	err := f.Close()
	// Es fundamental verificar si ocurrieron errores al cerrar un
	// archivo, incluso dentro de una función pospuesta con defer.
	if err != nil {
		panic(err)
	}
}
