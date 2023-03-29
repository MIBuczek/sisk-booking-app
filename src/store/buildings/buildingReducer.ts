import {IBuildingAction} from 'models';
import {SAVING_STAGE, BUILDING_STATE} from 'utils';

const INITIAL_STATE = {
   isFetching: false,
   savingStage: SAVING_STAGE.INITIAL,
   errorMessage: '',
   buildings: undefined
};

export const buildingStore = (state = INITIAL_STATE, action: IBuildingAction) => {
   const {type, payload} = action;
   switch (type) {
      case BUILDING_STATE.GET_BUILDING:
      case BUILDING_STATE.ERROR_BUILDING:
         return {
            ...state,
            ...payload
         };
      default:
         return state;
   }
};
