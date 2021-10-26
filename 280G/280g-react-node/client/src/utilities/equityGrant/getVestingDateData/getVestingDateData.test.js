import { stringify } from "../../date/date";
import { getVestingDateData } from "./getVestingDateData";

const transactionDate = stringify(new Date('July 21, 2019'));

const period = 1;
const cliff = true;
const cliffDuration = 12;
const remainderShares = 100;
const vestingStartDate = stringify(new Date('July 1, 2019'));
const remainderType = 'Monthly';
const remainderPeriods = 10;
const acceleration = true;
const accelerationPercentage = 100;

const equityGrantData = {
  cliff,
  cliffDuration,
  vestingStartDate,
  remainderType,
  remainderPeriods,
  acceleration,
  accelerationPercentage
};

test('should return correct vesting dates with cliff and with acceleration', () => {

  equityGrantData.remainderType = 'Monthly';
  let vestingData = getVestingDateData(period, remainderShares, transactionDate, equityGrantData);
  expect(vestingData[0].oldVestingDate).toEqual(stringify(new Date('August 1, 2020')));
  expect(vestingData[0].newVestingDate).toBe(transactionDate);

  equityGrantData.remainderType = 'Quarterly';
  vestingData = getVestingDateData(period, remainderShares, transactionDate, equityGrantData);
  expect(vestingData[0].oldVestingDate).toEqual(stringify(new Date('October 1, 2020')));
  expect(vestingData[0].newVestingDate).toBe(transactionDate);
  
  equityGrantData.remainderType = 'Annually';
  vestingData = getVestingDateData(period, remainderShares, transactionDate, equityGrantData);
  expect(vestingData[0].oldVestingDate).toEqual(stringify(new Date('July 1, 2021')));
  expect(vestingData[0].newVestingDate).toBe(transactionDate);

});

test('should return correct vesting dates with cliff and with no acceleration', () => {
  
  equityGrantData.acceleration = false;
  
  equityGrantData.remainderType = 'Monthly';
  let vestingData = getVestingDateData(period, remainderShares, transactionDate, equityGrantData);
  expect(vestingData[0].oldVestingDate).toEqual(stringify(new Date('August 1, 2020')));
  expect(vestingData[0].newVestingDate).toEqual(stringify(new Date('August 1, 2020')));

  equityGrantData.remainderType = 'Quarterly';
  vestingData = getVestingDateData(period, remainderShares, transactionDate, equityGrantData);
  expect(vestingData[0].oldVestingDate).toEqual(stringify(new Date('October 1, 2020')));
  expect(vestingData[0].newVestingDate).toEqual(stringify(new Date('October 1, 2020')));
  
  equityGrantData.remainderType = 'Annually';
  vestingData = getVestingDateData(period, remainderShares, transactionDate, equityGrantData);
  expect(vestingData[0].oldVestingDate).toEqual(stringify(new Date('July 1, 2021')));
  expect(vestingData[0].newVestingDate).toEqual(stringify(new Date('July 1, 2021')));
});

test('should return correct vesting date without cliff and no acceleration', () => {

  equityGrantData.cliff = false;

  equityGrantData.remainderType = 'Monthly';
  let vestingData = getVestingDateData(period, remainderShares, transactionDate, equityGrantData);
  expect(vestingData[0].oldVestingDate).toEqual(stringify(new Date('August 1, 2019')));
  expect(vestingData[0].newVestingDate).toEqual(stringify(new Date('August 1, 2019')));
  
  equityGrantData.remainderType = 'Quarterly';
  vestingData = getVestingDateData(period, remainderShares, transactionDate, equityGrantData);
  expect(vestingData[0].oldVestingDate).toEqual(stringify(new Date('October 1, 2019')));
  expect(vestingData[0].newVestingDate).toEqual(stringify(new Date('October 1, 2019')));
  
  equityGrantData.remainderType = 'Annually';
  vestingData = getVestingDateData(period, remainderShares, transactionDate, equityGrantData);
  expect(vestingData[0].oldVestingDate).toEqual(stringify(new Date('July 1, 2020')));
  expect(vestingData[0].newVestingDate).toEqual(stringify(new Date('July 1, 2020')));

});

test('should return correct vestingdates without cliff and with acceleration', () => {

  equityGrantData.acceleration = true;

  equityGrantData.remainderType = 'Monthly';
  let vestingData = getVestingDateData(period, remainderShares, transactionDate, equityGrantData);
  expect(vestingData[0].oldVestingDate).toEqual(stringify(new Date('August 1, 2019')));
  expect(vestingData[0].newVestingDate).toBe(transactionDate);
  
  equityGrantData.remainderType = 'Quarterly';
  vestingData = getVestingDateData(period, remainderShares, transactionDate, equityGrantData);
  expect(vestingData[0].oldVestingDate).toEqual(stringify(new Date('October 1, 2019')));
  expect(vestingData[0].newVestingDate).toBe(transactionDate);
  
  equityGrantData.remainderType = 'Annually';
  vestingData = getVestingDateData(period, remainderShares, transactionDate, equityGrantData);
  expect(vestingData[0].oldVestingDate).toEqual(stringify(new Date('July 1, 2020')));
  expect(vestingData[0].newVestingDate).toBe(transactionDate);

});

test('should return correct number of shares with full acceleration', () => {
  let vestingData = getVestingDateData(period, remainderShares, transactionDate, equityGrantData);
  expect(vestingData[0].shares).toBe(10);
});

test('should return correct number of shares and new vesting dates with partial acceleration', () => {
  equityGrantData.remainderType = 'Monthly';
  equityGrantData.accelerationPercentage = 80;
  let vestingData = getVestingDateData(period, remainderShares, transactionDate, equityGrantData);
  expect(vestingData[0].shares).toBe(8);
  expect(vestingData[1].shares).toBe(2);
  expect(vestingData[0].newVestingDate).toEqual(transactionDate);
  expect(vestingData[1].newVestingDate).toEqual(stringify(new Date('August 1, 2019')));
})

test('should return original vesting date if old vesting date precedes transaction', () => {
  const laterTransactionDate = stringify(new Date('July 1, 2023'));
  equityGrantData.accelerationPercentage = 100;
  let vestingData = getVestingDateData(period, remainderShares, laterTransactionDate, equityGrantData);
  expect(vestingData[0].newVestingDate).toEqual(stringify(new Date('August, 1, 2019')));
})
