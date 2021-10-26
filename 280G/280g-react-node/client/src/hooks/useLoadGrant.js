import { useState, useEffect } from 'react';
import { useSetRecoilState, useRecoilState } from "recoil";

import { 
  accelerationPercentageState, 
  accelerationState, 
  changeOfControlState, 
  cliffDurationState, 
  cliffPercentageState, 
  cliffState, 
  exercisePriceState, 
  grantDateState, 
  grantTypeState, 
  numberSharesState, 
  remainderPeriodsState, 
  remainderTypeState, 
  vestingScheduleState, 
  vestingStartDateState
} from '../recoil/equityGrant';

import { fetchGrant } from '../api/equityGrant/fetchGrant';

export const useLoadGrant = (grantId) => {
  
  const setGrantType = useSetRecoilState(grantTypeState(grantId));
  const [ grantDate, setGrantDate ] = useRecoilState(grantDateState(grantId));
  const [ numberShares, setNumberShares ] = useRecoilState(numberSharesState(grantId));
  const setExercisePrice = useSetRecoilState(exercisePriceState(grantId));
  const setVestingStartDate = useSetRecoilState(vestingStartDateState(grantId));

  const setCliff = useSetRecoilState(cliffState(grantId));
  const setCliffDuration = useSetRecoilState(cliffDurationState(grantId));
  const setCliffPercentage = useSetRecoilState(cliffPercentageState(grantId));

  const setAcceleration = useSetRecoilState(accelerationState(grantId));
  const setAccelerationPercentage = useSetRecoilState(accelerationPercentageState(grantId));

  const setRemainderType = useSetRecoilState(remainderTypeState(grantId));
  const setRemainderPeriods = useSetRecoilState(remainderPeriodsState(grantId));

  const setChangeOfControl = useSetRecoilState(changeOfControlState(grantId));

  const setVestingSchedule = useSetRecoilState(vestingScheduleState(grantId));

  const loaded = grantDate || numberShares;
  const [ status, setStatus ] = useState((loaded) ? 'loaded' : 'loading');
  const [ error, setError ] = useState(null);

  useEffect(() => {
    
    const setPayment = async () => {

      try {
        const grant = await fetchGrant(grantId);
        console.log('grant', grant);
        setGrantType(grant.grantType || 'Restricted Stock');
        setGrantDate(grant.grantDate || '');
        setNumberShares(grant.numberShares || '');
        setExercisePrice(grant.exercisePrice || '');
        setVestingStartDate(grant.vestingStartDate || '');
        setCliff(grant.cliff || false);
        setCliffDuration(grant.cliffDuration || '');
        setCliffPercentage(grant.cliffPercentage || '');
        setAcceleration(grant.acceleration || false);
        setAccelerationPercentage(grant.accelerationPercentage || '');
        setRemainderType(grant.remainderType || 'Monthly');
        setRemainderPeriods(grant.remainderPeriods || '');
        setChangeOfControl(grant.changeOfControl || false);
        setVestingSchedule(grant.vestingSchedule || []);
        setStatus('loaded');
      } 
      
      catch (e) {
        console.log(e);
        setError(e.message)
      }

    };

    if (!loaded && status === 'loading') setPayment();
  
  }, [grantId, loaded, status, setGrantType, setGrantDate, setNumberShares, setExercisePrice, setVestingStartDate,
      setCliff, setCliffDuration, setCliffPercentage, setAcceleration, setAccelerationPercentage, setRemainderType,
      setRemainderPeriods, setChangeOfControl, setVestingSchedule, setStatus, setError]);

  return { status, error };

};