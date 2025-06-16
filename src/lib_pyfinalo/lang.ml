module type LangBase = sig
  type _ repr

  val int : int -> int repr
  val str : string -> string repr

  val add : int repr -> int repr -> int repr
  val mul : int repr -> int repr -> int repr

  val len : string repr -> int repr
end

module type LangUntyped = sig
  type _ repr

  val int : int -> int repr
  val str : string -> string repr

  val add : _ repr -> _ repr -> _ repr
  val mul : _ repr -> _ repr -> _ repr

  val len : _ repr -> _ repr
end

module InitialRepr = struct
  type _ valu =
    | V_int : int -> int valu
    | V_str : string -> string valu

  type 't repr = 't valu

  type _ ast =
    | T_litint : int -> int ast
    | T_litstr : string -> string ast
    | T_add : int ast * int ast -> int ast
    | T_mul : int ast * int ast -> int ast
    | T_len : string ast -> int ast

  let pp_repr (type x) ppf : x repr -> unit = function
    | V_int x -> Format.pp_print_int ppf x
    | V_str s -> Format.fprintf ppf "\"%s\"" (String.escaped s)
    | _ -> .
end

module UntypedAst = struct
  type ast =
    | E_litint : int -> ast
    | E_litstr : string -> ast
    | E_add : ast * ast -> ast
    | E_mul : ast * ast -> ast
    | E_len : ast -> ast
    | E_hole : ast

  type _ repr = ast

  let rec pp_repr (type x) ppf : x repr -> unit = function
    | E_litint x -> Format.pp_print_int ppf x
    | E_litstr s -> Format.fprintf ppf "\"%s\"" (String.escaped s)
    | E_add (e1, e2) ->
      Format.fprintf ppf "%a+%a"
        pp_repr e1
        pp_repr e2
    | E_mul (e1, e2) ->
      Format.fprintf ppf "%a*%a"
        pp_repr e1
        pp_repr e2
    | E_len e ->
      Format.fprintf ppf "len(%a)"
        pp_repr e
    | E_hole ->
      Format.fprintf ppf "??"
    | _ -> .
end

type 't typed_ast = 't InitialRepr.ast
type untyped_ast = UntypedAst.ast

type 't irepr = 't InitialRepr.repr
let pp_irepr = InitialRepr.pp_repr

type 't urepr = 't UntypedAst.repr
let pp_urepr = UntypedAst.pp_repr

