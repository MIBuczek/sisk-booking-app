import { IClientsActions, IClientsPayload } from 'models';
import { CLIENTS_STATE, SAVING_STAGE } from 'utils';

const INITIAL_STATE: IClientsPayload = {
  isFetching: false,
  savingStage: SAVING_STAGE.INITIAL,
  errorMessage: '',
  clients: []
};

export const clientStore = (state = INITIAL_STATE, action: IClientsActions) => {
  const { type, payload } = action;
  switch (type) {
    case CLIENTS_STATE.ADD_CLIENT:
    case CLIENTS_STATE.GET_CLIENT:
    case CLIENTS_STATE.UPDATE_CLIENT:
    case CLIENTS_STATE.DELETE_CLIENT:
    case CLIENTS_STATE.ERROR_CLIENT:
      return {
        ...state,
        ...payload
      };

    default:
      return state;
  }
};
