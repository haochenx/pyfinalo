# pyfinalo

A demo project exploring tagless-final DSL implementation in OCaml with Python bindings.

## Overview

`pyfinalo` is an experimental domain-specific language (DSL) implementation that showcases the feasibility to implement powerful eDSL usable in Python backed by implementation in OCaml in the tagless-final style. The project provides multiple interpreters including direct evaluation, AST construction, and explanatory type checking.

### Key Features

- **Tagless-Final Architecture**: Clean DSL implementation without intermediate abstract syntax trees
- **Multiple Interpreters**: Direct evaluation, AST construction, and explanatory type checking
- **Python Integration**: Seamless Python bindings via [pyml](https://github.com/ocamllibs/pyml)
- **Type Safety**: Demonstrates both well-typed and ill-typed expression handling
- **Docker Support**: Containerized development and execution environment

## Quick Start

### Prerequisites

- **Python**: Version 3.9+ (tested with 3.9.13)
- **OCaml**: Version 4.14.1 or compatible with pyml
- **OPAM**: OCaml package manager

### Installation

#### Option 1: Native Installation

1. **Install OPAM**: Follow the [official installation guide](https://opam.ocaml.org/doc/2.0/Install.html)

2. **Setup OCaml Environment**:
   ```bash
   opam switch create 4.14.1
   eval $(opam env --switch=4.14.1 --set-switch)
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

#### Option 2: Docker (Recommended for Quick Testing)

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

## Usage Examples

### Direct Evaluation
```python
import pyfinalo as p
result = p.show(p.add(p.len(p.str("hello")), p.int(3)))
print(result)  # Output: 8
```

### Concise Syntax
```python
from pyfinalo import *
result = show(add(len(str("hello")), int(3)))
print(result)  # Output: 8
```

### AST Construction
```python
import pyfinalo_ast as p
ast = p.show(p.add(p.len(p.str("hello")), p.int(3)))
print(ast)  # Output: len("hello")+3
```

### Type Checking with Explanation
```python
import pyfinalo_explain as p

# Well-typed expression
result = p.show(p.add(p.len(p.str("hello")), p.int(3)))
print(result)  # Output: len("hello")+3 evaluates to integer 8

# Ill-typed expression
error = p.show(p.add(p.len(p.int(5)), p.int(3)))
print(error)   # Output: len(5)+3 contains ill-typed subterm len(5)
```

## Available Interpreters

- **`pyfinalo`**: Direct value interpreter (`DirectValInterp`) - evaluates expressions immediately
- **`pyfinalo_ast`**: AST interpreter (`UntypedAstInterp`) - generates abstract syntax trees
- **`pyfinalo_explain`**: Explanatory interpreter (`ExplainInterpUntyped`) - provides detailed type checking

## Development

### Testing
```bash
dune runtest
```

### Project Structure
```
src/
├── lib_pyfinalo/          # Core DSL implementation
│   ├── lang.ml           # Language definitions and interpreters
│   ├── interp.ml         # Interpreter implementations
│   └── test/             # Tests
└── bin_pyfinalo_py/      # Python bindings
    ├── bin_pyfinalo_py.ml # Main executable
    └── test/             # Integration tests
```

## Contributing

This is a quick demo exploring DSL implementation patterns. Contributions, issues, and discussions about the tagless-final approach are welcome.

