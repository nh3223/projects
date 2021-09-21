import { stringify } from "../../date/date";
import { getVestingDateData } from "./getVestingDateData";
import { percentageAcceleratingRemainderPeriod } from '../percentageAccelerating/percentageAccelerating';

const transactionDate = stringify(new Date('December 1, 2021'));
const transactionData = { transactionDate };

const period = 1;
const cliff = true;
const cliffDuration = 12;
const remainderShares = 100;
const vestingStartDate = stringify(new Date('July 1, 2015'));
const remainderType = 'Monthly';
const remainderPeriods = 25; 

const equityGrantData = {
  cliff,
  cliffDuration,
  vestingStartDate,
  remainderType,
  remainderPeriods
};

jest.mock('../percentageAccelerating/percentageAccelerating', () => ({
  percentageAcceleratingRemainderPeriod: () => 50
}));

test('should return correct number of shares', () => {
  
  let vestingData = getVestingDateData(period, remainderShares, transactionData, equityGrantData);
  expect(vestingData.sharesNotAccelerating).toBe(2);
  expect(vestingData.sharesAccelerating).toBe(2);

  equityGrantData.remainderType='Quarterly';
  equityGrantData.remainderPeriods = 10;
  vestingData = getVestingDateData(period, remainderShares, transactionData, equityGrantData);
  expect(vestingData.sharesNotAccelerating).toBe(5);
  expect(vestingData.sharesAccelerating).toBe(5);

  equityGrantData.remainderType = 'Annually';
  equityGrantData.remainderPeriods = 4;
  vestingData = getVestingDateData(period, remainderShares, transactionData, equityGrantData);
  expect(vestingData.sharesNotAccelerating).toBeCloseTo(12.5);
  expect(vestingData.sharesAccelerating).toBeCloseTo(12.5);

});

test('should return correct vesting date with cliff', () => {

  equityGrantData.remainderType = 'Monthly';
  let vestingData = getVestingDateData(period, remainderShares, transactionData, equityGrantData);
  expect(vestingData.originalVestingDate).toEqual(stringify(new Date('August 1, 2016')));
  expect(vestingData.acceleratedVestingDate).toBe(transactionDate);

  equityGrantData.remainderType = 'Quarterly';
  vestingData = getVestingDateData(period, remainderShares, transactionData, equityGrantData);
  expect(vestingData.originalVestingDate).toEqual(stringify(new Date('October 1, 2016')));
  expect(vestingData.acceleratedVestingDate).toBe(transactionDate);
  
  equityGrantData.remainderType = 'Annually';
  vestingData = getVestingDateData(period, remainderShares, transactionData, equityGrantData);
  expect(vestingData.originalVestingDate).toEqual(stringify(new Date('July 1, 2017')));
  expect(vestingData.acceleratedVestingDate).toBe(transactionDate);

});

test('should return correct vesting date without cliff', () => {

  equityGrantData.cliff = false;

  equityGrantData.remainderType = 'Monthly';
  let vestingData = getVestingDateData(period, remainderShares, transactionData, equityGrantData);
  expect(vestingData.originalVestingDate).toEqual(stringify(new Date('August 1, 2015')));
  expect(vestingData.acceleratedVestingDate).toBe(transactionDate);
  
  equityGrantData.remainderType = 'Quarterly';
  vestingData = getVestingDateData(period, remainderShares, transactionData, equityGrantData);
  expect(vestingData.originalVestingDate).toEqual(stringify(new Date('October 1, 2015')));
  expect(vestingData.acceleratedVestingDate).toBe(transactionDate);
  
  equityGrantData.remainderType = 'Annually';
  vestingData = getVestingDateData(period, remainderShares, transactionData, equityGrantData);
  expect(vestingData.originalVestingDate).toEqual(stringify(new Date('July 1, 2016')));
  expect(vestingData.acceleratedVestingDate).toBe(transactionDate);

});
