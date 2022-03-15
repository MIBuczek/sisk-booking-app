import { TBooking } from 'models';
import { formatDate, getTime } from './calender-functions';

const modelDisplayValue = (currentValue?: TBooking, isHours?: boolean): null | string => {
  if (typeof currentValue === 'undefined') {
    return null;
  }
  if (typeof currentValue === 'boolean') {
    return currentValue ? 'Tak' : 'Nie';
  }
  if (currentValue instanceof Date && !isHours) {
    return formatDate(currentValue);
  }
  if (currentValue instanceof Date && isHours) {
    return getTime(currentValue);
  }
  return currentValue.toString();
};

export { modelDisplayValue };
