import React from 'react';


import Score from '../Score/Score';
import { StyledHeader, Title, HeaderButton } from './styles';

const Header = ({ user, score, login, logout }) => (
  <StyledHeader>
    <Title>A Dozen Roses</Title>
    
    { (user.isAuthenticated) 
      ? <>
          <Score score={ score } />
          <HeaderButton onClick={ logout }>Logout</HeaderButton>
        </>
      : <HeaderButton className="button" onClick={ login }>Login with Google</HeaderButton>
    }
  </StyledHeader>
);

export default Header;