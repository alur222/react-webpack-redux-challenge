import { combineReducers } from 'redux';
import UsersReducer from './reducer-users';

const rootReducer = combineReducers({
  users: UsersReducer,
});

export default rootReducer;
