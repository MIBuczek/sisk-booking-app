/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch } from 'react';
import { db, parseFirebaseData, COLLECTION_STATE, SAVING_STAGE } from 'utils';
import { IBooking, IBookingsAction, IReduxState } from 'models';

const fetchingBookings = (): IBookingsAction => ({
  type: COLLECTION_STATE.GET,
  payload: {
    isFetching: true,
    savingStage: SAVING_STAGE.INITIAL,
    errorMessage: '',
    booking: undefined,
    bookings: []
  }
});

const fetchingBookingsDone = (type: string, bookings: IBooking[]): IBookingsAction => ({
  type,
  payload: {
    isFetching: false,
    savingStage: SAVING_STAGE.SUCCESS,
    errorMessage: '',
    booking: undefined,
    bookings
  }
});

const fetchingBookingsError = (errorMessage: string): IBookingsAction => ({
  type: COLLECTION_STATE.ERROR,
  payload: {
    isFetching: false,
    savingStage: SAVING_STAGE.ERROR,
    errorMessage,
    booking: undefined,
    bookings: []
  }
});

const getSingleBooking = (bookings: IBooking[], booking?: IBooking): IBookingsAction => ({
  type: COLLECTION_STATE.GET,
  payload: {
    isFetching: false,
    savingStage: SAVING_STAGE.SUCCESS,
    errorMessage: '',
    booking,
    bookings
  }
});

export const getBookingsData = () => async (dispatch: Dispatch<IBookingsAction>): Promise<void> => {
  dispatch(fetchingBookings());
  try {
    const resp = await db.collection('bookings').get();
    const bookings: IBooking[] = resp.docs.map(parseFirebaseData);
    dispatch(fetchingBookingsDone(COLLECTION_STATE.ADD, bookings));
  } catch (err) {
    dispatch(fetchingBookingsError('Problem z serverem. Nie można pobrac danych rezerwacyjnych.'));
    throw new Error(JSON.stringify(err));
  }
};

export const addBooking = (bookingData: IBooking) => async (
  dispatch: Dispatch<IBookingsAction>,
  getStore: () => IReduxState
): Promise<void> => {
  // dispatch(fetchingBookings());
  try {
    // await db.collection('bookings').doc().set(bookingData);
    const { bookings } = getStore().bookingStore;
    const newBookings: IBooking[] = [...bookings, bookingData];
    dispatch(fetchingBookingsDone(COLLECTION_STATE.ADD, newBookings));
  } catch (err) {
    dispatch(fetchingBookingsError('Problem z serverem. Nie można dodać nowej rezerwacji.'));
    throw new Error(JSON.stringify(err));
  }
};

export const updateBooking = (bookingData: IBooking, id: string) => async (
  dispatch: Dispatch<IBookingsAction>,
  getStore: () => IReduxState
): Promise<void> => {
  // dispatch(fetchingBookings());
  try {
    await db.collection('bookings').doc(id).update(bookingData);
    const { bookings } = getStore().bookingStore;
    const newBookings: IBooking[] = bookings.map((booking: IBooking) =>
      booking.id === id ? bookingData : booking
    );
    dispatch(fetchingBookingsDone(COLLECTION_STATE.UPDATE, newBookings));
  } catch (err) {
    dispatch(fetchingBookingsError('Problem z serverem. Nie można zaktualizować rezerwacji.'));
    throw new Error(JSON.stringify(err));
  }
};

export const getCurrentBooking = (id: string) => async (
  dispatch: Dispatch<IBookingsAction>,
  getStore: () => IReduxState
): Promise<void> => {
  const { bookings } = getStore().bookingStore;
  const currentBooking = bookings.find((b) => b.id === id);
  if (currentBooking) {
    dispatch(getSingleBooking(bookings, currentBooking));
  } else {
    dispatch(fetchingBookingsError('Problem z serverem. Nie można pokazac wybranej rezerwacji.'));
  }
};

export const clearCurrentBooking = () => async (
  dispatch: Dispatch<IBookingsAction>,
  getStore: () => IReduxState
): Promise<void> => {
  const { bookings } = getStore().bookingStore;
  dispatch(getSingleBooking(bookings, undefined));
};

export const deleteBooking = (id: string) => async (
  dispatch: Dispatch<IBookingsAction>,
  getStore: () => IReduxState
): Promise<void> => {
  dispatch(fetchingBookings());
  try {
    db.collection('bookings').doc(id).delete();
    const { bookings } = getStore().bookingStore;
    const newBookings: IBooking[] = bookings.filter((booking: IBooking) => booking.id !== id);
    dispatch(fetchingBookingsDone(COLLECTION_STATE.DELETE, newBookings));
  } catch (err) {
    dispatch(fetchingBookingsError('Problem z serverem. Nie można skasować rezerwacji.'));
    throw new Error(JSON.stringify(err));
  }
};
