import React from 'react';
import { useParams } from 'react-router';
import { useRecoilValue } from 'recoil';

import { executiveIdsState } from '../../../recoil/executive';
import { useLoadProject } from '../../../hooks/useLoadProject';

import Loading from '../../Loaders/Loading';
import Headers from '../../Elements/Layouts/Headers';
import Header from '../../Navigation/Header';
import CompanyHeader from '../../Navigation/CompanyHeader';
import ProjectSummaryCompanyInformation from './ProjectSummaryCompanyInformation';
import Cards from '../../Elements/Layouts/Cards';
import ProjectSummaryExecutive from './ProjectSummaryExecutive';

const ProjectSummary = () => {

  const { companyId } = useParams();

  const executiveIds = useRecoilValue(executiveIdsState(companyId));

  const { loading, error } = useLoadProject(companyId);
  
  if (loading) return <Loading component="Project Summary" error={ error } />

  return (
    
    <>
      
      <Headers>
        <Header companyId={ companyId } />
        <CompanyHeader companyId={ companyId } />
      </Headers>
      
      <ProjectSummaryCompanyInformation companyId = { companyId } />
      
      <Cards>
        { executiveIds.map((executiveId) => <ProjectSummaryExecutive executiveId={ executiveId } />) }
      </Cards>

    </>
  );
};

export default ProjectSummary;