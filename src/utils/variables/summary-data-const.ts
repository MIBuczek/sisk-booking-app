import {ISummaryClientBookings} from 'models';

const INITIAL_REPORT_BOOKING_BY_CITY = {
   radwanice: [],
   siechnice: [],
   'swieta-katarzyna': [],
   'zerniki-wroclawskie': []
};

const INITIAL_CLIENT_BOOKING_DETAILS: ISummaryClientBookings = {
   client: {
      type: '',
      nick: '',
      name: '',
      contactPerson: '',
      phone: '',
      email: '',
      street: '',
      city: '',
      zipCode: ''
   },
   ...INITIAL_REPORT_BOOKING_BY_CITY
};

export {INITIAL_CLIENT_BOOKING_DETAILS, INITIAL_REPORT_BOOKING_BY_CITY};
