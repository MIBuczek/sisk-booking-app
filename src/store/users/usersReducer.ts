import { IUserAction } from 'models';
import { SAVING_STAGE, USER_STATE } from 'utils';

const INITIAL_STATE = {
  isFetching: false,
  savingStage: SAVING_STAGE.INITIAL,
  errorMessage: '',
  user: undefined
};

export const currentUserStore = (state = INITIAL_STATE, action: IUserAction) => {
  const { type, payload } = action;
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
