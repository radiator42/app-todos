import firebase from 'firebase';
import {
  IMAGE_SET,
  IMAGE_REQUEST_PROGRESS,
  IMAGE_REQUEST_FAIL,
} from '../../CONSTANTS';
import { firebase as server } from '../../config';

const setImage = payload => ({
  payload,
  type: IMAGE_SET,
});

const requestImageProgress = progress => ({
  progress,
  type: IMAGE_REQUEST_PROGRESS,
});

const responceImageFail = error => ({
  error,
  type: IMAGE_REQUEST_FAIL,
});

 file => (dispatch) => {
  try {
    const image = file.files[0];
    const { uid } = server.auth.currentUser;
    server.database.child('images').once('value', (data) => {
      if (data.val()) {
        const match = Object.values(data.val()).filter((todo) => {
          if (todo.title === `${image.name}`) {
            return true;
          } return false;
        });
        if (match.length) {
          return;
        }
      }
      const uploadTask = server.dataStorage.child(`images/${image.name}`).put(image);
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,

        (dataState) => {
          const progress = (dataState.bytesTransferred / dataState.totalBytes) * 100;

          switch (dataState.state) {
            case firebase.storage.TaskState.RUNNING:
              dispatch(requestImageProgress(progress));
              break;
            case firebase.storage.TaskState.PAUSED:
              dispatch(requestImageProgress(progress));
              break;
            default:
              dispatch(requestImageProgress(0));
          }
        },
        (error) => {
          throw new Error(error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL()
            .then((url) => {
              const { key } = server.database.child('images').push();
              server.database.child(`images/${key}`).set({
                url, title: image.name, ownerId: uid, id: key,
              })
                .then(() => {
                  dispatch(setImage({
                    url, title: image.name, ownerId: uid, id: key,
                  }));
                });
            });
        });
    });
  } catch (error) {
    dispatch(responceImageFail(error.message));
  }
};
