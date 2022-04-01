import { ISingleBookingDate } from 'models/store/booking-models';
import { IClient } from 'models/store/client-models';

interface IBookedTime extends ISingleBookingDate {
  building: string;
  size: string;
  status: string;
}

interface ISummaryClientBookings {
  client: IClient;
  radwanice: IBookedTime[];
  siechnice: IBookedTime[];
  'swieta-katarzyna': IBookedTime[];
  'zerniki-wroclawskie': IBookedTime[];
  [x: string]: string | IBookedTime[] | IClient | undefined;
}

export type { ISummaryClientBookings, IBookedTime };
