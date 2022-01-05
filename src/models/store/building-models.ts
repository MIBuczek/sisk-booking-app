import { SIZE_OPTIONS } from 'utils/variables/form-const';

interface IExtraBuilding {
  lighting: boolean;
  toilets: boolean;
}
interface IBuilding {
  name: string;
  city: string;
  property: string;
  size: SIZE_OPTIONS[];
  extra: IExtraBuilding;
  [x: string]: string | SIZE_OPTIONS[] | IExtraBuilding;
}

export type { IBuilding };
