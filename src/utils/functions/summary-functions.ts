import {cloneDeep, isEmpty} from 'lodash';
import {
   CSVBookingKeys,
   CSVClientKeys,
   CSVReportData,
   IBookedTime,
   IBooking,
   IClient,
   IGeneralBookingDetails,
   ISingleBookingDate,
   ISummaryClientBookings,
   TSelect
} from 'models';
import {
   changeDayInDate,
   BOOKING_STATUS,
   modelDisplayValue,
   transformToPercentage,
   transformValue,
   checkSelectedOption,
   makeLastDayOfMonth,
   csvBookingKeys,
   csvClientKeys
} from 'utils';

/**
 * Function to find all reservation assigned to client id.
 *
 * @param {Array<IBooking>} bookings
 * @param {TSelect} clientValue
 * @returns {Array<IBooking>}
 */
const findAllClientReservation = (bookings: IBooking[], clientValue: TSelect): IBooking[] =>
   bookings.filter((b) => b.clientId === clientValue.value && b.accepted);

/**
 * Function to return correct number of day in month
 * @param {Date} date
 * @returns {Number}
 */
const numberOfMonthDays = (date: Date): number => {
   const convertedDate = new Date(date);
   if (convertedDate.getMonth() === 1) {
      return 28;
   }
   if ([0, 2, 4, 6, 7, 9, 11].includes(convertedDate.getMonth())) {
      return 31;
   }
   return 30;
};

/**
 * Function to model all client reservation and divide it into to cities.
 * Inside reducer looking for reservation time only on current month.
 * @param {ISummaryClientBookings} initialState
 * @param {Array<IBooking>} allClientReservations
 * @param {Boolean} fromTheBeginning
 * @param {Date} fromMonth
 * @param {Date} toMonth
 * @returns {ISummaryClientBookings}
 */
const generateReservationSummary = (
   initialState: ISummaryClientBookings,
   allClientReservations: IBooking[],
   fromTheBeginning: boolean,
   fromMonth: Date,
   toMonth: Date
): ISummaryClientBookings => {
   const initialAllReservationsState = cloneDeep(initialState);
   allClientReservations.forEach((r) => {
      if (Array.isArray(initialAllReservationsState[`${r.city}`])) {
         const {
            payment,
            extraOptions,
            selectedOptions,
            message,
            bookingTime,
            size,
            building,
            discount = ''
         } = r;

         /* Create booking time details information */
         const bookingTimeDetails = bookingTime.reduce((acc: ISingleBookingDate[], bt) => {
            const bookingDate = new Date(bt.day);
            const fromSelectedMonth = changeDayInDate(new Date(fromMonth), 1);
            const toSelectedMonth = changeDayInDate(new Date(toMonth), numberOfMonthDays(toMonth));
            if (
               fromTheBeginning ||
               (bookingDate.getTime() >= fromSelectedMonth.getTime() &&
                  bookingDate.getTime() <= toSelectedMonth.getTime())
            ) {
               acc.push({...bt});
            }
            return acc;
         }, []);

         if (isEmpty(bookingTimeDetails)) {
            return;
         }

         /* Create general booking information */
         const generalBookingDetails: IGeneralBookingDetails = {
            payment,
            discount,
            extraOptions,
            selectedOptions,
            message,
            size,
            building
         };

         initialAllReservationsState[`${r.city}`] = [
            ...(initialAllReservationsState[r.city] as IBookedTime[]),
            {generalBookingDetails, bookingTimeDetails}
         ];
      }
   });
   return initialAllReservationsState;
};

/**
 * Function to change shape of given object by selected keys.
 * @param {Array<String} keys
 * @param {IBooking | IClient} obj
 * @returns {Object}
 * */
const changeObjectShape = (keys: string[], obj: IBooking | IClient) =>
   keys.reduce((acc: {[x: keyof IBooking | keyof IClient]: string}, key) => {
      if (typeof obj[key] !== 'undefined') {
         acc[key] = String(obj[key]);
      } else {
         acc[key] = '';
      }
      return acc;
   }, {});

/**
 * Method to generate csv file report data for selected client.
 * Report might be generated from the begging or from selected moth period.
 *
 * @param {IClient} currentClient
 * @param {Array<IBooking>} allClientReservations
 * @param {Boolean} fromTheBeginning
 * @param {Date} fromMonth
 * @param {Date} toMonth
 * @return {Array<CSVReportData>}
 */
