import {
  IMAGE_SET,
  IMAGE_REQUEST,
  IMAGE_REQUEST_FAIL,
  IMAGE_REQUEST_PROGRESS,
  IMAGE_DELETE,
  IMAGE_DELETE_ERROR,
} from '../actions/CONSTANTS';


const initialState = {
  error: '',
  imagesList: [],
  progress: null,
};

const images = (state = initialState, action) => {
  switch (action.type) {
    case IMAGE_SET:
      return {
        ...state,
        imagesList: [
          ...state.imagesList, {
            ...action.payload,
          },
        ],
        progress: null,
        error: '',
      };

    case IMAGE_REQUEST:
      return {
        ...state,
        imagesList: action.payload,
      };

    case IMAGE_REQUEST_PROGRESS:
      return {
        ...state,
        error: '',
        progress: action.progress,
      };

    case IMAGE_REQUEST_FAIL:
      return {
        error: action.error,
        imagesList: [],
        progress: null,
      };

    case IMAGE_DELETE: {
      const filterImg = state.imagesList.filter(img => img.id !== action.id);
      return {
        imagesList: [
          ...filterImg,
        ],
        progress: null,
        error: '',
      };
    }

    case IMAGE_DELETE_ERROR:
      return {
        imagesList: [],
        progress: null,
        error: action.error,
      };

    default: return state;
  }
};

export default images;
