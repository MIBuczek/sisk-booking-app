import {Dispatch} from 'react';
import {
   addDoc,
   collection,
   deleteDoc,
   doc,
   getDocs,
   query,
   updateDoc,
   where
} from 'firebase/firestore';
import {
   BOOKING_STATE,
   db,
   MODAL_TYPES,
   parseFirebaseBookingData,
   SAVING_STAGE,
   storeEmailNotification
} from 'utils';
import {IBooking, IBookingsAction, IModalAction, IReduxState} from 'models';
import {openModal} from 'store';
import {cloneDeep} from 'lodash';

const BOOKING_COLLECTION_KEY: Readonly<'bookings'> = 'bookings';

/**
 * Generate redux payload fetching bookings data action.
 *
 * @returns {IBookingsAction}
 */
export const fetchingBookings = (): IBookingsAction => ({
   type: BOOKING_STATE.INITIAL_BOOKING,
   payload: {
      isFetching: true,
      savingStage: SAVING_STAGE.INITIAL,
      errorMessage: '',
      booking: undefined,
      bookingTimeIndex: null,
      bookings: [],
      conflictedBookings: []
   }
});

/**
 * Generate redux payload fetching success bookings data action.
 *
 * @param {String} type
 * @param {Array<IBooking>} bookings
 * @returns {IBookingsAction}
 */
export const fetchingBookingsDone = (type: string, bookings: IBooking[]): IBookingsAction => ({
   type,
   payload: {
      isFetching: false,
      savingStage: SAVING_STAGE.SUCCESS,
      errorMessage: '',
      booking: undefined,
      bookingTimeIndex: null,
      bookings,
      conflictedBookings: []
   }
});

/**
 * Generate redux payload fetching failed bookings data action.
 *
 * @param {String} errorMessage
 * @returns {IBookingsAction}
 */
export const fetchingBookingsError = (errorMessage: string): IBookingsAction => ({
   type: BOOKING_STATE.ERROR_BOOKING,
   payload: {
      isFetching: false,
      savingStage: SAVING_STAGE.ERROR,
      errorMessage,
      booking: undefined,
      bookingTimeIndex: null,
      bookings: [],
      conflictedBookings: []
   }
});

export const getSingleBooking = (
   bookings: IBooking[],
   bookingTimeIndex: number | null,
   booking?: IBooking
): IBookingsAction => ({
   type: BOOKING_STATE.GET_BOOKING,
   payload: {
      isFetching: false,
      savingStage: SAVING_STAGE.SUCCESS,
      errorMessage: '',
      booking,
      bookingTimeIndex,
      bookings,
      conflictedBookings: []
   }
});

/**
 * Dispatch store action to set booking conflicts.
 *
 * @param {Array<IBooking>} bookings
 * @param {Array<IBooking>} conflictedBookings
 * @returns {IBookingsAction}
 */
export const getBookingConflicts = (
   bookings: IBooking[],
   conflictedBookings: IBooking[]
): IBookingsAction => ({
   type: BOOKING_STATE.GET_BOOKING_CONFLICTS,
   payload: {
      isFetching: false,
      savingStage: SAVING_STAGE.SUCCESS,
      errorMessage: '',
      booking: undefined,
      bookingTimeIndex: null,
      bookings,
      conflictedBookings
   }
});

/**
 * Dispatch store action to clear booking conflicts.
 *
 * @param {Array<IBooking>} bookings
 * @returns {IBookingsAction}
 */
export const clearBookingConflictsState = (bookings: IBooking[]): IBookingsAction => ({
   type: BOOKING_STATE.CLEAR_BOOKING_CONFLICTS,
   payload: {
      isFetching: false,
      savingStage: SAVING_STAGE.SUCCESS,
      errorMessage: '',
      booking: undefined,
      bookingTimeIndex: null,
      bookings,
      conflictedBookings: []
   }
});

/**
 * Booking store action to get records form firebase in admin view.
 */
export const getBookingsData =
   () =>
   async (dispatch: Dispatch<IBookingsAction>): Promise<void> => {
      dispatch(fetchingBookings());
      try {
         const bookingCollection = await collection(db, BOOKING_COLLECTION_KEY);
         const documents = await getDocs(bookingCollection);
         const bookings: IBooking[] = documents.docs.map(parseFirebaseBookingData);
         dispatch(fetchingBookingsDone(BOOKING_STATE.GET_BOOKING, bookings));
      } catch (err) {
         dispatch(
            fetchingBookingsError('Problem z serverem. Nie można pobrac danych rezerwacyjnych.')
         );
         throw new Error(JSON.stringify(err));
      }
   };

/**
 * Booking store action to get records form firebase in user view.
 */
export const getBookingDataForUser =
   () =>
   async (dispatch: Dispatch<IBookingsAction>): Promise<void> => {
      dispatch(fetchingBookings());
      try {
         const bookingsQuery = await query(
            collection(db, BOOKING_COLLECTION_KEY),
            where('accepted', '==', true)
         );
         const documents = await getDocs(bookingsQuery);
         const bookings: IBooking[] = documents.docs.map(parseFirebaseBookingData);
         dispatch(fetchingBookingsDone(BOOKING_STATE.GET_BOOKING, bookings));
      } catch (err) {
         dispatch(
            fetchingBookingsError('Problem z serverem. Nie można pobrac danych rezerwacyjnych.')
         );
         throw new Error(JSON.stringify(err));
      }
   };

/**
 * Booking store action to add records to firebase database bookings collection.
 */
