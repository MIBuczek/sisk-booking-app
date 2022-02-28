import { IBookingStatusForm, TSelect } from 'models';

enum BOOKING_STATUS {
  INITIAL = 'INITIAL',
  DONE = 'DONE',
  QUIT = 'QUIT'
}

const BOOKING_STATUS_OPTIONS: TSelect[] = [
  {
    label: 'Nie rozpoczeta',
    value: BOOKING_STATUS.INITIAL
  },
  {
    label: 'Zakończona',
    value: BOOKING_STATUS.DONE
  },
  {
    label: 'Rezygnacja',
    value: BOOKING_STATUS.QUIT
  }
];

const INITIAL_BOOKING_STATUS_FORM: IBookingStatusForm = {
  bookingStatus: BOOKING_STATUS_OPTIONS[0],
  bookingComments: ''
};

export { BOOKING_STATUS, INITIAL_BOOKING_STATUS_FORM, BOOKING_STATUS_OPTIONS };
