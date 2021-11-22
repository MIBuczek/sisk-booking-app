import { IClientsActions, IClientsPayload } from 'models';
import { COLLECTION_STATE, SAVING_STAGE } from 'utils';

const INITIAL_STATE: IClientsPayload = {
  isFetching: false,
  savingStage: SAVING_STAGE.INITIAL,
  errorMessage: '',
  clients: []
};

export const clientStore = (state = INITIAL_STATE, action: IClientsActions) => {
  const { type, payload } = action;
  switch (type) {
    case COLLECTION_STATE.ADD:
    case COLLECTION_STATE.GET:
    case COLLECTION_STATE.UPDATE:
    case COLLECTION_STATE.DELETE:
    case COLLECTION_STATE.ERROR:
      return {
        ...state,
        ...payload
      };

    default:
      return state;
  }
};
