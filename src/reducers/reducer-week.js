import { FETCH_WEEK_BY_WEEK_NUMBER, UPDATE_WEEK_STATUS } from '../actions/index';

export default function(state = [], action) {
  switch(action.type) {
    case FETCH_WEEK_BY_WEEK_NUMBER:
      return action.payload;
    case UPDATE_WEEK_STATUS:
      const result = action.payload.data;
      result.serverUpdated = true;
      return result;
  }
  return state;
}
