import { useEffect, useState } from 'react';
import { useLoadCompany } from './useLoadCompany';
import { useLoadExecutives } from './useLoadExecutives';

// NOTE:  Shifted back to component loaders, rather than custom hooks due to issues with populating recoil with multiple executives
//        and rules of hooks not allowing hooks to be used in loops or callbacks

export const useLoadProject = (companyId) => {

  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState({ });

  const { companyLoading, companyError } = useLoadCompany(companyId);
  const { executivesLoading, executivesError } = useLoadExecutives(companyId);

  useEffect(() => {
    (!companyLoading && !executivesLoading) ? setLoading(false) : setLoading(true);
  }, [ companyLoading, executivesLoading, setLoading ]);

  useEffect(() => {
    setError({ companyError });
    setError({ executivesError });
  }, [ companyError, executivesError, setError ]);

  return { loading, error }

};
