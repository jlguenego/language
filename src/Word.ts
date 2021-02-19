import {MemoCache} from '@jlguenego/set';
import {Alphabet} from './Alphabet';

export class Word<T extends Alphabet> {
  static from<T extends Alphabet>(alphabet: T, names: (keyof T)[]) {
    return new Word<T>(names.map(n => alphabet[n]));
  }
  constructor(public symbols: T[keyof T][]) {
    return MemoCache.handle(this);
  }
}

export const epsilonWord = new Word<Alphabet>([]);
