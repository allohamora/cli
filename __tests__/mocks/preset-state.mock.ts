import { jsCategory } from '#src/services/state.service.ts';

const categoryStates = {
  js: jsCategory.presetState,
} as const;

type CategoryStates = typeof categoryStates;
type CategoryName = keyof CategoryStates;
type CategoryPreset<TName extends CategoryName> = Parameters<CategoryStates[TName]['setPreset']>[0];

export class PresetStateMock {
  private readonly initialPresets = {
    js: categoryStates.js.getPreset(),
  } as const;

  public setup() {
    this.reset();
  }

  public clear() {
    this.reset();
  }

  public reset() {
    this.resetCategoryPreset('js');
  }

  public setJsPreset(preset: CategoryPreset<'js'>) {
    this.setCategoryPreset('js', preset);
  }

  private setCategoryPreset<TName extends CategoryName>(categoryName: TName, preset: CategoryPreset<TName>) {
    categoryStates[categoryName].setPreset(preset);
  }

  private resetCategoryPreset<TName extends CategoryName>(categoryName: TName) {
    this.setCategoryPreset(categoryName, this.initialPresets[categoryName]);
  }
}
