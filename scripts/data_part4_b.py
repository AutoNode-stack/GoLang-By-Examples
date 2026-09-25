# scripts/data_part4_b.py
# Temas 75 a 85 (Subcomandos, Entorno, Logging, HTTP, TCP, Context, Procesos, Señales y Salida)

TOPICS_PART4_B = {
    "command-line-subcommands": {
        "id": 75,
        "slug": "command-line-subcommands",
        "title": "Command-Line Subcommands",
        "titleEs": "Subcomandos CLI Estilo Git/Docker (flag.NewFlagSet)",
        "category": "CLI, Pruebas y Benchmarking",
        "categorySlug": "cli-testing",
        "categoryIcon": "🧪",
        "difficulty": "Intermedio",
        "summary": "Construcción de herramientas de terminal complejas con múltiples comandos anidados (como 'git commit' o 'docker run').",
        "originalExpl": "Algunas herramientas de línea de comandos, como las herramientas 'go' o 'git', tienen muchos subcomandos, cada uno con su propio conjunto de banderas. Por ejemplo, 'go build' y 'go test' son dos subcomandos diferentes de la herramienta 'go'.",
        "basicExpl": {
            "title": "Conceptos Fundamentales para Principiantes",
            "content": "Piensa en herramientas como `git`: no ejecutas solo `git`, sino `git commit -m \"mensaje\"` o `git push origin main`. La palabra 'commit' o 'push' es un 'subcomando', y cada uno tiene sus propias banderas específicas.\nEn Go:\n1. Creas un grupo de banderas separado para cada subcomando con `flag.NewFlagSet(\"nombre\", flag.ExitOnError)`.\n2. Miras cuál fue el primer argumento que escribió el usuario con `switch os.Args[1]`.\n3. Si escribió 'iniciar', activas las banderas de iniciar con `iniciarCmd.Parse(os.Args[2:])`.\n4. Si escribió 'detener', activas las banderas de detener.",
            "keyPoints": [
                "Permite crear herramientas CLI ricas con múltiples verbos de acción.",
                "Cada subcomando tiene su propio `flag.FlagSet` independiente con sus propias opciones.",
                "Se parsean pasando los argumentos restantes a partir del índice 2: `subCmd.Parse(os.Args[2:])`."
            ]
        },
        "interExpl": {
            "title": "Mecanismos Internos y Buenas Prácticas",
            "content": "Estructuración Limpia de un CLI con Switch:\nEl patrón canónico para subcomandos en la biblioteca estándar es:\n```go\nif len(os.Args) < 2 {\n    fmt.Println(\"Se esperaba un subcomando: 'servidor' o 'cliente'\")\n    os.Exit(1)\n}\n\nswitch os.Args[1] {\ncase \"servidor\":\n    servidorCmd.Parse(os.Args[2:])\n    ejecutarServidor(*puertoFlag)\ncase \"cliente\":\n    clienteCmd.Parse(os.Args[2:])\n    ejecutarCliente(*urlFlag)\ndefault:\n    fmt.Printf(\"Subcomando desconocido: '%s'\\n\", os.Args[1])\n    os.Exit(1)\n}\n```",
            "keyPoints": [
                "Validación de `os.Args[1]`: evita pánicos de índice antes de inspeccionar el subcomando.",
                "Ayuda contextual: cada subcomando genera su propia ayuda específica si el usuario escribe `app subcomando -h`.",
                "Desacoplamiento: cada subcomando puede residir en su propia función o paquete dedicado."
            ]
        },
        "expertExpl": {
            "title": "Bajo Nivel, Rendimiento e Internals",
            "content": "Patrón Command Dispatcher y Librerías de Producción:\nPara aplicaciones CLI con docenas de subcomandos y niveles de anidación profunda (ejemplo: `kubectl get pods -n kube-system`), mantener un switch manual se vuelve inmanejable.\nEn la industria de Go se utiliza el patrón 'Command Dispatcher' o el framework `spf13/cobra` (utilizado por Docker, Kubernetes, Terraform y GitHub CLI).\nCobra estructura los comandos como un árbol de objetos `*cobra.Command` con funciones `PreRun`, `RunE` y `PostRun`, integrando autocompletado para Bash/Zsh/Fish y vinculación directa con variables de entorno a través de `spf13/viper`.",
            "keyPoints": [
                "Command Trees: jerarquías arbóreas de comandos (Comando -> Subcomando -> Acción).",
                "Integración Shell Completion: generación automática de scripts de autocompletado en terminales Unix.",
                "Adopción universal: Cobra y Viper representan el estándar indiscutible de CLIs empresariales en Go."
            ]
        },
        "evaluation": {
            "title": "Reto: CLI de Base de Datos con Subcomandos 'migrar' y 'crear'",
            "statement": "Escribe un programa que admita dos subcomandos: 'crear' (con flag '-tabla' de tipo string) y 'migrar' (con flag '-version' de tipo int). Valida que se pase un subcomando, parsea el FlagSet correspondiente y muestra la acción ejecutada.",
            "starterCode": "package main\n\nimport (\n    \"flag\"\n    \"fmt\"\n    \"os\"\n)\n\nfunc main() {\n    // Define FlagSets para 'crear' y 'migrar'\n    // Usa switch os.Args[1] y ejecuta Parse\n}",
            "hint": "Crea crearCmd := flag.NewFlagSet(\"crear\", flag.ExitOnError). En el switch haz crearCmd.Parse(os.Args[2:]).",
            "solution": "package main\n\nimport (\n    \"flag\"\n    \"fmt\"\n    \"os\"\n)\n\nfunc main() {\n    // Definición de subcomandos y sus banderas independientes\n    crearCmd := flag.NewFlagSet(\"crear\", flag.ExitOnError)\n    tablaFlag := crearCmd.String(\"tabla\", \"usuarios\", \"Nombre de la tabla a generar\")\n    \n    migrarCmd := flag.NewFlagSet(\"migrar\", flag.ExitOnError)\n    versionFlag := migrarCmd.Int(\"version\", 1, \"Número de versión de la migración\")\n    \n    if len(os.Args) < 2 {\n        fmt.Println(\"Error: Debes especificar un subcomando ('crear' o 'migrar')\")\n        return\n    }\n    \n    switch os.Args[1] {\n    case \"crear\":\n        crearCmd.Parse(os.Args[2:])\n        fmt.Printf(\"[ACCIÓN: CREAR] Generando tabla en base de datos: '%s'\\n\", *tablaFlag)\n    case \"migrar\":\n        migrarCmd.Parse(os.Args[2:])\n        fmt.Printf(\"[ACCIÓN: MIGRAR] Aplicando migración a versión: #%d\\n\", *versionFlag)\n    default:\n        fmt.Printf(\"Subcomando '%s' no reconocido. Opciones: crear, migrar\\n\", os.Args[1])\n    }\n}",
            "explanation": "Al usar `flag.NewFlagSet`, cada subcomando tiene su propio espacio de nombres de banderas. Al invocar `subCmd.Parse(os.Args[2:])`, solo se parsean los parámetros posteriores al nombre del subcomando, permitiendo opciones específicas y aisladas para cada acción."
        },
        "externalLinks": [
            {"title": "Package flag: FlagSet", "url": "https://pkg.go.dev/flag#FlagSet", "description": "Documentación oficial de FlagSet para subcomandos en la biblioteca estándar."},
            {"title": "Go by Example: Command-Line Subcommands", "url": "https://gobyexample.com/command-line-subcommands", "description": "Ejemplo en Go by Example."},
            {"title": "Cobra CLI Framework", "url": "https://cobra.dev/", "description": "Documentación oficial del framework de subcomandos Cobra para Go."}
        ]
    },

    "environment-variables": {
        "id": 76,
        "slug": "environment-variables",
        "title": "Environment Variables",
        "titleEs": "Variables de Entorno del SO (os.Getenv y os.Setenv)",
        "category": "CLI, Pruebas y Benchmarking",
        "categorySlug": "cli-testing",
        "categoryIcon": "🧪",
        "difficulty": "Principiante",
        "summary": "Lectura, escritura e iteración de variables de entorno del sistema operativo, estándar de configuración en contenedores y la nube.",
        "originalExpl": "Las variables de entorno son un mecanismo universal para comunicar información de configuración a programas Unix y Windows. En este ejemplo veremos cómo configurar, obtener y listar variables de entorno.",
        "basicExpl": {
            "title": "Conceptos Fundamentales para Principiantes",
            "content": "Las variables de entorno son configuraciones globales que viven en el sistema operativo (como `PATH`, `USER` o `PORT`):\n- Son el estándar universal de la metodología Cloud-Native (Docker y Kubernetes) para configurar aplicaciones sin modificar el código.\n- Leer una variable de entorno: `valor := os.Getenv(\"MI_VARIABLE\")` (si no existe, devuelve una cadena vacía `\"\"`).\n- Escribir una variable en el proceso actual: `os.Setenv(\"CLAVE\", \"VALOR\")`.\n- Saber con certeza si existe aunque esté vacía: `val, existe := os.LookupEnv(\"CLAVE\")`.",
            "keyPoints": [
                "Se importa con `import \"os\"`.",
                "`os.Getenv(\"CLAVE\")`: consulta el valor de la variable.",
                "`os.LookupEnv(\"CLAVE\")`: modismo coma-ok para distinguir entre variable vacía y variable no definida.",
                "`os.Environ()`: devuelve todas las variables de entorno activas como un slice de strings `CLAVE=VALOR`."
            ]
        },
        "interExpl": {
            "title": "Mecanismos Internos y Buenas Prácticas",
            "content": "Metodología The Twelve-Factor App y Patrón Fallback:\nEl principio III de The Twelve-Factor App exige separar estrictamente la configuración del código, guardándola en variables de entorno. En Go, la buena práctica es crear funciones auxiliares que lean la variable con un valor por defecto seguro (fallback):\n```go\nfunc GetEnvConFallback(clave, fallback string) string {\n    if valor, existe := os.LookupEnv(clave); existe {\n        return valor\n    }\n    return fallback\n}\n```\nSeguridad en contenedores: NUNCA quemes credenciales, contraseñas o tokens de API en el código fuente; inyéctalas siempre como variables de entorno desde Docker o secretos de Kubernetes.",
            "keyPoints": [
                "The Twelve-Factor App: configuración de bases de datos, puertos y claves secretas por entorno.",
                "Patrón Fallback con `LookupEnv`: proporciona valores seguros por defecto para entornos locales de desarrollo.",
                "Carga de archivos `.env`: en desarrollo local se suele utilizar la biblioteca `joho/godotenv` para cargar archivos `.env` automáticamente."
            ]
        },
        "expertExpl": {
            "title": "Bajo Nivel, Rendimiento e Internals",
            "content": "Puntero de Entorno del Kernel (environ) y Seguridad Concurrente:\nA nivel de kernel de Linux, las variables de entorno residen en un bloque de memoria contiguo al que apunta el puntero global `environ` de C. En Go, el runtime realiza una copia en el arranque y administra el acceso a través de un lock interno en el paquete `syscall`.\n\n¡Alerta de Concurrencia!: En versiones anteriores a Go 1.20, llamar a `os.Setenv` concurrentemente mientras otra goroutine leía con `os.Getenv` provocaba carreras de datos severas. Aunque Go protege sus llamadas internas con locks de lectura/escritura en `syscall`, invocar `os.Setenv` en tiempo de ejecución puede afectar a librerías de C externas enlazadas con `cgo` que no usen sincronización. Por ello, la regla de producción es leer todas las variables de entorno en el arranque (`main()`) y mantener la configuración inmutable después.",
            "keyPoints": [
                "Inmutabilidad post-arranque: evitar llamar a `os.Setenv` en goroutines concurrentes durante el ciclo de vida del servicio.",
                "Bloque environ de C: Go sincroniza las llamadas entre el runtime y la biblioteca estándar de C.",
                "Parseo de tipos: las variables de entorno son siempre strings; se deben convertir a números o booleanos explícitamente con `strconv`."
            ]
        },
        "evaluation": {
            "title": "Reto: Cargador de Configuración de Base de Datos con Fallbacks",
            "statement": "Escribe una función 'CargarConfigBD() (string, int)' que lea las variables de entorno 'DB_HOST' y 'DB_PORT'. Si no están definidas en el sistema, debe aplicar los valores por defecto 'localhost' y 5432 respectivamente. Parsea el puerto con strconv.Atoi y muestra la configuración final.",
            "starterCode": "package main\n\nimport (\n    \"fmt\"\n    \"os\"\n    \"strconv\"\n)\n\nfunc CargarConfigBD() (string, int) {\n    // Implementa la lectura con os.LookupEnv y fallbacks\n}\n\nfunc main() {\n    // Prueba la función antes y después de usar os.Setenv\n}",
            "hint": "Usa if h, ok := os.LookupEnv(\"DB_HOST\"); ok { host = h }. Lo mismo para el puerto.",
            "solution": "package main\n\nimport (\n    \"fmt\"\n    \"os\"\n    \"strconv\"\n)\n\nfunc CargarConfigBD() (string, int) {\n    host := \"localhost\" // Fallback por defecto\n    if val, ok := os.LookupEnv(\"DB_HOST\"); ok && val != \"\" {\n        host = val\n    }\n    \n    port := 5432 // Fallback por defecto para PostgreSQL\n    if val, ok := os.LookupEnv(\"DB_PORT\"); ok && val != \"\" {\n        if p, err := strconv.Atoi(val); err == nil {\n            port = p\n        }\n    }\n    \n    return host, port\n}\n\nfunc main() {\n    fmt.Println(\"--- 1. Lectura con valores por defecto (sin configurar) ---\")\n    h1, p1 := CargarConfigBD()\n    fmt.Printf(\"Conectando a base de datos en: %s:%d\\n\", h1, p1)\n    \n    fmt.Println(\"\\n--- 2. Lectura tras inyectar variables de entorno ---\")\n    os.Setenv(\"DB_HOST\", \"postgres-cluster.produccion.internal\")\n    os.Setenv(\"DB_PORT\", \"5433\")\n    \n    h2, p2 := CargarConfigBD()\n    fmt.Printf(\"Conectando a base de datos en: %s:%d\\n\", h2, p2)\n}",
            "explanation": "El patrón fallback garantiza que el programa pueda ejecutarse en desarrollo sin necesidad de configurar variables de entorno complejas, mientras que en producción en Kubernetes las variables inyectadas sobrescriben automáticamente la configuración de forma transparente."
        },
        "externalLinks": [
            {"title": "Package os: Environment functions", "url": "https://pkg.go.dev/os#Getenv", "description": "Documentación oficial de Getenv, Setenv, LookupEnv y Environ."},
            {"title": "The Twelve-Factor App: Config", "url": "https://12factor.net/config", "description": "El estándar de la industria para configuración de software en la nube."},
            {"title": "Go by Example: Environment Variables", "url": "https://gobyexample.com/environment-variables", "description": "Ejemplo en Go by Example."}
        ]
    },

    "logging": {
        "id": 77,
        "slug": "logging",
        "title": "Logging",
        "titleEs": "Registro de Logs (log y log/slog Estructurado)",
        "category": "CLI, Pruebas y Benchmarking",
        "categorySlug": "cli-testing",
        "categoryIcon": "🧪",
        "difficulty": "Intermedio",
        "summary": "Emisión de mensajes de diagnóstico tradicionales con 'log' y logs estructurados en JSON de alto rendimiento con 'log/slog' (Go 1.21+).",
        "originalExpl": "La biblioteca estándar de Go proporciona herramientas sencillas para la salida de logs. En Go 1.21 se introdujo el paquete oficial 'log/slog' para logging estructurado.",
        "basicExpl": {
            "title": "Conceptos Fundamentales para Principiantes",
            "content": "Los logs son el diario de a bordo de tu servidor: registran cada cosa que pasa para que puedas saber qué ocurrió si algo falla a las 3 de la mañana:\n1. Logging clásico: `log.Println(\"Servidor arrancado\")`. Imprime automáticamente la fecha, la hora y el mensaje en la salida de error estándar (`os.Stderr`).\n2. Logs fatales: `log.Fatal(\"Error grave\")` imprime el mensaje y sale inmediatamente del programa con `os.Exit(1)`.\n3. Logs modernos estructurados (Go 1.21+): en vez de texto plano difícil de filtrar en sistemas como Datadog o Grafana, se usa `log/slog` para generar logs estructurados con claves y valores (ejemplo: usuario=carlos ip=192.168.1.1).",
            "keyPoints": [
                "Paquete clásico: `import \"log\"`.",
                "Nuevo paquete estándar en Go 1.21+: `import \"log/slog\"`.",
                "`log.Panic`: imprime el mensaje y lanza un panic.",
                "`log.Fatal`: imprime el mensaje y finaliza el proceso inmediatamente sin ejecutar defers.",
                "Niveles de log estándar en slog: `Debug`, `Info`, `Warn`, `Error`."
            ]
        },
        "interExpl": {
            "title": "Mecanismos Internos y Buenas Prácticas",
            "content": "Logging Estructurado Moderno con `log/slog` (Go 1.21+):\nEl paquete `slog` es una de las incorporaciones más celebradas de la historia reciente de Go. Permite emitir logs tanto en formato texto plano amigable para humanos como en formato JSON puro para producción:\n```go\nimport \"log/slog\"\n\n// Configurar salida en JSON para producción\nlogger := slog.New(slog.NewJSONHandler(os.Stdout, nil))\nslog.SetDefault(logger)\n\n// Registrar evento estructurado\nslog.Info(\"Usuario inició sesión\", \n    \"usuario_id\", 1042, \n    \"ip\", \"203.0.113.19\",\n    \"metodo\", \"oauth2\",\n)\n```\nEsto genera una línea JSON perfecta: `{\"time\":\"...\",\"level\":\"INFO\",\"msg\":\"Usuario inició sesión\",\"usuario_id\":1042,...}` lista para ser indexada en Elasticsearch o Loki.",
            "keyPoints": [
                "`slog.NewJSONHandler`: formatea logs en JSON estructurado de alto rendimiento.",
                "`slog.With(...)`: crea loggers derivados que incluyen metadatos comunes en todas sus emisiones (ej. `request_id`).",
                "Tipado fuerte con `slog.Attr`: `slog.Int(\"id\", 42)` evita asignaciones de memoria frente a pares de clave/valor reflexivos."
            ]
        },
        "expertExpl": {
            "title": "Bajo Nivel, Rendimiento e Internals",
            "content": "Optimización Zero-Alloc con `slog.Attr` y la Interfaz `LogValuer`:\nCuando usas pares genéricos `\"clave\", valor`, Go debe convertir `valor` a `any`, lo que puede forzar escape al Heap.\nPara caminos de ejecución críticos en sistemas financieros o de telecomunicaciones, `slog` ofrece métodos fuertemente tipados: `slog.Int`, `slog.String`, `slog.Duration`, `slog.Group` que almacenan los valores en una estructura plana `slog.Attr` sin asignaciones de memoria.\n\nAdemás, `slog` incluye la interfaz `slog.LogValuer`: permite enmascarar automáticamente campos sensibles (como contraseñas o tarjetas de crédito) para que jamás aparezcan en texto claro en los logs:\n```go\ntype Password string\nfunc (p Password) LogValue() slog.Value {\n    return slog.StringValue(\"********\")\n}\n```",
            "keyPoints": [
                "Interfaz `slog.LogValuer`: previene fugas de datos sensibles (GDPR/PCI-DSS) enmascarando campos automáticamente.",
                "Zero allocations con `slog.Attr`: estructuración tipada sin impacto en el Garbage Collector.",
                "Control dinámico de nivel: `slog.LevelVar` permite cambiar el nivel de log (de Info a Debug) en caliente en producción sin reiniciar el servidor."
            ]
        },
        "evaluation": {
            "title": "Reto: Logger JSON Estructurado con Enmascaramiento de Seguridad",
            "statement": "Crea un tipo 'Credencial' con campo 'Token' (string) que implemente la interfaz 'slog.LogValuer' para enmascarar el valor con 'REDACTED'. Configura un logger JSON con slog y registra un evento 'Acceso API' pasando el usuario y la credencial protegida.",
            "starterCode": "package main\n\nimport (\n    \"log/slog\"\n    \"os\"\n)\n\ntype Credencial struct {\n    Token string\n}\n\n// Implementa LogValue() slog.Value en Credencial\n\nfunc main() {\n    // Configura slog con NewJSONHandler y emite el log\n}",
            "hint": "Define func (c Credencial) LogValue() slog.Value { return slog.StringValue(\"[REDACTADO]\") }.",
            "solution": "package main\n\nimport (\n    \"log/slog\"\n    \"os\"\n)\n\ntype Credencial struct {\n    Token string\n}\n\n// Enmascara el token automáticamente al loguear\nfunc (c Credencial) LogValue() slog.Value {\n    return slog.StringValue(\"***REDACTADO***\")\n}\n\nfunc main() {\n    // Creamos un handler JSON hacia la salida estándar\n    handler := slog.NewJSONHandler(os.Stdout, &slog.HandlerOptions{\n        Level: slog.LevelInfo,\n    })\n    logger := slog.New(handler)\n    \n    secreto := Credencial{Token: \"api_key_secreta_super_sensible_12345\"}\n    \n    logger.Info(\"Autenticación exitosa en microservicio\",\n        slog.String(\"servicio\", \"facturacion\"),\n        slog.String(\"usuario\", \"admin_corp\"),\n        slog.Any(\"credencial\", secreto), // Se enmascara gracias a LogValuer\n    )\n}",
            "explanation": "La interfaz 'slog.LogValuer' es interceptada por el formateador JSON de slog. Aunque el objeto contenga el token real en memoria, la salida serializada en el log reemplaza el dato por '***REDACTADO***', blindando la aplicación contra filtraciones de seguridad accidentales."
        },
        "externalLinks": [
            {"title": "The Go Blog: Structured Logging with slog", "url": "https://go.dev/blog/slog", "description": "Artículo oficial de lanzamiento del paquete de logging estructurado slog en Go 1.21."},
            {"title": "Package log/slog (Standard Library)", "url": "https://pkg.go.dev/log/slog", "description": "Documentación oficial del paquete log/slog."},
            {"title": "Go by Example: Logging", "url": "https://gobyexample.com/logging", "description": "Ejemplo en Go by Example."}
        ]
    }
}
