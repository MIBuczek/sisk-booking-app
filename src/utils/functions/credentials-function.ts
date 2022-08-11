import { IUser } from 'models';

/**
 * Function to check user credentials
 * @param  loggedUsed
 * @returns {Boolean}
 */
const adminCredentials = (loggedUsed: IUser | undefined): boolean => {
  if (!loggedUsed) return false;
  const { isAdmin, isEmployee, isOffice } = loggedUsed;
  if (isAdmin) return true;
  if (isEmployee || isOffice) return false;
  return false;
};

/**
 * Function to check user credentials to go true building a city navigation options.
 * @param  loggedUsed
 * @returns {Boolean}
 */
const sideNavCredentials = (loggedUsed: IUser | undefined): boolean => {
  if (!loggedUsed) return false;
  const { isAdmin, isOffice } = loggedUsed;
  return isAdmin || isOffice;
};

export { adminCredentials, sideNavCredentials };
