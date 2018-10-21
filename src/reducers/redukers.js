const GET_TODO_LIST_REQUEST = '@/GET_TODO_LIST_REQUEST';
const GET_TODO_LIST_RESPONSE = '@/GET_TODO_LIST_RESPONSE';
const GET_TODO_LIST_FAIL_RESPONSE = '@/GET_TODO_LIST_FAIL_RESPONSE';

const initialState = {
  todoList: [],
  isLoading: false,
  error: '',
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TODO_LIST_REQUEST: return Object.assign({}, state, {
      todoList: [],
      isLoading: true,
      error: '',
    });

    case GET_TODO_LIST_RESPONSE: return Object.assign({}, state, {
      todoList: [action.data],
      isLoading: false,
      error: '',
    });

    case GET_TODO_LIST_FAIL_RESPONSE: return Object.assign({}, state, {
      todoList: [],
      isLoading: false,
      error: action.error,
    });

    default: return state;
  }
};

const getTodoListRequest = () => ({
  type: GET_TODO_LIST_REQUEST,
});

const getTodoListResponse = data => ({
  data,
  type: GET_TODO_LIST_RESPONSE,
});

const getTodoListFailResponse = error => ({
  error,
  type: GET_TODO_LIST_FAIL_RESPONSE,
});

const getTodoList = () => async (dispatch) => {
  dispatch(getTodoListRequest());

  try {
    database
      .child('todos')
      .once('value', (data) => {
        dispatch(getTodoListResponse(data));
      });
  } catch (e) {
    dispatch(getTodoListFailResponse(e.message));
  }
};
