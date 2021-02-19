export const Alphabet = <T extends string>(
  ...array: readonly T[]
): Record<T, symbol> => {
  const result: Record<T, symbol> = {} as Record<T, symbol>;
  for (const a of array) {
    result[a] = Symbol(a);
  }
  return result;
};

export const BinaryAlphabet = Alphabet('0', '1');

export const RomanAlphabet = Alphabet(
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
