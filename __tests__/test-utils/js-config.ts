import { jsCategoryState } from 'src/states/categories';

type GetConfig<C> = () => C;
type AdditionalTest<C> = (config: C) => void;

const variants = jsCategoryState.configTypes;
const [, setState] = jsCategoryState.configState;

export const expectJsConfig = <C>(getConfig: GetConfig<C>, additionalTests: AdditionalTest<C>[] = []) => {
  describe('getConfig', () => {
    for (const variant of variants) {
      setState(variant);
      const config = getConfig();

      test(`should return config for ${variant}`, () => {
        const actual = config;

        expect(actual).toBeDefined();
      });

      additionalTests.forEach((test) => test(config));
    }
  });
};
