import pkg from '../package.json' with { type: 'json' };
import categories from '#src/categories/index.ts';
import { bold } from '#src/utils/console.utils.ts';
import {
  chooseCategory,
  chooseCategoryPreset,
  installCategoryOptions,
  chooseCategoryOptions,
} from '#src/services/cli.service.ts';
import { resolveArgs, CliError } from '#src/services/cli.service.ts';
import type { Category } from '#src/services/state.service.ts';

const runInteractive = async () => {
  console.log(bold(`Welcome to Allohamora's cli`));

  const category = await chooseCategory();
  const options = await chooseCategoryPreset(category);
  const selectedOptionKeys = await chooseCategoryOptions(options);

  await installCategoryOptions(options, selectedOptionKeys);

  console.log(bold('Installation completed'));
};

const runWithArgs = async (argv: string[]) => {
  if (argv.includes('--version')) {
    console.log(pkg.version);
    return;
  }

  const args = resolveArgs(argv);
  const category = categories[args.category as keyof typeof categories] as Category;

  category.state.presetState.setPreset(args.preset);

  await installCategoryOptions(category.options, args.optionKeys);
};

export const main = async (argv: string[]) => {
  if (argv.length > 0) {
    await runWithArgs(argv);
  } else {
    await runInteractive();
  }
};

/* v8 ignore next 5 -- CLI bootstrap path is exercised by direct Node startup. */
if (import.meta.main) {
  main(process.argv.slice(2)).catch((error: unknown) => {
    if (error instanceof CliError) {
      console.error(error.message);
      process.exit(1);
    }

    throw error;
  });
}
