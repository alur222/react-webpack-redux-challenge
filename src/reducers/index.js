import { combineReducers } from 'redux';
import UsersReducer from './reducer-users';
import SelectedUser from './reducer-selected-user';

const rootReducer = combineReducers({
  users: UsersReducer,
  selectedUser: SelectedUser,
});

export default rootReducer;
