// Leer y escribir archivos son tareas fundamentales para
// la mayoría de programas en Go. Primero revisaremos algunos ejemplos
// de lectura de archivos.

package main

import (
	"bufio"
	"fmt"
	"io"
	"os"
	"path/filepath"
)

// La lectura de archivos requiere comprobar errores en la mayoría de llamadas.
// Esta función auxiliar simplificará nuestras comprobaciones de error a continuación.
func check(e error) {
	if e != nil {
		panic(e)
	}
}

func main() {

	// Quizás la tarea de lectura más básica sea
	// volcar el contenido completo de un archivo directamente en memoria.
	path := filepath.Join(os.TempDir(), "dat")
	dat, err := os.ReadFile(path)
	check(err)
	fmt.Print(string(dat))

	// A menudo desearás un mayor control sobre cómo y qué partes
	// del archivo se leen. Para estas tareas, comienza
	// abriendo el archivo con `os.Open` para obtener un valor `os.File`.
	f, err := os.Open(path)
	check(err)

	// Lee algunos bytes desde el comienzo del archivo.
	// Permitimos leer hasta 5 bytes, pero también registramos cuántos
	// fueron leídos realmente.
	b1 := make([]byte, 5)
	n1, err := f.Read(b1)
	check(err)
	fmt.Printf("%d bytes: %s\n", n1, string(b1[:n1]))

	// También puedes posicionarte con `Seek` en una ubicación conocida del archivo
	// y leer desde allí.
	o2, err := f.Seek(6, io.SeekStart)
	check(err)
	b2 := make([]byte, 2)
	n2, err := f.Read(b2)
	check(err)
	fmt.Printf("%d bytes @ %d: ", n2, o2)
	fmt.Printf("%v\n", string(b2[:n2]))

	// Otros métodos de posicionamiento son relativos a la
	// posición actual del cursor,
	_, err = f.Seek(2, io.SeekCurrent)
	check(err)

	// y relativos al final del archivo.
	_, err = f.Seek(-4, io.SeekEnd)
	check(err)

	// El paquete `io` ofrece algunas funciones muy útiles
	// para la lectura de archivos. Por ejemplo, lecturas como
	// las anteriores pueden implementarse de forma más robusta con `ReadAtLeast`.
	o3, err := f.Seek(6, io.SeekStart)
	check(err)
	b3 := make([]byte, 2)
	n3, err := io.ReadAtLeast(f, b3, 2)
	check(err)
	fmt.Printf("%d bytes @ %d: %s\n", n3, o3, string(b3))

	// No existe una función dedicada para rebobinar, pero
	// `Seek(0, io.SeekStart)` cumple exactamente ese propósito.
	_, err = f.Seek(0, io.SeekStart)
	check(err)

	// El paquete `bufio` implementa un lector con búfer
	// que resulta muy eficiente tanto para lecturas pequeñas múltiples
	// como por los métodos adicionales de lectura que provee.
	r4 := bufio.NewReader(f)
	b4, err := r4.Peek(5)
	check(err)
	fmt.Printf("5 bytes: %s\n", string(b4))

	// Cierra el archivo al concluir (habitualmente esto se
	// programaría inmediatamente tras `Open` mediante `defer`).
	f.Close()
}
