import { IBookingForm } from 'models/forms/booking-form-models';
import { IBuildingForm } from 'models/forms/building-form-models';
import { IClientForm } from 'models/forms/client-form-model';
import { BUILDINGS_OPTIONS, CITY_OPTIONS, CLIENT_OPTIONS, SIZE_FIELD_OPTIONS } from 'utils';

// Form Buildings
export enum SIZE_OPTIONS {
  '1/1' = '1/1',
  '2/2' = '2/2',
  '3/3' = '3/3',
  '4/4' = '4/4'
}

export enum CLIENT_TYPE {
  CLIENT = 'CLIENT',
  COMPANY = 'COMPANY'
}

const BUILDING_INITIAL_VALUE: IBuildingForm = {
  name: '',
  city: { label: 'Siechnice', value: 'siechnice' },
  phone: '',
  email: '',
  size: SIZE_OPTIONS['1/1']
};

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
  building: { label: 'Obiekt 3', value: 'obiekt-tree' },
  size: SIZE_OPTIONS['1/1'],
  person: '',
  club: '',
  email: '',
  phone: '',
  regular: false,
  when: null,
  whenEnd: null,
  start: null,
  end: null,
  accepted: false,
  message: ''
};

const SIZE_OPTIONS_BTN = Object.values(SIZE_OPTIONS);

export { BUILDING_INITIAL_VALUE, CLIENT_INITIAL_VALUE, BOOKING_INITIAL_VALUE, SIZE_OPTIONS_BTN };
