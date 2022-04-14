import { IBookingForm } from 'models/forms/booking-form-models';
import { IClientForm } from 'models/forms/client-form-model';

const today = new Date();

// Form Buildings
export enum SIZE_OPTIONS {
  '1/1' = '1/1',
  '1/2' = '1/2',
  '1/3' = '1/3',
  '2/3' = '2/3',
  '1/4' = '1/4',
  '3/4' = '3/4'
}

export enum CLIENT_TYPE {
  CLIENT = 'Indywidualny',
  COMPANY = 'Firma'
}

// Form Clients
const CLIENT_INITIAL_VALUE: IClientForm = {
  type: { label: 'Osoba prywatna', value: CLIENT_TYPE.CLIENT },
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
  city: { label: 'Siechnice', value: 'siechnice' },
  building: { label: 'Hala sportowa', value: 'hala-sportowa' },
  size: SIZE_OPTIONS['1/1'],
  person: '',
  club: '',
  email: '',
  phone: '',
  regular: false,
  startDate: today,
  endDate: today,
  startHour: today,
  endHour: today,
  accepted: false,
  message: '',
  payment: { label: 'Gotówka', value: 'cash' }
};

const SIZE_OPTIONS_BTN = Object.values(SIZE_OPTIONS);

export { CLIENT_INITIAL_VALUE, BOOKING_INITIAL_VALUE, SIZE_OPTIONS_BTN };
