/**
 * PSeInt Virtual VM & Transpiler (JavaScript Client-side Engine)
 * Ejecutor interactivo de pseudocódigo en español para la web.
 * Soporta:
 * - Algoritmo / Proceso ... FinAlgoritmo / FinProceso
 * - SubProceso / Funcion con y sin retorno
 * - Definir ... Como (Entero, Real, Caracter, Texto, Cadena, Logico, Booleano, Numerico)
 * - Dimension (vectores 1D y matrices 2D) con indexación base 1
 * - Entrada interactiva: Leer var1, var2...
 * - Salida de texto: Escribir y Escribir Sin Bajar
 * - Estructuras de control: Si...Sino...FinSi, Segun...Hacer...De Otro Modo...FinSegun
 * - Bucles: Para...Hasta...Con Paso...Hacer, Mientras...Hacer, Repetir...Hasta Que
 * - Operadores lógicos y matemáticos: Y, O, NO, MOD, =, <>, ^, +, -, *, /
 * - Funciones incorporadas: rc, raiz, abs, trunc, redon, sen, cos, tan, ln, exp,
 *   Longitud, Subcadena, Mayusculas, Minusculas, ConvertirANumero, ConvertirATexto, Aleatorio, azar
 * - Protección contra bucles infinitos y cancelación interactiva.
 */

