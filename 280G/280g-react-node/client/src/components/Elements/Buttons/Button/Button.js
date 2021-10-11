import React from 'react';

import StyledButton from './StyledButton';

const Button = ({ name, id, text, handleClick }) => (
  <StyledButton aria-label={ name } id={ id } onClick={ handleClick }>
    { text }
  </StyledButton>
);

export default Button;