import {IAuthAction, IAuthPayload} from 'models';
import {LOGIN_STATE, SAVING_STAGE} from 'utils';

const INITIAL_STATE: IAuthPayload = {
   isFetching: false,
   savingStage: SAVING_STAGE.INITIAL,
   errorMessage: '',
   auth: undefined
};

/**
 * Authentication user general state.
 *
 * @param {IAuthPayload} state
 * @param {IAuthAction} action
 * @returns {IAuthPayload}
 */
export const authStore = (state = INITIAL_STATE, action: IAuthAction): IAuthPayload => {
   const {type, payload} = action;
   switch (type) {
      case LOGIN_STATE.LOG_IN:
      case LOGIN_STATE.LOG_OUT:
         return {
            ...state,
            ...payload
         };
      default:
         return state;
   }
};
