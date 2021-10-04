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

export interface IBuilding {
  name: string;
  address: string;
  id: string;
}

export interface IBuildingsPayload extends IPayload {
  buildings?: IBuilding[];
}

export interface IBuildingsAction {
  type: string;
  payload: IBuildingsPayload;
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
  building: TSelect;
  size: TSelect;
  person: string;
  club?: string;
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
  booking?: IBooking;
  bookings: IBooking[];
}

export interface IBookingsAction {
  type: string;
  payload: IBookingsPayload;
}

export interface IReduxState {
  auth: IAuthPayload;
  clients: IClientsPayload;
  buildings: IBuildingsPayload;
  bookingState: IBookingsPayload;
  currentUser: IUserPayload;
}
