export const toKebabCase = (camel: string) => {
  return camel
    .split('')
    .map((word) => (word.toUpperCase() === word ? `-${word.toLowerCase()}` : word))
    .join('');
};

export const toCamelCase = (kebab: string) => {
  const [first, ...rest] = kebab.split('-');
  const capitalizedRest = rest
    .map((word) => {
      const [first, ...rest] = word;

      return [first?.toUpperCase(), ...rest].join('');
    })
    .join('');

  return `${first}${capitalizedRest}`;
};
