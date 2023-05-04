import {createStore, combineReducers, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import reduxThunk from 'redux-thunk';
import {authStore, bookingStore, clientStore, buildingStore, currentUserStore, modal} from 'store';

/**
 * Combine reducers into one root reducer.
 */
const rootReducer = combineReducers({
   authStore,
   clientStore,
   bookingStore,
   currentUserStore,
   buildingStore,
   modal
});

/**
 * Create general app store
 */
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(reduxThunk)));
