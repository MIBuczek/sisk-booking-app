/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch } from 'redux';
import { IClient, IClientsActions, IReduxState } from 'models';
import { db, COLLECTION_STATE, SAVING_STAGE } from 'utils';

export const fetchingClients = (): IClientsActions => ({
  type: COLLECTION_STATE.GET,
  payload: {
    isFetching: true,
    savingStage: SAVING_STAGE.INITIAL,
    errorMessage: '',
    clients: []
  }
});

const fetchingClientsDone = (type: string, clients: IClient[]): IClientsActions => ({
  type,
  payload: {
    isFetching: false,
    savingStage: SAVING_STAGE.SUCCESS,
    errorMessage: '',
    clients
  }
});

const fetchingClientsError = (errorMessage: string): IClientsActions => ({
  type: COLLECTION_STATE.ERROR,
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
    const clients: IClient[] = resp.docs.map((doc) => {
      const client: IClient = {
        type: doc.data().type,
        name: doc.data().name,
        contactPerson: doc.data().contactPerson,
        phone: doc.data().phone,
        email: doc.data().email,
        street: doc.data().street,
        city: doc.data().city,
        zipCode: doc.data().zipCode,
        nip: doc.data().nip,
        id: doc.data().id
      };
      return client;
    });
    dispatch(fetchingClientsDone(COLLECTION_STATE.GET, clients));
  } catch (err) {
    dispatch(fetchingClientsError('Problem z serverem. Nie można pobrać bazy danych z klientami.'));
    throw new Error(JSON.stringify(err));
  }
};

export const addClient = (clientData: IClient) => async (
  dispatch: Dispatch<IClientsActions>,
  getStore: () => IReduxState
): Promise<void> => {
  dispatch(fetchingClients());
  try {
    // await db.collection('clients').doc().set(clientData);
    const { clients } = getStore().clientStore;
    dispatch(fetchingClientsDone(COLLECTION_STATE.ADD, [...clients, clientData]));
  } catch (err) {
    dispatch(fetchingClientsError('Problem z serverem. Nie można dodać klienta do bazy danych'));
    throw new Error(JSON.stringify(err));
  }
};

export const updateClient = (clientData: IClient) => async (
  dispatch: Dispatch<IClientsActions>,
  getStore: () => IReduxState
): Promise<void> => {
  dispatch(fetchingClients());
  try {
    // await db.collection('clients').doc(clientData.id).update(clientData);
    const { clients } = getStore().clientStore;
    const newClients: IClient[] = clients.map((client: IClient) =>
      client.id === clientData.id ? clientData : client
    );
    dispatch(fetchingClientsDone(COLLECTION_STATE.UPDATE, newClients));
  } catch (err) {
    dispatch(fetchingClientsError('Problem z serverem. Nie można zaktualizować danych klienta.'));
    throw new Error(JSON.stringify(err));
  }
};

export const deleteClient = (id: string) => async (
  dispatch: Dispatch<IClientsActions>,
  getStore: () => IReduxState
): Promise<void> => {
  dispatch(fetchingClients());
  try {
    db.collection('clients').doc(id).delete();
    const { clients } = getStore().clientStore;
    const newClients: IClient[] = clients.filter((client: IClient) => client.id !== id);
    dispatch(fetchingClientsDone(COLLECTION_STATE.DELETE, newClients));
  } catch (err) {
    dispatch(fetchingClientsError('Problem z serverem. Nie można skasować danych klienta.'));
    throw new Error(JSON.stringify(err));
  }
};
