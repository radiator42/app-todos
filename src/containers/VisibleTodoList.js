import { connect } from 'react-redux';
import { toggleTodoServe, requestData, VisibilityFilters } from '../actions';
import TodoList from '../components/TodoList';

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos;
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(t => t.completed);
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(t => !t.completed);
    default:
      throw new Error(`Unknown filter: ${filter}`);
  }
};

const mapStateToProps = state => ({
  todos: getVisibleTodos(state.todos, state.visibilityFilter),
  popUp: state.popUp,
});

const mapDispatchToProps = dispatch => ({
  toggleTodos: (id, todos) => dispatch(toggleTodoServe(id, todos)),
  request: () => dispatch(requestData()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TodoList);
