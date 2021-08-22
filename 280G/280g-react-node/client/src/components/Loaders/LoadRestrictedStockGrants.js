import React, { useState, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import Loading from './Loading';
import { fetchGrant } from '../../api/restrictedStock/fetchGrant';
import { 
  restrictedStockAccelerationMethodState, 
  restrictedStockAccelerationPercentageState, 
  restrictedStockAccelerationState, 
  restrictedStockChangeOfControlState, 
  restrictedStockCliffDurationState, 
  restrictedStockCliffPercentageState, 
  restrictedStockCliffState, 
  restrictedStockGrantDateState, 
  restrictedStockNumberSharesState, 
  restrictedStockRemainderPeriodsState, 
  restrictedStockRemainderTypeState,
  restrictedStockVestingScheduleState, 
  restrictedStockVestingStartDateState
} from '../../recoil/restrictedStock';

const LoadRestrictedStockGrant = ({ grantId }) => {

  const setGrantDate = useSetRecoilState(restrictedStockGrantDateState(grantId));
  const setVestingStartDate = useSetRecoilState(restrictedStockVestingStartDateState(grantId));
  const setNumberShares = useSetRecoilState(restrictedStockNumberSharesState(grantId));
  const setChangeOfControl = useSetRecoilState(restrictedStockChangeOfControlState(grantId));
  const setAcceleration = useSetRecoilState(restrictedStockAccelerationState(grantId));
  const setAccelerationPercentage = useSetRecoilState(restrictedStockAccelerationPercentageState(grantId));
  const setAccelerationMethod = useSetRecoilState(restrictedStockAccelerationMethodState(grantId));
  const setCliff = useSetRecoilState(restrictedStockCliffState(grantId));
  const setCliffDuration = useSetRecoilState(restrictedStockCliffDurationState(grantId));
  const setCliffPercentage = useSetRecoilState(restrictedStockCliffPercentageState(grantId));
  const setRemainderPeriods = useSetRecoilState(restrictedStockRemainderPeriodsState(grantId));
  const setRemainderType = useSetRecoilState(restrictedStockRemainderTypeState(grantId));
  const setVestingSchedule = useSetRecoilState(restrictedStockVestingScheduleState(grantId));

  const [ loading, setLoading ] = useState(null);
  const [ error, setError ] = useState(null);

  useEffect(() => {

    const setGrant = async () => {
      
      setLoading(true);

      try {
        const grant = await fetchGrant(grantId);
        setGrantDate(grant.grantDate);
        setVestingStartDate(grant.vestingStartDate);
        setNumberShares(grant.numberShares);
        setChangeOfControl(grant.changeOfControl);
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

  }, [grantId, setGrantDate, setVestingStartDate, setNumberShares, setChangeOfControl, setAcceleration, setAccelerationPercentage, setAccelerationMethod,
      setCliff, setCliffDuration, setCliffPercentage, setRemainderPeriods, setRemainderType, setVestingSchedule, setLoading ]);  

  return loading 
    ? <Loading componentMessage="Restricted Stock Grants" errorMessage={ error } />
    : null

};

export default LoadRestrictedStockGrant;
