// js/gotchas-interviews.js - Módulo de Niveles Adicionales: Gotchas de Producción y Preguntas de Entrevistas FAANG
// Enriquecimiento pedagógico para Go by Example Pro

(function() {
  const SPECIFIC_DATA = {
    // 1. Fundamentos
    "hello-world": {
      gotchas: [
        {
          title: "Olvidar 'package main' o renombrar la función 'main'",
          codeBad: "package app // Error: el compilador no generará un binario ejecutable\nfunc Main() { ... } // Error: debe ser en minúscula 'main'",
          codeGood: "package main // Requerido para programas ejecutables\nfunc main() {\n    println(\"Hola Go\")\n}",
          explanation: "Go exige que cualquier punto de entrada ejecutable pertenezca obligatoriamente al paquete 'main' y contenga la función 'main()' sin parámetros ni retorno.",
          impact: "Error de compilación: 'function main is undeclared in the main package'."
        }
      ],
      interviews: [
        {
          question: "¿Cuál es el orden de inicialización en un programa Go antes de que se ejecute func main()?",
          answer: "1. Se inicializan las constantes y variables a nivel de paquete.\n2. Se ejecutan las funciones 'init()' de todos los paquetes importados (en orden de dependencia de abajo hacia arriba).\n3. Se ejecuta la función 'init()' del paquete 'main'.\n4. Finalmente, el runtime llama a 'main.main()'.",
          level: "Intermedio",
          companyTag: "Google / Uber"
        },
        {
          question: "¿Puede existir más de una función init() en un mismo paquete o archivo en Go?",
          answer: "Sí, absolutamente. Go permite múltiples funciones init() en un mismo archivo o repartidas en diferentes archivos del mismo paquete. Se ejecutan en el orden en que el compilador procesa los archivos.",
          level: "Avanzado",
          companyTag: "Mercado Libre / Amazon"
        }
      ],
      mentalModel: "Ciclo de Inicio: Imports -> Const/Var Init -> init() de paquetes -> init() de main -> func main() -> exit(0)"
    },

    "variables": {
      gotchas: [
        {
          title: "Sombreado no intencional de variables con ':=' (Variable Shadowing)",
          codeBad: "var err error\nif data, err := fetchData(); err != nil {\n    // Aquí 'err' crea una NUEVA variable local en este bloque if,\n    // dejando la variable 'err' externa sin modificar ni evaluar fuera.\n}",
          codeGood: "var err error\nvar data Data\ndata, err = fetchData() // Asignación limpia sin sombrear con :=\nif err != nil {\n    return err\n}",
          explanation: "El operador ':=' declara una nueva variable si está dentro de un nuevo bloque léxico (como un if o for). Si comparte nombre con una variable externa, la ensombrece y puede ocultar errores críticos.",
          impact: "Bugs silenciosos donde los errores no se propagan y las variables externas quedan en cero."
        }
      ],
      interviews: [
        {
          question: "¿Cuál es el valor cero (zero value) de cada tipo de dato fundamental en Go y por qué no existe 'undefined'?",
          answer: "Go garantiza la seguridad de memoria inicializando siempre cada variable a su zero value:\n- Numéricos: 0\n- Booleanos: false\n- Strings: \"\" (string vacío, nunca nil ni null)\n- Punteros, Slices, Maps, Channels, Interfaces, Funcs: nil\n- Structs: Cada campo inicializado a su respectivo zero value.",
          level: "Básico / Intermedio",
          companyTag: "Meta / Microsoft"
        }
      ],
      mentalModel: "En Go no hay basura en memoria no inicializada. Todo byte reservado se limpia con ceros garantizados por el runtime."
    },

    "for": {
      gotchas: [
        {
          title: "Captura de variable del bucle en goroutines (Comportamiento clásico pre-Go 1.22)",
          codeBad: "// Peligro en versiones anteriores a Go 1.22:\nfor _, v := range items {\n    go func() {\n        fmt.Println(v) // Todas las goroutines compartían la misma dirección de memoria de 'v'\n    }()\n}",
          codeGood: "// En Go 1.22+ cada iteración crea una nueva instancia de 'v'.\n// En código retrocompatible idiomático:\nfor _, v := range items {\n    go func(val string) {\n        fmt.Println(val)\n    }(v) // Pasar por parámetro copia el valor de forma segura\n}",
          explanation: "Históricamente, 'v' era una única variable reutilizada en cada iteración del bucle for. A partir de Go 1.22 el compilador asigna una nueva variable por iteración, pero pasarla por parámetro sigue siendo la mejor práctica explícita.",
          impact: "Condición de carrera (Data Race) e impresión de valores incorrectos/duplicados."
        }
      ],
      interviews: [
        {
          question: "¿Cómo optimiza Go un bucle 'for range' sobre un slice muy grande con elementos pesados?",
          answer: "Al hacer 'for i, v := range slice', en cada iteración el valor de 'slice[i]' se COPIA en 'v'. Si el struct es grande (ej. 1KB), esto introduce una sobrecarga masiva de copias. La forma óptima es iterar solo con el índice: 'for i := range slice { use(&slice[i]) }' evitando la copia intermedia.",
          level: "Avanzado / Senior",
          companyTag: "Cloudflare / Google"
        }
      ],
      mentalModel: "for range: range copia el valor si se solicita. Iterar por índice ('for i := range arr') evita copias innecesarias en memoria."
    },

    "slices": {
      gotchas: [
        {
          title: "Modificación colateral de sub-slices por compartir el mismo array subyacente",
          codeBad: "a := []int{1, 2, 3, 4, 5}\nb := a[1:3] // b apunta al mismo array de 'a'\nb[0] = 999  // ¡Esto también muta a[1] a 999 sin que te des cuenta!",
          codeGood: "a := []int{1, 2, 3, 4, 5}\nb := make([]int, 2)\ncopy(b, a[1:3]) // Crea un array independiente en memoria\nb[0] = 999      // 'a' queda completamente intacto",
          explanation: "Un slice es un encabezado de 24 bytes (puntero al array, len, cap). Crear un sub-slice 'a[x:y]' no clona los datos; comparte el mismo array en memoria. 'append' puede sobreescribir datos si hay capacidad residual.",
          impact: "Corrupción oculta de datos en memoria compartida y bugs difíciles de reproducir en concurrencia."
        }
      ],
      interviews: [
        {
          question: "¿Qué ocurre internamente en memoria cuando un 'append()' supera la capacidad (cap) de un slice?",
          answer: "Go asigna un nuevo bloque de memoria contigua en el Heap (típicamente duplicando la capacidad para slices pequeños, o creciendo un ~25% + factor de suavizado para slices > 256 elementos según Go 1.18+), copia todos los elementos del array anterior al nuevo bloque, y devuelve un nuevo slice header que apunta a la nueva dirección.",
          level: "Avanzado",
          companyTag: "Uber / Netflix"
        },
        {
          question: "¿Por qué un slice se pasa 'por valor' en las llamadas a funciones pero sus modificaciones a veces se reflejan fuera?",
          answer: "El encabezado del slice (3 palabras: Ptr, Len, Cap) se pasa por copia de valor. Si modificas un elemento existente ('s[0] = X'), como la copia del puntero apunta a la misma memoria, el cambio es visible. Pero si haces 's = append(s, X)' y excede la capacidad, el nuevo puntero queda solo en la copia local de la función y no se refleja en el llamador a menos que devuelvas el nuevo slice.",
          level: "Experto",
          companyTag: "Google / Stripe"
        }
      ],
      mentalModel: "Slice Header en Stack (24 bytes en 64-bit):\n[ Ptr: 0x1040 | Len: 3 | Cap: 5 ] ---> [ Array de datos contiguo en Heap ]"
    },

    "maps": {
      gotchas: [
        {
          title: "Panic por escritura concurrente no sincronizada en Maps (Concurrent Map Writes)",
          codeBad: "m := make(map[string]int)\ngo func() { m[\"a\"] = 1 }()\ngo func() { m[\"b\"] = 2 }() // ¡PANIC irrecuperable: concurrent map writes!",
          codeGood: "var mu sync.RWMutex\nm := make(map[string]int)\n\ngo func() {\n    mu.Lock()\n    m[\"a\"] = 1\n    mu.Unlock()\n}()",
          explanation: "Los maps nativos en Go NO son thread-safe por diseño para maximizar el rendimiento en casos uniproceso. Si el runtime detecta escrituras y lecturas concurrentes simultáneas, lanza un panic fatal a nivel de SO que NO se puede capturar ni con recover().",
          impact: "Cierre abrupto e inmediato del proceso en producción (fatal error: concurrent map writes)."
        },
        {
          title: "No se puede obtener la dirección de memoria de un elemento de un map",
          codeBad: "type User struct{ Age int }\nusers := map[string]User{\"ana\": {Age: 20}}\n// users[\"ana\"].Age = 21 // Error de compilación: cannot assign to struct field in map",
          codeGood: "// Solución 1: Guardar punteros en el map\nusers := map[string]*User{\"ana\": {Age: 20}}\nusers[\"ana\"].Age = 21 // Válido y directo\n\n// Solución 2: Reasignar el struct completo\nu := users[\"ana\"]; u.Age = 21; users[\"ana\"] = u",
          explanation: "Los elementos de un map cambian de ubicación física en memoria cuando el map crece y hace rehash de sus buckets. Go prohíbe tomar punteros a valores dentro de maps para evitar punteros dangling.",
          impact: "Error de compilación o necesidad de almacenar punteros."
        }
      ],
      interviews: [
        {
          question: "¿Cómo funciona internamente la estructura de un map en Go (hmap y bmap)?",
          answer: "Un map en Go es un puntero a un struct 'hmap'. Este contiene un array de 'buckets' (cada bucket aloja hasta 8 pares clave/valor y 8 bytes de tophash). Para buscar una clave, Go calcula el hash de la clave: los bits inferiores eligen el bucket y los 8 bits superiores (tophash) identifican la clave dentro del bucket. Cuando el factor de carga supera 6.5, Go realiza una evacuación incremental duplicando los buckets sin bloquear todo el mapa.",
          level: "Experto / Arquitectura",
          companyTag: "Google / ByteDance"
        }
      ],
      mentalModel: "hmap -> [Bucket 0 | Bucket 1 | ... | Bucket 2^B - 1]\nCada Bucket aloja: [8 tophash] [8 Claves] [8 Valores] [Puntero Overflow Bucket]"
    },

    "pointers": {
      gotchas: [
        {
          title: "Escape Analysis: ¿Cuándo una variable va al Stack vs al Heap?",
          codeBad: "// Creer que 'new' siempre asigna en Heap y que variables locales siempre van al Stack",
          codeGood: "func createUser() *User {\n    u := User{Name: \"Carlos\"}\n    return &u // En C++ sería un puntero colgante inválido. En Go, el compilador\n              // detecta el escape y la asigna automáticamente en el Heap.\n}",
          explanation: "Go realiza 'Escape Analysis' en tiempo de compilación. Si una variable sobrevive al retorno de su función (por retornar su puntero o guardarlo en una interfaz), 'escapa' al Heap. Si no escapa, se aloja en el Stack con costo cero de Garbage Collector.",
          impact: "Mayor presión sobre el Garbage Collector si se generan escapes innecesarios."
        }
      ],
      interviews: [
        {
          question: "¿Existe aritmética de punteros en Go como en C/C++?",
          answer: "No en Go seguro estándar. No puedes hacer 'ptr++' ni calcular desplazamientos directos. Esto garantiza la seguridad de tipos y evita accesos inválidos a memoria. Si se requiere obligatoriamente para interoperabilidad de muy bajo nivel o llamadas a SO, se debe recurrir al paquete especial 'unsafe' (unsafe.Pointer y uintptr).",
          level: "Intermedio",
          companyTag: "Apple / Amazon"
        }
      ],
      mentalModel: "Stack: Asignación ultrarrápida (mover puntero de pila), se destruye al salir de la función.\nHeap: Asignación gestionada por el Garbage Collector (GC), costo de barrido y latencia."
    },

    "interfaces": {
      gotchas: [
        {
          title: "El infame 'nil interface != nil': Interfaz no nula con valor interno nil",
          codeBad: "var myErr *MyCustomError = nil // Puntero nulo a un struct concreto\nvar err error = myErr           // Se asigna a la interfaz error\nif err != nil {\n    // ¡ESTA CONDICIÓN ES TRUE! ¡Se entra al bloque de error aunque myErr sea nil!\n}",
          codeGood: "func doSomething() error {\n    var myErr *MyCustomError = nil\n    if failureCondition {\n        return &MyCustomError{}\n    }\n    return nil // Retorna SIEMPRE nil directo, NUNCA una variable tipada como puntero con valor nil\n}",
          explanation: "Una interfaz en Go es un par interno: (tipo concreto, valor concreto). Una interfaz solo es '== nil' cuando AMBOS componentes son nulos. Si el tipo es '*MyCustomError' pero el valor es 'nil', la interfaz NO es nil.",
          impact: "Bugs legendarios de Go donde los programas asumen erróneamente que ocurrió un error y fallan."
        }
      ],
      interviews: [
        {
          question: "¿Cuál es la representación interna de una interfaz en el runtime de Go (iface vs eface)?",
          answer: "Go utiliza dos estructuras internas:\n1. 'eface' (empty interface / any): 2 palabras -> [ _type (puntero al tipo) | data (puntero al valor) ].\n2. 'iface' (interfaz con métodos): 2 palabras -> [ itab (contiene tipo + tabla virtual de punteros a funciones) | data (puntero al valor) ].\nGracias a 'itab', la invocación de métodos dinámicos solo cuesta un salto indirecto por puntero de memoria.",
          level: "Avanzado / Senior",
          companyTag: "Google / Meta"
        }
      ],
      mentalModel: "Interfaz en memoria: (Tipo, Valor)\niface = [ itab: 0x9020 | data: 0x0000 ] -> Como itab != nil, 'iface != nil' es TRUE."
    },

    "goroutines": {
      gotchas: [
        {
          title: "Fuga de Goroutines (Goroutine Leaks)",
          codeBad: "ch := make(chan int) // Canal sin búfer\ngo func() {\n    val := <-ch // Si nadie envía jamás por 'ch', esta goroutine queda bloqueada PARA SIEMPRE en memoria\n}()\n// La función termina, pero la goroutine nunca se libera del runtime",
          codeGood: "ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)\ndefer cancel()\n\ngo func() {\n    select {\n    case val := <-ch:\n        handle(val)\n    case <-ctx.Done():\n        return // Sale limpiamente liberando recursos si expira el tiempo\n    }\n}()",
          explanation: "Una goroutine bloqueada en un canal o mutex que nunca se desbloquea jamás será recolectada por el Garbage Collector. Cada goroutine consume al menos 2KB de stack inicial más las variables retenidas.",
          impact: "Agotamiento progresivo de memoria (Memory Leak) en servidores de producción."
        }
      ],
      interviews: [
        {
          question: "¿Cómo funciona el Scheduler de Go (el modelo M:P:G)?",
          answer: "El scheduler de Go multiplexa G (Goroutines) sobre M (Hilos del SO) utilizando P (Procesadores lógicos / Contextos de ejecución, por defecto igual a runtime.GOMAXPROCS).\n- G: Goroutine (pila dinámica desde 2KB).\n- M: Machine (hilo nativo de Linux/Windows).\n- P: Processor (posee una cola local de ejecución de hasta 256 goroutines).\nIncluye 'Work Stealing' (si un P se queda sin tareas, le roba la mitad de la cola a otro P) y 'Syscall Preemption' (si un hilo se bloquea en I/O, el P se desvincula y se asocia a otro M disponible).",
          level: "Experto / Arquitectura",
          companyTag: "Google / Uber / Cloudflare"
        }
      ],
      mentalModel: "Scheduler GMP:\n[ P0 (Cola Local) ] ---> Ejecuta [ G1 ] en [ Hilo SO M0 ]\n          |-> Si vacía: roba el 50% de la cola de P1 (Work Stealing)"
    },

    "channels": {
      gotchas: [
        {
          title: "Las 4 Reglas de Oro de los Canales en Go (Comportamientos fatales)",
          codeBad: "// 1. Enviar a un canal nil -> Bloquea para siempre\n// 2. Recibir de un canal nil -> Bloquea para siempre\n// 3. Enviar a un canal cerrado -> ¡PANIC!\n// 4. Cerrar un canal cerrado o nil -> ¡PANIC!",
          codeGood: "// Regla de diseño canónica:\n// Quien PRODUCE (el emisor) es el único responsable de CERRAR el canal.\n// Los receptores NUNCA deben cerrar el canal para evitar panics.",
          explanation: "La operación de cierre 'close(ch)' es una señal unilateral de que no habrá más datos. Enviar sobre un canal cerrado produce un panic inmediato. La lectura en canal cerrado devuelve el zero value y ok=false.",
          impact: "Panics en runtime o bloqueos totales (deadlock) de goroutines."
        }
      ],
      interviews: [
        {
          question: "¿Cómo saber con certeza si un canal ha sido cerrado al leer de él?",
          answer: "Utilizando el idiomático test de dos valores 'val, ok := <-ch'. Si el canal está abierto y entregó un dato, 'ok' es true. Si el canal ha sido cerrado y ya no quedan valores en su búfer, 'ok' es false y 'val' será el zero value del tipo correspondiente.",
          level: "Intermedio",
          companyTag: "Mercado Libre / Amazon"
        },
        {
          question: "¿Por qué un canal con búfer de tamaño 1 no es idéntico a un canal sin búfer?",
          answer: "En un canal sin búfer (unbuffered), el emisor se bloquea obligatoriamente hasta que un receptor esté listo para recibir el valor (sincronización punto a punto o Rendezvous). En un canal con búfer de 1, el emisor puede depositar el dato y continuar su ejecución inmediatamente sin esperar a que el receptor haya leído.",
          level: "Intermedio",
          companyTag: "Microsoft / Twitter"
        }
      ],
      mentalModel: "hchan interno: [buf (anillo circular)] + [lock] + [sendq (cola receptores esperando)] + [recvq]"
    },

    "defer": {
      gotchas: [
        {
          title: "Evaluación inmediata de los argumentos de defer",
          codeBad: "start := time.Now()\ndefer fmt.Println(\"Tiempo transcurrido:\", time.Since(start)) // ¡Se evalúa en esta línea exacta, no al final!\n// código que tarda 5 segundos...",
          codeGood: "start := time.Now()\ndefer func() {\n    fmt.Println(\"Tiempo transcurrido:\", time.Since(start)) // La función anónima se ejecuta al salir y lee el start final\n}()",
          explanation: "Los argumentos de una función llamada mediante 'defer' se evalúan INMEDIATAMENTE en el momento en que se declara la instrucción defer, no cuando la función retorna.",
          impact: "Métricas de tiempo erróneas en cero o registros de parámetros desactualizados."
        },
        {
          title: "Uso de defer dentro de bucles infinitos o procesadores masivos",
          codeBad: "for _, file := range thousandsOfFiles {\n    f, _ := os.Open(file)\n    defer f.Close() // ¡Peligro! 'defer' solo se ejecuta al salir de la FUNCIÓN contenedora, NO al terminar cada ciclo del for\n}",
          codeGood: "for _, file := range thousandsOfFiles {\n    func(filename string) {\n        f, _ := os.Open(filename)\n        defer f.Close() // Se cierra limpiamente al terminar cada invocación de la función anónima\n    }(file)\n}",
          explanation: "Defer está ligado al ámbito de la FUNCIÓN, no al bloque léxico del for. Usar defer en bucles largos agota los descriptores de archivos del sistema operativo.",
          impact: "Error 'too many open files' y caída del servicio."
        }
      ],
      interviews: [
        {
          question: "¿En qué orden se ejecutan múltiples instrucciones defer dentro de una misma función?",
          answer: "Se ejecutan en orden LIFO (Last-In, First-Out: último en entrar, primero en salir) como una pila. El último defer declarado es el primero en ejecutarse cuando la función retorna.",
          level: "Básico",
          companyTag: "Spotify / Google"
        },
        {
          question: "¿Puede una instrucción defer modificar el valor de retorno de la función que la contiene?",
          answer: "Sí, ÚNICAMENTE si la función utiliza valores de retorno con nombre (Named Return Values). Como la variable de retorno ya está definida en el ámbito de la función, la clausura del defer puede asignarle un nuevo valor antes de que el llamador reciba el resultado final.",
          level: "Avanzado",
          companyTag: "Uber / Airbnb"
        }
      ],
      mentalModel: "Pila de Defer: [defer 1] -> [defer 2] -> [defer 3]\nAl retornar: Ejecuta defer 3, luego defer 2, luego defer 1."
    },

    "context": {
      gotchas: [
        {
          title: "Olvidar invocar la función 'cancel()' de un context",
          codeBad: "func query() {\n    ctx, _ := context.WithTimeout(context.Background(), 3*time.Second)\n    // Olvidar el 'cancel()'\n}",
          codeGood: "func query() {\n    ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)\n    defer cancel() // ¡Obligatorio! Libera los temporizadores internos del runtime de inmediato\n}",
          explanation: "Si no llamas a cancel(), los temporizadores internos y las goroutines asociadas al contexto no se liberan hasta que transcurra el tiempo total del timeout, provocando fugas de memoria y temporizadores huérfanos.",
          impact: "Advertencia de linter (lostcancel) y consumo excesivo de memoria en microservicios con alto tráfico."
        }
      ],
      interviews: [
        {
          question: "¿Por qué nunca se debe almacenar un context.Context dentro de un struct de datos?",
          answer: "Según las guías oficiales de Google y la convención de la comunidad de Go, 'context.Context' debe pasarse siempre de forma explícita como el PRIMER parámetro de una función o método ('func Do(ctx context.Context, ...)'). Guardarlo en structs genera acoplamientos invisibles de ciclo de vida y rompe la trazabilidad de cancelaciones y límites de tiempo.",
          level: "Avanzado",
          companyTag: "Google / HashiCorp"
        }
      ],
      mentalModel: "Árbol de Contextos: context.Background() -> WithTimeout() -> WithValue()\nSi el padre se cancela, TODAS las ramas y goroutines descendientes se cancelan automáticamente."
    }
  };

  // Plantillas de respaldo por categoría para temas sin gotchas específicas detalladas
  const CATEGORY_DEFAULTS = {
    "fundamentos": {
      gotchas: [
        {
          title: "Tipado estricto sin conversión implícita",
          codeBad: "var a int = 10\nvar b int64 = 20\n// var c = a + b // Error: invalid operation (mismatched types int and int64)",
          codeGood: "var a int = 10\nvar b int64 = 20\nvar c = int64(a) + b // Conversión explícita requerida",
          explanation: "Go no permite coerciones ni conversiones implícitas de tipos, ni siquiera entre enteros de distinto ancho de bits.",
          impact: "Error en tiempo de compilación asegurando precisión numérica."
        }
      ],
      interviews: [
        {
          question: "¿Por qué Go no tiene excepciones (try/catch) ni herencia clásica de clases?",
          answer: "Los diseñadores de Go (Rob Pike, Ken Thompson, Robert Griesemer) priorizaron la simplicidad, la claridad del flujo de control y la facilidad de mantenimiento en bases de código masivas. El manejo explícito de errores hace que cada punto de fallo sea visible y auditable.",
          level: "Filosofía Go",
          companyTag: "Google / Red Hat"
        }
      ],
      mentalModel: "Go favorece la composición sobre la herencia y la claridad explícita sobre la 'magia' implícita."
    },
    "estructuras-datos": {
      gotchas: [
        {
          title: "Slices de slices: fuga de memoria al retener arrays gigantes",
          codeBad: "func getSmall() []byte {\n    big := readHugeFile1GB()\n    return big[:10] // ¡Retiene el array entero de 1GB en memoria porque el puntero sigue vivo!\n}",
          codeGood: "func getSmall() []byte {\n    big := readHugeFile1GB()\n    small := make([]byte, 10)\n    copy(small, big[:10]) // Copia los 10 bytes y permite que el GC libere el 1GB\n    return small\n}",
          explanation: "Un slice pequeño que subsecciona un slice gigante mantiene una referencia viva a todo el array original, impidiendo que el Garbage Collector libere el bloque grande.",
          impact: "Fugas masivas de memoria residual."
        }
      ],
      interviews: [
        {
          question: "¿Cuál es la complejidad temporal promedio de acceso, inserción y borrado en un map en Go?",
          answer: "Promedio O(1) para búsqueda, inserción y eliminación gracias a la tabla hash con hashing uniforme. En el peor caso (muchas colisiones de hash en el mismo bucket), se degrada a O(n).",
          level: "Básico",
          companyTag: "Amazon / Mercado Libre"
        }
      ],
      mentalModel: "Colecciones en memoria contigua maximizan el acierto en la caché L1/L2 del procesador."
    },
    "concurrencia-canales": {
      gotchas: [
        {
          title: "Condición de carrera al leer o escribir variables compartidas sin sincronización",
          codeBad: "count := 0\nfor i := 0; i < 1000; i++ {\n    go func() { count++ }() // Condición de carrera (Data race) sin sincronización\n}",
          codeGood: "var count int64\nfor i := 0; i < 1000; i++ {\n    go func() { atomic.AddInt64(&count, 1) }() // Operación atómica de CPU\n}",
          explanation: "La instrucción 'count++' no es atómica: implica leer de memoria, incrementar en registro de CPU y volver a escribir. Detectable con el flag '-race' de Go.",
          impact: "Resultados numéricos inconsistentes y corrupción de memoria."
        }
      ],
      interviews: [
        {
          question: "¿Qué es el proverbio de Go: 'Do not communicate by sharing memory; instead, share memory by communicating'?",
          answer: "Sugiere usar canales para transferir la propiedad de los datos entre goroutines en lugar de sincronizar variables globales con locks y mutexes. Al pasar un dato por un canal, solo una goroutine tiene acceso exclusivo en cada momento.",
          level: "Arquitectura",
          companyTag: "Google / Go Community"
        }
      ],
      mentalModel: "Canal = Tubería de propiedad segura. Mutex = Semáforo de acceso a memoria compartida."
    },
    "redes-sistema": {
      gotchas: [
        {
          title: "Olvidar cerrar 'resp.Body.Close()' en clientes HTTP",
          codeBad: "resp, err := http.Get(url)\nif err != nil { return }\n// Olvidar resp.Body.Close() -> Las conexiones TCP quedan abiertas indefinidamente",
          codeGood: "resp, err := http.Get(url)\nif err != nil { return }\ndefer resp.Body.Close() // ¡Obligatorio para permitir reutilización en el pool Keep-Alive!",
          explanation: "Si el cuerpo de la respuesta HTTP no se lee y se cierra, el transporte de red de Go no puede reutilizar la conexión TCP subyacente.",
          impact: "Agotamiento de sockets de red (socket exhaustion) y bloqueo de peticiones salientes."
        }
      ],
      interviews: [
        {
          question: "¿Cómo implementa Go el I/O asíncrono no bloqueante en servidores de red (Netpoller)?",
          answer: "Go abstrae el I/O del sistema operativo (epoll en Linux, kqueue en macOS, IOCP en Windows) mediante su componente interno 'Netpoller'. Las llamadas de red parecen código síncrono secuencial fácil de leer, pero cuando una goroutine espera datos en un socket, el Netpoller la suspende y el hilo SO pasa a ejecutar otra goroutine hasta que el socket recibe datos.",
          level: "Experto",
          companyTag: "Cloudflare / Google"
        }
      ],
      mentalModel: "Netpoller: Código secuencial humano por fuera -> Epoll / Kqueue no bloqueante de alto rendimiento por dentro."
    }
  };

  // Función global para enriquecer los 85 temas
  window.enrichTopicsWithGotchas = function(topics) {
    if (!topics || !Array.isArray(topics)) return;

    topics.forEach(t => {
      const specific = SPECIFIC_DATA[t.slug];
      const categoryFallback = CATEGORY_DEFAULTS[t.categorySlug] || CATEGORY_DEFAULTS["fundamentos"];

      t.gotchas = (specific && specific.gotchas) ? specific.gotchas : categoryFallback.gotchas;
      t.interviewQuestions = (specific && specific.interviews) ? specific.interviews : categoryFallback.interviews;
      t.mentalModel = (specific && specific.mentalModel) ? specific.mentalModel : categoryFallback.mentalModel;
    });
  };
})();
