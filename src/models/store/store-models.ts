import {
  IModal,
  IAuthPayload,
  IBookingsPayload,
  IBuildingsPayload,
  IClientsPayload,
  IUserPayload
} from 'models';

interface IPayload {
  isFetching: boolean;
  savingStage: string;
  errorMessage: string;
}

interface IReduxState {
  auth: IAuthPayload;
  clients: IClientsPayload;
  buildings: IBuildingsPayload;
  bookingState: IBookingsPayload;
  currentUser: IUserPayload;
  modal: IModal;
}

export type { IReduxState, IPayload };
