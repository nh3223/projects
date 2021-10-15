import React from 'react';
import { useParams } from 'react-router';
import { useRecoilValue } from 'recoil';

import { executiveIdsState } from '../../../recoil/executive';

import Headers from '../../Navigation/Headers/Headers';
import ProjectSummaryCompanyInformation from './ProjectSummaryCompanyInformation';
import Cards from '../../Elements/Layouts/Cards';
import ProjectSummaryExecutive from './ProjectSummaryExecutive';
import LoadProject from '../Loading/LoadProject';

const ProjectSummary = () => {

  const { companyId } = useParams();

  const executiveIds = useRecoilValue(executiveIdsState(companyId));

  return (
    
    <>
      <LoadProject companyId={ companyId } />      
      <Headers companyId={ companyId } />
      <ProjectSummaryCompanyInformation companyId = { companyId } />
      <Cards>
        { executiveIds.map((executiveId) => <ProjectSummaryExecutive key={ executiveId } companyId={ companyId } executiveId={ executiveId } />) }
      </Cards>

    </>
  );
};

export default ProjectSummary;