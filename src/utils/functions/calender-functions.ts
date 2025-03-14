import {IBooking} from 'models';
import {BOOKING_STATUS} from 'utils';

/**
 * Function to format time zone off set
 * @param {Date} d
 * @param {Number} month
 * @returns {Number}
 */
const formatTimeZoneToCheck = (d: Date, month: number): number =>
   new Date(d.getFullYear(), month, 1).getTimezoneOffset();

/**
 * Function to check if current date is Daylight Saving Time period
 *
 * @param {Date} date
 * @returns {Boolean}
 */
const checkIfWinterTimeZone = (date: Date): boolean =>
   Math.max(formatTimeZoneToCheck(date, 0), formatTimeZoneToCheck(date, 6)) !==
   date.getTimezoneOffset();

/**
 * Function to transform date object into local date string
 *
 * @param {Date | null} date
 * @returns {String}
 */
const formatDate = (date: Date | string | null): string => {
   if (!date) return 'Unknown';
   if (typeof date === 'string') {
      return new Date(date).toLocaleDateString();
   }
   return date.toLocaleDateString();
};

/**
 * Function to transform date object into string
 *
 * @param  {Date|null} date
 * @returns {String}
 */
const formatTime = (date: Date | null): string => {
   if (!date) return '';
   const dateHour: number = date.getHours();
   const dateMinutes: number = date.getMinutes();

   let minutes = `${dateMinutes}`;
   if (dateMinutes === 0) {
      minutes = '00';
   }
   if (dateMinutes > 0 && dateMinutes < 10) {
      minutes = `0${dateMinutes}`;
   }

   return `${dateHour}:${minutes}`;
};

/**
 * Function to cut display date object into short part day/month/year
 *
 * @param  {Date|String} date
 * @returns {String}
 */
const formatCalenderDate = (date: Date | string): string => {
   const stringDate = new Date(date).toISOString();
   const index = stringDate.indexOf('T');
   return stringDate.substring(0, index);
};

/**
 * Function to transform date object into correct Warsaw time zone
 *
 * @param date
 * @returns {String}
 */
const formatDisplayTime = (date: Date | string) => {
   const formDate = new Date(date);
   const addHours = checkIfWinterTimeZone(formDate) ? 2 : 1;
   formDate.setHours(formDate.getHours() + addHours);
   const stringDate = formDate.toISOString();
   const index = stringDate.indexOf('T');
   const lastIndex = stringDate.lastIndexOf('.');
   return stringDate.substring(index, lastIndex);
};

/**
 * Function to transform date object into accepted calendar hours format
 *
 * @param date
 * @returns {String}
 */
const formatCalenderHours = (date: Date): string => {
   const checkedDate = new Date(date).toISOString();
   const index = checkedDate.indexOf('T');
   const lastIndex = checkedDate.lastIndexOf('.');
   return checkedDate.substring(index, lastIndex);
};

/**
 * Function to generate background color for calendar item
 *
 * @param accepted
 * @param status
 * @returns {String}
 */
const generateStatusBackground = (accepted: boolean, status: string): string => {
   if (status === BOOKING_STATUS.DONE) {
      return '#454545';
   }
   if (accepted) {
      return '#AFBF36';
   }
   return '#3788d8';
};

/**
 * Function generate reservation calendar object display into view.
 *
 * @param itemTitle
 * @param booking
 * @param index
 * @returns {Object}
 */
const prepareCalenderItem = (itemTitle: string, booking: IBooking, index: number) => {
   const {id, size, accepted, bookingTime} = booking;
   const {day, startHour, endHour, status} = bookingTime[index];
   return {
      id,
      allDay: false,
      title: `${itemTitle}`,
      bookedTime: `${formatTime(startHour)} - ${formatTime(endHour)}`,
      bookedSize: `${size}`,
      start: `${formatCalenderDate(day)}${formatDisplayTime(startHour)}`,
      end: `${formatCalenderDate(day)}${formatDisplayTime(endHour)}`,
      backgroundColor: `${generateStatusBackground(accepted, status)}`,
      itemIndex: index,
      accepted
   };
};
/**
 * Function to change day in Date object.
 *
 * @param date
 * @param newDay
 * @returns {String}
 */
const changeDayInDateStart = (date: Date, newDay: number): Date => {
   date.setDate(newDay);
   date.setHours(0, 0, 1, 0);
   return date;
};

const changeDayInDateEnd = (date: Date, newDay: number): Date => {
   date.setDate(newDay);
   date.setHours(23, 59, 59, 0);
   return date;
};

export {
   formatDate,
   prepareCalenderItem,
   formatTime,
   formatCalenderDate,
   formatCalenderHours,
   changeDayInDateStart,
   changeDayInDateEnd
};
