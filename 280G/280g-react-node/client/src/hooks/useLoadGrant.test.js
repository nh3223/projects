import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import { render, waitFor } from '@testing-library/react'
import { RecoilRoot, useRecoilValue } from 'recoil';

import { stringify, formatDate } from "../utilities/date/date";
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
import { useSetEquityGrantTestData } from '../tests/hooks/useSetEquityGrantTestData';
import { useSetVestingScheduleTestData } from '../tests/hooks/useSetVestingScheduleTestData';
import * as fetchGrant from '../api/equityGrant/fetchGrant';

import { useLoadGrant } from './useLoadGrant';

const UseLoadGrantTest = ({ grantId }) => {

  const { status } = useLoadGrant(grantId);

  const grantType = useRecoilValue(grantTypeState(grantId));
  const grantDate = useRecoilValue(grantDateState(grantId));
  const numberShares = useRecoilValue(numberSharesState(grantId));
  const exercisePrice = useRecoilValue(exercisePriceState(grantId));
  const vestingStartDate = useRecoilValue(vestingStartDateState(grantId));

  const cliff = useRecoilValue(cliffState(grantId));
  const cliffDuration = useRecoilValue(cliffDurationState(grantId));
  const cliffPercentage = useRecoilValue(cliffPercentageState(grantId));

  const acceleration = useRecoilValue(accelerationState(grantId));
  const accelerationPercentage = useRecoilValue(accelerationPercentageState(grantId));

  const remainderType = useRecoilValue(remainderTypeState(grantId));
  const remainderPeriods = useRecoilValue(remainderPeriodsState(grantId));

  const changeOfControl = useRecoilValue(changeOfControlState(grantId));

  const vestingSchedule = useRecoilValue(vestingScheduleState(grantId));

  if (status === 'loading') return <p>Loading</p>;

    return (
      <>
        <p>{ grantType }</p>
        <p>{ formatDate(grantDate) }</p>
        <p>{ numberShares }</p>
        <p>{ exercisePrice }</p>
        <p>{ formatDate(vestingStartDate) }</p>
        <p>{ `Cliff: ${ cliff }` }</p>
        <p>{ cliffDuration }</p>
        <p>{ cliffPercentage }</p>
        <p>{ `Acceleration: ${ acceleration }` }</p>
        <p>{ accelerationPercentage }</p>
        <p>{ remainderType }</p>
        <p>{ remainderPeriods }</p>
        <p>{ `Change of Control: ${ changeOfControl }` }</p>
        { vestingSchedule.map((date) => <p key={ date }>{ date }</p>) }
      </>
    );

};

const InitializeState = ({ grantData }) => {
  const { grantId, grantType, grantDate, numberShares, exercisePrice, vestingStartDate, cliff, cliffDuration, cliffPercentage,
          acceleration, accelerationPercentage, remainderType, remainderPeriods, changeOfControl, vestingSchedule } = grantData 
  const loadingGrant = useSetEquityGrantTestData({ grantId, grantType, grantDate, numberShares, exercisePrice, vestingStartDate,
                                              cliff, cliffDuration, cliffPercentage, acceleration, accelerationPercentage, 
                                              remainderType, remainderPeriods, changeOfControl });
  const loadingVesting = useSetVestingScheduleTestData({ grantId, vestingSchedule });
  return (loadingGrant || loadingVesting) ? null : <UseLoadGrantTest grantId={ grantId } />
};

const Component = ({ grantData }) => (
  <RecoilRoot>
    <InitializeState grantData={ grantData } />
  </RecoilRoot>
);

