import { combineReducers } from 'redux';
import UsersReducer from './reducer-users';
import SelectedUser from './reducer-selected-user';
import WeeksReducer from './reducer-weeks';
import WeekReducer from './reducer-week';

const rootReducer = combineReducers({
  users: UsersReducer,
  selectedUser: SelectedUser,
  userWeeks: WeeksReducer,
  userWeek: WeekReducer,
});

export default rootReducer;
