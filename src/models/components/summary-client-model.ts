import {IBooking, ISingleBookingDate} from 'models/store/booking-models';
import {IClient} from 'models/store/client-models';
import {IClientForm} from '../forms/client-form-model';

type IGeneralBookingDetails = Pick<
   IBooking,
   'payment' | 'message' | 'extraOptions' | 'selectedOptions' | 'size' | 'building' | 'discount'
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

type CSVBookingKeys = keyof Pick<
   IBooking,
   | 'type'
   | 'payment'
   | 'size'
   | 'building'
   | 'message'
   | 'extraOptions'
   | 'selectedOptions'
   | 'discount'
>;

type CSVClientKeys = keyof Pick<
   IClientForm,
   'name' | 'contactPerson' | 'street' | 'city' | 'zipCode' | 'nip' | 'phone' | 'email'
>;

type CSVReportKeys =
   | CSVBookingKeys
   | CSVClientKeys
   | keyof ISingleBookingDate
   | 'startHourOption'
   | 'endHourOption'
   | 'cityBooking';

interface ICSVHeaders {
   label: string;
   key: CSVReportKeys;
}

type CSVReportData = {
   [x in CSVReportKeys]: string;
};

export type {
   ISummaryClientBookings,
   IBookedTime,
   IReportBookingByCity,
   IGeneralBookingDetails,
   ICSVHeaders,
   CSVReportData,
   CSVBookingKeys,
   CSVClientKeys,
   CSVReportKeys
};
