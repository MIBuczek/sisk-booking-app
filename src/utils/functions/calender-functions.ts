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
 * Function to transform date object into correct Warsaw time zone
 * @param date
 * @returns {String}
 */
const formatDisplayTime = (date: Date | string) => {
  const formDate = new Date(date);
  formDate.setHours(formDate.getHours() + 2);
  const stringDate = formDate.toISOString();
  const index = stringDate.indexOf('T');
  const lastIndex = stringDate.lastIndexOf('.');
  return stringDate.substring(index, lastIndex);
};

/**
 * Function to transform date object into accepted calendar hours format
 * @param date
 * @returns {String}
 */
const formatCalenderHours = (date: Date): string => {
  const checkedDate = new Date(date).toISOString();
  const index = checkedDate.indexOf('T');
  const lastIndex = checkedDate.lastIndexOf('.');
  return checkedDate.substring(index, lastIndex);
};

/**
 * Function generate reservation calendar object display into view
 * @param itemTitle
 * @param id
 * @param startDay
 * @param startHour
 * @param endHour
 * @param accepted
 * @param size
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
  start: `${formatCalenderDate(startDay)}${formatDisplayTime(startHour)}`,
  end: `${formatCalenderDate(startDay)}${formatDisplayTime(endHour)}`,
  backgroundColor: `${accepted ? '' : '#5e5e5e'}`
});

/**
 * Function to change day in Date object
 * @param date
 * @param newDay
 * @returns {String}
 */
const changeDayInDate = (date: Date, newDay: number): Date => {
  date.setDate(newDay);
  return date;
};

export {
  formatDate,
  prepareCalenderItem,
  formatTime,
  formatCalenderDate,
  formatCalenderHours,
  changeDayInDate
};
