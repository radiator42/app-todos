import { connect } from 'react-redux';
import { addToDatabase } from '../actions';
import AddTodo from '../components/AddTodo';

const mapDispatchToProps = dispatch => ({
  add: text => dispatch(addToDatabase(text)),
});

export default connect(
  null,
  mapDispatchToProps,
)(AddTodo);
