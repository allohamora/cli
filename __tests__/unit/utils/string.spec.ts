import { camelize, kebablize } from '#src/utils/string.ts';

describe('string', () => {
  describe('kebablize', () => {
    it('kebablizes string', () => {
      const actual = kebablize('helloWorld');
      const expected = 'hello-world';

      expect(actual).toBe(expected);
    });
  });

  describe('camelize', () => {
    it('camelizes string', () => {
      const actual = camelize('hello-world');
      const expected = 'helloWorld';

      expect(actual).toBe(expected);
    });
  });
});
