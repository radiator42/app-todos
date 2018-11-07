import { connect } from 'react-redux';
import { toggleTodoSaga } from '../sagas/Todos/setToogleTodo';
import { setImageSaga } from '../sagas/Images/setImage';
import {
  SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE, GET_TODO_LIST_RESPONSE,
} from '../CONSTANTS';
import TodoList from '../components/TodoList';

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case SHOW_ALL:
      return todos;
    case SHOW_COMPLETED:
      return todos.filter(t => t.completed);
    case SHOW_ACTIVE:
      return todos.filter(t => !t.completed);
    default:
      throw new Error(`Unknown filter: ${filter}`);
  }
};

const mapStateToProps = state => ({
  todos: getVisibleTodos(state.todos.todoList, state.visibilityFilter),
  isLoading: state.todos.isLoading,
  error: state.todos.error,
  progress: state.images.progress,
});
const mapDispatchToProps = dispatch => ({
  setToggleTodo: id => dispatch(toggleTodoSaga(id)),
  getTodoList: () => dispatch({ type: GET_TODO_LIST_RESPONSE }),
  setImage: image => dispatch(setImageSaga(image)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TodoList);
