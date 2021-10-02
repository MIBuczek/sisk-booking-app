import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxThunk from 'redux-thunk';
import { currentUser } from './users/usersReducer';
import { buldings } from './bulding/buldingReducer';
import { bookingState } from './bookings/bookingsReducer';
import { clients } from './clients/clientsReducer';
import { auth } from './auth/authReducer';

const rootReducer = combineReducers({
  auth,
  clients,
  buldings,
  bookingState,
  currentUser,
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(reduxThunk)));
