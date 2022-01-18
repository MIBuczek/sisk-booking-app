/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch } from 'redux';
import { IClient, IClientsActions, IReduxState } from 'models';
import { db, CLIENTS_STATE, SAVING_STAGE, parseFirebaseClientData } from 'utils';

export const fetchingClients = (): IClientsActions => ({
  type: CLIENTS_STATE.GET_CLIENT,
  payload: {
    isFetching: true,
    savingStage: SAVING_STAGE.INITIAL,
    errorMessage: '',
    clients: []
  }
});

const fetchingClientsDone = (type: string, clients: IClient[] = []): IClientsActions => ({
  type,
  payload: {
    isFetching: false,
    savingStage: SAVING_STAGE.SUCCESS,
    errorMessage: '',
    clients
  }
});

const fetchingClientsError = (errorMessage: string): IClientsActions => ({
  type: CLIENTS_STATE.ERROR_CLIENT,
  payload: {
    isFetching: false,
    savingStage: SAVING_STAGE.ERROR,
    errorMessage,
    clients: []
  }
});

export const getClientsData = () => async (dispatch: Dispatch<IClientsActions>): Promise<void> => {
  dispatch(fetchingClients());
  try {
    const resp = await db.collection('clients').get();
    const clients: IClient[] = resp.docs.map(parseFirebaseClientData);
    dispatch(fetchingClientsDone(CLIENTS_STATE.GET_CLIENT, clients));
  } catch (err) {
    dispatch(fetchingClientsError('Problem z serverem. Nie można pobrać bazy danych z klientami.'));
    throw new Error(JSON.stringify(err));
  }
};

export const addClient = (clientData: IClient) => async (
  dispatch: Dispatch<IClientsActions>,
  getStore: () => IReduxState
): Promise<void> => {
  try {
    await db.collection('clients').doc().set(clientData);
    const { clients } = getStore().clientStore;
    dispatch(fetchingClientsDone(CLIENTS_STATE.ADD_CLIENT, [...clients, clientData]));
  } catch (err) {
    dispatch(fetchingClientsError('Problem z serverem. Nie można dodać klienta do bazy danych'));
    throw new Error(JSON.stringify(err));
  }
};

export const updateClient = (clientData: IClient) => async (
  dispatch: Dispatch<IClientsActions>,
  getStore: () => IReduxState
): Promise<void> => {
  try {
    await db.collection('clients').doc(clientData.id).update(clientData);
    const { clients } = getStore().clientStore;
    const newClients: IClient[] = clients.map((client: IClient) =>
      client.id === clientData.id ? clientData : client
    );
    dispatch(fetchingClientsDone(CLIENTS_STATE.UPDATE_CLIENT, newClients));
  } catch (err) {
    dispatch(fetchingClientsError('Problem z serverem. Nie można zaktualizować danych klienta.'));
    throw new Error(JSON.stringify(err));
  }
};

export const deleteClient = (id: string) => async (
  dispatch: Dispatch<IClientsActions>,
  getStore: () => IReduxState
): Promise<void> => {
  try {
    db.collection('clients').doc(id).delete();
    const { clients } = getStore().clientStore;
    const updatedClients: IClient[] = clients.filter((client: IClient) => client.id !== id);
    console.log(updatedClients);
    dispatch(fetchingClientsDone(CLIENTS_STATE.DELETE_CLIENT, updatedClients));
  } catch (err) {
    dispatch(fetchingClientsError('Problem z serverem. Nie można skasować danych klienta.'));
    throw new Error(JSON.stringify(err));
  }
};
