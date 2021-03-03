import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxThunk from 'redux-thunk';
import { currentUser } from './users/userReducer';

const rootReducer = combineReducers({
  currentUser,
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(reduxThunk)));
