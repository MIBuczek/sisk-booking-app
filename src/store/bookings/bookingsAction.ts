import { Dispatch } from 'react';
import {
  db,
  parseFirebaseBookingData,
  BOOKING_STATE,
  SAVING_STAGE,
  MODAL_TYPES,
  storeEmailNotification
} from 'utils';
import { IBooking, IBookingsAction, IModalAction, IReduxState } from 'models';
import { openModal } from 'store';

export const fetchingBookings = (): IBookingsAction => ({
  type: BOOKING_STATE.INITIAL_BOOKING,
  payload: {
    isFetching: true,
    savingStage: SAVING_STAGE.INITIAL,
    errorMessage: '',
    booking: undefined,
    bookingTimeIndex: null,
    bookings: []
  }
});

export const fetchingBookingsDone = (type: string, bookings: IBooking[]): IBookingsAction => ({
  type,
  payload: {
    isFetching: false,
    savingStage: SAVING_STAGE.SUCCESS,
    errorMessage: '',
    booking: undefined,
    bookingTimeIndex: null,
    bookings
  }
});

export const fetchingBookingsError = (errorMessage: string): IBookingsAction => ({
  type: BOOKING_STATE.ERROR_BOOKING,
  payload: {
    isFetching: false,
    savingStage: SAVING_STAGE.ERROR,
    errorMessage,
    booking: undefined,
    bookingTimeIndex: null,
    bookings: []
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
    bookings
  }
});

/**
 * Booking store action to get records form firebase in admin view.
 */
export const getBookingsData = () => async (dispatch: Dispatch<IBookingsAction>): Promise<void> => {
  dispatch(fetchingBookings());
  try {
    const resp = await db.collection('bookings').get();
    const bookings: IBooking[] = resp.docs.map(parseFirebaseBookingData);
    dispatch(fetchingBookingsDone(BOOKING_STATE.GET_BOOKING, bookings));
  } catch (err) {
    dispatch(fetchingBookingsError('Problem z serverem. Nie można pobrac danych rezerwacyjnych.'));
    throw new Error(JSON.stringify(err));
  }
};

/**
 * Booking store action to get records form firebase in user view.
 */
export const getBookingDataForUser = () => async (
  dispatch: Dispatch<IBookingsAction>
): Promise<void> => {
  dispatch(fetchingBookings());
  try {
    const resp = await db.collection('bookings').where('accepted', '==', true).get();
    const bookings: IBooking[] = resp.docs.map(parseFirebaseBookingData);
    dispatch(fetchingBookingsDone(BOOKING_STATE.GET_BOOKING, bookings));
  } catch (err) {
    dispatch(fetchingBookingsError('Problem z serverem. Nie można pobrac danych rezerwacyjnych.'));
    throw new Error(JSON.stringify(err));
  }
};

/**
 * Booking store action to add records to firebase database bookings collection.
 */
export const addBooking = (
  bookingData: IBooking,
  isAdmin: boolean,
  sendEmailNotification: boolean
) => async (
  dispatch: Dispatch<IBookingsAction | IModalAction>,
  getStore: () => IReduxState
): Promise<void> => {
  try {
    const resp = await db.collection('bookings').add(bookingData);

    const {
      bookingStore: { bookings },
      buildingStore: { buildings }
    } = getStore();

    const newBookings: IBooking[] = [{ ...bookingData, id: resp.id }, ...bookings];

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
export const updateBooking = (
  bookingData: IBooking,
  isAdmin: boolean,
  sendEmailNotification: boolean
) => async (
  dispatch: Dispatch<IBookingsAction | IModalAction>,
  getStore: () => IReduxState
): Promise<void> => {
  try {
    await db.collection('bookings').doc(bookingData.id).update(bookingData);

    const {
      bookingStore: { bookings },
      buildingStore: { buildings }
    } = getStore();

    const newBookings: IBooking[] = bookings.map((booking: IBooking) =>
      booking.id === bookingData.id ? bookingData : booking
    );

    dispatch(fetchingBookingsDone(BOOKING_STATE.UPDATE_BOOKING, newBookings));
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
export const getCurrentBooking = (id: string, bookingTimeIndex: number) => async (
  dispatch: Dispatch<IBookingsAction>,
  getStore: () => IReduxState
): Promise<void> => {
  const { bookings } = getStore().bookingStore;
  const currentBooking = bookings.find((b) => b.id === id);
  if (currentBooking) {
    dispatch(getSingleBooking(bookings, bookingTimeIndex, currentBooking));
  } else {
    dispatch(fetchingBookingsError('Problem z serverem. Nie można pokazac wybranej rezerwacji.'));
  }
};

/**
 * Booking store action to get current booking records from already stored bookings state.
 */
export const clearCurrentBooking = () => async (
  dispatch: Dispatch<IBookingsAction>,
  getStore: () => IReduxState
): Promise<void> => {
  const { bookings } = getStore().bookingStore;
  dispatch(getSingleBooking(bookings, null, undefined));
};

/**
 * Booking store action to delete records to firebase database bookings collection.
 */
export const deleteBooking = (id: string) => async (
  dispatch: Dispatch<IBookingsAction | IModalAction>,
  getStore: () => IReduxState
): Promise<void> => {
  try {
    await db.collection('bookings').doc(id).delete();
    const { bookings } = getStore().bookingStore;
    const newBookings: IBooking[] = bookings.filter((booking: IBooking) => booking.id !== id);
    dispatch(fetchingBookingsDone(BOOKING_STATE.DELETE_BOOKING, newBookings));
    dispatch(openModal(MODAL_TYPES.SUCCESS, 'Kasowanie elementu przebiegło pomyślnie'));
  } catch (err) {
    dispatch(openModal(MODAL_TYPES.ERROR, 'Problem z serverem. Nie można skasować rezerwacji.'));
    throw new Error(JSON.stringify(err));
  }
};
