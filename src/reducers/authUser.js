import {
  FETCH_USER,
  CREATE_USER,
  WAITING_FETCH_USER,
  CREATE_USER_FAIL,
  CREATE_USER_NULL,
} from '../CONSTANTS';

const initialState = {
  user: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER:
      return { user: action.payload };

    case CREATE_USER:
      return { user: action.payload };

    case WAITING_FETCH_USER:
      return state;

    case CREATE_USER_NULL:
      return { user: null };

    case CREATE_USER_FAIL:
      return {
        user: null,
        error: action.error,
      };
    default:
      return state;
  }
};
