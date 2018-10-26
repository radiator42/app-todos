import { connect } from 'react-redux';
import setToggleTodo from '../actions/actionTodos/setToogleTodo';
import getTodoList from '../actions/actionTodos/getTodoList';
import setImage from '../actions/actionImages/setImage';
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../actions/CONSTANTS';
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
  setToggleTodo: id => dispatch(setToggleTodo(id)),
  getTodoList: () => dispatch(getTodoList()),
  setImage: image => dispatch(setImage(image)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TodoList);
