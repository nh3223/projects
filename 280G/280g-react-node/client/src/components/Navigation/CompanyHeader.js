import React from 'react';

import { useRecoilValue } from 'recoil';
import { executiveIdsState } from '../../recoil/executive';

import HeaderItem from './HeaderItem';
import ExecutiveHeaderItem from './ExecutiveHeaderItem';

const CompanyHeader = ({ companyId }) => {

  const executiveIds = useRecoilValue(executiveIdsState);

  return (
    <>
      <HeaderItem path={ `/company/${companyId}` } text="Project Summary" />
      <HeaderItem path={ `/company/${companyId}/info` } text="Company Information" />
      { executiveIds.map((executiveId) => <ExecutiveHeaderItem key={ executiveId } companyId={ companyId } executiveId={ executiveId } />) }
    </>
  );
};

export default CompanyHeader;