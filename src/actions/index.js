import database from '../config/firebase';
import {
  SHOW_ALL,
  SHOW_COMPLETED,
  SHOW_ACTIVE,
  ADD_TODO,
  SET_VISIBILITY_FILTER,
  TOGGLE_TODO,
  REQUEST,
  PRELOAD,
  MESSAGE_LIST,
} from './CONSTANTS';

export const VisibilityFilters = {
  SHOW_ALL,
  SHOW_COMPLETED,
  SHOW_ACTIVE,
};
export const FILTERS = [
  { label: 'All', value: VisibilityFilters.SHOW_ALL },
  { label: 'Active', value: VisibilityFilters.SHOW_ACTIVE },
  { label: 'Completed', value: VisibilityFilters.SHOW_COMPLETED },
];

export const PreLoad = text => ({
  text,
  type: PRELOAD,
});

export const addTodo = (text, id) => ({
  id,
  text,
  type: ADD_TODO,
});

export const setVisibilityFilter = filter => ({
  filter,
  type: SET_VISIBILITY_FILTER,
});

export const toggleTodo = id => ({
  id,
  type: TOGGLE_TODO,
});

export const pushData = data => ({
  data,
  type: REQUEST,
});

export const requestData = () => (dispatch) => {
  database.child('todos').once('value', (snap) => {
    if (snap.exists()) {
      dispatch(pushData(Object.values(snap.val())));
      return;
    }
    dispatch(PreLoad(MESSAGE_LIST.NO_DATA));
  });
};

export const addToDatabase = text => (dispatch) => {
  const { key } = database.child('todos').push();
  try {
    database.child(`todos/${key}`)
      .set({
        id: key,
        text,
        completed: false,
      })
      .then(() => dispatch(addTodo(text, key)))
      .catch((e) => {
        database.child(`todos/falled/${key}`).set({ error: e.code });
      });
  } catch (e) {
    database.child(`todos/OtherError/${key}`).set({ error: e.code });
  }
};

export const toggleTodos = (id, completed) => dispatch => () => {
  database.child('todos').once('value', (snap) => {
    if (snap.val()[id].completed === true) {
      database.child(`todos/${id}`).remove();
      database.child('todos').once('value', (val) => {
        if (val.val()) {
          dispatch(pushData(Object.values(val.val())));
          return;
        }
        dispatch(pushData([]));
        dispatch(PreLoad(MESSAGE_LIST.TASK_COMPLETED));
      });
      return;
    }
    database.child(`todos/${id}`).update({ completed: !completed })
      .then(() => dispatch(toggleTodo(id)));
  });
};
