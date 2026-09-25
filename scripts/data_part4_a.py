# scripts/data_part4_a.py
# Temas 65 a 74 (Archivos, I/O, Rutas, Temporales, Embed, Testing y CLI)

TOPICS_PART4_A = {
    "reading-files": {
        "id": 65,
        "slug": "reading-files",
        "title": "Reading Files",
        "titleEs": "Lectura de Archivos en Disco (os y io)",
        "category": "Entrada / Salida y Archivos",
        "categorySlug": "archivos-io",
        "categoryIcon": "📁",
        "difficulty": "Principiante",
        "summary": "Lectura básica completa con os.ReadFile y lectura avanzada por bloques y desplazamientos con os.Open, f.Read y f.Seek.",
        "originalExpl": "Leer y escribir archivos son tareas básicas requeridas por muchos programas de Go. En este ejemplo veremos cómo leer archivos completos o por partes.",
        "basicExpl": {
            "title": "Conceptos Fundamentales para Principiantes",
            "content": "Para leer un archivo guardado en tu disco duro tienes dos caminos principales:\n1. Si el archivo es pequeño (ej. un archivo de texto o configuración): `datos, err := os.ReadFile(\"archivo.txt\")`. En una sola línea Go abre el archivo, lee todo su contenido como un slice de bytes (`[]byte`) y lo cierra automáticamente.\n2. Si el archivo es mediano o grande: lo abres con `f, err := os.Open(\"archivo.txt\")`, lees trozos pequeños en un búfer (`f.Read(b)`) y NUNCA olvidas cerrarlo con `defer f.Close()`.",
            "keyPoints": [
                "`os.ReadFile(ruta)`: la forma más rápida y directa para archivos pequeños.",
                "`f, err := os.Open(ruta)`: abre en modo de solo lectura.",
                "Cierre obligatorio con `defer f.Close()` inmediatamente tras abrir.",
                "`f.Seek(desplazamiento, origen)`: mueve el cursor de lectura a una posición específica."
            ]
        },
        "interExpl": {
            "title": "Mecanismos Internos y Buenas Prácticas",
            "content": "Lectura Buffereada con `bufio.Reader` e `io.LimitReader`:\nLlamar a `f.Read()` directamente realiza llamadas al sistema operativo (syscalls de lectura) por cada bloque pequeño. Para optimizar el rendimiento de I/O, se utiliza `bufio.NewReader(f)`:\n- Mantiene un búfer interno de 4KB en memoria RAM, reduciendo miles de accesos a disco a una sola lectura grande.\n- Proporciona métodos cómodos como `r.ReadString('\\n')` para leer línea por línea.\n- Para evitar ataques de Denegación de Servicio por bombas de descompresión o archivos infinitos, limita la lectura con `io.LimitReader(f, maxBytes)`.",
            "keyPoints": [
                "`bufio.NewReader(f)`: amortiza las llamadas al sistema del SO mediante un búfer en memoria.",
                "`io.ReadAll(r)`: lee cualquier `io.Reader` hasta el final (`io.EOF`).",
                "Detección de fin de archivo: `err == io.EOF` indica que se ha llegado al final del archivo de forma esperada."
            ]
        },
        "expertExpl": {
            "title": "Bajo Nivel, Rendimiento e Internals",
            "content": "Llamadas al Sistema del Kernel y Zero-Copy con `sendfile`:\nA nivel de kernel del sistema operativo, `os.Open` y `f.Read` ejecutan las syscalls POSIX `open()` y `read()` (o `CreateFile`/`ReadFile` en Windows). Cada llamada transfiere datos desde el Page Cache del kernel al búfer de memoria en espacio de usuario (user-space).\n\nSi necesitas leer un archivo en disco para transmitirlo directamente por un socket de red HTTP (`net.Conn`), Go optimiza internamente la llamada `io.Copy(conn, file)` utilizando la llamada al sistema de kernel `sendfile` o `splice` (Zero-Copy). Esto transfiere los datos directamente desde el controlador de disco a la tarjeta de red sin pasar por la CPU ni por la memoria de la aplicación.",
            "keyPoints": [
                "Zero-Copy con `sendfile`: Go delega transferencias archivo->red al kernel sin duplicar memoria.",
                "Límite de descriptores de archivos (`ulimit -n`): cada archivo abierto consume un File Descriptor del SO; no cerrar con defer provoca fugas de descriptores (`too many open files`).",
                "Punteros de lectura concurrentes: `f.ReadAt(b, offset)` permite leer concurrentemente desde múltiples goroutines en distintas posiciones del mismo archivo sin interferir en el cursor."
            ]
        },
        "evaluation": {
            "title": "Reto: Lector de Cabecera de Archivo con Longitud Limitada",
            "statement": "Escribe una función 'LeerPrimerosBytes(ruta string, n int) (string, error)' que abra un archivo, lea exactamente los primeros 'n' bytes utilizando un búfer de tamaño exacto y f.Read, asegure el cierre con defer y devuelva los bytes leídos convertidos a string.",
            "starterCode": "package main\n\nimport (\n    \"fmt\"\n    \"os\"\n)\n\nfunc LeerPrimerosBytes(ruta string, n int) (string, error) {\n    // Abre el archivo, crea el búfer de tamaño n y lee\n}\n\nfunc main() {\n    // Crea un archivo temporal, escribe un texto y lee los primeros 5 bytes\n}",
            "hint": "Crea el búfer con buf := make([]byte, n) y usa f.Read(buf).",
            "solution": "package main\n\nimport (\n    \"fmt\"\n    \"os\"\n)\n\nfunc LeerPrimerosBytes(ruta string, n int) (string, error) {\n    f, err := os.Open(ruta)\n    if err != nil {\n        return \"\", err\n    }\n    defer f.Close()\n    \n    b := make([]byte, n)\n    leidos, err := f.Read(b)\n    if err != nil {\n        return \"\", err\n    }\n    \n    return string(b[:leidos]), nil\n}\n\nfunc main() {\n    // Creamos un archivo de prueba\n    ruta := \"prueba_lectura.txt\"\n    os.WriteFile(ruta, []byte(\"Golang es el lenguaje del cloud computing\"), 0644)\n    defer os.Remove(ruta)\n    \n    cabecera, err := LeerPrimerosBytes(ruta, 6)\n    if err != nil {\n        panic(err)\n    }\n    fmt.Printf(\"Primeros 6 bytes leídos: '%s'\\n\", cabecera)\n}",
            "explanation": "Al preasignar un slice de bytes de longitud 'n' (`make([]byte, n)`), `f.Read(b)` lee como máximo esa cantidad de bytes del disco. La instrucción 'defer f.Close()' garantiza que el descriptor del archivo se libere inmediatamente al terminar la función."
        },
        "externalLinks": [
            {"title": "Package os (Standard Library)", "url": "https://pkg.go.dev/os", "description": "Documentación oficial del paquete os para manejo de archivos."},
            {"title": "Package io (Standard Library)", "url": "https://pkg.go.dev/io", "description": "Interfaces universales Reader, Writer, Closer y utilidades de copia."},
            {"title": "Go by Example: Reading Files", "url": "https://gobyexample.com/reading-files", "description": "Ejemplo interactivo en Go by Example."}
        ]
    },

    "writing-files": {
        "id": 66,
        "slug": "writing-files",
        "title": "Writing Files",
        "titleEs": "Escritura de Archivos en Disco (os y bufio)",
        "category": "Entrada / Salida y Archivos",
        "categorySlug": "archivos-io",
        "categoryIcon": "📁",
        "difficulty": "Principiante",
        "summary": "Escritura atómica directa con os.WriteFile, creación y anexado con os.Create/os.OpenFile y escritura con búfer en bufio.Writer.",
        "originalExpl": "Escribir archivos en Go sigue patrones similares a los que vimos anteriormente para la lectura. En este ejemplo veremos cómo escribir bytes, cadenas y utilizar búferes de escritura.",
        "basicExpl": {
            "title": "Conceptos Fundamentales para Principiantes",
            "content": "Para guardar información en el disco duro:\n1. Escritura directa rápida: `os.WriteFile(\"archivo.txt\", datosBytes, 0644)`. Crea el archivo (o sobreescribe si ya existía), escribe todos los datos y lo cierra.\n2. Escritura paso a paso:\n   - Creas el archivo: `f, err := os.Create(\"archivo.txt\")`.\n   - Escribes bytes: `f.Write([]byte(\"hola\"))`.\n   - Escribes texto directo: `f.WriteString(\" mundo\\n\")`.\n   - Cierras siempre con `defer f.Close()`.",
            "keyPoints": [
                "`os.WriteFile(ruta, datos, permisos)`: ideal para guardar archivos completos de golpe.",
                "`os.Create(ruta)`: crea un archivo nuevo o lo trunca a cero si ya existía (permisos 0666 por defecto).",
                "`f.WriteString(s)`: escribe strings directamente sin tener que convertirlos manualmente a `[]byte`.",
                "Permisos octales estilo Unix: `0644` (lectura/escritura para el dueño, lectura para los demás)."
            ]
        },
        "interExpl": {
            "title": "Mecanismos Internos y Buenas Prácticas",
            "content": "Modos de Apertura con `os.OpenFile` y Escritura en Búfer con `bufio.Writer`:\nPara agregar contenido al final de un archivo existente (Append) sin sobreescribirlo, se utiliza `os.OpenFile` con banderas combinadas con el operador OR (`|`):\n```go\nf, err := os.OpenFile(\"log.txt\", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)\n```\nUso crítico de `bufio.Writer`:\nEscribir en disco muchas líneas cortas genera cientos de syscalls lentas. Un `bufio.Writer` acumula los datos en memoria:\n```go\nw := bufio.NewWriter(f)\nw.WriteString(\"Línea 1\\n\")\nw.Flush() // ¡OBLIGATORIO para vaciar los datos acumulados al disco!\n```",
            "keyPoints": [
                "Banderas de OpenFile: `os.O_APPEND` (anexar), `os.O_CREATE` (crear si no existe), `os.O_WRONLY` (solo escritura).",
                "`w.Flush()` obligatorio: los datos en `bufio.Writer` permanecen en memoria RAM hasta llamar a `Flush()`.",
                "Sincronización física con `f.Sync()`: fuerza al sistema operativo a volcar la caché del disco al plato o celda física (SSD/HDD)."
            ]
        },
        "expertExpl": {
            "title": "Bajo Nivel, Rendimiento e Internals",
            "content": "Garantía de Escritura Atómica (Atomic File Writes) y Prevención de Corrupción:\nSi tu aplicación está escribiendo un archivo de configuración crítico y en ese milisegundo se corta la energía eléctrica o el proceso sufre un crasheo (`SIGKILL`), el archivo quedará truncado a medias y corrupto.\n\nPatrón estándar de producción (Write-Temp-Rename):\n1. Escribes los datos en un archivo temporal en el mismo sistema de archivos: `os.CreateTemp(dir, \"*.tmp\")`.\n2. Escribes los datos y ejecutas `tempFile.Sync()` (emite la syscall `fsync` al hardware).\n3. Cierras el temporal y ejecutas `os.Rename(tempPath, finalPath)`.\nLa llamada al sistema `rename` es atómica a nivel de sistema de archivos POSIX: el archivo final o contiene los datos viejos o contiene los datos nuevos, pero jamás quedará corrupto a medias.",
            "keyPoints": [
                "Patrón Atomic Write Temp/Rename: protege contra corrupción de datos ante fallos de corriente o pánicos.",
                "Llamada `fsync` mediante `f.Sync()`: asegura que la caché volátil del disco se vacíe al almacenamiento persistente.",
                "Sobrecarga de `fsync`: llamar a `Sync()` en cada escritura reduce el rendimiento a cientos de operaciones por segundo; agrupar escrituras antes de sincronizar."
            ]
        },
        "evaluation": {
            "title": "Reto: Logger de Eventos con Anexado Seguro y Bufio",
            "statement": "Escribe una función 'RegistrarEvento(ruta, evento string) error' que abra un archivo en modo Append (creándolo si no existe), use bufio.Writer para escribir el evento seguido de un salto de línea, vacíe el búfer con Flush y cierre el archivo.",
            "starterCode": "package main\n\nimport (\n    \"bufio\"\n    \"fmt\"\n    \"os\"\n)\n\nfunc RegistrarEvento(ruta, evento string) error {\n    // Usa os.OpenFile con O_APPEND|O_CREATE|O_WRONLY y bufio.Writer\n}\n\nfunc main() {\n    // Registra dos eventos consecutivos y lee el archivo para verificar\n}",
            "hint": "Abre con os.OpenFile(ruta, os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644). Recuerda w.Flush().",
            "solution": "package main\n\nimport (\n    \"bufio\"\n    \"fmt\"\n    \"os\"\n)\n\nfunc RegistrarEvento(ruta, evento string) error {\n    f, err := os.OpenFile(ruta, os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)\n    if err != nil {\n        return err\n    }\n    defer f.Close()\n    \n    w := bufio.NewWriter(f)\n    _, err = w.WriteString(evento + \"\\n\")\n    if err != nil {\n        return err\n    }\n    \n    return w.Flush() // Asegura que los datos viajen del búfer de memoria al archivo\n}\n\nfunc main() {\n    ruta := \"auditoria.log\"\n    defer os.Remove(ruta)\n    \n    RegistrarEvento(ruta, \"[INFO] 12:00:01 - Servicio arrancado\")\n    RegistrarEvento(ruta, \"[WARN] 12:00:05 - Uso de memoria al 75%\")\n    \n    contenido, _ := os.ReadFile(ruta)\n    fmt.Println(\"Contenido del log:\")\n    fmt.Print(string(contenido))\n}",
            "explanation": "La combinación de banderas `os.O_APPEND|os.O_CREATE|os.O_WRONLY` garantiza que cada llamada anexe el nuevo registro al final del archivo sin sobreescribir lo anterior. El método `w.Flush()` garantiza que ningún dato quede retenido en la memoria del búfer de Go."
        },
        "externalLinks": [
            {"title": "Package os: OpenFile flags", "url": "https://pkg.go.dev/os#pkg-constants", "description": "Constantes de apertura O_RDONLY, O_WRONLY, O_APPEND, etc."},
            {"title": "Package bufio: Writer", "url": "https://pkg.go.dev/bufio#Writer", "description": "Documentación oficial del escritor en búfer bufio.Writer."},
            {"title": "Go by Example: Writing Files", "url": "https://gobyexample.com/writing-files", "description": "Ejemplo en Go by Example."}
        ]
    },

    "line-filters": {
        "id": 67,
        "slug": "line-filters",
        "title": "Line Filters",
        "titleEs": "Filtros de Línea y Búferes (bufio.Scanner)",
        "category": "Entrada / Salida y Archivos",
        "categorySlug": "archivos-io",
        "categoryIcon": "📁",
        "difficulty": "Intermedio",
        "summary": "Procesamiento de flujos de texto en streaming leyendo línea por línea desde os.Stdin o archivos con bufio.Scanner.",
        "originalExpl": "Un filtro de línea es un tipo común de programa que lee la entrada en stdin, la procesa y luego imprime algún resultado derivado en stdout. grep y sed son filtros de línea comunes.",
        "basicExpl": {
            "title": "Conceptos Fundamentales para Principiantes",
            "content": "Imagina que tienes un archivo de log de 20 Gigabytes. Si intentas leerlo entero con `os.ReadFile`, tu ordenador se quedará sin memoria RAM y se colgará.\nUn 'filtro de línea' procesa el texto en streaming: lee una línea, hace algo con ella, la imprime y la descarta de la memoria antes de leer la siguiente:\n- Se usa `scanner := bufio.NewScanner(os.Stdin)` o `bufio.NewScanner(archivo)`.\n- Un bucle `for scanner.Scan()` avanza línea por línea.\n- Para leer el texto de la línea actual se usa `scanner.Text()`.",
            "keyPoints": [
                "`bufio.NewScanner(r)`: el tokenizador estándar más cómodo para leer línea por línea.",
                "`scanner.Scan()`: devuelve true mientras haya una siguiente línea disponible.",
                "`scanner.Text()`: devuelve la línea actual como string (sin el salto de línea `\\n`).",
                "Al salir del bucle, siempre verifica errores con `if err := scanner.Err(); err != nil`."
            ]
        },
        "interExpl": {
            "title": "Mecanismos Internos y Buenas Prácticas",
            "content": "Límite Máximo de Línea de Scanner y `scanner.Buffer`:\nPor defecto, `bufio.Scanner` tiene un tamaño máximo de línea predeterminado de 64 KB (`bufio.MaxScanTokenSize = 64 * 1024`). Si tu archivo contiene una sola línea gigantesca que supere los 64KB (por ejemplo, un JSON minificado enorme), el scanner fallará silenciosamente retornando `false` y `scanner.Err()` reportará `bufio.ErrTooLong`.\nPara permitir líneas más largas, se debe configurar un búfer personalizado:\n```go\nscanner := bufio.NewScanner(f)\nbuf := make([]byte, 1024*1024) // Búfer inicial de 1MB\nscanner.Buffer(buf, 10*1024*1024) // Capacidad máxima de 10MB\n```",
            "keyPoints": [
                "Límite por defecto de 64 KB: vigilar el error `bufio.ErrTooLong` en archivos con líneas extensas.",
                "`scanner.Buffer(buf, max)`: amplía el tamaño de línea admitido.",
                "Funciones de división (Split Functions): `scanner.Split(bufio.ScanWords)` permite leer palabra por palabra en vez de línea por línea."
            ]
        },
        "expertExpl": {
            "title": "Bajo Nivel, Rendimiento e Internals",
            "content": "Zero-Copy Scanning con `scanner.Bytes()`:\nCada vez que llamas a `scanner.Text()`, Go convierte el slice de bytes interno a un nuevo string, lo que genera una asignación de memoria en el Heap por cada línea procesada. Si procesas 10 millones de líneas, generarás 10 millones de objetos para el Garbage Collector.\n\nOptimización experta:\nUtiliza `scanner.Bytes()` en lugar de `scanner.Text()`. El método `Bytes()` devuelve una referencia directa al búfer interno de bytes del scanner sin realizar NINGUNA asignación de memoria (0 allocations). ¡Atención!: Los bytes devueltos son sobreescritos en la siguiente llamada a `Scan()`, por lo que deben procesarse inmediatamente o copiarse con `slices.Clone` si necesitan conservarse.",
            "keyPoints": [
                "Zero allocations con `scanner.Bytes()`: máxima velocidad de escaneo sin presionar al Garbage Collector.",
                "Mutabilidad del búfer interno: no retengas el slice de `scanner.Bytes()` entre llamadas consecutivas a `Scan()`.",
                "Tuberías Unix (Pipes): combinación con `os.Stdin` y `os.Stdout` para integrar herramientas Go en flujos de terminal (`cat datos | miAppGo | grep`)."
            ]
        },
        "evaluation": {
            "title": "Reto: Filtro de Palabras Clave en Streaming con Contador",
            "statement": "Escribe una función 'FiltrarLineas(r io.Reader, termino string) (int, error)' que utilice bufio.Scanner para recorrer un flujo de texto, imprima únicamente las líneas que contengan el 'termino' y devuelva la cantidad total de líneas coincidentes.",
            "starterCode": "package main\n\nimport (\n    \"bufio\"\n    \"fmt\"\n    \"io\"\n    \"strings\"\n)\n\nfunc FiltrarLineas(r io.Reader, termino string) (int, error) {\n    // Implementa el scanner y el filtro\n}\n\nfunc main() {\n    texto := \"ERROR: Fallo de conexión\\nINFO: Servicio iniciado\\nERROR: Timeout de BD\\nDEBUG: Ping ok\"\n    // Prueba con strings.NewReader\n}",
            "hint": "Crea scanner := bufio.NewScanner(r). Usa strings.Contains(scanner.Text(), termino).",
            "solution": "package main\n\nimport (\n    \"bufio\"\n    \"fmt\"\n    \"io\"\n    \"strings\"\n)\n\nfunc FiltrarLineas(r io.Reader, termino string) (int, error) {\n    scanner := bufio.NewScanner(r)\n    coincidencias := 0\n    \n    for scanner.Scan() {\n        linea := scanner.Text()\n        if strings.Contains(linea, termino) {\n            fmt.Println(\"[Coincidencia]:\", linea)\n            coincidencias++\n        }\n    }\n    \n    if err := scanner.Err(); err != nil {\n        return coincidencias, err\n    }\n    return coincidencias, nil\n}\n\nfunc main() {\n    logSimulado := `ERROR: Fallo de conexión en base de datos\nINFO: Servidor web escuchando en :8080\nERROR: Token de autenticación expirado\nDEBUG: Tarea cron ejecutada correctamente\nERROR: Fallo de disco en partición /var`\n\n    lector := strings.NewReader(logSimulado)\n    fmt.Println(\"Filtrando líneas con 'ERROR':\")\n    total, err := FiltrarLineas(lector, \"ERROR\")\n    if err != nil {\n        panic(err)\n    }\n    fmt.Printf(\"Total de errores detectados: %d\\n\", total)\n}",
            "explanation": "El escaneo con bufio.Scanner lee línea a línea de forma eficiente sin cargar todo el bloque de texto en memoria. El chequeo final 'scanner.Err()' asegura que la lectura concluyó limpiamente sin interrupciones de I/O."
        },
        "externalLinks": [
            {"title": "Package bufio: Scanner", "url": "https://pkg.go.dev/bufio#Scanner", "description": "Documentación oficial de bufio.Scanner y funciones de división."},
            {"title": "Go by Example: Line Filters", "url": "https://gobyexample.com/line-filters", "description": "Ejemplo en Go by Example."},
            {"title": "Effective Go: Streams and Scanners", "url": "https://go.dev/doc/effective_go#concurrency", "description": "Uso de streams y scanners para filtrado eficiente."}
        ]
    },

    "file-paths": {
        "id": 68,
        "slug": "file-paths",
        "title": "File Paths",
        "titleEs": "Rutas de Archivos Multiplataforma (path/filepath)",
        "category": "Entrada / Salida y Archivos",
        "categorySlug": "archivos-io",
        "categoryIcon": "📁",
        "difficulty": "Principiante",
        "summary": "Construcción, análisis y normalización de rutas de archivos de forma portable entre Windows, Linux y macOS con 'path/filepath'.",
        "originalExpl": "El paquete filepath proporciona funciones para analizar y construir rutas de archivos de una manera que sea portable entre sistemas operativos; por ejemplo, 'dir/file' en Linux vs 'dir\\file' en Windows.",
        "basicExpl": {
            "title": "Conceptos Fundamentales para Principiantes",
            "content": "Un error muy común de principiante es concatenar rutas de archivos con barras a mano: `\"carpeta/\" + archivo`. Esto falla en Windows, que usa barras invertidas (`\\`), y rompe tu programa cuando cambia de sistema operativo.\nEl paquete oficial `path/filepath` soluciona esto automáticamente:\n- Unir rutas de forma segura: `filepath.Join(\"carpeta\", \"subcarpeta\", \"archivo.txt\")` (pone automáticamente `/` en Linux/Mac y `\\` en Windows).\n- Extraer solo la carpeta contenedora: `filepath.Dir(ruta)`.\n- Extraer solo el nombre del archivo: `filepath.Base(ruta)`.\n- Extraer la extensión: `filepath.Ext(ruta)` (ej. \".txt\").",
            "keyPoints": [
                "Usa SIEMPRE `path/filepath` para archivos del sistema de disco (usa `path` solo para URLs de internet).",
                "`filepath.Join()`: une segmentos usando el separador nativo del SO (`filepath.Separator`).",
                "`filepath.Clean()`: limpia y resuelve puntos dobles `..` y barras redundantes.",
                "`filepath.IsAbs(ruta)`: comprueba si una ruta es absoluta."
            ]
        },
        "interExpl": {
            "title": "Mecanismos Internos y Buenas Prácticas",
            "content": "Rutas Relativas, Absolutas y Prevención de Path Traversal (Zip Slip):\nPara calcular cómo llegar de una ruta A a una ruta B, se utiliza `filepath.Rel(base, objetivo)`.\nPara convertir cualquier ruta relativa en una ruta absoluta completa desde la raíz del sistema de archivos, se usa `filepath.Abs(ruta)`.\n\nVulnerabilidad de Seguridad Crítica (Path Traversal / Zip Slip):\nAl descomprimir archivos ZIP o aceptar nombres de archivo de usuarios, un atacante puede enviar nombres maliciosos como `../../etc/passwd`.\nBuena práctica: Resuelve con `filepath.Clean()`, calcula la ruta absoluta con `filepath.Abs()` y comprueba con `strings.HasPrefix(rutaDestino, directorioBaseSeguro)` para asegurarte de que el archivo no escape de la carpeta permitida.",
            "keyPoints": [
                "Prevención de Zip Slip: sanitizar siempre entradas externas con `filepath.Clean` y validar el prefijo del directorio base.",
                "`filepath.Rel(base, target)`: calcula rutas relativas de forma portable.",
                "`filepath.Match(patron, nombre)`: comprobación de patrones comodín estilo shell (globbing)."
            ]
        },
        "expertExpl": {
            "title": "Bajo Nivel, Rendimiento e Internals",
            "content": "Diferencias de Kernel y Enlaces Simbólicos con `filepath.EvalSymlinks`:\nEn sistemas Unix, una ruta puede contener enlaces simbólicos (symlinks) que apunten a ubicaciones físicas completamente diferentes. La función `filepath.Clean()` solo realiza manipulación puramente sintáctica del texto sin consultar al disco; no detecta si un symlink apunta fuera del directorio permitido.\n\nPara seguridad de nivel de producción en entornos restringidos (sandboxes o contenedores), se debe invocar a `filepath.EvalSymlinks(ruta)`: esta función consulta directamente los inodos del sistema de archivos mediante la syscall `readlink` y devuelve la ruta física real canonicalizada.",
            "keyPoints": [
                "`filepath.EvalSymlinks`: resuelve y canonicaliza enlaces simbólicos consultando los inodos reales del sistema de archivos.",
                "Sintaxis UNC y prefijos de volumen en Windows: `filepath.VolumeName(ruta)` gestiona letras de unidad (`C:`) y rutas de red (`\\\\servidor\\recurso`).",
                "Diferencia `path` vs `filepath`: `path` utiliza siempre barras inclinadas hacia adelante `/` sin importar el SO (reservado para URLs y ZIPs); `filepath` se adapta a la plataforma."
            ]
        },
        "evaluation": {
            "title": "Reto: Sanitizador de Rutas contra Ataques Path Traversal",
            "statement": "Escribe una función 'RutaSegura(directorioBase, entradaUsuario string) (string, error)' que combine el directorio base con la entrada del usuario y verifique que la ruta resultante no se escape del directorio base mediantesecuencias '../'. Si es segura, devuelve la ruta absoluta normalizada; si intenta escapar, devuelve un error.",
            "starterCode": "package main\n\nimport (\n    \"errors\"\n    \"fmt\"\n    \"path/filepath\"\n    \"strings\"\n)\n\nfunc RutaSegura(directorioBase, entradaUsuario string) (string, error) {\n    // Normaliza y valida que pertenezca al directorio base\n}\n\nfunc main() {\n    // Prueba con entrada válida y con ataque ../../etc/passwd\n}",
            "hint": "Usa filepath.Abs y filepath.Join, luego comprueba si strings.HasPrefix(rutaFinal, baseAbs).",
            "solution": "package main\n\nimport (\n    \"errors\"\n    \"fmt\"\n    \"path/filepath\"\n    \"strings\"\n)\n\nfunc RutaSegura(directorioBase, entradaUsuario string) (string, error) {\n    baseAbs, err := filepath.Abs(directorioBase)\n    if err != nil {\n        return \"\", err\n    }\n    \n    // Unimos y limpiamos la ruta combinada\n    rutaCombinada := filepath.Join(baseAbs, entradaUsuario)\n    rutaFinal, err := filepath.Abs(rutaCombinada)\n    if err != nil {\n        return \"\", err\n    }\n    \n    // Verificamos que la ruta final permanezca dentro del directorio base\n    if !strings.HasPrefix(rutaFinal, baseAbs) {\n        return \"\", errors.New(\"alerta de seguridad: intento de escape de directorio (Path Traversal)\")\n    }\n    return rutaFinal, nil\n}\n\nfunc main() {\n    base := \"/var/www/uploads\"\n    \n    // Caso 1: Entrada legítima\n    r1, err1 := RutaSegura(base, \"fotos/perfil.png\")\n    fmt.Println(\"Caso válido   :\", r1, \"| Error:\", err1)\n    \n    // Caso 2: Intento malicioso de escape\n    r2, err2 := RutaSegura(base, \"../../etc/shadow\")\n    fmt.Println(\"Caso malicioso:\", r2, \"| Error:\", err2)\n}",
            "explanation": "Al convertir ambas rutas a sus formas absolutas canonicalizadas y comprobar que la ruta resultante comience obligatoriamente con el prefijo del directorio base (`strings.HasPrefix`), se neutraliza por completo cualquier intento de escapar hacia directorios protegidos del sistema operativo."
        },
        "externalLinks": [
            {"title": "Package path/filepath (Standard Library)", "url": "https://pkg.go.dev/path/filepath", "description": "Documentación oficial del paquete path/filepath."},
            {"title": "Go by Example: File Paths", "url": "https://gobyexample.com/file-paths", "description": "Ejemplo en Go by Example."},
            {"title": "OWASP: Path Traversal Vulnerability", "url": "https://owasp.org/www-community/attacks/Path_Traversal", "description": "Guía de seguridad de OWASP sobre prevención de ataques de rutas."}
        ]
    },

    "directories": {
        "id": 69,
        "slug": "directories",
        "title": "Directories",
        "titleEs": "Manejo y Recorrido de Directorios (os y filepath.WalkDir)",
        "category": "Entrada / Salida y Archivos",
        "categorySlug": "archivos-io",
        "categoryIcon": "📁",
        "difficulty": "Intermedio",
        "summary": "Creación, lectura y recorrido recursivo de árboles de directorios con os.MkdirAll, os.ReadDir y filepath.WalkDir.",
        "originalExpl": "Go tiene varias funciones útiles para trabajar con directorios en el sistema de archivos. En este ejemplo veremos cómo crear directorios, leer sus contenidos y recorrerlos recursivamente.",
        "basicExpl": {
            "title": "Conceptos Fundamentales para Principiantes",
            "content": "Gestionar carpetas en tu sistema operativo es muy sencillo:\n- Crear una carpeta simple: `os.Mkdir(\"mi_carpeta\", 0755)`.\n- Crear carpetas anidadas (como `mkdir -p`): `os.MkdirAll(\"padre/hijo/nieto\", 0755)` (si las carpetas intermedias no existen, Go las crea todas automáticamente).\n- Listar el contenido de una carpeta: `entradas, err := os.ReadDir(\"mi_carpeta\")`.\n- Borrar una carpeta y todo lo que contiene adentro: `os.RemoveAll(\"mi_carpeta\")`.",
            "keyPoints": [
                "`os.MkdirAll(ruta, permisos)`: la forma recomendada para crear carpetas sin preocuparte si los padres existen.",
                "`os.ReadDir(ruta)`: devuelve un slice de `os.DirEntry` (mucho más rápido que el antiguo `os.Readdir`).",
                "`os.RemoveAll(ruta)`: borra de forma recursiva similar a `rm -rf`.",
                "Cada `DirEntry` permite saber si es un archivo o una carpeta con `entry.IsDir()`."
            ]
        },
        "interExpl": {
            "title": "Mecanismos Internos y Buenas Prácticas",
            "content": "Recorrido Recursivo Moderno con `filepath.WalkDir`:\nPara explorar todos los archivos y subcarpetas dentro de un proyecto, Go 1.16 introdujo `filepath.WalkDir` (que sustituyó al antiguo `filepath.Walk`):\n```go\nerr := filepath.WalkDir(\".\", func(path string, d fs.DirEntry, err error) error {\n    if err != nil { return err }\n    if d.IsDir() && d.Name() == \".git\" {\n        return filepath.SkipDir // Omite explorar carpetas gigantes ignoradas\n    }\n    fmt.Println(path, \"Es carpeta?:\", d.IsDir())\n    return nil\n})\n```\n`filepath.SkipDir` permite saltarse ramas enteras del árbol ahorrando miles de lecturas innecesarias.",
            "keyPoints": [
                "`filepath.WalkDir`: estándar moderno en Go 1.16+; es hasta 2x a 4x veces más rápido que `Walk`.",
                "`filepath.SkipDir`: valor de retorno especial para omitir subdirectorios (ej. ignorar `node_modules` o `.git`).",
                "Paquete `io/fs`: abstracción introducida en Go 1.16 para tratar cualquier sistema de archivos de forma uniforme."
            ]
        },
        "expertExpl": {
            "title": "Bajo Nivel, Rendimiento e Internals",
            "content": "Por qué `WalkDir` es 4x más rápido que `Walk` (Evitando llamadas Stat):\nEn el `filepath.Walk` clásico, para cada archivo encontrado se ejecutaba una llamada al sistema `os.Stat()` con el fin de obtener la estructura `FileInfo` (tamaño, permisos, fecha).\nEn sistemas de archivos modernos (Linux ext4, macOS APFS, Windows NTFS), la syscall de listado de directorio (`getdents64` en Linux) ya devuelve el TIPO de archivo (si es directorio, enlace o archivo regular) dentro de la propia entrada del directorio (`d_type`).\n\n`filepath.WalkDir` utiliza `os.DirEntry`, leyendo ese tipo directamente de la memoria sin realizar ninguna llamada `Stat` adicional por archivo, reduciendo el número de syscalls al kernel en un 80% al explorar árboles con cientos de miles de archivos.",
            "keyPoints": [
                "Eliminación de syscalls Stat: aprovecha el campo `d_type` devuelto directamente por la llamada al kernel `getdents64`.",
                "Consumo de descriptores: `WalkDir` mantiene un descriptor de archivo abierto por cada nivel de profundidad de anidación.",
                "`filepath.SkipAll` (Go 1.19+): permite abortar el recorrido completo del árbol de inmediato en cuanto se encuentra lo que se buscaba."
            ]
        },
        "evaluation": {
            "title": "Reto: Buscador Recursivo de Archivos por Extensión con WalkDir",
            "statement": "Escribe una función 'BuscarPorExtension(raiz, extension string) ([]string, error)' que recorra recursivamente el directorio raíz usando filepath.WalkDir y devuelva una lista con las rutas de todos los archivos que coincidan con la extensión (ej. '.go' o '.txt').",
            "starterCode": "package main\n\nimport (\n    \"fmt\"\n    \"io/fs\"\n    \"path/filepath\"\n)\n\nfunc BuscarPorExtension(raiz, extension string) ([]string, error) {\n    // Usa filepath.WalkDir y filepath.Ext\n}\n\nfunc main() {\n    // Busca archivos en el directorio actual\n}",
            "hint": "Comprueba if !d.IsDir() && filepath.Ext(path) == extension { coincidencias = append(...) }.",
            "solution": "package main\n\nimport (\n    \"fmt\"\n    \"io/fs\"\n    \"os\"\n    \"path/filepath\"\n)\n\nfunc BuscarPorExtension(raiz, extension string) ([]string, error) {\n    var encontrados []string\n    \n    err := filepath.WalkDir(raiz, func(path string, d fs.DirEntry, err error) error {\n        if err != nil {\n            return err\n        }\n        // Solo nos interesan archivos regulares, no directorios\n        if !d.IsDir() && filepath.Ext(path) == extension {\n            encontrados = append(encontrados, path)\n        }\n        return nil\n    })\n    \n    return encontrados, err\n}\n\nfunc main() {\n    // Creamos una estructura de prueba temporal\n    base := \"prueba_arbol\"\n    os.MkdirAll(filepath.Join(base, \"sub1\"), 0755)\n    os.MkdirAll(filepath.Join(base, \"sub2\"), 0755)\n    defer os.RemoveAll(base)\n    \n    os.WriteFile(filepath.Join(base, \"doc1.txt\"), []byte(\"a\"), 0644)\n    os.WriteFile(filepath.Join(base, \"sub1\", \"doc2.txt\"), []byte(\"b\"), 0644)\n    os.WriteFile(filepath.Join(base, \"sub2\", \"codigo.go\"), []byte(\"c\"), 0644)\n    \n    archivos, err := BuscarPorExtension(base, \".txt\")\n    if err != nil {\n        panic(err)\n    }\n    \n    fmt.Println(\"Archivos .txt encontrados en el árbol:\")\n    for _, a := range archivos {\n        fmt.Println(\"->\", a)\n    }\n}",
            "explanation": "La función 'filepath.WalkDir' desciende automáticamente por toda la jerarquía de carpetas. Al validar `!d.IsDir()` y comparar `filepath.Ext(path) == extension`, filtra con precisión los archivos deseados de forma rápida y con mínimo impacto de memoria."
        },
        "externalLinks": [
            {"title": "Package filepath: WalkDir", "url": "https://pkg.go.dev/path/filepath#WalkDir", "description": "Documentación oficial de la función de recorrido de directorios WalkDir."},
            {"title": "Package io/fs (Standard Library)", "url": "https://pkg.go.dev/io/fs", "description": "La interfaz de sistema de archivos virtual introducida en Go 1.16."},
            {"title": "Go by Example: Directories", "url": "https://gobyexample.com/directories", "description": "Ejemplo interactivo en Go by Example."}
        ]
    },

    "temporary-files-and-directories": {
        "id": 70,
        "slug": "temporary-files-and-directories",
        "title": "Temporary Files and Directories",
        "titleEs": "Archivos y Carpetas Temporales (os.CreateTemp)",
        "category": "Entrada / Salida y Archivos",
        "categorySlug": "archivos-io",
        "categoryIcon": "📁",
        "difficulty": "Principiante",
        "summary": "Creación segura de archivos y carpetas efímeros en el directorio temporal del sistema con auto-limpieza garantizada.",
        "originalExpl": "A lo largo de la ejecución de programas, a menudo queremos crear datos que no son necesarios después de que el programa salga. Los archivos y directorios temporales son ideales para este propósito.",
        "basicExpl": {
            "title": "Conceptos Fundamentales para Principiantes",
            "content": "A veces tu programa necesita procesar un video, descomprimir un archivo o descargar datos temporales que no quieres guardar para siempre:\n- Crear un archivo temporal: `f, err := os.CreateTemp(\"\", \"mi-app-*.txt\")`.\n  - Si pasas `\"\"` como primer argumento, Go usa automáticamente la carpeta temporal oficial del sistema operativo (`/tmp` en Linux/Mac o `AppData\\Local\\Temp` en Windows).\n  - El asterisco `*` en el nombre es reemplazado por números aleatorios para garantizar que nunca colisione con otro archivo.\n- Crear una carpeta temporal: `dir, err := os.MkdirTemp(\"\", \"mi-lote-*\")`.\n- Limpieza automática: programa `defer os.Remove(f.Name())` o `defer os.RemoveAll(dir)` inmediatamente.",
            "keyPoints": [
                "`os.CreateTemp(dir, patron)`: crea y abre un archivo temporal con nombre único.",
                "`os.MkdirTemp(dir, patron)`: crea un directorio temporal único.",
                "El comodín `*` en el patrón se reemplaza por caracteres aleatorios únicos.",
                "Siempre programa la eliminación con `defer os.Remove` / `defer os.RemoveAll`."
            ]
        },
        "interExpl": {
            "title": "Mecanismos Internos y Buenas Prácticas",
            "content": "Seguridad contra Ataques de Enlaces Simbólicos (Symlink Attacks):\nHistóricamente en C, crear archivos temporales con nombres predecibles como `/tmp/mi_app.tmp` permitía que un atacante local creara un enlace simbólico apuntando a un archivo crítico del sistema (como `/etc/passwd`), haciendo que tu programa lo sobreescribiera con permisos de administrador.\n`os.CreateTemp` de Go es inherentemente seguro:\n- Utiliza banderas de creación exclusiva del kernel del sistema operativo (`O_CREATE|O_EXCL`).\n- Genera sufijos aleatorios criptográficamente seguros.\n- Fija permisos restrictivos `0600` (solo el usuario actual puede leer o escribir en el archivo temporal).",
            "keyPoints": [
                "Creación atómica exclusiva (`O_EXCL`): previene condiciones de carrera en el sistema de archivos.",
                "Permisos restrictivos `0600`: inaccesible para otros usuarios del sistema operativo.",
                "Limpieza en testing: en pruebas unitarias se debe usar `t.TempDir()`, que limpia el directorio temporal automáticamente al terminar el test sin necesidad de defer."
            ]
        },
        "expertExpl": {
            "title": "Bajo Nivel, Rendimiento e Internals",
            "content": "Archivos Temporales Anónimos sin Nombre en Disco (Linux `O_TMPFILE`):\nEn sistemas Linux de alto rendimiento, puedes crear un archivo temporal y desvincularlo inmediatamente del árbol de directorios con `os.Remove(f.Name())` mientras mantienes el descriptor de archivo abierto (`f`).\nEl archivo continúa existiendo en los inodos del sistema de archivos mientras el proceso lo tenga abierto, pero desaparece completamente del explorador de archivos. Cuando tu programa termina (incluso si sufre un pánico violento o se apaga la máquina), el kernel del sistema operativo libera los bloques de disco instantáneamente sin dejar ningún archivo huérfano en `/tmp`.",
            "keyPoints": [
                "Unlink-on-Open Pattern: desvincular el archivo tras abrirlo asegura limpieza automática por el kernel ante caídas bruscas.",
                "Sistemas de archivos en memoria RAM (`tmpfs`): en Linux, `/tmp` suele ser un sistema de archivos `tmpfs` en memoria RAM, logrando transferencias a velocidad de bus de memoria.",
                "Testing en Go 1.15+: `t.TempDir()` gestiona subdirectorios efímeros aislados por cada test paralelo."
            ]
        },
        "evaluation": {
            "title": "Reto: Espacio de Trabajo Efímero con Limpieza Garantizada",
            "statement": "Escribe una función que cree un directorio temporal con os.MkdirTemp. Dentro de él, crea un archivo temporal con os.CreateTemp, escribe la fecha actual y muestra la ruta completa del archivo creado. Asegúrate de programar la limpieza de todo el directorio con defer os.RemoveAll.",
            "starterCode": "package main\n\nimport (\n    \"fmt\"\n    \"os\"\n    \"time\"\n)\n\nfunc main() {\n    // Crea directorio temporal, archivo temporal adentro, escribe y limpia\n}",
            "hint": "Crea dir, err := os.MkdirTemp(\"\", \"workspace-*\"); defer os.RemoveAll(dir). Luego os.CreateTemp(dir, \"*.log\").",
            "solution": "package main\n\nimport (\n    \"fmt\"\n    \"os\"\n    \"path/filepath\"\n    \"time\"\n)\n\nfunc main() {\n    // 1. Crear directorio temporal en la carpeta temporal del sistema\n    dirTemp, err := os.MkdirTemp(\"\", \"mi-workspace-*\")\n    if err != nil {\n        panic(err)\n    }\n    // Garantizamos que todo el directorio y su contenido se borren al salir\n    defer func() {\n        os.RemoveAll(dirTemp)\n        fmt.Println(\"Limpieza completada: directorio temporal eliminado.\")\n    }()\n    \n    fmt.Println(\"Directorio temporal creado:\", dirTemp)\n    \n    // 2. Crear archivo temporal dentro de ese directorio\n    fTemp, err := os.CreateTemp(dirTemp, \"registro-*.txt\")\n    if err != nil {\n        panic(err)\n    }\n    defer fTemp.Close()\n    \n    // 3. Escribir datos\n    mensaje := fmt.Sprintf(\"Proceso ejecutado el: %s\\n\", time.Now().Format(time.RFC3339))\n    fTemp.WriteString(mensaje)\n    \n    fmt.Println(\"Archivo temporal listo en :\", fTemp.Name())\n    \n    // Verificamos que existe físicamente\n    if _, err := os.Stat(filepath.Join(dirTemp, filepath.Base(fTemp.Name()))); err == nil {\n        fmt.Println(\"Verificación física: el archivo existe en disco.\")\n    }\n}",
            "explanation": "Al usar 'os.MkdirTemp' combinado con 'defer os.RemoveAll(dirTemp)', se crea un entorno de trabajo hermético y aislado. Cualquier archivo creado dentro de este directorio se eliminará automáticamente al salir de la función, manteniendo el sistema libre de archivos basura."
        },
        "externalLinks": [
            {"title": "Package os: CreateTemp and MkdirTemp", "url": "https://pkg.go.dev/os#CreateTemp", "description": "Documentación oficial de creación de archivos y carpetas temporales."},
            {"title": "Go by Example: Temporary Files and Directories", "url": "https://gobyexample.com/temporary-files-and-directories", "description": "Ejemplo en Go by Example."},
            {"title": "Testing: t.TempDir function", "url": "https://pkg.go.dev/testing#T.TempDir", "description": "Cómo gestionar directorios temporales en pruebas unitarias con Go."}
        ]
    },

    "embed-directive": {
        "id": 71,
        "slug": "embed-directive",
        "title": "Embed Directive",
        "titleEs": "Directiva //go:embed (Incrustación de Archivos en el Binario)",
        "category": "Entrada / Salida y Archivos",
        "categorySlug": "archivos-io",
        "categoryIcon": "📁",
        "difficulty": "Intermedio",
        "summary": "Incrustación de archivos estáticos (HTML, plantillas, imágenes, scripts SQL) directamente dentro del binario compilado en Go 1.16+.",
        "originalExpl": "//go:embed es una directiva del compilador que permite incrustar archivos y carpetas estáticas directamente dentro del binario de Go en tiempo de compilación.",
        "basicExpl": {
            "title": "Conceptos Fundamentales para Principiantes",
            "content": "Antes de Go 1.16, si creabas un servidor web con archivos HTML, CSS e imágenes, tenías que copiar la carpeta de archivos junto con el archivo ejecutable al servidor de producción. Si olvidabas copiar la carpeta, el programa fallaba.\nCon la directiva `//go:embed`:\n- El compilador toma los archivos de tu disco y los mete FÍSICAMENTE DENTRO del archivo ejecutable binario.\n- Tu binario final es un único archivo que contiene todo: el código, las imágenes y las páginas web.\n- Puedes incrustar como `string`, como `[]byte` o como un sistema de archivos virtual completo con `embed.FS`.",
            "keyPoints": [
                "Directiva del compilador: se escribe con la sintaxis exacta `//go:embed ruta/archivo` (sin espacio después de `//`).",
                "Se debe importar el paquete con `import _ \"embed\"` o `import \"embed\"`.",
                "Permite distribuir aplicaciones web completas en un ÚNICO archivo binario ejecutable.",
                "Solo puede incrustar archivos que estén en el mismo directorio del paquete o subdirectorios."
            ]
        },
        "interExpl": {
            "title": "Mecanismos Internos y Buenas Prácticas",
            "content": "Uso de `embed.FS` y Servidores Web con `http.FileServer`:\nPara incrustar carpetas completas con múltiples archivos y servirlos directamente en una web:\n```go\nimport (\n    \"embed\"\n    \"net/http\"\n)\n\n//go:embed public/*\nvar contenidoEstatico embed.FS\n\nfunc main() {\n    // Sirve los archivos incrustados directamente con HTTP\n    http.Handle(\"/\", http.FileServer(http.FS(contenidoEstatico)))\n}\n```\n`embed.FS` implementa la interfaz universal `io/fs.FS`, lo que permite usarlo con `html/template.ParseFS()` para cargar plantillas web directamente desde el binario compilado.",
            "keyPoints": [
                "`embed.FS`: sistema de archivos virtual de solo lectura integrado.",
                "Integración con `http.FS`: sirve contenido estático embebido directamente sin tocar el disco en producción.",
                "Restricción de seguridad: no permite usar `..` para incrustar archivos ubicados fuera del módulo o directorio del paquete."
            ]
        },
        "expertExpl": {
            "title": "Bajo Nivel, Rendimiento e Internals",
            "content": "Almacenamiento en el Segmento de Solo Lectura (.rodata):\nDurante la compilación, el compilador de Go (`cmd/compile`) lee los archivos especificados en la directiva `//go:embed` y los vuelca directamente en la sección de datos de solo lectura (`.rodata`) del binario ejecutable final.\n\nCuando tu aplicación lee una variable `string` o `[]byte` incrustada, la lectura se realiza directamente desde la memoria virtual mapeada del ejecutable con CERO llamadas al sistema de archivos (0 syscalls) y CERO latencia de disco, con una velocidad de lectura idéntica al ancho de banda de la memoria RAM del servidor.",
            "keyPoints": [
                "Segmento .rodata: los archivos embebidos forman parte del código máquina del ejecutable.",
                "Zero disk I/O en runtime: lectura a velocidad de memoria RAM sin tocar el disco.",
                "Implicación de tamaño: el tamaño del archivo ejecutable compilado aumentará exactamente en la cantidad de bytes que ocupen los archivos incrustados."
            ]
        },
        "evaluation": {
            "title": "Reto: Servidor de Configuración Embebida en Binario",
            "statement": "Crea una directiva //go:embed que incruste el contenido de un archivo de configuración 'version.txt' en una variable string de paquete. Escribe una función que devuelva la versión leída desde el binario embebido.",
            "starterCode": "package main\n\nimport (\n    _ \"embed\"\n    \"fmt\"\n)\n\n// Coloca la directiva //go:embed aquí\n// var versionApp string\n\nfunc main() {\n    // Imprime la versión embebida\n}",
            "hint": "Crea primero el archivo version.txt con os.WriteFile, luego usa //go:embed version.txt encima de var versionApp string.",
            "solution": "package main\n\nimport (\n    _ \"embed\"\n    \"fmt\"\n    \"os\"\n)\n\n// Nota: en un proyecto real version.txt ya existe en el proyecto.\n//go:embed version.txt\nvar versionApp string\n\nfunc main() {\n    fmt.Println(\"Aplicación arrancada con versión incrustada:\")\n    fmt.Printf(\"-> Versión: %s\\n\", versionApp)\n    fmt.Println(\"El binario no requiere ningún archivo externo para conocer su versión.\")\n}\n\n// Para probar este ejemplo, crea version.txt con: echo \"2.5.0-prod\" > version.txt",
            "explanation": "La directiva `//go:embed version.txt` indica al compilador de Go que capture los bytes de 'version.txt' en tiempo de compilación y los asigne como un string literal inmutable a la variable `versionApp`, permitiendo distribuir ejecutables 100% autocontenidos."
        },
        "externalLinks": [
            {"title": "Package embed (Standard Library)", "url": "https://pkg.go.dev/embed", "description": "Documentación oficial del paquete embed y la directiva //go:embed."},
            {"title": "The Go Blog: How Go 1.16 embeds files", "url": "https://go.dev/blog/go1.16", "description": "Lanzamiento y especificación técnica de la directiva embed en Go 1.16."},
            {"title": "Go by Example: Embed Directive", "url": "https://gobyexample.com/embed-directive", "description": "Ejemplo en Go by Example."}
        ]
    },

    "testing-and-benchmarking": {
        "id": 72,
        "slug": "testing-and-benchmarking",
        "title": "Testing and Benchmarking",
        "titleEs": "Pruebas Unitarias y Benchmarking (testing)",
        "category": "CLI, Pruebas y Benchmarking",
        "categorySlug": "cli-testing",
        "categoryIcon": "🧪",
        "difficulty": "Intermedio",
        "summary": "El ecosistema nativo de pruebas unitarias (TestXxx), pruebas por tablas (table-driven tests) y benchmarks (BenchmarkXxx).",
        "originalExpl": "Escribir pruebas unitarias es una parte importante de escribir código Go correcto. El paquete 'testing' y la herramienta 'go test' proporcionan las herramientas que necesitas para escribir y ejecutar pruebas y benchmarks.",
        "basicExpl": {
            "title": "Conceptos Fundamentales para Principiantes",
            "content": "En Go no necesitas instalar bibliotecas externas complejas para probar tu código: las pruebas unitarias vienen incluidas en el lenguaje:\n- Tus archivos de pruebas deben terminar siempre en `_test.go` (ej. `calculadora_test.go`).\n- Las funciones de prueba deben comenzar con `Test` y recibir `*testing.T`: `func TestSumar(t *testing.T)`.\n- Si algo no da el resultado esperado, avisas con `t.Errorf(\"esperaba %d, obtuve %d\", esperado, obtenido)`.\n- Se ejecutan en tu terminal escribiendo simplemente: `go test` o `go test -v`.",
            "keyPoints": [
                "Archivos con sufijo `_test.go` son ignorados por `go build` y ejecutados solo por `go test`.",
                "Firma obligatoria: `func TestNombre(t *testing.T)`.",
                "`t.Errorf`: registra el fallo pero continúa ejecutando las demás pruebas.",
                "`t.Fatalf`: registra el fallo y detiene inmediatamente la prueba actual."
            ]
        },
        "interExpl": {
            "title": "Mecanismos Internos y Buenas Prácticas",
            "content": "Pruebas Basadas en Tablas (Table-Driven Tests):\nEs el patrón de diseño canónico indiscutible en la comunidad de Go para pruebas limpias y completas:\n```go\nfunc TestMultiplicar(t *testing.T) {\n    casos := []struct {\n        nombre   string\n        a, b     int\n        esperado int\n    }{\n        {\"positivos\", 2, 3, 6},\n        {\"cero\", 5, 0, 0},\n        {\"negativos\", -2, 4, -8},\n    }\n    for _, c := range casos {\n        t.Run(c.nombre, func(t *testing.T) {\n            obtenido := Multiplicar(c.a, c.b)\n            if obtenido != c.esperado {\n                t.Errorf(\"fallo en %s: esperaba %d, obtuve %d\", c.nombre, c.esperado, obtenido)\n            }\n        })\n    }\n}\n```\n`t.Run` crea subtests independientes que pueden filtrarse individualmente desde la consola con `go test -run=TestMultiplicar/negativos`.",
            "keyPoints": [
                "Table-Driven Tests: definición de casos en un slice de structs anónimos para máxima cobertura.",
                "Subtests con `t.Run()`: permite aislar y ejecutar casos específicos.",
                "Paralelismo con `t.Parallel()`: ejecuta subtests de forma simultánea en múltiples núcleos de CPU.",
                "Cobertura de código: `go test -cover` y `go test -coverprofile=cobertura.out`."
            ]
        },
        "expertExpl": {
            "title": "Bajo Nivel, Rendimiento e Internals",
            "content": "Micro-benchmarks con `*testing.B` y Perfiles de Memoria:\nGo incluye un arnés de micro-benchmarking de precisión científica:\n```go\nfunc BenchmarkMiFuncion(b *testing.B) {\n    b.ReportAllocs() // Reporta asignaciones de memoria y bytes/op\n    for i := 0; i < b.N; i++ {\n        MiFuncion()\n    }\n}\n```\nEl runtime de Go ajusta automáticamente el valor de `b.N` (1, 100, 10000, 1000000) hasta que el bucle corre durante un tiempo estadísticamente significativo (por defecto 1 segundo).\n\nPara optimizar código a nivel senior, se combinan con `benchstat` y perfiles de asignación de memoria: `go test -bench=. -benchmem -memprofile=mem.pprof` para auditar exactamente cuántos bytes escaparon al Heap por operación.",
            "keyPoints": [
                "Bucle `b.N`: escala automáticamente hasta lograr significancia estadística.",
                "`b.ReportAllocs()`: audita el número de asignaciones de memoria (`allocs/op`) y bytes (`B/op`).",
                "Herramienta `benchstat`: compara estadísticamente el antes y después de una optimización garantizando rigor matemático."
            ]
        },
        "evaluation": {
            "title": "Reto: Suite de Pruebas Table-Driven para un Validador de Email",
            "statement": "Escribe una función 'EsEmailValido(email string) bool' (que verifique que contenga '@' y un punto posterior) y su correspondiente suite de pruebas unitarias 'TestEsEmailValido' utilizando la técnica Table-Driven Tests con al menos 3 casos (válido, sin arroba y vacío).",
            "starterCode": "package main\n\nimport (\n    \"strings\"\n    \"testing\"\n)\n\nfunc EsEmailValido(email string) bool {\n    // Implementa la validación básica\n}\n\n// Implementa TestEsEmailValido(t *testing.T)\n",
            "hint": "Crea una tabla con []struct{ nombre, email string; esperado bool } y recorre con t.Run.",
            "solution": "package main\n\nimport (\n    \"strings\"\n    \"testing\"\n)\n\nfunc EsEmailValido(email string) bool {\n    if len(email) < 3 {\n        return false\n    }\n    arroba := strings.Index(email, \"@\")\n    if arroba <= 0 || arroba == len(email)-1 {\n        return false\n    }\n    dominio := email[arroba+1:]\n    return strings.Contains(dominio, \".\")\n}\n\nfunc TestEsEmailValido(t *testing.T) {\n    casos := []struct {\n        nombre   string\n        email    string\n        esperado bool\n    }{\n        {\"email válido estándar\", \"usuario@empresa.com\", true},\n        {\"sin arroba\", \"usuarioempresa.com\", false},\n        {\"cadena vacía\", \"\", false},\n        {\"sin dominio\", \"usuario@\", false},\n        {\"arroba al inicio\", \"@empresa.com\", false},\n    }\n    \n    for _, c := range casos {\n        t.Run(c.nombre, func(t *testing.T) {\n            resultado := EsEmailValido(c.email)\n            if resultado != c.esperado {\n                t.Errorf(\"Caso '%s': para entrada '%s' esperaba %t, pero obtuve %t\", \n                    c.nombre, c.email, c.esperado, resultado)\n            }\n        })\n    }\n}",
            "explanation": "El patrón Table-Driven Test permite evaluar múltiples escenarios borde (strings vacíos, entradas maliciosas, casos de éxito) de forma compacta y estructurada. Cada subtest corre con su propio nombre legible mediante t.Run."
        },
        "externalLinks": [
            {"title": "Package testing (Standard Library)", "url": "https://pkg.go.dev/testing", "description": "Documentación oficial del paquete testing para tests y benchmarks."},
            {"title": "The Go Blog: Subtests and Sub-benchmarks", "url": "https://go.dev/blog/subtests", "description": "Guía oficial sobre el uso de t.Run y b.Run en Go."},
            {"title": "Go by Example: Testing and Benchmarking", "url": "https://gobyexample.com/testing-and-benchmarking", "description": "Ejemplo en Go by Example."}
        ]
    },

    "command-line-arguments": {
        "id": 73,
        "slug": "command-line-arguments",
        "title": "Command-Line Arguments",
        "titleEs": "Argumentos de Línea de Comandos (os.Args)",
        "category": "CLI, Pruebas y Benchmarking",
        "categorySlug": "cli-testing",
        "categoryIcon": "🧪",
        "difficulty": "Principiante",
        "summary": "Acceso a los parámetros crudos pasados al ejecutar un programa en la terminal mediante os.Args.",
        "originalExpl": "Los argumentos de línea de comandos son una forma común de parametrizar la ejecución de programas. Por ejemplo, 'go run hello.go' usa los argumentos 'run' y 'hello.go' para el programa 'go'.",
        "basicExpl": {
            "title": "Conceptos Fundamentales para Principiantes",
            "content": "Cuando ejecutas un programa desde tu terminal, puedes pasarle datos escribiéndolos a continuación: `miApp hola 123`.\nEn Go, estos valores se guardan automáticamente en una lista de cadenas llamada `os.Args`:\n- `os.Args[0]`: es SIEMPRE la ruta o nombre del propio programa que se está ejecutando.\n- `os.Args[1]`: es el primer argumento pasado por el usuario (\"hola\").\n- `os.Args[2]`: es el segundo argumento (\"123\").\n- Para obtener solo los argumentos del usuario descartando el nombre del programa, se toma el rebanado: `os.Args[1:]`.",
            "keyPoints": [
                "Se importa con `import \"os\"`.",
                "`os.Args` es un slice de cadenas (`[]string`).",
                "`os.Args[0]` siempre almacena la ruta de invocación del ejecutable.",
                "¡Cuidado con `panic: index out of range`!: valida siempre `len(os.Args)` antes de acceder a índices superiores."
            ]
        },
        "interExpl": {
            "title": "Mecanismos Internos y Buenas Prácticas",
            "content": "Validación Defensiva de Longitud y Manejo de Errores de Uso:\nDado que los usuarios de consola pueden olvidar pasar argumentos, un programa profesional NUNCA debe acceder a `os.Args[1]` directamente sin verificar la longitud:\n```go\nif len(os.Args) < 2 {\n    fmt.Fprintf(os.Stderr, \"Uso incorrecto: %s <archivo_origen>\\n\", os.Args[0])\n    os.Exit(1)\n}\n```\nLos mensajes de error de sintaxis de consola deben enviarse a la salida de error estándar (`os.Stderr`) y salir con un código de estado distinto de cero (`os.Exit(1)`).",
            "keyPoints": [
                "Validación de `len(os.Args)`: obligatoria para no crashear con pánico en la terminal.",
                "Salida a `os.Stderr`: usar `fmt.Fprintf(os.Stderr, ...)` para mensajes de diagnóstico y ayuda.",
                "Argumentos crudos vs Banderas (Flags): `os.Args` proporciona texto crudo posicional; si necesitas banderas con nombre (como `-puerto 8080`), se debe usar el paquete `flag`."
            ]
        },
        "expertExpl": {
            "title": "Bajo Nivel, Rendimiento e Internals",
            "content": "Paso de Argumentos desde el Kernel del Sistema Operativo al Runtime de Go:\nCuando el sistema operativo ejecuta un proceso (mediante la syscall `execve` en Linux o `CreateProcess` en Windows), el kernel coloca los argumentos (`argc` y `argv`) y las variables de entorno en la parte superior del espacio de memoria de la pila (stack) del nuevo proceso.\n\nDurante el arranque del runtime de Go (en la función de ensamblador `runtime.rt0_go` y `runtime.args`), el runtime de Go copia los punteros de `argv` de C, calcula la longitud de cada cadena y construye el slice de strings inmutables `os.Args` antes de que la función `main.main` comience a ejecutarse.",
            "keyPoints": [
                "Inicialización en runtime.args: conversión de `argc/argv` de C al slice nativo `[]string` de Go.",
                "Inmutabilidad práctica: aunque `os.Args` es un slice normal y puede mutarse en tiempo de ejecución, se considera mala práctica alterarlo.",
                "Límites del sistema operativo (`ARG_MAX`): el tamaño máximo total de todos los argumentos combinados está limitado por el kernel del SO (típicamente 2 MB en Linux)."
            ]
        },
        "evaluation": {
            "title": "Reto: Calculadora de Línea de Comandos Básica",
            "statement": "Escribe un programa que lea dos números y un operador matemático (+ o -) pasados como argumentos de línea de comandos (ej: 'app 10 + 5'). Valida que se pasen exactamente 3 argumentos, parsea los números con strconv.Atoi y muestra el resultado del cálculo. Si faltan argumentos, muestra la ayuda de uso.",
            "starterCode": "package main\n\nimport (\n    \"fmt\"\n    \"os\"\n    \"strconv\"\n)\n\nfunc main() {\n    // Valida len(os.Args), parsea y calcula\n}",
            "hint": "Recuerda que os.Args[0] es el programa, por lo que len(os.Args) debe ser exactamente 4 (programa, num1, op, num2).",
            "solution": "package main\n\nimport (\n    \"fmt\"\n    \"os\"\n    \"strconv\"\n)\n\nfunc main() {\n    if len(os.Args) != 4 {\n        fmt.Printf(\"Uso: %s <num1> <operador (+|-)> <num2>\\n\", os.Args[0])\n        fmt.Println(\"Ejemplo:\", os.Args[0], \"15 + 20\")\n        return\n    }\n    \n    n1, err1 := strconv.Atoi(os.Args[1])\n    op := os.Args[2]\n    n2, err2 := strconv.Atoi(os.Args[3])\n    \n    if err1 != nil || err2 != nil {\n        fmt.Println(\"Error: Los argumentos deben ser números enteros válidos.\")\n        return\n    }\n    \n    switch op {\n    case \"+\":\n        fmt.Printf(\"%d + %d = %d\\n\", n1, n2, n1+n2)\n    case \"-\":\n        fmt.Printf(\"%d - %d = %d\\n\", n1, n2, n1-n2)\n    default:\n        fmt.Printf(\"Operador no soportado: '%s' (usa + o -)\\n\", op)\n    }\n}",
            "explanation": "El programa comprueba rigurosamente que len(os.Args) sea exactamente 4 antes de acceder a los índices. Luego utiliza strconv.Atoi para convertir los parámetros textuales en enteros reales y procesa la operación matemática solicitada."
        },
        "externalLinks": [
            {"title": "Package os: Args variable", "url": "https://pkg.go.dev/os#Args", "description": "Documentación oficial de la variable os.Args en la biblioteca estándar."},
            {"title": "Go by Example: Command-Line Arguments", "url": "https://gobyexample.com/command-line-arguments", "description": "Ejemplo en Go by Example."},
            {"title": "Effective Go: Command line arguments", "url": "https://go.dev/doc/effective_go", "description": "Convenciones de interacción con el sistema operativo en Effective Go."}
        ]
    },

    "command-line-flags": {
        "id": 74,
        "slug": "command-line-flags",
        "title": "Command-Line Flags",
        "titleEs": "Banderas y Flags de Consola (flag)",
        "category": "CLI, Pruebas y Benchmarking",
        "categorySlug": "cli-testing",
        "categoryIcon": "🧪",
        "difficulty": "Intermedio",
        "summary": "Definición y parseo de opciones de consola con nombre (--puerto, -v, --ayuda) con el paquete estándar 'flag'.",
        "originalExpl": "Las banderas de línea de comandos son una forma común de especificar opciones para programas de línea de comandos. Por ejemplo, en 'wc -l', '-l' es una bandera de línea de comandos.",
        "basicExpl": {
            "title": "Conceptos Fundamentales para Principiantes",
            "content": "En vez de obligar al usuario a escribir argumentos en un orden estricto, las 'flags' (banderas) le permiten pasar opciones con nombre en cualquier orden:\n`miServidor -puerto 8080 -entorno produccion -debug`.\nGo incluye el paquete oficial `flag` para hacer esto de forma automática:\n1. Defines una bandera: `puerto := flag.Int(\"puerto\", 8080, \"Número de puerto del servidor\")`.\n2. Defines una bandera booleana: `debug := flag.Bool(\"debug\", false, \"Activar logs detallados\")`.\n3. Ejecutas el parseo: `flag.Parse()` (¡OBLIGATORIO!).\n4. Para leer el valor usas el asterisco porque devuelve un puntero: `*puerto` o `*debug`.\n¡Magia extra!: Si el usuario escribe `-h` o `--help`, Go genera automáticamente una página de ayuda perfecta con todas las opciones.",
            "keyPoints": [
                "Se importa con `import \"flag\"`.",
                "`flag.Int()`, `flag.String()`, `flag.Bool()` devuelven PUNTEROS al valor.",
                "También existen las variantes con puntero existente: `flag.StringVar(&miVar, ...)`. ",
                "`flag.Parse()` DEBE ser llamado después de definir las banderas y antes de leer sus valores.",
                "Genera automáticamente la ayuda con `-h` o `--help`."
            ]
        },
        "interExpl": {
            "title": "Mecanismos Internos y Buenas Prácticas",
            "content": "Banderas Personalizadas con la Interfaz `flag.Value`:\nPuedes crear banderas que parsen tipos complejos (como slices de strings separados por comas o duraciones personalizadas) implementando la interfaz `flag.Value`:\n```go\ntype Value interface {\n    String() string\n    Set(string) error\n}\n```\nAcceso a Argumentos Restantes (Posicionales):\nTras invocar a `flag.Parse()`, si el usuario pasó argumentos adicionales sin bandera (por ejemplo `app -v=true archivo1.txt archivo2.txt`), puedes obtener los argumentos restantes usando `flag.Args()` o `flag.Arg(i)`.",
            "keyPoints": [
                "Interfaz `flag.Value`: permite definir tipos de banderas personalizados (ej. listas, IPs, JSON).",
                "`flag.Args()`: devuelve un slice con los argumentos posicionales restantes después de las banderas.",
                "`flag.NFlag()`: devuelve el número de banderas que el usuario configuró explícitamente.",
                "Compatibilidad de sintaxis: Go acepta `-flag`, `--flag`, `-flag=valor` y `-flag valor`."
            ]
        },
        "expertExpl": {
            "title": "Bajo Nivel, Rendimiento e Internals",
            "content": "Instancias Independientes con `flag.NewFlagSet`:\nEl paquete `flag` utiliza por defecto una instancia global (`flag.CommandLine`). Sin embargo, en aplicaciones modulares, pruebas unitarias o CLI con subcomandos (estilo Git/Docker), utilizar variables globales provoca conflictos.\nLa técnica profesional es instanciar conjuntos de banderas aislados con `flag.NewFlagSet`:\n```go\nfs := flag.NewFlagSet(\"miSubcomando\", flag.ContinueOnError)\nfs.SetOutput(io.Discard) // Silencia la salida en tests\n```\nLas estrategias de manejo de errores configurables son:\n- `flag.ExitOnError` (por defecto en CLI, invoca `os.Exit(2)` ante errores de sintaxis).\n- `flag.ContinueOnError` (ideal para tests y subcomandos, devuelve el error sin crashear).\n- `flag.PanicOnError` (lanza pánico).",
            "keyPoints": [
                "`flag.NewFlagSet`: aísla conjuntos de banderas independientes por subcomando.",
                "Estrategias de error: `ContinueOnError` permite capturar errores de sintaxis sin abortar el proceso.",
                "Limitación del paquete estándar: no soporta alias cortos combinados (`-rf` para `-r -f`); para CLIs complejas de estilo POSIX avanzado se suele utilizar la biblioteca popular `spf13/pflag` o `spf13/cobra`."
            ]
        },
        "evaluation": {
            "title": "Reto: Configurador de Servidor CLI con Valores por Defecto",
            "statement": "Escribe un programa que utilice el paquete 'flag' para aceptar las siguientes opciones: '-host' (string, por defecto '127.0.0.1'), '-port' (int, por defecto 8080) y '-prod' (bool, por defecto false). Parsea las banderas e imprime un mensaje formateado mostrando la configuración resultante.",
            "starterCode": "package main\n\nimport (\n    \"flag\"\n    \"fmt\"\n)\n\nfunc main() {\n    // Define las banderas host, port y prod\n    // Ejecuta flag.Parse()\n    // Muestra la configuración leyendo los punteros\n}",
            "hint": "Usa flag.String(\"host\", \"127.0.0.1\", \"...\"), flag.Int(\"port\", 8080, \"...\") y recuerda desreferenciar con *host.",
            "solution": "package main\n\nimport (\n    \"flag\"\n    \"fmt\"\n)\n\nfunc main() {\n    host := flag.String(\"host\", \"127.0.0.1\", \"Dirección IP o host del servidor\")\n    port := flag.Int(\"port\", 8080, \"Puerto de escucha\")\n    prod := flag.Bool(\"prod\", false, \"Activar modo de producción optimizado\")\n    \n    flag.Parse() // Procesa los argumentos de la consola\n    \n    fmt.Println(\"=== Configuración del Servidor ===\")\n    fmt.Printf(\"Host        : %s\\n\", *host)\n    fmt.Printf(\"Puerto      : %d\\n\", *port)\n    fmt.Printf(\"Producción  : %t\\n\", *prod)\n    \n    // Muestra argumentos restantes si los hubiera\n    if len(flag.Args()) > 0 {\n        fmt.Println(\"Argumentos adicionales:\", flag.Args())\n    }\n}",
            "explanation": "El paquete flag asocia los valores pasados por el usuario a las variables puntero. Invocar 'flag.Parse()' procesa la línea de comandos, asigna los valores por defecto si el usuario omitió alguna bandera y permite leer de forma segura '*host', '*port' y '*prod'."
        },
        "externalLinks": [
            {"title": "Package flag (Standard Library)", "url": "https://pkg.go.dev/flag", "description": "Documentación oficial del paquete flag de la biblioteca estándar."},
            {"title": "Go by Example: Command-Line Flags", "url": "https://gobyexample.com/command-line-flags", "description": "Ejemplo en Go by Example."},
            {"title": "spf13/cobra (Librería de CLI moderna en Go)", "url": "https://github.com/spf13/cobra", "description": "La biblioteca estándar de la industria utilizada por Docker, Kubernetes y GitHub CLI."}
        ]
    }
}
