import { IPayload } from 'models';

interface IBuilding {
  name: string;
  address: string;
  id: string;
}

interface IBuildingsPayload extends IPayload {
  buildings?: IBuilding[];
}

interface IBuildingsAction {
  type: string;
  payload: IBuildingsPayload;
}

export type { IBuilding, IBuildingsPayload, IBuildingsAction };
