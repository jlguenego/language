export const alphabet = <T extends string>(
  ...array: readonly T[]
): Record<T, symbol> & Alphabet => {
  const result: Record<T, symbol> = {} as Record<T, symbol>;
  for (const a of array) {
    result[a] = Symbol(a);
  }
  Object.setPrototypeOf(result, Alphabet.prototype);
  return result;
};

export class Alphabet {}

export const BinaryAlphabet = alphabet('0', '1');

export const RomanAlphabet = alphabet(
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
);
