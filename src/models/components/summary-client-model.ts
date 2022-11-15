import { IBooking, ISingleBookingDate } from 'models/store/booking-models';
import { IClient } from 'models/store/client-models';

type IGeneralBookingDetails = Pick<
IBooking,
'payment' | 'message' | 'extraOptions' | 'selectedOptions' | 'size' | 'building'
>;

interface IBookedTime {
  generalBookingDetails: IGeneralBookingDetails;
  bookingTimeDetails: ISingleBookingDate[];
}

interface IReportBookingByCity {
  radwanice: IBookedTime[];
  siechnice: IBookedTime[];
  'swieta-katarzyna': IBookedTime[];
  'zerniki-wroclawskie': IBookedTime[];
}

interface ISummaryClientBookings extends IReportBookingByCity {
  client: IClient;

  [x: string]: string | IClient | IBookedTime[] | undefined;
}

export type { ISummaryClientBookings, IBookedTime, IReportBookingByCity, IGeneralBookingDetails };
