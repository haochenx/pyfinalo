// Mock implementation for testing without built bundles

// Mock pyfinalo_js
window.pyfinalo_js = {
  str: (value) => ({ type: 'string', value: String(value) }),
  int: (value) => ({ type: 'int', value: parseInt(value) }),
  add: (a, b) => {
    if (a.type === 'string' && b.type === 'string') {
      return { type: 'string', value: a.value + b.value };
    }
    if (a.type === 'int' && b.type === 'int') {
      return { type: 'int', value: a.value + b.value };
    }
    throw new Error('Type mismatch in add operation');
  },
  mul: (a, b) => {
    if (a.type === 'int' && b.type === 'int') {
      return { type: 'int', value: a.value * b.value };
    }
    if (a.type === 'string' && b.type === 'int') {
      return { type: 'string', value: a.value.repeat(b.value) };
    }
    throw new Error('Type mismatch in mul operation');
  },
  len: (expr) => ({ type: 'int', value: expr.value.length }),
  show: (expr) => `${expr.type}(${expr.value})`
};

// Export mock REPL creators
window.mockJsRepl = {
  createJavaScriptRepl: () => ({
    evaluate: (code) => {
      try {
        const func = new Function('str', 'int', 'add', 'mul', 'len', 'show', `
          // Make functions available in scope
          const _str = str;
          const _int = int;
          const _add = add;
          const _mul = mul;
          const _len = len;
          const _show = show;
          
          // Execute user code and capture the last expression
          let __result;
          ${code.split('\n').map(line => {
            // Skip comments and empty lines
            if (line.trim().startsWith('//') || line.trim() === '') return line;
            // For the last non-empty line, capture the result
            return `__result = ${line}`;
          }).join('\n')}
          
          return __result;
        `);
        
        const result = func(
          window.pyfinalo_js.str,
          window.pyfinalo_js.int,
          window.pyfinalo_js.add,
          window.pyfinalo_js.mul,
          window.pyfinalo_js.len,
          window.pyfinalo_js.show
        );
        
        if (result && result.type) {
          return window.pyfinalo_js.show(result);
        }
        return result !== undefined ? String(result) : 'undefined';
      } catch (error) {
        return `Error: ${error.message}`;
      }
    }
  })
};

window.mockPythonRepl = {
  createPythonRepl: async () => ({
    ready: Promise.resolve(),
    evaluate: async (code) => {
      // Simple mock that just returns a message
      return `Python runtime not available in mock mode. Code received:\n${code}`;
    }
  })
};