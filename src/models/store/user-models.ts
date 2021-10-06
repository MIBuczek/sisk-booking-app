import { IPayload } from './store-models';

interface IUser {
  [x: string]: string;
  name: string;
  position: string;
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
