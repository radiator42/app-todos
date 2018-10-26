import { connect } from 'react-redux';
import Images from '../components/images/Images';
import getImages from '../actions/actionImages/getImages';
import deleteImages from '../actions/actionImages/deleteImages';

const mapStateToProps = state => ({
  images: state.images.imagesList,
  error: state.images.error,
});

const mapDispatchToProps = dispatch => ({
  getImages: () => dispatch(getImages()),
  deleteImages: (id, title) => dispatch(deleteImages(id, title)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Images);
