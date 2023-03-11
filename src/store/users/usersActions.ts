/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch } from 'redux';
import { IReduxState, IUser, IUserAction } from 'models';
import { db, SAVING_STAGE, USER_STATE } from 'utils';
import { doc, getDoc } from 'firebase/firestore';

const USER_COLLECTION_KEY: Readonly<'users'> = 'users';

const fetchingUserStart = (): IUserAction => ({
  type: USER_STATE.GET_USER,
  payload: {
    isFetching: true,
    savingStage: SAVING_STAGE.INITIAL,
    errorMessage: '',
    user: undefined
  }
});

const fetchingUserDone = (user: IUser): IUserAction => ({
  type: USER_STATE.GET_USER,
  payload: {
    isFetching: false,
    savingStage: SAVING_STAGE.SUCCESS,
    errorMessage: '',
    user
  }
});

const fetchingUserError = (errorMessage: string): IUserAction => ({
  type: USER_STATE.ERROR_USER,
  payload: {
    isFetching: false,
    savingStage: SAVING_STAGE.ERROR,
    errorMessage,
    user: undefined
  }
});

/**
 * User store action to get already logged user.
 */
const getUserData = () => async (
  dispatch: Dispatch<IUserAction>,
  getState: () => IReduxState
): Promise<void> => {
  dispatch(fetchingUserStart());
  try {
    const { auth } = getState().authStore;

    if (!auth?.uid) return;

    const userRef = doc(db, USER_COLLECTION_KEY, auth.uid);
    const currentUser = await getDoc(userRef);

    dispatch(fetchingUserDone({ ...(currentUser.data() as IUser) }));
  } catch (err) {
    dispatch(fetchingUserError('Problem z serverem. Nie można pobrac danych użytkownika.'));
    throw new Error(JSON.stringify(err));
  }
};

export { fetchingUserStart, getUserData };
