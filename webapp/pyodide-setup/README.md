# Pyodide Setup and Building Guide

This guide explains how pyodide works in the pyfinalo webapp and how to set up a development environment.

## What is Pyodide?

Pyodide is a Python runtime compiled to WebAssembly that runs in the browser. It includes:
- A full Python interpreter (CPython)
- The Python standard library
- Many popular scientific packages (NumPy, Pandas, etc.)
- Ability to install pure Python packages from PyPI

## How We Use Pyodide

In the pyfinalo webapp, we use Pyodide to:
1. Run Python code in the browser
2. Access the pyfinalo JavaScript bindings via JS interop
3. Provide a Python REPL experience without a server

The integration works by:
```
User Python Code → Pyodide → JS Interop → pyfinalo JS bindings → Result
```

## Development Setup

### 1. Basic Setup (Using Pre-built Pyodide)

For most development, you'll use the pre-built Pyodide from CDN:

```bash
cd webapp/repl-python
bun install
bun run build
```

This approach:
- Downloads Pyodide from JSDelivr CDN
- No local Python setup required
- Fastest to get started

### 2. Custom Package Development

If you need to build custom Python packages for Pyodide:

```bash
# Create Python environment
cd webapp/pyodide-setup
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install pyodide-build
pip install pyodide-build==0.26.0

# Install development dependencies
pip install -r requirements.txt
```

### 3. Building a Custom Wheel

To build a Python package for Pyodide:

```bash
# Example: Building a pure Python package
cd your-python-package
pyodide build

# The wheel will be in dist/
# Upload it to R2 or include in the bundle
```

## Requirements File

`requirements.txt`:
```
pyodide-build==0.26.0
wheel
setuptools
build
```

## Architecture

### Loading Process

1. **Initial Page Load**: Main app loads without Python runtime
2. **User Selects Python**: Triggers Pyodide loading
3. **Pyodide Download**: ~20MB download from CDN
4. **Initialization**: Set up Python environment
5. **JS Bridge Setup**: Connect to pyfinalo JS bindings
6. **Ready**: User can execute Python code

### Memory Considerations

- Pyodide uses ~100-200MB of memory when loaded
- Each Python execution shares the same runtime
- Memory is freed when the page is closed

## Integration with pyfinalo

The Python REPL bundle creates a bridge between Pyodide and pyfinalo:

```python
# In Pyodide environment
import js

# Access pyfinalo JS module
pyfinalo = js.window.pyfinalo_js

# Use pyfinalo functions
result = pyfinalo.str("hello")
print(pyfinalo.show(result))  # "hello" : string
```

Our wrapper provides Pythonic API:
```python
# Natural Python usage
expr1 = str("hello")
expr2 = str(" world")
result = expr1 + expr2  # Uses operator overloading
print(result)  # "hello world" : string
```

## Building Custom Pyodide

⚠️ **Advanced**: Only needed for deep customization

To build Pyodide from source:

```bash
# Clone Pyodide
git clone https://github.com/pyodide/pyodide.git
cd pyodide

# Install dependencies (requires Docker)
make setup

# Build Pyodide
PYODIDE_PACKAGES="core" make

# Output will be in dist/
```

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure CDN allows cross-origin requests
   - Check R2 bucket CORS configuration

2. **Memory Errors**
   - Pyodide needs ~2GB heap size
   - Some browsers limit WASM memory

3. **Module Import Errors**
   - Not all Python packages work in Pyodide
   - C extensions need special compilation

4. **Slow Loading**
   - Initial load is slow (20MB+)
   - Consider showing loading progress
   - Cache pyodide files with Service Worker

### Browser Compatibility

Pyodide requires:
- WebAssembly support
- SharedArrayBuffer (for some features)
- Modern JavaScript (ES2020+)

Supported browsers:
- Chrome 90+
- Firefox 89+
- Safari 15+
- Edge 90+

## Performance Tips

1. **Lazy Loading**: Only load Pyodide when user selects Python
2. **Caching**: Use Service Worker to cache Pyodide files
3. **Code Splitting**: Keep Pyodide bundle separate
4. **Web Workers**: Run Pyodide in Web Worker (advanced)

## Resources

- [Pyodide Documentation](https://pyodide.org/)
- [Pyodide Package List](https://pyodide.org/en/stable/usage/packages-in-pyodide.html)
- [Building Packages](https://pyodide.org/en/stable/development/building-from-sources.html)
- [JS API Reference](https://pyodide.org/en/stable/usage/api/js-api.html)