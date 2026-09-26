// scripts/test_interpreter.js
// Prueba del motor de transpilación y ejecución de PSeInt

function transpilePseint(code) {
  const lines = code.split('\n');
  let jsLines = [];
  let currentFunc = null;

  for (let rawLine of lines) {
    let line = rawLine.trim();
    if (!line) {
      jsLines.push('');
      continue;
    }
    // Comentarios completos
    if (line.startsWith('//')) {
      jsLines.push(line);
      continue;
    }

    // Algoritmo / Proceso
    if (/^(Algoritmo|Proceso)\s+/i.test(line)) {
      jsLines.push('async function __main() {');
      continue;
    }
    if (/^(FinAlgoritmo|FinProceso)/i.test(line)) {
      jsLines.push('}');
      continue;
    }

    // SubProceso / Funcion
    let subMatch = line.match(/^SubProceso\s+([a-zA-Z0-9_]+)\s*\((.*)\)/i);
    if (subMatch) {
      const funcName = subMatch[1];
      const rawParams = subMatch[2].split(',').map(p => {
        let clean = p.trim().replace(/^(Por Valor|Por Referencia)\s+/i, '');
        return clean;
      }).filter(Boolean);
      jsLines.push(`async function ${funcName}(${rawParams.join(', ')}) {`);
      continue;
    }

    let funcMatch = line.match(/^Funcion\s+([a-zA-Z0-9_]+)\s*(?:<-|=)\s*([a-zA-Z0-9_]+)\s*\((.*)\)/i);
    if (funcMatch) {
      const retVar = funcMatch[1];
      const funcName = funcMatch[2];
      const rawParams = funcMatch[3].split(',').map(p => {
        let clean = p.trim().replace(/^(Por Valor|Por Referencia)\s+/i, '');
        return clean;
      }).filter(Boolean);
      currentFunc = { retVar, funcName };
      jsLines.push(`async function ${funcName}(${rawParams.join(', ')}) {`);
      jsLines.push(`let ${retVar} = 0;`);
      continue;
    }

    if (/^FinSubProceso/i.test(line)) {
      jsLines.push('}');
      continue;
    }
    if (/^FinFuncion/i.test(line)) {
      if (currentFunc) {
        jsLines.push(`return ${currentFunc.retVar};`);
        currentFunc = null;
      }
      jsLines.push('}');
      continue;
    }

    // Definir
    if (/^Definir\s+/i.test(line)) {
      let defMatch = line.match(/^Definir\s+(.*?)\s+Como\s+(Entero|Real|Caracter|Texto|Cadena|Logico|Booleano|Numerico)/i);
      if (defMatch) {
        let vars = defMatch[1].split(',').map(v => v.trim()).filter(Boolean);
        let type = defMatch[2].toLowerCase();
        let initVal = '0';
        if (['caracter', 'texto', 'cadena'].includes(type)) initVal = '""';
        if (['logico', 'booleano'].includes(type)) initVal = 'false';
        jsLines.push(`let ${vars.map(v => `${v} = ${initVal}`).join(', ')};`);
        continue;
      }
    }

    // Dimension
    if (/^Dimension\s+/i.test(line)) {
      let dimMatch = line.match(/^Dimension\s+([a-zA-Z0-9_]+)\s*\[\s*([^\]]+)\s*\]/i);
      if (dimMatch) {
        let arrName = dimMatch[1];
        let dims = dimMatch[2].split(',').map(d => d.trim());
        if (dims.length === 1) {
          jsLines.push(`let ${arrName} = new Array((${cleanCondition(dims[0])}) + 2).fill(0);`);
        } else if (dims.length === 2) {
          jsLines.push(`let ${arrName} = __createMatrix(${cleanCondition(dims[0])}, ${cleanCondition(dims[1])});`);
        }
        continue;
      }
    }

    // Transform 2D access: matrix[f, c] -> matrix[f][c]
    line = line.replace(/([a-zA-Z0-9_]+)\[([^,\]]+),\s*([^,\]]+)\]/g, '$1[$2][$3]');

    // Separar múltiples sentencias en una sola línea (separadas por ;)
    // Pero respetando comillas
    if (line.includes(';') && !line.startsWith('//')) {
      let subStatements = splitStatementsBySemicolon(line);
      if (subStatements.length > 1) {
        for (let sub of subStatements) {
          jsLines.push(transpileSingleStatement(sub));
        }
        continue;
      }
    }

    jsLines.push(transpileSingleStatement(line));
  }

  return jsLines.join('\n');
}

