import { IBuildingForm } from 'models/forms/building-form-models';
import { IClientForm } from 'models/forms/client-form-model';

// Form Buildings
export enum SIZE_OPTIONS {
  '1/1' = '1/1',
  '2/2' = '2/2',
  '3/3' = '3/3',
  '4/4' = '4/4'
}

const BUILDING_INITIAL_VALUE: IBuildingForm = {
  name: '',
  city: { value: 'siechnice', label: 'Siechnice' },
  phone: '',
  email: '',
  size: SIZE_OPTIONS['1/1']
};

// Form Clients
const CLIENT_INITIAL_VALUE: IClientForm = {
  type: { value: 'individual', label: 'Osoba prywatna' },
  name: '',
  contactPerson: '',
  phone: '',
  email: '',
  street: '',
  city: '',
  zipCode: '',
  nip: ''
};

const SIZE_OPTIONS_BTN = Object.values(SIZE_OPTIONS);

export { BUILDING_INITIAL_VALUE, CLIENT_INITIAL_VALUE, SIZE_OPTIONS_BTN };
