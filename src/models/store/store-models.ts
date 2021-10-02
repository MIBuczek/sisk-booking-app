import { TSelect } from '../components/select-model';

/* eslint-disable @typescript-eslint/no-explicit-any */
interface IPayload {
  isFetching: boolean;
  savingStage: string;
  errorMessage: string;
}

export interface IUser {
  [x: string]: any;
  name: string;
  position: string;
  id: string;
}

export interface IUserPayload extends IPayload {
  user?: IUser;
}

export interface IUserAction {
  type: string;
  payload: IUserPayload;
}

export interface IClient {
  name: string;
  address: string;
  id: string;
}

export interface IClientsPayload extends IPayload {
  clients?: IClient[];
}

export interface IClientsActions {
  type: string;
  payload: IClientsPayload;
}

export interface IBulding {
  name: string;
  address: string;
  id: string;
}

export interface IBuldingsPayload extends IPayload {
  buldings?: IBulding[];
}

export interface IBuldingsAction {
  type: string;
  payload: IBuldingsPayload;
}

export interface IAuth {
  email: string;
  uid: unknown;
}

export interface IAuthPayload extends IPayload {
  auth?: IAuth;
}

export interface IAuthAction {
  type: string;
  payload: IAuthPayload;
}

export interface IBooking {
  city: TSelect;
  bulding: TSelect;
  size: TSelect;
  person: string;
  clube?: string;
  email: string;
  phone: string;
  regular?: boolean;
  when: Date | null;
  whenEnd?: Date | null;
  start: Date | null;
  end: Date | null;
  accepted: boolean;
  message: string;
  id?: string;
}

export interface IBookingsPayload extends IPayload {
  bookings: IBooking[];
}

export interface IBookingsAction {
  type: string;
  payload: IBookingsPayload;
}

export interface IReduxState {
  auth: IAuthPayload;
  clients: IClientsPayload;
  buldings: IBuldingsPayload;
  bookingState: IBookingsPayload;
  currentUser: IUserPayload;
}
