import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxThunk from 'redux-thunk';
import {
  authStore,
  bookingStore,
  clientStore,
  buildingStore,
  currentUserStore,
  modal
} from 'store';

const rootReducer = combineReducers({
  authStore,
  clientStore,
  bookingStore,
  currentUserStore,
  buildingStore,
  modal
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(reduxThunk)));
