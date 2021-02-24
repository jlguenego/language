import assert from 'assert';
import {defineSymbolAlphabet, Language, Word} from '../src';

describe('Language Unit Test', () => {
  it('test language_cache', () => {
    const t = defineSymbolAlphabet('a', 'b');
    const l1 = new Language(
      new Set([new Word<typeof t>([t.a, t.b]), new Word<typeof t>([t.a, t.a])])
    );
    const l2 = new Language(
      new Set([new Word<typeof t>([t.a, t.b]), new Word<typeof t>([t.a, t.a])])
    );
    assert.deepStrictEqual(l1 === l2, true);
  });
  it('test language_concat', () => {
    const t = defineSymbolAlphabet('a', 'b');
    const u = defineSymbolAlphabet('c', 'd');
    const lt = new Language(
      new Set([new Word<typeof t>([t.a, t.b]), new Word<typeof t>([t.a, t.a])])
    );
    const lu = new Language(
      new Set([new Word<typeof u>([u.c, u.c]), new Word<typeof u>([u.c, u.d])])
    );

    const language = lt.concat(lu);
    assert.deepStrictEqual(language.toString(), '{ abcc,abcd,aacc,aacd }');
  });
  it('test language_power', () => {
    const t = defineSymbolAlphabet('a', 'b');
    const l = new Language(
      new Set([new Word<typeof t>([t.a])])
    );
    const l2 = l.power(2);

    assert.deepStrictEqual(l2.toString(), '{ aa }');
  });
});
