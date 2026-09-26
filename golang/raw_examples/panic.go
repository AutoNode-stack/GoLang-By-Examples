// Un `panic` suele significar que algo salió inesperadamente
// mal. Principalmente lo usamos para fallar rápidamente (fail-fast) ante errores
// que no deberían ocurrir durante la operación normal, o que no
// estamos preparados para manejar de forma elegante.

package main

import (
	"os"
	"path/filepath"
)

func main() {

	// Usaremos panic a lo largo de este sitio para comprobar
	// errores inesperados. Este es el único programa del
	// sitio diseñado para disparar un panic intencionadamente.
	panic("a problem")

	// Un uso común de panic es abortar si una función
	// devuelve un valor de error que no sabemos (o no deseamos)
	// manejar. Aquí tenemos un ejemplo de
	// disparar `panic` si ocurre un error inesperado al crear un archivo nuevo.
	path := filepath.Join(os.TempDir(), "file")
	_, err := os.Create(path)
	if err != nil {
		panic(err)
	}
}
