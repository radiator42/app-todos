import { FETCH_USER, WAITING_FETCH_USER } from '../CONSTANTS';
import { firebase } from '../../config';

export default () => (dispatch) => {
  firebase.auth.onAuthStateChanged((user) => {
    if (user) {
      dispatch({
        type: FETCH_USER,
        payload: user,
      });
    } else {
      dispatch({
        type: WAITING_FETCH_USER,
        payload: {
          user: null,
        },
      });
    }
  });
};
