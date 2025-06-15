import pyfinalo
import pyfinalo_ast
import pyfinalo_explain

def ex1(lang):
  l = lang
  return l.mul(l.len(l.str("hello")), l.int(3))

def ex2_ill(lang):
  l = lang
  return l.add(l.len(l.str("hi")), l.len(l.int(3)))

def test_case(desc, lang, expr):
  l = lang
  print(desc, l.show(expr(l)))

print(">> ex1 (well-typed)")
test_case("pyfinalo:", pyfinalo, ex1)
test_case("pyfinalo_ast:", pyfinalo_ast, ex1)
test_case("pyfinalo_explain:", pyfinalo_explain, ex1)

print()
print(">> ex2 (ill-typed)")
test_case("pyfinalo_explain:", pyfinalo_explain, ex2_ill)
