import { put, call, take } from 'redux-saga/effects';
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

const getListRequest = () => new Promise((resolve) => {
  firebase.database.child('todos').once('value', (data) => {
    const { uid } = firebase.auth.currentUser;
    if (data.exists()) {
      const filter = Object.values(data.val()).filter((todo) => {
        if (todo.ownerId === `${uid}`) {
          return true;
        } return false;
      });
      resolve(filter);
    }
  });
});


export default function* () {
  try {
    while (yield take(GET_TODO_LIST_RESPONSE)) {
      yield put(getTodoListRequest());
      const filterTodo = yield call(getListRequest);
      yield put(getTodoListResponse(filterTodo));
    }
  } catch (e) {
    yield put(getTodoListFailResponse(e.message));
  }
}
