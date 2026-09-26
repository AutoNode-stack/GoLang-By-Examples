// En el ejemplo anterior revisamos cómo
// [iniciar subprocesos externos](spawning-processes). Hacemos esto
// cuando necesitamos un proceso externo accesible a un proceso Go
// en ejecución. A veces simplemente deseamos reemplazar
// por completo el proceso Go actual por otro (quizás no escrito en Go).
// Para lograrlo utilizaremos la implementación en Go de la clásica
// función <a href="https://en.wikipedia.org/wiki/Exec_(operating_system)"><code>exec</code></a>.

package main

import (
	"os"
	"os/exec"
	"syscall"
)

func main() {

	// Para nuestro ejemplo ejecutaremos `ls`. Go requiere una
	// ruta absoluta al binario que deseamos ejecutar, por lo que
	// usaremos `exec.LookPath` para localizarlo (probablemente `/bin/ls`).
	binary, lookErr := exec.LookPath("ls")
	if lookErr != nil {
		panic(lookErr)
	}

	// `Exec` requiere argumentos en forma de slice (a diferencia
	// de una única cadena grande). Le pasaremos a `ls` varios
	// argumentos comunes. Ten en cuenta que el primer argumento debe
	// ser el nombre del programa mismo.
	args := []string{"ls", "-a", "-l", "-h"}

	// `Exec` también necesita un conjunto de [variables de entorno](environment-variables)
	// a utilizar. Aquí simplemente proporcionamos nuestro
	// entorno actual.
	env := os.Environ()

	// Aquí se realiza la llamada real a `syscall.Exec`. Si esta llamada tiene
	// éxito, la ejecución de nuestro proceso terminará aquí
	// y será reemplazada por el proceso `/bin/ls -a -l -h`.
	// Si ocurre un error recibiremos un valor de retorno.
	execErr := syscall.Exec(binary, args, env)
	if execErr != nil {
		panic(execErr)
	}
}
