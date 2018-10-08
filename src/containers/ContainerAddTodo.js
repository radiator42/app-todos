import { connect } from 'react-redux';
import { addToServe } from '../actions';
import AddTodo from '../components/AddTodo';

const mapDispatchToProps = dispatch => ({
  addInputToTodo: input => dispatch(addToServe(input)),
});

export default connect(
  null,
  mapDispatchToProps,
)(AddTodo);
