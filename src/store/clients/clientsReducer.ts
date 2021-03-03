import {
  IClientsPayload,
  ICLientActions,
  IClient,
  IBuldingPayloadUpdate,
} from '../../models/reduxModel';
import {
  SAVING_STAGE,
  GET_CLIENTS,
  ADD_CLIENT,
  DELETE_CLIENT,
  UPDATE_CLIENT,
  ERROR_CLIENT,
} from '../utils/utils';

const { INITIAL } = SAVING_STAGE;

const INITIAL_STATE: IClientsPayload = {
  isFetching: false,
  savingStage: INITIAL,
  errorMessage: '',
  clients: [],
};

export const clients = (state = INITIAL_STATE, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case GET_CLIENTS:
      return {
        ...state,
        ...payload,
      };
    case ADD_CLIENT:
      return {
        ...state,
        ...payload,
        clients: [...state.clients, payload.client],
      };
    case DELETE_CLIENT:
      return {
        ...state,
        ...payload,
        clients: state.clients.filter((client: IClient) => client.id !== payload.clientId),
      };
    case UPDATE_CLIENT:
      return {
        ...state,
        ...payload,
        clients: state.clients.map((client: IClient) =>
          client.id === payload.client.id ? payload.client : client,
        ),
      };
    case ERROR_CLIENT:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};
