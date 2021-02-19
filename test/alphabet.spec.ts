import assert from 'assert';
import {Alphabet} from '../src';

describe('Alphabet Unit Test', () => {
  it('test alphabet', () => {
    const binaryAlphabet = Alphabet(['titi', 'tata'] as const);
    const hello: symbol[] = [
      binaryAlphabet.titi,
      binaryAlphabet.tata,
      binaryAlphabet.titi,
    ];

    assert(hello);
  });
});