import React from 'react';


import Score from './Score';

const Header = ({ user, score, login, logout }) => (
  <>
    <h1>A Dozen Roses</h1>
    
    { (user.isAuthenticated) 
      ? <>
          <Score score={ score } />
          <button onClick={ logout }>Logout</button>
        </>
      : <button className="button" onClick={ login }>Login with Google</button>
    }
  </>
);

export default Header;