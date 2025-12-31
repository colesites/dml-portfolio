import { isIterable } from "./isIterable";

test("returns true given an iterator", () => {
  expect(
    isIterable(
      (function* () {
        yield 2;
      })(),
    ),
  ).toEqual(true);
});

test("returns false given a regular function", () => {
  expect(isIterable((() => null)())).toEqual(false);

  expect(isIterable((() => null)())).toEqual(false);
});
