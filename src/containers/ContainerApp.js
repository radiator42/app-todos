import { connect } from 'react-redux';
import getUser from '../actions/actionUser/getUser';
import App from '../components/App';

const mapStateToDispatch = dispatch => ({
  getUser: () => dispatch(getUser()),
});

export default connect(null, mapStateToDispatch)(App);
