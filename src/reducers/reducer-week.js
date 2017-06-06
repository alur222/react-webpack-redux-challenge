import { FETCH_WEEK_BY_WEEK_NUMBER } from '../actions/index';

export default function(state = [], action) {
  switch(action.type) {
    case FETCH_WEEK_BY_WEEK_NUMBER:
      console.log(state);
      return state;
  }
  return state;
}
