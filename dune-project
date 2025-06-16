(lang dune 3.7)
(name pyfinalo)

(generate_opam_files true)
(package
 (name pyfinalo)
 (synopsis "pyfinalo")
 (license MIT)
 (depends
  
  ;; for src/bin_pyfinalo_py
  ;; unnecessary otherwise
  (pyml (>= 20231101))
  
  ;; for src/lib_pyfinalo_js
  js_of_ocaml
  js_of_ocaml-ppx
  
  (alcotest :with-test)
))
