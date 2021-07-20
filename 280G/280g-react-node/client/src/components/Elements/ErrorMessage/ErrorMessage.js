import React from 'react';

import StyledErrorMessage from './StyledErrorMessage';

const ErrorMessage = ({ message }) => (
  <StyledErrorMessage>{ message }</StyledErrorMessage>
);

export default ErrorMessage;