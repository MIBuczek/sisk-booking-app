/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch } from 'redux';
import { IReduxState, IUser, IUserAction } from 'models';
import { ADMIN_ROLE, db, SAVING_STAGE, USER_STATE } from 'utils';

export const fetchingUserStart = (): IUserAction => ({
  type: USER_STATE.GET,
  payload: {
    isFetching: true,
    savingStage: SAVING_STAGE.INITIAL,
    errorMessage: '',
    user: undefined
  }
});

const fetchingUserDone = (user: IUser): IUserAction => ({
  type: USER_STATE.GET,
  payload: {
    isFetching: false,
    savingStage: SAVING_STAGE.SUCCESS,
    errorMessage: '',
    user
  }
});

const fetchingUserError = (errorMessage: string): IUserAction => ({
  type: USER_STATE.ERROR,
  payload: {
    isFetching: false,
    savingStage: SAVING_STAGE.ERROR,
    errorMessage,
    user: undefined
  }
});

export const getUserData = () => async (
  dispatch: Dispatch<IUserAction>,
  getState: () => IReduxState
): Promise<void> => {
  dispatch(fetchingUserStart());
  try {
    const { auth } = getState().authStore;
    const resp = ((await db.collection('users').get()) as unknown) as IUser;
    const [user]: IUser[] = ((resp.docs as unknown) as any[]).filter(
      (doc: { data: () => { [x: string]: string | any } }) => {
        if (auth?.uid === doc.data().id) {
          const currentUser: IUser = {
            name: doc.data().name,
            id: doc.data().id,
            role: doc.data().role
          };
          return currentUser;
        }
        return null;
      }
    );
    dispatch(fetchingUserDone(user));
  } catch (err) {
    dispatch(fetchingUserError('Problem z serverem. Nie można pobrac danych użytkownika.'));
    throw new Error(JSON.stringify(err));
  }
};
