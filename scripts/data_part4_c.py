# scripts/data_part4_c.py
# Temas 78 a 85 (HTTP Client/Server, TCP, Context, Procesos, Señales y Exit)

TOPICS_PART4_C = {
    "http-client": {
        "id": 78,
        "slug": "http-client",
        "title": "HTTP Client",
        "titleEs": "Cliente HTTP y Peticiones Web (net/http)",
        "category": "Redes, Procesos y Sistema Operativo",
        "categorySlug": "redes-sistema",
        "categoryIcon": "🌐",
        "difficulty": "Intermedio",
        "summary": "Consumo de APIs REST y servicios web con http.Get, http.Post y configuración de clientes http.Client con timeouts.",
        "originalExpl": "La biblioteca estándar de Go viene con un soporte excelente para clientes y servidores HTTP en el paquete net/http. En este ejemplo lo usaremos para emitir peticiones HTTP sencillas.",
        "basicExpl": {
            "title": "Conceptos Fundamentales para Principiantes",
            "content": "Para consultar una página web o llamar a una API REST en internet desde Go:\n1. Petición rápida: `resp, err := http.Get(\"https://ejemplo.com\")`.\n2. Comprobar errores: verificar `if err != nil`.\n3. Cierre obligatorio del cuerpo: `defer resp.Body.Close()` (¡CRÍTICO para no saturar conexiones de red!).\n4. Leer el contenido devuelto: `cuerpo, err := io.ReadAll(resp.Body)`.\n5. Comprobar el código de estado: `resp.StatusCode` (200 = OK, 404 = No encontrado).",
            "keyPoints": [
                "Se importa con `import \"net/http\"`.",
                "`resp.Body.Close()` DEBE ejecutarse siempre mediante `defer` tras comprobar que `err == nil`.",
                "`resp.Status` y `resp.StatusCode`: códigos de estado HTTP devueltos por el servidor remoto.",
                "`http.Post`: para enviar datos y payloads JSON."
            ]
        },
        "interExpl": {
            "title": "Mecanismos Internos y Buenas Prácticas",
            "content": "Peligro del Cliente por Defecto y Timeouts Obligatorios:\nNUNCA uses `http.Get` o `http.DefaultClient` en aplicaciones de producción. El cliente por defecto de Go NO TIENE TIMEOUT (`Timeout: 0`, lo que significa tiempo infinito).\nSi el servidor remoto se congela o acepta la conexión pero no envía bytes, tu goroutine quedará bloqueada para siempre. Si tienes miles de usuarios, tu servidor se quedará sin sockets y colapsará.\nRegla de producción: Crea siempre una instancia propia de `&http.Client` con un timeout explícito:\n```go\ncliente := &http.Client{\n    Timeout: 10 * time.Second,\n}\nresp, err := cliente.Get(\"https://api.empresa.com/datos\")\n```\nReutilización de Conexiones TCP (HTTP Keep-Alive): El `http.Client` reutiliza conexiones TCP abiertas. Para que esto funcione, DEBES leer el cuerpo completo (`io.Copy(io.Discard, resp.Body)`) antes de cerrarlo; si no lo lees, la conexión TCP se destruye y no se puede reutilizar.",
            "keyPoints": [
                "Configurar `http.Client.Timeout`: previene que peticiones de red lentas congelen goroutines indefinidamente.",
                "Drenaje para Keep-Alive: drenar el cuerpo con `io.Copy(io.Discard, resp.Body)` antes de cerrar para reutilizar sockets TCP.",
                "`http.NewRequestWithContext`: asociar un `context.Context` a la petición para cancelaciones automáticas si el cliente se desconecta."
            ]
        },
        "expertExpl": {
            "title": "Bajo Nivel, Rendimiento e Internals",
            "content": "Estructura `http.Transport` y Pool de Conexiones (Connection Pooling):\nEl motor de red interno de `http.Client` es el `http.Transport`:\n- `MaxIdleConns`: número máximo de conexiones TCP inactivas en pool en memoria.\n- `MaxIdleConnsPerHost`: por defecto es solo 2. En microservicios que llaman intensivamente a un mismo servicio interno, este valor de 2 provoca que Go abra y cierre conexiones TCP continuamente, sufriendo latencia por el handshake TCP de 3 vías y el handshake TLS en cada llamada. En producción se debe subir a 50 o 100.\n- Soporte nativo y transparente de HTTP/2 y multiplexación por un único socket TCP.",
            "keyPoints": [
                "Ajustar `MaxIdleConnsPerHost`: vital para evitar saturación de puertos efímeros (`TIME_WAIT`) en microservicios.",
                "HTTP/2 Multiplexing: Go negocia automáticamente HTTP/2 mediante ALPN durante el handshake TLS.",
                "DNS Caching y DialContext: configurar resolvers DNS personalizados para evitar consultas DNS repetidas en cada petición."
            ]
        },
        "evaluation": {
            "title": "Reto: Cliente HTTP Seguro con Timeout y Lectura de Cabeceras",
            "statement": "Crea una función 'ConsultarEndpoint(urlStr string) (int, string, error)' que utilice un http.Client personalizado con timeout de 3 segundos para hacer una petición GET. Valida el código de estado, extrae la cabecera 'Content-Type' y lee los primeros 100 caracteres del cuerpo.",
            "starterCode": "package main\n\nimport (\n    \"fmt\"\n    \"net/http\"\n    \"time\"\n)\n\nfunc ConsultarEndpoint(urlStr string) (int, string, error) {\n    // Implementa el cliente con timeout y lectura segura\n}\n\nfunc main() {\n    // Prueba consultando https://httpbin.org/get o similar\n}",
            "hint": "Crea cliente := &http.Client{Timeout: 3*time.Second}. Usa resp.Header.Get(\"Content-Type\").",
            "solution": "package main\n\nimport (\n    \"fmt\"\n    \"io\"\n    \"net/http\"\n    \"time\"\n)\n\nfunc ConsultarEndpoint(urlStr string) (int, string, error) {\n    cliente := &http.Client{\n        Timeout: 3 * time.Second,\n    }\n    \n    resp, err := cliente.Get(urlStr)\n    if err != nil {\n        return 0, \"\", err\n    }\n    defer resp.Body.Close() // Cierre garantizado\n    \n    tipoContenido := resp.Header.Get(\"Content-Type\")\n    cuerpo, err := io.ReadAll(io.LimitReader(resp.Body, 100))\n    if err != nil {\n        return resp.StatusCode, tipoContenido, err\n    }\n    \n    return resp.StatusCode, fmt.Sprintf(\"[%s] %s...\", tipoContenido, string(cuerpo)), nil\n}\n\nfunc main() {\n    urlPrueba := \"https://gobyexample.com/\"\n    codigo, detalle, err := ConsultarEndpoint(urlPrueba)\n    if err != nil {\n        fmt.Println(\"Fallo en la petición:\", err)\n        return\n    }\n    fmt.Printf(\"Estado HTTP: %d\\nDetalles: %s\\n\", codigo, detalle)\n}",
            "explanation": "El uso de un cliente con `Timeout` explícito garantiza que la llamada no quede colgada si la red falla. La lectura se protege con `io.LimitReader` para no absorber más de 100 bytes en memoria y el cierre de `resp.Body` mediante defer permite reutilizar la conexión TCP."
        },
        "externalLinks": [
            {"title": "Package net/http (Standard Library)", "url": "https://pkg.go.dev/net/http", "description": "Documentación oficial del paquete net/http de la biblioteca estándar."},
            {"title": "The Go Blog: The HTTP Client and Transport", "url": "https://go.dev/blog/http-tracing", "description": "Inspección y rastreo de peticiones con HTTP Client Tracing."},
            {"title": "Cloudflare: The complete guide to Go net/http timeouts", "url": "https://blog.cloudflare.com/the-complete-guide-to-golang-net-http-timeouts/", "description": "Guía canónica de Cloudflare sobre la configuración correcta de timeouts en Go."}
        ]
    },

    "http-server": {
        "id": 79,
        "slug": "http-server",
        "title": "HTTP Server",
        "titleEs": "Servidor Web HTTP Nativo (net/http)",
        "category": "Redes, Procesos y Sistema Operativo",
        "categorySlug": "redes-sistema",
        "categoryIcon": "🌐",
        "difficulty": "Intermedio",
        "summary": "Creación de servidores web de producción, enrutamiento con ServeMux (Go 1.22+) y manejadores http.Handler.",
        "originalExpl": "Escribir un servidor HTTP básico es fácil usando el paquete net/http. Un concepto fundamental en los servidores net/http son los handlers, que implementan la interfaz http.Handler.",
        "basicExpl": {
            "title": "Conceptos Fundamentales para Principiantes",
            "content": "Go es uno de los lenguajes favoritos para el desarrollo backend porque incluye un servidor web completo de nivel de producción sin instalar nada:\n1. Creas un manejador (handler): una función que recibe dos cosas: el escritor donde respondes (`w http.ResponseWriter`) y los datos de la petición que hace el usuario (`r *http.Request`).\n2. Registras la ruta: `http.HandleFunc(\"/hola\", func(w http.ResponseWriter, r *http.Request) { fmt.Fprintln(w, \"¡Hola Mundo!\") })`.\n3. Enciendes el servidor: `http.ListenAndServe(\":8080\", nil)`.\n¡Y listo! Tu computadora está escuchando peticiones en el puerto 8080.",
            "keyPoints": [
                "`http.ResponseWriter`: donde escribes el HTML, texto o JSON de respuesta.",
                "`*http.Request`: contiene la URL, método (GET/POST), cabeceras y cuerpo de la petición.",
                "`http.ListenAndServe(\":puerto\", handler)`: arranca el bucle de escucha del servidor.",
                "Cada petición entrante corre automáticamente en su propia Goroutine independiente."
            ]
        },
        "interExpl": {
            "title": "Mecanismos Internos y Buenas Prácticas",
            "content": "El Nuevo Enrutador con Métodos y Parámetros en Go 1.22+:\nHistóricamente, el enrutador estándar `http.ServeMux` de Go era muy simple y obligaba a usar librerías externas (como Gorilla Mux o Chi) para rutas REST. En Go 1.22, el `http.ServeMux` fue modernizado completamente:\n- Soporta métodos HTTP directamente: `\"GET /usuarios\"` o `\"POST /usuarios\"`.\n- Soporta variables de ruta comodín: `\"GET /usuarios/{id}\"`.\n- Extraer la variable comodín: `id := r.PathValue(\"id\")`.\nConfiguración de timeouts del servidor:\nNUNCA uses `http.ListenAndServe` directamente en producción porque no tiene timeouts de lectura ni escritura. Instancia `&http.Server` configurando `ReadTimeout: 5*time.Second` y `WriteTimeout: 10*time.Second` para protegerte contra ataques Slowloris.",
            "keyPoints": [
                "Novedad Go 1.22: enrutamiento nativo por método (`GET /api`) y parámetros de ruta (`r.PathValue(\"id\")`).",
                "Protección Slowloris: configurar `ReadTimeout` y `WriteTimeout` en `http.Server`.",
                "Patrón Middleware: funciones que envuelven `http.Handler` para autenticación, logging y CORS."
            ]
        },
        "expertExpl": {
            "title": "Bajo Nivel, Rendimiento e Internals",
            "content": "Arquitectura de Goroutine-per-Connection y Graceful Shutdown:\nEl bucle interno de `http.Server` ejecuta un `net.Listener.Accept()` infinito. Por cada socket TCP entrante, el servidor genera una NUEVA goroutine ligera (`go c.serve(connCtx)`).\nSi llegan 50,000 conexiones concurrentes, Go ejecuta 50,000 goroutines que el scheduler distribuye limpiamente entre los núcleos de la CPU.\n\nApagado Gracioso (Graceful Shutdown con `server.Shutdown(ctx)`):\nEn Kubernetes, cuando un contenedor va a ser actualizado, no debe matar las peticiones activas de los usuarios a mitad de camino. Se captura la señal `SIGTERM` y se invoca a `server.Shutdown(ctx)`: el servidor deja de aceptar conexiones nuevas, espera a que las peticiones en curso terminen pacientemente durante un periodo de gracia y luego finaliza el proceso de forma limpia.",
            "keyPoints": [
                "Goroutine-per-Connection: concurrencia masiva natural sin hilos pesados del sistema operativo.",
                "`server.Shutdown(ctx)`: finalización ordenada sin cortar transacciones de usuarios activos.",
                "Buffer Pools con `sync.Pool`: los frameworks de alto rendimiento reutilizan búferes de respuesta para lograr 0 asignaciones de memoria por petición."
            ]
        },
        "evaluation": {
            "title": "Reto: Endpoint REST con Parámetros de Ruta de Go 1.22+",
            "statement": "Crea un servidor HTTP utilizando las novedades de Go 1.22+ en http.NewServeMux. Registra una ruta 'GET /saludar/{nombre}' que extraiga el parámetro con r.PathValue(\"nombre\") y responda con un mensaje JSON '{\"saludo\": \"Hola [nombre]\"}' estableciendo la cabecera Content-Type correspondiente.",
            "starterCode": "package main\n\nimport (\n    \"fmt\"\n    \"net/http\"\n)\n\nfunc main() {\n    // Crea mux con NewServeMux y registra GET /saludar/{nombre}\n    // Responde en JSON\n}",
            "hint": "Usa mux := http.NewServeMux(); mux.HandleFunc(\"GET /saludar/{nombre}\", ...). Extrae con r.PathValue(\"nombre\").",
            "solution": "package main\n\nimport (\n    \"encoding/json\"\n    \"fmt\"\n    \"net/http\"\n)\n\ntype RespuestaSaludo struct {\n    Saludo string `json:\"saludo\"`\n}\n\nfunc main() {\n    mux := http.NewServeMux()\n    \n    // Sintaxis moderna de Go 1.22 con método y variable de ruta\n    mux.HandleFunc(\"GET /saludar/{nombre}\", func(w http.ResponseWriter, r *http.Request) {\n        nombre := r.PathValue(\"nombre\")\n        if nombre == \"\" {\n            http.Error(w, \"Nombre requerido\", http.StatusBadRequest)\n            return\n        }\n        \n        w.Header().Set(\"Content-Type\", \"application/json\")\n        w.WriteHeader(http.StatusOK)\n        \n        resp := RespuestaSaludo{Saludo: fmt.Sprintf(\"Hola, %s! Bienvenido a Go 1.22\", nombre)}\n        json.NewEncoder(w).Encode(resp)\n    })\n    \n    fmt.Println(\"Servidor HTTP listo en http://localhost:8080\")\n    // Para probar: curl http://localhost:8080/saludar/Elena\n    // http.ListenAndServe(\":8080\", mux)\n}",
            "explanation": "La actualización de Go 1.22 introdujo compatibilidad nativa con patrones REST directamente en la biblioteca estándar sin requerir frameworks de terceros. El método r.PathValue extrae limpiamente variables de la URL y json.NewEncoder serializa la respuesta en streaming."
        },
        "externalLinks": [
            {"title": "The Go Blog: Routing Enhancements for Go 1.22", "url": "https://go.dev/blog/routing-enhancements", "description": "Explicación oficial de las nuevas capacidades de enrutamiento en Go 1.22."},
            {"title": "Package net/http: Server and ServeMux", "url": "https://pkg.go.dev/net/http#ServeMux", "description": "Documentación oficial del servidor y enrutador ServeMux."},
            {"title": "Go by Example: HTTP Server", "url": "https://gobyexample.com/http-server", "description": "Ejemplo en Go by Example."}
        ]
    },

    "tcp-server": {
        "id": 80,
        "slug": "tcp-server",
        "title": "TCP Server",
        "titleEs": "Servidor TCP de Sockets de Red (net)",
        "category": "Redes, Procesos y Sistema Operativo",
        "categorySlug": "redes-sistema",
        "categoryIcon": "🌐",
        "difficulty": "Avanzado",
        "summary": "Programación de red de bajo nivel mediante sockets TCP con net.Listen y manejo concurrente de conexiones net.Conn.",
        "originalExpl": "Escribir un servidor TCP de bajo nivel es muy sencillo con el paquete 'net'. En este ejemplo crearemos un servidor TCP que responde a conexiones concurrentes.",
        "basicExpl": {
            "title": "Conceptos Fundamentales para Principiantes",
            "content": "HTTP es un protocolo que corre sobre TCP. Si necesitas construir un chat en tiempo real, un protocolo propio para videojuegos o comunicarte con hardware industrial, necesitas hablar directamente con sockets TCP:\n- Abrir un puerto de escucha: `listener, err := net.Listen(\"tcp\", \":8080\")`.\n- Bucle infinito para aceptar clientes: `conn, err := listener.Accept()` (se pausa hasta que alguien se conecta).\n- Lanzar una goroutine por cada cliente: `go atenderCliente(conn)`.\n- Leer y escribir bytes crudos a través de la conexión `conn.Read()` y `conn.Write()`.",
            "keyPoints": [
                "Se importa con `import \"net\"`.",
                "`net.Listen(\"tcp\", \":puerto\")`: vincula el socket del sistema operativo y lo pone en modo escucha.",
                "`listener.Accept()`: bloquea hasta que un nuevo cliente TCP se conecta y devuelve una `net.Conn`.",
                "`net.Conn` implementa las interfaces estándar `io.Reader`, `io.Writer` e `io.Closer`."
            ]
        },
        "interExpl": {
            "title": "Mecanismos Internos y Buenas Prácticas",
            "content": "Timeouts de Socket con Deadlines (`SetDeadline`):\nEn sockets TCP crudos, si un cliente se conecta y nunca envía ningún byte, una llamada a `conn.Read()` quedará bloqueada para siempre, consumiendo memoria y descriptores de archivo del servidor (Slowloris TCP).\nPara evitarlo, Go ofrece los métodos 'Deadline':\n```go\n// El cliente tiene 30 segundos para enviar datos\nconn.SetReadDeadline(time.Now().Add(30 * time.Second))\n```\nSi expira el tiempo sin recibir datos, `conn.Read` devuelve un error de timeout (`os.ErrDeadlineExceeded`), permitiendo cerrar el socket y liberar la goroutine.",
            "keyPoints": [
                "`conn.SetReadDeadline` / `conn.SetWriteDeadline`: control de expiración de sockets de red.",
                "Estructuración de protocolos: en TCP no existen 'mensajes', solo un flujo continuo de bytes; debes delimitar los mensajes (por ejemplo, con un salto de línea `\\n` o anteponiendo un prefijo con la longitud de 4 bytes).",
                "Cierre bidireccional limpio: `conn.Close()` cierra la conexión en ambos sentidos enviando paquetes TCP FIN."
            ]
        },
        "expertExpl": {
            "title": "Bajo Nivel, Rendimiento e Internals",
            "content": "Integración del Network Poller en el Scheduler de Go:\nEn C/C++, para gestionar 100,000 sockets TCP concurrentes necesitas usar APIs asíncronas no bloqueantes complejas y orientadas a eventos como `epoll` en Linux, `kqueue` en macOS o `IOCP` en Windows.\nEn Go, puedes escribir código secuencial bloqueante simple (`conn.Read()`), pero por debajo, el runtime de Go convierte automáticamente todos los sockets a modo no bloqueante (`O_NONBLOCK`).\n\nCuando una goroutine ejecuta `conn.Read()` y el socket no tiene datos disponibles, el runtime de Go suspende la goroutine y registra el descriptor de archivo en el 'Network Poller' interno (un hilo en segundo plano que vigila los sockets con `epoll/kqueue`). En cuanto la tarjeta de red recibe datos, el Network Poller despierta a la goroutine correspondiente y la coloca en la cola de ejecución de un procesador `P`, logrando la máxima eficiencia de E/S asíncrona con la simplicidad de código síncrono.",
            "keyPoints": [
                "Network Poller de Go: integración transparente de epoll/kqueue en el scheduler de goroutines.",
                "Código síncrono con rendimiento asíncrono: sin callbacks hell ni arquitecturas complejas de bucle de eventos.",
                "TCP Keep-Alive nativo: Go habilita automáticamente TCP Keep-Alive en las conexiones aceptadas para detectar desconexiones físicas de cable o caídas de red."
            ]
        },
        "evaluation": {
            "title": "Reto: Servidor TCP Echo Concurrente con Cierre Ordenado",
            "statement": "Escribe un servidor TCP que escuche en un puerto disponible, acepte conexiones entrantes concurrentemente y devuelva en mayúsculas cualquier texto que el cliente envíe (Servidor Echo en mayúsculas). La conexión debe cerrarse cuando el cliente envíe 'salir' o desconecte.",
            "starterCode": "package main\n\nimport (\n    \"bufio\"\n    \"fmt\"\n    \"net\"\n    \"strings\"\n)\n\nfunc manejarConexion(conn net.Conn) {\n    // Lee línea a línea con bufio.Scanner y responde en mayúsculas\n}\n\nfunc main() {\n    // Inicia net.Listen(\"tcp\", \":9090\") y bucle Accept()\n}",
            "hint": "Usa scanner := bufio.NewScanner(conn) y escribe con conn.Write([]byte(strings.ToUpper(linea) + \"\\n\")).",
            "solution": "package main\n\nimport (\n    \"bufio\"\n    \"fmt\"\n    \"net\"\n    \"strings\"\n)\n\nfunc manejarConexion(conn net.Conn) {\n    defer conn.Close() // Garantiza liberación del socket\n    fmt.Printf(\"[NUEVA CONEXIÓN]: Cliente desde %s\\n\", conn.RemoteAddr())\n    \n    scanner := bufio.NewScanner(conn)\n    for scanner.Scan() {\n        texto := scanner.Text()\n        if strings.TrimSpace(texto) == \"salir\" {\n            conn.Write([]byte(\"Adiós! Cerrando conexión TCP.\\n\"))\n            break\n        }\n        \n        respuesta := strings.ToUpper(texto) + \"\\n\"\n        conn.Write([]byte(respuesta))\n    }\n    fmt.Printf(\"[DESCONECTADO]: Cliente %s finalizó\\n\", conn.RemoteAddr())\n}\n\nfunc main() {\n    listener, err := net.Listen(\"tcp\", \":9090\")\n    if err != nil {\n        panic(err)\n    }\n    defer listener.Close()\n    \n    fmt.Println(\"Servidor TCP Echo escuchando en el puerto :9090\")\n    fmt.Println(\"Prueba conectándote con: nc localhost 9090 o telnet localhost 9090\")\n    \n    // Bucle para aceptar conexiones infinitas concurrentes\n    for {\n        conn, err := listener.Accept()\n        if err != nil {\n            fmt.Println(\"Error al aceptar conexión:\", err)\n            continue\n        }\n        // Lanza una goroutine independiente por cada cliente\n        go manejarConexion(conn)\n    }\n}",
            "explanation": "El servidor utiliza `listener.Accept()` para recibir conexiones. Al pasar cada conexión a una goroutine independiente (`go manejarConexion(conn)`), el servidor puede atender a miles de clientes simultáneamente sin que una conexión lenta bloquee a las demás."
        },
        "externalLinks": [
            {"title": "Package net (Standard Library)", "url": "https://pkg.go.dev/net", "description": "Documentación oficial del paquete net para sockets TCP, UDP e IP."},
            {"title": "The Go Blog: The Go netpoller", "url": "https://morsmachine.dk/netpoller", "description": "Análisis técnico de cómo el Network Poller de Go interactúa con epoll en el kernel."},
            {"title": "Go by Example: TCP Server", "url": "https://gobyexample.com/tcp-server", "description": "Ejemplo en Go by Example."}
        ]
    },

    "context": {
        "id": 81,
        "slug": "context",
        "title": "Context",
        "titleEs": "Gestión de Contextos y Cancelación (context)",
        "category": "Redes, Procesos y Sistema Operativo",
        "categorySlug": "redes-sistema",
        "categoryIcon": "🌐",
        "difficulty": "Avanzado",
        "summary": "Propagación de plazos (deadlines), señales de cancelación y valores entre límites de APIs y goroutines concurrentes.",
        "originalExpl": "En el ejemplo anterior vimos cómo configurar un servidor HTTP básico. Los servidores HTTP son útiles para demostrar el uso de context.Context para controlar la cancelación. Un Context transporta plazos, señales de cancelación y otros valores entre límites de API.",
        "basicExpl": {
            "title": "Conceptos Fundamentales para Principiantes",
            "content": "Imagina que un usuario entra a tu página web y pide un reporte pesado. Pero a los 2 segundos, el usuario se arrepiente, cierra la pestaña del navegador y se va.\n¿Tiene sentido que tu servidor siga calculando durante 30 segundos y consultando la base de datos para un usuario que ya no está ahí? ¡No!\nEl paquete `context` es la línea telefónica que conecta todas las tareas:\n- Si el usuario cancela la petición, el `context` se apaga (`ctx.Done()`).\n- Todas las goroutines, consultas a base de datos y peticiones de red que estaban trabajando para esa petición se enteran al instante y se detienen inmediatamente, liberando memoria y CPU.",
            "keyPoints": [
                "Se importa con `import \"context\"`.",
                "Contexto raíz base: `ctx := context.Background()`.",
                "`context.WithCancel(padre)`: permite cancelar manualmente llamando a `cancel()`.",
                "`context.WithTimeout(padre, duracion)`: se cancela automáticamente tras expirar el tiempo.",
                "El canal `<-ctx.Done()` se activa en cuanto el contexto es cancelado."
            ]
        },
        "interExpl": {
            "title": "Mecanismos Internos y Buenas Prácticas",
            "content": "Reglas de oro de Context en Go (Google Go Team):\n1. Pasa siempre el `context.Context` como el PRIMER parámetro de una función (`func Consultar(ctx context.Context, id int)`). NUNCA lo guardes dentro de una estructura struct.\n2. Llama SIEMPRE a la función `defer cancel()` inmediatamente después de crear un contexto derivado (`ctx, cancel := context.WithTimeout(...)`). Olvidar llamar a `cancel` provoca fugas de temporizadores en memoria hasta que expire el plazo.\n3. Los contextos forman un árbol jerárquico: si cancelas el contexto padre, TODOS los contextos hijos derivados de él se cancelan automáticamente en cascada.\n4. Pasar valores con `context.WithValue`: úsalo ÚNICAMENTE para datos globales de la petición (como un `request_id` para trazabilidad o el token de autenticación decodificado), jamás para pasar argumentos opcionales de funciones.",
            "keyPoints": [
                "Primer parámetro obligatorio por convención: `ctx context.Context`.",
                "Cancelación en cascada: la cancelación del padre se propaga automáticamente a todos sus descendientes.",
                "`defer cancel()` obligatorio: previene fugas de recursos y goroutines del runtime.",
                "Inspección de causa: `ctx.Err()` devuelve `context.Canceled` o `context.DeadlineExceeded`."
            ]
        },
        "expertExpl": {
            "title": "Bajo Nivel, Rendimiento e Internals",
            "content": "Estructuras `cancelCtx` y `timerCtx` en `context/context.go`:\nUn contexto en Go es una interfaz inmutable. Cuando creas un contexto hijo con `WithCancel`:\n- Se crea una estructura `cancelCtx` interna que se registra a sí misma en el mapa de hijos (`children map[canceler]struct{}`) del contexto padre más cercano.\n- Al invocar `cancel()`, el runtime adquiere un mutex, cierra el canal interno `c.done` con `close()`, recorre recursivamente su mapa de hijos cancelándolos a todos y se desvincula del padre para permitir la recolección de basura inmediata por el GC.\n\nEn Go 1.20 se incorporó `context.WithCancelCause` y `context.Cause(ctx)`: permite adjuntar un error personalizado que explica con exactitud el motivo por el cual se canceló el contexto.",
            "keyPoints": [
                "Árbol de hijos con mutex interno: desvinculación limpia para recolección de basura por el GC.",
                "Cierre de canal Done: utiliza el patrón broadcast de `close(c.done)` para despertar simultáneamente a todas las goroutines esperando en `select`.",
                "`context.AfterFunc` (Go 1.21+): permite registrar callbacks que se ejecutan automáticamente cuando el contexto se cancela, simplificando la coordinación de APIs de terceros."
            ]
        },
        "evaluation": {
            "title": "Reto: Operación Concurrente con Cancelación por Timeout de Context",
            "statement": "Escribe una función 'SimularTareaPesada(ctx context.Context) error' que simule un cálculo que tarda 200ms comprobando periódicamente con un select si el contexto fue cancelado. En main, invoca la tarea con un context.WithTimeout de 100ms y comprueba que se interrumpa correctamente devolviendo el error context.DeadlineExceeded.",
            "starterCode": "package main\n\nimport (\n    \"context\"\n    \"fmt\"\n    \"time\"\n)\n\nfunc SimularTareaPesada(ctx context.Context) error {\n    // Usa select con <-ctx.Done() y time.After\n}\n\nfunc main() {\n    // Crea context.WithTimeout de 100ms y ejecuta la tarea de 200ms\n}",
            "hint": "En SimularTareaPesada haz: select { case <-time.After(200*time.Millisecond): return nil case <-ctx.Done(): return ctx.Err() }.",
            "solution": "package main\n\nimport (\n    \"context\"\n    \"fmt\"\n    \"time\"\n)\n\nfunc SimularTareaPesada(ctx context.Context) error {\n    fmt.Println(\"[Tarea]: Procesando consulta compleja...\")\n    \n    select {\n    case <-time.After(200 * time.Millisecond):\n        fmt.Println(\"[Tarea]: ¡Cálculo completado con éxito!\")\n        return nil\n    case <-ctx.Done():\n        fmt.Println(\"[Tarea]: Cancelación recibida. Abortando trabajo inmediatamente.\")\n        return ctx.Err() // Devuelve context.DeadlineExceeded o context.Canceled\n    }\n}\n\nfunc main() {\n    // Configuramos un plazo límite estricto de 100ms (la tarea tarda 200ms)\n    ctx, cancel := context.WithTimeout(context.Background(), 100*time.Millisecond)\n    defer cancel() // Buena práctica obligatoria para liberar el timer del contexto\n    \n    err := SimularTareaPesada(ctx)\n    if err != nil {\n        fmt.Println(\"Resultado en main: Operación abortada por:\", err)\n    } else {\n        fmt.Println(\"Resultado en main: Operación exitosa\")\n    }\n}",
            "explanation": "Al configurar un timeout de 100ms mediante 'context.WithTimeout', el canal 'ctx.Done()' se cierra automáticamente a los 100ms. La función 'SimularTareaPesada' detecta el evento en su sentencia select y detiene la ejecución inmediatamente, evitando el desperdicio de CPU."
        },
        "externalLinks": [
            {"title": "The Go Blog: Go Concurrency Patterns: Context", "url": "https://go.dev/blog/context", "description": "El artículo canónico de Sameer Ajmani que definió el estándar de context en Go."},
            {"title": "Package context (Standard Library)", "url": "https://pkg.go.dev/context", "description": "Documentación oficial del paquete context en la biblioteca estándar."},
            {"title": "Go by Example: Context", "url": "https://gobyexample.com/context", "description": "Ejemplo en Go by Example."}
        ]
    },

    "spawning-processes": {
        "id": 82,
        "slug": "spawning-processes",
        "title": "Spawning Processes",
        "titleEs": "Creación de Procesos Hijos (os/exec)",
        "category": "Redes, Procesos y Sistema Operativo",
        "categorySlug": "redes-sistema",
        "categoryIcon": "🌐",
        "difficulty": "Intermedio",
        "summary": "Ejecución de programas externos del sistema operativo, captura de salidas y tuberías con 'os/exec'.",
        "originalExpl": "A veces nuestros programas de Go necesitan generar otros procesos que no son de Go. Por ejemplo, la función exec de este ejemplo genera un proceso externo.",
        "basicExpl": {
            "title": "Conceptos Fundamentales para Principiantes",
            "content": "A veces tu programa en Go necesita pedirle ayuda a un programa que ya está instalado en el sistema operativo (como ejecutar `git status`, `ping google.com` o `ls`):\n- Se usa el paquete `os/exec`.\n- Crear el comando: `cmd := exec.Command(\"git\", \"version\")`.\n- Ejecutar y capturar todo lo que imprima: `salida, err := cmd.Output()` (devuelve un slice de bytes con el texto).\n- Si solo quieres que imprima directamente en la pantalla de la terminal: `cmd.Stdout = os.Stdout; cmd.Run()`.",
            "keyPoints": [
                "Se importa con `import \"os/exec\"`.",
                "`exec.Command(nombre, arg1, arg2...)`: configura el comando sin ejecutarlo aún.",
                "`cmd.Output()`: ejecuta y captura la salida estándar (stdout).",
                "`cmd.CombinedOutput()`: captura tanto stdout como stderr juntos.",
                "Los argumentos se pasan como parámetros separados, NUNCA unidos en una sola cadena con espacios."
            ]
        },
        "interExpl": {
            "title": "Mecanismos Internos y Buenas Prácticas",
            "content": "Prevención de Inyección de Comandos (Command Injection) y Timeouts con Context:\nEn otros lenguajes se suele usar `system(\"comando \" + entradaUsuario)`, lo que permite que un hacker inyecte `; rm -rf /`.\nEn Go, `exec.Command` NO invoca una shell de comandos (como bash o cmd.exe) por defecto: pasa los argumentos directamente como un arreglo al kernel del sistema operativo, neutralizando ataques de inyección de comandos.\n\nControl de ejecución con `exec.CommandContext`:\nPara evitar que un comando externo se quede colgado para siempre (por ejemplo, un `ping` infinito), se asocia siempre a un contexto con timeout:\n```go\nctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)\ndefer cancel()\ncmd := exec.CommandContext(ctx, \"ping\", \"127.0.0.1\")\n```\nSi expira el plazo, Go mata automáticamente al proceso hijo.",
            "keyPoints": [
                "Inmunidad a shell injection: no ejecuta un intérprete de comandos por defecto.",
                "`exec.CommandContext`: mata automáticamente al proceso hijo si el contexto se cancela o expira.",
                "Tuberías (Pipes) entre procesos: `cmd.StdinPipe()` y `cmd.StdoutPipe()` permiten comunicación bidireccional continua con el proceso hijo."
            ]
        },
        "expertExpl": {
            "title": "Bajo Nivel, Rendimiento e Internals",
            "content": "Mecánicas de Kernel: `fork/exec` vs `clone` y Process Groups en Unix:\nEn sistemas Unix, generar un proceso hijo tradicionalmente requería la syscall `fork()` (duplicar la tabla de páginas del proceso padre) seguida de `execve()`. En programas Go con gigabytes de memoria asignada, hacer un `fork` tradicional podía provocar errores de 'Out of Memory' falsos por sobrecompromiso de memoria (memory overcommit).\n\nEn Go moderno, el runtime utiliza `CLONE_VFORK | CLONE_VM` en Linux (o la syscall `posix_spawn`), evitando duplicar las tablas de páginas de memoria de la máquina virtual.\nPara asegurar que matar el proceso padre mate también a todos los subprocesos nietos generados por él, se configura `cmd.SysProcAttr = &syscall.SysProcAttr{Setpgid: true}` para crear un grupo de procesos independiente y enviar la señal `SIGKILL` a todo el grupo (`-pid`).",
            "keyPoints": [
                "Optimización vfork / posix_spawn: creación de procesos ultraligera sin duplicar el mapa de memoria de Go.",
                "Process Groups (Setpgid): mata árboles enteros de procesos hijos y nietos sin dejar procesos zombis huérfanos.",
                "Redirección de descriptores: los descriptores de archivo 0, 1 y 2 se conectan mediante tuberías anónimas del kernel."
            ]
        },
        "evaluation": {
            "title": "Reto: Ejecutor de Comandos de Red con Timeout Seguro",
            "statement": "Escribe una función 'EjecutarComandoSeguro(ctx context.Context, nombre string, args ...string) (string, error)' que ejecute un comando del sistema con límite de tiempo utilizando exec.CommandContext. Prueba la función ejecutando un comando rápido de tu sistema operativo (como 'go version' o 'hostname').",
            "starterCode": "package main\n\nimport (\n    \"context\"\n    \"fmt\"\n    \"os/exec\"\n    \"time\"\n)\n\nfunc EjecutarComandoSeguro(ctx context.Context, nombre string, args ...string) (string, error) {\n    // Implementa con exec.CommandContext y cmd.Output()\n}\n\nfunc main() {\n    // Ejecuta con un timeout de 2 segundos\n}",
            "hint": "Crea cmd := exec.CommandContext(ctx, nombre, args...) y llama a cmd.Output().",
            "solution": "package main\n\nimport (\n    \"context\"\n    \"fmt\"\n    \"os/exec\"\n    \"strings\"\n    \"time\"\n)\n\nfunc EjecutarComandoSeguro(ctx context.Context, nombre string, args ...string) (string, error) {\n    cmd := exec.CommandContext(ctx, nombre, args...)\n    salida, err := cmd.CombinedOutput()\n    if err != nil {\n        return \"\", fmt.Errorf(\"fallo al ejecutar '%s': %w (salida: %s)\", nombre, err, string(salida))\n    }\n    return strings.TrimSpace(string(salida)), nil\n}\n\nfunc main() {\n    ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)\n    defer cancel()\n    \n    resultado, err := EjecutarComandoSeguro(ctx, \"go\", \"version\")\n    if err != nil {\n        fmt.Println(\"Error:\", err)\n        return\n    }\n    \n    fmt.Println(\"Comando ejecutado con éxito:\")\n    fmt.Println(\"Salida:\", resultado)\n}",
            "explanation": "El uso de `exec.CommandContext` garantiza que si el comando externo tarda más del tiempo establecido por el contexto, el runtime de Go enviará una señal de terminación al proceso hijo, impidiendo procesos colgados que consuman memoria del servidor indefinidamente."
        },
        "externalLinks": [
            {"title": "Package os/exec (Standard Library)", "url": "https://pkg.go.dev/os/exec", "description": "Documentación oficial del paquete os/exec."},
            {"title": "Go by Example: Spawning Processes", "url": "https://gobyexample.com/spawning-processes", "description": "Ejemplo en Go by Example."},
            {"title": "Brad Fitzpatrick: How Go runs subprocesses", "url": "https://bradfitz.com/", "description": "Detalles históricos de la implementación de vfork y clone en el runtime de Go."}
        ]
    },

    "execing-processes": {
        "id": 83,
        "slug": "execing-processes",
        "title": "Exec'ing Processes",
        "titleEs": "Reemplazo de Procesos (syscall.Exec)",
        "category": "Redes, Procesos y Sistema Operativo",
        "categorySlug": "redes-sistema",
        "categoryIcon": "🌐",
        "difficulty": "Avanzado",
        "summary": "Reemplazo total del proceso de Go actual por otro ejecutable en el mismo espacio de proceso con syscall.Exec.",
        "originalExpl": "En el ejemplo anterior vimos cómo generar procesos externos. Hacemos esto cuando queremos un proceso externo accesible a un proceso Go en ejecución. A veces solo queremos reemplazar completamente el proceso Go actual por otro.",
        "basicExpl": {
            "title": "Conceptos Fundamentales para Principiantes",
            "content": "Hay una diferencia enorme entre 'lanzar un proceso hijo' y 'reemplazar tu proceso':\n- Lanzar proceso (`os/exec`): tu programa Go sigue vivo, abre una ventana secundaria con el otro programa y espera a que termine.\n- Reemplazar proceso (`syscall.Exec`): tu programa Go se 'suicida' deliberadamente y le cede toda su memoria, su identificador de proceso (PID) y sus recursos al nuevo programa.\nUna vez que llamas a `syscall.Exec`, tu código Go DESAPARECE por completo: ninguna línea posterior de tu programa volverá a ejecutarse.",
            "keyPoints": [
                "Se usa el paquete `syscall`: `syscall.Exec(rutaBinaria, args, entorno)`.",
                "Reemplazo total: el proceso de Go deja de existir y es reemplazado en el mismo PID.",
                "No hay retorno: si `syscall.Exec` tiene éxito, el código de Go posterior jamás se ejecuta.",
                "Si la llamada devuelve un error, significa que el binario no pudo ser cargado."
            ]
        },
        "interExpl": {
            "title": "Mecanismos Internos y Buenas Prácticas",
            "content": "Preparación de Argumentos y Localización de Binarios con `exec.LookPath`:\nLa llamada `syscall.Exec` es de muy bajo nivel y requiere:\n1. La ruta absoluta física del ejecutable (no busca automáticamente en el `PATH` del sistema). Para encontrarla se debe usar `exec.LookPath(\"ls\")`.\n2. El primer argumento del slice de argumentos (`args[0]`) debe ser por convención el propio nombre del comando.\n3. Las variables de entorno completas pasadas como un slice de strings (típicamente `os.Environ()`).\n\nCaso de uso clásico: Wrappers de inicio en contenedores Docker y administradores de procesos (init systems).",
            "keyPoints": [
                "Uso de `exec.LookPath`: localiza la ruta absoluta del binario en las carpetas del PATH del sistema.",
                "Convención `args[0]`: debe contener el nombre del comando a ejecutar.",
                "Hereda descriptores de archivos abiertos: los archivos abiertos que no tengan la bandera `O_CLOEXEC` se transmiten al nuevo proceso."
            ]
        },
        "expertExpl": {
            "title": "Bajo Nivel, Rendimiento e Internals",
            "content": "La Llamada al Sistema `execve` y el Destino del Runtime de Go:\nA nivel de arquitectura de sistemas operativos Unix, `syscall.Exec` invoca directamente la syscall `SYS_EXECVE` del kernel.\nEn ese microsegundo exacto:\n1. El kernel borra completamente el espacio de direcciones virtuales del proceso (la pila, el heap, el runtime de Go, el garbage collector y todas las goroutines activas se destruyen al instante).\n2. El kernel carga las secciones ELF del nuevo programa en ese mismo PID.\n3. Los hilos del procesador saltan al nuevo punto de entrada (`_start`).\n\nEn sistemas Windows: La API nativa de Windows (Win32) NO tiene un equivalente directo a la syscall POSIX `execve` (no existe reemplazo de proceso in-place en el kernel de Windows NT). En Windows, Go simula este comportamiento generando un proceso hijo con `CreateProcess` y saliendo inmediatamente con el código de retorno del hijo.",
            "keyPoints": [
                "Syscall `SYS_EXECVE`: destrucción atómica de la memoria del proceso padre y carga del nuevo binario.",
                "Preservación de PID: el proceso conserva su ID de proceso, haciéndolo transparente para sistemas de init como systemd o Docker.",
                "Divergencia Unix vs Windows: funcionamiento nativo perfecto en Linux/macOS; emulación en Windows."
            ]
        },
        "evaluation": {
            "title": "Reto: Preparación Segura de Reemplazo de Proceso con LookPath",
            "statement": "Escribe un programa que utilice exec.LookPath para localizar la ruta absoluta de un comando estándar ('ls' en Linux/Mac o 'cmd.exe' en Windows). Valida que exista y prepara los argumentos requeridos para syscall.Exec imprimiendo la ruta encontrada antes de la llamada.",
            "starterCode": "package main\n\nimport (\n    \"fmt\"\n    \"os/exec\"\n)\n\nfunc main() {\n    // Usa exec.LookPath para encontrar un binario del sistema\n}",
            "hint": "Usa binario, err := exec.LookPath(\"git\") o \"cmd.exe\".",
            "solution": "package main\n\nimport (\n    \"fmt\"\n    \"os\"\n    \"os/exec\"\n    \"runtime\"\n    \"syscall\"\n)\n\nfunc main() {\n    // Seleccionamos un comando según el sistema operativo\n    comando := \"ls\"\n    if runtime.GOOS == \"windows\" {\n        comando = \"cmd.exe\"\n    }\n    \n    rutaAbsoluta, err := exec.LookPath(comando)\n    if err != nil {\n        fmt.Printf(\"El comando '%s' no se encuentra en el PATH del sistema: %v\\n\", comando, err)\n        return\n    }\n    \n    fmt.Printf(\"Binario localizado con éxito en: %s\\n\", rutaAbsoluta)\n    fmt.Println(\"Preparando reemplazo de proceso con syscall.Exec...\")\n    \n    args := []string{comando}\n    entorno := os.Environ()\n    \n    // Si ejecutáramos la siguiente línea en Unix, el programa actual terminaría:\n    _ = syscall.Exec(rutaAbsoluta, args, entorno)\n    \n    // Esta línea solo se ejecutará si syscall.Exec falla o en entornos donde no aplique\n    fmt.Println(\"Proceso Go preparado para reemplazo de PID.\")\n}",
            "explanation": "La función 'exec.LookPath' busca en todas las carpetas listadas en la variable PATH del sistema operativo para encontrar la ubicación absoluta del ejecutable. Esta ruta es el primer parámetro indispensable exigido por la llamada de bajo nivel syscall.Exec."
        },
        "externalLinks": [
            {"title": "Package syscall: Exec", "url": "https://pkg.go.dev/syscall#Exec", "description": "Documentación oficial de la llamada syscall.Exec en la biblioteca estándar."},
            {"title": "Go by Example: Exec'ing Processes", "url": "https://gobyexample.com/execing-processes", "description": "Ejemplo en Go by Example."},
            {"title": "Man 2 execve (Linux Programmer's Manual)", "url": "https://man7.org/linux/man-pages/man2/execve.2.html", "description": "La especificación del kernel de Unix de la llamada al sistema execve."}
        ]
    },

    "signals": {
        "id": 84,
        "slug": "signals",
        "title": "Signals",
        "titleEs": "Manejo de Señales del Sistema Operativo (os/signal)",
        "category": "Redes, Procesos y Sistema Operativo",
        "categorySlug": "redes-sistema",
        "categoryIcon": "🌐",
        "difficulty": "Intermedio",
        "summary": "Captura y gestión de señales de terminación del sistema operativo (SIGINT, SIGTERM) para apagado controlado y elegante (Graceful Shutdown).",
        "originalExpl": "A veces queremos que nuestros programas de Go manejen de manera inteligente las señales de Unix. Por ejemplo, podríamos querer que un servidor se apague correctamente cuando recibe un SIGINT (Ctrl+C).",
        "basicExpl": {
            "title": "Conceptos Fundamentales para Principiantes",
            "content": "Cuando estás en la terminal y presionas `Ctrl + C`, tu sistema operativo le envía un 'mensaje de socorro' a tu programa llamado `SIGINT` (Interrupción):\n- Si no haces nada, tu programa muere de golpe en ese microsegundo, pudiendo dejar archivos a medio escribir o conexiones de base de datos rotas.\n- Con `os/signal`, puedes interceptar esa señal amablemente:\n  1. Creas un canal para recibir señales: `sigs := make(chan os.Signal, 1)`.\n  2. Le dices a Go qué señales vigilar: `signal.Notify(sigs, syscall.SIGINT, syscall.SIGTERM)`.\n  3. Esperas en segundo plano a que llegue: `<-sigs`.\n  4. Cuando llega, cierras ordenadamente tus bases de datos y sales con tranquilidad.",
            "keyPoints": [
                "Se importa con `import \"os/signal\"` y `import \"syscall\"`.",
                "`SIGINT`: señal emitida por el teclado al pulsar `Ctrl + C`.",
                "`SIGTERM`: señal de terminación estándar enviada por Docker y Kubernetes al detener un contenedor.",
                "`signal.Notify(canal, señales...)`: enruta las señales del sistema hacia tu canal Go.",
                "El canal de señales DEBE tener siempre un búfer de al menos 1: `make(chan os.Signal, 1)`."
            ]
        },
        "interExpl": {
            "title": "Mecanismos Internos y Buenas Prácticas",
            "content": "Patrón Moderno con `signal.NotifyContext` (Go 1.16+):\nEn Go moderno ya no es necesario crear canales manuales con bucles complejos. Go 1.16 introdujo `signal.NotifyContext`:\n```go\nctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)\ndefer stop()\n\n// Esperar hasta que el usuario pulse Ctrl+C o Kubernetes envíe SIGTERM\n<-ctx.Done()\n\nfmt.Println(\"Señal de apagado recibida. Limpiando recursos...\")\nejecutarLimpieza(5 * time.Second)\n```\nEl contexto devuelto se cancela automáticamente al recibir la señal del sistema operativo, permitiendo propagar el apagado a todos los servidores HTTP y clientes de base de datos en cascada a través de `context.Context`.",
            "keyPoints": [
                "`signal.NotifyContext`: asocia señales del SO directamente a un `context.Context` (estándar moderno).",
                "Apagado en dos fases: permitir un primer `Ctrl+C` para apagado gracioso, y forzar la salida inmediata si el usuario presiona `Ctrl+C` por segunda vez.",
                "Señales no interceptables: `SIGKILL` (kill -9) y `SIGSTOP` son procesadas directamente por el kernel del SO y NUNCA pueden ser capturadas por ningún lenguaje."
            ]
        },
        "expertExpl": {
            "title": "Bajo Nivel, Rendimiento e Internals",
            "content": "Manejo de Señales a Nivel de Hilo OS en el Runtime de Go (`sigtramp`):\nEn sistemas Unix tradicionales, las señales de sistema operativo interrumpen arbitrariamente cualquier hilo del proceso. En Go, el runtime intercepta todas las señales a bajo nivel mediante una rutina especial en ensamblador llamada `runtime.sigtramp`:\n- Señales de fallo de hardware (como `SIGSEGV` por desreferenciar puntero nulo o `SIGFPE` por división entre cero) son interceptadas por el runtime y convertidas internamente en un `panic` de Go.\n- Señales de preempción (`SIGURG`): utilizadas internamente por el planificador para pausar goroutines CPU-bound.\n- Señales registradas con `signal.Notify`: se encolan en una lista libre de bloqueos en espacio de usuario y se envían al canal Go sin interrumpir la coherencia de la memoria ni el estado de los hilos `M`.",
            "keyPoints": [
                "Rutina sigtramp: mediador de señales de bajo nivel en el runtime de Go.",
                "Conversión SIGSEGV a Panic: permite que desreferenciar nil se pueda interceptar con recover().",
                "Buffer de canal obligatorio: si el canal no tiene búfer y no hay nadie leyendo activamente en ese microsegundo exacto, la señal se descarta silenciosamente para no congelar el manejador del kernel."
            ]
        },
        "evaluation": {
            "title": "Reto: Servidor con Apagado Gracioso (Graceful Shutdown) ante SIGINT",
            "statement": "Implementa un programa que simule un servicio en ejecución. Utiliza signal.NotifyContext para escuchar la interrupción del usuario (Ctrl+C / os.Interrupt). Al recibirla, debe imprimir un mensaje de inicio de limpieza, simular la persistencia de datos durante 500ms y finalizar con un mensaje de éxito.",
            "starterCode": "package main\n\nimport (\n    \"context\"\n    \"fmt\"\n    \"os\"\n    \"os/signal\"\n    \"time\"\n)\n\nfunc main() {\n    // Configura signal.NotifyContext y espera la señal\n}",
            "hint": "Crea ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt); defer stop(). Haz <-ctx.Done().",
            "solution": "package main\n\nimport (\n    \"context\"\n    \"fmt\"\n    \"os\"\n    \"os/signal\"\n    \"time\"\n)\n\nfunc main() {\n    // Creamos un contexto que se cancela al recibir la interrupción del teclado\n    ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt)\n    defer stop()\n    \n    fmt.Println(\"Servicio iniciado y en ejecución (Presiona Ctrl+C para detenerlo)...\")\n    \n    // Espera bloqueante hasta recibir la señal del SO\n    <-ctx.Done()\n    \n    // Restauramos el comportamiento predeterminado por si el usuario pulsa Ctrl+C otra vez\n    stop()\n    fmt.Println(\"\\n[Señal recibida]: Iniciando proceso de Graceful Shutdown...\")\n    \n    // Simulación de cierre ordenado de recursos\n    fmt.Println(\"-> Guardando estado en disco...\")\n    time.Sleep(300 * time.Millisecond)\n    fmt.Println(\"-> Cerrando conexiones de base de datos activas...\")\n    time.Sleep(200 * time.Millisecond)\n    \n    fmt.Println(\"¡Servicio cerrado limpiamente sin pérdida de datos!\")\n}",
            "explanation": "El uso de `signal.NotifyContext` integra las señales del sistema operativo con el ciclo de vida de `context.Context`. Al pulsar Ctrl+C, `<-ctx.Done()` se desbloquea de inmediato, permitiendo ejecutar las tareas de limpieza antes de finalizar el proceso."
        },
        "externalLinks": [
            {"title": "Package os/signal (Standard Library)", "url": "https://pkg.go.dev/os/signal", "description": "Documentación oficial del paquete os/signal."},
            {"title": "Go by Example: Signals", "url": "https://gobyexample.com/signals", "description": "Ejemplo en Go by Example."},
            {"title": "Kubernetes: Termination of Pods and Graceful Shutdown", "url": "https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#pod-termination", "description": "Cómo interactúan SIGTERM y Graceful Shutdown en entornos de contenedores."}
        ]
    },

    "exit": {
        "id": 85,
        "slug": "exit",
        "title": "Exit",
        "titleEs": "Salida del Programa y Códigos de Retorno (os.Exit)",
        "category": "Redes, Procesos y Sistema Operativo",
        "categorySlug": "redes-sistema",
        "categoryIcon": "🌐",
        "difficulty": "Principiante",
        "summary": "Terminación inmediata del proceso con código de estado del sistema operativo mediante os.Exit y su impacto en defers.",
        "originalExpl": "Usa os.Exit para salir inmediatamente con un estado dado. A diferencia de C, donde main devuelve un entero, en Go se debe invocar os.Exit explícitamente para devolver un código distinto de cero.",
        "basicExpl": {
            "title": "Conceptos Fundamentales para Principiantes",
            "content": "Cuando un programa de computadora termina, le devuelve un número al sistema operativo llamado 'Código de Salida' (Exit Code):\n- Código 0: significa 'Todo salió perfecto, éxito absoluto'.\n- Código distinto de 0 (ej. 1, 2, 127): significa 'Ocurrió un error'.\nEn Go, si tu función `main()` llega al final normal, Go devuelve 0 automáticamente.\nSi quieres forzar el cierre inmediato del programa devolviendo un código específico de error, usas `os.Exit(codigo)`.\n¡ALERTA MÁXIMA!: `os.Exit()` apaga el programa de golpe en ese microsegundo. Las funciones programadas con `defer` NO SE EJECUTAN.",
            "keyPoints": [
                "Se importa con `import \"os\"`.",
                "`os.Exit(0)`: salida con código de éxito.",
                "`os.Exit(1)` (o cualquier entero 1-125): salida con código de error.",
                "¡Cuidado!: `os.Exit` NO ejecuta las llamadas diferidas con `defer`.",
                "No hay retorno de entero en `func main()`: a diferencia de C/C++, main no retorna un int."
            ]
        },
        "interExpl": {
            "title": "Mecanismos Internos y Buenas Prácticas",
            "content": "El Patrón de Salida Limpia (Exit-in-Main Pattern):\nDado que `os.Exit` aborta la ejecución sin ejecutar ningún `defer` pendiente (lo que puede dejar archivos temporales sin borrar o bases de datos sin cerrar), NUNCA debes llamar a `os.Exit` disperso dentro de funciones secundarias de tu código.\nLa buena práctica de arquitectura en Go es delegar toda la lógica a una función `run()` y llamar a `os.Exit` únicamente en la última línea de `main()`:\n```go\nfunc main() {\n    if err := run(); err != nil {\n        fmt.Fprintln(os.Stderr, \"Error:\", err)\n        os.Exit(1) // Único punto de salida con os.Exit\n    }\n}\n\nfunc run() error {\n    f, _ := os.Create(\"temp.txt\")\n    defer f.Close() // ¡Este defer SÍ se ejecutará garantizado!\n    return procesar()\n}\n```",
            "keyPoints": [
                "Patrón `func run() error`: garantiza que todos los `defer` se ejecuten antes de invocar `os.Exit` en main.",
                "Códigos de salida estándar: 0 = Éxito, 1 = Error general, 2 = Mal uso de comandos CLI.",
                "Pruebas unitarias: `testing.M.Run()` devuelve el código de salida entero para que `TestMain` lo pase a `os.Exit`."
            ]
        },
        "expertExpl": {
            "title": "Bajo Nivel, Rendimiento e Internals",
            "content": "La Llamada al Sistema `exit_group` y Códigos de 8 Bits en el Kernel:\nA nivel de kernel de Linux, `os.Exit` invoca la llamada al sistema `exit_group(status)` (o `ExitProcess` en Windows).\nEsta syscall no desenrolla pilas, no ejecuta finalizadores del Garbage Collector ni limpia memoria en espacio de usuario: le ordena al kernel del sistema operativo que cierre todos los descriptores de archivo del proceso, libere sus páginas de memoria física y envíe una señal `SIGCHLD` al proceso padre notificando el código de retorno.\n\nRestricción de Rango de 8 Bits en Unix:\nAunque `os.Exit(code)` acepta un parámetro de tipo `int`, los sistemas operativos Unix (POSIX) solo preservan los 8 bits de menor peso del código de salida (rango de 0 a 255). Si invocas `os.Exit(256)`, el sistema operativo interpretará un código de salida `0` (indicando falso éxito); si invocas `os.Exit(-1)`, el kernel lo interpretará como `255`.",
            "keyPoints": [
                "Máscara de 8 bits en Unix: el código de salida efectivo en el SO es `code & 0xFF` (rango 0 a 255).",
                "Syscall `exit_group`: mata instantáneamente a todos los hilos `M` del proceso.",
                "Preservación de estado en scripts CI/CD: sistemas como GitHub Actions o Docker verifican este código para determinar si una etapa del pipeline falló o fue aprobada."
            ]
        },
        "evaluation": {
            "title": "Reto: Arquitectura de Salida Limpia con Preservación de Defers",
            "statement": "Escribe un programa que implemente el patrón idiomático 'func run() error'. En la función run, abre un recurso simulado con defer, detecta una condición de error controlada y devuélvela a main. En main, muestra el error y finaliza con os.Exit(1), demostrando que el defer se ejecutó correctamente.",
            "starterCode": "package main\n\nimport (\n    \"errors\"\n    \"fmt\"\n    \"os\"\n)\n\nfunc run() error {\n    // Pon un defer fmt.Println(\"Limpiando recurso\")\n    // Retorna un error simulado\n}\n\nfunc main() {\n    // Llama a run() y si hay error haz os.Exit(1)\n}",
            "hint": "Define func run() error, pon defer fmt.Println(\"Recurso cerrado\") y return errors.New(\"error de validación\").",
            "solution": "package main\n\nimport (\n    \"errors\"\n    \"fmt\"\n    \"os\"\n)\n\nfunc run() error {\n    fmt.Println(\"[1] Iniciando operación y asignando recursos...\")\n    \n    // Este defer se ejecutará garantizado porque la función run() retorna normalmente\n    defer fmt.Println(\"[2] DEFER EJECUTADO: Recurso liberado y cerrado limpiamente.\")\n    \n    // Simulamos un fallo de negocio\n    fmt.Println(\"[3] Ocurrió un fallo en el proceso.\")\n    return errors.New(\"fallo en la validación de datos del cliente\")\n}\n\nfunc main() {\n    if err := run(); err != nil {\n        fmt.Fprintf(os.Stderr, \"[4] Error en main: %v\\n\", err)\n        fmt.Println(\"[5] Finalizando proceso con código de salida 1 (Error)\")\n        // Aquí os.Exit es seguro porque los defers de run ya terminaron\n        os.Exit(1)\n    }\n    \n    fmt.Println(\"Finalización exitosa con código 0.\")\n}",
            "explanation": "Si hubiéramos llamado a `os.Exit(1)` directamente dentro de la función donde estaba el defer, Go habría abortado el programa sin ejecutar la limpieza. Al utilizar el patrón de función auxiliar `run() error`, todos los defers se completan al retornar de run antes de que `main()` ejecute `os.Exit(1)`."
        },
        "externalLinks": [
            {"title": "Package os: Exit function", "url": "https://pkg.go.dev/os#Exit", "description": "Documentación oficial de la función os.Exit en la biblioteca estándar."},
            {"title": "Go by Example: Exit", "url": "https://gobyexample.com/exit", "description": "Ejemplo en Go by Example."},
            {"title": "Dave Cheney: How to exit a Go program cleanly", "url": "https://dave.cheney.net/", "description": "Guía de Dave Cheney sobre el patrón func run() error y gestión de códigos de salida."}
        ]
    }
}
