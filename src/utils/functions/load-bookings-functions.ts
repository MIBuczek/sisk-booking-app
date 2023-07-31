import {BookingDataLoadOptions} from 'models';

const defaultOption: BookingDataLoadOptions = {
   label: 'Od początku',
   value: {
      startDate: new Date('2020-01-01').toISOString(),
      endDate: new Date().toISOString()
   }
};

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
      if (currentMonth > 5) {
         baseOptions.push({
            label: `${startYear}/${startYear + 1}`,
            value: {
               startDate: new Date(`${startYear}-07-01`).toISOString(),
               endDate: new Date(`${startYear + 1}-06-30`).toISOString()
            }
         });
      }
      startYear += 1;
   }

   return baseOptions;
};

export {defaultOption, generateBookingDateOptions};
