import { ICSVHeaders } from '../../models';

const csvBookingKeys = ['type', 'payment', 'size', 'building', 'message', 'building', 'city'];

const csvClientKeys = [
  'name',
  'contactPerson',
  'street',
  'city',
  'zipCode',
  'nip',
  'phone',
  'email'
];

const csvFileHeaders: ICSVHeaders[] = [
  { label: 'Imie i nazwisko', key: 'name' },
  { label: 'Typ', key: 'type' },
  { label: 'Osoba kontaktowa', key: 'contactPerson' },
  { label: 'Telefon', key: 'phone' },
  { label: 'Email', key: 'email' },
  { label: 'Ulica', key: 'street' },
  { label: 'Miasto', key: 'city' },
  { label: 'Kod pocztowy', key: 'zipCode' },
  { label: 'NIP', key: 'nip' },
  { label: 'Lokalizacja', key: 'cityBooking' },
  { label: 'Budynek', key: 'building' },
  { label: 'Wynajmowana powierzchnia', key: 'size' },
  { label: 'Metoda płatności', key: 'payment' },
  { label: 'Data', key: 'day' },
  { label: 'Godzina rozpoczęcia', key: 'startHour' },
  { label: 'Godzina zakończenia', key: 'endHour' },
  { label: 'Status', key: 'status' },
  { label: 'Dodatkowe opcje', key: 'extraOptions' },
  { label: 'Wybrane Opcje', key: 'selectedOptions' },
  { label: 'Od', key: 'startHourOption' },
  { label: 'Do', key: 'endHourOption' },
  { label: 'Dodatkowe informacje', key: 'message' }
];

export { csvBookingKeys, csvClientKeys, csvFileHeaders };
