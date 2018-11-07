import { firebase } from '../../config';
import {
  GET_TODO_LIST_REQUEST,
  GET_TODO_LIST_RESPONSE,
  GET_TODO_LIST_FAIL_RESPONSE,
} from '../../CONSTANTS';

const getTodoListRequest = () => ({
  type: GET_TODO_LIST_REQUEST,
});

const getTodoListResponse = data => ({
  data,
  type: GET_TODO_LIST_RESPONSE,
});

const getTodoListFailResponse = error => ({
  error,
  type: GET_TODO_LIST_FAIL_RESPONSE,
});


export default () => (dispatch) => {
  dispatch(getTodoListRequest());
  try {
    firebase.database.child('todos').once('value', (data) => {
      if (data.exists()) {
        const { uid } = firebase.auth.currentUser;
        const filter = Object.values(data.val()).filter((todo) => {
          if (todo.ownerId === `${uid}`) {
            return true;
          } return false;
        });
        dispatch(getTodoListResponse(filter));
      }
    });
  } catch (e) {
    dispatch(getTodoListFailResponse(e.message));
  }
};
