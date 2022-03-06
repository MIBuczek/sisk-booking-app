/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch } from 'redux';
import { IBuilding, IBuildingAction } from 'models';
import { BUILDING_STATE, db, parseFirebaseBuildingData, SAVING_STAGE } from 'utils';

const fetchingBuildingsStart = (): IBuildingAction => ({
  type: BUILDING_STATE.GET_BUILDING,
  payload: {
    isFetching: true,
    savingStage: SAVING_STAGE.INITIAL,
    errorMessage: '',
    buildings: []
  }
});

const fetchingBuildingsDone = (buildings: IBuilding[]): IBuildingAction => ({
  type: BUILDING_STATE.GET_BUILDING,
  payload: {
    isFetching: false,
    savingStage: SAVING_STAGE.SUCCESS,
    errorMessage: '',
    buildings
  }
});

const fetchingBuildingsError = (errorMessage: string): IBuildingAction => ({
  type: BUILDING_STATE.ERROR_BUILDING,
  payload: {
    isFetching: false,
    savingStage: SAVING_STAGE.ERROR,
    errorMessage,
    buildings: []
  }
});

const getBuildingsData = () => async (dispatch: Dispatch<IBuildingAction>): Promise<void> => {
  dispatch(fetchingBuildingsStart());
  try {
    const resp = await db.collection('buildings').get();
    const buildings = resp.docs.map(parseFirebaseBuildingData);
    dispatch(fetchingBuildingsDone(buildings));
  } catch (err) {
    dispatch(fetchingBuildingsError('Problem z serverem. Nie można pobrac danych o budynkach.'));
    throw new Error(JSON.stringify(err));
  }
};

export { getBuildingsData, fetchingBuildingsStart };