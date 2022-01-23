import { compose } from './fp';

export const kebablize = (camel: string) => {
  return camel
    .split('')
    .map((word) => (word.toUpperCase() === word ? `-${word.toLowerCase()}` : word))
    .join('');
};

export const camelize = (kebab: string) => {
  const [first, ...rest] = kebab.split('-');
  const capilazedRest = rest
    .map((word) => {
      const [first, ...rest] = word;

      return [first.toUpperCase(), ...rest].join('');
    })
    .join('');

  return `${first}${capilazedRest}`;
};

export const buildTemplate = (strings: TemplateStringsArray, ...values: unknown[]) => {
  const result = strings.reduce((state, string, index) => {
    const value = values[index] ?? '';

    return `${state}${string}${value}`;
  });

  return result;
};

export const templateWithFormat = (...funcs: Array<(value: string) => string>) => {
  return (...params: Parameters<typeof buildTemplate>) => {
    const builded = buildTemplate(...params);

    return compose(...funcs)(builded);
  };
};

export const removeTabOnEachLine = (string: string) => string.replace(/\n(  |\t)/g, '\n');
export const trim = (string: string) => string.trim();
