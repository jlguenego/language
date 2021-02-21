const map = new Map<string, JSSymbol>();

export class JSSymbol {
  constructor(public name: string) {
    const symbol = map.get(name);
    if (symbol) {
      return symbol;
    }
    const result = {name};
    map.set(name, result);
    return result;
  }
}
