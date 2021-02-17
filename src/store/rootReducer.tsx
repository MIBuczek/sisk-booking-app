import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { currentUser } from './users/userReducer';
import reduxThunk from 'redux-thunk';

const rootReducer = combineReducers({
  currentUser,
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(reduxThunk)));
