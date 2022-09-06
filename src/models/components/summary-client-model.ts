import { ISingleBookingDate } from 'models/store/booking-models';
import { IClient } from 'models/store/client-models';

interface IBookedTime extends ISingleBookingDate {
  building: string;
  size: string;
  status: string;
}

interface IReportBookingByCity {
  radwanice: IBookedTime[];
  siechnice: IBookedTime[];
  'swieta-katarzyna': IBookedTime[];
  'zerniki-wroclawskie': IBookedTime[];
}

interface ISummaryClientBookings extends IReportBookingByCity {
  client: IClient;

  [x: string]: string | IBookedTime[] | IClient | undefined;
}

export type { ISummaryClientBookings, IBookedTime, IReportBookingByCity };
