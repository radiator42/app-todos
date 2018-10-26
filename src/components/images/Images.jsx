import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

class Images extends React.Component {
  componentDidMount() {
    const { getImages } = this.props;
    getImages();
  }

  render() {
    const { images, error, deleteImages } = this.props;
    const list = images.map(img => (
      <div
        className="card"
        key={img.id}
      >
        <button
          className="button"
          type="button"
          onClick={() => deleteImages(img.id, img.title)}
        >
          {`Удалить ${img.title}`}
        </button>
        <img
          className="image"
          src={img.url}
          alt={img.title}
        />
      </div>
    ));
    return (
      <React.Fragment>
        <div className="grid-list--images">
          {list.length ? list : null}
        </div>
        {error && <p>{error}</p>}
      </React.Fragment>
    );
  }
}

Images.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  getImages: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  deleteImages: PropTypes.func.isRequired,
};

export default Images;
