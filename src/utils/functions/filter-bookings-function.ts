import { IAdminState, IBooking } from 'models';

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
