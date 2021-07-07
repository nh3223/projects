import React from 'react';
import { useParams } from 'react-router';

import CompanyHeader from '../../Navigation/CompanyHeader';
import LoadProject from '../../Loaders/LoadProject';

const ProjectSummary = () => {

  const { id } = useParams();

  // Load Project Data

  return (
    <>
      <CompanyHeader companyId={ id } />
      <LoadProject companyId={ id } />
      <h1>Company Name</h1>
      <h2>280G Summary</h2>
    </>
  );
};

export default ProjectSummary;