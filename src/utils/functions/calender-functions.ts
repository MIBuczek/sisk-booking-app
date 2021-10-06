import { IBooking } from 'models';

const formatDate = (date: Date): string => date.toISOString().replace(/T.*$/, '');

const prepareCalenderItem = (b: IBooking) => ({
  allDay: false,
  id: b.id,
  title: 'Rezerwacja',
  start: `${formatDate(b.when as Date)}T12:00:00+02:00`,
  end: `${formatDate(b.when as Date)}T14:00:00+02:00`
});

export { formatDate, prepareCalenderItem };
