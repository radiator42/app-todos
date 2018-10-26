import { firebase } from '../../config';
import {
  SET_NEW_TODO,
  SET_NEW_TODO_FAIL,
} from '../CONSTANTS';

const newTodo = payload => ({
  payload,
  type: SET_NEW_TODO,
});

const newTodoFail = error => ({
  error,
  type: SET_NEW_TODO_FAIL,
});

export default text => (dispatch) => {
  const { uid } = firebase.auth.currentUser;
  try {
    const id = firebase.database.child('todos').push().key;
    firebase.database.child(`todos/${id}`)
      .set({
        id,
        text,
        completed: false,
        ownerId: uid,
      })
      .then(() => dispatch(newTodo({
        text,
        id,
        ownerId: uid,
        completed: false,
      })));
  } catch (e) {
    dispatch(newTodoFail(`${e.message}`));
  }
};
