/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch } from 'redux';
import { IClient, IClientsActions } from '../../models/store/store-models';
import {
  GET_CLIENTS,
  ADD_CLIENT,
  DELETE_CLIENT,
  UPDATE_CLIENT,
  ERROR_CLIENT,
  SAVING_STAGE,
} from '../../utils/store-data';
import { db } from '../../utils/firebase';

const { INITIAL, SUCCESS, ERROR } = SAVING_STAGE;

export const fechingClients = (): IClientsActions => ({
  type: GET_CLIENTS,
  payload: {
    isFetching: true,
    savingStage: INITIAL,
    errorMessage: '',
    clients: undefined,
  },
});

const fechingClientsDone = (type: string, clients: IClient[]): IClientsActions => ({
  type,
  payload: {
    isFetching: false,
    savingStage: SUCCESS,
    errorMessage: '',
    clients,
  },
});

const fechingClientsError = (errorMessage: string): IClientsActions => ({
  type: ERROR_CLIENT,
  payload: {
    isFetching: false,
    savingStage: ERROR,
    errorMessage,
    clients: undefined,
  },
});

export const getClientsData = () => async (dispatch: Dispatch<IClientsActions>): Promise<void> => {
  dispatch(fechingClients());
  try {
    const resp = await db.collection('clients').get();
    const clients: IClient[] = resp.docs.map((doc) => {
      const client: IClient = {
        name: doc.data().name,
        address: doc.data().address,
        id: doc.data().id,
      };
      return client;
    });
    dispatch(fechingClientsDone(GET_CLIENTS, clients));
  } catch (err) {
    dispatch(fechingClientsError('Problem z serverem. Nie można pobrać bazy danych z klientami.'));
    throw new Error(JSON.stringify(err));
  }
};

export const addClient = (clientData: IClient) => async (
  dispatch: Dispatch<IClientsActions>,
  getStore: any
): Promise<void> => {
  dispatch(fechingClients());
  try {
    await db.collection('clients').doc().set(clientData);
    const { clients } = getStore();
    const newClients: IClient[] = [...clients, clientData];
    dispatch(fechingClientsDone(ADD_CLIENT, newClients));
  } catch (err) {
    dispatch(fechingClientsError('Problem z serverem. Nie można dodać klienta do bazy danych'));
    throw new Error(JSON.stringify(err));
  }
};

export const updateClient = (clientData: IClient, id: string) => async (
  dispatch: Dispatch<IClientsActions>,
  getStore: any
): Promise<void> => {
  dispatch(fechingClients());
  try {
    await db.collection('clients').doc(id).update(clientData);
    const { clients } = getStore();
    const newClients: IClient[] = clients.map((client: IClient) =>
      client.id === id ? clientData : client
    );
    dispatch(fechingClientsDone(UPDATE_CLIENT, newClients));
  } catch (err) {
    dispatch(fechingClientsError('Problem z serverem. Nie można zaktualizować danych klienta.'));
    throw new Error(JSON.stringify(err));
  }
};

export const deleteClient = (id: string) => async (
  dispatch: Dispatch<IClientsActions>,
  getStore: any
): Promise<void> => {
  dispatch(fechingClients());
  try {
    db.collection('clients').doc(id).delete();
    const { clients } = getStore();
    const newClients: IClient[] = clients.filter((client: IClient) => client.id !== id);
    dispatch(fechingClientsDone(DELETE_CLIENT, newClients));
  } catch (err) {
    dispatch(fechingClientsError('Problem z serverem. Nie można skasować danych klienta.'));
    throw new Error(JSON.stringify(err));
  }
};
