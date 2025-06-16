# pyfinalo

A demo project exploring tagless-final DSL implementation in OCaml with Python bindings.

## Overview

`pyfinalo` is an experimental domain-specific language (DSL) implementation that showcases the feasibility to implement powerful eDSL usable in Python and JavaScript/TypeScript backed by implementation in OCaml in the tagless-final style. The project provides multiple interpreters including direct evaluation, AST construction, and explanatory type checking.

### A Note on the Name

This project was originally intended as a demonstration of Python eDSL implementation using OCaml in the tagless-final style - hence the portmanteau "pyfinalo" (Python + Final + OCaml). JavaScript/TypeScript support was added later completely by accident, making the project name somewhat of a misnomer.

### Key Features

- **Tagless-Final Architecture**: Clean DSL implementation without intermediate abstract syntax trees
- **Multiple Interpreters**: Direct evaluation, AST construction, and explanatory type checking
- **Python Integration**: Seamless Python bindings via [pyml](https://github.com/ocamllibs/pyml)
- **JavaScript/TypeScript Integration**: JavaScript bindings via [js_of_ocaml](https://ocsigen.org/js_of_ocaml/)
- **Docker Support**: Containerized development and execution environment

## Quick Start

### Prerequisites

> ⚠️ **OCaml 5.3 Compatibility Warning**
>
> Avoid OCaml 5.3 (or later) due to compatibility issues with pyml. This is caused by [stdcompat issue #36](https://github.com/ocamllibs/stdcompat/issues/36) in stdcompat, a dependency of pyml. After this issue is resolved, a new version of stdcompat containing the fix needs to be released to opam before OCaml 5.3+ can be supported.

- **Python**: Version 3.9+ (tested with 3.9.13) - Note: as warned above, Python bindings require OCaml < 5.3 for now
- **OCaml**: Version 5.1 or compatible with pyml and js_of_ocaml
- **OPAM**: OCaml package manager
- **Bun**: JavaScript runtime and package manager (for JavaScript bindings)

### Installation

#### Option 1: Native Installation

1. **Install OPAM**: Follow the [official installation guide](https://opam.ocaml.org/doc/2.0/Install.html)

2. **Setup OCaml Environment**:
   ```bash
   opam switch create 5.1
   eval $(opam env --switch=5.1 --set-switch)
   ```

3. **Install Dependencies**:
   ```bash
   opam install . --deps-only --with-test --with-doc
   ```

4. **Build and Install**:
   ```bash
   dune build && dune install
   ```

5. **Run**:
   ```bash
   # Interactive mode (with readline support)
   rlwrap pyfinalo_py
   
   # Or run a script
   cat src/bin_pyfinalo_py/test/suite1.py | pyfinalo_py -
   
   # Without installation
   dune exec src/bin_pyfinalo_py/bin_pyfinalo_py.exe
   ```

#### Option 2: Docker

1. **Clone and Build**:
   ```bash
   git clone https://github.com/haochenx/pyfinalo.git
   cd pyfinalo
   ./docker/build.sh
   ```

2. **Run Interactive Session**:
   ```bash
   docker run -it pyfinalo
   # Inside container: pyfinalo_py
   ```

3. **Execute Scripts**:
   ```bash
   cat your_script.py | docker run -i --rm pyfinalo pyfinalo_py -
   ```

4. **Development Environment**:
   ```bash
   ./docker/build-dev.sh
   docker run -it pyfinalo-dev
   ```
   
   Note: The development container includes Bun for JavaScript/TypeScript development.

## Usage Examples

### Python

#### Direct Evaluation
```python
import pyfinalo as p
result = p.show(p.add(p.len(p.str("hello")), p.int(3)))
print(result)  # Output: 8
```

#### Concise Syntax
```python
from pyfinalo import *
result = show(add(len(str("hello")), int(3)))
print(result)  # Output: 8
```

#### AST Construction
```python
import pyfinalo_ast as p
ast = p.show(p.add(p.len(p.str("hello")), p.int(3)))
print(ast)  # Output: len("hello")+3
```

#### Type Checking with Explanation
```python
import pyfinalo_explain as p

# Well-typed expression
result = p.show(p.add(p.len(p.str("hello")), p.int(3)))
print(result)  # Output: len("hello")+3 evaluates to integer 8

# Ill-typed expression
error = p.show(p.add(p.len(p.int(5)), p.int(3)))
print(error)   # Output: len(5)+3 contains ill-typed subterm len(5)
```

### JavaScript/TypeScript

```javascript
import pyfinalo from 'pyfinalo_js';
// or alias for conciseness
import p from 'pyfinalo_js';

// Direct evaluation
const result = pyfinalo.show(p.add(p.int(5), p.int(3)));
console.log(result); // Output: "8 : int"

// String operations
const strResult = pyfinalo.show(p.len(p.str("hello")));
console.log(strResult); // Output: "5 : int"

// Complex expressions
const complex = pyfinalo.show(
  p.add(
    p.mul(p.int(2), p.int(3)),
    p.int(4)
  )
);
console.log(complex); // Output: "10 : int"
```

## Available Interpreters

### Python Modules
- **`pyfinalo`**: Direct value interpreter (`DirectValInterp`) - evaluates expressions immediately
- **`pyfinalo_ast`**: AST interpreter (`UntypedAstInterp`) - generates abstract syntax trees
- **`pyfinalo_explain`**: Explanatory interpreter (`ExplainInterpUntyped`) - provides detailed type checking

### JavaScript/TypeScript Module
- **`pyfinalo_js`**: Type checking interpreter available as an npm package (note: not published to npmjs.com)

To use the JavaScript module in your project after building:
```bash
# After building in src/lib_pyfinalo_js
cd your-project
bun add file:../path/to/pyfinalo/src/lib_pyfinalo_js
# or
npm link ../path/to/pyfinalo/src/lib_pyfinalo_js
```

## Development

### Building JavaScript Bindings

```bash
# Install dependencies
cd src/lib_pyfinalo_js
bun install

# Build the JavaScript module
bun run build

# Run JavaScript tests
bun run test
```

### Testing
```bash
# OCaml tests (includes Python tests - cram tests under lib_pyfinalo_js/test)
dune runtest

# JavaScript tests
cd src/lib_pyfinalo_js && bun test
```

### Project Structure
```
src/
├── lib_pyfinalo/          # Core DSL implementation
│   ├── lang.ml           # Language definitions and interpreters
│   ├── interp.ml         # Interpreter implementations
│   └── test/             # Tests
├── bin_pyfinalo_py/      # Python bindings
│   ├── bin_pyfinalo_py.ml # Main executable
│   └── test/             # Integration tests
└── lib_pyfinalo_js/      # JavaScript/TypeScript bindings
    ├── lib_pyfinalo_js.ml # js_of_ocaml entry point
    ├── wrapper.js        # JavaScript wrapper
    ├── package.json      # NPM package configuration
    └── test/             # JavaScript tests
```

