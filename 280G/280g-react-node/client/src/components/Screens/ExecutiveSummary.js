import React from 'react';
import { useParams } from 'react-router-dom';

import ExecutiveHeader from '../Navigation/ExecutiveHeader';

const ExecutiveSummary = () => {
  
  const { companyId, executiveId } = useParams();

  return (
    <>
      <ExecutiveHeader companyId={ companyId } executiveId={ executiveId }/>
      <h1>Executive Summary</h1>
    </>
  );
};

export default ExecutiveSummary;