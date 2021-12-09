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
  when: Date | null;
  whenEnd?: Date | null;
  start: Date | null;
  end: Date | null;
  accepted: boolean;
  message: string;
  id?: string;
}

export type { IBookingForm };
