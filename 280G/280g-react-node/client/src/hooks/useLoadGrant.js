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

  const [ loaded, setLoaded ] = useState(null);
  const [ loading, setLoading ] = useState(null);
  const [ error, setError ] = useState(null);

  useEffect(() => {
    if (loaded) setLoading(false);
  }, [loaded, setLoading]);

  useEffect(() => {
    
    const setPayment = async () => {

      setLoading(true);
      setLoaded(false);

      try {
        const grant = await fetchGrant(grantId);
        setGrantType(grant.grantType);
        setGrantDate(grant.grantDate);
        setNumberShares(grant.numberShares);
        setExercisePrice(grant.exercisePrice);
        setVestingStartDate(grant.vestingStartDate);
        setCliff(grant.cliff);
        setCliffDuration(grant.cliffDuration);
        setCliffPercentage(grant.cliffPercentage);
        setAcceleration(grant.acceleration);
        setAccelerationPercentage(grant.accelerationPercentage);
        setRemainderType(grant.remainderType);
        setRemainderPeriods(grant.remainderPeriods);
        setChangeOfControl(grant.changeOfControl);
        setVestingSchedule(grant.vestingSchedule);
        setLoaded(true);
      } 
      
      catch (e) {
        setError(e.message)
      }

    };
  
    if (!grantDate || !numberShares) setPayment();
  
  }, [grantId, grantDate, numberShares, setGrantType, setGrantDate, setNumberShares, setExercisePrice, setVestingStartDate,
      setCliff, setCliffDuration, setCliffPercentage, setAcceleration, setAccelerationPercentage, setRemainderType,
      setRemainderPeriods, setChangeOfControl, setVestingSchedule, setLoaded, setError]);

  return { loading, error };

};