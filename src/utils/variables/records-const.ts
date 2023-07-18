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
   'nip',
   'nick'
];

const RECORDS_CLIENTS_DETAILS_PROPERTY_MAP: {[x: string]: string} = {
   name: 'Imię i nazwisko',
   type: 'Typ',
   contactPerson: 'Osoba kontaktowa',
   phone: 'Telefon',
   email: 'E-mail',
   street: 'Ulica',
   city: 'Miasto',
   zipCode: 'Kod pocztowy',
   nip: 'NIP',
   nick: 'Nick'
};

const RECORDS_BOOKINGS_HEADERS = [
   'Lp.',
   'Nazwa klienta',
   'Telefon',
   'E-mail',
   'Zakceptowana',
   'Konflikty',
   'Akcja'
];

const RECORDS_BOOKINGS_ROW = ['person', 'phone', 'email', 'accepted'];

const RECORDS_BOOKING_ROW_DETAILS = [
   'type',
   'city',
   'building',
   'size',
   'person',
   'nick',
   'club',
   'email',
   'phone',
   'payment',
   'accepted',
   'bookingTime',
   'selectedOptions',
   'message',
   'bookingStatus',
   'bookingComments'
];

const RECORDS_BOOKING_DETAILS_PROPERTY_MAP = {
   type: 'Typ klienta',
   city: ' Miasto',
   building: 'Budynek',
   size: 'Powierzchnia',
   nick: 'Nick',
   person: 'Najemca',
   club: 'Klub sportowy',
   email: 'E-mail',
   phone: 'Telefon',
   payment: 'Płatność',
   accepted: 'Zakceptowana',
   bookingTime: 'Szczegóły rezerwacji',
   selectedOptions: 'Wybrane dodatkowe opcje',
   message: 'Wiadomość',
   bookingStatus: 'Status rezerwacji',
   bookingComments: 'Komentarze pracowników'
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
