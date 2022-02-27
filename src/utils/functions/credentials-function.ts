import { IUser } from 'models';

const adminCredentials = (loggedUsed: IUser | undefined): boolean => {
  if (!loggedUsed) return false;
  const { isAdmin, isEmployee } = loggedUsed;
  if (isAdmin) return true;
  if (isEmployee) return false;
  return false;
};

export { adminCredentials };
