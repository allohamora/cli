import inquirer from 'inquirer';

export const chooseOne = async <C extends string>(message: string, choices: readonly C[]) => {
  const res = await inquirer.prompt({
    type: 'select',
    name: message,
    message,
    choices,
  });

  return res[message] as C;
};

export const requireAtLeastOneChoice = (answers: unknown[]) => answers.length !== 0;

export const chooseMany = async <C extends string>(message: string, choices: readonly C[]) => {
  const res = await inquirer.prompt({
    type: 'checkbox',
    name: message,
    message,
    choices,
    validate: requireAtLeastOneChoice,
  });

  return res[message] as C[];
};
