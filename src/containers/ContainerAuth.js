import { connect } from 'react-redux';
import { SET_NEW_USER } from '../CONSTANTS';
import Auth from '../components/auth/Auth';

const mapStateToProps = state => ({
  authUser: state.authUser,
});
const mapStateToDispatch = dispatch => ({
  setUser: () => dispatch({ type: SET_NEW_USER }),
});

export default connect(mapStateToProps, mapStateToDispatch)(Auth);
