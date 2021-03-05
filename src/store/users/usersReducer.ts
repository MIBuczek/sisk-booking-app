import { IUserAction } from '../../models/store-models';
import { SAVING_STAGE, ERROR_USER, GET_USER } from '../../utils/store-data';

const { INITIAL } = SAVING_STAGE;
const INITIAL_STATE = {
  isFetching: false,
  savingStage: INITIAL,
  errorMessage: '',
  auth: null,
  user: {},
};

export const currentUser = (state = INITIAL_STATE, action: IUserAction) => {
  const { type, payload } = action;
  switch (type) {
    case GET_USER:
    case ERROR_USER:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};
