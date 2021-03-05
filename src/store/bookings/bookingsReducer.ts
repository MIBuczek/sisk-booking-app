import { IBookingsAction, IBookingsPayload } from '../../models/store-models';
import {
  SAVING_STAGE,
  GET_BOOKINGS,
  UPDATE_BOOKING,
  ADD_BOOKING,
  DELETE_BOOKING,
  ERROR_BOOKING,
} from '../../utils/store-data';

const { INITIAL } = SAVING_STAGE;

const INITIAL_STATE: IBookingsPayload = {
  isFetching: false,
  savingStage: INITIAL,
  errorMessage: '',
  bookings: undefined,
};

export const bookings = (state = INITIAL_STATE, action: IBookingsAction) => {
  const { type, payload } = action;
  switch (type) {
    case GET_BOOKINGS:
    case ADD_BOOKING:
    case DELETE_BOOKING:
    case UPDATE_BOOKING:
    case ERROR_BOOKING:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};
