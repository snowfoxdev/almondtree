const R = require("ramda");
const getToken = require("../tokens");

test("(", () => {
  expect(getToken("(")).toEqual([{ value: /^\($/ }]);

  expect(getToken("(1")).toEqual([]);
});

test(")", () => {
  expect(getToken(")")).toEqual([{ value: /^\)$/ }]);
});

test("nums", () => {
  expect(getToken("123.2312")).toEqual([
    { value: /^[\d\.]+$/ },
    {
      value: /^[0-9a-zA-Z_\.]+$/,
    },
  ]);
});

test("+", () => {
  expect(getToken("+")).toEqual([{ value: /^\+$/ }]);
});

test(`single quote`, () => {
  expect(getToken(`'this is a test'`)).toEqual([{ value: /^'[^']*'?$/ }]);
});

test(`double quote`, () => {
  expect(getToken(`"this is a test"`)).toEqual([{ value: /^"[^"]*"?$/ }]);
});

test(`Regex`, () => {
  expect(getToken(`/a+-!@#$%^&*()()() [] /`)).toEqual([
    { value: /^\/[^\/]*\/?$/ },
  ]);
});

test(`comment`, () => {
  expect(getToken(`; this  is a comment!!! `)).toEqual([{ value: /^;.*\n?$/ }]);
});
