import database from '../config/firebase';
import {
  SET_NEW_TODO,
  SET_NEW_TODO_FAIL,
} from './CONSTANTS';

const newTodo = (text, id) => ({
  id,
  text,
  type: SET_NEW_TODO,
});

const newTodoFail = error => ({
  error,
  type: SET_NEW_TODO_FAIL,
});

export default text => (dispatch) => {
  try {
    const id = database.child('todos').push().key;
    database.child(`todos/${id}`)
      .set({
        id,
        text,
        completed: false,
      })
      .then(() => dispatch(newTodo(text, id)));
  } catch (e) {
    dispatch(newTodoFail(`${e.message}`));
  }
};
