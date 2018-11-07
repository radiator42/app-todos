import {
  call, take, put,
} from 'redux-saga/effects';
import { firebase } from '../../config';
import {
  IMAGE_DELETE,
  IMAGE_DELETE_ERROR,
  IMAGE_DELETE_SAGA,
} from '../../CONSTANTS';

const deleteImage = id => ({
  id,
  type: IMAGE_DELETE,
});

export const deleteImageSaga = (id, title) => ({
  id,
  title,
  type: IMAGE_DELETE_SAGA,
});
const deleteError = error => ({
  error,
  type: IMAGE_DELETE_ERROR,
});

const deleteAsync = (id, title) => firebase.database.child(`images/${id}`).remove()
  .then(() => firebase.dataStorage.child(`images/${title}`).delete())
  .then(() => deleteImage(id));

export default function* () {
  while (true) {
    try {
      const { id, title } = yield take(IMAGE_DELETE_SAGA);
      const del = yield call(deleteAsync, id, title);
      yield put(del);
    } catch (e) {
      yield put(deleteError(e.message));
    }
  }
}
