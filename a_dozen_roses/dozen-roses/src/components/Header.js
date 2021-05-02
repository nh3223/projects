import React from 'react';

import { firebaseLogin, firebaseLogout } from '../actions/user';
import Score from './Score';

const Header = () => {
  
  const loginUser = () => {
    const user = firebaseLogin();
  };
  
  const logoutUser = () => {
    firebaseLogout();
  };

  return (
    <React.Fragment>
      <h1>A Dozen Roses</h1>
      <Score />
      <button className="button" onClick={ loginUser }>Login with Google</button>
      <button onClick={ logoutUser }>Logout</button>
    </React.Fragment>
  )
}

export default Header;