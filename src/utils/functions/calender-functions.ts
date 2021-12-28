import { IBooking } from 'models';

const formatDate = (date: Date | null): string => {
  if (!date) return '';
  return date?.toISOString().replace(/T.*$/, '') ?? '';
};

const prepareCalenderItem = (b: IBooking) => ({
  allDay: false,
  id: b.id,
  title: 'Rezerwacja',
  start: `${formatDate(b.when)}T12:00:00+02:00`,
  end: `${formatDate(b.whenEnd)}T14:00:00+02:00`
});

export { formatDate, prepareCalenderItem };
