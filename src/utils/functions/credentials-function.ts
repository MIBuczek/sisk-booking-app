import {IBooking, IClient, IUser, singleInstanceOfBookings} from 'models';

/**
 * Function to check user credentials to see booked usernames
 * @param {IUser | undefined} loggedUsed
 * @returns {Boolean}
 */
const hasRightsToSeeContent = (loggedUsed: IUser | undefined): boolean => {
   if (!loggedUsed) return false;
   const {isAdmin, isEmployee, isOffice} = loggedUsed;
   return isAdmin || isEmployee || isOffice;
};

/**
 * Function to check user credentials
 * @param {IUser | undefined} loggedUsed
 * @returns {Boolean}
 */
const adminCredentials = (loggedUsed: IUser | undefined): boolean => {
   if (!loggedUsed) return false;
   const {isAdmin, isEmployee, isOffice} = loggedUsed;
   if (isAdmin) return true;
   if (isEmployee || isOffice) return false;
   return false;
};

/**
 * Function to check user credentials to from SISK.
 * @param {IUser | undefined} loggedUsed
 * @returns {Boolean}
 */
const siskEmployeeCredentials = (loggedUsed: IUser | undefined) => {
   if (!loggedUsed) return false;
   const {isAdmin, isOffice, isEmployee} = loggedUsed;
   return isAdmin || isOffice || isEmployee;
};

/**
 * Function to check user credentials to go true building a city navigation options.
 * @param {IUser | undefined} loggedUsed
 * @returns {Boolean}
 */
const adminSeeContentCredentials = (loggedUsed: IUser | undefined): boolean => {
   if (!loggedUsed) return false;
   const {isAdmin, isOffice} = loggedUsed;
   return isAdmin || isOffice;
};

/**
 * Funtion to block selected user view some tabs.
 * @param loggedUsed
 * @returns {Boolean}
 */
const summaryUserRestriction = (loggedUsed: IUser | undefined): boolean => {
   if (!loggedUsed) return false;
   const {isAdmin, isOffice, email} = loggedUsed;
   if (['mkulakowski@umsiechnice.pl'].includes(email)) return false;
   return isAdmin || isOffice;
};

/**
 * Check current user permission to allow record action.
 *
 * @param record
 * @param currentUser
 * @returns {Boolean}
 */
const checkRecordActionPermission = (record: IBooking | IClient, currentUser?: IUser) => {
   if (singleInstanceOfBookings(record)) {
      if (currentUser?.isAdmin) return true;
      if (record.createdBy.includes(currentUser?.email || '')) return true;
      return false;
   }
   return false;
};

export {
   hasRightsToSeeContent,
   adminCredentials,
   siskEmployeeCredentials,
   adminSeeContentCredentials,
   summaryUserRestriction,
   checkRecordActionPermission
};
