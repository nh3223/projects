import React from 'react';

import ErrorMessage from '../../Elements/TextElements/ErrorMessage/ErrorMessage';
import LoadingMessage from '../../Elements/TextElements/LoadingMessage/LoadingMessage';

const Loading = ({ component, error }) => (
  (error)
    ? <ErrorMessage text={ error } />
    : <LoadingMessage text={ `Loading ${component}...` } />
  );

export default Loading;