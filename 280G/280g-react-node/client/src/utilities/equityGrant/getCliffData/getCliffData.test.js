import { stringify } from '../../date/date'; 
import { getCliffData } from './getCliffData';

const vestingStartDate = stringify(new Date('July 1, 2018'));
const numberShares = 100;
const cliff = true;
const cliffDuration1 = 3;
const cliffDuration2 = 12;
const cliffPercentage = 25;

const transactionDate = stringify(new Date('December 1, 2021'))

const equityGrantData = {
  vestingStartDate,
  numberShares,
  cliff,
  cliffPercentage,
  cliffDuration: cliffDuration1
};

const defaultVestingData = {
  vestingSchedule: [ ],
  remainderShares: numberShares
};

jest.mock('../percentageAccelerating/percentageAccelerating', () => ({
  percentageAcceleratingCliffPeriod: () => 80
}));

test('should return the correct vesting date and number of shares', () => {
  
  const remainderShares = numberShares * (100 - cliffPercentage) / 100;

  const threeMonthCliffVestingData = [{
    oldVestingDate: stringify(new Date('October 1, 2018')),
    acceleratedVestingDate: transactionDate,
    sharesNotAccelerating: 5,
    sharesAccelerating: 20
  }];

  expect(getCliffData(transactionDate, equityGrantData)).toEqual({ 
    cliffVestingData: threeMonthCliffVestingData,
    remainderShares
  });

  equityGrantData.cliffDuration = cliffDuration2;
  const twelveMonthCliffVestingData = [{
    oldVestingDate: stringify(new Date('July 1, 2019')),
    acceleratedVestingDate: transactionDate,
    sharesNotAccelerating: 5,
    sharesAccelerating: 20
  }];

  expect(getCliffData(transactionDate, equityGrantData)).toEqual({
    cliffVestingData: twelveMonthCliffVestingData,
    remainderShares
  });

});

test('should return default vesting data if there is no cliff vesting', () => {
  equityGrantData.cliff = false;
  expect(getCliffData(transactionDate, equityGrantData)).toEqual(defaultVestingData);
});