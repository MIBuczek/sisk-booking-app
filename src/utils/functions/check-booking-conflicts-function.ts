import {cloneDeep, uniq} from 'lodash';
import {IBooking, ISingleBookingDate} from 'models';
import {BOOKING_STATUS} from 'utils';

/**
 * Function to check day into two date object.
 * If it is the same return true
 * @param {Date} dOne
 * @param {Date} dTwo
 * @returns {Boolean}
 */
const checkDay = (dOne: Date, dTwo: Date): boolean =>
   Date.parse(new Date(dOne).toISOString()) - Date.parse(new Date(dTwo).toISOString()) === 0;

/**
 * Function to check time into date.
 * If  one of date is between start amd end time other booking return true (possible time conflict)
 * @param {Date} checkDate
 * @param {Date} startHour
 * @param {Date} endHour
 * @returns {Boolean}
 */
const checkHoursRange = (checkDate: Date, startHour: Date, endHour: Date): boolean =>
   checkDate.getTime() > startHour.getTime() && checkDate.getTime() < endHour.getTime();

/**
 * Function to check time between date.
 * If date start or date end are closed between other two dates then return true (possible time conflict)
 * @param  {Date} checkStartDate
 * @param  {Date} checkEndDate
 * @param  {Date} startHour
 * @param  {Date} endHour
 * @returns {Boolean}
 */
const checkOverlapCase = (
   checkStartDate: Date,
   checkEndDate: Date,
   startHour: Date,
   endHour: Date
): boolean =>
   checkStartDate.getTime() <= startHour.getTime() &&
   checkStartDate.getTime() <= endHour.getTime() &&
   checkEndDate.getTime() >= startHour.getTime() &&
   checkEndDate.getTime() >= endHour.getTime();

/**
 * Function to check if single booking time has conflict with other single booking time.
 * @param {ISingleBookingDate} bt
 * @param {ISingleBookingDate} cbt
 * @returns {Boolean}
 */
const checkSingleBookingTime = (bt: ISingleBookingDate, cbt: ISingleBookingDate): boolean => {
   const sameDay = checkDay(bt.day, cbt.day);
   const checkStartHour = checkHoursRange(bt.startHour, cbt.startHour, cbt.endHour);
   const checkEndHour = checkHoursRange(bt.endHour, cbt.startHour, cbt.endHour);
   const isOverlap = checkOverlapCase(bt.startHour, bt.endHour, cbt.startHour, cbt.endHour);

   return sameDay && (checkStartHour || checkEndHour || isOverlap);
};

/**
 * Function to check if one booking time has conflict with others.
 *
 * @param {ISingleBookingDate} bookingTime
 * @param {Number} bookingTimeIndex
 * @param {Array<ISingleBookingDate>} allBookingTimes
 * @returns {Boolean}
 */
const checkNewAddedBookingTimeConflicts = (
   bookingTime: ISingleBookingDate,
   bookingTimeIndex: number,
   allBookingTimes: ISingleBookingDate[]
): boolean => {
   let isConflict = false;
   const bookingTimeToCheck = cloneDeep(allBookingTimes);
   bookingTimeToCheck.splice(bookingTimeIndex, 1);
   const conflictDate = bookingTimeToCheck.some((bt) => checkSingleBookingTime(bookingTime, bt));
   if (conflictDate) isConflict = true;
   return isConflict;
};

/**
 * Function to check if one booking has conflict with others.
 * @param  {IBooking} currentBooking
 * @param  {Array<IBooking>} currentPlaceBookings
 * @returns {Boolean}
 */
const checkConflicts = (currentBooking: IBooking, currentPlaceBookings: IBooking[]): boolean => {
   let isConflict = false;

   if (currentBooking.accepted) {
      return isConflict;
   }

   currentPlaceBookings.forEach((b) => {
      if (currentBooking.id !== b.id && currentBooking.month === b.month) {
         b.bookingTime.forEach((cbt) => {
            const conflictDate = currentBooking.bookingTime.some((cb): boolean =>
               checkSingleBookingTime(cb, cbt)
            );
            if (conflictDate) {
               isConflict = true;
            }
         });
      }
   });
   return isConflict;
};

/**
 * Function to check if inside booking array it already any conflict.
 * If yes, return item id
 * @param {Array<IBooking>} currentPlaceBookings
 * @returns {Array<string>}
 */
const checkAllBookingsConflicts = (currentPlaceBookings: IBooking[]): string[] => {
   let conflictedBookingArray: string[] = [];

   if (currentPlaceBookings.length <= 1) {
      return conflictedBookingArray;
   }

   currentPlaceBookings.forEach((currentBooking) => {
      if (!currentBooking.accepted && checkConflicts(currentBooking, currentPlaceBookings)) {
         conflictedBookingArray = [...conflictedBookingArray, currentBooking.id];
      }
   });

   return uniq(conflictedBookingArray);
};

/**
 * Function to check if single booking day has conflict with any of reservation on selected sport object.
 * @param {ISingleBookingDate} singleBookingDay
 * @param {String} singleBookingId
 * @param {Number} singleBookingMonth
 * @param {Array<IBooking>} currentPlaceBookings
 * @returns Boolean
 */
const checkSingleDayConflict = (
   singleBookingDay: ISingleBookingDate,
   singleBookingId: string,
   singleBookingMonth: number,
   currentPlaceBookings: IBooking[]
): IBooking[] => {
   let conflictListIds: IBooking[] = [];
   const {status} = singleBookingDay;

   if (currentPlaceBookings)
      currentPlaceBookings.forEach((bookingOnPlace) => {
         if (
            status === BOOKING_STATUS.INITIAL &&
            singleBookingId !== bookingOnPlace.id &&
            singleBookingMonth === bookingOnPlace.month
         ) {
            bookingOnPlace.bookingTime.forEach((checkedBookingTime) => {
               if (checkSingleBookingTime(singleBookingDay, checkedBookingTime)) {
                  conflictListIds = [
                     ...conflictListIds,
                     {...bookingOnPlace, bookingTime: [{...checkedBookingTime}]}
                  ];
               }
            });
         }
      });

   return conflictListIds;
};

export {
   checkConflicts,
   checkAllBookingsConflicts,
   checkSingleDayConflict,
   checkNewAddedBookingTimeConflicts
};
