import { IAdminState, IBooking } from 'models';

/**
 * Function to filter reservation related to the place
 * @param  bookingList
 * @param  mainState
 * @param  isAdmin
 * @returns {Array<IBooking>}
 */
const filterBookingsPerPlace = (
  bookingList: IBooking[],
  mainState: IAdminState,
  isAdmin: boolean = false
): IBooking[] => {
  const { city, building } = mainState;
  return bookingList.filter(
    (b) => b.city === city.value && b.building === building.value && (isAdmin || b.accepted)
  );
};

export { filterBookingsPerPlace };