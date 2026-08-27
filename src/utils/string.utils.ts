export const toKebabCase = (camel: string) => {
  return camel
    .split('')
    .map((word) => (word.toUpperCase() === word ? `-${word.toLowerCase()}` : word))
    .join('');
};

export const toTitleCase = (kebab: string) => {
  return kebab
    .split('-')
    .filter(Boolean)
    .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join(' ');
};

export const pluralize = (count: number, singular: string, plural: string) => {
  return count === 1 ? singular : plural;
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
