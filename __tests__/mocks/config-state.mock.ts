import { jsCategoryState } from '#src/states/categories.ts';

type JsConfig = (typeof jsCategoryState.configTypes)[number];

export class ConfigState {
  private initialConfig = jsCategoryState.configState[0]();

  public setup() {
    this.reset();
  }

  public clear() {
    this.reset();
  }

  public reset() {
    jsCategoryState.configState[1](this.initialConfig);
  }

  public setConfig(config: JsConfig) {
    jsCategoryState.configState[1](config);
  }
}
