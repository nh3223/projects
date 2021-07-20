import React from 'react';
import { useParams } from 'react-router';
import { useRecoilValue } from 'recoil';

import CompanyHeader from '../../Navigation/CompanyHeader';
import LoadProject from '../../Loaders/LoadProject';
import { companyState } from '../../../recoil/company';

const ProjectSummary = () => {

  const { companyId } = useParams();

  const company = useRecoilValue(companyState(companyId));
  
  // Load Project Data

  return (
    <>
      <CompanyHeader companyId={ companyId } />
      <LoadProject companyId={ companyId } />
      <h1>{ company.comapnyName }</h1>
      <h2>280G Summary</h2>
    </>
  );
};

export default ProjectSummary;