import { firebase } from '../../config';
import {
  IMAGE_REQUEST,
  IMAGE_REQUEST_FAIL,
} from '../../CONSTANTS';


const getImageRequest = payload => ({
  payload,
  type: IMAGE_REQUEST,
});

const getImageRequestFail = error => ({
  error,
  type: IMAGE_REQUEST_FAIL,
});

export default () => (dispatch) => {
  try {
    firebase.database.child('images').once('value', (data) => {
      if (data.exists()) {
        const { uid } = firebase.auth.currentUser;
        const payload = Object.values(data.val()).filter((todo) => {
          if (todo.ownerId === `${uid}`) {
            return true;
          }
          return false;
        });
        dispatch(getImageRequest(payload));
      }
    });
  } catch (error) {
    dispatch(getImageRequestFail(error.message));
  }
};
