import { cloneDeep } from 'lodash';
import { IBooking, ISummaryClientBookings, TSelect } from 'models';

/**
 * Function to find all reservation assigned to client id
 * @param  bookings
 * @param  clientValue
 * @param  monthValue
 * @returns {Array<IBooking>}
 */
const findAllClientReservation = (
  bookings: IBooking[],
  clientValue: TSelect,
  monthValue: Date
): IBooking[] =>
  bookings.filter((b) => {
    if (b.clientId === clientValue.value && b.month === new Date(monthValue).getMonth()) {
      return true;
    }
    return false;
  });

/**
 * Function to model all client reservation and divide it into to cities
 * @param  initialState
 * @param  allClientReservations
 * @returns {ISummaryClientBookings}
 */
const generateReservationSummary = (
  initialState: ISummaryClientBookings,
  allClientReservations: IBooking[]
): ISummaryClientBookings => {
  const initialAllReservationsState = cloneDeep(initialState);
  allClientReservations.forEach((r) => {
    // @ts-ignore
    initialAllReservationsState[`${r.city}`] = [
      ...initialAllReservationsState[r.city],
      ...r.bookingTime.map((bt) => ({ ...bt, building: r.building, size: r.size }))
    ];
  });

  return initialAllReservationsState;
};

export { findAllClientReservation, generateReservationSummary };
