import { IBuildingsAction, IBuildingsPayload } from 'models';
import { COLLECTION_STATE, SAVING_STAGE } from 'utils/variables/store-const';

const INITIAL_STATE: IBuildingsPayload = {
  isFetching: false,
  savingStage: SAVING_STAGE.INITIAL,
  errorMessage: '',
  buildings: undefined
};

export const buildings = (state = INITIAL_STATE, action: IBuildingsAction) => {
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
