import {MemoCache} from '@jlguenego/set';
import {Alphabet} from './Alphabet';
import {emptyWord, Word} from './Word';

/**
 * a language is a immutable set of words. Here we handle only finite languages.
 *
 * @export
 * @class Language
 * @template T an alphabet
 */
export class Language<T extends Alphabet> {
  constructor(private set: Set<Word<T>>) {
    return MemoCache.handle(this);
  }

  [Symbol.iterator]() {
    return this.set.keys();
  }

  get size() {
    return this.set.size;
  }

  concat<U extends Alphabet>(language: Language<U>): Language<T | U> {
    const set = new Set<Word<T | U>>();
    for (const a of this) {
      for (const b of language) {
        const w = a.concat<U>(b);
        set.add(w);
      }
    }
    return new Language(set);
  }

  power(n: number): Language<T> {
    if (n === 0) {
      return (emptyLanguage as unknown) as Language<T>;
    }
    if (n === 1) {
      return this;
    }
    return this.concat(this.power(n - 1));
  }

  toString() {
    return '{ ' + [...this].map(w => w.toString()).join(',') + ' }';
  }
}

export const emptyLanguage = new Language<Alphabet>(new Set([emptyWord]));
