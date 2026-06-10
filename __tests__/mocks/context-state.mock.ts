import { getInstalling, setInstalling } from '#src/states/context.ts';

export class ContextState {
  public setup() {
    this.reset();
  }

  public clear() {
    this.reset();
  }

  public reset() {
    setInstalling([]);
  }

  public setInstalling(scripts: string[]) {
    setInstalling(scripts);
  }

  public getInstalling() {
    return getInstalling();
  }
}
