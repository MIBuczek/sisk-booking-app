import { IBooking, IClient } from 'models';

function instanceOfBookings(array: (IClient | IBooking)[]): array is IBooking[] {
  return array[0].person !== undefined;
}

function singleInstanceOfBookings(obj: IClient | IBooking): obj is IBooking {
  return obj.person !== undefined;
}

export { instanceOfBookings, singleInstanceOfBookings };
