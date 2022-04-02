/**
 * Function to transform date object into local date string
 * @param date
 * @returns {String}
 */
const formatDate = (date: Date | null): string => {
  if (!date) return '';
  return date.toLocaleDateString();
};

/**
 * Function to transform date object into string
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
 * Function to cut display date object into short part day/month/year
 * @param  {Date|string} date
 * @returns {string}
 */
const formatCalenderDate = (date: Date | string): string => {
  const stringDate = new Date(date).toISOString();
  const index = stringDate.indexOf('T');
  return stringDate.substring(0, index);
};

/**
 * Function to transform date object into accepted calender hours format
 * @param date
 * @returns {String}
 */
const formateCalenderHours = (date: Date): string => {
  const checkedDate = new Date(date).toISOString();
  const index = checkedDate.indexOf('T');
  const lastIndex = checkedDate.lastIndexOf('.');
  return checkedDate.substring(index, lastIndex);
};

/**
 * Function generate reservation calender object display into view
 * @param id
 * @param startDay
 * @param startHour
 * @param endHour
 * @returns {Object}
 */
const prepareCalenderItem = (
  itemTitle: string,
  id: string,
  startDay: Date,
  startHour: Date,
  endHour: Date,
  accepted: boolean,
  size: string
) => ({
  id,
  allDay: false,
  title: `${itemTitle}`,
  url: `${formatTime(startHour)} - ${formatTime(endHour)}`,
  textColor: `${size}`,
  start: `${formatCalenderDate(startDay)}${formateCalenderHours(startHour)}`,
  end: `${formatCalenderDate(startDay)}${formateCalenderHours(endHour)}`,
  backgroundColor: `${accepted ? '' : 'red'}`
});

export { formatDate, prepareCalenderItem, formatTime, formatCalenderDate, formateCalenderHours };
