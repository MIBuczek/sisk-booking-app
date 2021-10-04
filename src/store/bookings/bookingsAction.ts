/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch } from 'react';
import { IBooking, IBookingsAction, IReduxState } from '../../models/store/store-models';
import {
  SAVING_STAGE,
  GET_BOOKINGS,
  UPDATE_BOOKING,
  ADD_BOOKING,
  DELETE_BOOKING,
  ERROR_BOOKING,
} from '../../utils/variables/store-data';
import { db } from '../../utils/variables/firebase-const';
import { parseFirebaseData } from '../../utils/functions/api-functions';

const { INITIAL, SUCCESS, ERROR } = SAVING_STAGE;

const fetchingBookings = (): IBookingsAction => ({
  type: GET_BOOKINGS,
  payload: {
    isFetching: true,
    savingStage: INITIAL,
    errorMessage: '',
    booking: undefined,
    bookings: [],
  },
});

const fetchingBookingsDone = (type: string, bookings: IBooking[]): IBookingsAction => ({
  type,
  payload: {
    isFetching: false,
    savingStage: SUCCESS,
    errorMessage: '',
    booking: undefined,
    bookings,
  },
});

const fetchingBookingsError = (errorMessage: string): IBookingsAction => ({
  type: ERROR_BOOKING,
  payload: {
    isFetching: false,
    savingStage: ERROR,
    errorMessage,
    booking: undefined,
    bookings: [],
  },
});

const getSingleBooking = (bookings: IBooking[], booking?: IBooking): IBookingsAction => ({
  type: ERROR_BOOKING,
  payload: {
    isFetching: false,
    savingStage: SUCCESS,
    errorMessage: '',
    booking,
    bookings,
  },
});

export const getBookingsData = () => async (dispatch: Dispatch<IBookingsAction>): Promise<void> => {
  dispatch(fetchingBookings());
  try {
    const resp = await db.collection('bookings').get();
    const bookings: IBooking[] = resp.docs.map(parseFirebaseData);
    dispatch(fetchingBookingsDone(ADD_BOOKING, bookings));
  } catch (err) {
    dispatch(fetchingBookingsError('Problem z serverem. Nie można pobrac danych rezerwacyjnych.'));
    throw new Error(JSON.stringify(err));
  }
};

export const addBooking = (bookingData: IBooking) => async (
  dispatch: Dispatch<IBookingsAction>,
  getStore: () => IReduxState
): Promise<void> => {
  dispatch(fetchingBookings());
  try {
    // await db.collection('bookings').doc().set(bookingData);
    const { bookings } = getStore().bookingState;
    const newBookings: IBooking[] = [...bookings, bookingData];
    dispatch(fetchingBookingsDone(ADD_BOOKING, newBookings));
  } catch (err) {
    dispatch(fetchingBookingsError('Problem z serverem. Nie można dodać nowej rezerwacji.'));
    throw new Error(JSON.stringify(err));
  }
};

export const updateBooking = (bookingData: IBooking, id: string) => async (
  dispatch: Dispatch<IBookingsAction>,
  getStore: () => IReduxState
): Promise<void> => {
  dispatch(fetchingBookings());
  try {
    await db.collection('bookings').doc(id).update(bookingData);
    const { bookings } = getStore().bookingState;
    const newBookings: IBooking[] = bookings.map((booking: IBooking) =>
      booking.id === id ? bookingData : booking
    );
    dispatch(fetchingBookingsDone(UPDATE_BOOKING, newBookings));
  } catch (err) {
    dispatch(fetchingBookingsError('Problem z serverem. Nie można zaktualizować rezerwacji.'));
    throw new Error(JSON.stringify(err));
  }
};

export const getCurrentBooking = (id: string) => async (
  dispatch: Dispatch<IBookingsAction>,
  getStore: () => IReduxState
): Promise<void> => {
  const { bookings } = getStore().bookingState;
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
  const { bookings } = getStore().bookingState;
  dispatch(getSingleBooking(bookings, undefined));
};

export const deleteBooking = (id: string) => async (
  dispatch: Dispatch<IBookingsAction>,
  getStore: () => IReduxState
): Promise<void> => {
  dispatch(fetchingBookings());
  try {
    db.collection('bookings').doc(id).delete();
    const { bookings } = getStore().bookingState;
    const newBookings: IBooking[] = bookings.filter((booking: IBooking) => booking.id !== id);
    dispatch(fetchingBookingsDone(DELETE_BOOKING, newBookings));
  } catch (err) {
    dispatch(fetchingBookingsError('Problem z serverem. Nie można skasować rezerwacji.'));
    throw new Error(JSON.stringify(err));
  }
};
