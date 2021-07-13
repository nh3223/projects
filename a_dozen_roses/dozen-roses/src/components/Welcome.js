import React from 'react';

const Welcome = ({ user, onClick }) => (
  <>
    <h1>Welcome to a Dozen Roses!</h1>
    <button disabled={!user.isAuthenticated} onClick={ onClick }>Play Now!</button>      
  </>
);

export default Welcome;