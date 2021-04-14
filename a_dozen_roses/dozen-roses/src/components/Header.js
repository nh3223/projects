import React from 'react';

import Score from './Score';

const Header = () => {
  return (
    <React.Fragment>
      <h1>A Dozen Roses</h1>
      <Score />
      <button>Logout</button>
    </React.Fragment>
  )
}

export default Header;