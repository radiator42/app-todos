export const SHOW_ALL = '@/SHOW_ALL';
export const SHOW_COMPLETED = '@/SHOW_COMPLETED';
export const SHOW_ACTIVE = '@/SHOW_ACTIVE';

export const SET_VISIBILITY_FILTER = '@/SET_VISIBILITY_FILTER';

export const FILTERS = [
  { label: 'All', value: SHOW_ALL },
  { label: 'Active', value: SHOW_ACTIVE },
  { label: 'Completed', value: SHOW_COMPLETED },
];

export const SET_NEW_TODO = '@/SET_NEW_TODO';
export const SET_NEW_TODO_FAIL = '@/SET_NEW_TODO_FAIL';

export const TOGGLE_TODO = '@/TOGGLE_TODO';
export const TOGGLE_TODO_REMOVE_COMPLETED = '@/TOGGLE_TODO_REMOVE_COMPLETED';
export const TOGGLE_TODO_FAIL = '@/TOGGLE_TODO_FAIL';

export const GET_TODO_LIST_REQUEST = '@/GET_TODO_LIST_REQUEST';
export const GET_TODO_LIST_RESPONSE = '@/GET_TODO_LIST_RESPONSE';
export const GET_TODO_LIST_FAIL_RESPONSE = '@/GET_TODO_LIST_FAIL_RESPONSE';
