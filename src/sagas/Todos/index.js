import { fork } from 'redux-saga/effects';

import getTodoList from './getTodoList';
import setNewTodo from './setNewTodo';
import setToogleTodo from './setToogleTodo';


export default function* () {
  yield fork(getTodoList);
  yield fork(setNewTodo);
  yield fork(setToogleTodo);
}
