const initialState = {
  loggedInUser: null,
};

function reducer(state=initialState, action) {
  console.log('%c reducer', 'color:teal', state, action);

  switch (action.type) {
    case 'LOGIN':
      return { ...state, loggedInUser: action.payload };
    case 'LOGOUT':
      return { ...state, loggedInUser: null };
    default:
      return state;
  }
}

export default reducer;
