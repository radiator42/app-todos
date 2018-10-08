import { combineReducers } from 'redux';
import todos from './todos';
import popUp from './popUp';
import visibilityFilter from './visibilityFilter';

export default combineReducers({
  todos,
  visibilityFilter,
  popUp,
});
