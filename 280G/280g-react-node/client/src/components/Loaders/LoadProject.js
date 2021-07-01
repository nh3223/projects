import React from 'react';

import LoadCompany from './LoadCompany';
import LoadExecutives from './LoadExecutives';

const LoadProject = ({ companyId }) => (
  <>
    <LoadCompany companyId={ companyId } />
    <LoadExecutives companyId={ companyId } />
  </>
);

export default LoadProject;