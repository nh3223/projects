import React from 'react';
import { useParams } from 'react-router-dom';

import ExecutiveHeader from '../Navigation/ExecutiveHeader';

const ExecutiveSummary = () => {
  
  const { id } = useParams();

  return (
    <>
      <ExecutiveHeader executiveId={ id }/>
      <h1>Executive Summary</h1>
    </>
  );
};

export default ExecutiveSummary;