function splitStatementsBySemicolon(line) {
  let parts = [];
  let current = '';
  let inQuotes = false;
  let qChar = '';
  for (let i = 0; i < line.length; i++) {
    let c = line[i];
    if ((c === '"' || c === "'") && (i === 0 || line[i-1] !== '\\')) {
      if (!inQuotes) { inQuotes = true; qChar = c; }
      else if (c === qChar) { inQuotes = false; }
    }
    if (c === ';' && !inQuotes) {
      if (current.trim()) parts.push(current.trim());
      current = '';
    } else {
      current += c;
    }
  }
  if (current.trim()) parts.push(current.trim());
  return parts;
}

function transpileSingleStatement(line) {
  // Escribir Sin Bajar
  if (/^Escribir\s+Sin\s+Bajar\s+/i.test(line)) {
    let content = line.replace(/^Escribir\s+Sin\s+Bajar\s+/i, '');
    return `await __term.printSinBajar(${cleanExpressionList(content)});`;
  }

  // Escribir
  if (/^Escribir\s+/i.test(line)) {
    let content = line.replace(/^Escribir\s+/i, '');
    return `await __term.print(${cleanExpressionList(content)});`;
  }

  // Leer
  if (/^Leer\s+/i.test(line)) {
    let vars = line.replace(/^Leer\s+/i, '').split(',').map(v => v.trim()).filter(Boolean);
    return vars.map(v => `${v} = await __term.read("${v}");`).join(' ');
  }

  // Para
  let paraMatch = line.match(/^Para\s+([a-zA-Z0-9_]+)\s*(?:<-|=)\s*(.*?)\s+Hasta\s+(.*?)(?:\s+Con\s+Paso\s+(.*?))?\s+Hacer/i);
  if (paraMatch) {
    let pVar = paraMatch[1];
    let pStart = cleanCondition(paraMatch[2]);
    let pEnd = cleanCondition(paraMatch[3]);
    let pStep = paraMatch[4] ? cleanCondition(paraMatch[4]) : '1';
    return `for (let ${pVar} = ${pStart}; (${pStep}) >= 0 ? ${pVar} <= (${pEnd}) : ${pVar} >= (${pEnd}); ${pVar} += (${pStep})) { await __term.step();`;
  }
  if (/^FinPara/i.test(line)) {
    return '}';
  }

  // Mientras
  let mientrasMatch = line.match(/^Mientras\s+(.*?)\s+Hacer/i);
  if (mientrasMatch) {
    return `while (${cleanCondition(mientrasMatch[1])}) { await __term.step();`;
  }
  if (/^FinMientras/i.test(line)) {
    return '}';
  }

  // Repetir
  if (/^Repetir/i.test(line)) {
    return 'do { await __term.step();';
  }
  let hastaMatch = line.match(/^Hasta\s+Que\s+(.*)/i);
  if (hastaMatch) {
    return `} while (!(${cleanCondition(hastaMatch[1])}));`;
  }

  // Si ... Entonces
  let siMatch = line.match(/^Si\s+(.*?)\s+Entonces/i);
  if (siMatch) {
    return `if (${cleanCondition(siMatch[1])}) {`;
  }
  if (/^Sino/i.test(line)) {
    return '} else {';
  }
  if (/^FinSi/i.test(line)) {
    return '}';
  }

  // Segun
  let segunMatch = line.match(/^Segun\s+(.*?)\s+Hacer/i);
  if (segunMatch) {
    return `switch (${cleanCondition(segunMatch[1])}) {`;
  }
  let casoMatch = line.match(/^(?:Caso\s+)?([^:]+):/i);
  if (casoMatch && !/^De\s+Otro\s+Modo/i.test(line)) {
    return `case ${cleanCondition(casoMatch[1])}:`;
  }
  if (/^De\s+Otro\s+Modo:/i.test(line)) {
    return 'default:';
  }
  if (/^FinSegun/i.test(line)) {
    return '}';
  }

  // Asignación <- o =
  let assignMatch = line.match(/^([a-zA-Z0-9_\[\]]+)\s*(?:<-|=)\s*(.*)/);
  if (assignMatch) {
    let target = assignMatch[1].trim();
    let expr = cleanCondition(assignMatch[2].trim());
    return `${target} = ${expr};`;
  }

  return cleanCondition(line) + ';';
}

