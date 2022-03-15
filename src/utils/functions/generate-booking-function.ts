import {
  IBooking,
  IBookingForm,
  IBookingStatusForm,
  ISelectedExtraOptions,
  ISingleBookingDate,
  TSelect
} from 'models';
import { BUILDINGS_OPTIONS, CITY_OPTIONS, CLIENT_TYPE, SIZE_OPTIONS, BOOKING_STATUS } from 'utils';
import { formatDate, getTime } from './calender-functions';
import { createSelectedOption } from './utils-functions';

const overwriteDate = (day: Date, hour: Date) => {
  const convertedDay = formatDate(day);
  const convertedHour = getTime(hour);

  return new Date(`${convertedDay}${convertedHour}`);
};

function calculateWeeksBetween(d1: number, d2: number): number {
  return Math.round((d2 - d1) / (7 * 24 * 60 * 60 * 1000));
}

const bookingTimeCreator = (cred: IBookingForm): ISingleBookingDate[] => {
  const { startDate, endDate, startHour, endHour, regular } = cred;
  const bookingArray: ISingleBookingDate[] = [
    {
      day: startDate,
      startHour: overwriteDate(startDate, startHour),
      endHour: overwriteDate(startDate, endHour)
    }
  ];

  if (!regular) {
    return bookingArray;
  }
  // one week is 604800000 ms
  const weekInMilliseconds = 604800000;
  let index = 1;
  const weeksBetween = calculateWeeksBetween(startDate.getTime(), endDate.getTime());
  do {
    const day = new Date(startDate.getTime() + weekInMilliseconds * index);
    bookingArray.push({
      day,
      startHour: overwriteDate(day, startHour),
      endHour: overwriteDate(day, endHour)
    });
    index += 1;
  } while (index <= weeksBetween);
  return bookingArray;
};

const generateBookingDetails = (
  cred: IBookingForm,
  selectedSize: SIZE_OPTIONS,
  extraOptions: ISelectedExtraOptions[],
  id: string = ''
): IBooking => {
  const bookingTime = bookingTimeCreator(cred);
  return {
    type: CLIENT_TYPE.CLIENT,
    city: cred.city.value,
    building: cred.building.value,
    size: selectedSize,
    clientId: cred.clientId?.value || '',
    person: cred.person,
    club: cred.club || '',
    email: cred.email,
    phone: cred.phone,
    regular: cred.regular,
    month: cred.startDate.getMonth(),
    accepted: cred.accepted || false,
    message: cred.message,
    bookingStatus: BOOKING_STATUS.INITIAL,
    bookingComments: '',
    extraOptions: !!extraOptions.length,
    selectedOptions: extraOptions,
    bookingTime,
    id
  };
};

const generateBookingStatusDate = (cred: IBookingStatusForm, currentBooking: IBooking) => ({
  ...currentBooking,
  bookingStatus: cred.bookingStatus.value,
  bookingComments: cred.bookingComments
});

const generateBookingFormDetails = (
  currentBooking: IBooking,
  clientId?: TSelect,
  city?: TSelect
): IBookingForm => ({
  ...currentBooking,
  city: createSelectedOption(currentBooking.city, CITY_OPTIONS) || CITY_OPTIONS[0],
  building: createSelectedOption(
    currentBooking.building,
    BUILDINGS_OPTIONS[city?.value || CITY_OPTIONS[0].value]
  ),
  startDate: currentBooking.bookingTime[0].day,
  endDate: currentBooking.bookingTime[currentBooking.bookingTime.length - 1].day,
  startHour: currentBooking.bookingTime[0].startHour,
  endHour: currentBooking.bookingTime[0].endHour,
  clientId
});

export {
  generateBookingDetails,
  generateBookingFormDetails,
  generateBookingStatusDate,
  overwriteDate
};
