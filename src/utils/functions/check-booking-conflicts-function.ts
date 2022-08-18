import { uniq } from 'lodash';
import { IBooking } from 'models';

/**
 * Function to check day into two date object.
 * If it the same return true
 * @param  dOne
 * @param  dTwo
 * @returns {Boolean}
 */
const checkDay = (dOne: Date, dTwo: Date) =>
  Date.parse(new Date(dOne).toISOString()) - Date.parse(new Date(dTwo).toISOString()) === 0;

/**
 * Function to check time into date.
 * If  one of date is between start amd end time other booking return true (possible time conflict)
 * @param  checkDate
 * @param  startHour
 * @param  endHour
 * @returns {Boolean}
 */
const checkHoursRange = (checkDate: Date, startHour: Date, endHour: Date) =>
  checkDate.getTime() > startHour.getTime() && checkDate.getTime() < endHour.getTime();

/**
 * Function to check time between date.
 * If date start or date end are closed between other two dates then return true (possible time conflict)
 * @param  checkStartDate
 * @param  checkEndDate
 * @param  startHour
 * @param  endHour
 * @returns {Boolean}
 */
const checkOverlapCase = (
  checkStartDate: Date,
  checkEndDate: Date,
  startHour: Date,
  endHour: Date
) =>
  checkStartDate.getTime() <= startHour.getTime() &&
  checkStartDate.getTime() <= endHour.getTime() &&
  checkEndDate.getTime() >= startHour.getTime() &&
  checkEndDate.getTime() >= endHour.getTime();

/**
 * Function to check if one booking has conflict with others.
 * @param  currentBooking
 * @param  currentPlaceBookings
 * @returns {Boolean}
 */
const checkConflicts = (currentBooking: IBooking, currentPlaceBookings: IBooking[]): boolean => {
  let isConflict = false;
  currentPlaceBookings.forEach((b) => {
    if (currentBooking.id !== b.id && currentBooking.month === b.month) {
      b.bookingTime.forEach((cbt) => {
        const conflictDate = currentBooking.bookingTime.some((cb) => {
          const sameDay = checkDay(cb.day, cbt.day);
          const checkStartHour = checkHoursRange(cb.startHour, cbt.startHour, cbt.endHour);
          const checkEndHour = checkHoursRange(cb.endHour, cbt.startHour, cbt.endHour);
          const isOverlap = checkOverlapCase(cb.startHour, cb.endHour, cbt.startHour, cbt.endHour);

          return sameDay && (checkStartHour || checkEndHour || isOverlap);
        });
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
 * @param  currentPlaceBookings
 * @returns {Array<string>}
 */
const checkAllBookingsConflicts = (currentPlaceBookings: IBooking[]): string[] => {
  let conflictedBookingArray: string[] = [];

  if (currentPlaceBookings.length <= 1) {
    return conflictedBookingArray;
  }

  currentPlaceBookings.forEach((currentBooking) => {
    if (checkConflicts(currentBooking, currentPlaceBookings)) {
      conflictedBookingArray = [...conflictedBookingArray, currentBooking.id];
    }
  });

  return uniq(conflictedBookingArray);
};

export { checkConflicts, checkAllBookingsConflicts };
