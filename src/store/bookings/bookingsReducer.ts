import { IBookingsAction, IBookingsPayload } from 'models';
import { BOOKING_STATE, SAVING_STAGE } from 'utils/variables/store-const';

const INITIAL_STATE: IBookingsPayload = {
   isFetching: false,
   savingStage: SAVING_STAGE.INITIAL,
   errorMessage: '',
   booking: undefined,
   bookingTimeIndex: null,
   bookings: [],
   conflictedBookings: []
};

export const bookingStore = (state = INITIAL_STATE, action: IBookingsAction) => {
   const { type, payload } = action;
   switch (type) {
      case BOOKING_STATE.ADD_BOOKING:
      case BOOKING_STATE.GET_BOOKING:
      case BOOKING_STATE.GET_BOOKING_CONFLICTS:
      case BOOKING_STATE.CLEAR_BOOKING_CONFLICTS:
      case BOOKING_STATE.UPDATE_BOOKING:
      case BOOKING_STATE.DELETE_BOOKING:
      case BOOKING_STATE.ERROR_BOOKING:
         return {
            ...state,
            ...payload
         };
      default:
         return state;
   }
};
