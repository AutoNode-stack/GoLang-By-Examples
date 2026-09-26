// Go cuenta con varias funciones útiles para trabajar con
// *directorios* en el sistema de archivos.

package main

import (
	"fmt"
	"io/fs"
	"os"
	"path/filepath"
)

func check(e error) {
	if e != nil {
		panic(e)
	}
}

func main() {

	// Crea un nuevo subdirectorio en el directorio de trabajo
	// actual.
	err := os.Mkdir("subdir", 0755)
	check(err)

	// Al crear directorios temporales o de prueba, es buena
	// práctica posponer (`defer`) su eliminación. `os.RemoveAll`
	// eliminará un árbol completo de directorios (similar a `rm -rf`).
	defer os.RemoveAll("subdir")

	// Función auxiliar para crear un archivo vacío nuevo.
	createEmptyFile := func(name string) {
		d := []byte("")
		check(os.WriteFile(name, d, 0644))
	}

	createEmptyFile("subdir/file1")

	// Podemos crear una jerarquía completa de directorios, incluyendo
	// los padres faltantes con `MkdirAll` (similar a `mkdir -p` en la terminal).
	err = os.MkdirAll("subdir/parent/child", 0755)
	check(err)

	createEmptyFile("subdir/parent/file2")
	createEmptyFile("subdir/parent/file3")
	createEmptyFile("subdir/parent/child/file4")

	// `ReadDir` lista el contenido de un directorio, devolviendo
	// un slice de objetos `os.DirEntry`.
	c, err := os.ReadDir("subdir/parent")
	check(err)

	fmt.Println("Listing subdir/parent")
	for _, entry := range c {
		fmt.Println(" ", entry.Name(), entry.IsDir())
	}

	// `Chdir` nos permite cambiar el directorio de trabajo actual,
	// de manera similar al comando `cd`.
	err = os.Chdir("subdir/parent/child")
	check(err)

	// Ahora veremos el contenido de `subdir/parent/child`
	// al listar el directorio *actual*.
	c, err = os.ReadDir(".")
	check(err)

	fmt.Println("Listing subdir/parent/child")
	for _, entry := range c {
		fmt.Println(" ", entry.Name(), entry.IsDir())
	}

	// Regresamos mediante `cd` al punto de partida.
	err = os.Chdir("../../..")
	check(err)

	// También podemos recorrer un directorio de forma *recursiva*,
	// incluyendo todos sus subdirectorios. `WalkDir` acepta
	// una función de retorno (callback) para procesar cada archivo o directorio visitado.
	fmt.Println("Visiting subdir")
	err = filepath.WalkDir("subdir", visit)
	check(err)
}

// `visit` es invocada por cada archivo o directorio hallado
// recursivamente mediante `filepath.WalkDir`.
func visit(path string, d fs.DirEntry, err error) error {
	if err != nil {
		return err
	}
	fmt.Println(" ", path, d.IsDir())
	return nil
}
