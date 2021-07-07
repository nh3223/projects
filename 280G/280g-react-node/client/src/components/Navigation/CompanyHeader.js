import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useRecoilValue, useRecoilCallback } from 'recoil';
import { executiveState, executiveIdsState } from '../../recoil/executive';

const CompanyHeader = ({ companyId }) => {

  const executiveIds = useRecoilValue(executiveIdsState);
  const [ executives, setExecutives ] = useState([]);

  const getExecutive = useRecoilCallback(({ snapshot }) => (id) => snapshot.getLoadable(executiveState(id)).valueMaybe(), []);
    
  useEffect(() => {
    const execs = executiveIds.map((id) => getExecutive(id));
    setExecutives(execs); 
  }, [executiveIds, getExecutive])

  return (
    <>
      <NavLink to={ `/company/${companyId}` }>Project Summary</NavLink>
      <NavLink to={ `/company/${companyId}/info` }>Company Information</NavLink>
      { executives.map((executive) => <NavLink key={ executive._id } to={ `/executive/${executive._id}` }>{ executive.name }</NavLink>)};
    </>
  );
};

export default CompanyHeader;