import assert from 'assert';
import {Alphabet, Word} from '../src';

describe('Alphabet Unit Test', () => {
  it('test alphabet', () => {
    const binaryAlphabet = Alphabet('titi', 'tata');
    const hello: symbol[] = [
      binaryAlphabet.titi,
      binaryAlphabet.tata,
      binaryAlphabet.titi,
    ];

    assert(hello);
  });
  it('test word', () => {
    const n = Alphabet('a', 'b');
    const word1 = new Word([n.a, n.b, n.a]);
    const word2 = new Word([n.a, n.b, n.a]);
    assert.deepStrictEqual(word1 === word2, true);
  });
});
