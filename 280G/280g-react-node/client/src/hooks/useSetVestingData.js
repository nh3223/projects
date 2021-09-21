import { useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';

import { transactionDateState } from '../recoil/company';

import { accelerationPercentageState, 
          accelerationState, 
          cliffDurationState, 
          cliffPercentageState, 
          cliffState, 
          numberSharesState, 
          remainderPeriodsState, 
          remainderTypeState, 
          vestingScheduleState, 
          vestingStartDateState
} from '../recoil/equityGrant';

import { editGrant } from '../api/equityGrant/editGrant';
import { getVestingSchedule } from '../utilities/equityGrant/getVestingSchedule/getVestingSchedule';

export const useSetVestingData = (companyId, grantId) => {

  const transactionDate = useRecoilValue(transactionDateState(companyId));

  const numberShares = useRecoilValue(numberSharesState(grantId));
  const vestingStartDate = useRecoilValue(vestingStartDateState(grantId));

  const cliff = useRecoilValue(cliffState(grantId));
  const cliffDuration = useRecoilValue(cliffDurationState(grantId));
  const cliffPercentage = useRecoilValue(cliffPercentageState(grantId));

  const acceleration = useRecoilValue(accelerationState(grantId));
  const accelerationPercentage = useRecoilValue(accelerationPercentageState(grantId));

  const remainderType = useRecoilValue(remainderTypeState(grantId));
  const remainderPeriods = useRecoilValue(remainderPeriodsState(grantId));

  const [ vestingSchedule, setVestingSchedule ] = useRecoilState(vestingScheduleState(grantId));

  useEffect(() => {

    const createVestingSchedule = async () => {
      const equityGrantData = {  
        acceleration, 
        accelerationPercentage, 
        cliff,
        cliffDuration, 
        cliffPercentage,  
        numberShares, 
        remainderPeriods, 
        remainderType, 
        vestingStartDate
      };
      const newVestingSchedule = getVestingSchedule(transactionDate, equityGrantData);
      setVestingSchedule(newVestingSchedule);
      await editGrant(grantId, { vestingSchedule: newVestingSchedule });
    }

    if (vestingSchedule.length === 0) createVestingSchedule();
  
  }, [grantId, transactionDate, acceleration, accelerationPercentage, cliff, cliffDuration, cliffPercentage,
      numberShares, remainderPeriods, remainderType, vestingStartDate, vestingSchedule.length, setVestingSchedule])

};