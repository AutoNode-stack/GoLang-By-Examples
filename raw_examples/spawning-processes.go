// En ocasiones nuestros programas en Go necesitan iniciar y controlar otros
// procesos del sistema operativo.

package main

import (
	"errors"
	"fmt"
	"io"
	"os/exec"
)

func main() {

	// Comenzaremos con un comando simple que no toma
	// argumentos ni entrada y solo imprime información en
	// stdout. El asistente `exec.Command` crea un objeto
	// para representar este proceso externo.
	dateCmd := exec.Command("date")

	// El método `Output` ejecuta el comando, espera a que
	// finalice y recopila su salida estándar.
	// Si no hubo errores, `dateOut` contendrá los bytes
	// con la información de la fecha.
	dateOut, err := dateCmd.Output()
	if err != nil {
		panic(err)
	}
	fmt.Println("> date")
	fmt.Println(string(dateOut))

	// `Output` y otros métodos de `Command` devolverán
	// `*exec.Error` si hubo un problema al ejecutar el
	// comando (por ejemplo, ruta incorrecta), y `*exec.ExitError`
	// si el comando se ejecutó pero finalizó con un código de retorno
	// distinto de cero.
	_, err = exec.Command("date", "-x").Output()
	if err != nil {
		if e, ok := errors.AsType[*exec.Error](err); ok {
			fmt.Println("failed executing:", e)
		} else if e, ok := errors.AsType[*exec.ExitError](err); ok {
			exitCode := e.ExitCode()
			fmt.Println("command exit rc =", exitCode)
		} else {
			panic(err)
		}
	}

	// A continuación veremos un caso un poco más elaborado
	// donde canalizamos datos al proceso externo en su entrada
	// `stdin` y recopilamos los resultados de su salida `stdout`.
	grepCmd := exec.Command("grep", "hello")

	// Aquí capturamos explícitamente las tuberías de entrada/salida, iniciamos
	// el proceso, le escribimos datos de entrada, leemos la
	// salida resultante y finalmente esperamos a que el proceso
	// termine.
	grepIn, _ := grepCmd.StdinPipe()
	grepOut, _ := grepCmd.StdoutPipe()
	grepCmd.Start()
	grepIn.Write([]byte("hello grep\ngoodbye grep"))
	grepIn.Close()
	grepBytes, _ := io.ReadAll(grepOut)
	grepCmd.Wait()

	// Omitimos comprobaciones exhaustivas de error en el ejemplo anterior, pero
	// puedes usar el patrón habitual `if err != nil` para
	// todas ellas. También solo recopilamos los resultados de `StdoutPipe`,
	// pero podrías recopilar los de `StderrPipe` de la misma manera.
	fmt.Println("> grep hello")
	fmt.Println(string(grepBytes))

	// Ten en cuenta que al lanzar comandos debemos
	// proporcionar un array explícito del comando y sus
	// argumentos, en lugar de pasar una sola cadena continua. Si
	// deseas ejecutar un comando completo mediante una cadena, puedes usar
	// la opción `-c` de `bash`:
	lsCmd := exec.Command("bash", "-c", "ls -a -l -h")
	lsOut, err := lsCmd.Output()
	if err != nil {
		panic(err)
	}
	fmt.Println("> ls -a -l -h")
	fmt.Println(string(lsOut))
}
