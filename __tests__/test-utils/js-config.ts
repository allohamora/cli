import { jsCategoryState } from 'src/states/categories';

const variants = jsCategoryState.configTypes;
const [, setState] = jsCategoryState.configState;

export const expectJsConfig = <T>(getConfig: () => T) => {
  describe('getConfig', () => {
    for (const variant of variants) {
      setState(variant);

      test(`should return config for ${variant}`, () => {
        const actual = getConfig();

        expect(actual).toBeDefined();
      });
    }
  });
};
