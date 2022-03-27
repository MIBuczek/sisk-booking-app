/* eslint-disable @typescript-eslint/no-explicit-any */
import { IBuilding, IClient } from 'models';
import { IBooking } from 'models/store/booking-models';

const transformFirebaseBookingTimeData = (item: any) => ({
  day: item.day.toDate(),
  startHour: item.startHour.toDate(),
  endHour: item.endHour.toDate()
});

const transformFirebaseSelectedOptionsData = (item: any) => ({
  options: item.options,
  fromHour: item.fromHour.toDate(),
  toHour: item.toHour.toDate()
});

const parseFirebaseBookingData = (doc: any) =>
  ({
    type: doc.data().type,
    city: doc.data().city,
    building: doc.data().building,
    size: doc.data().size,
    clientId: doc.data().clientId,
    person: doc.data().person,
    club: doc.data().club,
    email: doc.data().email,
    phone: doc.data().phone,
    regular: doc.data().regular,
    month: doc.data().month,
    bookingTime: doc.data().bookingTime.map(transformFirebaseBookingTimeData),
    extraOptions: doc.data().extraOptions,
    selectedOptions: doc.data().selectedOptions.map(transformFirebaseSelectedOptionsData),
    accepted: doc.data().accepted,
    message: doc.data().message,
    bookingStatus: doc.data().bookingStatus,
    bookingComments: doc.data().bookingComments,
    id: doc.id
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
    id: doc.id
  } as IClient);

const parseFirebaseBuildingData = (doc: any) =>
  ({
    name: doc.data().name,
    city: doc.data().city,
    property: doc.data().property,
    size: doc.data().size,
    extra: doc.data().extra,
    phone: doc.data().phone,
    email: doc.data().email
  } as IBuilding);

export { parseFirebaseBookingData, parseFirebaseClientData, parseFirebaseBuildingData };
