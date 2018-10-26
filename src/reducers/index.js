import { combineReducers } from 'redux';
import todos from './todos';
import visibilityFilter from './visibilityFilter';
import images from './images';
import authUser from './authUser';

export default combineReducers({
  todos,
  visibilityFilter,
  images,
  authUser,
});
