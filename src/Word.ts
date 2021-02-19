import {MemoCache} from '@jlguenego/set';

export class Word {
  constructor(public symbols: symbol[]) {
    return MemoCache.handle(this);
  }
}
