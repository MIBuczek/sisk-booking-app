import { IUserFeching, IUserPayload } from '../../models/reduxModel';
import { LOG_IN_USER, LOG_OUT_USER, SAVING_STAGE } from '../utils/utils';

const { INITIAL, SUCCESS, ERROR } = SAVING_STAGE;

export const fechingUserStart = (): IUserFeching => ({
  type: LOG_IN_USER,
  payload: {
    isFetching: true,
    savingStage: INITIAL,
    errorMessage: '',
    auth: null,
    user: undefined,
  },
});

export const fechingUserDone = ({
  savingStage,
  auth,
  user,
  errorMessage,
  isFetching,
}: IUserPayload): IUserFeching => ({
  type: LOG_IN_USER,
  payload: {
    isFetching,
    savingStage,
    errorMessage,
    auth,
    user,
  },
});

export const fechingUser = () => {
  return async (dispatch: any): Promise<void> => {
    await dispatch(fechingUserStart());
    // function go get user from firebase
    let auth = 'asdasd';
    let user = {
      name: 'Sara',
      position: 'admin',
    };
    if (user) {
      dispatch(
        fechingUserDone({
          isFetching: false,
          savingStage: SUCCESS,
          errorMessage: '',
          auth,
          user,
        }),
      );
    } else {
      dispatch(
        fechingUserDone({
          isFetching: false,
          savingStage: ERROR,
          errorMessage: 'Can not get user from database',
          auth: null,
          user: undefined,
        }),
      );
    }
  };
};

export const logOutUserDone = ({
  savingStage,
  auth,
  user,
  errorMessage,
  isFetching,
}: IUserPayload): IUserFeching => ({
  type: LOG_OUT_USER,
  payload: {
    isFetching,
    savingStage,
    errorMessage,
    auth,
    user,
  },
});

export const logOutUser = () => {
  return async (dispatch: any): Promise<void> => {
    await dispatch(fechingUserStart());
    //function go logout user from firebase
    if ('success') {
      dispatch(
        logOutUserDone({
          isFetching: false,
          savingStage: SUCCESS,
          errorMessage: '',
          auth: null,
          user: undefined,
        }),
      );
    } else {
      dispatch(
        logOutUserDone({
          isFetching: false,
          savingStage: ERROR,
          errorMessage: 'Cannot log out user, server error',
          auth: null,
          user: undefined,
        }),
      );
    }
  };
};
