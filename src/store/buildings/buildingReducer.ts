import {IBuildingAction, IBuildingPayload} from 'models';
import {SAVING_STAGE, BUILDING_STATE} from 'utils';

const INITIAL_STATE: IBuildingPayload = {
   isFetching: false,
   savingStage: SAVING_STAGE.INITIAL,
   errorMessage: '',
   buildings: []
};

/**
 * Building general state.
 *
 * @param {IBuildingPayload} state
 * @param {IBuildingAction} action
 * @returns {IBuildingPayload}
 */
export const buildingStore = (state = INITIAL_STATE, action: IBuildingAction): IBuildingPayload => {
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
