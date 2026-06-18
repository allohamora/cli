export class CliError extends Error {
  public override name = 'CliError';
}

export class CliExitError extends Error {
  public override name = 'CliExitError';
}
