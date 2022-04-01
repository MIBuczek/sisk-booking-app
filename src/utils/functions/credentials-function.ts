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

export { adminCredentials };
