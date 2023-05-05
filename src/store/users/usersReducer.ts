import {IUserAction, IUserPayload} from 'models';
import {SAVING_STAGE, USER_STATE} from 'utils';

const INITIAL_STATE: IUserPayload = {
   isFetching: false,
   savingStage: SAVING_STAGE.INITIAL,
   errorMessage: '',
   user: undefined
};

/**
 * Current user general state.
 *
 * @param {IUserPayload} state
 * @param {IUserAction} action
 * @returns {IUserPayload}
 */
export const currentUserStore = (state = INITIAL_STATE, action: IUserAction): IUserPayload => {
   const {type, payload} = action;
   switch (type) {
      case USER_STATE.GET_USER:
      case USER_STATE.ERROR_USER:
         return {
            ...state,
            ...payload
         };
      default:
         return state;
   }
};
