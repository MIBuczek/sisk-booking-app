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
  authStore: IAuthPayload;
  clientStore: IClientsPayload;
  buildingStore: IBuildingsPayload;
  bookingStore: IBookingsPayload;
  currentUserStore: IUserPayload;
  modal: IModal;
}

export type { IReduxState, IPayload };
