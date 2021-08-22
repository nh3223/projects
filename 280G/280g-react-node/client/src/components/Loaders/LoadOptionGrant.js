import React, { useState, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import Loading from './Loading';
import { fetchGrant } from '../../api/option/fetchGrant';
import { 
  optionAccelerationMethodState, 
  optionAccelerationPercentageState, 
  optionAccelerationState, 
  optionChangeOfControlState, 
  optionCliffDurationState, 
  optionCliffPercentageState, 
  optionCliffState, 
  optionExercisePriceState, 
  optionGrantDateState, 
  optionNumberSharesState, 
  optionRemainderPeriodsState, 
  optionRemainderTypeState,
  optionRolloverState,
  optionVestingScheduleState, 
  optionVestingStartDateState
} from '../../recoil/option';

const LoadOptionGrant = ({ grantId }) => {

  const setGrantDate = useSetRecoilState(optionGrantDateState(grantId));
  const setVestingStartDate = useSetRecoilState(optionVestingStartDateState(grantId));
  const setExercisePrice = useSetRecoilState(optionExercisePriceState(grantId));
  const setNumberShares = useSetRecoilState(optionNumberSharesState(grantId));
  const setChangeOfControl = useSetRecoilState(optionChangeOfControlState(grantId));
  const setRollover = useSetRecoilState(optionRolloverState(grantId));
  const setAcceleration = useSetRecoilState(optionAccelerationState(grantId));
  const setAccelerationPercentage = useSetRecoilState(optionAccelerationPercentageState(grantId));
  const setAccelerationMethod = useSetRecoilState(optionAccelerationMethodState(grantId));
  const setCliff = useSetRecoilState(optionCliffState(grantId));
  const setCliffDuration = useSetRecoilState(optionCliffDurationState(grantId));
  const setCliffPercentage = useSetRecoilState(optionCliffPercentageState(grantId));
  const setRemainderPeriods = useSetRecoilState(optionRemainderPeriodsState(grantId));
  const setRemainderType = useSetRecoilState(optionRemainderTypeState(grantId));
  const setVestingSchedule = useSetRecoilState(optionVestingScheduleState(grantId));

  const [ loading, setLoading ] = useState(null);
  const [ error, setError ] = useState(null);

  useEffect(() => {

    const setGrant = async () => {
      
      setLoading(true);

      try {
        const grant = await fetchGrant(grantId);
        setGrantDate(grant.grantDate);
        setVestingStartDate(grant.vestingStartDate);
        setExercisePrice(grant.exercisePrice);
        setNumberShares(grant.numberShares);
        setChangeOfControl(grant.changeOfControl);
        setRollover(grant.rollover);
        setAcceleration(grant.acceleration);
        setAccelerationPercentage(grant.accelerationPercentage);
        setAccelerationMethod(grant.accelerationMethod);
        setCliff(grant.cliff);
        setCliffDuration(grant.cliffDuration);
        setCliffPercentage(grant.cliffPercentage);
        setRemainderPeriods(grant.remainderPeriods);
        setRemainderType(grant.remainderType);
        setVestingSchedule(grant.vestingSchedule);
        setLoading(false);
      }

      catch (e) {
        setError(e.message);
      }

    };

    setGrant();

  }, [grantId, setGrantDate, setVestingStartDate, setExercisePrice, setNumberShares, setChangeOfControl, setRollover, setAcceleration, setAccelerationPercentage, 
      setAccelerationMethod, setCliff, setCliffDuration, setCliffPercentage, setRemainderPeriods, setRemainderType, setVestingSchedule, setLoading ]);  

  return loading 
    ? <Loading componentMessage="Option Grants" errorMessage={ error } />
    : null

};

export default LoadOptionGrant;