import { Dispatch } from 'react';
import { IAuthAction, IAuth } from '../../models/store/store-models';
import { LOG_IN_USER, LOG_OUT_USER, SAVING_STAGE } from '../../utils/variables/store-data';
import { auth } from '../../utils/variables/firebase-const';

const { INITIAL, SUCCESS, ERROR } = SAVING_STAGE;

export const fetchingAuth = (): IAuthAction => ({
  type: LOG_IN_USER,
  payload: {
    isFetching: true,
    savingStage: INITIAL,
    errorMessage: '',
    auth: undefined,
  },
});

export const fetchingAuthDone = (type: string, authData?: IAuth): IAuthAction => ({
  type,
  payload: {
    isFetching: false,
    savingStage: SUCCESS,
    errorMessage: '',
    auth: authData,
  },
});

export const fetchingAuthError = (errorMessage: string): IAuthAction => ({
  type: LOG_IN_USER,
  payload: {
    isFetching: false,
    savingStage: ERROR,
    errorMessage,
    auth: undefined,
  },
});

export const logInUser = (email: string, password: string) => async (
  dispatch: Dispatch<IAuthAction>
): Promise<void> => {
  dispatch(fetchingAuth());
  try {
    const resp = await auth.signInWithEmailAndPassword(email, password);
    const credencials: IAuth = {
      email,
      uid: resp,
    };
    dispatch(fetchingAuthDone(LOG_IN_USER, credencials));
  } catch (err) {
    dispatch(fetchingAuthError('Nie udane logowanie do aplikacji.'));
    throw new Error(JSON.stringify(err));
  }
};

export const logOutUser = () => async (dispatch: Dispatch<IAuthAction>): Promise<void> => {
  dispatch(fetchingAuth());
  try {
    await auth.signOut();
    dispatch(fetchingAuthDone(LOG_OUT_USER, undefined));
  } catch (err) {
    dispatch(fetchingAuthError('Problem z serwerem. Nieudane wylogowanie z aplikacji.'));
    throw new Error(JSON.stringify(err));
  }
};
