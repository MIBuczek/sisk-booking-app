import { IPayload } from 'models';
import { SIZE_OPTIONS } from 'utils/variables/form-const';

interface IBuilding {
  name: string;
  city: string;
  phone: string;
  email: string;
  size: SIZE_OPTIONS;
  id?: string;
  [x: string]: string | SIZE_OPTIONS | undefined;
}

interface IBuildingsPayload extends IPayload {
  buildings: IBuilding[];
}

interface IBuildingsAction {
  type: string;
  payload: IBuildingsPayload;
}

export type { IBuilding, IBuildingsPayload, IBuildingsAction };
