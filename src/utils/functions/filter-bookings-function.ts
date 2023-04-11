import {IAdminState, IBooking, IClient} from 'models';

/**
 * Function to set string value as lower case.
 *
 * @param s
 */
const formatData = (s: string): string => s.toLocaleLowerCase().trim();

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
   const {city, building} = mainState;
   return bookingList.filter(
      (b) => b.city === city.value && b.building === building.value && (isAdmin || b.accepted)
   );
};

/**
 * Function to search selected content tapped search phase.
 *
 * @param searchContent
 * @param searchProperty
 * @param searchPhase
 */
const searchSelectedContent = (
   searchContent: (IClient | IBooking)[],
   searchProperty: string,
   searchPhase: string
): (IClient | IBooking)[] =>
   searchContent.filter((c) =>
      formatData(c[searchProperty] as string).includes(formatData(searchPhase))
   );

export {filterBookingsPerPlace, searchSelectedContent};
