import { cloneDeep } from 'lodash';
import { IBooking, ISummaryClientBookings, TSelect } from 'models';

const findAllClientReservation = (
  bookings: IBooking[],
  clientValue: TSelect,
  monthValue: Date
): IBooking[] =>
  bookings.filter((b) => {
    console.log(b.month === new Date(monthValue).getMonth());
    if (b.clientId === clientValue.value && b.month === new Date(monthValue).getMonth()) {
      return true;
    }
    return false;
  });

const generateReservationSummary = (
  initialState: ISummaryClientBookings,
  allClientReservations: IBooking[]
) => {
  const initialAllReservationsState = cloneDeep(initialState);
  allClientReservations.forEach((r) => {
    // @ts-ignore
    initialAllReservationsState[`${r.city}`] = [
      ...initialAllReservationsState[r.city],
      ...r.bookingTime
    ];
  });

  return initialAllReservationsState;
};

export { findAllClientReservation, generateReservationSummary };
