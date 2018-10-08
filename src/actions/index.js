import database from '../config/firebase';

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE',
};

export const popUp = text => ({
  type: 'POPUP',
  text,
});

export const addTodo = (text, id) => ({
  type: 'ADD_TODO',
  text,
  id,
});

export const setVisibilityFilter = filter => ({
  type: 'SET_VISIBILITY_FILTER',
  filter,
});

export const toggleTodo = id => ({
  type: 'TOGGLE_TODO',
  id,
});

export const pushData = data => ({
  type: 'REQUEST',
  data,
});

export const requestData = () => (dispatch) => {
  database.child('todos').once('value', (snap) => {
    if (!snap.val()) {
      dispatch(popUp('Данных нету'));
      return;
    }
    dispatch(pushData(snap.val()));
  });
};

export const addToServe = text => (dispatch) => {
  database.child('todos').once('value', (snap) => {
    if (!snap.val()) {
      database.child('todos/0').set({
        id: 0,
        text,
        completed: false,
      });
      dispatch(addTodo(text, 0));
      return;
    }
    const id = snap.val().length;
    database.child(`todos/${id}`).set({
      id,
      text,
      completed: false,
    })
      .then(() => dispatch(addTodo(text, id)));
  });
};

export const toggleTodoServe = (id, todos) => (dispatch) => {
  // dispatch delete completed
  if (todos[id].id === id && todos[id].completed) {
    const todoListFilter = todos.filter(elem => elem.id !== id);
    const maps = todoListFilter.map((map, index) => ({ ...map, id: index }));
    database.child('todos').set(maps)
      .then(() => dispatch(pushData(maps)));
    return;
  }

  // dispatch change completed
  todos.forEach((todo, index) => {
    if (todos[id].id === index && todo.completed === false) {
      database.child(`todos/${id}`)
        .set({ ...todo, completed: !todo.completed })
        .then(() => dispatch(toggleTodo(id)));
    }
    return todo;
  });
};
