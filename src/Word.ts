import {MemoCache} from '@jlguenego/set';
import {Alphabet} from './Alphabet';
import {symbolToString} from './misc';

export class Word<T extends Alphabet> {
  static retrieveFromCache(symbols: unknown[]): Word<Alphabet> | undefined {
    const word = Object.create(Word.prototype) as Word<Alphabet>;
    word.symbols = symbols as never[];
    return MemoCache.retrieveFromCache(word);
  }
  static from<T extends Alphabet>(alphabet: T, names: (keyof T)[]) {
    return new Word(names.map(n => alphabet[n]));
  }
  constructor(public symbols: T[keyof T][]) {
    return MemoCache.handle(this);
  }

  get length() {
    return this.symbols.length;
  }

  power(n: number): Word<T> {
    const symbols = [];
    for (let i = 0; i < n; i++) {
      symbols.push(...this.symbols);
    }
    return new Word(symbols);
  }

  concat<U extends Alphabet>(word: Word<U>, k?: number): Word<T | U> {
    const symbols = (this.symbols as (T | U)[keyof (T | U)][]).concat(
      (word.symbols as unknown) as ConcatArray<(T | U)[keyof T & keyof U]>
    );
    if (k !== undefined) {
      return new Word(symbols.slice(0, k));
    }
    return new Word(symbols);
  }

  reverse(): Word<T> {
    const symbols = [...this.symbols].reverse();
    return new Word(symbols);
  }

  isPrefixOf(word: Word<T>): boolean {
    for (let i = 0; i < this.length; i++) {
      if (this.symbols[i] !== word.symbols[i]) {
        return false;
      }
    }
    return true;
  }

  isSuffixOf(word: Word<T>): boolean {
    const offset = word.length - this.length;
    for (let i = 0; i < this.length; i++) {
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
    for (let offset = 0; offset < word.length - this.length; offset++) {
      let found = true;
      for (let i = 0; i < this.length; i++) {
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

  isProperPrefixOf(word: Word<T>): boolean {
    return this.isPrefixOf(word) && this !== word;
  }
  isProperSuffixOf(word: Word<T>): boolean {
    return this.isSuffixOf(word) && this !== word;
  }
  isProperSubstringOf(word: Word<T>): boolean {
    return this.isSubstringOf(word) && this !== word;
  }

  toString(): string {
    if (this.length === 0) {
      return 'ε';
    }
    return this.symbols.map(s => symbolToString(s)).join('');
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const emptyWord = new Word<any>([]);
