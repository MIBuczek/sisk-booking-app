import { SIZE_OPTIONS } from 'utils/variables/form-const';
import { IPayload } from './store-models';

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
   phone: string;
   email: string;
   employees: string[];
   [x: string]: string | string[] | SIZE_OPTIONS[] | IExtraBuilding;
}

interface IBuildingPayload extends IPayload {
   buildings: IBuilding[];
}

interface IBuildingAction {
   type: string;
   payload: IBuildingPayload;
}

export type { IBuilding, IBuildingPayload, IBuildingAction };
