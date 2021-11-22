type TSelect = {
  label: string;
  value: string;
};

interface IBuildingOptions {
  [x: string]: TSelect[];
}

interface ISizeFieldOptions {
  [x: string]: { [x: string]: TSelect[] };
}

export type { TSelect, IBuildingOptions, ISizeFieldOptions };
