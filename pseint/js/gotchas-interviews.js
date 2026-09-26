// js/gotchas-interviews.js - Errores Comunes de Lógica, Buenas Prácticas y Preguntas de Entrevistas Algorítmicas
// Especializado para el curso de Lógica de Programación y PSeInt

(function() {
  const CATEGORY_DEFAULTS = {
    "fundamentos-variables": {
      gotchas: [
        {
          title: "Confundir asignación (<- o =) con comparación (= o ==)",
          codeBad: "Si edad <- 18 Entonces // Error: Intentar asignar dentro de una condición lógica",
          codeGood: "Si edad = 18 Entonces // Correcto: Comparación de igualdad lógica",
          explanation: "En PSeInt y en lógica formal, la flecha '<-' o el '=' asigna un valor a una celda de memoria, mientras que la comparación booleana evalúa si dos valores son iguales sin modificarlos.",
          impact: "Errores de sintaxis o sobreescritura accidental de datos."
        }
      ],
      interviews: [
        {
          question: "¿Por qué es una buena práctica definir explícitamente el tipo de dato de una variable en lugar de depender del tipado implícito?",
          answer: "La definición explícita de tipos (Definir x Como Entero) reserva la cantidad exacta de memoria, previene errores sutiles de conversión automática en operaciones matemáticas y entrena al programador en la rigurosidad requerida por lenguajes profesionales fuertemente tipados como Go, C++ o Java.",
          level: "Básico",
          companyTag: "Prueba Técnica Junior"
        }
      ],
      mentalModel: "Una variable es una caja rotulada: el tipo es la forma de la caja y el valor es lo que guardas dentro."
    },
    "operadores-expresiones": {
      gotchas: [
        {
          title: "Olvidar los paréntesis en la precedencia de operadores lógicos",
          codeBad: "Si nota >= 60 O asistencia >= 80 Y entregas = 100 Entonces // Ambigüedad de precedencia",
          codeGood: "Si (nota >= 60 O asistencia >= 80) Y (entregas = 100) Entonces // Precedencia inequívoca",
          explanation: "El operador lógico 'Y' (AND) tiene mayor precedencia que el operador 'O' (OR). Sin paréntesis protectores, el compilador agrupará primero el 'Y', produciendo resultados lógicos opuestos a la intención de negocio.",
          impact: "Decisiones condicionales erróneas que permiten el paso a usuarios no autorizados."
        }
      ],
      interviews: [
        {
          question: "¿Qué es la evaluación de cortocircuito (Short-circuit evaluation) en operadores lógicos?",
          answer: "Es una optimización en la cual el motor de ejecución evalúa una expresión compuesta solo hasta que el resultado final queda determinado. En 'A Y B', si A es Falso, B nunca se evalúa. En 'A O B', si A es Verdadero, B nunca se evalúa. Esto permite proteger operaciones peligrosas como evitar la división por cero: 'Si divisor <> 0 Y (dividendo / divisor > 2)'",
          level: "Intermedio",
          companyTag: "Entrevista de Algoritmos"
        }
      ],
      mentalModel: "Precedencia: Paréntesis > Potencias > Multiplicación/División/Módulo > Suma/Resta > Relacionales > NO > Y > O."
    },
    "estructuras-condicionales": {
      gotchas: [
        {
          title: "Condiciones redundantes o mal jerarquizadas en escaleras Si-Sino",
          codeBad: "Si puntaje >= 90 Entonces ... Sino Si puntaje >= 90 Y puntaje >= 80 Entonces ...",
          codeGood: "Si puntaje >= 90 Entonces ... Sino Si puntaje >= 80 Entonces ...",
          explanation: "En una estructura 'Si-Sino', al entrar a la rama 'Sino' ya se tiene la certeza matemática de que la condición previa fue falsa. Reevaluar límites superiores es código redundante y propenso a errores.",
          impact: "Código inflado y difícil de mantener."
        }
      ],
      interviews: [
        {
          question: "¿Cuándo es preferible utilizar una estructura Según (Switch) frente a una cadena de Si-Sino anidados?",
          answer: "La estructura 'Según' es óptima cuando se evalúa una única variable discreta (enteros o caracteres) contra múltiples valores constantes conocidos. Mejora la legibilidad del código y, en compiladores de bajo nivel, se compila como una tabla de saltos (Jump Table) con tiempo de respuesta O(1) en vez de O(n) comprobaciones secuenciales.",
          level: "Intermedio",
          companyTag: "Arquitectura de Software"
        }
      ],
      mentalModel: "Si-Entonces es una bifurcación de caminos: solo uno se transita en cada ejecución."
    },
    "estructuras-repetitivas": {
      gotchas: [
        {
          title: "Bucle infinito por olvidar actualizar la variable de control en un Mientras",
          codeBad: "Mientras contador <= 10 Hacer\n    Escribir contador\n    // Olvidar contador <- contador + 1\nFinMientras",
          codeGood: "Mientras contador <= 10 Hacer\n    Escribir contador\n    contador <- contador + 1 // Paso que garantiza la convergencia al caso de parada\nFinMientras",
          explanation: "Un bucle 'Mientras' continuará ejecutándose indefinidamente si el cuerpo del bucle no modifica ninguna de las variables involucradas en la condición lógica de salida.",
          impact: "El programa se cuelga, consume 100% de la CPU y requiere ser finalizado por la fuerza."
        },
        {
          title: "Diferencia fundamental entre Mientras y Repetir-Hasta Que",
          codeBad: "// Asumir que 'Repetir' verifica la condición antes de entrar al bucle",
          codeGood: "// Recordar siempre: 'Repetir-Hasta Que' ejecuta su bloque AL MENOS UNA VEZ antes de evaluar",
          explanation: "Mientras evalúa la condición de entrada al inicio (pre-test); si es falsa, nunca se ejecuta. Repetir evalúa al final (post-test); siempre se ejecuta al menos una vez.",
          impact: "Ejecución accidental de operaciones en colecciones vacías o estados inválidos."
        }
      ],
      interviews: [
        {
          question: "¿Qué es la condición de parada o invariante de bucle en la verificación formal de algoritmos?",
          answer: "Una invariante de bucle es una propiedad lógica que es verdadera antes de iniciar el bucle, se mantiene verdadera en cada iteración y permanece verdadera al finalizar el ciclo. Demuestra formalmente que el algoritmo calcula la respuesta correcta y que cada iteración acerca el estado hacia la condición de terminación garantizando que el bucle no es infinito.",
          level: "Avanzado",
          companyTag: "Ciencias de la Computación"
        }
      ],
      mentalModel: "Todo bucle requiere 3 partes sagradas: Inicialización, Condición de Permanencia y Actualización."
    },
    "modularizacion-subprocesos": {
      gotchas: [
        {
          title: "Efecto secundario accidental por usar 'Por Referencia' indebidamente",
          codeBad: "SubProceso ImprimirDoble(Por Referencia n)\n    n <- n * 2 // Modifica la variable del programa principal sin avisar al llamador\n    Escribir n\nFinSubProceso",
          codeGood: "SubProceso ImprimirDoble(Por Valor n)\n    Escribir n * 2 // Protege la variable original pasando una copia\nFinSubProceso",
          explanation: "El paso por referencia da acceso directo a la celda de memoria original. Si una función solo necesita consultar o calcular sin alterar el dato de origen, debe usarse siempre 'Por Valor'.",
          impact: "Corrupción oculta de variables en el flujo principal del programa."
        }
      ],
      interviews: [
        {
          question: "¿Qué es el desbordamiento de pila (Stack Overflow) en algoritmos recursivos y cómo se previene?",
          answer: "Cada llamada a una función o subproceso reserva un marco de memoria en la pila de llamadas (Call Stack). Si la recursión carece de un Caso Base o los argumentos no convergen a él, la pila se llena hasta agotar la memoria disponible provocando un Stack Overflow. Se previene definiendo siempre un caso base ineludible y validando los límites de entrada.",
          level: "Intermedio / Avanzado",
          companyTag: "FAANG / Google"
        }
      ],
      mentalModel: "Subprocesos: Cajas negras con entradas claras (parámetros), proceso encapsulado y salida limpia."
    },
    "arreglos-vectores": {
      gotchas: [
        {
          title: "Error de índice fuera de rango (Off-by-one / Out of Bounds)",
          codeBad: "Dimension notas[5]\nnotas[6] <- 20 // Error crítico: los índices válidos van del 1 al 5",
          codeGood: "Dimension notas[5]\nnotas[5] <- 20 // Correcto: última celda accesible",
          explanation: "Intentar leer o escribir en un índice menor que 1 o mayor que el tamaño dimensionado genera una violación de acceso a memoria.",
          impact: "Finalización abrupta del programa en tiempo de ejecución."
        }
      ],
      interviews: [
        {
          question: "¿Por qué la búsqueda binaria requiere que el arreglo esté previamente ordenado y cuál es su complejidad temporal comparada con la lineal?",
          answer: "La búsqueda binaria requiere orden para poder descartar la mitad de los elementos en cada paso basándose en si la clave es menor o mayor que el elemento central. Su complejidad es O(log n), requiriendo un máximo de ~20 pasos para 1 millón de elementos, mientras que la búsqueda lineal es O(n) y puede requerir el millón completo de comparaciones.",
          level: "Intermedio",
          companyTag: "Amazon / Microsoft"
        }
      ],
      mentalModel: "Un vector es un bloque sólido y contiguo de memoria: acceso instantáneo O(1) conociendo el índice."
    },
    "arreglos-matrices": {
      gotchas: [
        {
          title: "Invertir el orden de coordenadas [fila, columna]",
          codeBad: "Dimension tablero[3, 5] // 3 filas, 5 columnas\ntablero[4, 2] <- 10 // Error: solo hay 3 filas, [4, 2] desborda la primera dimensión",
          codeGood: "tablero[2, 4] <- 10 // Correcto: fila 2 (válida), columna 4 (válida)",
          explanation: "La convención universal es Matriz[Fila, Columna]. Confundir el orden con el plano cartesiano (X, Y donde X es horizontal y se escribe primero) es una de las causas más frecuentes de bugs en matrices.",
          impact: "Errores de desbordamiento de límites de matriz."
        }
      ],
      interviews: [
        {
          question: "¿Qué es una matriz transpuesta y qué condición geométrica deben cumplir las dimensiones de la matriz resultante?",
          answer: "La transpuesta de una matriz A intercambia sus filas por sus columnas (T[c, f] = A[f, c]). Si la matriz original tiene dimensiones M x N, la matriz transpuesta tendrá obligatoriamente dimensiones N x M. Si la matriz es cuadrada (N x N) e igual a su transpuesta, se le denomina matriz simétrica.",
          level: "Avanzado",
          companyTag: "Computación Gráfica / IA"
        }
      ],
      mentalModel: "Matriz = Filas horizontales primero, Columnas verticales después: Matriz[Fila, Columna]."
    },
    "cadenas-algoritmos": {
      gotchas: [
        {
          title: "Intentar operar matemáticamente una cadena sin convertirla con ConvertirANumero",
          codeBad: "texto <- '100'\ntotal <- texto + 50 // Error de tipos: no se puede sumar texto con número",
          codeGood: "texto <- '100'\ntotal <- ConvertirANumero(texto) + 50 // Correcto: 150 numérico",
          explanation: "Las computadoras representan el texto mediante códigos de caracteres y los números mediante representaciones binarias complementarias. Para pasar de uno a otro se requiere conversión explícita.",
          impact: "Incompatibilidad de tipos en tiempo de compilación o interpretación."
        }
      ],
      interviews: [
        {
          question: "¿Cómo se resuelve el problema de verificación de palíndromos con la técnica de dos punteros (Two Pointers) con complejidad espacial O(1)?",
          answer: "Se ubica un puntero 'izq' en el índice 1 y otro puntero 'der' en el índice Longitud(texto). En un bucle Mientras izq < der, se compara si texto[izq] = texto[der]. Si difieren, se retorna Falso inmediatamente. Si coinciden, se avanza izq y se retrocede der. No requiere duplicar la cadena en memoria, logrando O(1) de espacio adicional y O(n/2) = O(n) de tiempo.",
          level: "Avanzado",
          companyTag: "LeetCode / Meta"
        }
      ],
      mentalModel: "Un string es un vector de caracteres: cada letra tiene su posición accesible del 1 al N."
    }
  };

  const SPECIFIC_DATA = {
    "hola-mundo": {
      gotchas: [
        {
          title: "Omitir las comillas al escribir texto literal",
          codeBad: "Escribir Hola Mundo // PSeInt creerá que Hola y Mundo son variables no definidas",
          codeGood: "Escribir \"Hola, Mundo\" // Las comillas delimitan una cadena de texto literal",
          explanation: "Cualquier texto no numérico sin comillas es interpretado por el compilador como un nombre de identificador o variable.",
          impact: "Error de sintaxis: 'Variable no inicializada'."
        }
      ],
      interviews: [
        {
          question: "¿Cuáles son las 3 partes fundamentales que componen todo algoritmo computable?",
          answer: "Todo algoritmo computable consta de: 1) Entrada (Input): los datos que recibe el sistema; 2) Proceso (Processing): la serie ordenada de instrucciones que transforman esos datos; y 3) Salida (Output): los resultados generados para el usuario o sistema externo.",
          level: "Básico",
          companyTag: "Fundamentos de Computación"
        }
      ],
      mentalModel: "Algoritmo = Entrada -> Proceso Riguroso -> Salida."
    },
    "busqueda-binaria": {
      gotchas: [
        {
          title: "Aplicar búsqueda binaria sobre un vector que no está ordenado",
          codeBad: "// Vector desordenado: [45, 12, 89, 3]\n// Aplicar búsqueda binaria arrojará falsos negativos de que el dato no existe",
          codeGood: "// Primero ordenar el vector con Burbuja o Selección, y luego ejecutar la búsqueda binaria",
          explanation: "La búsqueda binaria asume por axioma matemático que todos los elementos a la izquierda son menores y a la derecha son mayores. En un vector desordenado ese principio se rompe y descarta mitades incorrectas.",
          impact: "El algoritmo reporta que un número no existe cuando sí está en la lista."
        }
      ],
      interviews: [
        {
          question: "¿Por qué en algunos lenguajes de bajo nivel la fórmula (inicio + fin) / 2 para el punto medio causa errores?",
          answer: "En lenguajes con enteros de tamaño fijo (como 32 bits en C/Java), si 'inicio' y 'fin' son números muy grandes cercanos al límite máximo (2^31 - 1), su suma (inicio + fin) se desborda produciendo un número negativo. La forma segura que evita el desbordamiento es: inicio + (fin - inicio) / 2.",
          level: "Avanzado",
          companyTag: "Google Bug History"
        }
      ],
      mentalModel: "Búsqueda Binaria: Divide y Vencerás. Cada comparación elimina el 50% de las opciones restantes."
    },
    "algoritmo-cajero": {
      gotchas: [
        {
          title: "Ordenar las denominaciones de billetes de menor a mayor en lugar de mayor a menor",
          codeBad: "denominaciones <- [1, 5, 10, 20, 50, 100] // Entregará 387 billetes de $1",
          codeGood: "denominaciones <- [100, 50, 20, 10, 5, 1] // Entrega la cantidad mínima óptima de 9 billetes",
          explanation: "La heurística voraz para minimizar la cantidad física de billetes debe elegir obligatoriamente el billete de mayor denominación posible primero.",
          impact: "Solución pésima entregando cientos de monedas o billetes pequeños innecesariamente."
        }
      ],
      interviews: [
        {
          question: "¿En qué casos el algoritmo voraz (Greedy) para el cambio de monedas NO entrega la solución óptima?",
          answer: "Falla cuando el sistema monetario no es canónico. Por ejemplo, con monedas de {1, 3, 4} para cambiar $6: El enfoque voraz toma la moneda de 4, quedando $2, que resuelve con dos monedas de 1 (total 3 monedas: 4+1+1). Sin embargo, la solución óptima global es de solo 2 monedas: 3+3. Para monedas arbitrarias se requiere Programación Dinámica.",
          level: "Avanzado",
          companyTag: "Amazon / LeetCode Hard"
        }
      ],
      mentalModel: "Estrategia Voraz: Toma la mejor decisión local inmediata sin mirar hacia atrás."
    }
  };

  window.enrichTopicsWithGotchas = function(topics) {
    if (!topics || !Array.isArray(topics)) return;

    topics.forEach(t => {
      const specific = SPECIFIC_DATA[t.slug];
      const categoryFallback = CATEGORY_DEFAULTS[t.categorySlug] || CATEGORY_DEFAULTS["fundamentos-variables"];

      t.gotchas = (specific && specific.gotchas) ? specific.gotchas : categoryFallback.gotchas;
      t.interviewQuestions = (specific && specific.interviews) ? specific.interviews : categoryFallback.interviews;
      t.mentalModel = (specific && specific.mentalModel) ? specific.mentalModel : categoryFallback.mentalModel;
    });
  };
})();
