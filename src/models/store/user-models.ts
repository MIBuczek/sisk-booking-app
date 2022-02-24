import { IPayload } from './store-models';

interface IUser {
  [x: string]: string | boolean;
  email: string;
  name: string;
  isAdmin: boolean;
  isEmployee: boolean;
}

interface IUserPayload extends IPayload {
  user?: IUser;
}

interface IUserAction {
  type: string;
  payload: IUserPayload;
}

export type { IUser, IUserPayload, IUserAction };
