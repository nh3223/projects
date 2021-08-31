import { convertCompensation, reconvertCompensation } from "./convertCompensation";

const basePeriodCompensation = [
  { year: 2018, compensation: 100 },
  { year: 2019, compensation: 200 },
  { year: 2020, compensation: 300 }
];

const compensation = {
  2018: 100,
  2019: 200,
  2020: 300
};

test('convertCompensation should return an empty object if basePeriodCompensation is an empty array', () => {
  expect(convertCompensation([ ])).toEqual({ });
});

test('converCompensation should return an object with keys equal to the year and values equal to compensation', () => {
  expect(convertCompensation(basePeriodCompensation)).toEqual(compensation);
});

test('reconvertCompensation should return an empty array if compensation is an empty object', () => {
  expect(reconvertCompensation({ })).toEqual([ ]);
});

test('reconvertCompensation should return an array with each element and object with year and compensation keys', () => {
  expect(reconvertCompensation(compensation)).toEqual(basePeriodCompensation);
});