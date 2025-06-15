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

module TypeChecking (Tgt : Lang.LangBase) = struct
  type ast = UntypedAst.ast

  type 't repr =
    | Int_typed : int Tgt.repr * ast -> _ repr
    | String_typed : string Tgt.repr * ast -> _ repr
    | Ill_typed : ast -> _ repr

  let int x = Int_typed (Tgt.int x, UntypedAstInterp.int x)
  let str s = String_typed (Tgt.str s, UntypedAstInterp.str s)

  let ast = function
    | Int_typed (_, term) -> term
    | String_typed (_, term) -> term
    | Ill_typed term -> term

  open struct
      (* local helper functions *)

      let sub_ill2 e1 e2 otherwise = match e1, e2 with
        | Ill_typed term, _ -> Ill_typed term
        | _, Ill_typed term -> Ill_typed term
        | _ -> otherwise
    end

  let add e1 e2 =
    let term = UntypedAstInterp.add (ast e1) (ast e2) in
    match e1, e2 with
    | (Int_typed (e1, _)),
      (Int_typed (e2, _))
      -> Int_typed (Tgt.add e1 e2, term)
    | _ -> sub_ill2 e1 e2 (Ill_typed term)

  let mul e1 e2 =
    let term = UntypedAstInterp.mul (ast e1) (ast e2) in
    match e1, e2 with
    | (Int_typed (e1, _)),
      (Int_typed (e2, _))
      -> Int_typed (Tgt.mul e1 e2, term)
    | _ -> sub_ill2 e1 e2 (Ill_typed term)

  let len e =
    let term = UntypedAstInterp.len (ast e) in
    match e with
    | (String_typed (e, _))
      -> Int_typed (Tgt.len e, term)
    | Ill_typed term -> Ill_typed term
    | _ -> Ill_typed term

  let pp_repr (vppf : Format.formatter -> _ Tgt.repr -> unit) ppf : _ repr -> unit = function
    | Int_typed (v, _) -> Format.fprintf ppf "%a : int" vppf (Obj.magic v)
    | String_typed (v, _) -> Format.fprintf ppf "%a : string" vppf (Obj.magic v)
    | Ill_typed term -> Format.fprintf ppf "ill-typed:%a" pp_urepr term

end

(* module signature check *)
module _ (Tgt : Lang.LangBase) : Lang.LangUntyped = TypeChecking(Tgt)
module _ (Tgt : Lang.LangUntyped) : Lang.LangUntyped = TypeChecking(Tgt)

module ExplainInterpTyped = struct
  type ast = UntypedAst.ast
  type 't repr = 't irepr * ast

  let explain (v, term) =
    Format.asprintf "%a evaluates to %a"
      pp_urepr term
      pp_irepr v

  let int x = DirectValInterp.int x, UntypedAstInterp.int x
  let str s = DirectValInterp.str s, UntypedAstInterp.str s

  let add (x, x') (y, y') = DirectValInterp.add x y, UntypedAstInterp.add x' y'
  let mul (x, x') (y, y') = DirectValInterp.mul x y, UntypedAstInterp.mul x' y'

  let len (s, s') = DirectValInterp.len s, UntypedAstInterp.len s'
end

(* module signature check *)
module _ : Lang.LangBase = ExplainInterpTyped

module ExplainInterpUntyped = struct
  module Checker = TypeChecking(DirectValInterp)

  type 't res = 't Checker.repr
  type ast = UntypedAst.ast
  type 't repr = 't res * ast

  let explain (v, term) =
    match v with
    | Checker.Ill_typed sub when sub = term ->
       Format.asprintf "%a is ill-typed"
         pp_urepr term
    | Checker.Ill_typed sub ->
       Format.asprintf "%a contains ill-typed subterm %a"
         pp_urepr term
         pp_urepr sub
    | Checker.Int_typed (v, _) ->
       Format.asprintf "%a evaluates to integer %a"
         pp_urepr term
         pp_irepr v
    | Checker.String_typed (v, _) ->
       Format.asprintf "%a evaluates to string %a"
         pp_urepr term
         pp_irepr v
    | _ -> .

  let int x = Checker.int x, UntypedAstInterp.int x
  let str s = Checker.str s, UntypedAstInterp.str s

  let add (x, x') (y, y') = Checker.add x y, UntypedAstInterp.add x' y'
  let mul (x, x') (y, y') = Checker.mul x y, UntypedAstInterp.mul x' y'

  let len (s, s') = Checker.len s, UntypedAstInterp.len s'
end

(* module signature check *)
module _ : Lang.LangUntyped = ExplainInterpUntyped
module _ : Lang.LangBase = ExplainInterpUntyped
