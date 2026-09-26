// scripts/test_all_transpile.js
const fs = require('fs');
const vm = require('vm');

const topicsCode = fs.readFileSync('pseint/js/topics-data.js', 'utf8');
const ctx = { window: {} };
vm.runInNewContext(topicsCode, ctx);
const topics = ctx.window.TOPICS_DATA;

function transpilePseint(code) {
  const lines = code.split('\n');
  let jsLines = [];
  let declaredVars = new Set();
  let currentFunc = null;

  let segunContext = [];

  for (let rawLine of lines) {
    let line = stripComments(rawLine);
    if (!line) {
      jsLines.push('');
      continue;
    }

    if (/^(Algoritmo|Proceso)\s+/i.test(line)) {
      declaredVars.clear();
      jsLines.push('async function __main() {');
      continue;
    }
    if (/^(FinAlgoritmo|FinProceso)/i.test(line)) {
      jsLines.push('}');
      continue;
    }

    let retFuncMatch = line.match(/^(?:SubProceso|Funcion)\s+([a-zA-Z0-9_]+)\s*(?:<-|=)\s*([a-zA-Z0-9_]+)\s*(?:\((.*)\))?/i);
    if (retFuncMatch) {
      declaredVars.clear();
      const retVar = retFuncMatch[1];
      const funcName = retFuncMatch[2];
      const rawParams = retFuncMatch[3] ? retFuncMatch[3].split(',').map(p => {
        let clean = p.trim().replace(/^(Por Valor|Por Referencia)\s+/i, '');
        declaredVars.add(clean);
        return clean;
      }).filter(Boolean) : [];
      declaredVars.add(retVar);
      currentFunc = { retVar, funcName };
      jsLines.push(`async function ${funcName}(${rawParams.join(', ')}) {`);
      jsLines.push(`let ${retVar} = 0;`);
      continue;
    }

    let subMatch = line.match(/^(?:SubProceso|Funcion)\s+([a-zA-Z0-9_]+)\s*(?:\((.*)\))?/i);
    if (subMatch) {
      declaredVars.clear();
      const funcName = subMatch[1];
      const rawParams = subMatch[2] ? subMatch[2].split(',').map(p => {
        let clean = p.trim().replace(/^(Por Valor|Por Referencia)\s+/i, '');
        declaredVars.add(clean);
        return clean;
      }).filter(Boolean) : [];
      jsLines.push(`async function ${funcName}(${rawParams.join(', ')}) {`);
      continue;
    }

    if (/^(FinSubProceso|FinFuncion)/i.test(line)) {
      if (currentFunc) {
        jsLines.push(`return ${currentFunc.retVar};`);
        currentFunc = null;
      }
      jsLines.push('}');
      continue;
    }

    if (/^Definir\s+/i.test(line)) {
      let defMatch = line.match(/^Definir\s+(.*?)\s+Como\s+(Entero|Real|Caracter|Texto|Cadena|Logico|Booleano|Numerico)/i);
      if (defMatch) {
        let vars = defMatch[1].split(',').map(v => v.trim()).filter(Boolean);
        let type = defMatch[2].toLowerCase();
        let initVal = '0';
        if (['caracter', 'texto', 'cadena'].includes(type)) initVal = '""';
        if (['logico', 'booleano'].includes(type)) initVal = 'false';

        let newVars = [];
        for (let v of vars) {
          if (!declaredVars.has(v)) {
            declaredVars.add(v);
            newVars.push(`${v} = ${initVal}`);
          }
        }
        if (newVars.length > 0) {
          jsLines.push(`let ${newVars.join(', ')};`);
        }
        continue;
      }
    }

    if (/^Dimension\s+/i.test(line)) {
      let dimMatch = line.match(/^Dimension\s+([a-zA-Z0-9_]+)\s*\[\s*([^\]]+)\s*\]/i);
      if (dimMatch) {
        let arrName = dimMatch[1];
        let dims = dimMatch[2].split(',').map(d => d.trim());
        let prefix = declaredVars.has(arrName) ? '' : 'let ';
        declaredVars.add(arrName);
        if (dims.length === 1) {
          jsLines.push(`${prefix}${arrName} = new Array((${cleanCondition(dims[0])}) + 2).fill(0);`);
        } else if (dims.length === 2) {
          jsLines.push(`${prefix}${arrName} = __createMatrix(${cleanCondition(dims[0])}, ${cleanCondition(dims[1])});`);
        }
        continue;
      }
    }

    // 2D access: matrix[f, c] -> matrix[f][c]
    line = line.replace(/([a-zA-Z0-9_]+)\[([^,\]]+),\s*([^,\]]+)\]/g, '$1[$2][$3]');

    // Segun control
    let segunMatch = line.match(/^Segun\s+(.*?)\s+Hacer/i);
    if (segunMatch) {
      segunContext.push({ hasCase: false });
      jsLines.push(`switch (${cleanCondition(segunMatch[1])}) {`);
      continue;
    }

    if (/^FinSegun/i.test(line)) {
      let ctx = segunContext.pop();
      if (ctx && ctx.hasCase) {
        jsLines.push('break;');
      }
      jsLines.push('}');
      continue;
    }

    if (segunContext.length > 0) {
      let curSegun = segunContext[segunContext.length - 1];
      if (/^De\s+Otro\s+Modo\s*:/i.test(line)) {
        let rest = line.replace(/^De\s+Otro\s+Modo\s*:/i, '').trim();
        if (curSegun.hasCase) jsLines.push('break;');
        curSegun.hasCase = true;
        jsLines.push('default:');
        if (rest) jsLines.push(transpileSingleStatement(rest, declaredVars));
        continue;
      }

      let caseMatch = line.match(/^Caso\s+([^:]+):(.*)$/i);
      if (!caseMatch && /^([0-9a-zA-Z_'"\s,.-]+):(.*)$/.test(line)) {
        // Only if it doesn't look like a reserved instruction
        if (!/^(Escribir|Leer|Si|Mientras|Para|Repetir|Definir|Dimension)\b/i.test(line)) {
          caseMatch = line.match(/^([0-9a-zA-Z_'"\s,.-]+):(.*)$/);
        }
      }
      if (caseMatch) {
        let vals = caseMatch[1].split(',').map(v => cleanCondition(v.trim())).filter(Boolean);
        let rest = caseMatch[2].trim();
        if (curSegun.hasCase) jsLines.push('break;');
        curSegun.hasCase = true;
        for (let v of vals) {
          jsLines.push(`case ${v}:`);
        }
        if (rest) jsLines.push(transpileSingleStatement(rest, declaredVars));
        continue;
      }
    }

    if (line.includes(';') && !line.startsWith('//')) {
      let subStatements = splitStatementsBySemicolon(line);
      if (subStatements.length > 1) {
        for (let sub of subStatements) {
          jsLines.push(transpileSingleStatement(sub, declaredVars));
        }
        continue;
      }
    }

    jsLines.push(transpileSingleStatement(line, declaredVars));
  }

  return jsLines.join('\n');
}

function stripComments(line) {
  let inQuotes = false;
  let qChar = '';
  for (let i = 0; i < line.length; i++) {
    let c = line[i];
    if ((c === '"' || c === "'") && (i === 0 || line[i-1] !== '\\')) {
      if (!inQuotes) { inQuotes = true; qChar = c; }
      else if (c === qChar) { inQuotes = false; }
    }
    if (!inQuotes && c === '/' && line[i+1] === '/') {
      return line.slice(0, i).trim();
    }
  }
  return line.trim();
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

function transpileSingleStatement(line, declaredVars) {
  if (/^Escribir\s+Sin\s+Bajar\s+/i.test(line)) {
    let content = line.replace(/^Escribir\s+Sin\s+Bajar\s+/i, '');
    return `await __term.printSinBajar(${cleanExpressionList(content)});`;
  }
  if (/^Escribir\s+/i.test(line)) {
    let content = line.replace(/^Escribir\s+/i, '');
    return `await __term.print(${cleanExpressionList(content)});`;
  }
  if (/^Escribir$/i.test(line)) {
    return 'await __term.print([]);';
  }
  if (/^Leer\s+/i.test(line)) {
    let vars = line.replace(/^Leer\s+/i, '').split(',').map(v => v.trim()).filter(Boolean);
    let stmts = [];
    for (let v of vars) {
      if (!declaredVars.has(v)) {
        declaredVars.add(v);
        stmts.push(`let ${v} = await __term.read("${v}");`);
      } else {
        stmts.push(`${v} = await __term.read("${v}");`);
      }
    }
    return stmts.join(' ');
  }

  let paraMatch = line.match(/^Para\s+([a-zA-Z0-9_]+)\s*(?:<-|=)\s*(.*?)\s+Hasta\s+(.*?)(?:\s+Con\s+Paso\s+(.*?))?\s+Hacer/i);
  if (paraMatch) {
    let pVar = paraMatch[1];
    let pStart = cleanCondition(paraMatch[2]);
    let pEnd = cleanCondition(paraMatch[3]);
    let pStep = paraMatch[4] ? cleanCondition(paraMatch[4]) : '1';
    let decl = declaredVars.has(pVar) ? '' : 'let ';
    declaredVars.add(pVar);
    return `for (${decl}${pVar} = ${pStart}; (${pStep}) >= 0 ? ${pVar} <= (${pEnd}) : ${pVar} >= (${pEnd}); ${pVar} += (${pStep})) { await __term.step();`;
  }
  if (/^FinPara/i.test(line)) return '}';

  let mientrasMatch = line.match(/^Mientras\s+(.*?)\s+Hacer/i);
  if (mientrasMatch) return `while (${cleanCondition(mientrasMatch[1])}) { await __term.step();`;
  if (/^FinMientras/i.test(line)) return '}';

  if (/^Repetir/i.test(line)) return 'do { await __term.step();';
  let hastaMatch = line.match(/^Hasta\s+Que\s+(.*)/i);
  if (hastaMatch) return `} while (!(${cleanCondition(hastaMatch[1])}));`;

  let siMatch = line.match(/^Si\s+(.*?)\s+Entonces/i);
  if (siMatch) return `if (${cleanCondition(siMatch[1])}) {`;
  if (/^Sino/i.test(line)) return '} else {';
  if (/^FinSi/i.test(line)) return '}';

  let assignMatch = line.match(/^([a-zA-Z0-9_\[\]]+)\s*(?:<-|=)\s*(.*)/);
  if (assignMatch) {
    let target = assignMatch[1].trim();
    let expr = cleanCondition(assignMatch[2].trim());
    if (!target.includes('[') && !declaredVars.has(target)) {
      declaredVars.add(target);
      return `let ${target} = ${expr};`;
    }
    return `${target} = ${expr};`;
  }

  // Llamada a función o procedimiento suelto
  return cleanCondition(line) + ';';
}

function cleanCondition(cond) {
  if (!cond) return '';
  return cond
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
}

function cleanExpressionList(expr) {
  if (!expr || !expr.trim()) return '[]';
  let parts = [];
  let current = '';
  let inQuotes = false;
  let quoteChar = '';

  for (let i = 0; i < expr.length; i++) {
    let char = expr[i];
    if ((char === '"' || char === "'") && (i === 0 || expr[i-1] !== '\\')) {
      if (!inQuotes) { inQuotes = true; quoteChar = char; }
      else if (char === quoteChar) { inQuotes = false; }
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

console.log('Testing transpile and execution on all topics...');
async function testAll() {
  let compileSuccess = 0;
  let runSuccess = 0;
  let errors = [];

  for (const t of topics) {
    try {
      const js = transpilePseint(t.code);
      const fn = new Function('__term', '__createMatrix', '__pseint_longitud', '__pseint_subcadena', '__pseint_mayusculas', '__pseint_minusculas', `${js}\nreturn __main();`);
      compileSuccess++;

      const mockTerm = {
        output: [],
        print: async (args) => {
          mockTerm.output.push(args.map(a => a != null ? a.toString() : '').join(' '));
        },
        printSinBajar: async (args) => {
          let str = args.map(a => a != null ? a.toString() : '').join(' ');
          if (mockTerm.output.length === 0) mockTerm.output.push(str);
          else mockTerm.output[mockTerm.output.length - 1] += str;
        },
        read: async (varName) => {
          // Provide sensible default test input based on variable name
          if (/nombre|texto|cadena/i.test(varName)) return "Antigravity";
          if (/edad|numero|cantidad|opcion|n|limite/i.test(varName)) return 10;
          return 5;
        },
        step: async () => {}
      };

      function __createMatrix(rows, cols) {
        let m = new Array(rows + 2);
        for (let i = 0; i < rows + 2; i++) {
          m[i] = new Array(cols + 2).fill(0);
        }
        return m;
      }
      function __pseint_longitud(s) { return s != null ? s.toString().length : 0; }
      function __pseint_subcadena(s, i, j) { return s != null ? s.toString().substring(i - 1, j) : ''; }
      function __pseint_mayusculas(s) { return s != null ? s.toString().toUpperCase() : ''; }
      function __pseint_minusculas(s) { return s != null ? s.toString().toLowerCase() : ''; }

      await fn(mockTerm, __createMatrix, __pseint_longitud, __pseint_subcadena, __pseint_mayusculas, __pseint_minusculas);
      runSuccess++;
    } catch (err) {
      errors.push({ id: t.id, title: t.title, err: err.message });
    }
  }

  console.log(`Compilation Success: ${compileSuccess} / ${topics.length}`);
  console.log(`Execution Success: ${runSuccess} / ${topics.length}`);
  if (errors.length > 0) {
    errors.forEach(e => console.log(`[Topic ${e.id}] ${e.title}: ${e.err}`));
  }
}

testAll();
