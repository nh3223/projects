const problemsReducerDefaultState = [];

const problemsReducer = (state = problemsReducerDefaultState, action) => {
  switch (action.type) {
    case 'CREATE_SCORE':
      return [...state, action.score]
    default:
      return state;
  }
};

export default problemsReducer;