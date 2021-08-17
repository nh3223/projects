import React, { useState, useEffect } from 'react';
import { useRecoilState, useResetRecoilState } from "recoil";

import Loading from './Loading';
import { companyState } from '../../recoil/company';
import { fetchCompany } from '../../api/company/company';

const LoadCompany = ({ companyId }) => {
  
  const [ company, setCompany ] = useRecoilState(companyState);
  const [ loading, setLoading ] = useState(true);
  
  const resetCompany = useResetRecoilState(companyState);
  
  useEffect(() => {
    
    const setCompanyInformation = async () => {
      const companyData = await fetchCompany(companyId);
      setCompany(companyData);
      setLoading(false);
    };

    if (companyId && !company._id) setCompanyInformation();
    if (!companyId) resetCompany();

  }, [companyId, loading, company._id, setCompany, resetCompany]);
  
  return loading && <Loading componentMessage="Company Information" />

};

export default LoadCompany;