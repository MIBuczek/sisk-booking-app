/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch } from 'redux';
import { IClient, IClientsActions, IModalAction, IReduxState } from 'models';
import { db, CLIENTS_STATE, SAVING_STAGE, parseFirebaseClientData, MODAL_TYPES } from 'utils';
import { openModal } from 'store';

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

/**
 * Client store action to get all clients records from firebase clients collections.
 */
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

/**
 * Client store action to add client records to firebase clients collections.
 */
export const addClient = (clientData: IClient) => async (
  dispatch: Dispatch<IClientsActions | IModalAction>,
  getStore: () => IReduxState
): Promise<void> => {
  try {
    const resp = await db.collection('clients').add(clientData);
    const { clients } = getStore().clientStore;
    dispatch(
      fetchingClientsDone(CLIENTS_STATE.ADD_CLIENT, [...clients, { ...clientData, id: resp.id }])
    );
    dispatch(openModal(MODAL_TYPES.SUCCESS, 'Klient został dodany pomyślnie do bazy danych'));
  } catch (err) {
    dispatch(fetchingClientsError('Problem z serverem. Nie można dodać klienta do bazy danych'));
    throw new Error(JSON.stringify(err));
  }
};

/**
 * Client store action to update client records to firebase clients collections.
 */
export const updateClient = (clientData: IClient) => async (
  dispatch: Dispatch<IClientsActions | IModalAction>,
  getStore: () => IReduxState
): Promise<void> => {
  try {
    await db.collection('clients').doc(clientData.id).update(clientData);
    const { clients } = getStore().clientStore;
    const newClients: IClient[] = clients.map((client: IClient) =>
      client.id === clientData.id ? clientData : client
    );
    dispatch(fetchingClientsDone(CLIENTS_STATE.UPDATE_CLIENT, newClients));
    dispatch(openModal(MODAL_TYPES.SUCCESS, 'Dane klienta zostały zmienione pomyślnie'));
  } catch (err) {
    dispatch(fetchingClientsError('Problem z serverem. Nie można zaktualizować danych klienta.'));
    throw new Error(JSON.stringify(err));
  }
};

/**
 * Client store action to delete client records to firebase clients collections.
 */
export const deleteClient = (id: string) => async (
  dispatch: Dispatch<IClientsActions | IModalAction>,
  getStore: () => IReduxState
): Promise<void> => {
  try {
    await db.collection('clients').doc(id).delete();
    const { clients } = getStore().clientStore;
    const updatedClients: IClient[] = clients.filter((client: IClient) => client.id !== id);
    dispatch(fetchingClientsDone(CLIENTS_STATE.DELETE_CLIENT, updatedClients));
    dispatch(openModal(MODAL_TYPES.SUCCESS, 'Klient został pomyślnie skasowany z bazy danych'));
  } catch (err) {
    dispatch(fetchingClientsError('Problem z serverem. Nie można skasować danych klienta.'));
    throw new Error(JSON.stringify(err));
  }
};
