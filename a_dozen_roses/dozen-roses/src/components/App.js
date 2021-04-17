import React from 'react';

import Header from './Header';
import Welcome from './Welcome';
import PlayRound from './PlayRound';

const App = () => {
  return (
    <React.Fragment>
      <Header />
      <Welcome />
      <PlayRound />
    </React.Fragment>
  );
}

export default App;
