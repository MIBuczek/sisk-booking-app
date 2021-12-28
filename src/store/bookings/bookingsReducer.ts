import { IBooking, IBookingsAction, IBookingsPayload } from 'models';
import { CLIENT_TYPE, SIZE_OPTIONS } from 'utils/variables/form-const';
import { BOOKING_STATE, SAVING_STAGE } from 'utils/variables/store-const';

const example: IBooking[] = [
  {
    type: CLIENT_TYPE.CLIENT,
    city: 'siechnice',
    building: 'obiekt-tree',
    size: SIZE_OPTIONS['1/1'],
    id: '#1234',
    accepted: false,
    regular: true,
    person: 'Michał  Buczek',
    email: 'mib@op.pl',
    phone: '123-123-123',
    when: new Date(),
    start: new Date(),
    end: new Date(),
    message: 'Lorem ipsum',
    whenEnd: new Date()
  }
];

const INITIAL_STATE: IBookingsPayload = {
  isFetching: false,
  savingStage: SAVING_STAGE.INITIAL,
  errorMessage: '',
  bookings: []
};

export const bookingStore = (state = INITIAL_STATE, action: IBookingsAction) => {
  const { type, payload } = action;
  switch (type) {
    case BOOKING_STATE.ADD_BOOKING:
    case BOOKING_STATE.GET_BOOKING:
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
