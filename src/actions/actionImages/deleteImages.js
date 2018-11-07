import { firebase } from '../../config';
import {
  IMAGE_DELETE,
  IMAGE_DELETE_ERROR,
} from '../../CONSTANTS';

const deleteImage = id => ({
  id,
  type: IMAGE_DELETE,
});

const deleteError = error => ({
  error,
  type: IMAGE_DELETE_ERROR,
});

export default (id, title) => (dispatch) => {
  try {
    firebase.database.child(`images/${id}`).remove()
      .then(() => firebase.dataStorage.child(`images/${title}`).delete())
      .then(() => dispatch(deleteImage(id)));
  } catch (e) {
    dispatch(deleteError(e.message));
  }
};
