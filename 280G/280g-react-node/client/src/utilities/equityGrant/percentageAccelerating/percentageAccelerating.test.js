import { stringify } from '../../date/date';
import { percentageAcceleratingCliffPeriod, percentageAcceleratingRemainderPeriod } from './percentageAccelerating';

const transactionDate = stringify(new Date('December 1, 2021'));

test('should return correct acceleration percentage for cliff period', () => {

  const equityGrantData = {
    acceleration: true,
    accelerationPercentage: 100,
    cliffPercentage: 25,
  };
  
  let originalVestingDate = stringify(new Date('January 1, 2020'));

  let percentageAcceleration = percentageAcceleratingCliffPeriod(originalVestingDate, transactionDate, equityGrantData);
  expect(percentageAcceleration).toEqual(0);

  originalVestingDate = stringify(new Date('January 1, 2022'));
  equityGrantData.acceleration = false;
  percentageAcceleration = percentageAcceleratingCliffPeriod(originalVestingDate, transactionDate, equityGrantData);
  expect(percentageAcceleration).toEqual(0);

  equityGrantData.acceleration = true;
  percentageAcceleration = percentageAcceleratingCliffPeriod(originalVestingDate, transactionDate, equityGrantData);
  expect(percentageAcceleration).toEqual(100);

  equityGrantData.accelerationPercentage = 0;
  percentageAcceleration = percentageAcceleratingCliffPeriod(originalVestingDate, transactionDate, equityGrantData);
  expect(percentageAcceleration).toEqual(0);

  equityGrantData.accelerationPercentage = 50;
  percentageAcceleration = percentageAcceleratingCliffPeriod(originalVestingDate, transactionDate, equityGrantData);
  expect(percentageAcceleration).toEqual(100);

  equityGrantData.accelerationPercentage = 10;
  percentageAcceleration = percentageAcceleratingCliffPeriod(originalVestingDate, transactionDate, equityGrantData);
  expect(percentageAcceleration).toEqual(40);

});

test('should return correct acceleration percentage for remainder period', () => {
  
  const equityGrantData = {
    acceleration: true,
    accelerationPercentage: 100,
    cliffPercentage: 25,
    remainderPeriods: 10
  };
  
  const period = 5;

  let originalVestingDate = stringify(new Date('January 1, 2020'));

  let percentageAcceleration = percentageAcceleratingRemainderPeriod(originalVestingDate, transactionDate, period, equityGrantData);
  expect(percentageAcceleration).toEqual(0);

  originalVestingDate = stringify(new Date('January 1, 2022'));
  equityGrantData.acceleration = false;
  percentageAcceleration = percentageAcceleratingRemainderPeriod(originalVestingDate, transactionDate, period, equityGrantData);
  expect(percentageAcceleration).toEqual(0);

  equityGrantData.acceleration = true;
  percentageAcceleration = percentageAcceleratingRemainderPeriod(originalVestingDate, transactionDate, period, equityGrantData);
  expect(percentageAcceleration).toEqual(100);

  equityGrantData.accelerationPercentage = 0;
  percentageAcceleration = percentageAcceleratingRemainderPeriod(originalVestingDate, transactionDate, period, equityGrantData);
  expect(percentageAcceleration).toEqual(0);

  equityGrantData.accelerationPercentage = 50;
  percentageAcceleration = percentageAcceleratingRemainderPeriod(originalVestingDate, transactionDate, period, equityGrantData);
  expect(percentageAcceleration).toEqual(0);

  equityGrantData.accelerationPercentage = 70;
  percentageAcceleration = percentageAcceleratingRemainderPeriod(originalVestingDate, transactionDate, period, equityGrantData);
  expect(percentageAcceleration).toEqual(50);

  equityGrantData.accelerationPercentage = 80;
  percentageAcceleration = percentageAcceleratingRemainderPeriod(originalVestingDate, transactionDate, period, equityGrantData);
  expect(percentageAcceleration).toEqual(100);

});