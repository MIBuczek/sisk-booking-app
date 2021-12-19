import { ADMIN_ROLE } from 'utils';
import { IPayload } from './store-models';

interface IUser {
  [x: string]: string;
  email: string;
  name: string;
  role: ADMIN_ROLE;
}

interface IUserPayload extends IPayload {
  user?: IUser;
}

interface IUserAction {
  type: string;
  payload: IUserPayload;
}

export type { IUser, IUserPayload, IUserAction };
