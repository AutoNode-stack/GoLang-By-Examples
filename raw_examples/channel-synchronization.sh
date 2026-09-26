$ go run channel-synchronization.go      
working...done                  

# Si eliminaras la línea `<- done` de este programa,
# el programa podría terminar antes de que el `worker` finalizara
# su trabajo, o en algunos casos incluso antes de que comenzara.
