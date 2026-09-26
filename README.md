# 🐹 Go by Example (Edición Pro en Español)

Plataforma web interactiva para aprender y dominar **Go (Golang)** a través de los **85 ejemplos oficiales de *Go by Example***, traducidos íntegramente al español y ampliados en profundidad pedagógica, técnica y práctica.

Diseñado tanto para desarrolladores que inician en Go como para ingenieros de software que preparan entrevistas técnicas o buscan entender el comportamiento interno del runtime (*scheduler*, canales, gestión de memoria, concurrencia y punteros).

---

## ✨ Características Principales

- 📚 **85 Temas Oficiales Completos**: Desde fundamentos de sintaxis (`Variables`, `Slices`, `Maps`) hasta concurrencia avanzada (`Goroutines`, `Worker Pools`, `Mutexes`, `Rate Limiting`) y paquetes del sistema (`HTTP Server`, `Context`, `JSON`, `Exec`).
- 🎯 **Explicaciones y Niveles Avanzados por Tema**:
  - **Nivel Básico (Esencial)**: Concepto elemental, analogía práctica y reglas sintácticas obligatorias.
  - **Nivel Intermedio (Práctico / Idiomático)**: Patrones de producción, manejo de errores idiomáticos y mejores prácticas de la comunidad Go.
  - **Nivel Experto (Arquitectura y Rendimiento)**: Comportamiento interno del runtime, asignación de memoria (*heap vs stack*), *escape analysis*, costos de sincronización y *gotchas* críticos.
  - **💡 Gotchas y Anti-patrones de Producción**: Trampas comunes en memoria, data races, fugas de goroutines y comparativa visual de código peligroso vs idiomático.
  - **💼 Preguntas de Entrevista FAANG / Senior**: Preguntas trampa y respuestas argumentadas frecuentes en entrevistas de Google, Amazon, Uber, Mercado Libre y Meta.
- 🧪 **Laboratorio de Evaluación y Editor Ergonómico**:
  - Enunciado práctico de ingeniería con caso de uso realista para cada tema.
  - Soporte de tecla <kbd>Tab</kbd> (4 espacios), auto-indentación al dar <kbd>Enter</kbd> y auto-cierre de pares `()`, `{}`, `[]`, `""`.
  - Validador estático inteligente de código Go (`package main`, balance de llaves, estructuras idiomáticas requeridas).
  - Sistema de **Pistas** graduales y **Solución canónica documentada paso a paso**.
  - Botón directo para probar o compartir el ejercicio en el **Go Playground Oficial** (`go.dev/play`).
- ⚡ **Command Palette Global (<kbd>Ctrl</kbd> + <kbd>K</kbd>)**:
  - Modal flotante estilo Raycast / VS Code con búsqueda difusa instantánea entre los 85 temas y ejecución de comandos directos (cambiar tema, alternar completado, respaldos).
- 🏆 **Métricas y Generador de Certificado Digital**:
  - Desglose de progreso por nivel de complejidad (*Principiante*, *Intermedio*, *Avanzado*).
  - Generación de diploma oficial en alta resolución (HTML5 Canvas) descargable en PNG con nombre personalizado.
- 📦 **Respaldo 100% Privado (Exportar / Importar JSON)**:
  - Descarga tu progreso en un archivo JSON portátil y restáuralo en cualquier dispositivo sin depender de bases de datos remotas.
- 📡 **PWA y Soporte 100% Offline**:
  - Instalable como aplicación de escritorio o móvil con Service Worker (`sw.js`) y `manifest.json`. Funciona sin conexión a internet.
- 🌙 **Diseño Antifatiga Visual y Ergonómico**:
  - **Modo Calma Nocturna (Dark Slate)**: Contraste optimizado para sesiones prolongadas de lectura y programación nocturna.
  - **Modo Papel Cálido (Sepia)**: Filtro de luz azul para lectura diurna confortable.
  - **Modo OLED (Negro Puro)**: Máximo ahorro energético y alto contraste para pantallas AMOLED.
  - **Modo Gris Nórdico (Nord)**: Paleta suave inspirada en temas escandinavos.
  - **Modo Zen**: Oculta la barra lateral con <kbd>Ctrl</kbd> + <kbd>B</kbd> para lectura inmersiva sin distracciones.

---

## 🛠️ Tecnologías Utilizadas

