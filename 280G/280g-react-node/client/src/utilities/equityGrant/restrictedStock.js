export const setGrantData = (grant) => ({ 
  _id: grant._id,
  grantDate: grant.grantDate,
  vestingStartDate: grant.vestingStartDate,
  numberShares: grant.numberShares,
  changeOfControl: grant.changeOfControl,
  acceleration: grant.acceleration,
  accelerationPercentage: grant.accelerationPercentage,
  accelerationMethod: grant.accelerationMethod,
  cliff: grant.cliff,
  cliffDuration: grant.cliffDuration,
  cliffPercentage: grant.cliffPercentage,
  remainderPeriods: grant.remainderPeriods,
  remainderType: grant.remainderType
});

export const defaultNew = {
  grantDate: false,
  vestingStartDate: false,
  numberShares: false,
  accelerationPercentage: true,
  cliffDuration: true,
  cliffPercentage: true,
  remainderPeriods: false
};

export const defaultOld = {
  grantDate: true,
  vestingStartDate: true,
  numberShares: true,
  accelerationPercentage: true,
  cliffDuration: true,
  cliffPercentage: true,
  remainderPeriods: true
};