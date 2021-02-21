import {MemoCache} from '@jlguenego/set';
import {Alphabet} from './Alphabet';

export class Word<T extends Alphabet> {
  static from<T extends Alphabet>(alphabet: T, names: (keyof T)[]) {
    return new Word(names.map(n => alphabet[n]));
  }
  constructor(public symbols: T[keyof T][]) {
    return MemoCache.handle(this);
  }

  power(n: number): Word<T> {
    const symbols = [];
    for (let i = 0; i < n; i++) {
      symbols.push(...this.symbols);
    }
    return new Word(symbols);
  }

  concat(word: Word<T>): Word<T> {
    const symbols = this.symbols.concat(word.symbols);
    return new Word(symbols);
  }

  reverse(): Word<T> {
    const symbols = [...this.symbols].reverse();
    return new Word(symbols);
  }

  isPrefixOf(word: Word<T>): boolean {
    for (let i = 0; i < this.symbols.length; i++) {
      if (this.symbols[i] !== word.symbols[i]) {
        return false;
      }
    }
    return true;
  }

  isSuffixOf(word: Word<T>): boolean {
    const offset = word.symbols.length - this.symbols.length;
    for (let i = 0; i < this.symbols.length; i++) {
      if (this.symbols[i] !== word.symbols[offset + i]) {
        return false;
      }
    }
    return true;
  }

  isSubstringOf(word: Word<T>): boolean {
    if (this === ((emptyWord as unknown) as Word<T>)) {
      return true;
    }
    for (
      let offset = 0;
      offset < word.symbols.length - this.symbols.length;
      offset++
    ) {
      let found = true;
      for (let i = 0; i < this.symbols.length; i++) {
        if (this.symbols[i] !== word.symbols[offset + i]) {
          found = false;
          break;
        }
      }
      if (found) {
        return true;
      }
    }
    return false;
  }
}

export const emptyWord = new Word<Alphabet>([]);
