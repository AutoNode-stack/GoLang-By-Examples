// El paquete `math/rand/v2` de Go proporciona generación de
// [números pseudoaleatorios](https://en.wikipedia.org/wiki/Pseudorandom_number_generator).

package main

import (
	"fmt"
	"math/rand/v2"
)

func main() {

	// Por ejemplo, `rand.IntN` devuelve un entero aleatorio `n`,
	// donde `0 <= n < 100`.
	fmt.Print(rand.IntN(100), ",")
	fmt.Print(rand.IntN(100))
	fmt.Println()

	// `rand.Float64` devuelve un flotante `f` de tipo `float64`,
	// tal que `0.0 <= f < 1.0`.
	fmt.Println(rand.Float64())

	// Esto puede emplearse para generar números flotantes aleatorios en
	// otros rangos, por ejemplo `5.0 <= f' < 10.0`.
	fmt.Print((rand.Float64()*5)+5, ",")
	fmt.Print((rand.Float64() * 5) + 5)
	fmt.Println()

	// Si deseas una semilla fija predecible, crea un nuevo
	// `rand.Source` y pásalo al constructor `New`. `NewPCG` genera una nueva
	// fuente [PCG](https://en.wikipedia.org/wiki/Permuted_congruential_generator)
	// que requiere una semilla compuesta por dos números `uint64`.
	s2 := rand.NewPCG(42, 1024)
	r2 := rand.New(s2)
	fmt.Print(r2.IntN(100), ",")
	fmt.Print(r2.IntN(100))
	fmt.Println()

	s3 := rand.NewPCG(42, 1024)
	r3 := rand.New(s3)
	fmt.Print(r3.IntN(100), ",")
	fmt.Print(r3.IntN(100))
	fmt.Println()
}
