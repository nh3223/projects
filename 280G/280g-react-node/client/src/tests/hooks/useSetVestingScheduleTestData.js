import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { vestingScheduleState } from '../../recoil/equityGrant';

export const useSetVestingScheduleTestData = ({ grantId=1, vestingSchedule=[] }) => {

  const setVestingSchedule = useSetRecoilState(vestingScheduleState(grantId));

  const [ loaded, setLoaded ] = useState(false);
  const [ loading, setLoading ] = useState(true);
  
  useEffect(() => {
    if (loaded) setLoading(false);
  }, [loaded, setLoading])

  useEffect(() => {
    setVestingSchedule(vestingSchedule);
    setLoaded(true);
  }, [vestingSchedule, setVestingSchedule, setLoaded]);

  return loading;

};