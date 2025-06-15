open Lib_pyfinalo
open Js_of_ocaml

let to_string_of_pp vpp x =
  Format.asprintf "%a" vpp x

module Register (L : Lang.LangBase)
         (P: sig
              val desc : string
              val string_of_repr : _ L.repr -> string
            end) = struct

  let register mod_name =
    Js.export mod_name object%js
        val desc_js = P.desc

        method show_js e =
          P.string_of_repr e
          |> Js.string

        method str_js s = L.str (Js.to_string s)
        method int_js x = L.int (x |> int_of_float (* NB: jsoo uses float for js numbers *))

        method add_js e1 e2 = L.add e1 e2
        method mul_js e1 e2 = L.mul e1 e2

        method len_js e = L.len e
      end
end

let register mod_name (module L : Lang.LangBase) desc string_of_repr =
  let module P = struct
      let desc = desc
      let string_of_repr x = string_of_repr (x |> Obj.magic)
    end in
  let module M = Register(L)(P) in
  M.register mod_name

let () = begin

    register "pyfinalo"
      (module Interp.CheckingDirectValInterp) "CheckingDirectValInterp"
      (to_string_of_pp Interp.CheckingDirectValInterp.(pp_repr Lang.pp_irepr));

  end
(* print_endline __FILE__ *)

