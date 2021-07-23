import React from 'react';

import StyledErrorMessage from './StyledErrorMessage';

const ErrorMessage = ({ text }) => (
  <StyledErrorMessage>{ text }</StyledErrorMessage>
);

export default ErrorMessage;