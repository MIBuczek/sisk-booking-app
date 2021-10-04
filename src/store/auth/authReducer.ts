import { IAuthAction } from '../../models/store/store-models';
import { SAVING_STAGE, LOG_OUT_USER, LOG_IN_USER } from '../../utils/variables/store-data';

const { INITIAL } = SAVING_STAGE;
const INITIAL_STATE = {
  isFetching: false,
  savingStage: INITIAL,
  errorMessage: '',
  auth: undefined,
};

export const auth = (state = INITIAL_STATE, action: IAuthAction) => {
  const { type, payload } = action;
  switch (type) {
    case LOG_IN_USER:
    case LOG_OUT_USER:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};
