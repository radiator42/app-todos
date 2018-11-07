import { fork } from 'redux-saga/effects';

import getUser from './getUser';
import setUser from './setUser';

export default function* () {
  yield fork(getUser);
  yield fork(setUser);
}
