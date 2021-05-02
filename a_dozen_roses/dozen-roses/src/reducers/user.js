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
  const user = types[action.type] || state;
  return user;
};

export default userReducer;