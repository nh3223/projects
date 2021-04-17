import React from 'react';
import { Link } from 'react-router-dom';

import Header from './Header';

const Welcome = () => {

  return (
    <React.Fragment>
      <Header />
      <h1>Welcome to a Dozen Roses!</h1>
      <Link to="/play">
        <button>Play Now!</button>      
      </Link>
    </React.Fragment>
  );
};

export default Welcome;