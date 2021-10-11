import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { companiesState } from '../../recoil/company';

export const useSetCompanies = ({ companies }) => {

  const setCompanies = useSetRecoilState(companiesState);
  
  const [ loaded, setLoaded ] = useState(false);
  const [ loading, setLoading ] = useState(true);
  
  useEffect(() => {
    if (loaded) setLoading(false);
  }, [loaded, setLoading])

  useEffect(() => {
    setCompanies(companies);
    setLoaded(true);
  }, [companies, setCompanies, setLoaded]);

  return loading;

};