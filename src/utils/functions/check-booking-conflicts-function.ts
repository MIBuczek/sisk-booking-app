/* eslint-disable no-debugger */
import { uniq } from 'lodash';
import { IBooking } from 'models';
import { formatDate } from './calender-functions';

const checkHours = (hOne: Date, hTwo: Date) => {
  const parseHOne = Date.parse(hOne.toISOString());
  const parseHTwo = Date.parse(hTwo.toISOString());
  if (Math.abs(parseHOne - parseHTwo) <= 3600000) {
    return true;
  }
  return false;
};

const checkDay = (dOne: Date, dTwo: Date) => {
  if (Date.parse(formatDate(dOne)) - Date.parse(formatDate(dTwo)) === 0) return true;
  return false;
};

const checkConflicts = (currentBooking: IBooking, allBookings: IBooking[]): boolean => {
  let isConflict = false;
  allBookings.forEach((b) => {
    if (
      b.id !== currentBooking.id &&
      currentBooking.building === b.building &&
      currentBooking.month === b.month
    ) {
      b.bookingTime.forEach((cbt) => {
        const conflictDate = currentBooking.bookingTime.some((cb) => {
          const sameDay = checkDay(cb.day, cbt.day);
          const sameStartHours = checkHours(cb.startHour, cbt.startHour);
          const sameEndHours = checkHours(cb.endHour, cbt.endHour);
          // debugger;
          if (sameDay && (sameStartHours || sameEndHours)) {
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
