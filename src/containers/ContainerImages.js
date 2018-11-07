import { connect } from 'react-redux';
import Images from '../components/images/Images';
import { IMAGE_REQUEST } from '../CONSTANTS';
import { deleteImageSaga } from '../sagas/Images/deleteImages';

const mapStateToProps = state => ({
  images: state.images.imagesList,
  error: state.images.error,
});

const mapDispatchToProps = dispatch => ({
  getImages: () => dispatch({ type: IMAGE_REQUEST }),
  deleteImages: (id, title) => dispatch(deleteImageSaga(id, title)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Images);
