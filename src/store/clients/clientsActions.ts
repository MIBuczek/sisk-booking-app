import { IClient, ICLientActions, IClientsPayload } from '../../models/reduxModel';
import {
  GET_CLIENTS,
  ADD_CLIENT,
  DELETE_CLIENT,
  UPDATE_CLIENT,
  ERROR_CLIENT,
  SAVING_STAGE,
} from '../utils/utils';

const { INITIAL, SUCCESS, ERROR } = SAVING_STAGE;

export const fechingClientsStart = (): ICLientActions => ({
  type: GET_CLIENTS,
  payload: {
    isFetching: true,
    savingStage: INITIAL,
    errorMessage: '',
    clients: [],
  },
});

export const fechingClientsDone = () => {
  return async (dispatch: any): Promise<void> => {
    //firebase get collection clients
    const clients: IClient[];
    if ('collection ok') {
      dispatch(
        (): ICLientActions => ({
          type: GET_CLIENTS,
          payload: {
            isFetching: false,
            savingStage: SUCCESS,
            errorMessage: '',
            clients,
          },
        }),
      );
    } else {
      dispatch(
        (): ICLientActions => ({
          type: ERROR_CLIENT,
          payload: {
            isFetching: false,
            savingStage: ERROR,
            errorMessage: 'err responce',
            clients: [],
          },
        }),
      );
    }
  };
};

export const addClient = (clientData: IClient) => {
  return async (dispatch: any): Promise<void> => {
    // firebase function to add new user
    if ('firebase ok') {
      dispatch(
        (): ICLientActions => ({
          type: ADD_CLIENT,
          payload: {
            savingStage: SUCCESS,
            client: clientData,
            errorMessage: '',
            isFetching: false,
          },
        }),
      );
    } else {
      dispatch(
        (): ICLientActions => ({
          type: ERROR_CLIENT,
          payload: {
            savingStage: ERROR,
            errorMessage: 'err.responce',
            isFetching: false,
          },
        }),
      );
    }
  };
};

export const updateClient = (clientData: IClient) => {
  return async (dispatch: any): Promise<void> => {
    // firebase function to edit new user
    if ('firebase ok') {
      dispatch(
        (): ICLientActions => ({
          type: UPDATE_CLIENT,
          payload: {
            savingStage: SUCCESS,
            client: clientData,
            errorMessage: '',
            isFetching: false,
          },
        }),
      );
    } else {
      dispatch(
        (): ICLientActions => ({
          type: ERROR_CLIENT,
          payload: {
            savingStage: ERROR,
            errorMessage: 'err.responce',
            isFetching: false,
          },
        }),
      );
    }
  };
};

export const deleteClient = (clientId: string) => {
  return async (dispatch: any): Promise<void> => {
    // firebase function to delete client
    if ('firebase ok') {
      dispatch(
        (): ICLientActions => ({
          type: DELETE_CLIENT,
          payload: {
            savingStage: SUCCESS,
            clientId,
            errorMessage: '',
            isFetching: false,
          },
        }),
      );
    } else {
      dispatch(
        (): ICLientActions => ({
          type: ERROR_CLIENT,
          payload: {
            savingStage: ERROR,
            errorMessage: 'err.responce',
            isFetching: false,
          },
        }),
      );
    }
  };
};
