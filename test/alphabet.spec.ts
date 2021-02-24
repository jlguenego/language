import assert from 'assert';
import {defineSymbolAlphabet, emptyWord, JSSymbol, Word} from '../src';

describe('Alphabet Unit Test', () => {
  it('test alphabet', () => {
    const a = defineSymbolAlphabet('titi', 'tata');
    const hello: JSSymbol[] = [a.titi, a.tata, a.titi];
    assert(hello);
  });
  it('test instanceof', () => {
    const a = defineSymbolAlphabet('titi', 'tata');
    assert.deepStrictEqual(a.titi instanceof JSSymbol, false);
  });
  it('test word', () => {
    const n = defineSymbolAlphabet('a', 'b');
    const word1 = new Word<typeof n>([n.a, n.b, n.a]);
    const word2 = Word.from(n, ['a', 'b', 'a']);
    assert.deepStrictEqual(word1 === word2, true);
  });
  it('test emptyWord', () => {
    const n = defineSymbolAlphabet('a', 'b');
    const word1 = new Word([]);
    const word2 = new Word<typeof n>([]);
    assert.deepStrictEqual(word1 === emptyWord, true);
    assert.deepStrictEqual(word2 === emptyWord, true);
    assert.deepStrictEqual(
      word2 === ((word1 as unknown) as typeof word2),
      true
    );
  });
  it('test word on different alphabet', () => {
    const n1 = defineSymbolAlphabet('a', 'b');
    const n2 = defineSymbolAlphabet('a', 'b');
    const word1 = new Word<typeof n1>([n1.a, n1.b, n1.a]);
    const word2 = Word.from(n2, ['a', 'b', 'a']);
    assert.deepStrictEqual(word1 === word2, true);
    assert.deepStrictEqual(word1.symbols[0] === word2.symbols[0], true);
  });
  it('test concat', () => {
    const n = defineSymbolAlphabet('a', 'b');
    const word = Word.from(n, ['a', 'b']);
    assert.deepStrictEqual(
      word.concat(word, 1),
      new Word<typeof n>([n.a])
    );
  });
  it('test powerWord', () => {
    const n = defineSymbolAlphabet('a', 'b');
    const word = Word.from(n, ['a', 'b']);
    assert.deepStrictEqual(word.power(0), emptyWord);
    assert.deepStrictEqual(word.power(1), word);
    assert.deepStrictEqual(word.power(2), word.concat(word));
    assert.deepStrictEqual(
      word.power(3),
      new Word<typeof n>([n.a, n.b, n.a, n.b, n.a, n.b])
    );
  });
  it('test reverse', () => {
    const n = defineSymbolAlphabet('a', 'b');
    const word = Word.from(n, ['a', 'b']);
    assert.deepStrictEqual(word.reverse(), Word.from(n, ['b', 'a']));
    assert.deepStrictEqual(emptyWord.reverse(), emptyWord);
  });
  it('test isPrefixOf', () => {
    const n = defineSymbolAlphabet('a', 'b', 'c');
    const word = Word.from(n, ['a', 'b']);
    const w2 = new Word<typeof n>([n.a, n.b, n.c]);
    assert.deepStrictEqual(word.isPrefixOf(w2), true);
    assert.deepStrictEqual(
      word.isPrefixOf(new Word([n.a, n.a, n.b, n.c])),
      false
    );
    assert.deepStrictEqual(emptyWord.isPrefixOf(emptyWord), true);
  });
  it('test isSuffixOf', () => {
    const n = defineSymbolAlphabet('a', 'b', 'c');
    const word = Word.from(n, ['a', 'b']);
    assert.deepStrictEqual(word.isSuffixOf(new Word([n.c, n.a, n.b])), true);
    assert.deepStrictEqual(
      word.isSuffixOf(new Word([n.a, n.a, n.b, n.c])),
      false
    );
    assert.deepStrictEqual(emptyWord.isSuffixOf(emptyWord), true);
  });
  it('test isSubstringOf', () => {
    const n = defineSymbolAlphabet('a', 'b', 'c');
    const word = Word.from(n, ['a', 'b']);
    assert.deepStrictEqual(
      word.isSubstringOf(new Word([n.c, n.a, n.b, n.c])),
      true
    );
    assert.deepStrictEqual(
      word.isSubstringOf(new Word([n.a, n.a, n.c, n.b, n.c])),
      false
    );
    assert.deepStrictEqual(emptyWord.isSubstringOf(emptyWord), true);
  });
  it('test proper', () => {
    const n = defineSymbolAlphabet('a', 'b', 'c');
    const word = Word.from(n, ['a', 'b']);
    assert.deepStrictEqual(
      word.isProperPrefixOf(new Word([n.a, n.b, n.c])),
      true
    );
    assert.deepStrictEqual(
      word.isProperSubstringOf(new Word([n.a, n.b])),
      false
    );
    assert.deepStrictEqual(emptyWord.isProperSubstringOf(emptyWord), false);
  });
  it('test length', () => {
    const n = defineSymbolAlphabet('a', 'b', 'c');
    const word = Word.from(n, ['a', 'b']);
    assert.deepStrictEqual(word.length, 2);
    assert.deepStrictEqual(emptyWord.length, 0);
  });
});
