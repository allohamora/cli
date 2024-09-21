import { compose } from './fp';

export const kebablize = (camel: string) => {
  return camel
    .split('')
    .map((word) => (word.toUpperCase() === word ? `-${word.toLowerCase()}` : word))
    .join('');
};

export const camelize = (kebab: string) => {
  const [first, ...rest] = kebab.split('-');
  const capitalizedRest = rest
    .map((word) => {
      const [first, ...rest] = word;

      return [first.toUpperCase(), ...rest].join('');
    })
    .join('');

  return `${first}${capitalizedRest}`;
};

export const multilineStringBuilder = (strings: TemplateStringsArray, ...values: unknown[]) => {
  const result = strings.reduce((state, string, index) => {
    const value = values[index] ?? '';

    return `${state}${string}${value}`;
  }, '');

  return result;
};

type Middleware = (value: string) => string;

export const multilineStringBuilderWithMiddlewares = (...middlewares: Middleware[]) => {
  return (...params: Parameters<typeof multilineStringBuilder>) => {
    const builded = multilineStringBuilder(...params);

    return compose(...middlewares)(builded);
  };
};

export const removeTabOnEachLine = (string: string) => string.replace(/\n( {2}|\t)/g, '\n');
export const trim = (string: string) => string.trim();

export const readableMultilineString = multilineStringBuilderWithMiddlewares(trim, removeTabOnEachLine);
