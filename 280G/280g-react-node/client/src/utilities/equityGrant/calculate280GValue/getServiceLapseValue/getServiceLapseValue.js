const SERVICE_LAPSE_PERCENTAGE = 0.01 // This is fixed by the 280G treasury Regulations

export const getServiceLapseValue = ({ months }, equityValue) => equityValue * months * SERVICE_LAPSE_PERCENTAGE;