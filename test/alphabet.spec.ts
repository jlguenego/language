import {emptyWord} from './../src/Word';
import assert from 'assert';
import {alphabet, Word} from '../src';

describe('Alphabet Unit Test', () => {
  it('test alphabet', () => {
    const a = alphabet('titi', 'tata');
    const hello: symbol[] = [a.titi, a.tata, a.titi];
    assert(hello);
  });
  it('test word', () => {
    const n = alphabet('a', 'b');
    const word1 = new Word<typeof n>([n.a, n.b, n.a]);
    const word2 = Word.from(n, ['a', 'b', 'a']);
    assert.deepStrictEqual(word1 === word2, true);
  });
  it('test emptyWord', () => {
    const n = alphabet('a', 'b');
    const word1 = new Word([]);
    const word2 = new Word<typeof n>([]);
    assert.deepStrictEqual(word1 === emptyWord, true);
    assert.deepStrictEqual(
      word2 === ((emptyWord as unknown) as typeof word2),
      true
    );
    assert.deepStrictEqual(
      word2 === ((word1 as unknown) as typeof word2),
      true
    );
  });
  it('test word on different alphabet', () => {
    const n1 = alphabet('a', 'b');
    const n2 = alphabet('a', 'b');
    const word1 = new Word<typeof n1>([n1.a, n1.b, n1.a]);
    const word2 = Word.from(n2, ['a', 'b', 'a']);
    assert.deepStrictEqual(word1 === word2, true);
    assert.deepStrictEqual(word1.symbols[0] === word2.symbols[0], true);
  });
  it('test powerWord', () => {
    const n = alphabet('a', 'b');
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
    const n = alphabet('a', 'b');
    const word = Word.from(n, ['a', 'b']);
    assert.deepStrictEqual(word.reverse(), Word.from(n, ['b', 'a']));
    assert.deepStrictEqual(emptyWord.reverse(), emptyWord);
  });
  it('test isPrefixOf', () => {
    const n = alphabet('a', 'b', 'c');
    const word = Word.from(n, ['a', 'b']);
    assert.deepStrictEqual(word.isPrefixOf(new Word([n.a, n.b, n.c])), true);
    assert.deepStrictEqual(
      word.isPrefixOf(new Word([n.a, n.a, n.b, n.c])),
      false
    );
    assert.deepStrictEqual(emptyWord.isPrefixOf(emptyWord), true);
  });
  it('test isSuffixOf', () => {
    const n = alphabet('a', 'b', 'c');
    const word = Word.from(n, ['a', 'b']);
    assert.deepStrictEqual(word.isSuffixOf(new Word([n.c, n.a, n.b])), true);
    assert.deepStrictEqual(
      word.isSuffixOf(new Word([n.a, n.a, n.b, n.c])),
      false
    );
    assert.deepStrictEqual(emptyWord.isSuffixOf(emptyWord), true);
  });
  it('test isSubstringOf', () => {
    const n = alphabet('a', 'b', 'c');
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
});
