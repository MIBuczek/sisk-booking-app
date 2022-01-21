const RECORDS_CLIENTS_HEADERS = ['Lp.', 'Nazwa klienta', 'Telefon', 'E-mail', 'Akcja'];
const RECORDS_CLIENTS_ROW = ['name', 'phone', 'email'];
const RECORDS_CLIENTS_ROW_DETAILS = [
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

const RECORDS_CLIENTS_DETAILS_PROPERTY_MAP = {
  name: 'Imie i Nazwisko',
  type: 'Typ',
  contactPerson: ' Osoba kontaktowa',
  phone: 'Telefon',
  email: 'E-mail',
  street: 'Ulica',
  city: 'Miasto',
  zipCode: 'Kod pocztowy',
  nip: 'NIP'
};

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
  'dateStart',
  'dateEnd',
  'hourStart',
  'hourEnd',
  'accepted',
  'message'
];

const RECORDS_BOOKING_DETAILS_PROPERTY_MAP = {
  type: 'Typ klienta',
  city: ' Miasto',
  building: 'Budynek',
  size: 'Wynamowana powierzchnia',
  person: 'Najemca',
  club: 'Klub sportowy',
  email: 'E-mail',
  phone: 'Telefon',
  regular: 'Cykliczy Wynajem',
  dateStart: 'Od kiedy',
  dateEnd: 'Do Kiedy',
  hourStart: 'Od Godziny',
  hourEnd: 'Do Godziny',
  accepted: 'Zakceptowana',
  message: 'Wiadomość'
};

export {
  RECORDS_CLIENTS_HEADERS,
  RECORDS_BOOKINGS_HEADERS,
  RECORDS_CLIENTS_ROW,
  RECORDS_BOOKINGS_ROW,
  RECORDS_CLIENTS_ROW_DETAILS,
  RECORDS_BOOKING_ROW_DETAILS,
  RECORDS_BOOKING_DETAILS_PROPERTY_MAP,
  RECORDS_CLIENTS_DETAILS_PROPERTY_MAP
};
