interface IPayload {
  isFetching: boolean;
  savingStage: string;
  errorMessage: string;
}

//user
interface IUser {
  name: string;
  position: string;
}

export interface IUserFeching {
  type: string;
  payload: IUserPayload;
}

export interface IUserPayload extends IPayload {
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

export interface IClientsPayload extends IPayload {
  clients: IClient[] | [];
  [key: string]: any;
}
export interface IClientsPayloadData extends IPayload {
  client: IClient | {};
  [key: string]: any;
}

export interface IClientsPayloadId extends IPayload {
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

export interface IBuldingsPayload extends IPayload {
  buldings: IBulding[] | [];
  [key: string]: any;
}

export interface IBuldingPayloadUpdate extends IPayload {
  bulding: IBulding | {};
  [key: string]: any;
}

export interface IBuldingPayloadId extends IPayload {
  buldingId?: string;
}

export interface IBuldingsAction {
  type: string;
  payload: IBuldingsPayload | IBuldingPayloadUpdate | IBuldingPayloadId;
}