export const addBooking =
   (bookingData: IBooking, isAdmin: boolean, sendEmailNotification: boolean) =>
   async (
      dispatch: Dispatch<IBookingsAction | IModalAction>,
      getStore: () => IReduxState
   ): Promise<void> => {
      try {
         const addedDocument = await addDoc(collection(db, BOOKING_COLLECTION_KEY), bookingData);

         const {
            bookingStore: {bookings},
            buildingStore: {buildings}
         } = getStore();

         const newBookings: IBooking[] = [{...bookingData, id: addedDocument.id}, ...bookings];

         dispatch(fetchingBookingsDone(BOOKING_STATE.ADD_BOOKING, newBookings));
         dispatch(openModal(MODAL_TYPES.SUCCESS, 'Rezerwacji została dodana pomyślnie'));

         const building = buildings.find((b) => b.property === bookingData.building);

         if (!sendEmailNotification) {
            return;
         }

         const emailResp = await storeEmailNotification(bookingData, isAdmin, building?.email);
         if (emailResp > 200) {
            dispatch(
               openModal(
                  MODAL_TYPES.ERROR,
                  'Problem z serverem. Nie można było wysłać notyfikacji mailowej.'
               )
            );
         }
      } catch (err) {
         dispatch(
            openModal(MODAL_TYPES.ERROR, 'Problem z serverem. Nie można dodac Twojej rezerwacji.')
         );

         throw new Error(JSON.stringify(err));
      }
   };

/**
 * Booking store action to update records to firebase database bookings collection.
 */
export const updateBooking =
   (bookingData: IBooking, isAdmin: boolean, sendEmailNotification: boolean) =>
   async (
      dispatch: Dispatch<IBookingsAction | IModalAction>,
      getStore: () => IReduxState
   ): Promise<void> => {
      try {
         await updateDoc(doc(db, BOOKING_COLLECTION_KEY, bookingData.id), bookingData);

         const {
            bookingStore: {bookings},
            buildingStore: {buildings}
         } = getStore();

         const clonedBookings = cloneDeep(bookings);
         const bookingIndex = clonedBookings.findIndex((b) => b.id === bookingData.id);
         clonedBookings.splice(bookingIndex, 1, bookingData);

         dispatch(fetchingBookingsDone(BOOKING_STATE.UPDATE_BOOKING, clonedBookings));
         dispatch(openModal(MODAL_TYPES.SUCCESS, 'Rezerwacji została zaktualizowana pomyślnie'));

         const building = buildings.find((b) => b.property === bookingData.building);

         if (!sendEmailNotification) {
            return;
         }

         const emailResp = await storeEmailNotification(bookingData, isAdmin, building?.email);
         if (emailResp > 200) {
            dispatch(
               openModal(
                  MODAL_TYPES.ERROR,
                  'Problem z serverem. Nie można było wysłać notyfikacji mailowej.'
               )
            );
         }
      } catch (err) {
         dispatch(
            openModal(MODAL_TYPES.ERROR, 'Problem z serverem. Nie można zaktualizować rezerwacji.')
         );
         throw new Error(JSON.stringify(err));
      }
   };

/**
 * Booking store action to get current booking records from already stored bookings state.
 */
export const getCurrentBooking =
   (id: string, bookingTimeIndex: number) =>
   async (dispatch: Dispatch<IBookingsAction>, getStore: () => IReduxState): Promise<void> => {
      const {bookings} = getStore().bookingStore;
      const currentBooking = bookings.find((b) => b.id === id);
      if (currentBooking) {
         dispatch(getSingleBooking(bookings, bookingTimeIndex, currentBooking));
      } else {
         dispatch(
            fetchingBookingsError('Problem z serverem. Nie można pokazac wybranej rezerwacji.')
         );
      }
   };

/**
 * Booking store action to get current booking records from already stored bookings state.
 */
export const clearCurrentBooking =
   () =>
   async (dispatch: Dispatch<IBookingsAction>, getStore: () => IReduxState): Promise<void> => {
      const {bookings} = getStore().bookingStore;
      dispatch(getSingleBooking(bookings, null, undefined));
   };

/**
 * Booking store action to delete records to firebase database bookings collection.
 */
export const deleteBooking =
   (id: string) =>
   async (
      dispatch: Dispatch<IBookingsAction | IModalAction>,
      getStore: () => IReduxState
   ): Promise<void> => {
      try {
         await deleteDoc(doc(db, BOOKING_COLLECTION_KEY, id));
         const {bookings} = getStore().bookingStore;
         const newBookings: IBooking[] = bookings.filter((booking: IBooking) => booking.id !== id);
         dispatch(fetchingBookingsDone(BOOKING_STATE.DELETE_BOOKING, newBookings));
         dispatch(openModal(MODAL_TYPES.SUCCESS, 'Kasowanie elementu przebiegło pomyślnie'));
      } catch (err) {
         dispatch(
            openModal(MODAL_TYPES.ERROR, 'Problem z serverem. Nie można skasować rezerwacji.')
         );
         throw new Error(JSON.stringify(err));
      }
   };

/**
 * Booking store action to updated booking state by conflicted bookings.
 */
export const updateBookingConflicts =
   (conflictedBookings: IBooking[]) =>
   async (dispatch: Dispatch<IBookingsAction>, getStore: () => IReduxState): Promise<void> => {
      const {bookings} = getStore().bookingStore;
      dispatch(getBookingConflicts(bookings, conflictedBookings));
   };

/**
 * Booking store action to clear booking state by conflicted bookings.
 */
export const clearBookingConflicts =
   () =>
   async (dispatch: Dispatch<IBookingsAction>, getStore: () => IReduxState): Promise<void> => {
      const {bookings} = getStore().bookingStore;
      dispatch(clearBookingConflictsState(bookings));
   };
