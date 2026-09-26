// El paquete `filepath` proporciona funciones para parsear
// y construir *rutas de archivos* de forma completamente portable
// entre sistemas operativos; por ejemplo, `dir/file` en Linux frente
// a `dir\file` en Windows.
package main

import (
	"fmt"
	"path/filepath"
	"strings"
)

func main() {

	// `Join` debe utilizarse para construir rutas de forma
	// portable. Recibe cualquier número de argumentos
	// y construye una ruta jerárquica a partir de ellos.
	p := filepath.Join("dir1", "dir2", "filename")
	fmt.Println("p:", p)

	// Siempre debes utilizar `Join` en vez de concatenar
	// `/` o `\` manualmente. Además de brindar portabilidad,
	// `Join` normaliza las rutas eliminando separadores superfluos
	// y cambios de directorio redundantes.
	fmt.Println(filepath.Join("dir1//", "filename"))
	fmt.Println(filepath.Join("dir1/../dir1", "filename"))

	// `Dir` y `Base` pueden usarse para separar la ruta del
	// directorio y el archivo. Como alternativa, `Split`
	// devolverá ambos componentes en una sola llamada.
	fmt.Println("Dir(p):", filepath.Dir(p))
	fmt.Println("Base(p):", filepath.Base(p))

	// Podemos verificar si una ruta es absoluta.
	fmt.Println(filepath.IsAbs("dir/file"))
	fmt.Println(filepath.IsAbs("/dir/file"))

	filename := "config.json"

	// Algunos nombres de archivo tienen extensiones tras un punto.
	// Podemos separar la extensión de dichos nombres mediante `Ext`.
	ext := filepath.Ext(filename)
	fmt.Println(ext)

	// Para obtener el nombre del archivo sin su extensión,
	// utiliza `strings.TrimSuffix`.
	fmt.Println(strings.TrimSuffix(filename, ext))

	// `Rel` encuentra una ruta relativa entre una ruta *base* y un
	// *objetivo*. Devuelve un error si el objetivo no puede hacerse
	// relativo respecto a la base.
	rel, err := filepath.Rel("a/b", "a/b/t/file")
	if err != nil {
		panic(err)
	}
	fmt.Println(rel)

	rel, err = filepath.Rel("a/b", "a/c/t/file")
	if err != nil {
		panic(err)
	}
	fmt.Println(rel)
}
