export const Alphabet = <T extends string>(
  array: readonly T[]
): Record<T, symbol> => {
  const result: Record<T, symbol> = {} as Record<T, symbol>;
  for (const a of array) {
    result[a] = Symbol(a);
  }
  return result;
};
