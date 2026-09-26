# -*- coding: utf-8 -*-
import os

TOPICS_G5 = {
    "number-parsing": {
        "go": """// El parseo de números a partir de cadenas de texto es una tarea básica pero frecuente
// en muchos programas; aquí veremos cómo llevarla a cabo en Go.

package main

// El paquete integrado `strconv` provee las funciones para
// parsear números.
import (
	"fmt"
	"strconv"
)

func main() {

	// Con `ParseFloat`, este `64` indica cuántos bits de
	// precisión se deben utilizar para el parseo.
	f, _ := strconv.ParseFloat("1.234", 64)
	fmt.Println(f)

	// Para `ParseInt`, el `0` indica inferir la base numérica a partir
	// de la cadena. `64` exige que el resultado quepa en 64
	// bits.
	i, _ := strconv.ParseInt("123", 0, 64)
	fmt.Println(i)

	// `ParseInt` reconocerá números con formato hexadecimal.
	d, _ := strconv.ParseInt("0x1c8", 0, 64)
	fmt.Println(d)

	// También existe la función `ParseUint` para enteros sin signo.
	u, _ := strconv.ParseUint("789", 0, 64)
	fmt.Println(u)

	// `Atoi` es una función de conveniencia para el parseo básico de enteros
	// en base 10 (`int`).
	k, _ := strconv.Atoi("135")
	fmt.Println(k)

	// Las funciones de parseo devuelven un error cuando reciben entradas no válidas.
	_, e := strconv.Atoi("wat")
	fmt.Println(e)
}
""",
        "sh": """$ go run number-parsing.go 
1.234
123
456
789
135
strconv.ParseInt: parsing "wat": invalid syntax

# A continuación veremos otra tarea habitual de parseo: las URLs.
"""
    },

    "url-parsing": {
        "go": """// Las URLs proporcionan una [forma uniforme de localizar recursos](https://adam.herokuapp.com/past/2010/3/30/urls_are_the_uniform_way_to_locate_resources/).
// Aquí veremos cómo parsear URLs en Go.

package main

import (
	"fmt"
	"net"
	"net/url"
)

func main() {

	// Parsearemos esta URL de ejemplo, la cual incluye
	// esquema, credenciales de autenticación, host, puerto, ruta,
	// parámetros de consulta y fragmento.
	s := "postgres://user:pass@host.com:5432/path?k=v#f"

	// Parseamos la URL y aseguramos que no contenga errores.
	u, err := url.Parse(s)
	if err != nil {
		panic(err)
	}

	// Acceder al esquema es directo.
	fmt.Println(u.Scheme)

	// `User` contiene toda la información de autenticación; invoca
	// `Username` y `Password` sobre él para obtener los valores individuales.
	fmt.Println(u.User)
	fmt.Println(u.User.Username())
	p, _ := u.User.Password()
	fmt.Println(p)

	// `Host` contiene tanto el nombre del host como el puerto,
	// si están presentes. Usa `SplitHostPort` para extraerlos por separado.
	fmt.Println(u.Host)
	host, port, _ := net.SplitHostPort(u.Host)
	fmt.Println(host)
	fmt.Println(port)

	// Aquí extraemos la ruta (`path`) y el fragmento posterior
	// al símbolo `#`.
	fmt.Println(u.Path)
	fmt.Println(u.Fragment)

	// Para obtener los parámetros de consulta en una cadena con formato `k=v`,
	// usa `RawQuery`. También puedes parsear los parámetros
	// hacia un mapa. Los mapas de parámetros resultantes van de
	// cadenas a slices de cadenas, por lo que accede a `[0]`
	// si solo necesitas el primer valor.
	fmt.Println(u.RawQuery)
	m, _ := url.ParseQuery(u.RawQuery)
	fmt.Println(m)
	fmt.Println(m["k"][0])
}
""",
        "sh": """# Ejecutar nuestro programa de parseo de URLs muestra todas las
# partes individuales que logramos extraer.
$ go run url-parsing.go 
postgres
user:pass
user
pass
host.com:5432
host.com
5432
/path
f
k=v
map[k:[v]]
v
"""
    },

    "sha256-hashes": {
        "go": """// Los [_hashes SHA256_](https://en.wikipedia.org/wiki/SHA-2) se utilizan
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
	fmt.Printf("%x\\n", bs)
}
""",
        "sh": """# Ejecutar el programa calcula el hash y lo imprime en
# un formato hexadecimal legible para humanos.
$ go run sha256-hashes.go
sha256 this string
1af1dfa857bf1d8814fe1af8983c18080019922e557f15a8a...

# Puedes calcular otros hashes empleando un patrón muy similar
# al mostrado arriba. Por ejemplo, para calcular hashes
# SHA512 importa `crypto/sha512` y utiliza
# `sha512.New()`.

# Ten en cuenta que si requieres hashes criptográficamente seguros,
# debes investigar cuidadosamente la
# [fortaleza del algoritmo](https://en.wikipedia.org/wiki/Cryptographic_hash_function).
"""
    },

    "base64-encoding": {
        "go": """// Go provee soporte integrado para la
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
""",
        "sh": """# La cadena se codifica con valores ligeramente distintos entre los
# codificadores estándar y de URL (signo `+` frente a `-` al final),
# pero ambos decodifican a la cadena original según lo esperado.
$ go run base64-encoding.go
YWJjMTIzIT8kKiYoKSctPUB+
abc123!?$*&()'-=@~

YWJjMTIzIT8kKiYoKSctPUB-
abc123!?$*&()'-=@~
"""
    },

    "reading-files": {
        "go": """// Leer y escribir archivos son tareas fundamentales para
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
	fmt.Printf("%d bytes: %s\\n", n1, string(b1[:n1]))

	// También puedes posicionarte con `Seek` en una ubicación conocida del archivo
	// y leer desde allí.
	o2, err := f.Seek(6, io.SeekStart)
	check(err)
	b2 := make([]byte, 2)
	n2, err := f.Read(b2)
	check(err)
	fmt.Printf("%d bytes @ %d: ", n2, o2)
	fmt.Printf("%v\\n", string(b2[:n2]))

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
	fmt.Printf("%d bytes @ %d: %s\\n", n3, o3, string(b3))

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
	fmt.Printf("5 bytes: %s\\n", string(b4))

	// Cierra el archivo al concluir (habitualmente esto se
	// programaría inmediatamente tras `Open` mediante `defer`).
	f.Close()
}
""",
        "sh": """$ echo "hello" > /tmp/dat
$ echo "go" >>   /tmp/dat
$ go run reading-files.go
hello
go
5 bytes: hello
2 bytes @ 6: go
2 bytes @ 6: go
5 bytes: hello

# A continuación veremos la escritura de archivos.
"""
    },

    "writing-files": {
        "go": """// Escribir archivos en Go sigue patrones análogos a los
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
	d1 := []byte("hello\\ngo\\n")
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
	fmt.Printf("wrote %d bytes\\n", n2)

	// La función `WriteString` también se encuentra disponible.
	n3, err := f.WriteString("writes\\n")
	check(err)
	fmt.Printf("wrote %d bytes\\n", n3)

	// Ejecuta un `Sync` para descargar y asegurar las escrituras en almacenamiento persistente.
	f.Sync()

	// `bufio` provee escritores con búfer además
	// de los lectores con búfer que vimos anteriormente.
	w := bufio.NewWriter(f)
	n4, err := w.WriteString("buffered\\n")
	check(err)
	fmt.Printf("wrote %d bytes\\n", n4)

	// Usa `Flush` para asegurar que todas las operaciones en búfer hayan
	// sido aplicadas al escritor subyacente.
	w.Flush()

}
""",
        "sh": """# Prueba a ejecutar el código de escritura de archivos.
$ go run writing-files.go 
wrote 5 bytes
wrote 7 bytes
wrote 9 bytes

# Luego comprueba el contenido de los archivos creados.
$ cat /tmp/dat1
hello
go
$ cat /tmp/dat2
some
writes
buffered

# A continuación veremos cómo aplicar estas ideas de E/S de archivos
# a los flujos de entrada y salida estándar `stdin` y `stdout`.
"""
    },

    "line-filters": {
        "go": """// Un _filtro de línea_ es un tipo de programa común que lee
// entradas desde stdin, las procesa y luego imprime algún
// resultado derivado en stdout. `grep` y `sed` son filtros
// de línea habituales.

// Aquí tenemos un ejemplo de filtro de línea en Go que escribe en
// mayúsculas todo el texto de entrada. Puedes utilizar este patrón
// para escribir tus propios filtros de línea en Go.
package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {

	// Envolver el flujo sin búfer `os.Stdin` con un scanner con
	// búfer nos proporciona un método conveniente `Scan` que
	// avanza el scanner al siguiente token (la siguiente línea por defecto).
	scanner := bufio.NewScanner(os.Stdin)

	for scanner.Scan() {
		// `Text` devuelve el token actual (aquí la línea siguiente)
		// proveniente de la entrada.
		ucl := strings.ToUpper(scanner.Text())

		// Escribe la línea convertida a mayúsculas.
		fmt.Println(ucl)
	}

	// Comprobamos si ocurrieron errores durante `Scan`. El fin de archivo (EOF)
	// es esperado y `Scan` no lo reporta como un error.
	if err := scanner.Err(); err != nil {
		fmt.Fprintln(os.Stderr, "error:", err)
		os.Exit(1)
	}
}
""",
        "sh": """# Para probar nuestro filtro de línea, primero creamos un archivo con unas
# pocas líneas en minúsculas.
$ echo 'hello'   > /tmp/lines
$ echo 'filter' >> /tmp/lines

# Luego usamos el filtro de línea para obtener las líneas en mayúsculas.
$ cat /tmp/lines | go run line-filters.go
HELLO
FILTER
"""
    },

    "file-paths": {
        "go": """// El paquete `filepath` proporciona funciones para parsear
// y construir *rutas de archivos* de forma completamente portable
// entre sistemas operativos; por ejemplo, `dir/file` en Linux frente
// a `dir\\file` en Windows.
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
	// `/` o `\\` manualmente. Además de brindar portabilidad,
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
""",
        "sh": None
    },

    "directories": {
        "go": """// Go cuenta con varias funciones útiles para trabajar con
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
""",
        "sh": None
    },

    "temporary-files-and-directories": {
        "go": """// Durante la ejecución de un programa, a menudo deseamos crear
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
""",
        "sh": None
    },

    "embed-directive": {
        "go": """// `//go:embed` es una [directiva del
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
""",
        "sh": """# Utiliza estos comandos para ejecutar el ejemplo.
# (Nota: debido a limitaciones en Go Playground, este ejemplo
# solo puede ejecutarse en tu máquina local).
$ mkdir -p folder
$ echo "hello go" > folder/single_file.txt
$ echo "123" > folder/file1.hash
$ echo "456" > folder/file2.hash

$ go run embed-directive.go
hello go
hello go
123
456
"""
    },

    "testing-and-benchmarking": {
        "go": """// Las pruebas unitarias son una parte indispensable al escribir
// programas robustos en Go. El paquete `testing`
// proporciona las herramientas necesarias para escribir pruebas unitarias
// y el comando `go test` se encarga de ejecutarlas.

// A modo de demostración, este código se encuentra en el paquete
// `main`, pero podría residir en cualquiera. El código de pruebas
// típicamente vive en el mismo paquete que el código que evalúa.
package main

import (
	"fmt"
	"testing"
)

// Evaluaremos esta sencilla implementación del mínimo entre dos
// números enteros. Típicamente, el código a probar residiría en un
// archivo fuente llamado `intutils.go`, y su archivo de pruebas
// correspondiente se llamaría `intutils_test.go`.
func IntMin(a, b int) int {
	if a < b {
		return a
	}
	return b
}

// Una prueba se crea escribiendo una función cuyo nombre
// comienza con el prefijo `Test`.
func TestIntMinBasic(t *testing.T) {
	ans := IntMin(2, -2)
	if ans != -2 {
		// `t.Error*` reportará fallos en la prueba pero continuará
		// la ejecución. `t.Fatal*` reportará fallos y detendrá
		// la prueba inmediatamente.
		t.Errorf("IntMin(2, -2) = %d; want -2", ans)
	}
}

// Escribir pruebas individuales puede ser repetitivo, por lo que es idiomático
// usar un *estilo basado en tablas* (table-driven tests), donde las entradas y
// salidas esperadas se declaran en una tabla y un único bucle
// las recorre ejecutando la lógica de prueba.
func TestIntMinTableDriven(t *testing.T) {
	var tests = []struct {
		a, b int
		want int
	}{
		{0, 1, 0},
		{1, 0, 0},
		{2, -2, -2},
		{0, -1, -1},
		{-1, 0, -1},
	}

	for _, tt := range tests {
		// `t.Run` permite ejecutar "subpruebas", una por cada
		// fila de la tabla. Estas se muestran de forma independiente
		// al ejecutar `go test -v`.
		testname := fmt.Sprintf("%d,%d", tt.a, tt.b)
		t.Run(testname, func(t *testing.T) {
			ans := IntMin(tt.a, tt.b)
			if ans != tt.want {
				t.Errorf("got %d, want %d", ans, tt.want)
			}
		})
	}
}

// Las pruebas de benchmarking suelen ir en archivos `_test.go` y sus
// nombres inician con el prefijo `Benchmark`.
// Cualquier código requerido para preparar el benchmark pero que no deba
// medirse se ubica antes de este bucle.
func BenchmarkIntMin(b *testing.B) {
	for b.Loop() {
		// El ejecutor de benchmarks repetirá este cuerpo de bucle
		// muchas veces automáticamente para determinar una estimación precisa
		// del tiempo de ejecución de una sola iteración.
		IntMin(1, 2)
	}
}
""",
        "sh": """# Ejecuta todas las pruebas del proyecto actual en modo detallado (verbose).
$ go test -v
=== RUN   TestIntMinBasic
--- PASS: TestIntMinBasic (0.00s)
=== RUN   TestIntMinTableDriven
=== RUN   TestIntMinTableDriven/0,1
=== RUN   TestIntMinTableDriven/1,0
=== RUN   TestIntMinTableDriven/2,-2
=== RUN   TestIntMinTableDriven/0,-1
=== RUN   TestIntMinTableDriven/-1,0
--- PASS: TestIntMinTableDriven (0.00s)
    --- PASS: TestIntMinTableDriven/0,1 (0.00s)
    --- PASS: TestIntMinTableDriven/1,0 (0.00s)
    --- PASS: TestIntMinTableDriven/2,-2 (0.00s)
    --- PASS: TestIntMinTableDriven/0,-1 (0.00s)
    --- PASS: TestIntMinTableDriven/-1,0 (0.00s)
PASS
ok  	examples/testing-and-benchmarking	0.023s

# Ejecuta todos los benchmarks del proyecto actual. Todas las pruebas
# se ejecutan previamente a los benchmarks. La bandera `bench` filtra
# las funciones de benchmark con una expresión regular.
$ go test -bench=.
goos: darwin
goarch: arm64
pkg: examples/testing
BenchmarkIntMin-8 1000000000 0.3136 ns/op
PASS
ok  	examples/testing-and-benchmarking	0.351s
"""
    },

    "command-line-arguments": {
        "go": """// Los [_argumentos de línea de comandos_](https://en.wikipedia.org/wiki/Command-line_interface#Arguments)
// son una forma habitual de parametrizar la ejecución de programas.
// Por ejemplo, `go run hello.go` utiliza `run` y
// `hello.go` como argumentos para el ejecutable `go`.

package main

import (
	"fmt"
	"os"
)

func main() {

	// `os.Args` proporciona acceso directo a los argumentos de línea de comandos
	// originales. Ten en cuenta que el primer valor en este slice
	// corresponde a la ruta del programa, mientras que `os.Args[1:]`
	// contiene los argumentos pasados al programa.
	argsWithProg := os.Args
	argsWithoutProg := os.Args[1:]

	// Puedes acceder a argumentos individuales mediante la indexación habitual.
	arg := os.Args[3]

	fmt.Println(argsWithProg)
	fmt.Println(argsWithoutProg)
	fmt.Println(arg)
}
""",
        "sh": """# Para experimentar con argumentos de línea de comandos es mejor
# construir un binario con `go build` primero.
$ go build command-line-arguments.go
$ ./command-line-arguments a b c d
[./command-line-arguments a b c d]       
[a b c d]
c

# A continuación veremos el procesamiento avanzado de opciones de línea
# de comandos con banderas (flags).
"""
    },

    "command-line-flags": {
        "go": """// Las [_banderas de línea de comandos_](https://en.wikipedia.org/wiki/Command-line_interface#Command-line_option) (flags)
// son una forma estándar de especificar opciones en programas de consola.
// Por ejemplo, en `wc -l`, `-l` es una bandera de línea de comandos.

package main

// Go provee el paquete `flag` que admite el parseo básico
// de banderas de línea de comandos. Usaremos este paquete para
// implementar nuestro programa de ejemplo.
import (
	"flag"
	"fmt"
)

func main() {

	// Las declaraciones básicas de banderas están disponibles para opciones de
	// tipo string, integer y boolean. Aquí declaramos una bandera
	// de cadena `word` con valor predeterminado `"foo"` y una breve
	// descripción. Esta función `flag.String` retorna un puntero a string
	// (no un valor string directo); veremos cómo utilizar este puntero abajo.
	wordPtr := flag.String("word", "foo", "a string")

	// Esto declara las banderas `numb` y `fork`, siguiendo un
	// enfoque similar al de la bandera `word`.
	numbPtr := flag.Int("numb", 42, "an int")
	forkPtr := flag.Bool("fork", false, "a bool")

	// También es posible declarar una opción que utilice una variable
	// preexistente declarada en otra parte del programa. Nota que
	// debemos pasar un puntero a la función de declaración de la bandera.
	var svar string
	flag.StringVar(&svar, "svar", "bar", "a string var")

	// Una vez declaradas todas las banderas, invocamos `flag.Parse()`
	// para ejecutar el análisis sintáctico de la línea de comandos.
	flag.Parse()

	// Aquí simplemente volcamos las opciones parseadas y los
	// argumentos posicionales finales restantes. Ten en cuenta que
	// debemos desreferenciar los punteros mediante `*wordPtr` para
	// obtener los valores reales de las opciones.
	fmt.Println("word:", *wordPtr)
	fmt.Println("numb:", *numbPtr)
	fmt.Println("fork:", *forkPtr)
	fmt.Println("svar:", svar)
	fmt.Println("tail:", flag.Args())
}
""",
        "sh": """# Para experimentar con el programa de banderas de línea de comandos es
# recomendable compilarlo primero y luego ejecutar directamente el binario resultante.
$ go build command-line-flags.go

# Prueba el programa compilado pasándole valores para todas las banderas.
$ ./command-line-flags -word=opt -numb=7 -fork -svar=flag
word: opt
numb: 7
fork: true
svar: flag
tail: []

# Ten en cuenta que si omites banderas, estas tomarán automáticamente
# sus valores predeterminados.
$ ./command-line-flags -word=opt
word: opt
numb: 42
fork: false
svar: bar
tail: []

# Los argumentos posicionales adicionales pueden proporcionarse después
# de cualquier bandera.
$ ./command-line-flags -word=opt a1 a2 a3
word: opt
...
tail: [a1 a2 a3]

# Nota que el paquete `flag` exige que todas las banderas aparezcan
# antes de los argumentos posicionales (de lo contrario las banderas
# posteriores se interpretarán como argumentos posicionales ordinarios).
$ ./command-line-flags -word=opt a1 a2 a3 -numb=7
word: opt
numb: 42
fork: false
svar: bar
tail: [a1 a2 a3 -numb=7]

# Usa las banderas `-h` o `--help` para obtener el texto de ayuda
# generado automáticamente para el programa de línea de comandos.
$ ./command-line-flags -h
Usage of ./command-line-flags:
  -fork=false: a bool
  -numb=42: an int
  -svar="bar": a string var
  -word="foo": a string

# Si ingresas una bandera no registrada en el paquete `flag`,
# el programa imprimirá un mensaje de error y mostrará el texto de ayuda nuevamente.
$ ./command-line-flags -wat
flag provided but not defined: -wat
Usage of ./command-line-flags:
...
"""
    },

    "command-line-subcommands": {
        "go": """// Algunas herramientas de línea de comandos, como la herramienta `go` o `git`,
// tienen múltiples *subcomandos*, cada uno con su propio conjunto de
// banderas. Por ejemplo, `go build` y `go get` son dos subcomandos
// distintos de la herramienta `go`.
// El paquete `flag` nos permite definir fácilmente subcomandos sencillos
// que poseen sus propias banderas individuales.

package main

import (
	"flag"
	"fmt"
	"os"
)

func main() {

	// Declaramos un subcomando utilizando la función `NewFlagSet`
	// y procedemos a definir nuevas banderas específicas para este subcomando.
	fooCmd := flag.NewFlagSet("foo", flag.ExitOnError)
	fooEnable := fooCmd.Bool("enable", false, "enable")
	fooName := fooCmd.String("name", "", "name")

	// Para un subcomando diferente podemos definir banderas
	// compatibles distintas.
	barCmd := flag.NewFlagSet("bar", flag.ExitOnError)
	barLevel := barCmd.Int("level", 0, "level")

	// Se espera el nombre del subcomando como primer argumento
	// del programa.
	if len(os.Args) < 2 {
		fmt.Println("expected 'foo' or 'bar' subcommands")
		os.Exit(1)
	}

	// Comprobamos cuál subcomando fue invocado.
	switch os.Args[1] {

	// Para cada subcomando, parseamos sus propias banderas y
	// tenemos acceso a los argumentos posicionales posteriores.
	case "foo":
		fooCmd.Parse(os.Args[2:])
		fmt.Println("subcommand 'foo'")
		fmt.Println("  enable:", *fooEnable)
		fmt.Println("  name:", *fooName)
		fmt.Println("  tail:", fooCmd.Args())
	case "bar":
		barCmd.Parse(os.Args[2:])
		fmt.Println("subcommand 'bar'")
		fmt.Println("  level:", *barLevel)
		fmt.Println("  tail:", barCmd.Args())
	default:
		fmt.Println("expected 'foo' or 'bar' subcommands")
		os.Exit(1)
	}
}
""",
        "sh": """$ go build command-line-subcommands.go 

# Primero invocamos el subcomando foo.
$ ./command-line-subcommands foo -enable -name=joe a1 a2
subcommand 'foo'
  enable: true
  name: joe
  tail: [a1 a2]

# Ahora probamos con bar.
$ ./command-line-subcommands bar -level 8 a1
subcommand 'bar'
  level: 8
  tail: [a1]

# Pero bar no aceptará las banderas de foo.
$ ./command-line-subcommands bar -enable a1
flag provided but not defined: -enable
Usage of bar:
  -level int
    	level

# A continuación veremos las variables de entorno, otra forma común
# de parametrizar programas.
"""
    }
}

def apply_group5():
    for slug, data in TOPICS_G5.items():
        go_path = f"raw_examples/{slug}.go"
        with open(go_path, "w", encoding="utf-8") as f:
            f.write(data["go"])
        print(f"Updated {go_path}")
        
        if data["sh"] is not None:
            sh_path = f"raw_examples/{slug}.sh"
            with open(sh_path, "w", encoding="utf-8") as f:
                f.write(data["sh"])
            print(f"Updated {sh_path}")

if __name__ == "__main__":
    apply_group5()
