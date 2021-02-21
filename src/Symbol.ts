const map = new Map<string, symbol>();

export const getSymbol = (str: string): symbol => {
  const symbol = map.get(str);
  if (symbol) {
    return symbol;
  }
  const result = Symbol(str);
  map.set(str, result);
  return result;
};
