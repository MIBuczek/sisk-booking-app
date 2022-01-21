// eslint-disable-next-line import/no-cycle
import { IPayload } from 'models';
import { CLIENT_TYPE, SIZE_OPTIONS } from 'utils/variables/form-const';

interface IBooking {
  type: CLIENT_TYPE;
  city: string;
  building: string;
  size: SIZE_OPTIONS;
  person: string;
  club?: string;
  email: string;
  phone: string;
  regular: boolean;
  dateStart: Date;
  dateEnd: Date;
  hourStart: Date;
  hourEnd: Date;
  accepted: boolean;
  message: string;
  id: string;
  [x: string]: CLIENT_TYPE | SIZE_OPTIONS | string | boolean | Date | undefined;
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
