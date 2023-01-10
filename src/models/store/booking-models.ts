// eslint-disable-next-line import/no-cycle
import { IPayload, ISelectedExtraOptions } from 'models';
import { CLIENT_TYPE, SIZE_OPTIONS } from 'utils/variables/form-const';

interface ISingleBookingDate {
  day: Date;
  startHour: Date;
  endHour: Date;
  comments: string;
  participants: string;
  status: string;
}

type TBooking =
  | CLIENT_TYPE
  | SIZE_OPTIONS
  | string
  | boolean
  | Date
  | number
  | ISingleBookingDate[]
  | ISelectedExtraOptions[]
  | undefined
  | null;

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
  extraOptions: boolean;
  selectedOptions: ISelectedExtraOptions[];
  payment: string;
  discount: string;
  archive: boolean;
  id: string;

  [x: string]: TBooking;
}

interface IBookingsPayload extends IPayload {
  booking?: IBooking;
  bookingTimeIndex: number | null;
  bookings: IBooking[];
  conflictedBookings: IBooking[];
}

interface IBookingsAction {
  type: string;
  payload: IBookingsPayload;
}

export type { ISingleBookingDate, IBooking, IBookingsPayload, IBookingsAction, TBooking };
