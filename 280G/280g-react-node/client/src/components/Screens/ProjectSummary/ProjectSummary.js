import React from 'react';
import { useParams } from 'react-router';
import { useRecoilValue } from 'recoil';

import { companyState } from '../../../recoil/company';

import CompanyHeader from '../../Navigation/CompanyHeader';
import LoadProject from '../../Loaders/LoadProject';
import ProjectSummaryCompanyInformation from './ProjectSummaryCompanyInformation';
import ProjectSummaryTable from './ProjectSummaryTable';

const ProjectSummary = () => {

  const { companyId } = useParams();

  const company = useRecoilValue(companyState)
  
  return (
    <>
      <CompanyHeader companyId={ companyId } />
      <LoadProject companyId={ companyId } />
      <ProjectSummaryCompanyInformation company = { company } />
      <ProjectSummaryTable />
    </>
  );
};

export default ProjectSummary;