const csvClientSummary = (
   currentClient: IClient,
   allClientReservations: IBooking[],
   fromTheBeginning: boolean,
   fromMonth: Date,
   toMonth: Date
): CSVReportData[] => {
   const formattedClient = changeObjectShape(csvClientKeys, currentClient) as {
      [x in CSVClientKeys]: string;
   };

   return allClientReservations.reduce((acc: CSVReportData[], booking) => {
      const formattedBooking = changeObjectShape(csvBookingKeys, booking) as {
         [x in CSVBookingKeys]: string;
      };

      booking.bookingTime.forEach((bt) => {
         const bookingDate = new Date(bt.day);
         const fromSelectedMonth = changeDayInDate(new Date(fromMonth), 1);
         const toSelectedMonth = changeDayInDate(new Date(toMonth), numberOfMonthDays(toMonth));

         if (
            fromTheBeginning ||
            (bookingDate.getTime() >= fromSelectedMonth.getTime() &&
               bookingDate.getTime() <= makeLastDayOfMonth(toSelectedMonth).getTime())
         ) {
            let selectedOptions = '';
            let startHourOption = '';
            let endHourOption = '';

            /* If extra rent option is selected then pick first from the array */
            if (booking.extraOptions) {
               const firstOption = booking.selectedOptions[0];
               selectedOptions = checkSelectedOption(firstOption.options);
               startHourOption = modelDisplayValue('', firstOption.fromHour, true) || '';
               endHourOption = modelDisplayValue('', firstOption.toHour, true) || '';
            }

            acc.push({
               ...bt,
               ...formattedBooking,
               ...formattedClient,
               status: transformValue[bt.status],
               payment: transformValue[formattedBooking.payment],
               size: transformToPercentage(formattedBooking.size),
               day: modelDisplayValue('', bt.startHour) || '',
               startHour: modelDisplayValue('', bt.startHour, true) || '',
               endHour: modelDisplayValue('', bt.endHour, true) || '',
               cityBooking: booking.city,
               extraOptions: modelDisplayValue('', booking.extraOptions) || '',
               selectedOptions,
               startHourOption,
               endHourOption
            });
         }
      });
      return acc;
   }, []);
};

/**
 * Method to generate csv file report data for all database clients.
 * Report might be generated from the begging or from selected moth period.
 *
 * @param {Array<IClient>} allClients
 * @param {Array<IBooking>} allBookings
 * @param {Boolean} fromTheBeginning
 * @param {Date} fromMonth
 * @param {Date} toMonth
 * @return {Array<CSVReportData>}
 */
const csvAllClientSummary = (
   allClients: IClient[],
   allBookings: IBooking[],
   fromTheBeginning: boolean,
   fromMonth: Date,
   toMonth: Date
): CSVReportData[] =>
   allClients.reduce((acc: CSVReportData[], client) => {
      const clientBookings = allBookings.filter((cb) => cb.clientId === client.id && cb.accepted);
      const currentClientReport = csvClientSummary(
         client,
         clientBookings,
         fromTheBeginning,
         fromMonth,
         toMonth
      );
      acc.push(...currentClientReport);
      return acc;
   }, []);

/**
 * Function to summary all reservation selected client per city.
 * In return string with information about all reservation and also count done.
 *
 * @param {Array<IBookedTime>} bookingByCity
 * @return {String}
 */
const summaryTotalBookingsNumber = (bookingByCity: IBookedTime[]): string => {
   let allBookingItems = 0;
   let doneBookingItems = 0;
   bookingByCity.forEach((bt) => {
      allBookingItems += bt.bookingTimeDetails.length;
      bt.bookingTimeDetails.forEach((btd) => {
         if (btd.status === BOOKING_STATUS.DONE) doneBookingItems += 1;
      });
   });
   if (!allBookingItems) {
      return '0 rezerwacji.';
   }
   return `${allBookingItems} rezerwacji, w tym ${doneBookingItems} zrealizowanych.`;
};

export {
   findAllClientReservation,
   generateReservationSummary,
   summaryTotalBookingsNumber,
   csvClientSummary,
   csvAllClientSummary
};