function cleanCondition(cond) {
  if (!cond) return '';
  let res = cond
    .replace(/<>/g, ' !== ')
    .replace(/(^|[^<>=!])=([^=]|$)/g, '$1 === $2')
    .replace(/\bMOD\b/gi, '%')
    .replace(/\bY\b/gi, '&&')
    .replace(/\bO\b/gi, '||')
    .replace(/\bNO\b/gi, '!')
    .replace(/\bVerdadero\b/gi, 'true')
    .replace(/\bFalso\b/gi, 'false')
    .replace(/\btrunc\s*\(/gi, 'Math.trunc(')
    .replace(/\bredon\s*\(/gi, 'Math.round(')
    .replace(/\b(rc|raiz)\s*\(/gi, 'Math.sqrt(')
    .replace(/\babs\s*\(/gi, 'Math.abs(')
    .replace(/\bLongitud\s*\(/gi, '__pseint_longitud(')
    .replace(/\bSubcadena\s*\(/gi, '__pseint_subcadena(')
    .replace(/\bMayusculas\s*\(/gi, '__pseint_mayusculas(')
    .replace(/\bMinusculas\s*\(/gi, '__pseint_minusculas(')
    .replace(/\bConvertirANumero\s*\(/gi, 'parseFloat(')
    .replace(/\bConvertirATexto\s*\(/gi, 'String(');
  return res;
}

function cleanExpressionList(expr) {
  let parts = [];
  let current = '';
  let inQuotes = false;
  let quoteChar = '';

  for (let i = 0; i < expr.length; i++) {
    let char = expr[i];
    if ((char === '"' || char === "'") && (i === 0 || expr[i-1] !== '\\')) {
      if (!inQuotes) {
        inQuotes = true;
        quoteChar = char;
      } else if (char === quoteChar) {
        inQuotes = false;
      }
    }
    if (char === ',' && !inQuotes) {
      parts.push(cleanCondition(current.trim()));
      current = '';
    } else {
      current += char;
    }
  }
  if (current.trim()) {
    parts.push(cleanCondition(current.trim()));
  }
  return `[${parts.join(', ')}]`;
}

// Helpers globales para el entorno PSeInt
const __term = {
  print: async (args) => console.log(args.map(a => a != null ? a.toString() : '').join(' ')),
  printSinBajar: async (args) => process.stdout.write(args.map(a => a != null ? a.toString() : '').join(' ') + ' '),
  read: async (name) => 50,
  step: async () => {}
};

function __createMatrix(rows, cols) {
  let m = new Array(rows + 2);
  for (let i = 0; i < rows + 2; i++) {
    m[i] = new Array(cols + 2).fill(0);
  }
  return m;
}

function __pseint_longitud(s) {
  return s != null ? s.toString().length : 0;
}

function __pseint_subcadena(s, i, j) {
  if (s == null) return '';
  let str = s.toString();
  return str.substring(i - 1, j);
}

function __pseint_mayusculas(s) {
  return s != null ? s.toString().toUpperCase() : '';
}

function __pseint_minusculas(s) {
  return s != null ? s.toString().toLowerCase() : '';
}

// Test con Bubble Sort
const codeBurbuja = `Algoritmo OrdenamientoBurbuja
    Definir TAMANIO, i, j, auxiliar Como Entero
    TAMANIO <- 4
    Definir arreglo Como Entero
    Dimension arreglo[TAMANIO]
    arreglo[1] <- 40; arreglo[2] <- 10; arreglo[3] <- 30; arreglo[4] <- 20

    Para i <- 1 Hasta TAMANIO - 1 Con Paso 1 Hacer
        Para j <- 1 Hasta TAMANIO - i Con Paso 1 Hacer
            Si arreglo[j] > arreglo[j + 1] Entonces
                auxiliar <- arreglo[j]
                arreglo[j] <- arreglo[j + 1]
                arreglo[j + 1] <- auxiliar
            FinSi
        FinPara
    FinPara

    Escribir "Vector ordenado:"
    Para i <- 1 Hasta TAMANIO Con Paso 1 Hacer
        Escribir Sin Bajar arreglo[i], " "
    FinPara
    Escribir ""
FinAlgoritmo`;

console.log('--- JS Transpilado Burbuja ---');
const jsBurbuja = transpilePseint(codeBurbuja);
console.log(jsBurbuja);
eval(jsBurbuja);
__main().then(() => console.log('\nFinalizado test Burbuja con éxito!'));
