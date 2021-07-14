import React from 'react';

import { WelcomePage, WelcomeMessage, WelcomeButton } from './styles';

const Welcome = ({ user, onClick }) => (
  <WelcomePage>
    <WelcomeMessage>Welcome to A Dozen Roses!</WelcomeMessage>
    <WelcomeButton disabled={!user.isAuthenticated} onClick={ onClick }>Play Now</WelcomeButton>      
  </WelcomePage>
);

export default Welcome;