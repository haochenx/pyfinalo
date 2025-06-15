open Lang

open struct
  (* local helper functions *)

  [@@@warning "-unused-value-declaration"]

  let uncurry (f : 'a*'b -> 'c) : 'a -> 'b -> 'c =
    fun x -> fun y -> f (x, y)
  let (&) x y = x y
end

module DirectValInterp = struct
  type 't repr = 't irepr
  open InitialRepr

  let int x = V_int x
  let str x = V_str x

  let add (V_int x) (V_int y) = V_int (x + y)
  let mul (V_int x) (V_int y) = V_int (x * y)

  let len (V_str s) = V_int (String.length s)
end

(* module signature check *)
module _ : Lang.LangBase = DirectValInterp

module UntypedAstInterp = struct
  type 't repr = 't urepr
  open UntypedAst

  let int x = E_litint x
  let str x = E_litstr x

  let add x y = E_add (x, y)
  let mul x y = E_mul (x, y)

  let len s = E_len s
end

(* module signature check *)
module _ : Lang.LangUntyped = UntypedAstInterp
module _ : Lang.LangBase = UntypedAstInterp

module type Consumer = sig
  module Tgt : Lang.LangBase
  type r
  val consume : _ Tgt.repr -> r
end

type 'r consumer = (module Consumer with type r = 'r)

module TypeChecking (Tgt : Lang.LangBase) = struct
  type 't repr =
    | Int_typed : int Tgt.repr -> _ repr
    | String_typed : string Tgt.repr -> _ repr
    | Ill_typed : _ repr

  let int x = Int_typed (Tgt.int x)
  let str s = String_typed (Tgt.str s)

  let add e1 e2 =
    match e1, e2 with
    | (Int_typed e1),
      (Int_typed e2)
      -> Int_typed (Tgt.add e1 e2)
    | _ -> Ill_typed

  let mul e1 e2 =
    match e1, e2 with
    | (Int_typed (e1 : int Tgt.repr)),
      (Int_typed (e2 : int Tgt.repr))
      -> Int_typed (Tgt.mul e1 e2)
    | _ -> Ill_typed

  let len = function
    | (String_typed (e : string Tgt.repr))
      -> Int_typed (Tgt.len e)
    | _ -> Ill_typed

  let pp_repr (vppf : Format.formatter -> _ Tgt.repr -> unit) ppf : _ repr -> unit = function
    | Int_typed v -> Format.fprintf ppf "%a : int" vppf (Obj.magic v)
    | String_typed v -> Format.fprintf ppf "%a : string" vppf (Obj.magic v)
    | Ill_typed -> Format.fprintf ppf "ill-typed"

end

module _ (Tgt : Lang.LangBase) : Lang.LangUntyped = TypeChecking(Tgt)
