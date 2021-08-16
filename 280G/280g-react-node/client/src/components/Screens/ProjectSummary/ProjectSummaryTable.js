import React from 'react';
import { useRecoilValue } from "recoil"
import { executiveIdsState } from "../../../recoil/executive"

import ProjectSummaryRowHeadings from './ProjectSummaryRowHeadings';
import ProjectSummaryColumn from "./ProjectSummaryCompanyInformation";

const ProjectSummaryTable = ({ companyId }) => {

  const executiveIds = useRecoilValue(executiveIdsState);

  return (
    <>
      <ProjectSummaryRowHeadings />
      { executiveIds.map((executiveId) => <ProjectSummaryColumn executiveId={ executiveId } /> ) }
    </>
  );

};

export default ProjectSummaryTable;