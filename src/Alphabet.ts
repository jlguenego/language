import {JSSymbol} from './JSSymbol';

export const alphabet = <T extends string, U extends Object>(
  SymbolClass: new (str: string) => U,
  ...array: readonly T[]
): Record<T, U> & Alphabet => {
  const result: Record<T, U> = {} as Record<T, U>;
  for (const a of array) {
    result[a] = new SymbolClass(a);
  }
  Object.setPrototypeOf(result, Alphabet.prototype);
  return result;
};

export const defineSymbolAlphabet = <T extends string>(...args: readonly T[]) =>
  alphabet(JSSymbol, ...args);

export class Alphabet {}

export const BinaryAlphabet = alphabet(JSSymbol, '0', '1');

export const RomanAlphabet = alphabet(
  JSSymbol,
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
