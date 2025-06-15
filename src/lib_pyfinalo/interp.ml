open Lang

module DirectValInterp = struct
  type 't repr = 't InitialAst.repr

  open InitialAst

  let int x = V_int x
  let str x = V_str x

  let add (V_int x) (V_int y) = V_int (x + y)
  let mul (V_int x) (V_int y) = V_int (x * y)

  let len (V_str s) = V_int (String.length s)
end

(* module signature check *)
module _ : Lang.LangBase = DirectValInterp

