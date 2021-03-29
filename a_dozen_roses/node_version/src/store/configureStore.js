import { createStore } from 'redux';

import problemsReducer from '../reducers/problems';

export default () => {
  const store = createStore(
    problemsReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  return store;
};