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

const RECORDS_BOOKINGS_HEADERS = ['Lp.', 'Nazwa klienta', 'Telefon', 'E-mail', 'Status', 'Akcja'];

const RECORDS_BOOKINGS_ROW = ['person', 'phone', 'email', 'accepted'];

const RECORDS_BOOKING_ROW_DETAILS = [
  'type',
  'city',
  'building',
  'size',
  'person',
  'club',
  'email',
  'phone',
  'regular',
  'when',
  'whenEnd',
  'start',
  'end',
  'accepted',
  'message'
];

export {
  RECORDS_CLIENTS_HEADERS,
  RECORDS_BOOKINGS_HEADERS,
  RECORDS_CLIENTS_ROW,
  RECORDS_BOOKINGS_ROW,
  RECORDS_CLIENTS_ROW_DETAILS,
  RECORDS_BOOKING_ROW_DETAILS
};
