import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';


class Auth extends React.Component {
  componentDidUpdate(prevProps) {
    const { authUser, history } = this.props;

    if (authUser !== prevProps.authUser) {
      history.push('/main');
    }
  }

  render() {
    const { setUser } = this.props;
    return (
      <div className="page sign-in-page">
        <div className="details">
          Please use your actual Google account for signing in.
        </div>
        <div className="controls">
          <button
            type="button"
            onClick={setUser}
          >
            Sign In with Google
          </button>
        </div>
      </div>
    );
  }
}

Auth.propTypes = {
  authUser: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({}).isRequired,
  setUser: PropTypes.func.isRequired,
};

export default Auth;
