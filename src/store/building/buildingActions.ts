/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch } from 'react';
import { IBuilding, IBuildingsAction, IReduxState } from 'models';
import { db, COLLECTION_STATE, SAVING_STAGE } from 'utils';

export const fetchingBuildings = (): IBuildingsAction => ({
  type: COLLECTION_STATE.GET,
  payload: {
    isFetching: true,
    savingStage: SAVING_STAGE.INITIAL,
    errorMessage: '',
    buildings: []
  }
});

const fetchingBuildingsDone = (type: string, buildings: IBuilding[]): IBuildingsAction => ({
  type,
  payload: {
    isFetching: false,
    savingStage: SAVING_STAGE.SUCCESS,
    errorMessage: '',
    buildings
  }
});

const fetchingBuildingsError = (errorMessage: string): IBuildingsAction => ({
  type: COLLECTION_STATE.ERROR,
  payload: {
    isFetching: false,
    savingStage: SAVING_STAGE.ERROR,
    errorMessage,
    buildings: []
  }
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
        city: doc.data().city,
        phone: doc.data().phone,
        email: doc.data().email,
        size: doc.data().size,
        id: doc.data().id
      };
      return building;
    });
    dispatch(fetchingBuildingsDone(COLLECTION_STATE.GET, buildings));
  } catch (err) {
    dispatch(fetchingBuildingsError('Problem z serverem. Nie można pobrać danych o obiektach.'));
  }
};

export const addBuilding = (building: IBuilding) => async (
  dispatch: Dispatch<IBuildingsAction>,
  getStore: () => IReduxState
): Promise<void> => {
  try {
    // await db.collection('buildings').doc().set(buildingData);
    const { buildings } = getStore().buildingStore;
    dispatch(fetchingBuildingsDone(COLLECTION_STATE.ADD, [...buildings, building]));
  } catch (err) {
    dispatch(
      fetchingBuildingsError('Problem z serverem. Nie można dodać nowego obiektu do bazy danych.')
    );
  }
};

export const updateBuilding = (buildingData: IBuilding) => async (
  dispatch: Dispatch<IBuildingsAction>,
  getStore: () => IReduxState
): Promise<void> => {
  try {
    // await db.collection('buildings').doc(id).update(buildingData);
    const { buildings } = getStore().buildingStore;
    const newBuildings: IBuilding[] = buildings.map((building: IBuilding) =>
      building.id === buildingData.id ? buildingData : building
    );
    dispatch(fetchingBuildingsDone(COLLECTION_STATE.UPDATE, newBuildings));
  } catch (err) {
    dispatch(
      fetchingBuildingsError('Problem z serverem. Nie można zaktualizować obiektu w bazie danych.')
    );
    throw new Error(JSON.stringify(err));
  }
};

export const deleteBuilding = (id: string) => async (
  dispatch: Dispatch<IBuildingsAction>,
  getStore: () => IReduxState
): Promise<void> => {
  try {
    // db.collection('buildings').doc(id).delete();
    const { buildings } = getStore().buildingStore;
    const newBuildings: IBuilding[] = buildings.filter((building: IBuilding) => building.id !== id);
    dispatch(fetchingBuildingsDone(COLLECTION_STATE.DELETE, newBuildings));
  } catch (err) {
    dispatch(
      fetchingBuildingsError('Problem z serverem. Nie można skasować obiektu z bazie danych.')
    );
    throw new Error(JSON.stringify(err));
  }
};