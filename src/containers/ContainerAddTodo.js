import { connect } from 'react-redux';
import { newTodoSaga } from '../sagas/Todos/setNewTodo';
import AddTodo from '../components/AddTodo';
import logOut from '../sagas/User/logOut';

const mapDispatchToProps = dispatch => ({
  setNewTodo: text => dispatch(newTodoSaga(text)),
  logOut: history => logOut(history, dispatch),
});

export default connect(
  null,
  mapDispatchToProps,
)(AddTodo);
