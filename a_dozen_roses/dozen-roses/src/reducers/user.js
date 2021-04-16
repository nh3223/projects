const userReducer = (state = { }, action) => {
  const types = {
    'LOGIN': {
      uid: action.uid,
      isAuthenticated: true
    },
    'LOGOUT': {
      isAuthenticated: false
    }
  };
  return types[action.type] || state;
};

export default userReducer;