import inquirer from 'inquirer';

export const oneOf = async <C extends string>(message: string, choices: readonly C[]) => {
  const res = await inquirer.prompt({
    type: 'list',
    name: message,
    message,
    choices,
  });

  return res[message] as C;
};

export const miniumOneValidate = (answers: unknown[]) => answers.length !== 0;

export const manyOf = async <C extends string>(message: string, choices: C[]) => {
  const res = await inquirer.prompt({
    type: 'checkbox',
    name: message,
    message,
    choices,
    validate: miniumOneValidate,
  });

  return res[message] as C[];
};
