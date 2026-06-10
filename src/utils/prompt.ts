import inquirer from 'inquirer';

export const oneOf = async <C extends string>(message: string, choices: readonly C[]) => {
  const res = await inquirer.prompt({
    type: 'select',
    name: message,
    message,
    choices,
  });

  return res[message] as C;
};

export const minimumOneValidate = (answers: unknown[]) => answers.length !== 0;

export const manyOf = async <C extends string>(message: string, choices: C[]) => {
  const res = await inquirer.prompt({
    type: 'checkbox',
    name: message,
    message,
    choices,
    validate: minimumOneValidate,
  });

  return res[message] as C[];
};
