import { connect } from 'react-redux';
import setNewTodo from '../actions/setNewTodo';
import AddTodo from '../components/AddTodo';

const mapDispatchToProps = dispatch => ({
  setNewTodo: text => dispatch(setNewTodo(text)),
});

export default connect(
  null,
  mapDispatchToProps,
)(AddTodo);
