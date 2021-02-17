import { IUserFeching } from '../../models/reduxModel';
import { SAVING_STAGE, LOG_OUT_USER, LOG_IN_USER } from '../utils/utils';

const { INITIAL } = SAVING_STAGE;
const INITIAL_STATE = {
  isFetching: false,
  savingStage: INITIAL,
  errorMessage: '',
  auth: null,
  user: {},
};

export const currentUser = (state = INITIAL_STATE, action: IUserFeching) => {
  const { type, payload } = action;
  switch (type) {
    case LOG_IN_USER:
      return {
        ...state,
        ...payload,
      };
    case LOG_OUT_USER:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};
