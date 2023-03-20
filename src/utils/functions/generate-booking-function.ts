import {
   IBooking,
   IBookingForm,
   IBookingStatusForm,
   ISelectedExtraOptions,
   ISingleBookingDate,
   TSelect
} from 'models';
import {
   BOOKING_STATUS,
   BUILDINGS_OPTIONS,
   CITY_OPTIONS,
   CLIENT_TYPE,
   DISCOUNT_OPTIONS,
   PAYMENTS_OPTIONS,
   SIZE_OPTIONS
} from 'utils';
import { isEqual, uniqWith } from 'lodash';
import { formatCalenderDate, formatCalenderHours } from './calender-functions';
import { findSelectedOption } from './utils-functions';

/**
 * Function to overwrite booking day object and add one hour to be as in CET time zone
 * @param  day
 * @param  hour
 * @returns {Date}
 */
const overwriteDate = (day: Date, hour: Date): Date => {
   const convertedDay = formatCalenderDate(day);
   const convertedHour = formatCalenderHours(
      new Date(hour.getTime() - hour.getTimezoneOffset() * 60000)
   );
   return new Date(`${convertedDay}${convertedHour}`);
};

/**
 * Function to check and return number of full weeks between two date
 * @param  d1
 * @param  d2
 * @returns {Number}
 */
function calculateWeeksBetween(d1: number, d2: number): number {
   return Math.round((d2 - d1) / (7 * 24 * 60 * 60 * 1000));
}

/**
 * Function to create bookingTime object.
 * It calculates if the current booking is single or periodic reservation.
 * If so then it generates array of bookingTime objects.
 * @param  cred
 * @returns {Array<ISingleBookingDate>}
 */
const bookingTimeCreator = (cred: IBookingForm): ISingleBookingDate[] => {
   const { startDate, endDate, startHour, endHour, regular } = cred;
   const bookingArray: ISingleBookingDate[] = [
      {
         day: new Date(`${formatCalenderDate(startDate)}T00:01:00.000Z`),
         startHour: overwriteDate(startDate, startHour),
         endHour: overwriteDate(startDate, endHour),
         comments: '',
         participants: '',
         status: BOOKING_STATUS.INITIAL
      }
   ];

   if (!regular) {
      return bookingArray;
   }
   /* one week is 604800000 ms */
   const weekInMilliseconds = 604800000;
   let index = 1;
   const weeksBetween = calculateWeeksBetween(startDate.getTime(), endDate.getTime());
   do {
      const day = new Date(startDate.getTime() + weekInMilliseconds * index);
      bookingArray.push({
         day: new Date(`${formatCalenderDate(day)}T00:01:00.000Z`),
         startHour: overwriteDate(day, startHour),
         endHour: overwriteDate(day, endHour),
         comments: '',
         participants: '',
         status: BOOKING_STATUS.INITIAL
      });
      index += 1;
   } while (index <= weeksBetween);
   return bookingArray;
};

/**
 * Function to generate final booking object saved in database
 * @param  cred
 * @param  selectedSize
 * @param  extraOptions
 * @param  id
 * @returns {Object<IBooking>}
 */
const generateBookingDetails = (
   cred: IBookingForm,
   selectedSize: SIZE_OPTIONS,
   extraOptions: ISelectedExtraOptions[],
   id: string = ''
): IBooking => {
   const bookingTime = bookingTimeCreator(cred);
   return {
      type: CLIENT_TYPE.CLIENT,
      city: cred.city.value,
      building: cred.building.value,
      size: selectedSize,
      clientId: cred.clientId?.value || '',
      person: cred.person,
      club: cred.club || '',
      email: cred.email,
      phone: cred.phone,
      regular: cred.regular,
      month: cred.startDate.getMonth(),
      accepted: cred.accepted || false,
      message: cred.message,
      payment: cred.payment.value,
      discount: cred.discount,
      extraOptions: !!extraOptions.length,
      selectedOptions: extraOptions,
      archive: cred.archive || false,
      bookingTime,
      id
   };
};

/**
 * Function to generate single booking status data
 * @param  cred
 * @param  currentBooking
 * @param  subItemIndex
 * @returns {Object<IBooking>}
 */
const generateBookingStatusDate = (
   cred: IBookingStatusForm,
   currentBooking: IBooking,
   subItemIndex: number
): IBooking => {
   let updatedBT = currentBooking.bookingTime[subItemIndex];
   updatedBT = {
      ...updatedBT,
      status: cred.bookingStatus.value,
      comments: cred.bookingComments,
      participants: cred.bookingParticipants
   };
   currentBooking.bookingTime.splice(subItemIndex, 1, updatedBT);
   return {
      ...currentBooking,
      bookingTime: [...currentBooking.bookingTime]
   };
};

/**
 * Function to generate form object user in React Hook Forms
 * @param  currentBooking
 * @param  clientId
 * @param  city
 * @returns {Object<IBookingForm>}
 */
const generateBookingFormDetails = (
   currentBooking: IBooking,
   clientId?: TSelect,
   city?: TSelect
): IBookingForm => {
   const firstBookingTimes = currentBooking.bookingTime[0];
   const lastBookingTimes = currentBooking.bookingTime[currentBooking.bookingTime.length - 1];
   return {
      ...currentBooking,
      city: findSelectedOption(currentBooking.city, CITY_OPTIONS) || CITY_OPTIONS[0],
      building: findSelectedOption(
         currentBooking.building,
         BUILDINGS_OPTIONS[city?.value || CITY_OPTIONS[0].value]
      ),
      payment: findSelectedOption(currentBooking.payment, PAYMENTS_OPTIONS),
      discount: currentBooking.discount || DISCOUNT_OPTIONS[0],
      startDate: firstBookingTimes.day,
      endDate: lastBookingTimes.day,
      startHour: firstBookingTimes.startHour,
      endHour: firstBookingTimes.endHour,
      clientId
   };
};
const concatBookingTime = (
   prevBookingTime: ISingleBookingDate[],
   curBookingTime: ISingleBookingDate[]
): ISingleBookingDate[] => {
   const resolvedBT = prevBookingTime.filter((bt) => bt.status !== BOOKING_STATUS.INITIAL);
   return uniqWith([...resolvedBT, ...curBookingTime], (a, b) =>
      isEqual(a.day.getTime(), b.day.getTime())
   ).sort((a, b) => {
      if (a.day.getTime() < b.day.getTime()) return -1;
      return 1;
   });
};

export {
   generateBookingDetails,
   generateBookingFormDetails,
   generateBookingStatusDate,
   concatBookingTime,
   overwriteDate
};
