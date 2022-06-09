import { TBooking } from 'models';
import { formatDate, formatTime } from './calender-functions';

/**
 * Object used to transform property value into display value
 */
const transformValue: { [x: string]: string } = {
  INITIAL: 'Nie rozpoczęta',
  NOT_DONE: 'Nie rozpoczęta',
  DONE: 'Zakończona',
  QUIT: 'Rezygnacja',
  siechnice: 'Siechnice',
  radwanice: 'Radwanice',
  'swieta-katarzyna': 'Święta Katarzyna',
  'zerniki-wroclawskie': 'Żerniki Wrocławskie',
  'boisko-sztuczna-nawierzchnia': 'Boisko ze sztuczną nawierzchnią',
  'sala-fitness': 'Sala fitness',
  'hala-sportowa': 'Hala sportowa',
  'boisko-trawiaste-stadionie-la': 'Boisko trawiaste na stadionie LA',
  cash: 'Gotówka',
  invoice: 'Faktura'
};

const propertyToModel: string[] = ['city', 'building'];

/**
 * Function to model display value in booking details
 * @param  property
 * @param  currentValue
 * @param  isHours
 * @returns {Null | String}
 */
const modelDisplayValue = (
  property: string,
  currentValue?: TBooking,
  isHours?: boolean
): null | string => {
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
    return formatTime(currentValue);
  }
  if (transformValue[currentValue.toString()]) {
    return transformValue[currentValue.toString()];
  }
  if (propertyToModel.includes(property)) {
    return currentValue.toString().charAt(0).toUpperCase() + currentValue.toString().slice(1);
  }
  return currentValue.toString();
};

export { modelDisplayValue, transformValue };
