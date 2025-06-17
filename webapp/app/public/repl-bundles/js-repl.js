// src/index.ts
var pyfinalo;
async function initializePyfinalo() {
  if (window.pyfinalo) {
    pyfinalo = window.pyfinalo;
  } else {
    try {
      const module = await import('/repl-bundles/pyfinalo_js.js');
      pyfinalo = module.default || module;
      window.pyfinalo = pyfinalo;
    } catch (e) {
      console.error("Failed to load pyfinalo module:", e);
      throw new Error("pyfinalo module not found");
    }
  }
}
initializePyfinalo().catch(console.error);
function createJavaScriptRepl() {
  return {
    evaluate(code) {
      try {
        const func = new Function(
          "str",
          "int",
          "add",
          "mul",
          "len",
          "show",
          "pyfinalo",
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
        const result = func(
          pyfinalo.str,
          pyfinalo.int,
          pyfinalo.add,
          pyfinalo.mul,
          pyfinalo.len,
          pyfinalo.show,
          pyfinalo
        );
        if (result === void 0) {
          return "undefined";
        } else if (result === null) {
          return "null";
        } else if (typeof result === "object" && result._expr) {
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

export { createJavaScriptRepl };
