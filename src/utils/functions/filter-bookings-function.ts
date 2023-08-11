import {IAdminState, IBooking, IClient, IUser} from 'models';

/**
 * Function to set string value as lower case.
 *
 * @param {String} s
 * @returns {String}
 */
const formatData = (s: string): string => s.toLocaleLowerCase().trim();

/**
 * Function to filter reservation related to the place
 *
 * @param  {Array<IBooking>} bookingList
 * @param {IAdminState} mainState
 * @param {Boolean} isAdmin
 * @returns {Array<IBooking>}
 */
const filterBookingsPerPlace = (
   bookingList: IBooking[],
   mainState: IAdminState,
   user?: IUser
): IBooking[] => {
   const {city, building} = mainState;
   return bookingList.filter(
      (b) =>
         b.city === city.value &&
         b.building === building.value &&
         (user?.isAdmin || b.createdBy.includes(user?.email || '') || b.accepted)
   );
};

/**
 * Function to search selected content tapped search phase.
 *
 * @param {Array<IClient | IBooking>} searchContent
 * @param {String} searchProperty
 * @param {String} searchPhase
 * @returns {Array<IClient | IBooking>}
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
