import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxThunk from 'redux-thunk';
import { auth, bookingState, buildings, clients, currentUser, modal } from 'store';

const rootReducer = combineReducers({
  auth,
  clients,
  buildings,
  bookingState,
  currentUser,
  modal
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(reduxThunk)));
