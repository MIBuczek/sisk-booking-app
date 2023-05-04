import {Dispatch} from 'redux';
import {IBuilding, IBuildingAction} from 'models';
import {BUILDING_STATE, db, parseFirebaseBuildingData, SAVING_STAGE} from 'utils';
import {collection, getDocs} from 'firebase/firestore';

const BUILDINGS_COLLECTION_KEY: Readonly<'buildings'> = 'buildings';

/**
 * Generate redux payload fetching buildings action.
 *
 * @returns {IBuildingAction}
 */
const fetchingBuildingsStart = (): IBuildingAction => ({
   type: BUILDING_STATE.GET_BUILDING,
   payload: {
      isFetching: true,
      savingStage: SAVING_STAGE.INITIAL,
      errorMessage: '',
      buildings: []
   }
});

/**
 * Generate redux payload fetching success buildings action.
 *
 * @param {Array<IBuilding>} buildings
 * @returns {IBuildingAction}
 */
const fetchingBuildingsDone = (buildings: IBuilding[]): IBuildingAction => ({
   type: BUILDING_STATE.GET_BUILDING,
   payload: {
      isFetching: false,
      savingStage: SAVING_STAGE.SUCCESS,
      errorMessage: '',
      buildings
   }
});

/**
 * Generate redux payload fetching failed buildings action.
 *
 * @param {String} errorMessage
 * @returns {IBuildingAction}
 */
const fetchingBuildingsError = (errorMessage: string): IBuildingAction => ({
   type: BUILDING_STATE.ERROR_BUILDING,
   payload: {
      isFetching: false,
      savingStage: SAVING_STAGE.ERROR,
      errorMessage,
      buildings: []
   }
});

/**
 * Building store action to get all buildings records from firebase buildings collections.
 */
const getBuildingsData =
   () =>
   async (dispatch: Dispatch<IBuildingAction>): Promise<void> => {
      dispatch(fetchingBuildingsStart());
      try {
         const buildingsCollection = await collection(db, BUILDINGS_COLLECTION_KEY);
         const documents = await getDocs(buildingsCollection);
         const buildings = documents.docs.map(parseFirebaseBuildingData);
         dispatch(fetchingBuildingsDone(buildings));
      } catch (err) {
         dispatch(
            fetchingBuildingsError('Problem z serverem. Nie można pobrac danych o budynkach.')
         );
         throw new Error(JSON.stringify(err));
      }
   };

export {getBuildingsData, fetchingBuildingsStart};
