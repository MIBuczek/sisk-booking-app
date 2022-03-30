import { uniq } from 'lodash';
import { IBooking } from 'models';

// const checkHours = (hOne: Date, hTwo: Date) => {
//   const parseHOne = Date.parse(hOne.toISOString());
//   const parseHTwo = Date.parse(hTwo.toISOString());
//   if (Math.abs(parseHOne - parseHTwo) <= 3600000) {
//     return true;
//   }
//   return false;
// };

/**
 * Function to check day into two date object.
 * If it the same return true
 * @param  dOne
 * @param  dTwo
 * @returns {Boolean}
 */
const checkDay = (dOne: Date, dTwo: Date) => {
  if (Date.parse(new Date(dOne).toISOString()) - Date.parse(new Date(dTwo).toISOString()) === 0)
    return true;
  return false;
};

/**
 * Function to check time into date.
 * If it between start and end time other booking return true (possible time conflict)
 * @param  checkDate
 * @param  startHour
 * @param  endHour
 * @returns {Boolean}
 */
const checkHoursRange = (checkDate: Date, startHour: Date, endHour: Date) => {
  if (checkDate.getTime() <= endHour.getTime() && checkDate.getTime() >= startHour.getTime()) {
    return true;
  }
  return false;
};

/**
 * Function to check if one booking has conflict with others.
 * @param  currentBooking
 * @param  allBookings
 * @returns {Boolean}
 */
const checkConflicts = (currentBooking: IBooking, allBookings: IBooking[]): boolean => {
  let isConflict = false;
  allBookings.forEach((b) => {
    if (
      currentBooking.id !== b.id &&
      currentBooking.city === b.city &&
      currentBooking.building === b.building &&
      currentBooking.month === b.month
    ) {
      b.bookingTime.forEach((cbt) => {
        const conflictDate = currentBooking.bookingTime.some((cb) => {
          const sameDay = checkDay(cb.day, cbt.day);
          const checkStartHour = checkHoursRange(cb.startHour, cbt.startHour, cbt.endHour);
          const checkEndHour = checkHoursRange(cb.endHour, cbt.startHour, cbt.endHour);

          if (sameDay && (checkStartHour || checkEndHour)) {
            return true;
          }
          return false;
        });
        if (conflictDate && !currentBooking.accepted) {
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
 * @param  allBookings
 * @returns {Array<string>}
 */
const checkAllBookingsConflicts = (allBookings: IBooking[]): string[] => {
  let confectBookingArray: string[] = [];

  if (allBookings.length <= 1) {
    return confectBookingArray;
  }

  allBookings.forEach((currentBooking) => {
    if (checkConflicts(currentBooking, allBookings)) {
      confectBookingArray = [...confectBookingArray, currentBooking.id];
    }
  });

  return uniq(confectBookingArray);
};

export { checkConflicts, checkAllBookingsConflicts };
