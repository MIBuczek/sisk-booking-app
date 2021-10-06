import { IPayload } from 'models';

interface IClient {
  name: string;
  address: string;
  id: string;
}

interface IClientsPayload extends IPayload {
  clients?: IClient[];
}

interface IClientsActions {
  type: string;
  payload: IClientsPayload;
}

export type { IClient, IClientsPayload, IClientsActions };
