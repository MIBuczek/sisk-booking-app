import { TSelect } from 'models';
import { SIZE_OPTIONS } from 'utils/variables/form-const';

interface IBuildingForm {
  name: string;
  phone: string;
  email: string;
  size: SIZE_OPTIONS;
  id?: string;
  city: TSelect;
}

export type { IBuildingForm };
