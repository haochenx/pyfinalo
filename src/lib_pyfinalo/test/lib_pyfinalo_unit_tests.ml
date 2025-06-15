[@@@warning "-unused-value-declaration"]

open Alcotest

open Lib_pyfinalo
open Lang
open Interp

let printf fmt = Format.printf fmt
let sprintf fmt = Format.asprintf fmt
let eprintf fmt = Format.(fprintf err_formatter) fmt

let testable_irepr = testable pp_irepr (=)
let testable_urepr = testable pp_urepr (=)

let () =
  run __FILE__ [
      "DirectValInterp", [
        "add", `Quick, (
          fun () ->
          check testable_irepr "add1" (V_int 7) DirectValInterp.(
            add (int 3) (int 4)
          );
          check testable_irepr "add2" (V_int 13) DirectValInterp.(
            add (int 0) (int 13)
          );
        );

        "len", `Quick, (
          fun () ->
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

      "UntypedAstInterp", [
          "lit", `Quick, (
            fun () ->
            check testable_urepr "litint" (E_litint 3) UntypedAstInterp.(
              (int 3)
            );
            check testable_urepr "litstr" (E_litstr "hello") UntypedAstInterp.(
              (str "hello");
            );
          );
          "arith-welltyped", `Quick, (
            fun () ->
            check testable_urepr "add1" (E_add (E_litint 3, E_litint 4)) UntypedAstInterp.(
              add (int 3) (int 4)
            );
            check testable_urepr "mul1" (E_mul (E_litint 2, E_litint 13)) UntypedAstInterp.(
              mul (int 2) (int 13)
            );
          );
          "arith-illtyped", `Quick, (
            fun () ->
            check testable_urepr "add1" (E_add (E_litint 3, E_litstr "hello")) UntypedAstInterp.(
              add (int 3) (str "hello")
            );
            check testable_urepr "add2" (E_mul (E_len (E_litint 2), E_litint 13)) UntypedAstInterp.(
              mul (len (int 2)) (int 13)
            );
          );
        ];

      "TypeChecking",
      let module TypeCheckingDirectValInterp = TypeChecking(DirectValInterp) in
      let module Checked = TypeCheckingDirectValInterp in
      let test_type_checked = testable (Checked.pp_repr pp_irepr) (=) in
      [
          "lit", `Quick, (
            fun () ->
            check test_type_checked "litint" (Int_typed (V_int 3)) Checked.(
              (int 3)
            );
            check test_type_checked "litstr" (String_typed (V_str "hello")) Checked.(
              (str "hello");
            );
          );
          "arith-welltyped", `Quick, (
            fun () ->
            check test_type_checked "add1" (Int_typed (V_int 7)) Checked.(
              add (int 3) (int 4)
            );
            check test_type_checked "mul1" (Int_typed (V_int 26)) Checked.(
              mul (int 2) (int 13)
            );
            check test_type_checked "mul2" (Int_typed (V_int 26)) Checked.(
              mul (len (str "hi")) (int 13)
            );
          );
          "arith-illtyped", `Quick, (
            fun () ->
            check test_type_checked "add1" (Ill_typed) Checked.(
              add (int 3) (str "hello")
            );
            check test_type_checked "add2" (Ill_typed) Checked.(
              mul (len (int 2)) (int 13)
            );
          );
        ];
    ]
