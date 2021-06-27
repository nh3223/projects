import React from 'react';
import { useParams } from 'react-router';

import CompanyHeader from '../../Navigation/CompanyHeader';

const ProjectSummary = () => {

  const { id } = useParams();

  // Load Project Data

  return (
    <>
      <CompanyHeader companyId={ id } />
      <h1>Company Name</h1>
      <h2>280G Summary</h2>
    </>
  );
};

export default ProjectSummary;