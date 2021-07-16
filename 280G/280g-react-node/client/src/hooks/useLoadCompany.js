import { useEffect } from 'react';
import { useRecoilState } from "recoil";

import { companyState } from '../../recoil/company';
import { fetchCompany } from '../../api/company';

const useLoadCompany = (companyId) => {
  
  const [ company, setCompany ] = useRecoilState(companyState);
  
  useEffect(() => {
    
    const setCompanyInformation = async () => {
      const companyData = await fetchCompany(companyId);
      setCompany(companyData);
    };

    if (companyId && !company._id) setCompanyInformation();

  }, [companyId, company._id, setCompany]);
  
};

export default useLoadCompany;