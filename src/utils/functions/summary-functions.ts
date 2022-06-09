import { cloneDeep } from 'lodash';
import { IBookedTime, IBooking, ISummaryClientBookings, TSelect } from 'models';

/**
 * Function to find all reservation assigned to client id
 * @param  bookings
 * @param  clientValue
 * @param  monthValue
 * @returns {Array<IBooking>}
 */
const findAllClientReservation = (bookings: IBooking[], clientValue: TSelect): IBooking[] =>
  bookings.filter((b) => b.clientId === clientValue.value);

/**
 * Function to model all client reservation and divide it into to cities.
 * Inside reducer looking for reservation time only on current month.
 * @param  initialState
 * @param  allClientReservations
 * @param  monthValue
 * @returns {ISummaryClientBookings}
 */
const generateReservationSummary = (
  initialState: ISummaryClientBookings,
  allClientReservations: IBooking[],
  monthValue: Date
): ISummaryClientBookings => {
  const initialAllReservationsState = cloneDeep(initialState);
  allClientReservations.forEach((r) => {
    if (Array.isArray(initialAllReservationsState[`${r.city}`])) {
      initialAllReservationsState[`${r.city}`] = [
        ...(initialAllReservationsState[r.city] as IBookedTime[]),
        ...r.bookingTime.reduce((acc: IBookedTime[], bt) => {
          if (new Date(bt.day).getMonth() === new Date(monthValue).getMonth()) {
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
