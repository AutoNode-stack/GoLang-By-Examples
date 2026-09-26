// Durante la ejecución de un programa, a menudo deseamos crear
// datos que no se requieren una vez que el programa concluye.
// Los *archivos y directorios temporales* resultan idóneos para este
// propósito, ya que no ensucian el sistema de archivos con el paso del
// tiempo.

package main

import (
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

	// La forma más directa de crear un archivo temporal es invocando
	// `os.CreateTemp`. Crea un archivo *y* lo abre para
	// lectura y escritura. Proporcionamos `""` como primer argumento
	// para que `os.CreateTemp` cree el archivo en la ubicación
	// predeterminada del sistema operativo (por ejemplo `/tmp` en Unix).
	f, err := os.CreateTemp("", "sample")
	check(err)

	// Muestra el nombre del archivo temporal. En sistemas basados
	// en Unix el directorio suele ser `/tmp`. El nombre del archivo
	// inicia con el prefijo indicado como segundo argumento y el resto
	// se genera automáticamente para garantizar unicidad ante accesos concurrentes.
	fmt.Println("Temp file name:", f.Name())

	// Limpiamos el archivo una vez que terminamos. El sistema operativo
	// eventualmente limpia los temporales, pero es una buena práctica
	// hacerlo explícitamente con `defer`.
	defer os.Remove(f.Name())

	// Podemos escribir datos en el archivo temporal.
	_, err = f.Write([]byte{1, 2, 3, 4})
	check(err)

	// Si tenemos la intención de escribir múltiples archivos temporales,
	// es preferible crear un *directorio* temporal. Los argumentos de
	// `os.MkdirTemp` son iguales a los de `CreateTemp`, pero retorna el
	// *nombre* del directorio en lugar de un archivo abierto.
	dname, err := os.MkdirTemp("", "sampledir")
	check(err)
	fmt.Println("Temp dir name:", dname)

	defer os.RemoveAll(dname)

	// Ahora podemos componer nombres de archivos temporales
	// anteponiendo la ruta de nuestro directorio temporal.
	fname := filepath.Join(dname, "file1")
	err = os.WriteFile(fname, []byte{1, 2}, 0666)
	check(err)
}
