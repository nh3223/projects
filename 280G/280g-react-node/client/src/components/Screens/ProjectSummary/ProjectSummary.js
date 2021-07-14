import React from 'react';
import { useParams } from 'react-router';
import { useRecoilValue } from 'recoil';

import CompanyHeader from '../../Navigation/CompanyHeader';
import LoadProject from '../../Loaders/LoadProject';
import { companyNameState } from '../../../recoil/company';

const ProjectSummary = () => {

  const { id } = useParams();

  const companyName = useRecoilValue(companyNameState(id));
  
  // Load Project Data

  return (
    <>
      <CompanyHeader companyId={ id } />
      <LoadProject companyId={ id } />
      <h1>{ companyName }</h1>
      <h2>280G Summary</h2>
    </>
  );
};

export default ProjectSummary;