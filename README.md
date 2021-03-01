# Language

Alphabet and Language utility in Javascript (and Typescript).

Library to be used as a base for parsers.
Utilities about alphabets (set of characters), strings (also called word or sentence), languages (set of strings)

This library covers the concept exposed in the 1972 book from Aho & Ullman, The Theory of Parsing, Translation, and Compiling.

## Install

```
npm i @jlguenego/language
```

This library exposes both:

- **ES2015** module that can be tree-shaked by Webpack for Angular etc.
- **CommonJS** module for traditionnal node way.

It is ready to use for both browsers and node app.

## Usage

```ts
const binaryAlphabet = new Alphabet(0, 1);
const romanAlphabet = new Alphabet(
  a,
  b,
  c,
  d,
  e,
  f,
  g,
  h,
  i,
  j,
  k,
  l,
  m,
  n,
  o,
  p,
  q,
  r,
  s,
  t,
  u,
  v,
  w,
  x,
  y,
  z
);

const word = new Word<typeof romanAlphabet>(['h', 'e', 'l', 'l', 'o']);
// etc.
```

## API

[See the typedoc documentation](./docs/api/modules.md)

## Examples

[See all examples in the test suite.](./test)

## Participating

Do not hesitate to bring your contribution to this project. Fork and Pull Request are welcome.

## Bibliography

- [Aho & Ullman, The Theory of Parsing, Translation, and Compiling](https://dl.acm.org/doi/book/10.5555/578789)

## License

ISC

## Author

Jean-Louis GUENEGO <jlguenego@gmail.com>
