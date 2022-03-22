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

const checkDay = (dOne: Date, dTwo: Date) => {
  if (Date.parse(new Date(dOne).toISOString()) - Date.parse(new Date(dTwo).toISOString()) === 0)
    return true;
  return false;
};

const checkHoursRange = (checkDate: Date, startHour: Date, endHour: Date) => {
  if (checkDate.getTime() <= endHour.getTime() && checkDate.getTime() >= startHour.getTime()) {
    return true;
  }
  return false;
};

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
