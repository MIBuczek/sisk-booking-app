/* eslint-disable @typescript-eslint/no-explicit-any */
import {DocumentData} from 'firebase/firestore';
import {IBuilding, IClient, ISelectedExtraOptions, IBooking, ISingleBookingDate} from 'models';

/**
 * Map function to transform bookingTime data from firebase.
 *
 * @param item
 * @returns {Object<ISingleBookingDate>}
 */

const transformFirebaseBookingTimeData = (item: any): ISingleBookingDate => ({
   day: item.day.toDate(),
   startHour: item.startHour.toDate(),
   endHour: item.endHour.toDate(),
   comments: item.comments,
   participants: item.participants || '',
   status: item.status
});

/**
 * Map function to transform extra options data from firebase.
 *
 * @param item
 * @returns {Object<ISelectedExtraOptions>}
 */
const transformFirebaseSelectedOptionsData = (item: any): ISelectedExtraOptions => ({
   options: item.options,
   fromHour: item.fromHour.toDate(),
   toHour: item.toHour.toDate()
});

/**
 * Convert payment method.
 *
 * @param {String} payment
 * @return {String}
 */
const changePaymentMethod = (payment: string): string => {
   if (payment === 'invoice') {
      return 'transfer';
   }
   return payment;
};

/**
 * Reduce function to transform single booking data form firebase.
 *
 * @param doc
 * @returns {Object<IBooking>}
 */
const parseFirebaseBookingData = (acc: IBooking[], doc: DocumentData) => {
   if (!doc.data().archive) {
      acc.push({
         type: doc.data().type,
         city: doc.data().city,
         building: doc.data().building,
         size: doc.data().size,
         clientId: doc.data().clientId,
         nick: doc.data().nick || '',
         person: doc.data().person,
         club: doc.data().club,
         email: doc.data().email,
         phone: doc.data().phone,
         month: doc.data().month,
         bookingTime: doc.data().bookingTime.map(transformFirebaseBookingTimeData),
         extraOptions: doc.data().extraOptions,
         selectedOptions: doc.data().selectedOptions.map(transformFirebaseSelectedOptionsData),
         accepted: doc.data().accepted,
         message: doc.data().message,
         payment: changePaymentMethod(doc.data().payment),
         discount: doc.data().discount || '',
         archive: doc.data().archive,
         createdBy: doc.data().createdBy || 'michal.hoffman@sisk-siechnice.pl',
         createdAt:
            doc.data().createdAt ||
            new Date(doc._document.createTime.timestamp.toDate()).toISOString(),
         modifiedBy: doc.data().modifiedBy || 'Unknown',
         modifiedAt: doc.data().modifiedAt || '',
         id: doc.id
      } as IBooking);
   }
   return acc;
};
/**
 * Map function to transform single client data form firebase.
 *
 * @param doc
 * @returns {Object<IClient>}
 */
const parseFirebaseClientData = (doc: DocumentData) =>
   ({
      type: doc.data().type,
      nick: doc.data().nick || '',
      name: doc.data().name,
      contactPerson: doc.data().contactPerson,
      phone: doc.data().phone,
      email: doc.data().email,
      street: doc.data().street,
      city: doc.data().city,
      zipCode: doc.data().zipCode,
      nip: doc.data().nip,
      id: doc.id
   } as IClient);

/**
 * Map function to transform single building data form firebase.
 *
 * @param doc
 * @returns {Object<IBuilding>}
 */
const parseFirebaseBuildingData = (doc: DocumentData) =>
   ({
      name: doc.data().name,
      city: doc.data().city,
      property: doc.data().property,
      size: doc.data().size,
      extra: doc.data().extra,
      phone: doc.data().phone,
      email: doc.data().email,
      employees: doc.data().employees
   } as IBuilding);

export {parseFirebaseBookingData, parseFirebaseClientData, parseFirebaseBuildingData};
