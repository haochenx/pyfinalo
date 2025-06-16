Interactive greetings:
  $ echo | pyfinalo_py
  == Pyfinalo Python REPL ==
  Try `import pyfinalo         as p; print(p.show(p.add(p.len(p.str("hello")), p.int(3))))`
  Or `import pyfinalo_ast     as p; print(p.show(p.add(p.len(p.str("hello")), p.int(3))))`
  Or `import pyfinalo_explain as p; print(p.show(p.add(p.len(p.str("hello")), p.int(3))))`
  >>> >>>

Test suite suite1.py:

  $ cat suite1.py | pyfinalo_py -
  >> ex1 (well-typed)
  pyfinalo: 15
  pyfinalo_ast: len("hello")*3
  pyfinalo_explain: len("hello")*3 evaluates to integer 15

  >> ex2 (ill-typed)
  pyfinalo_explain: len("hi")+len(3) contains ill-typed subterm len(3)
