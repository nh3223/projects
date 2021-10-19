export const convertCompensation = (basePeriodCompensation) => {
  if (basePeriodCompensation.length === 0) return {};
  const compensation = {}
  for (const year of basePeriodCompensation) {
    compensation[year.year] = year.compensation;
  }
  return compensation;
};

export const reconvertCompensation = (compensation) => {
  if (Object.keys(compensation).length === 0) return [];
  const basePeriodCompensation = [];
  for (const year in compensation) {
    basePeriodCompensation.push({ year: Number(year), compensation: compensation[year] });
  }
  return basePeriodCompensation;
};