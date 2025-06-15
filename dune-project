(lang dune 3.7)
(name pyfinalo)

(generate_opam_files true)
(package
 (name pyfinalo)
 (synopsis "pyfinalo")
 (depends
  
  ;; for src/bin_pyfinalo_py
  ;; unnecessary otherwise
  (pyml (>= 20231101))
  (alcotest :with-test)
))
