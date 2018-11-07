import {
  SET_NEW_TODO,
  SET_NEW_TODO_FAIL,
  GET_TODO_LIST_REQUEST,
  GET_TODO_LIST_RESPONSE,
  GET_TODO_LIST_FAIL_RESPONSE,
  TOGGLE_TODO,
  TOGGLE_TODO_REMOVE_COMPLETED,
  TOGGLE_TODO_FAIL,
} from '../CONSTANTS';

const initialState = {
  todoList: [],
  isLoading: false,
  error: '',
};

const todos = (state = initialState, action) => {
  switch (action.type) {
    case SET_NEW_TODO:
      return {
        ...state,
        todoList: [
          ...state.todoList,
          {
            ...action.payload,
          },
        ],
      };

    case SET_NEW_TODO_FAIL:
      return {
        todoList: [],
        isLoading: false,
        error: action.error,
      };

    case TOGGLE_TODO: {
      const togler = state.todoList.map(todo => ((todo.id === action.id)
        ? { ...todo, completed: !todo.completed }
        : todo));
      return {
        ...state,
        todoList: [
          ...togler,
        ],
      };
    }

    case TOGGLE_TODO_REMOVE_COMPLETED: {
      const toglerDelete = state.todoList.filter(todo => todo.id !== action.id);
      return {
        ...state,
        isLoading: true,
        todoList: [
          ...toglerDelete,
        ],
      };
    }

    case TOGGLE_TODO_FAIL:
      return {
        todoList: [],
        isLoading: false,
        error: action.error,
      };

    case GET_TODO_LIST_REQUEST: {
      return Object.assign({}, state, {
        todoList: [],
        isLoading: true,
        error: '',
      });
    }

    case GET_TODO_LIST_RESPONSE: {
      return Object.assign({}, state, {
        todoList: action.data || [],
        isLoading: false,
        error: '',
      });
    }

    case GET_TODO_LIST_FAIL_RESPONSE: return Object.assign({}, state, {
      todoList: [],
      isLoading: false,
      error: action.error,
    });

    default:
      return state;
  }
};

export default todos;
