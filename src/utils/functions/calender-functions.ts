const formatDate = (date: Date | null): string => {
  if (!date) return '';
  return date.toLocaleDateString();
};

const formatTime = (date: Date | null): string => {
  if (!date) return '';
  return date.toLocaleTimeString();
};

const formatCalenderDate = (date: Date): string => {
  const stringDate = date?.toISOString();
  const index = stringDate.indexOf('T');
  return stringDate.substring(0, index);
};

const formateCalenderHours = (date: Date): string => {
  const index = date?.toISOString().indexOf('T');
  const lastIndex = date.toISOString().lastIndexOf('.');
  return date?.toISOString().substring(index, lastIndex);
};

const prepareCalenderItem = (id: string, startDay: Date, startHour: Date, endHour: Date) => ({
  id,
  allDay: false,
  title: 'Rezerwacja',
  start: `${formatCalenderDate(startDay)}${formateCalenderHours(startHour)}`,
  end: `${formatCalenderDate(startDay)}${formateCalenderHours(endHour)}`
});

export { formatDate, prepareCalenderItem, formatTime, formatCalenderDate, formateCalenderHours };
