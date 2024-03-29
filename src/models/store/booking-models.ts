// eslint-disable-next-line import/no-cycle
import {IPayload, ISelectedExtraOptions} from 'models';
import {CLIENT_TYPE, SIZE_OPTIONS} from 'utils';

interface BookingDataLoadOptions {
   label: string;
   value: {
      startDate: string;
      endDate: string;
   };
}

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
   nick: string;
   person: string;
   club?: string;
   email: string;
   phone: string;
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
   createdBy: string;
   createdAt: string;
   modifiedBy: string;
   modifiedAt: string;

   [x: string]: TBooking;
}

interface IBookingToApprove
   extends Omit<IBooking, 'createdBy' | 'createdAt' | 'modifiedBy' | 'modifiedAt'> {}

interface IBookingTimeStamp
   extends Pick<IBooking, 'createdBy' | 'createdAt' | 'modifiedBy' | 'modifiedAt'> {}

interface IBookingsPayload extends IPayload {
   booking?: IBooking;
   bookingTimeIndex: number | null;
   bookings: IBooking[];
   conflictedBookings: IBooking[];
   selectedLoadedPeriod: string;
}

interface IBookingsAction {
   type: string;
   payload: IBookingsPayload;
}

export type {
   BookingDataLoadOptions,
   ISingleBookingDate,
   IBooking,
   IBookingToApprove,
   IBookingTimeStamp,
   IBookingsPayload,
   IBookingsAction,
   TBooking
};
