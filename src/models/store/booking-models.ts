// eslint-disable-next-line import/no-cycle
import { IPayload } from 'models';
import { BOOKING_STATUS } from 'utils';
import { CLIENT_TYPE, SIZE_OPTIONS } from 'utils/variables/form-const';

interface ISingleBookingDate {
  day: Date;
  startHour: Date;
  endHour: Date;
}

type TBooking =
  | CLIENT_TYPE
  | SIZE_OPTIONS
  | string
  | boolean
  | Date
  | number
  | ISingleBookingDate[]
  | undefined;

interface IBooking {
  type: CLIENT_TYPE;
  city: string;
  building: string;
  size: SIZE_OPTIONS;
  clientId: string;
  person: string;
  club?: string;
  email: string;
  phone: string;
  regular: boolean;
  month: number;
  bookingTime: ISingleBookingDate[];
  accepted: boolean;
  message: string;
  bookingStatus: string;
  bookingComments: string;
  id: string;
  [x: string]: TBooking;
}

interface IBookingsPayload extends IPayload {
  booking?: IBooking;
  bookings: IBooking[];
}

interface IBookingsAction {
  type: string;
  payload: IBookingsPayload;
}

export type { ISingleBookingDate, IBooking, IBookingsPayload, IBookingsAction, TBooking };
