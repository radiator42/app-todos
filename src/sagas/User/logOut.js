import { auth } from '../../config/firebase';
import { setUserNull } from './setUser';

export default (history, dispatch) => {
  dispatch(setUserNull());
  history.push('/');
  auth.signOut();
};