(function () {
  'use strict';

  function stripComments(line) {
    let inQuotes = false;
    let qChar = '';
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if ((c === '"' || c === "'") && (i === 0 || line[i - 1] !== '\\')) {
        if (!inQuotes) {
          inQuotes = true;
          qChar = c;
        } else if (c === qChar) {
          inQuotes = false;
        }
      }
      if (!inQuotes && c === '/' && line[i + 1] === '/') {
        return line.slice(0, i).trim();
      }
    }
    return line.trim();
  }

  function splitStatementsBySemicolon(line) {
    const parts = [];
    let current = '';
    let inQuotes = false;
    let qChar = '';
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if ((c === '"' || c === "'") && (i === 0 || line[i - 1] !== '\\')) {
        if (!inQuotes) {
          inQuotes = true;
          qChar = c;
        } else if (c === qChar) {
          inQuotes = false;
        }
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

  function cleanCondition(cond) {
    if (!cond) return '';
    let res = cond
      // Exponente ^
      .replace(/\^/g, ' ** ')
      // Operador distinto <>
      .replace(/<>/g, ' !== ')
      // Operador igual = fuera de comparaciones
      .replace(/(^|[^<>=!])=([^=]|$)/g, '$1 === $2')
      .replace(/\bMOD\b/gi, '%')
      .replace(/\bY\b/gi, '&&')
      .replace(/\bO\b/gi, '||')
      .replace(/\bNO\b/gi, '!')
      .replace(/\bVerdadero\b/gi, 'true')
      .replace(/\bFalso\b/gi, 'false')
      // Matemáticas
      .replace(/\btrunc\s*\(/gi, 'Math.trunc(')
      .replace(/\bredon\s*\(/gi, 'Math.round(')
      .replace(/\b(rc|raiz)\s*\(/gi, 'Math.sqrt(')
      .replace(/\babs\s*\(/gi, 'Math.abs(')
      .replace(/\bsen\s*\(/gi, 'Math.sin(')
      .replace(/\bcos\s*\(/gi, 'Math.cos(')
      .replace(/\btan\s*\(/gi, 'Math.tan(')
      .replace(/\bln\s*\(/gi, 'Math.log(')
      .replace(/\bexp\s*\(/gi, 'Math.exp(')
      .replace(/\bAleatorio\s*\(/gi, '__pseint_aleatorio(')
      .replace(/\bazar\s*\(/gi, '__pseint_azar(')
      // Cadenas
      .replace(/\bLongitud\s*\(/gi, '__pseint_longitud(')
      .replace(/\bSubcadena\s*\(/gi, '__pseint_subcadena(')
      .replace(/\bMayusculas\s*\(/gi, '__pseint_mayusculas(')
      .replace(/\bMinusculas\s*\(/gi, '__pseint_minusculas(')
      .replace(/\bConvertirANumero\s*\(/gi, 'parseFloat(')
      .replace(/\bConvertirATexto\s*\(/gi, 'String(');

    return res;
  }

  function cleanExpressionList(expr) {
    if (!expr || !expr.trim()) return '[]';
    const parts = [];
    let current = '';
    let inQuotes = false;
    let quoteChar = '';

    for (let i = 0; i < expr.length; i++) {
      const char = expr[i];
      if ((char === '"' || char === "'") && (i === 0 || expr[i - 1] !== '\\')) {
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

  function transpileSingleStatement(line, declaredVars) {
    if (/^Escribir\s+Sin\s+Bajar\s+/i.test(line)) {
      const content = line.replace(/^Escribir\s+Sin\s+Bajar\s+/i, '');
      return `await __term.printSinBajar(${cleanExpressionList(content)});`;
    }
    if (/^Escribir\s+/i.test(line)) {
      const content = line.replace(/^Escribir\s+/i, '');
      return `await __term.print(${cleanExpressionList(content)});`;
    }
    if (/^Escribir$/i.test(line)) {
      return 'await __term.print([]);';
    }
    if (/^Leer\s+/i.test(line)) {
      const vars = line.replace(/^Leer\s+/i, '').split(',').map(v => v.trim()).filter(Boolean);
      const stmts = [];
      for (const v of vars) {
        if (!declaredVars.has(v)) {
          declaredVars.add(v);
          stmts.push(`let ${v} = await __term.read("${v}");`);
        } else {
          stmts.push(`${v} = await __term.read("${v}");`);
        }
      }
      return stmts.join(' ');
    }

    const paraMatch = line.match(/^Para\s+([a-zA-Z0-9_]+)\s*(?:<-|=)\s*(.*?)\s+Hasta\s+(.*?)(?:\s+Con\s+Paso\s+(.*?))?\s+Hacer/i);
    if (paraMatch) {
      const pVar = paraMatch[1];
      const pStart = cleanCondition(paraMatch[2]);
      const pEnd = cleanCondition(paraMatch[3]);
      const pStep = paraMatch[4] ? cleanCondition(paraMatch[4]) : '1';
      const decl = declaredVars.has(pVar) ? '' : 'let ';
      declaredVars.add(pVar);
      return `for (${decl}${pVar} = ${pStart}; (${pStep}) >= 0 ? ${pVar} <= (${pEnd}) : ${pVar} >= (${pEnd}); ${pVar} += (${pStep})) { await __term.step();`;
    }
    if (/^FinPara/i.test(line)) return '}';

    const mientrasMatch = line.match(/^Mientras\s+(.*?)\s+Hacer/i);
    if (mientrasMatch) return `while (${cleanCondition(mientrasMatch[1])}) { await __term.step();`;
    if (/^FinMientras/i.test(line)) return '}';

    if (/^Repetir/i.test(line)) return 'do { await __term.step();';
    const hastaMatch = line.match(/^Hasta\s+Que\s+(.*)/i);
    if (hastaMatch) return `} while (!(${cleanCondition(hastaMatch[1])}));`;

    const siMatch = line.match(/^Si\s+(.*?)\s+Entonces/i);
    if (siMatch) return `if (${cleanCondition(siMatch[1])}) {`;
    if (/^Sino/i.test(line)) return '} else {';
    if (/^FinSi/i.test(line)) return '}';

    const assignMatch = line.match(/^([a-zA-Z0-9_\[\]]+)\s*(?:<-|=)\s*(.*)/);
    if (assignMatch) {
      const target = assignMatch[1].trim();
      const expr = cleanCondition(assignMatch[2].trim());
      if (!target.includes('[') && !declaredVars.has(target)) {
        declaredVars.add(target);
        return `let ${target} = ${expr};`;
      }
      return `${target} = ${expr};`;
    }

    // Invocación a función o procedimiento suelto
    return cleanCondition(line) + ';';
  }

  function transpilePseint(code) {
    const lines = code.split('\n');
    const jsLines = [];
    const declaredVars = new Set();
    let currentFunc = null;
    const segunContext = [];

    for (const rawLine of lines) {
      const line = stripComments(rawLine);
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

      const retFuncMatch = line.match(/^(?:SubProceso|Funcion)\s+([a-zA-Z0-9_]+)\s*(?:<-|=)\s*([a-zA-Z0-9_]+)\s*(?:\((.*)\))?/i);
      if (retFuncMatch) {
        declaredVars.clear();
        const retVar = retFuncMatch[1];
        const funcName = retFuncMatch[2];
        const rawParams = retFuncMatch[3] ? retFuncMatch[3].split(',').map(p => {
          const clean = p.trim().replace(/^(Por Valor|Por Referencia)\s+/i, '');
          declaredVars.add(clean);
          return clean;
        }).filter(Boolean) : [];
        declaredVars.add(retVar);
        currentFunc = { retVar, funcName };
        jsLines.push(`async function ${funcName}(${rawParams.join(', ')}) {`);
        jsLines.push(`let ${retVar} = 0;`);
        continue;
      }

      const subMatch = line.match(/^(?:SubProceso|Funcion)\s+([a-zA-Z0-9_]+)\s*(?:\((.*)\))?/i);
      if (subMatch) {
        declaredVars.clear();
        const funcName = subMatch[1];
        const rawParams = subMatch[2] ? subMatch[2].split(',').map(p => {
          const clean = p.trim().replace(/^(Por Valor|Por Referencia)\s+/i, '');
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
        const defMatch = line.match(/^Definir\s+(.*?)\s+Como\s+(Entero|Real|Caracter|Texto|Cadena|Logico|Booleano|Numerico)/i);
        if (defMatch) {
          const vars = defMatch[1].split(',').map(v => v.trim()).filter(Boolean);
          const type = defMatch[2].toLowerCase();
          let initVal = '0';
          if (['caracter', 'texto', 'cadena'].includes(type)) initVal = '""';
          if (['logico', 'booleano'].includes(type)) initVal = 'false';

          const newVars = [];
          for (const v of vars) {
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
        const dimMatch = line.match(/^Dimension\s+([a-zA-Z0-9_]+)\s*\[\s*([^\]]+)\s*\]/i);
        if (dimMatch) {
          const arrName = dimMatch[1];
          const dims = dimMatch[2].split(',').map(d => d.trim());
          const prefix = declaredVars.has(arrName) ? '' : 'let ';
          declaredVars.add(arrName);
          if (dims.length === 1) {
            jsLines.push(`${prefix}${arrName} = new Array((${cleanCondition(dims[0])}) + 2).fill(0);`);
          } else if (dims.length === 2) {
            jsLines.push(`${prefix}${arrName} = __createMatrix(${cleanCondition(dims[0])}, ${cleanCondition(dims[1])});`);
          }
          continue;
        }
      }

      // Acceso 2D: matrix[f, c] -> matrix[f][c]
      let processedLine = line.replace(/([a-zA-Z0-9_]+)\[([^,\]]+),\s*([^,\]]+)\]/g, '$1[$2][$3]');

      // Manejo de Segun
      const segunMatch = processedLine.match(/^Segun\s+(.*?)\s+Hacer/i);
      if (segunMatch) {
        segunContext.push({ hasCase: false });
        jsLines.push(`switch (${cleanCondition(segunMatch[1])}) {`);
        continue;
      }

      if (/^FinSegun/i.test(processedLine)) {
        const ctx = segunContext.pop();
        if (ctx && ctx.hasCase) {
          jsLines.push('break;');
        }
        jsLines.push('}');
        continue;
      }

      if (segunContext.length > 0) {
        const curSegun = segunContext[segunContext.length - 1];
        if (/^De\s+Otro\s+Modo\s*:/i.test(processedLine)) {
          const rest = processedLine.replace(/^De\s+Otro\s+Modo\s*:/i, '').trim();
          if (curSegun.hasCase) jsLines.push('break;');
          curSegun.hasCase = true;
          jsLines.push('default:');
          if (rest) jsLines.push(transpileSingleStatement(rest, declaredVars));
          continue;
        }

        let caseMatch = processedLine.match(/^Caso\s+([^:]+):(.*)$/i);
        if (!caseMatch && /^([0-9a-zA-Z_'"\s,.-]+):(.*)$/.test(processedLine)) {
          if (!/^(Escribir|Leer|Si|Mientras|Para|Repetir|Definir|Dimension)\b/i.test(processedLine)) {
            caseMatch = processedLine.match(/^([0-9a-zA-Z_'"\s,.-]+):(.*)$/);
          }
        }
        if (caseMatch) {
          const vals = caseMatch[1].split(',').map(v => cleanCondition(v.trim())).filter(Boolean);
          const rest = caseMatch[2].trim();
          if (curSegun.hasCase) jsLines.push('break;');
          curSegun.hasCase = true;
          for (const v of vals) {
            jsLines.push(`case ${v}:`);
          }
          if (rest) jsLines.push(transpileSingleStatement(rest, declaredVars));
          continue;
        }
      }

      // Separación de múltiples sentencias por punto y coma
      if (processedLine.includes(';') && !processedLine.startsWith('//')) {
        const subStatements = splitStatementsBySemicolon(processedLine);
        if (subStatements.length > 1) {
          for (const sub of subStatements) {
            jsLines.push(transpileSingleStatement(sub, declaredVars));
          }
          continue;
        }
      }

      jsLines.push(transpileSingleStatement(processedLine, declaredVars));
    }

    return jsLines.join('\n');
  }

  // Clase Virtual VM PSeInt
  class PseintVirtualVM {
    constructor() {
      this.isRunning = false;
      this.isWaitingInput = false;
      this.abortController = null;
      this.inputResolver = null;
      this.stepCount = 0;
      this.maxSteps = 100000;
    }

    createMatrix(rows, cols) {
      const r = Math.max(1, parseInt(rows, 10) || 1);
      const c = Math.max(1, parseInt(cols, 10) || 1);
      const m = new Array(r + 2);
      for (let i = 0; i < r + 2; i++) {
        m[i] = new Array(c + 2).fill(0);
      }
      return m;
    }

    longitud(s) {
      return s != null ? s.toString().length : 0;
    }

    subcadena(s, i, j) {
      if (s == null) return '';
      const str = s.toString();
      const start = Math.max(0, (parseInt(i, 10) || 1) - 1);
      const end = Math.min(str.length, parseInt(j, 10) || str.length);
      return str.substring(start, end);
    }

    mayusculas(s) {
      return s != null ? s.toString().toUpperCase() : '';
    }

    minusculas(s) {
      return s != null ? s.toString().toLowerCase() : '';
    }

    aleatorio(min, max) {
      const nMin = Math.ceil(min);
      const nMax = Math.floor(max);
      return Math.floor(Math.random() * (nMax - nMin + 1)) + nMin;
    }

    azar(max) {
      return Math.floor(Math.random() * (parseInt(max, 10) || 1));
    }

    stop() {
      if (this.isRunning) {
        this.isRunning = false;
        if (this.abortController) {
          this.abortController.abort();
        }
        if (this.inputResolver) {
          this.inputResolver({ cancelled: true });
          this.inputResolver = null;
        }
        this.isWaitingInput = false;
      }
    }

    async execute(code, io) {
      if (this.isRunning) {
        this.stop();
      }

      this.isRunning = true;
      this.isWaitingInput = false;
      this.stepCount = 0;
      this.abortController = new AbortController();

      const signal = this.abortController.signal;

      // Interfaz del Terminal para el código transpilado
      const __term = {
        print: async (args) => {
          if (signal.aborted) throw new Error('EJECUCION_CANCELADA');
          const line = args.map(a => (a != null ? a.toString() : '')).join(' ');
          io.onPrint(line);
        },
        printSinBajar: async (args) => {
          if (signal.aborted) throw new Error('EJECUCION_CANCELADA');
          const text = args.map(a => (a != null ? a.toString() : '')).join(' ');
          io.onPrintSinBajar(text);
        },
        read: async (varName) => {
          if (signal.aborted) throw new Error('EJECUCION_CANCELADA');
          this.isWaitingInput = true;
          io.onWaitInputState(true);

          const value = await new Promise((resolve) => {
            this.inputResolver = resolve;
            io.onRequestInput(varName, (userInput) => {
              this.inputResolver = null;
              this.isWaitingInput = false;
              io.onWaitInputState(false);
              resolve({ value: userInput });
            });
          });

          if (value.cancelled || signal.aborted) {
            throw new Error('EJECUCION_CANCELADA');
          }

          const raw = (value.value != null ? value.value.toString().trim() : '');
          // Si es numérico puro, retornamos número
          if (raw !== '' && !isNaN(Number(raw))) {
            return Number(raw);
          }
          if (raw.toLowerCase() === 'verdadero') return true;
          if (raw.toLowerCase() === 'falso') return false;
          return raw;
        },
        step: async () => {
          if (signal.aborted) throw new Error('EJECUCION_CANCELADA');
          this.stepCount++;
          if (this.stepCount > this.maxSteps) {
            throw new Error('BUCLE_INFINITO');
          }
          // Ceder el hilo de ejecución periódicamente para que la interfaz web permanezca fluida
          if (this.stepCount % 500 === 0) {
            await new Promise(r => setTimeout(r, 0));
          }
        }
      };

      try {
        const jsCode = transpilePseint(code);
        const wrappedCode = `
          ${jsCode}
          if (typeof __main === 'function') {
            return __main();
          } else {
            throw new Error('NO_MAIN_ALGORITMO');
          }
        `;

        const runner = new Function(
          '__term',
          '__createMatrix',
          '__pseint_longitud',
          '__pseint_subcadena',
          '__pseint_mayusculas',
          '__pseint_minusculas',
          '__pseint_aleatorio',
          '__pseint_azar',
          wrappedCode
        );

        io.onStart();

        await runner(
          __term,
          this.createMatrix.bind(this),
          this.longitud.bind(this),
          this.subcadena.bind(this),
          this.mayusculas.bind(this),
          this.minusculas.bind(this),
          this.aleatorio.bind(this),
          this.azar.bind(this)
        );

        this.isRunning = false;
        io.onFinish(0);
      } catch (err) {
        this.isRunning = false;
        if (err.message === 'EJECUCION_CANCELADA') {
          io.onCancel();
        } else if (err.message === 'BUCLE_INFINITO') {
          io.onError(`Límite de ejecución excedido (${this.maxSteps} pasos). Se detectó un posible bucle infinito (Mientras/Repetir/Para sin condición de salida).`);
        } else if (err.message === 'NO_MAIN_ALGORITMO') {
          io.onError('No se detectó un bloque canónico "Algoritmo ... FinAlgoritmo" en el código.');
        } else {
          io.onError(`Error de ejecución: ${err.message}`);
        }
      } finally {
        this.isRunning = false;
        this.isWaitingInput = false;
        io.onWaitInputState(false);
      }
    }
  }

  // Exportar globalmente
  window.PseintInterpreter = {
    transpile: transpilePseint,
    VM: PseintVirtualVM
  };
})();
