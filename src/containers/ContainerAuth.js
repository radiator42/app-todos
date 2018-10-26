import { connect } from 'react-redux';
import setUser from '../actions/actionUser/setUser';
import Auth from '../components/auth/Auth';

const mapStateToProps = state => ({
  authUser: state.authUser,
});

const mapStateToDispatch = dispatch => ({
  setUser: () => dispatch(setUser()),
});

export default connect(mapStateToProps, mapStateToDispatch)(Auth);
