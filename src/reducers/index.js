import { combineReducers } from 'redux';
import todos from './todos';
import preload from './preload';
import visibilityFilter from './visibilityFilter';

export default combineReducers({
  todos,
  visibilityFilter,
  preload,
});
