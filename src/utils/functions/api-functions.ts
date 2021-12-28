/* eslint-disable @typescript-eslint/no-explicit-any */
import { IBooking } from 'models/store/booking-models';

const parseFirebaseData = (doc: any) =>
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

export { parseFirebaseData };
