import { IBooking, IBookingsAction, IBookingsPayload } from '../../models/store/store-models';
import {
  SAVING_STAGE,
  GET_BOOKINGS,
  UPDATE_BOOKING,
  ADD_BOOKING,
  DELETE_BOOKING,
  ERROR_BOOKING,
} from '../../utils/variables/store-data';

const example: IBooking[] = [
  {
    city: {
      label: 'Siechnice',
      value: 'siechnice',
    },
    building: {
      label: 'Obiekt 3',
      value: 'obiekt-tree',
    },
    size: {
      label: '2/2',
      value: '2/2',
    },
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
    whenEnd: new Date(),
  },
];

const { INITIAL } = SAVING_STAGE;

const INITIAL_STATE: IBookingsPayload = {
  isFetching: false,
  savingStage: INITIAL,
  errorMessage: '',
  bookings: example,
};

export const bookingState = (state = INITIAL_STATE, action: IBookingsAction) => {
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
