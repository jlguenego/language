import {epsilonWord} from './../src/Word';
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
    assert.deepStrictEqual(word1 === epsilonWord, true);
    assert.deepStrictEqual(
      word2 === ((epsilonWord as unknown) as typeof word2),
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
});
