import js from '#src/categories/js/index.ts';
import { jsCategoryState } from '#src/services/state.service.ts';

describe('index', () => {
  describe('js', () => {
    it('exports state', () => {
      expect(js.state).toBe(jsCategoryState);
    });

    it('exports options', () => {
      expect(js.options).toBeDefined();
      expect(typeof js.options).toBe('object');
    });
  });
});
