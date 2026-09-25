# scripts/build_full_database.py
import os
import json
import re

from data_part1 import TOPICS_PART1
from data_part2 import TOPICS_PART2
from data_part2_b import TOPICS_PART2_B
from data_part3_a import TOPICS_PART3_A
from data_part3_b import TOPICS_PART3_B
from data_part4_a import TOPICS_PART4_A
from data_part4_b import TOPICS_PART4_B
from data_part4_c import TOPICS_PART4_C

def slugify(title):
    s = title.lower()
    s = s.replace('/', '-')
    s = s.replace('\'', '')
    s = re.sub(r'[^a-z0-9]+', '-', s).strip('-')
    return s

def build():
    # Merge all parts
    all_dict = {}
    for part in [
        TOPICS_PART1, TOPICS_PART2, TOPICS_PART2_B,
        TOPICS_PART3_A, TOPICS_PART3_B,
        TOPICS_PART4_A, TOPICS_PART4_B, TOPICS_PART4_C
    ]:
        all_dict.update(part)

    # Read official ordering
    with open('raw_examples/../raw_examples/hello-world.go', 'r') as _:
        pass # ensure raw_examples directory exists

    with open('raw_examples/../examples.txt', 'r', encoding='utf-8') as f:
        titles = [l.strip() for l in f if l.strip()]

    topics_list = []
    
    # 12 categories definition with metadata
    categories = [
        {"id": "fundamentos", "name": "Fundamentos del Lenguaje", "icon": "⚡", "count": 7, "description": "Sintaxis básica, tipos primitivos, variables, constantes y control de flujo"},
        {"id": "estructuras-datos", "name": "Estructuras de Datos y Colecciones", "icon": "📦", "count": 4, "description": "Arrays fijos, slices dinámicos, tablas hash (maps) e iteración range"},
        {"id": "funciones-memoria", "name": "Funciones, Clausuras y Punteros", "icon": "🔧", "count": 7, "description": "Parámetros, retornos múltiples, variádicas, closures, recursión, memoria y runas"},
        {"id": "poo-generics", "name": "Tipos Avanzados y POO en Go", "icon": "🏛️", "count": 7, "description": "Structs, métodos, interfaces implícitas, enums, composición, genéricos e iteradores"},
        {"id": "errores-panico", "name": "Manejo de Errores y Excepciones", "icon": "🛡️", "count": 5, "description": "Errores como valores, errores personalizados, panic, defer y recover"},
        {"id": "concurrencia-canales", "name": "Concurrencia: Goroutines y Canales", "icon": "🚀", "count": 10, "description": "Hilos ligeros, canales unbuffered y buffered, direcciones, select y timeouts"},
        {"id": "sincronizacion-avanzada", "name": "Sincronización y Concurrencia Avanzada", "icon": "⚙️", "count": 8, "description": "Timers, tickers, worker pools, waitgroups, rate limiting, atomics y mutexes"},
        {"id": "texto-formatos", "name": "Manipulación de Texto y Formatos", "icon": "🔤", "count": 8, "description": "Ordenamiento, strings, printf, plantillas de texto, regex, JSON y XML"},
        {"id": "tiempo-cripto", "name": "Tiempo, Matemáticas y Criptografía", "icon": "⏳", "count": 8, "description": "Time, epoch, parseo de fechas, rand, strconv, URLs, SHA-256 y Base64"},
        {"id": "archivos-io", "name": "Entrada / Salida y Archivos", "icon": "📁", "count": 7, "description": "Lectura, escritura, filtros de línea, rutas, directorios, temporales y embed"},
        {"id": "cli-testing", "name": "CLI, Pruebas y Benchmarking", "icon": "🧪", "count": 6, "description": "Testing, benchmarks, argumentos, banderas flags, subcomandos, env vars y slog"},
        {"id": "redes-sistema", "name": "Redes, Procesos y Sistema Operativo", "icon": "🌐", "count": 8, "description": "Cliente/servidor HTTP, sockets TCP, Context, subprocesos, señales y exit"}
    ]

    for idx, title in enumerate(titles, 1):
        slug = slugify(title)
        if slug not in all_dict:
            print(f"Warning: {slug} not found in all_dict!")
            continue

        item = all_dict[slug]
        item["id"] = idx

        # Read code & output
        go_path = f"raw_examples/{slug}.go"
        sh_path = f"raw_examples/{slug}.sh"
        
        go_code = ""
        sh_output = ""
        
        if os.path.exists(go_path):
            with open(go_path, "r", encoding="utf-8") as f:
                go_code = f.read()
        if os.path.exists(sh_path):
            with open(sh_path, "r", encoding="utf-8") as f:
                sh_output = f.read()

        item["code"] = go_code
        item["output"] = sh_output
        
        # Link to gobyexample official
        item["officialUrl"] = f"https://gobyexample.com/{slug}"
        
        # Ensure externalLinks includes the original gobyexample link
        has_gbe = any("gobyexample.com" in link["url"] for link in item.get("externalLinks", []))
        if not has_gbe:
            item.setdefault("externalLinks", []).append({
                "title": f"Go by Example: {item['title']}",
                "url": f"https://gobyexample.com/{slug}",
                "description": "Página oficial del ejemplo en Go by Example.",
                "type": "Referencia Original"
            })

        topics_list.append(item)

    print(f"Total topics processed: {len(topics_list)}")
    
    # Write to js/topics-data.js
    os.makedirs("js", exist_ok=True)
    js_content = "// Base de Datos Completa de Go by Example en Español con Niveles y Evaluaciones\n"
    js_content += "// Contiene los 85 temas oficiales con explicaciones Básica, Intermedia y Experta\n\n"
    js_content += "const GO_CATEGORIES = " + json.dumps(categories, ensure_ascii=False, indent=2) + ";\n\n"
    js_content += "const GO_TOPICS = " + json.dumps(topics_list, ensure_ascii=False, indent=2) + ";\n\n"
    js_content += "if (typeof window !== 'undefined') {\n"
    js_content += "  window.GO_CATEGORIES = GO_CATEGORIES;\n"
    js_content += "  window.GO_TOPICS = GO_TOPICS;\n"
    js_content += "}\n"
    js_content += "if (typeof module !== 'undefined') {\n"
    js_content += "  module.exports = { GO_CATEGORIES, GO_TOPICS };\n"
    js_content += "}\n"

    with open("js/topics-data.js", "w", encoding="utf-8") as f:
        f.write(js_content)

    print("js/topics-data.js written successfully!")
    print(f"File size: {os.path.getsize('js/topics-data.js') / 1024:.2f} KB")

if __name__ == "__main__":
    build()
