import React from 'react';
import { NavLink } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { executiveIdsState } from '../../recoil/executive';

const CompanyHeader = ({ companyId }) => {

  const executiveIds = useRecoilValue(executiveIdsState);

  return (
    <>
      <NavLink to={ `/company/${companyId}` }>Project Summary</NavLink>
      <NavLink to={ `/company/${companyId}/info` }>Company Information</NavLink>
      { executiveIds.map((executiveId) => <NavLink to={ `/executive/${executiveId}` }>{ executiveId }</NavLink>)};
    </>
  );
};

export default CompanyHeader;