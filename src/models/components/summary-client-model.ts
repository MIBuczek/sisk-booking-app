import { ISingleBookingDate } from 'models/store/booking-models';

interface IBookedTime extends ISingleBookingDate {
  building: string;
  size: string;
}

interface ISummaryClientBookings {
  clientName: string;
  radwanice: IBookedTime[];
  siechnice: IBookedTime[];
  'swieta-katarzyna': IBookedTime[];
  'zerniki-wroclawskie': IBookedTime[];
  [x: string]: string | IBookedTime[];
}

export type { ISummaryClientBookings, IBookedTime };
