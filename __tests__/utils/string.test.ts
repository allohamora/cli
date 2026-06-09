import { camelize, kebablize } from '#src/utils/string.ts';

describe('kebablize', () => {
  test('should kebablize string', () => {
    const actual = kebablize('helloWorld');
    const expected = 'hello-world';

    expect(actual).toBe(expected);
  });
});

describe('camelize', () => {
  test('should camelize string', () => {
    const actual = camelize('hello-world');
    const expected = 'helloWorld';

    expect(actual).toBe(expected);
  });
});
