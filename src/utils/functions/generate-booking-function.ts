import {
   IBooking,
   IBookingForm,
   IBookingStatusForm,
   IBookingTimeForm,
   ISelectedExtraOptions,
   ISingleBookingDate,
   TSelect
} from 'models';
import {
   BUILDINGS_OPTIONS,
   CITY_OPTIONS,
   CLIENT_TYPE,
   DISCOUNT_OPTIONS,
   PAYMENTS_OPTIONS,
   SIZE_OPTIONS,
   findSelectedOption,
   BOOKING_STATUS,
   formatCalenderDate,
   formatCalenderHours
} from 'utils';
import {isEqual, uniqWith} from 'lodash';

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
 * @param  {IBookingTimeForm} cred
 * @returns {Array<ISingleBookingDate>}
 */
const bookingTimeCreator = (cred: IBookingTimeForm): ISingleBookingDate[] => {
   const {startDay, endDay, startHour, endHour, cyclical} = cred;
   const bookingArray: ISingleBookingDate[] = [
      {
         day: new Date(`${formatCalenderDate(startDay)}T00:01:00.000Z`),
         startHour: overwriteDate(startDay, startHour),
         endHour: overwriteDate(startDay, endHour),
         comments: '',
         participants: '',
         status: BOOKING_STATUS.INITIAL
      }
   ];

   if (!cyclical) {
      return bookingArray;
   }
   /* one week is 604800000 ms */
   const weekInMilliseconds = 604800000;
   let index = 1;
   const weeksBetween = calculateWeeksBetween(startDay.getTime(), endDay.getTime());
   do {
      const day = new Date(startDay.getTime() + weekInMilliseconds * index);
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
 *
 * @param {IBookingForm} cred
 * @param {SIZE_OPTIONS} selectedSize
 * @param {Array<ISingleBookingDate>} bookingTime
 * @param {Array<ISelectedExtraOptions>} extraOptions
 * @param {String} id
 * @returns {Object<IBooking>}
 */
const generateBookingDetails = (
   cred: IBookingForm,
   selectedSize: SIZE_OPTIONS,
   bookingTime: ISingleBookingDate[],
   extraOptions: ISelectedExtraOptions[],
   id: string = ''
): IBooking => ({
   type: CLIENT_TYPE.CLIENT,
   city: cred.city.value,
   building: cred.building.value,
   size: selectedSize,
   clientId: cred.clientId?.value || '',
   person: cred.person,
   club: cred.club || '',
   email: cred.email,
   phone: cred.phone,
   month: bookingTime[0].day.getMonth(),
   accepted: cred.accepted || false,
   message: cred.message,
   payment: cred.payment.value,
   discount: cred.discount,
   extraOptions: !!extraOptions.length,
   selectedOptions: extraOptions,
   archive: cred.archive || false,
   bookingTime,
   id
});
/**
 * Function to generate single booking status data.
 *
 * @param  {IBookingStatusForm} cred
 * @param  {IBooking} currentBooking
 * @param  {Number} subItemIndex
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
 * Function to generate form object user in React Hook Forms.
 *
 * @param  {IBooking} currentBooking
 * @param  {TSelect} clientId
 * @param  {TSelect} city
 * @returns {Object<IBookingForm>}
 */
const generateBookingFormDetails = (
   currentBooking: IBooking,
   clientId?: TSelect,
   city?: TSelect
): IBookingForm => ({
   ...currentBooking,
   city: findSelectedOption(currentBooking.city, CITY_OPTIONS) || CITY_OPTIONS[0],
   building: findSelectedOption(
      currentBooking.building,
      BUILDINGS_OPTIONS[city?.value || CITY_OPTIONS[0].value]
   ),
   payment: findSelectedOption(currentBooking.payment, PAYMENTS_OPTIONS),
   discount: currentBooking.discount || DISCOUNT_OPTIONS[0],
   clientId
});

/**
 * Function to connect two booking time array.
 *
 * @param prevBookingTime
 * @param curBookingTime
 */
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

/**
 * Function to generate max rang in data type input.
 * If we have august then extend it for next year.
 *
 * @returns {Date}
 */
const generateMaxRangDate = (): Date => {
   let currentYear = new Date().getFullYear();
   if (new Date().getMonth() >= 7) {
      currentYear += 1;
   }
   return new Date(`${currentYear}-01-01T00:01:00.676Z`);
};

export {
   generateBookingDetails,
   generateBookingFormDetails,
   generateBookingStatusDate,
   generateMaxRangDate,
   bookingTimeCreator,
   concatBookingTime
};
