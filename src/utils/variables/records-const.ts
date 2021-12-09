const RECORDS_BUILDINGS_HEADERS = ['Lp.', 'Nazwa obiektu', 'Akcja'];

const RECORDS_BUILDINGS_ROW = ['name'];

const RECORDS_CLIENTS_HEADERS = ['Lp.', 'Nazwa klienta', 'Akcja'];

const RECORDS_CLIENTS_ROW = ['name'];

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
  RECORDS_BUILDINGS_HEADERS,
  RECORDS_CLIENTS_HEADERS,
  RECORDS_BOOKING_HEADERS,
  RECORDS_BUILDINGS_ROW,
  RECORDS_CLIENTS_ROW,
  RECORDS_BOOKING_ROW
};
