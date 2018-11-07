import { put, take, call } from 'redux-saga/effects';
import {
  CREATE_USER, CREATE_USER_FAIL, SET_NEW_USER, CREATE_USER_NULL,
} from '../../CONSTANTS';
import { firebase } from '../../config';

const setUser = payload => ({
  payload,
  type: CREATE_USER,
});

export const setUserNull = () => ({
  type: CREATE_USER_NULL,
});

const setUserFail = error => ({
  error,
  type: CREATE_USER_FAIL,
});

const signInWithPopupGoogle = () => (firebase.auth.signInWithPopup(firebase.provider));

export default function* () {
  try {
    while (yield take(SET_NEW_USER)) {
      yield put(setUserNull());
      const { user } = yield call(signInWithPopupGoogle);
      yield put(setUser(user));
    }
  } catch (error) {
    yield put(setUserFail(error.message));
  }
}