- **HTML5 Semántico**: Estructura accesible, jerarquía de navegación y optimización SEO.
- **CSS3 Moderno**: Variables CSS nativas (*Design Tokens*), Grid/Flexbox responsivo y microanimaciones fluidas sin dependencias externas (sin Tailwind ni Bootstrap).
- **JavaScript Vanilla (ES6+)**: Motor de renderizado reactivo sin frameworks pesados, resaltador de sintaxis propio de Go ultrarrápido y control de estado cliente.
- **Fuentes**: *Plus Jakarta Sans* (lectura de interfaces) y *JetBrains Mono* (legibilidad de código fuente).

---

## 🚀 Inicio Rápido (Local)

Al ser una aplicación web estática, no necesitas instalar Node.js ni compilar ningún paquete.

### Opción 1: Con Python (cualquier versión)
```bash
# Python 3
python -m http.server 8080

# Abrir en el navegador:
# http://localhost:8080
```

### Opción 2: Con la extensión Live Server de VS Code / Cursor
1. Abre la carpeta del proyecto en tu editor.
2. Haz clic derecho en `index.html` y selecciona **Open with Live Server**.

### Opción 3: Servidor en Go
```bash
go run -e 'package main; import "net/http"; func main() { http.ListenAndServe(":8080", http.FileServer(http.Dir("."))) }'
```

---

## 🌐 Guía de Despliegue en Producción

La aplicación está lista para desplegarse en cualquier hosting estático o servidor VPS.

### Despliegue en Coolify (VPS)

1. Sube este repositorio a tu cuenta de **GitHub**.
2. En tu panel de **Coolify**:
   - Pulsa en **+ New Resource** → **Git Based** (selecciona tu repositorio).
   - En **Build Pack**, selecciona **Static** (usa Nginx/Caddy automáticamente).
   - **Publish Directory**: Déjalo en `/` (o `./`).
   - **Build Command**: Déjalo **vacío** (no requiere pasos de compilación).
   - Asigna tu dominio en **FQDN** (ej. `https://go.tudominio.com`).
3. Haz clic en **Deploy**. Coolify configurará SSL automático mediante Let's Encrypt.

---

### Despliegue con Docker

Si prefieres usar Docker en tu VPS o servidor, crea un `Dockerfile` en la raíz:

```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Construir y ejecutar el contenedor:
```bash
docker build -t go-by-example-es .
docker run -d -p 80:80 --name go-learning go-by-example-es
```

---

### Despliegue en GitHub Pages

1. Ve a los **Settings** de tu repositorio en GitHub.
2. En la barra lateral izquierda, entra en **Pages**.
3. En **Source**, selecciona `Deploy from a branch`.
4. En **Branch**, selecciona `main` y carpeta `/ (root)`.
5. Guarda los cambios. Tu sitio estará disponible en minutos en `https://<usuario>.github.io/<repo>/`.

---

## 📂 Estructura del Repositorio

```text
├── css/
│   └── styles.css          # Sistema de diseño, temas (Slate, Sepia, OLED) y componentes UI
├── js/
│   ├── app.js              # Controlador principal, buscador, router hash y resaltador
│   └── topics-data.js      # Base de conocimiento completa con los 85 temas y ejercicios
├── raw_examples/           # Código fuente oficial original en Go (.go)
├── scripts/                # Scripts utilitarios utilizados para la generación y consolidación
├── index.html              # Entrada principal de la aplicación web
└── README.md               # Documentación general del proyecto
```

---

## ⌨️ Atajos de Teclado

| Atajo | Acción |
| :--- | :--- |
| <kbd>Ctrl</kbd> + <kbd>K</kbd> / <kbd>Cmd</kbd> + <kbd>K</kbd> | Abrir Command Palette (Búsqueda difusa y comandos) |
| <kbd>Ctrl</kbd> + <kbd>B</kbd> | Alternar Modo Zen (Ocultar/Mostrar barra lateral en desktop) |
| <kbd>Tab</kbd> / <kbd>Shift</kbd> + <kbd>Tab</kbd> | Indentar / Desindentar código en el editor de retos |
| <kbd>→</kbd> / <kbd>←</kbd> | Avanzar o retroceder al tema siguiente o anterior |
| <kbd>Esc</kbd> | Cerrar Command Palette o menús flotantes |

---

## 🤝 Créditos y Atribución

- Los ejemplos de código base originales pertenecen a [Go by Example](https://gobyexample.com/) creado por **Mark McGranaghan** y colaboradores, bajo licencia [Creative Commons Attribution 3.0](https://creativecommons.org/licenses/by/3.0/).
- Esta edición en español ampliada incluye traducciones, material pedagógico adicional en 3 niveles de profundidad, desafíos técnicos de autoevaluación e interfaz gráfica interactiva.

---

## 📄 Licencia

Este proyecto está disponible bajo la licencia [MIT](LICENSE).
