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
    const credencials = await auth.signInWithEmailAndPassword(email, password);
    dispatch(fechingAuthDone(LOG_IN_USER, credencials));
  } catch ({ responce }) {
    dispatch(fechingAuthError(`${responce.status} : ${responce.statusText}`));
  }
};

export const logOutUser = () => async (dispatch: Dispatch<IAuthAction>): Promise<void> => {
  dispatch(fechingAuth());
  try {
    await auth.signOut();
    dispatch(fechingAuthDone(LOG_OUT_USER, undefined));
  } catch ({ responce }) {
    dispatch(fechingAuthError(`${responce.status} : ${responce.statusText}`));
  }
};
