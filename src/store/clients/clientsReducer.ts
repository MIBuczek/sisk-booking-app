import { IClientsPayload, ICLientActions, IClient } from '../../models/store-models';
import {
  SAVING_STAGE,
  GET_CLIENTS,
  ADD_CLIENT,
  DELETE_CLIENT,
  UPDATE_CLIENT,
  ERROR_CLIENT,
} from '../../utils/store-data';

const { INITIAL } = SAVING_STAGE;

const INITIAL_STATE: IClientsPayload = {
  isFetching: false,
  savingStage: INITIAL,
  errorMessage: '',
  clients: [],
};

export const clients = (state = INITIAL_STATE, action: ICLientActions) => {
  const { type, payload } = action;
  switch (type) {
    case GET_CLIENTS:
    case ADD_CLIENT:
    case DELETE_CLIENT:
    case UPDATE_CLIENT:
    case ERROR_CLIENT:
      return {
        ...state,
        ...payload,
      };

    default:
      return state;
  }
};
