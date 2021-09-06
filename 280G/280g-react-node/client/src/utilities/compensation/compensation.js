

export const waiverAmount = (parachuteThreshold, payments) => {
  return (payments < parachuteThreshold) ? 0 : payments - parachuteThreshold + 1;
}

