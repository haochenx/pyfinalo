import pyfinalo from 'pyfinalo_js';

export interface JavaScriptRepl {
  evaluate: (code: string) => string;
}

// Make pyfinalo available globally for the REPL
(window as any).pyfinalo = pyfinalo;

export function createJavaScriptRepl(): JavaScriptRepl {
  return {
    evaluate(code: string): string {
      try {
        // Create a sandboxed evaluation context
        const func = new Function(
          'str', 'int', 'add', 'mul', 'len', 'show', 'pyfinalo',
          `
          // Helper class for chaining operations
          class Expr {
            constructor(jsExpr) {
              this._expr = jsExpr;
            }

            add(other) {
              if (other instanceof Expr) {
                return new Expr(add(this._expr, other._expr));
              }
              return new Expr(add(this._expr, other));
            }

            mul(other) {
              if (other instanceof Expr) {
                return new Expr(mul(this._expr, other._expr));
              }
              return new Expr(mul(this._expr, other));
            }

            toString() {
              return show(this._expr);
            }
          }

          // Wrap the basic functions to return Expr instances
          const _str = (value) => new Expr(str(value));
          const _int = (value) => new Expr(int(value));

          // Evaluate user code and return the result
          return (() => { ${code} })();
          `
        );

        // Run the function with pyfinalo bindings
        const result = func(
          pyfinalo.str,
          pyfinalo.int,
          pyfinalo.add,
          pyfinalo.mul,
          pyfinalo.len,
          pyfinalo.show,
          pyfinalo
        );

        // Convert result to string
        if (result === undefined) {
          return 'undefined';
        } else if (result === null) {
          return 'null';
        } else if (typeof result === 'object' && result._expr) {
          // If it's an Expr object, show it
          return pyfinalo.show(result._expr);
        } else {
          return String(result);
        }
      } catch (error) {
        return `Error: ${error.message}`;
      }
    }
  };
}
