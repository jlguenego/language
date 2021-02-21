const map = new Map<string, JSSymbol>();

export class JSSymbol {
  constructor(public name: string) {
    const symbol = map.get(name);
    if (symbol) {
      return symbol;
    }
    map.set(name, this);
    return this;
  }
}
