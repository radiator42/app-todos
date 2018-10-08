const popUp = (state = 'Loading', action) => {
  switch (action.type) {
    case 'POPUP':
      return action.text;
    default:
      return state;
  }
};

export default popUp;
