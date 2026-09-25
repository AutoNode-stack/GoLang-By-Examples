# scripts/data_part3_b.py
# Temas 54 a 64 (Expresiones Regulares, JSON, XML, Tiempo, Parsing, Cripto y Codificación)

TOPICS_PART3_B = {
    "regular-expressions": {
        "id": 54,
        "slug": "regular-expressions",
        "title": "Regular Expressions",
        "titleEs": "Expresiones Regulares (regexp)",
        "category": "Manipulación de Texto y Formatos",
        "categorySlug": "texto-formatos",
        "categoryIcon": "🔤",
        "difficulty": "Intermedio",
        "summary": "Búsqueda y extracción de patrones de texto complejos utilizando el motor RE2 determinista en 'regexp'.",
        "originalExpl": "Go ofrece soporte integrado para expresiones regulares. Aquí hay algunos ejemplos de tareas comunes relacionadas con regex en Go.",
        "basicExpl": {
            "title": "Conceptos Fundamentales para Principiantes",
            "content": "Una expresión regular (regex) es una fórmula especial para buscar o validar patrones en un texto (como verificar si un correo electrónico es válido o extraer todos los números de teléfono de un documento):\n- Se compila con `regexp.Compile(\"patron\")` o `regexp.MustCompile(`p([a-z]+)ch`)`.\n- Para comprobar si coincide: `r.MatchString(\"peach\")` -> true.\n- Para extraer la palabra coincidente: `r.FindString(\"peach punch\")` -> \"peach\".\n- Para reemplazar texto: `r.ReplaceAllString(\"a1 b2 c3\", \"<num>\")`.",
            "keyPoints": [
                "Se importa con `import \"regexp\"`.",
                "Escribe los patrones entre comillas invertidas (backticks `` `patron` ``) para no tener que escapar barras invertidas.",
                "`regexp.MustCompile`: compila en el arranque y hace pánico si el patrón es inválido.",
                "`FindAllString`: extrae todas las coincidencias encontradas en la cadena."
            ]
        },
        "interExpl": {
            "title": "Mecanismos Internos y Buenas Prácticas",
            "content": "Grupos de Captura y Subcoincidencias:\nLos paréntesis `()` definen grupos de captura para extraer partes específicas del patrón:\n```go\nr := regexp.MustCompile(`([a-zA-Z]+)@([a-zA-Z]+)\\.com`)\nsub := r.FindStringSubmatch(\"contacto: info@empresa.com\")\n// sub[0] = \"info@empresa.com\" (coincidencia total)\n// sub[1] = \"info\"              (usuario)\n// sub[2] = \"empresa\"           (dominio)\n```\nRegla de rendimiento: NUNCA compiles expresiones regulares dentro de bucles o manejadores HTTP (`regexp.Compile` dentro de una función repetida). Compila el regex UNA SOLA VEZ a nivel de paquete en una variable global.",
            "keyPoints": [
                "FindStringSubmatch: devuelve un slice donde el índice 0 es el match completo y los siguientes son los grupos entre paréntesis.",
                "Compilación única obligatoria: compilar un regex es muy costoso en CPU; almacena la instancia compilada en una variable de paquete.",
                "Soporte de bytes: todos los métodos tienen versión para `[]byte` (`Match`, `Find`, `FindSubmatch`) para evitar convertir strings."
            ]
        },
        "expertExpl": {
            "title": "Bajo Nivel, Rendimiento e Internals",
            "content": "Garantía de Tiempo Lineal O(N) con el Motor RE2:\nA diferencia de lenguajes como JavaScript, Python o Java que usan motores basados en Backtracking (PCRE) susceptibles a ataques de Denegación de Servicio por Expresiones Regulares (ReDoS Catastrófico), el motor `regexp` de Go implementa el algoritmo de Autómata Finito No Determinista (NFA/DFA) de Thompson (diseñado por Russ Cox).\n\nEsto garantiza matemáticamente que el tiempo de ejecución es estrictamente LINEAL O(N) respecto a la longitud del texto. Debido a esta garantía de seguridad, Go NO soporta retro-referencias (backreferences como `\\1`) ni lookaround (`(?=...)`), protegiendo a los servidores contra colapsos de CPU por expresiones maliciosas.",
            "keyPoints": [
                "Inmunidad a ReDoS: complejidad garantizada O(N) en el peor de los casos gracias al motor RE2.",
                "Sin Backtracking exponencial: no admite backreferences ni lookaheads para preservar la seguridad del servidor.",
                "Concurrencia segura: la estructura `*regexp.Regexp` es completamente segura para lectura concurrente de múltiples goroutines."
            ]
        },
        "evaluation": {
            "title": "Reto: Extractor de Códigos de Cupón con Grupos de Captura",
            "statement": "Escribe un programa que utilice regexp para encontrar y extraer códigos de cupón en un texto. Los cupones tienen el formato 'CUPON-[LETRAS]-[NUMEROS]' (ejemplo: 'CUPON-PROMO-2026'). Extrae el código completo, la categoría de promoción y el año utilizando FindStringSubmatch.",
            "starterCode": "package main\n\nimport (\n    \"fmt\"\n    \"regexp\"\n)\n\nfunc main() {\n    texto := \"Aplica el código CUPON-DESCUENTO-50 en tu compra de hoy.\"\n    // Compila el regex con grupos y extrae los componentes\n}",
            "hint": "Usa el patrón: `CUPON-([A-Z]+)-([0-9]+)` y r.FindStringSubmatch(texto).",
            "solution": "package main\n\nimport (\n    \"fmt\"\n    \"regexp\"\n)\n\nvar cuponRegex = regexp.MustCompile(`CUPON-([A-Z]+)-([0-9]+)`)\n\nfunc main() {\n    texto := \"Aplica el código CUPON-DESCUENTO-50 en tu compra de hoy.\"\n    \n    coincidencias := cuponRegex.FindStringSubmatch(texto)\n    \n    if len(coincidencias) > 0 {\n        fmt.Println(\"Cupón completo :\", coincidencias[0])\n        fmt.Println(\"Categoría promo:\", coincidencias[1])\n        fmt.Println(\"Valor / Código :\", coincidencias[2])\n    } else {\n        fmt.Println(\"No se encontró ningún cupón válido.\")\n    }\n}",
            "explanation": "El patrón `CUPON-([A-Z]+)-([0-9]+)` define dos grupos de captura entre paréntesis. La función FindStringSubmatch devuelve un slice donde la posición 0 es la coincidencia total y las posiciones 1 y 2 aíslan respectivamente la categoría ('DESCUENTO') y el número ('50')."
        },
        "externalLinks": [
            {"title": "Package regexp (Standard Library)", "url": "https://pkg.go.dev/regexp", "description": "Documentación oficial del paquete regexp y sintaxis RE2 soportada."},
            {"title": "Russ Cox: Regular Expression Matching Can Be Simple And Fast", "url": "https://research.swtch.com/regexp1", "description": "El famoso ensayo de Russ Cox comparando motores de backtracking vs autómatas de tiempo lineal."},
            {"title": "Go by Example: Regular Expressions", "url": "https://gobyexample.com/regular-expressions", "description": "Ejemplo en Go by Example."}
        ]
    },

    "json": {
        "id": 55,
        "slug": "json",
        "title": "JSON",
        "titleEs": "Codificación y Decodificación JSON",
        "category": "Manipulación de Texto y Formatos",
        "categorySlug": "texto-formatos",
        "categoryIcon": "🔤",
        "difficulty": "Intermedio",
        "summary": "Serialización (Marshal) y deserialización (Unmarshal) de datos estructurados con el paquete estándar 'encoding/json'.",
        "originalExpl": "Go ofrece soporte integrado para codificación y decodificación JSON, incluyendo hacia y desde tipos de datos nativos y personalizados mediante json.Marshal y json.Unmarshal.",
        "basicExpl": {
            "title": "Conceptos Fundamentales para Principiantes",
            "content": "JSON es el formato estándar universal para enviar y recibir datos en internet y APIs web:\n- Convertir un struct de Go a texto JSON: `json.Marshal(miStruct)` (devuelve un slice de bytes `[]byte`).\n- Convertir texto JSON a un struct de Go: `json.Unmarshal(bytesJSON, &miStruct)` (debes pasar un puntero con `&` para que Go rellene tu struct).\n- Para que un campo de tu struct aparezca en el JSON, el campo DEBE empezar con mayúscula (ser exportado).\n- Los 'tags' permiten renombrar las claves: `Nombre string `json:\"nombre_completo\"``.",
            "keyPoints": [
                "Se importa con `import \"encoding/json\"`.",
                "Serializar: `json.Marshal(v)` (Go -> JSON []byte).",
                "Deserializar: `json.Unmarshal(data, &v)` (JSON []byte -> Go struct mediante puntero).",
                "Solo los campos exportados (que empiezan con mayúscula) son serializados.",
                "Opción `omitempty`: omite el campo del JSON si está vacío (`json:\"telefono,omitempty\"`)."
            ]
        },
        "interExpl": {
            "title": "Mecanismos Internos y Buenas Prácticas",
            "content": "Streaming de JSON con `json.Encoder` y `json.Decoder`:\nCuando trabajas con conexiones de red HTTP o archivos en disco, cargar todo el JSON en memoria con `Marshal/Unmarshal` es ineficiente. La buena práctica es usar streaming directo:\n```go\n// Leer JSON directamente del cuerpo de una petición HTTP\nerr := json.NewDecoder(r.Body).Decode(&datos)\n\n// Escribir JSON directamente a la respuesta HTTP\nerr := json.NewEncoder(w).Encode(respuesta)\n```\nJSON genérico sin estructura fija: Puedes deserializar en `map[string]any` si la estructura del JSON es dinámica o desconocida.",
            "keyPoints": [
                "json.Decoder / json.Encoder: procesan streaming sobre cualquier `io.Reader` e `io.Writer` ahorrando memoria.",
                "Estructuras anónimas inline: útiles para respuestas de API de un solo uso sin contaminar el paquete.",
                "Desempaquetado estricto: `decoder.DisallowUnknownFields()` rechaza campos no contemplados en el struct para mayor seguridad."
            ]
        },
        "expertExpl": {
            "title": "Bajo Nivel, Rendimiento e Internals",
            "content": "Sobrecarga de Reflexión y Generadores de Código Zero-Alloc:\nEl paquete estándar `encoding/json` utiliza reflexión en tiempo de ejecución para inspeccionar los tags y campos de los structs en cada llamada, lo que genera múltiples asignaciones en el Heap y sobrecarga de CPU.\n\nEn microservicios con altísimo volumen de transacciones por segundo (TPS), se utilizan bibliotecas de generación de código estático como `easyjson` o `sonic` (desarrollada por ByteDance con ensamblador JIT). Estas herramientas generan métodos `MarshalJSON()` específicos en tiempo de compilación, eliminando la reflexión y multiplicando la velocidad de parseo hasta por 5x.",
            "keyPoints": [
                "Reflexión de tags en runtime: coste de procesamiento inherente al paquete estándar encoding/json.",
                "Interfaces personalizadas: implementar `json.Marshaler` y `json.Unmarshaler` permite controlar la serialización manual byte a byte.",
                "JSON Numbers: por defecto los números flotantes se parsean como float64; usar `decoder.UseNumber()` para preservar enteros grandes de 64 bits sin pérdida de precisión."
            ]
        },
        "evaluation": {
            "title": "Reto: Serialización y Deserialización de Respuesta de API",
            "statement": "Define un struct 'Usuario' con campos: ID (int), Nombre (string), Email (string) y Activo (bool), con tags JSON en formato snake_case y 'omitempty' en Email. Serializa un usuario a JSON, imprímelo, y luego deserialízalo de vuelta en una nueva variable verificando que los campos coincidan.",
            "starterCode": "package main\n\nimport (\n    \"encoding/json\"\n    \"fmt\"\n)\n\n// Define Usuario con tags JSON\n\nfunc main() {\n    // Serializa con json.Marshal e imprime\n    // Deserializa con json.Unmarshal\n}",
            "hint": "Usa json.Marshal(u) para serializar y json.Unmarshal(bytes, &uDestino) pasando el puntero.",
            "solution": "package main\n\nimport (\n    \"encoding/json\"\n    \"fmt\"\n)\n\ntype Usuario struct {\n    ID     int    `json:\"id\"`\n    Nombre string `json:\"nombre\"`\n    Email  string `json:\"email,omitempty\"`\n    Activo bool   `json:\"activo\"`\n}\n\nfunc main() {\n    original := Usuario{\n        ID:     42,\n        Nombre: \"Mateo Santos\",\n        Email:  \"mateo@empresa.com\",\n        Activo: true,\n    }\n    \n    // 1. Serializar a JSON\n    bytesJSON, err := json.MarshalIndent(original, \"\", \"  \")\n    if err != nil {\n        panic(err)\n    }\n    fmt.Println(\"JSON generado:\")\n    fmt.Println(string(bytesJSON))\n    \n    // 2. Deserializar en una nueva variable\n    var recuperado Usuario\n    if err := json.Unmarshal(bytesJSON, &recuperado); err != nil {\n        panic(err)\n    }\n    \n    fmt.Printf(\"\\nUsuario recuperado: ID=%d, Nombre='%s', Activo=%t\\n\", \n        recuperado.ID, recuperado.Nombre, recuperado.Activo)\n}",
            "explanation": "El paquete encoding/json mapea los campos de Go a las claves snake_case especificadas en los tags de estructura. Al llamar a json.Unmarshal, se pasa la dirección de memoria `&recuperado` para que la función pueda poblar directamente los campos del struct."
        },
        "externalLinks": [
            {"title": "The Go Blog: JSON and Go", "url": "https://go.dev/blog/json", "description": "Artículo canónico del equipo de Go sobre el mapeo de tipos JSON a Go."},
            {"title": "Package encoding/json", "url": "https://pkg.go.dev/encoding/json", "description": "Documentación oficial del paquete de codificación y decodificación JSON."},
            {"title": "Go by Example: JSON", "url": "https://gobyexample.com/json", "description": "Ejemplo en Go by Example."}
        ]
    },

    "xml": {
        "id": 56,
        "slug": "xml",
        "title": "XML",
        "titleEs": "Codificación y Decodificación XML",
        "category": "Manipulación de Texto y Formatos",
        "categorySlug": "texto-formatos",
        "categoryIcon": "🔤",
        "difficulty": "Intermedio",
        "summary": "Manejo de documentos estructurados XML mediante etiquetas, atributos y nodos con 'encoding/xml'.",
        "originalExpl": "Go ofrece soporte integrado para XML y formatos similares a XML a través del paquete encoding/xml. Al igual que con JSON, utiliza tags en las estructuras para guiar el mapeo.",
        "basicExpl": {
            "title": "Conceptos Fundamentales para Principiantes",
            "content": "XML es un formato clásico de intercambio de datos basado en etiquetas parecidas a HTML (`<persona id=\"1\"><nombre>Juan</nombre></persona>`):\n- Se utiliza mucho en servicios web SOAP antiguos, facturación electrónica y archivos de configuración.\n- Se serializa con `xml.Marshal(v)` y se deserializa con `xml.Unmarshal(data, &v)`.\n- Los tags de XML permiten especificar si un campo es un atributo (`xml:\"id,attr\"`) o un elemento hijo (`xml:\"nombre\"`).",
            "keyPoints": [
                "Se importa con `import \"encoding/xml\"`.",
                "Atributos XML con etiqueta `,attr`: `xml:\"version,attr\"`.",
                "Nombre del nodo raíz mediante campo especial `XMLName xml.Name `xml:\"raiz\"``.",
                "Contenido textual interno con `,chardata`."
            ]
        },
        "interExpl": {
            "title": "Mecanismos Internos y Buenas Prácticas",
            "content": "Mapeo de Rutas Anidadas en Tags de XML:\nUna característica muy potente de `encoding/xml` es que permite aplanar o crear jerarquías anidadas directamente en el tag usando la sintaxis de barra inclinada `>`:\n```go\ntype Planta struct {\n    Nombre    string `xml:\"origen>region>nombre\"`\n}\n```\nEsto genera automáticamente los nodos intermedios `<origen><region><nombre>...</nombre></region></origen>` sin necesidad de declarar tres estructuras intermedias vacías en Go.",
            "keyPoints": [
                "Jerarquías automáticas con `>`: `xml:\"padre>hijo>nieto\"` simplifica estructuras anidadas.",
                "Cabecera estándar XML: anteponer `xml.Header` (`<?xml version=\"1.0\" encoding=\"UTF-8\"?>`) al generar documentos completos.",
                "Comentarios XML: campo con tag `xml:\",comment\"` para incrustar notas legibles en el documento."
            ]
        },
        "expertExpl": {
            "title": "Bajo Nivel, Rendimiento e Internals",
            "content": "Parseo Basado en Tokens (Token-based Streaming):\nPara archivos XML masivos (ejemplo: catálogos o volcados de datos de varios gigabytes), `xml.Unmarshal` es inviable porque intentaría cargar el archivo completo en memoria. El paquete `encoding/xml` ofrece un parser de streaming por tokens de bajísima memoria (`xml.Decoder`):\n```go\ndec := xml.NewDecoder(archivo)\nfor {\n    token, err := dec.Token()\n    // Procesa StartElement, EndElement, CharData individualmente\n}\n```\nEsto permite procesar gigabytes de XML con un consumo constante de menos de 10 MB de RAM.",
            "keyPoints": [
                "Token-based Streaming: procesamiento elemento a elemento con `dec.Token()` para archivos ilimitados.",
                "Tipos de Token nativos: `xml.StartElement`, `xml.EndElement`, `xml.CharData`, `xml.Comment`.",
                "Alineación de memoria y codificación de entidades: escapado automático de caracteres reservados (`&lt;`, `&gt;`, `&amp;`)."
            ]
        },
        "evaluation": {
            "title": "Reto: Generador de Documento XML para Facturación",
            "statement": "Define una estructura 'Factura' con atributo 'Numero' (string), un nodo 'Cliente' (string) y un nodo anidado 'Pago>Moneda' (string) y 'Pago>Monto' (float64). Serializa la factura a XML con indentación de 2 espacios y muestra el resultado con la cabecera estándar de XML.",
            "starterCode": "package main\n\nimport (\n    \"encoding/xml\"\n    \"fmt\"\n)\n\n// Define Factura con tags de atributo y jerarquía anidada\n\nfunc main() {\n    // Serializa con xml.MarshalIndent y añade xml.Header\n}",
            "hint": "Usa Numero string `xml:\"numero,attr\"` y Moneda string `xml:\"Pago>Moneda\"`.",
            "solution": "package main\n\nimport (\n    \"encoding/xml\"\n    \"fmt\"\n)\n\ntype Factura struct {\n    XMLName xml.Name `xml:\"factura\"`\n    Numero  string   `xml:\"numero,attr\"`\n    Cliente string   `xml:\"cliente\"`\n    Moneda  string   `xml:\"pago>moneda\"`\n    Monto   float64  `xml:\"pago>monto\"`\n}\n\nfunc main() {\n    f := Factura{\n        Numero:  \"FAC-2026-001\",\n        Cliente: \"Corporación Alfa\",\n        Moneda:  \"EUR\",\n        Monto:   1250.50,\n    }\n    \n    salida, err := xml.MarshalIndent(f, \"\", \"  \")\n    if err != nil {\n        panic(err)\n    }\n    \n    documentoCompleto := xml.Header + string(salida)\n    fmt.Println(documentoCompleto)\n}",
            "explanation": "El tag `xml:\"numero,attr\"` coloca el dato como un atributo dentro de la etiqueta raíz `<factura numero=\"...\">`. La sintaxis `pago>moneda` crea automáticamente el nodo intermedio `<pago>` encapsulando a `<moneda>` y `<monto>` de forma completamente limpia."
        },
        "externalLinks": [
            {"title": "Package encoding/xml (Standard Library)", "url": "https://pkg.go.dev/encoding/xml", "description": "Documentación oficial del paquete de serialización XML."},
            {"title": "Go by Example: XML", "url": "https://gobyexample.com/xml", "description": "Ejemplo interactivo en Go by Example."},
            {"title": "Effective XML in Go", "url": "https://www.callicoder.com/golang-xml-parsing-and-generation-example/", "description": "Guía práctica de parseo y generación de XML en Go."}
        ]
    },

    "time": {
        "id": 57,
        "slug": "time",
        "title": "Time",
        "titleEs": "Manipulación del Tiempo (time.Time y time.Duration)",
        "category": "Tiempo, Matemáticas y Criptografía",
        "categorySlug": "tiempo-cripto",
        "categoryIcon": "⏳",
        "difficulty": "Principiante",
        "summary": "Gestión de fechas, horas, zonas horarias y duraciones con el paquete estándar 'time'.",
        "originalExpl": "Go ofrece un soporte extenso para tiempos y duraciones. Aquí hay algunos ejemplos de operaciones comunes con fechas y mediciones de tiempo.",
        "basicExpl": {
            "title": "Conceptos Fundamentales para Principiantes",
            "content": "Medir y manipular fechas en Go es muy intuitivo gracias al paquete `time`:\n- Obtener la hora actual: `ahora := time.Now()`.\n- Crear una fecha específica: `time.Date(2026, time.September, 25, 14, 30, 0, 0, time.UTC)`.\n- Extraer componentes: `ahora.Year()`, `ahora.Month()`, `ahora.Day()`, `ahora.Weekday()`.\n- Medir cuánto tardó algo: `duracion := time.Since(inicio)`.\n- Sumar o restar tiempo: `ahora.Add(2 * time.Hour)` o `ahora.Sub(antes)`.",
            "keyPoints": [
                "Se importa con `import \"time\"`.",
                "`time.Time`: representa un instante de tiempo absoluto en una zona horaria.",
                "`time.Duration`: representa una duración en nanosegundos (ej. `5 * time.Second`, `100 * time.Millisecond`).",
                "Comparar fechas: `t1.Before(t2)`, `t1.After(t2)`, `t1.Equal(t2)`."
            ]
        },
        "interExpl": {
            "title": "Mecanismos Internos y Buenas Prácticas",
            "content": "El Reloj Monotónico contra Cambios de Hora del Sistema (Monotonic Clock):\nEn otros lenguajes, si el sistema operativo ajusta el reloj del ordenador (por sincronización NTP o cambio de hora de verano) mientras tu programa mide una duración (`fin - inicio`), podías obtener duraciones negativas absurdas.\nDesde Go 1.9, `time.Now()` captura DOS relojes simultáneamente en una sola estructura:\n1. El reloj de pared (Wall Clock): para mostrar la hora legible al usuario.\n2. El reloj monotónico (Monotonic Clock): un contador físico de la CPU que NUNCA retrocede ni se ve afectado por ajustes horarios.\nAl calcular `t2.Sub(t1)` o `time.Since(t1)`, Go utiliza automáticamente el reloj monotónico, garantizando mediciones de tiempo 100% exactas y libres de anomalías.",
            "keyPoints": [
                "Monotonic Clocks nativos: Go 1.9+ garantiza que las mediciones de duración sean inmunes a saltos horarios de NTP.",
                "Zonas horarias con `time.LoadLocation`: permite convertir cualquier fecha a husos horarios locales (ej. `America/New_York`, `Europe/Madrid`).",
                "Constantes de tiempo tipadas: nunca uses enteros sueltos para tiempos; usa siempre el tipo `time.Duration`."
            ]
        },
        "expertExpl": {
            "title": "Bajo Nivel, Rendimiento e Internals",
            "content": "Estructura de Memoria y Syscalls VDSO (vsyscall):\nObtener la hora actual con `time.Now()` en Linux y sistemas modernos no ejecuta una costosa interrupción de llamada al sistema (syscall) al kernel del sistema operativo. En su lugar, Go utiliza las páginas VDSO (Virtual Dynamic Shared Object) mapeadas en espacio de usuario, leyendo directamente los contadores TSC (Time Stamp Counter) de la CPU en solo ~15-20 nanosegundos.\n\nLa estructura `time.Time` ocupa 24 bytes contiguos sin punteros en memoria (`wall uint64; ext int64; loc *Location`), lo que permite almacenarla en structs planos sin generar ningún trabajo para el recolector de basura.",
            "keyPoints": [
                "Aceleración VDSO: lectura de reloj sin coste de syscall al kernel del sistema operativo.",
                "Cero GC overhead: `time.Time` y `time.Duration` son valores de stack sin punteros de escape.",
                "Peligro con `==`: compara fechas siempre con `t1.Equal(t2)` en vez de `t1 == t2`, ya que `==` compara la zona horaria física y los bits monotónicos que podrían diferir."
            ]
        },
        "evaluation": {
            "title": "Reto: Calculadora de Días Restantes para Evento Futuro",
            "statement": "Escribe una función 'DiasHasta(fechaObjetivo time.Time) int' que calcule cuántos días enteros faltan desde el momento actual hasta la fecha objetivo en UTC. Comprueba la función con una fecha 10 días en el futuro.",
            "starterCode": "package main\n\nimport (\n    \"fmt\"\n    \"time\"\n)\n\nfunc DiasHasta(fechaObjetivo time.Time) int {\n    // Calcula la diferencia y devuelve días enteros\n}\n\nfunc main() {\n    // Crea una fecha a 10 días vista y calcula\n}",
            "hint": "Usa fechaObjetivo.Sub(time.Now()) y extrae las horas con duracion.Hours() dividiendo entre 24.",
            "solution": "package main\n\nimport (\n    \"fmt\"\n    \"time\"\n)\n\nfunc DiasHasta(fechaObjetivo time.Time) int {\n    ahora := time.Now()\n    diferencia := fechaObjetivo.Sub(ahora)\n    dias := int(diferencia.Hours() / 24)\n    return dias\n}\n\nfunc main() {\n    ahora := time.Now()\n    meta := ahora.AddDate(0, 0, 10) // Añade exactamente 10 días\n    \n    diasRestantes := DiasHasta(meta)\n    fmt.Printf(\"Fecha actual : %s\\n\", ahora.Format(\"02/01/2006\"))\n    fmt.Printf(\"Fecha objetivo: %s\\n\", meta.Format(\"02/01/2006\"))\n    fmt.Printf(\"Días restantes: %d días\\n\", diasRestantes)\n}",
            "explanation": "El método 'AddDate(años, meses, días)' permite avanzar calendarios respetando la cantidad variable de días de cada mes. La resta con 'Sub()' devuelve un time.Duration que puede consultarse en horas mediante 'Hours()' para calcular los días de diferencia exactos."
        },
        "externalLinks": [
            {"title": "Package time (Standard Library)", "url": "https://pkg.go.dev/time", "description": "Documentación oficial del paquete de tiempo en la biblioteca estándar de Go."},
            {"title": "The Go Blog: Monotonic Time in Go", "url": "https://go.dev/blog/monotonic", "description": "Explicación de Russ Cox sobre la incorporación de relojes monotónicos en Go 1.9."},
            {"title": "Go by Example: Time", "url": "https://gobyexample.com/time", "description": "Ejemplo en Go by Example."}
        ]
    },

    "epoch": {
        "id": 58,
        "slug": "epoch",
        "title": "Epoch",
        "titleEs": "Época Unix (Timestamps en Segundos y Nanosegundos)",
        "category": "Tiempo, Matemáticas y Criptografía",
        "categorySlug": "tiempo-cripto",
        "categoryIcon": "⏳",
        "difficulty": "Principiante",
        "summary": "Conversión bidireccional entre fechas de Go y marcas de tiempo Unix Epoch (segundos, milisegundos y nanosegundos desde 1970).",
        "originalExpl": "Un requerimiento común en programas es obtener el número de segundos, milisegundos o nanosegundos desde la Época Unix (1 de enero de 1970 UTC).",
        "basicExpl": {
            "title": "Conceptos Fundamentales para Principiantes",
            "content": "La 'Época Unix' (Epoch) es el estándar que usan todas las computadoras del mundo para medir el tiempo: cuenta cuántos segundos han pasado desde la medianoche del 1 de enero de 1970 (UTC):\n- Obtener segundos Unix actuales: `time.Now().Unix()`.\n- Obtener milisegundos: `time.Now().UnixMilli()`.\n- Obtener nanosegundos: `time.Now().UnixNano()`.\n- Reconvertir un número Unix a fecha Go normal: `time.Unix(segundos, nanosegundos)`.",
            "keyPoints": [
                "`t.Unix()`: devuelve segundos transcurridos como `int64`.",
                "`t.UnixMilli()` (Go 1.17+): milisegundos transcurridos (útil para APIs de JavaScript).",
                "`time.Unix(sec, nsec)`: reconstruye la estructura `time.Time` correspondiente."
            ]
        },
        "interExpl": {
            "title": "Mecanismos Internos y Buenas Prácticas",
            "content": "Compatibilidad con Bases de Datos y el Problema del Año 2038 (Y2038):\nEn sistemas antiguos de 32 bits, los timestamps Unix se almacenaban en enteros con signo de 32 bits, lo que provocará que el 19 de enero de 2038 el contador desborde en números negativos.\nEn Go, `t.Unix()` devuelve siempre un entero de 64 bits (`int64`). Un timestamp de 64 bits durará aproximadamente 292 mil millones de años, haciendo que el código Go sea completamente inmune al problema del año 2038.\n\nEs el formato ideal para almacenar marcas de tiempo en bases de datos NoSQL, Redis o tokens JWT de autenticación (`exp` y `iat`).",
            "keyPoints": [
                "Enteros de 64 bits seguros: Go usa `int64` evitando el bug del año 2038.",
                "Tokens JWT: estándar para campos `exp` (expiración) e `iat` (emitido en).",
                "Interoperabilidad universal: el formato más ligero y compatible para compartir tiempo entre microservicios de diferentes lenguajes."
            ]
        },
        "expertExpl": {
            "title": "Bajo Nivel, Rendimiento e Internals",
            "content": "Descarte de Bits Monotónicos al Convertir a Epoch:\nCuando llamas a `t.Unix()`, `t.UnixMilli()` o `t.UnixNano()`, Go extrae únicamente el tiempo absoluto de pared (Wall Time) y descarta los metadatos del reloj monotónico. Si luego reconstruyes el tiempo con `time.Unix(s, 0)`, la nueva instancia `time.Time` carece de reloj monotónico.\n\nPor tanto, restar dos fechas reconstruidas desde la base de datos medirá el tiempo de reloj de pared, no el monotónico de CPU. Para forzar el descarte intencionado del reloj monotónico en una variable de tiempo (útil antes de serializaciones o comparaciones profundas con `reflect.DeepEqual`), se utiliza el modismo oficial `t = t.Truncate(0)` o `t = t.Round(0)`.",
            "keyPoints": [
                "Strip monotonic clock: convertir a Epoch elimina la referencia monotónica de hardware.",
                "Modismo `t.Truncate(0)`: técnica estándar para remover los bits monotónicos sin alterar la fecha.",
                "Precisión a nivel de nanosegundo: `UnixNano()` ofrece la máxima resolución disponible en el silicio de la máquina."
            ]
        },
        "evaluation": {
            "title": "Reto: Generador y Validador de Token con Expiración Unix",
            "statement": "Escribe una función 'GenerarExpiracion(segundosValidez int) int64' que devuelva el timestamp Unix en segundos en que vencerá un token. Luego escribe 'TokenExpirado(expUnix int64) bool' que compare el timestamp con el momento actual y determine si ya venció.",
            "starterCode": "package main\n\nimport (\n    \"fmt\"\n    \"time\"\n)\n\n// Implementa GenerarExpiracion y TokenExpirado\n\nfunc main() {\n    // Genera un token que venza en 2 segundos\n    // Comprueba su estado inmediato y tras 3 segundos de espera\n}",
            "hint": "GenerarExpiracion: time.Now().Add(time.Duration(segundosValidez)*time.Second).Unix(). TokenExpirado: time.Now().Unix() > expUnix.",
            "solution": "package main\n\nimport (\n    \"fmt\"\n    \"time\"\n)\n\nfunc GenerarExpiracion(segundosValidez int) int64 {\n    return time.Now().Add(time.Duration(segundosValidez) * time.Second).Unix()\n}\n\nfunc TokenExpirado(expUnix int64) bool {\n    return time.Now().Unix() > expUnix\n}\n\nfunc main() {\n    // Token válido por solo 1 segundo\n    expiracion := GenerarExpiracion(1)\n    fmt.Printf(\"Token generado con expiración Unix: %d\\n\", expiracion)\n    \n    fmt.Println(\"¿Expirado al instante?:\", TokenExpirado(expiracion))\n    \n    fmt.Println(\"Esperando 1.5 segundos...\")\n    time.Sleep(1500 * time.Millisecond)\n    \n    fmt.Println(\"¿Expirado tras la espera?:\", TokenExpirado(expiracion))\n}",
            "explanation": "Los timestamps Unix son extremadamente eficientes para validar sesiones y tokens JWT: una simple comparación de enteros (`ahora > expiracion`) determina de forma instantánea si el token sigue vigente sin complejas operaciones de fechas."
        },
        "externalLinks": [
            {"title": "Package time: Unix functions", "url": "https://pkg.go.dev/time#Unix", "description": "Documentación oficial de las funciones Unix, UnixMilli y UnixMicro."},
            {"title": "Go by Example: Epoch", "url": "https://gobyexample.com/epoch", "description": "Ejemplo en Go by Example."},
            {"title": "Wikipedia: Unix time and the Year 2038 problem", "url": "https://en.wikipedia.org/wiki/Year_2038_problem", "description": "Explicación del problema del año 2038 resuelto en Go con enteros int64."}
        ]
    },

    "time-formatting-parsing": {
        "id": 59,
        "slug": "time-formatting-parsing",
        "title": "Time Formatting / Parsing",
        "titleEs": "Formateo y Parseo de Fechas (La Fecha de Referencia)",
        "category": "Tiempo, Matemáticas y Criptografía",
        "categorySlug": "tiempo-cripto",
        "categoryIcon": "⏳",
        "difficulty": "Intermedio",
        "summary": "El singular sistema de formateo de fechas de Go basado en la fecha mnemotécnica de referencia 'Mon Jan 2 15:04:05 MST 2006'.",
        "originalExpl": "Go enfatiza el formateo y parseo de tiempo basado en ejemplos mnemotécnicos en lugar de los comodines clásicos como %Y-%m-%d. El patrón debe usar la fecha de referencia específica de Go: Mon Jan 2 15:04:05 MST 2006.",
        "basicExpl": {
            "title": "Conceptos Fundamentales para Principiantes",
            "content": "En casi todos los lenguajes tienes que memorizar letras crípticas como `%Y-%m-%d %H:%M:%S`.\nLos creadores de Go inventaron algo mucho más visual: una 'Fecha de Referencia Mágica':\n`Lunes 02 de Enero de 2006 a las 15:04:05 (zona horaria -0700)`.\nPara recordar los números, fíjate en la secuencia ordenada: 1, 2, 3, 4, 5, 6, 7:\n- 1: Mes (Enero / Jan / 01)\n- 2: Día del mes (02)\n- 3: Hora en formato 12h (03 o 15 para 24h)\n- 4: Minuto (04)\n- 5: Segundo (05)\n- 6: Año (2006)\n- 7: Zona horaria (-0700)\nSi quieres formatear como 'Año-Mes-Día', simplemente escribes el patrón: `\"2006-01-02\"`.",
            "keyPoints": [
                "Fecha mnemotécnica mágica: `2006-01-02 15:04:05` (orden 1, 2, 3, 4, 5, 6).",
                "Formatear (Fecha -> String): `t.Format(\"2006-01-02\")`.",
                "Parsear (String -> Fecha): `time.Parse(\"2006-01-02\", \"2026-09-25\")`.",
                "Constantes predefinidas: `time.RFC3339`, `time.RFC1123`, `time.DateOnly` (Go 1.20+)."
            ]
        },
        "interExpl": {
            "title": "Mecanismos Internos y Buenas Prácticas",
            "content": "Constantes estándar modernas en Go 1.20+:\nPara ahorrar tiempo y evitar errores tipográficos en los patrones más comunes, Go 1.20 introdujo constantes listas para usar:\n- `time.DateOnly` = `\"2006-01-02\"`\n- `time.TimeOnly` = `\"15:04:05\"`\n- `time.DateTime` = `\"2006-01-02 15:04:05\"`\n- `time.RFC3339` = el estándar oficial para APIs JSON en internet.\n\nCuidado con las zonas horarias en `time.Parse`: `time.Parse` asume siempre la zona horaria UTC si no se especifica. Si quieres parsear una fecha en la zona horaria local del servidor o usuario, debes usar `time.ParseInLocation(patron, valor, time.Local)`.",
            "keyPoints": [
                "Constantes modernas: `time.DateOnly`, `time.TimeOnly`, `time.DateTime` (Go 1.20+).",
                "`time.ParseInLocation`: indispensable para interpretar fechas en la zona horaria local sin desfases UTC.",
                "Milésimas y microsegundos: usar `.000` (relleno con ceros) o `.999` (omite ceros finales sobrantes)."
            ]
        },
        "expertExpl": {
            "title": "Bajo Nivel, Rendimiento e Internals",
            "content": "El Compilador de Formato y Zero-Allocations con `AppendFormat`:\nLa función `t.Format(layout)` analiza la cadena de patrón caracter por caracter en tiempo de ejecución, lo que requiere asignar un nuevo string en el heap.\nEn aplicaciones de alto rendimiento (motores de logging o routers web de alta concurrencia), se utiliza el método de cero asignaciones `t.AppendFormat(buffer, layout)`:\n```go\nvar buf [64]byte\nb := t.AppendFormat(buf[:0], time.RFC3339)\n```\nEsto añade la fecha formateada directamente en un búfer preasignado en el stack sin requerir NINGUNA asignación de memoria en el Heap (0 B/op).",
            "keyPoints": [
                "Zero-Allocation Formatting: `t.AppendFormat` formatea directamente sobre slices de bytes preexistentes.",
                "Fast-path para RFC3339: la biblioteca estándar incluye código ensamblador optimizado específicamente para el formato RFC3339.",
                "Parsing determinista: el motor de parseo no requiere expresiones regulares; escanea caracteres directamente en código nativo."
            ]
        },
        "evaluation": {
            "title": "Reto: Parseo de Fechas de Logs y Conversión a RFC3339",
            "statement": "Un archivo de log registra eventos con el formato personalizado '25/09/2026 14:30:15'. Escribe una función 'ConvertirFechaLog(fechaTexto string) (string, error)' que parsee esa cadena y la devuelva formateada en el estándar internacional time.RFC3339 en UTC.",
            "starterCode": "package main\n\nimport (\n    \"fmt\"\n    \"time\"\n)\n\nfunc ConvertirFechaLog(fechaTexto string) (string, error) {\n    // Parsea con el patrón correspondiente y formatea en time.RFC3339\n}\n\nfunc main() {\n    entrada := \"25/09/2026 14:30:15\"\n    // Convierte e imprime\n}",
            "hint": "El patrón correspondiente a '25/09/2026 14:30:15' es '02/01/2006 15:04:05'.",
            "solution": "package main\n\nimport (\n    \"fmt\"\n    \"time\"\n)\n\nfunc ConvertirFechaLog(fechaTexto string) (string, error) {\n    patronOrigen := \"02/01/2006 15:04:05\"\n    t, err := time.Parse(patronOrigen, fechaTexto)\n    if err != nil {\n        return \"\", fmt.Errorf(\"error al parsear fecha de log: %w\", err)\n    }\n    return t.UTC().Format(time.RFC3339), nil\n}\n\nfunc main() {\n    entrada := \"25/09/2026 14:30:15\"\n    resultado, err := ConvertirFechaLog(entrada)\n    if err != nil {\n        fmt.Println(\"Fallo:\", err)\n        return\n    }\n    fmt.Println(\"Fecha original :\", entrada)\n    fmt.Println(\"Formato RFC3339:\", resultado)\n}",
            "explanation": "Al usar el patrón de referencia '02/01/2006 15:04:05', time.Parse extrae con precisión matemática el día, mes, año y hora. Luego, 't.UTC().Format(time.RFC3339)' genera la cadena universal compatible con cualquier API moderna."
        },
        "externalLinks": [
            {"title": "Package time: Constants and Format layout", "url": "https://pkg.go.dev/time#pkg-constants", "description": "Explicación de la fecha de referencia 2006-01-02 en la documentación oficial."},
            {"title": "Go by Example: Time Formatting / Parsing", "url": "https://gobyexample.com/time-formatting-parsing", "description": "Ejemplo en Go by Example."},
            {"title": "GopherAcademy: Why is the reference time Jan 2 15:04:05 2006?", "url": "https://blog.gopheracademy.com/advent-2017/time-formatting/", "description": "Historia y diseño de la fecha mnemotécnica 1 2 3 4 5 6 7 en Go."}
        ]
    },

    "random-numbers": {
        "id": 60,
        "slug": "random-numbers",
        "title": "Random Numbers",
        "titleEs": "Números Pseudoaleatorios (math/rand y math/rand/v2)",
        "category": "Tiempo, Matemáticas y Criptografía",
        "categorySlug": "tiempo-cripto",
        "categoryIcon": "⏳",
        "difficulty": "Intermedio",
        "summary": "Generación de números aleatorios para simulaciones con 'math/rand' y el moderno paquete 'math/rand/v2' de Go 1.22+.",
        "originalExpl": "El paquete math/rand de Go proporciona generación de números pseudoaleatorios. En Go 1.22 se introdujo math/rand/v2 con algoritmos más modernos y rápidos y soporte nativo para genéricos.",
        "basicExpl": {
            "title": "Conceptos Fundamentales para Principiantes",
            "content": "Para crear dados, juegos o simulaciones necesitas números aleatorios:\n- En Go 1.22+ se usa `math/rand/v2`:\n- Número entero aleatorio entre 0 y N-1: `rand.IntN(100)` (de 0 a 99).\n- Número flotante entre 0.0 y 1.0: `rand.Float64()`.\n- ¡Cuidado!: `math/rand` genera números 'pseudoaleatorios' matemáticos. Son geniales para videojuegos o pruebas, pero NUNCA deben usarse para contraseñas, tokens de seguridad o criptografía (para seguridad se usa `crypto/rand`).",
            "keyPoints": [
                "Nuevo paquete estándar en Go 1.22: `import \"math/rand/v2\"`.",
                "`rand.IntN(n)` genera números enteros en el rango `[0, n)`.",
                "Auto-inicializado: ya no es necesario configurar manualmente una semilla con `rand.Seed(time.Now().UnixNano())`.",
                "No apto para seguridad: usar `crypto/rand` para claves y tokens criptográficos."
            ]
        },
        "interExpl": {
            "title": "Mecanismos Internos y Buenas Prácticas",
            "content": "Novedades de `math/rand/v2` (Go 1.22+):\nEl paquete `math/rand/v2` es el primer paquete 'v2' en la biblioteca estándar de Go y resolvió problemas históricos:\n1. Reemplazó el generador antiguo por los algoritmos modernos PCG (`PCG-DXSM`) y ChaCha8, que son considerablemente más rápidos y estadísticamente superiores.\n2. Se renombró la función confusa `Intn(n)` a `IntN(n)` y soporta genéricos: `rand.N(duracion)` funciona directamente con tipos personalizados como `time.Duration`.\n3. Eliminación del generador global bloqueado por mutex: el generador por defecto utiliza fuentes por hilo sin contención de bloqueos.",
            "keyPoints": [
                "Algoritmos modernos PCG y ChaCha8: mayor entropía y velocidad sin sesgos estadísticos.",
                "Genérico `rand.N(t)`: permite generar duraciones aleatorias: `rand.N(5 * time.Second)`.",
                "Concurrencia sin locks: las funciones globales de rand/v2 no sufren contención de mutex entre goroutines."
            ]
        },
        "expertExpl": {
            "title": "Bajo Nivel, Rendimiento e Internals",
            "content": "Algoritmo Lemire para Reducción de Rango sin Sesgo (Bias-free Range Reduction):\nHistóricamente, para obtener un número entre 0 y N se usaba el operador módulo `rand.Uint64() % N`. Esto introduce un 'sesgo de módulo' (Modulo Bias) que hace que ciertos números tengan mayor probabilidad matemática de aparecer si el espacio de 64 bits no es un múltiplo exacto de N.\n\nEn `math/rand/v2`, Go implementó el algoritmo de Daniel Lemire (Fast Random Integer in an Interval): utiliza una multiplicación de enteros de 128 bits sin divisiones de hardware en la CPU, garantizando una distribución estadística perfectamente uniforme sin sesgo y duplicando la velocidad frente a la operación de división.",
            "keyPoints": [
                "Algoritmo de Daniel Lemire: eliminación de sesgo de módulo mediante aritmética de 128 bits de hardware.",
                "Zero modulo division: evita la costosa instrucción `DIV` de la CPU.",
                "Generador ChaCha8 criptográficamente fuerte pero determinista: permite reproducibilidad de pruebas mediante semillas explícitas."
            ]
        },
        "evaluation": {
            "title": "Reto: Barajador de Cartas Aleatorio (Fisher-Yates Shuffle)",
            "statement": "Escribe una función 'Barajar(elementos []string)' que desordene aleatoriamente un slice de elementos in-place utilizando el algoritmo canónico de Fisher-Yates con rand.IntN.",
            "starterCode": "package main\n\nimport (\n    \"fmt\"\n    \"math/rand/v2\"\n)\n\nfunc Barajar(elementos []string) {\n    // Implementa el algoritmo de Fisher-Yates\n}\n\nfunc main() {\n    baraja := []string{\"As\", \"Rey\", \"Reina\", \"Jota\", \"Diez\"}\n    Barajar(baraja)\n    fmt.Println(\"Barajado:\", baraja)\n}",
            "hint": "Recorre desde i := len-1 hasta 1. Elige j := rand.IntN(i + 1) e intercambia elementos[i], elementos[j].",
            "solution": "package main\n\nimport (\n    \"fmt\"\n    \"math/rand/v2\"\n)\n\nfunc Barajar(elementos []string) {\n    for i := len(elementos) - 1; i > 0; i-- {\n        // Selecciona un índice aleatorio entre 0 e i inclusive\n        j := rand.IntN(i + 1)\n        elementos[i], elementos[j] = elementos[j], elementos[i]\n    }\n}\n\nfunc main() {\n    baraja := []string{\"As de Picas\", \"Rey de Corazones\", \"Reina de Diamantes\", \"Jota de Tréboles\", \"10 de Picas\"}\n    fmt.Println(\"Baraja original :\", baraja)\n    \n    Barajar(baraja)\n    fmt.Println(\"Baraja mezclada  :\", baraja)\n}",
            "explanation": "El algoritmo de Fisher-Yates garantiza una permutación matemáticamente equiprobable (todas las combinaciones tienen la misma probabilidad exacta). Al usar 'rand.IntN(i + 1)' de math/rand/v2, se realiza el intercambio in-place con la máxima eficiencia."
        },
        "externalLinks": [
            {"title": "The Go Blog: Modernizing math/rand in Go 1.22", "url": "https://go.dev/blog/randv2", "description": "Artículo oficial de Russ Cox explicando las mejoras y arquitectura de math/rand/v2."},
            {"title": "Package math/rand/v2", "url": "https://pkg.go.dev/math/rand/v2", "description": "Documentación oficial del paquete math/rand/v2 de la biblioteca estándar."},
            {"title": "Go by Example: Random Numbers", "url": "https://gobyexample.com/random-numbers", "description": "Ejemplo en Go by Example."}
        ]
    },

    "number-parsing": {
        "id": 61,
        "slug": "number-parsing",
        "title": "Number Parsing",
        "titleEs": "Conversión y Parseo de Números (strconv)",
        "category": "Tiempo, Matemáticas y Criptografía",
        "categorySlug": "tiempo-cripto",
        "categoryIcon": "⏳",
        "difficulty": "Principiante",
        "summary": "Conversión segura y precisa entre cadenas de texto y valores numéricos con el paquete nativo 'strconv'.",
        "originalExpl": "Parsear números desde cadenas de texto es una tarea básica pero común en muchos programas. El paquete integrado strconv proporciona funciones para este propósito.",
        "basicExpl": {
            "title": "Conceptos Fundamentales para Principiantes",
            "content": "Cuando un usuario escribe '123' en un formulario o lo recibes de una API web, para la computadora eso es texto (un string), no un número con el que puedas hacer sumas.\nEl paquete oficial `strconv` (String Conversion) hace la traducción:\n- Texto a entero simple: `num, err := strconv.Atoi(\"123\")` (Atoi significa 'ASCII to Integer').\n- Entero a texto simple: `texto := strconv.Itoa(123)` (Itoa significa 'Integer to ASCII').\n- Texto a flotante con decimales: `f, err := strconv.ParseFloat(\"3.1416\", 64)`.\n- Texto a booleano: `b, err := strconv.ParseBool(\"true\")` (entiende 'true', 'false', '1', '0', 't', 'f').",
            "keyPoints": [
                "Se importa con `import \"strconv\"`.",
                "`strconv.Atoi(s)` y `strconv.Itoa(i)` son los atajos más usados para enteros base 10.",
                "Devuelve siempre un `error` que debes comprobar por si el texto contenía letras no numéricas.",
                "`strconv.ParseInt(s, base, bitSize)` permite parsear bases binarias (2), octales (8) o hexadecimales (16)."
            ]
        },
        "interExpl": {
            "title": "Mecanismos Internos y Buenas Prácticas",
            "content": "Control de desbordamiento (Overflow Detection) y bases numéricas:\n`strconv.ParseInt` y `strconv.ParseUint` validan rigurosamente que el número quepa dentro del tamaño de bits especificado:\n```go\n// Intenta parsear un número de 8 bits (máximo 127)\nval, err := strconv.ParseInt(\"500\", 10, 8)\n```\nSi el número supera el límite, Go devuelve el valor máximo posible truncado y un error tipado de desbordamiento: `strconv.ErrRange`.\nSi el formato es inválido (ejemplo: '12a4'), devuelve `strconv.ErrSyntax`. Puedes comprobar ambos con `errors.Is(err, strconv.ErrRange)`.",
            "keyPoints": [
                "Detección de desbordamiento: reporta errores claros `ErrRange` si el número excede el tipo.",
                "Soporte de prefijos automáticos: si pasas base 0 a ParseInt, Go detecta automáticamente prefijos '0x' (hexadecimal), '0b' (binario) u '0o' (octal).",
                "Constantes de bitSize: usar 0 para el tamaño nativo de la máquina, o 8, 16, 32, 64 explícitamente."
            ]
        },
        "expertExpl": {
            "title": "Bajo Nivel, Rendimiento e Internals",
            "content": "Algoritmos de Punto Flotante Eisel-Lemire y Ryu en Go:\nParsear cadenas a números de punto flotante (`strconv.ParseFloat`) con precisión de bit exacta respecto a la norma IEEE-754 es uno de los problemas más complejos de la informática.\n\nDesde Go 1.16, Go implementa el algoritmo Eisel-Lemire: realiza el parseo de casi el 99% de los números flotantes utilizando aritmética entera ultra-rápida de 64 y 128 bits sin acudir a números de coma flotante de software pesado. Solo si el número cae en un caso límite extremadamente raro, acude al algoritmo clásico de bignum de precisión múltiple. Esto convirtió a `strconv.ParseFloat` en uno de los parsers de flotantes más rápidos del mundo.",
            "keyPoints": [
                "Algoritmo Eisel-Lemire: parseo flotante con aritmética entera SIMD de alta velocidad.",
                "Garantía IEEE-754: redondeo exacto al bit más cercano sin pérdida de precisión decimal.",
                "Zero allocations con `AppendInt/AppendFloat`: permite formatear números sobre búferes existentes sin tocar el Heap."
            ]
        },
        "evaluation": {
            "title": "Reto: Validador y Sumador de Lista de Precios en Texto",
            "statement": "Escribe una función 'SumarPrecios(preciosTexto []string) (float64, int, error)' que reciba un slice de cadenas de texto (ej. [\"19.99\", \"5.50\", \"invalido\", \"10.00\"]). Debe sumar todos los números válidos y devolver la suma total, cuántos elementos fueron válidos y un error si algún elemento no pudo parsearse.",
            "starterCode": "package main\n\nimport (\n    \"fmt\"\n    \"strconv\"\n)\n\nfunc SumarPrecios(preciosTexto []string) (float64, int, error) {\n    // Parsea cada elemento con ParseFloat\n}\n\nfunc main() {\n    lista := []string{\"12.50\", \"20.00\", \"7.45\"}\n    // Prueba con la lista\n}",
            "hint": "Usa strconv.ParseFloat(p, 64).",
            "solution": "package main\n\nimport (\n    \"fmt\"\n    \"strconv\"\n)\n\nfunc SumarPrecios(preciosTexto []string) (float64, int, error) {\n    total := 0.0\n    validos := 0\n    \n    for _, p := range preciosTexto {\n        valor, err := strconv.ParseFloat(p, 64)\n        if err != nil {\n            return total, validos, fmt.Errorf(\"precio inválido '%s': %w\", p, err)\n        }\n        total += valor\n        validos++\n    }\n    return total, validos, nil\n}\n\nfunc main() {\n    listaValida := []string{\"12.50\", \"20.00\", \"7.45\"}\n    total, cant, err := SumarPrecios(listaValida)\n    if err != nil {\n        fmt.Println(\"Error:\", err)\n        return\n    }\n    fmt.Printf(\"Total procesado: $%.2f (%d productos)\\n\", total, cant)\n    \n    listaInvalida := []string{\"15.00\", \"gratis\", \"10.00\"}\n    _, _, err2 := SumarPrecios(listaInvalida)\n    fmt.Println(\"Resultado con datos corruptos:\", err2)\n}",
            "explanation": "La función strconv.ParseFloat(p, 64) valida y convierte de forma segura cada representación textual en un float64 real. Si alguna entrada contiene caracteres no numéricos ('gratis'), devuelve un error explícito protegiendo los cálculos financieros de la aplicación."
        },
        "externalLinks": [
            {"title": "Package strconv (Standard Library)", "url": "https://pkg.go.dev/strconv", "description": "Documentación oficial del paquete strconv con todas las funciones de conversión."},
            {"title": "Go by Example: Number Parsing", "url": "https://gobyexample.com/number-parsing", "description": "Ejemplo en Go by Example."},
            {"title": "Daniel Lemire: Fast Number Parsing in Go", "url": "https://lemire.me/blog/", "description": "Artículo de investigación sobre los algoritmos de parseo de enteros y flotantes adoptados en Go."}
        ]
    },

    "url-parsing": {
        "id": 62,
        "slug": "url-parsing",
        "title": "URL Parsing",
        "titleEs": "Parseo y Análisis de URLs (net/url)",
        "category": "Tiempo, Matemáticas y Criptografía",
        "categorySlug": "tiempo-cripto",
        "categoryIcon": "⏳",
        "difficulty": "Intermedio",
        "summary": "Descomposición estructurada, validación y extracción de componentes de direcciones web con 'net/url'.",
        "originalExpl": "Las URLs proporcionan una forma uniforme de localizar recursos. El paquete net/url de Go permite parsear y construir URLs fácilmente.",
        "basicExpl": {
            "title": "Conceptos Fundamentales para Principiantes",
            "content": "Una URL (dirección web) está compuesta por muchas piezas:\n`https://usuario:pass@servidor.com:8080/ruta/recurso?filtro=golang#seccion1`.\nEn vez de intentar cortarla con `strings.Split` a mano (lo cual es muy propenso a bugs), usas `url.Parse(miURL)`:\n- `u.Scheme` -> el protocolo (\"https\").\n- `u.Host` -> el servidor con su puerto (\"servidor.com:8080\").\n- `u.Hostname()` y `u.Port()` -> separan el servidor y el puerto (\"servidor.com\" y \"8080\").\n- `u.Path` -> la ruta (\"/ruta/recurso\").\n- `u.Query()` -> los parámetros de búsqueda como un mapa.",
            "keyPoints": [
                "Se importa con `import \"net/url\"`.",
                "`url.Parse(stringURL)` descompone la URL en una estructura `*url.URL`.",
                "`u.Query()` devuelve un `url.Values` (un mapa `map[string][]string`) para leer parámetros GET.",
                "`u.Fragment` extrae el hash del enlace (lo que va después de `#`)."
            ]
        },
        "interExpl": {
            "title": "Mecanismos Internos y Buenas Prácticas",
            "content": "Construcción y Codificación de Parámetros de Consulta (Query Params):\nAl enviar parámetros a una API web que pueden contener espacios, tildes o caracteres especiales, es crucial codificarlos correctamente (URL-encoding / Percent-encoding):\n```go\nparams := url.Values{}\nparams.Add(\"buscar\", \"programación go\")\nparams.Add(\"pagina\", \"1\")\n\nu.RawQuery = params.Encode() // Produce: buscar=programaci%C3%B3n+go&pagina=1\n```\n`params.Encode()` escapa automáticamente caracteres peligrosos, previniendo errores de petición y vulnerabilidades de inyección en URLs.",
            "keyPoints": [
                "`url.Values.Encode()`: codifica parámetros a formato seguro RFC 3986 (Percent-Encoding).",
                "Manejo de múltiples valores: una misma clave en una URL puede tener varios valores (`?tag=go&tag=web`); `u.Query()[\"tag\"]` devuelve un slice con todos.",
                "Rutas relativas: `base.ResolveReference(relativa)` resuelve URLs relativas contra una URL base absoluta de forma automática."
            ]
        },
        "expertExpl": {
            "title": "Bajo Nivel, Rendimiento e Internals",
            "content": "Cumplimiento Estricto de RFC 3986 vs WHATWG URL Standard:\nEl parser `net/url` de Go implementa rigurosamente el estándar formal RFC 3986. A diferencia de los navegadores web modernos (que siguen el estándar flexible de WHATWG y toleran barras mal puestas, caracteres sin escapar y espacios en blanco), `url.Parse` de Go es estricto y rechazará URLs malformadas que contengan caracteres de control o esquemas inválidos.\n\nPara parsear credenciales de usuario embebidas en la URL (`u.User`), Go devuelve un puntero `*url.Userinfo` que almacena la contraseña de forma protegida para no imprimirla accidentalmente en logs cuando se invoca `u.String()` si el usuario no solicita explícitamente `u.User.Password()`.",
            "keyPoints": [
                "Estándar RFC 3986: parseo formal estricto para seguridad en entornos de servidor.",
                "Protección de credenciales: `url.Userinfo` encapsula contraseñas para evitar fugas en logs.",
                "Zero allocations en paths limpios: el algoritmo optimiza el almacenamiento interno evitando copias si la URL ya está sanitizada."
            ]
        },
        "evaluation": {
            "title": "Reto: Constructor de Enlaces de Paginación API con Codificación Segura",
            "statement": "Escribe una función 'ConstruirURL(baseURL, endpoint string, terminoBusqueda string, pagina int) (string, error)' que una la URL base con el endpoint y agregue los parámetros GET 'q' y 'page' correctamente codificados. Prueba la función con el término de búsqueda 'análisis & diseño #1'.",
            "starterCode": "package main\n\nimport (\n    \"fmt\"\n    \"net/url\"\n)\n\nfunc ConstruirURL(baseURL, endpoint, terminoBusqueda string, pagina int) (string, error) {\n    // Usa url.Parse, params.Encode y u.String()\n}\n\nfunc main() {\n    // Llama a ConstruirURL e imprime el resultado seguro\n}",
            "hint": "Crea u, err := url.Parse(baseURL + endpoint); q := u.Query(); q.Set(\"q\", ...); u.RawQuery = q.Encode().",
            "solution": "package main\n\nimport (\n    \"fmt\"\n    \"net/url\"\n    \"strconv\"\n)\n\nfunc ConstruirURL(baseURL, endpoint, terminoBusqueda string, pagina int) (string, error) {\n    u, err := url.Parse(baseURL + endpoint)\n    if err != nil {\n        return \"\", err\n    }\n    \n    // Construir parámetros de forma segura\n    q := u.Query()\n    q.Set(\"q\", terminoBusqueda)\n    q.Set(\"page\", strconv.Itoa(pagina))\n    \n    u.RawQuery = q.Encode() // Codifica caracteres especiales (&, espacios, #)\n    return u.String(), nil\n}\n\nfunc main() {\n    base := \"https://api.tienda.com\"\n    endpoint := \"/v1/buscar\"\n    busqueda := \"análisis & diseño #1\"\n    \n    urlFinal, err := ConstruirURL(base, endpoint, busqueda, 2)\n    if err != nil {\n        panic(err)\n    }\n    \n    fmt.Println(\"URL generada y sanitizada:\")\n    fmt.Println(urlFinal)\n}",
            "explanation": "El método 'q.Encode()' transforma automáticamente los caracteres conflictivos como espacios, ampersands '&' y almohadillas '#' en entidades percent-encoded seguras (`an%C3%A1lisis+%26+dise%C3%B1o+%231`), impidiendo que corrompan los parámetros de la petición web."
        },
        "externalLinks": [
            {"title": "Package net/url (Standard Library)", "url": "https://pkg.go.dev/net/url", "description": "Documentación oficial del paquete net/url en la biblioteca estándar."},
            {"title": "Go by Example: URL Parsing", "url": "https://gobyexample.com/url-parsing", "description": "Ejemplo interactivo en Go by Example."},
            {"title": "RFC 3986: Uniform Resource Identifier (URI)", "url": "https://datatracker.ietf.org/doc/html/rfc3986", "description": "La especificación estándar oficial implementada por Go."}
        ]
    },

    "sha256-hashes": {
        "id": 63,
        "slug": "sha256-hashes",
        "title": "SHA256 Hashes",
        "titleEs": "Hashing Criptográfico SHA-256 (crypto/sha256)",
        "category": "Tiempo, Matemáticas y Criptografía",
        "categorySlug": "tiempo-cripto",
        "categoryIcon": "⏳",
        "difficulty": "Intermedio",
        "summary": "Generación de huellas digitales criptográficas seguras de 256 bits (32 bytes) para verificación de integridad.",
        "originalExpl": "Los hashes SHA256 son frecuentemente utilizados para computar identificadores binarios o huellas digitales para documentos y datos. El paquete crypto/sha256 implementa el algoritmo de hash criptográfico SHA224 y SHA256.",
        "basicExpl": {
            "title": "Conceptos Fundamentales para Principiantes",
            "content": "Una función hash criptográfica como SHA-256 es como una trituradora de papel mágica:\n- Le metes cualquier dato (una palabra, un archivo PDF o una película entera de 10 GB).\n- Produce siempre una 'huella digital' de tamaño fijo: exactamente 32 bytes (64 caracteres en hexadecimal).\n- Es de una sola vía (irreversible): no puedes reconstruir el archivo original a partir del hash.\n- Efecto avalancha: si cambias una sola letra de un libro de 1,000 páginas, el hash resultante cambia por completo.\nSe usa para verificar que un archivo descargado no esté corrupto ni haya sido alterado por un hacker.",
            "keyPoints": [
                "Se importa con `import \"crypto/sha256\"`.",
                "Cálculo directo en un solo paso: `sha256.Sum256([]byte(\"texto\"))` (devuelve un array fijo `[32]byte`).",
                "Formatear a texto hexadecimal legible con `%x` en `fmt.Sprintf(\"%x\", hash)`.",
                "SHA-256 es seguro contra colisiones hoy en día (a diferencia de MD5 y SHA-1 que están rotos)."
            ]
        },
        "interExpl": {
            "title": "Mecanismos Internos y Buenas Prácticas",
            "content": "Streaming con la interfaz `hash.Hash` para archivos gigantes:\nSi necesitas calcular el hash de un archivo de 5 GB, llamar a `sha256.Sum256` requeriría cargar los 5 GB completos en la memoria RAM.\nLa buena práctica en Go es usar la interfaz de streaming `io.Writer`:\n```go\nh := sha256.New()\n// Copia el archivo directamente al hasher por bloques de 32 KB sin cargar todo en RAM\nio.Copy(h, archivo)\nhashFinal := h.Sum(nil)\n```\nComparación de hashes segura contra ataques de tiempo (Timing Attacks): NUNCA uses `hash1 == hash2` para autenticación sensible; usa `crypto/subtle.ConstantTimeCompare`.",
            "keyPoints": [
                "Streaming con `sha256.New()`: permite hashear datos continuos con consumo insignificante de memoria RAM.",
                "Seguridad contra Timing Attacks: usar `subtle.ConstantTimeCompare` para validar hashes y firmas.",
                "Hashing de contraseñas: NUNCA almacenes contraseñas con SHA-256 directo (es vulnerable a ataques por GPU); usa algoritmos con sal y coste computacional como bcrypt o Argon2."
            ]
        },
        "expertExpl": {
            "title": "Bajo Nivel, Rendimiento e Internals",
            "content": "Aceleración Criptográfica por Hardware en Código Ensamblador (SHA Extensions):\nEl paquete `crypto/sha256` de Go no está escrito en Go puro para arquitecturas modernas. En CPUs x86-64 con soporte para las instrucciones Intel SHA Extensions (SHA-NI) y en procesadores ARM64 (Apple Silicon / AWS Graviton con soporte para Crypto Extensions), Go utiliza rutinas en ensamblador de bajo nivel optimizadas.\n\nEstas instrucciones de hardware procesan bloques de compresión de SHA-256 directamente en circuitos dedicados del silicio de la CPU a velocidades de varios gigabytes por segundo con un consumo de energía mínimo.",
            "keyPoints": [
                "Instrucciones de CPU dedicadas: aprovecha Intel SHA-NI y ARMv8 Cryptographic Instructions en ensamblador.",
                "Zero allocations con Sum256: devuelve un array `[32]byte` asignado directamente en el stack sin tocar el Heap.",
                "Estructura digest interna: mantiene los 8 registros de 32 bits (H0 a H7) y el búfer de bloque de 64 bytes."
            ]
        },
        "evaluation": {
            "title": "Reto: Verificador de Integridad de Archivo Simulado con SHA-256",
            "statement": "Escribe una función 'CalcularChecksum(datos []byte) string' que devuelva el hash SHA-256 de los datos en formato hexadecimal. Simula una transmisión donde un byte es alterado y demuestra que los hashes son completamente diferentes.",
            "starterCode": "package main\n\nimport (\n    \"crypto/sha256\"\n    \"fmt\"\n)\n\nfunc CalcularChecksum(datos []byte) string {\n    // Calcula sha256 y formatea con %x\n}\n\nfunc main() {\n    original := []byte(\"Transferir 1000 EUR a cuenta ES9988\")\n    // Calcula hash original, altera un carácter y compara\n}",
            "hint": "Usa hash := sha256.Sum256(datos) y fmt.Sprintf(\"%x\", hash).",
            "solution": "package main\n\nimport (\n    \"crypto/sha256\"\n    \"fmt\"\n)\n\nfunc CalcularChecksum(datos []byte) string {\n    hash := sha256.Sum256(datos)\n    return fmt.Sprintf(\"%x\", hash)\n}\n\nfunc main() {\n    mensajeOriginal := []byte(\"Transferir 1000 EUR a cuenta ES9988\")\n    // Mensaje alterado maliciosamente (solo cambia 1 dígito: 9000 en vez de 1000)\n    mensajeAlterado := []byte(\"Transferir 9000 EUR a cuenta ES9988\")\n    \n    hash1 := CalcularChecksum(mensajeOriginal)\n    hash2 := CalcularChecksum(mensajeAlterado)\n    \n    fmt.Println(\"Hash Original :\", hash1)\n    fmt.Println(\"Hash Alterado :\", hash2)\n    \n    if hash1 != hash2 {\n        fmt.Println(\"\\n[ALERTA DE INTEGRIDAD]: La firma criptográfica no coincide. Los datos fueron manipulados.\")\n    } else {\n        fmt.Println(\"Los datos son auténticos.\")\n    }\n}",
            "explanation": "La función 'sha256.Sum256' procesa el bloque de datos y devuelve una huella de 32 bytes. Debido al efecto avalancha del algoritmo SHA-256, cambiar un solo dígio ('1' por '9') genera un hash completamente irreconocible y diferente, detectando instantáneamente cualquier alteración."
        },
        "externalLinks": [
            {"title": "Package crypto/sha256 (Standard Library)", "url": "https://pkg.go.dev/crypto/sha256", "description": "Documentación oficial del paquete crypto/sha256."},
            {"title": "Go by Example: SHA256 Hashes", "url": "https://gobyexample.com/sha256-hashes", "description": "Ejemplo en Go by Example."},
            {"title": "NIST FIPS 180-4: Secure Hash Standard (SHS)", "url": "https://csrc.nist.gov/publications/detail/fips/180/4/final", "description": "Especificación federal oficial de los algoritmos de la familia SHA-2."}
        ]
    },

    "base64-encoding": {
        "id": 64,
        "slug": "base64-encoding",
        "title": "Base64 Encoding",
        "titleEs": "Codificación y Decodificación Base64",
        "category": "Tiempo, Matemáticas y Criptografía",
        "categorySlug": "tiempo-cripto",
        "categoryIcon": "⏳",
        "difficulty": "Principiante",
        "summary": "Transformación de datos binarios arbitrarios en texto ASCII seguro para transporte en redes y protocolos web.",
        "originalExpl": "Go proporciona soporte integrado para codificación y decodificación base64. El paquete encoding/base64 soporta tanto el alfabeto estándar como el compatible con URLs.",
        "basicExpl": {
            "title": "Conceptos Fundamentales para Principiantes",
            "content": "Base64 NO es encriptación ni seguridad: es simplemente un sistema para empaquetar datos binarios (como una foto, un archivo o bytes raros) en letras y números normales (ASCII) que cualquier sistema pueda transmitir sin que se rompan:\n- Codificar: `base64.StdEncoding.EncodeToString(misBytes)`.\n- Decodificar: `bytes, err := base64.StdEncoding.DecodeString(textoBase64)`.\n- Base64 para URLs: El alfabeto estándar usa caracteres `+` y `/`, que causan problemas en las URLs. Para eso existe `base64.URLEncoding`, que usa `-` y `_` en su lugar.",
            "keyPoints": [
                "Se importa con `import \"encoding/base64\"`.",
                "`base64.StdEncoding`: alfabeto estándar clásico con relleno `=`.",
                "`base64.URLEncoding`: alfabeto seguro para enlaces web y parámetros GET.",
                "`base64.RawURLEncoding`: seguro para URLs y sin caracteres de relleno `=` (estándar para JWT).",
                "Aumenta el tamaño de los datos en aproximadamente un 33%."
            ]
        },
        "interExpl": {
            "title": "Mecanismos Internos y Buenas Prácticas",
            "content": "Uso en Tokens JWT y Cabeceras HTTP:\nEn la arquitectura web moderna, Base64 es indispensable para:\n1. Cabecera HTTP Authorization Basic: `Basic \" + base64.StdEncoding.EncodeToString([]byte(\"user:pass\"))`.\n2. JSON Web Tokens (JWT): El estándar JWT exige obligatoriamente `base64.RawURLEncoding` (sin signos `=` de padding) para separar los componentes `header.payload.signature` sin romper navegadores.\n\nStreaming con `base64.NewEncoder` y `base64.NewDecoder`: para adjuntar imágenes pesadas a correos electrónicos o APIs sin cargarlas completas en memoria.",
            "keyPoints": [
                "RawURLEncoding para JWT: elimina los caracteres `=` finales que interfieren en URLs.",
                "Autenticación HTTP Basic: estándar de facto para transmitir credenciales en cabeceras HTTP.",
                "Validación de errores: `DecodeString` devuelve un error si el texto contiene caracteres ajenos al alfabeto o padding corrupto."
            ]
        },
        "expertExpl": {
            "title": "Bajo Nivel, Rendimiento e Internals",
            "content": "Aceleración Vectorial SIMD (AVX2 y ARM NEON):\nTradicionalmente, Base64 procesa grupos de 3 bytes (24 bits) y los expande en 4 caracteres de 6 bits cada uno mediante operaciones de desplazamiento binario (`>>`, `<<`) y máscaras bit a bit.\n\nEn Go moderno, el paquete `encoding/base64` implementa optimizaciones de código ensamblador que cargan múltiples registros vectoriales SIMD de 128 o 256 bits, procesando 32 o 64 bytes simultáneamente en un solo ciclo de reloj de la CPU. Esto permite codificar y decodificar a velocidades superiores a 3 Gigabytes por segundo por núcleo.",
            "keyPoints": [
                "Vectorización SIMD: procesamiento paralelo de bloques de bytes en ensamblador nativo.",
                "Zero allocations con `Encode` sobre búferes existentes: el método `enc.Encode(dst, src)` evita crear strings en el Heap.",
                "Ecuación de tamaño exacto: el tamaño resultante es exactamente `((len + 2) / 3) * 4` bytes."
            ]
        },
        "evaluation": {
            "title": "Reto: Codificador y Decodificador Seguro para URLs sin Relleno",
            "statement": "Escribe un programa que tome una cadena con caracteres especiales ('usuario:admin?clave=secreta+2026'). Codifícala utilizando base64.RawURLEncoding (sin caracteres de relleno '='). Luego decodifícala de vuelta al texto original y comprueba que coincide exactamente.",
            "starterCode": "package main\n\nimport (\n    \"encoding/base64\"\n    \"fmt\"\n)\n\nfunc main() {\n    original := \"usuario:admin?clave=secreta+2026\"\n    // Codifica con RawURLEncoding\n    // Decodifica y verifica\n}",
            "hint": "Usa base64.RawURLEncoding.EncodeToString([]byte(original)) y base64.RawURLEncoding.DecodeString(encoded).",
            "solution": "package main\n\nimport (\n    \"encoding/base64\"\n    \"fmt\"\n)\n\nfunc main() {\n    original := \"usuario:admin?clave=secreta+2026\"\n    fmt.Println(\"Texto original       :\", original)\n    \n    // 1. Codificar con RawURLEncoding (seguro para URLs y sin padding =)\n    codificado := base64.RawURLEncoding.EncodeToString([]byte(original))\n    fmt.Println(\"Base64 RawURL seguro :\", codificado)\n    \n    // 2. Decodificar de vuelta\n    bytesDecodificados, err := base64.RawURLEncoding.DecodeString(codificado)\n    if err != nil {\n        panic(err)\n    }\n    \n    recuperado := string(bytesDecodificados)\n    fmt.Println(\"Texto recuperado     :\", recuperado)\n    \n    if original == recuperado {\n        fmt.Println(\"¡Decodificación perfecta e íntegra!\")\n    }\n}",
            "explanation": "El codificador 'base64.RawURLEncoding' sustituye los caracteres '+' y '/' por '-' y '_' y omite los signos de relleno '=', produciendo una cadena perfectamente apta para ser incrustada directamente en URLs o tokens de sesión sin necesidad de aplicar escapes secundarios."
        },
        "externalLinks": [
            {"title": "Package encoding/base64 (Standard Library)", "url": "https://pkg.go.dev/encoding/base64", "description": "Documentación oficial del paquete encoding/base64."},
            {"title": "Go by Example: Base64 Encoding", "url": "https://gobyexample.com/base64-encoding", "description": "Ejemplo en Go by Example."},
            {"title": "RFC 4648: The Base16, Base32, and Base64 Data Encodings", "url": "https://datatracker.ietf.org/doc/html/rfc4648", "description": "La especificación estándar oficial de alfabetos Base64."}
        ]
    }
}
