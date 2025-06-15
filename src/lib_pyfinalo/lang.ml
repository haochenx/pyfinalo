module type LangBase = sig
  type _ repr

  val int : int -> int repr
  val str : string -> string repr

  val add : int repr -> int repr -> int repr
  val mul : int repr -> int repr -> int repr

  val len : string repr -> int repr
end

module InitialAst = struct
  type _ repr =
    | V_int : int -> int repr
    | V_str : string -> string repr

  type untyped_ast =
    | E_litint : int -> untyped_ast
    | E_litstr : string -> untyped_ast
    | E_add : untyped_ast * untyped_ast -> untyped_ast
    | E_mul : untyped_ast * untyped_ast -> untyped_ast
    | E_len : untyped_ast * untyped_ast -> untyped_ast

  type _ typed_ast =
    | T_litint : int -> int typed_ast
    | T_litstr : string -> string typed_ast
    | T_add : int typed_ast * int typed_ast -> int typed_ast
    | T_mul : int typed_ast * int typed_ast -> int typed_ast
    | T_len : string typed_ast -> int typed_ast

  let pp_repr (type x) ppf : x repr -> unit = function
    | V_int x -> Format.pp_print_int ppf x
    | V_str s -> Format.pp_print_string ppf (String.escaped s)
    | _ -> .
end

type 't irepr = 't InitialAst.repr
let pp_irepr = InitialAst.pp_repr

