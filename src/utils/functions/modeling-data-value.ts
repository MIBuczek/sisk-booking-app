import { formatDate } from './calender-functions';

const modelDisplayValue = (currentValue?: string | Date | boolean): null | string => {
  if (typeof currentValue === 'undefined') {
    return null;
  }
  if (typeof currentValue === 'boolean') {
    return currentValue ? 'Tak' : 'Nie';
  }
  if (currentValue instanceof Date) {
    return formatDate(currentValue);
  }
  return currentValue;
};

export { modelDisplayValue };
