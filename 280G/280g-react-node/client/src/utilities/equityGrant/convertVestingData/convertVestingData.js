export const convertVestingData = (vestingData) => {

  const convertedVestingData = [ ];

  for (const vestingDate of vestingData) {

    const { grantDate, originalVestingDate, acceleratedVestingDate, sharesNotAccelerating, sharesAccelerating } = vestingDate;
  
    if (sharesNotAccelerating !== 0) {      
      convertedVestingData.push({
        grantDate,
        originalVestingDate,
        newVestingDate: originalVestingDate,
        shares: sharesNotAccelerating
      });
    }

    if (sharesAccelerating !== 0) {
      convertedVestingData.push({
        grantDate,
        originalVestingDate,
        newVestingDate: acceleratedVestingDate,
        shares: sharesAccelerating
      });
    }
  
  }  

  return convertedVestingData;

};