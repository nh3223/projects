import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { accelerationPercentageState, accelerationState, changeOfControlState, cliffDurationState, cliffPercentageState, cliffState, exercisePriceState, grantDateState, grantTypeState, numberSharesState, remainderPeriodsState, remainderTypeState, vestingStartDateState } from '../../recoil/equityGrant';

export const useSetEquityGrantTestData = ({ 
  grantId=1, 
  grantType='Restricted Stock',
  grantDate='',
  vestingStartDate='',
  numberShares='',
  exercisePrice='',
  changeOfControl=false,
  acceleration=false,
  accelerationPercentage=100,
  cliff=false,
  cliffDuration=12,
  cliffPercentage=25,
  remainderPeriods='',
  remainderType='Monthly'
}) => {

  const setGrantType = useSetRecoilState(grantTypeState(grantId));
  const setGrantDate = useSetRecoilState(grantDateState(grantId));
  const setVestingStartDate = useSetRecoilState(vestingStartDateState(grantId));
  const setNumberShares = useSetRecoilState(numberSharesState(grantId));
  const setExercisePrice = useSetRecoilState(exercisePriceState(grantId));
  const setChangeOfControl = useSetRecoilState(changeOfControlState(grantId));
  const setAcceleration = useSetRecoilState(accelerationState(grantId));
  const setAccelerationPercentage = useSetRecoilState(accelerationPercentageState(grantId));
  const setCliff = useSetRecoilState(cliffState(grantId));
  const setCliffDuration = useSetRecoilState(cliffDurationState(grantId));
  const setCliffPercentage = useSetRecoilState(cliffPercentageState(grantId));
  const setRemainderPeriods = useSetRecoilState(remainderPeriodsState(grantId));
  const setRemainderType = useSetRecoilState(remainderTypeState(grantId));

  const [ loaded, setLoaded ] = useState(false);
  const [ loading, setLoading ] = useState(true);
  
  useEffect(() => {
    if (loaded) setLoading(false);
  }, [loaded, setLoading])

  useEffect(() => {
    setGrantType(grantType);
    setGrantDate(grantDate);
    setVestingStartDate(vestingStartDate);
    setNumberShares(numberShares);
    setExercisePrice(exercisePrice);
    setChangeOfControl(changeOfControl);
    setAcceleration(acceleration);
    setAccelerationPercentage(accelerationPercentage);
    setCliff(cliff);
    setCliffDuration(cliffDuration);
    setCliffPercentage(cliffPercentage);
    setRemainderPeriods(remainderPeriods);
    setRemainderType(remainderType);
    setLoaded(true);
  }, [grantType, setGrantType, grantDate, setGrantDate, vestingStartDate, setVestingStartDate, numberShares, setNumberShares, exercisePrice, setExercisePrice,
      changeOfControl, setChangeOfControl, acceleration, setAcceleration, accelerationPercentage, setAccelerationPercentage, cliff, setCliff,
      cliffDuration, setCliffDuration, cliffPercentage, setCliffPercentage, remainderPeriods, setRemainderPeriods, remainderType, setRemainderType, setLoaded]);

  return loading;

};