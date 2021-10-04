import { IBuildingsAction, IBuildingsPayload } from '../../models/store/store-models';
import {
  SAVING_STAGE,
  GET_BUILDINGS,
  ADD_BUILDINGS,
  DELETE_BUILDINGS,
  UPDATE_BUILDINGS,
  ERROR_BUILDINGS,
} from '../../utils/variables/store-data';

const { INITIAL } = SAVING_STAGE;

const INITIAL_STATE: IBuildingsPayload = {
  isFetching: false,
  savingStage: INITIAL,
  errorMessage: '',
  buildings: undefined,
};

export const buildings = (state = INITIAL_STATE, action: IBuildingsAction) => {
  const { type, payload } = action;
  switch (type) {
    case GET_BUILDINGS:
    case ADD_BUILDINGS:
    case DELETE_BUILDINGS:
    case UPDATE_BUILDINGS:
    case ERROR_BUILDINGS:
      return {
        ...state,
        ...payload,
      };

    default:
      return state;
  }
};
