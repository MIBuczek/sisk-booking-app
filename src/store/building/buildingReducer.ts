import { IBuildingsAction, IBuildingsPayload } from 'models';
import { BUILDING_STATE, SAVING_STAGE } from 'utils/variables/store-const';

const INITIAL_STATE: IBuildingsPayload = {
  isFetching: false,
  savingStage: SAVING_STAGE.INITIAL,
  errorMessage: '',
  buildings: []
};

export const buildingStore = (state = INITIAL_STATE, action: IBuildingsAction) => {
  const { type, payload } = action;
  switch (type) {
    case BUILDING_STATE.ADD_BUILDING:
    case BUILDING_STATE.GET_BUILDING:
    case BUILDING_STATE.UPDATE_BUILDING:
    case BUILDING_STATE.DELETE_BUILDING:
    case BUILDING_STATE.ERROR_BUILDING:
      return {
        ...state,
        ...payload
      };

    default:
      return state;
  }
};
