import React from 'react';

import StyledErrorMessage from './StyledErrorMessage';

const ErrorMessage = ({ text }) => (
  (text)
  ? <StyledErrorMessage>{ text }</StyledErrorMessage>
  : null
);

export default ErrorMessage;