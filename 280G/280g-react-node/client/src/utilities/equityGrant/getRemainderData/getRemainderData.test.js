import { getRemainderData } from "./getRemainderData";

const remainderShares = 100;
const vestingSchedule = [{ data: 1 }];
const transactionData = { data: 2 };

const remainderPeriods = 10;
const equityGrantData = { remainderPeriods };

jest.mock('../getVestingDateData/getVestingDateData', () => ({
  getVestingDateData: (period) => ([{ data: period }])
}));

test('should return an array with the correct number of elements', () => {
  const vestingData = getRemainderData(remainderShares, vestingSchedule, transactionData, equityGrantData);
  expect(vestingData.length).toBe(11);
});

