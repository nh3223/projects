import { stringify } from '../../date/date'; 
import { getCliffData } from './getCliffData';

const vestingStartDate = stringify(new Date('July 1, 2021'));
const numberShares = 100;
const cliff = true;
const cliffDuration = 12;
const cliffPercentage = 25;
const acceleration = true;
const accelerationPercentage = 100;

const transactionDate = stringify(new Date('December 1, 2021'))
const oldVestingDate = stringify(new Date('July 1, 2022'));
const cliffShares = numberShares * cliffPercentage / 100
const remainderShares = numberShares - cliffShares

const equityGrantData = {
  vestingStartDate,
  numberShares,
  cliff,
  cliffPercentage,
  cliffDuration,
  acceleration,
  accelerationPercentage
};

const defaultVestingData = {
  vestingSchedule: [ ],
  remainderShares: numberShares
};

const originalVestingSchedule = {
  vestingSchedule: [{
    oldVestingDate,
    newVestingDate: oldVestingDate,
    shares: cliffShares
  }],
  remainderShares
};

const fullAccelerationVestingSchedule = {
  vestingSchedule: [{
    oldVestingDate,
    newVestingDate: transactionDate,
    shares: cliffShares
  }],
  remainderShares
};

const partialAccelerationVestingSchedule = {
  vestingSchedule: [
    { oldVestingDate,
      newVestingDate: transactionDate,
      shares: cliffShares * 0.75
    },
    {
      oldVestingDate,
      newVestingDate: oldVestingDate,
      shares: cliffShares * 0.25
    }
  ],
  remainderShares
};

test('should return default vesting data if there is no cliff vesting', () => {
  equityGrantData.cliff = false;
  expect(getCliffData(transactionDate, equityGrantData)).toEqual(defaultVestingData);
});

test('should return original vesting schedule if vesting before transaction or no acceleration', () => {
  equityGrantData.cliff = true;
  const laterTransactionDate = stringify(new Date('December 1, 2025'));
  expect(getCliffData(laterTransactionDate, equityGrantData)).toEqual(originalVestingSchedule);
})

test('should return original vesting schedule if no acceleration', () => {
  equityGrantData.acceleration = false;
  expect(getCliffData(transactionDate, equityGrantData)).toEqual(originalVestingSchedule);
})

test('should return the correct vesting date and number of shares with full acceleration', () => {
  equityGrantData.acceleration = true;
  expect(getCliffData(transactionDate, equityGrantData)).toEqual(fullAccelerationVestingSchedule);
});

test('should return correct vesting dates and number of shares with partial acceleration', () => {
  equityGrantData.accelerationPercentage = 75;
  expect(getCliffData(transactionDate, equityGrantData)).toEqual(partialAccelerationVestingSchedule);
});