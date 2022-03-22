const formatDate = (date: Date | null): string => {
  if (!date) return '';
  return date.toLocaleDateString();
};

const formatTime = (date: Date | null): string => {
  if (!date) return '';
  return date.toLocaleTimeString();
};

const formatCalenderDate = (date: Date | string): string => {
  console.log(date);
  const stringDate = new Date(date).toISOString();
  const index = stringDate.indexOf('T');
  return stringDate.substring(0, index);
};

const formateCalenderHours = (date: Date): string => {
  const checkedDate = new Date(date).toISOString();
  const index = checkedDate.indexOf('T');
  const lastIndex = checkedDate.lastIndexOf('.');
  return checkedDate.substring(index, lastIndex);
};

const prepareCalenderItem = (id: string, startDay: Date, startHour: Date, endHour: Date) => ({
  id,
  allDay: false,
  title: 'Rezerwacja',
  start: `${formatCalenderDate(startDay)}${formateCalenderHours(startHour)}`,
  end: `${formatCalenderDate(startDay)}${formateCalenderHours(endHour)}`
});

export { formatDate, prepareCalenderItem, formatTime, formatCalenderDate, formateCalenderHours };
