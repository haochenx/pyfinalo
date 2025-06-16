import { test, expect } from "bun:test";
import pyfinalo from "../dist/index.js";

const p = pyfinalo;

test("pyfinalo module exists", () => {
  expect(p).toBeDefined();
});

test("desc property is non-empty string", () => {
  expect(typeof p.desc).toBe("string");
  expect(p.desc.length).toBeGreaterThan(0);
});

test("create string value", () => {
  expect(p.str("hello")).toBeDefined();
});

test("create int value", () => {
  expect(p.int(42)).toBeDefined();
});

test("show string value", () => {
  const result = p.show(p.str("hello"));
  expect(result).toBe('"hello" : string');
});

test("show int value", () => {
  const result = p.show(p.int(42));
  expect(result).toBe("42 : int");
});

test("add two integers", () => {
  const result = p.show(p.add(p.int(5), p.int(3)));
  expect(result).toBe("8 : int");
});

test("multiply two integers", () => {
  const result = p.show(p.mul(p.int(4), p.int(6)));
  expect(result).toBe("24 : int");
});

test("length of string", () => {
  const result = p.show(p.len(p.str("hello")));
  expect(result).toBe("5 : int");
});

test("nested arithmetic", () => {
  const result = p.show(p.add(p.mul(p.int(2), p.int(3)), p.int(4)));
  expect(result).toBe("10 : int");
});

test("complex expression", () => {
  const result = p.show(p.len(p.str("world")));
  expect(result).toBe("5 : int");
});

test("empty string", () => {
  const result = p.show(p.str(""));
  expect(result).toBe('"" : string');
});

test("zero", () => {
  const result = p.show(p.int(0));
  expect(result).toBe("0 : int");
});

test("negative number", () => {
  const result = p.show(p.int(-42));
  expect(result).toBe("-42 : int");
});

test("type error - add string to int", () => {
  const expr = p.add(p.str("hello"), p.int(5));
  const result = p.show(expr);
  expect(result).toBe('ill-typed:"hello"+5');
});

test("type error - multiply string", () => {
  const expr = p.mul(p.str("hello"), p.str("world"));
  const result = p.show(expr);
  expect(result).toBe('ill-typed:"hello"*"world"');
});

test("type error - length of int", () => {
  const expr = p.len(p.int(42));
  const result = p.show(expr);
  expect(result).toBe('ill-typed:len(42)');
});

test("type error - add mismatched types", () => {
  const expr = p.add(p.int(5), p.str("test"));
  const result = p.show(expr);
  expect(result).toBe('ill-typed:5+"test"');
});

test("deeply nested arithmetic", () => {
  const result = p.show(p.mul(p.add(p.int(2), p.int(3)), p.add(p.int(4), p.int(6))));
  expect(result).toBe("50 : int");
});

test("string length composition", () => {
  const result = p.show(p.add(p.len(p.str("hello")), p.len(p.str("world"))));
  expect(result).toBe("10 : int");
});

test("complex nested expression with strings", () => {
  const result = p.show(p.mul(p.len(p.str("test")), p.add(p.int(2), p.int(3))));
  expect(result).toBe("20 : int");
});

test("type error in nested expression", () => {
  const expr = p.add(p.len(p.str("hello")), p.str("world"));
  const result = p.show(expr);
  expect(result).toBe('ill-typed:len("hello")+"world"');
});

test("deep type error propagation", () => {
  const expr = p.mul(p.add(p.int(5), p.str("bad")), p.int(3));
  const result = p.show(expr);
  expect(result).toBe('ill-typed:5+"bad"');
});

test("multiple length operations", () => {
  const result = p.show(p.mul(p.len(p.str("ab")), p.len(p.str("xyz"))));
  expect(result).toBe("6 : int");
});

test("arithmetic with zero and negative", () => {
  const result = p.show(p.add(p.mul(p.int(-3), p.int(4)), p.int(0)));
  expect(result).toBe("-12 : int");
});

test("length of empty string in expression", () => {
  const result = p.show(p.mul(p.len(p.str("")), p.int(100)));
  expect(result).toBe("0 : int");
});

test("chained type errors", () => {
  const expr = p.len(p.add(p.str("hello"), p.int(5)));
  const result = p.show(expr);
  expect(result).toBe('ill-typed:"hello"+5');
});

test("mixed valid and invalid in same expression", () => {
  const expr = p.add(p.len(p.str("valid")), p.len(p.int(42)));
  const result = p.show(expr);
  expect(result).toBe('ill-typed:len(42)');
});
