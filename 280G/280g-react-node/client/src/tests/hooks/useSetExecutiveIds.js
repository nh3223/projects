import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { executiveIdsState } from '../../recoil/executive';

export const useSetExecutiveIds = ({ companyId=1, executiveIds=[] }) => {

  const setExecutiveIds = useSetRecoilState(executiveIdsState(companyId));

  const [ loaded, setLoaded ] = useState(false);
  const [ loading, setLoading ] = useState(true);
  
  useEffect(() => {
    if (loaded) setLoading(false);
  }, [loaded, setLoading])

  useEffect(() => {
    setExecutiveIds(executiveIds);
    setLoaded(true);
  }, [executiveIds, setExecutiveIds, setLoaded]);

  return loading;

};