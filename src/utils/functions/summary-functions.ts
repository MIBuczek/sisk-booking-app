import { cloneDeep, isEmpty } from 'lodash';
import {
  IBookedTime,
  IBooking,
  IGeneralBookingDetails,
  ISingleBookingDate,
  ISummaryClientBookings,
  TSelect
} from 'models';
import { changeDayInDate } from './calender-functions';
import { BOOKING_STATUS } from '../variables/booking-status-const';

/**
 * Function to find all reservation assigned to client id
 * @param  bookings
 * @param  clientValue
 * @returns {Array<IBooking>}
 */
const findAllClientReservation = (bookings: IBooking[], clientValue: TSelect): IBooking[] =>
  bookings.filter((b) => b.clientId === clientValue.value);

/**
 * Function to return correct number of day in month
 * @param date
 * @returns Number
 */
const numberOfMonthDays = (date: Date): number => {
  const convertedDate = new Date(date);
  if (convertedDate.getMonth() === 1) {
    return 28;
  }
  if ([0, 2, 4, 6, 7, 9, 11].includes(convertedDate.getMonth())) {
    return 31;
  }
  return 30;
};

/**
 * Function to model all client reservation and divide it into to cities.
 * Inside reducer looking for reservation time only on current month.
 * @param initialState
 * @param allClientReservations
 * @param fromTheBeginning
 * @param fromMonth
 * @param toMonth
 * @returns {ISummaryClientBookings}
 */
const generateReservationSummary = (
  initialState: ISummaryClientBookings,
  allClientReservations: IBooking[],
  fromTheBeginning: boolean,
  fromMonth: Date,
  toMonth: Date
): ISummaryClientBookings => {
  const initialAllReservationsState = cloneDeep(initialState);
  allClientReservations.forEach((r) => {
    if (Array.isArray(initialAllReservationsState[`${r.city}`])) {
      const { payment, extraOptions, selectedOptions, message, bookingTime, size, building } = r;

      /* Create booking time details information */
      const bookingTimeDetails = bookingTime.reduce((acc: ISingleBookingDate[], bt) => {
        const bookingDate = new Date(bt.day);
        const fromSelectedMonth = changeDayInDate(new Date(fromMonth), 1);
        const toSelectedMonth = changeDayInDate(new Date(toMonth), numberOfMonthDays(toMonth));
        if (
          fromTheBeginning ||
          (bookingDate.getTime() >= fromSelectedMonth.getTime() &&
            bookingDate.getTime() <= toSelectedMonth.getTime())
        ) {
          acc.push({ ...bt });
        }
        return acc;
      }, []);

      if (isEmpty(bookingTimeDetails)) {
        return;
      }

      /* Create general booking information */
      const generalBookingDetails: IGeneralBookingDetails = {
        payment,
        extraOptions,
        selectedOptions,
        message,
        size,
        building
      };

      initialAllReservationsState[`${r.city}`] = [
        ...(initialAllReservationsState[r.city] as IBookedTime[]),
        { generalBookingDetails, bookingTimeDetails }
      ];
    }
  });
  return initialAllReservationsState;
};

/**
 * Function to summary all reservation selected client per city.
 * In return string with information about all reservation and also count done.
 * @param  bookingByCity
 */
const summaryTotalBookingsNumber = (bookingByCity: IBookedTime[]): string => {
  let allBookingItems = 0;
  let doneBookingItems = 0;
  bookingByCity.forEach((bt) => {
    allBookingItems += bt.bookingTimeDetails.length;
    bt.bookingTimeDetails.forEach((btd) => {
      if (btd.status === BOOKING_STATUS.DONE) doneBookingItems += 1;
    });
  });
  if (!allBookingItems) {
    return '0 rezerwacji.';
  }
  return `${allBookingItems} rezerwacji, w tym ${doneBookingItems} zrealizowanych.`;
};

export { findAllClientReservation, generateReservationSummary, summaryTotalBookingsNumber };
