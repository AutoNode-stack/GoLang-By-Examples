// Algunas herramientas de línea de comandos, como la herramienta `go` o `git`,
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
