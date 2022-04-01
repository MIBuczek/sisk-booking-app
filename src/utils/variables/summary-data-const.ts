import { ISummaryClientBookings } from 'models';

const INITIAL_CLIENT_BOOKING_DETAILS: ISummaryClientBookings = {
  client: {
    type: '',
    name: '',
    contactPerson: '',
    phone: '',
    email: '',
    street: '',
    city: '',
    zipCode: ''
  },
  radwanice: [],
  siechnice: [],
  'swieta-katarzyna': [],
  'zerniki-wroclawskie': []
};

export { INITIAL_CLIENT_BOOKING_DETAILS };
