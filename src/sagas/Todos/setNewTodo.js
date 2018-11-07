import { put, call, take } from 'redux-saga/effects';
import { firebase } from '../../config';
import {
  SET_NEW_TODO,
  SET_NEW_TODO_FAIL,
  SET_NEW_TODO_SAGA,
} from '../../CONSTANTS';

const newTodo = payload => ({
  payload,
  type: SET_NEW_TODO,
});

export const newTodoSaga = payload => ({
  payload,
  type: SET_NEW_TODO_SAGA,
});

const newTodoFail = error => ({
  error,
  type: SET_NEW_TODO_FAIL,
});

const setNewTodo = text => new Promise((resolve) => {
  const { uid } = firebase.auth.currentUser;
  const id = firebase.database.child('todos').push().key;
  firebase.database.child(`todos/${id}`)
    .set({
      text,
      id,
      ownerId: uid,
      completed: false,
    })
    .then(() => resolve({
      text,
      id,
      ownerId: uid,
      completed: false,
    }));
});

export default function* () {
  while (true) {
    try {
      const { payload } = yield take(SET_NEW_TODO_SAGA);
      const todo = yield call(setNewTodo, payload);
      yield put(newTodo(todo));
    } catch (e) {
      yield put(newTodoFail(e.message));
    }
  }
}
