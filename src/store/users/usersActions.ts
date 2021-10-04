/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch } from 'redux';
import { IUserAction, IUser, IAuth } from '../../models/store/store-models';
import { GET_USER, ERROR_USER, SAVING_STAGE } from '../../utils/variables/store-data';
import { db } from '../../utils/variables/firebase-const';

const { INITIAL, SUCCESS, ERROR } = SAVING_STAGE;

export const fetchingUserStart = (): IUserAction => ({
  type: GET_USER,
  payload: {
    isFetching: true,
    savingStage: INITIAL,
    errorMessage: '',
    user: undefined,
  },
});

const fetchingUserDone = (user: IUser): IUserAction => ({
  type: GET_USER,
  payload: {
    isFetching: false,
    savingStage: SUCCESS,
    errorMessage: '',
    user,
  },
});

const fetchingUserError = (errorMessage: string): IUserAction => ({
  type: ERROR_USER,
  payload: {
    isFetching: false,
    savingStage: ERROR,
    errorMessage,
    user: undefined,
  },
});

export const getUserData = () => async (
  dispatch: Dispatch<IUserAction>,
  getState: any
): Promise<void> => {
  dispatch(fetchingUserStart());
  try {
    const { auth } = getState();
    const resp = ((await db.collection('users').get()) as unknown) as IUser;
    const [user]: IUser[] = resp.docs.filter((doc: { data: () => { [x: string]: string } }) => {
      if (auth.uid === doc.data().id) {
        const currentUser: IUser = {
          name: doc.data().name,
          id: doc.data().id,
          position: doc.data().position,
        };
        return currentUser;
      }
      return null;
    });
    dispatch(fetchingUserDone(user));
  } catch (err) {
    dispatch(fetchingUserError('Problem z serverem. Nie można pobrac danych użytkownika.'));
    throw new Error(JSON.stringify(err));
  }
};
