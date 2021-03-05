import { Dispatch } from 'redux';
import { IUserAction, IUser } from '../../models/store-models';
import { GET_USER, ERROR_USER, SAVING_STAGE } from '../../utils/store-data';
import { auth, db } from '../../utils/firebase';

const { INITIAL, SUCCESS, ERROR } = SAVING_STAGE;

export const fechingUserStart = (): IUserAction => ({
  type: GET_USER,
  payload: {
    isFetching: true,
    savingStage: INITIAL,
    errorMessage: '',
    user: undefined,
  },
});

const fechingUserDone = (user: IUser): IUserAction => ({
  type: GET_USER,
  payload: {
    isFetching: false,
    savingStage: SUCCESS,
    errorMessage: '',
    user,
  },
});

const fechingUserError = (errorMessage: string): IUserAction => ({
  type: ERROR_USER,
  payload: {
    isFetching: false,
    savingStage: ERROR,
    errorMessage,
    user: undefined,
  },
});

export const getUserData = () => async (dispatch: Dispatch<IUserAction>): Promise<void> => {
  dispatch(fechingUserStart());
  try {
    const resp = await db.collection('users').get();
    const [users]: IUser[] = resp.docs.filter((doc) => {
      if (auth.uid === doc.data().id) {
        const currentUser: IUser = {
          name: doc.data().name,
          id: doc.data().id,
          position: doc.data().position,
        };
        return currentUser;
      }
    });
    dispatch(fechingUserDone(users));
  } catch ({ responce }) {
    dispatch(fechingUserError(`${responce.status} : ${responce.statusText}`));
  }
};
