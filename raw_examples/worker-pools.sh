# El programa en ejecución muestra las 5 tareas siendo procesadas por
# diversos trabajadores concurrentes. El programa toma únicamente unos 2 segundos
# a pesar de realizar 5 segundos de trabajo total acumulado, ya que
# hay 3 trabajadores operando de manera simultánea.
$ time go run worker-pools.go 
worker 1 started  job 1
worker 2 started  job 2
worker 3 started  job 3
worker 1 finished job 1
worker 1 started  job 4
worker 2 finished job 2
worker 2 started  job 5
worker 3 finished job 3
worker 1 finished job 4
worker 2 finished job 5

real	0m2.358s
