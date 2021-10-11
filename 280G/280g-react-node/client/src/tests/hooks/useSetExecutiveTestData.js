import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { executiveNameState, executiveTitleState } from '../../recoil/executive';

export const useSetExecutiveTestData = ({ executiveId=1, executiveName='', executiveTitle='' }) => {

  const setExecutiveName = useSetRecoilState(executiveNameState(executiveId));
  const setExecutiveTitle = useSetRecoilState(executiveTitleState(executiveId))
  
  const [ loaded, setLoaded ] = useState(false);
  const [ loading, setLoading ] = useState(true);
  
  useEffect(() => {
    if (loaded) setLoading(false);
  }, [loaded, setLoading])

  useEffect(() => {
    setExecutiveName(executiveName);
    setExecutiveTitle(executiveTitle);
    setLoaded(true);
  }, [executiveName, setExecutiveName, executiveTitle, setExecutiveTitle, setLoaded]);

  return loading;

};