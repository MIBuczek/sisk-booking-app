const RECORDS_CLIENTS_HEADERS = ['Lp.', 'Nazwa klienta', 'Telefon', 'E-mail', 'Akcja'];
const RECORDS_CLIENTS_ROW = ['name', 'phone', 'email'];
const RECORDS_CLIENTS_ROW_DETAILS = [
  'id',
  'name',
  'type',
  'contactPerson',
  'phone',
  'email',
  'street',
  'city',
  'zipCode',
  'nip'
];

const RECORDS_BOOKING_HEADERS = [
  'Lp.',
  'Nazwa klienta / klubu',
  'Miasto',
  'Obiekt',
  'Powierzchnia',
  'Konflikty',
  'Status',
  'Akcja'
];

const RECORDS_BOOKING_ROW = ['name', 'person', 'club', 'city', 'building', 'size', 'accepted'];

export {
  RECORDS_CLIENTS_HEADERS,
  RECORDS_BOOKING_HEADERS,
  RECORDS_CLIENTS_ROW,
  RECORDS_BOOKING_ROW,
  RECORDS_CLIENTS_ROW_DETAILS
};