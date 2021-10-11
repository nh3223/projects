import { convertVestingData } from "./convertVestingData";
import { stringify } from "../../date/date";

const grantDate = stringify(new Date('October 1, 2019'));
const transactionDate = stringify(new Date('December 1, 2021'));

const vestingData = [
  {
    grantDate,
    oldVestingDate: stringify(new Date('January 1, 2022')),
    acceleratedVestingDate: transactionDate,
    sharesAccelerating: 0,
    sharesNotAccelerating: 100
  },
  {
    grantDate,
    oldVestingDate: stringify(new Date('February 1, 2022')),
    acceleratedVestingDate: transactionDate,
    sharesAccelerating: 100,
    sharesNotAccelerating: 0
  },
  {
    grantDate,
    oldVestingDate: stringify(new Date('March 1, 2022')),
    acceleratedVestingDate: transactionDate,
    sharesAccelerating: 50,
    sharesNotAccelerating: 50
  }
];

const convertedVestingData = convertVestingData(vestingData);

test('should return an array of length 4', () => {
  expect(convertedVestingData.length).toEqual(4);
});

test('should have one element with an old vesting date of January 1 with the same new vesting date and 100 shares', () => {

  const oldVestingDate = stringify(new Date('January 1, 2022'))
  expect(convertedVestingData[0].oldVestingDate).toEqual(oldVestingDate);
  expect(convertedVestingData[0].newVestingDate).toEqual(oldVestingDate);
  expect(convertedVestingData[0].shares).toEqual(100);

});

test('should have one element with an old vesting date of February 1 with a different new vesting date and 100 shares', () => {

  const oldVestingDate = stringify(new Date('February 1, 2022'))
  expect(convertedVestingData[1].oldVestingDate).toEqual(oldVestingDate);
  expect(convertedVestingData[1].newVestingDate).toEqual(transactionDate);
  expect(convertedVestingData[1].shares).toEqual(100);

});

test('should have two elements with an old vesting date of March 1, with two different new vesting dates with 50 shares each', () => {

  const oldVestingDate = stringify(new Date('March 1, 2022'))
  expect(convertedVestingData[2].oldVestingDate).toEqual(oldVestingDate);
  expect(convertedVestingData[3].oldVestingDate).toEqual(oldVestingDate);
  expect(convertedVestingData[2].newVestingDate).toEqual(oldVestingDate);
  expect(convertedVestingData[3].newVestingDate).toEqual(transactionDate);
  expect(convertedVestingData[2].shares).toEqual(50);
  expect(convertedVestingData[3].shares).toEqual(50);

});