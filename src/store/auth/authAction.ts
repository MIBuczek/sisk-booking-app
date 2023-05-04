import {Dispatch} from 'react';
import {IAuth, IAuthAction} from 'models';
import {auth, LOGIN_STATE, SAVING_STAGE} from 'utils';
import {signInWithEmailAndPassword, signOut} from 'firebase/auth';

/**
 * Generate redux payload fetching authentication user action.
 *
 * @returns {IAuthAction}
 */
export const fetchingAuth = (): IAuthAction => ({
   type: LOGIN_STATE.LOG_IN,
   payload: {
      isFetching: true,
      savingStage: SAVING_STAGE.INITIAL,
      errorMessage: '',
      auth: undefined
   }
});

/**
 * Generate redux payload fetching success authentication user action.
 *
 * @param {String} type
 * @param {IAuth} authData
 * @returns {IAuthAction}
 */
export const fetchingAuthDone = (type: string, authData?: IAuth): IAuthAction => ({
   type,
   payload: {
      isFetching: false,
      savingStage: SAVING_STAGE.SUCCESS,
      errorMessage: '',
      auth: authData
   }
});

/**
 * Generate redux payload fetching failed authentication user action.
 *
 * @param {String} errorMessage
 * @returns {IAuthAction}
 */
export const fetchingAuthError = (errorMessage: string): IAuthAction => ({
   type: LOGIN_STATE.LOG_IN,
   payload: {
      isFetching: false,
      savingStage: SAVING_STAGE.ERROR,
      errorMessage,
      auth: undefined
   }
});

/**
 * Dispatch store login user action.
 * @param  email
 * @param  password
 */
export const logInUser =
   (email: string, password: string) =>
   async (dispatch: Dispatch<IAuthAction>): Promise<void> => {
      dispatch(fetchingAuth());
      try {
         const resp = (await signInWithEmailAndPassword(auth, email, password)).user?.uid;
         if (resp) {
            const credentials: IAuth = {
               email,
               uid: resp
            };
            dispatch(fetchingAuthDone(LOGIN_STATE.LOG_IN, credentials));
         } else {
            dispatch(fetchingAuthError('Nie udane logowanie do aplikacji.'));
         }
      } catch (err) {
         dispatch(
            fetchingAuthError('Nie udane logowanie do aplikacji. Błedny adres e-mail lub hasło.')
         );
         throw new Error(JSON.stringify(err));
      }
   };

/* Dispatch store logout user action. */
export const logOutUser =
   () =>
   async (dispatch: Dispatch<IAuthAction>): Promise<void> => {
      dispatch(fetchingAuth());
      try {
         await signOut(auth);
         dispatch(fetchingAuthDone(LOGIN_STATE.LOG_OUT, undefined));
         window.location.reload();
      } catch (err) {
         dispatch(fetchingAuthError('Problem z serwerem. Nieudane wylogowanie z aplikacji.'));
         throw new Error(JSON.stringify(err));
      }
   };
