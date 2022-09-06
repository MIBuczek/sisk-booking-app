import { cloneDeep } from 'lodash';
import { IBookedTime, IBooking, ISummaryClientBookings, TSelect } from 'models';
import { changeDayInDate } from './calender-functions';

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
 * @param  initialState
 * @param  allClientReservations
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
      initialAllReservationsState[`${r.city}`] = [
        ...(initialAllReservationsState[r.city] as IBookedTime[]),
        ...r.bookingTime.reduce((acc: IBookedTime[], bt) => {
          const bookingDate = new Date(bt.day);
          const fromSelectedMonth = changeDayInDate(new Date(fromMonth), 1);
          const toSelectedMonth = changeDayInDate(new Date(toMonth), numberOfMonthDays(toMonth));
          if (
            fromTheBeginning ||
            (bookingDate.getTime() >= fromSelectedMonth.getTime() &&
              bookingDate.getTime() <= toSelectedMonth.getTime())
          ) {
            acc.push({
              ...bt,
              building: r.building,
              size: r.size
            });
          }
          return acc;
        }, [])
      ];
    }
  });
  return initialAllReservationsState;
};

export { findAllClientReservation, generateReservationSummary };
