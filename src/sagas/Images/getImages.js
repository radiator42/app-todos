import { take, put, call } from 'redux-saga/effects';
import { firebase } from '../../config';
import {
  IMAGE_REQUEST,
  IMAGE_REQUEST_FAIL,
} from '../../CONSTANTS';

const getImageRequest = payload => ({
  payload,
  type: IMAGE_REQUEST,
});

const getImageRequestFail = error => ({
  error,
  type: IMAGE_REQUEST_FAIL,
});


const getImageStorageFirebase = () => new Promise((resolve) => {
  firebase.database.child('images').once('value', (data) => {
    if (data.exists()) {
      const { uid } = firebase.auth.currentUser;
      const payload = Object.values(data.val()).filter((todo) => {
        if (todo.ownerId === `${uid}`) {
          return true;
        } return false;
      });
      resolve(payload);
    }
  });
});

export default function* () {
  while (true) {
    yield take(IMAGE_REQUEST);
    try {
      const payload = yield call(getImageStorageFirebase);
      yield put(getImageRequest(payload));
    } catch (error) {
      yield put(getImageRequestFail(error.message));
    }
  }
}
