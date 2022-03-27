const formatDate = (date: Date | null): string => {
  if (!date) return '';
  return date.toLocaleDateString();
};

/**
 * Function to transform data object into string
 * @param  {Date|null} date
 * @returns {string}
 */
const formatTime = (date: Date | null): string => {
  if (!date) return '';
  const newDate = date.toLocaleTimeString();
  const lastIndex = newDate.lastIndexOf(':');
  return newDate.substring(0, lastIndex);
};

/**
 * Function to cut display data object into short part day/month/year
 * @param  {Date|string} date
 * @returns {string}
 */
const formatCalenderDate = (date: Date | string): string => {
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
