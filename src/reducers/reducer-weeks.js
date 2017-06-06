import { FETCH_WEEKS, FETCH_WEEK_BY_WEEK_NUMBER } from '../actions/index';

export default function(state = [], action) {
  switch(action.type) {
    case FETCH_WEEKS:
      return action.payload.data.data;
  }
  return state;
}
