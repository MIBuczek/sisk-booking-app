import { ISingleBookingDate } from 'models/store/booking-models';

interface ISummaryClientBookings {
  clientName: string;
  radwanice: ISingleBookingDate[];
  siechnice: ISingleBookingDate[];
  'swieta-katarzyna': ISingleBookingDate[];
  'zerniki-wroclawskie': ISingleBookingDate[];
  [x: string]: string | ISingleBookingDate[];
}

export type { ISummaryClientBookings };
