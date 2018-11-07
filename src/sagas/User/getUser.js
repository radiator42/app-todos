import { put, call, take } from 'redux-saga/effects';
import {
  FETCH_USER, WAITING_FETCH_USER, CREATE_USER_FAIL, GET_REQUEST_USER,
} from '../../CONSTANTS';
import { firebase } from '../../config';

const fetchUserAction = user => ({
  type: FETCH_USER,
  payload: user,
});

const waitingFetchUserAction = () => ({
  type: WAITING_FETCH_USER,
});

const fetchUserActionFail = error => ({
  error,
  type: CREATE_USER_FAIL,
});

const onAuthStateChanged = () => new Promise((resolve, reject) => {
  firebase.auth.onAuthStateChanged((user) => {
    if (user) {
      return resolve(user);
    }
    return reject(new Error());
  });
});

export default function* () {
  yield take(GET_REQUEST_USER);
  yield put(waitingFetchUserAction());
  try {
    const user = yield call(onAuthStateChanged);
    yield put(fetchUserAction(user));
  } catch (e) {
    yield put(fetchUserActionFail(e.message));
  }
}
