import { IUserAction } from 'models';
import { ADMIN_ROLE, SAVING_STAGE, USER_STATE } from 'utils';

const INITIAL_STATE = {
  isFetching: false,
  savingStage: SAVING_STAGE.INITIAL,
  errorMessage: '',
  auth: null,
  user: {
    name: 'SARA BUCZEK',
    role: ADMIN_ROLE.ADMIN,
    id: '#12341'
  }
};

export const currentUser = (state = INITIAL_STATE, action: IUserAction) => {
  const { type, payload } = action;
  switch (type) {
    case USER_STATE.GET:
    case USER_STATE.ERROR:
      return {
        ...state,
        ...payload
      };
    default:
      return state;
  }
};
