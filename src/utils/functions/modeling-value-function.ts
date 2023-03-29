import {TBooking} from 'models';
import {isNil} from 'lodash';
import {formatDate, formatTime} from './calender-functions';

/**
 * Object used to transform property value into display value
 */
const transformValue: {[x: string]: string} = {
   INITIAL: 'Nie rozpoczęta',
   NOT_DONE: 'Nie rozpoczęta',
   DONE: 'Zakończona',
   QUIT: 'Rezygnacja',
   siechnice: 'Siechnice',
   radwanice: 'Radwanice',
   'swieta-katarzyna': 'Święta Katarzyna',
   'zerniki-wroclawskie': 'Żerniki Wrocławskie',
   'boisko-sztuczna-nawierzchnia': 'Boisko ze sztuczną nawierzchnią',
   'boisko-trawiaste-stadionie-la': 'Boisko trawiaste na stadionie LA',
   'bieznia-na-stadionie-la': 'Bieżnia na stadionie LA',
   'sala-fitness': 'Sala fitness',
   'hala-sportowa': 'Hala sportowa',
   orlik: 'Orlik',
   cash: 'Gotówka',
   invoice: 'Faktura',
   transfer: 'Przelew',
   free: 'Bezpłatne'
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
   if (isNil(currentValue)) {
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

/**
 * Function to model value and display it as a percentage value.
 * @param  size
 * @returns {String}
 */
const transformToPercentage = (size: string): string => {
   const [one, two] = size.split('/');
   let percentage = ((Number(one) / Number(two)) * 100).toString();
   const dotIndex = percentage.indexOf('.');
   if (dotIndex > -1) {
      percentage = percentage.slice(0, dotIndex);
   }
   return `${percentage}%`;
};

export {modelDisplayValue, transformValue, transformToPercentage};
