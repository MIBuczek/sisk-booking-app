import { IModal, IAuthPayload, IBookingsPayload, IClientsPayload, IUserPayload } from 'models';
import { IBuildingPayload } from './building-models';

interface IPayload {
  isFetching: boolean;
  savingStage: string;
  errorMessage: string;
}

interface IReduxState {
  authStore: IAuthPayload;
  clientStore: IClientsPayload;
  bookingStore: IBookingsPayload;
  buildingStore: IBuildingPayload;
  currentUserStore: IUserPayload;
  modal: IModal;
}

export type { IReduxState, IPayload };
