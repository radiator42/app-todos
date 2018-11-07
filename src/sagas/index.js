import { fork } from 'redux-saga/effects';

import user from './User';
import todos from './Todos';
import images from './Images';

export default function* () {
  yield fork(user);
  yield fork(todos);
  yield fork(images);
}
