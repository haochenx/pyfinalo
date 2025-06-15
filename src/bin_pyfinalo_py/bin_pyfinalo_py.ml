open Lib_pyfinalo

let to_string_of_pp vpp x =
  Format.asprintf "%a" vpp x

module Register (L : Lang.LangBase)
         (P: sig
              val desc : string
              val string_of_repr : _ L.repr -> string
            end) = struct

  let cap', decap' = Py.Capsule.make P.desc

  let cap (type t) (x : t L.repr) = cap' (x |> Obj.magic)
  let decap(type t) po :  t L.repr = decap' po |> Obj.magic

  let register m =
    Py.Module.set m "show"
      ((fun args ->
        args.(0) |> decap
        |> P.string_of_repr
        |> Py.String.of_string
      )[@warning "-8"]
       |> Py.Callable.of_function
      );

    Py.Module.set m "str" (
        Py.Callable.of_function
        (fun args ->
        (Py.String.to_string args.(0))
        |> L.str |> cap));

    Py.Module.set m "int" (
        Py.Callable.of_function
        (fun args ->
        (Py.Int.to_int args.(0))
        |> L.int |> cap));

    Py.Module.set m "add" (
        Py.Callable.of_function
        (fun args ->
          L.add (decap args.(0)) (decap args.(1))
          |> cap));
    Py.Module.set m "mul" (
        Py.Callable.of_function
        (fun args ->
          L.mul (decap args.(0)) (decap args.(1))
          |> cap));

    Py.Module.set m "len" (
        Py.Callable.of_function
        (fun args ->
          L.len (decap args.(0))
          |> cap));

end

let register (module L : Lang.LangBase) desc string_of_repr m =
  let module P = struct
      let desc = desc
      let string_of_repr x = string_of_repr (x |> Obj.magic)
    end in
  let module M = Register(L)(P) in
  M.register m

let () =
  Py.initialize();
  register (module Interp.DirectValInterp) "DirectValInterp" (to_string_of_pp Lang.pp_irepr)
    (Py.Import.add_module "pyfinalo");
  register (module Interp.UntypedAstInterp) "UntypedAstInterp" (to_string_of_pp Lang.pp_urepr)
    (Py.Import.add_module "pyfinalo_ast");
  register (module Interp.ExplainInterpUntyped) "ExplainInterpUntyped" Interp.ExplainInterpUntyped.explain
    (Py.Import.add_module "pyfinalo_explain");

  match Sys.argv |> Array.to_list with
  | _ :: ("--help" | "-h") :: _ ->
     let help_text = {|pyfinalo_py - Tagless-final DSL exposed to Python

Usage:
  pyfinalo_py              Start interactive Python REPL
  pyfinalo_py -            Read Python script from stdin
  pyfinalo_py --help       Show this help message
  pyfinalo_py -h           Show this help message

Available modules:
  pyfinalo         - Direct value interpreter
  pyfinalo_ast     - Untyped AST interpreter  
  pyfinalo_explain - Explaining interpreter with type error messages

Example:
  import pyfinalo as p
  print(p.show(p.add(p.len(p.str("hello")), p.int(3))))|} in
     print_endline help_text
  | _ :: "-" :: _ -> Py.Run.any_file (Channel stdin) "stdin" |> ignore
  | _ ->
     let greetings =
       {|== Pyfinalo Python REPL ==
Try `import pyfinalo         as p; print(p.show(p.add(p.len(p.str("hello")), p.int(3))))`
Or `import pyfinalo_ast     as p; print(p.show(p.add(p.len(p.str("hello")), p.int(3))))`
Or `import pyfinalo_explain as p; print(p.show(p.add(p.len(p.str("hello")), p.int(3))))`|} in
     print_endline greetings;
     Py.Run.interactive()
