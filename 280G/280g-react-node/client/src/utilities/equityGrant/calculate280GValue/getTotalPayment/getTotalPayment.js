export const getTotalPayment = (changeOfControl, equityValue, accelerationBenefit, serviceLapseValue) => (
  (changeOfControl) ? equityValue : Math.min(equityValue, accelerationBenefit + serviceLapseValue)
);
  