import { TSelect } from 'models';
import { SIZE_OPTIONS } from 'utils';

interface IBuildingForm {
  name: string;
  phone: string;
  email: string;
  size: SIZE_OPTIONS;
  id?: string;
  city: TSelect;
}

export type { IBuildingForm };
