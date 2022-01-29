import { parse } from 'yaml';

export const yamlParse = (yamlString: string) => parse(yamlString);
