import { put, call, take } from 'redux-saga/effects';
import { database } from '../../config/firebase';
import {
  TOGGLE_TODO,
  TOGGLE_TODO_REMOVE_COMPLETED,
  TOGGLE_TODO_FAIL,
  TOGGLE_TODO_SAGA,
} from '../../CONSTANTS';


export const toggleTodo = id => ({
  id,
  type: TOGGLE_TODO,
});

export const toggleTodoSaga = id => ({
  id,
  type: TOGGLE_TODO_SAGA,
});

const toggleTodoRemoveCompleted = id => ({
  id,
  type: TOGGLE_TODO_REMOVE_COMPLETED,
});

const toggleTodoFail = error => ({
  error,
  type: TOGGLE_TODO_FAIL,
});

const setToogleTodo = id => new Promise((resolve) => {
  database.child(`todos/${id}`).once('value', (data) => {
    if (data.val().completed) {
      database.child(`todos/${id}`).remove();
      resolve(toggleTodoRemoveCompleted(id));
    }
    database.child(`todos/${id}`).update({ completed: true })
      .then(() => resolve(toggleTodo(id)));
  });
});


export default function* () {
  while (true) {
    const { id } = yield take(TOGGLE_TODO_SAGA);
    try {
      const todo = yield call(setToogleTodo, id);
      yield put(todo);
    } catch (e) {
      yield put(toggleTodoFail(e.message));
    }
  }
}
