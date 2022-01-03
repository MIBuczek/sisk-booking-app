import { IBooking } from 'models';

const formatDate = (date: Date | string | null): string => {
  if (!date) return '';
  if (date instanceof Date) {
    const stringDate = date?.toISOString();
    const index = stringDate.indexOf('T');
    return stringDate.substring(0, index);
  }
  const index = date.indexOf('T');
  return date.substring(0, index);
};

const getTime = (date: Date | string | null): string => {
  if (!date) return '';
  if (date instanceof Date) {
    const index = date?.toISOString().indexOf('T');
    const lastIndex = date.toISOString().lastIndexOf('.');
    return date?.toISOString().substring(index, lastIndex);
  }
  const index = date?.indexOf('T');
  const lastIndex = date.lastIndexOf('.');
  return date?.substring(index, lastIndex);
};

const displayTime = (time: Date | string | null): string => {
  if (!time) return '';
  if (time instanceof Date) {
    const index = time?.toISOString().indexOf('T');
    const lastIndex = time.toISOString().lastIndexOf('.');
    return time?.toISOString().substring(index + 1, lastIndex);
  }
  const index = time?.indexOf('T');
  const lastIndex = time.lastIndexOf('.');
  return time?.substring(index + 1, lastIndex);
};

const prepareCalenderItem = (b: IBooking) => ({
  allDay: false,
  id: b.id,
  title: 'Rezerwacja',
  start: `${formatDate(b.when)}${getTime(b.start)}`,
  end: `${formatDate(b.when)}${getTime(b.end)}`
});

export { formatDate, prepareCalenderItem, getTime, displayTime };
