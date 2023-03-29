import {IAdminState, IMainState} from 'models';
import {BUILDINGS_OPTIONS, CITY_OPTIONS} from './options-const';

const initialMainState: IMainState = {
   city: CITY_OPTIONS[0],
   building: BUILDINGS_OPTIONS[CITY_OPTIONS[0].value][0]
};

const initialAdminState: IAdminState = {
   ...initialMainState
};

export {initialMainState, initialAdminState};
