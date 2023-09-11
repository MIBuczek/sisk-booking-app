import {BookingDataLoadOptions} from 'models';

/**
 * Default load data option - from the beginning.
 */
const defaultOption: BookingDataLoadOptions = {
   label: 'Od początku',
   value: {
      startDate: new Date('2020-01-01').toISOString(),
      endDate: new Date().toISOString()
   }
};

/**
 * Method to calculate and generate load booking data options.
 *
 * @returns {BookingDataLoadOptions}
 */
const generateBookingDateOptions = (): BookingDataLoadOptions[] => {
   const baseOptions: BookingDataLoadOptions[] = [
      {
         label: 'Od początku',
         value: {
            startDate: new Date('2020-01-01').toISOString(),
            endDate: new Date().toISOString()
         }
      }
   ];
   const currentYear = new Date().getFullYear();
   const currentMonth = new Date().getMonth();
   let startYear = 2022;

   while (startYear <= currentYear) {
      if ((currentMonth >= 8 && currentYear === startYear) || currentYear > startYear) {
         baseOptions.push({
            label: `${startYear}/${startYear + 1}`,
            value: {
               startDate: new Date(`${startYear}-08-01`).toISOString(),
               endDate: new Date(`${startYear + 1}-08-31`).toISOString()
            }
         });
      }
      startYear += 1;
   }

   return baseOptions;
};

export {defaultOption, generateBookingDateOptions};
