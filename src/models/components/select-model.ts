import { SIZE_OPTIONS } from 'utils';

type TSelect = {
   label: string;
   value: string;
};

interface IBuildingOptions {
   [x: string]: TSelect[];
}

interface ISizeFieldOptions {
   [x: string]: { [x: string]: SIZE_OPTIONS[] };
}

export type { TSelect, IBuildingOptions, ISizeFieldOptions };
