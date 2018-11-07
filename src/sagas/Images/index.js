import { fork } from 'redux-saga/effects';

import deleteImages from './deleteImages';
import getImages from './getImages';
import setImage from './setImage';


export default function* () {
  yield fork(deleteImages);
  yield fork(getImages);
  yield fork(setImage);
}
