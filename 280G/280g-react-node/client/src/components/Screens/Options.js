import React from 'react';
import { useParams } from 'react-router';

import ExecutiveHeader from '../Navigation/ExecutiveHeader';

const Options = () => {
  
  const { id } = useParams();

  return (
    <>
      <ExecutiveHeader executiveId={ id } />
      <h1>Options</h1>
    </>
  );
};

export default Options;