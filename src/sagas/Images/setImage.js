import firebase from 'firebase';
import {
  call, take, put,
} from 'redux-saga/effects';
import {
  IMAGE_SET,
  IMAGE_REQUEST_PROGRESS,
  IMAGE_REQUEST_FAIL,
  IMAGE_SET_SAGA,
} from '../../CONSTANTS';
import { firebase as server } from '../../config';

const setImage = payload => ({
  payload,
  type: IMAGE_SET,
});

export const setImageSaga = file => ({
  file,
  type: IMAGE_SET_SAGA,
});

const requestImageProgress = progress => ({
  progress,
  type: IMAGE_REQUEST_PROGRESS,
});

const responceImageFail = error => ({
  error,
  type: IMAGE_REQUEST_FAIL,
});

const upload = (file, dispatch) => new Promise((resolve) => {
  const { uid } = server.auth.currentUser;
  const image = file.files[0];

  const uploadTask = server.dataStorage.child(`images/${image.name}`).put(image);
  uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,

    (dataState) => {
      const progress = (dataState.bytesTransferred / dataState.totalBytes) * 100;

      switch (dataState.state) {
        case firebase.storage.TaskState.RUNNING:
          dispatch(requestImageProgress(progress));
          break;
        case firebase.storage.TaskState.PAUSED:
          dispatch(requestImageProgress(progress));
          break;
        default:

          dispatch(requestImageProgress(0));
      }
    },
    (error) => {
      throw new Error(error);
    },
    () => {
      uploadTask.snapshot.ref.getDownloadURL()
        .then((url) => {
          const { key } = server.database.child('images').push();
          server.database.child(`images/${key}`).set({
            url, title: image.name, ownerId: uid, id: key,
          })
            .then(() => {
              resolve(setImage({
                url, title: image.name, ownerId: uid, id: key,
              }));
            });
        });
    });
});

const checkRepeatName = file => new Promise((resolve) => {
  const image = file.files[0];

  server.database.child('images').once('value', (data) => {
    if (!data.val()) {
      resolve({ match: true });
    }

    if (data.val()) {
      const match = Object.values(data.val()).filter((todo) => {
        if (todo.title === `${image.name}`) {
          return true;
        } return false;
      });
      if (match.length) {
        resolve({ match: false });
      } else resolve({ match: true });
    }
  });
});

export default function* () {
  while (true) {
    const { file } = yield take(IMAGE_SET_SAGA);

    try {
      const { match } = yield call(checkRepeatName, file);
      if (match) {
        const result = yield call(upload, file, put);
        yield put(result);
      }
    } catch (e) {
      yield put(responceImageFail(e.message));
    }
  }
}
