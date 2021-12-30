/* eslint-disable @typescript-eslint/no-explicit-any */
import { IClient } from 'models';
import { IBooking } from 'models/store/booking-models';

const parseFirebaseBookingData = (doc: any) =>
  ({
    city: doc.data().city,
    building: doc.data().building,
    size: doc.data().size,
    person: doc.data().person,
    club: doc.data().club,
    email: doc.data().email,
    phone: doc.data().phone,
    when: doc.data().when.toDate(),
    start: doc.data().start.toDate(),
    end: doc.data().end.toDate(),
    message: doc.data().message,
    accepted: doc.data().accepted,
    id: doc.data().id
  } as IBooking);

const parseFirebaseClientData = (doc: any) =>
  ({
    type: doc.data().type,
    name: doc.data().name,
    contactPerson: doc.data().contactPerson,
    phone: doc.data().phone,
    email: doc.data().email,
    street: doc.data().street,
    city: doc.data().city,
    zipCode: doc.data().zipCode,
    nip: doc.data().nip,
    id: doc.data().id
  } as IClient);

export { parseFirebaseBookingData, parseFirebaseClientData };
