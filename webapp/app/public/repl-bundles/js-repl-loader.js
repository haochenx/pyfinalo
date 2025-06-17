// Loader for JavaScript REPL module
import { createJavaScriptRepl as originalCreateJavaScriptRepl } from './js-repl.js';

// Get pyfinalo from window (it should be set by the original module)
const pyfinalo = window.pyfinalo;

// Create a wrapper that properly handles return values
function createJavaScriptRepl() {
  const originalRepl = originalCreateJavaScriptRepl();

  return {
    evaluate(code) {
      // Remove single-line comments for analysis
      const codeWithoutComments = code
        .split('\n')
        .map(line => {
          const commentIndex = line.indexOf('//');
          return commentIndex >= 0 ? line.substring(0, commentIndex) : line;
        })
        .join('\n')
        .trim();

      // Check if it's a simple expression (no explicit return, no semicolons, no braces)
      const isSimpleExpression = codeWithoutComments.length > 0 &&
        !codeWithoutComments.includes('return') &&
        !codeWithoutComments.includes(';') &&
        !codeWithoutComments.includes('{') &&
        !codeWithoutComments.includes('}');

      if (isSimpleExpression) {
        // Wrap in return statement to capture the value
        if (code.includes("show(")) {
          return originalRepl.evaluate(`return (\n${code}\n)`);
        } else {
          return originalRepl.evaluate(`return show(\n${code}\n)`);
        }
      } else {
        // For complex code, let it handle its own returns
        return originalRepl.evaluate(code);
      }
    }
  };
}

// Make it available globally
window.createJavaScriptRepl = createJavaScriptRepl;