import { IBooking, IClient } from 'models';

export function instanceOfBookings(array: (IClient | IBooking)[]): array is IBooking[] {
  return array[0].person !== undefined;
}
