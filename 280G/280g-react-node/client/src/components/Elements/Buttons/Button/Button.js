import React from 'react';

import StyledButton from './StyledButton';

const Button = ({ name, text, handleClick }) => (
  <StyledButton aria-label={ `${text} ${name}` } onClick={ handleClick }>
    { text }
  </StyledButton>
);

export default Button;