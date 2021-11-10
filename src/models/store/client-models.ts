import { IPayload } from 'models';

interface IClient {
  type: string;
  name: string;
  phone: string;
  email: string;
  street: string;
  city: string;
  zipCode: string;
  nip?: string;
  id: string;
}

interface IClientsPayload extends IPayload {
  clients: IClient[];
}

interface IClientsActions {
  type: string;
  payload: IClientsPayload;
}

export type { IClient, IClientsPayload, IClientsActions };
