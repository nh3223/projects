import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { equityGrantIdsState } from '../../recoil/equityGrant';

export const useSetGrantIds = ({ executiveId=1, grantIds=[] }) => {

  const setGrantIds = useSetRecoilState(equityGrantIdsState(executiveId));

  const [ loaded, setLoaded ] = useState(false);
  const [ loading, setLoading ] = useState(true);
  
  useEffect(() => {
    if (loaded) setLoading(false);
  }, [loaded, setLoading])

  useEffect(() => {
    setGrantIds(grantIds);
    setLoaded(true);
  }, [grantIds, setGrantIds, setLoaded]);

  return loading;

};