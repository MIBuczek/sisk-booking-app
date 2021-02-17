import { IBuldingsAction, IBulding } from '../../models/reduxModel';
import {
  GET_BULDINGS,
  ADD_BULDING,
  DELETE_BULDING,
  UPDATE_BULDING,
  ERROR_BULDING,
  SAVING_STAGE,
  ERROR_CLIENT,
} from '../utils/utils';

const { INITIAL, SUCCESS, ERROR } = SAVING_STAGE;

export const fechingBuildings = (): IBuldingsAction => ({
  type: GET_BULDINGS,
  payload: {
    isFetching: true,
    savingStage: INITIAL,
    errorMessage: '',
    buldings: [],
  },
});

export const fechingBuildingsDone = () => {
  return async (dispatch: any): Promise<void> => {
    //firebase get collection buildings
    const buldings: IBulding[];
    if ('collection ok') {
      dispatch(
        (): IBuldingsAction => ({
          type: GET_BULDINGS,
          payload: {
            isFetching: false,
            savingStage: SUCCESS,
            errorMessage: '',
            buldings,
          },
        }),
      );
    } else {
      dispatch(
        (): IBuldingsAction => ({
          type: ERROR_BULDING,
          payload: {
            isFetching: false,
            savingStage: ERROR,
            errorMessage: 'err responce',
            buldings: undefined,
          },
        }),
      );
    }
  };
};

export const addBuilding = (buldingData: IBulding) => {
  return async (dispatch: any): Promise<void> => {
    // firebase function to add new building
    if ('firebase ok') {
      dispatch(
        (): IBuldingsAction => ({
          type: ADD_BULDING,
          payload: {
            savingStage: SUCCESS,
            bulding: buldingData,
            errorMessage: '',
            isFetching: false,
          },
        }),
      );
    } else {
      dispatch(() => ({
        type: ERROR_BULDING,
        payload: {
          savingStage: ERROR,
          errorMessage: 'err.responce',
          isFetching: false,
        },
      }));
    }
  };
};

export const updateBuilding = (buldingData: IBulding) => {
  return async (dispatch: any): Promise<void> => {
    // firebase function to edit building
    if ('firebase ok') {
      dispatch(() => ({
        type: UPDATE_BULDING,
        payload: {
          savingStage: SUCCESS,
          bulding: buldingData,
          errorMessage: '',
          isFetching: false,
        },
      }));
    } else {
      dispatch(() => ({
        type: ERROR_BULDING,
        payload: {
          savingStage: ERROR,
          errorMessage: 'err.responce',
          isFetching: false,
        },
      }));
    }
  };
};

export const deleteBuilding = (buldingId: string) => {
  return async (dispatch: any): Promise<void> => {
    // firebase function to delete building
    if ('firebase ok') {
      dispatch(
        (): IBuldingsAction => ({
          type: DELETE_BULDING,
          payload: {
            savingStage: SUCCESS,
            buldingId,
            errorMessage: '',
            isFetching: false,
          },
        }),
      );
    } else {
      dispatch(() => ({
        type: ERROR_CLIENT,
        payload: {
          savingStage: ERROR,
          errorMessage: 'err.responce',
          isFetching: false,
        },
      }));
    }
  };
};
