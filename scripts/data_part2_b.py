# scripts/data_part2_b.py
# Temas 34 a 43 (Timeouts, Operaciones No Bloqueantes, Cierre de Canales, Timers, Tickers, Pools, Waitgroups, Rate Limiting y Atomics)

TOPICS_PART2_B = {
    "timeouts": {
        "id": 34,
        "slug": "timeouts",
        "title": "Timeouts",
        "titleEs": "Timeouts y Temporizadores en Canales",
        "category": "Concurrencia y Canales",
        "categorySlug": "concurrencia-canales",
        "categoryIcon": "🚀",
        "difficulty": "Intermedio",
        "summary": "Control de límites de tiempo para operaciones concurrentes mediante la combinación de select y time.After.",
        "originalExpl": "Los timeouts son importantes para programas que se conectan a recursos externos o que necesitan limitar el tiempo de ejecución. Implementar timeouts en Go es fácil y elegante gracias a los canales y select.",
        "basicExpl": {
            "title": "Conceptos Fundamentales para Principiantes",
            "content": "Si pides una pizza y te dicen que llega en 30 minutos, esperas. Pero si pasan 2 horas, no te quedas esperando en la puerta el resto de tu vida: cancelas el pedido y haces otra cosa.\nEn programación, un 'timeout' evita que tu aplicación se quede congelada para siempre esperando la respuesta de un servidor lento:\n- `select` escucha dos cosas: el canal con la respuesta que esperas (`<-respuesta`) y un reloj despertador (`<-time.After(2 * time.Second)`).\n- Si la respuesta llega primero, la procesas.\n- Si el reloj suena primero, abortas la espera con un mensaje de tiempo agotado.",
            "keyPoints": [
                "`time.After(duracion)` devuelve un canal que emite la hora actual tras expirar el tiempo.",
                "Se combina con `select` para competir contra canales de respuesta de red o bases de datos.",
                "Evita que goroutines queden colgadas indefinidamente consumiendo recursos."
            ]
        },
        "interExpl": {
            "title": "Mecanismos Internos y Buenas Prácticas",
            "content": "Trampa de Fuga de Memoria con `time.After` en bucles (Timer Leak):\n`time.After(d)` crea un temporizador interno administrado por el runtime. Dicho temporizador NO es recolectado por el Garbage Collector hasta que el tiempo expire, incluso si la otra rama del select ganó inmediatamente.\nSi llamas a `time.After` repetidamente dentro de un bucle `for` rápido que procesa miles de mensajes por segundo, crearás miles de timers en memoria que saturarán el heap y el CPU.\nBuena práctica: Para bucles repetitivos, reutiliza una instancia única de `time.NewTimer(d)` y resetéala con `timer.Reset(d)`.",
            "keyPoints": [
                "Timer Leak en bucles: evitar `time.After` dentro de bucles de alta frecuencia.",
                "Uso de `time.NewTimer`: permite llamar a `timer.Stop()` y `timer.Reset()` reutilizando el objeto.",
                "Relación con `context.WithTimeout`: en aplicaciones modernas de Go, se prefiere usar el paquete `context` para propagar timeouts jerárquicos."
            ]
        },
        "expertExpl": {
            "title": "Bajo Nivel, Rendimiento e Internals",
            "content": "Evolución del subsistema de timers en el runtime de Go:\nHistóricamente (Go 1.9), todos los timers residían en una lista global protegida por un único mutex central que sufría grave contención en servidores con muchas CPUs. En Go 1.14+, los timers se integraron directamente en la estructura de cada procesador lógico `P` (procesador local del scheduler), eliminando la contención global.\n\nEn Go 1.23, se resolvió definitivamente el problema de limpieza: los canales de timers no referenciados ahora pueden ser recolectados por el GC inmediatamente sin esperar a que el temporizador expire.",
            "keyPoints": [
                "Timers integrados en P: gestión local de temporizadores por cada procesador del scheduler de Go.",
                "Mejora en Go 1.23: Garbage collection inmediata de timers no alcanzables.",
                "Syscall epoll/kqueue: el runtime programa interrupciones de temporizador de alta precisión utilizando las APIs del kernel del SO."
            ]
        },
        "evaluation": {
            "title": "Reto: Consulta de Red con Timeout Estricto",
            "statement": "Simula una llamada a una API que tarda 250ms en responder. Implementa un select con un timeout estricto de 100ms usando time.After. Muestra un mensaje de error por tiempo agotado y luego repite la prueba con un timeout holgado de 400ms.",
            "starterCode": "package main\n\nimport (\n    \"fmt\"\n    \"time\"\n)\n\nfunc consultarServicio() <-chan string {\n    ch := make(chan string, 1)\n    go func() {\n        time.Sleep(250 * time.Millisecond)\n        ch <- \"Datos recibidos con éxito\"\n    }()\n    return ch\n}\n\nfunc main() {\n    // Prueba 1: Timeout de 100ms (debe fallar)\n    // Prueba 2: Timeout de 400ms (debe tener éxito)\n}",
            "hint": "Usa select { case res := <-consultarServicio(): ... case <-time.After(100 * time.Millisecond): ... }.",
            "solution": "package main\n\nimport (\n    \"fmt\"\n    \"time\"\n)\n\nfunc consultarServicio() <-chan string {\n    ch := make(chan string, 1)\n    go func() {\n        time.Sleep(250 * time.Millisecond)\n        ch <- \"Datos recibidos con éxito\"\n    }()\n    return ch\n}\n\nfunc main() {\n    fmt.Println(\"--- Prueba 1: Timeout estricto (100ms) ---\")\n    select {\n    case res := <-consultarServicio():\n        fmt.Println(\"Respuesta:\", res)\n    case <-time.After(100 * time.Millisecond):\n        fmt.Println(\"Alerta: Timeout alcanzado (servicio demasiado lento)\")\n    }\n    \n    fmt.Println(\"\\n--- Prueba 2: Timeout holgado (400ms) ---\")\n    select {\n    case res := <-consultarServicio():\n        fmt.Println(\"Respuesta:\", res)\n    case <-time.After(400 * time.Millisecond):\n        fmt.Println(\"Alerta: Timeout alcanzado\")\n    }\n}",
            "explanation": "El select multiplexa la respuesta del canal frente al temporizador time.After. En la primera prueba, el temporizador de 100ms se dispara antes de los 250ms que tarda el servicio, protegiendo a la aplicación de bloqueos lentos. En la segunda, el servicio responde en 250ms antes de que expiren los 400ms."
        },
        "externalLinks": [
            {"title": "The Go Blog: Concurrency Timeouts", "url": "https://go.dev/blog/concurrency-timeouts", "description": "Artículo oficial de Go sobre el patrón canónico de timeout con canales."},
            {"title": "Package time: After and Timer", "url": "https://pkg.go.dev/time#After", "description": "Documentación oficial de la biblioteca estándar para time.After."},
            {"title": "Go by Example: Timeouts", "url": "https://gobyexample.com/timeouts", "description": "Ejemplo interactivo en Go by Example."}
        ]
    },

    "non-blocking-channel-operations": {
        "id": 35,
        "slug": "non-blocking-channel-operations",
        "title": "Non-Blocking Channel Operations",
        "titleEs": "Operaciones No Bloqueantes en Canales",
        "category": "Concurrencia y Canales",
        "categorySlug": "concurrencia-canales",
        "categoryIcon": "🚀",
        "difficulty": "Intermedio",
        "summary": "Envíos y recepciones que continúan de inmediato sin pausar la goroutine si el canal no está listo, usando select con default.",
        "originalExpl": "Los envíos y recepciones básicos en canales son bloqueantes. Sin embargo, podemos usar select con una cláusula default para implementar envíos, recepciones e incluso select multidireccionales no bloqueantes.",
        "basicExpl": {
            "title": "Conceptos Fundamentales para Principiantes",
            "content": "Normalmente, si intentas recibir de un canal vacío, te quedas esperando hasta que alguien mande algo. Si intentas enviar a un canal lleno, te quedas esperando hasta que alguien libere espacio.\nUna 'operación no bloqueante' es como asomarte a mirar: si hay algo listo, lo tomas; si no hay nada, no te quedas esperando y continúas con tu trabajo de inmediato.\n- Se logra añadiendo la cláusula `default` dentro de un bloque `select`.\n- Si el canal está listo, entra al `case`.\n- Si no está listo, salta instantáneamente al `default`.",
            "keyPoints": [
                "Un bloque `select` con rama `default` NUNCA se bloquea.",
                "Permite consultar el estado de un canal ('polling') de forma instantánea.",
                "Sirve tanto para intentar recibir (`case v := <-ch`) como para intentar enviar (`case ch <- v`)."
            ]
        },
        "interExpl": {
            "title": "Mecanismos Internos y Buenas Prácticas",
            "content": "Casos de uso clave de operaciones no bloqueantes:\n1. Descarte controlado de mensajes (Drop Pattern / Shed Load): Si un sistema de logging o métricas no puede enviar un dato porque el canal está lleno, es preferible descartar el log antes que congelar la aplicación principal:\n```go\nselect {\ncase logsCh <- nuevoLog:\n    // Enviado con éxito\ndefault:\n    // Búfer lleno: descartamos el log para no ralentizar la API\n    metricas.IncrementarDescartes()\n}\n```\n2. Comprobación instantánea de cancelación de contexto o apagado sin detener el flujo.",
            "keyPoints": [
                "Drop Pattern: Descarte deliberado de eventos secundarios ante saturación del consumidor.",
                "Recepción no bloqueante: `select { case msg := <-ch: ... default: ... }`.",
                "Evitar bucles de consumo ocupado (busy loops): nunca hagas un bucle `for { select { ... default: } }` sin pausas porque consumirá el 100% de la CPU."
            ]
        },
        "expertExpl": {
            "title": "Bajo Nivel, Rendimiento e Internals",
            "content": "El compilador de Go optimiza los bloques `select` con default y un único caso (`selectnbrecv` o `selectnbsend`) eliminando por completo la maquinaria compleja de registro de goroutines y suspensión en el scheduler.\n\nEn su lugar, el código máquina generado simplemente adquiere el mutex interno del canal (`hchan.lock`), comprueba si `qcount > 0` (o si hay receptores en `recvq`), realiza la transferencia atómica y libera el lock de inmediato. Todo el proceso toma solo unos 20-30 nanosegundos y no involucra cambios de contexto de la CPU.",
            "keyPoints": [
                "Optimización selectnbrecv/selectnbsend: invocación directa a funciones especializadas en runtime/chan.go.",
                "Zero context switch: si el canal no está listo, el flujo salta al default sin pausar la goroutine.",
                "Intensidad de CPU en busy polling: si necesitas esperar activamente, agrega `runtime.Gosched()` o pausas controladas."
            ]
        },
        "evaluation": {
            "title": "Reto: Buffer de Notificaciones con Descarte Inteligente",
            "statement": "Crea una función 'intentarNotificar(ch chan<- string, mensaje string) bool' que use un select con default para intentar enviar un mensaje a un canal con búfer de 2 elementos. Si el canal está lleno, descarta el mensaje y devuelve false. En main, prueba enviando 3 mensajes consecutivos e imprime el resultado de cada intento.",
            "starterCode": "package main\n\nimport \"fmt\"\n\nfunc intentarNotificar(ch chan<- string, mensaje string) bool {\n    // Implementa el envío no bloqueante con select y default\n}\n\nfunc main() {\n    ch := make(chan string, 2)\n    // Intenta enviar 3 mensajes\n}",
            "hint": "Dentro de la función haz: select { case ch <- mensaje: return true; default: return false }.",
            "solution": "package main\n\nimport \"fmt\"\n\nfunc intentarNotificar(ch chan<- string, mensaje string) bool {\n    select {\n    case ch <- mensaje:\n        return true\n    default:\n        return false\n    }\n}\n\nfunc main() {\n    canalAlertas := make(chan string, 2)\n    \n    mensajes := []string{\"Alerta 1: Disco al 80%\", \"Alerta 2: CPU al 90%\", \"Alerta 3: Memoria al 95%\"}\n    \n    for _, m := range mensajes {\n        exito := intentarNotificar(canalAlertas, m)\n        if exito {\n            fmt.Printf(\"[ENVIADO]: %s\\n\", m)\n        } else {\n            fmt.Printf(\"[DESCARTADO por saturación]: %s\\n\", m)\n        }\n    }\n    \n    fmt.Printf(\"Total mensajes almacenados en búfer: %d\\n\", len(canalAlertas))\n}",
            "explanation": "Como el canal solo admite 2 elementos en su búfer, los dos primeros se encolan con éxito (true). Al intentar el tercero, el canal está lleno, por lo que el select salta inmediatamente al default sin bloquear la ejecución, retornando false y evitando un cuelgue del sistema."
        },
        "externalLinks": [
            {"title": "Go Tour: Default Selection", "url": "https://go.dev/tour/concurrency/6", "description": "Práctica con select y default en el tour interactivo."},
            {"title": "Effective Go: Non-blocking communication", "url": "https://go.dev/doc/effective_go#channels", "description": "Casos de uso idiomáticos de canales no bloqueantes."},
            {"title": "Go by Example: Non-Blocking Channel Operations", "url": "https://gobyexample.com/non-blocking-channel-operations", "description": "Ejemplo en Go by Example."}
        ]
    },

    "closing-channels": {
        "id": 36,
        "slug": "closing-channels",
        "title": "Closing Channels",
        "titleEs": "Cierre de Canales y Detección (coma-ok)",
        "category": "Concurrencia y Canales",
        "categorySlug": "concurrencia-canales",
        "categoryIcon": "🚀",
        "difficulty": "Intermedio",
        "summary": "Cierre explícito de canales mediante close() e inspección del estado abierto/cerrado con el modismo coma-ok.",
        "originalExpl": "Cerrar un canal indica que no se enviarán más valores a través de él. Esto puede ser útil para comunicar la finalización a los receptores del canal mediante el modismo coma-ok.",
        "basicExpl": {
            "title": "Conceptos Fundamentales para Principiantes",
            "content": "Cerrar un canal es como colgar el teléfono cuando terminas de hablar. Le avisa a la persona del otro lado: 'Ya no tengo nada más que decirte, hemos terminado'.\n- Se cierra con `close(miCanal)`.\n- Solo el emisor debe cerrar el canal.\n- Quien recibe puede comprobar si el canal sigue abierto usando dos variables: `valor, abierto := <-miCanal`.\n- Si 'abierto' es `true`, el dato recibido es real. Si es `false`, el canal está cerrado y la conversación terminó.",
            "keyPoints": [
                "Se cierra con la función integrada `close(ch)`.",
                "Modismo coma-ok: `v, ok := <-ch` (ok es false si el canal está cerrado y vacío).",
                "Un canal cerrado sigue permitiendo leer los datos restantes que quedaron en el búfer antes de devolver el zero value."
            ]
        },
        "interExpl": {
            "title": "Mecanismos Internos y Buenas Prácticas",
            "content": "Reglas sagradas del cierre de canales en Go:\n1. NUNCA cierres un canal desde el lado del receptor (read-side).\n2. NUNCA cierres un canal si hay múltiples emisores concurrentes (cerrar un canal ya cerrado produce un pánico inmediato: `panic: close of closed channel`).\n3. NUNCA intentes enviar a un canal cerrado (produce `panic: send on closed channel`).\n\nRegla de diseño: 'El dueño del recurso es quien lo cierra'. Si una goroutine es la única responsable de emitir datos en ese canal, es esa misma goroutine quien debe cerrarlo al terminar su trabajo.",
            "keyPoints": [
                "Pánico al enviar en canal cerrado: `ch <- v` en canal cerrado crashea el programa.",
                "Pánico por doble cierre: ejecutar `close(ch)` dos veces en el mismo canal genera pánico.",
                "No es obligatorio cerrar todos los canales: los canales son recolectados por el GC; solo se cierran si el receptor necesita saber explícitamente cuándo terminaron los datos."
            ]
        },
        "expertExpl": {
            "title": "Bajo Nivel, Rendimiento e Internals",
            "content": "Efecto de `close()` en el runtime de Go (runtime/chan.go):\nAl invocar `close(c)`, el runtime adquiere el lock de `hchan`, marca el flag `closed = 1`, recorre la lista `recvq` de todas las goroutines bloqueadas esperando recibir y las desbloquea a todas simultáneamente entregándoles el valor cero del tipo (`zero value`) y `ok = false`.\n\nPatrón de Difusión (Broadcast Pattern): Debido a que cerrar un canal desbloquea instantáneamente a todas las goroutines esperando en él, `close()` es el mecanismo de sincronización '1 a N' más eficiente del runtime, utilizado como base de la cancelación en el paquete `context` (`<-ctx.Done()`).",
            "keyPoints": [
                "Desbloqueo masivo en O(N): todas las goroutines suspendidas en recepción se despiertan simultáneamente.",
                "Lectura de canal cerrado: devuelve instantáneamente el zero-value sin bloquearse jamás.",
                "Base de context.Context: el canal `Done()` de un contexto funciona precisamente cerrando un canal."
            ]
        },
        "evaluation": {
            "title": "Reto: Consumidor Seguro con Detección de Cierre Coma-Ok",
            "statement": "Crea una goroutine productora que envíe 3 trabajos ('trabajo A', 'trabajo B', 'trabajo C') a un canal y luego lo cierre con close(). En la goroutine principal, crea un bucle infinito que lea del canal usando el modismo coma-ok 'v, ok := <-ch' y salga del bucle cuando ok sea false.",
            "starterCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    ch := make(chan string)\n    \n    // Lanza la goroutine productora\n    \n    // Lee en un for con coma-ok y sal cuando ok sea false\n}",
            "hint": "En el bucle for haz: v, ok := <-ch; if !ok { break }.",
            "solution": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    ch := make(chan string)\n    \n    go func() {\n        ch <- \"Tarea 1: Respaldar BD\"\n        ch <- \"Tarea 2: Limpiar temporales\"\n        ch <- \"Tarea 3: Notificar admin\"\n        close(ch) // Indica formalmente que no habrá más tareas\n    }()\n    \n    for {\n        tarea, abierta := <-ch\n        if !abierta {\n            fmt.Println(\"Canal cerrado: todas las tareas fueron procesadas.\")\n            break\n        }\n        fmt.Println(\"Ejecutando:\", tarea)\n    }\n}",
            "explanation": "El modismo 'v, abierta := <-ch' permite detectar el momento exacto en que el canal fue cerrado por el productor. Mientras el canal tenga elementos en tránsito, 'abierta' será true. Una vez vacío y cerrado, 'abierta' se vuelve false, permitiendo salir del bucle de forma limpia."
        },
        "externalLinks": [
            {"title": "Go Tour: Range and Close", "url": "https://go.dev/tour/concurrency/4", "description": "Cierre de canales y modismo coma-ok en el tour oficial."},
            {"title": "Go Spec: Close built-in function", "url": "https://go.dev/ref/spec#Close", "description": "Especificación formal del comportamiento de la función close."},
            {"title": "Go 101: How to Gracefully Close Channels", "url": "https://go101.org/article/channel-closing.html", "description": "Guía de referencia avanzada sobre patrones seguros de cierre de canales en Go."}
        ]
    },

    "range-over-channels": {
        "id": 37,
        "slug": "range-over-channels",
        "title": "Range over Channels",
        "titleEs": "Iteración Range sobre Canales",
        "category": "Concurrencia y Canales",
        "categorySlug": "concurrencia-canales",
        "categoryIcon": "🚀",
        "difficulty": "Intermedio",
        "summary": "Consumo simplificado y continuo de valores de un canal con bucle 'for range' hasta su cierre definitivo.",
        "originalExpl": "Podemos usar la sintaxis 'for range' para iterar sobre los valores recibidos de un canal. El bucle continuará recibiendo valores hasta que el canal sea cerrado explícitamente.",
        "basicExpl": {
            "title": "Conceptos Fundamentales para Principiantes",
            "content": "En vez de escribir un bucle infinito manual con comprobaciones `if !ok { break }`, Go te permite usar un elegante `for valor := range miCanal`.\n- El bucle espera automáticamente cada nuevo dato y lo procesa.\n- Cuando el emisor ejecuta `close(miCanal)`, el bucle `for range` se detiene y termina de forma limpia y automática.\n- ¡Cuidado!: Si el emisor olvida cerrar el canal, el bucle for se quedará esperando para siempre, provocando un deadlock.",
            "keyPoints": [
                "Sintaxis limpia: `for valor := range ch` lee secuencialmente todos los elementos.",
                "Termina automáticamente en cuanto el canal es cerrado con `close(ch)`.",
                "Solo recibe 1 valor (el elemento), a diferencia de slices o mapas que devuelven índice/clave."
            ]
        },
        "interExpl": {
            "title": "Mecanismos Internos y Buenas Prácticas",
            "content": "Drenaje de Búferes Cerrados:\nSi cierras un canal con búfer que aún contiene elementos sin leer, el bucle `for range` NO descarta los elementos: drena y procesa ordenadamente todos los valores remanentes en el búfer y solo sale cuando el búfer queda completamente vacío.\n\nEste comportamiento es crucial para patrones de apagado seguro (graceful shutdown), donde un servicio deja de aceptar nuevos trabajos cerrando el canal de entrada, pero procesa hasta el último trabajo que ya estaba encolado.",
            "keyPoints": [
                "Drenaje garantizado: procesa todos los elementos encolados antes de terminar el bucle.",
                "Patrón Graceful Shutdown: cerrar canal para indicar 'no más ingresos' y procesar la cola pendiente.",
                "Deadlock por no cerrar: si nadie cierra el canal y no hay más goroutines activas, el bucle colapsa en deadlock fatal."
            ]
        },
        "expertExpl": {
            "title": "Bajo Nivel, Rendimiento e Internals",
            "content": "Bajo el capó, la instrucción `for v := range ch` es reescrita sintácticamente por el compilador en un bucle equivalente a:\n```go\nfor {\n    v, ok := <-ch\n    if !ok { break }\n    // cuerpo del bucle\n}\n```\nNo existe ninguna sobrecarga adicional frente a la recepción manual con coma-ok. Cada iteración realiza la sincronización normal a través de `runtime.chanrecv2`, suspendiendo la goroutine receptora si el canal está temporalmente vacío hasta que una goroutine emisora deposite el siguiente elemento.",
            "keyPoints": [
                "Transformación sintáctica del compilador: genera llamadas directas a `runtime.chanrecv2`.",
                "Optimización de suspensión: la goroutine receptora duerme sin gastar CPU mientras no haya datos en el canal.",
                "Canal nil en range: hacer range sobre un canal nil (`var ch chan int = nil; for range ch`) se bloquea indefinidamente."
            ]
        },
        "evaluation": {
            "title": "Reto: Generador y Sumador de Secuencia con Range",
            "statement": "Escribe una goroutine productora que envíe los primeros N múltiplos de 5 a un canal y lo cierre. En main, utiliza 'for range' para recibir todos los valores, calcular su suma total e imprimir el resultado final.",
            "starterCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    // Define canal y lanza goroutine productora para 5 múltiplos\n    // Suma con for v := range ch e imprime el total\n}",
            "hint": "Recuerda llamar a close(ch) al finalizar el bucle emisor en la goroutine.",
            "solution": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    ch := make(chan int)\n    n := 5\n    \n    go func() {\n        for i := 1; i <= n; i++ {\n            ch <- i * 5\n        }\n        close(ch) // Indispensable para que el range termine\n    }()\n    \n    suma := 0\n    fmt.Println(\"Valores recibidos:\")\n    for val := range ch {\n        fmt.Printf(\"%d \", val)\n        suma += val\n    }\n    fmt.Printf(\"\\nSuma total de los múltiplos: %d\\n\", suma)\n}",
            "explanation": "El bucle 'for val := range ch' en main itera cómodamente mientras el canal esté abierto. Apenas la goroutine ejecuta close(ch), el bucle finaliza limpiamente y el programa procede a mostrar la suma total sin riesgo de deadlocks."
        },
        "externalLinks": [
            {"title": "Go Tour: Range and Close", "url": "https://go.dev/tour/concurrency/4", "description": "Iteración de canales con for range en el tour interactivo."},
            {"title": "Effective Go: Channels", "url": "https://go.dev/doc/effective_go#channels", "description": "Buenas prácticas con iteración sobre canales en Effective Go."},
            {"title": "Go Spec: For statements with range clause", "url": "https://go.dev/ref/spec#For_statements", "description": "Reglas gramaticales para la iteración range en canales."}
        ]
    },

    "timers": {
        "id": 38,
        "slug": "timers",
        "title": "Timers",
        "titleEs": "Temporizadores Únicos (time.Timer)",
        "category": "Sincronización y Concurrencia Avanzada",
        "categorySlug": "sincronizacion-avanzada",
        "categoryIcon": "⚙️",
        "difficulty": "Intermedio",
        "summary": "Ejecución de eventos futuros tras una duración específica con capacidad de cancelación antes de expirar.",
        "originalExpl": "Los temporizadores (timers) son para cuando quieres hacer algo en el futuro una sola vez. Se crean con time.NewTimer(). A diferencia de time.Sleep, un Timer puede ser cancelado antes de que expire con Stop().",
        "basicExpl": {
            "title": "Conceptos Fundamentales para Principiantes",
            "content": "A veces necesitas un despertador que suene una sola vez dentro de X segundos:\n- `time.Sleep(2 * time.Second)` congela tu programa y no puedes cancelarlo si cambias de opinión.\n- `time.NewTimer(2 * time.Second)` es mucho más inteligente: crea un temporizador que tiene un canal `timer.C`.\n- Puedes esperar a que suene leyendo de su canal: `<-timer.C`.\n- O puedes cancelarlo a mitad de camino si ya no lo necesitas: `timer.Stop()`.",
            "keyPoints": [
                "Se crea con `timer := time.NewTimer(duracion)`.",
                "Emite la hora actual en el canal `timer.C` una única vez al expirar.",
                "Método `timer.Stop()`: cancela el temporizador antes de que suene.",
                "Método `timer.Reset(duracion)`: reprograma el temporizador para una nueva cuenta."
            ]
        },
        "interExpl": {
            "title": "Mecanismos Internos y Buenas Prácticas",
            "content": "Buenas prácticas con `Stop()` y drenaje del canal:\n`timer.Stop()` devuelve un booleano: `true` si el temporizador se detuvo antes de expirar, o `false` si ya había expirado o ya se había detenido.\nEn versiones anteriores a Go 1.23, si `Stop()` devolvía `false`, el canal `timer.C` podía contener un valor residual que debía drenarse manualmente. En Go 1.23+, el runtime de Go drena automáticamente el canal al llamar a `Stop()`, simplificando enormemente el código idiomático.",
            "keyPoints": [
                "Valor de retorno de Stop(): indica si lograste interceptar el temporizador antes de que disparara.",
                "Mejora radical en Go 1.23: `timer.Stop()` y `timer.Reset()` ahora gestionan el canal C de forma limpia y atómica.",
                "Reutilización de timers: para tareas repetitivas, reusar un Timer con `Reset()` genera 0 asignaciones de memoria frente a crear timers nuevos."
            ]
        },
        "expertExpl": {
            "title": "Bajo Nivel, Rendimiento e Internals",
            "content": "Arquitectura de Timers en el Runtime de Go:\nCada `P` (procesador lógico) en Go mantiene un min-heap de timers (`p.timers`). El scheduler verifica la cima del heap de timers en cada iteración del bucle del planificador y cuando entra en reposo mediante llamadas al sistema del SO (usando `epoll_wait` con timeout en Linux, `kevent` en BSD/macOS o `GetQueuedCompletionStatus` en Windows).\n\nAl cumplirse el plazo, el runtime extrae el timer y envía la marca de tiempo al canal `timer.C`. Si la goroutine que debe recibir está dormida, el runtime la despierta marcando su estado como `_Grunnable`.",
            "keyPoints": [
                "Min-Heap de timers por procesador P: O(log N) para inserciones y cancelaciones.",
                "Sincronización con el kernel del SO: aprovechamiento de los temporizadores de precisión del hardware.",
                "Zero background OS threads: no se crean hilos dedicados del sistema operativo solo para contar tiempo."
            ]
        },
        "evaluation": {
            "title": "Reto: Cancelación Temprana de Temporizador de Inactividad",
            "statement": "Simula un temporizador de inactividad de 3 segundos para una sesión de usuario. Lanza una goroutine que simule la actividad del usuario a los 500ms y cancele el temporizador con Stop(). Imprime si la sesión fue cerrada por inactividad o si se salvó a tiempo.",
            "starterCode": "package main\n\nimport (\n    \"fmt\"\n    \"time\"\n)\n\nfunc main() {\n    // Crea un timer de 3 segundos\n    // Lanza goroutine que actúe en 500ms y llame a timer.Stop()\n    // Espera en select si expiró o si se canceló\n}",
            "hint": "Guarda el timer en una variable, llámale timer.Stop() en la goroutine tras el Sleep.",
            "solution": "package main\n\nimport (\n    \"fmt\"\n    \"time\"\n)\n\nfunc main() {\n    timerInactividad := time.NewTimer(3 * time.Second)\n    cancelado := make(chan bool)\n    \n    // Simula acción del usuario\n    go func() {\n        time.Sleep(500 * time.Millisecond)\n        if timerInactividad.Stop() {\n            fmt.Println(\"[Acción de usuario detectada a los 500ms]: Cancelando timer\")\n            cancelado <- true\n        }\n    }()\n    \n    select {\n    case <-timerInactividad.C:\n        fmt.Println(\"Sesión cerrada por inactividad (pasaron 3s)\")\n    case <-cancelado:\n        fmt.Println(\"Sesión mantenida activa con éxito gracias a la acción del usuario.\")\n    }\n}",
            "explanation": "Al detectar actividad a los 500ms, la goroutine ejecuta `timerInactividad.Stop()`, que cancela el temporizador con éxito devolviendo true antes de que alcancen a transcurrir los 3 segundos, evitando el cierre indeseado de la sesión."
        },
        "externalLinks": [
            {"title": "Package time: Timer", "url": "https://pkg.go.dev/time#Timer", "description": "Documentación oficial de la estructura Timer y sus métodos."},
            {"title": "The Go Blog: Go 1.23 Timer and Ticker Improvements", "url": "https://go.dev/blog/go1.23-timers", "description": "Novedades oficiales sobre la recolección de basura y drenaje de timers en Go 1.23."},
            {"title": "Go by Example: Timers", "url": "https://gobyexample.com/timers", "description": "Ejemplo interactivo en Go by Example."}
        ]
    },

    "tickers": {
        "id": 39,
        "slug": "tickers",
        "title": "Tickers",
        "titleEs": "Tickers Periódicos (time.Ticker)",
        "category": "Sincronización y Concurrencia Avanzada",
        "categorySlug": "sincronizacion-avanzada",
        "categoryIcon": "⚙️",
        "difficulty": "Intermedio",
        "summary": "Emisión periódica y regular de pulsos de tiempo a intervalos fijos para tareas recurrentes.",
        "originalExpl": "Los temporizadores son para cuando quieres hacer algo una sola vez en el futuro; los tickers son para cuando quieres hacer algo repetidamente a intervalos regulares. Se detienen con ticker.Stop().",
        "basicExpl": {
            "title": "Conceptos Fundamentales para Principiantes",
            "content": "Un Timer es como una alarma que suena una sola vez. Un 'Ticker' es como el tic-tac de un reloj o el latido de un corazón: pulsa y emite una señal repetidamente cada N segundos o milisegundos.\n- Creación: `ticker := time.NewTicker(500 * time.Millisecond)`.\n- Cada 500ms exactos, deposita la hora actual en su canal `ticker.C`.\n- Puedes usarlo en un bucle para ejecutar una tarea periódica (como un cron job, sincronizar datos con el servidor o verificar el pulso de un servicio).\n- Cuando termines, debes detenerlo con `ticker.Stop()` para no gastar batería ni procesador.",
            "keyPoints": [
                "Se crea con `time.NewTicker(intervalo)`.",
                "Emite una señal repetida en su canal `ticker.C` indefinidamente.",
                "Es fundamental llamar a `ticker.Stop()` cuando ya no se utilice para liberar recursos.",
                "Diferencia con Timer: Timer dispara 1 vez; Ticker dispara infinitas veces."
            ]
        },
        "interExpl": {
            "title": "Mecanismos Internos y Buenas Prácticas",
            "content": "Compensación de Deriva (Drift Compensation) y Tareas Lentas:\nEl Ticker de Go está diseñado para mantener un ritmo temporal constante. Si tu ticker dispara cada 100ms pero tu tarea tarda 150ms en procesarse, el ticker de Go NO acumula pulsos en cola de forma indefinida: ajusta los ticks y omite eventos perdidos para no desbordar el búfer.\n\nPatrón estándar de detención (Stop Pattern):\n```go\nticker := time.NewTicker(time.Second)\ndefer ticker.Stop()\n\nfor {\n    select {\n    case <-ticker.C:\n        ejecutarMonitoreo()\n    case <-ctx.Done():\n        return\n    }\n}\n```",
            "keyPoints": [
                "Compensación de retraso: no acumula ticks si el receptor es más lento que el intervalo.",
                "Uso de `defer ticker.Stop()`: garantiza que el ticker del runtime se destruya al salir de la función.",
                "Coordinación con contextos: ideal para tareas en segundo plano controladas por context.Context."
            ]
        },
        "expertExpl": {
            "title": "Bajo Nivel, Rendimiento e Internals",
            "content": "Bajo nivel en Go 1.23+:\nAntes de Go 1.23, olvidar llamar a `ticker.Stop()` producía una fuga de memoria permanente (Memory Leak), porque el runtime mantenía viva una referencia al ticker en el min-heap global impidiendo que el GC lo recolectara.\nDesde Go 1.23, el recolector de basura es capaz de detectar si el ticker y su canal ya no son referenciados por ninguna goroutine activa, procediendo a su recolección automática.\n\nEl canal interno `ticker.C` tiene una capacidad de búfer de 1 (`chan time.Time` con cap=1). Si un pulso no es leído antes de que ocurra el siguiente, el nuevo pulso descarta al anterior sin bloquear el scheduler.",
            "keyPoints": [
                "Búfer interno cap=1 con descarte: previene que goroutines lentas queden inundadas de pulsos viejos.",
                "GC en Go 1.23+: los tickers abandonados son limpiados por el Garbage Collector automáticamente.",
                "Jitter en sistemas distribuidos: para evitar tormentas sincronizadas de peticiones (thundering herd), se suele añadir una pequeña variación aleatoria (jitter) al intervalo del ticker."
            ]
        },
        "evaluation": {
            "title": "Reto: Monitor de Latencia con Límite de Pulsos",
            "statement": "Crea un Ticker que emita un pulso cada 150ms simulando un chequeo de estado de red. Deja que se ejecute exactamente 4 veces e imprime el número de chequeo. Tras el cuarto pulso, detén el ticker con Stop() y sal de la función.",
            "starterCode": "package main\n\nimport (\n    \"fmt\"\n    \"time\"\n)\n\nfunc main() {\n    // Crea ticker de 150ms\n    // Cuenta 4 pulsos e imprime\n    // Detén el ticker\n}",
            "hint": "Usa un contador 'pulsos := 0' dentro de un for con range ticker.C o select. Cuando pulsos == 4, haz ticker.Stop() y break.",
            "solution": "package main\n\nimport (\n    \"fmt\"\n    \"time\"\n)\n\nfunc main() {\n    intervalo := 150 * time.Millisecond\n    ticker := time.NewTicker(intervalo)\n    defer ticker.Stop()\n    \n    pulsos := 0\n    fmt.Println(\"Iniciando monitor de red periódico...\")\n    \n    for t := range ticker.C {\n        pulsos++\n        fmt.Printf(\"[Chequeo #%d a las %s]: Ping OK (latencia: 12ms)\\n\", \n            pulsos, t.Format(\"15:04:05.000\"))\n        \n        if pulsos >= 4 {\n            fmt.Println(\"Límite de chequeos alcanzado. Deteniendo ticker.\")\n            break\n        }\n    }\n}",
            "explanation": "El bucle 'for t := range ticker.C' se despierta puntualmente cada 150ms. Al procesar el cuarto pulso, se invoca 'ticker.Stop()' mediante defer y se ejecuta el 'break', concluyendo la monitorización de forma limpia y liberando el recurso en el runtime."
        },
        "externalLinks": [
            {"title": "Package time: Ticker", "url": "https://pkg.go.dev/time#Ticker", "description": "Documentación oficial de la estructura time.Ticker."},
            {"title": "Go by Example: Tickers", "url": "https://gobyexample.com/tickers", "description": "Ejemplo interactivo en Go by Example."},
            {"title": "Go Design Documents: Modernized Timers", "url": "https://go.dev/design/59402-improved-timer", "description": "Propuesta y diseño de la modernización de tickers en Go."}
        ]
    },

    "worker-pools": {
        "id": 40,
        "slug": "worker-pools",
        "title": "Worker Pools",
        "titleEs": "Pool de Trabajadores (Worker Pools)",
        "category": "Sincronización y Concurrencia Avanzada",
        "categorySlug": "sincronizacion-avanzada",
        "categoryIcon": "⚙️",
        "difficulty": "Avanzado",
        "summary": "Patrón de concurrencia que limita el número de goroutines concurrentes procesando una cola de tareas compartida.",
        "originalExpl": "En este ejemplo veremos cómo implementar un pool de trabajadores usando goroutines y canales. Un número fijo de workers procesa concurrentemente una cola de tareas.",
        "basicExpl": {
            "title": "Conceptos Fundamentales para Principiantes",
            "content": "Si tienes 10,000 cartas para responder, ¿lanzas 10,000 personas al mismo tiempo? Tu oficina colapsaría por falta de espacio y recursos.\nEn su lugar, contratas a 3 trabajadores (workers) fijos:\n- Pones las 10,000 cartas en una sola bandeja de entrada (un canal `trabajos`).\n- Los 3 trabajadores van sacando cartas de esa misma bandeja a medida que van terminando la anterior.\n- Las respuestas terminadas se colocan en una bandeja de salida (un canal `resultados`).\nEsto es un 'Worker Pool': paralelismo controlado y eficiente sin saturar tu sistema.",
            "keyPoints": [
                "Número fijo de goroutines trabajando concurrentemente.",
                "Todas las goroutines leen del mismo canal de tareas compartidas.",
                "Evita agotar la memoria, conexiones de base de datos o descriptores de archivos del servidor."
            ]
        },
        "interExpl": {
            "title": "Mecanismos Internos y Buenas Prácticas",
            "content": "Distribución Competitiva y Control de Saturación:\nEn Go, múltiples goroutines pueden hacer `for tarea := range trabajos` sobre el MISMO canal. El runtime garantiza que cada elemento del canal será entregado a exactamente UN solo worker de forma atómica y segura, sin duplicaciones ni carreras de datos.\n\nDimensionamiento óptimo del pool:\n- Para tareas CPU-bound (cálculos matemáticos intensivos, compresión, criptografía): número de workers ≈ cantidad de núcleos de CPU (`runtime.NumCPU()`).\n- Para tareas I/O-bound (peticiones HTTP, consultas a base de datos, lectura de archivos en disco): número de workers mucho mayor (ej. 50 a 500), ya que las goroutines pasan la mayor parte del tiempo esperando respuestas externas.",
            "keyPoints": [
                "Lectura compartida atómica: el runtime de Go distribuye los elementos del canal equitativamente entre los workers.",
                "Prevención de sobrecarga: protege APIs externas y bases de datos contra colapsos por avalancha de peticiones.",
                "Cierre ordenado: cerrar el canal de tareas (`close(trabajos)`) hace que todos los workers terminen limpiamente al agotar la cola."
            ]
        },
        "expertExpl": {
            "title": "Bajo Nivel, Rendimiento e Internals",
            "content": "Competencia de Locks en Canales Compartidos (Contention Profiling):\nCuando decenas de workers compiten activamente por leer de un mismo canal `hchan`, todas las goroutines intentan adquirir el lock interno del canal (`hchan.lock`). Si las tareas individuales son extremadamente cortas (del orden de nanosegundos), el tiempo empleado en la contención del lock del canal puede superar al tiempo real de trabajo útil.\n\nTécnica de optimización avanzada (Batching): Para cargas extremas, en lugar de pasar tareas individuales por el canal, se pasan 'lotes' de tareas (`[]Tarea` de 50 o 100 elementos), reduciendo la contención sobre el canal en un 98%. Puedes auditar esta contención ejecutando tu aplicación con `go test -bench=. -blockprofile=block.pprof`.",
            "keyPoints": [
                "Contención de hchan.lock: auditable mediante block profiling y mutex profiling en pprof.",
                "Batching de tareas: enviar lotes de trabajo por canal amortiza la sobrecarga de sincronización.",
                "Localidad de memoria de CPU: reutilizar los mismos workers mantiene caliente la caché L1/L2 del procesador."
            ]
        },
        "evaluation": {
            "title": "Reto: Procesador de Imágenes Concurrente con 3 Workers",
            "statement": "Crea un worker pool con 3 workers para procesar 6 'imágenes' (representadas por identificadores 1 al 6). Cada worker debe simular el procesamiento tardando 50ms, imprimir qué worker procesó qué imagen y enviar el resultado a un canal 'resultados'. Main debe enviar las tareas, cerrar el canal y recolectar los 6 resultados.",
            "starterCode": "package main\n\nimport (\n    \"fmt\"\n    \"time\"\n)\n\nfunc worker(id int, tareas <-chan int, resultados chan<- string) {\n    // Itera tareas con for range y procesa\n}\n\nfunc main() {\n    // Lanza 3 workers, envía 6 tareas y recolecta resultados\n}",
            "hint": "Crea tareas con make(chan int, 6), resultados con make(chan string, 6). Lanza 3 go worker(...). Cierra tareas antes de recolectar.",
            "solution": "package main\n\nimport (\n    \"fmt\"\n    \"time\"\n)\n\nfunc worker(id int, tareas <-chan int, resultados chan<- string) {\n    for imgID := range tareas {\n        fmt.Printf(\"[Worker %d] Iniciando procesamiento de imagen #%d\\n\", id, imgID)\n        time.Sleep(50 * time.Millisecond) // Simula procesamiento pesado\n        resultados <- fmt.Sprintf(\"Imagen #%d procesada por Worker %d\", imgID, id)\n    }\n}\n\nfunc main() {\n    numTareas := 6\n    numWorkers := 3\n    \n    tareas := make(chan int, numTareas)\n    resultados := make(chan string, numTareas)\n    \n    // 1. Iniciar los workers fijos\n    for w := 1; w <= numWorkers; w++ {\n        go worker(w, tareas, resultados)\n    }\n    \n    // 2. Enviar las tareas a la cola\n    for j := 1; j <= numTareas; j++ {\n        tareas <- j\n    }\n    close(tareas) // Ya no hay más tareas; los workers saldrán al terminar\n    \n    // 3. Recolectar resultados\n    for a := 1; a <= numTareas; a++ {\n        res := <-resultados\n        fmt.Println(\"->\", res)\n    }\n    fmt.Println(\"Todas las imágenes fueron procesadas exitosamente.\")\n}",
            "explanation": "El patrón Worker Pool desacopla la cantidad de tareas (6) del número de hilos ejecutores (3). Cada worker consume tareas a su propio ritmo. Al cerrar el canal 'tareas', el bucle for range dentro de cada worker finaliza limpiamente sin fugas de goroutines."
        },
        "externalLinks": [
            {"title": "Go by Example: Worker Pools", "url": "https://gobyexample.com/worker-pools", "description": "Ejemplo original de Worker Pools en Go by Example."},
            {"title": "The Go Blog: Pipelines and cancellation", "url": "https://go.dev/blog/pipelines", "description": "Arquitectura de pools de trabajo y propagación de cancelación."},
            {"title": "Bryan Mills: Rethinking Classical Concurrency Patterns", "url": "https://www.youtube.com/watch?v=5zXAHh5tJqQ", "description": "Conferencia magistral en GopherCon sobre buenas prácticas en pools y concurrencia."}
        ]
    },

    "waitgroups": {
        "id": 41,
        "slug": "waitgroups",
        "title": "WaitGroups",
        "titleEs": "Grupos de Espera con sync.WaitGroup",
        "category": "Sincronización y Concurrencia Avanzada",
        "categorySlug": "sincronizacion-avanzada",
        "categoryIcon": "⚙️",
        "difficulty": "Intermedio",
        "summary": "Mecanismo canónico de sincronización para esperar la finalización colectiva de múltiples goroutines concurrentes.",
        "originalExpl": "Para esperar a que múltiples goroutines terminen, podemos usar un waitgroup. Se encuentra en el paquete 'sync' y proporciona los métodos Add, Done y Wait.",
        "basicExpl": {
            "title": "Conceptos Fundamentales para Principiantes",
            "content": "Imagina que eres un profesor que lleva a 10 alumnos de excursión. No puedes subirte al autobús de vuelta hasta que los 10 alumnos hayan subido.\nEso es exactamente un `sync.WaitGroup`:\n1. `wg.Add(3)`: Dices 'voy a lanzar 3 goroutines; cuenta hasta 3'.\n2. `wg.Done()`: Cada goroutine, al terminar su tarea, avisa: '¡Profe, yo ya terminé! (resta 1 al contador)'.\n3. `wg.Wait()`: El programa principal se queda esperando hasta que el contador llegue exactamente a CERO.",
            "keyPoints": [
                "Se importa desde el paquete `sync`: `var wg sync.WaitGroup`.",
                "`wg.Add(n)` incrementa el contador de tareas pendientes.",
                "`wg.Done()` decrementa el contador en 1 (equivalente a `wg.Add(-1)`).",
                "`wg.Wait()` bloquea la ejecución hasta que el contador llega a cero."
            ]
        },
        "interExpl": {
            "title": "Mecanismos Internos y Buenas Prácticas",
            "content": "Reglas de oro para evitar bugs con WaitGroup:\n1. Siempre llama a `wg.Add()` ANTES de lanzar la goroutine con `go func()`, NUNCA dentro de la goroutine. Si lo haces dentro, existe una carrera de datos donde `wg.Wait()` podría ejecutarse antes de que la goroutine haya tenido tiempo de arrancar, creyendo falsamente que no había tareas.\n2. Usa `defer wg.Done()` como primera línea de la goroutine. Esto garantiza que el contador se decrementará incluso si la función tiene retornos tempranos o sufre un pánico.\n3. Si pasas un WaitGroup a otra función, pásalo SIEMPRE por PUNTERO (`*sync.WaitGroup`). Si lo pasas por valor, copiarás la estructura y `Wait()` nunca se enterará de los `Done()`.",
            "keyPoints": [
                "Llamar a `Add()` en la goroutine creadora, nunca dentro de la goroutine hija.",
                "`defer wg.Done()` asegura el decremento ante errores o retornos tempranos.",
                "Paso obligatorio por puntero (`*sync.WaitGroup`) para compartir el contador.",
                "Contador negativo provoca pánico inmediato (`panic: negative WaitGroup counter`)."
            ]
        },
        "expertExpl": {
            "title": "Bajo Nivel, Rendimiento e Internals",
            "content": "Implementación interna de `sync.WaitGroup` (sync/waitgroup.go):\nEn arquitecturas de 64 bits, un WaitGroup se almacena en una estructura de 12 bytes alineada en memoria que contiene:\n- Un contador atómico de 64 bits empaquetado: los 32 bits superiores son el contador de tareas activas (`counter`), y los 32 bits inferiores son el número de goroutines actualmente suspendidas esperando en `Wait()` (`waiter count`).\n- Un semáforo de sistema de 32 bits (`sema`).\n\nTodas las operaciones `Add()` y `Done()` se ejecutan usando instrucciones atómicas de hardware (`atomic.AddUint64`) en espacio de usuario sin utilizar mutexes ni bloqueos pesados. Solo cuando el contador llega a cero, se invoca a `runtime.semrelease` para despertar a los hilos esperando en el semáforo.",
            "keyPoints": [
                "Zero locks en Add/Done: implementado puramente con operaciones atómicas CPU (LOCK XADD).",
                "Semáforo de suspensión: `Wait()` duerme en `runtime.semacquire` con cero consumo de CPU.",
                "Prohibición de copia: implementar `sync.Locker` / `noCopy` para que la herramienta `go vet` alerte si se copia el struct."
            ]
        },
        "evaluation": {
            "title": "Reto: Descarga Concurrente de Archivos con WaitGroup",
            "statement": "Escribe un programa que simule la descarga paralela de 4 archivos (con nombres 'doc1.pdf', 'doc2.pdf', etc.). Usa sync.WaitGroup para coordinar las descargas. Asegúrate de pasar el puntero a wg o usar una clausura, llamar a Add antes de lanzar y usar defer Done.",
            "starterCode": "package main\n\nimport (\n    \"fmt\"\n    \"sync\"\n    \"time\"\n)\n\nfunc descargarArchivo(nombre string, wg *sync.WaitGroup) {\n    // Implementa la descarga simulada y el aviso al WaitGroup\n}\n\nfunc main() {\n    archivos := []string{\"datos.csv\", \"informe.pdf\", \"foto.jpg\", \"backup.zip\"}\n    // Coordina la descarga con sync.WaitGroup\n}",
            "hint": "Haz wg.Add(len(archivos)), lanza cada go descargarArchivo(a, &wg) y al final pon wg.Wait().",
            "solution": "package main\n\nimport (\n    \"fmt\"\n    \"sync\"\n    \"time\"\n)\n\nfunc descargarArchivo(nombre string, wg *sync.WaitGroup) {\n    defer wg.Done() // Garantiza que se descuente al salir\n    \n    fmt.Printf(\"[Descargando] %s...\\n\", nombre)\n    time.Sleep(100 * time.Millisecond) // Simula tiempo de descarga de red\n    fmt.Printf(\"[Completado] %s\\n\", nombre)\n}\n\nfunc main() {\n    archivos := []string{\"datos.csv\", \"informe.pdf\", \"foto.jpg\", \"backup.zip\"}\n    \n    var wg sync.WaitGroup\n    \n    for _, archivo := range archivos {\n        wg.Add(1) // Incrementa en el hilo principal antes de lanzar\n        go descargarArchivo(archivo, &wg)\n    }\n    \n    fmt.Println(\"Esperando a que todas las descargas finalicen...\")\n    wg.Wait() // Pausa hasta que las 4 descargas llamen a Done()\n    fmt.Println(\"¡Todas las descargas han concluido con éxito!\")\n}",
            "explanation": "Llamar a wg.Add(1) en el bucle principal antes del lanzamiento previene condiciones de carrera. El uso de 'defer wg.Done()' asegura que cada goroutine avise al grupo al finalizar, y wg.Wait() congela el hilo principal hasta que el contador desciende exactamente a cero."
        },
        "externalLinks": [
            {"title": "Package sync: WaitGroup", "url": "https://pkg.go.dev/sync#WaitGroup", "description": "Documentación oficial de la biblioteca estándar sobre WaitGroup."},
            {"title": "Go by Example: WaitGroups", "url": "https://gobyexample.com/waitgroups", "description": "Ejemplo canónico en Go by Example."},
            {"title": "Dave Cheney: Synchronisation primitives in Go", "url": "https://dave.cheney.net/", "description": "Guía práctica de Dave Cheney sobre sincronización con WaitGroups y Mutexes."}
        ]
    },

    "rate-limiting": {
        "id": 42,
        "slug": "rate-limiting",
        "title": "Rate Limiting",
        "titleEs": "Limitación de Tasa (Rate Limiting y Token Bucket)",
        "category": "Sincronización y Concurrencia Avanzada",
        "categorySlug": "sincronizacion-avanzada",
        "categoryIcon": "⚙️",
        "difficulty": "Avanzado",
        "summary": "Control del flujo y velocidad de procesamiento de peticiones para proteger recursos y respetar cuotas de APIs.",
        "originalExpl": "La limitación de tasa (rate limiting) es un mecanismo importante para controlar la utilización de recursos y mantener la calidad del servicio. Go soporta rate limiting elegantemente con goroutines, canales y tickers.",
        "basicExpl": {
            "title": "Conceptos Fundamentales para Principiantes",
            "content": "Si entras a una discoteca, la puerta no deja entrar a 500 personas de golpe: hay un empleado en la puerta que deja pasar a una persona cada 3 segundos para que no haya avalanchas.\nEn programación, el 'Rate Limiting' (control de tasa) sirve para:\n1. No saturar tu propia base de datos o servidor.\n2. Respetar los límites de APIs externas (como Twitter, Stripe o Google) que te banean si mandas más de 10 peticiones por segundo.\nSe implementa de forma sencilla usando un canal o un `time.Ticker`: la tarea espera a recibir un 'ticket' del reloj antes de poder ejecutarse.",
            "keyPoints": [
                "Controla la frecuencia máxima de ejecución de tareas por unidad de tiempo.",
                "Previene bloqueos por exceso de peticiones (errores HTTP 429 Too Many Requests).",
                "Se construye nativamente con `time.Tick` o con canales con búfer para permitir ráfagas."
            ]
        },
        "interExpl": {
            "title": "Mecanismos Internos y Buenas Prácticas",
            "content": "Algoritmo de Token Bucket (Cubo de Fichas) para soportar ráfagas (bursts):\nUn limitador rígido (1 petición cada 200ms) es ineficiente si el usuario estuvo inactivo durante 5 minutos y de pronto envía 3 peticiones juntas. El patrón 'Token Bucket' soluciona esto:\n- Creas un canal con búfer de 3 elementos: `tokens := make(chan time.Time, 3)`.\n- Lo llenas inicialmente con 3 tokens (permitiendo una ráfaga inmediata de hasta 3 peticiones sin esperar).\n- Una goroutine en segundo plano con un ticker va agregando un nuevo token cada 200ms hasta que el cubo se llene.\nEn producción, se utiliza el paquete oficial `golang.org/x/time/rate`, que implementa un Token Bucket de alta precisión sin necesidad de goroutines activas en segundo plano.",
            "keyPoints": [
                "Token Bucket: Permite tolerar ráfagas iniciales (burst capacity) manteniendo una tasa promedio estricta.",
                "Paquete `golang.org/x/time/rate`: la biblioteca estándar extendida de rate limiting más utilizada en producción en Go.",
                "Algoritmo Leaky Bucket: variante que procesa las peticiones a una velocidad de salida estrictamente constante."
            ]
        },
        "expertExpl": {
            "title": "Bajo Nivel, Rendimiento e Internals",
            "content": "Implementación matemática sin Goroutines (`rate.Limiter`):\nEl paquete `golang.org/x/time/rate` optimiza el rendimiento eliminando por completo los tickers y canales en segundo plano. En lugar de rellenar tokens periódicamente con un temporizador activo, calcula matemáticamente cuántos tokens deberían existir en el instante presente en función del tiempo transcurrido desde la última consulta:\n`nuevosTokens = tiempoTranscurrido * tasaDeLlenado`.\n\nEsto convierte la comprobación de límites (`limiter.Allow()` o `limiter.Wait(ctx)`) en una simple operación matemática con mutex y marcas de tiempo del reloj monotónico de la CPU (`time.Now()`), logrando procesar millones de evaluaciones de cuota por segundo con cero consumo de CPU cuando el sistema está inactivo.",
            "keyPoints": [
                "Lazy evaluation: cálculo de tokens bajo demanda según el reloj monotónico de la CPU sin hilos de fondo.",
                "Zero background CPU overhead: no gasta ciclos de procesador cuando no hay peticiones entrantes.",
                "Integración nativa con `context.Context`: permite cancelar la espera si el cliente desconecta la petición HTTP."
            ]
        },
        "evaluation": {
            "title": "Reto: Limitador de Tasa con Capacidad de Ráfaga (Burst Limiter)",
            "statement": "Implementa un limitador de peticiones con capacidad de ráfaga de 3 peticiones inmediatas y una tasa de reposición de 1 petición cada 100ms. Simula la llegada de 5 peticiones simultáneas y verifica cómo las 3 primeras se atienden instantáneamente y las 2 restantes esperan el intervalo del limitador.",
            "starterCode": "package main\n\nimport (\n    \"fmt\"\n    \"time\"\n)\n\nfunc main() {\n    // Implementa el canal de tokens con búfer de 3\n    // Llena la ráfaga inicial y arranca el rellenador periódico\n    // Procesa 5 peticiones midiendo el tiempo de cada una\n}",
            "hint": "Crea burstyLimiter := make(chan time.Time, 3). Llena 3 veces. Luego go func() con ticker de 100ms.",
            "solution": "package main\n\nimport (\n    \"fmt\"\n    \"time\"\n)\n\nfunc main() {\n    // Canal con búfer de 3 para admitir ráfagas de 3 peticiones\n    limiteRafaga := make(chan time.Time, 3)\n    \n    // Pre-llenamos el búfer con 3 tokens iniciales\n    for i := 0; i < 3; i++ {\n        limiteRafaga <- time.Now()\n    }\n    \n    // Goroutine que agrega un nuevo token cada 100ms si hay espacio\n    go func() {\n        for t := range time.Tick(100 * time.Millisecond) {\n            select {\n            case limiteRafaga <- t:\n            default:\n                // Búfer lleno; se descarta el token para no superar la capacidad de 3\n            }\n        }\n    }()\n    \n    // 5 peticiones entrantes\n    peticiones := []int{1, 2, 3, 4, 5}\n    inicio := time.Now()\n    \n    for _, req := range peticiones {\n        <-limiteRafaga // Espera un token disponible\n        transcurrido := time.Since(inicio).Milliseconds()\n        fmt.Printf(\"Petición #%d atendida a los %d ms\\n\", req, transcurrido)\n    }\n}",
            "explanation": "Las peticiones 1, 2 y 3 se ejecutan prácticamente en 0 ms porque consumen los 3 tokens pre-cargados en el canal con búfer (ráfaga). Las peticiones 4 y 5 deben esperar obligatoriamente a que la goroutine de fondo deposite nuevos tokens cada 100ms, respetando el límite de velocidad promedio."
        },
        "externalLinks": [
            {"title": "Package golang.org/x/time/rate", "url": "https://pkg.go.dev/golang.org/x/time/rate", "description": "Documentación oficial del paquete de rate limiting de producción en Go."},
            {"title": "Go by Example: Rate Limiting", "url": "https://gobyexample.com/rate-limiting", "description": "Ejemplo en Go by Example."},
            {"title": "Cloudflare Blog: How we built rate limiting with Go", "url": "https://blog.cloudflare.com/counting-things-a-lot-of-different-things/", "description": "Artículo de ingeniería de Cloudflare sobre algoritmos de limitación de tasa a escala masiva."}
        ]
    },

    "atomic-counters": {
        "id": 43,
        "slug": "atomic-counters",
        "title": "Atomic Counters",
        "titleEs": "Contadores y Operaciones Atómicas (sync/atomic)",
        "category": "Sincronización y Concurrencia Avanzada",
        "categorySlug": "sincronizacion-avanzada",
        "categoryIcon": "⚙️",
        "difficulty": "Avanzado",
        "summary": "Gestión de estado concurrente ultra-rápida y libre de locks mediante instrucciones atómicas a nivel de hardware de la CPU.",
        "originalExpl": "El mecanismo principal para gestionar el estado en Go es la comunicación a través de canales. Cuando necesitas gestionar un estado simple como un contador compartido, el paquete sync/atomic ofrece operaciones atómicas de bajo nivel.",
        "basicExpl": {
            "title": "Conceptos Fundamentales para Principiantes",
            "content": "Si 50 personas intentan sumar 1 al mismo tiempo a una pizarra (`contador++`), se chocarán los codos y el resultado final estará mal porque `contador++` no es una sola acción: primero lees el número, luego sumas 1 en tu cabeza y luego escribes el resultado.\nSi dos personas leen al mismo tiempo el número '5', ambas escribirán '6' y se perderá una suma.\nPara evitar esto sin usar candados pesados, existen las 'Operaciones Atómicas':\n- Una operación atómica es indivisible: la CPU garantiza que la suma ocurre en un solo paso instantáneo de hardware.\n- Nadie puede interrumpir la operación a la mitad.",
            "keyPoints": [
                "Se encuentra en el paquete `sync/atomic`.",
                "Evita condiciones de carrera (data races) en variables numéricas compartidas.",
                "Mucho más rápido que un Mutex para contadores y banderas booleanas simples.",
                "Desde Go 1.19, se utilizan los tipos atómicos modernos: `atomic.Uint64`, `atomic.Int64`, `atomic.Bool`."
            ]
        },
        "interExpl": {
            "title": "Mecanismos Internos y Buenas Prácticas",
            "content": "Tipos atómicos modernos en Go 1.19+:\nAntes de Go 1.19, se utilizaban funciones sueltas pasando punteros (`atomic.AddUint64(&ops, 1)`), lo que requería precauciones extremas de alineación de memoria. En las versiones modernas de Go, se deben utilizar los tipos atómicos estructurados dedicados:\n```go\nvar visitas atomic.Uint64\nvisitas.Add(1)          // Incrementa de forma atómica\nfmt.Println(visitas.Load()) // Lee de forma atómica y segura\nvisitas.Store(0)        // Guarda un valor atómicamente\n```\nOperación Compare-And-Swap (CAS): `visitas.CompareAndSwap(viejo, nuevo)` actualiza el valor solo si el valor actual coincide exactamente con 'viejo', base de todos los algoritmos concurrentes libres de bloqueos (lock-free)."
            ,
            "keyPoints": [
                "Tipos modernos Go 1.19+: `atomic.Uint64`, `atomic.Int64`, `atomic.Bool`, `atomic.Pointer[T]`.",
                "Métodos idiomáticos: `Add()`, `Load()`, `Store()`, `Swap()`, `CompareAndSwap()`.",
                "Detección de carreras de datos: compila y prueba siempre con `go test -race` o `go run -race`."
            ]
        },
        "expertExpl": {
            "title": "Bajo Nivel, Rendimiento e Internals",
            "content": "Instrucciones de Hardware y Falso Compartido (False Sharing):\nA nivel de ensamblador en arquitecturas x86-64, `atomic.AddUint64` emite la instrucción `LOCK XADDQ`. El prefijo `LOCK` hace que el procesador bloquee la línea de caché correspondiente (Cache Line Lock de 64 bytes) mediante el protocolo de coherencia de caché (MESI/MOESI), garantizando exclusión mutua directa en el silicio de la CPU sin tocar el sistema operativo ni suspender la goroutine.\n\n¡Peligro de False Sharing (Falso Compartido)!: Si dos variables atómicas utilizadas intensivamente por distintos núcleos de CPU residen dentro de la misma línea de caché de 64 bytes, los núcleos de la CPU invalidarán constantemente sus cachés L1/L2 mutuamente, degradando el rendimiento hasta un 90%. Para evitarlo en estructuras de alto rendimiento, se agrega relleno (padding) de 64 bytes entre variables atómicas.",
            "keyPoints": [
                "Instrucción LOCK XADDQ: exclusión atómica nativa en el hardware de la CPU.",
                "Zero context switch overhead: no hay llamadas al kernel ni suspensión en el scheduler de Go.",
                "False Sharing Prevention: añadir `_ [56]byte` de relleno entre contadores atómicos adyacentes para evitar invalidaciones cruzadas de caché L1."
            ]
        },
        "evaluation": {
            "title": "Reto: Contador de Visitas Concurrente Seguro con atomic.Uint64",
            "statement": "Lanza 50 goroutines concurrentes. Cada una debe incrementar un contador compartido exactamente 100 veces. Implementa la solución utilizando el tipo moderno 'atomic.Uint64' y sync.WaitGroup. Comprueba que el resultado final sea exactamente 5000 sin ninguna carrera de datos.",
            "starterCode": "package main\n\nimport (\n    \"fmt\"\n    \"sync\"\n    \"sync/atomic\"\n)\n\nfunc main() {\n    // Define el contador con atomic.Uint64\n    // Lanza 50 goroutines con 100 incrementos cada una\n    // Imprime el valor final con Load()\n}",
            "hint": "Declara 'var contador atomic.Uint64'. En cada incremento haz: contador.Add(1). Al final: contador.Load().",
            "solution": "package main\n\nimport (\n    \"fmt\"\n    \"sync\"\n    \"sync/atomic\"\n)\n\nfunc main() {\n    var contador atomic.Uint64\n    var wg sync.WaitGroup\n    \n    numGoroutines := 50\n    incrementosPorGoroutine := 100\n    \n    wg.Add(numGoroutines)\n    for i := 0; i < numGoroutines; i++ {\n        go func() {\n            defer wg.Done()\n            for j := 0; j < incrementosPorGoroutine; j++ {\n                contador.Add(1) // Incremento atómico a nivel de CPU\n            }\n        }()\n    }\n    \n    wg.Wait()\n    \n    totalEsperado := numGoroutines * incrementosPorGoroutine\n    fmt.Printf(\"Total registrado: %d (Esperado: %d)\\n\", contador.Load(), totalEsperado)\n    \n    if contador.Load() == uint64(totalEsperado) {\n        fmt.Println(\"¡Sincronización atómica perfecta y libre de data races!\")\n    }\n}",
            "explanation": "El método 'contador.Add(1)' ejecuta una instrucción atómica de hardware por cada incremento. A pesar de que 50 goroutines escriben simultáneamente miles de veces, ninguna suma se pierde ni se corrompe en memoria, garantizando consistencia absoluta y máxima velocidad."
        },
        "externalLinks": [
            {"title": "Package sync/atomic", "url": "https://pkg.go.dev/sync/atomic", "description": "Documentación oficial de los tipos y operaciones atómicas de la biblioteca estándar."},
            {"title": "Go by Example: Atomic Counters", "url": "https://gobyexample.com/atomic-counters", "description": "Ejemplo en Go by Example."},
            {"title": "Ardan Labs: Concurrency, Goroutines and Atomic Operations", "url": "https://www.ardanlabs.com/blog/2014/01/concurrency-goroutines-and-channels.html", "description": "Análisis comparativo de rendimiento entre canales, mutexes y operaciones atómicas."}
        ]
    }
}
