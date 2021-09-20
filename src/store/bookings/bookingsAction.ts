/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch } from 'react';
import { IBooking, IBookingsAction } from '../../models/store/store-models';
import {
  SAVING_STAGE,
  GET_BOOKINGS,
  UPDATE_BOOKING,
  ADD_BOOKING,
  DELETE_BOOKING,
  ERROR_BOOKING,
} from '../../utils/store-data';
import { db } from '../../utils/firebase';

const { INITIAL, SUCCESS, ERROR } = SAVING_STAGE;

const fechingBookings = (): IBookingsAction => ({
  type: GET_BOOKINGS,
  payload: {
    isFetching: true,
    savingStage: INITIAL,
    errorMessage: '',
    bookings: undefined,
  },
});

const fechingBookingsDone = (type: string, bookings: IBooking[]): IBookingsAction => ({
  type,
  payload: {
    isFetching: false,
    savingStage: SUCCESS,
    errorMessage: '',
    bookings,
  },
});

const fechingBookingsError = (errorMessage: string): IBookingsAction => ({
  type: ERROR_BOOKING,
  payload: {
    isFetching: false,
    savingStage: ERROR,
    errorMessage,
    bookings: undefined,
  },
});

export const getBookingsData = () => async (dispatch: Dispatch<IBookingsAction>): Promise<void> => {
  dispatch(fechingBookings());
  try {
    const resp = await db.collection('bookings').get();
    const bookings: IBooking[] = resp.docs.map((doc) => {
      const booking: IBooking = {
        date: doc.data().date,
        place: doc.data().place,
        user: doc.data().user,
        id: doc.data().id,
      };
      return booking;
    });
    dispatch(fechingBookingsDone(ADD_BOOKING, bookings));
  } catch (err) {
    dispatch(fechingBookingsError('Problem z serverem. Nie można pobrac danych rezerwacyjnych.'));
    throw new Error(JSON.stringify(err));
  }
};

export const addBooking = (bookingData: IBooking) => async (
  dispatch: Dispatch<IBookingsAction>,
  getStore: any
): Promise<void> => {
  dispatch(fechingBookings());
  try {
    await db.collection('bookings').doc().set(bookingData);
    const { bookings } = getStore();
    const newBookings: IBooking[] = [...bookings, bookingData];
    dispatch(fechingBookingsDone(ADD_BOOKING, newBookings));
  } catch (err) {
    dispatch(fechingBookingsError('Problem z serverem. Nie można dodać nowej rezerwacji.'));
    throw new Error(JSON.stringify(err));
  }
};

export const updateBooking = (bookingData: IBooking, id: string) => async (
  dispatch: Dispatch<IBookingsAction>,
  getStore: any
): Promise<void> => {
  dispatch(fechingBookings());
  try {
    await db.collection('bookings').doc(id).update(bookingData);
    const { bookings } = getStore();
    const newBookings: IBooking[] = bookings.map((booking: IBooking) =>
      booking.id === id ? bookingData : booking
    );
    dispatch(fechingBookingsDone(UPDATE_BOOKING, newBookings));
  } catch (err) {
    dispatch(fechingBookingsError('Problem z serverem. Nie można zaktualizować rezerwacji.'));
    throw new Error(JSON.stringify(err));
  }
};

export const deleteBooking = (id: string) => async (
  dispatch: Dispatch<IBookingsAction>,
  getStore: any
): Promise<void> => {
  dispatch(fechingBookings());
  try {
    db.collection('bookings').doc(id).delete();
    const { bookings } = getStore();
    const newBookings: IBooking[] = bookings.filter((booking: IBooking) => booking.id !== id);
    dispatch(fechingBookingsDone(DELETE_BOOKING, newBookings));
  } catch (err) {
    dispatch(fechingBookingsError('Problem z serverem. Nie można skasować rezerwacji.'));
    throw new Error(JSON.stringify(err));
  }
};