test('should show Grant Information if already loaded', async () => {

  const grantData = {
    grantId: 1,
    grantType: 'Option',
    grantDate: stringify(new Date('January 1, 2019')),
    numberShares: 100,
    exercisePrice: 10,
    vestingStartDate: stringify(new Date('February 1, 2019')),
    cliff: true,
    cliffDuration: 12,
    cliffPercentage: 25,
    acceleration: true,
    accelerationPercentage: 50,
    remainderType: 'Monthly',
    remainderPeriods: 36,
    changeOfControl: false,
    vestingSchedule: [ '101', '102', '103' ]
  };

  const { getByText } = render(<Component grantData = { grantData } />);
  
  await waitFor(() => {
    const type = getByText('Option');
    const dateGrant = getByText('1 Jan 2019');
    const shares = getByText('100');
    const strikePrice = getByText('10');
    const dateVesting = getByText('1 Feb 2019');
    const cliffValue = getByText('Cliff: true');
    const durationCliff = getByText('12');
    const percentageCliff = getByText('25');
    const accelerationValue = getByText('Acceleration: true');
    const percentageAcceleration = getByText('50');
    const typeRemainder = getByText('Monthly');
    const periods = getByText('36');
    const changeValue = getByText('Change of Control: false');
    const vesting1 = getByText('101');
    const vesting2 = getByText('102');
    const vesting3 = getByText('103');
    expect(type).toBeInTheDocument();
    expect(dateGrant).toBeInTheDocument();
    expect(shares).toBeInTheDocument();
    expect(strikePrice).toBeInTheDocument();
    expect(dateVesting).toBeInTheDocument();
    expect(cliffValue).toBeInTheDocument();
    expect(durationCliff).toBeInTheDocument();
    expect(percentageCliff).toBeInTheDocument();
    expect(accelerationValue).toBeInTheDocument();
    expect(percentageAcceleration).toBeInTheDocument();
    expect(typeRemainder).toBeInTheDocument();
    expect(periods).toBeInTheDocument();
    expect(changeValue).toBeInTheDocument();
    expect(vesting1).toBeInTheDocument();
    expect(vesting2).toBeInTheDocument();
    expect(vesting3).toBeInTheDocument();
  });

});

test('should load grant information if not yet loaded', async () => {
  
  const grantData = {
    grantId: 1,
    grantType: 'Restricted Stock',
    grantDate: '',
    numberShares: '',
    exercisePrice: '',
    vestingStartDate: '',
    cliff: false,
    cliffDuration: '',
    cliffPercentage: '',
    acceleration: false,
    accelerationPercentage: '',
    remainderType: 'Monthly',
    remainderPeriods: '',
    changeOfControl: false,
    vestingSchedule: [ ]
  };

  jest.spyOn(fetchGrant, 'fetchGrant').mockImplementation(() => Promise.resolve({
    grantType: 'Option',
    grantDate: stringify(new Date('January 1, 2019')),
    numberShares: 100,
    exercisePrice: 10,
    vestingStartDate: stringify(new Date('February 1, 2019')),
    cliff: true,
    cliffDuration: 12,
    cliffPercentage: 25,
    acceleration: true,
    accelerationPercentage: 50,
    remainderType: 'Monthly',
    remainderPeriods: 36,
    changeOfControl: false,
    vestingSchedule: [ '101', '102', '103' ]
  }));
  
  const { getByText } = render(<Component grantData = { grantData } />);
  
  await waitFor(() => {
    const type = getByText('Option');
    const dateGrant = getByText('1 Jan 2019');
    const shares = getByText('100');
    const strikePrice = getByText('10');
    const dateVesting = getByText('1 Feb 2019');
    const cliffValue = getByText('Cliff: true');
    const durationCliff = getByText('12');
    const percentageCliff = getByText('25');
    const accelerationValue = getByText('Acceleration: true');
    const percentageAcceleration = getByText('50');
    const typeRemainder = getByText('Monthly');
    const periods = getByText('36');
    const changeValue = getByText('Change of Control: false');
    const vesting1 = getByText('101');
    const vesting2 = getByText('102');
    const vesting3 = getByText('103');
    expect(type).toBeInTheDocument();
    expect(dateGrant).toBeInTheDocument();
    expect(shares).toBeInTheDocument();
    expect(strikePrice).toBeInTheDocument();
    expect(dateVesting).toBeInTheDocument();
    expect(cliffValue).toBeInTheDocument();
    expect(durationCliff).toBeInTheDocument();
    expect(percentageCliff).toBeInTheDocument();
    expect(accelerationValue).toBeInTheDocument();
    expect(percentageAcceleration).toBeInTheDocument();
    expect(typeRemainder).toBeInTheDocument();
    expect(periods).toBeInTheDocument();
    expect(changeValue).toBeInTheDocument();
    expect(vesting1).toBeInTheDocument();
    expect(vesting2).toBeInTheDocument();
    expect(vesting3).toBeInTheDocument();
  });

});
