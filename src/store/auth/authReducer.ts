import { IAuthAction } from 'models';
import { LOGIN_STATE, SAVING_STAGE } from 'utils/variables/store-const';

const INITIAL_STATE = {
  isFetching: false,
  savingStage: SAVING_STAGE.INITIAL,
  errorMessage: '',
  auth: {
    email: 'sara@sisk.pl',
    uid: '#123123'
  }
};

export const authStore = (state = INITIAL_STATE, action: IAuthAction) => {
  const { type, payload } = action;
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
