import { ADMIN_ROLE } from 'utils';
import { IPayload } from './store-models';

interface IUser {
  [x: string]: string;
  name: string;
  role: ADMIN_ROLE;
  id: string;
}

interface IUserPayload extends IPayload {
  user?: IUser;
}

interface IUserAction {
  type: string;
  payload: IUserPayload;
}

export type { IUser, IUserPayload, IUserAction };
