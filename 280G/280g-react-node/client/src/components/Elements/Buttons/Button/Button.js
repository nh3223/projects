import React from 'react';
import ButtonContainer from './ButtonContainer';

import StyledButton from './StyledButton';

const Button = ({ name, id, text, size, handleClick }) => (
  <ButtonContainer size={ size } >
    <StyledButton aria-label={ name } id={ id } onClick={ handleClick }>
      { text }
    </StyledButton>
  </ButtonContainer>
);

export default Button;