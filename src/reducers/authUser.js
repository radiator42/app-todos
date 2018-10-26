import {
  FETCH_USER,
  CREATE_USER,
  WAITING_FETCH_USER,
  CREATE_USER_FAIL,
} from '../actions/CONSTANTS';

const initialState = {
  user: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER:
      return action.payload;
    case CREATE_USER:
      return action.payload;
    case WAITING_FETCH_USER:
      return state;
    case CREATE_USER_FAIL:
      return action.error;
    default:
      return state;
  }
};
