export const convertVestingData = (vestingData) => {

  const convertedVestingData = [ ];

  for (const vestingDate of vestingData) {

    const { oldVestingDate, acceleratedVestingDate, sharesNotAccelerating, sharesAccelerating } = vestingDate;
  
    if (sharesNotAccelerating !== 0) {      
      convertedVestingData.push({
        oldVestingDate,
        newVestingDate: oldVestingDate,
        shares: sharesNotAccelerating
      });
    }

    if (sharesAccelerating !== 0) {
      convertedVestingData.push({
        oldVestingDate,
        newVestingDate: acceleratedVestingDate,
        shares: sharesAccelerating
      });
    }
  
  }  

  return convertedVestingData;

};