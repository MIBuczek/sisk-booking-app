import {IBookingTimeForm, ISingleBookingDate, IBookingForm, IClientForm} from 'models';
import {BOOKING_STATUS, BOOKING_STATUS_OPTIONS} from './booking-status-const';

const today = new Date();

// Form Buildings
enum SIZE_OPTIONS {
   '1/1' = '1/1',
   '1/2' = '1/2',
   '1/3' = '1/3',
   '2/3' = '2/3',
   '1/4' = '1/4',
   '3/4' = '3/4'
}

enum CLIENT_TYPE {
   CLIENT = 'Indywidualny',
   COMPANY = 'Firma'
}

// Form Clients
const CLIENT_INITIAL_VALUE: IClientForm = {
   type: {label: 'Osoba prywatna', value: CLIENT_TYPE.CLIENT},
   nick: '',
   name: '',
   contactPerson: '',
   phone: '',
   email: '',
   street: '',
   city: '',
   zipCode: '',
   nip: ''
};

const BOOKING_INITIAL_VALUE: IBookingForm = {
   city: {label: 'Siechnice', value: 'siechnice'},
   building: {label: 'Hala sportowa', value: 'hala-sportowa'},
   size: SIZE_OPTIONS['1/1'],
   nick: '',
   person: '',
   club: '',
   email: '',
   phone: '',
   accepted: false,
   message: '',
   payment: {value: 'transfer', label: 'Przelew'},
   discount: '0%',
   archive: false
};

const BOOKING_TIME_INITIAL_VALUE: IBookingTimeForm = {
   cyclical: false,
   startDay: today,
   endDay: today,
   startHour: today,
   endHour: today
};

const BOOKING_SINGLE_TIME_INITIAL_VALUE: ISingleBookingDate = {
   day: today,
   startHour: today,
   endHour: today,
   status: BOOKING_STATUS.INITIAL,
   comments: '',
   participants: ''
};

const BOOKING_TIME_STATUS_INITIAL_VALUE = {
   bookingStatus: BOOKING_STATUS_OPTIONS[0],
   bookingParticipants: '',
   bookingComments: ''
};

const SIZE_OPTIONS_BTN = Object.values(SIZE_OPTIONS);

export {
   CLIENT_INITIAL_VALUE,
   BOOKING_INITIAL_VALUE,
   BOOKING_TIME_INITIAL_VALUE,
   BOOKING_SINGLE_TIME_INITIAL_VALUE,
   BOOKING_TIME_STATUS_INITIAL_VALUE,
   SIZE_OPTIONS_BTN,
   CLIENT_TYPE,
   SIZE_OPTIONS
};
