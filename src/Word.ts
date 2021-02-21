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
}

export const emptyWord = new Word<Alphabet>([]);
