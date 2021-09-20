import { IBuldingsAction, IBuldingsPayload } from '../../models/store/store-models';
import {
  SAVING_STAGE,
  GET_BULDINGS,
  ADD_BULDING,
  DELETE_BULDING,
  UPDATE_BULDING,
  ERROR_BULDING,
} from '../../utils/store-data';

const { INITIAL } = SAVING_STAGE;

const INITIAL_STATE: IBuldingsPayload = {
  isFetching: false,
  savingStage: INITIAL,
  errorMessage: '',
  buldings: undefined,
};

export const buldings = (state = INITIAL_STATE, action: IBuldingsAction) => {
  const { type, payload } = action;
  switch (type) {
    case GET_BULDINGS:
    case ADD_BULDING:
    case DELETE_BULDING:
    case UPDATE_BULDING:
    case ERROR_BULDING:
      return {
        ...state,
        ...payload,
      };

    default:
      return state;
  }
};
