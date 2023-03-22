/* eslint-disable @typescript-eslint/no-explicit-any */
import emailjs from '@emailjs/browser';
import { IBooking, ISingleBookingDate } from 'models';
import {
  ADMIN_TEMPLATE_BOOKING_ID,
  USER_ID,
  USER_SERVICE_ID,
  USER_TEMPLATE_BOOKING_ID
} from 'utils/variables/email-service-data';
import { formatDate, formatTime } from './calender-functions';
import { modelDisplayValue } from './modeling-value-function';

/**
 * Function to flat bookingTime array into string data with all booking information.
 * @param b
 * @returns {String}
 */
const flatBookingTime = (b: ISingleBookingDate): string => `
  Rezerwacja na dzień : ${formatDate(b.day)},
  Godzina rozpoczęcia : ${formatTime(b.startHour)},
  Godzina zakończenia : ${formatTime(b.endHour)}
  `;

/**
 * Function to generate email to employee if admin add reservation.
 * @param booking
 * @param buildingEmail
 * @returns {Object}
 */
const emailAdminBodyBooking = (booking: IBooking, buildingEmail: string) => {
  const { person, club, email, phone, message, bookingTime, city, building, payment } = booking;
  const parsedBookingTime = bookingTime.map(flatBookingTime).join().replace(',', '\n');
  return {
    building: modelDisplayValue('building', building),
    city: modelDisplayValue('city', city),
    payment: modelDisplayValue('payment', payment),
    person,
    club,
    email,
    phone,
    parsedBookingTime,
    message,
    buildingEmail
  };
};

/**
 * Function to generate email to admin if outside user request for reservation.
 * @param booking
 * @returns {Object}
 */
const emailUserBodyBooking = (booking: IBooking) => {
  const { person, club, email, phone, message, bookingTime, city, building, payment } = booking;
  const parsedBookingTime = bookingTime.map(flatBookingTime).join().replace(',', ' / ');

  return {
    building: modelDisplayValue('building', building),
    city: modelDisplayValue('city', city),
    payment: modelDisplayValue('payment', payment),
    person,
    club,
    email,
    phone,
    parsedBookingTime,
    message
  };
};

/**
 * Function to send email via EmailJS npm package
 * @param userServiceId
 * @param userTemplateId
 * @param message
 * @param userId
 * @returns {Promise<number>}
 */
const sendEmailNotification = async (
  userServiceId: string,
  userTemplateId: string,
  message: any,
  userId: string
): Promise<number> => {
  try {
    await emailjs.send(userServiceId, userTemplateId, message, userId);
    return 200;
  } catch (err) {
    return 400;
  }
};

/**
 * Function to send email in right direction directly on booking store part.
 * @param bookingData
 * @param isAdmin
 * @param buildingEmail
 * @returns {Promise<number>}
 */
const storeEmailNotification = (
  bookingData: IBooking,
  isAdmin: boolean,
  buildingEmail: string = ''
): Promise<number> => {
  if (isAdmin) {
    return sendEmailNotification(
      USER_SERVICE_ID,
      ADMIN_TEMPLATE_BOOKING_ID,
      emailAdminBodyBooking(bookingData, buildingEmail),
      USER_ID
    );
  }
  return sendEmailNotification(
    USER_SERVICE_ID,
    USER_TEMPLATE_BOOKING_ID,
    emailUserBodyBooking(bookingData),
    USER_ID
  );
};

export { sendEmailNotification, storeEmailNotification };
