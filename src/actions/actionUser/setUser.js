import { CREATE_USER, CREATE_USER_FAIL } from '../CONSTANTS';
import { firebase } from '../../config';

const setUser = payload => ({
  payload,
  type: CREATE_USER,
});

const setUserFail = error => ({
  error,
  type: CREATE_USER_FAIL,
});

export default () => (dispatch) => {
  firebase.auth
    .signInWithPopup(firebase.provider)
    .then((result) => {
      dispatch(setUser(result));
    })
    .catch((error) => {
      dispatch(setUserFail(error));
    });
};
