//user
interface IUser {
  name: string;
  position: string;
}

export interface IUserFeching {
  type: string;
  payload: IUserPayload;
}

export interface IUserPayload {
  isFetching: boolean;
  savingStage: string;
  errorMessage: string;
  auth: null | string;
  user?: IUser;
}

export interface IUserFeching {
  type: string;
  payload: IUserPayload;
}

//Clients
export interface IClient {
  name: string;
  address: string;
  id: string;
}

export interface IClientsPayload {
  isFetching: boolean;
  savingStage: string;
  errorMessage: string;
  clients: IClient[] | [];
}
export interface IClientsPayloadData {
  isFetching: boolean;
  savingStage: string;
  errorMessage: string;
  client: IClient | {};
}

export interface IClientsPayloadId {
  isFetching: boolean;
  savingStage: string;
  errorMessage: string;
  clientId?: string;
}

export interface ICLientActions {
  type: string;
  payload: IClientsPayload | IClientsPayloadData | IClientsPayloadId;
}

//Buildings

export interface IBulding {
  name: string;
  street: string;
  city: string;
  books: string[];
  id: string;
}

export interface IBuldingsPayload {
  isFetching: boolean;
  savingStage: string;
  errorMessage: string;
  buldings: IBulding[] | [];
}

export interface IBuldingPayloadUpdate {
  isFetching: boolean;
  savingStage: string;
  errorMessage: string;
  bulding: IBulding | {};
}

export interface IBuldingPayloadId {
  isFetching: boolean;
  savingStage: string;
  errorMessage: string;
  buldingId: string;
}

export interface IBuldingsAction {
  type: string;
  payload: IBuldingsPayload | IBuldingPayloadUpdate | IBuldingPayloadId;
}
