import React, { useState, useEffect } from 'react';
import { useRecoilState } from "recoil";

import Loading from './Loading';
import { companyState } from '../../recoil/company';
import { fetchCompany } from '../../api/company';

const LoadCompany = ({ companyId }) => {
  
  const [ company, setCompany ] = useRecoilState(companyState);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    
    const setCompanyInformation = async () => {
      const companyData = await fetchCompany(companyId);
      setCompany(companyData);
      setLoading(false);
    };

    if (companyId && !company._id) setCompanyInformation();

  }, [companyId, loading, company._id, setCompany]);
  
  return loading && <Loading componentMessage="Company Information" />

};

export default LoadCompany;