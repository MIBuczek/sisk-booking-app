import { IModal, IAuthPayload, IBookingsPayload, IClientsPayload, IUserPayload } from 'models';

interface IPayload {
  isFetching: boolean;
  savingStage: string;
  errorMessage: string;
}

interface IReduxState {
  authStore: IAuthPayload;
  clientStore: IClientsPayload;
  bookingStore: IBookingsPayload;
  currentUserStore: IUserPayload;
  modal: IModal;
}

export type { IReduxState, IPayload };
