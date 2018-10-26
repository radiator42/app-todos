import { connect } from 'react-redux';
import setNewTodo from '../actions/actionTodos/setNewTodo';
import AddTodo from '../components/AddTodo';
import { authFunctions } from '../config';

const mapDispatchToProps = dispatch => ({
  setNewTodo: text => dispatch(setNewTodo(text)),
  logOut: history => authFunctions.logOut(history),
});

export default connect(
  null,
  mapDispatchToProps,
)(AddTodo);
