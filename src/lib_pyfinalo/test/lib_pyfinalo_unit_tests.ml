[@@@warning "-unused-value-declaration"]

open Alcotest

open Lib_pyfinalo
open Lang
open Interp

let printf fmt = Format.printf fmt
let sprintf fmt = Format.asprintf fmt
let eprintf fmt = Format.(fprintf err_formatter) fmt

let testable_irepr = testable pp_irepr (=)

let () =
  run __FILE__ [
      "simple", [
        "add", `Quick, (
          fun() ->
          check testable_irepr "add1" (V_int 7) DirectValInterp.(
            add (int 3) (int 4)
          );
          check testable_irepr "add2" (V_int 13) DirectValInterp.(
            add (int 0) (int 13)
          );
        );

        "len", `Quick, (
          fun() ->
          check testable_irepr "len1" (V_int 5) DirectValInterp.(
            (len (str "hello"))
          );
          check testable_irepr "len2" (V_int 0) DirectValInterp.(
            (len (str ""))
          );
          check testable_irepr "len3" (V_int (-2)) DirectValInterp.(
            add (int (-7)) (len (str "hello"))
          );
        );
      ];
    ]
