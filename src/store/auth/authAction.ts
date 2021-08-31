import { Dispatch } from 'react';
import { IAuthAction, IAuth } from '../../models/store-models';
import { LOG_IN_USER, LOG_OUT_USER, SAVING_STAGE } from '../../utils/store-data';
import { auth } from '../../utils/firebase';

const { INITIAL, SUCCESS, ERROR } = SAVING_STAGE;

export const fechingAuth = (): IAuthAction => ({
  type: LOG_IN_USER,
  payload: {
    isFetching: true,
    savingStage: INITIAL,
    errorMessage: '',
    auth: undefined,
  },
});

export const fechingAuthDone = (type: string, authData?: IAuth): IAuthAction => ({
  type,
  payload: {
    isFetching: false,
    savingStage: SUCCESS,
    errorMessage: '',
    auth: authData,
  },
});

export const fechingAuthError = (errorMessage: string): IAuthAction => ({
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
  dispatch(fechingAuth());
  try {
    const resp = await auth.signInWithEmailAndPassword(email, password);
    const credencials: IAuth = {
      email,
      uid: resp,
    };
    dispatch(fechingAuthDone(LOG_IN_USER, credencials));
  } catch (err) {
    dispatch(fechingAuthError('Nie udane logowanie do aplikacji.'));
    throw new Error(JSON.stringify(err));
  }
};

export const logOutUser = () => async (dispatch: Dispatch<IAuthAction>): Promise<void> => {
  dispatch(fechingAuth());
  try {
    await auth.signOut();
    dispatch(fechingAuthDone(LOG_OUT_USER, undefined));
  } catch (err) {
    dispatch(fechingAuthError('Problem z serwerem. Nieudane wylogowanie z aplikacji.'));
    throw new Error(JSON.stringify(err));
  }
};
