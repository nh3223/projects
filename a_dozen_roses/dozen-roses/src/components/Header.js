import React from 'react';

import { firebaseLogin } from '../actions/user';
import Score from './Score';

const Header = () => {
  
  const loginUser = () => {
    firebaseLogin();
  };
  
  return (
    <React.Fragment>
      <h1>A Dozen Roses</h1>
      <Score />
      <button className="button" onClick={ loginUser }>Login with Google</button>
      <button>Logout</button>
    </React.Fragment>
  )
}

export default Header;