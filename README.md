# pyfinalo

`pyfinalo` is an experiment to implement a domain-specific language
(DSL) in the tagless-final style in OCaml and expose it to Python programs.

## Get Started

### Setup
0. Ensure you have a version of Python 3 compatible with [pyml](https://github.com/ocamllibs/pyml) in your `PATH` and `LD_LIBRARY_PATH`.
    - This package is tested with Python 3.9.13.
1. Install [OPAM](https://opam.ocaml.org/doc/2.0/Install.html).
2. Switch to or create an OPAM switch where the OCaml version is compatible with [pyml](https://github.com/ocamllibs/pyml) (e.g., 4.14.1).
    - You can create a switch with OCaml 4.14.1 with the command `opam switch create 4.14.1`, then enable it with `eval $(opam env --switch=4.14.1 --set-switch)`.
3. Install `pyfinalo`'s dependencies with `opam install . --deps-only --with-test --with-doc`.
4. Build and install `pyfinalo` with `dune build && dune install`.
    - If you do not wish to install `pyfinalo` to your PATH, you can run it with `dune exec src/bin_pyfinalo_py/bin_pyfinalo_py.exe`.
5. You can either:
   - Start `pyfinalo` interactively with `pyfinalo_py` (or with readline support as `rlwrap pyfinalo_py`).
   - Or run a script like `cat src/bin_pyfinalo_py/test/suite1.py | pyfinalo_py -`.

### Docker Alternative

If you prefer using Docker:

1. Clone and build:
   ```bash
   git clone https://github.com/haochenx/pyfinalo.git
   cd pyfinalo
   ./docker/build.sh
   ```

2. Run interactively:
   ```bash
   docker run -it pyfinalo
   # Inside container: pyfinalo_py
   ```

3. Or run a script:
   ```bash
   cat your_script.py | docker run -i --rm pyfinalo pyfinalo_py -
   ```

For development with full build environment:
```bash
./docker/build-dev.sh
docker run -it pyfinalo-dev
```

## Examples

```python
import pyfinalo as p
print(p.show(p.add(p.len(p.str("hello")), p.int(3))))
```
This prints `8` and uses the `DirectValInterp` interpreter.

You can of course import everything from `pyfinalo` for conciseness:
```python
from pyfinalo import *
print(show(add(len(str("hello")), int(3))))
```
This is equivalent to the code above.

```python
import pyfinalo_ast as p
print(p.show(p.add(p.len(p.str("hello")), p.int(3))))
```
This prints `len("hello")+3` and uses the `UntypedAstInterp` interpreter.

```python
import pyfinalo_explain as p
print(p.show(p.add(p.len(p.str("hello")), p.int(3))))
```
This prints `len("hello")+3 evaluates to integer 8` and uses the `ExplainInterpUntyped` interpreter.

```python
import pyfinalo_explain as p
print(p.show(p.add(p.len(p.int(5)), p.int(3))))
```
This prints `len(5)+3 contains ill-typed subterm len(5)` and also uses the `ExplainInterpUntyped` interpreter.
