import database from '../config/firebase';
import {
  SHOW_ALL,
  SHOW_COMPLETED,
  SHOW_ACTIVE,
  ADD_TODO,
  SET_VISIBILITY_FILTER,
  TOGGLE_TODO,
  REQUEST,
  POPUP,
} from './CONSTANTS';

export const VisibilityFilters = {
  SHOW_ALL,
  SHOW_COMPLETED,
  SHOW_ACTIVE,
};
export const FILTERS = [
  { lable: 'All', value: VisibilityFilters.SHOW_ALL },
  { lable: 'Active', value: VisibilityFilters.SHOW_ACTIVE },
  { lable: 'Completed', value: VisibilityFilters.SHOW_COMPLETED },
];

export const popUp = text => ({
  text,
  type: POPUP,
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
    if (!snap.val()) {
      dispatch(popUp('Еще не создано ни одной записи'));
      return;
    }
    dispatch(pushData(Object.values(snap.val())));
  });
};

export const addToDatabase = text => (dispatch) => {
  try {
    const { key } = database.child('todos').push();
    database.child(`todos/${key}`)
      .set({
        id: key,
        text,
        completed: false,
      })
      .then(() => dispatch(addTodo(text, key)))
      .catch((e) => {
        console.log(`Mistake: ${e.code}`);
      });
  } catch (e) {
    console.log(e.message);
  }
};

export const toggleTodos = (id, completed) => dispatch => () => {
  database.child('todos').once('value', (snap) => {
    if (snap.val()[id].completed === true) {
      database.child(`todos/${id}`).remove();
      database.child('todos').once('value', (val) => {
        dispatch(pushData(Object.values(val.val())));
      });
      return;
    }
    database.child(`todos/${id}`).update({ completed: !completed })
      .then(() => dispatch(toggleTodo(id)));
  });
};
