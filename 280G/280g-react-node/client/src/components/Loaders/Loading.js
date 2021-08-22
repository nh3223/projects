import React from 'react';

import ErrorMessage from '../Elements/TextElements/ErrorMessage/ErrorMessage';
import LoadingMessage from '../Elements/TextElements/LoadingMessage/LoadingMessage';

const Loading = ({ componentMessage, errorMessage }) => (
  (errorMessage)
  ? <ErrorMessage text={ errorMessage } />
  : <LoadingMessage text={ `Loading ${componentMessage}...` } />
);

export default Loading;