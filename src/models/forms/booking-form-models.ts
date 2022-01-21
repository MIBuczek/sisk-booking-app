import { TSelect } from 'models';
import { SIZE_OPTIONS } from 'utils';

interface IBookingForm {
  city: TSelect;
  building: TSelect;
  size: SIZE_OPTIONS;
  person: string;
  club?: string;
  email: string;
  phone: string;
  regular?: boolean;
  dateStart: Date | null;
  dateEnd?: Date | null;
  hourStart: Date | null;
  hourEnd: Date | null;
  accepted: boolean;
  message: string;
  id?: string;
}

export type { IBookingForm };
