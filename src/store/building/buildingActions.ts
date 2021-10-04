/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch } from 'react';
import { IBuildingsAction, IBuilding } from '../../models/store/store-models';
import {
  GET_BUILDINGS,
  ADD_BUILDINGS,
  DELETE_BUILDINGS,
  UPDATE_BUILDINGS,
  ERROR_BUILDINGS,
  SAVING_STAGE,
} from '../../utils/variables/store-data';
import { db } from '../../utils/variables/firebase-const';

const { INITIAL, SUCCESS, ERROR } = SAVING_STAGE;

export const fetchingBuildings = (): IBuildingsAction => ({
  type: GET_BUILDINGS,
  payload: {
    isFetching: true,
    savingStage: INITIAL,
    errorMessage: '',
    buildings: [],
  },
});

const fetchingBuildingsDone = (type: string, buildings: IBuilding[]): IBuildingsAction => ({
  type,
  payload: {
    isFetching: false,
    savingStage: SUCCESS,
    errorMessage: '',
    buildings,
  },
});

const fetchingBuildingsError = (errorMessage: string): IBuildingsAction => ({
  type: ERROR_BUILDINGS,
  payload: {
    isFetching: false,
    savingStage: ERROR,
    errorMessage,
    buildings: [],
  },
});

export const getBuildingsData = () => async (
  dispatch: Dispatch<IBuildingsAction>
): Promise<void> => {
  dispatch(fetchingBuildings());
  try {
    const resp = await db.collection('buildings').get();
    const buildings: IBuilding[] = resp.docs.map((doc) => {
      const building: IBuilding = {
        name: doc.data().name,
        address: doc.data().address,
        id: doc.data().id,
      };
      return building;
    });
    dispatch(fetchingBuildingsDone(ADD_BUILDINGS, buildings));
  } catch (err) {
    dispatch(fetchingBuildingsError('Problem z serverem. Nie można pobrać danych o obiektach.'));
  }
};

export const addBuilding = (buldingData: IBuilding) => async (
  dispatch: Dispatch<IBuildingsAction>,
  getStore: any
): Promise<void> => {
  dispatch(fetchingBuildings());
  try {
    await db.collection('buildings').doc().set(buldingData);
    const { buildings } = getStore();
    const newBuldings: IBuilding[] = [...buildings, buldingData];
    dispatch(fetchingBuildingsDone(ADD_BUILDINGS, newBuldings));
  } catch (err) {
    dispatch(
      fetchingBuildingsError('Problem z serverem. Nie można dodać nowego obiektu do bazy danych.')
    );
  }
};

export const updateBuilding = (buldingData: IBuilding, id: string) => async (
  dispatch: Dispatch<IBuildingsAction>,
  getStore: any
): Promise<void> => {
  dispatch(fetchingBuildings());
  try {
    await db.collection('buildings').doc(id).update(buldingData);
    const { buildings } = getStore();
    const newBuildings: IBuilding[] = buildings.map((building: IBuilding) =>
      building.id === id ? buldingData : building
    );
    dispatch(fetchingBuildingsDone(UPDATE_BUILDINGS, newBuildings));
  } catch (err) {
    dispatch(
      fetchingBuildingsError('Problem z serverem. Nie można zaktualizować obiektu w bazie danych.')
    );
    throw new Error(JSON.stringify(err));
  }
};

export const deleteBuilding = (id: string) => async (
  dispatch: Dispatch<IBuildingsAction>,
  getStore: any
): Promise<void> => {
  dispatch(fetchingBuildings());
  try {
    db.collection('buildings').doc(id).delete();
    const { buildings } = getStore();
    const newBuldings: IBuilding[] = buildings.filter((building: IBuilding) => building.id !== id);
    dispatch(fetchingBuildingsDone(DELETE_BUILDINGS, newBuldings));
  } catch (err) {
    dispatch(
      fetchingBuildingsError('Problem z serverem. Nie można skasować obiektu z bazie danych.')
    );
    throw new Error(JSON.stringify(err));
  }
};
