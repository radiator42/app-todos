const preload = (state = 'LOADING', action) => {
  switch (action.type) {
    case 'PRELOAD':
      return action.text;
    default:
      return state;
  }
};

export default preload;
