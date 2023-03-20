import { IBooking, IClient } from 'models';

export function instanceOfClients(array: (IClient | IBooking)[]): array is IClient[] {
   return array[0].name !== undefined;
}
