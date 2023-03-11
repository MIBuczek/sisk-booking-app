/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch } from 'redux';
import { IClient, IClientsActions, IModalAction, IReduxState } from 'models';
import { CLIENTS_STATE, db, MODAL_TYPES, parseFirebaseClientData, SAVING_STAGE } from 'utils';
import { openModal } from 'store';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';

const CLIENT_COLLECTION_KEY: Readonly<'clients'> = 'clients';

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
    const clientsCollection = await collection(db, CLIENT_COLLECTION_KEY);
    const documents = await getDocs(clientsCollection);
    const clients: IClient[] = documents.docs.map(parseFirebaseClientData);
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
    const addedDocument = await addDoc(collection(db, CLIENT_COLLECTION_KEY), clientData);
    const { clients } = getStore().clientStore;
    dispatch(
      fetchingClientsDone(CLIENTS_STATE.ADD_CLIENT, [
        { ...clientData, id: addedDocument.id },
        ...clients
      ])
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
    if (!clientData.id) return;
    await updateDoc(doc(db, CLIENT_COLLECTION_KEY, clientData.id), clientData);
    const { clients } = getStore().clientStore;
    const clientIndex = clients.findIndex((c) => c.id === clientData.id);
    clients.splice(clientIndex, 1, clientData);
    dispatch(fetchingClientsDone(CLIENTS_STATE.UPDATE_CLIENT, clients));
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
    await deleteDoc(doc(db, CLIENT_COLLECTION_KEY, id));
    const { clients } = getStore().clientStore;
    const updatedClients: IClient[] = clients.filter((client: IClient) => client.id !== id);
    dispatch(fetchingClientsDone(CLIENTS_STATE.DELETE_CLIENT, updatedClients));
    dispatch(openModal(MODAL_TYPES.SUCCESS, 'Klient został pomyślnie skasowany z bazy danych'));
  } catch (err) {
    dispatch(fetchingClientsError('Problem z serverem. Nie można skasować danych klienta.'));
    throw new Error(JSON.stringify(err));
  }
};
