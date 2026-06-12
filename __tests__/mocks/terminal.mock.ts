import * as execa from 'execa';
import { vi, type MockInstance } from 'vitest';

vi.mock('execa');

export type CommandCall = unknown[];

type CommandResult = {
  stdout: string;
};

type CommandHandler = (bin: string, args: string[]) => CommandResult | Promise<CommandResult>;

export class Terminal {
  private spy?: MockInstance;

  private commands: CommandCall[] = [];

  private commandHandler?: CommandHandler;

  public setup() {
    this.reset();
    this.clear();

    this.spy = vi.spyOn(execa, 'execa').mockImplementation((...args) => {
      this.commands.push(args);

      return (this.commandHandler?.(...(args as [string, string[]])) ?? { stdout: '' }) as unknown as ReturnType<
        typeof execa.execa
      >;
    });
  }

  public clear() {
    this.spy?.mockRestore();
    this.spy = undefined;
  }

  public reset() {
    this.commands.length = 0;
    this.commandHandler = undefined;
  }

  public setCommandHandler(handler: CommandHandler) {
    this.commandHandler = handler;
  }

  public setCommandResult(result: CommandResult) {
    this.commandHandler = () => result;
  }

  public getCommands() {
    return [...this.commands];
  }
}
