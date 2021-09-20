/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch } from 'react';
import { IBuldingsAction, IBulding } from '../../models/store/store-models';
import {
  GET_BULDINGS,
  ADD_BULDING,
  DELETE_BULDING,
  UPDATE_BULDING,
  ERROR_BULDING,
  SAVING_STAGE,
} from '../../utils/store-data';
import { db } from '../../utils/firebase';

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

const fechingBuldingsDone = (type: string, buldings: IBulding[]): IBuldingsAction => ({
  type,
  payload: {
    isFetching: false,
    savingStage: SUCCESS,
    errorMessage: '',
    buldings,
  },
});

const fechingBuldingsError = (errorMessage: string): IBuldingsAction => ({
  type: ERROR_BULDING,
  payload: {
    isFetching: false,
    savingStage: ERROR,
    errorMessage,
    buldings: [],
  },
});

export const getBuildingsData = () => async (
  dispatch: Dispatch<IBuldingsAction>
): Promise<void> => {
  dispatch(fechingBuildings());
  try {
    const resp = await db.collection('buildings').get();
    const buldings: IBulding[] = resp.docs.map((doc) => {
      const building: IBulding = {
        name: doc.data().name,
        address: doc.data().address,
        id: doc.data().id,
      };
      return building;
    });
    dispatch(fechingBuldingsDone(ADD_BULDING, buldings));
  } catch (err) {
    dispatch(fechingBuldingsError('Problem z serverem. Nie można pobrać danych o obiektach.'));
  }
};

export const addBuilding = (buldingData: IBulding) => async (
  dispatch: Dispatch<IBuldingsAction>,
  getStore: any
): Promise<void> => {
  dispatch(fechingBuildings());
  try {
    await db.collection('buildings').doc().set(buldingData);
    const { buildings } = getStore();
    const newBuldings: IBulding[] = [...buildings, buldingData];
    dispatch(fechingBuldingsDone(ADD_BULDING, newBuldings));
  } catch (err) {
    dispatch(
      fechingBuldingsError('Problem z serverem. Nie można dodać nowego obiektu do bazy danych.')
    );
  }
};

export const updateBuilding = (buldingData: IBulding, id: string) => async (
  dispatch: Dispatch<IBuldingsAction>,
  getStore: any
): Promise<void> => {
  dispatch(fechingBuildings());
  try {
    await db.collection('buildings').doc(id).update(buldingData);
    const { buildings } = getStore();
    const newBuldings: IBulding[] = buildings.map((building: IBulding) =>
      building.id === id ? buldingData : building
    );
    dispatch(fechingBuldingsDone(UPDATE_BULDING, newBuldings));
  } catch (err) {
    dispatch(
      fechingBuldingsError('Problem z serverem. Nie można zaktualizować obiektu w bazie danych.')
    );
    throw new Error(JSON.stringify(err));
  }
};

export const deleteBuilding = (id: string) => async (
  dispatch: Dispatch<IBuldingsAction>,
  getStore: any
): Promise<void> => {
  dispatch(fechingBuildings());
  try {
    db.collection('buildings').doc(id).delete();
    const { buildings } = getStore();
    const newBuldings: IBulding[] = buildings.filter((building: IBulding) => building.id !== id);
    dispatch(fechingBuldingsDone(DELETE_BULDING, newBuldings));
  } catch (err) {
    dispatch(
      fechingBuldingsError('Problem z serverem. Nie można skasować obiektu z bazie danych.')
    );
    throw new Error(JSON.stringify(err));
  }
};
