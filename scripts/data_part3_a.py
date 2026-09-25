# scripts/data_part3_a.py
# Temas 44 a 53 (Mutexes, Stateful Goroutines, Sorting, Panic, Defer, Recover, Strings y Plantillas)

TOPICS_PART3_A = {
    "mutexes": {
        "id": 44,
        "slug": "mutexes",
        "title": "Mutexes",
        "titleEs": "Exclusión Mutua con Mutex y RWMutex",
        "category": "Sincronización y Concurrencia Avanzada",
        "categorySlug": "sincronizacion-avanzada",
        "categoryIcon": "⚙️",
        "difficulty": "Intermedio",
        "summary": "Protección de estructuras de datos complejas mediante exclusión mutua tradicional con sync.Mutex y sync.RWMutex.",
        "originalExpl": "Para estados más complejos que un simple contador podemos usar un Mutex (exclusión mutua) para acceder a los datos de forma segura a través de múltiples goroutines.",
        "basicExpl": {
            "title": "Conceptos Fundamentales para Principiantes",
            "content": "Un Mutex (Mutual Exclusion) es como el cerrojo del baño de un restaurante:\n- Cuando alguien entra, echa el cerrojo (`mutex.Lock()`).\n- Mientras la puerta tenga cerrojo, nadie más puede entrar; las demás personas tienen que esperar pacientemente afuera en la fila.\n- Cuando la persona sale, quita el cerrojo (`mutex.Unlock()`). Ahora la siguiente persona puede entrar.\nEn Go, protege mapas, slices y estructuras compartidas para que dos goroutines no las modifiquen al mismo tiempo provocando corrupción de memoria.",
            "keyPoints": [
                "Se encuentra en el paquete `sync`: `var mu sync.Mutex`.",
                "`mu.Lock()` adquiere el candado exclusivo; si ya está ocupado, pausa la goroutine.",
                "`mu.Unlock()` libera el candado.",
                "Usa siempre `defer mu.Unlock()` inmediatamente después de `mu.Lock()` para garantizar su liberación."
            ]
        },
        "interExpl": {
            "title": "Mecanismos Internos y Buenas Prácticas",
            "content": "sync.RWMutex (Lector-Escritor Mutex):\nSi tienes un mapa que se lee 1,000 veces por segundo pero solo se escribe una vez por minuto, bloquear a todos los lectores entre sí con un Mutex normal es un desperdicio enorme de rendimiento. Para esto existe `sync.RWMutex`:\n- Múltiples lectores simultáneos: `mu.RLock()` y `mu.RUnlock()` permiten que cientos de goroutines lean al mismo tiempo.\n- Escritor exclusivo: `mu.Lock()` y `mu.Unlock()` bloquean a todos los lectores y escritores mientras se realiza la modificación.",
            "keyPoints": [
                "`sync.RWMutex`: maximiza el rendimiento cuando las lecturas superan con creces a las escrituras.",
                "Composición en estructuras: se suele colocar el mutex junto al campo que protege: `type Cache struct { mu sync.RWMutex; datos map[string]string }`.",
                "Peligro de Deadlock: NUNCA intentes llamar a `mu.Lock()` dos veces en la misma goroutine sin desbloquear antes (los mutexes de Go NO son reentrantes)."
            ]
        },
        "expertExpl": {
            "title": "Bajo Nivel, Rendimiento e Internals",
            "content": "Modos Normal y Hambriento (Starvation Mode en sync/mutex.go):\nEl Mutex de Go implementa dos modos de funcionamiento dinámicos:\n1. Modo Normal: Las goroutines recién llegadas intentan adquirir el lock haciendo 'spin' (bucle activo corto de CPU). Esto es muy rápido porque no sufren cambio de contexto de scheduler, pero puede causar que una goroutine antigua en la cola espere demasiado.\n2. Modo Starvation (Inanición): Si una goroutine espera más de 1 milisegundo por el lock, el Mutex cambia automáticamente a modo 'Hambriento'. En este modo, el lock pasa DIRECTAMENTE a la primera goroutine de la cola de espera sin permitir que goroutines nuevas le roben el turno.\nEsto garantiza un equilibrio perfecto entre rendimiento extremo de pico y justicia (fairness) sin inanición.",
            "keyPoints": [
                "Starvation Mode (1ms threshold): previene la inanición de goroutines antiguas frente a ráfagas de goroutines nuevas.",
                "Non-reentrant: Go rechaza intencionadamente los mutexes reentrantes (recursivos) para obligar a un diseño claro de la concurrencia.",
                "Auditoría con `-race`: el detector de carreras de Go (`go test -race`) instrumenta cada lectura y escritura detectando violaciones de exclusión mutua."
            ]
        },
        "evaluation": {
            "title": "Reto: Cache en Memoria Concurrente con sync.RWMutex",
            "statement": "Crea una estructura 'CacheSegura' que proteja un mapa 'map[string]string' con sync.RWMutex. Implementa los métodos 'Obtener(clave string) (string, bool)' usando RLock y 'Guardar(clave, valor string)' usando Lock. Lanza 10 lectores y 2 escritores concurrentes y comprueba su funcionamiento.",
            "starterCode": "package main\n\nimport (\n    \"fmt\"\n    \"sync\"\n)\n\n// Define CacheSegura y sus métodos Obtener y Guardar\n\nfunc main() {\n    // Prueba con goroutines concurrentes\n}",
            "hint": "En Obtener haz: c.mu.RLock(); defer c.mu.RUnlock(). En Guardar haz: c.mu.Lock(); defer c.mu.Unlock().",
            "solution": "package main\n\nimport (\n    \"fmt\"\n    \"sync\"\n    \"time\"\n)\n\ntype CacheSegura struct {\n    mu    sync.RWMutex\n    datos map[string]string\n}\n\nfunc NuevaCache() *CacheSegura {\n    return &CacheSegura{datos: make(map[string]string)}\n}\n\nfunc (c *CacheSegura) Obtener(clave string) (string, bool) {\n    c.mu.RLock()         // Permite múltiples lecturas simultáneas\n    defer c.mu.RUnlock()\n    val, ok := c.datos[clave]\n    return val, ok\n}\n\nfunc (c *CacheSegura) Guardar(clave, valor string) {\n    c.mu.Lock()          // Exclusión total para escribir\n    defer c.mu.Unlock()\n    c.datos[clave] = valor\n}\n\nfunc main() {\n    cache := NuevaCache()\n    var wg sync.WaitGroup\n    \n    // Escritores\n    for i := 1; i <= 2; i++ {\n        wg.Add(1)\n        go func(id int) {\n            defer wg.Done()\n            k := fmt.Sprintf(\"k%d\", id)\n            cache.Guardar(k, fmt.Sprintf(\"valor-%d\", id))\n        }(i)\n    }\n    \n    // Lectores\n    for i := 1; i <= 6; i++ {\n        wg.Add(1)\n        go func(id int) {\n            defer wg.Done()\n            time.Sleep(10 * time.Millisecond)\n            v, ok := cache.Obtener(\"k1\")\n            if ok {\n                fmt.Printf(\"[Lector %d] Lectura: %s\\n\", id, v)\n            }\n        }(i)\n    }\n    \n    wg.Wait()\n    fmt.Println(\"Operaciones concurrentes finalizadas sin carreras de datos.\")\n}",
            "explanation": "El uso de sync.RWMutex protege el mapa interno de accesos concurrentes destructivos. Múltiples goroutines pueden ejecutar Obtener() al mismo tiempo gracias a RLock(), mientras que Guardar() asegura exclusividad atómica total con Lock()."
        },
        "externalLinks": [
            {"title": "Package sync: Mutex and RWMutex", "url": "https://pkg.go.dev/sync#Mutex", "description": "Documentación oficial de la biblioteca estándar para Mutex y RWMutex."},
            {"title": "Go by Example: Mutexes", "url": "https://gobyexample.com/mutexes", "description": "Ejemplo interactivo en Go by Example."},
            {"title": "The Go Blog: Introducing the Go Race Detector", "url": "https://go.dev/blog/race-detector", "description": "Cómo funciona el detector de carreras ThreadSanitizer en Go."}
        ]
    },

    "stateful-goroutines": {
        "id": 45,
        "slug": "stateful-goroutines",
        "title": "Stateful Goroutines",
        "titleEs": "Goroutines con Estado (Actor Pattern)",
        "category": "Sincronización y Concurrencia Avanzada",
        "categorySlug": "sincronizacion-avanzada",
        "categoryIcon": "⚙️",
        "difficulty": "Avanzado",
        "summary": "Gestión de estado concurrente delegando la propiedad exclusiva de los datos a una única goroutine dedicada.",
        "originalExpl": "En el ejemplo anterior usamos mutexes para sincronizar el acceso a un estado compartido. Otra opción es delegar la gestión del estado a una única goroutine dedicada que se comunica mediante canales. Esto sigue la filosofía de Go de compartir memoria comunicándose.",
        "basicExpl": {
            "title": "Conceptos Fundamentales para Principiantes",
            "content": "En vez de poner candados (mutexes) para que varias personas toquen los mismos datos, contratas a un 'administrador' exclusivo:\n- Una única goroutine se queda sentada cuidando los datos (el estado).\n- Nadie más puede tocar los datos directamente.\n- Si alguien quiere leer o modificar algo, le envía una carta (un canal) al administrador pidiéndoselo.\n- El administrador atiende una petición a la vez y responde por un canal privado.\nEsto elimina por completo las carreras de datos y la necesidad de recordar poner y quitar cerrojos.",
            "keyPoints": [
                "Una única goroutine es la dueña absoluta del estado.",
                "Los clientes se comunican con ella exclusivamente a través de canales.",
                "Inspirado en el modelo de actores (Actor Model estilo Erlang o Akka)."
            ]
        },
        "interExpl": {
            "title": "Mecanismos Internos y Buenas Prácticas",
            "content": "Estructuras de Solicitud de Lectura y Escritura:\nSe definen estructuras de comando que contienen los datos de la petición y un canal de respuesta privado (unbuffered response channel):\n```go\ntype LecturaReq struct {\n    Clave     int\n    Respuesta chan int\n}\ntype EscrituraReq struct {\n    Clave     int\n    Valor     int\n    Respuesta chan bool\n}\n```\nLa goroutine del estado corre un bucle `for { select { ... } }` atendiendo las peticiones secuencialmente.",
            "keyPoints": [
                "Canal de respuesta embebido: cada petición lleva su propio canal para recibir la respuesta privada.",
                "Cero locks manuales: la sincronización se deriva naturalmente de la comunicación por canales.",
                "Cuándo elegirlo: excelente cuando la lógica de mutación de estado involucra múltiples pasos o reglas complejas que serían difíciles de proteger con mutexes simples."
            ]
        },
        "expertExpl": {
            "title": "Bajo Nivel, Rendimiento e Internals",
            "content": "Comparativa de Rendimiento frente a Mutexes:\nUn Mutex no contaminado cuesta solo ~10-15 nanosegundos por operación (una simple instrucción atómica de hardware). En cambio, el patrón Stateful Goroutine requiere:\n1. Asignar las estructuras de comando y canales de respuesta en el heap.\n2. Al menos 2 operaciones de canal (envío de la orden + recepción de la respuesta), provocando conmutaciones de contexto entre goroutines en el scheduler.\n\nPor tanto, una Stateful Goroutine suele ser entre 4 y 10 veces más lenta en términos de CPU pura que un Mutex bien optimizado. Sin embargo, su valor no reside en la micro-velocidad, sino en la robustez arquitectónica: elimina de raíz la posibilidad de bloqueos mutuos anidados (deadlocks de orden de mutex) y simplifica los tests de integración.",
            "keyPoints": [
                "Overhead de sincronización: mayor latencia por mensaje que un Mutex puro debido a la conmutación de goroutines.",
                "Eliminación de deadlocks: no existen bloqueos cruzados entre mutexes.",
                "Arquitectura determinista: las operaciones se procesan en un orden serializado estrictamente FIFO según el canal."
            ]
        },
        "evaluation": {
            "title": "Reto: Gestor de Puntos de Usuario con Goroutine con Estado",
            "statement": "Implementa un gestor de puntos concurrente utilizando una Goroutine con Estado. Debe admitir dos tipos de mensajes: 'SumarPuntos{Usuario string, Puntos int}' y 'ConsultarPuntos{Usuario string, Resp chan int}'. Lanza múltiples goroutines concurrentes sumando puntos y consulta el balance final.",
            "starterCode": "package main\n\nimport \"fmt\"\n\n// Define los structs de mensaje y la goroutine administradora\n\nfunc main() {\n    // Lanza el gestor y prueba la concurrencia\n}",
            "hint": "Crea dos canales: sumaCh y consultaCh. La goroutine gestora ejecuta un select sobre ambos.",
            "solution": "package main\n\nimport \"fmt\"\n\ntype SumarPuntos struct {\n    Usuario string\n    Puntos  int\n}\n\ntype ConsultarPuntos struct {\n    Usuario string\n    Resp    chan int\n}\n\nfunc gestorPuntos(sumaCh <-chan SumarPuntos, consultaCh <-chan ConsultarPuntos) {\n    puntos := make(map[string]int)\n    for {\n        select {\n        case cmd := <-sumaCh:\n            puntos[cmd.Usuario] += cmd.Puntos\n        case req := <-consultaCh:\n            req.Resp <- puntos[req.Usuario]\n        }\n    }\n}\n\nfunc main() {\n    sumaCh := make(chan SumarPuntos)\n    consultaCh := make(chan ConsultarPuntos)\n    \n    go gestorPuntos(sumaCh, consultaCh)\n    \n    // Sumas concurrentes\n    sumaCh <- SumarPuntos{Usuario: \"Carlos\", Puntos: 50}\n    sumaCh <- SumarPuntos{Usuario: \"Carlos\", Puntos: 30}\n    sumaCh <- SumarPuntos{Usuario: \"Marta\", Puntos: 100}\n    \n    // Consulta de balance\n    respCh := make(chan int)\n    consultaCh <- ConsultarPuntos{Usuario: \"Carlos\", Resp: respCh}\n    totalCarlos := <-respCh\n    \n    consultaCh <- ConsultarPuntos{Usuario: \"Marta\", Resp: respCh}\n    totalMarta := <-respCh\n    \n    fmt.Printf(\"Balance final -> Carlos: %d pts | Marta: %d pts\\n\", totalCarlos, totalMarta)\n}",
            "explanation": "El mapa 'puntos' pertenece exclusivamente a la goroutine 'gestorPuntos'. Nadie más tiene acceso a él. Todas las mutaciones y lecturas ocurren en orden serializado a través de los canales, garantizando total consistencia sin utilizar un solo cerrojo o mutex."
        },
        "externalLinks": [
            {"title": "The Go Blog: Share Memory By Communicating", "url": "https://go.dev/blog/codelab-share", "description": "Artículo fundacional sobre la filosofía de diseño concurrente en Go."},
            {"title": "Go by Example: Stateful Goroutines", "url": "https://gobyexample.com/stateful-goroutines", "description": "Ejemplo en Go by Example."},
            {"title": "Effective Go: Concurrency by communication", "url": "https://go.dev/doc/effective_go#concurrency", "description": "Guía canónica de diseño sobre comunicación entre goroutines."}
        ]
    },

    "sorting": {
        "id": 46,
        "slug": "sorting",
        "title": "Sorting",
        "titleEs": "Ordenamiento con Paquetes Slices y Sort",
        "category": "Manipulación de Texto y Formatos",
        "categorySlug": "texto-formatos",
        "categoryIcon": "🔤",
        "difficulty": "Principiante",
        "summary": "Ordenamiento rápido y eficiente de colecciones primitivas utilizando el paquete estándar moderno 'slices' y el clásico 'sort'.",
        "originalExpl": "El paquete de ordenamiento de Go implementa algoritmos de ordenamiento para tipos integrados y definidos por el usuario. Desde Go 1.21, el paquete 'slices' proporciona funciones de ordenamiento genéricas mucho más convenientes y rápidas.",
        "basicExpl": {
            "title": "Conceptos Fundamentales para Principiantes",
            "content": "Ordenar una lista de elementos alfabéticamente o de menor a mayor es una de las tareas más comunes en informática:\n- Para ordenar un slice de cadenas de texto: `slices.Sort(misTextos)`.\n- Para ordenar un slice de números: `slices.Sort(misNumeros)`.\n- Para comprobar si una lista ya está ordenada: `slices.IsSorted(miSlice)`.\nEl ordenamiento en Go se realiza 'in-place': modifica directamente el slice original sin crear una copia nueva.",
            "keyPoints": [
                "Paquete moderno en Go 1.21+: `import \"slices\"` con `slices.Sort()`.",
                "Genérico y automático para cualquier tipo comparable ordenable (números, strings).",
                "Modifica el slice directamente en memoria (in-place)."
            ]
        },
        "interExpl": {
            "title": "Mecanismos Internos y Buenas Prácticas",
            "content": "Diferencia histórica entre `sort` y `slices`:\n- Antes de Go 1.21 se utilizaba el paquete `sort` (`sort.Ints(s)`, `sort.Strings(s)` o implementar `sort.Interface` con 3 métodos: Len, Less, Swap). Esto implicaba conversiones de interfaz y sobrecoste de llamadas dinámicas.\n- En Go moderno (1.21+), `slices.Sort()` es una función genérica `[S ~[]E, E cmp.Ordered](x S)` que opera directamente sobre los tipos concretos sin overhead de interfaz ni asignaciones de memoria adicionales.",
            "keyPoints": [
                "`slices.Sort` sustituye a `sort.Ints` y `sort.Strings` con mayor velocidad.",
                "Búsqueda binaria O(log N): `slices.BinarySearch(s, objetivo)` encuentra índices en slices ya ordenados instantáneamente.",
                "Estabilidad: Si necesitas preservar el orden relativo de elementos idénticos, utiliza `slices.SortStableFunc`."
            ]
        },
        "expertExpl": {
            "title": "Bajo Nivel, Rendimiento e Internals",
            "content": "Algoritmo Pattern-Defeating Quicksort (pdqsort):\nTanto el paquete `slices` como `sort` en Go utilizan internamente 'pdqsort' (creado por Orson Peters):\n- Combina la velocidad media de Quicksort rápido con la garantía en el peor de los casos de Heapsort O(N log N).\n- Para subsecuencias muy pequeñas (≤ 24 elementos), cambia automáticamente a Insertion Sort para aprovechar los registros de hardware y la caché L1.\n- Detecta si los datos ya están casi ordenados (o en orden inverso) y conmuta a un algoritmo O(N) lineal.\nAl no usar interfaces, el compilador puede aplicar inlining a las comparaciones directamente en código máquina.",
            "keyPoints": [
                "Algoritmo pdqsort: rendimiento O(N) en el mejor caso y O(N log N) garantizado en el peor.",
                "Inlining de comparadores: las comparaciones genéricas se traducen a instrucciones simples de CPU (CMP / JLE).",
                "Zero-alloc: el algoritmo no asigna ninguna memoria en el Heap (0 B/op)."
            ]
        },
        "evaluation": {
            "title": "Reto: Búsqueda Binaria y Verificación de Orden",
            "statement": "Declara un slice desordenado de enteros [45, 12, 89, 33, 2, 77]. Comprueba con slices.IsSorted que no está ordenado, ordénalo con slices.Sort, verifica que ahora sí está ordenado y utiliza slices.BinarySearch para encontrar la posición del número 33.",
            "starterCode": "package main\n\nimport (\n    \"fmt\"\n    \"slices\"\n)\n\nfunc main() {\n    datos := []int{45, 12, 89, 33, 2, 77}\n    // Comprueba, ordena, comprueba de nuevo y busca 33\n}",
            "hint": "Usa slices.IsSorted(datos), slices.Sort(datos) y idx, encontrado := slices.BinarySearch(datos, 33).",
            "solution": "package main\n\nimport (\n    \"fmt\"\n    \"slices\"\n)\n\nfunc main() {\n    datos := []int{45, 12, 89, 33, 2, 77}\n    fmt.Printf(\"Original: %v (¿Ordenado?: %t)\\n\", datos, slices.IsSorted(datos))\n    \n    slices.Sort(datos)\n    fmt.Printf(\"Ordenado: %v (¿Ordenado?: %t)\\n\", datos, slices.IsSorted(datos))\n    \n    idx, encontrado := slices.BinarySearch(datos, 33)\n    if encontrado {\n        fmt.Printf(\"El número 33 se encuentra en el índice: %d\\n\", idx)\n    } else {\n        fmt.Println(\"Número no encontrado\")\n    }\n}",
            "explanation": "La función 'slices.Sort' reorganiza in-place los enteros con el algoritmo pdqsort. Una vez ordenado, 'slices.BinarySearch' localiza el valor 33 con complejidad O(log N) devolviendo la posición exacta en el slice."
        },
        "externalLinks": [
            {"title": "Package slices: Sort and BinarySearch", "url": "https://pkg.go.dev/slices#Sort", "description": "Documentación oficial del paquete slices en la biblioteca estándar."},
            {"title": "The Go Blog: Pattern-defeating Quicksort in Go 1.19", "url": "https://go.dev/doc/go1.19#sort", "description": "Detalles técnicos sobre la adopción del algoritmo pdqsort en Go."},
            {"title": "Go by Example: Sorting", "url": "https://gobyexample.com/sorting", "description": "Ejemplo en Go by Example."}
        ]
    },

    "sorting-by-functions": {
        "id": 47,
        "slug": "sorting-by-functions",
        "title": "Sorting by Functions",
        "titleEs": "Ordenamiento Personalizado con Funciones",
        "category": "Manipulación de Texto y Formatos",
        "categorySlug": "texto-formatos",
        "categoryIcon": "🔤",
        "difficulty": "Intermedio",
        "summary": "Ordenamiento de colecciones complejas o structs utilizando comparadores personalizados mediante slices.SortFunc y cmp.Compare.",
        "originalExpl": "A veces queremos ordenar una colección por algo que no sea su orden natural. Por ejemplo, supongamos que queremos ordenar cadenas por su longitud en lugar de alfabéticamente.",
        "basicExpl": {
            "title": "Conceptos Fundamentales para Principiantes",
            "content": "Por defecto, Go sabe cómo ordenar números (1, 2, 3) y palabras alfabéticamente (\"a\", \"b\", \"c\"). Pero, ¿qué pasa si quieres ordenar una lista de palabras por su longitud (de más corta a más larga) o una lista de Usuarios por su edad o salario?\nPara eso se usa `slices.SortFunc`:\n- Le pasas tu lista y una pequeña función comparadora.\n- Tu función comparadora recibe dos elementos (a y b) y le dice a Go quién va primero devolviendo un número negativo, cero o positivo.",
            "keyPoints": [
                "Se usa `slices.SortFunc(slice, funcionComparadora)`.",
                "La función comparadora `cmp(a, b)` devuelve:\n  - Número negativo si `a < b`\n  - Cero si `a == b`\n  - Número positivo si `a > b`.",
                "El paquete estándar `cmp.Compare(a, b)` hace esta comparación automáticamente para cualquier tipo ordenable."
            ]
        },
        "interExpl": {
            "title": "Mecanismos Internos y Buenas Prácticas",
            "content": "Uso de `cmp.Compare` y ordenamiento multicriterio:\nLa forma más limpia y moderna en Go 1.21+ es combinar `slices.SortFunc` con `cmp.Compare`:\n```go\nslices.SortFunc(personas, func(a, b Persona) int {\n    // Criterio 1: Ordenar por Edad ascendente\n    if n := cmp.Compare(a.Edad, b.Edad); n != 0 {\n        return n\n    }\n    // Criterio 2: En caso de empate en edad, ordenar por Nombre alfabético\n    return cmp.Compare(a.Nombre, b.Nombre)\n})\n```\nEsto evita escribir operadores `<`, `>` manuales propensos a errores de signo y maneja empates de forma sumamente legible.",
            "keyPoints": [
                "Uso de `cmp.Compare(a, b)`: estándar idiomático para funciones comparadoras en Go moderno.",
                "Orden inverso: simplemente intercambia los argumentos: `cmp.Compare(b.Precio, a.Precio)` para orden descendente.",
                "Estabilidad de orden: usar `slices.SortStableFunc` si es obligatorio que elementos con valores iguales conserven su orden relativo original."
            ]
        },
        "expertExpl": {
            "title": "Bajo Nivel, Rendimiento e Internals",
            "content": "Paso de structs pesados en la función comparadora:\nLa firma estándar de `slices.SortFunc[E any]` evalúa `cmp func(a, b E) int`. Si `E` es un struct grande (ejemplo: 256 bytes), pasar `(a, b E)` por valor copia 512 bytes en cada una de las O(N log N) comparaciones que realiza el algoritmo de ordenamiento, degradando significativamente el tiempo de CPU y la tasa de aciertos de la caché L1.\n\nOptimización experta: Si vas a ordenar una colección grande de structs pesados, utiliza un slice de punteros (`[]*MiStructGrande`) o define el slice de forma que el comparador reciba punteros, reduciendo el coste de cada llamada de comparación a dos simples registros de puntero de 8 bytes.",
            "keyPoints": [
                "Evitar copias en structs grandes: ordenar `[]*T` en lugar de `[]T` para estructuras pesadas.",
                "Inlining de comparadores anónimos: el compilador de Go intenta aplicar inlining a la función closure si no escapa.",
                "Comparadores estrictos: la función comparadora debe respetar una relación de orden estricto (antirreflexiva, asimétrica y transitiva) para evitar comportamientos indefinidos en pdqsort."
            ]
        },
        "evaluation": {
            "title": "Reto: Ordenar Catálogo de Productos por Precio Descendente y Nombre",
            "statement": "Define una estructura 'Producto' con 'Nombre' (string) y 'Precio' (float64). Crea una lista de 4 productos y ordénalos con slices.SortFunc de forma que los más caros aparezcan primero (precio descendente). Si dos productos tienen exactamente el mismo precio, deben ordenarse alfabéticamente por nombre.",
            "starterCode": "package main\n\nimport (\n    \"cmp\"\n    \"fmt\"\n    \"slices\"\n)\n\ntype Producto struct {\n    Nombre string\n    Precio float64\n}\n\nfunc main() {\n    catalogo := []Producto{\n        {\"Teclado Mecánico\", 89.99},\n        {\"Ratón Gamer\", 49.99},\n        {\"Monitor 27''\", 249.99},\n        {\"Auriculares Pro\", 89.99},\n    }\n    // Ordena con slices.SortFunc e imprime\n}",
            "hint": "Para precio descendente haz cmp.Compare(b.Precio, a.Precio). Si da 0, haz cmp.Compare(a.Nombre, b.Nombre).",
            "solution": "package main\n\nimport (\n    \"cmp\"\n    \"fmt\"\n    \"slices\"\n)\n\ntype Producto struct {\n    Nombre string\n    Precio float64\n}\n\nfunc main() {\n    catalogo := []Producto{\n        {\"Teclado Mecánico\", 89.99},\n        {\"Ratón Gamer\", 49.99},\n        {\"Monitor 27''\", 249.99},\n        {\"Auriculares Pro\", 89.99},\n    }\n    \n    slices.SortFunc(catalogo, func(a, b Producto) int {\n        // Criterio 1: Precio descendente (mayor precio primero)\n        if n := cmp.Compare(b.Precio, a.Precio); n != 0 {\n            return n\n        }\n        // Criterio 2: Desempate por Nombre ascendente (A-Z)\n        return cmp.Compare(a.Nombre, b.Nombre)\n    })\n    \n    fmt.Println(\"Catálogo ordenado:\")\n    for _, p := range catalogo {\n        fmt.Printf(\"- %-20s : $%.2f\\n\", p.Nombre, p.Precio)\n    }\n}",
            "explanation": "El comparador invierte los argumentos en cmp.Compare(b.Precio, a.Precio) para lograr orden descendente de precios. Cuando dos artículos empatan a $89.99 (Teclado y Auriculares), el segundo comparador por nombre los desempata alfabéticamente ('Auriculares Pro' antes de 'Teclado Mecánico')."
        },
        "externalLinks": [
            {"title": "Package slices: SortFunc", "url": "https://pkg.go.dev/slices#SortFunc", "description": "Documentación oficial de la función genérica slices.SortFunc."},
            {"title": "Package cmp: Compare function", "url": "https://pkg.go.dev/cmp#Compare", "description": "Documentación oficial del paquete cmp de ordenamiento."},
            {"title": "Go by Example: Sorting by Functions", "url": "https://gobyexample.com/sorting-by-functions", "description": "Ejemplo interactivo en Go by Example."}
        ]
    },

    "panic": {
        "id": 48,
        "slug": "panic",
        "title": "Panic",
        "titleEs": "Pánico (Panic) y Errores Fatales",
        "category": "Manejo de Errores y Excepciones",
        "categorySlug": "errores-panico",
        "categoryIcon": "🛡️",
        "difficulty": "Intermedio",
        "summary": "Mecanismo nativo de parada de emergencia cuando un programa entra en un estado imposible del que no puede recuperarse.",
        "originalExpl": "Un panic típicamente significa que algo salió inesperadamente mal. Mayormente lo usamos para fallar rápidamente en errores que no deberían ocurrir durante la operación normal, o que no estamos preparados para manejar con gracia.",
        "basicExpl": {
            "title": "Conceptos Fundamentales para Principiantes",
            "content": "En Go los errores normales (como no encontrar un archivo o una contraseña incorrecta) se manejan con `return err` de forma tranquila.\nUn `panic` es el botón rojo de emergencia de un reactor nuclear: se usa solo cuando ocurre una catástrofe que hace imposible continuar (por ejemplo, si la base de datos central no existe o la memoria está corrupta):\n- Se dispara con `panic(\"mensaje de catástrofe\")`.\n- Detiene inmediatamente la ejecución normal de la función.\n- Ejecuta cualquier función `defer` que hubieras programado antes.\n- Imprime la traza completa de llamadas (stack trace) y finaliza el programa con código de error.",
            "keyPoints": [
                "Se usa exclusivamente para errores verdaderamente excepcionales e irrecuperables.",
                "No uses panic para el flujo normal de control o validaciones de usuario.",
                "Las funciones diferidas con `defer` SIEMPRE se ejecutan aunque ocurra un pánico."
            ]
        },
        "interExpl": {
            "title": "Mecanismos Internos y Buenas Prácticas",
            "content": "Pánicos provocados por el propio runtime de Go:\nAdemás de invocar `panic()` manualmente, el propio runtime de Go genera pánicos en situaciones críticas como:\n1. Desreferenciar un puntero nulo (`nil pointer dereference`).\n2. Acceder a un índice fuera de los límites de un slice o array (`index out of range`).\n3. Enviar datos a un canal que ya fue cerrado (`send on closed channel`).\n\nConvención en paquetes y bibliotecas: Una biblioteca de Go NUNCA debe permitir que un pánico escape hacia el código del usuario. Si internamente usa un pánico por conveniencia para salir de una recursión profunda, debe capturarlo en el límite del paquete público usando `recover()` y devolver un `error` estándar.",
            "keyPoints": [
                "Regla de diseño de bibliotecas: nunca dejes escapar un panic hacia los consumidores de tu API.",
                "Ejecución de defers: el proceso de pánico 'desenrolla la pila' (stack unwinding) ejecutando ordenadamente todos los defers pendientes.",
                "Pánicos fatales irrecuperables: errores de concurrencia como `concurrent map writes` o desbordamiento físico de memoria del sistema son crasheos directos que ni siquiera un recover puede salvar."
            ]
        },
        "expertExpl": {
            "title": "Bajo Nivel, Rendimiento e Internals",
            "content": "Mecánica interna de `runtime.gopanic` (runtime/panic.go):\nCuando ocurre un pánico, el runtime de Go crea una estructura `_panic` y la enlaza a la goroutine actual (`gp._panic`). Luego inicia el proceso de 'Stack Unwinding':\n1. Recorre la lista de estructuras `_defer` asociadas a cada marco de llamada de la goroutine de abajo hacia arriba.\n2. Ejecuta cada función diferida.\n3. Si una función defer invoca a `recover()`, la estructura `_panic` se marca como recuperada (`recovered = true`) y el flujo normal se reanuda en el punto posterior a la llamada.\n4. Si la pila llega a su base sin ser recuperada, el runtime imprime el traceback completo de todas las goroutines activas en stderr y aborta el proceso con la señal de salida del sistema operativo.",
            "keyPoints": [
                "Estructura _panic en la goroutine: lista enlazada que permite pánicos anidados.",
                "Stack Unwinding determinista: garantía estricta de limpieza de recursos asociados a defer.",
                "Variable de entorno `GOTRACEBACK`: controla el nivel de detalle del crash dump (none, single, all, system, crash)."
            ]
        },
        "evaluation": {
            "title": "Reto: Inicialización Crítica de Configuración con Falso Positivo",
            "statement": "Escribe una función 'CargarConfiguracion(puerto int)' que verifique si el puerto está en el rango válido (1 a 65535). Si el puerto es 0 o negativo, debe lanzar un panic con un mensaje descriptivo. Llama a la función con un puerto válido y luego con un puerto inválido.",
            "starterCode": "package main\n\nimport \"fmt\"\n\nfunc CargarConfiguracion(puerto int) {\n    // Lanza panic si puerto <= 0 o > 65535\n    fmt.Printf(\"Configuración cargada en puerto %d\\n\", puerto)\n}\n\nfunc main() {\n    CargarConfiguracion(8080)\n    // Descomenta la siguiente línea para observar el pánico\n    // CargarConfiguracion(-1)\n}",
            "hint": "Usa if puerto <= 0 || puerto > 65535 { panic(\"...\") }.",
            "solution": "package main\n\nimport \"fmt\"\n\nfunc CargarConfiguracion(puerto int) {\n    if puerto <= 0 || puerto > 65535 {\n        panic(fmt.Sprintf(\"puerto de red inválido: %d (debe estar entre 1 y 65535)\", puerto))\n    }\n    fmt.Printf(\"Servidor configurado correctamente en puerto: %d\\n\", puerto)\n}\n\nfunc main() {\n    fmt.Println(\"--- Caso 1: Puerto válido ---\")\n    CargarConfiguracion(8080)\n    \n    fmt.Println(\"\\n--- Caso 2: Puerto inválido (provocará pánico deliberado) ---\")\n    // En situaciones reales este panic detendría el proceso inmediatamente\n    defer func() {\n        if r := recover(); r != nil {\n            fmt.Println(\"[Pánico interceptado con éxito]:\", r)\n        }\n    }()\n    CargarConfiguracion(-1)\n}",
            "explanation": "El uso de 'panic' es apropiado al inicializar la aplicación en la función de arranque (bootstrapping): si la configuración básica es errónea, no tiene sentido continuar ejecutando el servidor en un estado corrupto."
        },
        "externalLinks": [
            {"title": "The Go Blog: Defer, Panic, and Recover", "url": "https://go.dev/blog/defer-panic-and-recover", "description": "El artículo fundamental de Go sobre el ciclo de vida de pánicos y recuperaciones."},
            {"title": "Effective Go: Panic", "url": "https://go.dev/doc/effective_go#panic", "description": "Guía idiomática sobre cuándo está justificado utilizar panic."},
            {"title": "Go Spec: Handling panics", "url": "https://go.dev/ref/spec#Handling_panics", "description": "Especificación formal del comportamiento de la función panic."}
        ]
    },

    "defer": {
        "id": 49,
        "slug": "defer",
        "title": "Defer",
        "titleEs": "Ejecución Diferida (Defer)",
        "category": "Manejo de Errores y Excepciones",
        "categorySlug": "errores-panico",
        "categoryIcon": "🛡️",
        "difficulty": "Principiante",
        "summary": "Pospone la ejecución de una función hasta que la función que la contiene termine, ideal para limpieza de recursos.",
        "originalExpl": "Defer se utiliza para asegurar que una llamada a función se realice más tarde en la ejecución del programa, usualmente para propósitos de limpieza. defer se usa a menudo donde otros lenguajes usan finally.",
        "basicExpl": {
            "title": "Conceptos Fundamentales para Principiantes",
            "content": "Imagina que abres la puerta de tu casa al entrar. Lo normal es pensar inmediatamente: 'Cuando me vaya, tengo que cerrar la puerta'.\nLa palabra `defer` te permite programar una acción para que se ejecute justo al momento de salir de la función actual:\n- Abres un archivo: `archivo, err := os.Open(\"datos.txt\")`.\n- Inmediatamente en la siguiente línea programas el cierre: `defer archivo.Close()`.\n- No importa si tu función tiene 20 salidas con `return` diferentes o si ocurre un error a mitad de camino: Go garantiza al 100% que el archivo se cerrará automáticamente al salir.",
            "keyPoints": [
                "Pospone la llamada hasta el momento exacto en que la función circundante retorna.",
                "Se ejecuta SIEMPRE: tanto si la función termina con normalidad como si sufre un pánico.",
                "Múltiples llamadas a `defer` se ejecutan en orden LIFO (Last-In, First-Out: la última que programas es la primera en ejecutarse)."
            ]
        },
        "interExpl": {
            "title": "Mecanismos Internos y Buenas Prácticas",
            "content": "Evaluación inmediata de argumentos en defer:\nUn error conceptual muy frecuente en principiantes es creer que los argumentos de la función diferida se calculan al final. En Go, los argumentos de una función llamada con `defer` se evalúan INMEDIATAMENTE en la línea donde se escribe el defer, pero el cuerpo de la función se ejecuta al salir:\n```go\nx := 10\ndefer fmt.Println(\"Valor en defer:\", x) // Se evalúa x=10 en este instante\nx = 20\n// Al salir, imprimirá 10, no 20.\n```\nSi quieres capturar el valor final de `x`, debes envolverlo en una función anónima: `defer func() { fmt.Println(x) }()`.",
            "keyPoints": [
                "Evaluación inmediata de parámetros: los argumentos pasados a la función deferida se capturan en el momento de la declaración.",
                "Modificación de retornos nombrados: una clausura diferida puede leer y modificar los valores de retorno nombrados de una función antes de que lleguen al llamador.",
                "Trampa de defer en bucles largos: `defer` no se ejecuta al final de cada iteración del bucle, sino al final de la FUNCIÓN completa; usar defer en bucles de millones de archivos puede agotar los descriptores del sistema."
            ]
        },
        "expertExpl": {
            "title": "Bajo Nivel, Rendimiento e Internals",
            "content": "Evolución histórica y 'Open-Coded Defers' (Go 1.14+):\nHistóricamente, cada llamada a `defer` requería asignar una estructura `_defer` en el heap y registrarla en una lista enlazada, lo que suponía un coste de ~35-50 nanosegundos por llamada.\nEn Go 1.14 se implementaron los 'Open-Coded Defers': si la función tiene un número fijo y predecible de defers (no dinámicos en bucles), el compilador elimina por completo las asignaciones de memoria y compila el defer directamente como instrucciones de salto en línea antes de cada instrucción `RET` de ensamblador, reduciendo el sobrecoste a casi CERO nanosegundos (prácticamente idéntico a llamar a la función de limpieza manualmente).",
            "keyPoints": [
                "Open-Coded Defers: optimización del compilador que reduce el coste de defer a ~1-2 nanosegundos.",
                "Pila LIFO: implementado como una estructura de pila invertida en el stack marco de la función.",
                "Desempaque en pánico: el runtime mantiene metadatos en tablas de símbolos para desenrollar defers incluso si el optimizador aplicó inlining."
            ]
        },
        "evaluation": {
            "title": "Reto: Medidor de Tiempo de Ejecución con Defer",
            "statement": "Escribe una función 'MedirTiempo(nombre string) func()' que registre la hora de inicio y devuelva una función anónima que calcule y muestre la duración transcurrida. Utiliza el modismo de una sola línea 'defer MedirTiempo(\"Operación\")()' para medir el tiempo de una tarea simulada.",
            "starterCode": "package main\n\nimport (\n    \"fmt\"\n    \"time\"\n)\n\n// Implementa MedirTiempo\n\nfunc tareaPesada() {\n    // Usa defer MedirTiempo(...)()\n    time.Sleep(120 * time.Millisecond)\n}\n\nfunc main() {\n    tareaPesada()\n}",
            "hint": "MedirTiempo debe registrar inicio := time.Now() y retornar func() { fmt.Println(..., time.Since(inicio)) }.",
            "solution": "package main\n\nimport (\n    \"fmt\"\n    \"time\"\n)\n\nfunc MedirTiempo(nombre string) func() {\n    inicio := time.Now()\n    fmt.Printf(\"[INICIO] %s a las %s\\n\", nombre, inicio.Format(\"15:04:05.000\"))\n    return func() {\n        duracion := time.Since(inicio)\n        fmt.Printf(\"[FIN] %s tardó exactamente: %v\\n\", nombre, duracion)\n    }\n}\n\nfunc procesarLote() {\n    defer MedirTiempo(\"Procesamiento de Lote\")()\n    \n    // Simula trabajo intensivo\n    time.Sleep(120 * time.Millisecond)\n}\n\nfunc main() {\n    procesarLote()\n}",
            "explanation": "El patrón `defer MedirTiempo()()` es un modismo extremadamente elegante en Go: la función externa se ejecuta de inmediato (capturando la hora de inicio), y la función retornada queda programada con defer para ejecutarse al final de la función, calculando la diferencia con time.Since() automáticamente."
        },
        "externalLinks": [
            {"title": "The Go Blog: Defer, Panic, and Recover", "url": "https://go.dev/blog/defer-panic-and-recover", "description": "Artículo oficial de Go sobre las reglas y uso idiomático de defer."},
            {"title": "Go by Example: Defer", "url": "https://gobyexample.com/defer", "description": "Ejemplo en Go by Example."},
            {"title": "Eli Bendersky: How defer works in Go", "url": "https://eli.thegreenplace.net/2023/how-defer-works-in-go/", "description": "Análisis exhaustivo del código ensamblador y evolución de open-coded defers en Go."}
        ]
    },

    "recover": {
        "id": 50,
        "slug": "recover",
        "title": "Recover",
        "titleEs": "Recuperación de Pánico con Recover",
        "category": "Manejo de Errores y Excepciones",
        "categorySlug": "errores-panico",
        "categoryIcon": "🛡️",
        "difficulty": "Intermedio",
        "summary": "Captura y control de pánicos dentro de funciones diferidas para restaurar el flujo normal y prevenir el colapso del proceso.",
        "originalExpl": "Go hace posible recuperarse de un pánico usando la función integrada recover(). Un recover solo es útil dentro de funciones diferidas (defer). Durante una ejecución normal, recover devuelve nil.",
        "basicExpl": {
            "title": "Conceptos Fundamentales para Principiantes",
            "content": "Si un `panic` es como un accidente de tráfico, `recover()` es la bolsa de aire (airbag) que salva la vida de tu programa:\n- Solo funciona DENTRO de una función programada con `defer`.\n- Si todo va bien, `recover()` devuelve `nil` y no hace nada.\n- Si ocurre un pánico, `recover()` lo atrapa, detiene la caída en picado del programa y te devuelve el mensaje del pánico para que puedas registrarlo en los logs y seguir funcionando.\nAnalogía: Es el equivalente al bloque `catch` de Java o `except` de Python.",
            "keyPoints": [
                "Debe invocarse obligatoriamente dentro de una función con `defer`.",
                "Devuelve el valor que se pasó al `panic` (o `nil` si no hubo pánico).",
                "Evita que un fallo imprevisto en una petición de un usuario tire abajo el servidor web completo."
            ]
        },
        "interExpl": {
            "title": "Mecanismos Internos y Buenas Prácticas",
            "content": "Middleware de Recuperación en Servidores HTTP:\nEl uso canónico y más importante de `recover` en la industria es en servidores web (como `net/http` o Gin). Un middleware envuelve cada petición entrante con un defer recover. Si un endpoint específico sufre un pánico (por ejemplo, desreferenciar un puntero nil), el servidor intercepta el fallo, responde al cliente con un error HTTP 500 Internal Server Error y el servidor continúa vivo atendiendo a los demás clientes con normalidad:\n```go\ndefer func() {\n    if r := recover(); r != nil {\n        log.Printf(\"Pánico recuperado: %v\\nStack: %s\", r, debug.Stack())\n        http.Error(w, \"Error interno\", 500)\n    }\n}()\n```",
            "keyPoints": [
                "Aislamiento por goroutine: `recover` SOLO captura pánicos de la goroutine actual; no puede interceptar pánicos ocurridos en otras goroutines.",
                "Extracción de trazas con `debug.Stack()`: permite registrar el stack trace completo en el log antes de continuar.",
                "Transformación a error: patrón para convertir un pánico interno en un `error` limpio retornado al llamador."
            ]
        },
        "expertExpl": {
            "title": "Bajo Nivel, Rendimiento e Internals",
            "content": "Aislamiento de Pánicos entre Goroutines y Límites del Runtime:\nUn error crítico de arquitectura concurrente en Go es olvidar que cada goroutine tiene su propio árbol de llamadas aislado. Si lanzas una goroutine secundaria con `go func()` y esa goroutine entra en pánico, el `recover()` que tenías en la goroutine principal de main o en el servidor HTTP NO podrá capturarla, provocando el crasheo fulminante de todo el binario.\nRegla de producción: Toda goroutine independiente de larga duración lanzada en segundo plano debe tener su propio `defer func() { recover() }()` interno en su primera línea de código.",
            "keyPoints": [
                "Límite de Goroutine: el desenrollado de pila de un pánico se detiene en la base de la goroutine actual.",
                "Fatal Panics: pánicos lanzados por el runtime por corrupción de memoria interna (`runtime.throw`) no pueden ser interceptados por recover.",
                "Re-panicking: si tras inspeccionar el valor capturado en recover determinas que el error es catastrófico, puedes relanzarlo con `panic(r)`."
            ]
        },
        "evaluation": {
            "title": "Reto: Ejecutor Seguro de Tareas con Conversión a Error",
            "statement": "Escribe una función 'EjecutarSeguro(tarea func()) (err error)' que reciba una función propensa a fallar. Debe capturar cualquier pánico ocurrido mediante defer y recover() y transformarlo en un error estándar con fmt.Errorf. Si la tarea no falla, devuelve nil.",
            "starterCode": "package main\n\nimport (\n    \"fmt\"\n)\n\nfunc EjecutarSeguro(tarea func()) (err error) {\n    // Implementa defer con recover y asigna a err si hubo pánico\n}\n\nfunc main() {\n    // Prueba con una tarea normal y con una que haga pánico\n}",
            "hint": "Usa retornos nombrados '(err error)' para que la función anónima en defer pueda asignar 'err = fmt.Errorf(...)'.",
            "solution": "package main\n\nimport (\n    \"fmt\"\n)\n\nfunc EjecutarSeguro(tarea func()) (err error) {\n    defer func() {\n        if r := recover(); r != nil {\n            // r contiene el valor emitido por el panic\n            err = fmt.Errorf(\"pánico interceptado: %v\", r)\n        }\n    }()\n    \n    tarea() // Ejecuta la función del usuario\n    return nil\n}\n\nfunc main() {\n    fmt.Println(\"--- Tarea 1: Tarea segura ---\")\n    err1 := EjecutarSeguro(func() {\n        fmt.Println(\"Calculando división: 10 / 2 =\", 10/2)\n    })\n    fmt.Println(\"Resultado error:\", err1)\n    \n    fmt.Println(\"\\n--- Tarea 2: Tarea con pánico por división entre cero ---\")\n    err2 := EjecutarSeguro(func() {\n        cero := 0\n        _ = 10 / cero // Provoca pánico en runtime\n    })\n    fmt.Println(\"Resultado error interceptado:\", err2)\n    fmt.Println(\"El programa principal continúa funcionando perfectamente.\")\n}",
            "explanation": "Al usar un retorno con nombre `(err error)`, la clausura diferida puede interceptar el pánico mediante `recover()` y reasignar el valor de `err` antes de que la función retorne al llamador, transformando un fallo fatal en un error convencional manejable."
        },
        "externalLinks": [
            {"title": "The Go Blog: Defer, Panic, and Recover", "url": "https://go.dev/blog/defer-panic-and-recover", "description": "Guía canónica de los creadores de Go sobre el funcionamiento de recover."},
            {"title": "Package runtime/debug: Stack function", "url": "https://pkg.go.dev/runtime/debug#Stack", "description": "Documentación oficial para extraer el stack trace durante una recuperación."},
            {"title": "Go by Example: Recover", "url": "https://gobyexample.com/recover", "description": "Ejemplo interactivo en Go by Example."}
        ]
    },

    "string-functions": {
        "id": 51,
        "slug": "string-functions",
        "title": "String Functions",
        "titleEs": "Funciones del Paquete Strings",
        "category": "Manipulación de Texto y Formatos",
        "categorySlug": "texto-formatos",
        "categoryIcon": "🔤",
        "difficulty": "Principiante",
        "summary": "Herramientas estándar para búsqueda, manipulación, división y transformación de cadenas de texto con 'strings'.",
        "originalExpl": "La biblioteca estándar del paquete 'strings' proporciona muchas funciones útiles para trabajar con cadenas de texto. Aquí hay algunos ejemplos para darte una idea del paquete.",
        "basicExpl": {
            "title": "Conceptos Fundamentales para Principiantes",
            "content": "Trabajar con texto es algo diario. El paquete oficial `strings` tiene decenas de funciones listas para usar:\n- `strings.Contains(\"golang\", \"go\")` -> comprueba si contiene un texto (true).\n- `strings.Count(\"manzana\", \"a\")` -> cuenta cuántas veces aparece una letra (3).\n- `strings.HasPrefix(\"servidor.go\", \"servidor\")` -> comprueba si empieza con un prefijo.\n- `strings.Join([]string{\"a\", \"b\"}, \"-\")` -> une palabras con un separador (\"a-b\").\n- `strings.Split(\"uno,dos,tres\", \",\")` -> parte una cadena en una lista de palabras.\n- `strings.ToUpper` / `strings.ToLower` -> convierte a mayúsculas o minúsculas.",
            "keyPoints": [
                "Se importa con `import \"strings\"`.",
                "En Go los métodos de cadenas son funciones del paquete (`strings.ToUpper(s)`), no métodos de objeto (`s.toUpper()`).",
                "Las cadenas originales nunca se modifican (son inmutables); las funciones devuelven nuevas cadenas."
            ]
        },
        "interExpl": {
            "title": "Mecanismos Internos y Buenas Prácticas",
            "content": "Construcción eficiente de texto con `strings.Builder`:\nUn error clásico de principiante es concatenar cadenas repetidamente dentro de un bucle usando el operador `+`:\n```go\nvar s string\nfor i := 0; i < 1000; i++ {\n    s += \"texto\"\n}\n```\nComo los strings son inmutables, el operador `+` crea un nuevo string en el heap y copia todos los bytes acumulados en CADA iteración (complejidad O(N^2) con miles de asignaciones de memoria).\nLa solución idiomática de alto rendimiento es usar `strings.Builder`:\n```go\nvar b strings.Builder\nb.Grow(5000) // Preasigna memoria para cero allocations\nfor i := 0; i < 1000; i++ {\n    b.WriteString(\"texto\")\n}\nresultado := b.String()\n```",
            "keyPoints": [
                "strings.Builder: optimización esencial para construir cadenas dinámicas en tiempo lineal O(N).",
                "strings.Clone (Go 1.18+): desacopla sub-strings para evitar fugas de memoria por retención de arrays grandes.",
                "Comparación insensible a mayúsculas: usar `strings.EqualFold(s1, s2)` en lugar de convertir ambos con `ToLower()`."
            ]
        },
        "expertExpl": {
            "title": "Bajo Nivel, Rendimiento e Internals",
            "content": "Optimizaciones de strings.Builder y Zero-Copy String Conversion:\nInternamente, `strings.Builder` almacena los datos en un slice de bytes (`[]byte`). Cuando llamas a `b.String()`, en lugar de hacer una copia completa de memoria en el heap, utiliza un truco con `unsafe.Pointer` que transforma directamente el puntero del slice de bytes en un encabezado de string de solo lectura sin realizar NINGUNA asignación de memoria adicional (0 allocations).\n\nAdemás, `strings.Index` y `strings.Contains` utilizan algoritmos acelerados por hardware en código ensamblador (usando instrucciones SIMD AVX2/SSE4 en x86 y NEON en ARM) para escanear memoria a velocidades de gigabytes por segundo.",
            "keyPoints": [
                "Zero-copy string conversion: `strings.Builder.String()` no copia memoria gracias a conversiones unsafe internas seguras.",
                "Aceleración SIMD: funciones de búsqueda (`strings.Index`) aprovechan instrucciones vectoriales de la CPU.",
                "Alineación de memoria: `strings.Builder` incluye comprobaciones de copia para alertar si se pasa por valor indebidamente."
            ]
        },
        "evaluation": {
            "title": "Reto: Limpiador y Normalizador de URLs con strings.Builder",
            "statement": "Escribe una función 'NormalizarCadena(entrada string) string' que elimine espacios iniciales y finales, convierta todo a minúsculas, reemplace los espacios intermedios por guiones medios '-' y elimine los signos de exclamación. Utiliza funciones del paquete strings.",
            "starterCode": "package main\n\nimport (\n    \"fmt\"\n    \"strings\"\n)\n\nfunc NormalizarCadena(entrada string) string {\n    // Implementa la transformación\n}\n\nfunc main() {\n    texto := \"   ¡Aprende Golang en 2026 Hoy Mismo!   \"\n    fmt.Println(NormalizarCadena(texto))\n}",
            "hint": "Combina strings.TrimSpace, strings.ToLower, strings.ReplaceAll y strings.Trim.",
            "solution": "package main\n\nimport (\n    \"fmt\"\n    \"strings\"\n)\n\nfunc NormalizarCadena(entrada string) string {\n    // 1. Quitar espacios extremos\n    s := strings.TrimSpace(entrada)\n    // 2. Convertir a minúsculas\n    s = strings.ToLower(s)\n    // 3. Eliminar signos de admiración\n    s = strings.ReplaceAll(s, \"¡\", \"\")\n    s = strings.ReplaceAll(s, \"!\", \"\")\n    // 4. Reemplazar espacios por guiones\n    s = strings.ReplaceAll(s, \" \", \"-\")\n    return s\n}\n\nfunc main() {\n    texto := \"   ¡Aprende Golang en 2026 Hoy Mismo!   \"\n    resultado := NormalizarCadena(texto)\n    fmt.Println(\"Slug generado:\", resultado)\n}",
            "explanation": "El paquete strings ofrece una suite completa de funciones ortogonales e inmutables para sanitizar texto. Al encadenar transformaciones como TrimSpace, ToLower y ReplaceAll, se produce una cadena limpia (slug para URLs) de forma predecible y segura."
        },
        "externalLinks": [
            {"title": "Package strings (Standard Library)", "url": "https://pkg.go.dev/strings", "description": "Documentación oficial exhaustiva de todas las funciones del paquete strings."},
            {"title": "The Go Blog: Strings, bytes, runes and characters", "url": "https://go.dev/blog/strings", "description": "Artículo de referencia sobre la arquitectura interna de cadenas en Go."},
            {"title": "Go by Example: String Functions", "url": "https://gobyexample.com/string-functions", "description": "Ejemplo en Go by Example."}
        ]
    },

    "string-formatting": {
        "id": 52,
        "slug": "string-formatting",
        "title": "String Formatting",
        "titleEs": "Formateo de Cadenas con fmt.Printf",
        "category": "Manipulación de Texto y Formatos",
        "categorySlug": "texto-formatos",
        "categoryIcon": "🔤",
        "difficulty": "Principiante",
        "summary": "Interpolación y formateo de cadenas con verbos de formato printf (%v, %+v, %#v, %d, %s, %t) en 'fmt'.",
        "originalExpl": "Go ofrece un excelente soporte para formatear cadenas en la tradición de printf. Aquí hay ejemplos de tareas comunes de formateo con el paquete fmt.",
        "basicExpl": {
            "title": "Conceptos Fundamentales para Principiantes",
            "content": "En vez de pegar textos y números con signos de suma (`\"Edad: \" + strconv.Itoa(edad)`), Go ofrece la función `fmt.Printf` y `fmt.Sprintf` con 'verbos de formato' (palabras clave con `%`):\n- `%v`: imprime cualquier valor en su formato por defecto.\n- `%+v`: para structs, imprime los nombres de los campos y sus valores (`{Nombre:Carlos Edad:30}`).\n- `%#v`: imprime la sintaxis exacta de código Go para recrear el valor.\n- `%T`: imprime el TIPO de dato de la variable (ej. `int`, `main.Persona`).\n- `%d`: para números enteros; `%f` o `%.2f`: para flotantes con 2 decimales; `%s`: para cadenas; `%t`: para booleanos.",
            "keyPoints": [
                "`fmt.Printf`: imprime formateado directamente en la consola.",
                "`fmt.Sprintf`: genera y devuelve la cadena formateada como un `string` sin imprimirla.",
                "`%v` es el verbo comodín universal; `%+v` añade nombres de campos a los structs."
            ]
        },
        "interExpl": {
            "title": "Mecanismos Internos y Buenas Prácticas",
            "content": "Personalización con la interfaz `fmt.Stringer`:\nSi implementas el método `String() string` en cualquiera de tus tipos de datos, `fmt.Printf` (y cualquier función del paquete `fmt`) usará automáticamente tu método personalizado al imprimir con `%s` o `%v`:\n```go\ntype Coordenada struct { X, Y int }\nfunc (c Coordenada) String() string {\n    return fmt.Sprintf(\"(Lat:%d, Lon:%d)\", c.X, c.Y)\n}\n```\nTambién puedes controlar la alineación y el espaciado: `%-10s` alinea a la izquierda ocupando 10 caracteres; `%05d` rellena con ceros a la izquierda hasta 5 dígitos.",
            "keyPoints": [
                "Interfaz fmt.Stringer: contrato universal para controlar la representación textual de tus tipos.",
                "Relleno y alineación: `%8d`, `%-15s`, `%04d` facilitan la creación de tablas tabulares en consola.",
                "Escapar el símbolo de porcentaje: se utiliza doble porcentaje `%%` para imprimir el caracter '%' literal."
            ]
        },
        "expertExpl": {
            "title": "Bajo Nivel, Rendimiento e Internals",
            "content": "Sobrecarga de Reflexión en fmt vs strconv:\nEl paquete `fmt` utiliza el paquete de reflexión (`reflect`) en tiempo de ejecución para analizar los verbos `%v`, `%+v` e inspeccionar los tipos de datos pasados a través de su interfaz variádica `any`. Esto implica comprobaciones de tipo dinámicas, desenrollado de interfaces y múltiples asignaciones en el Heap.\n\nEn caminos de ejecución de altísimo rendimiento (hot paths, como un motor de procesamiento que formatea millones de enteros por segundo), sustituir `fmt.Sprintf(\"%d\", id)` por `strconv.Itoa(id)` o `strconv.AppendInt(buf, id, 10)` es hasta 10 veces más rápido y genera 0 asignaciones de memoria.",
            "keyPoints": [
                "Reflexión en fmt: inspección dinámica de tipos mediante reflect en tiempo de ejecución.",
                "Heap Escape en argumentos: pasar variables a `fmt.Sprintf(..., val)` convierte los valores a interface{}, forzando escape al heap.",
                "Alternativas de alto rendimiento: `strconv.AppendInt` y `strconv.AppendQuote` en búferes preasignados eliminan allocations."
            ]
        },
        "evaluation": {
            "title": "Reto: Formateador de Tabla de Factura con Tipos e Interfaz Stringer",
            "statement": "Define un struct 'LineaFactura' con 'Descripcion' (string), 'Cantidad' (int) y 'PrecioUnitario' (float64). Implementa el método 'String() string' que formatee la línea como una fila de tabla con columnas alineadas y el total calculado. En main, imprime dos líneas de factura.",
            "starterCode": "package main\n\nimport \"fmt\"\n\ntype LineaFactura struct {\n    Descripcion    string\n    Cantidad       int\n    PrecioUnitario float64\n}\n\n// Implementa String() string\n\nfunc main() {\n    // Instancia e imprime usando %s o %v\n}",
            "hint": "Usa fmt.Sprintf(\"%-20s | %5d | $%8.2f | $%8.2f\", l.Descripcion, l.Cantidad, l.PrecioUnitario, total).",
            "solution": "package main\n\nimport \"fmt\"\n\ntype LineaFactura struct {\n    Descripcion    string\n    Cantidad       int\n    PrecioUnitario float64\n}\n\nfunc (l LineaFactura) String() string {\n    total := float64(l.Cantidad) * l.PrecioUnitario\n    return fmt.Sprintf(\"%-20s | %5d | $%8.2f | $%8.2f\", \n        l.Descripcion, l.Cantidad, l.PrecioUnitario, total)\n}\n\nfunc main() {\n    l1 := LineaFactura{Descripcion: \"Cable HDMI 2.1\", Cantidad: 3, PrecioUnitario: 14.50}\n    l2 := LineaFactura{Descripcion: \"Adaptador USB-C\", Cantidad: 1, PrecioUnitario: 29.99}\n    \n    fmt.Printf(\"%-20s | %5s | %9s | %9s\\n\", \"Descripción\", \"Cant.\", \"P. Unit\", \"Total\")\n    fmt.Println(\"-----------------------------------------------------------\")\n    fmt.Println(l1)\n    fmt.Println(l2)\n}",
            "explanation": "Al implementar el método String(), la estructura satisface fmt.Stringer. Las plantillas de formato de printf como `%-20s` (alineado a la izquierda) y `$%8.2f` (flotante con 2 decimales alineado a la derecha en 8 caracteres) permiten diseñar tablas limpias y profesionales sin dependencias externas."
        },
        "externalLinks": [
            {"title": "Package fmt (Standard Library)", "url": "https://pkg.go.dev/fmt", "description": "Documentación oficial completa con todos los verbos y modificadores de formato."},
            {"title": "Go by Example: String Formatting", "url": "https://gobyexample.com/string-formatting", "description": "Ejemplo en Go by Example."},
            {"title": "Effective Go: Printing", "url": "https://go.dev/doc/effective_go#printing", "description": "Convenciones oficiales de impresión y formateo en Go."}
        ]
    },

    "text-templates": {
        "id": 53,
        "slug": "text-templates",
        "title": "Text Templates",
        "titleEs": "Plantillas de Texto (text/template y html/template)",
        "category": "Manipulación de Texto y Formatos",
        "categorySlug": "texto-formatos",
        "categoryIcon": "🔤",
        "difficulty": "Intermedio",
        "summary": "Generación de texto dinámico mediante directivas de datos, condicionales y bucles en plantillas parseadas.",
        "originalExpl": "Go ofrece soporte integrado para crear texto dinámico o mostrar salidas HTML personalizadas al usuario con los paquetes text/template y html/template.",
        "basicExpl": {
            "title": "Conceptos Fundamentales para Principiantes",
            "content": "Una plantilla (template) es un texto con 'huecos' que se rellenan automáticamente con datos de tu programa, como una carta modelo de bienvenida:\n- Los datos se insertan con llaves dobles: `Hola {{.Nombre}}, tienes {{.Puntos}} puntos.`\n- El punto `.` representa el objeto o dato actual que le pasas.\n- Admite condicionales: `{{if .EsVip}}Eres cliente VIP{{else}}Cliente regular{{end}}`.\n- Admite bucles para recorrer listas: `{{range .Productos}}- {{.}}{{end}}`.\n- Para generar páginas web seguras se usa `html/template`, que previene hackeos de inyección de código (XSS) automáticamente.",
            "keyPoints": [
                "Paquete `text/template` para texto plano/emails; `html/template` para páginas web.",
                "Las acciones se encierran entre llaves dobles: `{{ .Campo }}`.",
                "Directivas de control: `{{if ...}}`, `{{range ...}}`, `{{with ...}}`, `{{end}}`.",
                "Eliminar espacios en blanco circundantes usando guiones: `{{- .Campo -}}`."
            ]
        },
        "interExpl": {
            "title": "Mecanismos Internos y Buenas Prácticas",
            "content": "Inyección de Funciones Personalizadas con `FuncMap`:\nPuedes inyectar tus propias funciones dentro de las plantillas para transformar datos (por ejemplo, dar formato a fechas o convertir a mayúsculas):\n```go\nfuncs := template.FuncMap{\n    \"aMayusculas\": strings.ToUpper,\n}\ntmpl := template.Must(template.New(\"miTmpl\").Funcs(funcs).Parse(\"{{ . | aMayusculas }}\"))\n```\nUso de `template.Must()`: envuelve el parseo de plantillas al inicio del programa; si la plantilla tiene un error de sintaxis, genera un pánico en el arranque para que no se descubra el error tarde en producción.",
            "keyPoints": [
                "FuncMap: diccionario de funciones Go disponibles dentro del motor de plantillas.",
                "Pipelines con tuberías `|`: encadenar transformaciones estilo Unix: `{{ .Email | aMinusculas | recortar }}`.",
                "Seguridad contextual en `html/template`: escapa automáticamente atributos HTML, código JavaScript y URLs."
            ]
        },
        "expertExpl": {
            "title": "Bajo Nivel, Rendimiento e Internals",
            "content": "Árbol de Sintaxis Abstracta (AST) y Ejecución Concurrente:\nCuando ejecutas `tmpl.Parse()`, Go analiza el texto y construye un árbol de sintaxis abstracta (`parse.Tree`) con nodos de texto, acciones y variables. Parsear una plantilla es un proceso intensivo en CPU.\n\nUna vez parseada, la instancia `*template.Template` es COMPLETAMENTE SEGURA para ejecución concurrente en múltiples goroutines llamando a `tmpl.Execute(w, datos)`. Por tanto, el patrón de diseño obligatorio en servidores de alto tráfico es parsear todas las plantillas UNA SOLA VEZ durante la inicialización (`init()` o `main()`) y reutilizar el puntero compilado en los endpoints.",
            "keyPoints": [
                "Parse Once, Execute Many: parsear en arranque para evitar el coste del compilador AST en cada petición HTTP.",
                "Concurrencia segura: `tmpl.Execute` es concurrente y seguro para lectura de múltiples hilos.",
                "Context-Aware Escaping: `html/template` analiza el contexto léxico (si está dentro de `<script>`, `href`, o texto) para aplicar el escape específico."
            ]
        },
        "evaluation": {
            "title": "Reto: Generador de Email de Notificación con Lista y Pipeline",
            "statement": "Crea una plantilla de texto para un correo de bienvenida. Debe mostrar el nombre del cliente, un mensaje condicional si es 'Premium', y recorrer un slice de 'Beneficios' mostrando cada uno precedido de un asterisco. Ejecuta la plantilla imprimiendo el resultado en os.Stdout.",
            "starterCode": "package main\n\nimport (\n    \"os\"\n    \"text/template\"\n)\n\ntype Cliente struct {\n    Nombre     string\n    EsPremium  bool\n    Beneficios []string\n}\n\nfunc main() {\n    // Define la plantilla y ejecútala con un Cliente de prueba\n}",
            "hint": "Usa {{if .EsPremium}}...{{end}} y {{range .Beneficios}}* {{.}}\n{{end}}.",
            "solution": "package main\n\nimport (\n    \"os\"\n    \"text/template\"\n)\n\ntype Cliente struct {\n    Nombre     string\n    EsPremium  bool\n    Beneficios []string\n}\n\nfunc main() {\n    plantillaRaw := `Estimado(a) {{.Nombre}},\n{{if .EsPremium}}¡Gracias por ser un miembro Premium exclusivo!{{else}}Gracias por unirte a nuestra comunidad.{{end}}\n\nTus beneficios activos:\n{{range .Beneficios}}* {{.}}\n{{end}}\nAtentamente,\nEl Equipo de Soporte.\n`\n\n    tmpl := template.Must(template.New(\"bienvenida\").Parse(plantillaRaw))\n    \n    cliente := Cliente{\n        Nombre:     \"Valeria Gómez\",\n        EsPremium:  true,\n        Beneficios: []string{\"Envíos gratis en 24h\", \"Soporte telefónico prioritario\", \"10% de descuento continuo\"},\n    }\n    \n    err := tmpl.Execute(os.Stdout, cliente)\n    if err != nil {\n        panic(err)\n    }\n}",
            "explanation": "El motor de plantillas evalúa dinámicamente las directivas: el condicional `{{if .EsPremium}}` renderiza el mensaje para usuarios VIP y el bucle `{{range .Beneficios}}` itera sobre el slice inyectando cada elemento en el marcador `{{.}}`, canalizando el resultado final directamente a la salida estándar."
        },
        "externalLinks": [
            {"title": "Package text/template", "url": "https://pkg.go.dev/text/template", "description": "Documentación oficial del motor de plantillas de texto de Go."},
            {"title": "Package html/template (Seguridad Web)", "url": "https://pkg.go.dev/html/template", "description": "Guía oficial sobre cómo proteger aplicaciones contra XSS con plantillas HTML."},
            {"title": "Go by Example: Text Templates", "url": "https://gobyexample.com/text-templates", "description": "Ejemplo en Go by Example."}
        ]
    }
}
