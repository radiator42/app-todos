import { connect } from 'react-redux';
import { GET_REQUEST_USER } from '../CONSTANTS';
import App from '../components/App';

const mapStateToDispatch = dispatch => ({
  getUser: () => dispatch({ type: GET_REQUEST_USER }),
});

export default connect(null, mapStateToDispatch)(App);
