// eslint-disable-next-line import/no-cycle
import { IPayload, TSelect } from 'models';

interface IBooking {
  city: TSelect;
  building: TSelect;
  size: TSelect;
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

interface IBookingsPayload extends IPayload {
  booking?: IBooking;
  bookings: IBooking[];
}

interface IBookingsAction {
  type: string;
  payload: IBookingsPayload;
}

export type { IBooking, IBookingsPayload, IBookingsAction };
