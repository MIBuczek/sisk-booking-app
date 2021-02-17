import {
  IClientsPayload,
  ICLientActions,
  IClient,
  IBulding,
  IBuldingsAction,
} from '../../models/reduxModel';
import {
  SAVING_STAGE,
  GET_BULDINGS,
  ADD_BULDING,
  DELETE_BULDING,
  UPDATE_BULDING,
  ERROR_BULDING,
} from '../utils/utils';

const { INITIAL } = SAVING_STAGE;

const INITIAL_STATE = {
  isFetching: false,
  savingStage: INITIAL,
  errorMessage: '',
  buldings: [],
};

export const clients = (state = INITIAL_STATE, action: IBuldingsAction) => {
  const { type, payload } = action;
  switch (type) {
    case GET_BULDINGS:
      return {
        ...payload,
      };
    case ADD_BULDING:
      return {
        ...payload,
        buldings: [...state.buldings, payload.bulding],
      };
    case DELETE_BULDING:
      return {
        ...payload,
        buldings: state.buldings.filter((bulding: IBulding) => bulding.id !== payload.buldingId),
      };
    case UPDATE_BULDING:
      return {
        ...payload,
        buldings: state.buldings.map((bulding: IBulding) =>
          bulding.id === payload.bulding.id ? payload.buldings : bulding,
        ),
      };
    case ERROR_BULDING:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};
