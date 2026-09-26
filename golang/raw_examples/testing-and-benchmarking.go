// Las pruebas unitarias son una parte indispensable al escribir
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
