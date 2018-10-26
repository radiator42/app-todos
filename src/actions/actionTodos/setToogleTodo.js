import { database } from '../../config/firebase';
import {
  TOGGLE_TODO,
  TOGGLE_TODO_REMOVE_COMPLETED,
  TOGGLE_TODO_FAIL,
} from '../CONSTANTS';


const toggleTodo = id => ({
  id,
  type: TOGGLE_TODO,
});

const toggleTodoRemoveCompleted = id => ({
  id,
  type: TOGGLE_TODO_REMOVE_COMPLETED,
});

const toggleTodoFail = error => ({
  error,
  type: TOGGLE_TODO_FAIL,
});

export default id => dispatch => () => {
  try {
    database.child(`todos/${id}`).once('value', (data) => {
      if (data.val().completed) {
        database.child(`todos/${id}`).remove();
        dispatch(toggleTodoRemoveCompleted(id));
        return;
      }
      database.child(`todos/${id}`).update({ completed: true })
        .then(() => dispatch(toggleTodo(id)));
    });
  } catch (e) {
    dispatch(toggleTodoFail(e.message));
  }
};
